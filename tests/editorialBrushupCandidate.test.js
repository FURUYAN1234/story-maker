import assert from 'node:assert/strict';
import { evaluateBrushupCandidate } from '../src/editorialBrushupCandidate.js';

const base = '朝の駅で、彼女は失くした手紙を見つけた。\n\n選ぶべき道を決め、静かに歩き出した。';
const improved = '朝の駅で、彼女は失くした手紙を見つけた。紙には昨日まで言えなかった言葉が残っていた。\n\n彼女は相手を責めず、自分で選んだ道を静かに歩き出した。';
const reviews = { currentReview: { score: 78, valid: true }, candidateReview: { score: 84, valid: true } };

assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: true, ...reviews }).adopt, true);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: `${improved}\n\n${improved}`, mode: 'novel', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: '途中で扉を開け', mode: 'novel', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: false, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: true, currentReview: { score: 84, valid: true }, candidateReview: { score: 83, valid: true } }).adopt, false);

const longBody = `${'長い物語の一文。'.repeat(1300)}\n【完】`;
assert.equal(evaluateBrushupCandidate({ originalText: longBody, currentText: longBody, candidateText: `${'短い。'.repeat(500)}\n【完】`, mode: 'long_10000', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: longBody, currentText: longBody, candidateText: longBody, mode: 'long_10000', formatOk: true, ...reviews }).issues.includes('target_length'), false);

console.log('editorial brushup candidate tests passed');
