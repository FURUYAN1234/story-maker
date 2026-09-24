import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const testsDir = path.join(root, 'tests');
const tests = fs.readdirSync(testsDir)
  .filter((name) => name.endsWith('.test.js'))
  .sort()
  .map((name) => path.join('tests', name));

if (!tests.length) {
  console.error('No test files were found.');
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...tests], {
  cwd: root,
  encoding: 'utf8',
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
