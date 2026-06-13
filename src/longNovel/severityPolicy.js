const STRUCTURAL_FATAL = new Set([
  'empty',
  'meta_leak',
  'format_label_leak',
  'placeholder',
  'broken_punctuation',
  'off_bible_name',
  'voice_pronoun_mismatch',
  'length_short',
  'final_polish_length_short',
  'empty_editorial_plan',
  'thin_editorial_plan',
  'footer_in_editorial_plan',
]);

const CLOSURE_ISSUES = new Set([
  'abstract_summary_ending',
  'cliche_closure_ending',
]);

const POSITION = {
  sceneMid: 'scene_mid',
  sceneChapterEnd: 'scene_chapter_end',
  chapterEdit: 'chapter_edit',
  chapterEditFinal: 'chapter_edit_final',
  finalPolish: 'final_polish',
  finalPolishLast: 'final_polish_last',
};

export function validationPosition(context = {}) {
  if (context.validationPosition) return context.validationPosition;
  if (context.position) return context.position;
  if (context.finalPolish && context.isFinalChapter) return POSITION.finalPolishLast;
  if (context.finalPolish) return POSITION.finalPolish;
  if (context.chapterEdit && context.isFinalChapter) return POSITION.chapterEditFinal;
  if (context.chapterEdit) return POSITION.chapterEdit;
  if (context.isChapterFinal) return POSITION.sceneChapterEnd;
  return POSITION.sceneMid;
}

export function resolveIssueSeverity(code, context = {}, fallback = 'fatal') {
  if (STRUCTURAL_FATAL.has(code)) return 'fatal';
  const position = validationPosition(context);

  if (code === 'repetition') {
    return position === POSITION.sceneMid || position === POSITION.sceneChapterEnd ? 'repair' : 'fatal';
  }

  if (CLOSURE_ISSUES.has(code)) {
    if (position === POSITION.sceneMid) return 'warning';
    if (position === POSITION.sceneChapterEnd) return 'repair';
    if (position === POSITION.chapterEditFinal || position === POSITION.finalPolishLast) return 'fatal';
    if (position === POSITION.chapterEdit || position === POSITION.finalPolish) return 'repair';
  }

  if (code === 'thin_texture') {
    return position === POSITION.sceneMid || position === POSITION.sceneChapterEnd ? 'repair' : 'warning';
  }

  if (code === 'lexical_overuse' || code === 'chapter_ending_formula') {
    if (position === POSITION.sceneMid) return 'warning';
    return 'repair';
  }

  return fallback || 'fatal';
}

export function summarizeIssueSeverities(issues = []) {
  const fatal = issues.some(issue => issue.severity === 'fatal');
  const repairRequired = issues.some(issue => issue.severity === 'repair');
  return {
    fatal,
    repairRequired,
    ok: !fatal && !repairRequired,
  };
}

export function downgradeRepairIssuesToWarnings(validation, reason = 'repair_attempt_exhausted', options = {}) {
  if (!validation || validation.fatal || !validation.repairRequired) return validation;
  const keepRepairCodes = new Set(options.keepRepairCodes || []);
  const issues = (validation.issues || []).map(issue => (
    issue.severity === 'repair' && !keepRepairCodes.has(issue.code)
      ? { ...issue, severity: 'warning', downgradedFrom: 'repair', downgradeReason: reason }
      : issue
  ));
  const fatal = issues.some(issue => issue.severity === 'fatal');
  const repairRequired = issues.some(issue => issue.severity === 'repair');
  return {
    ...validation,
    ok: !fatal && !repairRequired,
    fatal,
    repairRequired,
    issues,
  };
}
