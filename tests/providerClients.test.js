import assert from 'node:assert/strict';
import {
  Gd,
  Gt,
  af,
  cf,
  go,
  lf,
  nf,
  of,
  rf,
  sf,
  tf,
  yt,
  zs,
} from '../src/providerClients.js';

const exportedFunctions = {
  Gd,
  Gt,
  af,
  cf,
  go,
  lf,
  nf,
  of,
  rf,
  sf,
  tf,
  yt,
  zs,
};

for (const [name, fn] of Object.entries(exportedFunctions)) {
  assert.equal(typeof fn, 'function', `${name} should be exported as a function`);
}

assert.equal(await go(''), 'API Key not set.');

await assert.rejects(
  () => Gt('', 'gemini-2.5-flash', 'prompt'),
  /API/,
);
await assert.rejects(
  () => yt('', 'gemini-2.5-flash', 'prompt', () => {}),
  /API/,
);

const originalFetch = globalThis.fetch;
let capturedRequest = null;
globalThis.fetch = async (url, init) => {
  capturedRequest = { url: String(url), init };
  return {
    ok: true,
    json: async () => ({
      candidates: [
        {
          content: {
            parts: [{ text: '生成結果' }],
          },
        },
      ],
    }),
  };
};

try {
  const text = await tf('gemini-test-key-without-secret-shape', 'gemini-2.5-flash', '本文を生成', {
    responseMimeType: 'application/json',
    timeoutMs: 1000,
  });
  assert.equal(text, '生成結果');
  assert.match(capturedRequest.url, /gemini-2\.5-flash:generateContent/);
  const body = JSON.parse(capturedRequest.init.body);
  assert.equal(body.generationConfig.responseMimeType, 'application/json');
  assert.equal(body.tools, undefined);
  assert.equal(body.safetySettings.length, 4);
} finally {
  globalThis.fetch = originalFetch;
}

function streamFromText(parts) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const part of parts) {
        controller.enqueue(encoder.encode(part));
      }
      controller.close();
    },
  });
}

globalThis.fetch = async () => ({
  ok: true,
  json: async () => ({ output_text: 'responses default body' }),
});

try {
  const result = await Gt('sk-unit-test-key-000000000000', 'gpt-4.1', 'prompt', null, { maxTokens: 64 });
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.equal(result.text, 'responses default body');
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async () => ({
  ok: true,
  body: streamFromText([
    'data: {"choices":[{"delta":{"content":"hel"}}]}\n',
    'data: {"choices":[{"delta":{"content":"lo"}}]}\n',
    'data: [DONE]\n',
  ]),
});

try {
  const chunks = [];
  const result = await cf('sk-unit-test-key-000000000000', 'prompt', chunk => chunks.push(chunk), null, {
    maxTokens: 64,
    openAiResponsesBeta: false,
  });
  assert.equal(result.usedModel, 'gpt-4.1');
  assert.deepEqual(chunks, [
    { text: 'hel', isThought: false },
    { text: 'lo', isThought: false },
  ]);
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async () => ({
  ok: true,
  body: streamFromText([
    'data: {"candidates":[{"content":{"parts":[{"text":"body"},{"thought":"idea"}]}}]}\n',
  ]),
});

try {
  const chunks = [];
  await zs('gemini-unit-test-key', 'gemini-2.5-flash', 'prompt', chunk => chunks.push(chunk), {
    timeoutMs: 1000,
    disableGoogleSearch: true,
  });
  assert.deepEqual(chunks, [
    { text: 'body', isThought: false },
    { text: 'idea', isThought: true },
  ]);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('providerClients tests passed');
