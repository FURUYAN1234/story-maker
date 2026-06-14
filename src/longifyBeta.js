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
const BRUSHUP_CHAPTER_REWRITE_MAX_ATTEMPTS = 2;
const BRUSHUP_CHAPTER_MIN_RATIO = 0.68;
const PUBLIC_API_SESSION_KEY = 'story-maker.api.session.v500';
const LEGACY_API_SESSION_KEY = 'smk_api_tab_v497';
const API_WINDOW_NAME_PREFIX = 'story-maker.api.tab-session.v500:';
const UNTITLED_STORY_TITLE = '名称未設定の小説';

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
  const minPerChapter = Math.max(1800, Math.ceil(total / chapters));
  const recommendedPerChapter = Math.max(minPerChapter + 500, Math.ceil(minPerChapter * 1.1));
  return {
    chapterCount: chapters,
    targetTotalChars: `最低${formatNumber(total)}字（空白・改行除外）`,
    targetTotalNumber: total,
    targetChars: `最低${formatNumber(minPerChapter)}字（空白・改行除外 / 推奨${formatNumber(recommendedPerChapter)}字以上）`,
    minChapterChars: minPerChapter,
    recommendedChapterChars: recommendedPerChapter,
    styleMode: STYLE_MODE_LABELS[styleMode] ? styleMode : 'preserve',
    styleInstruction: STYLE_MODE_LABELS[styleMode] || STYLE_MODE_LABELS.preserve,
    endingMode: ENDING_MODE_LABELS[endingMode] ? endingMode : 'keep',
    endingInstruction: ENDING_MODE_LABELS[endingMode] || ENDING_MODE_LABELS.keep,
  };
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
7. 全${runOptions.chapterCount}章の章台帳: 各章に「欲求 / 誤解 / 発見 / 代償 / 関係変化 / 具体物 / 次章への引き」を必ず入れる。
8. 最低総量: 投稿サイト準拠文字数で${runOptions.targetTotalChars}。各章は最低${formatNumber(runOptions.minChapterChars)}字以上を前提に、読み物として成立する密度を持つ。

短編原稿:
${seedText}`;
}

export function buildLongifyChapterPrompt({
  seedText,
  ledgerText,
  chapterNumber,
  chapterCount = DEFAULT_CHAPTER_COUNT,
  previousBridge = '',
  targetChars,
  targetTotalChars,
  styleMode = 'preserve',
  endingMode = 'keep',
} = {}) {
  const runOptions = createLongifyRunOptions({
    targetTotalChars,
    chapterCount,
    styleMode,
    endingMode,
  });
  return `あなたは人間の小説家として、短編を長編化しています。
下の「短編原稿」と「固定台帳」を絶対に守り、第${chapterNumber}章だけを本文として執筆してください。

品質条件:
- 出力は小説本文のみ。解説、メモ、箇条書き、チェック結果、作業宣言は禁止。
- 章題は「第${chapterNumber}章　（章題）」の形式で始める。
- 最低量は投稿サイト準拠文字数で${targetChars || runOptions.targetChars}。この字数を下回る章は不合格。短すぎる要約にしない。
- その章の出来事を圧縮せず、会話、行動、沈黙、場所の変化、感覚描写で厚みを出す。
- 文体方針: ${runOptions.styleInstruction}。
- 結末方針: ${runOptions.endingInstruction}。
- 短編の芯を保持する。本筋、主人公の欲求、結末の意味、語り口を変えない。
- 盛る場合も、短編に最初から含まれていた違和感や伏線から自然に派生させる。
- その章の「欲求 / 誤解 / 発見 / 代償 / 関係変化 / 具体物 / 次章への引き」を場面で見せる。
- 台詞、身体感覚、場所の具体、沈黙、言い淀みを入れて、人間が書いたような起伏を作る。
- 便利すぎる偶然、説明過多、AIらしい総括、テンプレの熱血説教は禁止。
- 最終章以外では完全解決しない。最終章では短編の結末の意味へ戻して着地する。
- 各章末に「（つづく）」「次回へ続く」などの連載メタ表示を入れない。
- 文末に「タイトル:」「Output」「投稿文」「候補」などの管理語を残さない。
- 段落の間に単独の「*」「＊」「※」「***」などの区切り記号を入れない。場面転換は文章で処理する。

現在の章: ${chapterNumber} / ${runOptions.chapterCount}

前章までの接続メモ:
${previousBridge || 'まだ前章はありません。'}

固定台帳:
${ledgerText}

短編原稿:
${seedText}`;
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

export function cleanLongifyDraft(text) {
  return stripStoryMakerFooter(text)
    .replace(/^\s*(?:以下(?:に|、)|では、).{0,40}\n+/u, '')
    .replace(/\n?\s*(?:Created By AI Story Maker V[\d.]+|Generated By AI Story Maker V[\d.]+)\s*$/iu, '')
    .replace(/\n?\s*[（(]\s*つづく\s*[）)]\s*$/u, '')
    .replace(/\n?\s*次回へ続く\s*$/u, '')
    .split('\n')
    .filter(line => !/^[\t \u3000]*[*＊※]{1,5}[\t \u3000]*$/u.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
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
  return Array.from(String(text || '').replace(/\s+/g, ' ').trim()).slice(0, maxChars).join('');
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

export function buildLongifyBrushupCritiquePrompt(manuscript, priorReviewText = '') {
  const reviewBlock = String(priorReviewText || '').trim()
    ? `\n前回までのAI講評・ブラッシュアップ方針:\n${String(priorReviewText).trim().slice(0, 3000)}\n`
    : '';
  return `あなたは商業小説の編集者です。次の長編小説を、投稿前の改稿対象として講評してください。

目的:
- 物語の芯、主人公の欲求、結末の意味、章構成は壊さない。
- 弱い場面、説明過多、感情変化の不足、伏線回収の弱さ、章ごとの重複、終盤の急ぎ足を見つける。
- 次の改稿で何を足し、何を削り、どの章をどう強めるかを具体的に示す。
- 前回までのAI講評がある場合は、それを踏まえて同じ弱点を再点検し、改善が足りない部分を優先する。

出力:
- 講評メモのみ。
- 章ごとの改善指示を含める。
- 本文の書き直しはまだ行わない。

長編小説:
${reviewBlock}
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
- 本文の書き直しはしない。講評メモのみを返す。

出力形式:
AI総合点: 0〜100点の整数
AI講評:
良い点:
問題点:
章別の改稿指示:
次回ブラッシュアップ方針:

補助情報:
${targetLine}
${chapterLine}
${priorBlock}
評価対象本文:
${buildBrushupReviewSource(manuscript)}`;
}

function cleanLongifyAiReviewText(value) {
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
  const source = String(reviewText || '');
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

function aiReviewPassLabel(score) {
  if (score === null || score === undefined) return '未採点';
  return Number(score) >= AI_REVIEW_PASS_SCORE ? '合格点' : '要ブラッシュアップ';
}

export function shouldAutoBrushupContinue({
  score,
  autoEnabled = false,
  attempts = 0,
  maxAttempts = AUTO_BRUSHUP_MAX_ATTEMPTS,
} = {}) {
  if (score === null || score === undefined || score === '') return false;
  const numericScore = Number(score);
  return Boolean(autoEnabled)
    && Number.isFinite(numericScore)
    && numericScore < AI_REVIEW_PASS_SCORE
    && Number(attempts) < Number(maxAttempts);
}

function reviewTextSignature(text) {
  const normalized = normalizeLongifyPublicText(stripStoryMakerFooter(text));
  const chars = Array.from(normalized);
  return `${submissionCharLength(normalized)}:${chars.slice(0, 48).join('')}:${chars.slice(-48).join('')}`;
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
  const score = extractAiReviewScore(normalizedReview);
  const passLabel = aiReviewPassLabel(score);
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
    targetChars,
    signature: reviewTextSignature(text),
  };
}

export function buildLongifyBrushupChapterPrompt({
  title = '',
  critiqueText = '',
  chapterText = '',
  chapterNumber = 1,
  chapterCount = 1,
} = {}) {
  const currentChars = submissionCharLength(chapterText);
  const minimumChars = Math.max(1200, Math.floor(currentChars * 0.9));
  return `あなたは人間の小説家です。AI編集者の講評を反映して、長編小説の第${chapterNumber}章だけをブラッシュアップしてください。

厳守:
- 出力は改稿後の第${chapterNumber}章本文のみ。
- 章題は元の章題を残す。章番号を変えない。
- 物語の芯、因果、登場人物の目的、結末へ向かう意味を変えない。
- 新しい大事件や別ジャンル化で盛らない。既存場面の密度、感情、伏線、具体物、会話の自然さを強める。
- 説明だけで済ませず、場面・行動・沈黙・身体感覚・場所の変化で補強する。
- 投稿サイト準拠文字数で最低${formatNumber(minimumChars)}字以上。短く要約しない。
- 段落の間に単独の「*」「＊」「※」「***」などの区切り記号を入れない。
- 「講評」「改善点」「Output」「投稿文」「候補」などの管理語を残さない。

作品タイトル:
${title || '無題'}

全体講評:
${critiqueText}

現在の章: ${chapterNumber} / ${chapterCount}

改稿対象の章:
${chapterText}`;
}

function formatBrushupOutput({ title = '', chapters = [], fallbackText = '' } = {}) {
  const body = normalizeLongifyPublicText(chapters.length
    ? [title, ...chapters.map(cleanLongifyDraft)].filter(Boolean).join('\n\n')
    : fallbackText);
  return `${body}\n\n${STORY_MAKER_FOOTER}`.trim();
}

export function ensureChapterHeading(text, chapterNumber) {
  const draft = cleanLongifyDraft(text);
  if (new RegExp(`^\\s*第\\s*${chapterNumber}\\s*章`, 'u').test(draft)) return draft;
  return `第${chapterNumber}章\n\n${draft}`.trim();
}

export function summarizeForContinuity(chapterText, chapterNumber) {
  const normalized = cleanLongifyDraft(chapterText).replace(/\s+/g, ' ');
  const chars = Array.from(normalized);
  const head = chars.slice(0, 420).join('');
  const tail = chars.slice(Math.max(0, chars.length - 520)).join('');
  return `第${chapterNumber}章までの接続: 冒頭の流れ「${head}」 / 終盤の状態「${tail}」`;
}

export function formatLongifyProgressOutput({ title = '', chapters = [], activeMessage = '' } = {}) {
  const heading = title ? `【${title}】` : '【長編化β】';
  const body = normalizeLongifyPublicText(chapters.map(cleanLongifyDraft).filter(Boolean).join('\n\n'));
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

  const callModel = callText || ((prompt, context = {}) => {
    return streamTextCall(apiKey, model, prompt, context);
  });
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
    const chapterPrompt = buildLongifyChapterPrompt({
      seedText,
      ledgerText,
      chapterNumber: index,
      chapterCount: runOptions.chapterCount,
      previousBridge,
      targetChars: targetChars || runOptions.targetChars,
      targetTotalChars: runOptions.targetTotalNumber,
      styleMode: runOptions.styleMode,
      endingMode: runOptions.endingMode,
    });
    let lastChapterProgress = 0;
    const chapterResponse = await callModel(chapterPrompt, {
      stage: 'chapter',
      chapterNumber: index,
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
        maxTokens: 12000,
        maxOutputTokens: 12000,
        timeoutMs: 240000,
        signal,
      },
    });
    throwIfAborted(signal);
    const chapterText = ensureChapterHeading(chapterResponse?.text || chapterResponse || '', index);
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
  while (submissionCharLength(chapters.join('\n\n')) < runOptions.targetTotalNumber && topupAttempts < 3) {
    throwIfAborted(signal);
    topupAttempts += 1;
    const currentText = chapters.join('\n\n');
    const currentChars = submissionCharLength(currentText);
    const deficit = Math.max(0, runOptions.targetTotalNumber - currentChars);
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
        maxTokens: 12000,
        maxOutputTokens: 12000,
        timeoutMs: 240000,
        signal,
      },
    });
    throwIfAborted(signal);
    const topupText = cleanLongifyDraft(topupResponse?.text || topupResponse || '');
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

  report('長編化βの整形中...', {
    phase: 'finalize',
    detail: '章を結合し、フッターを一度だけ付与しています。',
    chapterNumber: runOptions.chapterCount,
    chapterCount: runOptions.chapterCount,
  });
  const text = formatLongifyOutput({ title, chapters });
  report('完成稿をAI講評で評価中...', {
    phase: 'aiReview',
    detail: '次回ブラッシュアップでそのまま使える章別の改稿指示をAIに作成させています。',
    chapterNumber: runOptions.chapterCount,
    chapterCount: runOptions.chapterCount,
    completedChars: submissionCharLength(stripStoryMakerFooter(text)),
  });
  const reviewResponse = await callModel(buildLongifyAiReviewPrompt(text, {
    mode: 'longify',
    targetChars: runOptions.targetTotalNumber,
    chapterCount: chapters.length,
  }), {
    stage: 'longifyReview',
    onFallback: fallbackModel => report(`講評モデルを切り替えて続行中: ${fallbackModel}`, {
      phase: 'fallback',
      detail: `完成稿AI講評を ${fallbackModel} で続行します。`,
      chapterNumber: runOptions.chapterCount,
      chapterCount: runOptions.chapterCount,
    }),
    options: {
      temperature: 0.28,
      disableGoogleSearch: true,
      maxTokens: 5000,
      maxOutputTokens: 5000,
      timeoutMs: 180000,
      signal,
    },
  });
  throwIfAborted(signal);
  const aiReviewText = cleanLongifyAiReviewText(reviewResponse?.text || reviewResponse || '');
  if (!aiReviewText) {
    throw new Error('完成稿AI講評の応答が空でした。');
  }
  if (reviewResponse?.usedModel) usedModels.push(reviewResponse.usedModel);
  return {
    title,
    seedText,
    ledgerText,
    chapters,
    usedModels: [...new Set(usedModels)],
    text,
    aiReviewText,
    reviewSource: 'ai',
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
  const sourceChapters = split.chapters.length ? split.chapters : [manuscript];
  const usedModels = [];
  const callModel = callText || ((prompt, context = {}) => {
    return streamTextCall(apiKey, model, prompt, context);
  });
  const report = (message, stage = {}) => {
    if (typeof onProgress === 'function') onProgress(message);
    if (typeof onStage === 'function') onStage({ message, ...stage });
  };

  report('長編の弱点をAI講評中...', {
    phase: 'brushupCritique',
    detail: '全体構成、章ごとの重複、感情変化、伏線回収、終盤の弱さを点検しています。',
    chapterNumber: 0,
    chapterCount: sourceChapters.length,
    completedChars: submissionCharLength(manuscript),
  });
  const critiqueResponse = await callModel(buildLongifyBrushupCritiquePrompt(manuscript, priorReviewText), {
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
  const critiqueText = cleanLongifyDraft(critiqueResponse?.text || critiqueResponse || '');
  if (critiqueResponse?.usedModel) usedModels.push(critiqueResponse.usedModel);

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
    const hardMinimumPolishedChars = Math.max(800, Math.floor(submissionCharLength(chapterText) * 0.55));
    const targetPolishedChars = Math.max(
      800,
      Math.ceil(MIN_BRUSHUP_LONG_CHARS / sourceChapters.length),
      Math.floor(submissionCharLength(chapterText) * BRUSHUP_CHAPTER_MIN_RATIO),
    );
    let polishedChapter = '';
    for (let attempt = 1; attempt <= BRUSHUP_CHAPTER_REWRITE_MAX_ATTEMPTS; attempt += 1) {
      const retryCritiqueText = attempt === 1
        ? critiqueText
        : `${critiqueText}\n\n【再改稿指示】前回の第${chapterNumber}章改稿は${formatNumber(submissionCharLength(polishedChapter))}字で短すぎます。最低${formatNumber(targetPolishedChars)}字以上に増補し、要約ではなく場面として書き直してください。`;
      lastRewriteProgress = 0;
      const rewriteResponse = await callModel(buildLongifyBrushupChapterPrompt({
        title,
        critiqueText: retryCritiqueText,
        chapterText,
        chapterNumber,
        chapterCount: sourceChapters.length,
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
          maxTokens: 12000,
          maxOutputTokens: 12000,
          timeoutMs: 240000,
          signal,
        },
      });
      throwIfAborted(signal);
      if (rewriteResponse?.usedModel) usedModels.push(rewriteResponse.usedModel);
      polishedChapter = cleanLongifyDraft(rewriteResponse?.text || rewriteResponse || '');
      if (submissionCharLength(polishedChapter) >= targetPolishedChars) break;
      if (attempt < BRUSHUP_CHAPTER_REWRITE_MAX_ATTEMPTS) {
        report(`第${chapterNumber}章の改稿が短いため再試行します...`, {
          phase: 'brushupChapterRetry',
          detail: `現在${formatNumber(submissionCharLength(polishedChapter))}字 / 目標${formatNumber(targetPolishedChars)}字。章を要約にせず、場面として増補します。`,
          chapterNumber,
          chapterCount: sourceChapters.length,
          completedChars: submissionCharLength(chapters.join('\n\n')),
        });
      }
    }
    if (submissionCharLength(polishedChapter) < hardMinimumPolishedChars) {
      throw new Error(`第${chapterNumber}章の改稿結果が短すぎます。`);
    }
    chapters.push(polishedChapter);
    report(`第${chapterNumber}章のブラッシュアップ完了`, {
      phase: 'brushupChapterDone',
      detail: '章の因果と語り口を保ったまま弱点を補強しました。',
      chapterNumber,
      chapterCount: sourceChapters.length,
      completedChars: submissionCharLength(chapters.join('\n\n')),
    });
  }

  let brushupTopupAttempts = 0;
  while (submissionCharLength(chapters.join('\n\n')) < MIN_BRUSHUP_LONG_CHARS && brushupTopupAttempts < 2) {
    throwIfAborted(signal);
    brushupTopupAttempts += 1;
    const currentText = chapters.join('\n\n');
    const currentChars = submissionCharLength(currentText);
    const deficit = Math.max(0, MIN_BRUSHUP_LONG_CHARS - currentChars);
    report(`ブラッシュアップ後の最低文字数を補強中... (${formatNumber(currentChars)} / ${formatNumber(MIN_BRUSHUP_LONG_CHARS)}字)`, {
      phase: 'brushupTopup',
      detail: `不足 ${formatNumber(deficit)}字。長編扱いを維持できるよう、最終章へ自然な場面を追加します。`,
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
      completedChars: currentChars,
    });
    let lastTopupProgress = 0;
    const topupResponse = await callModel(buildLongifyTopupPrompt({
      seedText: manuscript,
      ledgerText: critiqueText,
      currentText,
      deficitChars: deficit,
      targetTotalChars: MIN_BRUSHUP_LONG_CHARS,
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
        maxTokens: 12000,
        maxOutputTokens: 12000,
        timeoutMs: 240000,
        signal,
      },
    });
    throwIfAborted(signal);
    if (topupResponse?.usedModel) usedModels.push(topupResponse.usedModel);
    const topupText = cleanLongifyDraft(topupResponse?.text || topupResponse || '');
    if (submissionCharLength(topupText) < 200) break;
    chapters[chapters.length - 1] = `${chapters[chapters.length - 1]}\n\n${topupText}`.trim();
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
  const reviewResponse = await callModel(buildLongifyAiReviewPrompt(text, {
    mode: 'brushup',
    priorReviewText: critiqueText,
    chapterCount: chapters.length,
  }), {
    stage: 'brushupReview',
    onFallback: fallbackModel => report(`講評モデルを切り替えて続行中: ${fallbackModel}`, {
      phase: 'fallback',
      detail: `改稿後AI講評を ${fallbackModel} で続行します。`,
      chapterNumber: sourceChapters.length,
      chapterCount: sourceChapters.length,
    }),
    options: {
      temperature: 0.28,
      disableGoogleSearch: true,
      maxTokens: 5000,
      maxOutputTokens: 5000,
      timeoutMs: 180000,
      signal,
    },
  });
  throwIfAborted(signal);
  const aiReviewText = cleanLongifyAiReviewText(reviewResponse?.text || reviewResponse || '');
  if (!aiReviewText) {
    throw new Error('改稿後AI講評の応答が空でした。');
  }
  if (reviewResponse?.usedModel) usedModels.push(reviewResponse.usedModel);
  return {
    mode: 'brushup',
    title,
    critiqueText,
    chapters,
    chapterCount: chapters.length,
    usedModels: [...new Set(usedModels)],
    text,
    aiReviewText,
    reviewSource: 'ai',
    originalChars: submissionCharLength(manuscript),
    finalChars: submissionCharLength(stripStoryMakerFooter(text)),
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
  scoreLine.textContent = review.source === 'ai'
    ? `${review.modeLabel} AI講評${review.score === null ? '' : `: ${review.score}点（${review.passLabel || aiReviewPassLabel(review.score)}）`}`
    : `${review.modeLabel}のローカル確認: ${review.score}点`;

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
  if (review.source === 'ai') {
    const aiText = document.createElement('pre');
    aiText.className = 'longify-beta-review-ai-text';
    aiText.textContent = review.aiReviewText || '';
    reviewEl.append(aiText);
    return;
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
  if (!isLongifiedOutputText(outputText)) {
    clearLongifyReview();
    return;
  }
  if (reviewEl.dataset.reviewSource === 'ai' && reviewEl.dataset.textSignature === reviewTextSignature(outputText)) {
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
    if (!busy) {
      window.dispatchEvent(new CustomEvent('story-maker:kakuyomu-refresh', {
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
  const titlePrefix = done ? '完了' : aborted ? '中断' : 'API稼働中';
  if (progressTitle) {
    progressTitle.textContent = `AI進捗・思考ログ: ${modeLabel} ${titlePrefix}`;
  }
  if (globalAlert) {
    if (done || aborted) {
      globalAlert.style.display = 'none';
    } else {
      globalAlert.textContent = `${modeLabel} API稼働中: ${message || '処理中...'}`;
      globalAlert.style.display = 'flex';
    }
  }
  if (scoreBoard) {
    scoreBoard.innerHTML = '';
    scoreBoard.className = 'thought-score-board';
    scoreBoard.style.display = 'none';
  }
  if (progressLog && message) {
    const progress = chapterCount ? ` [${Math.max(0, chapterNumber)} / ${chapterCount}章]` : '';
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

export function installLongifyBeta() {
  const outputEl = document.getElementById('output');
  const button = document.getElementById('btn-longify-beta');
  const stopButton = document.getElementById('btn-longify-stop');
  const autoBrushupCheckbox = document.getElementById('longify-auto-brushup-until-pass');
  const statusEl = document.getElementById('longify-beta-status');
  const charCounter = document.getElementById('char-counter');
  const tagRow = document.getElementById('tag-row');
  if (!outputEl || !button || !statusEl) return;

  let running = false;
  let abortController = null;
  let autoBrushupChainActive = false;
  let autoBrushupAttempts = 0;
  const refresh = () => {
    setStatusForReadiness({ button, statusEl, outputEl, running });
    if (!running) refreshVisibleLongifyReviewFromOutput(outputEl);
  };

  const isAutoBrushupChecked = () => Boolean(autoBrushupCheckbox?.checked);
  const finishAutoBrushupChain = () => {
    autoBrushupChainActive = false;
    autoBrushupAttempts = 0;
    if (autoBrushupCheckbox) autoBrushupCheckbox.checked = false;
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
      modeLabel: 'ブラッシュアップβ',
    });
    setTimeout(() => {
      if (running) return;
      if (!isAutoBrushupChecked()) {
        finishAutoBrushupChain();
        return;
      }
      const latestText = outputEl.innerText || outputEl.textContent || '';
      if (!isLongifiedOutputText(latestText) || button.disabled || button.getAttribute('aria-disabled') === 'true') {
        finishAutoBrushupChain();
        refresh();
        return;
      }
      button.click();
    }, 250);
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
    if (!brushupMode) clearLongifyReview();
    if (brushupMode) {
      beginBrushupAutoAttempt();
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
      setTextContent(statusEl, 'AI講評とブラッシュアップを開始しています');
      const progressLog = document.getElementById('progress-log');
      if (progressLog) progressLog.textContent = '';
      startAiProgressHeartbeat({
        statusEl,
        modeLabel: 'ブラッシュアップβ',
        initialPhase: 'AI講評を開始中',
      });
      setAiProgressLongifyActive({
        message: '長編ブラッシュアップを開始しました。',
        detail: 'AI講評で弱点を洗い出し、章ごとに改稿してからOutputへ反映します。',
        chapterNumber: 0,
        chapterCount: countLongifyChapterHeadings(storyText),
        completedChars: submissionCharLength(storyText),
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
          onProgress(message) {
            setTextContent(statusEl, message);
          },
          onStage(stage) {
            setAiProgressLongifyActive({
              ...stage,
              modeLabel: 'ブラッシュアップβ',
              completedChars: stage.completedChars || 0,
            });
          },
        });
        setTextContent(statusEl, 'ブラッシュアップ本文をOutputへ表示中...');
        setAiProgressLongifyActive({
          message: 'ブラッシュアップ本文をOutputへ表示中...',
          detail: `講評要点: ${previewText(result.critiqueText, 260)}`,
          phase: 'render',
          chapterNumber: result.chapterCount,
          chapterCount: result.chapterCount,
          completedChars: result.finalChars,
          modeLabel: 'ブラッシュアップβ',
        });
        await setOutputTextTypewriter(outputEl, charCounter, result.text, {
          signal: abortController.signal,
          onRenderProgress(progress) {
            updateOutputRenderProgress(statusEl, progress, 'ブラッシュアップ本文ライブ表示中');
          },
        });
        setLongifyTags(tagRow, result);
        revealOutputActions();
        const review = buildAiLongifyReview({
          text: result.text,
          mode: 'brushup',
          reviewText: result.aiReviewText,
          chapterCount: result.chapterCount,
        });
        renderLongifyReview(review);
        if (shouldQueueAutoBrushup(review)) {
          pendingAutoBrushupReview = review;
        } else if (autoBrushupChainActive) {
          finishAutoBrushupChain();
        }
        setTextContent(statusEl, `ブラッシュアップ完了: ${result.chapterCount}章 / ${formatNumber(result.finalChars)}字 / AI講評 ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`}`);
        finishAiProgress({
          message: 'ブラッシュアップが完了しました。',
          detail: `AI講評を反映した改稿本文をOutputへ反映しました。AI総合点: ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`} / 次回方針: ${previewText(result.aiReviewText, 260)}`,
          completedChars: result.finalChars,
          chapterCount: result.chapterCount,
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
          modeLabel: 'ブラッシュアップβ',
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
        setStopButtonState(stopButton, false);
        setControlsDisabled(false, { brushupMode: true });
        notifyOutputDependentPanels('brushup-finished');
        refresh();
        if (pendingAutoBrushupReview) queueAutoBrushup(pendingAutoBrushupReview);
      }
      return;
    }
    const options = readLongifyRunOptionsFromUi();
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
      modeLabel: '長編化β',
      initialPhase: '芯固定台帳を作成中',
    });
    setAiProgressLongifyActive({
      message: '長編化βを開始しました。',
      detail: 'Output本文はスクロール暴走を避けるため、完了時に一括反映します。',
      chapterNumber: 0,
      chapterCount: options.chapterCount,
      options,
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
            options,
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
        options,
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
      const review = buildAiLongifyReview({
        text: result.text,
        mode: 'longify',
        reviewText: result.aiReviewText,
        targetChars: options.targetTotalNumber,
        chapterCount: result.chapters.length,
      });
      renderLongifyReview(review);
      if (shouldQueueAutoBrushup(review)) {
        pendingAutoBrushupReview = review;
      } else if (autoBrushupChainActive) {
        finishAutoBrushupChain();
      }
      setTextContent(
        statusEl,
        metMinimum
          ? `長編化完了: ${result.chapters.length}章 / ${formatNumber(finalChars)}字 / AI講評 ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`}`
          : `長編化完了（最低文字数未達）: ${formatNumber(finalChars)} / ${formatNumber(options.targetTotalNumber)}字 / AI講評 ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`}`
      );
      finishAiProgress({
        message: metMinimum ? '長編化βが完了しました。' : '長編化βが完了しましたが、最低文字数に届きませんでした。',
        detail: metMinimum
          ? `Outputへ完成稿を一括反映しました。AI総合点: ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`} / AI講評: ${previewText(result.aiReviewText, 260)}`
          : `追加生成を試みましたが、AI応答が短く止まりました。AI総合点: ${review.score === null ? '未採点' : `${review.score}点（${review.passLabel}）`} / AI講評: ${previewText(result.aiReviewText, 260)}`,
        options,
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
        options,
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
