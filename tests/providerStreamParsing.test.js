import assert from 'node:assert/strict';

import {
  consumeSseLines,
  parseGeminiStreamLine,
  parseOpenAiStreamLine,
} from '../src/providerStreamParsing.js';

assert.deepEqual(parseOpenAiStreamLine(''), []);
assert.deepEqual(parseOpenAiStreamLine('event: ping'), []);
assert.deepEqual(parseOpenAiStreamLine('data: [DONE]'), []);
assert.deepEqual(
  parseOpenAiStreamLine('data: {"choices":[{"delta":{"content":"hello"}}]}'),
  [{ text: 'hello', isThought: false }],
);
assert.deepEqual(parseOpenAiStreamLine('data: {broken'), []);

assert.deepEqual(parseGeminiStreamLine(''), []);
assert.deepEqual(
  parseGeminiStreamLine('data: {"candidates":[{"content":{"parts":[{"text":"body"},{"thought":"idea"}]}}]}'),
  [
    { text: 'body', isThought: false },
    { text: 'idea', isThought: true },
  ],
);
assert.deepEqual(parseGeminiStreamLine('data: {broken'), []);

{
  const chunks = [];
  let buffer = '';
  buffer += 'data: {"choices":[{"delta":{"content":"hel';
  buffer = consumeSseLines(buffer, parseOpenAiStreamLine, chunk => chunks.push(chunk));
  assert.equal(chunks.length, 0);
  buffer += 'lo"}}]}\n';
  buffer = consumeSseLines(buffer, parseOpenAiStreamLine, chunk => chunks.push(chunk));
  assert.deepEqual(chunks, [{ text: 'hello', isThought: false }]);
  assert.equal(buffer, '');
}

console.log('providerStreamParsing tests passed');
