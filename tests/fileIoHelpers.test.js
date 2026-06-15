import assert from 'node:assert/strict';
import {
  Qd,
  buildStoryExportFileName,
  buildTimestampedJsonFileName,
  buildTimestampedPlainTextFileName,
  buildTimestampedTextFileName,
  formatTimestamp,
  readFileAsBase64,
  sanitizeFileNamePart,
} from '../src/fileIoHelpers.js';

const fixedDate = new Date(2026, 5, 13, 9, 8, 7);

assert.equal(formatTimestamp(fixedDate), '20260613090807');
assert.equal(Qd(fixedDate), '20260613090807');
assert.equal(buildStoryExportFileName('Output', 'txt', fixedDate), 'Story_Output_20260613090807.txt');
assert.equal(buildStoryExportFileName('GenerationSettings', 'json', fixedDate), 'Story_GenerationSettings_20260613090807.json');
assert.equal(
  buildTimestampedTextFileName('長編小説', '本文', fixedDate),
  'Story_LongNovel_20260613090807.txt',
);
assert.equal(
  buildTimestampedTextFileName('長編小説', 'メモ・指示書', fixedDate),
  'Story_LongNovelNotes_20260613090807.txt',
);
assert.equal(sanitizeFileNamePart('a/b:c*d?e"f<g>h| i'), 'a_b_c_d_e_f_g_h__i');
assert.equal(buildTimestampedJsonFileName('my/style analysis', fixedDate), 'Story_MyStyleAnalysis_20260613090807.json');
assert.equal(buildTimestampedPlainTextFileName('style_rewrite', fixedDate), 'Story_StyleRewrite_20260613090807.txt');

const originalFileReader = globalThis.FileReader;
globalThis.FileReader = class {
  readAsDataURL() {
    this.result = 'data:image/png;base64,QUJD';
    this.onload();
  }
};

try {
  assert.equal(await readFileAsBase64({ name: 'sample.png' }), 'QUJD');
} finally {
  if (originalFileReader) {
    globalThis.FileReader = originalFileReader;
  } else {
    delete globalThis.FileReader;
  }
}

console.log('fileIoHelpers tests passed');
