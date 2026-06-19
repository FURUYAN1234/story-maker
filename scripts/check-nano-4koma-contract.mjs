import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nanoRoot = process.env.NANO_BANANA_PRO_ROOT
  ? path.resolve(process.env.NANO_BANANA_PRO_ROOT)
  : path.resolve(rootDir, '..', 'nano-banana-pro');

const nanoPromptFile = path.join(nanoRoot, 'src', 'lib', 'prompts.js');
const expectedNanoStep2Hash = '8c9925b01db83c345fe9174932d9e9a00ed5dc8e5be8118f4dbb9c3a5a0fbadc';

function fail(message) {
  console.error(`[nano-4koma-contract] ${message}`);
  process.exitCode = 1;
}

function readText(file) {
  return fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
}

function hash(text) {
  return crypto.createHash('sha256').update(text.trim()).digest('hex');
}

function extractNanoStep2Contract(source) {
  const startToken = '[1コマ目: 起]';
  const endToken = '全てのセリフの末尾に必ず';
  const start = source.indexOf(startToken);
  if (start < 0) return '';
  const end = source.indexOf(endToken, start);
  if (end < 0) return '';
  const lineEnd = source.indexOf('\n', end);
  return source.slice(start, lineEnd >= 0 ? lineEnd : end + endToken.length).trim();
}

if (!fs.existsSync(nanoPromptFile)) {
  console.warn(`[nano-4koma-contract] skipped: Nano Banana Pro prompt source not found at ${nanoPromptFile}`);
  process.exit(0);
}

const nanoSource = readText(nanoPromptFile);
const nanoContract = extractNanoStep2Contract(nanoSource);
if (!nanoContract) {
  fail('Nano Banana Pro STEP2 contract block was not found. Review Story Maker 4koma_scenario before deploy.');
} else {
  const currentHash = hash(nanoContract);
  if (currentHash !== expectedNanoStep2Hash) {
    fail(`Nano Banana Pro STEP2 contract changed. Expected ${expectedNanoStep2Hash}, got ${currentHash}. Review Story Maker 4koma_scenario before deploy.`);
  }
}

const storyChecks = [
  {
    file: 'src/promptBuilder.js',
    markers: ['状況:', 'キャラ名「短いセリフ。', 'セリフなし', '台詞なし'],
  },
  {
    file: 'src/modeContracts.js',
    markers: ['「[EMOTION:]」「[Camera:]」「状況:」「絵:」「セリフ:」「演出:」「狙い:」', 'キャラ名「短いセリフ。'],
  },
  {
    file: 'src/prompt.js',
    markers: ['最新のNano Banana Pro STEP2互換', '状況:', 'キャラ名「短いセリフ。'],
  },
  {
    file: 'src/qualityBoost.js',
    markers: ['「[EMOTION:]」「[Camera:]」「状況:」「絵:」「セリフ:」「演出:」「狙い:」', 'キャラ名「短いセリフ。'],
  },
  {
    file: 'src/legacyMain.js',
    markers: ['"状況:"', 'キャラ名「短いセリフ。', 'セリフなし', '台詞なし'],
  },
];

for (const check of storyChecks) {
  const absolute = path.join(rootDir, check.file);
  const source = readText(absolute);
  for (const marker of check.markers) {
    if (!source.includes(marker)) {
      fail(`${check.file} is missing Nano 4koma marker: ${marker}`);
    }
  }
}

if (!process.exitCode) {
  console.log('[nano-4koma-contract] Story Maker 4koma_scenario matches the pinned Nano Banana Pro STEP2 contract.');
}
