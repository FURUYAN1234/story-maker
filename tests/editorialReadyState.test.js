import test from 'node:test';
import assert from 'node:assert/strict';
import * as runtime from '../src/editorialBrushupRuntime.js';

const elements = () => {
  const classes = new Set(['is-waiting']);
  const attrs = new Map([['aria-disabled', 'true']]);
  return { button: { disabled: true }, autoCheckbox: { disabled: true }, classes, attrs,
    sectionElement: { classList: { remove: name => classes.delete(name) }, setAttribute: (name, value) => attrs.set(name, value) } };
};

test('an imported ready manuscript unlocks the whole editorial control, not only its button', () => {
  const state = elements();
  runtime.setEditorialReadyState({ ...state, ready: true });
  assert.equal(state.button.disabled, false);
  assert.equal(state.classes.has('is-waiting'), false);
  assert.equal(state.attrs.get('aria-disabled'), 'false');
  assert.equal(state.autoCheckbox.disabled, false);
});

test('pending or missing manuscripts stay unavailable', () => {
  const state = elements();
  runtime.setEditorialReadyState({ ...state, ready: false });
  assert.equal(state.button.disabled, true);
  assert.equal(state.classes.has('is-waiting'), true);
  assert.equal(state.attrs.get('aria-disabled'), 'true');
});
