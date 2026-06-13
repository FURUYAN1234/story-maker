import assert from 'node:assert/strict';
import {
  buildDefaultAxisPreset,
  findModeLabel,
  pickCategoryTuple,
} from '../src/modeDefaultHelpers.js';

const modes = [
  { value: 'short', label: 'ショート' },
  { value: 'novel', label: '小説' },
];

assert.equal(findModeLabel(modes, 'novel'), '小説');
assert.equal(findModeLabel(modes, 'missing'), 'ショート');
assert.equal(findModeLabel([], 'missing'), '');

const categories = {
  A: ['a1', 'a2'],
  B: ['b1', 'b2'],
};

assert.deepEqual(pickCategoryTuple(categories, 1, 1), ['B', 'b2']);
assert.deepEqual(pickCategoryTuple(categories, 9, 9), ['A', 'a1']);
assert.deepEqual(pickCategoryTuple({}, 0, 0), ['', '']);

const preset = buildDefaultAxisPreset(
  { themeCat: 1, themeVal: 0, genreCat: 0, genreVal: 1 },
  {
    theme: { T0: ['t0'], T1: ['t1'] },
    genre: { G0: ['g0', 'g1'] },
    worldview: { W0: ['w0'] },
    target: { TA0: ['ta0'] },
    era: { E0: ['e0'] },
    ending: { EN0: ['en0'] },
    narr: { N0: ['n0'] },
  },
);

assert.deepEqual(preset.theme, ['T1', 't1']);
assert.deepEqual(preset.genre, ['G0', 'g1']);
assert.deepEqual(preset.narr, ['N0', 'n0']);

console.log('modeDefaultHelpers tests passed');
