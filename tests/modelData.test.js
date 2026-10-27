import assert from 'node:assert/strict';
import {
  GEMINI_MODEL_VALUES,
  GEMINI_MODELS,
  OPENAI_TEXT_MODELS,
  OPENAI_VISION_MODELS,
} from '../src/data.js';

assert.deepEqual(
  GEMINI_MODELS.map(model => model.value),
  ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-flash-latest', 'gemini-pro-latest'],
);
assert.deepEqual(GEMINI_MODEL_VALUES, ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-flash-latest', 'gemini-pro-latest']);
assert.deepEqual(OPENAI_TEXT_MODELS, ['gpt-6.1-sol','gpt-6.1-terra','gpt-6-sol','gpt-5.6-sol','gpt-5.6-terra','gpt-6-luna','gpt-5.6-luna']);
assert.deepEqual(OPENAI_VISION_MODELS, OPENAI_TEXT_MODELS);

console.log('modelData tests passed');
