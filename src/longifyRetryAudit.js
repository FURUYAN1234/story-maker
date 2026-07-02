function defaultCharLength(value) {
  return String(value || '').length;
}

const REUSABLE_LONGIFY_REVIEW_SOURCES = new Set(['ai', 'failed', 'structure', 'format']);
const TOPUP_UNSAFE_STRUCTURE_CODES = new Set([
  'chapter_loop',
  'setting_contradiction',
  'storyboard_residue',
]);

export function isReusableLongifyReviewSource(source = '') {
  return REUSABLE_LONGIFY_REVIEW_SOURCES.has(String(source || '').trim());
}

export function selectReusableLongifyReviewText({
  reviewSource = '',
  aiReviewText = '',
  exportText = '',
  visibleText = '',
} = {}) {
  const source = String(reviewSource || '').trim();
  if (source && !isReusableLongifyReviewSource(source)) return '';
  return String(aiReviewText || exportText || visibleText || '').trim();
}

export function getLongifyPreTopupStructureBlock(structureAudit = null) {
  const blocking = Array.isArray(structureAudit?.blocking) ? structureAudit.blocking : [];
  const unsafeBlocking = blocking.filter(issue => TOPUP_UNSAFE_STRUCTURE_CODES.has(String(issue?.code || '')));
  return {
    skipTopup: unsafeBlocking.length > 0,
    blocking: unsafeBlocking,
    chapters: [...new Set(unsafeBlocking.map(issue => Number(issue?.chapter || 0)).filter(Boolean))],
  };
}

export function applyLongifyChapterPostValidationGuards({
  validation,
  chapterText,
  previousChapters = [],
  invariants,
  detectOverlap,
  detectContradiction,
} = {}) {
  let nextValidation = validation;
  let previousInvalidDraft = null;

  if (nextValidation?.ok && typeof detectOverlap === 'function') {
    const overlapIssue = detectOverlap(chapterText, previousChapters);
    if (overlapIssue && !overlapIssue.ok) {
      nextValidation = {
        ...nextValidation,
        ok: false,
        reason: overlapIssue.reason,
      };
      previousInvalidDraft = chapterText;
    }
  }

  if (nextValidation?.ok && typeof detectContradiction === 'function') {
    const contradiction = detectContradiction(chapterText, invariants);
    if (contradiction && !contradiction.ok) {
      nextValidation = {
        ...nextValidation,
        ok: false,
        reason: contradiction.reason,
      };
      previousInvalidDraft = chapterText;
    }
  }

  return { validation: nextValidation, previousInvalidDraft };
}

export function evaluateLongifyBrushupCandidate({
  rawChapter,
  targetPlan = {},
  hardMinimumPolishedChars = 0,
  targetPolishedChars = 0,
  cleanDraft = value => String(value || ''),
  collectArtifactIssues = () => [],
  charLength = defaultCharLength,
} = {}) {
  const rawText = String(rawChapter || '');
  const rawArtifactIssues = collectArtifactIssues(rawText) || [];
  const polishedChapter = cleanDraft(rawText);
  const polishedArtifactIssues = collectArtifactIssues(polishedChapter) || [];
  const polishedChars = charLength(polishedChapter);
  const compressionLimit = targetPlan.compressionMode
    ? Math.ceil(Number(targetPlan.max || 0) * 1.35)
    : 0;
  const candidateTooLong = Boolean(targetPlan.compressionMode && polishedChars > compressionLimit);
  const sanitizedUsable = rawArtifactIssues.length > 0
    && polishedArtifactIssues.length === 0
    && polishedChars >= hardMinimumPolishedChars;
  const canStoreBest = polishedArtifactIssues.length === 0
    && polishedChars >= hardMinimumPolishedChars
    && !candidateTooLong;
  const needsRetry = polishedArtifactIssues.length > 0
    || polishedChars < targetPolishedChars
    || candidateTooLong;

  return {
    rawArtifactIssues,
    polishedChapter,
    polishedArtifactIssues,
    polishedChars,
    sanitizedUsable,
    candidateTooLong,
    canStoreBest,
    needsRetry,
    retryArtifactIssues: rawArtifactIssues.length ? rawArtifactIssues : polishedArtifactIssues,
    compressionLimit,
  };
}

export function shouldAdoptLongifyBrushupBestCandidate({
  bestPolishedChapter = '',
  currentChapter = '',
  currentArtifactIssues = [],
  hardMinimumPolishedChars = 0,
  targetPlan = {},
  charLength = defaultCharLength,
} = {}) {
  if (!bestPolishedChapter) return false;
  const currentChars = charLength(currentChapter);
  return currentArtifactIssues.length > 0
    || currentChars < hardMinimumPolishedChars
    || Boolean(targetPlan.compressionMode && currentChars > Math.ceil(Number(targetPlan.max || 0) * 1.35));
}

export function getLongifyBrushupCompressionRejection({
  polishedChapter = '',
  polishedArtifactIssues = [],
  targetPlan = {},
  hardMinimumPolishedChars = 0,
  charLength = defaultCharLength,
} = {}) {
  const polishedChars = charLength(polishedChapter);
  const limit = Math.ceil(Number(targetPlan.max || 0) * 1.35);
  const overMax = Boolean(targetPlan.compressionMode && polishedChars > limit);
  const tooShort = Boolean(targetPlan.compressionMode && polishedChars < hardMinimumPolishedChars);
  const badFormat = Boolean(targetPlan.compressionMode && polishedArtifactIssues.length > 0);
  return {
    rejected: overMax || tooShort || badFormat,
    overMax,
    tooShort,
    badFormat,
    polishedChars,
    limit,
  };
}

export function shouldPreserveOriginalLongifyChapter({
  targetPlan = {},
  polishedChars = 0,
  polishedArtifactIssues = [],
  hardMinimumPolishedChars = 0,
} = {}) {
  return !targetPlan.compressionMode && (
    polishedChars < hardMinimumPolishedChars
    || polishedArtifactIssues.length > 0
  );
}
