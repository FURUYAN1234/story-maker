const OPENAI_STYLE_ANALYZER_CHAR_LIMIT = 80000;
const ANALYZE_READY_LABEL = '🔬 超強引！作風解析を実行';
const OPENAI_LIMIT_LABEL = '⚠ 文字数超過 (OpenAI制限)';
const OPENAI_LIMIT_TITLE = 'OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。';

function hasDirectStyleText(value) {
  return String(value || '').trim().length > 0;
}

function countStyleAnalyzerTextChars(textFiles, directText = '') {
  const files = Array.isArray(textFiles) ? textFiles : [];
  return String(directText || '').length + files.reduce((total, file) => (
    total + (file?.content ? String(file.content).length : 0)
  ), 0);
}

function getAddDirectTextState(directText) {
  return { disabled: !hasDirectStyleText(directText) };
}

function getAnalyzeButtonState({
  apiKey,
  textFiles,
  imageFiles,
  directText,
  provider,
  openAiLimit = OPENAI_STYLE_ANALYZER_CHAR_LIMIT,
} = {}) {
  const hasTextFiles = Array.isArray(textFiles) && textFiles.length > 0;
  const hasImages = Array.isArray(imageFiles) && imageFiles.length > 0;
  const hasDirect = hasDirectStyleText(directText);
  const totalTextChars = countStyleAnalyzerTextChars(textFiles, directText);

  if (provider === 'openai' && totalTextChars > openAiLimit) {
    return {
      disabled: true,
      text: OPENAI_LIMIT_LABEL,
      title: OPENAI_LIMIT_TITLE,
    };
  }

  return {
    disabled: !(apiKey && (hasTextFiles || hasImages || hasDirect)),
    text: ANALYZE_READY_LABEL,
    title: '',
  };
}

function getReflectButtonState({ storyText, outputIsEmpty, hasAnalysis } = {}) {
  return {
    disabled: !(String(storyText || '').length >= 10 && !outputIsEmpty && hasAnalysis),
  };
}

export {
  ANALYZE_READY_LABEL,
  OPENAI_LIMIT_LABEL,
  OPENAI_LIMIT_TITLE,
  OPENAI_STYLE_ANALYZER_CHAR_LIMIT,
  countStyleAnalyzerTextChars,
  getAddDirectTextState,
  getAnalyzeButtonState,
  getReflectButtonState,
  hasDirectStyleText,
};
