export function findModeLabel(modes, value) {
  const mode = modes.find(item => item.value === value) || modes[0];
  return mode ? mode.label : '';
}

export function pickCategoryTuple(categories, categoryIndex = 0, valueIndex = 0) {
  const categoryNames = Object.keys(categories || {});
  const category = categoryNames[categoryIndex] || categoryNames[0] || '';
  const values = (category && categories[category]) || [];
  return [category, values[valueIndex] || values[0] || ''];
}

export function buildDefaultAxisPreset(indexes = {}, categories = {}) {
  return {
    theme: pickCategoryTuple(categories.theme, indexes.themeCat, indexes.themeVal),
    genre: pickCategoryTuple(categories.genre, indexes.genreCat, indexes.genreVal),
    worldview: pickCategoryTuple(categories.worldview, indexes.worldCat, indexes.worldVal),
    target: pickCategoryTuple(categories.target, indexes.targetCat, indexes.targetVal),
    era: pickCategoryTuple(categories.era, indexes.eraCat, indexes.eraVal),
    ending: pickCategoryTuple(categories.ending, indexes.endingCat, indexes.endingVal),
    narr: pickCategoryTuple(categories.narr, indexes.narrCat, indexes.narrVal),
  };
}

export {
  findModeLabel as Sa,
  pickCategoryTuple as Bt,
  buildDefaultAxisPreset as Je,
};
