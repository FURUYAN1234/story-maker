import test from 'node:test';
import assert from 'node:assert/strict';
import { Jo } from '../src/promptBuilder.js';
import { buildPrompt } from '../src/prompt.js';
import { buildQualityContract } from '../src/modeContracts.js';
import { Jf, _, Wf } from '../src/editorialEvaluationHelpers.js';
import { buildEditorialReviewPrompt } from '../src/editorialReviewContracts.js';
import { buildEditorialBrushupPrompt } from '../src/editorialBrushupRuntime.js';
import { buildOutputModeStrictContract, buildFinalOutputFormatCheck } from '../src/outputModeContracts.js';

test('normal generation, quality, review and revision share adaptive structure without mandatory crisis',()=>{
  const settings={mode:'short_short',genre:'ヒューマンドラマ',ending:'静かな余韻',supplement:'成長せず、同じ日常へ戻る話'};
  for(const prompt of [Jo(settings).prompt,buildPrompt(settings),buildQualityContract(settings.mode),Jf(settings),_(settings),Wf('静かな作品',settings),buildEditorialReviewPrompt({mode:settings.mode,text:'静かな作品'}),buildEditorialBrushupPrompt({mode:settings.mode,text:'静かな作品'})]) {
    assert.match(prompt,/尺と形式に合わせる物語設計/);
    assert.match(prompt,/危機・敵・死・成長/);
    assert.doesNotMatch(prompt,/Include at least one irreversible choice|欲望、障害、誤解または反転、代償、関係変化を最低一つずつ/);
  }
  assert.match(Jo(settings).prompt,/成長せず、同じ日常へ戻る話/);
  for (const prompt of [buildOutputModeStrictContract(settings),buildFinalOutputFormatCheck(settings)]) {
    assert.doesNotMatch(prompt,/反転、余韻を省略しない/);
    assert.match(prompt,/1500字以上/);
  }
});

test('mode boundaries keep brief, extended, non-narrative and factual forms distinct',()=>{
  for(const mode of ['4koma','4koma_scenario','short_short']) assert.match(buildQualityContract(mode),/短い尺.*統合/s);
  for(const mode of ['medium','long_10000']) assert.match(buildQualityContract(mode),/複数場面.*中間.*終盤/s);
  for(const mode of ['poem','essay','letter','diary']) assert.match(buildQualityContract(mode),/事件の因果や三幕を必須にしない/);
  assert.match(buildQualityContract('documentary'),/未確認の動機・証言・出来事・解決を創作しない/);
  assert.match(buildEditorialReviewPrompt({mode:'poem',text:'窓の音'}),/型の項目不足だけで減点しない/);
  assert.match(buildEditorialBrushupPrompt({mode:'documentary',text:'記録'}),/既存の事実・人物・結末/);
  assert.match(Jo({mode:'long'}).prompt,/機能停止中/);
});
