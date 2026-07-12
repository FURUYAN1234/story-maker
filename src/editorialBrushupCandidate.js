import { validateDirectLong10000 } from './directLong10000.js';
import { stripGeneratedFooter } from './footerHelpers.js';

function normalizedManuscript(text) {
  return stripGeneratedFooter(String(text || '')).replace(/\r\n?/g, '\n').trim();
}

export function hasCompletedEditorialEnding(text) {
  const manuscript = normalizedManuscript(text);
  if (!manuscript) return false;
  if (/(?:つづく|続く|to\s+be\s+continued)[。．.!！?？]?\s*(?:【完】)?\s*$/iu.test(manuscript)) return false;
  if (/【完】\s*$/u.test(manuscript)) return true;
  return /[。．.!！?？）」』】]$/u.test(manuscript);
}

export function hasDuplicateEditorialParagraph(text) {
  const counts = new Map();
  const paragraphs = normalizedManuscript(text)
    .replace(/\n?【完】\s*$/u, '')
    .split(/\n\s*\n/u)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => Array.from(paragraph.replace(/\s/gu, '')).length >= 40);
  for (const paragraph of paragraphs) {
    const normalized = paragraph.replace(/\s+/gu, ' ');
    const count = (counts.get(normalized) || 0) + 1;
    if (count > 1) return true;
    counts.set(normalized, count);
  }
  return false;
}

function hasAll(source, patterns) {
  return patterns.every(pattern => pattern.test(source));
}

function matchCount(source, pattern) {
  return (source.match(pattern) || []).length;
}

export function hasEditorialModeFormat(text, mode = '') {
  const source = normalizedManuscript(text);
  const normalizedMode = String(mode || '').toLowerCase();
  if (!source) return false;
  if (normalizedMode === '4koma') return hasAll(source, [/1コマ目/u, /2コマ目/u, /3コマ目/u, /4コマ目/u])
    && matchCount(source, /絵\/状況\s*[:：]/gu) === 4
    && matchCount(source, /セリフ\s*[:：]/gu) === 4
    && matchCount(source, /狙い\s*[:：]/gu) === 4;
  if (normalizedMode === '4koma_scenario') return hasAll(source, [/Topic\s*:/u, /Logline\s*:/u, /Location\s*:/u, /Outfit\s*:/u, /Punchline\s*:/u, /Scenario\s*:/u, /\[1コマ目\]/u, /\[2コマ目\]/u, /\[3コマ目\]/u, /\[4コマ目\]/u]);
  if (normalizedMode === 'scenario') return hasAll(source, [/タイトル\s*[:：]/u, /登場人物\s*[:：]/u, /場面\s*[:：]/u, /[^\n：:]{1,30}\s*[:：]\s*[^\n]+/u]);
  if (normalizedMode === 'manga') return hasAll(source, [/ページ/u, /コマ/u, /絵\s*[:：]/u, /セリフ\s*[:：]/u, /演出\s*[:：]/u]);
  if (normalizedMode === 'letter') return hasAll(source, [/宛先\s*[:：]/u, /本文\s*[:：]/u, /結び\s*[:：]/u, /差出人\s*[:：]/u]);
  if (normalizedMode === 'diary') return hasAll(source, [/日付\s*[:：]/u, /天気\s*[:：]/u, /本文\s*[:：]/u]);
  if (normalizedMode === 'documentary') return hasAll(source, [/ナレーション\s*[:：]/u, /記録映像\s*[:：]/u, /(?:証言|インタビュー)\s*[:：]/u, /締め\s*[:：]/u]);
  if (normalizedMode === 'radio') return hasAll(source, [/タイトル\s*[:：]/u, /登場人物\s*[:：]/u, /BGM\s*[:：]/u, /SE\s*[:：]/u]);
  if (normalizedMode === 'medium') return hasAll(source, [/タイトル\s*[:：]/u, /第1節/u, /第2節/u, /第3節/u]);
  if (normalizedMode === 'essay') return hasAll(source, [/主張\s*[:：]/u, /観察\s*[:：]/u, /考察\s*[:：]/u, /結論\s*[:：]/u]);
  if (normalizedMode === 'poem') {
    const nonEmptyLines = source.split('\n').filter(line => line.trim()).length;
    return Array.from(source.replace(/\s/gu, '')).length >= 600 && nonEmptyLines >= 25;
  }
  return true;
}

export function evaluateBrushupCandidate({
  currentText = '',
  candidateText = '',
  mode = '',
  currentReview = null,
  candidateReview = null,
  formatOk = hasEditorialModeFormat(candidateText, mode),
} = {}) {
  const issues = [];
  const currentLength = Array.from(normalizedManuscript(currentText).replace(/\s/gu, '')).length;
  const candidateLength = Array.from(normalizedManuscript(candidateText).replace(/\s/gu, '')).length;
  if (currentLength >= 500 && candidateLength < Math.floor(currentLength * 0.6)) issues.push('content_loss');
  if (!formatOk) issues.push('format');
  if (!hasCompletedEditorialEnding(candidateText)) issues.push('unclosed_ending');
  if (hasDuplicateEditorialParagraph(candidateText)) issues.push('duplicate_paragraph');
  if (mode === 'long_10000') {
    for (const issue of validateDirectLong10000(candidateText).issues) {
      if (!issues.includes(issue)) issues.push(issue);
    }
  }
  const currentScore = Number.isFinite(currentReview?.score) ? currentReview.score : -1;
  const scoreImproved = Boolean(candidateReview?.valid && candidateReview.score > currentScore);
  if (!scoreImproved) issues.push('score_not_improved');
  return { adopt: issues.length === 0, issues, currentScore, candidateScore: candidateReview?.score ?? null };
}
