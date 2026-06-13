import { assembleManuscript, evaluateLongNovelDraft } from './assembler.js';
import {
  buildChapterEditorialPrompt,
  buildChapterEditorialRepairPrompt,
  validateChapterDraft,
  validationContextForChapter,
} from './chapterEditorial.js';
import {
  buildFinalChapterPolishPrompt,
  buildFinalChapterPolishRepairPrompt,
  buildFinalChapterEndingSurgeryPrompt,
  buildManuscriptEditorialPlanPrompt,
  validateFinalPolishedChapterForState,
  validateManuscriptEditorialPlan,
} from './manuscriptEditorial.js';
import { buildSceneContract, validationContextForScene } from './sceneContract.js';
import { callLongNovelProvider } from './providerAdapter.js';
import {
  commitChapterDraft,
  commitManuscriptChapterPolish,
  commitManuscriptEditorialPlan,
  commitScene,
  completeManuscriptEditorial,
  completeRun,
  createLongNovelState,
  pauseRun,
  startRun,
} from './longState.js';
import { createLongNovelPlan, stageConfig } from './outlinePlanner.js';
import { buildRepairPrompt } from './repairPass.js';
import { countChars, validateSceneDraft } from './localValidator.js';
import { analyzeLongNovelQuality } from './qualityAudit.js';
import { classifyEndingTags, findLexicalOveruse, getEndingTagCatalog } from './literaryQualityGuards.js';
import { createRunJournal } from './runJournal.js';
import { downgradeRepairIssuesToWarnings } from './severityPolicy.js';

const FINAL_POLISH_BLOCKING_REPAIR_CODES = [
  'abstract_summary_ending',
  'cliche_closure_ending',
  'chapter_ending_formula',
  'chapter_ending_lane_violation',
  'lexical_overuse',
];

const FINAL_POLISH_ENDING_SURGERY_CODES = [
  'chapter_ending_formula',
  'chapter_ending_lane_violation',
];

export class LongNovelRunError extends Error {
  constructor(message, state) {
    super(message);
    this.name = 'LongNovelRunError';
    this.state = state;
  }
}

export async function runLongNovelDryRun(options = {}) {
  const provider = options.provider === 'openai' ? 'openai' : 'gemini';
  const stage = stageConfig(options);
  const journal = options.journal || (options.useJournal ? createRunJournal({
    provider,
    stage: stage.id,
    runId: options.runId,
    premiseText: options.premiseText,
    options,
  }) : null);
  const { bible, outline } = createLongNovelPlan({
    ...options,
    stage: stage.id,
    premiseText: options.premiseText,
    runId: options.runId || journal?.runId,
  });
  const state = createLongNovelState({ bible, outline, provider });
  const providerCall = options.providerCall || callLongNovelProvider;
  const notify = event => options.onEvent?.({ provider, runId: state.runId, stage: outline.stage.id, ...event });
  const expectedSceneCount = outline.chapters.reduce((total, chapter) => total + chapter.scenes.length, 0);
  const maxTokens = options.maxTokens || outline.stage.maxTokens || 4096;
  const timeoutMs = options.timeoutMs || outline.stage.timeoutMs || 180000;
  const attemptLimit = options.attemptLimit || 2;
  const chapterAttemptLimit = options.chapterAttemptLimit || 3;
  const emitSnapshot = detail => {
    if (typeof options.onSnapshot !== 'function') return;
    const evaluation = evaluateLongNovelDraft(state, {
      sceneCount: expectedSceneCount,
      chapterCount: outline.chapters.length,
    });
    options.onSnapshot({
      provider,
      runId: state.runId,
      stage: outline.stage.id,
      detail,
      manuscript: assembleManuscript(state),
      evaluation,
      qualityAudit: analyzeLongNovelQuality(state, evaluation),
      runLog: state.runLog.toJSON(),
    });
  };

  startRun(state);
  journal?.markRunning({ runId: state.runId, stage: outline.stage.id });
  notify({
    type: 'start',
    stageId: outline.stage.id,
    stageLabel: outline.stage.label,
    chapterCount: outline.chapters.length,
    sceneCount: expectedSceneCount,
  });
  emitSnapshot({ type: 'start' });

  for (const chapter of outline.chapters) {
    notify({ type: 'chapter-start', chapter: chapter.num, goal: chapter.goal, sceneCount: chapter.scenes.length });
    for (const scene of chapter.scenes) {
      await generateScene({
        scene,
        state,
        provider,
        providerCall,
        notify,
        apiKey: options.apiKey,
        timeoutMs,
        maxTokens,
        attemptLimit,
        journal,
      });
      emitSnapshot({ type: 'scene', chapter: chapter.num, sceneId: scene.id });
    }
    if (outline.stage.editorialPass && options.editorialPass !== false) {
      await reviseChapter({
        chapter,
        state,
        provider,
        providerCall,
        notify,
        apiKey: options.apiKey,
        timeoutMs,
        maxTokens,
        attemptLimit: chapterAttemptLimit,
        journal,
      });
      emitSnapshot({ type: 'chapter-edit', chapter: chapter.num });
    }
    notify({ type: 'chapter-done', chapter: chapter.num, committedScenes: state.ledger.summaries().filter(item => item.chapter === chapter.num).length });
    emitSnapshot({ type: 'chapter-done', chapter: chapter.num });
  }

  if (outline.stage.manuscriptEditorialPass && options.manuscriptEditorialPass !== false) {
    await reviseManuscript({
      state,
      provider,
      providerCall,
      notify,
      apiKey: options.apiKey,
      timeoutMs,
      maxTokens,
      attemptLimit: chapterAttemptLimit,
      auditRepairLimit: options.auditRepairLimit ?? 2,
      snapshot: emitSnapshot,
      journal,
    });
  }

  const manuscript = assembleManuscript(state);
  const evaluation = evaluateLongNovelDraft(state, {
    sceneCount: expectedSceneCount,
    chapterCount: outline.chapters.length,
  });
  const qualityAudit = analyzeLongNovelQuality(state, evaluation);
  if (!qualityAudit.ok) {
    const reasons = (qualityAudit.blockingWarnings || qualityAudit.warnings || []).map(warning => warning.code).join(', ') || 'quality_audit_failed';
    const error = new Error(`quality audit failed: ${reasons}`);
    pauseRun(state, error);
    journal?.markPaused(error, { step: 'quality-audit', reasons });
    notify({ type: 'paused', sceneId: 'QUALITY-AUDIT', error: state.error, qualityAudit });
    emitSnapshot({ type: 'quality-audit-failed', reasons });
    throw new LongNovelRunError(`Long novel run paused at quality audit: ${state.error || reasons}`, state);
  }
  completeRun(state);
  journal?.markDone({ runId: state.runId });
  notify({ type: 'done', evaluation, qualityAudit });
  emitSnapshot({ type: 'done' });
  return {
    state,
    manuscript,
    evaluation,
    qualityAudit,
    runLog: state.runLog.toJSON(),
  };
}

async function reviseManuscript({ state, provider, providerCall, notify, apiKey, timeoutMs, maxTokens, attemptLimit, auditRepairLimit = 2, snapshot, journal }) {
  notify({ type: 'manuscript-edit-start', chapterCount: state.chapterDrafts.length });
  const currentEvaluation = evaluateLongNovelDraft(state);
  const warnings = currentEvaluation.warnings || [];
  let plan = '';
  let planValidation = null;
  let lastError = null;
  const replayPlan = journal?.getManuscriptPlan();

  if (replayPlan?.body) {
    plan = replayPlan.body;
    planValidation = replayPlan.validation || { ok: true, fatal: false, repairRequired: false, issues: [], metrics: { charCount: countChars(plan) } };
    commitManuscriptEditorialPlan(state, plan, planValidation, replayPlan.provider || provider);
    state.runLog.accept('MS-PLAN', 0, {
      verdictDetail: 'manuscript-editorial-plan-replay',
      charCount: countChars(plan),
      metrics: planValidation.metrics,
    });
    notify({ type: 'manuscript-plan-replay', charCount: countChars(plan) });
    snapshot?.({ type: 'manuscript-plan-replay', charCount: countChars(plan) });
  }

  for (let attempt = 1; !planValidation?.ok && attempt <= 2; attempt++) {
    try {
      const raw = await providerCall({
        provider,
        apiKey,
        prompt: buildManuscriptEditorialPlanPrompt({ state, provider, warnings }),
        temperature: attempt === 1 ? 0.54 : 0.62,
        maxTokens: Math.max(2048, Math.min(Math.max(maxTokens, 4096), 6144)),
        timeoutMs,
        onFallback: model => notify({ type: 'fallback', sceneId: 'MS-PLAN', model }),
      });
      plan = extractText(raw);
      planValidation = validateManuscriptEditorialPlan(plan);
      if (planValidation.ok) {
        commitManuscriptEditorialPlan(state, plan, planValidation, provider);
        journal?.recordManuscriptPlan(plan, { provider, validation: planValidation, attempt, usedModel: raw?.usedModel });
        state.runLog.accept('MS-PLAN', attempt, {
          verdictDetail: 'manuscript-editorial-plan-accept',
          charCount: countChars(plan),
          usedModel: raw?.usedModel,
          metrics: planValidation.metrics,
        });
        notify({ type: 'manuscript-plan-accept', attempt, charCount: countChars(plan), usedModel: raw?.usedModel });
        snapshot?.({ type: 'manuscript-plan', charCount: countChars(plan) });
        break;
      }

      state.runLog.reject('MS-PLAN', attempt, {
        verdictDetail: 'manuscript-editorial-plan-reject',
        reasons: planValidation.issues.map(issue => issue.code),
        charCount: countChars(plan),
      });
      notify({ type: 'manuscript-plan-reject', attempt, reasons: planValidation.issues.map(issue => issue.code) });
      lastError = new Error(`manuscript editorial plan failed: ${planValidation.issues.map(issue => issue.code).join(', ')}`);
    } catch (error) {
      lastError = error;
      state.runLog.reject('MS-PLAN', attempt, { error: String(error.message || error) });
      notify({ type: 'manuscript-plan-error', attempt, error: String(error.message || error) });
    }
  }

  if (!planValidation?.ok) {
    pauseRun(state, lastError || new Error('manuscript editorial plan failed'));
    journal?.markPaused(state.error || lastError, { step: 'manuscript-plan' });
    notify({ type: 'paused', sceneId: 'MS-PLAN', error: state.error });
    throw new LongNovelRunError(`Long novel run paused at whole-manuscript editorial plan: ${state.error || 'unknown error'}`, state);
  }

  const chapters = [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
  for (const chapterDraft of chapters) {
    const chapter = (state.outline?.chapters || []).find(item => item.num === chapterDraft.chapter);
    await polishChapterFromManuscriptPlan({
      state,
      chapter,
      chapterDraft,
      editorialPlan: plan,
      provider,
      providerCall,
      notify,
      apiKey,
      timeoutMs,
      maxTokens,
      attemptLimit,
      snapshot,
      journal,
    });
  }

  for (let auditPass = 1; auditPass <= auditRepairLimit; auditPass++) {
    const evaluation = evaluateLongNovelDraft(state);
    const qualityAudit = analyzeLongNovelQuality(state, evaluation);
    if (qualityAudit.ok) break;
    const blocking = qualityAudit.blockingWarnings || qualityAudit.warnings || [];
    state.runLog.reject('MS-QUALITY', auditPass, {
      verdictDetail: 'manuscript-quality-audit-repair-required',
      reasons: blocking.map(warning => warning.code),
      score: qualityAudit.score,
    });
    notify({
      type: 'manuscript-quality-repair-start',
      attempt: auditPass,
      reasons: blocking.map(warning => warning.code),
      score: qualityAudit.score,
    });
    const repairPlan = buildQualityAuditRepairPlan({ editorialPlan: plan, qualityAudit, auditPass });
    const repairChapters = [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
    const chapterDirectives = buildChapterAuditRepairDirectives({ state, qualityAudit, auditPass });
    for (const chapterDraft of repairChapters) {
      const chapter = (state.outline?.chapters || []).find(item => item.num === chapterDraft.chapter);
      await polishChapterFromManuscriptPlan({
        state,
        chapter,
        chapterDraft,
        editorialPlan: repairPlan,
        provider,
        providerCall,
        notify,
        apiKey,
        timeoutMs,
        maxTokens,
        attemptLimit,
        snapshot,
        journal,
        ignoreReplay: true,
        chapterDirective: chapterDirectives.get(chapterDraft.chapter) || '',
      });
    }
    snapshot?.({ type: 'manuscript-quality-repair', attempt: auditPass });
  }

  completeManuscriptEditorial(state);
  notify({ type: 'manuscript-edit-done', chapterCount: state.manuscriptEditorial.chapterPolishes.length });
  snapshot?.({ type: 'manuscript-edit-done', chapterCount: state.manuscriptEditorial.chapterPolishes.length });
}

async function polishChapterFromManuscriptPlan({
  state,
  chapter,
  chapterDraft,
  editorialPlan,
  provider,
  providerCall,
  notify,
  apiKey,
  timeoutMs,
  maxTokens,
  attemptLimit,
  snapshot,
  journal,
  ignoreReplay = false,
  chapterDirective = '',
}) {
  let lastError = null;
  const finalAttemptLimit = Math.max(attemptLimit, 5);
  const replayPolish = journal?.getChapterPolish(chapterDraft.chapter);

  if (!ignoreReplay && replayPolish?.body) {
    const validation = validateFinalPolishedChapterForState(replayPolish.body, state, chapter, chapterDirective);
    if (!validation.ok) {
      state.runLog.reject(`MS-CH${chapterDraft.chapter}`, 0, {
        verdictDetail: 'manuscript-chapter-polish-replay-stale',
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(replayPolish.body),
      });
    } else {
    commitChapterDraft(state, chapter, replayPolish.body, validation, replayPolish.provider || provider);
    commitManuscriptChapterPolish(state, chapter, replayPolish.body, validation, replayPolish.provider || provider);
    state.runLog.accept(`MS-CH${chapterDraft.chapter}`, 0, {
      verdictDetail: 'manuscript-chapter-polish-replay',
      charCount: countChars(replayPolish.body),
      metrics: validation.metrics,
    });
    notify({
      type: 'manuscript-chapter-polish-replay',
      chapter: chapterDraft.chapter,
      charCount: countChars(replayPolish.body),
    });
    snapshot?.({ type: 'manuscript-chapter-polish-replay', chapter: chapterDraft.chapter });
    return;
    }
  }

  for (let attempt = 1; attempt <= finalAttemptLimit; attempt++) {
    const prompt = buildFinalChapterPolishPrompt({
      state,
      chapter,
      chapterDraft,
      editorialPlan,
      provider,
      attempt,
      chapterDirective,
    });
    notify({ type: 'manuscript-chapter-polish-start', chapter: chapterDraft.chapter, attempt });
    try {
      const raw = await providerCall({
        provider,
        apiKey,
        prompt,
        temperature: attempt === 1 ? 0.62 : 0.68,
        maxTokens: Math.max(maxTokens, 8192),
        timeoutMs,
        onFallback: model => notify({ type: 'fallback', sceneId: `MS-CH${chapterDraft.chapter}`, model }),
      });
      let acceptedText = extractText(raw);
      let validation = validateFinalPolishedChapterForState(acceptedText, state, chapter, chapterDirective);
      let repaired = false;
      let usedModel = raw?.usedModel;

      if (!validation.ok) {
        state.runLog.reject(`MS-CH${chapterDraft.chapter}`, attempt, {
          verdictDetail: 'manuscript-chapter-polish-reject',
          reasons: validation.issues.map(issue => issue.code),
          charCount: countChars(acceptedText),
        });
        notify({
          type: 'manuscript-chapter-polish-repair',
          chapter: chapterDraft.chapter,
          attempt,
          reasons: validation.issues.map(issue => issue.code),
        });
        const repairedRaw = await providerCall({
          provider,
          apiKey,
          prompt: buildFinalChapterPolishRepairPrompt({ draft: acceptedText, issues: validation.issues, state, chapter, chapterDraft, editorialPlan, priorPrompt: prompt }),
          temperature: 0.62,
          maxTokens: Math.max(maxTokens, 8192),
          timeoutMs,
          onFallback: model => notify({ type: 'fallback', sceneId: `MS-CH${chapterDraft.chapter}`, model }),
        });
        acceptedText = extractText(repairedRaw);
        usedModel = repairedRaw?.usedModel || usedModel;
        validation = downgradeRepairIssuesToWarnings(
          validateFinalPolishedChapterForState(acceptedText, state, chapter, chapterDirective),
          'final_polish_repair_attempt',
          { keepRepairCodes: FINAL_POLISH_BLOCKING_REPAIR_CODES }
        );
        repaired = true;
      }

      if (!validation.ok && needsFinalEndingSurgery(validation, chapterDirective)) {
        notify({
          type: 'manuscript-chapter-ending-surgery',
          chapter: chapterDraft.chapter,
          attempt,
          reasons: validation.issues.map(issue => issue.code),
        });
        const surgeryRaw = await providerCall({
          provider,
          apiKey,
          prompt: buildFinalChapterEndingSurgeryPrompt({
            draft: acceptedText,
            issues: validation.issues,
            state,
            chapter,
            chapterDraft,
            editorialPlan,
            chapterDirective,
          }),
          temperature: 0.58,
          maxTokens: Math.max(maxTokens, 8192),
          timeoutMs,
          onFallback: model => notify({ type: 'fallback', sceneId: `MS-CH${chapterDraft.chapter}`, model }),
        });
        acceptedText = extractText(surgeryRaw);
        usedModel = surgeryRaw?.usedModel || usedModel;
        validation = downgradeRepairIssuesToWarnings(
          validateFinalPolishedChapterForState(acceptedText, state, chapter, chapterDirective),
          'final_polish_ending_surgery',
          { keepRepairCodes: FINAL_POLISH_BLOCKING_REPAIR_CODES }
        );
        repaired = true;

        if (!validation.ok) {
          state.runLog.reject(`MS-CH${chapterDraft.chapter}`, attempt, {
            verdictDetail: 'manuscript-chapter-ending-surgery-reject',
            reasons: validation.issues.map(issue => issue.code),
            charCount: countChars(acceptedText),
          });
        }
      }

      if (!validation.ok && !chapterDirective) {
        const preservedValidation = downgradeRepairIssuesToWarnings(
          validateChapterDraft(
            chapterDraft.body,
            validationContextForChapter(chapter, state.bible)
          ),
          'final_polish_preserve_source'
        );
        if (preservedValidation.ok) {
          acceptedText = chapterDraft.body;
          validation = preservedValidation;
          repaired = true;
          commitChapterDraft(state, chapter, acceptedText, validation, provider);
          commitManuscriptChapterPolish(state, chapter, acceptedText, validation, provider);
          journal?.recordChapterPolish(chapterDraft.chapter, acceptedText, {
            provider,
            validation,
            attempt,
            repaired,
            preserved: true,
            usedModel,
          });
          state.runLog.accept(`MS-CH${chapterDraft.chapter}`, attempt, {
            verdictDetail: 'manuscript-chapter-polish-preserve-accepted-chapter',
            charCount: countChars(acceptedText),
            usedModel,
            metrics: validation.metrics,
          });
          notify({
            type: 'manuscript-chapter-polish-accept',
            chapter: chapterDraft.chapter,
            attempt,
            charCount: countChars(acceptedText),
            repaired,
            preserved: true,
            usedModel,
          });
          snapshot?.({ type: 'manuscript-chapter-polish', chapter: chapterDraft.chapter, preserved: true });
          return;
        }
      }

      if (validation.ok) {
        commitChapterDraft(state, chapter, acceptedText, validation, provider);
        commitManuscriptChapterPolish(state, chapter, acceptedText, validation, provider);
        journal?.recordChapterPolish(chapterDraft.chapter, acceptedText, {
          provider,
          validation,
          attempt,
          repaired,
          usedModel,
        });
        state.runLog.accept(`MS-CH${chapterDraft.chapter}`, attempt, {
          verdictDetail: repaired ? 'manuscript-chapter-polish-repair-accept' : 'manuscript-chapter-polish-accept',
          charCount: countChars(acceptedText),
          usedModel,
          metrics: validation.metrics,
        });
        notify({
          type: 'manuscript-chapter-polish-accept',
          chapter: chapterDraft.chapter,
          attempt,
          charCount: countChars(acceptedText),
          repaired,
          usedModel,
        });
        snapshot?.({ type: 'manuscript-chapter-polish', chapter: chapterDraft.chapter, repaired });
        return;
      }

      state.runLog.reject(`MS-CH${chapterDraft.chapter}`, attempt, {
        verdictDetail: 'manuscript-chapter-polish-repair-reject',
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(acceptedText),
      });
      lastError = new Error(`manuscript chapter polish failed: ${validation.issues.map(issue => issue.code).join(', ')}`);
    } catch (error) {
      lastError = error;
      state.runLog.reject(`MS-CH${chapterDraft.chapter}`, attempt, { error: String(error.message || error) });
      notify({ type: 'manuscript-chapter-polish-error', chapter: chapterDraft.chapter, attempt, error: String(error.message || error) });
    }
  }

  pauseRun(state, lastError || new Error(`manuscript chapter polish failed: ${chapterDraft.chapter}`));
  journal?.markPaused(state.error || lastError, { step: 'manuscript-chapter-polish', chapter: chapterDraft.chapter });
  notify({ type: 'paused', sceneId: `MS-CH${chapterDraft.chapter}`, chapter: chapterDraft.chapter, error: state.error });
  throw new LongNovelRunError(`Long novel run paused at whole-manuscript chapter polish ${chapterDraft.chapter}: ${state.error || 'unknown error'}`, state);
}

function needsFinalEndingSurgery(validation, chapterDirective) {
  if (!chapterDirective) return false;
  const issueCodes = new Set((validation.issues || []).map(issue => issue.code));
  return FINAL_POLISH_ENDING_SURGERY_CODES.some(code => issueCodes.has(code));
}

async function reviseChapter({ chapter, state, provider, providerCall, notify, apiKey, timeoutMs, maxTokens, attemptLimit, journal }) {
  const chapterScenes = state.canonScenes
    .filter(scene => scene.chapter === chapter.num)
    .map(scene => scene.body)
    .filter(Boolean);
  const chapterText = chapterScenes.join('\n\n');
  const validationContext = validationContextForChapter(chapter, state.bible);
  const qualityWarnings = collectChapterWarnings(state, chapter.num);
  const previousChapterNotes = (state.chapterDrafts || [])
    .slice(-3)
    .map(item => `章${item.chapter}: ${String(item.body || '').replace(/\s+/g, '').slice(-120)}`);
  let lastError = null;
  const replayChapter = journal?.getChapterEdit(chapter.num);

  if (replayChapter?.body) {
    const validation = validateChapterDraft(replayChapter.body, validationContext);
    if (!validation.ok) {
      state.runLog.reject(`CH${chapter.num}`, 0, {
        verdictDetail: 'chapter-edit-replay-stale',
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(replayChapter.body),
      });
    } else {
    commitChapterDraft(state, chapter, replayChapter.body, validation, replayChapter.provider || provider);
    state.runLog.accept(`CH${chapter.num}`, 0, {
      verdictDetail: 'chapter-edit-replay',
      charCount: countChars(replayChapter.body),
      metrics: validation.metrics,
    });
    notify({ type: 'chapter-edit-replay', chapter: chapter.num, charCount: countChars(replayChapter.body) });
    return;
    }
  }

  for (let attempt = 1; attempt <= attemptLimit; attempt++) {
    const prompt = buildChapterEditorialPrompt({
      chapter,
      bible: state.bible,
      chapterText,
      previousChapterNotes,
      qualityWarnings,
      attempt,
      provider,
    });
    notify({ type: 'chapter-edit-start', chapter: chapter.num, attempt });
    try {
      const raw = await providerCall({
        provider,
        apiKey,
        prompt,
        temperature: attempt === 1 ? 0.68 : 0.72,
        maxTokens: Math.max(maxTokens, 6144),
        timeoutMs,
        onFallback: model => notify({ type: 'fallback', sceneId: `CH${chapter.num}`, model }),
      });
      const draft = extractText(raw);
      let validation = validateChapterDraft(draft, validationContext);
      let acceptedText = draft;
      let repaired = false;

      if (!validation.ok) {
        state.runLog.reject(`CH${chapter.num}`, attempt, {
          verdictDetail: 'chapter-edit-reject',
          reasons: validation.issues.map(issue => issue.code),
          charCount: countChars(draft),
        });
        notify({ type: 'chapter-edit-repair', chapter: chapter.num, attempt, reasons: validation.issues.map(issue => issue.code) });
        const repairedRaw = await providerCall({
          provider,
          apiKey,
          prompt: buildChapterEditorialRepairPrompt({ draft, issues: validation.issues, chapter, priorPrompt: prompt }),
          temperature: 0.66,
          maxTokens: Math.max(maxTokens, 6144),
          timeoutMs,
          onFallback: model => notify({ type: 'fallback', sceneId: `CH${chapter.num}`, model }),
        });
        acceptedText = extractText(repairedRaw);
        validation = downgradeRepairIssuesToWarnings(
          validateChapterDraft(acceptedText, validationContext),
          'chapter_edit_repair_attempt'
        );
        repaired = true;
      }

      if (!validation.ok) {
        const sourceValidation = downgradeRepairIssuesToWarnings(
          validateChapterDraft(chapterText, validationContext),
          'chapter_edit_preserve_source'
        );
        if (sourceValidation.ok) {
          commitChapterDraft(state, chapter, chapterText, sourceValidation, provider);
          journal?.recordChapterEdit(chapter.num, chapterText, {
            provider,
            validation: sourceValidation,
            attempt,
            repaired: true,
            preserved: true,
            usedModel: raw?.usedModel,
          });
          state.runLog.accept(`CH${chapter.num}`, attempt, {
            verdictDetail: 'chapter-edit-preserve-source-scenes',
            charCount: countChars(chapterText),
            usedModel: raw?.usedModel,
            metrics: sourceValidation.metrics,
          });
          notify({
            type: 'chapter-edit-accept',
            chapter: chapter.num,
            attempt,
            charCount: countChars(chapterText),
            repaired: true,
            preserved: true,
            usedModel: raw?.usedModel,
          });
          return;
        }
      }

      if (validation.ok) {
        commitChapterDraft(state, chapter, acceptedText, validation, provider);
        journal?.recordChapterEdit(chapter.num, acceptedText, {
          provider,
          validation,
          attempt,
          repaired,
          usedModel: raw?.usedModel,
        });
        state.runLog.accept(`CH${chapter.num}`, attempt, {
          verdictDetail: repaired ? 'chapter-edit-repair-accept' : 'chapter-edit-accept',
          charCount: countChars(acceptedText),
          usedModel: raw?.usedModel,
          metrics: validation.metrics,
        });
        notify({
          type: 'chapter-edit-accept',
          chapter: chapter.num,
          attempt,
          charCount: countChars(acceptedText),
          repaired,
          usedModel: raw?.usedModel,
        });
        return;
      }

      state.runLog.reject(`CH${chapter.num}`, attempt, {
        verdictDetail: 'chapter-edit-repair-reject',
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(acceptedText),
      });
      lastError = new Error(`chapter edit failed: ${validation.issues.map(issue => issue.code).join(', ')}`);
    } catch (error) {
      lastError = error;
      state.runLog.reject(`CH${chapter.num}`, attempt, { error: String(error.message || error) });
      notify({ type: 'chapter-edit-error', chapter: chapter.num, attempt, error: String(error.message || error) });
    }
  }

  pauseRun(state, lastError || new Error(`chapter edit failed: ${chapter.num}`));
  journal?.markPaused(state.error || lastError, { step: 'chapter-edit', chapter: chapter.num });
  notify({ type: 'paused', chapter: chapter.num, error: state.error });
  throw new LongNovelRunError(`Long novel run paused at chapter edit ${chapter.num}: ${state.error || 'unknown error'}`, state);
}

async function generateScene({ scene, state, provider, providerCall, notify, apiKey, timeoutMs, maxTokens, attemptLimit, journal }) {
  const previousScenes = state.ledger.tail(3);
  const validationContext = validationContextForScene(scene, state.bible, previousScenes);
  scene.validationContext = validationContext;
  const replayScene = journal?.getScene(scene.id);
  if (replayScene?.body) {
    const validation = validateSceneDraft(replayScene.body, validationContext);
    if (!validation.ok) {
      state.runLog.reject(scene.id, 0, {
        verdictDetail: 'scene-replay-stale',
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(replayScene.body),
      });
    } else {
    scene.attemptCount = replayScene.attempt || 0;
    commitScene(state, scene, replayScene.body, validation, replayScene.provider || provider);
    state.runLog.accept(scene.id, 0, {
      verdictDetail: 'scene-replay',
      charCount: countChars(replayScene.body),
      metrics: validation.metrics,
    });
    notify({ type: 'scene-replay', sceneId: scene.id, chapter: scene.chapter, charCount: countChars(replayScene.body) });
    return;
    }
  }
  let accepted = false;
  let lastError = null;

  for (let attempt = 1; attempt <= attemptLimit && !accepted; attempt++) {
    const contract = buildSceneContract({ scene, bible: state.bible, previousScenes, attempt, provider });
    notify({ type: 'scene-start', sceneId: scene.id, chapter: scene.chapter, attempt });
    try {
      const raw = await providerCall({
        provider,
        apiKey,
        prompt: contract,
        temperature: attempt === 1 ? (provider === 'gemini' ? 0.85 : undefined) : 0.72,
        maxTokens,
        timeoutMs,
        onFallback: model => notify({ type: 'fallback', sceneId: scene.id, model }),
      });
      const draft = extractText(raw);
      const validation = validateSceneDraft(draft, validationContext);
      if (validation.ok) {
        acceptScene({ state, scene, text: draft, validation, provider, raw, attempt, notify, journal });
        accepted = true;
        break;
      }

      state.runLog.reject(scene.id, attempt, {
        reasons: validation.issues.map(issue => issue.code),
        charCount: countChars(draft),
      });
      notify({ type: 'scene-repair', sceneId: scene.id, chapter: scene.chapter, attempt, reasons: validation.issues.map(issue => issue.code) });

      const repairedRaw = await providerCall({
        provider,
        apiKey,
        prompt: buildRepairPrompt({ draft, issues: validation.issues, sceneContract: contract }),
        temperature: 0.66,
        maxTokens,
        timeoutMs,
        onFallback: model => notify({ type: 'fallback', sceneId: scene.id, model }),
      });
      const repaired = extractText(repairedRaw);
      const repairedValidation = downgradeRepairIssuesToWarnings(
        validateSceneDraft(repaired, validationContext),
        'scene_repair_attempt'
      );
      if (repairedValidation.ok) {
        acceptScene({ state, scene, text: repaired, validation: repairedValidation, provider, raw: repairedRaw, attempt, notify, repaired: true, journal });
        accepted = true;
      } else {
        state.runLog.reject(scene.id, attempt, {
          verdictDetail: 'repair-reject',
          reasons: repairedValidation.issues.map(issue => issue.code),
          charCount: countChars(repaired),
        });
        lastError = new Error(`repair failed: ${repairedValidation.issues.map(issue => issue.code).join(', ')}`);
      }
    } catch (error) {
      lastError = error;
      state.runLog.reject(scene.id, attempt, { error: String(error.message || error) });
      notify({ type: 'scene-error', sceneId: scene.id, chapter: scene.chapter, attempt, error: String(error.message || error) });
    }
  }

  if (!accepted) {
    pauseRun(state, lastError || new Error(`scene failed: ${scene.id}`));
    journal?.markPaused(state.error || lastError, { step: 'scene', sceneId: scene.id, chapter: scene.chapter });
    notify({ type: 'paused', sceneId: scene.id, chapter: scene.chapter, error: state.error });
    throw new LongNovelRunError(`Long novel run paused at ${scene.id}: ${state.error || 'unknown error'}`, state);
  }
}

function acceptScene({ state, scene, text, validation, provider, raw, attempt, notify, repaired = false, journal }) {
  scene.attemptCount = attempt;
  commitScene(state, scene, text, validation, provider);
  journal?.recordScene(scene.id, text, {
    scene,
    chapter: scene.chapter,
    provider,
    validation,
    attempt,
    repaired,
    usedModel: raw?.usedModel,
  });
  state.runLog.accept(scene.id, attempt, {
    verdictDetail: repaired ? 'repair-accept' : 'direct-accept',
    charCount: countChars(text),
    usedModel: raw?.usedModel,
    metrics: validation.metrics,
  });
  notify({
    type: 'scene-accept',
    sceneId: scene.id,
    chapter: scene.chapter,
    attempt,
    charCount: countChars(text),
    usedModel: raw?.usedModel,
    repaired,
  });
}

function collectChapterWarnings(state, chapterNumber) {
  return (state.draftScenes || [])
    .filter(entry => entry.scene?.chapter === chapterNumber)
    .flatMap(entry => (entry.validation?.issues || [])
      .filter(issue => issue.severity === 'warning' || issue.downgradedFrom === 'repair')
      .map(issue => ({
        sceneId: entry.scene?.id,
        code: issue.code,
        message: issue.message,
      })));
}

function buildQualityAuditRepairPlan({ editorialPlan, qualityAudit, auditPass }) {
  const blocking = qualityAudit.blockingWarnings || qualityAudit.warnings || [];
  const allWarnings = qualityAudit.warnings || [];
  return [
    editorialPlan,
    '',
    'QUALITY AUDIT REPAIR PASS',
    `pass: ${auditPass}`,
    '',
    'The whole-manuscript quality audit failed. Do not report failure; repair the manuscript chapter by chapter.',
    'Apply the following as a full-manuscript edit, not as isolated patching:',
    '- Preserve story facts, character names, place names, and object identities.',
    '- Preserve each character voice profile. Fix any attributed dialogue that uses a forbidden first-person pronoun.',
    '- Reduce low-information repeated words across the entire manuscript: ゆっくり, 視線, 沈黙, 静か, 震え, 見つめ.',
    '- Vary chapter endings across the manuscript. Do not keep ending chapters with the same silence, looking away, object-left-on-desk, closing door, or dawn-light pattern.',
    '- If a chapter ending changes, keep the chapter role, cost, discovery, relationship shift, and next hook intact.',
    '- Keep prose literary and human-textured. Do not turn the chapter into synopsis or explanation.',
    '',
    'Blocking audit failures:',
    ...blocking.map(warning => `- [${warning.code}] ${warning.message || ''}`),
    '',
    'All audit warnings for context:',
    ...allWarnings.map(warning => `- [${warning.code}] ${warning.message || ''}`),
  ].join('\n');
}

export function buildChapterAuditRepairDirectives({ state, qualityAudit, auditPass }) {
  const chapters = [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
  const warnings = qualityAudit.warnings || [];
  const directWarningsByChapter = new Map();
  for (const warning of warnings) {
    const chapterList = warning.chapters || (warning.chapter ? [warning.chapter] : []);
    for (const chapter of chapterList) {
      if (!directWarningsByChapter.has(chapter)) directWarningsByChapter.set(chapter, []);
      directWarningsByChapter.get(chapter).push(warning);
    }
  }

  const tagDistribution = buildEndingTagDistribution(chapters);
  const output = new Map();
  chapters.forEach((chapterDraft, index) => {
    const chapter = (state.outline?.chapters || []).find(item => item.num === chapterDraft.chapter) || {};
    const role = chapter.role || {};
    const chapterWarnings = directWarningsByChapter.get(chapterDraft.chapter) || [];
    const lexicalTerms = findLexicalOveruse(chapterDraft.body, { minChars: 900 });
    const currentTags = classifyEndingTags(chapterDraft.body);
    const neighborTags = [
      ...(index > 0 ? classifyEndingTags(chapters[index - 1].body) : []),
      ...(index < chapters.length - 1 ? classifyEndingTags(chapters[index + 1].body) : []),
    ];
    const hardForbiddenTags = unique([
      ...chapterWarnings.flatMap(warning => warning.tags || []),
      ...chapterWarnings.map(warning => warning.tag).filter(Boolean),
    ]);
    const softAvoidTags = unique([
      ...currentTags,
      ...neighborTags,
    ].filter(tag => !hardForbiddenTags.includes(tag)));
    const preferredEnding = selectEndingAlternative(index, auditPass, hardForbiddenTags);
    const secondaryEnding = selectEndingAlternative(index + 3, auditPass + 1, hardForbiddenTags);
    const forbiddenWords = unique(lexicalTerms.map(item => item.term));
    const tagPressure = tagDistribution
      .filter(item => hardForbiddenTags.includes(item.tag) || item.count >= Math.max(3, Math.ceil(chapters.length * 0.35)))
      .map(item => `${item.tag}(${item.chapters.join('/')})`);
    const lines = [
      `- Audit repair pass ${auditPass}, chapter ${chapterDraft.chapter}: revise this chapter as part of the whole manuscript, not as a standalone cleanup.`,
      `- Current blocking warnings for this chapter: ${chapterWarnings.map(w => w.code).join(', ') || 'none directly, but whole-manuscript variety still applies'}.`,
      `- Forbidden low-information words in this chapter: ${forbiddenWords.join(' / ') || 'none detected locally; still avoid default atmosphere words'}. Replace them with body mechanics, object handling, sensory pressure, or spoken conflict tied to this chapter.`,
      `- Hard forbidden ending tags for local validation: ${hardForbiddenTags.join(' / ') || 'none'}. These are the tags that failed the manuscript audit; the final 420 characters must not contain them.`,
      `- Soft avoid ending tags for this chapter: ${softAvoidTags.join(' / ') || 'none'}. Avoid them when possible, but the hard forbidden list is the local acceptance gate.`,
      `- Tag-specific avoidance: ${describeEndingTagAvoidance(hardForbiddenTags)}`,
      tagPressure.length ? `- Whole-manuscript overused ending families: ${tagPressure.join(', ')}. This chapter must move away from them.` : '- Whole-manuscript ending families are still under review; keep this chapter distinct from neighbors.',
      `- Required replacement final image: ${preferredEnding.text}; if it conflicts with continuity, use ${secondaryEnding.text}.`,
      `- Keep this chapter's discovery/cost/relationship shift intact: discovery=${role.discovery || 'preserve current discovery'}; cost=${role.cost || 'preserve current cost'}; relationshipShift=${role.relationshipShift || 'preserve current relationship change'}.`,
      '- The final paragraph must contain one concrete action by a named/established character and one changed object/place state. It must not be a mood summary, silence, looking away, desk-left object, closing door, or dawn-light closure.',
      '- Before returning, compare the final 300 characters against the previous and next chapter endings and make the movement visibly different.',
    ];
    output.set(chapterDraft.chapter, lines.join('\n'));
  });
  return output;
}

function buildEndingTagDistribution(chapters) {
  const catalog = getEndingTagCatalog();
  return catalog.map(tag => {
    const taggedChapters = chapters
      .filter(chapter => classifyEndingTags(chapter.body).includes(tag))
      .map(chapter => chapter.chapter);
    return { tag, count: taggedChapters.length, chapters: taggedChapters };
  });
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function selectEndingAlternative(index, auditPass, forbiddenTags = []) {
  const forbidden = new Set(forbiddenTags);
  const safe = ENDING_ALTERNATIVES.filter(item => !(item.tags || []).some(tag => forbidden.has(tag)));
  const pool = safe.length ? safe : ENDING_ALTERNATIVES;
  return pool[(index + auditPass) % pool.length];
}

function describeEndingTagAvoidance(tags = []) {
  if (!tags.length) return 'no hard tag this pass; still make the ending visibly different from neighboring chapters.';
  return tags.map(tag => ENDING_TAG_AVOIDANCE[tag] || `${tag}: close through a specific irreversible action, not atmosphere.`).join(' / ');
}

const ENDING_ALTERNATIVES = [
  { text: 'a character performs a practical task that costs them comfort, status, or safety', tags: [] },
  { text: 'two characters exchange an unfinished but specific line while doing a shared task', tags: [] },
  { text: 'the protagonist refuses or accepts something through a visible gesture that cannot be mistaken for mere hesitation', tags: ['looking'] },
  { text: 'a small physical mistake remains visible and forces the next chapter forward', tags: [] },
  { text: 'the final image centers on labor, repair, carrying, folding, binding, washing, counting, or sorting rather than silence or gaze', tags: [] },
  { text: 'a hand changes the position of a necessary object, and another character notices the change without explaining it', tags: ['object_left'] },
  { text: 'a written mark, erased line, folded page, or repaired edge becomes physically different from the previous scene', tags: ['object_left'] },
  { text: 'a place changes state through a concrete action: water stopped, curtain tied, floor cleaned, or light switched off', tags: ['dawn_light'] },
  { text: 'a previously mentioned object is used for a new purpose, showing the chapter consequence without summary', tags: ['object_left'] },
  { text: 'a character leaves a trace that another character must deal with, without using door or exit imagery as the final beat', tags: ['door_or_exit'] },
];

const ENDING_TAG_AVOIDANCE = {
  silence: 'silence: include an audible spoken line, impact sound, or practical instruction in the final beat; do not close on no one speaking',
  slow_motion: 'slow_motion: use a decisive action with an immediate consequence; do not slow the moment into atmosphere',
  looking: 'looking: do not close on gaze, eyes, looking away, or watching; close on hands, work, speech, or changed circumstances',
  object_left: 'object_left: do not close by placing or leaving an item on a desk/table; if an object appears, it must be actively used',
  door_or_exit: 'door_or_exit: do not close with a door, exit, leaving, or threshold image',
  dawn_light: 'dawn_light: do not close with dawn, morning, light, sky, or weather as the emotional answer',
};

function extractText(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value.text === 'string') return value.text;
  return '';
}
