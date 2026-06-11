// Story Maker v5.0.1 public-mode quality booster.
// Thin runtime layer: prompt rules live in modeContracts.js.

import {
  buildQualityContract,
  detectModeFromText,
  isLongModeText,
  MODE_LENGTH_TARGETS,
  PUBLIC_MODE_VALUES,
  QUALITY_MARKER,
  shouldBoostStoryPrompt,
  shouldSkipQualityPrompt,
} from './modeContracts.js';

const OPENAI_SYSTEM_MARKER = '[SMK_OPENAI_PUBLIC_MODE_SYSTEM_V500]';

const OPENAI_SYSTEM_LENGTH_RULES = Object.fromEntries(
  Object.entries(MODE_LENGTH_TARGETS).map(([mode, spec]) => [
    mode,
    `本文は日本語${spec.target}。最低${spec.min}字未満で結末を書くことは禁止。短い場合は、入力済みの要素から会話、行動、沈黙、身体感覚、失敗の後始末、関係変化を追加して場面を厚くする。${spec.rule} 最後の文と会話の括弧を必ず閉じ、途中終了で止めない。`,
  ]),
);

const MODE_STRICT_MIN_CHARS = Object.fromEntries(
  Object.entries(MODE_LENGTH_TARGETS).map(([mode, spec]) => [mode, spec.min]),
);
const MAX_STREAM_REWRITE_ATTEMPTS = 2;

function rewriteGoalText(mode, spec) {
  const min = Number(spec?.min || 0);
  const buffered = {
    '4koma': 1000,
    '4koma_scenario': 4800,
    short_short: 2800,
    novel: 8000,
    medium: 9000,
    scenario: 3600,
    manga: 3600,
    essay: 3200,
    poem: 1100,
    fairy: 3200,
    letter: 2700,
    diary: 2700,
    documentary: 4200,
    radio: 4200,
  }[mode];
  const goal = Math.max(buffered || 0, min);
  return goal ? `最低${min}字、目標${goal}字以上` : (spec?.target || '');
}

const MODE_REWRITE_TARGETS = Object.fromEntries(
  Object.entries(MODE_LENGTH_TARGETS).map(([mode, spec]) => [mode, rewriteGoalText(mode, spec)]),
);

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

function stripLegacyShortLengthCaps(text) {
  const wave = '〜';
  const over = chars => `絶対に${chars}字を超えない`;
  const replacements = [
    [new RegExp(`400${wave}650字、4段落以内の完結したショートショートとして出力する。${over(800)}こと。`, 'g'), 'ショートショートとして、本文は1500字以上を下限にする。'],
    [new RegExp(`400${wave}750字、4段落以内。短い場面で完結させ、${over(800)}。`, 'g'), '本文は1500字以上を下限にし、導入、揺れ、反転、余韻を省略しない。'],
    [new RegExp(`900${wave}1500字、5段落以内の短編小説として出力する。${over(2000)}こと。`, 'g'), '短編小説として、本文は4500字以上を下限にする。'],
    [new RegExp(`900${wave}1500字、5段落以内。短編小説として閉じ、${2000}字を超えない。`, 'g'), '短編小説として、本文は4500字以上を下限にする。'],
    [new RegExp(`3節だけを使い、各節2段落以内、1800${wave}2600字で起承転結を作る。${over(3200)}こと。`, 'g'), '3節だけを使い、本文は5500字以上を下限にして起承転結を作る。'],
    [new RegExp(`3節だけを使い、各節2段落以内、1800${wave}3200字を目安に閉じる。`, 'g'), '3節だけを使い、本文は5500字以上を下限に閉じる。'],
    [/長くなりそうなら場面数を削って短く閉じる。/g, '短く切らず、入力済みの要素から場面の厚みを足して完成稿にする。'],
    [/絶対に(?:800|2000|3200)字を超えない(?:こと)?。?/g, ''],
  ];
  return replacements.reduce((next, [pattern, replacement]) => next.replace(pattern, replacement), String(text || ''));
}

function boostText(text) {
  const raw = String(text || '');
  const source = isLongModeText(raw) ? raw : stripLegacyLocalRuleBlocks(raw);
  const uncapped = isLongModeText(source) ? source : stripLegacyShortLengthCaps(source);
  if (!uncapped) return uncapped;
  if (shouldSkipQualityPrompt(uncapped) || isLongModeText(uncapped)) return uncapped;
  const mode = resolvePromptMode(uncapped);
  if (!mode) return uncapped;
  const continuationFixed = rewriteContinuationPrompt(uncapped, mode);
  if (source.includes(QUALITY_MARKER)) return continuationFixed;
  if (!shouldBoostStoryPrompt(uncapped) && !currentUiMode()) return uncapped;
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
  let publicMode = '';
  const next = { ...body };
  if (Array.isArray(next.contents)) {
    next.contents = next.contents.map(content => {
      if (!content || !Array.isArray(content.parts)) return content;
      let partsChanged = false;
      const parts = content.parts.map(part => {
        if (!part || typeof part.text !== 'string') return part;
        const detectedMode = resolvePromptMode(part.text);
        if (PUBLIC_MODE_VALUES.includes(detectedMode)) publicMode = detectedMode;
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
  if (publicMode && next.generationConfig?.responseMimeType !== 'application/json') {
    next.generationConfig = {
      ...next.generationConfig,
      thinkingConfig: { thinkingBudget: 0 },
    };
    changed = true;
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
    .replace(/(?:Generated|Created) By AI Story Maker V[\d.]+/gi, '')
    .trim()
    .length;
}

function stripPrematureEnding(text) {
  return String(text || '')
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/<thought>[\s\S]*$/gi, '')
    .replace(/\n*(?:【最終自己採点結果】|\[進捗\]|自己採点[:：]|評価理由[:：]|伏線回収度[:：]|起承転結の構造[:：]|制約遵守度[:：]|\*\*修正版プロット\*\*|修正版プロット[:：])[\s\S]*$/u, '')
    .replace(/(?:Generated|Created) By AI Story Maker V[\d.]+/gi, '')
    .replace(/\n?\s*【完】\s*$/u, '')
    .trim();
}

function internalArtifactIssue(body) {
  if (/<thought|<\/thought>/i.test(body)) return '思考タグが本文に混入しています';
  if (/【最終自己採点結果】|\[進捗\]|自己採点[:：]|評価理由[:：]|伏線回収度[:：]|起承転結の構造[:：]|制約遵守度[:：]/.test(body)) {
    return '評価ログが本文に混入しています';
  }
  if (/\*\*修正版プロット\*\*|修正版プロット[:：]/.test(body)) return '下書きプロットが本文に混入しています';
  if (/AI\s*Story\s*Maker|Story\s*Maker|ストーリーメーカー|物語メーカー|生成ツール|作成ツール|ChatGPT|Gemini|OpenAI/i.test(body)) {
    return '生成ツール名またはAPI名が本文に混入しています';
  }
  if (/出力モード厳守|この見出しは本文に出力しない|今回の出力モードは|ジャンル・テーマよりも出力形式を優先してください|以下の必須形式を満たさない出力は禁止/.test(body)) {
    return '内部プロンプト断片が本文に混入しています';
  }
  return '';
}

function normalizeFormatLabelMarkdown(text) {
  const labels = [
    '主張', '観察', '考察', '結論',
    '宛先', '本文', '結び', '差出人',
    '日付', '天気',
    'タイトル', '登場人物',
    'ナレーション', '記録映像', '証言', 'インタビュー', '締め',
    'BGM', 'SE',
  ].join('|');
  const source = String(text || '');
  return source
    .replace(new RegExp(`^(\\s*)\\*\\*\\s*(${labels})\\s*[:：]\\s*\\*\\*\\s*`, 'gm'), '$1$2:')
    .replace(new RegExp(`^(\\s*)\\*\\*\\s*(${labels})\\s*\\*\\*\\s*[:：]\\s*`, 'gm'), '$1$2:');
}

const REQUIRED_MODE_LABELS = {
  essay: [
    ['主張', /^主張\s*[:：]\s*\S+/m],
    ['観察', /^観察\s*[:：]\s*\S+/m],
    ['考察', /^考察\s*[:：]\s*\S+/m],
    ['結論', /^結論\s*[:：]\s*\S+/m],
  ],
  letter: [
    ['宛先', /^宛先\s*[:：]\s*\S+/m],
    ['本文', /^本文\s*[:：]\s*\S+/m],
    ['結び', /^結び\s*[:：]\s*\S+/m],
    ['差出人', /^差出人\s*[:：]\s*\S+/m],
  ],
  diary: [
    ['日付', /^日付\s*[:：]\s*\S+/m],
    ['天気', /^天気\s*[:：]\s*\S+/m],
    ['本文', /^本文\s*[:：]\s*\S+/m],
  ],
  documentary: [
    ['ナレーション', /^ナレーション\s*[:：]\s*\S+/m],
    ['記録映像', /^記録映像\s*[:：]\s*\S+/m],
    ['証言またはインタビュー', /^(?:証言|インタビュー|.+（証言\/インタビュー）)\s*[:：]\s*\S+/m],
    ['締め', /^締め\s*[:：]\s*\S+/m],
  ],
  radio: [
    ['タイトル', /^タイトル\s*[:：]\s*\S+/m],
    ['登場人物', /^登場人物\s*[:：]\s*\S+/m],
    ['BGM', /^BGM\s*[:：]\s*\S+/m],
    ['SE', /^SE\s*[:：]\s*\S+/m],
  ],
};

function requiredLabelIssue(mode, body) {
  const labels = REQUIRED_MODE_LABELS[mode];
  if (!labels) return '';
  const missing = labels
    .filter(([, pattern]) => !pattern.test(body))
    .map(([label]) => label);
  return missing.length ? `必須形式ラベル不足: ${missing.join(' / ')}` : '';
}

function draftRestartIssue(mode, body) {
  const source = String(body || '');
  const countLines = pattern => (source.match(pattern) || []).length;
  if (mode === 'essay') {
    if (countLines(/^主張\s*[:：]/gm) > 1) return '完成後にエッセイの先頭ラベルが再出現しています';
    if (/^結論\s*[:：][\s\S]+(?:。|\n)\s*タイトル\s*[:：]/m.test(source)) {
      return '完成後に別下書きが再開しています';
    }
  }
  if (mode === 'letter' && countLines(/^宛先\s*[:：]/gm) > 1) return '完成後に手紙の先頭ラベルが再出現しています';
  if (mode === 'diary' && countLines(/^日付\s*[:：]/gm) > 1) return '完成後に日記の先頭ラベルが再出現しています';
  if (mode === 'documentary' && countLines(/^ナレーション\s*[:：]/gm) > 1) return '完成後にドキュメンタリーの先頭ラベルが再出現しています';
  if (mode === 'radio' && countLines(/^タイトル\s*[:：]/gm) > 1) return '完成後にラジオドラマの先頭ラベルが再出現しています';
  if (mode === '4koma_scenario' && countLines(/^Topic:/gm) > 1) return '完成後に4コマシナリオの先頭ラベルが再出現しています';
  if (mode === '4koma' && countLines(/(?:^|\n)1コマ目/g) > 1) return '完成後に4コマの先頭ラベルが再出現しています';
  if (!['poem', 'scenario', 'manga'].includes(mode) && countLines(/(?:^|\n)タイトル\s*[:：]/g) > 1) {
    return '完成後にタイトルから別下書きが再開しています';
  }
  return '';
}

function rewriteIssue(mode, text, min, options = {}) {
  const body = normalizeFormatLabelMarkdown(stripPrematureEnding(text));
  const internalIssue = internalArtifactIssue(String(text || '')) || internalArtifactIssue(body);
  if (internalIssue) return internalIssue;
  const count = countBodyChars(body);
  if (min && count < min) return `本文が短すぎます（${count}/${min}字）`;
  const restartIssue = draftRestartIssue(mode, body);
  if (restartIssue) return restartIssue;
  if (/(?:^|\n)\s*(?:タイトル|Topic|Logline|Location|Outfit|Punchline|Scenario|絵|セリフ|演出|狙い|宛先|本文|結び|差出人|BGM|SE|ナレーション|記録映像|証言)\s*[:：]\s*$/u.test(body)) {
    return '末尾または途中に中身のない空ラベルが残っています';
  }
  if (options.strictLabels !== false) {
    const labelIssue = requiredLabelIssue(mode, body);
    if (labelIssue) return labelIssue;
  }
  if (mode === '4koma_scenario' && !/^狙い\s*[:：]\s*\S+/m.test(body.split(/\[4コマ目\]/).pop() || '')) {
    return '4コマ目の狙い欄が未完成です';
  }
  return '';
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

async function rewriteShortOpenAiText(originalFetch, init, body, mode, draft, reason = '短すぎます') {
  const promptText = collectOpenAiText(body).slice(-8000);
  const target = MODE_REWRITE_TARGETS[mode] || `${MODE_STRICT_MIN_CHARS[mode]}字以上`;
  const cleanDraft = stripPrematureEnding(draft)
    || '（初稿は内部メモまたは思考タグだけだったため破棄済み。上の入力条件から完成稿を新規作成してください。）';
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
          `以下の初稿は「${mode}」として${reason}。入力条件と内容の整合性を保ったまま、${target}の完成稿として全面改稿してください。`,
          '短く閉じず、会話、行動、沈黙、身体感覚、失敗の後始末、関係変化を増やしてください。',
          '入力にない固定設定を品質向上の例として足さず、具体化は入力条件と初稿にある要素から行ってください。',
          '',
          '【元の入力条件】',
          promptText,
          '',
          '【短すぎる初稿】',
          cleanDraft,
        ].join('\n'),
      },
    ],
    temperature: 0.95,
    max_tokens: Math.max(Number(body.max_tokens || body.max_completion_tokens || 0), 12000),
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

async function rewriteShortGeminiText(originalFetch, input, init, body, mode, draft, reason = '短すぎます') {
  const url = typeof input === 'string' ? input : input && input.url;
  const promptText = body?.contents?.flatMap(content => (
    Array.isArray(content?.parts) ? content.parts.map(part => part?.text || '') : []
  )).join('\n').slice(-8000);
  const target = MODE_REWRITE_TARGETS[mode] || `${MODE_STRICT_MIN_CHARS[mode]}字以上`;
  const cleanDraft = stripPrematureEnding(draft)
    || '（初稿は内部メモまたは思考タグだけだったため破棄済み。上の入力条件から完成稿を新規作成してください。）';
  const rewritePrompt = [
    'あなたは日本語の編集者です。短すぎる初稿を、読者に見せる完成稿へ全面改稿します。',
    `以下の初稿は「${mode}」として${reason}。入力条件と内容の整合性を保ったまま、${target}の完成稿として全面改稿してください。`,
    '本文のみを出力します。解説、チェックリスト、字数報告、内部指示は出力しません。',
    '短く閉じず、会話、行動、沈黙、身体感覚、失敗の後始末、関係変化を増やしてください。',
    '入力にない固定設定を品質向上の例として足さず、具体化は入力条件と初稿にある要素から行ってください。',
    openAiSystemContract(mode),
    '',
    '【元の入力条件】',
    promptText,
    '',
    '【短すぎる初稿】',
    cleanDraft,
  ].join('\n');
  const rewriteBody = {
    contents: [{ parts: [{ text: rewritePrompt }] }],
    generationConfig: {
      temperature: body?.generationConfig?.temperature ?? 0.95,
      maxOutputTokens: Math.max(Number(body?.generationConfig?.maxOutputTokens || 0), 12000),
      thinkingConfig: { thinkingBudget: 0 },
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
  if (!text) {
    try {
      text = await rewriteShortOpenAiText(originalFetch, init, body, mode, '', '本文が空です');
    } catch {
      return openAiSseResponse(text, response);
    }
  }
  for (let attempt = 0; attempt < MAX_STREAM_REWRITE_ATTEMPTS;) {
    const issue = rewriteIssue(mode, text, min);
    if (!issue) break;
    try {
      attempt += 1;
      document.documentElement.dataset.smkQualityRewrite = `${mode}:${issue}`;
      text = await rewriteShortOpenAiText(originalFetch, init, body, mode, text, issue);
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
  if (!text) {
    try {
      text = await rewriteShortGeminiText(originalFetch, input, init, body, mode, '', '本文が空です');
    } catch {
      return geminiSseResponse(text, response);
    }
  }
  for (let attempt = 0; attempt < MAX_STREAM_REWRITE_ATTEMPTS;) {
    const issue = rewriteIssue(mode, text, min, { strictLabels: false });
    if (!issue) break;
    try {
      attempt += 1;
      document.documentElement.dataset.smkQualityRewrite = `${mode}:${issue}`;
      text = await rewriteShortGeminiText(originalFetch, input, init, body, mode, text, issue);
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
