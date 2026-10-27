import assert from 'node:assert/strict';
import {
  DEFAULT_OPENAI_MODEL_ID,
  OPENAI_MODEL_OPTIONS,
  OPENAI_MODEL_PRICE_SNAPSHOT_DATE,
  resolveDefaultOpenAIModelId,
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
  'gpt-6.1-sol',
  'gpt-6.1-terra',
  'gpt-6-sol',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'gpt-6-luna',
  'gpt-5.6-luna',
];

assert.equal(DEFAULT_OPENAI_MODEL_ID, 'gpt-6.1-sol');
assert.equal(resolveDefaultOpenAIModelId(true), 'gpt-6.1-sol');
assert.equal(resolveDefaultOpenAIModelId(false), 'gpt-6.1-sol');
assert.equal(OPENAI_MODEL_PRICE_SNAPSHOT_DATE, '2026-10-27');
assert.deepEqual(OPENAI_MODEL_OPTIONS.map(model => model.id), expectedModelIds);
assert.ok(OPENAI_MODEL_OPTIONS.every(model => model.description.length >= 10));
assert.ok(OPENAI_MODEL_OPTIONS.every(model => Number.isFinite(model.inputPriceUsdPerM)));
assert.ok(OPENAI_MODEL_OPTIONS.every(model => Number.isFinite(model.outputPriceUsdPerM)));

assert.deepEqual(getOpenAIResponsesRoute('gpt-6-astra'), expectedModelIds);
assert.deepEqual(getOpenAIResponsesRoute('gpt-6.1-sol'), expectedModelIds.slice(1));
assert.ok(!getOpenAIResponsesRoute('gpt-6.1-sol').includes('gpt-6-astra'));
assert.deepEqual(getOpenAIResponsesRoute('gpt-6.1-terra'), expectedModelIds.slice(2));
assert.ok(!getOpenAIResponsesRoute('gpt-6.1-terra').includes('gpt-6.1-sol'));
assert.deepEqual(getOpenAIResponsesRoute('gpt-6-luna'), expectedModelIds.slice(6));
assert.deepEqual(getOpenAIResponsesRoute('gpt-5.6-luna'), ['gpt-5.6-luna']);
assert.deepEqual(getOpenAIChatRoute('gpt-6-luna'), ['gpt-6-luna','gpt-5.6-luna']);
assert.ok(OPENAI_MODEL_OPTIONS.every(({id})=>!/^gpt-4/.test(id)));
assert.deepEqual(getOpenAIResponsesRoute('invalid-model'), expectedModelIds.slice(1));
assert.equal(getOpenAIModelOption('gpt-6.1-sol').inputPriceUsdPerM, 2);
assert.equal(getOpenAIModelOption('gpt-6.1-sol').outputPriceUsdPerM, 10);
assert.equal(getOpenAIModelOption('gpt-6.1-terra').inputPriceUsdPerM, 1);
assert.equal(getOpenAIModelOption('gpt-6.1-terra').outputPriceUsdPerM, 5);
assert.equal(formatOpenAIModelPrice(getOpenAIModelOption('gpt-6.1-terra')), '入力 $1.00 / 出力 $5.00 USD / 100万トークン');

assert.equal(getOpenAIModelOption('gpt-6-luna').inputPriceUsdPerM, 0.1);
assert.equal(getOpenAIModelOption('gpt-5.6-terra').outputPriceUsdPerM, 12);
assert.equal(getOpenAIModelOption('gpt-5.6-luna').outputPriceUsdPerM, 1.2);
assert.equal(
  formatOpenAIModelPrice(getOpenAIModelOption('gpt-6-luna')),
  '入力 $0.10 / 出力 $0.50 USD / 100万トークン'
);

setSelectedOpenAIModelId('gpt-6-luna');
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-luna');
setSelectedOpenAIModelId('not-available');
assert.equal(getSelectedOpenAIModelId(), 'gpt-6.1-sol');
resetSelectedOpenAIModelId();
assert.equal(getSelectedOpenAIModelId(), 'gpt-6.1-sol');

console.log('openAiModelCatalog tests passed');
