import assert from 'node:assert/strict';
import { formatStyleRewriteProgressLog } from '../src/styleAnalyzerProgressLog.js';

assert.equal(formatStyleRewriteProgressLog(), '');

assert.equal(
  formatStyleRewriteProgressLog(['開始', '準備完了']),
  '開始\n準備完了\n',
);

assert.equal(
  formatStyleRewriteProgressLog(['開始'], '待機中...'),
  '開始\n待機中...\n',
);

assert.equal(
  formatStyleRewriteProgressLog(['開始'], '待機中...', '・現在文字数: 120 文字'),
  '開始\n待機中...\n\n・現在文字数: 120 文字',
);

assert.equal(
  formatStyleRewriteProgressLog([], '', '詳細のみ'),
  '\n詳細のみ',
);

console.log('styleAnalyzerProgressLog tests passed');
