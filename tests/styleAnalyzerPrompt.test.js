import assert from 'node:assert/strict';
import { ca } from '../src/styleAnalyzerPrompt.js';

assert.ok(ca.length > 2500);
assert.match(ca, /文芸批評家/);
assert.match(ca, /計量文体学/);
assert.match(ca, /JSON形式/);
assert.match(ca, /style_name/);
assert.match(ca, /narrative_voice/);
assert.match(ca, /sentence_style/);
assert.match(ca, /vocabulary/);
assert.match(ca, /rhetoric/);
assert.match(ca, /description_focus/);
assert.match(ca, /dialogue/);
assert.match(ca, /structure/);
assert.match(ca, /unique_features/);
assert.match(ca, /anti_patterns/);
assert.match(ca, /reproduction_prompt/);
assert.match(ca, /判定不可/);
assert.match(ca, /JSONの構文エラー/);

console.log('styleAnalyzerPrompt tests passed');
