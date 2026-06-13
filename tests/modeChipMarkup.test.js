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

console.log('modeChipMarkup tests passed');
