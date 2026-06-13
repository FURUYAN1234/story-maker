import assert from 'node:assert/strict';

import { ff } from '../src/randomThemeFallback.js';

const withMockedRandom = (value, fn) => {
  const original = Math.random;
  Math.random = () => value;
  try {
    return fn();
  } finally {
    Math.random = original;
  }
};

const lowRandomTheme = withMockedRandom(0, () => ff());
const highRandomTheme = withMockedRandom(0.99, () => ff());

assert.equal(typeof lowRandomTheme, 'string');
assert.equal(typeof highRandomTheme, 'string');
assert.ok(lowRandomTheme.trim().length > 0);
assert.ok(highRandomTheme.trim().length > 0);
assert.match(lowRandomTheme, /（笑いあり涙あり）/);
assert.doesNotMatch(highRandomTheme, /（笑いあり涙あり）/);

