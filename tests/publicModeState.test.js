import assert from 'node:assert/strict';

import {
  collectPublicModeSignal,
  isLongModeSignal,
  normalizePublicModeOptions,
  pickPublicModeOption,
  resolveOutputModeFromText,
} from '../src/publicModeState.js';

assert.equal(isLongModeSignal('long'), true);
assert.equal(isLongModeSignal('long-novel'), true);
assert.equal(isLongModeSignal('long_10000 \u9577\u7de8\uff0810000\u5b57\uff5e\uff09'), false);
assert.equal(isLongModeSignal('長編小説'), true);
assert.equal(isLongModeSignal('短編小説'), false);

assert.equal(
  collectPublicModeSignal({
    state: { mode: 'novel', modeCustom: '短編小説' },
    modeCustomInputValue: '入力欄',
    activeModeValue: 'chip',
  }),
  'novel 短編小説 入力欄 chip',
);

const fallbackOptions = [
  { value: '4koma', label: '4コマ漫画風' },
  { value: 'long', label: '長編小説' },
  { value: 'novel', label: '短編小説' },
];

assert.deepEqual(
  normalizePublicModeOptions([
    { value: ' long ', label: '長編小説' },
    { value: 'medium', label: '中編小説' },
    { value: '', label: 'blank' },
    { value: 'radio', label: 'ラジオドラマ' },
  ], fallbackOptions).map((option) => [option.value, option.label]),
  [
    ['medium', '中編小説'],
    ['radio', 'ラジオドラマ'],
  ],
);

assert.deepEqual(
  normalizePublicModeOptions([], fallbackOptions).map((option) => option.value),
  ['4koma', 'novel'],
);

assert.deepEqual(
  normalizePublicModeOptions([
    { value: 'novel', label: '\u77ed\u7de8\u5c0f\u8aac' },
    { value: 'long_10000', label: '\u9577\u7de8\uff0810000\u5b57\uff5e\uff09' },
    { value: 'long', label: '\u9577\u7de8\u5c0f\u8aac' },
  ]).map((option) => option.value),
  ['novel', 'long_10000'],
);

assert.equal(
  pickPublicModeOption([
    { value: '4koma' },
    { value: 'novel' },
    { value: 'radio' },
  ], '4koma', () => 0).value,
  'novel',
);
assert.equal(
  pickPublicModeOption([
    { value: '4koma' },
    { value: 'novel' },
    { value: 'radio' },
  ], '4koma', () => 0.99).value,
  'radio',
);
assert.equal(pickPublicModeOption([], 'novel'), null);

assert.equal(resolveOutputModeFromText('AI 4koma シナリオ連携 STEP2'), '4koma_scenario');
assert.equal(resolveOutputModeFromText('四コマ'), '4koma');
assert.equal(resolveOutputModeFromText('ショート掌編'), 'short_short');
assert.equal(resolveOutputModeFromText('短編小説'), 'novel');
assert.equal(resolveOutputModeFromText('ラジオドラマ'), 'radio');
assert.equal(resolveOutputModeFromText('', 'novel'), 'novel');

console.log('publicModeState tests passed');
