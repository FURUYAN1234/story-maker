import assert from 'node:assert/strict';
import {
  applyLongifyChapterPostValidationGuards,
  evaluateLongifyBrushupCandidate,
  getLongifyPreTopupStructureBlock,
  getLongifyBrushupCompressionRejection,
  isReusableLongifyReviewSource,
  selectReusableLongifyReviewText,
  shouldAdoptLongifyBrushupBestCandidate,
  shouldPreserveOriginalLongifyChapter,
} from '../src/longifyRetryAudit.js';

{
  assert.equal(isReusableLongifyReviewSource('ai'), true);
  assert.equal(isReusableLongifyReviewSource('failed'), true);
  assert.equal(isReusableLongifyReviewSource('structure'), true);
  assert.equal(isReusableLongifyReviewSource('format'), true);
  assert.equal(isReusableLongifyReviewSource('local'), false);
  assert.equal(selectReusableLongifyReviewText({
    reviewSource: 'structure',
    aiReviewText: 'structure critique',
    exportText: 'export fallback',
    visibleText: 'visible fallback',
  }), 'structure critique');
  assert.equal(selectReusableLongifyReviewText({
    reviewSource: 'format',
    exportText: 'format export fallback',
    visibleText: 'visible fallback',
  }), 'format export fallback');
  assert.equal(selectReusableLongifyReviewText({
    reviewSource: 'failed',
    visibleText: 'failed visible fallback',
  }), 'failed visible fallback');
  assert.equal(selectReusableLongifyReviewText({
    reviewSource: 'local',
    aiReviewText: 'local text should not be treated as prior AI critique',
  }), '');
  assert.equal(selectReusableLongifyReviewText({
    aiReviewText: 'legacy review text',
  }), 'legacy review text');
}

{
  const block = getLongifyPreTopupStructureBlock({
    ok: false,
    blocking: [
      { code: 'chapter_loop', chapter: 6, message: 'chapter 6 repeats chapter 5' },
      { code: 'truncated', chapter: 3, message: 'chapter 3 is cut off' },
      { code: 'episode_retake', chapter: 4, message: 'chapter 4 retakes an episode' },
    ],
  });
  assert.equal(block.skipTopup, true);
  assert.deepEqual(block.chapters, [6, 4]);
  assert.equal(block.blocking.length, 2);
  assert.equal(getLongifyPreTopupStructureBlock({
    ok: false,
    blocking: [{ code: 'truncated', chapter: 3 }],
  }).skipTopup, false);
  assert.equal(getLongifyPreTopupStructureBlock({ ok: true, blocking: [] }).skipTopup, false);
}

{
  const result = applyLongifyChapterPostValidationGuards({
    validation: { ok: true, reason: '' },
    chapterText: 'chapter text',
    previousChapters: ['previous'],
    invariants: { setting: 'fixed' },
    detectOverlap: () => ({ ok: false, reason: 'chapter_loop' }),
    detectContradiction: () => {
      throw new Error('contradiction guard should not run after overlap rejection');
    },
  });
  assert.equal(result.validation.ok, false);
  assert.equal(result.validation.reason, 'chapter_loop');
  assert.equal(result.previousInvalidDraft, 'chapter text');
}

{
  const result = applyLongifyChapterPostValidationGuards({
    validation: { ok: true, reason: '' },
    chapterText: 'chapter text',
    detectOverlap: () => ({ ok: true }),
    detectContradiction: () => ({ ok: false, reason: 'setting_contradiction' }),
  });
  assert.equal(result.validation.ok, false);
  assert.equal(result.validation.reason, 'setting_contradiction');
  assert.equal(result.previousInvalidDraft, 'chapter text');
}

{
  const candidate = evaluateLongifyBrushupCandidate({
    rawChapter: '[artifact] polished body',
    targetPlan: { compressionMode: false, max: 1000 },
    hardMinimumPolishedChars: 10,
    targetPolishedChars: 10,
    cleanDraft: text => text.replace('[artifact] ', ''),
    collectArtifactIssues: text => text.includes('[artifact]') ? ['format_artifact'] : [],
    charLength: text => text.length,
  });
  assert.deepEqual(candidate.rawArtifactIssues, ['format_artifact']);
  assert.deepEqual(candidate.polishedArtifactIssues, []);
  assert.equal(candidate.polishedChapter, 'polished body');
  assert.equal(candidate.sanitizedUsable, true);
  assert.equal(candidate.canStoreBest, true);
  assert.equal(candidate.needsRetry, false);
}

{
  const candidate = evaluateLongifyBrushupCandidate({
    rawChapter: 'short',
    targetPlan: { compressionMode: false, max: 1000 },
    hardMinimumPolishedChars: 5,
    targetPolishedChars: 20,
    charLength: text => text.length,
  });
  assert.equal(candidate.needsRetry, true);
  assert.equal(candidate.canStoreBest, true);
}

{
  const targetPlan = { compressionMode: true, max: 100 };
  const candidate = evaluateLongifyBrushupCandidate({
    rawChapter: 'x'.repeat(140),
    targetPlan,
    hardMinimumPolishedChars: 20,
    targetPolishedChars: 20,
    charLength: text => text.length,
  });
  assert.equal(candidate.candidateTooLong, true);
  assert.equal(candidate.canStoreBest, false);
  assert.equal(candidate.needsRetry, true);

  const rejection = getLongifyBrushupCompressionRejection({
    polishedChapter: candidate.polishedChapter,
    polishedArtifactIssues: candidate.polishedArtifactIssues,
    targetPlan,
    hardMinimumPolishedChars: 20,
    charLength: text => text.length,
  });
  assert.equal(rejection.rejected, true);
  assert.equal(rejection.overMax, true);
  assert.equal(rejection.limit, 135);
}

assert.equal(shouldAdoptLongifyBrushupBestCandidate({
  bestPolishedChapter: 'best',
  currentChapter: 'bad',
  currentArtifactIssues: ['format_artifact'],
  hardMinimumPolishedChars: 10,
  targetPlan: { compressionMode: false },
  charLength: text => text.length,
}), true);

assert.equal(shouldPreserveOriginalLongifyChapter({
  targetPlan: { compressionMode: false },
  polishedChars: 9,
  polishedArtifactIssues: [],
  hardMinimumPolishedChars: 10,
}), true);

assert.equal(shouldPreserveOriginalLongifyChapter({
  targetPlan: { compressionMode: true },
  polishedChars: 9,
  polishedArtifactIssues: [],
  hardMinimumPolishedChars: 10,
}), false);

console.log('longifyRetryAudit tests passed');
