import assert from 'node:assert/strict';
import {
  countStyleAnalyzerTextFileChars,
  createDirectStyleTextEntry,
  createStyleAnalyzerFileCountLabel,
} from '../src/styleAnalyzerTextEntry.js';

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

assert.equal(countStyleAnalyzerTextFileChars([{ charCount: 1200 }, { charCount: 34 }]), 1234);
assert.equal(createStyleAnalyzerFileCountLabel([{ charCount: 1200 }, { charCount: 34 }]), '2件 / 1,234字');
assert.equal(createStyleAnalyzerFileCountLabel([]), '0件 / 0字');
assert.equal(createStyleAnalyzerFileCountLabel(null), '0件 / 0字');

console.log('styleAnalyzerTextEntry tests passed');
