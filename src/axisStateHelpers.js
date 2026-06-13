const AXIS_BY_STATE_KEY = {
  themeSelected: 'theme',
  genre: 'genre',
  worldview: 'worldview',
  target: 'target',
  era: 'era',
  ending: 'ending',
  narration: 'narr',
};

const USER_OWNED_SOURCES = new Set(['manual', 'selectedDetail', 'selectedCategory']);

export function stateKeyToAxis(stateKey) {
  return AXIS_BY_STATE_KEY[stateKey] || null;
}

export function setAxisSource(state, axis, source) {
  if (!state || !axis) return;
  state.axisSource ||= {};
  if (source) {
    state.axisSource[axis] = source;
  } else {
    delete state.axisSource[axis];
  }
}

export function clearDefaultFilledForStateKey(state, stateKey) {
  const axis = stateKeyToAxis(stateKey);
  if (axis && state && state.defaultFilled) {
    delete state.defaultFilled[axis];
  }
}

export function getAxisSource(state, axis) {
  return (state && state.axisSource && state.axisSource[axis]) || null;
}

export function hasAxisStateSelection(state, axisMeta, axis, customValue = '') {
  const meta = axisMeta && axisMeta[axis];
  return !!(meta && (state[meta.stateKey] || customValue));
}

export function isAxisUserOwned(state, axis, customValue = '', categoryValue = '') {
  if (!state || !axis) return false;
  if (state.locked && state.locked[axis]) return true;

  const source = getAxisSource(state, axis);
  if (USER_OWNED_SOURCES.has(source)) return true;

  return !!((customValue || categoryValue) && source !== 'default' && source !== 'random');
}

export function canRandomizeAxis(state, axis, customValue = '', categoryValue = '') {
  return !!(state && !(state.locked && state.locked[axis]) && !isAxisUserOwned(state, axis, customValue, categoryValue));
}

