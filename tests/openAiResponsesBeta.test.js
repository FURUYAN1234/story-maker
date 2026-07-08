import assert from 'node:assert/strict';
import {
  buildOpenAiResponsesRequestBody,
  extractOpenAiResponsesText,
  resolveOpenAiResponsesBetaConfig,
} from '../src/openAiResponsesBeta.js';
import { Gt, yt } from '../src/providerClients.js';

function fakeRuntime(search) {
  return {
    location: {
      search,
    },
  };
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

const enabledConfig = resolveOpenAiResponsesBetaConfig(
  { openAiResponsesBetaAllowed: true },
  fakeRuntime('?gpt5xBeta=1')
);
assert.equal(enabledConfig.enabled, true);
assert.deepEqual(enabledConfig.models, ['gpt-5.5', 'gpt-5.4', 'gpt-5.4-mini']);

const defaultConfig = resolveOpenAiResponsesBetaConfig({}, fakeRuntime(''));
assert.equal(defaultConfig.enabled, true);
assert.equal(defaultConfig.source, 'default');
assert.deepEqual(defaultConfig.models, ['gpt-5.5', 'gpt-5.4', 'gpt-5.4-mini']);

const explicitModelConfig = resolveOpenAiResponsesBetaConfig(
  { openAiResponsesBetaAllowed: true },
  fakeRuntime('?gpt5xBeta=1&gpt5xModel=gpt-5.6')
);
assert.equal(explicitModelConfig.enabled, true);
assert.deepEqual(explicitModelConfig.models.slice(0, 2), ['gpt-5.6', 'gpt-5.5']);

const queryModelPriorityConfig = resolveOpenAiResponsesBetaConfig(
  { openAiResponsesBetaAllowed: true, openAiResponsesModels: ['gpt-5.4-mini'] },
  fakeRuntime('?gpt5xBeta=1&gpt5xModel=gpt-5.5')
);
assert.equal(queryModelPriorityConfig.enabled, true);
assert.deepEqual(queryModelPriorityConfig.models.slice(0, 2), ['gpt-5.5', 'gpt-5.4-mini']);

const blockedConfig = resolveOpenAiResponsesBetaConfig({ openAiResponsesBeta: false }, fakeRuntime('?gpt5xBeta=1'));
assert.equal(blockedConfig.enabled, false);

const jsonBody = buildOpenAiResponsesRequestBody(
  'gpt-5.5',
  'prompt',
  { responseMimeType: 'application/json', maxTokens: 123 },
  false
);
assert.equal(jsonBody.model, 'gpt-5.5');
assert.deepEqual(jsonBody.input, [{ role: 'user', content: 'prompt' }]);
assert.equal(jsonBody.max_output_tokens, 123);
assert.equal(jsonBody.text.format.type, 'json_object');
assert.equal(jsonBody.stream, undefined);

assert.equal(extractOpenAiResponsesText({ output_text: 'beta body' }), 'beta body');
assert.equal(
  extractOpenAiResponsesText({
    output: [
      {
        content: [{ type: 'output_text', text: 'nested body' }],
      },
    ],
  }),
  'nested body'
);

const originalFetch = globalThis.fetch;

let capturedRequest = null;
globalThis.fetch = async (url, init) => {
  capturedRequest = { url: String(url), init };
  return {
    ok: true,
    json: async () => ({ output_text: 'beta text' }),
  };
};

try {
  const result = await Gt('sk-unit-test-key-000000000000', 'gpt-4.1', 'prompt', null, {
    openAiResponsesBeta: true,
    openAiResponsesModels: ['gpt-5.5'],
    maxTokens: 77,
  });
  assert.equal(result.text, 'beta text');
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.match(capturedRequest.url, /\/v1\/responses$/);
  const body = JSON.parse(capturedRequest.init.body);
  assert.equal(body.model, 'gpt-5.5');
  assert.equal(body.max_output_tokens, 77);
} finally {
  globalThis.fetch = originalFetch;
}

const requestedUrls = [];
globalThis.fetch = async (url) => {
  requestedUrls.push(String(url));
  if (requestedUrls.length === 1) {
    return {
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ error: { message: 'model not available' } }),
    };
  }
  return {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: 'stable fallback' }, finish_reason: 'stop' }],
    }),
  };
};

try {
  const result = await Gt('sk-unit-test-key-000000000000', 'gpt-4.1', 'prompt', null, {
    openAiResponsesBeta: true,
    openAiResponsesModels: ['gpt-5.5'],
    maxTokens: 77,
  });
  assert.equal(result.text, 'stable fallback');
  assert.equal(result.usedModel, 'gpt-4.1');
  assert.match(requestedUrls[0], /\/v1\/responses$/);
  assert.match(requestedUrls.at(-1), /\/v1\/chat\/completions$/);
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async (url, init) => {
  capturedRequest = { url: String(url), init };
  return {
    ok: true,
    json: async () => ({ output_text: 'nonstream body' }),
  };
};

try {
  const chunks = [];
  const result = await yt(
    'sk-unit-test-key-000000000000',
    'gpt-4.1',
    'prompt',
    chunk => chunks.push(chunk),
    null,
    {
      openAiResponsesBeta: true,
      openAiResponsesModels: ['gpt-5.5'],
      maxTokens: 64,
    }
  );
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.deepEqual(chunks, [{ text: 'nonstream body', isThought: false }]);
  const body = JSON.parse(capturedRequest.init.body);
  assert.equal(body.stream, undefined);
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async (url, init) => {
  capturedRequest = { url: String(url), init };
  return {
    ok: true,
    body: streamFromText([
      'data: {"type":"response.output_text.delta","delta":"hel"}\n\n',
      'data: {"type":"response.output_text.delta","delta":"lo"}\n\n',
      'data: {"type":"response.completed"}\n\n',
    ]),
  };
};

try {
  const chunks = [];
  const result = await yt(
    'sk-unit-test-key-000000000000',
    'gpt-4.1',
    'prompt',
    chunk => chunks.push(chunk),
    null,
    {
      openAiResponsesBeta: true,
      openAiResponsesModels: ['gpt-5.5'],
      openAiResponsesStream: true,
      maxTokens: 64,
    }
  );
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.deepEqual(chunks, [
    { text: 'hel', isThought: false },
    { text: 'lo', isThought: false },
  ]);
  assert.match(capturedRequest.url, /\/v1\/responses$/);
  const body = JSON.parse(capturedRequest.init.body);
  assert.equal(body.stream, true);
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async () => ({
  ok: true,
  body: streamFromText([
    'data: {"type":"response.completed","response":{"output_text":"completed body"}}\n\n',
  ]),
});

try {
  const chunks = [];
  const result = await yt(
    'sk-unit-test-key-000000000000',
    'gpt-4.1',
    'prompt',
    chunk => chunks.push(chunk),
    null,
    {
      openAiResponsesBeta: true,
      openAiResponsesModels: ['gpt-5.5'],
      openAiResponsesStream: true,
      maxTokens: 64,
    }
  );
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.deepEqual(chunks, [{ text: 'completed body', isThought: false }]);
} finally {
  globalThis.fetch = originalFetch;
}

globalThis.fetch = async () => ({
  ok: true,
  body: streamFromText([
    'event: response.output_text.delta\n',
    'data: {"delta":"event "}\n\n',
    'event: response.output_text.delta\n',
    'data: {"delta":"stream"}\n\n',
    'event: response.completed\n',
    'data: {"response":{"output_text":"event stream"}}\n\n',
  ]),
});

try {
  const chunks = [];
  const result = await yt(
    'sk-unit-test-key-000000000000',
    'gpt-4.1',
    'prompt',
    chunk => chunks.push(chunk),
    null,
    {
      openAiResponsesBeta: true,
      openAiResponsesModels: ['gpt-5.5'],
      openAiResponsesStream: true,
      maxTokens: 64,
    }
  );
  assert.equal(result.usedModel, 'gpt-5.5 (Responses beta)');
  assert.deepEqual(chunks, [
    { text: 'event ', isThought: false },
    { text: 'stream', isThought: false },
  ]);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('openAiResponsesBeta tests passed');
