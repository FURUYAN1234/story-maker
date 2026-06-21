import assert from 'node:assert/strict';
import {
  createStandardLiveProgressHelpers,
  describeStandardLivePhase,
  sanitizeStandardLiveText,
  summarizeStandardLiveSignals,
} from '../src/standardLiveProgress.js';

const mixedStream = [
  '<thought>構成を考える</thought>',
  'タイトル: 雨の棚札',
  '本文が始まる。',
  '【最終自己採点結果】',
  '伏線回収度: 92',
  'Created By AI Story Maker V5.2.1',
].join('\n');

assert.equal(
  sanitizeStandardLiveText(mixedStream),
  'タイトル: 雨の棚札\n本文が始まる。',
  'thought and scoring tails are removed from live preview text',
);

assert.equal(
  sanitizeStandardLiveText('<thought>途中までの思考\nタイトル: 本文'),
  '',
  'unterminated thought blocks are hidden while the model is still thinking',
);

assert.equal(
  describeStandardLivePhase('第1節\n導入', { mode: 'medium' }),
  '第1節: 導入と葛藤を構築中',
);
assert.equal(
  describeStandardLivePhase('第2節\n反転', { mode: 'medium' }),
  '第2節: 反転と関係変化を展開中',
);
assert.equal(
  describeStandardLivePhase('第3節\n余韻', { mode: 'medium' }),
  '第3節: 着地と余韻を形成中',
);

assert.equal(
  describeStandardLivePhase('短い本文'),
  '導入: 人物・舞台・違和感を組み立て中',
);
assert.equal(
  describeStandardLivePhase('あ'.repeat(1200)),
  '展開: 摩擦・選択・伏線を増やし中',
);
assert.equal(
  describeStandardLivePhase('あ'.repeat(3600)),
  '着地: 回収・余韻・後始末を調整中',
);
assert.equal(
  describeStandardLivePhase('本文\n【完】'),
  '終端: 完結マーカーと余韻を確認中',
);

assert.equal(
  summarizeStandardLiveSignals('第2章\n「行こう」\n光と匂い。迷って、手を触れた。'),
  '第2章 / 会話 1 / 感覚描写 3 / 選択語 2',
);

let currentMode = 'medium';
const helpers = createStandardLiveProgressHelpers({ getMode: () => currentMode });
assert.equal(helpers.describePhase('第2節\n本文'), '第2節: 反転と関係変化を展開中');
currentMode = 'novel';
assert.equal(helpers.describePhase('第2節\n本文'), '導入: 人物・舞台・違和感を組み立て中');

console.log('standardLiveProgress tests passed');
