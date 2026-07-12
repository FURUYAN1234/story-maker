import assert from 'node:assert/strict';
import { evaluateBrushupCandidate, hasEditorialModeFormat } from '../src/editorialBrushupCandidate.js';

const base = '朝の駅で、彼女は失くした手紙を見つけた。\n\n選ぶべき道を決め、静かに歩き出した。';
const improved = '朝の駅で、彼女は失くした手紙を見つけた。紙には昨日まで言えなかった言葉が残っていた。\n\n彼女は相手を責めず、自分で選んだ道を静かに歩き出した。';
const reviews = { currentReview: { score: 78, valid: true }, candidateReview: { score: 84, valid: true } };

assert.equal(hasEditorialModeFormat('宛先: 母へ\n本文: ありがとう。\n結び: また会おう。\n差出人: 私。', 'letter'), true);
assert.equal(hasEditorialModeFormat('母へ\nありがとう。\n私より。', 'letter'), false);
assert.equal(hasEditorialModeFormat('タイトル: 朝\n登場人物: 二人\nBGM: 静か\nSE: 雨音', 'radio'), true);
assert.equal(hasEditorialModeFormat('普通の小説本文。', 'radio'), false);
const validFourKoma = [1, 2, 3, 4].map(number => `${number}コマ目:\n絵/状況: 場面${number}\nセリフ: 人物「台詞」\n狙い: 意図`).join('\n');
assert.equal(hasEditorialModeFormat(validFourKoma, '4koma'), true);
assert.equal(hasEditorialModeFormat(validFourKoma.replace(/狙い: 意図\s*$/u, ''), '4koma'), false);

assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: true, ...reviews }).adopt, true);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: `${improved}\n\n${improved}`, mode: 'novel', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: '途中で扉を開け', mode: 'novel', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: false, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: base, currentText: base, candidateText: improved, mode: 'novel', formatOk: true, currentReview: { score: 84, valid: true }, candidateReview: { score: 83, valid: true } }).adopt, false);

const genericLong = `${'長い原稿の内容を保持する。'.repeat(900)}。`;
assert.equal(evaluateBrushupCandidate({ originalText: genericLong, currentText: genericLong, candidateText: `${'短縮。'.repeat(300)}。`, mode: '4koma', formatOk: true, ...reviews }).issues.includes('content_loss'), true);

const longBody = `${'長い物語の一文。'.repeat(1300)}\n【完】`;
assert.equal(evaluateBrushupCandidate({ originalText: longBody, currentText: longBody, candidateText: `${'短い。'.repeat(500)}\n【完】`, mode: 'long_10000', formatOk: true, ...reviews }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText: longBody, currentText: longBody, candidateText: longBody, mode: 'long_10000', formatOk: true, ...reviews }).issues.includes('target_length'), false);

console.log('editorial brushup candidate tests passed');
