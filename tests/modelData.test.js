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
assert.deepEqual(OPENAI_TEXT_MODELS, ['gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o']);
assert.deepEqual(OPENAI_VISION_MODELS, ['gpt-4.1', 'gpt-4o', 'gpt-4.1-mini']);

console.log('modelData tests passed');
