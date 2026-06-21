export function normalizeForDuplicateComparison(value) {
  return String(value || '').replace(/[ \t\r\n　「」『』“”"']/g, '').trim();
}

export function splitNarrativeUnits(value) {
  const text = String(value || '').replace(/\r/g, '').trim();
  if (!text) return [];
  const paragraphs = text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  if (paragraphs.length >= 4) return paragraphs;
  return (text.match(/[^。！？\n]+[。！？]?/g) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 20);
}

export function removeRepeatedNarrativeBlocks(value) {
  const text = String(value || '').replace(/\r/g, '').trim();
  if (text.length < 1200) return { text: String(value || ''), changed: false, removedChars: 0 };

  let units = splitNarrativeUnits(text);
  if (units.length < 4) return { text: String(value || ''), changed: false, removedChars: 0 };

  const uniqueUnits = [];
  let removedChars = 0;
  const seen = new Set();
  for (const unit of units) {
    const normalized = normalizeForDuplicateComparison(unit);
    if (normalized.length >= 160 && seen.has(normalized)) {
      removedChars += unit.length;
      continue;
    }
    if (normalized.length >= 160) seen.add(normalized);
    uniqueUnits.push(unit);
  }

  units = uniqueUnits;
  const dedupedUnits = [];
  for (let index = 0; index < units.length;) {
    let repeatedWindowSize = 0;
    let repeatedWindowKey = '';
    const maxWindow = Math.min(14, Math.floor((units.length - index) / 2));
    for (let windowSize = maxWindow; windowSize >= 2; windowSize -= 1) {
      const firstKey = normalizeForDuplicateComparison(units.slice(index, index + windowSize).join(''));
      if (firstKey.length < 520) continue;
      const secondKey = normalizeForDuplicateComparison(units.slice(index + windowSize, index + windowSize * 2).join(''));
      if (firstKey && firstKey === secondKey) {
        repeatedWindowSize = windowSize;
        repeatedWindowKey = firstKey;
        break;
      }
    }
    if (repeatedWindowSize) {
      dedupedUnits.push(...units.slice(index, index + repeatedWindowSize));
      index += repeatedWindowSize;
      while (
        index + repeatedWindowSize <= units.length
        && normalizeForDuplicateComparison(units.slice(index, index + repeatedWindowSize).join('')) === repeatedWindowKey
      ) {
        removedChars += units.slice(index, index + repeatedWindowSize).join('\n\n').length;
        index += repeatedWindowSize;
      }
    } else {
      dedupedUnits.push(units[index]);
      index += 1;
    }
  }

  const result = dedupedUnits.join('\n\n').trim();
  return removedChars >= 420 && result.length >= 1000 && result.length < text.length
    ? { text: result, changed: true, removedChars }
    : { text: String(value || ''), changed: false, removedChars: 0 };
}

export function trimAlreadyGeneratedContinuation(previousText, nextText) {
  const previous = String(previousText || '').trim();
  const next = String(nextText || '').trim();
  if (!previous || !next) return next;
  if (next === previous) return '';
  if (next.startsWith(previous)) return next.slice(previous.length).trim();
  if (previous.includes(next) && next.length >= 700) return '';

  const previousUnits = splitNarrativeUnits(previous);
  const nextUnits = splitNarrativeUnits(next);
  let index = 0;
  let overlappingChars = 0;
  for (; index < Math.min(previousUnits.length, nextUnits.length); index += 1) {
    const previousKey = normalizeForDuplicateComparison(previousUnits[index]);
    const nextKey = normalizeForDuplicateComparison(nextUnits[index]);
    if (!previousKey || previousKey !== nextKey) break;
    overlappingChars += nextUnits[index].length;
  }
  return index >= 2 && overlappingChars >= 500
    ? nextUnits.slice(index).join('\n\n').trim()
    : next;
}
