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

console.log('providerClients tests passed');
