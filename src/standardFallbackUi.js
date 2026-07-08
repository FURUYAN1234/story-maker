function shouldWriteStandardFallbackToOutput({
  storyFinalized = false,
  outputText = '',
  outputIsEmpty = false,
} = {}) {
  if (storyFinalized) return false;
  if (outputIsEmpty) return true;
  return String(outputText || '').trim().length === 0;
}

export { shouldWriteStandardFallbackToOutput };
