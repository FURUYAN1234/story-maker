import assert from 'node:assert/strict';

import { Cf } from '../src/characterImportModalMarkup.js';

const html = Cf(
  [
    {
      name: 'Akari',
      sex: 'female',
      role: 'hero',
      personality: 'careful',
      note: 'blue hair',
    },
  ],
  ['data:image/png;base64,AAA'],
);

assert.match(html, /id="ci-modal"/);
assert.match(html, /class="ci-modal-overlay"/);
assert.match(html, /1 キャラクター検出/);
assert.match(html, /data:image\/png;base64,AAA/);
assert.match(html, /class="ci-check"/);
assert.match(html, /value="Akari"/);
assert.match(html, /value="female"/);
assert.match(html, /value="hero"/);
assert.match(html, /value="careful"/);
assert.match(html, />blue hair<\/textarea>/);
assert.match(html, /id="ci-btn-register"/);
assert.match(html, /id="ci-btn-cancel"/);

const noImageHtml = Cf(
  [{ name: 'NoImage', sex: '', role: 'support', personality: '', note: '' }],
  [],
);

assert.doesNotMatch(noImageHtml, /ci-thumbnail-wrap/);
assert.match(noImageHtml, /value="NoImage"/);
