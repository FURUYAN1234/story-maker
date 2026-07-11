import assert from 'node:assert/strict';
import {
  LONG_OUTPUT_INACTIVITY_TIMEOUT_MS,
  getGenerationTimeoutMs,
} from '../src/generationTimeoutPolicy.js';

assert.equal(LONG_OUTPUT_INACTIVITY_TIMEOUT_MS, 600000);
assert.equal(getGenerationTimeoutMs({ stage: 'generation', mode: 'long_10000' }), 600000);
assert.equal(getGenerationTimeoutMs({ stage: 'brushup', mode: 'short', charLength: 12000 }), 600000);
assert.equal(getGenerationTimeoutMs({ stage: 'brushup', mode: 'long_10000', charLength: 5000 }), 600000);
assert.equal(getGenerationTimeoutMs({ stage: 'review', mode: 'long_10000', charLength: 20000 }), null);
assert.equal(getGenerationTimeoutMs({ stage: 'generation', mode: 'novel', charLength: 2000 }), null);

console.log('generation timeout policy tests passed');
