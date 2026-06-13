function defaultEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createSubChipMarkup(values, escapeHtml = defaultEscape) {
  return (Array.isArray(values) ? values : []).map((value) => {
    const escaped = escapeHtml(value);
    return `<button class="chip sub-chip" data-v="${escaped}">${escaped}</button>`;
  }).join('');
}

function createCategoryChipMarkup(categories, escapeHtml = defaultEscape) {
  return Object.keys(categories || {}).map((category) => {
    const escaped = escapeHtml(category);
    return `<button class="chip cat-chip" data-cat="${escaped}">${escaped}</button>`;
  }).join('');
}

export { createCategoryChipMarkup, createSubChipMarkup };
