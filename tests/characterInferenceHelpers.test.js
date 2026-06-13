import assert from 'node:assert/strict';
import {
  inferSexFromDescription,
  inferSexFromName,
} from '../src/characterInferenceHelpers.js';

assert.equal(inferSexFromName('健太'), 'M');
assert.equal(inferSexFromName('陽子'), 'F');
assert.equal(inferSexFromName('空'), null);
assert.equal(inferSexFromName(''), null);
assert.equal(inferSexFromName(null), null);

assert.equal(inferSexFromDescription('男性, 短髪'), 'M');
assert.equal(inferSexFromDescription('男, 眼鏡'), 'M');
assert.equal(inferSexFromDescription('女性, ポニーテール'), 'F');
assert.equal(inferSexFromDescription('女, 柔らかい雰囲気'), 'F');
assert.equal(inferSexFromDescription('無性'), null);
assert.equal(inferSexFromDescription(''), null);

console.log('characterInferenceHelpers tests passed');

