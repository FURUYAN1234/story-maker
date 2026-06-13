import assert from 'node:assert/strict';

import {
  Hs,
  Js,
  Vd,
  fo,
  ia,
  xr,
} from '../src/apiErrorHelpers.js';

assert.equal(Hs('Blocked by Safety Filter'), true);
assert.equal(Js('429 resource exhausted'), true);
assert.equal(fo('API key not valid'), true);
assert.equal(Vd('Available Models: gemini-2.5-flash'), true);
assert.equal(ia('thinking_config invalid_argument'), true);

assert.equal(
  xr('Gemini text failure', 'Blocked by Safety Filter', [], { safety: true }),
  '【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。',
);

assert.equal(
  xr('Gemini vision failure', 'Blocked by Safety Filter', [], { safety: true, vision: true }),
  '【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。',
);

assert.equal(
  xr('Gemini text failure', 'Diagnostic Failed: API key not valid', [], { auth: true }),
  '【認証エラー】APIキーが無効です。正しいキーを設定してください。',
);

assert.match(
  xr('Gemini text failure', 'Available Models: gemini-2.5-flash', ['gemini-pro: 404 not found']),
  /利用可能モデルまたは送信形式で失敗しました。/,
);

console.log('api error helper tests passed');
