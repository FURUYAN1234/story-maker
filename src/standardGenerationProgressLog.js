import { getSelectedOpenAIModelId } from './openAiModelCatalog.js';

const THOUGHT_SEPARATOR = '──────────────────────────────────────────────────';

export function selectStandardGenerationRequestModel(provider, fallbackModel) {
  return provider === 'ChatGPT' ? getSelectedOpenAIModelId() : fallbackModel;
}

export function formatStandardRequestWaitStatus(elapsedSeconds) {
  const seconds = Math.max(0, Math.floor(Number(elapsedSeconds) || 0));
  return `[通信] AIモデルからの応答を待機しています (${seconds}秒経過)`;
}

export function formatStandardGenerationProgressLog({
  messages = [],
  communicationStatus = '',
  thoughtText = '',
  bodyStatus = '',
} = {}) {
  let logText = '';
  const safeMessages = Array.isArray(messages) ? messages.filter(message => message !== null && message !== undefined) : [];

  if (safeMessages.length > 0) {
    logText += `${safeMessages.join('\n')}\n`;
  }
  if (communicationStatus) {
    logText += `${communicationStatus}\n`;
  }
  if (thoughtText) {
    logText += `\n${THOUGHT_SEPARATOR}\n`;
    logText += '【AIの思考プロセス (CoT)】\n';
    logText += `${String(thoughtText).trim()}\n`;
    logText += `${THOUGHT_SEPARATOR}\n`;
  }
  if (bodyStatus) {
    logText += `\n${bodyStatus}`;
  }

  return logText;
}
