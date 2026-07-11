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

export function evaluateBrushupCandidate({
  candidateText = '',
  mode = '',
  currentReview = null,
  candidateReview = null,
  formatOk = true,
} = {}) {
  const issues = [];
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
