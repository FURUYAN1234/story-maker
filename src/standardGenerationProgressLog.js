const THOUGHT_SEPARATOR = '──────────────────────────────────────────────────';

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
