import assert from 'node:assert/strict';
import {
  DEFAULT_OPENAI_MODEL_ID,
  OPENAI_MODEL_OPTIONS,
  OPENAI_MODEL_PRICE_SNAPSHOT_DATE,
  formatOpenAIModelPrice,
  getOpenAIChatRoute,
  getOpenAIModelOption,
  getOpenAIResponsesRoute,
  getSelectedOpenAIModelId,
  resetSelectedOpenAIModelId,
  setSelectedOpenAIModelId,
} from '../src/openAiModelCatalog.js';

const expectedModelIds = [
  'gpt-6-astra',
  'gpt-6-sol',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'gpt-6-luna',
  'gpt-5.6-luna',
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4o',
];

assert.equal(DEFAULT_OPENAI_MODEL_ID, 'gpt-6-astra');
assert.equal(OPENAI_MODEL_PRICE_SNAPSHOT_DATE, '2026-09-24');
assert.deepEqual(OPENAI_MODEL_OPTIONS.map(model => model.id), expectedModelIds);
assert.ok(OPENAI_MODEL_OPTIONS.every(model => model.description.length >= 10));
assert.ok(OPENAI_MODEL_OPTIONS.every(model => Number.isFinite(model.inputPriceUsdPerM)));
assert.ok(OPENAI_MODEL_OPTIONS.every(model => Number.isFinite(model.outputPriceUsdPerM)));

assert.deepEqual(getOpenAIResponsesRoute('gpt-6-astra'), expectedModelIds);
assert.deepEqual(getOpenAIResponsesRoute('gpt-6-luna'), expectedModelIds.slice(4));
assert.deepEqual(getOpenAIResponsesRoute('gpt-4.1-mini'), expectedModelIds.slice(7));
assert.deepEqual(getOpenAIChatRoute('gpt-4.1-mini'), ['gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o']);
assert.deepEqual(getOpenAIResponsesRoute('invalid-model'), expectedModelIds);

assert.equal(getOpenAIModelOption('gpt-6-luna').inputPriceUsdPerM, 0.1);
assert.equal(getOpenAIModelOption('gpt-5.6-terra').outputPriceUsdPerM, 12);
assert.equal(getOpenAIModelOption('gpt-4.1-mini').outputPriceUsdPerM, 1.6);
assert.equal(
  formatOpenAIModelPrice(getOpenAIModelOption('gpt-6-luna')),
  '入力 $0.10 / 出力 $0.50 USD / 100万トークン'
);

setSelectedOpenAIModelId('gpt-6-luna');
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-luna');
setSelectedOpenAIModelId('not-available');
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-astra');
resetSelectedOpenAIModelId();
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-astra');

console.log('openAiModelCatalog tests passed');

