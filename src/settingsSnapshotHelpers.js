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

export {
  formatAxisDetail as Dt,
  buildGenerationSettingsSnapshot as Yn,
};

