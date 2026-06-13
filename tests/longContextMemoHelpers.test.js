import assert from 'node:assert/strict';

import { A, Zd, mf } from '../src/longContextMemoHelpers.js';

const memo = [
  '--- 第1章の文脈メモ ---',
  '古いメモ。',
  '--- 第2章の文脈メモ ---',
  '【第3章のシーン設計（GMC+S）】',
  '市場で誤解が起きる。',
  '【人物ロスター更新メモ】',
  '葵は相手を疑っている。',
].join('\n');

assert.equal(
  Zd(memo),
  [
    '--- 第2章の文脈メモ ---',
    '【第3章のシーン設計（GMC+S）】',
    '市場で誤解が起きる。',
    '【人物ロスター更新メモ】',
    '葵は相手を疑っている。',
  ].join('\n'),
);

assert.equal(mf(memo, 3), '市場で誤解が起きる。');
assert.equal(Zd(''), '');
assert.equal(mf('', 3), '');

const context = A(3, memo, '前回は第2章の到着を繰り返していた。');

assert.match(context, /第3章の連続性ガード/);
assert.match(context, /第3章で優先する最新GMC\+S/);
assert.match(context, /市場で誤解が起きる。/);
assert.match(context, /直近文脈メモ抜粋/);
assert.match(context, /NEAR-END STRUCTURE LOCK/);
assert.match(context, /前回失敗からの再生成指示/);
assert.match(context, /第2章の到着を繰り返していた/);

const emptyContext = A(4, '', '');

assert.match(emptyContext, /直近の文脈メモなし/);
assert.doesNotMatch(emptyContext, /前回失敗からの再生成指示/);

