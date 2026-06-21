function ssePayload(line) {
  const value = String(line || '').trim();
  if (!value || !value.startsWith('data: ')) return null;
  return value.slice(6);
}

export function parseOpenAiStreamLine(line) {
  const payload = ssePayload(line);
  if (!payload || payload === '[DONE]') return [];
  try {
    const text = JSON.parse(payload)?.choices?.[0]?.delta?.content || '';
    return text ? [{ text, isThought: false }] : [];
  } catch {
    return [];
  }
}

export function parseGeminiStreamLine(line) {
  const payload = ssePayload(line);
  if (!payload) return [];
  try {
    const parts = JSON.parse(payload)?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return [];
    return parts
      .map((part) => {
        const text = part?.text || part?.thought || '';
        return text ? { text, isThought: !!part?.thought } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function consumeSseLines(buffer, parseLine, onChunk) {
  const lines = String(buffer || '').split('\n');
  const rest = lines.pop() || '';
  for (const line of lines) {
    for (const chunk of parseLine(line)) {
      onChunk(chunk);
    }
  }
  return rest;
}
