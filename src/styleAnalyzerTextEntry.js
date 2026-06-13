function createDirectStyleTextEntry(value, existingCount = 0) {
  const text = String(value || '').trim();
  if (!text) return null;

  return {
    name: `直接入力テキスト_${existingCount + 1}`,
    text,
    charCount: text.length,
  };
}

export { createDirectStyleTextEntry };
