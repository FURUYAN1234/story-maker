const METADATA_LABELS = [
  'topic:',
  'logline:',
  'location:',
  'outfit:',
  'punchline:',
  'scenario:',
  'タイトル:',
];

export function parseThoughtAndStory(input) {
  const text = input == null ? '' : String(input);
  const thoughtOpen = /<thought[^>]*>/i;
  const thoughtClose = /<\/thought[^>]*>/i;
  const openMatch = text.match(thoughtOpen);
  const closeMatch = text.match(thoughtClose);
  let thought = '';
  let story = '';
  let isThinking = true;

  if (openMatch) {
    const openIndex = openMatch.index;
    const openLength = openMatch[0].length;
    if (closeMatch) {
      const closeIndex = closeMatch.index;
      const closeLength = closeMatch[0].length;
      thought = text.slice(openIndex + openLength, closeIndex);
      story = text.slice(closeIndex + closeLength);
      isThinking = false;
    } else {
      thought = text.slice(openIndex + openLength);
      story = '';
      isThinking = true;
    }
  } else {
    let firstMetadataIndex = -1;
    for (const label of METADATA_LABELS) {
      const normalized = label.replace(':', '').trim();
      const match = text.match(new RegExp(`(?:^|\\n)\\s*${normalized}\\s*[:：]`, 'i'));
      if (match) {
        const index = match.index + (match[0].startsWith('\n') ? 1 : 0);
        if (firstMetadataIndex === -1 || index < firstMetadataIndex) {
          firstMetadataIndex = index;
        }
      }
    }
    if (firstMetadataIndex !== -1) {
      thought = text.slice(0, firstMetadataIndex);
      story = text.slice(firstMetadataIndex);
      isThinking = false;
    } else {
      const partialThoughtTag = '<thought>';
      const lower = text.toLowerCase();
      if (text.length > 0 && partialThoughtTag.startsWith(lower)) {
        thought = '';
        story = '';
        isThinking = true;
      } else {
        thought = '';
        story = text;
        isThinking = false;
      }
    }
  }

  return { thought, story, isThinking };
}

export {
  parseThoughtAndStory as da,
};

