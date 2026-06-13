import { runLongNovelDryRun } from './engine.js';
import { LONG_NOVEL_STAGES } from './outlinePlanner.js';
import {
  apiKeyProvider,
  isRealApiKey,
  normalizeApiKey,
  sanitizeApiSession,
} from '../apiSession.js';
import { readLongDevApiSession } from './devApiSession.js';
import { createRunJournal, loadRunJournal, clearRunJournal } from './runJournal.js';

const ACTIVE_RUN_KEY = 'story-maker.longdev.activeRun.v501';
const SNAPSHOT_KEY = 'story-maker.longdev.lastSnapshot.v501';
const RUN_LOCK_TTL_MS = 4 * 60 * 60 * 1000;

export function installLongNovelDevPanel() {
  injectStyle();
  installUnloadGuard();

  const outputPanel = document.getElementById('output-panel') || document.body;
  let panel = document.getElementById('longdev-panel');
  if (!panel) {
    panel = document.createElement('section');
    panel.id = 'longdev-panel';
    panel.innerHTML = `
      <div class="longdev-head">
        <div>
          <strong>Long Novel Dev Runner</strong>
          <span>localhost + ?longdev=1 only / public menu unchanged</span>
        </div>
        <div class="longdev-export-actions">
          <button type="button" id="btn-longdev-export-txt" class="btn-longdev-export" disabled title="Save the latest completed or snapshotted manuscript as TXT.">Save TXT</button>
          <button type="button" id="btn-longdev-export-json" class="btn-longdev-export" disabled title="Save the latest result or snapshot as JSON.">Save JSON</button>
          <button type="button" id="btn-longdev-export-log" class="btn-longdev-export" disabled title="Save the visible or snapshotted log as TXT.">Save Log</button>
        </div>
      </div>
      <div class="longdev-stage-grid">
        ${renderStageButtons('m1')}
        ${renderStageButtons('m2')}
        ${renderStageButtons('m3')}
        ${renderStageButtons('m4')}
      </div>
      <textarea id="longdev-premise" spellcheck="false">A long-form verification story about a protagonist finding a small trace of an old promise and trying, over one night, to repair a nearly broken relationship.</textarea>
      <div id="longdev-status" class="longdev-status">ready</div>
      <pre id="longdev-log" class="longdev-log"></pre>
      <div id="longdev-summary" class="longdev-summary"></div>
    `;
    outputPanel.appendChild(panel);

    panel.addEventListener('click', event => {
      const button = event.target?.closest?.('button[data-longdev-run]');
      if (!button) return;
      runFromPanel(button.dataset.longdevRun, button.dataset.longdevStage || 'm1');
    });

    panel.querySelector('#btn-longdev-export-txt')?.addEventListener('click', () => {
      const exportable = getExportableSnapshot();
      if (!exportable.manuscripts.length) return;
      exportable.manuscripts.forEach(item => downloadFile(item.text, item.name, 'txt'));
    });

    panel.querySelector('#btn-longdev-export-json')?.addEventListener('click', () => {
      const exportable = getExportableSnapshot();
      if (!exportable.json) return;
      downloadFile(JSON.stringify(exportable.json, null, 2), exportable.jsonName, 'json');
    });

    panel.querySelector('#btn-longdev-export-log')?.addEventListener('click', () => {
      const log = document.getElementById('longdev-log');
      const snapshot = readSnapshot();
      const text = log?.textContent || snapshot?.logText || '';
      if (!text.trim()) return;
      downloadFile(text, 'longdev_run_log', 'txt');
    });
  }

  const snapshot = readSnapshot();
  if (snapshot) {
    window.__storyMakerLongDevLastSnapshot = snapshot;
    hydrateSnapshotStatus(snapshot);
  }
  installLongNovelDevApi();
  hydrateJournalStatus();
  applyUrlPinToButtons();
  updateExportButtons();
}

function installLongNovelDevApi() {
  window.__storyMakerLongDev = {
    run: (provider = 'gemini', stage = 'm1') => runFromPanel(provider, stage),
    getSession: () => sanitizeApiSession(readLongDevApiSession()),
    getLastResult: () => window.__storyMakerLongDevLastResult || null,
    getSnapshot: () => readSnapshot(),
    getActiveRun: () => readActiveRun(),
    getJournal: provider => loadRunJournal(provider === 'openai' ? 'openai' : 'gemini')?.toJSON() || null,
    clearJournal: provider => clearRunJournal(provider === 'openai' ? 'openai' : 'gemini'),
    clearSnapshot,
  };
}

async function runFromPanel(provider, stage = 'm1') {
  const status = document.getElementById('longdev-status');
  const log = document.getElementById('longdev-log');
  const summary = document.getElementById('longdev-summary');
  const buttons = [...document.querySelectorAll('#longdev-panel button')];
  const providers = provider === 'both' ? ['gemini', 'openai'] : [provider === 'openai' ? 'openai' : 'gemini'];
  const stageConfig = LONG_NOVEL_STAGES[stage] || LONG_NOVEL_STAGES.m1;
  const pin = readUrlPin();
  if (pin && (provider !== pin.provider || stage !== pin.stage)) {
    const message = `blocked by URL pin: only ${pin.provider} ${pin.stage} may run in this tab`;
    if (status) status.textContent = message;
    appendLog(log, message);
    applyUrlPinToButtons();
    return [];
  }
  const runToken = createRunToken();
  const lock = acquireRunLock({
    token: runToken,
    provider,
    stage,
    providers,
    label: stageConfig.label,
  });

  if (!lock.ok) {
    const active = lock.active;
    const message = `blocked: active ${active?.provider || 'unknown'} ${active?.stage || ''} run is still locked`;
    if (status) status.textContent = message;
    appendLog(log, message);
    return [];
  }

  const results = [];
  buttons.forEach(button => { button.disabled = true; });
  setGlobalControlsDisabled(true);
  if (log) log.textContent = '';
  if (summary) summary.textContent = '';

  persistSnapshot({
    token: runToken,
    provider,
    stage,
    providers,
    status: 'started',
    logText: '',
  });

  try {
    for (const currentProvider of providers) {
      const apiKey = getApiKey(currentProvider);
      if (!apiKey) throw new Error(`${currentProvider} API key is not available in the current browser session`);
      if (status) status.textContent = `${currentProvider}: ${stageConfig.label} running`;
      const journal = createRunJournal({
        provider: currentProvider,
        stage,
        premiseText: document.getElementById('longdev-premise')?.value || '',
        options: { provider: currentProvider, stage },
      });
      const result = await runLongNovelDryRun({
        provider: currentProvider,
        stage,
        apiKey,
        premiseText: document.getElementById('longdev-premise')?.value || '',
        timeoutMs: stageConfig.timeoutMs,
        maxTokens: stageConfig.maxTokens,
        journal,
        onEvent: event => {
          const line = formatEvent(event);
          appendLog(log, line);
          touchRunLock(runToken);
          persistSnapshot({
            token: runToken,
            provider: currentProvider,
            stage,
            providers,
            status: 'running',
            event,
            logText: log?.textContent || '',
          });
        },
        onSnapshot: snapshot => {
          touchRunLock(runToken);
          persistSnapshot({
            token: runToken,
            provider: currentProvider,
            stage,
            providers,
            status: 'running',
            snapshot,
            manuscript: snapshot.manuscript,
            evaluation: snapshot.evaluation,
            qualityAudit: snapshot.qualityAudit,
            runLog: snapshot.runLog,
            logText: log?.textContent || '',
          });
        },
      });
      const packed = {
        provider: currentProvider,
        stage,
        manuscript: result.manuscript,
        evaluation: result.evaluation,
        qualityAudit: result.qualityAudit,
        runLog: result.runLog,
        summary: summarizeResult(result),
      };
      results.push(packed);
      renderOutput(currentProvider, stage, result);
      appendLog(log, `${currentProvider}: done ${result.evaluation.totalChars} chars`);
      persistSnapshot({
        token: runToken,
        provider: currentProvider,
        stage,
        providers,
        status: 'provider-done',
        ...packed,
        logText: log?.textContent || '',
      });
    }

    window.__storyMakerLongDevLastResult = results;
    if (summary) summary.innerHTML = results.map(result => renderSummary(result.provider, result.stage, result.summary)).join('');
    if (status) status.textContent = `${stageConfig.label}: done`;
    persistSnapshot({
      token: runToken,
      provider,
      stage,
      providers,
      status: 'done',
      results,
      logText: log?.textContent || '',
    });
    return results;
  } catch (error) {
    if (status) status.textContent = `paused: ${error.message || error}`;
    appendLog(log, `ERROR: ${error.message || error}`);
    persistSnapshot({
      token: runToken,
      provider,
      stage,
      providers,
      status: 'paused',
      error: String(error.message || error),
      logText: log?.textContent || '',
    });
    throw error;
  } finally {
    releaseRunLock(runToken);
    setGlobalControlsDisabled(false);
    buttons.forEach(button => { button.disabled = false; });
    applyUrlPinToButtons();
    updateExportButtons();
  }
}

function renderStageButtons(stage) {
  const config = LONG_NOVEL_STAGES[stage];
  return `
    <div class="longdev-stage">
      <div class="longdev-stage-title">${config.label}</div>
      <div class="longdev-actions">
        <button type="button" data-longdev-run="gemini" data-longdev-stage="${stage}">Gemini</button>
        <button type="button" data-longdev-run="openai" data-longdev-stage="${stage}">OpenAI</button>
        <button type="button" data-longdev-run="both" data-longdev-stage="${stage}">Both</button>
      </div>
    </div>
  `;
}

function renderOutput(provider, stage, result) {
  const output = document.getElementById('output');
  const counter = document.getElementById('char-counter');
  const tagRow = document.getElementById('tag-row');
  if (output) {
    output.className = 'output-box text-selectable';
    output.textContent = result.manuscript;
  }
  if (counter) counter.textContent = `${result.evaluation.totalChars.toLocaleString()} chars`;
  if (tagRow) {
    tagRow.innerHTML = [
      `<span class="tag">${provider === 'openai' ? 'OpenAI' : 'Gemini'}</span>`,
      '<span class="tag">longdev</span>',
      `<span class="tag">${stage}</span>`,
      `<span class="tag">${result.evaluation.chapterCount}/${result.evaluation.expectedChapterCount} chapters</span>`,
      `<span class="tag">${result.evaluation.sceneCount}/${result.evaluation.expectedSceneCount} scenes</span>`,
      `<span class="tag">${result.evaluation.chapterEditCount || 0} edits</span>`,
      `<span class="tag">${result.evaluation.manuscriptEditCount || 0} final edits</span>`,
    ].join('');
  }
}

function summarizeResult(result) {
  return {
    ok: result.evaluation.ok,
    totalChars: result.evaluation.totalChars,
    sceneCount: result.evaluation.sceneCount,
    expectedSceneCount: result.evaluation.expectedSceneCount,
    chapterCount: result.evaluation.chapterCount,
    expectedChapterCount: result.evaluation.expectedChapterCount,
    dialogueCount: result.evaluation.dialogueCount,
    textureSignals: result.evaluation.textureSignals,
    hasFooter: result.evaluation.hasFooter,
    footerCount: result.evaluation.footerCount,
    editorialRequired: result.evaluation.editorialRequired,
    manuscriptEditorialRequired: result.evaluation.manuscriptEditorialRequired,
    manuscriptEditCount: result.evaluation.manuscriptEditCount,
    manuscriptEditorialCompleted: result.evaluation.manuscriptEditorialCompleted,
    chapterEditCount: result.evaluation.chapterEditCount,
    runLog: result.runLog.summary,
    qualityAudit: result.qualityAudit,
  };
}

function renderSummary(provider, stage, result) {
  const mark = result.ok ? 'PASS' : 'CHECK';
  const chapterEdits = `${result.chapterEditCount || 0}${result.editorialRequired ? `/${result.expectedChapterCount}` : ''}`;
  const finalEdits = `${result.manuscriptEditCount || 0}${result.manuscriptEditorialRequired ? `/${result.expectedChapterCount}` : ''}`;
  const audit = result.qualityAudit ? ` / audit ${result.qualityAudit.score}${result.qualityAudit.ok ? '' : ` (${result.qualityAudit.warnings.length} warnings)`}` : '';
  return `<div><strong>${provider} ${stage}: ${mark}</strong> / ${result.totalChars} chars / chapters ${result.chapterCount}/${result.expectedChapterCount} / scenes ${result.sceneCount}/${result.expectedSceneCount} / chapter edits ${chapterEdits} / final edits ${finalEdits} / dialogue ${result.dialogueCount} / texture ${result.textureSignals} / footer ${result.footerCount}${audit}</div>`;
}

function appendLog(log, line) {
  if (!log) return;
  log.textContent += `${new Date().toLocaleTimeString()} ${line}\n`;
  log.scrollTop = log.scrollHeight;
}

function formatEvent(event) {
  if (event.type === 'start') return `${event.provider} ${event.stageId}: start ${event.chapterCount} chapters / ${event.sceneCount} scenes`;
  if (event.type === 'chapter-start') return `${event.provider} chapter ${event.chapter} start`;
  if (event.type === 'chapter-edit-replay') return `${event.provider} chapter ${event.chapter} editorial replayed ${event.charCount} chars`;
  if (event.type === 'chapter-edit-start') return `${event.provider} chapter ${event.chapter} editorial pass attempt ${event.attempt}`;
  if (event.type === 'chapter-edit-accept') return `${event.provider} chapter ${event.chapter} editorial accepted ${event.charCount} chars${event.repaired ? ' after repair' : ''}${event.usedModel ? ` (${event.usedModel})` : ''}`;
  if (event.type === 'chapter-edit-repair') return `${event.provider} chapter ${event.chapter} editorial repair: ${(event.reasons || []).join(', ')}`;
  if (event.type === 'chapter-edit-error') return `${event.provider} chapter ${event.chapter} editorial error: ${event.error}`;
  if (event.type === 'chapter-done') return `${event.provider} chapter ${event.chapter} done`;
  if (event.type === 'manuscript-edit-start') return `${event.provider} whole-manuscript editorial start ${event.chapterCount} chapters`;
  if (event.type === 'manuscript-plan-replay') return `${event.provider} whole-manuscript plan replayed ${event.charCount} chars`;
  if (event.type === 'manuscript-plan-accept') return `${event.provider} whole-manuscript plan accepted ${event.charCount} chars${event.usedModel ? ` (${event.usedModel})` : ''}`;
  if (event.type === 'manuscript-plan-reject') return `${event.provider} whole-manuscript plan rejected: ${(event.reasons || []).join(', ')}`;
  if (event.type === 'manuscript-plan-error') return `${event.provider} whole-manuscript plan error: ${event.error}`;
  if (event.type === 'manuscript-chapter-polish-start') return `${event.provider} final polish chapter ${event.chapter} attempt ${event.attempt}`;
  if (event.type === 'manuscript-chapter-polish-replay') return `${event.provider} final polish chapter ${event.chapter} replayed ${event.charCount} chars`;
  if (event.type === 'manuscript-chapter-polish-repair') return `${event.provider} final polish chapter ${event.chapter} repair: ${(event.reasons || []).join(', ')}`;
  if (event.type === 'manuscript-chapter-polish-accept') return `${event.provider} final polish chapter ${event.chapter} accepted ${event.charCount} chars${event.repaired ? ' after repair' : ''}${event.usedModel ? ` (${event.usedModel})` : ''}`;
  if (event.type === 'manuscript-chapter-polish-error') return `${event.provider} final polish chapter ${event.chapter} error: ${event.error}`;
  if (event.type === 'manuscript-edit-done') return `${event.provider} whole-manuscript editorial done ${event.chapterCount} chapters`;
  if (event.type === 'scene-start') return `${event.provider} ${event.sceneId} attempt ${event.attempt}`;
  if (event.type === 'scene-replay') return `${event.provider} ${event.sceneId} replayed ${event.charCount} chars`;
  if (event.type === 'scene-accept') return `${event.provider} ${event.sceneId} accepted ${event.charCount} chars${event.repaired ? ' after repair' : ''}${event.usedModel ? ` (${event.usedModel})` : ''}`;
  if (event.type === 'scene-repair') return `${event.provider} ${event.sceneId} repair: ${(event.reasons || []).join(', ')}`;
  if (event.type === 'fallback') return `${event.provider} fallback ${event.model}`;
  if (event.type === 'paused') return `${event.provider} paused ${event.sceneId}: ${event.error}`;
  if (event.type === 'done') return `${event.provider} done`;
  return `${event.provider || ''} ${event.type || 'event'}`.trim();
}

function getApiKey(provider) {
  const normalizedProvider = provider === 'openai' ? 'openai' : 'gemini';
  const visible = normalizeApiKey(document.getElementById('apikey')?.value);
  if (isRealApiKey(visible) && apiKeyProvider(visible) === normalizedProvider) return visible;
  const session = readLongDevApiSession();
  return normalizeApiKey(normalizedProvider === 'openai' ? session.openaiKey : session.geminiKey);
}

function acquireRunLock(run) {
  const active = readActiveRun();
  if (active && !isStaleActiveRun(active) && active.token !== run.token) return { ok: false, active };
  const locked = {
    ...run,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  window.__storyMakerLongDevActiveToken = run.token;
  safeSetStorage(ACTIVE_RUN_KEY, locked);
  return { ok: true, active: locked };
}

function touchRunLock(token) {
  const active = readActiveRun();
  if (!active || active.token !== token) return;
  safeSetStorage(ACTIVE_RUN_KEY, { ...active, updatedAt: new Date().toISOString() });
}

function releaseRunLock(token) {
  const active = readActiveRun();
  if (active && active.token === token) safeRemoveStorage(ACTIVE_RUN_KEY);
  if (window.__storyMakerLongDevActiveToken === token) window.__storyMakerLongDevActiveToken = null;
}

function readActiveRun() {
  const active = safeGetStorage(ACTIVE_RUN_KEY);
  if (!active) return null;
  if (isStaleActiveRun(active)) {
    safeRemoveStorage(ACTIVE_RUN_KEY);
    return null;
  }
  return active;
}

function isStaleActiveRun(active) {
  const stamp = Date.parse(active?.updatedAt || active?.startedAt || '');
  return !stamp || Date.now() - stamp > RUN_LOCK_TTL_MS;
}

function persistSnapshot(snapshot) {
  const clean = {
    savedAt: new Date().toISOString(),
    token: snapshot.token,
    provider: snapshot.provider,
    stage: snapshot.stage,
    providers: snapshot.providers,
    status: snapshot.status,
    event: snapshot.event,
    detail: snapshot.snapshot?.detail,
    manuscript: snapshot.manuscript,
    evaluation: snapshot.evaluation,
    qualityAudit: snapshot.qualityAudit,
    runLog: snapshot.runLog,
    resultSummary: snapshot.resultSummary,
    results: snapshot.results,
    error: snapshot.error,
    logText: snapshot.logText,
  };
  window.__storyMakerLongDevLastSnapshot = clean;
  safeSetStorage(SNAPSHOT_KEY, clean);
  updateExportButtons();
}

function readSnapshot() {
  return window.__storyMakerLongDevLastSnapshot || safeGetStorage(SNAPSHOT_KEY);
}

function clearSnapshot() {
  window.__storyMakerLongDevLastSnapshot = null;
  safeRemoveStorage(SNAPSHOT_KEY);
  updateExportButtons();
}

function hydrateSnapshotStatus(snapshot) {
  const status = document.getElementById('longdev-status');
  const summary = document.getElementById('longdev-summary');
  if (status && snapshot.status && snapshot.status !== 'started') {
    status.textContent = `snapshot: ${snapshot.provider || 'run'} ${snapshot.stage || ''} ${snapshot.status}`;
  }
  if (summary && snapshot.evaluation) {
    summary.textContent = `Snapshot saved: ${snapshot.evaluation.totalChars || 0} chars / ${snapshot.evaluation.chapterCount || 0} chapters`;
  }
}

function hydrateJournalStatus() {
  const status = document.getElementById('longdev-status');
  if (!status) return;
  const pin = readUrlPin();
  const provider = pin?.provider || 'gemini';
  const journal = loadRunJournal(provider)?.toJSON();
  if (!journal || journal.status === 'done') return;
  const sceneCount = Object.keys(journal.records?.scenes || {}).length;
  const chapterCount = Object.keys(journal.records?.chapterEdits || {}).length;
  const polishCount = Object.keys(journal.records?.chapterPolishes || {}).length;
  status.textContent = `journal: ${provider} ${journal.stage || ''} ${journal.status || 'saved'} / scenes ${sceneCount} / chapters ${chapterCount} / final ${polishCount}`;
}

function readUrlPin() {
  try {
    const params = new URLSearchParams(window.location.search || '');
    const raw = params.get('pin') || '';
    const [providerRaw, stageRaw] = raw.split(':');
    const provider = providerRaw === 'openai' ? 'openai' : providerRaw === 'gemini' ? 'gemini' : '';
    const stage = LONG_NOVEL_STAGES[stageRaw] ? stageRaw : '';
    return provider && stage ? { provider, stage } : null;
  } catch {
    return null;
  }
}

function applyUrlPinToButtons() {
  const pin = readUrlPin();
  const buttons = [...document.querySelectorAll('#longdev-panel button[data-longdev-run]')];
  for (const button of buttons) {
    if (!pin) {
      button.title = '';
      continue;
    }
    const allowed = button.dataset.longdevRun === pin.provider && button.dataset.longdevStage === pin.stage;
    button.disabled = !allowed || Boolean(readActiveRun());
    button.title = allowed ? `Pinned run: ${pin.provider} ${pin.stage}` : `Disabled by URL pin: ${pin.provider}:${pin.stage}`;
  }
}

function getExportableSnapshot() {
  const results = window.__storyMakerLongDevLastResult;
  if (results?.length) {
    return {
      manuscripts: results.map(res => ({ name: `${res.provider}_manuscript_${res.stage}`, text: res.manuscript || '' })).filter(item => item.text),
      json: results,
      jsonName: `longdev_result_${results[0].stage}`,
    };
  }
  const snapshot = readSnapshot();
  const manuscripts = [];
  if (snapshot?.results?.length) {
    for (const res of snapshot.results) {
      if (res.manuscript) manuscripts.push({ name: `${res.provider}_manuscript_${res.stage}`, text: res.manuscript });
    }
  } else if (snapshot?.manuscript) {
    manuscripts.push({ name: `${snapshot.provider || 'provider'}_manuscript_${snapshot.stage || 'snapshot'}`, text: snapshot.manuscript });
  }
  return {
    manuscripts,
    json: snapshot || null,
    jsonName: `longdev_snapshot_${snapshot?.stage || 'run'}`,
  };
}

function updateExportButtons() {
  const exportable = getExportableSnapshot();
  const log = document.getElementById('longdev-log');
  const txtBtn = document.getElementById('btn-longdev-export-txt');
  const jsonBtn = document.getElementById('btn-longdev-export-json');
  const logBtn = document.getElementById('btn-longdev-export-log');
  if (txtBtn) txtBtn.disabled = exportable.manuscripts.length === 0;
  if (jsonBtn) jsonBtn.disabled = !exportable.json;
  if (logBtn) logBtn.disabled = !((log?.textContent || '').trim() || exportable.json?.logText);
}

function installUnloadGuard() {
  if (window.__storyMakerLongDevUnloadGuardInstalled) return;
  window.__storyMakerLongDevUnloadGuardInstalled = true;
  window.addEventListener('beforeunload', event => {
    if (!readActiveRun()) return;
    event.preventDefault();
    event.returnValue = 'A long-novel QA run is active. Snapshot data has been saved, but leaving will stop the provider call.';
  });
}

function setGlobalControlsDisabled(disabled) {
  ['btn-switch-api', 'btn-reload', 'key-save', 'key-edit'].forEach(id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = disabled;
    button.dataset.longdevLocked = disabled ? 'true' : 'false';
  });
}

function safeGetStorage(key) {
  try {
    const raw = window.localStorage?.getItem(key) || window.sessionStorage?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSetStorage(key, value) {
  const raw = JSON.stringify(value);
  try { window.localStorage?.setItem(key, raw); } catch {}
  try { window.sessionStorage?.setItem(key, raw); } catch {}
}

function safeRemoveStorage(key) {
  try { window.localStorage?.removeItem(key); } catch {}
  try { window.sessionStorage?.removeItem(key); } catch {}
}

function createRunToken() {
  return `longdev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function injectStyle() {
  if (document.getElementById('longdev-style')) return;
  const style = document.createElement('style');
  style.id = 'longdev-style';
  style.textContent = `
    #longdev-panel {
      margin-top: 16px;
      border: 1px solid rgba(167, 139, 250, 0.45);
      background: rgba(16, 12, 28, 0.94);
      border-radius: 8px;
      padding: 14px;
      color: #f5f3ff;
    }
    .longdev-head { display: flex; justify-content: space-between; gap: 12px; align-items: center; flex-wrap: wrap; }
    .longdev-head span { display: block; color: #b7acd8; font-size: 12px; margin-top: 2px; }
    .longdev-export-actions { display: flex; gap: 6px; margin-top: 4px; }
    .btn-longdev-export {
      border: 1px solid rgba(16, 185, 129, 0.5);
      background: #059669;
      color: white;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-longdev-export:disabled { opacity: 0.45; cursor: not-allowed; }
    .longdev-stage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .longdev-stage {
      border: 1px solid rgba(167, 139, 250, 0.28);
      border-radius: 7px;
      padding: 10px;
      background: rgba(8, 6, 18, 0.82);
    }
    .longdev-stage-title { color: #ddd6fe; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
    .longdev-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .longdev-actions button {
      border: 1px solid rgba(167, 139, 250, 0.5);
      background: #6d4aff;
      color: white;
      border-radius: 6px;
      padding: 8px 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .longdev-actions button:disabled { opacity: 0.55; cursor: wait; }
    #longdev-premise {
      width: 100%;
      min-height: 58px;
      margin-top: 12px;
      border: 1px solid rgba(167, 139, 250, 0.35);
      border-radius: 6px;
      background: #07050d;
      color: #f5f3ff;
      padding: 10px;
      resize: vertical;
    }
    .longdev-status { margin-top: 10px; color: #a7f3d0; font-weight: 700; }
    .longdev-log {
      margin-top: 10px;
      max-height: 220px;
      overflow: auto;
      background: #05040a;
      border: 1px solid rgba(167, 139, 250, 0.25);
      border-radius: 6px;
      padding: 10px;
      color: #d8b4fe;
      white-space: pre-wrap;
    }
    .longdev-summary { margin-top: 10px; color: #fef3c7; line-height: 1.7; }
  `;
  document.head.appendChild(style);
}

function downloadFile(content, baseName, extension) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `${baseName}_${timestamp}.${extension}`;
  const mimeType = extension === 'json' ? 'application/json;charset=utf-8' : 'text/plain;charset=utf-8';
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
