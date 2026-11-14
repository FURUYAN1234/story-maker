import test from 'node:test';
import assert from 'node:assert/strict';
import { Gt, yt } from '../src/providerClients.js';

const openAiKey = 'sk-unit-test-key-000000000000';
const geminiKey = 'gemini-unit-test-key-000000000000';
const abortError = () => new DOMException('Cancelled in regression test', 'AbortError');
const textResponse = url => ({
  ok: true,
  json: async () => String(url).includes('generativelanguage')
    ? { candidates: [{ content: { parts: [{ text: 'accepted text' }] } }] }
    : String(url).endsWith('/responses')
      ? { output_text: 'accepted text' }
      : { choices: [{ finish_reason: 'stop', message: { content: 'accepted text' } }] },
});
const routes = [
  { name: 'Responses', key: openAiKey, options: {} },
  { name: 'Chat', key: openAiKey, options: { openAiResponsesBeta: false } },
  { name: 'Gemini', key: geminiKey, options: { fallbackModels: ['gemini-fallback'] } },
];
const call = (route, options = {}) => Gt(route.key, 'gemini-primary', 'character settings', null, {
  ...route.options, ...options,
});

for (const route of routes) {
  test(`${route.name}: already cancelled requests never reach fetch`, async t => {
    let requests = 0;
    t.mock.method(globalThis, 'fetch', async url => { requests++; return textResponse(url); });
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(call(route, { signal: controller.signal }), { name: 'AbortError' });
    assert.equal(requests, 0);
  });

  test(`${route.name}: cancellation aborts the active request without model or transport fallback`, async t => {
    const controller = new AbortController();
    let requests = 0, requestSignal, started;
    const requestStarted = new Promise(resolve => { started = resolve; });
    t.mock.method(globalThis, 'fetch', async (url, init) => {
      requests++;
      if (requests > 1) return textResponse(url);
      requestSignal = init.signal;
      started();
      if (!init.signal) return textResponse(url);
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(abortError()), { once: true });
      });
    });
    const result = call(route, { signal: controller.signal, timeoutMs: 30 });
    const rejected = assert.rejects(result, { name: 'AbortError' });
    await requestStarted;
    controller.abort();
    await rejected;
    assert.equal(requestSignal.aborted, true);
    assert.equal(requests, 1);
  });

  test(`${route.name}: an un-aborted signal preserves normal successful text`, async t => {
    let requests = 0;
    t.mock.method(globalThis, 'fetch', async url => { requests++; return textResponse(url); });
    const result = await call(route, { signal: new AbortController().signal });
    assert.equal(result.text, 'accepted text');
    assert.equal(requests, 1);
  });
}

test('Responses: cancellation remains connected while the JSON body is being read', async t => {
  const controller = new AbortController();
  let requests = 0, reading;
  const readingBody = new Promise(resolve => { reading = resolve; });
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    requests++;
    return { ok: true, json: () => new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve({ output_text: 'late text' }), 30);
      init.signal.addEventListener('abort', () => { clearTimeout(timer); reject(abortError()); }, { once: true });
      reading();
    }) };
  });
  const result = call(routes[0], { signal: controller.signal });
  const rejected = assert.rejects(result, { name: 'AbortError' });
  await readingBody;
  controller.abort();
  await rejected;
  assert.equal(requests, 1);
});

test('Responses stream: cancellation after headers stops body reading and fallback', async t => {
  const controller = new AbortController();
  let requests = 0, reading;
  const readingBody = new Promise(resolve => { reading = resolve; });
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    requests++;
    return { ok: true, body: new ReadableStream({
      start(stream) {
        const timer = setTimeout(() => {
          stream.enqueue(new TextEncoder().encode('data: {"type":"response.output_text.delta","delta":"late text"}\n\n'));
          stream.close();
        }, 30);
        init.signal.addEventListener('abort', () => { clearTimeout(timer); stream.error(abortError()); }, { once: true });
      },
      pull() { reading(); },
    }) };
  });
  const result = yt(openAiKey, 'unused', 'prompt', () => {}, null, {
    signal: controller.signal, openAiResponsesStream: true,
  });
  const rejected = assert.rejects(result, { name: 'AbortError' });
  await readingBody;
  // Let fetch finish before cancelling, to cover the response-body lifetime.
  await new Promise(resolve => setTimeout(resolve, 0));
  controller.abort();
  await rejected;
  assert.equal(requests, 1);
});

for (const route of [routes[0], routes[2]]) {
  test(`${route.name}: request timeout retains the existing model fallback`, async t => {
    let requests = 0;
    const controller = new AbortController();
    t.mock.method(globalThis, 'fetch', async (url, init) => {
      requests++;
      if (requests > 1) return textResponse(url);
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(abortError()), { once: true });
      });
    });
    const result = await call(route, { signal: controller.signal, timeoutMs: 5 });
    assert.equal(result.text, 'accepted text');
    assert.equal(controller.signal.aborted, false);
    assert.equal(requests, 2);
  });
}

for (const route of [routes[1], routes[2]]) {
  test(`${route.name} stream: already cancelled requests never reach fetch`, async t => {
    let requests = 0;
    t.mock.method(globalThis, 'fetch', async () => { requests++; throw new Error('Must not call fetch'); });
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(yt(route.key, 'gemini-primary', 'prompt', () => {}, null, {
      ...route.options, signal: controller.signal,
    }), { name: 'AbortError' });
    assert.equal(requests, 0);
  });

  test(`${route.name} stream: external cancellation must not start another model`, async t => {
    const controller = new AbortController();
    let requests = 0, started;
    const requestStarted = new Promise(resolve => { started = resolve; });
    t.mock.method(globalThis, 'fetch', async (url, init) => {
      requests++;
      if (requests > 1) return { ok: true, body: new ReadableStream({ start(stream) { stream.close(); } }) };
      started();
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(abortError()), { once: true });
      });
    });
    const result = yt(route.key, 'gemini-primary', 'prompt', () => {}, null, {
      ...route.options, signal: controller.signal, timeoutMs: 30,
    });
    const rejected = assert.rejects(result, { name: 'AbortError' });
    await requestStarted;
    controller.abort();
    await rejected;
    assert.equal(requests, 1);
  });
}

test('Gemini stream: request timeout retains the existing model fallback', async t => {
  let requests = 0;
  const chunks = [];
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    requests++;
    if (requests > 1) return { ok: true, body: new ReadableStream({ start(stream) {
      stream.enqueue(new TextEncoder().encode('data: {"candidates":[{"content":{"parts":[{"text":"accepted text"}]}}]}\n'));
      stream.close();
    } }) };
    return new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () => reject(abortError()), { once: true });
    });
  });
  await yt(geminiKey, 'gemini-primary', 'prompt', chunk => chunks.push(chunk.text), null, {
    signal: controller.signal, timeoutMs: 5,
  });
  assert.deepEqual(chunks, ['accepted text']);
  assert.equal(controller.signal.aborted, false);
  assert.equal(requests, 2);
});
