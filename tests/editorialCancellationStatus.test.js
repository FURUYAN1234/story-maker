import test from 'node:test';
import assert from 'node:assert/strict';
import { createEditorialReviewMarkup, describeEditorialTermination } from '../src/editorialBrushupRuntime.js';

for (const brushup of [false,true]) test(`user cancellation is distinct from failure for ${brushup?'brushup':'review'}`,()=>{
  const cancelled=describeEditorialTermination(new DOMException('AI通信を中断しました','AbortError'),{brushup});
  assert.equal(cancelled.result,'cancelled');
  assert.match(cancelled.status,/中断/);
  assert.doesNotMatch(cancelled.status+cancelled.message,/失敗|取得できません/);
  const markup=createEditorialReviewMarkup(null,{cancelled:true});
  assert.match(markup,/中断/);assert.match(markup,/本文は保持/);
  assert.doesNotMatch(markup,/取得できません|失敗/);
  const failed=describeEditorialTermination(new Error('HTTP 429 quota'),{brushup});
  assert.equal(failed.result,'failed');
  assert.match(failed.message,/HTTP 429 quota/);
  assert.match(createEditorialReviewMarkup(null,{error:'HTTP 429 quota'}),/取得できません/);
});
