import assert from 'node:assert/strict';
import { Sf, bf, wf, $f } from '../src/characterImportParsing.js';

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
