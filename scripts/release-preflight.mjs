import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateBilingualReleaseNotes } from './releaseGate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = process.argv[2] ?? packageJson.version;
const notesPath = path.join(root, 'docs', 'releases', 'v' + version + '.md');
const errors = [];

if (!fs.existsSync(notesPath)) {
  errors.push('Missing versioned release notes: ' + path.relative(root, notesPath) + '.');
} else {
  errors.push(...validateBilingualReleaseNotes(fs.readFileSync(notesPath, 'utf8'), version));
}

for (const file of ['index.html', 'README.md']) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  if (!content.includes('v' + version)) errors.push(file + ' must contain v' + version + '.');
}

if (errors.length) {
  console.error('Release preflight failed:');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log('Release preflight passed for v' + version + '.');
