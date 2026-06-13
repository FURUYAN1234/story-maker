import assert from 'node:assert/strict';
import { df, uf } from '../src/eraLoreHelpers.js';

assert.ok(Object.keys(uf).includes('江戸時代'));
assert.ok(uf['江戸時代'].tags.includes('江戸'));
assert.match(uf['異世界転生'].lore, /異世界/);

assert.equal(df({}), '');
assert.match(df({ era: '江戸時代' }), /江戸時代の生活知識/);
assert.match(df({ theme: '異世界転生' }), /異世界転生の設定素材/);
assert.match(df({ characters: [{ note: '侍の末裔' }] }), /江戸時代の生活知識/);

console.log('eraLoreHelpers tests passed');
