import assert from 'node:assert/strict';

import { zd } from '../src/longNovelPromptRules.js';

assert.ok(zd.length > 3000);
assert.match(zd, /Scene density/);
assert.match(zd, /Chapter turn/);
assert.match(zd, /Ending aftertaste/);
assert.match(zd, /Scene ledger discipline/);
assert.match(zd, /No synopsis pages/);
assert.match(zd, /Do not output the ledger/);
assert.match(zd, /Final-paragraph discipline/);
