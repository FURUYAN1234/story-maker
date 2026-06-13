import assert from 'node:assert/strict';
import { createModeDefaultPresets } from '../src/modeDefaultPresets.js';

const calls = [];
const presets = createModeDefaultPresets((spec) => {
  calls.push(spec);
  return { ...spec, marker: calls.length };
});

assert.deepEqual(Object.keys(presets), [
  'default',
  '4koma',
  '4koma_scenario',
  'short_short',
  'novel',
  'medium',
  'long',
  'scenario',
  'manga',
  'essay',
  'poem',
  'fairy',
  'letter',
  'diary',
  'documentary',
  'radio',
]);

assert.equal(presets.default, presets['4koma']);
assert.equal(presets.default, presets['4koma_scenario']);
assert.notEqual(presets.default, presets.short_short);
assert.equal(calls.length, 14);

assert.deepEqual(presets.default, {
  themeCat: 0,
  themeVal: 0,
  genreCat: 0,
  genreVal: 1,
  worldCat: 0,
  worldVal: 5,
  targetCat: 0,
  targetVal: 2,
  eraCat: 0,
  eraVal: 0,
  endingCat: 0,
  endingVal: 0,
  narrCat: 1,
  narrVal: 1,
  marker: 1,
});

assert.equal(presets.short_short.themeVal, 6);
assert.equal(presets.novel.genreCat, 5);
assert.equal(presets.medium.endingVal, 2);
assert.equal(presets.long.narrVal, 3);
assert.equal(presets.scenario.narrCat, 2);
assert.equal(presets.manga.worldCat, 4);
assert.equal(presets.essay.endingCat, 4);
assert.equal(presets.poem.genreVal, 5);
assert.equal(presets.fairy.eraCat, 5);
assert.equal(presets.letter.genreVal, 4);
assert.equal(presets.diary.themeVal, 9);
assert.equal(presets.documentary.eraCat, 1);
assert.equal(presets.radio.genreVal, 6);

console.log('modeDefaultPresets tests passed');
