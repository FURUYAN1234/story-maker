import assert from 'node:assert/strict';

import {
  hf,
  ho,
  ma,
  ns,
  Wd,
} from '../src/selectionHelpers.js';

const first = items => items && items.length ? items[0] : null;

assert.equal(Wd('AIとの恋'), true);
assert.equal(Wd('雨の日'), false);
assert.equal(ns('SF・近未来'), true);
assert.equal(ns('日常・生活'), false);

assert.deepEqual(ho(['雨の日', 'AIとの恋'], false), ['雨の日']);
assert.deepEqual(ho(['AIとの恋'], false), ['AIとの恋']);
assert.deepEqual(ho(['AIとの恋'], true), ['AIとの恋']);

assert.deepEqual(
  ma({
    '日常・生活': ['雨の日', 'AIとの恋'],
    'SF・近未来': ['AIとの恋'],
  }, '日常・生活', false, first),
  ['日常・生活', '雨の日'],
);

assert.deepEqual(
  ma({
    'SF・近未来': ['AIとの恋'],
  }, 'SF・近未来', false, first),
  ['SF・近未来', 'AIとの恋'],
);

assert.equal(hf(1234.4), 1234);
assert.equal(hf('1.5万字'), 15000);
assert.equal(hf('１２，３４５字'), 12345);
assert.equal(hf('約900字'), 0);

console.log('selection helper tests passed');
