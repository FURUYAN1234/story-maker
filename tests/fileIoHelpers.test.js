import assert from 'node:assert/strict';
import {
  Qd,
  buildTimestampedTextFileName,
  formatTimestamp,
} from '../src/fileIoHelpers.js';

const fixedDate = new Date(2026, 5, 13, 9, 8, 7);

assert.equal(formatTimestamp(fixedDate), '20260613090807');
assert.equal(Qd(fixedDate), '20260613090807');
assert.equal(
  buildTimestampedTextFileName('長編小説', 'メモ・指示書', fixedDate),
  '長編小説_メモ・指示書_20260613090807.txt',
);

console.log('fileIoHelpers tests passed');
