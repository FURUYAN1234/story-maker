import assert from 'node:assert/strict';
import { shouldWriteStandardFallbackToOutput } from '../src/standardFallbackUi.js';

assert.equal(
  shouldWriteStandardFallbackToOutput({
    storyFinalized: false,
    outputText: '',
    outputIsEmpty: true,
  }),
  true,
);

assert.equal(
  shouldWriteStandardFallbackToOutput({
    storyFinalized: true,
    outputText: 'タイトル: 特賞大根\n1. 商店街に大根が届く。\n【完】',
    outputIsEmpty: false,
  }),
  false,
);

assert.equal(
  shouldWriteStandardFallbackToOutput({
    storyFinalized: true,
    outputText: 'フォールバック中: gpt-5.4 Responses beta...',
    outputIsEmpty: false,
  }),
  false,
);

console.log('standardFallbackUi tests passed');
