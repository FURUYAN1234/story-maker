// Stateless selection helpers used by the legacy runtime.
// The exported short aliases preserve the current legacyMain call sites.

const FUTURE_BIASED_PATTERN = /(?:AI|SNS|電子|電脳|ガジェット|スマホ|アプリ|ロボット|量子|仮想|VR|サイバー|ディストピア|アンドロイド|クローン|宇宙ステーション|火星|月面|巨大企業|監視システム|ネットワーク)/i;
const SF_CATEGORY_PATTERN = /(?:SF|近未来|サイバー|未来|電脳|AI|量子|宇宙|ロボット|クローン)/i;

export function pickRandom(items) {
  return items && items.length ? items[Math.floor(Math.random() * items.length)] : null;
}

export function isFutureBiased(value) {
  return FUTURE_BIASED_PATTERN.test(String(value || ''));
}

export function isSfCategory(value) {
  return SF_CATEGORY_PATTERN.test(String(value || ''));
}

export function filterFutureBiased(items, allowFuture = false) {
  const filtered = (items || []).filter(item => allowFuture || !isFutureBiased(item));
  return filtered.length ? filtered : items || [];
}

export function pickCategoryItem(categories, selectedCategory = null, allowFuture = false, picker = pickRandom) {
  if (!categories) return null;
  let category = selectedCategory && categories[selectedCategory] ? selectedCategory : null;
  if (!category) {
    const keys = Object.keys(categories || {});
    category = picker(keys.length ? keys : []);
  }
  if (!category) return null;
  const items = categories[category] || [];
  const filteredItems = filterFutureBiased(items, allowFuture || isSfCategory(category));
  return [category, picker(filteredItems)];
}

export function parseJapaneseCount(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }
  const text = String(value || '')
    .replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 65248))
    .replace(/[,，]/g, '');
  if (!text) return 0;
  const tenThousand = text.match(/(\d+(?:\.\d+)?)\s*万/);
  if (tenThousand) return Math.round(parseFloat(tenThousand[1]) * 10000);
  const plain = text.match(/(\d{4,})/);
  return plain ? parseInt(plain[1], 10) : 0;
}

export {
  isFutureBiased as Wd,
  isSfCategory as ns,
  filterFutureBiased as ho,
  pickCategoryItem as ma,
  parseJapaneseCount as hf,
};
