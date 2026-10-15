import assert from 'node:assert/strict';
import { Sf, bf, wf, $f } from '../src/characterImportParsing.js';
import { yf } from '../src/characterImportPrompt.js';

assert.match(yf, /"characters"\s*:\s*\[/, 'JSON object mode requires a shared object envelope');
assert.throws(() => wf('[{"panel":1},{"panel":2}]'), /キャラクター情報/);
assert.throws(() => wf('{"other":[{"name":"not a character result"}]}'), /キャラクター情報/);
assert.throws(() => wf('[{"name":17,"note":"coat"}]'), /キャラクター情報/);
assert.equal(wf('{"characters":[{"name":"","note":"Short silver hair and a green coat."}]}')[0].note,'Short silver hair and a green coat.');

const repaired = bf('[{"name":"葵","note":"一行目\n二行目"}]');
assert.match(repaired, /一行目\\n二行目/);

const originalWarn = console.warn;
console.warn = () => {};
let parsed;
try {
  parsed = wf(`前置き
\`\`\`json
[
  {
    "name": "葵",
    "role": "主人公(推定)",
    "personality": "元気(推定)",
    "note": "和紙を握っている",
  },
]
\`\`\`
後書き`);
} finally {
  console.warn = originalWarn;
}

assert.equal(parsed.length, 1);
assert.equal(parsed[0].name, '葵');
assert.equal(parsed[0].role, '主人公(推定)');
assert.equal(parsed[0].personality, '元気(推定)');
assert.equal(parsed[0].note, '和紙を握っている');

assert.equal($f('主人公(推定)'), '主人公');
assert.equal(Sf('元気(推定)'), '元気');
assert.equal($f('独自役割'), '独自役割');
assert.equal(Sf('独自性格'), '独自性格');
assert.throws(() => wf('jsonなし'), /キャラクター情報を抽出できませんでした/);

console.log('characterImportParsing tests passed');
