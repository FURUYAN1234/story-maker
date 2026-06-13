import { callGenerativeAI } from '../api.js';
import { GEMINI_MODELS } from '../data.js';

export async function callLongNovelProvider({
  provider,
  apiKey,
  prompt,
  responseMimeType,
  temperature,
  maxTokens,
  timeoutMs,
  onFallback,
}) {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error(`${provider || 'provider'} API key is missing`);
  }
  const initialModel = provider === 'openai'
    ? 'gpt-4.1'
    : GEMINI_MODELS[0]?.value || 'gemini-2.5-flash';
  return callGenerativeAI(apiKey, initialModel, prompt, onFallback, {
    temperature: temperature ?? (provider === 'gemini' ? 0.92 : 0.86),
    maxTokens: maxTokens || 8192,
    maxOutputTokens: maxTokens || 8192,
    responseMimeType,
    timeoutMs: timeoutMs || 180000,
    disableGoogleSearch: true,
    maxModelAttempts: 2,
  });
}
