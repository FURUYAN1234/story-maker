import assert from 'node:assert/strict';
import { parseThoughtAndStory } from '../src/thoughtParsingHelpers.js';

assert.deepEqual(
  parseThoughtAndStory('<thought>設計中</thought>本文です'),
  { thought: '設計中', story: '本文です', isThinking: false },
);

assert.deepEqual(
  parseThoughtAndStory('<thought>まだ考えている'),
  { thought: 'まだ考えている', story: '', isThinking: true },
);

assert.deepEqual(
  parseThoughtAndStory('メモ\nタイトル: 夜の駅\n本文'),
  { thought: 'メモ\n', story: 'タイトル: 夜の駅\n本文', isThinking: false },
);

assert.deepEqual(
  parseThoughtAndStory('<tho'),
  { thought: '', story: '', isThinking: true },
);

assert.deepEqual(
  parseThoughtAndStory('本文だけ'),
  { thought: '', story: '本文だけ', isThinking: false },
);

assert.deepEqual(
  parseThoughtAndStory(''),
  { thought: '', story: '', isThinking: false },
);

console.log('thoughtParsingHelpers tests passed');

