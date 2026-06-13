import { normalizeApiKey } from './apiSession.js';

const DEFAULT_OPENAI_MODEL = 'gpt-4.1';
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

export function normalizeKey(value) {
  return normalizeApiKey(value);
}

export function isMaskedApiKey(value) {
  return /^\*{6,}$/.test(normalizeKey(value));
}

export function summarizeApiKey(value, provider) {
  const raw = String(value || '');
  const normalized = normalizeKey(value);
  const inferredProvider = normalized.startsWith('sk-') ? 'openai' : 'gemini';
  const badChars = /[^A-Za-z0-9._-]/.test(normalized);
  return {
    provider: provider || inferredProvider,
    length: normalized.length,
    masked: isMaskedApiKey(normalized),
    short: normalized.length > 0 && normalized.length < 20,
    empty: !normalized,
    badChars,
    sanitizedDelta: raw.length - normalized.length,
  };
}

export function validateApiKey(value, provider) {
  const summary = summarizeApiKey(value, provider);
  if (summary.empty) {
    return { ok: false, message: 'APIキーが未設定です。編集ボタンを押して実キーを入力してください。', summary };
  }
  if (summary.masked) {
    return { ok: false, message: 'APIキーがマスク表示のままです。編集ボタンを押して実キーを入力し直してください。', summary };
  }
  if (summary.short) {
    return { ok: false, message: `APIキーが短すぎます（${summary.length}文字）。実キーを入力し直してください。`, summary };
  }
  if (summary.badChars) {
    return { ok: false, message: 'APIキーに使用できない文字が含まれています。コピー時の余分な文字を除いて入力し直してください。', summary };
  }
  return { ok: true, summary };
}

export function defaultModelForKey(value) {
  return normalizeKey(value).startsWith('sk-') ? DEFAULT_OPENAI_MODEL : DEFAULT_GEMINI_MODEL;
}

export function providerLabelForKey(value) {
  return normalizeKey(value).startsWith('sk-') ? 'ChatGPT' : 'Gemini';
}

export {
  normalizeKey as Oe,
  isMaskedApiKey as Yf,
  summarizeApiKey as Xf,
  validateApiKey as Lt,
  defaultModelForKey as gn,
  providerLabelForKey as Qf,
};
