import assert from 'node:assert/strict';
import {
  DEFAULT_SEX_OPTIONS,
  createCharacterDatalistsMarkup,
  createDatalistMarkup,
} from '../src/characterDatalistsMarkup.js';

assert.deepEqual(DEFAULT_SEX_OPTIONS, ['男性', '女性', '無性', '回答無し']);

assert.equal(
  createDatalistMarkup('roles-list', ['主人公', '相棒']),
  '<datalist id="roles-list"><option value="主人公"></option><option value="相棒"></option></datalist>',
);

assert.equal(
  createDatalistMarkup('x"y', ['<bad&value>']),
  '<datalist id="x&quot;y"><option value="&lt;bad&amp;value&gt;"></option></datalist>',
);

assert.equal(createDatalistMarkup('empty', null), '<datalist id="empty"></datalist>');

const markup = createCharacterDatalistsMarkup(['主人公'], ['熱血']);

assert.equal(markup.roles, '<datalist id="roles-list"><option value="主人公"></option></datalist>');
assert.equal(markup.personalities, '<datalist id="personalities-list"><option value="熱血"></option></datalist>');
assert.equal(
  markup.sex,
  '<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>',
);

const custom = createCharacterDatalistsMarkup(['A'], ['B'], ['C'], (value) => `{${value}}`);

assert.equal(custom.roles, '<datalist id="{roles-list}"><option value="{A}"></option></datalist>');
assert.equal(custom.personalities, '<datalist id="{personalities-list}"><option value="{B}"></option></datalist>');
assert.equal(custom.sex, '<datalist id="{sex-list}"><option value="{C}"></option></datalist>');

console.log('characterDatalistsMarkup tests passed');
