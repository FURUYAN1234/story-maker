import { countChars, validateSceneDraft } from './localValidator.js';
import { createRunLog } from './runLog.js';
import { createSceneLedger } from './sceneLedger.js';
import { appendSceneFact } from './storyBible.js';

export function createLongNovelState({ runId, bible, outline, provider } = {}) {
  return {
    runId: runId || createRunLog().runId,
    status: 'idle',
    provider: provider || 'gemini',
    bible,
    outline,
    ledger: createSceneLedger(),
    draftScenes: [],
    canonScenes: [],
    chapterDrafts: [],
    manuscriptEditorial: {
      plan: '',
      validation: null,
      chapterPolishes: [],
      completed: false,
    },
    runLog: createRunLog(runId),
    error: null,
  };
}

export function startRun(state) {
  state.status = 'generating';
  state.startedAt = new Date().toISOString();
  state.runLog.record({ verdict: 'start', provider: state.provider });
  return state;
}

export function commitScene(state, scene, text, validation, provider) {
  const local = validation || validateSceneDraft(text, scene.validationContext || {});
  if (!local.ok) {
    throw new Error(`scene validation failed: ${local.issues.map(issue => issue.code).join(', ')}`);
  }
  const body = String(text || '').trim();
  const entry = {
    sceneId: scene.id,
    chapter: scene.chapter || 1,
    provider: provider || state.provider,
    charCount: countChars(body),
    exitState: scene.exitState || '',
    attemptCount: scene.attemptCount || 1,
  };
  state.ledger.commit(entry);
  state.draftScenes.push({ scene, body, validation: local });
  state.canonScenes.push({ sceneId: scene.id, chapter: scene.chapter || 1, body });
  state.bible = appendSceneFact(state.bible, scene.id, scene.exitState || `${scene.id} completed`);
  return entry;
}

export function commitChapterDraft(state, chapter, text, validation, provider) {
  const body = String(text || '').trim();
  if (!body) throw new Error(`chapter draft is empty: ${chapter?.num || ''}`);
  const entry = {
    chapter: chapter.num || 1,
    provider: provider || state.provider,
    body,
    charCount: countChars(body),
    validation,
    committedAt: new Date().toISOString(),
  };
  state.chapterDrafts = (state.chapterDrafts || []).filter(item => item.chapter !== entry.chapter);
  state.chapterDrafts.push(entry);
  state.chapterDrafts.sort((a, b) => a.chapter - b.chapter);
  return entry;
}

export function commitManuscriptEditorialPlan(state, plan, validation, provider) {
  state.manuscriptEditorial = {
    ...(state.manuscriptEditorial || {}),
    plan: String(plan || '').trim(),
    validation,
    provider: provider || state.provider,
    plannedAt: new Date().toISOString(),
    completed: false,
  };
  return state.manuscriptEditorial;
}

export function commitManuscriptChapterPolish(state, chapter, text, validation, provider) {
  const chapterNumber = chapter?.num || chapter?.chapter || 1;
  const entry = {
    chapter: chapterNumber,
    provider: provider || state.provider,
    charCount: countChars(text),
    validation,
    polishedAt: new Date().toISOString(),
  };
  state.manuscriptEditorial = {
    plan: '',
    validation: null,
    chapterPolishes: [],
    completed: false,
    ...(state.manuscriptEditorial || {}),
  };
  state.manuscriptEditorial.chapterPolishes = (state.manuscriptEditorial.chapterPolishes || [])
    .filter(item => item.chapter !== chapterNumber);
  state.manuscriptEditorial.chapterPolishes.push(entry);
  state.manuscriptEditorial.chapterPolishes.sort((a, b) => a.chapter - b.chapter);
  return entry;
}

export function completeManuscriptEditorial(state) {
  state.manuscriptEditorial = {
    plan: '',
    validation: null,
    chapterPolishes: [],
    ...(state.manuscriptEditorial || {}),
    completed: true,
    completedAt: new Date().toISOString(),
  };
  return state.manuscriptEditorial;
}

export function pauseRun(state, error) {
  state.status = 'paused';
  state.error = error ? String(error.message || error) : null;
  state.runLog.pause({ error: state.error });
  return state;
}

export function completeRun(state) {
  state.status = 'done';
  state.completedAt = new Date().toISOString();
  state.runLog.record({ verdict: 'done', sceneCount: state.canonScenes.length });
  return state;
}
