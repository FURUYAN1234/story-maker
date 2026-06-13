import assert from 'node:assert/strict';
import { Ce } from '../src/domHelpers.js';

assert.equal(Ce('<tag attr="a&b">'), '&lt;tag attr="a&amp;b"&gt;');
assert.equal(Ce('plain'), 'plain');
assert.equal(Ce(null), '');
assert.equal(Ce(0), '');

console.log('domHelpers tests passed');
