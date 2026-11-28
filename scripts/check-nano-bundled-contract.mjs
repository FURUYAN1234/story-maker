import fs from 'node:fs';
import { sourceHash } from './nanoContractSources.mjs';

const baseline = JSON.parse(fs.readFileSync(new URL('./nano-contract-baseline.json', import.meta.url), 'utf8'));
const bundledSources = new Map([
  ['nanoMangaPageComposition.js', 'src/lib/manga-page-composition.js'],
  ['page-production-contract.js', 'src/lib/page-production-contract.js'],
]);

for (const [fileName, upstreamPath] of bundledSources) {
  const file = new URL('../src/vendor/' + fileName, import.meta.url);
  if (!fs.existsSync(file)) {
    console.error('[nano-bundled-contract] Missing bundled file: ' + fileName);
    process.exitCode = 1;
    continue;
  }
  if (sourceHash(fs.readFileSync(file, 'utf8')) !== baseline.files?.[upstreamPath]) {
    console.error('[nano-bundled-contract] Bundled file does not match the reviewed contract: ' + fileName);
    process.exitCode = 1;
  }
}

if (!process.exitCode) console.log('[nano-bundled-contract] The bundled manga contract matches the reviewed source.');
