function createDirectStyleTextEntry(value, existingCount = 0) {
  const text = String(value || '').trim();
  if (!text) return null;

  return {
    name: `直接入力テキスト_${existingCount + 1}`,
    text,
    charCount: text.length,
  };
}

function countStyleAnalyzerTextFileChars(textFiles) {
  const files = Array.isArray(textFiles) ? textFiles : [];
  return files.reduce((total, file) => total + (file?.charCount || 0), 0);
}

function createStyleAnalyzerFileCountLabel(textFiles) {
  const files = Array.isArray(textFiles) ? textFiles : [];
  return `${files.length}件 / ${countStyleAnalyzerTextFileChars(files).toLocaleString()}字`;
}

export {
  countStyleAnalyzerTextFileChars,
  createDirectStyleTextEntry,
  createStyleAnalyzerFileCountLabel,
};
