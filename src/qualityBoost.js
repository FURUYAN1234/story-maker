// Story Maker v5.0.2 public-mode quality booster.
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
import { cleanOutputForPublicMode } from './outputCleanup.js';

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
const MAX_STREAM_REWRITE_ATTEMPTS = 3;
const SEMANTIC_LOOP_MODES = new Set([
  '4koma_scenario',
  'short_short',
  'novel',
  'medium',
  'scenario',
  'manga',
  'fairy',
  'documentary',
  'radio',
]);

const COMMON_KATAKANA_TOKENS = new Set([
  '\u30a2\u30d7\u30ea',
  '\u30a4\u30f3\u30b9\u30bf',
  '\u30ae\u30eb\u30c9',
  '\u30af\u30ea\u30fc\u30e0',
  '\u30b2\u30fc\u30e0',
  '\u30b4\u30d6\u30ea\u30f3',
  '\u30b9\u30de\u30db',
  '\u30bf\u30eb\u30c8',
  '\u30c1\u30e7\u30b3',
  '\u30d1\u30f3',
  '\u30d5\u30a1\u30c3\u30b7\u30e7\u30f3',
  '\u30da\u30f3\u30c0\u30f3\u30c8',
  '\u30ec\u30c8\u30ed',
]);

const COMMON_SUBJECT_TOKENS = new Set([
  '\u4e00\u884c',
  '\u4e16\u754c',
  '\u4eca\u5ea6',
  '\u4ef2\u9593',
  '\u5168\u54e1',
  '\u5b50\u4f9b',
  '\u5f7c\u5973',
  '\u6751\u4eba',
  '\u7269\u8a9e',
  '\u7537\u6027',
  '\u5c11\u5973',
  '\u5c11\u5e74',
  '\u9b54\u7269',
]);

const PROFILE_MARKER_PATTERNS = [
  /\u3068\u3057\u3066/g,
  /\u50cd\u304f\u508d\u3089/g,
  /\u5e97\u4e3b/g,
  /\u5f79\u5272/g,
  /\u611b\u3055\u308c/g,
  /\u7814\u7a76/g,
  /\u8b72\u308a\u53d7\u3051/g,
  /\u958b\u3044\u305f/g,
  /\u968a\u9577/g,
  /\u4fe1\u983c/g,
];

const CLOSING_MARKER_PATTERNS = [
  /\u5f8c\u6094\u306f\u306a\u304b\u3063\u305f/g,
  /\u4eba\u751f/g,
  /\u5fc3\u304b\u3089/g,
  /\u5e78\u305b/g,
  /\u65b0\u3057\u3044\u81ea\u5206/g,
  /\u6e80\u305f\u3055\u308c/g,
  /\u6e80\u8db3/g,
  /\u6e29\u304b/g,
  /\u7a4f\u3084\u304b/g,
  /\u7b11\u9854/g,
  /\u8f1d/g,
];

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

const STRICT_FORMAT_INSTRUCTIONS = {
  '4koma': '4コマ漫画風として、タイトルの後に「1コマ目」「2コマ目」「3コマ目」「4コマ目」を必ず置き、各コマに「絵/状況:」「セリフ:」「狙い:」を含めること。小説本文だけで返すことは禁止。',
  '4koma_scenario': 'AI 4komaシナリオ連携として、Topic、Logline、Location、Outfit、Punchline、Scenario、[1コマ目]から[4コマ目]を必ず置くこと。各コマは「[EMOTION:]」「[Camera:]」「状況:」「絵:」「セリフ:」「演出:」「狙い:」を含め、各コマの「セリフ:」には最低1つ、必ず「キャラ名「短いセリフ。」」形式の吹き出し用セリフを入れること。',
  medium: '中編小説として、先頭から「タイトル:」「第1節」「第2節」「第3節」をこの順で必ず置くこと。第4節や次章予告は禁止。',
  scenario: '脚本/台本として、先頭から「タイトル:」「登場人物:」「場面:」を必ず置くこと。本文はト書きと「人物名: セリフ」で進め、小説の地の文だけで返すことは禁止。',
  manga: 'ストーリー漫画のネームとして、「タイトル:」「ページ1」を置き、各ページ/各コマに「絵:」「セリフ:」「演出:」を必ず書くこと。小説本文だけは禁止。',
  essay: 'エッセイとして「主張:」「観察:」「考察:」「結論:」の4ブロックで書くこと。小説・会話劇・事件解決は禁止。',
  poem: '詩・ポエムとして、タイトルと詩行だけで構成し、解説文や小説段落を出さないこと。',
  letter: '手紙/書簡体として「宛先:」「本文:」「結び:」「差出人:」を必ず置くこと。',
  diary: '日記/独白体として「日付:」「天気:」「本文:」を必ず置き、一人称の日記として書くこと。',
  documentary: 'ドキュメンタリーとして「タイトル:」「ナレーション:」「証言/インタビュー:」「記録映像:」「締め:」を必ず置くこと。',
  radio: 'ラジオドラマとして「タイトル:」「登場人物:」「BGM:」「SE:」を必ず置き、音だけで伝わる会話劇にすること。',
};

function strictFormatInstruction(mode) {
  return STRICT_FORMAT_INSTRUCTIONS[mode] || '';
}

function publicMinimumInstruction(mode) {
  const min = Number(MODE_STRICT_MIN_CHARS[mode] || 0);
  if (!min) return '';
  const bufferedMin = min + Math.max(120, Math.ceil(min * 0.03));
  return `公開本文として清書・整形された後でも必ず${min}字以上を残すこと。安全余白として本文だけで${bufferedMin}字以上を書き、タイトル、見出し、フッター、完結マーカー、自己評価、説明文を文字数に含めないこと。`;
}

function rewriteRepairInstruction(reason) {
  const source = String(reason || '');
  const lines = [];
  const repeatedPhrase = source.match(/repeated phrase loop detected:\s*(.+?)\s*x\d+/i);
  if (repeatedPhrase) {
    lines.push(`検出された反復表現「${repeatedPhrase[1]}」を使い回さない。同じ比喩、語尾、名詞句を削り、別の行動・会話・感覚に置き換える。`);
  }
  if (/profile-roundup loop detected/i.test(source)) {
    lines.push('結末を人物ごとの役割紹介、幸福/信頼/人生の総括段落で並べない。最後は一つの具体的な場面、行動、会話、物音、手触りで閉じる。');
  }
  if (/static ending loop detected/i.test(source)) {
    lines.push('終盤で同じ機能のまとめ段落を連ねない。未解決の小さな作業、相手の反応、具体物の変化を使って場面を前へ進める。');
  }
  return lines.join('\n');
}

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
  const strictFormat = strictFormatInstruction(mode);
  return `${continuationFixed}\n${buildQualityContract(mode)}${strictFormat ? `\n${strictFormat}` : ''}`;
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
    strictFormatInstruction(mode),
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

function stripQualityFooter(text) {
  return String(text || '')
    .replace(/\n*\s*(?:Generated|Created)\s+By\s+AI\s+Story\s+Maker\s+V[\d.]+\.?\s*$/i, '')
    .trimEnd();
}

function normalizeNarrativeText(text) {
  return String(text || '')
    .replace(/[\s\u3000\u300c\u300d\u300e\u300f\uff08\uff09\u3001\u3002\uff01\uff1f!?.,\u30fb\u2026\u2014\u201c\u201d\u2018\u2019\-:;]/g, '')
    .replace(/[()[\]{}]/g, '')
    .toLowerCase();
}

function bodyParagraphs(text) {
  return String(text || '')
    .replace(/(?:Generated|Created) By AI Story Maker V[\d.]+/gi, '')
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length >= 24)
    .filter(paragraph => !/^\s*\u7b2c\s*[0-9\uff10-\uff19\u4e00-\u5341]+\s*[\u7bc0\u7ae0]/.test(paragraph))
    .filter(paragraph => !(paragraph.startsWith('\u3010') && paragraph.endsWith('\u3011') && paragraph.length <= 80));
}

function extractSubjectTokens(text) {
  const source = String(text || '');
  const tokens = new Set();
  const katakanaMatches = source.match(/[\u30a1-\u30f4\u30fc]{2,10}/g) || [];
  for (const token of katakanaMatches) {
    if (COMMON_KATAKANA_TOKENS.has(token)) continue;
    if (/[\u30fc]{3,}/.test(token)) continue;
    tokens.add(token);
  }
  const quotedNameMatches = source.match(/[\u300c\u300e]([^,\u3001\u3002\u300c\u300d\u300e\u300f]{1,8})[\u300d\u300f]\s*(?:\u306f|\u304c|\u3082|\u3092|\u306b)/g) || [];
  for (const match of quotedNameMatches) {
    const name = match
      .replace(/^[\u300c\u300e]/, '')
      .replace(/[\u300d\u300f]\s*(?:\u306f|\u304c|\u3082|\u3092|\u306b).*$/, '');
    if (name.length >= 2 && name.length <= 8) tokens.add(name);
  }
  const nameMatches = source.match(/(?:[一-龯々]{2,4}|[\u3041-\u3096]{2,5})(?=\s*(?:\u306f|\u304c|\u3082|\u3092|\u306b|\u306e))/g) || [];
  for (const token of nameMatches) {
    if (COMMON_SUBJECT_TOKENS.has(token)) continue;
    tokens.add(token);
  }
  return Array.from(tokens).filter(token => token.length >= 2).slice(0, 12);
}

function countPatternHits(text, patterns) {
  return patterns.reduce((total, pattern) => total + ((String(text || '').match(pattern) || []).length), 0);
}

function repeatedPhraseIssue(text) {
  const normalized = normalizeNarrativeText(text);
  if (normalized.length < 1200) return '';
  const repeatThreshold = normalized.length >= 8000 ? 9 : normalized.length >= 4000 ? 7 : 5;
  const counts = new Map();
  for (const size of [10, 12, 14]) {
    for (let index = 0; index <= normalized.length - size; index += 1) {
      const phrase = normalized.slice(index, index + size);
      if (/^\d+$/.test(phrase)) continue;
      if (/^[\u3040-\u309f]+$/.test(phrase)) continue;
      counts.set(phrase, (counts.get(phrase) || 0) + 1);
    }
  }
  const noisyRepeats = [...counts.entries()]
    .filter(([, count]) => count >= repeatThreshold)
    .sort((a, b) => b[1] - a[1]);
  return noisyRepeats.length
    ? `repeated phrase loop detected: ${noisyRepeats[0][0]} x${noisyRepeats[0][1]}`
    : '';
}

function profileRoundupIssue(text) {
  const paragraphs = bodyParagraphs(text);
  if (paragraphs.length < 8) return '';
  const tailCount = Math.min(8, Math.max(4, Math.ceil(paragraphs.length * 0.18)));
  const tail = paragraphs.slice(-tailCount);
  const tailText = tail.join('\n');
  const tailSubjects = extractSubjectTokens(tailText);
  const profileHits = countPatternHits(tailText, PROFILE_MARKER_PATTERNS);
  const closingHits = countPatternHits(tailText, CLOSING_MARKER_PATTERNS);
  const profileParagraphs = tail.filter(paragraph => (
    extractSubjectTokens(paragraph).length >= 1
    && countPatternHits(paragraph, PROFILE_MARKER_PATTERNS) >= 1
  )).length;
  if (tailSubjects.length >= 5 && profileHits >= 6 && closingHits >= 6 && profileParagraphs >= 4) {
    return `profile-roundup loop detected near ending: subjects=${tailSubjects.slice(0, 6).join('/')}, profileHits=${profileHits}, closingHits=${closingHits}, profileParagraphs=${profileParagraphs}`;
  }
  return '';
}

function paragraphProgressionIssue(text) {
  const paragraphs = bodyParagraphs(text);
  if (paragraphs.length < 10) return '';
  let maxSameFunctionRun = 0;
  let currentRun = 0;
  for (const paragraph of paragraphs) {
    const profileHits = countPatternHits(paragraph, PROFILE_MARKER_PATTERNS);
    const closingHits = countPatternHits(paragraph, CLOSING_MARKER_PATTERNS);
    const dialogueCount = (paragraph.match(/\u300c/g) || []).length;
    const staticRoundup = profileHits + closingHits >= 2 && dialogueCount <= 3 && paragraph.length <= 360;
    currentRun = staticRoundup ? currentRun + 1 : 0;
    maxSameFunctionRun = Math.max(maxSameFunctionRun, currentRun);
  }
  return maxSameFunctionRun >= 5
    ? `static ending loop detected: ${maxSameFunctionRun} consecutive summary paragraphs`
    : '';
}

function semanticLoopIssue(mode, body) {
  if (!SEMANTIC_LOOP_MODES.has(mode)) return '';
  return repeatedPhraseIssue(body) || profileRoundupIssue(body) || paragraphProgressionIssue(body);
}

export function detectPublicSemanticLoopIssue(mode, text) {
  const body = normalizeFormatLabelMarkdown(stripPrematureEnding(text));
  return semanticLoopIssue(mode, body);
}

function finalScenarioAimBlock(text) {
  const source = normalizeFormatLabelMarkdown(stripPrematureEnding(text));
  const finalPanelMatch = [...source.matchAll(/^\[4コマ目\]/gm)].pop();
  const finalPanelStart = finalPanelMatch ? finalPanelMatch.index : source.lastIndexOf('[4コマ目]');
  const finalPanel = finalPanelStart >= 0 ? source.slice(finalPanelStart) : source;
  const aims = [...finalPanel.matchAll(/^狙い\s*[:：]/gm)];
  if (!aims.length) return '';
  const aimStart = aims[aims.length - 1].index;
  const afterAim = finalPanel.slice(aimStart);
  const restartMatch = afterAim.match(/\n\s*(?:Topic:|Logline:|Location:|Outfit:|Punchline:|Scenario:|\[[1-4]コマ目\])/);
  const aimEnd = restartMatch?.index > 0 ? restartMatch.index : afterAim.length;
  return afterAim.slice(0, aimEnd).trim();
}

function scenarioFinalAimIsComplete(text) {
  const content = finalScenarioAimBlock(text)
    .replace(/^狙い\s*[:：]\s*/u, '')
    .replace(/\s+/g, ' ')
    .trim();
  return countBodyChars(content) >= 24
    && !/^(?:Generated|Created)\s+By\s+AI\s+Story\s+Maker/i.test(content);
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
  '4koma': [
    ['1コマ目', /(?:^|\n)\s*(?:1|１|一)\s*コマ目/m],
    ['2コマ目', /(?:^|\n)\s*(?:2|２|二)\s*コマ目/m],
    ['3コマ目', /(?:^|\n)\s*(?:3|３|三)\s*コマ目/m],
    ['4コマ目', /(?:^|\n)\s*(?:4|４|四)\s*コマ目/m],
    ['セリフ', /(?:^|\n)\s*セリフ\s*[:：]/m],
  ],
  medium: [
    ['タイトル', /(?:^|\n)\s*(?:タイトル\s*[:：]\s*\S+|【[^】\n]{1,80}】)/m],
    ['第1節', /(?:^|\n)\s*第\s*(?:1|１|一)\s*節/m],
    ['第2節', /(?:^|\n)\s*第\s*(?:2|２|二)\s*節/m],
    ['第3節', /(?:^|\n)\s*第\s*(?:3|３|三)\s*節/m],
  ],
  scenario: [
    ['タイトル', /(?:^|\n)\s*(?:タイトル\s*[:：]\s*\S+|【[^】\n]{1,80}】)/m],
    ['登場人物', /(?:^|\n)\s*登場人物\s*[:：]\s*\S+/m],
    ['場面', /(?:^|\n)\s*場面\s*[:：]\s*\S+/m],
  ],
  manga: [
    ['タイトル', /(?:^|\n)\s*(?:タイトル\s*[:：]\s*\S+|【[^】\n]{1,80}】)/m],
    ['ページ1', /(?:^|\n)\s*ページ\s*(?:1|１|一)/m],
    ['1コマ目', /(?:^|\n)\s*(?:1|１|一)\s*コマ目/m],
    ['絵', /(?:^|\n)\s*(?:絵|状況)\s*[:：]/m],
    ['セリフ', /(?:^|\n)\s*セリフ\s*[:：]/m],
    ['演出', /(?:^|\n)\s*演出\s*[:：]/m],
  ],
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
  const hasDocumentaryInterview = mode === 'documentary'
    && /(?:^|\n)\s*(?:\u8a3c\u8a00\s*\/\s*\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc|\u8a3c\u8a00|\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc)\s*[:\uff1a](?:\s*\S+|\s*\n\s*\S+)/m.test(body);
  const missing = labels
    .filter(([label, pattern]) => {
      if (hasDocumentaryInterview && (/証言|インタビュー/.test(label) || String(label).includes('險ｼ險'))) return false;
      return !pattern.test(body);
    })
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
  if (mode === 'documentary') {
    if (countLines(/^タイトル\s*[:：]/gm) > 1) return '完成後にドキュメンタリーの先頭ラベルが再出現しています';
    const closing = source.search(/^締め\s*[:：]/m);
    if (closing >= 0 && /\n\s*タイトル\s*[:：]/m.test(source.slice(closing + 1))) {
      return '完成後にドキュメンタリーの先頭ラベルが再出現しています';
    }
    return '';
  }
  if (mode === 'radio' && countLines(/^タイトル\s*[:：]/gm) > 1) return '完成後にラジオドラマの先頭ラベルが再出現しています';
  if (mode === '4koma_scenario' && countLines(/^Topic:/gm) > 1) return '完成後に4コマシナリオの先頭ラベルが再出現しています';
  if (mode === '4koma' && countLines(/(?:^|\n)1コマ目/g) > 1) return '完成後に4コマの先頭ラベルが再出現しています';
  if (mode === 'medium') {
    const section3 = source.search(/^第3節/m);
    if (section3 >= 0) {
      const afterSection3 = source.slice(section3 + 1);
      if (/\n\s*タイトル\s*[:：][^\n]{1,120}\n+\s*第1節/m.test(afterSection3)) {
        return '完成後に中編小説の別下書きが再開しています';
      }
      if (/\n\s*第1節(?=\s|$)/m.test(afterSection3)) {
        return '完成後に中編小説の第1節が再出現しています';
      }
    }
  }
  if (['short_short', 'novel', 'medium', 'fairy'].includes(mode) && /\n\s*タイトル\s*[:：][^\n]{1,120}\s*$/m.test(source.trim())) {
    return '本文末尾に別下書きのタイトルだけが残っています';
  }
  if (!['poem', 'scenario', 'manga'].includes(mode) && countLines(/(?:^|\n)タイトル\s*[:：]/g) > 1) {
    return '完成後にタイトルから別下書きが再開しています';
  }
  return '';
}

function rewriteIssue(mode, text, min, options = {}) {
  const sourceWithoutFooter = stripQualityFooter(text);
  const body = normalizeFormatLabelMarkdown(stripPrematureEnding(sourceWithoutFooter));
  const internalIssue = internalArtifactIssue(sourceWithoutFooter) || internalArtifactIssue(body);
  if (internalIssue) return internalIssue;
  const publicBody = cleanOutputForPublicMode(body, mode);
  const count = countBodyChars(publicBody);
  if (min && count < min) return `本文が短すぎます（${count}/${min}字）`;
  const restartIssue = draftRestartIssue(mode, body);
  if (restartIssue) return restartIssue;
  const loopIssue = semanticLoopIssue(mode, body);
  if (loopIssue) return loopIssue;
  if (/(?:^|\n)\s*(?:タイトル|Topic|Logline|Location|Outfit|Punchline|Scenario|絵|セリフ|演出|狙い|宛先|本文|結び|差出人|BGM|SE|ナレーション|記録映像|証言)\s*[:：]\s*$/u.test(body)) {
    return '末尾または途中に中身のない空ラベルが残っています';
  }
  if (options.strictLabels !== false) {
    const labelIssue = requiredLabelIssue(mode, body);
    if (labelIssue) return labelIssue;
  }
  if (mode === '4koma_scenario' && !scenarioFinalAimIsComplete(body)) {
    return '4コマ目の狙い欄が未完成です';
  }
  return '';
}

export function detectPublicRewriteIssue(mode, text, min = MODE_STRICT_MIN_CHARS[mode] || 0, options = {}) {
  return rewriteIssue(mode, text, min, options);
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

function withInternalCompletionMarker(text) {
  const body = stripPrematureEnding(text).trimEnd();
  if (!body) return String(text || '');
  return `${body}\n\n【完】`;
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
          publicMinimumInstruction(mode),
          rewriteRepairInstruction(reason),
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
    publicMinimumInstruction(mode),
    rewriteRepairInstruction(reason),
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
  const finalIssue = rewriteIssue(mode, text, min);
  if (finalIssue) {
    document.documentElement.dataset.smkQualityRewrite = `${mode}:${finalIssue}`;
    return openAiSseResponse(withInternalCompletionMarker(text), response);
  }
  document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}`;
  return openAiSseResponse(withInternalCompletionMarker(text), response);
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
    const issue = rewriteIssue(mode, text, min);
    if (!issue) break;
    try {
      attempt += 1;
      document.documentElement.dataset.smkQualityRewrite = `${mode}:${issue}`;
      text = await rewriteShortGeminiText(originalFetch, input, init, body, mode, text, issue);
    } catch {
      break;
    }
  }
  const finalIssue = rewriteIssue(mode, text, min);
  if (finalIssue) {
    document.documentElement.dataset.smkQualityRewrite = `${mode}:${finalIssue}`;
    return geminiSseResponse(withInternalCompletionMarker(text), response);
  }
  document.documentElement.dataset.smkQualityRewrite = `${mode}:${countBodyChars(text)}`;
  return geminiSseResponse(withInternalCompletionMarker(text), response);
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
