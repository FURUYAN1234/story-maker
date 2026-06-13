import assert from 'node:assert/strict';
import {
  Lt,
  Oe,
  Qf,
  Xf,
  Yf,
  gn,
} from '../src/apiKeyHelpers.js';

assert.equal(Oe('  sk-test_key\n'), 'sk-test_key');
assert.equal(Yf('********'), true);
assert.equal(Yf('sk-test_key'), false);

assert.deepEqual(Xf('  sk-abcdefghijklmnopqrstuvwxyz  ', 'openai'), {
  provider: 'openai',
  length: 29,
  masked: false,
  short: false,
  empty: false,
  badChars: false,
  sanitizedDelta: 4,
});

assert.equal(Lt('', 'gemini').ok, false);
assert.equal(Lt('********', 'gemini').message, 'APIキーがマスク表示のままです。編集ボタンを押して実キーを入力し直してください。');
assert.equal(Lt('abc', 'gemini').message, 'APIキーが短すぎます（3文字）。実キーを入力し直してください。');
assert.equal(Lt('abc$defghijklmnopqrst', 'gemini').message, 'APIキーに使用できない文字が含まれています。コピー時の余分な文字を除いて入力し直してください。');
assert.equal(Lt('AIzaabcdefghijklmnopqrstuvwxyz', 'gemini').ok, true);

assert.equal(gn('sk-abcdefghijklmnopqrstuvwxyz'), 'gpt-4.1');
assert.equal(gn('AIzaabcdefghijklmnopqrstuvwxyz'), 'gemini-2.5-flash');
assert.equal(Qf('sk-abcdefghijklmnopqrstuvwxyz'), 'ChatGPT');
assert.equal(Qf('AIzaabcdefghijklmnopqrstuvwxyz'), 'Gemini');

console.log('apiKeyHelpers tests passed');
