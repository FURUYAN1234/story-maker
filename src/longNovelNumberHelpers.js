const DEFAULT_TARGET_CHARS_PER_CHAPTER = 8000;
const DEFAULT_MIN_CHAPTER_CHARS = 4500;
const DEFAULT_MAX_CHAPTER_CHARS = 9000;
const DEFAULT_MAX_OUTPUT_TOKENS = 32768;

export function normalizeNumericText(value) {
  return String(value || '')
    .replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 65248))
    .replace(/[，,]/g, '');
}

export function parseJapaneseChapterNumber(value) {
  if (!value) return 0;
  const digits = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (value === '十') return 10;
  const match = value.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);
  return match ? (match[1] ? digits[match[1]] : 1) * 10 + (match[2] ? digits[match[2]] : 0) : digits[value] || 0;
}

export function parseTargetCharCount(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.round(value));
  const normalized = normalizeNumericText(value);
  if (!normalized) return 0;
  const manMatch = normalized.match(/(\d+(?:\.\d+)?)\s*万/);
  if (manMatch) return Math.round(parseFloat(manMatch[1]) * 10000);
  const longDigitMatch = normalized.match(/(\d{4,})/);
  return longDigitMatch ? parseInt(longDigitMatch[1], 10) : 0;
}

export function resolveLongNovelTargetChars(settings, headerInfo, totalChapters) {
  return (
    parseTargetCharCount(settings?.charCount) ||
    parseTargetCharCount(headerInfo?.targetChars) ||
    Math.max(1, totalChapters || 10) * DEFAULT_TARGET_CHARS_PER_CHAPTER
  );
}

export function resolveLongNovelTotalChapters(settings, headerInfo = null) {
  const targetChars = parseTargetCharCount(settings?.charCount) || parseTargetCharCount(headerInfo?.targetChars);
  const declaredTotal = Number.isFinite(headerInfo?.totalChapters) ? headerInfo.totalChapters : 0;
  if (!targetChars) return Math.max(10, declaredTotal || 0);
  const calculated = Math.min(Math.max(Math.round(targetChars / DEFAULT_TARGET_CHARS_PER_CHAPTER), 6), 12);
  return Math.max(calculated, declaredTotal || 0);
}

export function resolveLongNovelChapterMinChars(settings, headerInfo, totalChapters) {
  const chapters = Math.max(1, totalChapters || headerInfo?.totalChapters || 10);
  const perChapter = resolveLongNovelTargetChars(settings, headerInfo, chapters) / chapters;
  const lowerBound = Math.round(perChapter * 0.6);
  return Math.max(DEFAULT_MIN_CHAPTER_CHARS, Math.min(DEFAULT_MAX_CHAPTER_CHARS, lowerBound));
}

export function buildLongNovelRequestOptions(signal) {
  return {
    signal,
    disableGoogleSearch: true,
    timeoutMs: 300000,
    maxTokens: DEFAULT_MAX_OUTPUT_TOKENS,
    maxOutputTokens: DEFAULT_MAX_OUTPUT_TOKENS,
  };
}

export {
  normalizeNumericText as Ih,
  parseJapaneseChapterNumber as fp,
  parseTargetCharCount as er,
  resolveLongNovelTargetChars as hp,
  resolveLongNovelTotalChapters as tr,
  resolveLongNovelChapterMinChars as nr,
  buildLongNovelRequestOptions as or,
};
