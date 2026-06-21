import assert from 'node:assert/strict';

import {
  DEFAULT_OUTPUT_MODE_OPTIONS,
  buildFinalOutputFormatCheck,
  buildLineBreakDensityCheck,
  buildOutputModeContractV497,
  buildOutputModeStrictContract,
  getOutputModeLabel,
  prependOutputModeStrictContract,
} from '../src/outputModeContracts.js';

const strict4komaScenario = buildOutputModeStrictContract({
  mode: '4koma_scenario',
  modeLabel: 'AI 4koma シナリオ連携',
});

assert.match(strict4komaScenario, /v4\.9\.5 出力モード厳守/);
assert.match(strict4komaScenario, /AI 4koma シナリオ連携/);
assert.match(strict4komaScenario, /Outfit:/);
assert.match(strict4komaScenario, /\[1コマ目\]/);
assert.match(strict4komaScenario, /最終出力は必ずこのモードの形式だけで書く/);

assert.equal(buildOutputModeStrictContract({ mode: 'long' }), '');
assert.equal(buildOutputModeStrictContract({ mode: 'novel', axisText: '長編寄り' }), '');

assert.equal(
  prependOutputModeStrictContract('本文', strict4komaScenario),
  strict4komaScenario + '本文',
);
assert.equal(
  prependOutputModeStrictContract(strict4komaScenario + '本文', strict4komaScenario),
  strict4komaScenario + '本文',
);

const essayFormatCheck = buildFinalOutputFormatCheck({
  mode: 'essay',
  modeLabel: 'エッセイ',
});
assert.match(essayFormatCheck, /最終出力形式チェック/);
assert.match(essayFormatCheck, /エッセイ/);
assert.match(essayFormatCheck, /主張:/);
assert.match(essayFormatCheck, /観察:/);

const mediumLineBreakCheck = buildLineBreakDensityCheck({
  mode: 'medium',
  modeLabel: '中編小説',
});
assert.match(mediumLineBreakCheck, /v4\.9\.6 改行密度チェック/);
assert.match(mediumLineBreakCheck, /第1節、第2節、第3節/);

const radioLineBreakCheck = buildLineBreakDensityCheck({
  mode: 'radio',
  modeLabel: 'ラジオドラマ',
});
assert.match(radioLineBreakCheck, /必須ラベル/);
assert.match(radioLineBreakCheck, /出力モードごとの読み取り単位/);

const letterContract = buildOutputModeContractV497({
  mode: 'letter',
  modeLabel: getOutputModeLabel('letter'),
});
assert.match(letterContract, /v4\.9\.7 出力モード契約/);
assert.match(letterContract, /宛先:/);
assert.match(letterContract, /本文は1400字以上/);

assert.equal(getOutputModeLabel('short_short'), 'ショート');
assert.ok(DEFAULT_OUTPUT_MODE_OPTIONS.some((option) => option.value === '4koma_scenario'));
assert.ok(!DEFAULT_OUTPUT_MODE_OPTIONS.some((option) => option.value === 'long'));

console.log('outputModeContracts tests passed');
