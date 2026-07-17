const DEFAULT_OPENAI_RESPONSES_BETA_MODELS = ['gpt-5.5', 'gpt-5.4', 'gpt-5.4-mini'];
const BETA_QUERY_PARAMS = ['gpt5xBeta', 'openaiResponsesBeta', 'codexOpenAiResponsesBeta'];
const MODEL_QUERY_PARAMS = ['gpt5xModel', 'openaiResponsesModel', 'codexOpenAiResponsesModel'];

function getSearchParams(runtime = globalThis) {
  try {
    return new URLSearchParams(runtime?.location?.search || '');
  } catch {
    return new URLSearchParams('');
  }
}

function isTruthyFlag(value) {
  return ['1', 'true', 'yes', 'on', 'beta'].includes(String(value || '').trim().toLowerCase());
}

function isFalsyFlag(value) {
  return ['0', 'false', 'no', 'off'].includes(String(value || '').trim().toLowerCase());
}

function sanitizeModelId(value) {
  const model = String(value || '').trim();
  return /^gpt-5(?:[.\w-]*)?$/i.test(model) ? model : '';
}

function uniqueModels(models) {
  const seen = new Set();
  const result = [];
  for (const model of models) {
    const clean = sanitizeModelId(model);
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      result.push(clean);
    }
  }
  return result;
}

function resolveOpenAiResponsesBetaConfig(options = {}, runtime = globalThis) {
  const searchParams = getSearchParams(runtime);
  const allowed = options.openAiResponsesBetaAllowed !== false;

  const queryValue = BETA_QUERY_PARAMS
    .map(name => searchParams.get(name))
    .find(value => value !== null);

  if (!allowed) {
    return { enabled: false, source: 'not-allowed', models: [] };
  }
  if (options.openAiResponsesBeta === false || isFalsyFlag(queryValue)) {
    return { enabled: false, source: 'disabled', models: [] };
  }

  const enabled = true;
  const source = options.openAiResponsesBeta === true
    ? 'option'
    : isTruthyFlag(queryValue)
      ? 'query'
      : 'default';
  const queryModel = MODEL_QUERY_PARAMS
    .map(name => searchParams.get(name))
    .map(sanitizeModelId)
    .find(Boolean);
  const optionModels = Array.isArray(options.openAiResponsesModels)
    ? options.openAiResponsesModels
    : [];
  const models = uniqueModels([
    queryModel,
    ...optionModels,
    ...DEFAULT_OPENAI_RESPONSES_BETA_MODELS,
  ]);

  return {
    enabled,
    source,
    models,
  };
}

function buildOpenAiResponsesRequestBody(model, prompt, options = {}, stream = false) {
  const maxOutputTokens = options.maxOutputTokens || options.maxTokens || 8192;
  const body = {
    model,
    input: [{ role: 'user', content: String(prompt || '') }],
    max_output_tokens: maxOutputTokens,
  };
  if (stream) {
    body.stream = true;
  }
  if (options.responseMimeType === 'application/json') {
    body.text = {
      format: {
        type: 'json_object',
      },
    };
  }
  return body;
}

function extractOpenAiResponsesText(response) {
  if (!response || typeof response !== 'object') return '';
  if (typeof response.output_text === 'string') {
    return response.output_text;
  }

  const output = Array.isArray(response.output) ? response.output : [];
  const parts = [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (typeof part?.text === 'string') {
        parts.push(part.text);
      }
    }
  }
  return parts.join('');
}

async function readOpenAiError(response) {
  const status = response?.status || 'unknown';
  const statusText = response?.statusText || '';
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    try {
      payload = { error: { message: await response.text() } };
    } catch {
      payload = null;
    }
  }
  const message = payload?.error?.message || payload?.message || statusText || 'unknown error';
  return `OpenAI Responses HTTP ${status} - ${message}`;
}

function createAbortController(options = {}) {
  const controller = new AbortController();
  let cleanupSignal = () => {};
  let timeoutId = null;

  if (options.signal) {
    const abortFromOuter = () => controller.abort(options.signal.reason);
    if (options.signal.aborted) {
      abortFromOuter();
    } else {
      options.signal.addEventListener('abort', abortFromOuter);
      cleanupSignal = () => options.signal.removeEventListener('abort', abortFromOuter);
    }
  }

  const timeoutMs = options.timeoutMs;
  if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  }

  return {
    signal: controller.signal,
    cleanup() {
      cleanupSignal();
      if (timeoutId) clearTimeout(timeoutId);
    },
  };
}

async function requestOpenAiResponses(apiKey, model, prompt, options = {}, stream = false) {
  const abort = createAbortController(options);
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: abort.signal,
      body: JSON.stringify(buildOpenAiResponsesRequestBody(model, prompt, options, stream)),
    });
    if (!response.ok) {
      throw new Error(await readOpenAiError(response));
    }
    return response;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(`Aborted: ${model} Responses beta`);
    }
    throw error;
  } finally {
    abort.cleanup();
  }
}

function consumeOpenAiResponsesSseLines(buffer, onEvent) {
  const blocks = buffer.split(/\r?\n\r?\n/);
  const rest = blocks.pop() || '';

  for (const block of blocks) {
    let eventType = '';
    const eventLines = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith('event:')) {
        eventType = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        eventLines.push(line.slice(5).trimStart());
      }
    }
    if (eventLines.length) {
      onEvent({ eventType, data: eventLines.join('\n') });
    }
  }
  return rest;
}

function parseOpenAiResponsesStreamEvent(event, onChunk, state = { emittedChars: 0 }) {
  if (!event || event === '[DONE]') return false;
  let data;
  if (typeof event === 'string') {
    data = JSON.parse(event);
  } else if (typeof event.data === 'string') {
    if (event.data === '[DONE]') return false;
    data = JSON.parse(event.data);
    if (event.eventType && !data.type) {
      data.type = event.eventType;
    }
  } else {
    data = event;
  }
  if (Array.isArray(state.eventTypes) && data?.type && state.eventTypes.length < 50) {
    state.eventTypes.push(data.type);
  }
  if (data.type === 'error') {
    throw new Error(data.error?.message || data.message || 'OpenAI Responses stream error');
  }
  if (data.type === 'response.output_text.delta' && typeof data.delta === 'string') {
    onChunk({ text: data.delta, isThought: false });
    state.emittedChars += data.delta.length;
    return true;
  }
  if (data.type === 'response.output_text.done' && typeof data.text === 'string' && state.emittedChars === 0) {
    onChunk({ text: data.text, isThought: false });
    state.emittedChars += data.text.length;
    return true;
  }
  if (data.type === 'response.completed' && state.emittedChars === 0) {
    const text = extractOpenAiResponsesText(data.response || data);
    if (text) {
      onChunk({ text, isThought: false });
      state.emittedChars += text.length;
      return true;
    }
  }
  if (typeof data.output_text === 'string' && state.emittedChars === 0) {
    onChunk({ text: data.output_text, isThought: false });
    state.emittedChars += data.output_text.length;
    return true;
  }
  return false;
}

async function readOpenAiResponsesStream(response, onChunk) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  const state = { emittedChars: 0, eventTypes: [] };
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      buffer = consumeOpenAiResponsesSseLines(buffer, event => {
        parseOpenAiResponsesStreamEvent(event, onChunk, state);
      });
    }
    if (buffer.trim()) {
      consumeOpenAiResponsesSseLines(`${buffer}\n\n`, event => {
        parseOpenAiResponsesStreamEvent(event, onChunk, state);
      });
    }
  } finally {
    reader.releaseLock();
  }
  return state;
}

function resolveLongOutputOptions(prompt, options = {}) {
  if (options.editorialStage === 'review' || options.editorialStage === 'reviewRetry') return options;
  const isDirectLong = String(prompt || '').includes('【長編（10000字）直接生成契約】');
  const isLongBrushup = options.editorialStage === 'brushup' && String(prompt || '').length >= 10000;
  if (!isDirectLong && !isLongBrushup) return options;
  return { ...options, timeoutMs: Math.max(Number(options.timeoutMs) || 0, 600000) };
}

async function maybeCallOpenAiResponsesBeta(apiKey, prompt, onFallback, options = {}) {
  options = resolveLongOutputOptions(prompt, options);
  const config = resolveOpenAiResponsesBetaConfig(options);
  if (!config.enabled || config.models.length === 0) return null;

  for (const model of config.models) {
    try {
      console.info(`[OpenAI Responses beta] trying model: ${model}`);
      if (model !== config.models[0] && typeof onFallback === 'function') {
        onFallback(`${model} Responses beta`);
      }
      const response = await requestOpenAiResponses(apiKey, model, prompt, options, false);
      const payload = await response.json();
      const text = extractOpenAiResponsesText(payload);
      if (!text) {
        throw new Error('Empty Responses API output');
      }
      console.info(`[OpenAI Responses beta] completed model: ${model}, chars: ${text.length}`);
      return { text, usedModel: `${model} (Responses beta)` };
    } catch (error) {
      console.warn(`Responses beta model ${model} failed:`, error.message);
      continue;
    }
  }

  return null;
}

async function maybeStreamOpenAiResponsesBeta(apiKey, prompt, onChunk, onFallback, options = {}) {
  options = resolveLongOutputOptions(prompt, options);
  const config = resolveOpenAiResponsesBetaConfig(options);
  if (!config.enabled || config.models.length === 0) return null;
  const useStreaming = options.openAiResponsesStream === true;

  for (const model of config.models) {
    try {
      console.info(`[OpenAI Responses beta] trying ${useStreaming ? 'stream' : 'model'}: ${model}`);
      if (model !== config.models[0] && typeof onFallback === 'function') {
        onFallback(`${model} Responses beta`);
      }
      if (useStreaming) {
        const response = await requestOpenAiResponses(apiKey, model, prompt, options, true);
        const streamState = await readOpenAiResponsesStream(response, onChunk);
        if (streamState.emittedChars <= 0) {
          const eventSummary = [...new Set(streamState.eventTypes)].join(', ') || 'none';
          throw new Error(`Empty Responses stream output (events: ${eventSummary})`);
        }
        console.info(`[OpenAI Responses beta] completed stream model: ${model}, chars: ${streamState.emittedChars}`);
      } else {
        const response = await requestOpenAiResponses(apiKey, model, prompt, options, false);
        const payload = await response.json();
        const text = extractOpenAiResponsesText(payload);
        if (!text) {
          throw new Error('Empty Responses API output');
        }
        onChunk({ text, isThought: false });
        console.info(`[OpenAI Responses beta] completed model: ${model}, chars: ${text.length}`);
      }
      return { usedModel: `${model} (Responses beta)` };
    } catch (error) {
      console.warn(`Responses beta model ${model} ${useStreaming ? 'stream ' : ''}failed:`, error.message);
      continue;
    }
  }

  return null;
}

export {
  DEFAULT_OPENAI_RESPONSES_BETA_MODELS,
  buildOpenAiResponsesRequestBody,
  extractOpenAiResponsesText,
  maybeCallOpenAiResponsesBeta,
  maybeStreamOpenAiResponsesBeta,
  parseOpenAiResponsesStreamEvent,
  resolveLongOutputOptions,
  resolveOpenAiResponsesBetaConfig,
};
