import { countChars } from './localValidator.js';

const JOURNAL_VERSION = 2;
const MANUSCRIPT_REPLAY_VERSION = 3;
const JOURNAL_PREFIX = 'story-maker.longdev.journal.v501';
const SECRET_KEY_PATTERN = /(api|key|token|secret|credential|password)/i;
const SECRET_VALUE_PATTERN = /(AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,})/g;

const memoryStore = new Map();

export function journalKey(provider = 'gemini') {
  return `${JOURNAL_PREFIX}.${provider === 'openai' ? 'openai' : 'gemini'}`;
}

export function createRunJournal({
  provider = 'gemini',
  stage = 'm1',
  runId,
  premiseText = '',
  options = {},
  storage,
} = {}) {
  const normalizedProvider = provider === 'openai' ? 'openai' : 'gemini';
  const adapter = storageAdapter(storage);
  const key = journalKey(normalizedProvider);
  const existing = readStoredJournal(adapter, key);
  const data = isReusableJournal(existing, normalizedProvider, stage)
    ? existing
    : createEmptyJournal({
        provider: normalizedProvider,
        stage,
        runId,
        premiseText,
        options,
      });

  if (runId && !data.runId) data.runId = runId;
  data.stage = stage || data.stage || 'm1';
  data.provider = normalizedProvider;
  data.updatedAt = new Date().toISOString();
  persist(adapter, key, data);

  return journalApi(adapter, key, data);
}

export function loadRunJournal(provider = 'gemini', storage) {
  const adapter = storageAdapter(storage);
  const key = journalKey(provider);
  const data = readStoredJournal(adapter, key);
  return data ? journalApi(adapter, key, data) : null;
}

export function clearRunJournal(provider = 'gemini', storage) {
  storageAdapter(storage).removeItem(journalKey(provider));
}

export function scrubJournal(value) {
  if (Array.isArray(value)) return value.map(item => scrubJournal(item));
  if (!value || typeof value !== 'object') {
    return scrubScalar(value);
  }
  const clean = {};
  for (const [key, item] of Object.entries(value)) {
    if (SECRET_KEY_PATTERN.test(key)) continue;
    clean[key] = scrubJournal(item);
  }
  return clean;
}

function journalApi(adapter, key, data) {
  const api = {
    key,
    get data() {
      return data;
    },
    get runId() {
      return data.runId;
    },
    get provider() {
      return data.provider;
    },
    get stage() {
      return data.stage;
    },
    toJSON() {
      return scrubJournal(data);
    },
    markRunning(meta = {}) {
      data.status = 'running';
      recordEvent(data, 'running', meta);
      save();
    },
    markDone(meta = {}) {
      data.status = 'done';
      data.error = null;
      recordEvent(data, 'done', meta);
      save();
    },
    markPaused(error, meta = {}) {
      data.status = 'paused';
      data.error = String(error?.message || error || '');
      recordEvent(data, 'paused', { ...meta, error: data.error });
      save();
    },
    recordScene(sceneId, body, meta = {}) {
      const id = String(sceneId || meta.scene?.id || '');
      if (!id) return null;
      const entry = makeAcceptedEntry({
        id,
        body,
        provider: meta.provider,
        validation: meta.validation,
        meta,
        extra: {
          sceneId: id,
          chapter: meta.chapter || meta.scene?.chapter || 1,
        },
      });
      data.records.scenes[id] = entry;
      recordEvent(data, 'scene', { id, chapter: entry.chapter, charCount: entry.charCount });
      save();
      return entry;
    },
    getScene(sceneId) {
      return data.records.scenes[String(sceneId || '')] || null;
    },
    recordChapterEdit(chapterNumber, body, meta = {}) {
      const chapter = Number(chapterNumber || meta.chapter?.num || meta.chapter || 1);
      const entry = makeAcceptedEntry({
        id: String(chapter),
        body,
        provider: meta.provider,
        validation: meta.validation,
        meta,
        extra: { chapter },
      });
      data.records.chapterEdits[String(chapter)] = entry;
      recordEvent(data, 'chapter-edit', { chapter, charCount: entry.charCount });
      save();
      return entry;
    },
    getChapterEdit(chapterNumber) {
      return data.records.chapterEdits[String(chapterNumber || '')] || null;
    },
    recordManuscriptPlan(body, meta = {}) {
      const entry = makeAcceptedEntry({
        id: 'MS-PLAN',
        body,
        provider: meta.provider,
        validation: meta.validation,
        meta,
        extra: { manuscriptReplayVersion: MANUSCRIPT_REPLAY_VERSION },
      });
      data.records.manuscriptPlan = entry;
      recordEvent(data, 'manuscript-plan', { charCount: entry.charCount });
      save();
      return entry;
    },
    getManuscriptPlan() {
      const entry = data.records.manuscriptPlan || null;
      return isCurrentManuscriptReplay(entry) ? entry : null;
    },
    recordChapterPolish(chapterNumber, body, meta = {}) {
      const chapter = Number(chapterNumber || meta.chapter?.num || meta.chapter || 1);
      const entry = makeAcceptedEntry({
        id: String(chapter),
        body,
        provider: meta.provider,
        validation: meta.validation,
        meta,
        extra: { chapter, manuscriptReplayVersion: MANUSCRIPT_REPLAY_VERSION },
      });
      data.records.chapterPolishes[String(chapter)] = entry;
      recordEvent(data, 'chapter-polish', { chapter, charCount: entry.charCount });
      save();
      return entry;
    },
    getChapterPolish(chapterNumber) {
      const entry = data.records.chapterPolishes[String(chapterNumber || '')] || null;
      return isCurrentManuscriptReplay(entry) ? entry : null;
    },
    clear() {
      adapter.removeItem(key);
    },
  };

  function save() {
    data.updatedAt = new Date().toISOString();
    persist(adapter, key, data);
  }

  return api;
}

function isCurrentManuscriptReplay(entry) {
  return Boolean(entry && entry.manuscriptReplayVersion === MANUSCRIPT_REPLAY_VERSION);
}

function makeAcceptedEntry({ id, body, provider, validation, meta = {}, extra = {} }) {
  const text = String(body || '').trim();
  return scrubJournal({
    id,
    body: text,
    provider,
    validation: validation || { ok: true, fatal: false, repairRequired: false, issues: [], metrics: { charCount: countChars(text) } },
    charCount: countChars(text),
    acceptedAt: new Date().toISOString(),
    attempt: meta.attempt,
    repaired: Boolean(meta.repaired),
    preserved: Boolean(meta.preserved),
    usedModel: meta.usedModel,
    ...extra,
  });
}

function createEmptyJournal({ provider, stage, runId, premiseText, options }) {
  const now = new Date().toISOString();
  return scrubJournal({
    schemaVersion: JOURNAL_VERSION,
    provider,
    stage,
    runId: runId || `ln-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: 'created',
    startedAt: now,
    updatedAt: now,
    premiseHash: hashText(premiseText),
    options: scrubJournal({
      stage,
      premiseText,
      runId,
      title: options.title,
      chapters: options.chapters,
      scenesPerChapter: options.scenesPerChapter,
      targetChars: options.targetChars,
      editorialPass: options.editorialPass,
      manuscriptEditorialPass: options.manuscriptEditorialPass,
    }),
    records: {
      scenes: {},
      chapterEdits: {},
      manuscriptPlan: null,
      chapterPolishes: {},
    },
    events: [],
    error: null,
  });
}

function isReusableJournal(data, provider, stage) {
  return Boolean(
    data &&
    data.schemaVersion === JOURNAL_VERSION &&
    data.provider === provider &&
    data.stage === stage &&
    data.status !== 'done' &&
    data.records
  );
}

function recordEvent(data, type, meta = {}) {
  data.events = Array.isArray(data.events) ? data.events : [];
  data.events.push(scrubJournal({
    type,
    at: new Date().toISOString(),
    ...meta,
  }));
  if (data.events.length > 400) data.events = data.events.slice(-400);
}

function persist(adapter, key, data) {
  adapter.setItem(key, JSON.stringify(scrubJournal(data)));
}

function readStoredJournal(adapter, key) {
  try {
    const raw = adapter.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storageAdapter(storage) {
  if (storage && typeof storage.getItem === 'function') return storage;
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  return {
    getItem: key => memoryStore.get(key) || null,
    setItem: (key, value) => memoryStore.set(key, String(value)),
    removeItem: key => memoryStore.delete(key),
  };
}

function scrubScalar(value) {
  if (typeof value !== 'string') return value;
  return value.replace(SECRET_VALUE_PATTERN, '[secret]');
}

function hashText(text) {
  let hash = 5381;
  for (const char of String(text || '')) {
    hash = ((hash << 5) + hash) ^ char.charCodeAt(0);
  }
  return (hash >>> 0).toString(36);
}
