export const LONG_OUTPUT_INACTIVITY_TIMEOUT_MS = 600_000;

export function getGenerationTimeoutMs({ stage = '', mode = '', charLength = 0 } = {}) {
  const normalizedStage = String(stage || '').trim().toLowerCase();
  const normalizedMode = String(mode || '').trim().toLowerCase();
  if (normalizedStage === 'generation' && normalizedMode === 'long_10000') {
    return LONG_OUTPUT_INACTIVITY_TIMEOUT_MS;
  }
  if (normalizedStage === 'brushup' && (normalizedMode === 'long_10000' || Number(charLength) >= 10000)) {
    return LONG_OUTPUT_INACTIVITY_TIMEOUT_MS;
  }
  return null;
}
