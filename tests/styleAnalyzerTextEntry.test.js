import assert from 'node:assert/strict';
import { createDirectStyleTextEntry } from '../src/styleAnalyzerTextEntry.js';

assert.equal(createDirectStyleTextEntry('   ', 0), null);

assert.deepEqual(createDirectStyleTextEntry('  本文メモ  ', 0), {
  name: '直接入力テキスト_1',
  text: '本文メモ',
  charCount: 4,
});

assert.deepEqual(createDirectStyleTextEntry('\n雨の匂い\n', 2), {
  name: '直接入力テキスト_3',
  text: '雨の匂い',
  charCount: 4,
});

console.log('styleAnalyzerTextEntry tests passed');
