import assert from 'node:assert/strict';
import { Ce, escapeHtml } from '../src/domHelpers.js';
import { parseGenerationSettingsExport } from '../src/settingsSnapshotHelpers.js';

assert.equal(Ce('<tag attr="a&b">'), '&lt;tag attr=&quot;a&amp;b&quot;&gt;');
assert.equal(Ce('plain'), 'plain');
assert.equal(Ce(null), '');
assert.equal(Ce(0), '');
assert.equal(Ce, escapeHtml, 'the legacy renderer must share the safe helper');

// Exercise imported character data through the same shared encoder used by
// legacyMain's quoted value attributes and textarea content. Preserve the data
// at import; encode only at the HTML boundary, for either quote delimiter.
const attack = '\" autofocus onfocus=\"probe\" data-probe=\"\'><img src=x onerror=probe>';
const normal = '小林 "アキ" / O\'Brien & <友人>\n次の行';
const fields = ['name', 'sex', 'role', 'personality', 'note'];
const parsed = parseGenerationSettingsExport({
  schema: 'story-maker-generation-settings-v1',
  settings: {
    characters: [attack, normal].map(value => Object.fromEntries(fields.map(field => [field, value]))),
  },
});
function decodeHtmlEntities(value) {
  const entities = { '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>', '&amp;': '&' };
  return value.replace(/&quot;|&#39;|&lt;|&gt;|&amp;/g, entity => entities[entity]);
}
for (const [index, value] of [attack, normal].entries()) {
  for (const field of fields) {
    assert.equal(parsed.settings.characters[index][field], value, 'import preserves literal input');
    const escaped = Ce(parsed.settings.characters[index][field]);
    assert.doesNotMatch(escaped, /[<>"']/, `${field} cannot terminate text or quoted HTML attributes`);
    assert.equal(decodeHtmlEntities(escaped), value, `${field} keeps its visible text`);
  }
}
assert.equal(Ce('&quot; &#39; &lt;'), '&amp;quot; &amp;#39; &amp;lt;', 'input entities stay literal');

console.log('domHelpers tests passed');
