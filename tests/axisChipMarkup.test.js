import assert from 'node:assert/strict';
import { createCategoryChipMarkup, createSubChipMarkup } from '../src/axisChipMarkup.js';

assert.equal(
  createSubChipMarkup(['日常', 'SF']),
  '<button class="chip sub-chip" data-v="日常">日常</button><button class="chip sub-chip" data-v="SF">SF</button>',
);

assert.equal(createSubChipMarkup(null), '');

assert.equal(
  createCategoryChipMarkup({ コメディ: ['爆笑'], シリアス: ['葛藤'] }),
  '<button class="chip cat-chip" data-cat="コメディ">コメディ</button><button class="chip cat-chip" data-cat="シリアス">シリアス</button>',
);

assert.equal(createCategoryChipMarkup(null), '');

assert.equal(
  createSubChipMarkup(['x"y', '<z&>']),
  '<button class="chip sub-chip" data-v="x&quot;y">x&quot;y</button><button class="chip sub-chip" data-v="&lt;z&amp;&gt;">&lt;z&amp;&gt;</button>',
);

assert.equal(
  createCategoryChipMarkup({ 'a"b': [], '<c&>': [] }),
  '<button class="chip cat-chip" data-cat="a&quot;b">a&quot;b</button><button class="chip cat-chip" data-cat="&lt;c&amp;&gt;">&lt;c&amp;&gt;</button>',
);

assert.equal(
  createSubChipMarkup(['A'], (value) => `{${value}}`),
  '<button class="chip sub-chip" data-v="{A}">{A}</button>',
);

console.log('axisChipMarkup tests passed');
