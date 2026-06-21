import assert from 'node:assert/strict';

import {
  filterLocalComedyCultCompletionIssues,
  filterLocalComedyDigitalCompletionIssues,
  filterStoreOperationDigitalFallbackIssues,
  getChapterCarrierRotationCarriers,
  getLocalComedyAllowedMeans,
  hasCultFacilityRoute,
  hasDigitalEvidenceRoute,
  hasDigitalPayoffRoute,
  hasLocalStoreSurface,
  hasPromoSecretTemplatePayoff,
  hasRegisterSurface,
} from '../src/longNovelLocalComedyFilters.js';

assert.ok(getLocalComedyAllowedMeans().includes('paper receipt'));
assert.deepEqual(getChapterCarrierRotationCarriers(1), ['手書き棚札の訂正ミス', '紙レシート', '客の証言']);
assert.deepEqual(getChapterCarrierRotationCarriers(12), ['手書き棚札の訂正ミス', '紙レシート', '客の証言']);

assert.equal(hasDigitalEvidenceRoute('POSログが原因になる'), true);
assert.equal(hasDigitalEvidenceRoute('紙レシートが原因になる'), false);
assert.equal(hasRegisterSurface('棚札と紙レシート'), true);
assert.equal(hasRegisterSurface('研究施設の端末'), false);

assert.deepEqual(
  filterStoreOperationDigitalFallbackIssues([
    'keep / v4.5.9 POS data fallback / v4.6.1 story-means ledger: kinds:digitalLab',
  ], '棚札と紙レシートで確認する'),
  ['keep'],
);
assert.equal(
  filterStoreOperationDigitalFallbackIssues([
    'keep / v4.5.9 POS data fallback',
  ], 'POSログで確認する')[0].includes('v4.5.9 POS data fallback'),
  true,
);

assert.equal(hasLocalStoreSurface('棚札と客の証言'), true);
assert.equal(hasLocalStoreSurface('城の地下施設'), false);
assert.equal(hasCultFacilityRoute('教団の儀式'), true);
assert.equal(hasCultFacilityRoute('紙レシート'), false);
assert.equal(hasPromoSecretTemplatePayoff('キャンペーンが原因になる'), true);
assert.equal(hasPromoSecretTemplatePayoff('棚札が原因になる'), false);

assert.deepEqual(
  filterLocalComedyCultCompletionIssues([
    'keep / v4.6.1 story-means ledger: kinds:cultFacility / v4.9.0 完成救済',
  ], '棚札と紙レシートで解決する', { isLocalComedy: true }),
  ['keep'],
);
assert.equal(
  filterLocalComedyCultCompletionIssues([
    'keep / v4.6.1 story-means ledger: kinds:cultFacility',
  ], '教団の儀式が原因になる', { isLocalComedy: true })[0].includes('cultFacility'),
  true,
);

assert.equal(hasDigitalPayoffRoute('POSログが原因になる'), true);
assert.equal(hasDigitalPayoffRoute('棚札が原因になる'), false);
assert.deepEqual(
  filterLocalComedyDigitalCompletionIssues([
    'keep / v4.6.1 story-means ledger: kinds:digitalLab / v4.5.9 POS data fallback',
  ], '棚札と紙レシートで解決する', { isLocalComedy: true }),
  ['keep'],
);

console.log('longNovelLocalComedyFilters tests passed');
