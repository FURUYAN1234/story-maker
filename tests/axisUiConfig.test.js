import assert from 'node:assert/strict';
import { createAxisUiConfig } from '../src/axisUiConfig.js';

const categories = {
  theme: { A: ['theme-a'] },
  genre: { A: ['genre-a'] },
  worldview: { A: ['world-a'] },
  target: { A: ['target-a'] },
  era: { A: ['era-a'] },
  ending: { A: ['ending-a'] },
  narr: { A: ['narr-a'] },
};

const config = createAxisUiConfig(categories);

assert.deepEqual(Object.keys(config), ['theme', 'genre', 'worldview', 'target', 'era', 'ending', 'narr']);
assert.equal(config.theme.catId, 'theme-cat-chips');
assert.equal(config.theme.stateKey, 'themeSelected');
assert.equal(config.theme.catKey, 'themeCategory');
assert.equal(config.theme.lockKey, 'theme');
assert.equal(config.theme.categories, categories.theme);

assert.equal(config.genre.customId, 'genre-custom');
assert.equal(config.genre.stateKey, 'genre');
assert.equal(config.worldview.subId, 'worldview-sub-chips');
assert.equal(config.target.clearId, 'target-custom-clear');
assert.equal(config.era.catKey, 'eraCategory');
assert.equal(config.ending.lockKey, 'ending');
assert.equal(config.narr.customId, 'narr-custom');
assert.equal(config.narr.stateKey, 'narration');
assert.equal(config.narr.categories, categories.narr);

console.log('axisUiConfig tests passed');
