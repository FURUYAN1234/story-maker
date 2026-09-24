import assert from 'node:assert/strict';
import {
  buildOpenAIModelSelectorMarkup,
  isOpenAIProviderLabel,
  isOpenAIProviderState,
} from '../src/openAiModelUi.js';

const markup = buildOpenAIModelSelectorMarkup();

assert.match(markup, /OpenAI思考モデル/);
assert.match(markup, /id="openai-model-select"/);
assert.match(markup, /for="openai-model-select"/);
assert.match(markup, /GPT-6 Astra（[^）]+）/);
assert.match(markup, /GPT-5\.6 Terra（[^）]+）/);
assert.match(markup, /GPT-4\.1 mini（[^）]+）/);
assert.match(markup, /2026-09-24/);
assert.match(markup, /100万トークン/);
assert.match(markup, /長文コンテキスト/);
assert.match(markup, /data-model-status="selected"/);
assert.match(markup, /data-model-status="attempted"/);
assert.match(markup, /data-model-status="adopted"/);

assert.equal(isOpenAIProviderLabel('ChatGPT API'), true);
assert.equal(isOpenAIProviderLabel('OpenAI API'), true);
assert.equal(isOpenAIProviderLabel('現在: ChatGPT'), true);
assert.equal(isOpenAIProviderLabel('Gemini API'), false);
assert.equal(isOpenAIProviderLabel('⚠ API未設定'), false);
assert.equal(isOpenAIProviderState('⚠ API未設定', 'btn-switch-api openai-mode', '現在: ChatGPT'), true);
assert.equal(isOpenAIProviderState('⚠ API未設定', 'btn-switch-api gemini-mode', 'ChatGPT APIに切り替えます（現在: Gemini）'), false);

console.log('openAiModelUi tests passed');
