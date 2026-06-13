import assert from 'node:assert/strict';
import {
  canRandomizeAxis,
  clearDefaultFilledForStateKey,
  getAxisSource,
  hasAxisStateSelection,
  isAxisUserOwned,
  setAxisSource,
  stateKeyToAxis,
} from '../src/axisStateHelpers.js';

assert.equal(stateKeyToAxis('themeSelected'), 'theme');
assert.equal(stateKeyToAxis('narration'), 'narr');
assert.equal(stateKeyToAxis('unknown'), null);

const state = {
  locked: { theme: false, genre: false, target: true },
  axisSource: {},
  defaultFilled: { theme: '日常', genre: 'コメディ' },
  themeSelected: 'コンビニ',
  genre: '',
};
const meta = {
  theme: { stateKey: 'themeSelected', catKey: 'themeCategory' },
  genre: { stateKey: 'genre', catKey: 'genreCategory' },
};

setAxisSource(state, 'theme', 'manual');
assert.equal(getAxisSource(state, 'theme'), 'manual');
setAxisSource(state, 'theme', null);
assert.equal(getAxisSource(state, 'theme'), null);
setAxisSource(state, '', 'manual');
assert.deepEqual(state.axisSource, {});

clearDefaultFilledForStateKey(state, 'themeSelected');
assert.deepEqual(state.defaultFilled, { genre: 'コメディ' });
clearDefaultFilledForStateKey(state, 'unknown');
assert.deepEqual(state.defaultFilled, { genre: 'コメディ' });

assert.equal(hasAxisStateSelection(state, meta, 'theme'), true);
assert.equal(hasAxisStateSelection(state, meta, 'genre'), false);
assert.equal(hasAxisStateSelection(state, meta, 'genre', '直接指定'), true);

setAxisSource(state, 'theme', 'manual');
assert.equal(isAxisUserOwned(state, 'theme'), true);
setAxisSource(state, 'theme', 'selectedDetail');
assert.equal(isAxisUserOwned(state, 'theme'), true);
setAxisSource(state, 'theme', 'default');
assert.equal(isAxisUserOwned(state, 'theme', '直接指定'), false);
setAxisSource(state, 'theme', 'random');
assert.equal(isAxisUserOwned(state, 'theme', '', '分類'), false);
setAxisSource(state, 'theme', null);
assert.equal(isAxisUserOwned(state, 'theme', '直接指定'), true);
assert.equal(isAxisUserOwned(state, 'target'), true);

state.locked.target = false;
assert.equal(canRandomizeAxis(state, 'theme'), true);
setAxisSource(state, 'theme', 'manual');
assert.equal(canRandomizeAxis(state, 'theme'), false);
state.locked.theme = true;
assert.equal(canRandomizeAxis(state, 'theme'), false);

console.log('axisStateHelpers tests passed');

