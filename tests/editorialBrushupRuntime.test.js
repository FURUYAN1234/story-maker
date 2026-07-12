import assert from 'node:assert/strict';
import {
  buildEditorialBrushupPrompt,
  buildEditorialFormatRepairPrompt,
  createEditorialReviewMarkup,
  isEditorialBrushupReady,
  runEditorialReview,
  runEditorialBrushup,
  createEditorialTypewriterFrames,
  prepareEditorialReveal,
  editorialTextFingerprint,
  prepareEditorialReviewText,
  formatEditorialProgress,
  formatEditorialElapsedProgress,
  updateEditorialProgressSurface,
  updateEditorialAuxiliaryUi,
  setEditorialBrushupRunningState,
  resetEditorialBrushupForNewGeneration,
  shouldStartAutomaticBrushup,
  formatEditorialCompletion,
} from '../src/editorialBrushupRuntime.js';

const structuredReviewText = (score, commentary = '改善点を具体的に確認した。') => [
  `AI総合点: ${score}点`,
  'AI講評:', commentary,
  '良い点:', '主題が明確。',
  '問題点:', '対立の展開を強める必要がある。',
  '改稿方針:', '対立を行動と場面で具体化する。',
  'モード契約適合: 適合',
].join('\n');

const original = '彼女は古い駅で手紙を拾った。\n\n返事を書き、朝の列車を見送った。';
const improved = '彼女は古い駅で手紙を拾った。差出人の震えた筆跡に、昨日の後悔が残っていた。\n\n彼女は返事を書き、自分の言葉で別れを告げて朝の列車を見送った。';
assert.equal(isEditorialBrushupReady({ textContent: original, classList: { contains: () => false } }), true);
assert.equal(isEditorialBrushupReady({ textContent: original, classList: { contains: value => value === 'empty' } }), false);

const progressButton = { disabled: false, textContent: 'この小説をブラッシュアップ' };
const progressStatus = { textContent: 'AI講評: 要ブラッシュアップ' };
setEditorialBrushupRunningState({ button: progressButton, statusElement: progressStatus, running: true });
assert.equal(progressButton.disabled, true);
assert.equal(progressButton.textContent, 'ブラッシュアップ中...');
assert.equal(progressStatus.textContent, 'ブラッシュアップを開始しました。しばらくお待ちください...');
setEditorialBrushupRunningState({ button: progressButton, statusElement: progressStatus, running: false });
assert.equal(progressButton.textContent, 'この小説をブラッシュアップ');
const resetButton = { disabled: false, textContent: '古い完了表示' };
const resetSection = { attributes: {}, classList: { added: [], add(value) { this.added.push(value); } }, setAttribute(name, value) { this.attributes[name] = value; } };
const resetReview = { innerHTML: '<div>古い講評</div>', classList: { added: [], add(value) { this.added.push(value); } } };
const resetStatus = { textContent: 'ブラッシュアップ完了（91点）' };
const resetAutoCheckbox = { disabled: false };
const resetDoc = { documentElement: { dataset: {
  editorialReviewResult: 'completed',
  editorialReviewScore: '91',
  editorialBrushupResult: 'completed',
  editorialBrushupAttempts: '3',
} } };
resetEditorialBrushupForNewGeneration({ doc: resetDoc, sectionElement: resetSection, button: resetButton, reviewElement: resetReview, statusElement: resetStatus, autoCheckbox: resetAutoCheckbox });
assert.deepEqual(resetSection.classList.added, ['is-waiting']);
assert.equal(resetSection.attributes['aria-disabled'], 'true');
assert.equal(resetButton.disabled, true);
assert.equal(resetAutoCheckbox.disabled, true);
assert.equal(resetButton.textContent, 'この小説をブラッシュアップ');
assert.equal(resetReview.innerHTML, '');
assert.deepEqual(resetReview.classList.added, ['hidden']);
assert.equal(resetStatus.textContent, '新しい本文の生成・AI講評を待っています...');
assert.deepEqual(resetDoc.documentElement.dataset, {});
assert.equal(formatEditorialProgress({ phase: 'review', attempt: 0, maxAttempts: 3 }), 'API稼働中: 元原稿を講評中...');
assert.equal(formatEditorialProgress({ phase: 'brushup', attempt: 2, maxAttempts: 3 }), 'API稼働中: 改稿を生成中（2/3回・100点目標）...');
assert.equal(formatEditorialProgress({ phase: 'review', attempt: 2, maxAttempts: 3 }), 'API稼働中: 改稿後を再採点中（2/3回・100点目標）...');
assert.equal(
  formatEditorialProgress({ phase: 'decision', attempt: 1, maxAttempts: 3, decision: { adopt: false, currentScore: 89, candidateScore: 87, issues: ['score_not_improved'] } }),
  '採点結果（1/3回）: 前回89点 → 候補87点（不採用: 点数が上がっていない）',
);
assert.equal(
  formatEditorialProgress({ phase: 'decision', attempt: 2, maxAttempts: 3, decision: { adopt: true, currentScore: 89, candidateScore: 92, issues: [] } }),
  '採点結果（2/3回）: 前回89点 → 候補92点（採用）',
);
assert.equal(formatEditorialElapsedProgress('API稼働中: 改稿を生成中（1/3回・100点目標）...', 12.9), 'API稼働中: 改稿を生成中（1/3回・100点目標）...（開始から12秒経過）');
assert.deepEqual(createEditorialTypewriterFrames('abcdefg', { chunkSize: 3 }), ['abc', 'abcdef', 'abcdefg']);
assert.equal(createEditorialTypewriterFrames('あ'.repeat(1200)).length, 600);
const editorialReveal = prepareEditorialReveal('本文\n\nCreated By AI Story Maker V5.3.3.');
assert.equal(editorialReveal.bodyText, '本文');
assert.match(editorialReveal.finalText, /^本文\n\nCreated By AI Story Maker V5\.3\.3$/);
assert.equal(editorialTextFingerprint('本文\r\n\r\nCreated By AI Story Maker V5.3.3.'), '本文');
assert.equal(editorialTextFingerprint('本文\n\nCreated By AI Story Maker V5.3.3'), '本文');
assert.equal(shouldStartAutomaticBrushup({ checked: true, review: { valid: true, score: 89 }, running: false }), true);
assert.equal(shouldStartAutomaticBrushup({ checked: true, review: { valid: true, score: 100 }, running: false }), false);
assert.equal(shouldStartAutomaticBrushup({ checked: false, review: { valid: true, score: 70 }, running: false }), false);
assert.equal(shouldStartAutomaticBrushup({ checked: true, review: { valid: true, score: 70 }, running: true }), false);
assert.equal(formatEditorialCompletion({ score: 84, attempts: 3, maxAttempts: 3 }), '最大3回終了・未合格（84点／合格90点）');
assert.equal(formatEditorialCompletion({ score: 92, attempts: 3, maxAttempts: 3 }), 'ブラッシュアップ完了・合格（92点／合格90点）');
assert.equal(formatEditorialCompletion({ score: 100, attempts: 2, maxAttempts: 3 }), 'ブラッシュアップ完了・100点到達');
assert.equal(
  prepareEditorialReviewText('本文\n\nCreated By AI Story Maker V5.3.3.', 'novel', text => `${text}\n\n`),
  '本文\n\nCreated By AI Story Maker V5.3.3',
);

const structuredBrushupPrompt = buildEditorialBrushupPrompt({
  text: original,
  review: { score: 86, commentary: '総評', problems: '中盤が弱い', revisionPlan: '対立を行動で強める' },
  modeLabel: 'ショート',
});
assert.match(structuredBrushupPrompt, /未解消の問題点: 中盤が弱い/);
assert.match(structuredBrushupPrompt, /必須の改稿方針: 対立を行動で強める/);
const formatRepairPrompt = buildEditorialFormatRepairPrompt({
  mode: '4koma',
  modeLabel: '4コマ漫画風',
  text: '1コマ目（起）:\n絵/状況: 店内\nセリフ: 客「はい」\nCreated By AI Story Maker V5.3.3',
});
assert.match(formatRepairPrompt, /1コマ目、2コマ目、3コマ目、4コマ目/);
assert.match(formatRepairPrompt, /「絵\/状況:」「セリフ:」「狙い:」/);
assert.doesNotMatch(formatRepairPrompt, /Created By AI Story Maker/);
const progressTitle = { textContent: '' };
const progressLog = { textContent: '' };
updateEditorialProgressSurface({ titleElement: progressTitle, logElement: progressLog, message: 'API稼働中: 元原稿を講評中...', reset: true });
updateEditorialProgressSurface({ titleElement: progressTitle, logElement: progressLog, message: 'API稼働中: 改稿を生成中（1/3回・100点目標）...' });
assert.equal(progressTitle.textContent, 'AI進捗・思考ログ: API稼働中: 改稿を生成中（1/3回・100点目標）...');
assert.equal(progressLog.textContent, '【ブラッシュアップ進捗】\nAPI稼働中: 元原稿を講評中...\nAPI稼働中: 改稿を生成中（1/3回・100点目標）...');

const reviewMarkup = createEditorialReviewMarkup({ score: 86, valid: true, commentary: '良い点。\n\n改善点。' }, { attempts: 1 });
assert.match(reviewMarkup, /editorial-review-score-value[^>]*>86/);
assert.match(reviewMarkup, /editorial-review-score-bar-fill/);
assert.match(reviewMarkup, /<pre class="editorial-review-commentary">良い点。\n\n改善点。<\/pre>/);
assert.match(reviewMarkup, /ブラッシュアップ回数: 1回/);

const apiAlert = { textContent: '', style: { display: 'none' } };
const generationScores = { innerHTML: 'old graph', style: { display: 'grid' } };
updateEditorialAuxiliaryUi({ alertElement: apiAlert, scoreBoard: generationScores, message: '改稿を生成中（1/3回）', active: true });
assert.equal(apiAlert.textContent, '⚠️ API稼働中: 改稿を生成中（1/3回）');
assert.equal(apiAlert.style.display, 'flex');
updateEditorialAuxiliaryUi({ alertElement: apiAlert, scoreBoard: generationScores, message: 'API稼働中: 再採点中', active: true });
assert.equal(apiAlert.textContent, '⚠️ API稼働中: 再採点中');
assert.equal(generationScores.innerHTML, '');
assert.equal(generationScores.style.display, 'none');
updateEditorialAuxiliaryUi({ alertElement: apiAlert, scoreBoard: generationScores, active: false });
assert.equal(apiAlert.style.display, 'none');

let reviewCalls = 0;
const repairedReview = await runEditorialReview({ text: original, mode: 'novel', modeLabel: '短編', callAi: async (_prompt, context) => {
  reviewCalls += 1;
  return context.stage === 'review' ? { text: '形式外' } : { text: 'AI総合点: 80点\nAI講評:\n結末を強めたい。\n良い点:\n導入' };
} });
assert.equal(reviewCalls, 2);
assert.equal(repairedReview.score, 80);

let brushupCalls = 0;
const brushupProgress = [];
const brushedReviewScores = [78, 85, 92, 100];
const brushed = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, onProgress: progress => brushupProgress.push(progress), callAi: async (_prompt, context) => {
  brushupCalls += 1;
  if (context.stage === 'review') {
    const score = brushedReviewScores.shift();
    return { text: structuredReviewText(score, score === 78 ? '感情を強める。' : '改善した。') };
  }
  if (context.stage === 'brushup') return { text: improved };
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(brushed.text, improved);
assert.equal(brushed.review.score, 100);
assert.equal(brushed.attempts, 3);
assert.deepEqual(brushupProgress.map(progress => [progress.phase, progress.attempt]), [
  ['review', 0],
  ['brushup', 1],
  ['review', 1],
  ['decision', 1],
  ['brushup', 2],
  ['review', 2],
  ['decision', 2],
  ['brushup', 3],
  ['review', 3],
  ['decision', 3],
]);

let reusedReviewCalls = 0;
const reused = await runEditorialBrushup({
  text: original,
  mode: 'novel',
  modeLabel: '短編',
  initialReview: { score: 88, commentary: '初回講評', problems: '中盤', revisionPlan: '対立を強める', modeFit: '適合', structuredValid: true, valid: true },
  callAi: async (_prompt, context) => {
    if (context.stage === 'review') { reusedReviewCalls += 1; return { text: structuredReviewText(91) }; }
    if (context.stage === 'brushup') return { text: improved };
    throw new Error(`unexpected ${context.stage}`);
  },
});
assert.equal(reusedReviewCalls, 1);
assert.equal(reused.attempts, 1);

let passingRewriteCalls = 0;
const alreadyPassing = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, callAi: async (_prompt, context) => {
  if (context.stage === 'review') return { text: structuredReviewText(passingRewriteCalls === 0 ? 86 : 90) };
  if (context.stage === 'brushup') { passingRewriteCalls += 1; return { text: improved }; }
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(passingRewriteCalls, 3);
assert.equal(alreadyPassing.attempts, 3);
assert.equal(alreadyPassing.review.score, 90);

let failedAttempts = 0;
const failedGuidancePrompts = [];
const preserved = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, callAi: async (_prompt, context) => {
  if (context.stage === 'review') return { text: structuredReviewText(70 - failedAttempts, `直近講評${failedAttempts}`) };
  if (context.stage === 'brushup') { failedGuidancePrompts.push(_prompt); failedAttempts += 1; return { text: '途中で扉を開け' }; }
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(preserved.text, original);
assert.equal(preserved.attempts, 3);
assert.equal(failedAttempts, 3);
assert.match(failedGuidancePrompts[1], /直近講評1/);
assert.match(failedGuidancePrompts[2], /直近講評2/);

console.log('editorial brushup runtime tests passed');
