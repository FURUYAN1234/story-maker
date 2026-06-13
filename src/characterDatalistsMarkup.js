const DEFAULT_SEX_OPTIONS = ['男性', '女性', '無性', '回答無し'];

function defaultEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createDatalistMarkup(id, values, escapeHtml = defaultEscape) {
  return `<datalist id="${escapeHtml(id)}">${(Array.isArray(values) ? values : []).map((value) => (
    `<option value="${escapeHtml(value)}"></option>`
  )).join('')}</datalist>`;
}

function createCharacterDatalistsMarkup(
  roles,
  personalities,
  sexOptions = DEFAULT_SEX_OPTIONS,
  escapeHtml = defaultEscape,
) {
  return {
    roles: createDatalistMarkup('roles-list', roles, escapeHtml),
    personalities: createDatalistMarkup('personalities-list', personalities, escapeHtml),
    sex: createDatalistMarkup('sex-list', sexOptions, escapeHtml),
  };
}

export { DEFAULT_SEX_OPTIONS, createCharacterDatalistsMarkup, createDatalistMarkup };
