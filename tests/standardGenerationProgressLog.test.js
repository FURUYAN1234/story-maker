import assert from 'node:assert/strict';
import { formatStandardGenerationProgressLog } from '../src/standardGenerationProgressLog.js';

assert.equal(formatStandardGenerationProgressLog(), '');

assert.equal(
  formatStandardGenerationProgressLog({
    messages: ['[システム] 開始', '[通信] 接続'],
    communicationStatus: '[通信] 待機中...',
  }),
  '[システム] 開始\n[通信] 接続\n[通信] 待機中...\n',
);

const withThought = formatStandardGenerationProgressLog({
  messages: ['A'],
  thoughtText: '\n  思考ログ  \n',
  bodyStatus: '[進捗] 本文を執筆中...',
});

assert.match(withThought, /^A\n\n─+/);
assert.match(withThought, /【AIの思考プロセス \(CoT\)】\n思考ログ\n/);
assert.match(withThought, /\n\[進捗\] 本文を執筆中\.\.\.$/);

assert.equal(
  formatStandardGenerationProgressLog({ messages: ['A', null, undefined, 'B'] }),
  'A\nB\n',
);

console.log('standardGenerationProgressLog tests passed');
