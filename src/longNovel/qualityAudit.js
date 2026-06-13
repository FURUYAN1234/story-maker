import { normalizeText } from './localValidator.js';
import { findChapterEndingVarietyIssues, findLexicalOveruse, findSpeakerPronounIssue } from './literaryQualityGuards.js';

export function analyzeLongNovelQuality(state, evaluation = {}) {
  const chapters = [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
  const checks = [];

  checks.push(checkChapterProgression(chapters, state));
  checks.push(checkTailVariety(chapters));
  checks.push(checkChoiceVisibility(chapters));
  checks.push(checkConcreteEnding(chapters));
  checks.push(checkVoiceConsistency(chapters, state));
  checks.push(checkLexicalVariety(chapters));
  checks.push(checkEndingMotionVariety(chapters));
  checks.push(checkPolishCoverage(state, evaluation));

  const warnings = checks.flatMap(check => check.warnings || []);
  const blockingWarnings = warnings.filter(isBlockingQualityWarning);
  const score = Math.max(0, Math.round(100 - warnings.length * 8));
  return {
    ok: blockingWarnings.length === 0,
    score,
    checks,
    warnings,
    blockingWarnings,
  };
}

export function buildManuscriptAuditPrompt(manuscript) {
  return [
    'Evaluate this Japanese long novel for public-quality literary readability.',
    'Return JSON only. Do not rewrite the manuscript.',
    'Axes: chapter_progression, repetition_control, protagonist_choice, relationship_change, concrete_ending, explanatory_density, human_texture, template_smell, readability_pull, object_interest.',
    'Each axis must be 0-5 and include a short evidence quote from the manuscript.',
    'Passing target: every axis >= 3, average >= 3.5, readability_pull >= 3, object_interest >= 3.',
    '',
    normalizeText(manuscript).slice(0, 120000),
  ].join('\n');
}

function checkChapterProgression(chapters, state) {
  const warnings = [];
  for (const chapter of chapters) {
    const role = (state.outline?.chapters || []).find(item => item.num === chapter.chapter)?.role || {};
    const body = normalizeText(chapter.body);
    const roleTerms = [role.discovery, role.cost, role.relationshipShift, role.irreversibleAction, role.readerHook]
      .filter(Boolean)
      .map(value => String(value).replace(/\s+/g, '').slice(0, 12))
      .filter(value => value.length >= 4);
    const hits = roleTerms.filter(term => body.replace(/\s+/g, '').includes(term)).length;
    if (roleTerms.length && hits === 0) {
      warnings.push({
        code: 'chapter_progression_weak',
        chapter: chapter.chapter,
        message: `Chapter ${chapter.chapter} does not visibly echo its role ledger.`,
      });
    }
  }
  return { code: 'chapter_progression', ok: warnings.length === 0, warnings };
}

function checkTailVariety(chapters) {
  const warnings = [];
  const tails = chapters.map(chapter => normalizeText(chapter.body).replace(/\s+/g, '').slice(-90));
  for (let index = 1; index < tails.length; index++) {
    if (similarity(tails[index - 1], tails[index]) > 0.72) {
      warnings.push({
        code: 'chapter_tail_similarity',
        chapter: chapters[index]?.chapter,
        message: `Chapter ${chapters[index - 1]?.chapter} and ${chapters[index]?.chapter} have similar ending movement.`,
      });
    }
  }
  return { code: 'tail_variety', ok: warnings.length === 0, warnings };
}

function checkChoiceVisibility(chapters) {
  const warnings = [];
  const actionPattern = /(選んだ|断った|受け取った|返した|置いた|渡した|開いた|閉じた|書いた|消した|歩いた|止まった|戻した|破った|拾った)/;
  for (const chapter of chapters) {
    const tail = normalizeText(chapter.body).slice(-600);
    if (!actionPattern.test(tail)) {
      warnings.push({
        code: 'choice_visibility_weak',
        chapter: chapter.chapter,
        message: `Chapter ${chapter.chapter} ending lacks a visible choice or irreversible action.`,
      });
    }
  }
  return { code: 'choice_visibility', ok: warnings.length === 0, warnings };
}

function checkConcreteEnding(chapters) {
  const warnings = [];
  const abstractPattern = /(未来|希望|新しい始まり|これから|心の奥|気がした|余韻)$/;
  const concretePattern = /(「[^」]{2,}」|手|指|声|足|封筒|ノート|紙|机|扉|鍵|置いた|閉じた|渡した|書いた|歩いた|止まった)/;
  for (const chapter of chapters) {
    const tail = normalizeText(chapter.body).slice(-160);
    if (abstractPattern.test(tail) && !concretePattern.test(tail)) {
      warnings.push({
        code: 'ending_concreteness_weak',
        chapter: chapter.chapter,
        message: `Chapter ${chapter.chapter} ends in abstract summary instead of physical action.`,
      });
    }
  }
  return { code: 'ending_concreteness', ok: warnings.length === 0, warnings };
}

function checkVoiceConsistency(chapters, state) {
  const warnings = [];
  for (const chapter of chapters) {
    const issue = findSpeakerPronounIssue(chapter.body, state.bible);
    if (issue) {
      warnings.push({
        code: 'voice_pronoun_mismatch',
        chapter: chapter.chapter,
        message: `Chapter ${chapter.chapter} has attributed dialogue using a forbidden first-person pronoun (${issue.character}: ${issue.pronoun}).`,
        issue,
      });
    }
  }
  return { code: 'voice_consistency', ok: warnings.length === 0, warnings };
}

function checkLexicalVariety(chapters) {
  const warnings = [];
  for (const chapter of chapters) {
    const overused = findLexicalOveruse(chapter.body, { minChars: 900 });
    if (overused.length) {
      warnings.push({
        code: 'lexical_overuse',
        chapter: chapter.chapter,
        message: `Chapter ${chapter.chapter} overuses low-information words: ${overused.map(item => `${item.term}(${item.count}/${item.limit})`).join(', ')}.`,
        terms: overused,
      });
    }
  }
  return { code: 'lexical_variety', ok: warnings.length === 0, warnings };
}

function checkEndingMotionVariety(chapters) {
  const warnings = findChapterEndingVarietyIssues(chapters);
  return { code: 'ending_motion_variety', ok: warnings.length === 0, warnings };
}

function checkPolishCoverage(state, evaluation) {
  const expected = evaluation.expectedChapterCount || state.outline?.chapters?.length || 0;
  const actual = state.manuscriptEditorial?.chapterPolishes?.length || 0;
  const warnings = actual >= expected
    ? []
    : [{ code: 'polish_coverage_incomplete', message: `Final polish coverage is ${actual}/${expected}.` }];
  return { code: 'polish_coverage', ok: warnings.length === 0, warnings };
}

function similarity(a, b) {
  const left = new Set(String(a || ''));
  const right = new Set(String(b || ''));
  if (!left.size || !right.size) return 0;
  let overlap = 0;
  for (const char of left) {
    if (right.has(char)) overlap++;
  }
  return overlap / Math.max(left.size, right.size);
}

function isBlockingQualityWarning(warning) {
  return new Set([
    'voice_pronoun_mismatch',
    'lexical_overuse',
    'chapter_ending_motion_repeat',
    'chapter_ending_tag_overused',
  ]).has(warning?.code);
}
