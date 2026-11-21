import assert from 'node:assert/strict';
import { createModeChipMarkup } from '../src/modeChipMarkup.js';

const html = createModeChipMarkup([
  { value: '4koma', label: '4コマ漫画風' },
  { value: 'novel', label: '短編小説' },
], 'novel');

assert.equal(
  html,
  '<button class="chip" data-v="4koma">4コマ漫画風</button><button class="chip active" data-v="novel">短編小説</button>',
);

assert.equal(createModeChipMarkup(null, 'novel'), '');

const escaped = createModeChipMarkup([
  { value: 'x"y', label: '<unsafe&label>' },
], '');

assert.equal(
  escaped,
  '<button class="chip" data-v="x&quot;y">&lt;unsafe&amp;label&gt;</button>',
);

const customEscaped = createModeChipMarkup([
  { value: 'plain', label: 'Plain' },
], 'plain', (value) => `[${value}]`);

assert.equal(
  customEscaped,
  '<button class="chip active" data-v="[plain]">[Plain]</button>',
);

const mangaButtons = createModeChipMarkup([
  { value: '4koma', label: '4コマ漫画風' },
  { value: '4koma_scenario', label: '漫画シナリオ連携' },
], '4koma_scenario', undefined, true);
assert.match(mangaButtons, /role="group" aria-label="漫画のページ構成"/);
assert.match(mangaButtons, /data-v="4koma_scenario">1ページ漫画（4〜8コマ）<\/button><button[^>]+aria-expanded="true">複数ページ漫画（各4〜8コマ）/);
assert.match(mangaButtons, /<\/div><button class="chip" data-v="4koma">4コマ漫画風/);
assert.doesNotMatch(mangaButtons, /漫画シナリオ連携/);

console.log('modeChipMarkup tests passed');
