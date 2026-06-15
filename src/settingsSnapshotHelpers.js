export function formatAxisDetail({ category = '', value = '', customValue = '' } = {}) {
  const selected = value || customValue;
  if (category && selected && selected !== category) {
    return `${category} / ${selected}`;
  }
  return customValue || value || category || '';
}

export function buildGenerationSettingsSnapshot(state, values = {}) {
  const axes = values.axes || {};
  const modeCustom = values.modeCustom || '';
  const supplement = values.supplement || '';
  return {
    mode: (state && state.mode) || '',
    modeCustom,
    theme: axes.theme || '',
    themeCustom: axes.theme || '',
    characters: (state && state.characters) || [],
    genre: axes.genre || '',
    genreCustom: axes.genre || '',
    worldview: axes.worldview || '',
    worldviewCustom: axes.worldview || '',
    target: axes.target || '',
    targetCustom: axes.target || '',
    era: axes.era || '',
    eraCustom: axes.era || '',
    ending: axes.ending || '',
    endingCustom: axes.ending || '',
    narration: axes.narr || '',
    narrCustom: axes.narr || '',
    charCount: null,
    supplement,
    universalAssets: (state && state.universalAssets) || [],
  };
}

const SETTINGS_EXPORT_SCHEMA = 'story-maker-generation-settings-v1';
const AXIS_KEYS = ['theme', 'genre', 'worldview', 'target', 'era', 'ending', 'narr'];
const LOCK_KEYS = ['mode', 'theme', 'chars', 'genre', 'worldview', 'target', 'era', 'ending', 'narr', 'supplement', 'universal'];

function cleanText(value, maxLength = 5000) {
  return String(value || '').replace(/\r\n?/g, '\n').slice(0, maxLength);
}

function cleanPlainObject(value = {}, allowedKeys = []) {
  const output = {};
  for (const key of allowedKeys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      output[key] = value[key];
    }
  }
  return output;
}

function sanitizeCharacters(characters = []) {
  if (!Array.isArray(characters)) return [];
  return characters.slice(0, 20).map(character => ({
    name: cleanText(character?.name, 120),
    sex: cleanText(character?.sex, 80),
    role: cleanText(character?.role, 160),
    personality: cleanText(character?.personality, 160),
    note: cleanText(character?.note, 2000),
  }));
}

function sanitizeUniversalAssets(assets = []) {
  if (!Array.isArray(assets)) return [];
  return assets.slice(0, 20).map((asset, index) => {
    const type = ['text', 'url', 'image'].includes(asset?.type) ? asset.type : 'text';
    const base = {
      id: `imported-asset-${index + 1}`,
      type,
      name: cleanText(asset?.name || asset?.title || asset?.value || `Asset ${index + 1}`, 180),
      locked: Boolean(asset?.locked),
      status: 'done',
    };
    if (type === 'url') {
      base.value = cleanText(asset?.value, 1000);
      base.title = cleanText(asset?.title || asset?.value, 300);
      base.content = cleanText(asset?.content, 6000);
    } else if (type === 'image') {
      base.mimeType = cleanText(asset?.mimeType, 120);
      base.analysis = cleanText(asset?.analysis || asset?.content, 3000);
    } else {
      base.content = cleanText(asset?.content || asset?.analysis, 6000);
    }
    return base;
  }).filter(asset => asset.name || asset.content || asset.analysis || asset.value);
}

function sanitizeAxisSettings(axes = {}) {
  return Object.fromEntries(AXIS_KEYS.map(axis => {
    const item = axes[axis] || {};
    return [axis, {
      category: cleanText(item.category, 160),
      value: cleanText(item.value, 200),
      customValue: cleanText(item.customValue, 300),
      source: cleanText(item.source, 80),
    }];
  }));
}

export function buildGenerationSettingsExport(state, values = {}, date = new Date()) {
  const locked = cleanPlainObject(state?.locked || {}, LOCK_KEYS);
  return {
    schema: SETTINGS_EXPORT_SCHEMA,
    app: 'Story Maker',
    exportedAt: date.toISOString(),
    version: cleanText(values.version, 40),
    settings: {
      mode: cleanText(state?.mode, 80),
      modeCustom: cleanText(values.modeCustom, 200),
      modeSource: cleanText(state?.modeSource, 80),
      axes: sanitizeAxisSettings(values.axesDetailed || {}),
      characters: sanitizeCharacters(state?.characters || []),
      supplement: cleanText(values.supplement, 5000),
      locked,
      universalAssets: sanitizeUniversalAssets(state?.universalAssets || []),
    },
  };
}

export function parseGenerationSettingsExport(input) {
  const payload = typeof input === 'string' ? JSON.parse(input) : input;
  if (!payload || payload.schema !== SETTINGS_EXPORT_SCHEMA || !payload.settings) {
    throw new Error('Story Makerの生成条件JSONではありません。');
  }
  return {
    ...payload,
    settings: {
      mode: cleanText(payload.settings.mode, 80),
      modeCustom: cleanText(payload.settings.modeCustom, 200),
      modeSource: cleanText(payload.settings.modeSource, 80),
      axes: sanitizeAxisSettings(payload.settings.axes || {}),
      characters: sanitizeCharacters(payload.settings.characters || []),
      supplement: cleanText(payload.settings.supplement, 5000),
      locked: cleanPlainObject(payload.settings.locked || {}, LOCK_KEYS),
      universalAssets: sanitizeUniversalAssets(payload.settings.universalAssets || []),
    },
  };
}

export {
  formatAxisDetail as Dt,
  buildGenerationSettingsSnapshot as Yn,
  buildGenerationSettingsExport as buildSettingsExport,
  parseGenerationSettingsExport as parseSettingsExport,
};
