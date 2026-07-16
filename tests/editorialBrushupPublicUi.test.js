import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const runtime = fs.readFileSync(new URL('../src/publicRuntime.js', import.meta.url), 'utf8');

assert.match(html, /この小説をブラッシュアップ/);
assert.match(html, /要ブラッシュアップ時に自動ブラッシュアップ（最大3回）/);
assert.match(html, /85〜89点は公開可能・任意ブラッシュアップ/);
assert.doesNotMatch(html, /id="longify-target-chars"/);
assert.doesNotMatch(html, />この小説を長編化</);
assert.match(runtime, /installEditorialBrushupRuntime/);
assert.doesNotMatch(runtime, /installLongifyBetaOnce\(\)/);

console.log('editorial brushup public UI tests passed');
