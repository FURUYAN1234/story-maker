import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkContractSources, contractSourceFiles, defaultNanoRoot, sourceHash } from '../scripts/nanoContractSources.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('missing manga source blocks the compatibility command instead of reporting success', () => {
  const missing = fs.mkdtempSync(path.join(os.tmpdir(), 'story-manga-missing-'));
  try {
    const result = spawnSync(process.execPath, ['scripts/check-nano-4koma-contract.mjs'], {
      cwd: root, env: { ...process.env, NANO_BANANA_PRO_ROOT: missing },
      encoding: 'utf8', timeout: 20000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /missing|not found/i);
    assert.doesNotMatch(result.stdout + result.stderr, /skipped/i);
  } finally { fs.rmSync(missing, { recursive: true, force: true }); }
});

test('contract snapshots detect each source change and missing baseline without flagging unrelated files or Windows newlines', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'story-manga-contract-'));
  const baseline = { files: {} };
  try {
    for (const file of contractSourceFiles) {
      const text = fs.readFileSync(path.join(defaultNanoRoot, file), 'utf8');
      const target = path.join(scratch, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, text.replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n'));
      baseline.files[file] = sourceHash(text);
    }
    fs.writeFileSync(path.join(scratch, 'unrelated.txt'), 'A separate application feature changed.');
    assert.deepEqual(checkContractSources(scratch, baseline), []);
    for (const file of contractSourceFiles) {
      const target = path.join(scratch, file);
      const original = fs.readFileSync(target, 'utf8');
      fs.appendFileSync(target, '\n// changed contract behavior\n');
      assert.deepEqual(checkContractSources(scratch, baseline).map(error => error.includes(file)), [true]);
      fs.writeFileSync(target, original);
    }
    const removed = contractSourceFiles[0];
    fs.rmSync(path.join(scratch, removed));
    assert.match(checkContractSources(scratch, baseline).join('\n'), /Missing manga contract source/);
    assert.match(checkContractSources(scratch, { files: {} }).join('\n'), /Missing reviewed baseline/);
  } finally { fs.rmSync(scratch, { recursive: true, force: true }); }
});

test('the actual command blocks an unreviewed parser change before running compatibility cases', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'story-manga-drift-'));
  try {
    for (const file of [...contractSourceFiles, 'src/lib/prompts.js']) {
      const target = path.join(scratch, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(defaultNanoRoot, file), target);
    }
    const parser = path.join(scratch, 'src/lib/scenario-validation.js');
    fs.writeFileSync(parser, fs.readFileSync(parser, 'utf8').replace('return [4, 4]', 'return [5, 5]'));
    const result = spawnSync(process.execPath, ['scripts/check-nano-4koma-contract.mjs'], {
      cwd: root, env: { ...process.env, NANO_BANANA_PRO_ROOT: scratch }, encoding: 'utf8', timeout: 20000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /source changed: src\/lib\/scenario-validation.js/);
    assert.doesNotMatch(result.stdout, /cases passed/);
  } finally { fs.rmSync(scratch, { recursive: true, force: true }); }
});
