import assert from 'node:assert/strict';
import { yf } from '../src/characterImportPrompt.js';

assert.ok(yf.length > 500);
assert.match(yf, /JSON/);
assert.match(yf, /JSON配列/);
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
