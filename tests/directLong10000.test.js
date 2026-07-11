import assert from 'node:assert/strict';
import {
  DIRECT_LONG_10000_MIN_CHARS,
  DIRECT_LONG_10000_MODE,
  buildDirectLong10000Contract,
  isDirectLong10000Mode,
  submissionCharLength,
  validateDirectLong10000,
} from '../src/directLong10000.js';
import { buildPrompt } from '../src/prompt.js';
import { Jo as buildLegacyRuntimePrompt } from '../src/promptBuilder.js';
import { isLongModeText } from '../src/modeContracts.js';

assert.equal(DIRECT_LONG_10000_MODE, 'long_10000');
assert.equal(DIRECT_LONG_10000_MIN_CHARS, 10000);
assert.equal(isDirectLong10000Mode('long_10000'), true);
assert.equal(isDirectLong10000Mode('long'), false);
assert.equal(isDirectLong10000Mode('medium'), false);

assert.equal(submissionCharLength('あ い\nう\tえ'), 4);

const contract = buildDirectLong10000Contract();
assert.match(contract, /10,000字以上/);
assert.match(contract, /最初から/);
assert.match(contract, /【完】/);
assert.doesNotMatch(contract, /短編原稿/);

const directPrompt = buildPrompt({
  mode: 'long_10000',
  modeCustom: '長編（10000字～）',
  themeCustom: '雨の日の約束',
  genreCustom: 'ヒューマンドラマ',
});
assert.match(directPrompt, /【長編（10000字）直接生成契約】/);
assert.match(directPrompt, /10,000字以上/);

const runtimePrompt = buildLegacyRuntimePrompt({
  mode: 'long_10000',
  modeCustom: '長編（10000字～）',
  themeCustom: '雨の日の約束',
  genreCustom: 'ヒューマンドラマ',
});
assert.doesNotMatch(runtimePrompt.prompt, /長編モードは現在機能停止中/);
assert.match(runtimePrompt.prompt, /【長編（10000字）直接生成契約】/);
assert.match(runtimePrompt.prompt, /10,000字以上/);
assert.equal(isLongModeText('出力モード: 長編（10000字） / long_10000'), false);
assert.equal(isLongModeText('出力モード: 長編（10000字～）'), false);
assert.equal(isLongModeText('旧長編小説 / long novel'), true);

assert.deepEqual(validateDirectLong10000('').issues, ['empty_output', 'target_length', 'unclosed_ending']);
assert.equal(validateDirectLong10000('あ'.repeat(9999)).issues.includes('target_length'), true);

const passing = validateDirectLong10000(`${'あ'.repeat(10000)}。\n【完】`);
assert.equal(passing.ok, true, JSON.stringify(passing));
assert.equal(passing.charCount >= 10000, true);

const passingAfterPublicCleanup = validateDirectLong10000(`${'あ'.repeat(10000)}。`);
assert.equal(passingAfterPublicCleanup.ok, true, JSON.stringify(passingAfterPublicCleanup));

const passingWithFooter = validateDirectLong10000(
  `${'あ'.repeat(10000)}。\n【完】\n\nCreated By AI Story Maker V5.3.0`,
);
assert.equal(passingWithFooter.ok, true, JSON.stringify(passingWithFooter));

const unclosed = validateDirectLong10000(`${'あ'.repeat(10000)}。\nつづく`);
assert.equal(unclosed.issues.includes('unclosed_ending'), true);

const repeatedParagraph = '異なる選択と代償を描くための十分に長い同一段落です。'.repeat(3);
const repeated = validateDirectLong10000(`${'あ'.repeat(10000)}。\n\n${repeatedParagraph}\n\n${repeatedParagraph}\n【完】`);
assert.equal(repeated.issues.includes('duplicate_paragraph'), true);

console.log('direct long 10000 contract tests passed');
