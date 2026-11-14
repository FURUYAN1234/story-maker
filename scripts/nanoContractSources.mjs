import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export const defaultNanoRoot = process.env.NANO_BANANA_PRO_ROOT
  ? path.resolve(process.env.NANO_BANANA_PRO_ROOT)
  : path.resolve(root, '..', 'nano-banana-pro');

// These input-boundary files complement the emitted prompt/rule comparisons.
// A changed hash requests review; it does not prove an incompatibility.
export const contractSourceFiles = [
  'docs/scenario_spec.md',
  'src/lib/scenario-provider.js',
  'src/lib/scenario-validation.js',
  'src/lib/panel-utils.js',
  'src/lib/bubble-text.js',
  'src/lib/manga-page-composition.js',
  'src/lib/story-structure.js',
  'src/lib/ending-mode-policy.js',
  'src/lib/reference-assets.js',
];

export function sourceHash(text) {
  return crypto.createHash('sha256').update(text.replace(/\r\n?/g, '\n')).digest('hex');
}

export function checkContractSources(nanoRoot = defaultNanoRoot, baseline = JSON.parse(
  fs.readFileSync(new URL('./nano-contract-baseline.json', import.meta.url), 'utf8'),
)) {
  const errors = [];
  for (const file of contractSourceFiles) {
    const absolute = path.join(nanoRoot, file);
    if (!fs.existsSync(absolute)) errors.push(`Missing manga contract source: ${file}`);
    else if (!/^[a-f0-9]{64}$/.test(baseline.files?.[file] || '')) errors.push(`Missing reviewed baseline: ${file}`);
    else if (sourceHash(fs.readFileSync(absolute, 'utf8')) !== baseline.files[file]) {
      errors.push(`Manga contract source changed: ${file}. Review the diff and Story Maker compatibility before updating its baseline.`);
    }
  }
  return errors;
}
