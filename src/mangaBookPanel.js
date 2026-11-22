import { mcpAppError } from './mcp-connection.js';
import { mangaBookFixedCounts, mangaPagePreview } from './mangaBook.js';

export function installMangaBookPanel({ generate, stop }) {
  const byId = id => document.getElementById(`manga-book-${id}`);
  const form = byId('form');
  if (!form) return null;
  const modes = document.getElementById('mode-chips');
  const outputPanel = document.getElementById('output-panel');
  const standardOutput = document.getElementById('output');
  const standardGenerate = document.getElementById('btn-generate');
  const mode = byId('count-mode');
  const status = byId('status');
  const output = byId('output');
  const pages = byId('pages');
  const start = byId('generate');
  const cancel = byId('stop');
  const summary = byId('summary');
  const cast = byId('cast');
  const title = byId('result-title');
  const returnToStandard = byId('return');
  let running = false;
  let standardTextAtStart;

  function showStandard() {
    if (running || !outputPanel.classList.contains('manga-book-view')) return;
    if (standardOutput.textContent !== standardTextAtStart) {
      document.getElementById('btn-output-clear').click();
    }
    output.classList.add('hidden');
    outputPanel.classList.remove('manga-book-view');
  }

  function appendPage(page) {
    const entry = document.createElement('details');
    const label = document.createElement('summary');
    const copy = document.createElement('button');
    const raw = document.createElement('details');
    const rawLabel = document.createElement('summary');
    const rawScript = document.createElement('pre');
    entry.open = page.pageNumber === 1;
    label.textContent = `本文${page.pageNumber}P（${page.panelCount}コマ）`;
    raw.className = 'manga-book-raw hidden';
    rawLabel.textContent = '漫画アプリ連携用の台本を表示';
    rawScript.className = 'nano-character-text';
    rawScript.textContent = page.scenario;
    raw.append(rawLabel, rawScript);
    copy.type = 'button';
    copy.className = 'btn-secondary';
    copy.textContent = `本文${page.pageNumber}Pの台本をコピー`;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(page.scenario);
        status.textContent = `本文${page.pageNumber}Pの台本をコピーしました。`;
      } catch {
        raw.classList.remove('hidden');
        raw.open = true;
        rawLabel.focus();
        status.textContent = 'コピーできませんでした。開いた連携用台本を選択してコピーしてください。';
      }
    });
    entry.append(label, copy);
    for (const panel of mangaPagePreview(page.scenario)) {
      const section = document.createElement('section');
      const heading = document.createElement('h4');
      const body = document.createElement('pre');
      section.className = 'manga-book-panel';
      heading.textContent = panel.title;
      body.textContent = panel.body;
      section.append(heading, body);
      entry.append(section);
    }
    entry.append(raw);
    pages.append(entry);
  }

  function showError(error) {
    const messages = { API_REQUIRED: 'APIキーを入力してから開始してください。', APP_BUSY: '別のAI処理が終わってから開始してください。' };
    status.textContent = error.name === 'AbortError' ? '中断しました。' : messages[error.code] ?? error.message;
    output.classList.remove('hidden');
  }

  async function run(input) {
    if (running) throw mcpAppError('APP_BUSY');
    if (!outputPanel.classList.contains('manga-book-view')) {
      standardTextAtStart = standardOutput.textContent;
    }
    outputPanel.classList.add('manga-book-view');
    running = true;
    start.disabled = true;
    cancel.disabled = false;
    returnToStandard.disabled = true;
    pages.replaceChildren();
    title.textContent = '複数ページ漫画の台本';
    summary.textContent = '';
    cast.classList.add('hidden');
    output.classList.remove('hidden');
    try {
      const result = await generate(input, ({ stage, pageNumber, totalPages, page }) => {
        if (stage === 'plan') status.textContent = '作品全体の構成を作成しています。';
        if (stage === 'page') status.textContent = `本文${pageNumber}P／全${totalPages}Pを作成しています。`;
        if (stage === 'complete-page') appendPage(page);
      });
      title.textContent = result.book.title;
      summary.textContent = result.book.summary;
      byId('characters').textContent = result.characters;
      cast.classList.toggle('hidden', !result.characters);
      status.textContent = `本文${result.book.pages.length}ページが完成しました。`;
      return result;
    } catch (error) {
      showError(error);
      throw error;
    } finally {
      start.disabled = false;
      cancel.disabled = true;
      returnToStandard.disabled = false;
      running = false;
    }
  }

  function displayForm(open) {
    form.classList.toggle('hidden', !open);
    byId('open').setAttribute('aria-expanded', String(open));
    if (open) mode.focus();
  }

  modes.addEventListener('click', event => {
    if (event.target.closest('#manga-book-open')) displayForm(form.classList.contains('hidden'));
    if (event.isTrusted && event.target.closest('.chip[data-v]') && !running) {
      showStandard();
      displayForm(false);
    }
  });
  standardGenerate.addEventListener('click', event => {
    if (!event.isTrusted) return;
    if (running) event.stopImmediatePropagation();
    else showStandard();
  }, { capture: true });
  returnToStandard.addEventListener('click', () => {
    showStandard();
    standardGenerate.focus();
  });
  mode.addEventListener('change', () => byId('counts-label').classList.toggle('hidden', mode.value !== 'fixed'));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const book = { mode: mode.value };
      if (book.mode === 'fixed') book.pagePanelCounts = mangaBookFixedCounts(byId('counts').value);
      const brief = byId('brief').value.trim() || document.getElementById('supplement').value.trim();
      await run({ brief, book });
    } catch (error) {
      showError(error);
    }
  });
  cancel.addEventListener('click', stop);
  return { run, showStandard };
}
