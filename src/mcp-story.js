import { getAiCommunicationState, stopAiCommunication } from './aiCommunication.js';
import { stripGeneratedFooter } from './footerHelpers.js';
import { connectFuruMcp, mcpAppError } from './mcp-connection.js';
import { buildNanoFullCopy } from './nanoCharacterHandoff.js';
import { getNanoScenarioIssue } from './nanoScenarioContract.js';

const byId = id => document.getElementById(id);

async function generateMangaScript({ brief }, signal) {
  const button = byId('btn-generate');
  const output = byId('output');
  const handoff = byId('nano-character-handoff');
  if (!byId('banner')?.classList.contains('ok')) throw mcpAppError('API_REQUIRED');
  if (button.disabled || getAiCommunicationState().active || byId('settings').classList.contains('generating')) throw mcpAppError('APP_BUSY');
  const mode = document.querySelector('#mode-chips .chip[data-v="4koma_scenario"]');
  if (!mode) throw mcpAppError('OUTPUT_INVALID');
  if (!mode.classList.contains('active')) mode.click();
  if (!mode.classList.contains('active')) throw mcpAppError('APP_BUSY');
  const supplement = byId('supplement');
  supplement.value = brief;
  supplement.dispatchEvent(new Event('input', { bubbles: true }));

  const previous = output.textContent;
  button.click();
  if (!button.disabled && !byId('settings').classList.contains('generating')) throw mcpAppError('APP_BUSY');
  for (;;) {
    await new Promise(resolve => setTimeout(resolve, 250));
    signal.throwIfAborted();
    const work = getAiCommunicationState();
    if (work.stopped) throw new DOMException('Stopped', 'AbortError');
    const marks = document.documentElement.dataset;
    if (work.active || button.disabled || byId('settings').classList.contains('generating')) continue;
    if (output.querySelector('.error-msg') || marks.editorialReviewResult === 'failed' || marks.editorialBrushupResult === 'failed') throw mcpAppError('OUTPUT_INVALID');
    const editorialSettled = marks.editorialBrushupResult === 'completed'
      || (marks.editorialReviewResult === 'completed' && (!byId('longify-auto-brushup-until-pass')?.checked || Number(marks.editorialReviewScore) >= 100));
    if (!editorialSettled) continue;
    const scenario = stripGeneratedFooter(output.textContent).trim();
    if (output.textContent === previous || getNanoScenarioIssue(scenario)) throw mcpAppError('OUTPUT_INVALID');
    const imported = document.querySelector('#char-list [data-character-sheet-imported="true"]');
    if (imported) return { scenario, characters: '', mangaInput: scenario };
    if (handoff?.dataset.phase === 'failed') throw mcpAppError('OUTPUT_INVALID');
    if (handoff?.dataset.phase !== 'ready') continue;
    const characters = byId('nano-character-text').textContent.trim();
    if (!characters) throw mcpAppError('OUTPUT_INVALID');
    return { scenario, characters, mangaInput: buildNanoFullCopy(characters, scenario) };
  }
}

let operation;
connectFuruMcp({
  appId: 'story-maker',
  readiness: () => Boolean(byId('banner')?.classList.contains('ok')),
  async execute(action, input) {
    if (action !== 'generate_manga_script') throw mcpAppError('OUTPUT_INVALID');
    operation = new AbortController();
    const timeout = setTimeout(() => {
      operation.abort(new DOMException('Timed out', 'TimeoutError'));
      stopAiCommunication();
    }, 900000);
    try { return await generateMangaScript(input, operation.signal); }
    finally { clearTimeout(timeout); operation = undefined; }
  },
  stop() {
    operation?.abort();
    stopAiCommunication();
  },
});
