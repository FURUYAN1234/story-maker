import assert from 'node:assert/strict';
import {
  Qd,
  buildTimestampedJsonFileName,
  buildTimestampedPlainTextFileName,
  buildTimestampedTextFileName,
  formatTimestamp,
  sanitizeFileNamePart,
} from '../src/fileIoHelpers.js';

const fixedDate = new Date(2026, 5, 13, 9, 8, 7);

assert.equal(formatTimestamp(fixedDate), '20260613090807');
assert.equal(Qd(fixedDate), '20260613090807');
assert.equal(
  buildTimestampedTextFileName('長編小説', 'メモ・指示書', fixedDate),
  '長編小説_メモ・指示書_20260613090807.txt',
);
assert.equal(sanitizeFileNamePart('a/b:c*d?e"f<g>h| i'), 'a_b_c_d_e_f_g_h__i');
assert.equal(buildTimestampedJsonFileName('my/style analysis', fixedDate), 'my_style_analysis_20260613090807.json');
assert.equal(buildTimestampedPlainTextFileName('style_rewrite', fixedDate), 'style_rewrite_20260613090807.txt');

console.log('fileIoHelpers tests passed');
