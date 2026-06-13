// Shared API error classification helpers used by the legacy runtime.
// The exported short aliases preserve the current legacyMain call sites.

export function toText(value) {
  return String(value || '');
}

export function toLowerText(value) {
  return toText(value).toLowerCase();
}

export function isSafetyError(value) {
  const text = toLowerText(value);
  return text.includes('safety') || text.includes('prohibited') || text.includes('block');
}

export function isQuotaError(value) {
  const text = toLowerText(value);
  return text.includes('quota') ||
    text.includes('429') ||
    text.includes('resource exhausted') ||
    text.includes('rate limit') ||
    text.includes('billing') ||
    text.includes('limit exceeded');
}

export function isAuthError(value) {
  const text = toLowerText(value);
  return text.includes('api key not valid') ||
    text.includes('api_key_invalid') ||
    text.includes('invalid api key') ||
    text.includes('invalid_api_key') ||
    text.includes('unauthenticated') ||
    text.includes('authentication') ||
    text.includes('401') ||
    text.includes('invalid authentication') ||
    (text.includes('permission denied') && (text.includes('api key') || text.includes('credential') || text.includes('auth')));
}

export function hasAvailableModels(value) {
  return toText(value).includes('Available Models:');
}

export function isModelOrRequestError(value) {
  const text = toLowerText(value);
  return text.includes('404') ||
    text.includes('not found') ||
    text.includes('not supported') ||
    text.includes('model') ||
    text.includes('bad request') ||
    text.includes('invalid argument') ||
    text.includes('invalid_argument') ||
    text.includes('thinkingconfig') ||
    text.includes('thinking_config') ||
    text.includes('generatecontent') ||
    text.includes('streamgeneratecontent');
}

export function buildApiFailureMessage(label, diagnosis, details, options = {}) {
  const diagnosisText = toText(diagnosis);
  const detailText = Array.isArray(details) ? details.join('\n') : toText(details);
  const diagnosisLooksAvailable = hasAvailableModels(diagnosisText);
  const detailBlock = detailText ? `\n\n[各モデルのエラー詳細]\n${detailText}` : '';

  if (options.safety || isSafetyError(diagnosisText) || isSafetyError(detailText)) {
    return options.vision ?
      '【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。' :
      '【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。';
  }

  if (options.quota || isQuotaError(diagnosisText) || isQuotaError(detailText)) {
    return '【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。';
  }

  if (isAuthError(diagnosisText) || (options.auth && !diagnosisLooksAvailable && !isModelOrRequestError(detailText))) {
    return '【認証エラー】APIキーが無効です。正しいキーを設定してください。';
  }

  if (diagnosisLooksAvailable || isModelOrRequestError(diagnosisText) || isModelOrRequestError(detailText)) {
    return `【モデル/リクエストエラー】APIキーは保存されていますが、利用可能モデルまたは送信形式で失敗しました。\n診断: ${diagnosisText}${detailBlock}`;
  }

  return `${label}: ${diagnosisText}${detailBlock}`;
}

export {
  toText as Ho,
  toLowerText as kr,
  isSafetyError as Hs,
  isQuotaError as Js,
  isAuthError as fo,
  hasAvailableModels as Vd,
  isModelOrRequestError as ia,
  buildApiFailureMessage as xr,
};
