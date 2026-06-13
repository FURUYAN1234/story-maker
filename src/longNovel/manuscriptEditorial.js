import { countChars } from './localValidator.js';
import { minimumCharsForChapter, validateChapterDraft, validationContextForChapter } from './chapterEditorial.js';
import { classifyEndingTags, describeVoiceProfiles } from './literaryQualityGuards.js';

export const MANUSCRIPT_EDITORIAL_MARKER = 'WHOLE_MANUSCRIPT_EDITOR';

export function minimumCharsForFinalPolish(state, chapter) {
  const chapterMin = minimumCharsForChapter(chapter);
  const sceneMinimum = (chapter?.scenes || [])
    .reduce((total, scene) => total + (scene.targetChars?.[0] || 0), 0);
  const wholeRunFloor = Math.ceil(sceneMinimum * 0.45);
  const finalPassFloor = Math.floor(chapterMin * 0.94);
  return Math.max(900, wholeRunFloor, finalPassFloor);
}

export function buildManuscriptEditorialPlanPrompt({ state, provider = 'gemini', warnings = [] }) {
  const chapters = sortedChapterDrafts(state);
  const voiceProfiles = describeVoiceProfiles(state.bible);
  const providerHint = provider === 'gemini'
    ? 'Gemini tuning: avoid tidy school-essay explanations. Use the plan to create tension, consequence, and physicalized human behavior.'
    : 'OpenAI tuning: do not over-compress. Preserve concrete scenes while sharpening causality and chapter-level turns.';

  const warningSection = warnings.length > 0
    ? [
        'Detected Story-Scale Quality Warnings (You must resolve these in your plan and subsequent chapter edits):',
        ...warnings.map(w => `- [${w.code}] ${w.message}`),
        ''
      ].join('\n')
    : '';

  return [
    MANUSCRIPT_EDITORIAL_MARKER,
    'PLAN REQUEST',
    '',
    'You are the final story editor for a Japanese long novel.',
    'Return an editorial plan only. Do not rewrite the manuscript yet.',
    'The next pass will revise each chapter using this plan.',
    providerHint,
    '',
    warningSection,
    'Public-quality target:',
    '- Give the reader a reason to keep reading across chapters.',
    '- Each chapter must move desire, misconception, discovery, cost, and relationship change forward.',
    '- Do not let later chapters repeat the same emotion or same silence from earlier chapters.',
    '- Compress repetition, strengthen a unique showcase for each chapter, pay off foreshadowing, and clarify the protagonist choice.',
    '- Preserve each character voice profile, including first-person pronouns. Fix any line where a speaker uses another character voice.',
    '- Reduce repeated low-information words such as ゆっくり, 視線, 沈黙, 静か, 震え, 見つめ, and replace them with chapter-specific physical behavior.',
    '- Make chapter endings visually and physically distinct. Do not reuse the same silence/object-left/door-close/dawn-light ending pattern.',
    '- Keep rules generic. Do not invent new proper nouns, shops, brands, schools, products, or genre-specific lore.',
    '',
    'Required plan sections:',
    '1. Repetition Compression',
    '2. Chapter Showcase Upgrades',
    '3. Foreshadowing Setup and Payoff',
    '4. Protagonist Choice Clarity',
    '5. Emotional Progression by Chapter',
    '6. Voice and Lexical Control',
    '7. Chapter Ending Variety',
    '8. Chapter Progression Table (one row per chapter with columns: Chapter | New Information | Irreversible Action | Cost Paid | Relationship Delta | Repetition to Remove | Foreshadowing Payoff | Final Physical Image | Voice Risk | Ending Pattern to Avoid)',
    '',
    'Character voice contract:',
    voiceProfiles,
    '',
    'Story Bible facts:',
    (state.bible?.facts || []).map(fact => `- ${fact.text}`).join('\n') || '- none',
    '',
    'Open threads:',
    (state.bible?.openThreads || []).map(thread => `- ${thread.text}`).join('\n') || '- none',
    '',
    'Chapter role matrix:',
    ...chapters.map(chapterDraft => {
      const chapter = findChapter(state, chapterDraft.chapter);
      const role = chapter?.role || {};
      return [
        `Chapter ${chapterDraft.chapter}:`,
        `- goal: ${role.goal || chapter?.goal || ''}`,
        `- desire: ${role.desire || ''}`,
        `- misconception: ${role.misconception || ''}`,
        `- discovery: ${role.discovery || ''}`,
        `- cost: ${role.cost || ''}`,
        `- relationshipShift: ${role.relationshipShift || ''}`,
        `- showcase: ${role.showcase || ''}`,
        `- irreversibleChange: ${role.irreversibleChange || ''}`,
        `- nextQuestion: ${role.nextQuestion || ''}`,
        `- newInformation: ${role.newInformation || ''}`,
        `- irreversibleAction: ${role.irreversibleAction || ''}`,
        `- relationshipDelta: ${role.relationshipDelta || ''}`,
        `- objectStateChange: ${role.objectStateChange || ''}`,
        `- sceneVenueShift: ${role.sceneVenueShift || ''}`,
        `- readerHook: ${role.readerHook || ''}`,
        `- opening excerpt: ${excerpt(chapterDraft.body, 180, 'head')}`,
        `- ending excerpt: ${excerpt(chapterDraft.body, 240, 'tail')}`,
      ].join('\n');
    }),
    '',
    'Return concise but specific editorial instructions for the final chapter polish pass.',
  ].join('\n');
}

export function validateManuscriptEditorialPlan(plan) {
  const source = String(plan || '').trim();
  const issues = [];
  const charCount = countChars(source);
  if (!source) {
    issues.push({ code: 'empty_editorial_plan', severity: 'fatal', message: 'The whole-manuscript editorial plan is empty.' });
  }
  if (charCount < 220) {
    issues.push({ code: 'thin_editorial_plan', severity: 'fatal', message: `The whole-manuscript editorial plan is too short (${charCount}/220).`, charCount });
  }
  if (/Created\s+By\s+AI\s+Story\s+Maker/i.test(source)) {
    issues.push({ code: 'footer_in_editorial_plan', severity: 'fatal', message: 'The editorial plan contains the public footer.' });
  }
  const fatal = issues.some(issue => issue.severity === 'fatal');
  return {
    ok: !fatal,
    fatal,
    issues,
    metrics: { charCount },
  };
}

export function buildFinalChapterPolishPrompt({
  state,
  chapter,
  chapterDraft,
  editorialPlan,
  provider = 'gemini',
  attempt = 1,
  chapterDirective = '',
}) {
  const role = chapter?.role || {};
  const minChars = minimumCharsForFinalPolish(state, chapter);
  const providerHint = provider === 'gemini'
    ? 'Gemini tuning: remove honor-student summaries and explanatory morals. Let action, object placement, pauses, and slightly awkward dialogue carry feeling.'
    : 'OpenAI tuning: keep the prose vivid, but do not turn the chapter into a compressed synopsis. Maintain scene continuity and concrete event texture.';
  const { previous, next } = neighborExcerpts(state, chapterDraft.chapter);
  const voiceProfiles = describeVoiceProfiles(state.bible);

  return [
    MANUSCRIPT_EDITORIAL_MARKER,
    'CHAPTER POLISH',
    '',
    'You are applying a whole-manuscript final edit to one Japanese chapter.',
    'Return only the revised Japanese chapter body.',
    'Do not include chapter headings, Markdown, JSON, comments, notes, apologies, analysis, or footer text.',
    'Do not output manga/script/note labels such as "絵/状況:", "セリフ:", "1コマ目:", "ト書き:", or "狙い:". Convert any such material into ordinary prose and dialogue.',
    providerHint,
    '',
    'Non-negotiable output rules:',
    `- Minimum length: ${minChars} Japanese characters. This is a lower bound, not an upper bound.`,
    '- Preserve established facts and existing character/place names. Do not invent new proper nouns.',
    '- Follow the Character voice contract. If a speaker is attributed to a character, that speaker must not use a forbidden first-person pronoun.',
    '- Preserve established object/place/relationship wording exactly when it recurs across the chapter. Do not mutate a repeated noun into a near-looking or homophonic kanji compound.',
    '- Proofread for accidental kanji substitution, dropped particles, duplicated words, and broken compounds before returning. If a word was stable in the source chapter, keep that spelling.',
    '- Strengthen this chapter without breaking previous or next chapter continuity.',
    '- Reduce repeated low-information words such as ゆっくり, 視線, 沈黙, 静か, 震え, 見つめ. Replace repeated atmosphere words with concrete physical behavior or dialogue pressure.',
    '- If the current chapter contains format labels, remove the labels and rewrite their content as normal novel prose without shortening the chapter.',
    '- Compress repeated emotional beats, but do not delete the chapter showcase, cost, discovery, or relationship shift.',
    '- Make the protagonist choice visible through action, dialogue, object movement, or a concrete refusal/acceptance.',
    '- Pay off or reposition foreshadowing through scene behavior, not explanation.',
    '- End on concrete physical action or object state, not abstract hope, future, healing, summary emotion, repeated silence, object-left-on-desk, closing door, or dawn-light pattern.',
    '',
    'Character voice contract:',
    voiceProfiles,
    '',
    'Whole-manuscript editorial plan:',
    editorialPlan,
    '',
    'Chapter-specific audit repair directive:',
    chapterDirective || '- No extra directive for this chapter.',
    '',
    'This chapter role:',
    `- chapter: ${chapterDraft.chapter}`,
    `- goal: ${role.goal || chapter?.goal || ''}`,
    `- desire: ${role.desire || ''}`,
    `- misconception: ${role.misconception || ''}`,
    `- discovery: ${role.discovery || ''}`,
    `- cost: ${role.cost || ''}`,
    `- relationshipShift: ${role.relationshipShift || ''}`,
    `- showcase: ${role.showcase || ''}`,
    `- irreversibleChange: ${role.irreversibleChange || ''}`,
    `- nextQuestion: ${role.nextQuestion || ''}`,
    `- avoidEmotion: ${role.avoidEmotion || ''}`,
    `- newInformation: ${role.newInformation || ''}`,
    `- irreversibleAction: ${role.irreversibleAction || ''}`,
    `- relationshipDelta: ${role.relationshipDelta || ''}`,
    `- objectStateChange: ${role.objectStateChange || ''}`,
    `- sceneVenueShift: ${role.sceneVenueShift || ''}`,
    `- readerHook: ${role.readerHook || ''}`,
    '',
    'Continuity context:',
    previous ? `Previous chapter ending: ${previous}` : 'Previous chapter ending: none',
    next ? `Next chapter opening: ${next}` : 'Next chapter opening: none',
    '',
    `attempt: ${attempt}`,
    '',
    'Current chapter body:',
    chapterDraft.body,
  ].join('\n');
}

export function buildFinalChapterPolishRepairPrompt({ draft, issues, state, chapter, chapterDraft, editorialPlan, priorPrompt }) {
  const finalMinChars = minimumCharsForFinalPolish(state, chapter);
  const currentChars = countChars(draft);
  const issueText = (issues || [])
    .map(issue => `- ${issue.code}: ${issue.message}`)
    .join('\n');
  const role = chapter?.role || {};
  const voiceProfiles = describeVoiceProfiles(state.bible);
  return [
    MANUSCRIPT_EDITORIAL_MARKER,
    'CHAPTER POLISH REPAIR',
    '',
    'The previous final-polish output failed local validation.',
    'Return only the repaired Japanese chapter body. No heading, Markdown, JSON, comments, apology, analysis, or footer text.',
    'Do not summarize the chapter. Do not replace scenes with a synopsis.',
    'Do not output manga/script/note labels such as "絵/状況:", "セリフ:", "1コマ目:", "ト書き:", or "狙い:". Convert any such material into ordinary prose and dialogue.',
    '',
    'Validation failures:',
    issueText || '- local validation failed',
    '',
    'Non-negotiable repair requirements:',
    `- Strict final-polish minimum: ${finalMinChars} Japanese characters. This is the acceptance lower bound for this repair.`,
    `- Current failed draft length: ${currentChars} Japanese characters.`,
    '- Use the accepted chapter body below as the source of truth. Restore concrete dialogue, gestures, object handling, cost, discovery, and relationship shift from it instead of compressing.',
    '- Follow the Character voice contract. If a local validation issue says voice_pronoun_mismatch, rewrite the attributed dialogue so the speaker uses only allowed first-person wording or no first-person pronoun.',
    '- If length is short, expand by restoring scene texture from the accepted chapter body: spoken lines, hands, pauses, object position changes, and consequence after the choice.',
    '- Keep the whole-manuscript editorial plan active, but never satisfy it by deleting scene continuity.',
    '- Preserve established facts and existing character/place names. Do not invent new proper nouns.',
    '- If lexical_overuse appears, replace repeated low-information words such as ゆっくり, 視線, 沈黙, 静か, 震え, 見つめ with specific body action, object handling, or dialogue pressure.',
    '- If chapter_ending_formula appears, change the final physical image to a distinct action or object-state turn that is not repeated silence, looking away, object-left-on-desk, closing door, or dawn light.',
    '- Preserve established object/place/relationship wording exactly when it recurs across the accepted chapter body. Do not mutate a repeated noun into a near-looking or homophonic kanji compound.',
    '- Proofread for accidental kanji substitution, dropped particles, duplicated words, and broken compounds before returning. If a word was stable in the accepted source, keep that spelling.',
    '- End on concrete physical action or object state, not abstract hope, future, healing, or summary emotion.',
    '',
    'Character voice contract:',
    voiceProfiles,
    '',
    'Chapter role:',
    `- chapter: ${chapterDraft?.chapter || chapter?.num || ''}`,
    `- desire: ${role.desire || ''}`,
    `- misconception: ${role.misconception || ''}`,
    `- discovery: ${role.discovery || ''}`,
    `- cost: ${role.cost || ''}`,
    `- relationshipShift: ${role.relationshipShift || ''}`,
    `- showcase: ${role.showcase || ''}`,
    `- readerHook: ${role.readerHook || ''}`,
    '',
    'Whole-manuscript editorial plan:',
    editorialPlan,
    '',
    'Original final-polish instruction:',
    priorPrompt,
    '',
    'Accepted chapter body to preserve and repair from:',
    chapterDraft?.body || '',
    '',
    'Failed final-polish draft:',
    draft,
  ].join('\n');
}

export function buildFinalChapterEndingSurgeryPrompt({
  draft,
  issues,
  state,
  chapter,
  chapterDraft,
  editorialPlan,
  chapterDirective = '',
}) {
  const finalMinChars = minimumCharsForFinalPolish(state, chapter);
  const issueText = (issues || [])
    .map(issue => `- ${issue.code}: ${issue.message}`)
    .join('\n');
  const role = chapter?.role || {};
  const voiceProfiles = describeVoiceProfiles(state.bible);
  return [
    MANUSCRIPT_EDITORIAL_MARKER,
    'CHAPTER ENDING SURGERY',
    '',
    'The chapter body is mostly usable, but the ending still fails the manuscript-level ending lane.',
    'Return the entire revised Japanese chapter body. Do not return only the ending.',
    'Preserve the chapter facts, sequence, names, and character relationships. Rewrite only what is necessary near the final 700-900 Japanese characters.',
    'Do not include headings, Markdown, JSON, comments, analysis, apology, or footer text.',
    '',
    'Current validation failures:',
    issueText || '- ending lane failed',
    '',
    'Audit directive that must be obeyed:',
    chapterDirective || '- no directive provided',
    '',
    'Hard ending surgery rules:',
    `- Keep the final chapter length at or above ${finalMinChars} Japanese characters.`,
    '- The final paragraph must not close with silence, gaze, a left object on a desk/table, a door/exit/threshold, dawn/morning/light/sky/weather, hope/future/healing, or a summary emotion.',
    '- If the failed issues include dialogue_ratio, add two to four short spoken lines near the final scene, tied to the choice or cost. Do not add chatter or jokes.',
    '- If the failed issues include chapter_ending_lane_violation, make the final beat an audible instruction, a practical task, or a consequential gesture that changes what another character must do next.',
    '- If an object appears in the ending, it must be actively used or altered. Do not merely place it, leave it, look at it, or notice it.',
    '- The final sentence must contain a concrete action or spoken line by an established character. It must not be atmospheric description.',
    '',
    'Chapter role to preserve:',
    `- chapter: ${chapterDraft?.chapter || chapter?.num || ''}`,
    `- desire: ${role.desire || ''}`,
    `- misconception: ${role.misconception || ''}`,
    `- discovery: ${role.discovery || ''}`,
    `- cost: ${role.cost || ''}`,
    `- relationshipShift: ${role.relationshipShift || ''}`,
    `- showcase: ${role.showcase || ''}`,
    `- readerHook: ${role.readerHook || ''}`,
    '',
    'Character voice contract:',
    voiceProfiles,
    '',
    'Whole-manuscript editorial plan:',
    editorialPlan,
    '',
    'Accepted source chapter to preserve:',
    chapterDraft?.body || '',
    '',
    'Failed polished chapter to repair:',
    draft,
  ].join('\n');
}

export function validateFinalPolishedChapter(text, chapter, bible) {
  return validateChapterDraft(text, validationContextForChapter(chapter, bible));
}

export function validateFinalPolishedChapterForState(text, state, chapter, chapterDirective = '') {
  const minChars = minimumCharsForFinalPolish(state, chapter);
  const validation = validateChapterDraft(text, {
    ...validationContextForChapter(chapter, state.bible),
    minChars,
    finalPolish: true,
    isFinalChapter: Boolean(chapter?.isFinal),
    validationPosition: chapter?.isFinal ? 'final_polish_last' : 'final_polish',
  });
  const charCount = countChars(text);
  const issues = [...(validation.issues || [])];
  if (charCount < minChars) {
    issues.push({
      code: 'final_polish_length_short',
      severity: 'fatal',
      message: `Final chapter polish is below the strict lower bound (${charCount}/${minChars}).`,
      charCount,
      minChars,
    });
  }
  const directiveIssues = validateChapterDirectiveEnding(text, chapterDirective);
  issues.push(...directiveIssues);
  const fatal = issues.some(issue => issue.severity === 'fatal');
  const repairRequired = issues.some(issue => issue.severity === 'repair');
  return {
    ...validation,
    ok: !fatal && !repairRequired,
    fatal,
    repairRequired,
    issues,
    metrics: {
      ...(validation.metrics || {}),
      charCount,
      minChars,
      finalMinChars: minChars,
      endingTags: classifyEndingTags(text),
    },
  };
}

function validateChapterDirectiveEnding(text, chapterDirective = '') {
  const forbiddenTags = extractForbiddenEndingTags(chapterDirective);
  if (forbiddenTags.length === 0) return [];
  const endingTags = classifyEndingTags(text);
  const overlap = endingTags.filter(tag => forbiddenTags.includes(tag));
  if (overlap.length === 0) return [];
  return [{
    code: 'chapter_ending_lane_violation',
    severity: 'repair',
    message: `Final polish ended with forbidden ending motion family: ${overlap.join(', ')}.`,
    tags: overlap,
    forbiddenTags,
  }];
}

function extractForbiddenEndingTags(chapterDirective = '') {
  const source = String(chapterDirective || '');
  const match = source.match(/Hard forbidden ending tags for local validation:\s*([^\n.]+)/i)
    || source.match(/Forbidden ending tags for this chapter:\s*([^\n.]+)/i);
  if (!match) return [];
  return match[1]
    .split(/\s*\/\s*|\s*,\s*/)
    .map(item => item.trim())
    .filter(item => item && item.toLowerCase() !== 'none');
}

function sortedChapterDrafts(state) {
  return [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
}

function findChapter(state, chapterNumber) {
  return (state.outline?.chapters || []).find(chapter => chapter.num === chapterNumber);
}

function neighborExcerpts(state, chapterNumber) {
  const chapters = sortedChapterDrafts(state);
  const previous = chapters.find(chapter => chapter.chapter === chapterNumber - 1);
  const next = chapters.find(chapter => chapter.chapter === chapterNumber + 1);
  return {
    previous: previous ? excerpt(previous.body, 220, 'tail') : '',
    next: next ? excerpt(next.body, 220, 'head') : '',
  };
}

function excerpt(text, length = 200, side = 'tail') {
  const source = String(text || '').replace(/\s+/g, ' ').trim();
  if (source.length <= length) return source;
  return side === 'head' ? source.slice(0, length) : source.slice(-length);
}
