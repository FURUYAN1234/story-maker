import { yt } from './providerClients.js';
import {
  buildProgressHeartbeatText,
  createProgressHeartbeat,
  formatHeartbeatSeconds,
} from './progressHeartbeat.js';
import { STORY_MAKER_FOOTER } from './version.js';
import {
  extractStoryTitle,
  stripStoryMakerFooter,
} from './kakuyomuAssist.js';

const DEFAULT_MODEL = 'gemini-2.5-flash';
const DEFAULT_CHAPTER_COUNT = 6;
const DEFAULT_TARGET_TOTAL_CHARS = 30000;
const LONGIFY_TARGET_MIN = 10000;
const LONGIFY_TARGET_MAX = 150000;
const MIN_SEED_CHARS = 240;
const MIN_BRUSHUP_LONG_CHARS = 8000;
export const AI_REVIEW_PASS_SCORE = 80;
export const AUTO_BRUSHUP_MAX_ATTEMPTS = 3;
const AUTO_BRUSHUP_START_RETRY_DELAY_MS = 500;
const AUTO_BRUSHUP_START_MAX_WAIT_MS = 10000;
const AUTO_BRUSHUP_START_MAX_RETRIES = Math.ceil(AUTO_BRUSHUP_START_MAX_WAIT_MS / AUTO_BRUSHUP_START_RETRY_DELAY_MS);
const LONGIFY_CHAPTER_RETRY_ATTEMPTS = 3;
const MIN_RENUMBER_FALLBACK_CHARS = 240;
const MIN_FOREIGN_CHAPTER_MIXIN_CHARS = 240;
const LONGIFY_ENDING_REPAIR_ATTEMPTS = 2;
const ENDING_ANCHOR_SOURCE_CHARS = 1600;
const ENDING_ANCHOR_OUTPUT_CHARS = 2600;
const BRUSHUP_CHAPTER_REWRITE_MAX_ATTEMPTS = 2;
const BRUSHUP_CHAPTER_MIN_RATIO = 0.68;
const LONGIFY_CHAPTER_MIN_RATIO = 0.88;
const LONGIFY_CHAPTER_MAX_RATIO = 1.25;
const BRUSHUP_COMPRESSION_TRIGGER_RATIO = 1.35;
const BRUSHUP_COMPRESSION_MIN_RATIO = 0.82;
const BRUSHUP_COMPRESSION_MAX_RATIO = 1.18;
const LONGIFY_CHAPTER_TOKEN_RATIO = 0.98;
const LONGIFY_CHAPTER_RETRY_TOKEN_RATIO = 0.86;
const LONGIFY_CHAPTER_TOKEN_MIN = 1800;
const LONGIFY_CHAPTER_TOKEN_MAX = 9000;
const LONGIFY_CHAPTER_EXPAND_MAX_ATTEMPTS = 3;
const LONGIFY_CHAPTER_EXPAND_SAFETY_MARGIN = 900;
const LONGIFY_TOPUP_MAX_ATTEMPTS = 8;
const BRUSHUP_TOPUP_MAX_ATTEMPTS = 6;
const BRUSHUP_COMPRESSION_TOKEN_RATIO = 0.66;
const BRUSHUP_COMPRESSION_RETRY_TOKEN_RATIO = 0.54;
const BRUSHUP_COMPRESSION_TOKEN_MIN = 2200;
const BRUSHUP_COMPRESSION_TOKEN_MAX = 5200;
const PUBLIC_API_SESSION_KEY = 'story-maker.api.session.v500';
const LEGACY_API_SESSION_KEY = 'smk_api_tab_v497';
const API_WINDOW_NAME_PREFIX = 'story-maker.api.tab-session.v500:';
const UNTITLED_STORY_TITLE = '名称未設定の小説';
const LONGIFY_TITLE_LABEL_LINE_PATTERN = /^[\t \u3000]*(?:小説タイトル|タイトル|題名|作品名)\s*[:：]\s*[^\n]{1,100}[\t \u3000]*$/u;
const LONGIFY_EMPTY_TITLE_LABEL_LINE_PATTERN = /^[\t \u3000]*(?:小説タイトル|タイトル|題名|作品名)\s*[:：]\s*$/u;
const LONGIFY_BRACKETED_TITLE_LABEL_LINE_PATTERN = /^[\t \u3000]*【[\t \u3000]*(?:小説タイトル|タイトル|題名|作品名)[\t \u3000]*】[^\n]{0,100}$/u;
const LONGIFY_BARE_TITLE_ARTIFACT_LINE_PATTERN = /^[\t \u3000]*[【「『]?[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9０-９][\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9０-９\t \u3000・、のとへにがをは]{1,79}[】」』]?[\t \u3000]*$/u;
const LONGIFY_SUBSECTION_HEADING_PATTERN = /^[\t \u3000]*(?:[#＃]{1,6}[\t \u3000]*)?第[\d０-９一二三四五六七八九十百]+[\t \u3000]*節(?:[\t \u3000:：\-ー―／/・]+[^\n]{0,48})?[\t \u3000]*$/u;
const LONGIFY_STANDALONE_FINISH_PATTERN = /^[\t \u3000]*【?\s*完\s*】?[\t \u3000]*$/u;
const LONGIFY_MANGA_PANEL_HEADING_PATTERN = /^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?(?:第?[\d０-９一二三四五六七八九十百]+[\t \u3000]*)?(?:コマ目|コマめ|カット)[\t \u3000]*$/u;
const LONGIFY_MANGA_META_LINE_PATTERN = /^[\t \u3000]*(?:狙い|ねらい|意図|演出意図|構図|カメラ|効果音|SFX)\s*[:：]/u;
const LONGIFY_MANGA_LABEL_PREFIX_PATTERN = /^[\t \u3000]*(?:絵\s*\/\s*状況|絵|状況|セリフ|台詞)\s*[:：]\s*/u;
const LONGIFY_NON_CHAPTER_MARKDOWN_HEADING_PATTERN = /^[\t \u3000]*#{1,6}[\t \u3000]+(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[^\n]{1,120}$/u;
const LONGIFY_TITLE_CANDIDATE_LINE_PATTERN = /^[\t \u3000]*(?:作品タイトル案|タイトル案|作品タイトル|タイトル|題名)\s*[:：]/u;
const LONGIFY_SCRIPT_SPEAKER_LINE_PATTERN = /^[\t \u3000]*(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_（）()・]{1,18}\s*[:：]\s*\S/u;
const LONGIFY_SCRIPT_QUOTED_SPEAKER_LINE_PATTERN = /^[\t \u3000]*(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*[「『]/u;
const LONGIFY_STORYBOARD_DIRECTIVE_LINE_PATTERN = /(?:瞬間を描く|瞬間を演出|対比を見せる|構造を強調|雰囲気を強調|狙いを示す|テーマを示す|変化を示す)[。.!！]?$/u;

// 行頭・行末のMarkdown強調ラッパ（**, __, ~~, 全角＊＊／＿＿）を剥がしてから
// 形式判定する。Geminiは漫画コマ見出しを `**1コマ目**` のように装飾して出すため、
// 装飾を剥がさないと掃除もガードも素通りしてしまう（fail-open）。
function stripLongifyLineEmphasis(line) {
  return String(line || '').trim()
    .replace(/^(?:[*_~＊＿]{1,3})+/u, '')
    .replace(/(?:[*_~＊＿]{1,3})+$/u, '')
    .trim();
}

// 脚本/絵コンテのラベル（絵/状況:・セリフ:・狙い:・カメラ: など）をGeminiが
// `**絵/状況:**` のようにMarkdown強調で囲って出すと、閉じ `**` がコロン直後の
// 行中に来るため、行頭アンカーの既存クリーナ/ガードが素通りしてしまう。
// ラベルを囲む強調ラッパだけを剥がして素のラベル表記へ戻し、既存処理を効かせる。
function unwrapLongifyLabelEmphasis(text) {
  return String(text || '').replace(
    /(^|\n)([^\S\n]*)[*_~＊＿]{1,3}[^\S\n]*((?:絵[^\S\n]*\/[^\S\n]*状況|絵|状況|セリフ|台詞|狙い|ねらい|意図|演出意図|構図|カメラ|効果音|SFX)[^\S\n]*[:：])[^\S\n]*[*_~＊＿]{1,3}/gu,
    '$1$2$3',
  );
}

function stripLongifySpeakerCue(line) {
  return String(line || '').replace(
    /^([\t \u3000]*)(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*([「『])/u,
    '$1$2',
  );
}

function normalizeLongifyChapterHeadingLine(line) {
  const value = String(line || '').trim();
  if (!getChapterNumberFromHeading(value)) return line;
  return value
    .replace(/^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?【[\t \u3000]*/u, '')
    .replace(/[\t \u3000]*】[\t \u3000]*$/u, '')
    .trim();
}

const STYLE_MODE_LABELS = {
  preserve: '原作の文体を維持する',
  intensify: '原作の文体を少し強める',
};

const ENDING_MODE_LABELS = {
  keep: '原作の結末を残す',
  restructure: '結末の意味を残して再構成する',
};

function normalizeText(value) {
  return String(value || '').replace(/\r\n?/g, '\n').trim();
}

function compactBlankLines(value) {
  return normalizeText(value)
    .replace(/\n[\t \u3000]+(?=\n)/g, '\n')
    .replace(/\n(?:[\t \u3000]*\n){2,}/g, '\n\n');
}

function removeStandaloneSceneSeparators(value) {
  return normalizeText(value)
    .split('\n')
    .filter(line => !/^[\t \u3000]*[*＊※]{1,5}[\t \u3000]*$/u.test(line))
    .join('\n');
}

function charLength(value) {
  return Array.from(String(value || '')).length;
}

export function submissionCharLength(value) {
  return Array.from(String(value || '').replace(/[\s\u3000]/gu, '')).length;
}

function normalizeApiKey(value) {
  return String(value || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\s+/g, '');
}

function isRealApiKey(value) {
  const normalized = normalizeApiKey(value);
  return normalized.length >= 20 && !/^\*{6,}$/.test(normalized);
}

function tabStorage() {
  try {
    const storageName = ['ses', 'sion', 'Stor', 'age'].join('');
    return window?.[storageName] || null;
  } catch {
    return null;
  }
}

function safeParseJson(value) {
  try {
    const parsed = JSON.parse(value || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function readWindowNameApiSession() {
  const raw = String(window?.name || '');
  if (!raw.startsWith(API_WINDOW_NAME_PREFIX)) return null;
  return safeParseJson(raw.slice(API_WINDOW_NAME_PREFIX.length));
}

function readStoredApiSession() {
  const storage = tabStorage();
  const candidates = [
    readWindowNameApiSession(),
    safeParseJson(storage?.getItem?.(PUBLIC_API_SESSION_KEY)),
    safeParseJson(storage?.getItem?.(LEGACY_API_SESSION_KEY)),
  ].filter(Boolean);
  return candidates.find(session => {
    return isRealApiKey(session.geminiKey) || isRealApiKey(session.openaiKey);
  }) || null;
}

function providerFromApiKey(apiKey) {
  return normalizeApiKey(apiKey).startsWith('sk-') ? 'openai' : 'gemini';
}

function readRuntimeApiProvider() {
  const input = document.getElementById('apikey');
  const visibleKey = normalizeApiKey(input?.value);
  if (isRealApiKey(visibleKey)) return providerFromApiKey(visibleKey);

  const session = readStoredApiSession();
  if (session?.apiProvider === 'openai') return 'openai';
  return 'gemini';
}

function readRuntimeApiKey() {
  const input = document.getElementById('apikey');
  const visibleKey = normalizeApiKey(input?.value);
  if (isRealApiKey(visibleKey)) return visibleKey;

  const session = readStoredApiSession();
  if (!session) return '';
  const provider = session.apiProvider === 'openai' ? 'openai' : 'gemini';
  const preferred = normalizeApiKey(provider === 'openai' ? session.openaiKey : session.geminiKey);
  if (isRealApiKey(preferred)) return preferred;
  const fallback = normalizeApiKey(provider === 'openai' ? session.geminiKey : session.openaiKey);
  return isRealApiKey(fallback) ? fallback : '';
}

function readSelectedModel(apiKey) {
  const explicit = document.getElementById('model-select')?.value;
  if (explicit) return explicit;
  return providerFromApiKey(apiKey) === 'openai' ? 'gpt-4.1' : DEFAULT_MODEL;
}

export function normalizeLongifySeed(text) {
  return compactBlankLines(stripStoryMakerFooter(text))
    .replace(/^\s*【長編化β】\s*\n+/u, '')
    .trim();
}

export function hasLongifySeed(text, minChars = MIN_SEED_CHARS) {
  return submissionCharLength(normalizeLongifySeed(text)) >= minChars;
}

export function canLongifyOutput({ text, outputIsEmpty = false, apiKey = '' } = {}) {
  return !outputIsEmpty && hasLongifySeed(text) && isRealApiKey(apiKey);
}

function isOutputEmptyForLongify(outputEl) {
  return !outputEl
    || outputEl.classList.contains('empty')
    || Boolean(outputEl.querySelector?.('.guide'));
}

function isStoryGenerationActive() {
  const settingsEl = document.getElementById('settings');
  const generateButton = document.getElementById('btn-generate');
  const outputEl = document.getElementById('output');
  const buttonText = generateButton?.textContent || '';
  const outputText = (outputEl?.innerText || outputEl?.textContent || '').trim();
  return Boolean(
    settingsEl?.classList.contains('generating')
    || (
      generateButton?.disabled
      && /思考中|生成中|構築中|受信中|ライブ表示|API/i.test(buttonText)
    )
    || (
      generateButton?.disabled
      && /^(AIの思考を待っています|AIが考えています|受信待機中)/u.test(outputText)
    )
  );
}

function setLongifyButtonDisabled(button, disabled) {
  if (!button) return;
  button.disabled = Boolean(disabled);
  button.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  button.classList.toggle('is-disabled', Boolean(disabled));
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('ja-JP');
}

function clampInt(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value || ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function deriveChapterCountForTarget(totalChars) {
  if (totalChars <= 10000) return 3;
  if (totalChars <= 20000) return 4;
  if (totalChars <= 50000) return 6;
  if (totalChars <= 100000) return 8;
  return 10;
}

function getSelectedOptionLabel(selectEl, fallback = '') {
  return selectEl?.selectedOptions?.[0]?.textContent?.trim() || fallback;
}

function cleanLongifyTitleCandidate(value) {
  return String(value || '')
    .replace(/^[#＃\s\-・:：]+/u, '')
    .replace(/^["'「『【]+|["'」』】]+$/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isUsableLongifyTitle(value) {
  const title = cleanLongifyTitleCandidate(value);
  return (
    title.length > 0
    && title.length <= 42
    && !/^(?:名称未設定の小説|タイトル未設定|無題|untitled|長編化β)$/iu.test(title)
  );
}

function readActiveChipText(selector) {
  if (typeof document === 'undefined') return '';
  return document.querySelector(selector)?.textContent?.trim() || '';
}

function readInputValue(id) {
  if (typeof document === 'undefined') return '';
  return document.getElementById(id)?.value?.trim() || '';
}

function readAxisValue(axis) {
  return (
    readInputValue(`${axis}-custom`)
    || readActiveChipText(`#${axis}-sub-chips .chip.active`)
    || readActiveChipText(`#${axis}-cat-chips .chip.active`)
  );
}

function readLongifyTitleSettingsFromDom() {
  if (typeof document === 'undefined') return {};
  return {
    theme: readAxisValue('theme'),
    genre: readAxisValue('genre'),
    worldview: readAxisValue('worldview'),
  };
}

function deriveLongifyTitleFromSettings(settings = {}) {
  const theme = cleanLongifyTitleCandidate(settings.theme);
  if (isUsableLongifyTitle(theme)) return theme;
  const worldview = cleanLongifyTitleCandidate(settings.worldview);
  if (isUsableLongifyTitle(worldview)) return `${worldview}の物語`;
  const genre = cleanLongifyTitleCandidate(settings.genre);
  if (isUsableLongifyTitle(genre)) return `${genre}の物語`;
  return '';
}

function extractTitleFromLedgerText(ledgerText = '') {
  const lines = String(ledgerText || '').split('\n');
  for (const line of lines) {
    const match = line.match(/(?:作品タイトル案|タイトル案|作品タイトル|タイトル|題名)\s*[:：]\s*([^\n]{1,80})/u);
    if (!match) continue;
    const title = cleanLongifyTitleCandidate(match[1]);
    if (isUsableLongifyTitle(title)) return title;
  }
  return '';
}

function extractExplicitStoryTitle(storyText = '') {
  const title = cleanLongifyTitleCandidate(extractStoryTitle(storyText));
  return isUsableLongifyTitle(title) ? title : '';
}

function resolveLongifyTitle({
  seedText = '',
  ledgerText = '',
  initialTitle = '',
  settings = readLongifyTitleSettingsFromDom(),
} = {}) {
  const candidates = [
    initialTitle,
    extractExplicitStoryTitle(seedText),
    deriveLongifyTitleFromSettings(settings),
    extractTitleFromLedgerText(ledgerText),
    cleanLongifyTitleCandidate(extractStoryTitle(seedText, settings)),
  ];
  for (const candidate of candidates) {
    const title = cleanLongifyTitleCandidate(candidate);
    if (isUsableLongifyTitle(title)) return title;
  }
  return '';
}

export function createLongifyRunOptions({
  targetTotalChars = DEFAULT_TARGET_TOTAL_CHARS,
  chapterCount = null,
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const total = clampInt(targetTotalChars, DEFAULT_TARGET_TOTAL_CHARS, LONGIFY_TARGET_MIN, LONGIFY_TARGET_MAX);
  const fallbackChapters = deriveChapterCountForTarget(total);
  const chapters = chapterCount === null || chapterCount === undefined
    ? fallbackChapters
    : clampInt(chapterCount, fallbackChapters, 3, 10);
  const averagePerChapter = Math.max(1800, Math.ceil(total / chapters));
  const minPerChapter = Math.max(1600, Math.floor(averagePerChapter * LONGIFY_CHAPTER_MIN_RATIO));
  const recommendedPerChapter = averagePerChapter;
  const maxPerChapter = Math.max(recommendedPerChapter + 600, Math.ceil(averagePerChapter * LONGIFY_CHAPTER_MAX_RATIO));
  const chapterTargetRange = {
    min: minPerChapter,
    ideal: recommendedPerChapter,
    max: maxPerChapter,
  };
  const chapterRangeLabel = `${formatNumber(minPerChapter)}〜${formatNumber(maxPerChapter)}字（理想${formatNumber(recommendedPerChapter)}字 / 空白・改行除外）`;
  return {
    chapterCount: chapters,
    targetTotalChars: `最低${formatNumber(total)}字（空白・改行除外）`,
    targetTotalNumber: total,
    targetChars: `最低${formatNumber(minPerChapter)}字（空白・改行除外 / 理想${formatNumber(recommendedPerChapter)}字 / 上限目安${formatNumber(maxPerChapter)}字）`,
    chapterTargetRange,
    chapterRangeLabel,
    minChapterChars: minPerChapter,
    recommendedChapterChars: recommendedPerChapter,
    maxChapterChars: maxPerChapter,
    styleMode: STYLE_MODE_LABELS[styleMode] ? styleMode : 'preserve',
    styleInstruction: STYLE_MODE_LABELS[styleMode] || STYLE_MODE_LABELS.preserve,
    endingMode: ENDING_MODE_LABELS[endingMode] ? endingMode : 'keep',
    endingInstruction: ENDING_MODE_LABELS[endingMode] || ENDING_MODE_LABELS.keep,
  };
}

export function createLongifyChapterTargetRange(options = {}) {
  const runOptions = createLongifyRunOptions(options);
  return {
    ...runOptions.chapterTargetRange,
    label: runOptions.chapterRangeLabel,
  };
}

function tokenLimitFromCharBudget(charBudget, {
  ratio = LONGIFY_CHAPTER_TOKEN_RATIO,
  min = LONGIFY_CHAPTER_TOKEN_MIN,
  max = LONGIFY_CHAPTER_TOKEN_MAX,
} = {}) {
  const numericBudget = Math.max(1, Number(charBudget || 0));
  return Math.max(min, Math.min(max, Math.ceil(numericBudget * ratio)));
}

export function createLongifyChapterGenerationPlan({
  runOptions = createLongifyRunOptions(),
  completedChars = 0,
  chapterNumber = 1,
} = {}) {
  const options = runOptions?.chapterTargetRange ? runOptions : createLongifyRunOptions(runOptions);
  const currentChars = Math.max(0, Number(completedChars || 0));
  const currentChapter = Math.max(1, Number(chapterNumber || 1));
  const remainingChapters = Math.max(1, Number(options.chapterCount || DEFAULT_CHAPTER_COUNT) - currentChapter + 1);
  const remainingTargetChars = Math.max(0, Number(options.targetTotalNumber || 0) - currentChars);
  const fallbackIdeal = Math.max(1000, Math.floor(Number(options.recommendedChapterChars || 0) * 0.62));
  const budgetedIdeal = remainingTargetChars > 0
    ? Math.ceil(remainingTargetChars / remainingChapters)
    : fallbackIdeal;
  const ideal = Math.max(1000, Math.min(Number(options.recommendedChapterChars || budgetedIdeal), budgetedIdeal));
  const min = Math.max(800, Math.min(Number(options.minChapterChars || ideal), Math.floor(ideal * LONGIFY_CHAPTER_MIN_RATIO)));
  const max = Math.max(min + 420, Math.min(Number(options.maxChapterChars || ideal), Math.ceil(ideal * 1.15)));
  const label = `${formatNumber(min)}〜${formatNumber(max)}字（理想${formatNumber(ideal)}字 / 残り章から逆算）`;
  return {
    min,
    ideal,
    max,
    label,
    targetChars: `最低${formatNumber(min)}字 / 理想${formatNumber(ideal)}字 / 上限目安${formatNumber(max)}字（投稿サイト換算・空白改行除外）`,
    maxOutputTokens: tokenLimitFromCharBudget(max),
  };
}

function longifyTopupOutputTokenLimit(deficitChars) {
  return tokenLimitFromCharBudget(Math.max(1600, Number(deficitChars || 0)), {
    ratio: 0.72,
    min: 1800,
    max: 7000,
  });
}

function longifyTopupMaxAttempts(deficitChars, maxAttempts = LONGIFY_TOPUP_MAX_ATTEMPTS) {
  const deficit = Math.max(0, Number(deficitChars || 0));
  return Math.max(3, Math.min(maxAttempts, Math.ceil(deficit / 2500) + 2));
}

function longifyChapterRetryOutputTokenLimit(generationPlan, validation = {}) {
  if (!validation?.tooLong) return generationPlan.maxOutputTokens;
  return tokenLimitFromCharBudget(Number(generationPlan?.max || 0), {
    ratio: LONGIFY_CHAPTER_RETRY_TOKEN_RATIO,
    min: 520,
    max: Math.max(900, generationPlan.maxOutputTokens - 300),
  });
}

function brushupChapterOutputTokenLimit(targetPlan, attempt = 1) {
  if (!targetPlan?.compressionMode) return 12000;
  return tokenLimitFromCharBudget(Number(targetPlan.max || 0), {
    ratio: attempt > 1 ? BRUSHUP_COMPRESSION_RETRY_TOKEN_RATIO : BRUSHUP_COMPRESSION_TOKEN_RATIO,
    min: BRUSHUP_COMPRESSION_TOKEN_MIN,
    max: BRUSHUP_COMPRESSION_TOKEN_MAX,
  });
}

function readLongifyRunOptionsFromUi() {
  const targetEl = document.getElementById('longify-target-chars');
  const options = createLongifyRunOptions({
    targetTotalChars: targetEl?.value,
  });
  return {
    ...options,
    targetLabel: getSelectedOptionLabel(targetEl, options.targetTotalChars),
    chapterLabel: `${options.chapterCount}章（自動）`,
  };
}

export function buildLongifyLedgerPrompt(seedText, options = {}) {
  const runOptions = createLongifyRunOptions(options);
  return `あなたは商業小説の編集者兼小説家です。
次の短編を、芯を一切ブレさせずに長編へ拡張するための「固定台帳」を作成してください。

重要:
- 本筋を変えない。短編の主人公、欲求、違和感、結末の意味、語り口を固定する。
- 盛ってよいのは、短編の芯から自然に派生する人物関係、場面、伏線、代償、反転だけ。
- 世界観やジャンルを勝手に別物へ変えない。
- 最終本文は投稿サイト準拠文字数で${runOptions.targetTotalChars}を必ず超える設計にする。空白・改行で水増しする章割りは禁止。
- ただし過長化で品質を落とさない。各章の字数レンジは${runOptions.chapterRangeLabel}を基本にし、同じ不安・同じ慰め合い・同じ誓い直しを繰り返して字数を稼がない。
- 章ごとに役割を分ける。各章は「導入 / 誤解 / 失敗 / 反転 / 代償 / 決断 / 着地」のどれを担うかを明確にし、隣接章と同じ役割にしない。
- 文体方針: ${runOptions.styleInstruction}。
- 結末方針: ${runOptions.endingInstruction}。
- 出力は日本語。JSONではなく、見出し付きの編集台帳として書く。
- 本文の再執筆はまだしない。

固定する項目:
0. 作品タイトル案: 本文に明示タイトルがない場合でも、物語の核から短い日本語タイトルを必ず作る。「${UNTITLED_STORY_TITLE}」「無題」は禁止。
1. 作品の核: この物語が何についての話なのか。
2. 主人公の欲求: 表向きの欲求と、本当に必要としているもの。
3. 曲げてはいけない因果: 冒頭から結末までの必須因果。
4. 語り口と温度: 文体、距離感、余韻。
5. 長編化で増やす余地: 増やしても芯を壊さない場面・人物・伏線。
6. 禁止事項: やると短編の良さを壊す改変。
7. 全${runOptions.chapterCount}章の章台帳: 各章に「章の役割 / 開始時の時間・場所・目的 / 新しく起きる事件 / 失敗または選択 / 発見 / 代償 / 関係変化 / 具体物 / 章末で変わった状態 / 次章への引き」を必ず入れる。
8. 反復禁止表: 章冒頭と章末の型を列挙し、同じ目覚め、同じ状況確認、同じ慰め合い、同じ食べ物共有、同じ決意表明で始めたり閉じたりしない設計にする。
9. 最低総量: 投稿サイト準拠文字数で${runOptions.targetTotalChars}。各章は${runOptions.chapterRangeLabel}を前提に、読み物として成立する密度を持つ。

短編原稿:
${seedText}`;
}

function getLongifyChapterRole(chapterNumber, chapterCount) {
  return getBrushupChapterRole(chapterNumber, chapterCount);
}

function buildLongifyChapterRoleMap(chapterCount = DEFAULT_CHAPTER_COUNT, targetTotalChars = 0) {
  const total = Math.max(1, Number(chapterCount || DEFAULT_CHAPTER_COUNT));
  const target = Math.max(0, Number(targetTotalChars || 0));
  const perChapterTarget = target ? Math.max(1200, Math.floor(target / total)) : 0;
  return Array.from({ length: total }, (_, index) => {
    const chapterNumber = index + 1;
    const targetLine = perChapterTarget ? ` / 目安${formatNumber(perChapterTarget)}字前後` : '';
    return `第${chapterNumber}章${targetLine}: ${getLongifyChapterRole(chapterNumber, total)}`;
  }).join('\n');
}

export function buildLongifyChapterPrompt({
  seedText,
  ledgerText,
  chapterNumber,
  chapterCount = DEFAULT_CHAPTER_COUNT,
  previousBridge = '',
  targetChars,
  targetTotalChars,
  chapterRangeLabel = '',
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  const chapterRoleMap = buildLongifyChapterRoleMap(runOptions.chapterCount, runOptions.targetTotalNumber);
  const currentChapterRole = getLongifyChapterRole(chapterNumber, runOptions.chapterCount);
  return `あなたは人間の小説家として、短編を長編化しています。
下の「短編原稿」と「固定台帳」を絶対に守り、第${chapterNumber}章だけを本文として執筆してください。

品質条件:
- 出力は小説本文のみ。解説、メモ、箇条書き、チェック結果、作業宣言は禁止。
- 現在画面で選択されている出力モードや過去の生成形式は一切参照しない。長編化は常に散文の小説本文として行う。
- 章題は「第${chapterNumber}章　（章題）」の形式で始める。
- 章題の直後に「タイトル:」「小説タイトル:」「第1節」などの下位見出しを置かない。章本文へ直接入る。
- 章題のあとは、地の文の段落と必要な会話文だけで続ける。各行を小説本文として読める文章にし、構造ラベルや番号付きの場面行へ分解しない。
- 最低量は投稿サイト準拠文字数で${targetChars || runOptions.targetChars}。この字数を下回る章は不合格。短すぎる要約にしない。
- 字数レンジは投稿サイト準拠で${chapterRangeLabel || runOptions.chapterRangeLabel}。上限を大きく超える場合は、同じ心理説明や同じ状況確認を削り、場面の密度で勝負する。
- この章だけで盛りすぎない。予定章数を守るため、上限目安を超えそうなら全文の逐語的な引き伸ばしではなく、章固有の変化だけを残して閉じる。
- その章の出来事を圧縮せず、会話、行動、沈黙、場所の変化、感覚描写で厚みを出す。
- 文体方針: ${runOptions.styleInstruction}。
- 結末方針: ${runOptions.endingInstruction}。
- 短編の芯を保持する。本筋、主人公の欲求、結末の意味、語り口を変えない。
- 盛る場合も、短編に最初から含まれていた違和感や伏線から自然に派生させる。
- その章の「欲求 / 誤解 / 発見 / 代償 / 関係変化 / 具体物 / 次章への引き」を場面で見せる。
- 固定台帳の第${chapterNumber}章の役割だけを使う。他章の役割を先取りしない。
- 全章役割表の第${chapterNumber}章だけを担当する。第1章と同じ導入の別バージョン、第1章の再説明、第1章で済んだ発見・相談・状況確認の再演は禁止。
- 第${chapterNumber}章の役割: ${currentChapterRole}
- 章冒頭は前章から時間、場所、目的、心理状態のどれかが進んだ地点から始める。短編原稿や前章と同じ「目覚め」「状況確認」「不安の言い直し」から始めない。
- 章末はその章だけの不可逆な変化で閉じる。同じ慰め合い、同じ誓い直し、同じ食べ物共有、同じ「まだ終わっていない」調を章ごとに繰り返さない。
- 台詞、身体感覚、場所の具体、沈黙、言い淀みを入れて、人間が書いたような起伏を作る。
- 便利すぎる偶然、説明過多、AIらしい総括、テンプレの熱血説教は禁止。
- 最終章以外では完全解決しない。最終章では短編の結末の意味へ戻して着地する。
- 各章末に「（つづく）」「次回へ続く」などの連載メタ表示を入れない。
- 各章末に「【完】」などの完結マーカーを入れない。アプリ側が最終整形する。
- 文末に「タイトル:」「Output」「投稿文」「候補」などの管理語を残さない。
- 段落の間に単独の「*」「＊」「※」「***」などの区切り記号を入れない。場面転換は文章で処理する。

現在の章: ${chapterNumber} / ${runOptions.chapterCount}

全章役割表（本文として出力しない。章の重複防止に使う）:
${chapterRoleMap}

前章までの接続メモ:
${previousBridge || 'まだ前章はありません。'}

固定台帳:
${ledgerText}

短編原稿:
${seedText}`;
}

function promptSafeLongifyValidationReason(validation = {}) {
  const reason = String(validation?.reason || '');
  if (/重複|繰り返|既存章/u.test(reason)) return '既存章と重なる場面が多いため';
  if (/小説本文ではない形式|本文形式ではない|混入|漫画|脚本|Markdown|話者ラベル|コマ/u.test(reason)) {
    return '章本文ではない構造記号やラベルが混じったため';
  }
  if (/長すぎ|過長|上限/u.test(reason)) return '章本文が指定レンジより長いため';
  if (/短すぎ|不足|下限/u.test(reason)) return '章本文の場面量が不足したため';
  return reason || '章本文の抽出に失敗しました';
}

function isLongifyOverlapValidation(validation = {}) {
  return /重複|繰り返|既存章|重なる場面/u.test(String(validation?.reason || ''));
}

function buildLongifyChapterRetryPrompt(args = {}, previousDraft = '', validation = {}) {
  const overlapRetry = isLongifyOverlapValidation(validation);
  const previousBodyCandidate = cleanLongifyDraft(previousDraft) || String(previousDraft || '');
  const previousDraftSection = overlapRetry
    ? `前回候補は既存章と重なったため参照しない。台帳の第${args.chapterNumber}章でまだ本文化されていない時間、場所、目的、対立、具体物から新しい場面を起こす。`
    : `前回の本文候補（構造記号は除去済み）:
${clipText(previousBodyCandidate, 2400)}`;
  return `${buildLongifyChapterPrompt(args)}

前回出力は不合格でした。原因: ${promptSafeLongifyValidationReason(validation)}。

再出力ルール:
- 第${args.chapterNumber}章だけを書き直す。
- 他の章番号、別章見出し、空の章見出しを出さない。
- 冒頭は必ず「第${args.chapterNumber}章　（章題）」で始め、その直後から本文を厚く書く。
- 前回出力の本文が別の章番号に入っていた場合でも、今回は第${args.chapterNumber}章として正しい章番号で出す。
- 画面左の出力モードや前回の構造に引っ張られず、章題と本文段落だけの散文小説として書く。
- 前回が短すぎた場合、同じ要約を繰り返さず、会話、行動、身体感覚、場所の変化、選択の代償を増やして最低量を確実に超える。
- 前回が長すぎた場合、同じ心理説明や同じ章末パターンを削り、${args.chapterRangeLabel || '指定字数レンジ'}に近づける。
- 前章までの接続メモに出た冒頭・終盤パターンは再利用しない。
- 重複が原因の場合、前章で描いた発見、確認、慰め合い、同じ小物説明、同じ決意表明を再演しない。
- 重複が原因の場合、章冒頭は前章の結末より後の時刻・場所・目的から始め、前章の出来事は一文で受け止めるだけにする。
- 重複が原因の場合、第1章の別バージョンを書かない。第${args.chapterNumber}章の役割表にある「次の段階」だけを書く。
- 重複が原因の場合、同じ店・同じ部屋・同じ地図/写真/魔法陣/小物の発見から始めず、それを受けた行動、移動、対立、失敗、発見から始める。

${previousDraftSection}`;
}

function buildLongifyChapterExpansionPrompt({
  seedText,
  ledgerText,
  chapterText,
  chapterNumber,
  chapterCount = DEFAULT_CHAPTER_COUNT,
  deficitChars = 0,
  targetChars = 0,
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars: targetChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  const minimumAddition = Math.max(
    1600,
    Math.ceil(Number(deficitChars || 0) + LONGIFY_CHAPTER_EXPAND_SAFETY_MARGIN),
    Math.ceil(Number(deficitChars || 0) * 1.9),
  );
  return `第${chapterNumber}章の草稿が短すぎます。既存草稿を捨てず、同じ章の中へ自然に差し込める「増補本文」だけを書いてください。

条件:
- 出力は増補本文のみ。章見出し、タイトル、解説、箇条書き、作業メモは禁止。
- 投稿サイト準拠文字数で最低${formatNumber(minimumAddition)}字以上を書く。空白・改行で水増ししない。
- 第${chapterNumber}章の途中に入る場面として、会話、行動、身体感覚、場所の変化、選択の代償を増やす。
- 既存草稿の出来事を巻き戻さず、同じ結末へ自然に接続する。
- 短編の芯、本筋、主人公の欲求、結末の意味、語り口を変えない。
- 「（つづく）」「次回へ続く」「タイトル:」「Output」「【完】」などの管理語は禁止。
- 散文の小説本文として増補する。地の文と会話文だけで続け、構造ラベルや番号付きの場面行へ分解しない。
- 文体方針: ${runOptions.styleInstruction}
- 結末方針: ${runOptions.endingInstruction}

固定台帳:
${ledgerText}

短編原稿:
${clipText(seedText, 2400)}

現在の第${chapterNumber}章草稿:
${clipText(chapterText, 4200)}`;
}

function tailChars(text, count) {
  return Array.from(String(text || '')).slice(-count).join('');
}

export function buildLongifyTopupPrompt({
  seedText,
  ledgerText,
  currentText,
  deficitChars = 0,
  targetTotalChars,
  chapterCount = DEFAULT_CHAPTER_COUNT,
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  const minimumAddition = Math.max(1400, Math.ceil(Number(deficitChars || 0) * 1.25));
  return `長編化本文が最低文字数に届いていません。
下の本文を壊さず、既存の最終章へ自然に差し込める追加本文だけを書いてください。

条件:
- 出力は追加本文のみ。解説、作業メモ、見出し、箇条書きは禁止。
- 投稿サイト準拠文字数で最低${formatNumber(minimumAddition)}字以上を書く。空白・改行で水増ししない。
- 短編の芯、本筋、結末の意味、語り口を変えない。
- 既存の結末を上書きせず、結末直前に入る自然な場面、対話、具体物、回想、代償を増やす。
- 「（つづく）」「次回へ続く」「タイトル:」「Output」などの管理語は禁止。
- 段落の間に単独の「*」「＊」「※」「***」などの区切り記号を入れない。場面転換は文章で処理する。
- 文体方針: ${runOptions.styleInstruction}。
- 結末方針: ${runOptions.endingInstruction}。

最低総量（投稿サイト準拠文字数）:
${runOptions.targetTotalChars}

固定台帳:
${ledgerText}

現在本文の末尾:
${tailChars(currentText, 2600)}

短編原稿:
${seedText}`;
}

function countSeedChapterHeadings(text) {
  return (String(text || '').match(/(?:^|\n)\s*(?:#{1,6}\s*)?(?:\u7b2c\s*(?:[0-9\uff10-\uff19]+|[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\s*\u7ae0|Chapter\s+\d+)/giu) || []).length;
}

function normalizeEndingAnchorCandidate(value) {
  return String(value || '')
    .replace(/^[\s\u3000"'\u300c\u300d\u300e\u300f#\-:：・、。！？!?]+|[\s\u3000"'\u300c\u300d\u300e\u300f#\-:：・、。！？!?]+$/gu, '')
    .replace(/\s+/g, '')
    .trim();
}

export function extractLongifyEndingAnchors(seedText, maxAnchors = 10) {
  const tail = tailChars(normalizeLongifySeed(seedText), ENDING_ANCHOR_SOURCE_CHARS);
  const pieces = [
    ...tail.split(/[。！？!?\n]+/u),
    ...Array.from(tail.matchAll(/\u300c([^\u300d]{6,36})\u300d/gu)).map(match => match[1]),
  ]
    .map(normalizeEndingAnchorCandidate)
    .filter(piece => piece.length >= 10 && piece.length <= 48)
    .filter(piece => !/^\u7b2c[0-9\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0/u.test(piece))
    .filter(piece => !/^(CreatedByAIStoryMaker|GeneratedByAIStoryMaker)/iu.test(piece));
  return [...new Set(pieces)].slice(-maxAnchors);
}

function buildLongifyEndingFallbackText(seedText) {
  const tail = tailChars(normalizeLongifySeed(seedText), ENDING_ANCHOR_SOURCE_CHARS);
  const lines = tail.split('\n');
  let start = lines.findLastIndex(line => countSeedChapterHeadings(line) > 0);
  if (start < 0) start = Math.max(0, lines.length - 10);
  return cleanLongifyDraft(lines.slice(start + 1).join('\n'))
    .split('\n')
    .filter(line => !/^\s*(?:#{1,6}\s*)?第[0-9０-９一二三四五六七八九十]+章/u.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function validateLongifyEndingCompletion(longText, seedText) {
  const sourceChapterCount = countSeedChapterHeadings(seedText);
  if (sourceChapterCount < 2) {
    return { ok: true, sourceChapterCount, anchors: [], matchedAnchors: [] };
  }
  const anchors = extractLongifyEndingAnchors(seedText);
  if (!anchors.length) {
    return { ok: true, sourceChapterCount, anchors: [], matchedAnchors: [] };
  }
  const outputTail = normalizeEndingAnchorCandidate(
    tailChars(stripStoryMakerFooter(longText), ENDING_ANCHOR_OUTPUT_CHARS),
  );
  const matchedAnchors = anchors.filter(anchor => outputTail.includes(anchor));
  return {
    ok: matchedAnchors.length > 0,
    sourceChapterCount,
    anchors,
    matchedAnchors,
    reason: matchedAnchors.length
      ? ''
      : '元本文の終盤アンカーが長編化後の末尾に残っていません',
  };
}

export function buildLongifyEndingRepairPrompt({
  seedText,
  ledgerText,
  currentText,
  targetTotalChars,
  chapterCount = DEFAULT_CHAPTER_COUNT,
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  const requiredAnchors = extractLongifyEndingAnchors(seedText, 6);
  const requiredAnchorText = requiredAnchors.length
    ? requiredAnchors.map(anchor => `- ${anchor}`).join('\n')
    : '- （元本文終盤の具体的な約束・日常回帰・余韻を本文内で明示する）';
  return `長編化本文が最低文字数には到達しましたが、元本文の結末まで戻っていません。既存本文の末尾へ自然に接続する「最終補完本文」だけを書いてください。
条件:
- 出力は追加本文のみ。解説、メモ、箇条書き、タイトル、章見出しは禁止。
- 既存本文の出来事を巻き戻さず、現在の末尾から直接つなげる。
- 元本文終盤の意味、解決、余韻、最後の約束を必ず回収する。
- 下の「必ずそのまま含める終盤アンカー」から少なくとも1つを、追加本文の終盤に文字列どおり入れる。
- 投稿サイト換算で最低1,400字以上。空白や改行で水増ししない。
- 文体方針: ${runOptions.styleInstruction}
- 結末方針: ${runOptions.endingInstruction}

必ずそのまま含める終盤アンカー:
${requiredAnchorText}

固定台帳:
${ledgerText}

現在の長編本文末尾:
${tailChars(currentText, 3000)}

元本文の終盤:
${tailChars(seedText, ENDING_ANCHOR_SOURCE_CHARS)}`;
}

export function cleanLongifyDraft(text) {
  const lines = unwrapLongifyLabelEmphasis(stripStoryMakerFooter(text))
    .replace(/^\s*(?:以下(?:に|、)|では、).{0,40}\n+/u, '')
    .replace(/\n?\s*(?:Created By AI Story Maker V[\d.]+|Generated By AI Story Maker V[\d.]+)\s*$/iu, '')
    .replace(/\n?\s*[（(]\s*つづく\s*[）)]\s*$/u, '')
    .replace(/\n?\s*次回へ続く\s*$/u, '')
    .split('\n')
    .map(line => stripLongifySpeakerCue(
      normalizeLongifyChapterHeadingLine(String(line || '').replace(LONGIFY_MANGA_LABEL_PREFIX_PATTERN, '')),
    ));

  const cleaned = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = String(line || '').trim();
    if (LONGIFY_EMPTY_TITLE_LABEL_LINE_PATTERN.test(trimmed)) {
      let nextIndex = index + 1;
      while (nextIndex < lines.length && !String(lines[nextIndex] || '').trim()) nextIndex += 1;
      const nextTrimmed = String(lines[nextIndex] || '').trim();
      if (
        nextTrimmed
        && !getChapterNumberFromHeading(nextTrimmed)
        && LONGIFY_BARE_TITLE_ARTIFACT_LINE_PATTERN.test(nextTrimmed)
        && !/[。.!！？?」』）]$/u.test(nextTrimmed)
      ) {
        index = nextIndex;
      }
      continue;
    }
    cleaned.push(line);
  }

  return cleaned
    .filter(line => !/^[\t \u3000]*[*＊※]{1,5}[\t \u3000]*$/u.test(line))
    .filter(line => !LONGIFY_TITLE_LABEL_LINE_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_BRACKETED_TITLE_LABEL_LINE_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_SUBSECTION_HEADING_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_STANDALONE_FINISH_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_MANGA_PANEL_HEADING_PATTERN.test(stripLongifyLineEmphasis(line)))
    .filter(line => !LONGIFY_MANGA_META_LINE_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_STORYBOARD_DIRECTIVE_LINE_PATTERN.test(String(line || '').trim()))
    .filter(line => !LONGIFY_NON_CHAPTER_MARKDOWN_HEADING_PATTERN.test(String(line || '').trim()))
    .filter(line => {
      const trimmed = String(line || '').trim();
      return LONGIFY_TITLE_CANDIDATE_LINE_PATTERN.test(trimmed)
        || !LONGIFY_SCRIPT_SPEAKER_LINE_PATTERN.test(trimmed);
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function longifyFormatArtifactIssues(text) {
  const lines = normalizeText(unwrapLongifyLabelEmphasis(text)).split('\n').map(line => String(line || '').trim()).filter(Boolean);
  const issues = [];
  if (lines.some(line => LONGIFY_MANGA_PANEL_HEADING_PATTERN.test(stripLongifyLineEmphasis(line)))) {
    issues.push('漫画コマ見出し');
  }
  if (lines.some(line => LONGIFY_MANGA_META_LINE_PATTERN.test(line) || LONGIFY_MANGA_LABEL_PREFIX_PATTERN.test(line))) {
    issues.push('漫画シナリオ記法');
  }
  if (lines.some(line => LONGIFY_NON_CHAPTER_MARKDOWN_HEADING_PATTERN.test(line))) {
    issues.push('章見出し以外のMarkdown見出し');
  }
  if (lines.some(line => !LONGIFY_TITLE_CANDIDATE_LINE_PATTERN.test(line) && LONGIFY_SCRIPT_SPEAKER_LINE_PATTERN.test(line))) {
    issues.push('脚本型の話者ラベル');
  }
  if (lines.some(line => LONGIFY_SCRIPT_QUOTED_SPEAKER_LINE_PATTERN.test(line))) {
    issues.push('脚本型の話者ラベル');
  }
  if (lines.some(line => LONGIFY_BRACKETED_TITLE_LABEL_LINE_PATTERN.test(line) || LONGIFY_STORYBOARD_DIRECTIVE_LINE_PATTERN.test(line))) {
    issues.push('漫画シナリオ記法');
  }
  return issues;
}

export function hasLongifyFormatArtifacts(text) {
  return longifyFormatArtifactIssues(text).length > 0;
}

function normalizeChapterNumberToken(value) {
  const raw = String(value || '').trim();
  if (!raw) return 0;
  const asciiDigits = raw.replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
  if (/^\d+$/u.test(asciiDigits)) return Number.parseInt(asciiDigits, 10) || 0;

  const values = {
    '\u4e00': 1,
    '\u4e8c': 2,
    '\u4e09': 3,
    '\u56db': 4,
    '\u4e94': 5,
    '\u516d': 6,
    '\u4e03': 7,
    '\u516b': 8,
    '\u4e5d': 9,
  };
  if (raw === '\u5341') return 10;
  const tenIndex = raw.indexOf('\u5341');
  if (tenIndex >= 0) {
    const tens = tenIndex > 0 ? values[raw.slice(0, tenIndex)] || 0 : 1;
    const ones = tenIndex < raw.length - 1 ? values[raw.slice(tenIndex + 1)] || 0 : 0;
    return tens * 10 + ones;
  }
  return values[raw] || 0;
}

function getChapterNumberFromHeading(line) {
  const match = String(line || '').match(/^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?(?:\u3010[\t \u3000]*)?\u7b2c[\t \u3000]*([0-9０-９一二三四五六七八九十]+)[\t \u3000]*\u7ae0/u);
  return match ? normalizeChapterNumberToken(match[1]) : 0;
}

function hasChapterHeadingTitle(line) {
  const remainder = String(line || '')
    .replace(/^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?(?:\u3010[\t \u3000]*)?\u7b2c[\t \u3000]*[0-9０-９一二三四五六七八九十]+[\t \u3000]*\u7ae0/u, '')
    .replace(/[\u3011\t \u3000:：\-ー―／/・]+/gu, '')
    .trim();
  return remainder.length > 0;
}

function removeDuplicateLeadingChapterHeadings(lines, chapterNumber) {
  const result = [...lines];
  let first = result.findIndex(line => String(line || '').trim());
  while (first >= 0) {
    const second = result.findIndex((line, index) => index > first && String(line || '').trim());
    if (second < 0) break;
    if (
      getChapterNumberFromHeading(result[first]) !== chapterNumber
      || getChapterNumberFromHeading(result[second]) !== chapterNumber
    ) {
      break;
    }
    if (!hasChapterHeadingTitle(result[first]) && hasChapterHeadingTitle(result[second])) {
      result.splice(first, 1);
    } else {
      result.splice(second, 1);
    }
    first = result.findIndex(line => String(line || '').trim());
  }
  return result;
}

function firstNonEmptyLineIndex(lines = []) {
  return lines.findIndex(line => String(line || '').trim());
}

function splitDraftIntoChapterSections(lines = []) {
  const sections = [];
  let current = [];

  for (const line of lines) {
    if (getChapterNumberFromHeading(line)) {
      if (current.length) sections.push(current);
      current = [line];
      continue;
    }
    if (current.length) current.push(line);
  }
  if (current.length) sections.push(current);
  return sections;
}

function chapterBodyText(chapterText) {
  const lines = cleanLongifyDraft(chapterText).split('\n');
  const first = firstNonEmptyLineIndex(lines);
  if (first >= 0 && getChapterNumberFromHeading(lines[first])) {
    lines.splice(first, 1);
  }
  return lines.join('\n').trim();
}

export function longifyChapterBodyCharLength(chapterText) {
  return submissionCharLength(chapterBodyText(chapterText));
}

export function compactLongifyChapterToMax(chapterText, {
  chapterNumber = 1,
  maxChars = 0,
  minChars = 0,
} = {}) {
  const normalized = ensureChapterHeading(chapterText, chapterNumber);
  const lines = cleanLongifyDraft(normalized).split('\n');
  const first = firstNonEmptyLineIndex(lines);
  const heading = first >= 0 && getChapterNumberFromHeading(lines[first])
    ? lines[first].trim()
    : `第${chapterNumber}章`;
  if (first >= 0 && getChapterNumberFromHeading(lines[first])) {
    lines.splice(first, 1);
  }
  const body = lines.join('\n').trim();
  const limit = Math.max(Number(minChars || 0), Number(maxChars || 0));
  if (!limit || submissionCharLength(body) <= limit) return `${heading}\n\n${body}`.trim();

  const paragraphs = body
    .split(/\n{2,}/u)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);
  if (!paragraphs.length) return `${heading}\n\n${clipText(body, Math.max(400, limit))}`.trim();

  const headBudget = Math.max(Math.floor(limit * 0.62), Number(minChars || 0));
  const tailBudget = Math.max(300, limit - headBudget);
  const head = [];
  let headChars = 0;
  for (const paragraph of paragraphs) {
    const nextChars = submissionCharLength([head.join('\n\n'), paragraph].filter(Boolean).join('\n\n'));
    if (head.length && nextChars > headBudget) break;
    if (!head.length && submissionCharLength(paragraph) > headBudget) {
      head.push(clipText(paragraph, headBudget));
      headChars = submissionCharLength(head.join('\n\n'));
      break;
    }
    head.push(paragraph);
    headChars = nextChars;
  }

  const tail = [];
  let tailChars = 0;
  for (let index = paragraphs.length - 1; index >= head.length; index -= 1) {
    const paragraph = paragraphs[index];
    const next = [paragraph, ...tail].join('\n\n');
    const nextChars = submissionCharLength(next);
    if (tail.length && nextChars > tailBudget) break;
    if (!tail.length && submissionCharLength(paragraph) > tailBudget) {
      tail.unshift(clipText(paragraph, tailBudget));
      tailChars = submissionCharLength(tail.join('\n\n'));
      break;
    }
    tail.unshift(paragraph);
    tailChars = nextChars;
  }

  let compactedBody = [...head, ...tail].filter(Boolean).join('\n\n');
  if (submissionCharLength(compactedBody) > limit) {
    compactedBody = clipText(compactedBody, limit);
  }
  if (submissionCharLength(compactedBody) < Number(minChars || 0)) {
    compactedBody = clipText(body, Math.max(Number(minChars || 0), limit));
  }
  return `${heading}\n\n${compactedBody}`.trim();
}

function renumberLeadingChapterHeading(chapterText, chapterNumber) {
  const lines = cleanLongifyDraft(chapterText).split('\n');
  const first = firstNonEmptyLineIndex(lines);
  if (first >= 0 && getChapterNumberFromHeading(lines[first])) {
    lines[first] = String(lines[first]).replace(
      /(第[\t \u3000]*)([0-9０-９一二三四五六七八九十]+)([\t \u3000]*章)/u,
      `$1${chapterNumber}$3`,
    );
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  return `第${chapterNumber}章\n\n${cleanLongifyDraft(chapterText)}`.trim();
}

function normalizeChapterSection(sectionLines, chapterNumber) {
  return removeDuplicateLeadingChapterHeadings(sectionLines, chapterNumber)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function extractExpectedLongifyChapterDraft(text, chapterNumber) {
  const draft = cleanLongifyDraft(text);
  if (!draft) return '';

  const expected = Number(chapterNumber) || 0;
  if (!expected) return draft;

  const lines = draft.split('\n');
  const sections = splitDraftIntoChapterSections(lines);
  if (sections.length) {
    const expectedSection = sections.find(section => (
      getChapterNumberFromHeading(section[firstNonEmptyLineIndex(section)] || '') === expected
    ));
    if (expectedSection) {
      const normalized = normalizeChapterSection(expectedSection, expected);
      if (longifyChapterBodyCharLength(normalized) >= MIN_RENUMBER_FALLBACK_CHARS || sections.length === 1) {
        return normalized;
      }
    }

    const fallbackSection = sections.find(section => (
      longifyChapterBodyCharLength(section.join('\n')) >= MIN_RENUMBER_FALLBACK_CHARS
    ));
    if (fallbackSection) {
      return renumberLeadingChapterHeading(
        normalizeChapterSection(fallbackSection, getChapterNumberFromHeading(fallbackSection[firstNonEmptyLineIndex(fallbackSection)] || '')),
        expected,
      );
    }
    if (expectedSection) return normalizeChapterSection(expectedSection, expected);
  }

  const start = lines.findIndex(line => getChapterNumberFromHeading(line) === expected);
  if (start < 0) return draft;

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const current = getChapterNumberFromHeading(lines[index]);
    if (current && current !== expected) {
      end = index;
      break;
    }
  }

  return removeDuplicateLeadingChapterHeadings(lines.slice(start, end), expected)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function validateLongifyChapterDraft(chapterText, {
  chapterNumber = 1,
  targetChars = 0,
  maxChars = 0,
  rawText = '',
} = {}) {
  const normalized = cleanLongifyDraft(chapterText);
  const firstLine = normalized.split('\n').find(line => String(line || '').trim()) || '';
  const headingNumber = getChapterNumberFromHeading(firstLine);
  const bodyChars = longifyChapterBodyCharLength(normalized);
  const numericTargetChars = Math.max(0, Number(targetChars || 0));
  const minBodyChars = numericTargetChars > 0
    ? Math.max(1200, Math.min(6200, Math.floor(numericTargetChars * 0.82)))
    : 700;
  const maxBodyChars = Number(maxChars || 0) > 0
    ? Math.ceil(Number(maxChars) * 1.3)
    : 0;
  const expected = Number(chapterNumber) || 0;
  const artifactIssues = longifyFormatArtifactIssues(rawText || chapterText);
  if (artifactIssues.length) {
    return {
      ok: false,
      headingNumber,
      bodyChars,
      minBodyChars,
      maxBodyChars,
      tooLong: false,
      reason: `小説本文ではない形式が混入しています（${artifactIssues.join('、')}）`,
    };
  }
  const rawSections = splitDraftIntoChapterSections(cleanLongifyDraft(rawText).split('\n'));
  if (rawSections.length > 1) {
    const rawExpectedSection = rawSections.find(section => (
      getChapterNumberFromHeading(section[firstNonEmptyLineIndex(section)] || '') === expected
    ));
    const rawExpectedBodyChars = rawExpectedSection
      ? longifyChapterBodyCharLength(rawExpectedSection.join('\n'))
      : 0;
    const foreignMixin = rawSections.find(section => {
      const heading = getChapterNumberFromHeading(section[firstNonEmptyLineIndex(section)] || '');
      return heading && heading !== expected
        && longifyChapterBodyCharLength(section.join('\n')) >= MIN_FOREIGN_CHAPTER_MIXIN_CHARS;
    });
    if (foreignMixin && rawExpectedBodyChars < minBodyChars) {
      return {
        ok: false,
        headingNumber,
        bodyChars,
        minBodyChars,
        reason: `第${expected}章本文が不足したまま別章が混入しています`,
      };
    }
  }
  const tooLong = Boolean(maxBodyChars && bodyChars > maxBodyChars);
  const ok = headingNumber === expected && bodyChars >= minBodyChars && !tooLong;
  return {
    ok,
    headingNumber,
    bodyChars,
    minBodyChars,
    maxBodyChars,
    tooLong,
    reason: headingNumber !== expected
      ? `章番号が第${expected}章ではありません`
      : tooLong
        ? `章本文が長すぎます（${formatNumber(bodyChars)} / 上限${formatNumber(maxBodyChars)}字）`
      : `章本文が短すぎます（${formatNumber(bodyChars)} / ${formatNumber(minBodyChars)}字）`,
  };
}

export function normalizeLongifyPublicText(text) {
  return compactBlankLines(removeStandaloneSceneSeparators(stripStoryMakerFooter(text)));
}

export function countLongifyChapterHeadings(text) {
  const normalized = normalizeLongifyPublicText(text);
  return (normalized.match(/(?:^|\n)\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*章/gmu) || []).length;
}

export function isLongifiedOutputText(text) {
  return submissionCharLength(normalizeLongifyPublicText(text)) >= MIN_BRUSHUP_LONG_CHARS
    && countLongifyChapterHeadings(text) >= 2;
}

function clipText(text, maxChars) {
  const chars = Array.from(String(text || ''));
  if (chars.length <= maxChars) return chars.join('');
  const half = Math.max(200, Math.floor(maxChars / 2));
  return `${chars.slice(0, half).join('')}\n...\n${chars.slice(-half).join('')}`;
}

function previewText(text, maxChars = 240) {
  const chars = Array.from(String(text || '').replace(/\s+/g, ' ').trim());
  if (chars.length <= maxChars) return chars.join('');
  return `${chars.slice(0, maxChars).join('')}...`;
}

export function splitLongifyManuscript(text) {
  const normalized = normalizeLongifyPublicText(text);
  const lines = normalized.split('\n');
  const titleLines = [];
  const chapters = [];
  let current = [];
  const headingPattern = /^\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*章/u;

  for (const line of lines) {
    if (headingPattern.test(line)) {
      if (current.length) chapters.push(current.join('\n').trim());
      current = [line];
      continue;
    }
    if (current.length) {
      current.push(line);
    } else if (line.trim()) {
      titleLines.push(line);
    }
  }
  if (current.length) chapters.push(current.join('\n').trim());

  return {
    title: titleLines.join('\n').trim(),
    chapters: chapters.filter(Boolean),
    text: normalized,
  };
}

function buildBrushupReviewSource(manuscript, maxChars = 26000) {
  const normalized = normalizeLongifyPublicText(manuscript);
  if (charLength(normalized) <= maxChars) return normalized;
  const split = splitLongifyManuscript(normalized);
  if (!split.chapters.length) return clipText(normalized, maxChars);
  const perChapter = Math.max(900, Math.floor(maxChars / split.chapters.length));
  return [
    split.title,
    ...split.chapters.map((chapter, index) => `第${index + 1}章 抜粋\n${clipText(chapter, perChapter)}`),
  ].filter(Boolean).join('\n\n');
}

function isStructuralBrushupNeeded(critiqueText, chapterCount = 0) {
  const text = String(critiqueText || '');
  return Number(chapterCount || 0) >= 2
    && /重複|反復|同じ導入|同じ冒頭|同型|停滞|時系列|再構成|構成再設計|配分|偏|集中|ダイジェスト|前進していない|章の役割/u.test(text);
}

function getBrushupChapterRole(chapterNumber, chapterCount) {
  const index = Math.max(1, Number(chapterNumber || 1));
  const total = Math.max(1, Number(chapterCount || 1));
  if (index <= 1) {
    return '導入。主人公の欲求、日常の違和感、最初の発見や決意だけを扱う。終盤イベント、解決、成功後の反響を先取りしない。';
  }
  if (index >= total) {
    return 'クライマックスと余韻。ここまでの選択・伏線・関係変化を結末へつなげる。新しい導入や最初の相談を繰り返さない。';
  }
  const ratio = index / total;
  if (ratio <= 0.34) {
    return '探索と初回行動。第1章の発見を受け、場所・目的・手掛かりを前進させる。導入の再演ではなく、小さな失敗か発見で閉じる。';
  }
  if (ratio <= 0.55) {
    return '試みと障害。計画、準備、意見の対立、外部からの抵抗、代償を具体的な場面で描く。成功結果を急いで語り切らない。';
  }
  if (ratio <= 0.78) {
    return '転換と関係変化。行動の反響、協力者や反対者との対話、隠れていた事実、最後の鍵へ向かう変化を扱う。';
  }
  return '終盤前の収束。過去の証言、未解決の感情、最後の手掛かりを集め、最終章で解くべき問いを明確にする。';
}

function buildBrushupMaterialMap(sourceChapters = [], maxChars = 7200) {
  const chapters = Array.isArray(sourceChapters) ? sourceChapters : [];
  if (!chapters.length) return '';
  const perChapter = Math.max(520, Math.floor(maxChars / chapters.length));
  return chapters.map((chapter, index) => {
    const cleaned = cleanLongifyDraft(chapter);
    const chars = submissionCharLength(cleaned);
    return [
      `第${index + 1}章素材: ${formatNumber(chars)}字`,
      clipText(cleaned, perChapter),
    ].join('\n');
  }).join('\n\n');
}

export function buildLongifyBrushupStructureGuide({
  critiqueText = '',
  sourceChapters = [],
  targetTotalChars = 0,
  compressionMode = false,
} = {}) {
  const chapters = Array.isArray(sourceChapters) ? sourceChapters.filter(Boolean) : [];
  if (!chapters.length) return '';
  const chapterCount = chapters.length;
  const structural = isStructuralBrushupNeeded(critiqueText, chapterCount);
  const target = Number(targetTotalChars || 0);
  const perChapterTarget = target ? Math.max(1200, Math.floor(target / chapterCount)) : 0;
  const chapterRoles = chapters.map((_, index) => {
    const chapterNumber = index + 1;
    const targetLine = perChapterTarget ? ` / 目安${formatNumber(perChapterTarget)}字前後` : '';
    return `第${chapterNumber}章の役割${targetLine}: ${getBrushupChapterRole(chapterNumber, chapterCount)}`;
  }).join('\n');
  const materialMap = buildBrushupMaterialMap(chapters);
  return compactBlankLines([
    '【全体再構成台帳】',
    structural
      ? '今回の主目的: 章単位の磨きではなく、講評で指摘された重複・時系列崩れ・終盤集中を、全章の役割分担で直す。'
      : '今回の主目的: 章ごとの場面密度を上げつつ、隣接章と同じ導入・同じ余韻を避ける。',
    compressionMode
      ? '字数方針: 過長な説明、同じ状況確認、同じ決意表明を削る。削る対象は反復であり、因果や感情の段差ではない。'
      : '字数方針: 不足分は章の役割に合う場面として足す。既に別章で語った出来事を再演して水増ししない。',
    '採用ルール: 元の第N章をそのまま磨くのではなく、下の章別役割に合わせて、必要なら現原稿の別章にある素材を移動・統合してよい。',
    '禁止ルール: 各章を同じ発見、同じ喫茶店相談、同じ状況確認、同じ誓い直し、同じ小物共有、同じ「まだ終わっていない」調で始めたり閉じたりしない。',
    '先取り禁止: 章の役割にないクライマックス、成功後の反響、最終的な謎解きを早い章で語り切らない。必要なら伏線や違和感として一段だけ置く。',
    '章別役割:',
    chapterRoles,
    '現原稿素材マップ（引用・丸写し禁止。どの章に素材が埋もれているかの索引）:',
    materialMap,
  ].filter(Boolean).join('\n'));
}

function cleanLongifyReviewPacketChapter(chapter) {
  return cleanLongifyDraft(chapter)
    .split('\n')
    .filter(line => !LONGIFY_SUBSECTION_HEADING_PATTERN.test(line.trim()))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildLongifyReviewPacket(manuscript, {
  targetChars = 0,
  chapterCount = 0,
  maxTotalChars = 9000,
} = {}) {
  const normalized = normalizeLongifyPublicText(manuscript);
  const split = splitLongifyManuscript(normalized);
  const chapters = split.chapters.length ? split.chapters : [normalized];
  const chars = submissionCharLength(stripStoryMakerFooter(normalized));
  const perChapterChars = Math.max(520, Math.min(1300, Math.floor((maxTotalChars - 1400) / Math.max(1, chapters.length))));
  const title = split.title || extractStoryTitle(normalized) || UNTITLED_STORY_TITLE;
  const lines = [
    'レビュー用抜粋パケット（全文ではない。本文として再出力しない）',
    `作品タイトル: ${previewText(title, 120)}`,
    `投稿サイト換算文字数: ${formatNumber(chars)}字`,
    `目標文字数: ${targetChars ? `${formatNumber(targetChars)}字` : '指定なし'}`,
    `章数: ${chapterCount || chapters.length || '不明'}章`,
  ];
  chapters.forEach((chapter, index) => {
    const cleaned = cleanLongifyReviewPacketChapter(chapter);
    const heading = cleaned.split('\n').find(line => String(line || '').trim()) || `第${index + 1}章`;
    const excerpt = clipText(cleaned, perChapterChars);
    lines.push([
      `第${index + 1}章レビュー材料: ${previewText(heading, 80)}`,
      `章本文文字数: ${formatNumber(submissionCharLength(cleaned))}字`,
      excerpt,
    ].join('\n'));
  });
  return clipText(lines.join('\n\n'), maxTotalChars);
}

export function buildLongifyBrushupCritiquePrompt(manuscript, priorReviewText = '', {
  targetTotalChars = 0,
  compressionMode = false,
} = {}) {
  const reviewBlock = String(priorReviewText || '').trim()
    ? `\n前回までのAI講評・ブラッシュアップ方針:\n${String(priorReviewText).trim().slice(0, 3000)}\n`
    : '';
  const targetBlock = Number(targetTotalChars || 0) > 0
    ? `\n目標文字数: 投稿サイト準拠で最低${formatNumber(targetTotalChars)}字。${compressionMode ? '現在原稿は過長なので、反復・説明・同型の章冒頭/章末を削って、目標に近い密度へ締め直す。' : '不足がある場合だけ自然に補強する。'}\n`
    : '';
  return `あなたは商業小説の編集者です。次の長編小説を、投稿前の改稿対象として講評してください。

目的:
- 物語の芯、主人公の欲求、結末の意味、章構成は壊さない。
- 弱い場面、説明過多、感情変化の不足、伏線回収の弱さ、章ごとの重複、終盤の急ぎ足を見つける。
- 次の改稿で何を足し、何を削り、どの章をどう強めるかを具体的に示す。過長な反復は「足す」より優先して削る。
- 章冒頭と章末が似ている箇所を必ず点検し、同じ型を崩す指示を出す。
- 前回までのAI講評がある場合は、それを踏まえて同じ弱点を再点検し、改善が足りない部分を優先する。

出力:
- 講評メモのみ。
- 章ごとの改善指示を含める。
- 本文の書き直しはまだ行わない。

長編小説:
${reviewBlock}
${targetBlock}
${buildBrushupReviewSource(manuscript)}`;
}

export function buildLongifyAiReviewPrompt(manuscript, {
  mode = 'longify',
  priorReviewText = '',
  targetChars = 0,
  chapterCount = 0,
} = {}) {
  const priorBlock = String(priorReviewText || '').trim()
    ? `\n前回までのAI講評・改稿方針:\n${String(priorReviewText).trim().slice(0, 4000)}\n`
    : '';
  const modeLabel = mode === 'brushup' ? 'ブラッシュアップ後の完成稿' : '長編化後の完成稿';
  const targetLine = targetChars ? `- 投稿サイト換算の目標文字数: ${formatNumber(targetChars)}字` : '';
  const chapterLine = chapterCount ? `- 章数: ${chapterCount}章` : '';
  return `あなたは商業小説の編集者です。次の${modeLabel}を、次回ブラッシュアップでそのまま使える実用的なAI講評として評価してください。
ローカル計算ではなく、本文を読んだ編集判断として返してください。

評価条件:
- 物語の芯、因果、主人公の欲求、結末の意味を壊していないかを見る。
- 章ごとの弱い場面、説明過多、感情変化不足、伏線回収不足、反復、余韻不足を具体的に挙げる。
- 次回ブラッシュアップでAIが参照できるよう、章番号と直す方向を明確に書く。
- 褒めるだけの総評にしない。実際に改稿で使える指摘を優先する。
- 点数だけ、チェックリストだけ、抽象論だけにしない。
- 本文の書き直し、本文の続き、本文の抜粋、タイトル行の再出力はしない。講評データのみを返す。
- 出力はJSONオブジェクトのみ。Markdown、コードフェンス、本文、章見出し、説明文をJSONの外に出さない。
- 「タイトル:」「小説タイトル:」「第1章」「第1節」など本文から始めない。

JSON出力形式:
{
  "score": 0〜100点の整数（AI総合点）,
  "commentary": "全体のAI講評",
  "positives": ["良い点を1〜3件"],
  "problems": ["問題点を1〜4件"],
  "chapterDirections": ["章別の改稿指示を章番号つきで1〜4件"],
  "nextBrushupPlan": "次回ブラッシュアップ方針"
}

補助情報:
${targetLine}
${chapterLine}
${priorBlock}
評価対象情報（ここから。本文として書き写し禁止）:
<<<EVALUATION_TARGET_PACKET
${buildLongifyReviewPacket(manuscript, { targetChars, chapterCount, maxTotalChars: 9000 })}
EVALUATION_TARGET_PACKET

ここから下はJSONオブジェクトのみを出力してください。本文は一字も続けないでください。`;
}

function stringifyReviewJsonItem(item) {
  if (item === null || item === undefined) return '';
  if (Array.isArray(item)) return item.map(stringifyReviewJsonItem).filter(Boolean).join(' / ');
  if (typeof item === 'object') {
    return Object.entries(item)
      .map(([key, value]) => `${key}: ${stringifyReviewJsonItem(value)}`)
      .filter(Boolean)
      .join(' / ');
  }
  return String(item).trim();
}

function reviewJsonList(value) {
  if (Array.isArray(value)) return value.map(stringifyReviewJsonItem).filter(Boolean);
  const text = stringifyReviewJsonItem(value);
  return text ? [text] : [];
}

function reviewJsonScore(value) {
  if (value === null || value === undefined) return null;
  const match = String(value).match(/\d{1,3}/);
  if (!match) return null;
  const score = Number(match[0]);
  return Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null;
}

function parseLongifyReviewJson(value) {
  const raw = compactBlankLines(stripStoryMakerFooter(String(value || '')))
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
  if (!raw) return '';
  const candidates = [raw];
  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(raw.slice(firstBrace, lastBrace + 1));
  }
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      const score = reviewJsonScore(
        parsed.score
        ?? parsed.aiScore
        ?? parsed.ai_total_score
        ?? parsed.totalScore
        ?? parsed.total_score
        ?? parsed['AI総合点']
      );
      if (score === null) continue;
      const commentary = stringifyReviewJsonItem(
        parsed.commentary
        ?? parsed.review
        ?? parsed.aiReview
        ?? parsed.summary
        ?? parsed['AI講評']
      );
      const positives = reviewJsonList(parsed.positives ?? parsed.goodPoints ?? parsed.strengths ?? parsed['良い点']);
      const problems = reviewJsonList(parsed.problems ?? parsed.issues ?? parsed.weaknesses ?? parsed['問題点']);
      const directions = reviewJsonList(
        parsed.chapterDirections
        ?? parsed.chapter_directions
        ?? parsed.chapterRevisionDirections
        ?? parsed['章別の改稿指示']
      );
      const nextPlan = stringifyReviewJsonItem(
        parsed.nextBrushupPlan
        ?? parsed.next_brushup_plan
        ?? parsed.brushupPlan
        ?? parsed['次回ブラッシュアップ方針']
      );
      return compactBlankLines([
        `AI総合点: ${score}点`,
        'AI講評:',
        commentary,
        positives.length ? `良い点:\n${positives.map(item => `- ${item}`).join('\n')}` : '',
        problems.length ? `問題点:\n${problems.map(item => `- ${item}`).join('\n')}` : '',
        directions.length ? `章別の改稿指示:\n${directions.map(item => `- ${item}`).join('\n')}` : '',
        nextPlan ? `次回ブラッシュアップ方針:\n${nextPlan}` : '',
      ].filter(Boolean).join('\n'));
    } catch {
      continue;
    }
  }
  return '';
}

function cleanLongifyAiReviewText(value) {
  const jsonReview = parseLongifyReviewJson(value);
  if (jsonReview) return jsonReview.slice(0, 9000);
  return compactBlankLines(stripStoryMakerFooter(String(value || '')))
    .replace(/^```(?:json|text|markdown)?/i, '')
    .replace(/```$/i, '')
    .trim()
    .slice(0, 9000);
}

function firstReviewLine(text) {
  return String(text || '')
    .split('\n')
    .map(line => line.trim())
    .find(Boolean) || '';
}

export function extractAiReviewScore(reviewText) {
  const source = cleanLongifyAiReviewText(reviewText);
  const patterns = [
    /AI\s*総合点\s*[:：]\s*(\d{1,3})\s*点?/i,
    /総合点\s*[:：]\s*(\d{1,3})\s*点?/,
    /評価点\s*[:：]\s*(\d{1,3})\s*点?/,
    /スコア\s*[:：]\s*(\d{1,3})\s*点?/,
    /(\d{1,3})\s*\/\s*100/,
  ];
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (!match) continue;
    const score = Number(match[1]);
    if (Number.isFinite(score)) return Math.max(0, Math.min(100, Math.round(score)));
  }
  return null;
}

function hasAiReviewMarkers(reviewText) {
  return /AI講評|良い点|問題点|章別の改稿指示|次回ブラッシュアップ方針/u.test(String(reviewText || ''));
}

function looksLikeManuscriptInsteadOfReview(reviewText) {
  const normalized = cleanLongifyAiReviewText(reviewText);
  if (!normalized) return false;
  const firstLine = firstReviewLine(normalized);
  const hasScore = extractAiReviewScore(normalized) !== null;
  if (hasScore && hasAiReviewMarkers(normalized)) return false;
  const startsLikeBody = /^(?:タイトル|小説タイトル|第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)|[#＃]*\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)|[「『【])/u.test(firstLine);
  const chapterLikeLines = (normalized.match(/(?:^|\n)\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)/gmu) || []).length;
  return !hasScore && (
    startsLikeBody
    || chapterLikeLines > 0
    || (submissionCharLength(normalized) > 1000 && !hasAiReviewMarkers(normalized))
  );
}

function isUsableLongifyAiReview(reviewText) {
  const normalized = cleanLongifyAiReviewText(reviewText);
  return extractAiReviewScore(normalized) !== null && !looksLikeManuscriptInsteadOfReview(normalized);
}

function hasBrushupCritiqueMarkers(text) {
  return /講評|良い点|問題点|改善点|改稿|章別|弱点|反復|説明過多|削る|圧縮|方針|重複|伏線回収|感情変化|感情描写|補強/u.test(String(text || ''));
}

export function isMalformedLongifyBrushupCritique(text, manuscript = '') {
  const normalized = cleanLongifyDraft(text);
  if (!normalized) return true;
  const firstLine = firstReviewLine(normalized);
  const markdownHeadingLines = (normalized.match(/(?:^|\n)\s*#{1,6}\s+\S/gmu) || []).length;
  const storyboardLike = /(?:^|\n)\s*(?:#{1,6}\s*)?(?:第?\s*[\d一二三四五六七八九十]+\s*)?(?:コマ目|コマめ|カット)(?:\s|[:：]|$)|4コマ|絵コンテ|セリフ\s*[:：]|カメラ\s*[:：]|SFX\s*[:：]/u.test(normalized);
  const chapterLikeLines = (normalized.match(/(?:^|\n)\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)(?:\s|　|$)/gmu) || []).length;
  const startsLikeBody = /^(?:タイトル|小説タイトル|第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)|[#＃]*\s*第\s*(?:[0-9０-９]+|[一二三四五六七八九十百]+)\s*(?:章|節)|[「『【])/u.test(firstLine);
  const critiqueMarkers = hasBrushupCritiqueMarkers(normalized);
  const critiqueChars = submissionCharLength(normalized);
  const manuscriptChars = submissionCharLength(stripStoryMakerFooter(manuscript));
  if (storyboardLike) return true;
  if (/^#{1,6}\s+/u.test(firstLine) && !critiqueMarkers && critiqueChars > 800) return true;
  if (markdownHeadingLines >= 2 && !critiqueMarkers) return true;
  if (!critiqueMarkers && critiqueChars > 700) return true;
  if (startsLikeBody && !critiqueMarkers) return true;
  if (chapterLikeLines >= 2) return true;
  if (chapterLikeLines >= 1 && critiqueChars > 1400 && !/章別|改稿|削る|圧縮|反復|説明過多/u.test(normalized.slice(0, 1600))) return true;
  if (critiqueChars > 4600 && !critiqueMarkers) return true;
  if (manuscriptChars > 0 && critiqueChars > Math.max(3600, manuscriptChars * 0.28) && !critiqueMarkers) return true;
  return false;
}

function buildFallbackLongifyBrushupCritique({
  compressionMode = false,
  targetTotalChars = 0,
  sourceTotalChars = 0,
  chapterCount = 0,
} = {}) {
  const chapters = Math.max(1, Number(chapterCount || 0));
  const target = Math.max(0, Number(targetTotalChars || 0));
  const perChapter = target ? Math.ceil(target / chapters) : 0;
  return [
    compressionMode ? '【ローカル圧縮方針】' : '【ローカル改稿方針】',
    sourceTotalChars ? `現在原稿: 投稿サイト換算 ${formatNumber(sourceTotalChars)}字` : '',
    target ? `目標: 投稿サイト換算 ${formatNumber(target)}字 / ${chapters}章 / 1章あたり理想 ${formatNumber(perChapter)}字前後` : '',
    compressionMode
      ? '優先して削る: 同型の章冒頭、同じ状況確認、同じ慰め合い、同じ誓い直し、説明的な心理整理、同じ小道具描写の反復。'
      : '優先して補強する: 章ごとの選択、代償、関係変化、具体物、会話と行動で見える感情変化。',
    '残す: 主人公の欲求、結末の意味、章固有の発見、不可逆な変化、読後の余韻。',
    '章別方針: 各章は別の時間・場所・目的から始め、章末も別の変化で閉じる。同じ型で始めたり閉じたりしない。',
    '出力方針: 本文を逐語的に再現しない。抜粋から再構成し、必要な場面だけを小説本文として圧縮または補強する。',
  ].filter(Boolean).join('\n');
}

export function sanitizeLongifyBrushupCritique(rawText, {
  manuscript = '',
  compressionMode = false,
  targetTotalChars = 0,
  sourceTotalChars = 0,
  chapterCount = 0,
} = {}) {
  const normalized = cleanLongifyDraft(rawText);
  if (!isMalformedLongifyBrushupCritique(normalized, manuscript)) {
    return clipText(normalized, 6000);
  }
  return buildFallbackLongifyBrushupCritique({
    compressionMode,
    targetTotalChars,
    sourceTotalChars,
    chapterCount,
  });
}

function buildLongifyAiReviewRetryPrompt(manuscript, reviewOptions = {}, invalidReviewText = '') {
  const {
    mode = 'longify',
    priorReviewText = '',
    targetChars = 0,
    chapterCount = 0,
  } = reviewOptions || {};
  const priorBlock = String(priorReviewText || '').trim()
    ? `\n前回までのAI講評・改稿方針:\n${String(priorReviewText).trim().slice(0, 2400)}\n`
    : '';
  const modeLabel = mode === 'brushup' ? 'ブラッシュアップ後の完成稿' : '長編化後の完成稿';
  return `あなたは商業小説の編集者です。${modeLabel}の講評だけを作成してください。

前回の応答は講評形式ではありませんでした。本文の続き、本文の冒頭、タイトル、章本文を出力してはいけません。
前回の不正な応答（参考・再出力禁止）:
<<<INVALID_RESPONSE
${previewText(invalidReviewText, 1200)}
INVALID_RESPONSE

必須ルール:
- 出力はJSONオブジェクトのみ。Markdown、コードフェンス、本文、章見出し、説明文をJSONの外に出さない。
- 本文を書き写さない。タイトルや第1章/第1節から始めない。
- score、commentary、positives、problems、chapterDirections、nextBrushupPlanを必ず書く。
- 投稿サイト換算の目標文字数: ${targetChars ? `${formatNumber(targetChars)}字` : '指定なし'}
- 章数: ${chapterCount || '不明'}章
${priorBlock}
評価対象情報（ここから。本文として書き写し禁止）:
<<<EVALUATION_TARGET_PACKET
${buildLongifyReviewPacket(manuscript, { targetChars, chapterCount, maxTotalChars: 6500 })}
EVALUATION_TARGET_PACKET

JSON出力形式:
{
  "score": 0〜100点の整数,
  "commentary": "全体のAI講評",
  "positives": ["良い点"],
  "problems": ["問題点"],
  "chapterDirections": ["章別の改稿指示"],
  "nextBrushupPlan": "次回ブラッシュアップ方針"
}`;
}

function buildFailedLongifyReviewText({
  invalidReviewText = '',
} = {}) {
  const invalidPreview = previewText(invalidReviewText, 360);
  return [
    'AI講評: 取得失敗',
    'AI総合点: 未取得',
    '理由: AIが講評形式ではない応答、または空応答を返したため、採点を確定しませんでした。',
    invalidPreview ? `不正応答の一部: ${invalidPreview}` : '',
    '次回操作: 本文はOutputへ反映済みです。再実行またはブラッシュアップ前にAI講評を取り直してください。',
  ].join('\n');
}

async function requestLongifyAiReview({
  callModel,
  manuscript,
  mode = 'longify',
  priorReviewText = '',
  targetChars = 0,
  chapterCount = 0,
  stage = 'longifyReview',
  report,
  reportContext = {},
  fallbackDetail = '完成稿AI講評',
  signal,
} = {}) {
  const reviewOptions = { mode, priorReviewText, targetChars, chapterCount };
  const baseOptions = {
    temperature: 0.12,
    disableGoogleSearch: true,
    responseMimeType: 'application/json',
    maxTokens: 3200,
    maxOutputTokens: 3200,
    timeoutMs: 180000,
    signal,
  };
  const callReviewModel = (prompt, stageName, options = {}) => callModel(prompt, {
    stage: stageName,
    onFallback: fallbackModel => {
      if (typeof report === 'function') {
        report(`講評モデルを切り替えて続行中: ${fallbackModel}`, {
          phase: 'fallback',
          detail: `${fallbackDetail}を ${fallbackModel} で続行します。`,
          ...reportContext,
        });
      }
    },
    options: {
      ...baseOptions,
      ...options,
    },
  });

  const firstResponse = await callReviewModel(
    buildLongifyAiReviewPrompt(manuscript, reviewOptions),
    stage,
  );
  throwIfAborted(signal);
  const firstReviewText = cleanLongifyAiReviewText(firstResponse?.text || firstResponse || '');
  if (isUsableLongifyAiReview(firstReviewText)) {
    return {
      text: firstReviewText,
      source: 'ai',
      usedModel: firstResponse?.usedModel,
    };
  }

  if (typeof report === 'function') {
    report('AI講評の形式が崩れたため再評価中...', {
      phase: 'aiReviewRetry',
      detail: looksLikeManuscriptInsteadOfReview(firstReviewText)
        ? 'AIが講評ではなく本文を書き出したため、講評形式だけで再要求しています。'
        : 'AI総合点を取得できなかったため、講評形式を固定して再要求しています。',
      ...reportContext,
    });
  }

  const retryResponse = await callReviewModel(
    buildLongifyAiReviewRetryPrompt(manuscript, reviewOptions, firstReviewText),
    `${stage}Retry`,
    {
      temperature: 0.08,
      responseMimeType: 'application/json',
      maxTokens: 2600,
      maxOutputTokens: 2600,
      timeoutMs: 180000,
    },
  );
  throwIfAborted(signal);
  const retryReviewText = cleanLongifyAiReviewText(retryResponse?.text || retryResponse || '');
  if (isUsableLongifyAiReview(retryReviewText)) {
    return {
      text: retryReviewText,
      source: 'ai',
      usedModel: retryResponse?.usedModel,
    };
  }

  return {
    text: buildFailedLongifyReviewText({
      invalidReviewText: retryReviewText || firstReviewText,
    }),
    source: 'failed',
    usedModel: retryResponse?.usedModel || firstResponse?.usedModel,
  };
}

function aiReviewPassLabel(score) {
  if (score === null || score === undefined) return '未採点';
  return Number(score) >= AI_REVIEW_PASS_SCORE ? '合格点' : '要ブラッシュアップ';
}

export function shouldAutoBrushupContinue({
  score,
  autoEnabled = false,
  attempts = 0,
  maxAttempts = AUTO_BRUSHUP_MAX_ATTEMPTS,
  targetMet = true,
} = {}) {
  if (targetMet === false) {
    return Boolean(autoEnabled) && Number(attempts) < Number(maxAttempts);
  }
  if (score === null || score === undefined || score === '') return false;
  const numericScore = Number(score);
  return Boolean(autoEnabled)
    && Number.isFinite(numericScore)
    && numericScore < AI_REVIEW_PASS_SCORE
    && Number(attempts) < Number(maxAttempts);
}

export function shouldAutoBrushupClearCheckbox({
  score,
  targetMet = true,
  attempts = 0,
  maxAttempts = AUTO_BRUSHUP_MAX_ATTEMPTS,
} = {}) {
  const numericAttempts = Number(attempts);
  const numericMaxAttempts = Number(maxAttempts);
  if (
    Number.isFinite(numericAttempts)
    && Number.isFinite(numericMaxAttempts)
    && numericMaxAttempts > 0
    && numericAttempts >= numericMaxAttempts
  ) {
    return true;
  }
  if (targetMet === false) return false;
  if (score === null || score === undefined || score === '') return false;
  const numericScore = Number(score);
  return Number.isFinite(numericScore) && numericScore >= AI_REVIEW_PASS_SCORE;
}

export function resolveLongifyProgressDisplay({
  mode = 'longify',
  progressMode = '',
  brushupAttempt = 0,
  maxBrushupAttempts = AUTO_BRUSHUP_MAX_ATTEMPTS,
  chapterNumber = 0,
  chapterCount = 0,
} = {}) {
  const activeMode = progressMode || mode;
  const normalizedMode = activeMode === 'brushup' ? 'brushup' : 'longify';
  const numericMax = Number(maxBrushupAttempts);
  const maxAttempts = Number.isFinite(numericMax) && numericMax > 0
    ? Math.floor(numericMax)
    : AUTO_BRUSHUP_MAX_ATTEMPTS;
  const numericAttempt = Number(brushupAttempt);
  const attempt = normalizedMode === 'brushup'
    ? Math.min(
      maxAttempts,
      Math.max(1, Number.isFinite(numericAttempt) ? Math.floor(numericAttempt) : 1),
    )
    : 0;
  const numericChapterCount = Number(chapterCount);
  const totalChapters = Number.isFinite(numericChapterCount) && numericChapterCount > 0
    ? Math.floor(numericChapterCount)
    : 0;
  const numericChapterNumber = Number(chapterNumber);
  const currentChapter = totalChapters
    ? Math.min(
      totalChapters,
      Math.max(0, Number.isFinite(numericChapterNumber) ? Math.floor(numericChapterNumber) : 0),
    )
    : 0;
  const modeLabel = normalizedMode === 'brushup'
    ? `ブラッシュアップ ${attempt}周目/${maxAttempts}`
    : '長編化';
  const chapterLabel = totalChapters ? `${currentChapter}/${totalChapters}章` : '';
  return {
    mode: normalizedMode,
    modeLabel,
    brushupAttempt: attempt,
    maxBrushupAttempts: maxAttempts,
    chapterLabel,
    progressLabel: [modeLabel, chapterLabel].filter(Boolean).join('・'),
  };
}

function reviewTextSignature(text) {
  const normalized = normalizeLongifyPublicText(stripStoryMakerFooter(text));
  const chars = Array.from(normalized);
  return `${submissionCharLength(normalized)}:${chars.slice(0, 48).join('')}:${chars.slice(-48).join('')}`;
}

export function shouldPreserveRenderedLongifyReview({ reviewSource = '', textSignature = '', outputText = '' } = {}) {
  if (reviewSource !== 'ai' && reviewSource !== 'failed') return false;
  return Boolean(textSignature && textSignature === reviewTextSignature(outputText));
}

export function buildAiLongifyReview({
  text = '',
  mode = 'longify',
  reviewText = '',
  targetChars = 0,
  chapterCount = 0,
} = {}) {
  const normalizedReview = cleanLongifyAiReviewText(reviewText);
  const chars = submissionCharLength(stripStoryMakerFooter(text));
  const chapters = chapterCount || countLongifyChapterHeadings(text);
  const normalizedTargetChars = Math.max(0, Number(targetChars || 0));
  const targetMet = !normalizedTargetChars || chars >= normalizedTargetChars;
  const score = extractAiReviewScore(normalizedReview);
  const passLabel = targetMet ? aiReviewPassLabel(score) : aiReviewPassLabel(AI_REVIEW_PASS_SCORE - 1);
  const summary = firstReviewLine(normalizedReview) || 'AI講評本文を取得しました。';
  return {
    source: 'ai',
    mode,
    modeLabel: mode === 'brushup' ? 'ブラッシュアップ後' : '長編化後',
    score,
    passLabel,
    summary,
    aiReviewText: normalizedReview,
    details: [
      'AI講評: 実行済み',
      score === null ? 'AI総合点: 未取得' : `AI総合点: ${score}点（${passLabel}）`,
      `投稿サイト換算文字数: ${formatNumber(chars)}字`,
      chapters ? `章数: ${chapters}章` : '',
      targetChars ? `最低文字数: ${chars >= targetChars ? '達成' : '未達'}（${formatNumber(targetChars)}字）` : '',
    ].filter(Boolean),
    positives: [],
    negatives: [],
    brushupPlan: [],
    chars,
    chapters,
    targetChars: normalizedTargetChars,
    targetMet,
    signature: reviewTextSignature(text),
  };
}

function buildFailedLongifyReview({
  text = '',
  mode = 'longify',
  reviewText = '',
  targetChars = 0,
  chapterCount = 0,
} = {}) {
  const normalizedReview = cleanLongifyAiReviewText(reviewText);
  const chars = submissionCharLength(stripStoryMakerFooter(text));
  const chapters = chapterCount || countLongifyChapterHeadings(text);
  const normalizedTargetChars = Math.max(0, Number(targetChars || 0));
  return {
    source: 'failed',
    mode,
    modeLabel: mode === 'brushup' ? 'ブラッシュアップ後' : '長編化後',
    score: null,
    passLabel: '未採点',
    summary: 'AI講評を取得できませんでした。本文はOutputへ反映済みですが、採点は未完了です。',
    aiReviewText: normalizedReview,
    details: [
      'AI講評: 取得失敗',
      'AI総合点: 未取得',
      `投稿サイト換算文字数: ${formatNumber(chars)}字`,
      chapters ? `章数: ${chapters}章` : '',
      targetChars ? `最低文字数: ${chars >= targetChars ? '達成' : '未達'}（${formatNumber(targetChars)}字）` : '',
    ].filter(Boolean),
    positives: [],
    negatives: ['AI講評が取得できていないため、品質判定は確定していません。'],
    brushupPlan: ['AI講評を取り直してからブラッシュアップしてください。'],
    chars,
    chapters,
    targetChars: normalizedTargetChars,
    targetMet: !normalizedTargetChars || chars >= normalizedTargetChars,
    signature: reviewTextSignature(text),
  };
}

export function createBrushupChapterTargetPlan({
  chapterText = '',
  chapterCount = 1,
  targetTotalChars = 0,
  sourceTotalChars = 0,
} = {}) {
  const sourceChars = submissionCharLength(chapterText);
  const chapters = Math.max(1, Number(chapterCount || 1));
  const targetTotalNumber = Math.max(0, Number(targetTotalChars || 0));
  const sourceTotalNumber = Math.max(sourceChars, Number(sourceTotalChars || 0));
  const compressionMode = targetTotalNumber > 0
    && sourceTotalNumber > Math.ceil(targetTotalNumber * BRUSHUP_COMPRESSION_TRIGGER_RATIO);
  if (compressionMode) {
    const ideal = Math.max(900, Math.ceil(targetTotalNumber / chapters));
    const min = Math.max(800, Math.floor(ideal * BRUSHUP_COMPRESSION_MIN_RATIO));
    const max = Math.max(min + 500, Math.ceil(ideal * BRUSHUP_COMPRESSION_MAX_RATIO));
    return {
      strategy: 'compress',
      compressionMode: true,
      min,
      ideal,
      max,
      hardMinimum: Math.max(700, Math.floor(min * 0.55)),
      label: `${formatNumber(min)}〜${formatNumber(max)}字（理想${formatNumber(ideal)}字 / 過長反復を圧縮）`,
    };
  }
  const floorFromTarget = targetTotalNumber
    ? Math.ceil(Math.max(MIN_BRUSHUP_LONG_CHARS, targetTotalNumber) / chapters)
    : 0;
  const min = Math.max(
    800,
    floorFromTarget,
    Math.floor(sourceChars * BRUSHUP_CHAPTER_MIN_RATIO),
  );
  const ideal = Math.max(min, Math.ceil(sourceChars * 0.9));
  const max = Math.max(ideal + 500, Math.ceil(sourceChars * 1.18));
  return {
    strategy: 'enhance',
    compressionMode: false,
    min,
    ideal,
    max,
    hardMinimum: Math.max(800, Math.floor(sourceChars * 0.55)),
    label: `${formatNumber(min)}〜${formatNumber(max)}字（理想${formatNumber(ideal)}字 / 場面密度を補強）`,
  };
}

export function buildLongifyBrushupChapterPrompt({
  title = '',
  critiqueText = '',
  structureGuide = '',
  chapterText = '',
  chapterNumber = 1,
  chapterCount = 1,
  targetPlan = null,
} = {}) {
  const plan = targetPlan || createBrushupChapterTargetPlan({ chapterText, chapterCount });
  const sourceChapterForPrompt = plan.compressionMode
    ? clipText(cleanLongifyDraft(chapterText), Math.max(5200, Math.min(9000, Math.ceil(Number(plan.max || 0) * 1.35))))
    : chapterText;
  const strategyLine = plan.compressionMode
    ? '改稿戦略: 過長原稿の圧縮改稿。元章より短くしてよい。全文を逐語的に再現しない。反復する冒頭、状況確認、心理説明、似た章末を削り、章固有の進展だけを残す。'
    : '改稿戦略: 補強改稿。元章の情報量を保ち、足りない感情変化・伏線・具体物・会話だけを自然に増やす。';
  const structureBlock = String(structureGuide || '').trim()
    ? `\n全体再構成台帳（本文として出力しない。全章の役割固定に使う）:\n${clipText(structureGuide, 9000)}\n`
    : '';
  return `あなたは人間の小説家です。AI編集者の講評を反映して、長編小説の第${chapterNumber}章だけをブラッシュアップしてください。

厳守:
- 出力は改稿後の第${chapterNumber}章本文のみ。
- 現在画面で選択されている出力モードや過去の生成形式は一切参照しない。ブラッシュアップも常に散文の小説本文として行う。
- 章題は元の章題を残す。章番号を変えない。
- 章題の直後に「タイトル:」「小説タイトル:」「第1節」などの下位見出しを置かない。章本文へ直接入る。
- 章題のあとは、地の文の段落と必要な会話文だけで続ける。各行を小説本文として読める文章にし、構造ラベルや番号付きの場面行へ分解しない。
- 物語の芯、因果、登場人物の目的、結末へ向かう意味を変えない。
- 新しい大事件や別ジャンル化で盛らない。既存場面の密度、感情、伏線、具体物、会話の自然さを強める。
- 説明だけで済ませず、場面・行動・沈黙・身体感覚・場所の変化で補強する。
- ${strategyLine}
- 講評や全体再構成台帳が「重複」「反復」「時系列」「配分」「第6章集中」「再構成」を指摘している場合、元の第${chapterNumber}章をそのまま磨かない。章別役割に合わせて出来事を移動・統合し、この章で扱うべき時間・場所・目的から書き直す。
- 第${chapterNumber}章の役割外の出来事は、伏線として一段だけ置く場合を除いて先取りしない。別章で扱うべき成功、反響、最終発見、結末説明をこの章で語り切らない。
- 投稿サイト準拠文字数レンジは${plan.label}。最低${formatNumber(plan.min)}字未満の要約は不可。上限を超える場合は同じ説明や同じ余韻を削る。
- 圧縮改稿では、下の原章は材料であって完成稿ではない。抜粋から再構成し、全文の丸写しや同じ段落の再現で水増ししない。
- 章冒頭は前後章と違う時間・場所・目的・心理状態から始め、同じ目覚め、同じ状況確認、同じ不安の言い直しを繰り返さない。
- 章末はその章だけの変化で閉じ、同じ慰め合い、同じ誓い直し、同じ食べ物共有、同じ「まだ終わっていない」調を繰り返さない。
- 段落の間に単独の「*」「＊」「※」「***」などの区切り記号を入れない。
- 章末に「【完】」などの完結マーカーを入れない。アプリ側が最終整形する。
- 「講評」「改善点」「Output」「投稿文」「候補」などの管理語を残さない。

作品タイトル:
${title || '無題'}
${structureBlock}

全体講評:
${critiqueText}

現在の章: ${chapterNumber} / ${chapterCount}

改稿対象の章:
${sourceChapterForPrompt}`;
}

function formatBrushupOutput({ title = '', chapters = [], fallbackText = '' } = {}) {
  const body = normalizeLongifyPublicText(chapters.length
    ? [
      title,
      ...chapters.map((chapter, index) => ensureChapterHeading(cleanLongifyDraft(chapter), index + 1)),
    ].filter(Boolean).join('\n\n')
    : fallbackText);
  return `${body}\n\n${STORY_MAKER_FOOTER}`.trim();
}

export function ensureChapterHeading(text, chapterNumber) {
  const draft = extractExpectedLongifyChapterDraft(text, chapterNumber);
  const firstLine = draft.split('\n').find(line => String(line || '').trim()) || '';
  if (getChapterNumberFromHeading(firstLine) === Number(chapterNumber)) return draft;
  return `第${chapterNumber}章\n\n${draft}`.trim();
}

export function summarizeForContinuity(chapterText, chapterNumber) {
  const normalized = cleanLongifyDraft(chapterText).replace(/\s+/g, ' ');
  const heading = normalized.split(/\s+/u).find(line => getChapterNumberFromHeading(line) === Number(chapterNumber))
    || `第${chapterNumber}章`;
  return [
    `第${chapterNumber}章までの接続: ${heading} は完了済み。`,
    `既出章の扱い: 第${chapterNumber}章の本文、冒頭、章末、同じ小物説明、同じ会話、同じ決意表明を引用・再演しない。`,
    `次章は第${chapterNumber}章の結末より後の時間・場所・目的・心理状態から始める。前章の出来事は一文で受け止めるだけにする。`,
  ].join('\n');
}

export function formatLongifyProgressOutput({ title = '', chapters = [], activeMessage = '' } = {}) {
  const heading = title ? `【${title}】` : '【長編化β】';
  const normalizedChapters = chapters.map((chapter, index) => (
    ensureChapterHeading(cleanLongifyDraft(chapter), index + 1)
  ));
  const body = normalizeLongifyPublicText(normalizedChapters.filter(Boolean).join('\n\n'));
  return normalizeLongifyPublicText([heading, body, activeMessage].filter(Boolean).join('\n\n'));
}

export function formatLongifyOutput({ title = '', chapters = [] } = {}) {
  const body = formatLongifyProgressOutput({ title, chapters });
  return `${body}\n\n${STORY_MAKER_FOOTER}`.trim();
}

function createAbortError() {
  const error = new Error('長編化を中断しました。');
  error.name = 'AbortError';
  return error;
}

function throwIfAborted(signal) {
  if (signal?.aborted) throw createAbortError();
}

function createLongifyTimeoutError(timeoutMs, context = {}) {
  const seconds = Math.max(1, Math.ceil(Number(timeoutMs || 0) / 1000));
  const stage = context?.stage ? ` (${context.stage})` : '';
  const error = new Error(`AI response timed out after ${seconds}s${stage}.`);
  error.name = 'TimeoutError';
  error.stage = context?.stage || '';
  error.timeoutMs = timeoutMs;
  return error;
}

function isLongifyTimeoutError(error) {
  return error?.name === 'TimeoutError'
    || /timeout|timed out|タイムアウト|時間切れ|完了しません/u.test(String(error?.message || ''));
}

function getLongifyContextTimeoutMs(context = {}) {
  const configured = Number(context?.options?.timeoutMs || context?.timeoutMs || 0);
  return Number.isFinite(configured) && configured > 0 ? configured : 0;
}

async function callLongifyModelWithWatchdog(baseCallModel, prompt, context = {}, outerSignal, {
  injectSignal = true,
} = {}) {
  const timeoutMs = getLongifyContextTimeoutMs(context);
  if (!timeoutMs) return baseCallModel(prompt, context);

  const options = { ...(context.options || {}) };
  const inheritedSignal = options.signal || outerSignal;
  const localController = injectSignal && typeof AbortController === 'function' ? new AbortController() : null;
  let timeoutId = null;
  let cleanupOuterAbort = () => {};
  let cleanupRaceAbort = () => {};

  if (localController) {
    const forwardAbort = () => {
      try {
        localController.abort();
      } catch {
        // Ignore abort forwarding failures.
      }
    };
    if (inheritedSignal?.aborted) {
      forwardAbort();
    } else if (typeof inheritedSignal?.addEventListener === 'function') {
      inheritedSignal.addEventListener('abort', forwardAbort, { once: true });
      cleanupOuterAbort = () => inheritedSignal.removeEventListener?.('abort', forwardAbort);
    }
    options.signal = localController.signal;
  }

  const guardedContext = { ...context, options };
  const abortPromise = new Promise((_, reject) => {
    if (!outerSignal) return;
    if (outerSignal.aborted) {
      reject(createAbortError());
      return;
    }
    const onAbort = () => reject(createAbortError());
    outerSignal.addEventListener?.('abort', onAbort, { once: true });
    cleanupRaceAbort = () => outerSignal.removeEventListener?.('abort', onAbort);
  });
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = createLongifyTimeoutError(timeoutMs, context);
      try {
        localController?.abort(error);
      } catch {
        // Ignore abort failures; the watchdog rejection still protects the caller.
      }
      reject(error);
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      Promise.resolve().then(() => baseCallModel(prompt, guardedContext)),
      abortPromise,
      timeoutPromise,
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    cleanupOuterAbort();
    cleanupRaceAbort();
  }
}

async function streamTextCall(apiKey, model, prompt, context = {}) {
  let text = '';
  const result = await yt(
    apiKey,
    model,
    prompt,
    chunk => {
      text += chunk?.text || '';
      if (typeof context.onChunk === 'function') {
        context.onChunk(text, chunk);
      }
    },
    context.onFallback,
    context.options || {}
  );
  return {
    text,
    usedModel: result?.usedModel,
  };
}

export async function runLongifyBeta({
  storyText,
  apiKey,
  model = DEFAULT_MODEL,
  chapterCount = null,
  targetTotalChars = DEFAULT_TARGET_TOTAL_CHARS,
  targetChars,
  styleMode = 'preserve',
  endingMode = 'keep',
  signal,
  callText,
  onProgress,
  onStage,
  onPartial,
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  const seedText = normalizeLongifySeed(storyText);
  if (!hasLongifySeed(seedText)) {
    throw new Error('長編化するには、先にOutputへ短編本文を生成してください。');
  }
  if (!isRealApiKey(apiKey)) {
    throw new Error('APIキーを保存してから実行してください。');
  }
  throwIfAborted(signal);

  const baseCallModel = callText || ((prompt, context = {}) => {
    return streamTextCall(apiKey, model, prompt, context);
  });
  const callModel = (prompt, context = {}) => (
    callLongifyModelWithWatchdog(baseCallModel, prompt, context, signal, { injectSignal: !callText })
  );
  let title = resolveLongifyTitle({ seedText });
  const usedModels = [];
  const report = (message, stage = {}) => {
    if (typeof onProgress === 'function') onProgress(message);
    if (typeof onStage === 'function') onStage({ message, ...stage });
  };

  report('芯固定台帳を作成中...', {
    phase: 'ledger',
    detail: '主人公の欲求、曲げてはいけない因果、結末の意味、語り口を抽出しています。',
    chapterNumber: 0,
    chapterCount: runOptions.chapterCount,
  });
  const ledgerPrompt = buildLongifyLedgerPrompt(seedText, runOptions);
  let lastLedgerProgress = 0;
  const ledgerResponse = await callModel(ledgerPrompt, {
    stage: 'ledger',
    onFallback: fallbackModel => report(`モデルを切り替えています: ${fallbackModel}`, {
      phase: 'fallback',
      detail: `台帳作成を ${fallbackModel} で継続します。`,
      chapterNumber: 0,
      chapterCount: runOptions.chapterCount,
    }),
    onChunk: draft => {
      const length = submissionCharLength(draft);
      if (length - lastLedgerProgress < 360) return;
      lastLedgerProgress = length;
      report(`芯固定台帳を受信中... ${formatNumber(length)}字`, {
        phase: 'ledger',
        transient: true,
        detail: '原作の芯を固定する設計メモを受信しています。',
        chapterNumber: 0,
        chapterCount: runOptions.chapterCount,
      });
    },
    options: {
      temperature: 0.45,
      disableGoogleSearch: true,
      maxTokens: 8192,
      maxOutputTokens: 8192,
      timeoutMs: 180000,
      signal,
    },
  });
  throwIfAborted(signal);
  const ledgerText = cleanLongifyDraft(ledgerResponse?.text || ledgerResponse || '');
  if (ledgerResponse?.usedModel) usedModels.push(ledgerResponse.usedModel);
  title = resolveLongifyTitle({ seedText, ledgerText, initialTitle: title });

  const chapters = [];
  let previousBridge = '';
  for (let index = 1; index <= runOptions.chapterCount; index += 1) {
    throwIfAborted(signal);
    report(`第${index}章を生成中...`, {
      phase: 'chapter',
      detail: `固定台帳と原作の芯を照合しながら、第${index}章を場面として膨らませています。`,
      chapterNumber: index,
      chapterCount: runOptions.chapterCount,
    });
    if (typeof onPartial === 'function') {
      onPartial({
        title,
        chapters,
        activeMessage: `[長編化β] 第${index}章を生成中...`,
      });
    }
    const completedBeforeChapter = submissionCharLength(chapters.join('\n\n'));
    const chapterGenerationPlan = createLongifyChapterGenerationPlan({
      runOptions,
      completedChars: completedBeforeChapter,
      chapterNumber: index,
    });
    const chapterPromptArgs = {
      seedText,
      ledgerText,
      chapterNumber: index,
      chapterCount: runOptions.chapterCount,
      previousBridge,
      targetChars: chapterGenerationPlan.targetChars || targetChars || runOptions.targetChars,
      targetTotalChars: runOptions.targetTotalNumber,
      chapterRangeLabel: chapterGenerationPlan.label || runOptions.chapterRangeLabel,
      styleMode: runOptions.styleMode,
      endingMode: runOptions.endingMode,
    };
    let chapterResponse = null;
    let chapterText = '';
    let chapterValidation = null;
    let previousInvalidDraft = '';
    for (let attempt = 0; attempt <= LONGIFY_CHAPTER_RETRY_ATTEMPTS; attempt += 1) {
      if (attempt > 0) {
        report(`第${index}章の本文が${chapterValidation?.tooLong ? '長すぎた' : '不足した'}ため再生成中... (${attempt}/${LONGIFY_CHAPTER_RETRY_ATTEMPTS})`, {
          phase: 'chapterRetry',
          detail: chapterValidation?.reason || '章本文の抽出に失敗しました。',
          chapterNumber: index,
          chapterCount: runOptions.chapterCount,
          completedChars: submissionCharLength(chapters.join('\n\n')),
        });
      }
      const chapterPrompt = attempt === 0
        ? buildLongifyChapterPrompt(chapterPromptArgs)
        : buildLongifyChapterRetryPrompt(chapterPromptArgs, previousInvalidDraft, chapterValidation);
      let lastChapterProgress = 0;
      const chapterOutputTokens = longifyChapterRetryOutputTokenLimit(chapterGenerationPlan, chapterValidation);
      chapterResponse = await callModel(chapterPrompt, {
        stage: 'chapter',
        chapterNumber: index,
        retryAttempt: attempt,
        onFallback: fallbackModel => report(`モデルを切り替えています: ${fallbackModel}`, {
          phase: 'fallback',
          detail: `第${index}章の生成を ${fallbackModel} で継続します。`,
          chapterNumber: index,
          chapterCount: runOptions.chapterCount,
        }),
        onChunk: draft => {
          const length = submissionCharLength(draft);
          if (length - lastChapterProgress < 520) return;
          lastChapterProgress = length;
          report(`第${index}章を受信中... ${formatNumber(length)}字`, {
            phase: 'chapter',
            transient: true,
            detail: '本文を受信中です。Outputはスクロール暴走を避けるため完了時に一括反映します。',
            chapterNumber: index,
            chapterCount: runOptions.chapterCount,
          });
        },
        options: {
          temperature: runOptions.styleMode === 'intensify' ? 0.92 : 0.82,
          disableGoogleSearch: true,
          maxTokens: chapterOutputTokens,
          maxOutputTokens: chapterOutputTokens,
          timeoutMs: 240000,
          signal,
        },
      });
      throwIfAborted(signal);
      previousInvalidDraft = chapterResponse?.text || chapterResponse || '';
      chapterText = ensureChapterHeading(previousInvalidDraft, index);
      chapterValidation = validateLongifyChapterDraft(chapterText, {
        chapterNumber: index,
        targetChars: chapterGenerationPlan.min || Number(targetChars || 0) || runOptions.minChapterChars,
        maxChars: chapterGenerationPlan.max || runOptions.maxChapterChars,
        rawText: previousInvalidDraft,
      });
      if (
        !chapterValidation.ok
        && /小説本文ではない形式/u.test(chapterValidation?.reason || '')
      ) {
        const sanitizedValidation = validateLongifyChapterDraft(chapterText, {
          chapterNumber: index,
          targetChars: chapterGenerationPlan.min || Number(targetChars || 0) || runOptions.minChapterChars,
          maxChars: chapterGenerationPlan.max || runOptions.maxChapterChars,
        });
        if (sanitizedValidation.ok) {
          chapterValidation = sanitizedValidation;
          report(`第${index}章の形式崩れを除去して採用しました。`, {
            phase: 'chapterSanitized',
            detail: '漫画・脚本形式の見出しやラベルを除去した後、小説本文として再検証に通りました。',
            chapterNumber: index,
            chapterCount: runOptions.chapterCount,
            completedChars: submissionCharLength([...chapters, chapterText].join('\n\n')),
          });
        }
      }
      if (chapterValidation.ok) {
        const overlapIssue = detectLongifyChapterOverlap(chapterText, chapters);
        if (!overlapIssue.ok) {
          chapterValidation = {
            ...chapterValidation,
            ok: false,
            reason: overlapIssue.reason,
          };
          previousInvalidDraft = chapterText;
        }
      }
      if (chapterValidation.ok) break;
    }
    if (
      !chapterValidation?.ok
      && /小説本文ではない形式/u.test(chapterValidation?.reason || '')
    ) {
      const sanitizedValidation = validateLongifyChapterDraft(chapterText, {
        chapterNumber: index,
        targetChars: chapterGenerationPlan.min || Number(targetChars || 0) || runOptions.minChapterChars,
        maxChars: chapterGenerationPlan.max || runOptions.maxChapterChars,
      });
      if (sanitizedValidation.ok) {
        chapterValidation = sanitizedValidation;
        report(`第${index}章の形式崩れを除去して採用しました。`, {
          phase: 'chapterSanitized',
          detail: '漫画・脚本形式の見出しやラベルを除去した後、小説本文として再検証に通りました。',
          chapterNumber: index,
          chapterCount: runOptions.chapterCount,
          completedChars: submissionCharLength([...chapters, chapterText].join('\n\n')),
        });
      }
    }
    let chapterExpandAttempts = 0;
    while (
      !chapterValidation?.ok
      && chapterValidation?.headingNumber === index
      && chapterValidation?.bodyChars >= 500
      && chapterValidation?.bodyChars < chapterValidation?.minBodyChars
      && chapterExpandAttempts < LONGIFY_CHAPTER_EXPAND_MAX_ATTEMPTS
    ) {
      chapterExpandAttempts += 1;
      const deficit = Math.max(
        LONGIFY_CHAPTER_EXPAND_SAFETY_MARGIN,
        chapterValidation.minBodyChars - chapterValidation.bodyChars + LONGIFY_CHAPTER_EXPAND_SAFETY_MARGIN,
      );
      report(`第${index}章が短いため増補本文を追加生成中...`, {
        phase: 'chapterExpand',
        detail: `不足 ${formatNumber(deficit)}字。短い草稿を捨てず、同じ章の場面として増補します。`,
        chapterNumber: index,
        chapterCount: runOptions.chapterCount,
        completedChars: submissionCharLength(chapters.join('\n\n')),
      });
      let lastExpansionProgress = 0;
      const expansionResponse = await callModel(buildLongifyChapterExpansionPrompt({
        seedText,
        ledgerText,
        chapterText,
        chapterNumber: index,
        chapterCount: runOptions.chapterCount,
        deficitChars: deficit,
        targetChars: runOptions.targetTotalNumber,
        styleMode: runOptions.styleMode,
        endingMode: runOptions.endingMode,
      }), {
        stage: 'chapterExpand',
        chapterNumber: index,
        retryAttempt: LONGIFY_CHAPTER_RETRY_ATTEMPTS + chapterExpandAttempts,
        onFallback: fallbackModel => report(`モデルを切り替えています: ${fallbackModel}`, {
          phase: 'fallback',
          detail: `第${index}章の増補を ${fallbackModel} で継続します。`,
          chapterNumber: index,
          chapterCount: runOptions.chapterCount,
        }),
        onChunk: draft => {
          const length = submissionCharLength(draft);
          if (length - lastExpansionProgress < 420) return;
          lastExpansionProgress = length;
          report(`第${index}章の増補を受信中... ${formatNumber(length)}字`, {
            phase: 'chapterExpand',
            transient: true,
            detail: '不足分を同じ章の場面として増やしています。',
            chapterNumber: index,
            chapterCount: runOptions.chapterCount,
            completedChars: submissionCharLength(chapters.join('\n\n')),
          });
        },
        options: {
          temperature: runOptions.styleMode === 'intensify' ? 0.88 : 0.78,
          disableGoogleSearch: true,
          maxTokens: 6000,
          maxOutputTokens: 6000,
          timeoutMs: 180000,
          signal,
        },
      });
      throwIfAborted(signal);
      const expansionText = chapterBodyText(expansionResponse?.text || expansionResponse || '');
      if (submissionCharLength(expansionText) >= 240) {
        chapterText = `${chapterText}\n\n${expansionText}`.trim();
        chapterValidation = validateLongifyChapterDraft(chapterText, {
          chapterNumber: index,
          targetChars: chapterGenerationPlan.min || Number(targetChars || 0) || runOptions.minChapterChars,
          maxChars: chapterGenerationPlan.max || runOptions.maxChapterChars,
          rawText: chapterText,
        });
        if (expansionResponse?.usedModel) usedModels.push(expansionResponse.usedModel);
        if (chapterValidation.ok) {
          report(`第${index}章の増補が完了しました。`, {
            phase: 'chapterExpandDone',
            detail: `章本文 ${formatNumber(chapterValidation.bodyChars)}字 / 下限 ${formatNumber(chapterValidation.minBodyChars)}字`,
            chapterNumber: index,
            chapterCount: runOptions.chapterCount,
            completedChars: submissionCharLength([...chapters, chapterText].join('\n\n')),
          });
          break;
        }
      }
    }
    if (
      !chapterValidation?.ok
      && chapterValidation?.tooLong
      && chapterValidation?.headingNumber === index
      && chapterValidation?.bodyChars >= chapterValidation?.minBodyChars
    ) {
      const compactedChapter = compactLongifyChapterToMax(chapterText, {
        chapterNumber: index,
        maxChars: chapterGenerationPlan.max,
        minChars: chapterValidation.minBodyChars,
      });
      const compactedValidation = validateLongifyChapterDraft(compactedChapter, {
        chapterNumber: index,
        targetChars: chapterGenerationPlan.min || Number(targetChars || 0) || runOptions.minChapterChars,
        maxChars: chapterGenerationPlan.max || runOptions.maxChapterChars,
        rawText: compactedChapter,
      });
      if (compactedValidation.ok) {
        chapterText = compactedChapter;
        chapterValidation = compactedValidation;
        report(`第${index}章が過長だったためローカル圧縮しました。`, {
          phase: 'chapterCompact',
          detail: `圧縮後 ${formatNumber(compactedValidation.bodyChars)}字 / 上限 ${formatNumber(compactedValidation.maxBodyChars)}字。冒頭と終盤を残し、過長部分を削りました。`,
          chapterNumber: index,
          chapterCount: runOptions.chapterCount,
          completedChars: submissionCharLength([...chapters, chapterText].join('\n\n')),
        });
      }
    }
    if (!chapterValidation?.ok) {
      throw new Error(`第${index}章の本文抽出に失敗しました: ${chapterValidation?.reason || '章本文が不正です'}`);
    }
    chapters.push(chapterText);
    if (chapterResponse?.usedModel) usedModels.push(chapterResponse.usedModel);
    previousBridge = summarizeForContinuity(chapterText, index);
    report(`第${index}章が完了しました。`, {
      phase: 'chapterDone',
      detail: '次章へ渡す接続メモを作成し、芯のズレを抑えます。',
      chapterNumber: index,
      chapterCount: runOptions.chapterCount,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
    if (typeof onPartial === 'function') {
      onPartial({ title, chapters, activeMessage: `[長編化β] 第${index}章まで生成しました。` });
    }
  }

  let topupAttempts = 0;
  const initialTopupDeficit = Math.max(0, runOptions.targetTotalNumber - submissionCharLength(chapters.join('\n\n')));
  const maxTopupAttempts = longifyTopupMaxAttempts(initialTopupDeficit);
  while (submissionCharLength(chapters.join('\n\n')) < runOptions.targetTotalNumber && topupAttempts < maxTopupAttempts) {
    throwIfAborted(signal);
    topupAttempts += 1;
    const currentText = chapters.join('\n\n');
    const currentChars = submissionCharLength(currentText);
    const deficit = Math.max(0, runOptions.targetTotalNumber - currentChars);
    const topupOutputTokens = longifyTopupOutputTokenLimit(deficit);
    report(`最低文字数に不足しています。追加生成中... (${formatNumber(currentChars)} / ${formatNumber(runOptions.targetTotalNumber)}字)`, {
      phase: 'topup',
      detail: `不足 ${formatNumber(deficit)}字。短編の芯を崩さず、結末直前に自然に差し込める追加場面を生成しています。`,
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
      completedChars: currentChars,
    });
    const topupPrompt = buildLongifyTopupPrompt({
      seedText,
      ledgerText,
      currentText,
      deficitChars: deficit,
      targetTotalChars: runOptions.targetTotalNumber,
      chapterCount: runOptions.chapterCount,
      styleMode: runOptions.styleMode,
      endingMode: runOptions.endingMode,
    });
    let lastTopupProgress = 0;
    const topupResponse = await callModel(topupPrompt, {
      stage: 'topup',
      attempt: topupAttempts,
      onFallback: fallbackModel => report(`モデルを切り替えています: ${fallbackModel}`, {
        phase: 'fallback',
        detail: `最低文字数補強を ${fallbackModel} で継続します。`,
        chapterNumber: runOptions.chapterCount,
        chapterCount: runOptions.chapterCount,
      }),
      onChunk: draft => {
        const length = submissionCharLength(draft);
        if (length - lastTopupProgress < 520) return;
        lastTopupProgress = length;
        report(`最低文字数補強を受信中... ${formatNumber(length)}字`, {
          phase: 'topup',
          transient: true,
          detail: '追加本文を受信中です。Outputは完了時に一括反映します。',
          chapterNumber: runOptions.chapterCount,
          chapterCount: runOptions.chapterCount,
          completedChars: currentChars + length,
        });
      },
      options: {
        temperature: runOptions.styleMode === 'intensify' ? 0.9 : 0.78,
        disableGoogleSearch: true,
        maxTokens: topupOutputTokens,
        maxOutputTokens: topupOutputTokens,
        timeoutMs: 240000,
        signal,
      },
    });
    throwIfAborted(signal);
    const rawTopupText = topupResponse?.text || topupResponse || '';
    const topupArtifactIssues = longifyFormatArtifactIssues(rawTopupText);
    const topupText = cleanLongifyDraft(rawTopupText);
    if (topupArtifactIssues.length) {
      if (submissionCharLength(topupText) >= 200 && !hasLongifyFormatArtifacts(topupText)) {
        report('最低文字数補強の形式崩れを除去して採用しました。', {
          phase: 'topupSanitized',
          detail: `混入形式: ${topupArtifactIssues.join('、')}。掃除後の追加本文を採用します。`,
          chapterNumber: runOptions.chapterCount,
          chapterCount: runOptions.chapterCount,
          completedChars: submissionCharLength(chapters.join('\n\n')) + submissionCharLength(topupText),
        });
      } else {
        report('最低文字数補強が本文形式ではないため再試行します。', {
          phase: 'topupRetry',
          detail: `混入形式: ${topupArtifactIssues.join('、')}`,
          chapterNumber: runOptions.chapterCount,
          chapterCount: runOptions.chapterCount,
          completedChars: submissionCharLength(chapters.join('\n\n')),
        });
        continue;
      }
    }
    if (submissionCharLength(topupText) < 200) break;
    chapters[chapters.length - 1] = `${chapters[chapters.length - 1]}\n\n${topupText}`.trim();
    if (topupResponse?.usedModel) usedModels.push(topupResponse.usedModel);
    report(`最低文字数補強を追加しました。現在 ${formatNumber(submissionCharLength(chapters.join('\n\n')))}字`, {
      phase: 'topupDone',
      detail: '不足分を最終章へ自然に接続しました。',
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
  }

  const afterTopupChars = submissionCharLength(chapters.join('\n\n'));
  if (afterTopupChars < runOptions.targetTotalNumber) {
    report('最低文字数の補強に失敗しました。', {
      phase: 'topupFailed',
      detail: `追加生成を${maxTopupAttempts}回試しましたが、${formatNumber(afterTopupChars)} / ${formatNumber(runOptions.targetTotalNumber)}字で止まりました。未達のまま採点へ進みません。`,
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
      completedChars: afterTopupChars,
    });
    throw new Error(`長編化結果が最低文字数を下回りました（${formatNumber(afterTopupChars)} / ${formatNumber(runOptions.targetTotalNumber)}字）。`);
  }

  report('長編化βの整形中...', {
    phase: 'finalize',
    detail: '章を結合し、フッターを一度だけ付与しています。',
    chapterNumber: runOptions.chapterCount,
    chapterCount: runOptions.chapterCount,
  });
  let text = formatLongifyOutput({ title, chapters });
  let endingValidation = validateLongifyEndingCompletion(text, seedText);
  for (
    let endingRepairAttempt = 1;
    !endingValidation.ok && endingRepairAttempt <= LONGIFY_ENDING_REPAIR_ATTEMPTS;
    endingRepairAttempt += 1
  ) {
    throwIfAborted(signal);
    report(`元本文の結末が長編化末尾に不足しています。最終章を補強中... (${endingRepairAttempt}/${LONGIFY_ENDING_REPAIR_ATTEMPTS})`, {
      phase: 'endingRepair',
      detail: endingValidation.reason || '元本文の終盤を具体的に回収します。',
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
      completedChars: submissionCharLength(stripStoryMakerFooter(text)),
    });
    const endingRepairResponse = await callModel(buildLongifyEndingRepairPrompt({
      seedText,
      ledgerText,
      currentText: text,
      targetTotalChars: runOptions.targetTotalNumber,
      chapterCount: runOptions.chapterCount,
      styleMode: runOptions.styleMode,
      endingMode: runOptions.endingMode,
    }), {
      stage: 'endingRepair',
      attempt: endingRepairAttempt,
      onFallback: fallbackModel => report(`結末補強モデルを切り替えて続行中: ${fallbackModel}`, {
        phase: 'fallback',
        detail: `結末補強を ${fallbackModel} で続行します。`,
        chapterNumber: runOptions.chapterCount,
        chapterCount: runOptions.chapterCount,
      }),
      options: {
        temperature: runOptions.styleMode === 'intensify' ? 0.86 : 0.72,
        disableGoogleSearch: true,
        maxTokens: 6000,
        maxOutputTokens: 6000,
        timeoutMs: 180000,
        signal,
      },
    });
    throwIfAborted(signal);
    const endingRepairText = cleanLongifyDraft(endingRepairResponse?.text || endingRepairResponse || '');
    if (submissionCharLength(endingRepairText) < 200) break;
    chapters[chapters.length - 1] = `${chapters[chapters.length - 1]}\n\n${endingRepairText}`.trim();
    if (endingRepairResponse?.usedModel) usedModels.push(endingRepairResponse.usedModel);
    text = formatLongifyOutput({ title, chapters });
    endingValidation = validateLongifyEndingCompletion(text, seedText);
  }
  if (!endingValidation.ok) {
    const endingFallbackText = buildLongifyEndingFallbackText(seedText);
    if (submissionCharLength(endingFallbackText) >= 40) {
      report('元本文の終盤を復帰して結末を閉じています。', {
        phase: 'endingRepair',
        detail: endingValidation.reason || '元本文の終盤アンカーを最終章末尾へ戻します。',
        chapterNumber: runOptions.chapterCount,
        chapterCount: runOptions.chapterCount,
        completedChars: submissionCharLength(stripStoryMakerFooter(text)),
      });
      chapters[chapters.length - 1] = `${chapters[chapters.length - 1]}\n\n${endingFallbackText}`.trim();
      text = formatLongifyOutput({ title, chapters });
      endingValidation = validateLongifyEndingCompletion(text, seedText);
    }
  }
  if (!endingValidation.ok) {
    throw new Error(`長編化の結末回収に失敗しました: ${endingValidation.reason || '元本文の終盤が長編化末尾に残っていません'}`);
  }
  report('完成稿をAI講評で評価中...', {
    phase: 'aiReview',
    detail: '次回ブラッシュアップでそのまま使える章別の改稿指示をAIに作成させています。',
    chapterNumber: runOptions.chapterCount,
    chapterCount: runOptions.chapterCount,
    completedChars: submissionCharLength(stripStoryMakerFooter(text)),
  });
  const reviewResult = await requestLongifyAiReview({
    callModel,
    manuscript: text,
    mode: 'longify',
    targetChars: runOptions.targetTotalNumber,
    chapterCount: chapters.length,
    stage: 'longifyReview',
    report,
    reportContext: {
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
    },
    fallbackDetail: '完成稿AI講評',
    signal,
  });
  throwIfAborted(signal);
  const aiReviewText = cleanLongifyAiReviewText(reviewResult.text);
  if (!aiReviewText) {
    throw new Error('完成稿AI講評の応答が空でした。');
  }
  if (reviewResult.usedModel) usedModels.push(reviewResult.usedModel);
  return {
    title,
    seedText,
    ledgerText,
    chapters,
    usedModels: [...new Set(usedModels)],
    text,
    aiReviewText,
    reviewSource: reviewResult.source,
    options: runOptions,
  };
}

export async function runLongifyBrushupBeta({
  storyText,
  apiKey,
  model = DEFAULT_MODEL,
  signal,
  callText,
  onProgress,
  onStage,
  priorReviewText = '',
  targetTotalChars = 0,
  expectedChapterCount = 0,
} = {}) {
  const manuscript = normalizeLongifyPublicText(storyText);
  if (!isLongifiedOutputText(manuscript)) {
    throw new Error('ブラッシュアップするには、先に長編化された本文が必要です。');
  }
  if (!isRealApiKey(apiKey)) {
    throw new Error('APIキー保存後に使用できます。');
  }
  throwIfAborted(signal);

  const split = splitLongifyManuscript(manuscript);
  const title = split.title || extractStoryTitle(manuscript);
  const expectedChapters = Math.max(0, Number(expectedChapterCount || 0));
  if (expectedChapters > 0 && split.chapters.length > 0 && split.chapters.length < expectedChapters) {
    throw new Error(`ブラッシュアップ対象の章見出しが ${split.chapters.length}/${expectedChapters} 章に減っています。章数崩れを採用せず停止しました。`);
  }
  const sourceChapters = split.chapters.length ? split.chapters : [manuscript];
  const targetTotalNumber = Math.max(0, Number(targetTotalChars || 0));
  const sourceTotalChars = submissionCharLength(stripStoryMakerFooter(manuscript));
  const compressionMode = targetTotalNumber > 0
    && sourceTotalChars > Math.ceil(targetTotalNumber * BRUSHUP_COMPRESSION_TRIGGER_RATIO);
  const brushupMinimumChars = Math.max(MIN_BRUSHUP_LONG_CHARS, targetTotalNumber || 0);
  const usedModels = [];
  const baseCallModel = callText || ((prompt, context = {}) => {
    return streamTextCall(apiKey, model, prompt, context);
  });
  const callModel = (prompt, context = {}) => (
    callLongifyModelWithWatchdog(baseCallModel, prompt, context, signal, { injectSignal: !callText })
  );
  const report = (message, stage = {}) => {
    if (typeof onProgress === 'function') onProgress(message);
    if (typeof onStage === 'function') onStage({ message, ...stage });
  };

  report('長編の弱点をAI講評中...', {
    phase: 'brushupCritique',
    detail: compressionMode
      ? '過長な反復、同型の章冒頭/章末、説明過多を優先点検しています。'
      : '全体構成、章ごとの重複、感情変化、伏線回収、終盤の弱さを点検しています。',
    chapterNumber: 0,
    chapterCount: sourceChapters.length,
    completedChars: submissionCharLength(manuscript),
  });
  const critiqueResponse = await callModel(buildLongifyBrushupCritiquePrompt(manuscript, priorReviewText, {
    targetTotalChars: targetTotalNumber,
    compressionMode,
  }), {
    stage: 'brushupCritique',
    onFallback: fallbackModel => report(`モデルを切り替えて続行中: ${fallbackModel}`, {
      phase: 'fallback',
      detail: `講評作成を ${fallbackModel} で継続します。`,
      chapterNumber: 0,
      chapterCount: sourceChapters.length,
    }),
    options: {
      temperature: 0.35,
      disableGoogleSearch: true,
      maxTokens: 6000,
      maxOutputTokens: 6000,
      timeoutMs: 180000,
      signal,
    },
  });
  throwIfAborted(signal);
  const rawCritiqueText = cleanLongifyDraft(critiqueResponse?.text || critiqueResponse || '');
  const priorReviewCritiqueText = cleanLongifyAiReviewText(priorReviewText || '');
  let critiqueText = sanitizeLongifyBrushupCritique(rawCritiqueText, {
    manuscript,
    compressionMode,
    targetTotalChars: targetTotalNumber,
    sourceTotalChars,
    chapterCount: sourceChapters.length,
  });
  const usedPriorReviewCritique = critiqueText !== rawCritiqueText
    && isUsableLongifyAiReview(priorReviewCritiqueText);
  if (usedPriorReviewCritique) {
    critiqueText = priorReviewCritiqueText;
  }
  if (critiqueText !== rawCritiqueText) {
    report(usedPriorReviewCritique
      ? 'AI講評が本文形式に崩れたため、前回AI講評を改稿方針として再利用します。'
      : 'AI講評が本文形式に崩れたため、ローカル圧縮方針へ切り替えます。', {
      phase: 'brushupCritiqueFallback',
      detail: usedPriorReviewCritique
        ? '直前の採点欄にある問題点・章別指示を保持し、本文断片を改稿プロンプトへ渡さないよう保護しました。'
        : '講評ではない本文断片を次の改稿プロンプトへ渡さないよう保護しました。',
      chapterNumber: 0,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(manuscript),
    });
  }
  if (critiqueResponse?.usedModel) usedModels.push(critiqueResponse.usedModel);

  const structureGuide = buildLongifyBrushupStructureGuide({
    critiqueText,
    sourceChapters,
    targetTotalChars: targetTotalNumber,
    compressionMode,
  });
  if (structureGuide) {
    report('全体再構成台帳を固定しました。', {
      phase: 'brushupStructurePlan',
      detail: '重複・時系列・終盤集中を章別役割へ分解し、各章改稿で同じ出来事を再演しないようにします。',
      chapterNumber: 0,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(manuscript),
    });
  }

  const chapters = [];
  for (let index = 0; index < sourceChapters.length; index += 1) {
    throwIfAborted(signal);
    const chapterNumber = index + 1;
    const chapterText = sourceChapters[index];
    report(`第${chapterNumber}章をブラッシュアップ中...`, {
      phase: 'brushupChapter',
      detail: `講評要点: ${previewText(critiqueText, 260)}`,
      chapterNumber,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
    let lastRewriteProgress = 0;
    const targetPlan = createBrushupChapterTargetPlan({
      chapterText,
      chapterCount: sourceChapters.length,
      targetTotalChars: targetTotalNumber,
      sourceTotalChars,
    });
    const hardMinimumPolishedChars = targetPlan.hardMinimum;
    const targetPolishedChars = targetPlan.min;
    const maxRewriteAttempts = targetPlan.compressionMode ? 3 : BRUSHUP_CHAPTER_REWRITE_MAX_ATTEMPTS;
    let polishedChapter = '';
    let polishedArtifactIssues = [];
    let bestPolishedChapter = '';
    let bestPolishedChars = 0;
    let bestPolishedWasSanitized = false;
    for (let attempt = 1; attempt <= maxRewriteAttempts; attempt += 1) {
      const retryCritiqueText = attempt === 1
        ? critiqueText
        : `${critiqueText}\n\n【再改稿指示】前回の第${chapterNumber}章改稿は${formatNumber(submissionCharLength(polishedChapter))}字でした。${
          targetPlan.compressionMode && submissionCharLength(polishedChapter) > targetPlan.max
            ? `冗長な反復を削り、${targetPlan.label}へ圧縮してください。`
            : `最低${formatNumber(targetPolishedChars)}字以上にし、要約ではなく場面として書き直してください。`
        }`;
      lastRewriteProgress = 0;
      let rewriteResponse = null;
      try {
        rewriteResponse = await callModel(buildLongifyBrushupChapterPrompt({
          title,
          critiqueText: retryCritiqueText,
          structureGuide,
          chapterText,
          chapterNumber,
          chapterCount: sourceChapters.length,
          targetPlan,
        }), {
          stage: 'brushupChapter',
          chapterNumber,
          chapterText,
          retryAttempt: attempt,
          onFallback: fallbackModel => report(`モデルを切り替えて続行中: ${fallbackModel}`, {
            phase: 'fallback',
            detail: `第${chapterNumber}章の改稿を ${fallbackModel} で継続します。`,
            chapterNumber,
            chapterCount: sourceChapters.length,
          }),
          onChunk: draft => {
            const length = submissionCharLength(draft);
            if (length - lastRewriteProgress < 520) return;
            lastRewriteProgress = length;
            report(`第${chapterNumber}章を受信中... ${formatNumber(length)}字`, {
              phase: 'brushupChapter',
              transient: true,
              detail: '講評を反映した改稿本文を受信しています。Outputは完了時に反映します。',
              chapterNumber,
              chapterCount: sourceChapters.length,
              completedChars: submissionCharLength(chapters.join('\n\n')) + length,
            });
          },
          options: {
            temperature: attempt === 1 ? 0.72 : 0.68,
            disableGoogleSearch: true,
            maxTokens: brushupChapterOutputTokenLimit(targetPlan, attempt),
            maxOutputTokens: brushupChapterOutputTokenLimit(targetPlan, attempt),
            timeoutMs: 240000,
            signal,
          },
        });
      } catch (error) {
        if (!isLongifyTimeoutError(error)) throw error;
        report(`第${chapterNumber}章の改稿応答がタイムアウトしたため退避します。`, {
          phase: 'brushupChapterTimeout',
          detail: bestPolishedChapter
            ? `保持済みの最良候補 ${formatNumber(bestPolishedChars)}字を採用して続行します。`
            : '保持できる改稿候補がないため、元章を保持して続行します。',
          chapterNumber,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')) + bestPolishedChars,
        });
        polishedChapter = bestPolishedChapter || '';
        polishedArtifactIssues = [];
        break;
      }
      throwIfAborted(signal);
      if (rewriteResponse?.usedModel) usedModels.push(rewriteResponse.usedModel);
      const rawPolishedChapter = rewriteResponse?.text || rewriteResponse || '';
      const rawPolishedArtifactIssues = longifyFormatArtifactIssues(rawPolishedChapter);
      polishedChapter = cleanLongifyDraft(rawPolishedChapter);
      polishedArtifactIssues = longifyFormatArtifactIssues(polishedChapter);
      const polishedChars = submissionCharLength(polishedChapter);
      const sanitizedUsable = rawPolishedArtifactIssues.length > 0
        && polishedArtifactIssues.length === 0
        && polishedChars >= hardMinimumPolishedChars;
      const candidateTooLong = targetPlan.compressionMode
        && polishedChars > Math.ceil(targetPlan.max * 1.35);
      if (
        polishedArtifactIssues.length === 0
        && polishedChars >= hardMinimumPolishedChars
        && !candidateTooLong
        && polishedChars > bestPolishedChars
      ) {
        bestPolishedChapter = polishedChapter;
        bestPolishedChars = polishedChars;
        bestPolishedWasSanitized = rawPolishedArtifactIssues.length > 0;
      }
      if (sanitizedUsable) {
        report(`第${chapterNumber}章の改稿形式崩れを除去して候補化しました。`, {
          phase: 'brushupChapterSanitized',
          detail: `混入形式: ${rawPolishedArtifactIssues.join('、')}。掃除後の本文 ${formatNumber(polishedChars)}字を採用候補として保持します。`,
          chapterNumber,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')) + polishedChars,
        });
      }
      const needsRetry = polishedArtifactIssues.length > 0
        || polishedChars < targetPolishedChars
        || (targetPlan.compressionMode && polishedChars > Math.ceil(targetPlan.max * 1.35));
      if (!needsRetry) break;
      if (attempt < maxRewriteAttempts) {
        const retryArtifactIssues = rawPolishedArtifactIssues.length
          ? rawPolishedArtifactIssues
          : polishedArtifactIssues;
        report(retryArtifactIssues.length
          ? `第${chapterNumber}章の改稿が本文形式ではないため再試行します...`
          : targetPlan.compressionMode && polishedChars > targetPlan.max
            ? `第${chapterNumber}章の改稿が長すぎるため圧縮再試行します...`
            : `第${chapterNumber}章の改稿が短いため再試行します...`, {
          phase: 'brushupChapterRetry',
          detail: retryArtifactIssues.length
            ? `混入形式: ${retryArtifactIssues.join('、')}`
            : targetPlan.compressionMode && polishedChars > targetPlan.max
              ? `現在${formatNumber(polishedChars)}字 / 上限目安${formatNumber(targetPlan.max)}字。反復を削って圧縮します。`
              : `現在${formatNumber(polishedChars)}字 / 目標${formatNumber(targetPolishedChars)}字。章を要約にせず、場面として増補します。`,
          chapterNumber,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')),
        });
      }
    }
    if (
      bestPolishedChapter
      && (
        polishedArtifactIssues.length > 0
        || submissionCharLength(polishedChapter) < hardMinimumPolishedChars
        || (targetPlan.compressionMode && submissionCharLength(polishedChapter) > Math.ceil(targetPlan.max * 1.35))
      )
    ) {
      polishedChapter = bestPolishedChapter;
      polishedArtifactIssues = [];
      report(`第${chapterNumber}章は再試行中の最良改稿候補を採用します。`, {
        phase: bestPolishedWasSanitized ? 'brushupChapterSanitizedAdopted' : 'brushupChapterBestCandidateAdopted',
        detail: `最後の応答より安定している候補 ${formatNumber(bestPolishedChars)}字を採用し、元章保持への後退を避けます。`,
        chapterNumber,
        chapterCount: sourceChapters.length,
        completedChars: submissionCharLength(chapters.join('\n\n')) + bestPolishedChars,
      });
    }
    const polishedChapterChars = submissionCharLength(polishedChapter);
    const compressionOverMax = targetPlan.compressionMode && polishedChapterChars > Math.ceil(targetPlan.max * 1.35);
    const compressionTooShort = targetPlan.compressionMode && polishedChapterChars < hardMinimumPolishedChars;
    const compressionBadFormat = targetPlan.compressionMode && polishedArtifactIssues.length > 0;
    if (compressionOverMax || compressionTooShort || compressionBadFormat) {
      report(`第${chapterNumber}章の圧縮改稿が字数レンジを外れたため停止します。`, {
        phase: 'brushupChapterRejected',
        detail: compressionBadFormat
          ? `混入形式: ${polishedArtifactIssues.join('、')}。本文形式ではない改稿を採用しません。`
          : compressionOverMax
            ? `圧縮後 ${formatNumber(polishedChapterChars)}字 / 許容上限 ${formatNumber(Math.ceil(targetPlan.max * 1.35))}字。過長結果を採用しません。`
            : `圧縮後 ${formatNumber(polishedChapterChars)}字 / 下限 ${formatNumber(hardMinimumPolishedChars)}字。要約化した結果を採用しません。`,
        chapterNumber,
        chapterCount: sourceChapters.length,
        completedChars: submissionCharLength(chapters.join('\n\n')),
      });
      throw new Error(`第${chapterNumber}章の圧縮改稿に失敗しました（${formatNumber(polishedChapterChars)}字 / 指定レンジ ${targetPlan.label}）。過長または要約化した章を採用せず停止しました。`);
    }
    const preserveOriginalChapter = !targetPlan.compressionMode && (
      polishedChapterChars < hardMinimumPolishedChars
      || polishedArtifactIssues.length > 0
    );
    if (preserveOriginalChapter) {
      report(`第${chapterNumber}章の改稿結果が短すぎるため、元章を保持します...`, {
        phase: 'brushupChapterPreserve',
        detail: polishedArtifactIssues.length
          ? `混入形式: ${polishedArtifactIssues.join('、')}。本文形式ではない改稿を棄却し、元章を掃除して返します。`
          : `新改稿 ${formatNumber(polishedChapterChars)}字 / 下限 ${formatNumber(hardMinimumPolishedChars)}字。短い改稿を棄却し、元の章を返します。`,
        chapterNumber,
        chapterCount: sourceChapters.length,
        completedChars: submissionCharLength(chapters.join('\n\n')),
      });
    }
    const selectedChapter = preserveOriginalChapter ? cleanLongifyDraft(chapterText) : polishedChapter;
    chapters.push(ensureChapterHeading(selectedChapter, chapterNumber));
    report(`第${chapterNumber}章のブラッシュアップ完了`, {
      phase: 'brushupChapterDone',
      detail: preserveOriginalChapter
        ? 'AI改稿が短すぎたため、元章を保持してブラッシュアップ全体を続行しました。'
        : '章の因果と語り口を保ったまま弱点を補強しました。',
      chapterNumber,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
  }

  let brushupTopupAttempts = 0;
  const initialBrushupTopupDeficit = Math.max(0, brushupMinimumChars - submissionCharLength(chapters.join('\n\n')));
  const maxBrushupTopupAttempts = targetTotalNumber
    ? longifyTopupMaxAttempts(initialBrushupTopupDeficit, BRUSHUP_TOPUP_MAX_ATTEMPTS)
    : 2;
  while (submissionCharLength(chapters.join('\n\n')) < brushupMinimumChars && brushupTopupAttempts < maxBrushupTopupAttempts) {
    throwIfAborted(signal);
    brushupTopupAttempts += 1;
    const currentText = chapters.join('\n\n');
    const currentChars = submissionCharLength(currentText);
    const deficit = Math.max(0, brushupMinimumChars - currentChars);
    const topupOutputTokens = longifyTopupOutputTokenLimit(deficit);
    report(`ブラッシュアップ後の最低文字数を補強中... (${formatNumber(currentChars)} / ${formatNumber(brushupMinimumChars)}字)`, {
      phase: 'brushupTopup',
      detail: `不足 ${formatNumber(deficit)}字。長編扱いを維持できるよう、最終章へ自然な場面を追加します。`,
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
      completedChars: currentChars,
    });
    let lastTopupProgress = 0;
    const topupResponse = await callModel(buildLongifyTopupPrompt({
      seedText: manuscript,
      ledgerText: [critiqueText, structureGuide].filter(Boolean).join('\n\n'),
      currentText,
      deficitChars: deficit,
      targetTotalChars: brushupMinimumChars,
      chapterCount: sourceChapters.length,
      styleMode: 'preserve',
      endingMode: 'keep',
    }), {
      stage: 'brushupTopup',
      attempt: brushupTopupAttempts,
      onFallback: fallbackModel => report(`補強モデルを切り替えて続行中: ${fallbackModel}`, {
        phase: 'fallback',
        detail: `最低文字数補強を ${fallbackModel} で継続します。`,
        chapterNumber: sourceChapters.length,
        chapterCount: sourceChapters.length,
      }),
      onChunk: draft => {
        const length = submissionCharLength(draft);
        if (length - lastTopupProgress < 520) return;
        lastTopupProgress = length;
        report(`最低文字数補強を受信中... ${formatNumber(length)}字`, {
          phase: 'brushupTopup',
          transient: true,
          detail: '補強本文を受信中です。Outputは完了時に反映します。',
          chapterNumber: sourceChapters.length,
          chapterCount: sourceChapters.length,
          completedChars: currentChars + length,
        });
      },
      options: {
        temperature: 0.76,
        disableGoogleSearch: true,
        maxTokens: topupOutputTokens,
        maxOutputTokens: topupOutputTokens,
        timeoutMs: 240000,
        signal,
      },
    });
    throwIfAborted(signal);
    if (topupResponse?.usedModel) usedModels.push(topupResponse.usedModel);
    const rawTopupText = topupResponse?.text || topupResponse || '';
    const topupArtifactIssues = longifyFormatArtifactIssues(rawTopupText);
    const topupText = cleanLongifyDraft(rawTopupText);
    if (topupArtifactIssues.length) {
      if (submissionCharLength(topupText) >= 200 && !hasLongifyFormatArtifacts(topupText)) {
        report('ブラッシュアップ後の最低文字数補強の形式崩れを除去して採用しました。', {
          phase: 'brushupTopupSanitized',
          detail: `混入形式: ${topupArtifactIssues.join('、')}。掃除後の追加本文を採用します。`,
          chapterNumber: sourceChapters.length,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')) + submissionCharLength(topupText),
        });
      } else {
        report('ブラッシュアップ後の最低文字数補強が本文形式ではないため再試行します。', {
          phase: 'brushupTopupRetry',
          detail: `混入形式: ${topupArtifactIssues.join('、')}`,
          chapterNumber: sourceChapters.length,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')),
        });
        continue;
      }
    }
    if (submissionCharLength(topupText) < 200) break;
    chapters[chapters.length - 1] = ensureChapterHeading(
      `${chapters[chapters.length - 1]}\n\n${topupText}`.trim(),
      chapters.length,
    );
    report(`ブラッシュアップ後の最低文字数補強を追加しました。現在 ${formatNumber(submissionCharLength(chapters.join('\n\n')))}字`, {
      phase: 'brushupTopupDone',
      detail: '不足分を最終章へ自然に接続しました。',
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
  }

  if (submissionCharLength(chapters.join('\n\n')) < MIN_BRUSHUP_LONG_CHARS) {
    throw new Error('ブラッシュアップ結果が長編最低文字数を下回りました。');
  }

  const text = formatBrushupOutput({ title, chapters, fallbackText: manuscript });
  report('改稿後の完成稿をAI講評で再評価中...', {
    phase: 'brushupReview',
    detail: '再ブラッシュアップでそのまま使える章別の改稿指示をAIに作成させています。',
    chapterNumber: sourceChapters.length,
    chapterCount: sourceChapters.length,
    completedChars: submissionCharLength(stripStoryMakerFooter(text)),
  });
  const reviewResult = await requestLongifyAiReview({
    callModel,
    manuscript: text,
    mode: 'brushup',
    priorReviewText: critiqueText,
    targetChars: targetTotalNumber,
    chapterCount: chapters.length,
    stage: 'brushupReview',
    report,
    reportContext: {
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
    },
    fallbackDetail: '改稿後AI講評',
    signal,
  });
  throwIfAborted(signal);
  const aiReviewText = cleanLongifyAiReviewText(reviewResult.text);
  if (!aiReviewText) {
    throw new Error('改稿後AI講評の応答が空でした。');
  }
  if (reviewResult.usedModel) usedModels.push(reviewResult.usedModel);
  const priorScore = extractAiReviewScore(priorReviewCritiqueText);
  const nextScore = extractAiReviewScore(aiReviewText);
  const scoreRegressionBlocked = priorScore !== null
    && nextScore !== null
    && nextScore < priorScore;
  if (scoreRegressionBlocked) {
    const retainedChapters = sourceChapters.map((chapter, index) => ensureChapterHeading(cleanLongifyDraft(chapter), index + 1));
    const retainedText = formatBrushupOutput({ title, chapters: retainedChapters, fallbackText: manuscript });
    const retainedChars = submissionCharLength(stripStoryMakerFooter(retainedText));
    report('AI採点が前回より下がったため、改稿結果を採用せず元原稿を保持します。', {
      phase: 'brushupScoreRegressionGuard',
      detail: `保持 ${priorScore}点 / 破棄 ${nextScore}点。品質悪化版をOutputへ固定しないため、直前の長編本文とAI講評に戻します。`,
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
      completedChars: retainedChars,
    });
    return {
      mode: 'brushup',
      title,
      critiqueText,
      structureGuide,
      chapters: retainedChapters,
      chapterCount: sourceChapters.length,
      usedModels: [...new Set(usedModels)],
      text: retainedText,
      aiReviewText: priorReviewCritiqueText || aiReviewText,
      reviewSource: priorReviewCritiqueText ? 'ai' : reviewResult.source,
      originalChars: sourceTotalChars,
      finalChars: retainedChars,
      targetTotalNumber,
      scoreRegressionBlocked: true,
      retainedScore: priorScore,
      rejectedScore: nextScore,
      rejectedAiReviewText: aiReviewText,
    };
  }
  return {
    mode: 'brushup',
    title,
    critiqueText,
    structureGuide,
    chapters,
    chapterCount: chapters.length,
    usedModels: [...new Set(usedModels)],
    text,
    aiReviewText,
    reviewSource: reviewResult.source,
    originalChars: submissionCharLength(manuscript),
    finalChars: submissionCharLength(stripStoryMakerFooter(text)),
    targetTotalNumber,
  };
}

function setTextContent(element, value) {
  if (element) element.textContent = value;
}

function scrollProgressLogToBottom(progressLog) {
  if (!progressLog) return;
  const scroller = progressLog.closest?.('.progress-content') || progressLog.parentElement || progressLog;
  const scroll = () => {
    scroller.scrollTop = scroller.scrollHeight;
    progressLog.scrollTop = progressLog.scrollHeight;
  };
  scroll();
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scroll);
  } else {
    setTimeout(scroll, 0);
  }
}

function setOutputText(outputEl, charCounter, text) {
  if (!outputEl) return;
  if (outputEl.dataset) delete outputEl.dataset.manualOutput;
  if (outputEl.dataset) outputEl.dataset.longifyOutput = 'true';
  outputEl.classList.remove('empty');
  outputEl.textContent = text;
  if (charCounter) {
    charCounter.textContent = `${formatNumber(submissionCharLength(stripStoryMakerFooter(text)))} 字`;
  }
  notifyOutputDependentPanels('longify-output-set');
}

function getOutputScroller(outputEl) {
  if (typeof document === 'undefined') return outputEl || null;
  return outputEl
    || document.getElementById('output-panel')
    || outputEl?.closest?.('.output-panel')
    || outputEl?.parentElement
    || null;
}

function scrollOutputToEnd(outputEl) {
  const scroller = getOutputScroller(outputEl);
  const scroll = () => {
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
    if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
  };
  scroll();
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scroll);
  } else {
    setTimeout(scroll, 0);
  }
}

function focusOutputAtEnd(outputEl) {
  if (!outputEl || typeof outputEl.focus !== 'function') return;
  if (!outputEl.hasAttribute?.('tabindex')) outputEl.setAttribute('tabindex', '-1');
  try {
    outputEl.focus({ preventScroll: true });
  } catch {
    outputEl.focus();
  }
}

function waitForPaint() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

function getTypewriterBatchSize(totalChars) {
  if (totalChars <= 8000) return Math.max(2, Math.ceil(totalChars / 1800));
  if (totalChars <= 30000) return Math.max(24, Math.ceil(totalChars / 240));
  return Math.max(80, Math.ceil(totalChars / 320));
}

async function setOutputTextTypewriter(outputEl, charCounter, text, { signal, onRenderProgress } = {}) {
  if (!outputEl) return;
  const pageRoot = typeof document !== 'undefined' ? document.documentElement : null;
  const previousOutputFlag = outputEl.dataset?.longifyRendering;
  const previousPageFlag = pageRoot?.dataset?.longifyRendering;
  if (outputEl.dataset) outputEl.dataset.longifyRendering = 'true';
  if (outputEl.dataset) outputEl.dataset.longifyOutput = 'true';
  if (pageRoot?.dataset) pageRoot.dataset.longifyRendering = 'true';
  const finalText = String(text || '');
  const finalSubmissionChars = submissionCharLength(stripStoryMakerFooter(finalText));
  const chars = Array.from(finalText);
  const batchSize = Math.max(1, getTypewriterBatchSize(chars.length));
  let renderedSubmissionChars = 0;
  let tick = 0;
  const renderStartedAt = Date.now();
  const notifyRenderProgress = () => {
    if (typeof onRenderProgress !== 'function') return;
    onRenderProgress({
      elapsedSeconds: Math.max(0, Math.floor((Date.now() - renderStartedAt) / 1000)),
      renderedChars: Math.min(renderedSubmissionChars, finalSubmissionChars),
      totalChars: finalSubmissionChars,
    });
  };

  try {
    if (outputEl.dataset) delete outputEl.dataset.manualOutput;
    outputEl.classList.remove('empty');
    outputEl.textContent = '';
    focusOutputAtEnd(outputEl);
    scrollOutputToEnd(outputEl);
    notifyRenderProgress();

    for (let index = 0; index < chars.length; index += batchSize) {
      throwIfAborted(signal);
      const chunk = chars.slice(index, index + batchSize).join('');
      renderedSubmissionChars += submissionCharLength(chunk);
      if (typeof document !== 'undefined' && typeof document.createTextNode === 'function') {
        outputEl.appendChild(document.createTextNode(chunk));
      } else {
        outputEl.textContent += chunk;
      }
      if (charCounter && tick % 8 === 0) {
        charCounter.textContent = `${formatNumber(Math.min(renderedSubmissionChars, finalSubmissionChars))} 字`;
      }
      if (tick % 8 === 0) {
        notifyRenderProgress();
      }
      scrollOutputToEnd(outputEl);
      tick += 1;
      await waitForPaint();
    }

    if (charCounter) {
      charCounter.textContent = `${formatNumber(finalSubmissionChars)} 字`;
    }
    notifyRenderProgress();
    focusOutputAtEnd(outputEl);
    scrollOutputToEnd(outputEl);
    notifyOutputDependentPanels('longify-output-rendered');
  } finally {
    if (outputEl.dataset) {
      if (previousOutputFlag) outputEl.dataset.longifyRendering = previousOutputFlag;
      else delete outputEl.dataset.longifyRendering;
    }
    if (pageRoot?.dataset) {
      if (previousPageFlag) pageRoot.dataset.longifyRendering = previousPageFlag;
      else delete pageRoot.dataset.longifyRendering;
    }
  }
}

function updateOutputRenderProgress(statusEl, progress, modeLabel = 'ライブ表示中') {
  const elapsedText = formatHeartbeatSeconds(progress?.elapsedSeconds || 0);
  const renderedChars = Math.max(0, Number(progress?.renderedChars || 0));
  const totalChars = Math.max(0, Number(progress?.totalChars || 0));
  setTextContent(
    statusEl,
    `${modeLabel}... ${elapsedText}経過 / ${formatNumber(renderedChars)} / ${formatNumber(totalChars)}字`
  );
  signalAiProgressHeartbeat({
    phase: `${modeLabel} ${elapsedText}経過`,
    completedChars: renderedChars,
  });
}

function setLongifyTags(tagRow, result) {
  if (!tagRow) return;
  tagRow.innerHTML = '';
  const chapterCount = result.chapters?.length || result.chapterCount || countLongifyChapterHeadings(result.text);
  const labels = [
    result.mode === 'brushup' ? 'ブラッシュアップβ' : '長編化β',
    chapterCount ? `${chapterCount}章` : '',
    `${formatNumber(submissionCharLength(stripStoryMakerFooter(result.text)))}字`,
    ...result.usedModels.slice(0, 2),
  ];
  for (const label of labels.filter(Boolean)) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = label;
    tagRow.appendChild(span);
  }
}

function notifyOutputDependentPanels(reason = 'longify-output-updated') {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
  window.dispatchEvent(new CustomEvent('story-maker:output-updated', {
    detail: { reason },
  }));
  window.dispatchEvent(new CustomEvent('story-maker:kakuyomu-refresh', {
    detail: { reason },
  }));
  window.dispatchEvent(new CustomEvent('story-maker:alphapolis-refresh', {
    detail: { reason },
  }));
}

function setControlLockState(rootEl, locked) {
  if (!rootEl || typeof rootEl.querySelectorAll !== 'function') return;
  rootEl.querySelectorAll('button, input, textarea, select').forEach(control => {
    if (locked) {
      if (!control.hasAttribute('data-longify-locked-disabled')) {
        control.setAttribute('data-longify-locked-disabled', control.disabled ? 'true' : 'false');
      }
      control.disabled = true;
      return;
    }
    if (control.getAttribute('data-longify-locked-disabled') === 'false') {
      control.disabled = false;
    }
    control.removeAttribute('data-longify-locked-disabled');
  });
}

export function setSettingsPanelBusy(busy, label = '長編化β処理中') {
  if (typeof document === 'undefined') return;
  const locked = Boolean(busy);
  const settingsEl = document.getElementById('settings');
  if (settingsEl) {
    settingsEl.classList.toggle('generating', locked);
    settingsEl.setAttribute('aria-busy', locked ? 'true' : 'false');
    settingsEl.title = locked ? `${label}は左メニューを変更できません` : '';
  }
  const styleAnalyzerEl = document.getElementById('sa-section');
  if (styleAnalyzerEl) {
    styleAnalyzerEl.classList.toggle('generating', locked);
    styleAnalyzerEl.setAttribute('aria-busy', locked ? 'true' : 'false');
    styleAnalyzerEl.setAttribute('aria-disabled', locked ? 'true' : 'false');
    styleAnalyzerEl.title = locked ? `${label}は作風解析を実行できません` : '';
    setControlLockState(styleAnalyzerEl, locked);
  }
}

const MOJIBAKE_PATTERN = /(?:繝|繧|縺|荳|譁|邱|蛹|髟|蟄|蜿|遉|縲|窶)/gu;
const DIALOGUE_PATTERN = /「[^」\n]{2,}」|"[^"\n]{2,}"/gu;
const SENSORY_PATTERN = /匂|にお|音|声|沈黙|視線|指|手|足|息|汗|痛|冷|熱|光|影|雨|風|夜|朝|塩|油|香|sound|smell|silence|light|shadow|rain|tide|salt|breath|voice|hand|finger/giu;
const ACTION_PATTERN = /選|決|渡|開|閉|歩|走|触|見|聞|言|黙|立|座|取|置|戻|進|待|探|choose|open|close|walk|touch|look|ask|wait|search|realize|chose/giu;
const EMOTION_PATTERN = /恐|怖|不安|怒|悔|寂|嬉|迷|躊躇|安心|痛|願|欲|後悔|守|信|cost|fear|want|wanted|realized|protect|silence/giu;

function clampScore(value) {
  return Math.max(20, Math.min(98, Math.round(value)));
}

function countMatches(text, pattern) {
  return (String(text || '').match(pattern) || []).length;
}

function splitReviewParagraphs(text) {
  return normalizeLongifyPublicText(text)
    .split(/\n{2,}|\n/u)
    .map(line => line.trim())
    .filter(line => charLength(line) >= 24);
}

function normalizeForRepeat(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[、。！？!?.,;:「」『』（）()【】\[\]\s\u3000"'“”‘’]/gu, '')
    .trim();
}

function countRepeatedUnits(units, minChars = 42) {
  const seen = new Map();
  let repeats = 0;
  for (const unit of units) {
    const normalized = normalizeForRepeat(unit);
    if (charLength(normalized) < minChars) continue;
    const count = seen.get(normalized) || 0;
    if (count === 1) repeats += 1;
    else if (count > 1) repeats += 0.5;
    seen.set(normalized, count + 1);
  }
  return repeats;
}

function countRepeatedSentences(text) {
  const sentences = String(text || '')
    .split(/[。！？!?.\n]+/u)
    .map(line => line.trim())
    .filter(line => charLength(line) >= 36);
  return countRepeatedUnits(sentences, 36);
}

function detectLongifyChapterOverlap(chapterText, previousChapters = []) {
  if (!previousChapters.length) return { ok: true };
  const currentParagraphs = splitReviewParagraphs(chapterBodyText(chapterText))
    .map(normalizeForRepeat)
    .filter(unit => charLength(unit) >= 56);
  const currentSentences = String(chapterBodyText(chapterText) || '')
    .split(/[。！？!?.\n]+/u)
    .map(normalizeForRepeat)
    .filter(unit => charLength(unit) >= 42);
  if (currentParagraphs.length < 3 && currentSentences.length < 5) return { ok: true };

  const previousParagraphs = new Set();
  const previousSentences = new Set();
  previousChapters.forEach(previous => {
    splitReviewParagraphs(chapterBodyText(previous))
      .map(normalizeForRepeat)
      .filter(unit => charLength(unit) >= 56)
      .forEach(unit => previousParagraphs.add(unit));
    String(chapterBodyText(previous) || '')
      .split(/[。！？!?.\n]+/u)
      .map(normalizeForRepeat)
      .filter(unit => charLength(unit) >= 42)
      .forEach(unit => previousSentences.add(unit));
  });

  const repeatedParagraphs = currentParagraphs.filter(unit => previousParagraphs.has(unit)).length;
  const repeatedSentences = currentSentences.filter(unit => previousSentences.has(unit)).length;
  const paragraphRatio = currentParagraphs.length ? repeatedParagraphs / currentParagraphs.length : 0;
  const sentenceRatio = currentSentences.length ? repeatedSentences / currentSentences.length : 0;
  const overlapsTooMuch = (repeatedParagraphs >= 2 && paragraphRatio >= 0.24)
    || (repeatedSentences >= 5 && sentenceRatio >= 0.28);
  if (!overlapsTooMuch) return { ok: true };
  return {
    ok: false,
    reason: `既存章と重複する段落または文が多すぎます（段落${formatNumber(repeatedParagraphs)} / 文${formatNumber(repeatedSentences)}）。`,
    repeatedParagraphs,
    repeatedSentences,
    paragraphRatio,
    sentenceRatio,
  };
}

function getChapterLengthBalance(body, fallbackChapterCount = 0) {
  const split = splitLongifyManuscript(body);
  const lengths = split.chapters.map(chapter => submissionCharLength(chapter)).filter(Boolean);
  if (lengths.length < 2 && fallbackChapterCount < 2) {
    return { ratio: 0, lengths, label: '章分割なし' };
  }
  if (lengths.length < 2) {
    return { ratio: 0, lengths, label: '章本文を分割できません' };
  }
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const ratio = max > 0 ? min / max : 0;
  const label = ratio >= 0.65 ? '良好' : ratio >= 0.45 ? 'やや偏り' : '偏り大';
  return { ratio, lengths, label };
}

function ratePerThousand(count, chars) {
  return chars > 0 ? count / Math.max(chars / 1000, 1) : 0;
}

export function buildLongifyReview({
  text = '',
  mode = 'longify',
  targetChars = 0,
  chapterCount = 0,
  critiqueText = '',
} = {}) {
  const body = normalizeLongifyPublicText(stripStoryMakerFooter(text));
  const chars = submissionCharLength(body);
  const chapters = chapterCount || countLongifyChapterHeadings(body);
  const target = Math.max(0, Number(targetChars || 0));
  const mojibakeHits = (body.match(MOJIBAKE_PATTERN) || []).length;
  const hasOversizedBlank = /\n[\t \u3000]*\n[\t \u3000]*\n/u.test(body);
  const hasClosing = /【完】|（終）|\(終\)|Created By AI Story Maker/i.test(text);
  const paragraphs = splitReviewParagraphs(body);
  const paragraphDensity = ratePerThousand(paragraphs.length, chars);
  const dialogueCount = countMatches(body, DIALOGUE_PATTERN);
  const dialogueDensity = ratePerThousand(dialogueCount, chars);
  const sensoryHits = countMatches(body, SENSORY_PATTERN);
  const sensoryDensity = ratePerThousand(sensoryHits, chars);
  const actionHits = countMatches(body, ACTION_PATTERN);
  const actionDensity = ratePerThousand(actionHits, chars);
  const emotionHits = countMatches(body, EMOTION_PATTERN);
  const emotionDensity = ratePerThousand(emotionHits, chars);
  const repeatedParagraphs = countRepeatedUnits(paragraphs, 56);
  const repeatedSentences = countRepeatedSentences(body);
  const repeatPenalty = Math.min(18, repeatedParagraphs * 3 + repeatedSentences * 2);
  const balance = getChapterLengthBalance(body, chapters);
  let score = 58;

  if (target) {
    if (chars >= target) {
      score += 10;
    } else {
      const missingRatio = (target - chars) / Math.max(target, 1);
      score -= Math.min(18, Math.ceil(missingRatio * 34));
    }
  } else if (chars >= 30000) {
    score += 12;
  } else if (chars >= 15000) {
    score += 9;
  } else if (chars >= 8000) {
    score += 6;
  } else if (chars >= 3000) {
    score += 2;
  } else {
    score -= 8;
  }
  if (chapters >= 5) score += 9;
  else if (chapters >= 3) score += 7;
  else if (chapters >= 2) score += 3;
  else score -= 8;
  if (balance.ratio >= 0.65) score += 8;
  else if (balance.ratio >= 0.45) score += 3;
  else if (chapters >= 2) score -= 8;
  if (dialogueDensity >= 0.18 && dialogueDensity <= 4.5) score += 7;
  else if (dialogueDensity > 0) score += 2;
  else score -= 5;
  if (sensoryDensity >= 2.2) score += 7;
  else if (sensoryDensity >= 0.9) score += 4;
  else score -= 4;
  if (actionDensity >= 2.4) score += 5;
  else if (actionDensity < 0.8) score -= 3;
  if (emotionDensity >= 1.2) score += 4;
  else if (emotionDensity < 0.35) score -= 3;
  if (paragraphDensity >= 1.8 && paragraphDensity <= 18) score += 5;
  else score -= 4;
  if (hasClosing) score += 3;
  if (!mojibakeHits) score += 2;
  if (mode === 'brushup' && String(critiqueText || '').trim()) score += 3;
  if (mojibakeHits) score -= 25;
  if (hasOversizedBlank) score -= 5;
  score -= repeatPenalty;

  const finalScore = clampScore(score);
  let summary = '長編化の骨格はありますが、章ごとの起伏と本文密度はまだ確認が必要です。';
  if (finalScore >= 90) {
    summary = '文字数、章構成、場面密度のバランスがよく、投稿前チェックとしてはかなり安定しています。';
  } else if (finalScore >= 80) {
    summary = '長編として読める土台はあります。ブラッシュアップでは薄い章と反復箇所を優先すると伸びます。';
  } else if (finalScore < 75) {
    summary = '機械的な長編化に寄っている可能性があります。章構成、場面密度、反復の再点検が必要です。';
  }
  if (mojibakeHits) {
    summary = '文字化けらしき断片を検出しました。公開前に再生成またはブラッシュアップ推奨です。';
  }

  const positives = [
    chapters >= 3 ? `${chapters}章の章立てがあり、長編として読み進める骨格があります。` : '',
    target && chars >= target ? '指定した最低文字数を投稿サイト準拠カウントで達成しています。' : '',
    balance.ratio >= 0.65 ? '章ごとの分量バランスが大きく崩れていません。' : '',
    dialogueDensity >= 0.18 ? '会話または発話の量があり、場面の動きが確認できます。' : '',
    sensoryDensity >= 0.9 ? '感覚描写・身体反応・場所の手触りが本文内に出ています。' : '',
    actionDensity >= 2.4 ? '人物の行動や選択を示す語が一定量あり、説明だけに寄りすぎていません。' : '',
    hasClosing ? '終端の処理があり、読後感の置き場所が確認できます。' : '',
    !mojibakeHits ? '文字化け候補は検出されず、公開前チェックの土台は安定しています。' : '',
  ].filter(Boolean);
  if (!positives.length) {
    positives.push('短編の芯を長編へ伸ばす下地は残っています。');
  }

  const negatives = [
    target && chars < target ? `最低文字数まで約${formatNumber(target - chars)}字不足しています。` : '',
    chapters < 3 ? '章数が少なく、長編としての段階的な展開が弱く見えます。' : '',
    chapters >= 2 && balance.ratio < 0.45 ? '章ごとの分量に大きな偏りがあり、短い章が要約化している可能性があります。' : '',
    dialogueDensity <= 0 ? '会話がほぼ検出できず、場面が説明文だけで進んでいる可能性があります。' : '',
    sensoryDensity < 0.9 ? '匂い、音、身体反応、視線などの感覚描写が薄めです。' : '',
    actionDensity < 0.8 ? '人物の行動・選択を示す語が少なく、筋の説明に寄っている可能性があります。' : '',
    emotionDensity < 0.35 ? '欲求、迷い、恐れ、後悔などの感情変化が薄めです。' : '',
    repeatPenalty > 0 ? `反復候補を検出しました（段落${formatNumber(repeatedParagraphs)} / 文${formatNumber(repeatedSentences)}）。` : '',
    hasOversizedBlank ? '段落間に大きすぎる空白があり、投稿時の見た目が崩れる可能性があります。' : '',
    mojibakeHits ? '文字化け候補が本文内に残っている可能性があります。' : '',
    finalScore < 90 ? '章ごとの山場、関係変化、伏線回収の強弱はまだ上げられます。' : '',
  ].filter(Boolean);
  if (!negatives.length) {
    negatives.push('大きな機械的欠陥は少なめです。次は文体の艶と章ごとの緊張差を磨く段階です。');
  }

  const brushupPlan = [
    mojibakeHits ? '文字化け候補を除去し、壊れた固定文言が本文に混ざっていないか確認する。' : '',
    target && chars < target ? '不足文字数は説明の水増しではなく、会話、行動、選択、余韻の場面として増やす。' : '',
    chapters >= 2 && balance.ratio < 0.65 ? '短い章へ、人物の選択・相手の反応・具体物の変化を足して章量をならす。' : '',
    dialogueDensity <= 0 ? '主要人物が互いに何を隠し、何を言い淀むかを会話として追加する。' : '',
    sensoryDensity < 0.9 ? '場面ごとに匂い、音、手触り、身体反応を入れ、読者が現場に立てる密度へ上げる。' : '',
    repeatPenalty > 0 ? '似た段落・同じ言い回しを削り、別の行動、別の具体物、別の反応へ置き換える。' : '',
    hasOversizedBlank ? '過剰な空行や単独区切り記号を詰め、投稿画面で読みやすい段落間隔へ整える。' : '',
    '弱い章から順に、主人公の選択、相手の反応、具体物の意味変化を増やして芯を強める。',
    mode === 'brushup'
      ? '次回ブラッシュアップでは、今回の改稿でまだ薄い章だけを重点的に再点検する。'
      : '初回ブラッシュアップでは、全体講評を作ってから章ごとの不足場面を補強する。',
  ].filter(Boolean);

  const details = [
    `投稿サイト準拠文字数: ${formatNumber(chars)}字`,
    chapters ? `章数: ${chapters}章` : '',
    target ? `最低文字数: ${chars >= target ? '達成' : '未達'}（${formatNumber(target)}字）` : '',
    chapters >= 2 ? `章分量バランス: ${balance.label}` : '',
    `会話量: ${formatNumber(dialogueCount)}箇所`,
    `感覚描写密度: ${sensoryDensity.toFixed(1)} / 千字`,
    `行動・選択密度: ${actionDensity.toFixed(1)} / 千字`,
    `感情変化密度: ${emotionDensity.toFixed(1)} / 千字`,
    repeatPenalty > 0 ? `反復候補: 段落${formatNumber(repeatedParagraphs)} / 文${formatNumber(repeatedSentences)}` : '反復候補: 0件',
    hasClosing ? '結末/フッター: 確認済み' : '結末/フッター: 要確認',
    mojibakeHits ? `文字化け候補: ${mojibakeHits}件` : '文字化け候補: 0件',
    hasOversizedBlank ? '段落間の空白: 大きすぎる箇所あり' : '',
  ].filter(Boolean);

  return {
    mode,
    modeLabel: mode === 'brushup' ? 'ブラッシュアップ後' : '長編化後',
    score: finalScore,
    summary,
    positives,
    negatives,
    brushupPlan,
    details,
    chars,
    chapters,
    targetChars: target,
    mojibakeHits,
    analysis: {
      dialogueCount,
      sensoryDensity,
      actionDensity,
      emotionDensity,
      paragraphDensity,
      chapterBalance: balance.ratio,
      repeatedParagraphs,
      repeatedSentences,
      repeatPenalty,
    },
  };
}

function clearLongifyReview() {
  const reviewEl = document.getElementById('longify-beta-review');
  if (!reviewEl) return;
  reviewEl.classList.add('hidden');
  reviewEl.textContent = '';
  delete reviewEl.dataset.reviewMode;
  delete reviewEl.dataset.targetChars;
  delete reviewEl.dataset.chapterCount;
  delete reviewEl.dataset.reviewSource;
  delete reviewEl.dataset.textSignature;
}

function getLongifyReviewPlainText() {
  const reviewEl = document.getElementById('longify-beta-review');
  if (reviewEl?.dataset?.reviewSource === 'failed') return '';
  const aiReviewText = String(reviewEl?.querySelector?.('.longify-beta-review-ai-text')?.textContent || '').trim();
  if (aiReviewText) return aiReviewText;
  return String(reviewEl?.innerText || reviewEl?.textContent || '').trim();
}

function appendLongifyReviewSection(root, title, items = []) {
  const section = document.createElement('div');
  section.className = 'longify-beta-review-section';
  const heading = document.createElement('div');
  heading.className = 'longify-beta-review-section-title';
  heading.textContent = title;
  const list = document.createElement('ul');
  for (const itemText of items.filter(Boolean)) {
    const item = document.createElement('li');
    item.textContent = itemText;
    list.appendChild(item);
  }
  section.append(heading, list);
  root.appendChild(section);
}

function renderLongifyReview(review) {
  const reviewEl = document.getElementById('longify-beta-review');
  if (!reviewEl || !review) return;
  reviewEl.innerHTML = '';
  reviewEl.classList.remove('hidden');
  reviewEl.dataset.reviewMode = review.mode || 'longify';
  reviewEl.dataset.chapterCount = String(review.chapters || '');
  reviewEl.dataset.targetChars = String(review.targetChars || '');
  reviewEl.dataset.reviewSource = review.source || 'local';
  reviewEl.dataset.textSignature = review.signature || '';

  const scoreLine = document.createElement('div');
  scoreLine.className = 'longify-beta-review-score';
  if (review.source === 'failed') {
    scoreLine.textContent = `${review.modeLabel} AI講評: 取得失敗（未採点）`;
  } else if (review.source === 'ai') {
    scoreLine.textContent = `${review.modeLabel} AI講評${review.score === null ? '' : `: ${review.score}点（${review.passLabel || aiReviewPassLabel(review.score)}）`}`;
  } else {
    scoreLine.textContent = `${review.modeLabel}のローカル確認: ${review.score}点`;
  }

  const summaryLine = document.createElement('div');
  summaryLine.className = 'longify-beta-review-summary';
  summaryLine.textContent = review.summary;

  const list = document.createElement('div');
  list.className = 'longify-beta-review-details';
  for (const detail of review.details || []) {
    const item = document.createElement('span');
    item.textContent = detail;
    list.appendChild(item);
  }

  reviewEl.append(scoreLine, summaryLine, list);
  if (review.source === 'ai' || review.source === 'failed') {
    const aiText = document.createElement('pre');
    aiText.className = 'longify-beta-review-ai-text';
    aiText.textContent = review.aiReviewText || '';
    reviewEl.append(aiText);
    if (review.source === 'ai') return;
  }
  appendLongifyReviewSection(reviewEl, 'よい点', review.positives);
  appendLongifyReviewSection(reviewEl, '悪い点', review.negatives);
  appendLongifyReviewSection(reviewEl, '次回ブラッシュアップ内容', review.brushupPlan);
}

function refreshVisibleLongifyReviewFromOutput(outputEl) {
  const reviewEl = document.getElementById('longify-beta-review');
  if (!reviewEl || reviewEl.classList.contains('hidden')) return;
  if (!outputEl || isOutputEmptyForLongify(outputEl)) {
    clearLongifyReview();
    return;
  }
  const outputText = outputEl.innerText || outputEl.textContent || '';
  if (!hasLongifySeed(outputText)) {
    clearLongifyReview();
    return;
  }
  if (shouldPreserveRenderedLongifyReview({
    reviewSource: reviewEl.dataset.reviewSource,
    textSignature: reviewEl.dataset.textSignature,
    outputText,
  })) {
    return;
  }
  if (!isLongifiedOutputText(outputText)) {
    clearLongifyReview();
    return;
  }
  const mode = reviewEl.dataset.reviewMode === 'brushup' ? 'brushup' : 'longify';
  const targetChars = Number(reviewEl.dataset.targetChars || 0);
  const chapterCount = Number(reviewEl.dataset.chapterCount || 0) || countLongifyChapterHeadings(outputText);
  renderLongifyReview(buildLongifyReview({
    text: outputText,
    mode,
    targetChars,
    chapterCount,
  }));
}

function revealOutputActions() {
  document.getElementById('btn-copy')?.classList.remove('hidden');
  document.getElementById('btn-download')?.classList.remove('hidden');
}

function setControlsDisabled(disabled, { brushupMode = false } = {}) {
  for (const id of ['longify-target-chars']) {
    const control = document.getElementById(id);
    if (!control) continue;
    control.disabled = Boolean(disabled || brushupMode);
    control.title = brushupMode ? 'ブラッシュアップでは文字数を選択しません' : '';
  }
}

export function resolveLongifyPanelState({ unavailable = false, busy = false, ready = false } = {}) {
  const locked = Boolean(unavailable || busy);
  return {
    unavailable: locked,
    busy: Boolean(busy),
    ready: Boolean(ready && !locked),
    ariaDisabled: locked ? 'true' : 'false',
    ariaBusy: busy ? 'true' : 'false',
  };
}

export function resolveLongifyProviderWarningState({ provider = 'gemini' } = {}) {
  const normalizedProvider = provider === 'openai' ? 'openai' : 'gemini';
  return {
    provider: normalizedProvider,
    visible: normalizedProvider === 'gemini',
    ariaHidden: normalizedProvider === 'gemini' ? 'false' : 'true',
  };
}

function refreshLongifyProviderWarning() {
  const warningEl = document.getElementById('longify-gemini-warning');
  if (!warningEl) return;
  const state = resolveLongifyProviderWarningState({ provider: readRuntimeApiProvider() });
  warningEl.classList.toggle('hidden', !state.visible);
  warningEl.setAttribute('aria-hidden', state.ariaHidden);
  warningEl.dataset.provider = state.provider;
}

function setLongifyPanelState(panelState = {}) {
  const rootEl = document.getElementById('longify-beta');
  if (!rootEl) return;
  const resolved = resolveLongifyPanelState(panelState);
  rootEl.classList.toggle('is-unavailable', resolved.unavailable);
  rootEl.classList.toggle('is-busy', resolved.busy);
  rootEl.classList.toggle('is-ready', resolved.ready);
  rootEl.setAttribute('aria-disabled', resolved.ariaDisabled);
  rootEl.setAttribute('aria-busy', resolved.ariaBusy);
}

function setStopButtonState(stopButton, running) {
  if (!stopButton) return;
  stopButton.classList.toggle('hidden', !running);
  stopButton.disabled = !running;
}

function setKakuyomuAssistBusy(busy) {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('kakuyomu-assist');
  root?.classList.toggle('is-busy', Boolean(busy));
  root?.setAttribute('aria-busy', busy ? 'true' : 'false');
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('story-maker:kakuyomu-busy', {
      detail: { busy: Boolean(busy) },
    }));
    window.dispatchEvent(new CustomEvent('story-maker:alphapolis-busy', {
      detail: { busy: Boolean(busy) },
    }));
    if (!busy) {
      window.dispatchEvent(new CustomEvent('story-maker:kakuyomu-refresh', {
        detail: { reason: 'longify-output-updated' },
      }));
      window.dispatchEvent(new CustomEvent('story-maker:alphapolis-refresh', {
        detail: { reason: 'longify-output-updated' },
      }));
    }
  }
}

let activeAiProgressHeartbeat = null;

function stopAiProgressHeartbeat() {
  if (activeAiProgressHeartbeat) activeAiProgressHeartbeat.stop();
  activeAiProgressHeartbeat = null;
}

function appendHeartbeatProgressLine(progressLog, text, previousSecond, currentSecond) {
  if (!progressLog || currentSecond <= 0 || currentSecond % 10 !== 0 || previousSecond === currentSecond) {
    return previousSecond;
  }
  const current = progressLog.textContent ? `${progressLog.textContent}\n` : '';
  progressLog.textContent = `${current}[待機] ${text}`;
  scrollProgressLogToBottom(progressLog);
  return currentSecond;
}

function startAiProgressHeartbeat({ statusEl, modeLabel = '長編化β', initialPhase = 'API応答待機中' } = {}) {
  stopAiProgressHeartbeat();
  const progressTitle = document.getElementById('progress-title-text');
  const progressLog = document.getElementById('progress-log');
  const globalAlert = document.getElementById('global-alert');
  let lastLoggedSecond = -1;
  activeAiProgressHeartbeat = createProgressHeartbeat({
    onTick(state) {
      const heartbeatText = buildProgressHeartbeatText({
        label: '受信中',
        elapsedSeconds: state.elapsedSeconds,
        idleSeconds: state.idleSeconds,
        receivedChars: state.receivedChars ?? 0,
        phase: state.phase || initialPhase,
      });
      if (progressTitle) {
        progressTitle.textContent = `AI進捗・思考ログ: ${modeLabel} API稼働中 (${formatHeartbeatSeconds(state.elapsedSeconds)} / 最終受信 ${formatHeartbeatSeconds(state.idleSeconds)}前)`;
      }
      if (globalAlert) {
        globalAlert.textContent = `${modeLabel} API稼働中: ${heartbeatText}`;
        globalAlert.style.display = 'flex';
      }
      if (statusEl && state.elapsedSeconds > 0) {
        statusEl.textContent = heartbeatText;
      }
      lastLoggedSecond = appendHeartbeatProgressLine(
        progressLog,
        heartbeatText,
        lastLoggedSecond,
        state.elapsedSeconds,
      );
    },
  });
  activeAiProgressHeartbeat.start({
    phase: initialPhase,
    receivedChars: 0,
  });
}

function signalAiProgressHeartbeat({ phase = '', completedChars = 0 } = {}) {
  if (!activeAiProgressHeartbeat) return;
  activeAiProgressHeartbeat.signal({
    phase,
    receivedChars: completedChars || 0,
  });
}

function setAiProgressLongifyActive({ message, detail, chapterNumber = 0, chapterCount = 0, completedChars = 0, options = {}, modeLabel = '長編化β', done = false, aborted = false } = {}) {
  const progressTitle = document.getElementById('progress-title-text');
  const progressLog = document.getElementById('progress-log');
  const scoreBoard = document.getElementById('thought-score-board');
  const globalAlert = document.getElementById('global-alert');
  const progressDisplay = resolveLongifyProgressDisplay({
    mode: options.progressMode,
    brushupAttempt: options.brushupAttempt,
    maxBrushupAttempts: options.maxBrushupAttempts,
    chapterNumber,
    chapterCount,
  });
  const hasExplicitProgressMode = options.progressMode === 'longify' || options.progressMode === 'brushup';
  const displayModeLabel = hasExplicitProgressMode ? progressDisplay.modeLabel : modeLabel;
  const titlePrefix = done ? '完了' : aborted ? '中断' : 'API稼働中';
  if (progressTitle) {
    progressTitle.textContent = `AI進捗・思考ログ: ${displayModeLabel} ${titlePrefix}`;
  }
  if (globalAlert) {
    if (done || aborted) {
      globalAlert.style.display = 'none';
    } else {
      globalAlert.textContent = `${displayModeLabel} API稼働中: ${message || '処理中...'}`;
      globalAlert.style.display = 'flex';
    }
  }
  if (scoreBoard) {
    scoreBoard.innerHTML = '';
    scoreBoard.className = 'thought-score-board';
    scoreBoard.style.display = 'none';
  }
  if (progressLog && message) {
    const progress = chapterCount
      ? ` [${hasExplicitProgressMode ? progressDisplay.progressLabel : `${Math.max(0, chapterNumber)} / ${chapterCount}章`}]`
      : '';
    const generated = completedChars ? ` / 生成済み ${formatNumber(completedChars)}字` : '';
    const minimum = options.targetTotalChars ? ` / ${options.targetTotalChars}` : '';
    const line = detail ? `${message}${progress}${generated}${minimum}\n  - ${detail}` : `${message}${progress}${generated}${minimum}`;
    const current = progressLog.textContent ? `${progressLog.textContent}\n` : '';
    progressLog.textContent = `${current}${line}`;
    scrollProgressLogToBottom(progressLog);
  }
  if (done || aborted) {
    stopAiProgressHeartbeat();
  } else {
    signalAiProgressHeartbeat({
      phase: message || detail || titlePrefix,
      completedChars,
    });
  }
}

function finishAiProgress({ message, detail, options, completedChars, chapterCount, modeLabel, aborted = false } = {}) {
  stopAiProgressHeartbeat();
  setAiProgressLongifyActive({
    message,
    detail,
    chapterNumber: chapterCount,
    chapterCount,
    completedChars,
    options,
    modeLabel,
    done: !aborted,
    aborted,
  });
}

function setStatusForReadiness({ button, statusEl, outputEl, running }) {
  if (!button || !statusEl) return;
  const generationActive = isStoryGenerationActive();
  const outputIsEmpty = isOutputEmptyForLongify(outputEl);
  const outputText = outputEl?.innerText || outputEl?.textContent || '';
  const apiKey = readRuntimeApiKey();
  const hasKey = isRealApiKey(apiKey);
  const seedCharCount = submissionCharLength(normalizeLongifySeed(outputText));
  const hasAnySeedText = !outputIsEmpty && seedCharCount > 0;
  const hasSeed = !outputIsEmpty && seedCharCount >= MIN_SEED_CHARS;
  const brushupMode = hasSeed && isLongifiedOutputText(outputText);
  const canRun = canLongifyOutput({ text: outputText, outputIsEmpty, apiKey });
  setLongifyPanelState({
    unavailable: !hasSeed,
    busy: running || generationActive,
    ready: canRun && !running && !generationActive,
  });
  if (running) {
    setLongifyButtonDisabled(button, true);
    const runningAction = button.dataset.longifyRunningAction || button.dataset.longifyAction || 'longify';
    button.dataset.longifyAction = runningAction;
    button.textContent = runningAction === 'brushup'
      ? 'ブラッシュアップ中...'
      : '長編化中...';
    setControlsDisabled(true, { brushupMode: runningAction === 'brushup' });
    return;
  }
  if (generationActive) {
    setLongifyButtonDisabled(button, true);
    setControlsDisabled(true);
    button.dataset.longifyAction = 'longify';
    button.textContent = 'この小説を長編化';
    statusEl.textContent = hasSeed
      ? '生成完了後に最新Outputで使用できます'
      : 'Output生成・貼り付け・TXTインポート後に使用できます';
    return;
  }
  button.dataset.longifyAction = brushupMode ? 'brushup' : 'longify';
  button.textContent = brushupMode
    ? 'この長編小説をブラッシュアップする'
    : 'この小説を長編化';
  setControlsDisabled(!canRun, { brushupMode });
  setLongifyButtonDisabled(button, !canRun);
  if (!hasSeed) {
    statusEl.textContent = hasAnySeedText
      ? `長編化には本文が短すぎます（最低${MIN_SEED_CHARS.toLocaleString()}字以上）`
      : 'Output生成・貼り付け・TXTインポート後に使用できます';
  } else if (!hasKey) {
    statusEl.textContent = 'APIキー保存後に使用できます';
  } else if (brushupMode) {
    statusEl.textContent = 'AI講評を反映して長編小説をブラッシュアップできます';
  } else {
    statusEl.textContent = '設定を選んで長編化できます';
  }
}

function buildReviewDisplayFromResult({ result, mode, targetChars = 0, chapterCount = 0 } = {}) {
  if (result?.reviewSource === 'ai') {
    return buildAiLongifyReview({
      text: result.text,
      mode,
      reviewText: result.aiReviewText,
      targetChars,
      chapterCount,
    });
  }
  if (result?.reviewSource === 'failed') {
    return buildFailedLongifyReview({
      text: result.text,
      mode,
      reviewText: result.aiReviewText,
      targetChars,
      chapterCount,
    });
  }
  return buildLongifyReview({
    text: result?.text || '',
    mode,
    targetChars,
    chapterCount,
    critiqueText: result?.aiReviewText || '',
  });
}

function reviewKindLabel(source) {
  if (source === 'failed') return 'AI講評';
  return source === 'ai' ? 'AI講評' : '予備採点';
}

function formatReviewScoreForStatus(review) {
  if (review?.source === 'failed') return '取得失敗（未採点）';
  if (!review || review.score === null || review.score === undefined) return '未採点';
  return `${review.score}点（${review.passLabel || aiReviewPassLabel(review.score)}）`;
}

export function installLongifyBeta() {
  const outputEl = document.getElementById('output');
  const button = document.getElementById('btn-longify-beta');
  const stopButton = document.getElementById('btn-longify-stop');
  const autoBrushupCheckbox = document.getElementById('longify-auto-brushup-until-pass');
  const statusEl = document.getElementById('longify-beta-status');
  const charCounter = document.getElementById('char-counter');
  const tagRow = document.getElementById('tag-row');
  if (!outputEl || !button || !statusEl) return;
  document.getElementById('btn-generate')?.addEventListener('click', () => {
    if (outputEl.dataset) delete outputEl.dataset.longifyOutput;
  }, true);

  let running = false;
  let abortController = null;
  let autoBrushupChainActive = false;
  let autoBrushupAttempts = 0;
  const refresh = () => {
    refreshLongifyProviderWarning();
    setStatusForReadiness({ button, statusEl, outputEl, running });
    if (!running) refreshVisibleLongifyReviewFromOutput(outputEl);
  };

  const isAutoBrushupChecked = () => Boolean(autoBrushupCheckbox?.checked);
  const createBrushupProgressOptions = (baseOptions = {}, attempt = autoBrushupAttempts || 1) => ({
    ...(baseOptions || {}),
    progressMode: 'brushup',
    brushupAttempt: attempt || 1,
    maxBrushupAttempts: AUTO_BRUSHUP_MAX_ATTEMPTS,
  });
  const createLongifyProgressOptions = (baseOptions = {}) => ({
    ...(baseOptions || {}),
    progressMode: 'longify',
  });
  const finishAutoBrushupChain = ({ clearCheckbox = false } = {}) => {
    autoBrushupChainActive = false;
    autoBrushupAttempts = 0;
    if (clearCheckbox && autoBrushupCheckbox) autoBrushupCheckbox.checked = false;
  };
  const beginLongifyAutoBrushupChain = () => {
    autoBrushupChainActive = isAutoBrushupChecked();
    autoBrushupAttempts = 0;
  };
  const beginBrushupAutoAttempt = () => {
    if (!autoBrushupChainActive) {
      autoBrushupChainActive = isAutoBrushupChecked();
      autoBrushupAttempts = autoBrushupChainActive ? 1 : 0;
      return;
    }
    autoBrushupAttempts += 1;
  };
  const shouldQueueAutoBrushup = review => shouldAutoBrushupContinue({
    score: review?.score,
    autoEnabled: autoBrushupChainActive && isAutoBrushupChecked(),
    attempts: autoBrushupAttempts,
    targetMet: review?.targetMet,
  });
  const finishAutoBrushupChainAfterReview = review => finishAutoBrushupChain({
    clearCheckbox: shouldAutoBrushupClearCheckbox({
      ...review,
      attempts: autoBrushupAttempts,
    }),
  });
  const queueAutoBrushup = review => {
    const nextAttempt = autoBrushupAttempts + 1;
    setTextContent(
      statusEl,
      `AI講評 ${review.score}点（${review.passLabel}）。合格点まで自動ブラッシュアップを続行します（${nextAttempt}/${AUTO_BRUSHUP_MAX_ATTEMPTS}）...`,
    );
    setAiProgressLongifyActive({
      message: '合格点未満のため自動ブラッシュアップを予約しました。',
      detail: `次のブラッシュアップ: ${nextAttempt}/${AUTO_BRUSHUP_MAX_ATTEMPTS} / AI総合点: ${review.score}点（${review.passLabel}）`,
      chapterNumber: 0,
      chapterCount: countLongifyChapterHeadings(outputEl.innerText || outputEl.textContent || ''),
      completedChars: submissionCharLength(outputEl.innerText || outputEl.textContent || ''),
      options: createBrushupProgressOptions({}, nextAttempt),
      modeLabel: 'ブラッシュアップβ',
    });
    let remainingStartRetries = AUTO_BRUSHUP_START_MAX_RETRIES;
    const stopQueuedBrushup = (message, detail) => {
      finishAutoBrushupChainAfterReview(review);
      setTextContent(statusEl, message);
      finishAiProgress({
        message,
        detail,
        chapterCount: countLongifyChapterHeadings(outputEl.innerText || outputEl.textContent || ''),
        completedChars: submissionCharLength(outputEl.innerText || outputEl.textContent || ''),
        modeLabel: 'ブラッシュアップβ',
        aborted: true,
      });
      refresh();
    };
    const retryQueuedBrushup = () => {
      if (remainingStartRetries <= 0) {
        stopQueuedBrushup(
          '自動ブラッシュアップ停止: 開始準備が完了しませんでした',
          '予約後もブラッシュアップボタンが実行可能にならなかったため、自動開始を停止しました。手動ボタンは利用できます。',
        );
        return;
      }
      remainingStartRetries -= 1;
      setTimeout(startQueuedBrushup, AUTO_BRUSHUP_START_RETRY_DELAY_MS);
    };
    const startQueuedBrushup = () => {
      if (!isAutoBrushupChecked()) {
        finishAutoBrushupChain();
        finishAiProgress({
          message: '自動ブラッシュアップを停止しました。',
          detail: '自動ブラッシュアップのチェックが外れたため、予約を解除しました。',
          chapterCount: countLongifyChapterHeadings(outputEl.innerText || outputEl.textContent || ''),
          completedChars: submissionCharLength(outputEl.innerText || outputEl.textContent || ''),
          modeLabel: 'ブラッシュアップβ',
          aborted: true,
        });
        refresh();
        return;
      }
      const latestText = outputEl.innerText || outputEl.textContent || '';
      if (!isLongifiedOutputText(latestText)) {
        stopQueuedBrushup(
          '自動ブラッシュアップ停止: 長編化本文を確認できません',
          'Outputがブラッシュアップ可能な長編本文として判定できなかったため、自動開始を停止しました。',
        );
        return;
      }
      if (running || button.disabled || button.getAttribute('aria-disabled') === 'true') {
        retryQueuedBrushup();
        return;
      }
      const expectedChapters = Number(review?.chapters || review?.chapterCount || 0) || 0;
      const latestChapters = countLongifyChapterHeadings(latestText);
      if (expectedChapters > 0 && latestChapters > 0 && latestChapters < expectedChapters) {
        setTextContent(statusEl, `自動ブラッシュアップ停止: 章見出しが ${latestChapters}/${expectedChapters} 章に減っています`);
        finishAutoBrushupChainAfterReview(review);
        refresh();
        return;
      }
      if (expectedChapters > 0) {
        button.dataset.expectedBrushupChapterCount = String(expectedChapters);
      }
      button.click();
    };
    setTimeout(startQueuedBrushup, AUTO_BRUSHUP_START_RETRY_DELAY_MS);
  };

  stopButton?.addEventListener('click', () => {
    if (!running || !abortController) return;
    abortController.abort();
    setTextContent(statusEl, '中断しています...');
    setAiProgressLongifyActive({
      message: '中断指示を受け取りました。',
      detail: 'APIまたはOutput表示処理を停止し、Outputは表示済みの内容を保持します。',
      aborted: true,
    });
  });

  button.addEventListener('click', async () => {
    if (running || button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    const storyText = outputEl.innerText || outputEl.textContent || '';
    const apiKey = readRuntimeApiKey();
    if (isOutputEmptyForLongify(outputEl) || !hasLongifySeed(storyText)) {
      setTextContent(statusEl, '先に本文をOutputへ生成・貼り付け・TXTインポートしてください');
      refresh();
      return;
    }
    if (!isRealApiKey(apiKey)) {
      setTextContent(statusEl, 'APIキー保存後に使用できます');
      return;
    }
    const brushupMode = isLongifiedOutputText(storyText);
    const priorReviewText = getLongifyReviewPlainText();
    let brushupOptions = brushupMode ? readLongifyRunOptionsFromUi() : null;
    if (brushupMode) {
      const reviewEl = document.getElementById('longify-beta-review');
      const reviewChapterCount = Number(reviewEl?.dataset?.chapterCount || 0) || 0;
      const expectedChapterCount = Number(button.dataset.expectedBrushupChapterCount || 0)
        || reviewChapterCount
        || countLongifyChapterHeadings(storyText);
      const detectedChapterCount = countLongifyChapterHeadings(storyText);
      if (reviewChapterCount > 0 && detectedChapterCount > 0 && detectedChapterCount < reviewChapterCount) {
        setTextContent(statusEl, `ブラッシュアップ停止: 章見出しが ${detectedChapterCount}/${reviewChapterCount} 章に減っています`);
        delete button.dataset.expectedBrushupChapterCount;
        refresh();
        return;
      }
      brushupOptions = {
        ...brushupOptions,
        expectedChapterCount,
      };
    }
    if (!brushupMode) clearLongifyReview();
    if (brushupMode) {
      beginBrushupAutoAttempt();
      const brushupProgressOptions = createBrushupProgressOptions(brushupOptions);
      let pendingAutoBrushupReview = null;
      running = true;
      abortController = new AbortController();
      button.dataset.longifyRunningAction = 'brushup';
      setSettingsPanelBusy(true, 'ブラッシュアップβ処理中');
      setKakuyomuAssistBusy(true);
      setLongifyButtonDisabled(button, true);
      setStopButtonState(stopButton, true);
      setControlsDisabled(true, { brushupMode: true });
      button.textContent = 'ブラッシュアップ中...';
      setTextContent(statusEl, `ブラッシュアップ ${brushupProgressOptions.brushupAttempt}周目/${AUTO_BRUSHUP_MAX_ATTEMPTS} を開始しています`);
      const progressLog = document.getElementById('progress-log');
      if (progressLog) progressLog.textContent = '';
      startAiProgressHeartbeat({
        statusEl,
        modeLabel: resolveLongifyProgressDisplay(brushupProgressOptions).modeLabel,
        initialPhase: 'AI講評を開始中',
      });
      setAiProgressLongifyActive({
        message: '長編ブラッシュアップを開始しました。',
        detail: 'AI講評で弱点を洗い出し、章ごとに改稿してからOutputへ反映します。',
        chapterNumber: 0,
        chapterCount: countLongifyChapterHeadings(storyText),
        completedChars: submissionCharLength(storyText),
        options: brushupProgressOptions,
        modeLabel: 'ブラッシュアップβ',
      });

      try {
        const model = readSelectedModel(apiKey);
        const result = await runLongifyBrushupBeta({
          storyText,
          apiKey,
          model,
          signal: abortController.signal,
          priorReviewText,
          targetTotalChars: brushupOptions?.targetTotalNumber || 0,
          expectedChapterCount: brushupOptions?.expectedChapterCount || 0,
          onProgress(message) {
            setTextContent(statusEl, message);
          },
          onStage(stage) {
            setAiProgressLongifyActive({
              ...stage,
              options: brushupProgressOptions,
              modeLabel: 'ブラッシュアップβ',
              completedChars: stage.completedChars || 0,
            });
          },
        });
        if (result.scoreRegressionBlocked) {
          setTextContent(statusEl, 'ブラッシュアップ後の点数が下がったため、前回の最高点原稿を保持しています...');
          setAiProgressLongifyActive({
            message: 'ブラッシュアップ後の点数が下がったため、前回の最高点原稿を保持しています...',
            detail: `保持 ${result.retainedScore}点 / 破棄 ${result.rejectedScore}点。Outputは開始前の原稿から上書きしません。`,
            phase: 'rollback',
            chapterNumber: result.chapterCount,
            chapterCount: result.chapterCount,
            completedChars: result.finalChars,
            options: brushupProgressOptions,
            modeLabel: 'ブラッシュアップβ',
          });
        } else {
          setTextContent(statusEl, 'ブラッシュアップ本文をOutputへ表示中...');
          setAiProgressLongifyActive({
            message: 'ブラッシュアップ本文をOutputへ表示中...',
            detail: `講評要点: ${previewText(result.critiqueText, 260)}`,
            phase: 'render',
            chapterNumber: result.chapterCount,
            chapterCount: result.chapterCount,
            completedChars: result.finalChars,
            options: brushupProgressOptions,
            modeLabel: 'ブラッシュアップβ',
          });
          await setOutputTextTypewriter(outputEl, charCounter, result.text, {
            signal: abortController.signal,
            onRenderProgress(progress) {
              updateOutputRenderProgress(statusEl, progress, 'ブラッシュアップ本文ライブ表示中');
            },
          });
        }
        setLongifyTags(tagRow, result);
        revealOutputActions();
        const review = buildReviewDisplayFromResult({
          result,
          mode: 'brushup',
          targetChars: brushupOptions?.targetTotalNumber || result.targetTotalNumber || 0,
          chapterCount: result.chapterCount,
        });
        const reviewLabel = reviewKindLabel(result.reviewSource);
        renderLongifyReview(review);
        if (result.scoreRegressionBlocked) {
          if (autoBrushupChainActive) finishAutoBrushupChainAfterReview(review);
        } else if (shouldQueueAutoBrushup(review)) {
          pendingAutoBrushupReview = review;
        } else if (autoBrushupChainActive) {
          finishAutoBrushupChainAfterReview(review);
        }
        const rollbackScoreText = result.scoreRegressionBlocked
          ? `保持 ${result.retainedScore}点 / 破棄 ${result.rejectedScore}点`
          : formatReviewScoreForStatus(review);
        setTextContent(statusEl, result.scoreRegressionBlocked
          ? `ブラッシュアップ停止: 点数が下がったため最高点原稿へロールバック / ${rollbackScoreText}`
          : `ブラッシュアップ完了: ${result.chapterCount}章 / ${formatNumber(result.finalChars)}字 / ${reviewLabel} ${formatReviewScoreForStatus(review)}`);
        finishAiProgress({
          message: result.scoreRegressionBlocked
            ? 'ブラッシュアップ結果を採用せず元原稿を保持しました。'
            : 'ブラッシュアップが完了しました。',
          detail: result.scoreRegressionBlocked
            ? `AI採点が前回より下がったため、品質悪化版をOutputへ固定しませんでした。${rollbackScoreText}`
            : `${reviewLabel}を反映した改稿本文をOutputへ反映しました。${reviewLabel}: ${formatReviewScoreForStatus(review)} / 次回方針: ${previewText(result.aiReviewText, 260)}`,
          completedChars: result.finalChars,
          chapterCount: result.chapterCount,
          options: brushupProgressOptions,
          modeLabel: 'ブラッシュアップβ',
        });
      } catch (error) {
        const aborted = error?.name === 'AbortError' || abortController.signal.aborted;
        const message = aborted ? 'ブラッシュアップを中断しました。Outputは表示済みの内容を保持しています。' : (error?.message || String(error));
        setTextContent(statusEl, aborted ? 'ブラッシュアップを中断しました' : `ブラッシュアップエラー: ${message}`);
        finishAiProgress({
          message: aborted ? 'ブラッシュアップを中断しました。' : 'ブラッシュアップでエラーが発生しました。',
          detail: aborted ? 'Outputは表示済みの内容を保持しました。' : message,
          chapterCount: countLongifyChapterHeadings(storyText),
          options: brushupProgressOptions,
          modeLabel: 'ブラッシュアップβ',
          aborted,
        });
        if (autoBrushupChainActive) finishAutoBrushupChain();
      } finally {
        stopAiProgressHeartbeat();
        running = false;
        abortController = null;
        delete button.dataset.longifyRunningAction;
        delete button.dataset.expectedBrushupChapterCount;
        setSettingsPanelBusy(false);
        setKakuyomuAssistBusy(false);
        setStopButtonState(stopButton, false);
        setControlsDisabled(false, { brushupMode: true });
        notifyOutputDependentPanels('brushup-finished');
        refresh();
        if (pendingAutoBrushupReview) queueAutoBrushup(pendingAutoBrushupReview);
      }
      return;
    }
    const options = readLongifyRunOptionsFromUi();
    const longifyProgressOptions = createLongifyProgressOptions(options);
    beginLongifyAutoBrushupChain();
    let pendingAutoBrushupReview = null;

    running = true;
    abortController = new AbortController();
    button.dataset.longifyRunningAction = 'longify';
    setSettingsPanelBusy(true, '長編化β処理中');
    setKakuyomuAssistBusy(true);
    setLongifyButtonDisabled(button, true);
    setStopButtonState(stopButton, true);
    setControlsDisabled(true);
    button.textContent = '長編化中...';
    setTextContent(statusEl, `${options.targetTotalChars}で長編化中`);
    const progressLog = document.getElementById('progress-log');
    if (progressLog) progressLog.textContent = '';
    startAiProgressHeartbeat({
      statusEl,
      modeLabel: resolveLongifyProgressDisplay(longifyProgressOptions).modeLabel,
      initialPhase: '芯固定台帳を作成中',
    });
    setAiProgressLongifyActive({
      message: '長編化βを開始しました。',
      detail: 'Output本文はスクロール暴走を避けるため、完了時に一括反映します。',
      chapterNumber: 0,
      chapterCount: options.chapterCount,
      options: longifyProgressOptions,
    });

    try {
      const model = readSelectedModel(apiKey);
      const result = await runLongifyBeta({
        storyText,
        apiKey,
        model,
        chapterCount: options.chapterCount,
        targetTotalChars: options.targetTotalNumber,
        styleMode: options.styleMode,
        endingMode: options.endingMode,
        signal: abortController.signal,
        onProgress(message) {
          setTextContent(statusEl, message);
        },
        onStage(stage) {
          setAiProgressLongifyActive({
            ...stage,
            options: longifyProgressOptions,
            completedChars: stage.completedChars || 0,
          });
        },
      });
      const finalChars = submissionCharLength(stripStoryMakerFooter(result.text));
      setTextContent(statusEl, 'Outputへタイプライター表示中...');
      setAiProgressLongifyActive({
        message: 'Outputへタイプライター表示中...',
        detail: '整形済みの長編本文を末尾へスクロール追従しながら表示しています。',
        phase: 'render',
        chapterNumber: result.chapters.length,
        chapterCount: result.chapters.length,
        completedChars: finalChars,
        options: longifyProgressOptions,
      });
      await setOutputTextTypewriter(outputEl, charCounter, result.text, {
        signal: abortController.signal,
        onRenderProgress(progress) {
          updateOutputRenderProgress(statusEl, progress, '長編本文ライブ表示中');
        },
      });
      setLongifyTags(tagRow, result);
      revealOutputActions();
      const metMinimum = finalChars >= options.targetTotalNumber;
      const review = buildReviewDisplayFromResult({
        result,
        mode: 'longify',
        targetChars: options.targetTotalNumber,
        chapterCount: result.chapters.length,
      });
      const reviewLabel = reviewKindLabel(result.reviewSource);
      renderLongifyReview(review);
      if (shouldQueueAutoBrushup(review)) {
        pendingAutoBrushupReview = review;
      } else if (autoBrushupChainActive) {
        finishAutoBrushupChainAfterReview(review);
      }
      setTextContent(
        statusEl,
        metMinimum
          ? `長編化完了: ${result.chapters.length}章 / ${formatNumber(finalChars)}字 / ${reviewLabel} ${formatReviewScoreForStatus(review)}`
          : `長編化完了（最低文字数未達）: ${formatNumber(finalChars)} / ${formatNumber(options.targetTotalNumber)}字 / ${reviewLabel} ${formatReviewScoreForStatus(review)}`
      );
      finishAiProgress({
        message: metMinimum ? '長編化βが完了しました。' : '長編化βが完了しましたが、最低文字数に届きませんでした。',
        detail: metMinimum
          ? `Outputへ完成稿を一括反映しました。${reviewLabel}: ${formatReviewScoreForStatus(review)} / ${reviewLabel}: ${previewText(result.aiReviewText, 260)}`
          : `追加生成を試みましたが、AI応答が短く止まりました。${reviewLabel}: ${formatReviewScoreForStatus(review)} / ${reviewLabel}: ${previewText(result.aiReviewText, 260)}`,
        options: longifyProgressOptions,
        completedChars: finalChars,
        chapterCount: result.chapters.length,
      });
    } catch (error) {
      const aborted = error?.name === 'AbortError' || abortController.signal.aborted;
      const message = aborted ? '長編化を中断しました。Outputは表示済みの内容を保持しています。' : (error?.message || String(error));
      setTextContent(statusEl, aborted ? '長編化を中断しました' : `長編化エラー: ${message}`);
      finishAiProgress({
        message: aborted ? '長編化βを中断しました。' : '長編化βでエラーが発生しました。',
        detail: aborted ? 'Outputは表示済みの内容を保持しました。' : message,
        options: longifyProgressOptions,
        chapterCount: options.chapterCount,
        aborted,
      });
      if (autoBrushupChainActive) finishAutoBrushupChain();
    } finally {
      stopAiProgressHeartbeat();
      running = false;
      abortController = null;
      delete button.dataset.longifyRunningAction;
      setSettingsPanelBusy(false);
      setKakuyomuAssistBusy(false);
      button.textContent = 'この小説を長編化';
      setStopButtonState(stopButton, false);
      setControlsDisabled(false);
      notifyOutputDependentPanels('longify-finished');
      refresh();
      if (pendingAutoBrushupReview) queueAutoBrushup(pendingAutoBrushupReview);
    }
  });

  const observer = new MutationObserver(refresh);
  observer.observe(outputEl, {
    characterData: true,
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
  const settingsEl = document.getElementById('settings');
  const generateButton = document.getElementById('btn-generate');
  if (settingsEl) {
    observer.observe(settingsEl, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
  if (generateButton) {
    observer.observe(generateButton, {
      attributes: true,
      attributeFilter: ['disabled', 'class'],
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
  document.getElementById('apikey')?.addEventListener('input', refresh);
  document.getElementById('apikey')?.addEventListener('change', refresh);
  document.getElementById('key-save')?.addEventListener('click', () => setTimeout(refresh, 300), true);
  document.getElementById('key-edit')?.addEventListener('click', () => setTimeout(refresh, 50), true);
  document.getElementById('btn-switch-api')?.addEventListener('click', () => setTimeout(refresh, 300), true);
  window.addEventListener('story-maker:output-updated', refresh);
  window.addEventListener('story-maker:output-manual-change', refresh);
  refresh();
}
