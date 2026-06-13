import assert from 'node:assert/strict';
import { validateSceneDraft } from '../../src/longNovel/localValidator.js';
import { resolveIssueSeverity, downgradeRepairIssuesToWarnings } from '../../src/longNovel/severityPolicy.js';

const clicheEnding = [
  '彼は紙を机に置いた。まだ言い切れないことがあったが、指先は逃げずに白い端を押さえていた。',
  '沈黙のあとで、扉の向こうから小さな足音が返ってきた。',
  '少なくともこの瞬間、選択で終わった。それは自分にできることだった。言葉にできない余韻だけが残り、関係は未来へ向けて静かに変わり始めていた。もう誰かの返事を待つ必要もなかった。これから始まる新しい朝だった。',
].join('\n\n');

{
  const validation = validateSceneDraft(clicheEnding, {
    minChars: 40,
    validationPosition: 'scene_mid',
  });
  assert.equal(validation.ok, true);
  assert.equal(validation.fatal, false);
  assert.equal(validation.issues.some(issue => issue.code === 'cliche_closure_ending' && issue.severity === 'warning'), true);
}

{
  const validation = validateSceneDraft(clicheEnding, {
    minChars: 40,
    validationPosition: 'scene_chapter_end',
  });
  assert.equal(validation.ok, false);
  assert.equal(validation.fatal, false);
  assert.equal(validation.repairRequired, true);
  assert.equal(validation.issues.some(issue => issue.code === 'cliche_closure_ending' && issue.severity === 'repair'), true);

  const afterRepair = downgradeRepairIssuesToWarnings(validation, 'unit-test');
  assert.equal(afterRepair.ok, true);
  assert.equal(afterRepair.repairRequired, false);
  assert.equal(afterRepair.issues.some(issue => issue.code === 'cliche_closure_ending' && issue.severity === 'warning'), true);

  const strictRepair = downgradeRepairIssuesToWarnings(validation, 'unit-test-strict', {
    keepRepairCodes: ['cliche_closure_ending'],
  });
  assert.equal(strictRepair.ok, false);
  assert.equal(strictRepair.repairRequired, true);
  assert.equal(strictRepair.issues.some(issue => issue.code === 'cliche_closure_ending' && issue.severity === 'repair'), true);
}

{
  const validation = validateSceneDraft(clicheEnding, {
    minChars: 40,
    validationPosition: 'final_polish_last',
  });
  assert.equal(validation.ok, false);
  assert.equal(validation.fatal, true);
  assert.equal(validation.issues.some(issue => issue.code === 'cliche_closure_ending' && issue.severity === 'fatal'), true);
}

assert.equal(resolveIssueSeverity('meta_leak', { validationPosition: 'scene_mid' }), 'fatal');
assert.equal(resolveIssueSeverity('thin_texture', { validationPosition: 'chapter_edit' }), 'warning');
assert.equal(resolveIssueSeverity('repetition', { validationPosition: 'scene_mid' }), 'repair');
assert.equal(resolveIssueSeverity('repetition', { validationPosition: 'final_polish' }), 'fatal');

console.log('long novel severity tests passed');
