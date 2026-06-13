import assert from 'node:assert/strict';
import {
  createStyleAnalyzerImageListMarkup,
  createStyleAnalyzerTextFileListMarkup,
} from '../src/styleAnalyzerListMarkup.js';

const textMarkup = createStyleAnalyzerTextFileListMarkup([
  { name: 'memo.md', charCount: 1234 },
  { name: '<bad&name>.txt', charCount: 0 },
]);

assert.match(textMarkup, /📄 memo\.md/);
assert.match(textMarkup, /1,234字/);
assert.match(textMarkup, /data-idx="0"/);
assert.match(textMarkup, /&lt;bad&amp;name&gt;\.txt/);
assert.match(textMarkup, /0字/);

assert.equal(createStyleAnalyzerTextFileListMarkup(null), '');

const imageMarkup = createStyleAnalyzerImageListMarkup([
  { name: 'visual.png', previewUrl: 'blob:http://local/1' },
  { name: 'bad"image.png', previewUrl: 'blob:http://local/"2' },
]);

assert.match(imageMarkup, /src="blob:http:\/\/local\/1"/);
assert.match(imageMarkup, /alt="visual\.png"/);
assert.match(imageMarkup, /data-img-idx="0"/);
assert.match(imageMarkup, /bad&quot;image\.png/);
assert.match(imageMarkup, /blob:http:\/\/local\/&quot;2/);

assert.equal(createStyleAnalyzerImageListMarkup(null), '');

const customText = createStyleAnalyzerTextFileListMarkup([
  { name: 'A', charCount: 1 },
], (value) => `{${value}}`);

assert.match(customText, /\{A\}/);

console.log('styleAnalyzerListMarkup tests passed');
