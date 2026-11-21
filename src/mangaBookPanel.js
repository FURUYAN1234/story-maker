import { mcpAppError } from './mcp-connection.js';
import { mangaBookFixedCounts } from './mangaBook.js';

export function installMangaBookPanel({ generate, stop }) {
  const byId = id => document.getElementById(`manga-book-${id}`);
  const form = byId('form');
  if (!form) return null;
  const modes = document.getElementById('mode-chips');
  const mode = byId('count-mode');
  const status = byId('status');
  const output = byId('output');
  const pages = byId('pages');
  const start = byId('generate');
  const cancel = byId('stop');
  const summary = byId('summary');
  const cast = byId('cast');
  const title = byId('result-title');
  let running = false;

  function appendPage(page) {
    const entry = document.createElement('details');
    const label = document.createElement('summary');
    const script = document.createElement('pre');
    const copy = document.createElement('button');
    entry.open = page.pageNumber === 1;
    label.textContent = `本文${page.pageNumber}P（${page.panelCount}コマ）`;
    script.className = 'nano-character-text';
    script.textContent = page.scenario;
    copy.type = 'button';
    copy.className = 'btn-secondary';
    copy.textContent = `本文${page.pageNumber}Pの台本をコピー`;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(page.scenario);
        status.textContent = `本文${page.pageNumber}Pの台本をコピーしました。`;
      } catch {
        status.textContent = 'コピーできませんでした。台本を選択してコピーしてください。';
      }
    });
    entry.append(label, script, copy);
    pages.append(entry);
  }

  function showError(error) {
    const messages = { API_REQUIRED: 'APIキーを入力してから開始してください。', APP_BUSY: '別のAI処理が終わってから開始してください。' };
    status.textContent = error.name === 'AbortError' ? '中断しました。' : messages[error.code] ?? error.message;
    output.classList.remove('hidden');
  }

  async function run(input) {
    if (running) throw mcpAppError('APP_BUSY');
    running = true;
    start.disabled = true;
    cancel.disabled = false;
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
    if (event.isTrusted && event.target.closest('.chip[data-v="4koma_scenario"]') && !running) displayForm(false);
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
  return { run };
}
