import test from 'node:test';
import assert from 'node:assert/strict';
import * as progress from '../src/standardGenerationProgressLog.js';
import { setSelectedOpenAIModelId, resetSelectedOpenAIModelId } from '../src/openAiModelCatalog.js';

test('request progress uses the selected OpenAI model while preserving Gemini selection', () => {
  try {
    setSelectedOpenAIModelId('gpt-6-luna');
    assert.equal(progress.selectStandardGenerationRequestModel('ChatGPT', 'gpt-6.1-sol'), 'gpt-6-luna');
    assert.equal(progress.selectStandardGenerationRequestModel('Gemini', 'gemini-test'), 'gemini-test');
    setSelectedOpenAIModelId('gpt-6.1-terra');
    assert.equal(progress.selectStandardGenerationRequestModel('ChatGPT', 'gpt-6.1-sol'), 'gpt-6.1-terra');
  } finally { resetSelectedOpenAIModelId(); }
});

test('waiting progress reports elapsed time without inventing completed internal inspections', () => {
  for (const seconds of [0, 3, 6, 9, 12, 15, 18, 30, 120]) {
    const status = progress.formatStandardRequestWaitStatus(seconds);
    assert.match(status, new RegExp(`${seconds}秒経過`));
    assert.doesNotMatch(status, /検証|完了|15ビート|シミュレーション|5179|CoT/);
  }
  assert.match(progress.formatStandardRequestWaitStatus(-1), /0秒経過/);
  assert.match(progress.formatStandardRequestWaitStatus(NaN), /0秒経過/);
});
