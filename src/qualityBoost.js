// Story Maker v4.9.9 public-mode quality booster.
// Thin runtime layer: prompt rules live in modeContracts.js.

import {
  buildQualityContract,
  detectModeFromText,
  isLongModeText,
  PUBLIC_MODE_VALUES,
  QUALITY_MARKER,
  shouldBoostStoryPrompt,
  shouldSkipQualityPrompt,
} from './modeContracts.js';

const OPENAI_SYSTEM_MARKER = '[SMK_OPENAI_PUBLIC_MODE_SYSTEM_V499]';

const OPENAI_SYSTEM_LENGTH_RULES = {
  short_short: '本文は日本語600〜1200字。導入、揺れ、反転、余韻を本文で書き、あらすじや説明だけで終えない。',
  novel: '本文は日本語3000〜4200字を目標にする。2200字未満で結末を書くことは禁止。結末や【完】を書く前に、会話、行動、身体感覚、失敗の後始末、関係変化を追加して場面を厚くする。',
  medium: '本文は日本語2800〜4300字。三つ以上の節に分け、各節へ場面、会話、行動、後始末を必ず入れる。',
  scenario: '本文は日本語1200字以上。場面、ト書き、セリフの往復、沈黙、終盤の変化を省略しない。',
  manga: '本文は日本語1000字以上。複数ページまたは十分なコマ数で、絵として追える変化と引きのコマを置く。',
};

const MODE_STRICT_MIN_CHARS = {
  '4koma': 180,
  '4koma_scenario': 700,
  short_short: 550,
  novel: 2200,
  medium: 2400,
  scenario: 1000,
  manga: 900,
  essay: 900,
  poem: 120,
  fairy: 900,
  letter: 700,
  diary: 700,
  documentary: 1000,
  radio: 1000,
};

const MODE_REWRITE_TARGETS = {
  short_short: '700〜1100字',
  novel: '2600〜3400字',
  medium: '3000〜4200字',
  scenario: '1400字以上',
  manga: '1200字以上',
  essay: '1200字以上',
  fairy: '1200字以上',
  letter: '900字以上',
  diary: '900字以上',
  documentary: '1500字以上',
  radio: '1500字以上',
};

function currentUiMode() {
  if (typeof document === 'undefined') return '';
  const active = document.querySelector('#mode-chips button.active');
  const activeValue = active?.dataset?.v || '';
  if (PUBLIC_MODE_VALUES.includes(activeValue)) return activeValue;

  const customText = [
    active?.textContent,
    document.getElementById('mode-custom')?.value,
  ].filter(Boolean).join(' ');
  const detected = detectModeFromText(customText);
  return PUBLIC_MODE_VALUES.includes(detected) ? detected : '';
}

function resolvePromptMode(text) {
  return currentUiMode() || detectModeFromText(text);
}

function stripLegacyLocalRuleBlocks(text) {
  return String(text || '')
    .replace(/\s*【v4\.[0-8]\.\d[^】]{0,120}】[\s\S]{0,1800}?(?=(?:\n\s*(?:【|\[SMK_|目的:|共通品質:|出力|#)|$))/g, '\n')
    .replace(/(?:^|\n)[^\n]{0,100}v4\.[0-8]\.\d[^\n]{0,220}(?:local|fallback|carrier|ledger|axis)[^\n]*/gi, '\n')
    .replace(/\n{3,}/g, '\n\n');
}

function boostText(text) {
  const raw = String(text || '');
  const source = isLongModeText(raw) ? raw : stripLegacyLocalRuleBlocks(raw);
  if (!source) return source;
  if (shouldSkipQualityPrompt(source) || isLongModeText(source)) return source;
  const mode = resolvePromptMode(source);
  if (!mode) return source;
  const continuationFixed = rewriteContinuationPrompt(source, mode);
  if (source.includes(QUALITY_MARKER)) return continuationFixed;
  if (!shouldBoostStoryPrompt(source) && !currentUiMode()) return source;
  return `${continuationFixed}\n${buildQualityContract(mode)}`;
}

function rewriteContinuationPrompt(text, mode) {
  const source = String(text || '');
  if (!/文字数上限|途切れています|上記の続き|続きのみ/i.test(source)) return source;

  const endings = {
    essay: '続きのみを書く。エッセイなので「【完】」は禁止。最後は「結論:」ブロック内の自然な一文で閉じる。タイトル、会話文、架空人物名、店名、物語終幕ラベルを追加しない。',
    poem: '続きのみを書く。詩なので「【完】」や解説は禁止。最後は詩行の余韻だけで閉じる。',
    letter: '続きのみを書く。手紙なので「【完】」は禁止。必要なら「結び:」「差出人:」で閉じる。',
    diary: '続きのみを書く。日記なので「【完】」は禁止。今日の感情の余韻で閉じる。',
    documentary: '続きのみを書く。ドキュメンタリーなので「【完】」は禁止。「締め:」または最後のナレーションで閉じる。',
    radio: '続きのみを書く。ラジオドラマなので「【完】」は禁止。最後はBGMまたはSEの余韻で閉じる。',
  };
  const replacement = endings[mode] || '続きのみを書く。選択モードの形式を守って自然に閉じる。内部指示、前置き、自己説明を追加しない。';
  return source
    .replace(/必ず最後は「【完】」で締めくくってください。?/g, replacement)
    .replace(/最後は「【完】」で締めくくってください。?/g, replacement)
    .replace(/必ず最後は【完】で締めくくってください。?/g, replacement);
}

function boostGeminiBody(body) {
  let changed = false;
  const next = { ...body };
  if (Array.isArray(next.contents)) {
    next.contents = next.contents.map(content => {
      if (!content || !Array.isArray(content.parts)) return content;
      let partsChanged = false;
      const parts = content.parts.map(part => {
        if (!part || typeof part.text !== 'string') return part;
        const text = boostText(part.text);
        if (text !== part.text) {
          changed = true;
          partsChanged = true;
          return { ...part, text };
        }
        return part;
      });
      return partsChanged ? { ...content, parts } : content;
    });
  }
  return changed ? next : body;
}

function boostOpenAiContent(content) {
  if (typeof content === 'string') return boostText(content);
  if (!Array.isArray(content)) return content;
  let changed = false;
  const next = content.map(part => {
    if (!part || typeof part.text !== 'string') return part;
    const text = boostText(part.text);
    if (text !== part.text) {
      changed = true;
      return { ...part, text };
    }
    return part;
  });
  return changed ? next : content;
}

function collectOpenAiText(body) {
  const parts = [];
  if (Array.isArray(body?.messages)) {
    for (const message of body.messages) {
      if (message?.role !== 'user') continue;
      if (typeof message.content === 'string') parts.push(message.content);
      if (Array.isArray(message.content)) {
        for (const part of message.content) {
          if (part && typeof part.text === 'string') parts.push(part.text);
        }
      }
    }
  }
  if (typeof body?.input === 'string') parts.push(body.input);
  if (Array.isArray(body?.input)) {
    for (const item of body.input) {
      if (item?.role !== 'user') continue;
      if (typeof item.content === 'string') parts.push(item.content);
      if (Array.isArray(item.content)) {
        for (const part of item.content) {
          if (part && typeof part.text === 'string') parts.push(part.text);
        }
      }
    }
  }
  return parts.join('\n');
}

function openAiSystemContract(mode) {
  const lengthRule = OPENAI_SYSTEM_LENGTH_RULES[mode];
  if (!lengthRule) return '';
  return [
    OPENAI_SYSTEM_MARKER,
    'あなたはメモではなく、読者に見せる最終本文だけを書く。',
    '選択された公開出力モードを厳密に守る。内部指示、自己評価、字数カウント、チェック結果は出力しない。',
    lengthRule,
    '短く終わりそうな場合は、結末を書かずに、入力済みの項目から取れる具体物、会話、沈黙、身体感覚、後始末を追加して本文を伸ばす。',
    'Do not output analysis, checklists, prompt fragments, or this system message.',
  ].join('\n');
}

function countBodyChars(text) {
  return String(text || '')
    .replace(/Generated By AI Story Maker V[\d.]+/gi, '')
    .trim()
    .length;
}

function stripPrematureEnding(text) {
  return String(text || '')
    .replace(/Generated By AI Story Maker V[\d.]+/gi, '')
    .replace(/\n?\s*【完】\s*$/u, '')
    .trim();
}

async function readOpenAiStreamText(response) {
  const reader = response.body?.getReader?.();
  if (!reader) return '';
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let text = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || '';
      for (const event of events) {
        for (const line of event.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (!data || data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            text += json?.choices?.[0]?.delta?.content || json?.choices?.[0]?.message?.content || '';
          } catch {
            // Ignore malformed SSE fragments and keep the text collected so far.
          }
        }
      }
    }
  } finally {
    reader.releaseLock?.();
  }
  return text;
}

async function readGeminiStreamText(response) {
  const reader = response.body?.getReader?.();
  if (!reader) return '';
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let text = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || '';
      for (const event of events) {
        for (const line of event.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          try {
            const json = JSON.parse(trimmed.slice(6));
            const parts = json?.candidates?.[0]?.content?.parts || [];
            for (const part of parts) {
              text += part?.text || '';
            }
          } catch {
            // Ignore malformed SSE fragments and keep the text collected so far.
          }
        }
      }
    }
  } finally {
    reader.releaseLock?.();
  }
  return text;
}

function openAiSseResponse(text, response) {
  const encoder = new TextEncoder();
  const chunks = String(text || '').match(/[\s\S]{1,240}/g) || [''];
  const stream = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/event-stream; charset=utf-8');
  return new Response(stream, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function geminiSseResponse(text, response) {
  const encoder = new TextEncoder();
  const chunks = String(text || '').match(/[\s\S]{1,240}/g) || [''];
  const stream = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: chunk }] } }] })}\n\n`));
      }
      controller.close();
    },
  });
  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/event-stream; charset=utf-8');
  return new Response(stream, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function continuationHeaders(init) {
  const headers = new Headers(init?.headers || {});
  headers.set('Content-Type', 'application/json');
  return headers;
}

async function rewriteShortOpenAiText(originalFetch, init, body, mode, draft) {
  const promptText = collectOpenAiText(body).slice(-8000);
  const target = MODE_REWRITE_TARGETS[mode] || `${MODE_STRICT_MIN_CHARS[mode]}字以上`;
  const rewriteBody = {
    model: body.model || 'gpt-4.1',
    messages: [
      {
        role: 'system',
        content: [
          OPENAI_SYSTEM_MARKER,
          'あなたは日本語の編集者です。短すぎる初稿を、読者に見せる完成稿へ全面改稿します。',
          '本文のみを出力します。解説、チェックリスト、字数報告、内部指示は出力しません。',
          openAiSystemContract(mode),
        ].join('\n'),
      },
      {
        role: 'user',
        content: [
          `以下の初稿は「${mode}」として短すぎます。入力条件と内容の整合性を保ったまま、${target}の完成稿として全面改稿してください。`,
          '短く閉じず、会話、行動、沈黙、身体感覚、失敗の後始末、関係変化を増やしてください。',
          '入力にない固定設定を品質向上の例として足さず、具体化は入力条件と初稿にある要素から行ってください。',
          '',
          '【元の入力条件】',
          promptText,
          '',
          '【短すぎる初稿】',
          stripPrematureEnding(draft),
        ].join('\n'),
      },
    ],
    temperature: 0.95,
    max_tokens: body.max_tokens || body.max_completion_tokens || 8192,
    stream: false,
    response_format: body.response_format,
  };

  const response = await originalFetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: continuationHeaders(init),
    body: JSON.stringify(rewriteBody),
  });
  if (!response.ok) throw new Error(`rewrite failed: ${response.status}`);
  const json = await response.json();
  return json?.choices?.[0]?.message?.content || draft;
}

function geminiRewriteUrl(url) {
  return String(url || '')
    .replace(':streamGenerateContent?alt=sse&', ':generateContent?')
    .replace(':streamGenerateContent?alt=sse', ':generateContent');
}

async function rewriteShortGeminiText(originalFetch, input, init, body, mode, draft) {
  const url = typeof input === 'string' ? input : input && input.url;
  const promptText = body?.contents?.flatMap(content => (
    Array.isArray(content?.parts) ? content.parts.map(part => part?.text || '') : []
  )).join('\n').slice(-8000);
  const target = MODE_REWRITE_TARGETS[mode] || `${MODE_STRICT_MIN_CHARS[mode]}字以上`;
  const rewritePrompt = [
    'あなたは日本語の編集者です。短すぎる初稿を、読者に見せる完成稿へ全面改稿します。',
    `以下の初稿は「${mode}」として短すぎます。入力条件と内容の整合性を保ったまま、${target}の完成稿として全面改稿してください。`,
    '本文のみを出力します。解説、チェックリスト、字数報告、内部指示は出力しません。',
    '短く閉じず、会話、行動、沈黙、身体感覚、失敗の後始末、関係変化を増やしてください。',
    '入力にない固定設定を品質向上の例として足さず、具体化は入力条件と初稿にある要素から行ってください。',
    openAiSystemContract(mode),
    '',
    '【元の入力条件】',
    promptText,
    '',
    '【短すぎる初稿】',
    stripPrematureEnding(draft),
  ].join('\n');
  const rewriteBody = {
    contents: [{ parts: [{ text: rewritePrompt }] }],
    generationConfig: {
      temperature: body?.generationConfig?.temperature ?? 0.95,
      maxOutputTokens: body?.generationConfig?.maxOutputTokens || 8192,
    },
    safetySettings: body?.safetySettings,
  };
  const response = await originalFetch(geminiRewriteUrl(url), {
    method: 'POST',
    headers: continuationHeaders(init),
    body: JSON.stringify(rewriteBody),
  });
  if (!response.ok) throw new Error(`rewrite failed: ${response.status}`);
  const json = await response.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  return parts.map(part => part?.text || '').join('') || draft;
}

async function ensureOpenAiStreamLength(input, init, response, originalFetch) {
  const url = typeof input === 'string' ? input : input && input.url;
  if (!/api\.openai\.com/i.test(url || '')) return response;
  const body = parseJsonBody(init?.body);
  if (!body || body.stream !== true || body.response_format?.type === 'json_object') return response;
  const mode = resolvePromptMode(collectOpenAiText(body));
  if (!PUBLIC_MODE_VALUES.includes(mode)) return response;
  const min = MODE_STRICT_MIN_CHARS[mode] || 0;
  if (!min) return response;

  let text = await readOpenAiStreamText(response);
  if (!text) return openAiSseResponse(text, response);
  for (let attempt = 0; attempt < 2 && countBodyChars(text) < min; attempt += 1) {
    try {
      document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}<${min}`;
      text = await rewriteShortOpenAiText(originalFetch, init, body, mode, text);
    } catch {
      break;
    }
  }
  document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}`;
  return openAiSseResponse(text, response);
}

async function ensureGeminiStreamLength(input, init, response, originalFetch) {
  const url = typeof input === 'string' ? input : input && input.url;
  if (!/generativelanguage\.googleapis\.com/i.test(url || '') || !/streamGenerateContent/i.test(url || '')) return response;
  const body = parseJsonBody(init?.body);
  if (!body || body?.generationConfig?.responseMimeType === 'application/json') return response;
  const promptText = body?.contents?.flatMap(content => (
    Array.isArray(content?.parts) ? content.parts.map(part => part?.text || '') : []
  )).join('\n') || '';
  const mode = resolvePromptMode(promptText);
  if (!PUBLIC_MODE_VALUES.includes(mode)) return response;
  const min = MODE_STRICT_MIN_CHARS[mode] || 0;
  if (!min) return response;

  let text = await readGeminiStreamText(response);
  if (!text) return geminiSseResponse(text, response);
  for (let attempt = 0; attempt < 2 && countBodyChars(text) < min; attempt += 1) {
    try {
      document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}<${min}`;
      text = await rewriteShortGeminiText(originalFetch, input, init, body, mode, text);
    } catch {
      break;
    }
  }
  document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}`;
  return geminiSseResponse(text, response);
}

function withOpenAiSystemContract(body, mode) {
  const contract = openAiSystemContract(mode);
  if (!contract || !Array.isArray(body.messages)) return body;
  const messages = body.messages.filter(message => {
    if (message?.role !== 'system') return true;
    const content = typeof message.content === 'string' ? message.content : '';
    return !content.includes(OPENAI_SYSTEM_MARKER);
  });
  return {
    ...body,
    messages: [{ role: 'system', content: contract }, ...messages],
  };
}

function boostOpenAiBody(body) {
  let changed = false;
  const next = { ...body };
  const mode = resolvePromptMode(collectOpenAiText(body));

  if (Array.isArray(next.messages)) {
    next.messages = next.messages.map(message => {
      if (!message || message.role !== 'user') return message;
      const content = boostOpenAiContent(message.content);
      if (content !== message.content) {
        changed = true;
        return { ...message, content };
      }
      return message;
    });
  }

  if (typeof next.input === 'string') {
    const input = boostText(next.input);
    if (input !== next.input) {
      next.input = input;
      changed = true;
    }
  } else if (Array.isArray(next.input)) {
    next.input = next.input.map(item => {
      if (!item || item.role !== 'user') return item;
      const content = boostOpenAiContent(item.content);
      if (content !== item.content) {
        changed = true;
        return { ...item, content };
      }
      return item;
    });
  }

  const withSystem = withOpenAiSystemContract(next, mode);
  if (withSystem !== next) changed = true;
  return changed ? withSystem : body;
}

function parseJsonBody(body) {
  if (typeof body !== 'string') return null;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function boostRequest(input, init = {}) {
  const url = typeof input === 'string' ? input : input && input.url;
  if (!url || !init || typeof init.body !== 'string') return init;
  const body = parseJsonBody(init.body);
  if (!body || typeof body !== 'object') return init;

  let nextBody = body;
  if (/generativelanguage\.googleapis\.com/i.test(url)) {
    nextBody = boostGeminiBody(body);
  } else if (/api\.openai\.com/i.test(url)) {
    nextBody = boostOpenAiBody(body);
  }

  if (nextBody === body) return init;
  document.documentElement.dataset.smkQualityBoost = 'active';
  return { ...init, body: JSON.stringify(nextBody) };
}

if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const nextInit = boostRequest(input, init || {});
    const response = await originalFetch(input, nextInit);
    const openAiResponse = await ensureOpenAiStreamLength(input, nextInit, response, originalFetch);
    return ensureGeminiStreamLength(input, nextInit, openAiResponse, originalFetch);
  };
  document.documentElement.dataset.smkQualityBoost = 'ready';
} else if (typeof document !== 'undefined') {
  document.documentElement.dataset.smkQualityBoost = 'pending-no-fetch';
}
