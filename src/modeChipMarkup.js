function defaultEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createModeChipMarkup(modes, activeMode, escapeHtml = defaultEscape, bookOpen = false) {
  const items = Array.isArray(modes) ? modes : [];
  const singlePageMode = '4koma_scenario';
  const render = mode => {
    const value = String(mode?.value ?? '');
    const label = value === singlePageMode ? '1ページ漫画（4〜8コマ）' : String(mode?.label ?? value);
    const activeClass = activeMode === value ? ' active' : '';
    return `<button class="chip${activeClass}" data-v="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
  };
  const single = items.find(mode => mode?.value === singlePageMode);
  const otherModes = items.filter(mode => mode?.value !== singlePageMode).map(render).join('');
  if (!single) return otherModes;
  const multi = `<button type="button" id="manga-book-open" class="manga-book-open" aria-controls="manga-book-form" aria-expanded="${bookOpen}">複数ページ漫画（各4〜8コマ）</button>`;
  return `<div class="manga-page-modes" role="group" aria-label="漫画のページ構成">${render(single)}${multi}</div>${otherModes}`;
}

export { createModeChipMarkup };
