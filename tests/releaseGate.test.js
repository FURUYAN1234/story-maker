import assert from 'node:assert/strict';

import {
  validateBilingualReleaseNotes,
  validatePagesDeployment,
} from '../scripts/releaseGate.mjs';

const completeNotes = [
  '# Story Maker v5.3.6',
  '',
  '## English',
  '',
  "### What's New",
  '- [privacy] API keys remain in memory only.',
  '- [proxy] External URL proxies are disabled.',
  '',
  '### Verification',
  '- [tests] Unit tests and production build passed.',
  '',
  '## 日本語',
  '',
  '### 更新内容',
  '- [privacy] APIキーはメモリ内だけに保持します。',
  '- [proxy] 外部URLプロキシを無効化しました。',
  '',
  '### 検証',
  '- [tests] ユニットテストと本番ビルドが成功しました。',
].join('\n');

assert.deepEqual(validateBilingualReleaseNotes(completeNotes, '5.3.6'), []);

assert.deepEqual(
  validateBilingualReleaseNotes(completeNotes.replace('- [proxy] 外部URLプロキシを無効化しました。', ''), '5.3.6'),
  ['Japanese "更新内容" IDs must exactly match English "What\'s New" IDs.'],
);

assert.deepEqual(
  validateBilingualReleaseNotes(completeNotes.replace('## 日本語', '## Japanese'), '5.3.6'),
  ['Missing required heading: ## 日本語.'],
);

assert.deepEqual(
  validatePagesDeployment({ status: 'building', commit: 'abc' }, 'abc'),
  ['GitHub Pages latest build must be "built"; received "building".'],
);

assert.deepEqual(
  validatePagesDeployment({ status: 'built', commit: 'old' }, 'expected'),
  ['GitHub Pages latest build commit must be "expected"; received "old".'],
);

assert.deepEqual(validatePagesDeployment({ status: 'built', commit: 'expected' }, 'expected'), []);

console.log('releaseGate tests passed');
