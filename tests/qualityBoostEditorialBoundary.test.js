import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEditorialReviewPrompt } from '../src/editorialReviewContracts.js';
import { buildEditorialBrushupPrompt } from '../src/editorialBrushupRuntime.js';

const sent = [];
globalThis.document = {
  documentElement: { dataset: {} },
  querySelector: () => ({ dataset: { v: 'short_short' }, textContent: 'ショート（1500字～）' }),
  getElementById: () => null,
};
globalThis.window = { fetch: async (url, init) => {
  sent.push(JSON.parse(init.body));
  return new Response('{}', { headers: { 'content-type': 'application/json' } });
} };
await import('../src/qualityBoost.js');

test('editorial review passes through each API shape without story-generation contracts', async () => {
  const prompt = buildEditorialReviewPrompt({ mode: 'short_short', text: '遥は貸出票を返却箱へ入れた。'.repeat(120) });
  const requests = [
    ['https://api.openai.com/v1/responses', { input: [{ role: 'user', content: prompt }] }],
    ['https://api.openai.com/v1/chat/completions', { messages: [{ role: 'user', content: prompt }] }],
    ['https://api.openai.com/v1/responses', { stream: true, input: [{ role: 'user', content: prompt }] }],
    ['https://generativelanguage.googleapis.com/v1beta/models/test:generateContent', { contents: [{ parts: [{ text: prompt }] }] }],
    ['https://generativelanguage.googleapis.com/v1beta/models/test:streamGenerateContent', { contents: [{ parts: [{ text: prompt }] }] }],
  ];
  for (const [url, body] of requests) {
    const previousCalls = sent.length;
    const response = await window.fetch(url, { body: JSON.stringify(body) });
    assert.deepEqual(sent.at(-1), body, 'review must not acquire final-prose, length-target or style-generation instructions');
    assert.equal(sent.length, previousCalls + 1, 'review must not trigger a story length-repair request');
    assert.equal(await response.text(), '{}', 'review response is not consumed or replaced');
  }
  assert.match(prompt, /1500字/);
});

test('drafting and editorial rewriting retain the existing generation quality and minimum-length guards', async () => {
  for (const prompt of ['出力モード: short_short\n図書室の静かな物語を書いて。', buildEditorialBrushupPrompt({ mode: 'short_short', text: '遥は貸出票を返却箱へ入れた。'.repeat(120), review: { score: 88, problems: '物の移動が曖昧', revisionPlan: '既存の手順を明確にする' } })]) {
    await window.fetch('https://api.openai.com/v1/responses', { body: JSON.stringify({ input: prompt }) });
    assert.match(sent.at(-1).input, /最優先の字数条件/);
    assert.match(sent.at(-1).input, /1500字/);
    assert.match(sent.at(-1).input, /尺と形式に合わせる物語設計/);
  }
});
