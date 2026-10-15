import assert from 'node:assert/strict';
import { yf } from '../src/characterImportPrompt.js';

assert.ok(yf.length > 500);
assert.match(yf, /JSON/);
assert.match(yf, /JSONオブジェクト/);
const example = JSON.parse(yf.split('出力例:\n')[1]);
assert.ok(Array.isArray(example.characters));
assert.ok(example.characters.length > 0);
assert.deepEqual(Object.keys(example.characters[0]).sort(), ['name', 'sex', 'role', 'personality', 'note'].sort());
assert.match(yf, /name/);
assert.match(yf, /sex/);
assert.match(yf, /role/);
assert.match(yf, /personality/);
assert.match(yf, /note/);
assert.match(yf, /アニメ\/漫画/);
assert.match(yf, /キャラクターシート/);
assert.match(yf, /説明文・挨拶・マークダウン装飾は一切不要/);
assert.match(yf, /コードブロックで囲まず/);

console.log('characterImportPrompt tests passed');
