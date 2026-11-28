import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const appRoot = fileURLToPath(new URL('../', import.meta.url));

test('distributed Windows launcher can start without a sibling manga checkout', () => {
  const { scripts } = JSON.parse(fs.readFileSync(path.join(appRoot, 'package.json'), 'utf8'));
  const launcher = fs.readFileSync(path.join(appRoot, 'start_Story_app.bat'), 'utf8');
  assert.match(launcher, /^call npm run start:local -- --open --base \.\/\r?$/m);
  assert.equal(scripts['start:local'], 'vite');
  assert.equal(scripts['prestart:local'], 'node scripts/check-nano-bundled-contract.mjs');
  assert.equal(scripts.predev, 'npm run check:nano-4koma-contract');
});

test('standalone check validates the shipped contract and rejects a changed or missing file', (t) => {
  const extractedZip = fs.mkdtempSync(path.join(os.tmpdir(), 'story-maker-launch-'));
  t.after(() => fs.rmSync(extractedZip, { recursive: true, force: true }));

  for (const file of [
    'scripts/check-nano-bundled-contract.mjs',
    'scripts/nanoContractSources.mjs',
    'scripts/nano-contract-baseline.json',
    'src/vendor/nanoMangaPageComposition.js',
    'src/vendor/page-production-contract.js',
  ]) {
    const target = path.join(extractedZip, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(appRoot, file), target);
  }
  const runCheck = () => spawnSync(process.execPath, ['scripts/check-nano-bundled-contract.mjs'], {
    cwd: extractedZip,
    encoding: 'utf8',
    env: { ...process.env, NANO_BANANA_PRO_ROOT: path.join(extractedZip, 'absent-manga-app') },
  });

  const clean = runCheck();
  assert.equal(clean.status, 0, clean.stderr);

  const composition = 'src/vendor/nanoMangaPageComposition.js';
  fs.appendFileSync(path.join(extractedZip, composition), '\n// modified contract\n');
  const changed = runCheck();
  assert.equal(changed.status, 1);
  assert.match(changed.stderr, /does not match.*nanoMangaPageComposition\.js/i);
  fs.copyFileSync(path.join(appRoot, composition), path.join(extractedZip, composition));

  fs.unlinkSync(path.join(extractedZip, 'src/vendor/page-production-contract.js'));
  const missing = runCheck();
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /missing.*page-production-contract\.js/i);
});
