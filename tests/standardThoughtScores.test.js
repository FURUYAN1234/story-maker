import assert from 'node:assert/strict';
import {
  createEmptyStandardThoughtScores,
  createStandardThoughtScoreMarkup,
  hasStandardThoughtScores,
  parseStandardThoughtScores,
  renderStandardThoughtScoreBoard,
} from '../src/standardThoughtScores.js';

assert.deepEqual(createEmptyStandardThoughtScores(), {
  plotRecovery: null,
  structure: null,
  constraint: null,
});

assert.deepEqual(parseStandardThoughtScores(''), createEmptyStandardThoughtScores());

assert.deepEqual(
  parseStandardThoughtScores([
    '伏線回収度: 91',
    '起承転結の構造：84',
    '制約遵守度: 93',
  ].join('\n')),
  {
    plotRecovery: 91,
    structure: 84,
    constraint: 93,
  },
);

assert.equal(hasStandardThoughtScores(createEmptyStandardThoughtScores()), false);
assert.equal(hasStandardThoughtScores({ plotRecovery: 0, structure: null, constraint: null }), true);

const markup = createStandardThoughtScoreMarkup({
  plotRecovery: 91,
  structure: 84,
  constraint: null,
});
assert.match(markup, /伏線回収度 \(基準:85点\)/);
assert.match(markup, /91点 \(合格\)/);
assert.match(markup, /84点 \(不合格\)/);
assert.match(markup, /測定中\.\.\./);

const board = { style: {}, innerHTML: '' };
assert.deepEqual(
  renderStandardThoughtScoreBoard(board, createEmptyStandardThoughtScores(), { show: true }),
  { visible: false, reason: 'empty-scores' },
);
assert.equal(board.style.display, 'none');

assert.deepEqual(
  renderStandardThoughtScoreBoard(board, { plotRecovery: 95, structure: 90, constraint: 92 }, { show: false }),
  { visible: false, reason: 'hidden' },
);
assert.equal(board.style.display, 'none');

assert.deepEqual(
  renderStandardThoughtScoreBoard(board, { plotRecovery: 95, structure: 90, constraint: 92 }, { show: true }),
  { visible: true },
);
assert.equal(board.style.display, 'flex');
assert.match(board.innerHTML, /制約遵守度/);

console.log('standardThoughtScores tests passed');
