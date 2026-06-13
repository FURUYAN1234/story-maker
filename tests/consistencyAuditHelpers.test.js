import assert from 'node:assert/strict';
import { E, Hf, Ko, ep, qf, rs, tp } from '../src/consistencyAuditHelpers.js';

const settings = {
  genre: 'ミステリー',
  era: '昭和',
  worldview: '商店街',
  characters: [
    {
      name: '太郎',
      sex: '男性',
      role: '主人公',
      personality: '慎重',
      note: '眼鏡をかけた店員',
    },
  ],
};

assert.match(rs(settings), /太郎/);
assert.match(rs(settings), /主人公/);
assert.match(tp(settings), /昭和/);
assert.match(tp(settings), /商店街/);
assert.match(tp(settings), /ミステリー/);

const standardPrompt = qf('太郎は朝に店へ来た。次の行で三日前から店にいたと言われた。', settings);
assert.match(standardPrompt, /明確な事実矛盾/);
assert.match(standardPrompt, /キャラクター不整合/);
assert.match(standardPrompt, /太郎/);
assert.match(standardPrompt, /\[\]/);

const longPrompt = Ko('第2章の本文', 2, settings, '第1章メモ', '第1章本文', false);
assert.match(longPrompt, /第2章/);
assert.match(longPrompt, /第1章メモ/);
assert.match(longPrompt, /第1章本文/);
assert.match(longPrompt, /最終章ではありません/);

const issues = Hf(`前置き
[
  {"type":"設定矛盾","severity":"重大","location":"店の奥","description":"所在地が説明なく変わる"}
]
後書き`);
assert.deepEqual(issues, [
  {
    type: '設定矛盾',
    severity: '重大',
    location: '店の奥',
    description: '所在地が説明なく変わる',
  },
]);

const repairPrompt = E('修正前の本文', issues, settings, {
  recentChaptersFull: '第1章本文',
  allContextMemos: '第1章メモ',
});
assert.match(repairPrompt, /修正対象テキスト/);
assert.match(repairPrompt, /設定矛盾/);
assert.match(repairPrompt, /修正後のテキスト/);

const log = ep(issues, 2);
assert.match(log, /第2章/);
assert.match(log, /設定矛盾/);

console.log('consistencyAuditHelpers tests passed');
