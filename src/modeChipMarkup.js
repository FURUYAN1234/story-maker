function defaultEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createModeChipMarkup(modes, activeMode, escapeHtml = defaultEscape) {
  return (Array.isArray(modes) ? modes : []).map((mode) => {
    const value = String(mode?.value ?? '');
    const label = String(mode?.label ?? value);
    const activeClass = activeMode === value ? ' active' : '';
    return `<button class="chip${activeClass}" data-v="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
  }).join('');
}

export { createModeChipMarkup };
