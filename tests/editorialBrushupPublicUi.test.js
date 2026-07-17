import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const runtime = fs.readFileSync(new URL('../src/publicRuntime.js', import.meta.url), 'utf8');
const style = fs.readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');

assert.match(html, /この小説をブラッシュアップ/);
assert.match(html, /高得点を目指して自動ブラッシュアップ（最大3回）/);
assert.match(html, /100点を目標に、85点以上でも最大3回まで改善を継続/);
assert.match(html, /85〜89点は公開可能、90点以上は編集合格/);
assert.doesNotMatch(html, /id="longify-target-chars"/);
assert.doesNotMatch(html, />この小説を長編化</);
assert.match(runtime, /installEditorialBrushupRuntime/);
assert.doesNotMatch(runtime, /installLongifyBetaOnce\(\)/);
assert.match(style, /\.editorial-review-detail/);
assert.match(style, /\.editorial-review-problems/);
assert.match(style, /\.editorial-review-revision-plan/);

console.log('editorial brushup public UI tests passed');
