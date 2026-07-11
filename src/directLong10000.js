export const DIRECT_LONG_10000_MODE = 'long_10000';
export const DIRECT_LONG_10000_MIN_CHARS = 10000;

export function isDirectLong10000Mode(mode) {
  return String(mode || '').trim() === DIRECT_LONG_10000_MODE;
}

export function submissionCharLength(text) {
  return Array.from(String(text || '').replace(/\s/gu, '')).length;
}

export function buildDirectLong10000Contract() {
  return [
    '【長編（10000字）直接生成契約】',
    '短い原稿を後から引き伸ばさず、最初から一つの完結した日本語の長編作品として執筆する。',
    '本文は空白・改行を除外して10,000字以上にする。文字数を満たすまで結末へ急がない。',
    '同じ出来事、説明、会話、心理、段落を言い換えて繰り返す水増しは禁止する。',
    '選択、発見、代償、関係変化が因果で進み、指定された結末まで本文内で完結させる。',
    'プロット、指示書、文字数報告、制作メモ、Markdownコードフェンスは出力しない。',
    '最後は独立行の「【完】」で終了し、その後には何も書かない。',
  ].join('\n');
}

function hasDuplicateParagraph(text) {
  const counts = new Map();
  const paragraphs = String(text || '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n?【完】\s*$/u, '')
    .split(/\n\s*\n/u)
    .map(value => value.trim())
    .filter(value => submissionCharLength(value) >= 40 && value !== '【完】');
  for (const paragraph of paragraphs) {
    const count = (counts.get(paragraph) || 0) + 1;
    if (count > 1) return true;
    counts.set(paragraph, count);
  }
  return false;
}

export function validateDirectLong10000(text) {
  const manuscript = stripGeneratedFooter(text).replace(/\r\n?/g, '\n').trim();
  const body = manuscript.replace(/\n?【完】\s*$/u, '').trimEnd();
  const charCount = submissionCharLength(body);
  const issues = [];
  if (!manuscript) issues.push('empty_output');
  if (charCount < DIRECT_LONG_10000_MIN_CHARS) issues.push('target_length');
  if (hasDuplicateParagraph(manuscript)) issues.push('duplicate_paragraph');
  const hasInternalCompletionMarker = /【完】\s*$/u.test(manuscript);
  const hasNaturalVisibleEnding = /[。！？!?」』”’）)]\s*$/u.test(manuscript);
  const hasContinuationEnding = /(?:つづく|続く|to\s+be\s+continued)[。！？!?]?\s*(?:【完】)?\s*$/iu.test(manuscript);
  if (hasContinuationEnding || (!hasInternalCompletionMarker && !hasNaturalVisibleEnding)) {
    issues.push('unclosed_ending');
  }
  return { ok: issues.length === 0, charCount, issues };
}
import { stripGeneratedFooter } from './footerHelpers.js';
