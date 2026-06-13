function formatStyleRewriteProgressLog(messages = [], transientLine = '', detailBlock = '') {
  const lines = Array.isArray(messages) ? messages : [];
  let text = '';

  if (lines.length > 0) {
    text += `${lines.join('\n')}\n`;
  }

  if (transientLine) {
    text += `${transientLine}\n`;
  }

  if (detailBlock) {
    text += `\n${detailBlock}`;
  }

  return text;
}

export { formatStyleRewriteProgressLog };
