import assert from 'node:assert/strict';
import { MODES } from '../src/data.js';
import {
  MODE_LABELS,
  MODE_LENGTH_TARGETS,
  PUBLIC_MODE_VALUES,
} from '../src/modeContracts.js';
import { We } from '../src/legacyOptionData.js';
import { DEFAULT_OUTPUT_MODE_OPTIONS, getOutputModeLabel } from '../src/outputModeContracts.js';

const expectedLabel = '長編（10000字～）';

assert.equal(MODES.find(mode => mode.value === 'long_10000')?.label, expectedLabel);
assert.equal(PUBLIC_MODE_VALUES.includes('long_10000'), true);
assert.equal(MODE_LABELS.long_10000, expectedLabel);
assert.equal(MODE_LENGTH_TARGETS.long_10000.min, 10000);
assert.equal(We.find(mode => mode.value === 'long_10000')?.label, expectedLabel);
assert.equal(DEFAULT_OUTPUT_MODE_OPTIONS.find(mode => mode.value === 'long_10000')?.label, expectedLabel);
assert.equal(getOutputModeLabel('long_10000'), expectedLabel);

assert.equal(MODES.some(mode => mode.value === 'long'), false);
assert.equal(PUBLIC_MODE_VALUES.includes('long'), false);

console.log('direct long 10000 mode registry tests passed');
