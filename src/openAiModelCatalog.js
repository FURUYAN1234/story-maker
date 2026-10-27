const resolveDefaultOpenAIModelId = () => 'gpt-6.1-sol';
const DEFAULT_OPENAI_MODEL_ID = resolveDefaultOpenAIModelId();
const OPENAI_MODEL_PRICE_SNAPSHOT_DATE = '2026-10-27';

const OPENAI_MODEL_OPTIONS = Object.freeze([
  { id: 'gpt-6-astra', label: 'GPT-6 Astra', description: '最も難しい構成・推敲向け', inputPriceUsdPerM: 10, outputPriceUsdPerM: 50 },
  { id: 'gpt-6.1-sol', label: 'GPT-6.1 Sol', description: '新しいSol・物語構成と料金のバランス', inputPriceUsdPerM: 2, outputPriceUsdPerM: 10 },
  { id: 'gpt-6.1-terra', label: 'GPT-6.1 Terra', description: '画像理解と自然な文章を低コストで両立', inputPriceUsdPerM: 1, outputPriceUsdPerM: 5 },
  { id: 'gpt-6-sol', label: 'GPT-6 Sol', description: '品質とコストのバランス型', inputPriceUsdPerM: 2, outputPriceUsdPerM: 10 },
  { id: 'gpt-5.6-sol', label: 'GPT-5.6 Sol', description: '複雑な物語構成に強い高品質型', inputPriceUsdPerM: 4, outputPriceUsdPerM: 20 },
  { id: 'gpt-5.6-terra', label: 'GPT-5.6 Terra', description: '知性とコストを両立する汎用型', inputPriceUsdPerM: 2, outputPriceUsdPerM: 12 },
  { id: 'gpt-6-luna', label: 'GPT-6 Luna', description: '軽量・高速な大量処理向け', inputPriceUsdPerM: 0.1, outputPriceUsdPerM: 0.5 },
  { id: 'gpt-5.6-luna', label: 'GPT-5.6 Luna', description: '低コスト重視の大量処理向け', inputPriceUsdPerM: 0.2, outputPriceUsdPerM: 1.2 },
]);

const OPENAI_MODEL_IDS = new Set(OPENAI_MODEL_OPTIONS.map(model => model.id));
const OPENAI_CHAT_MODEL_IDS = OPENAI_MODEL_OPTIONS.map(({id})=>id);
let selectedOpenAIModelId = DEFAULT_OPENAI_MODEL_ID;

function normalizeOpenAIModelId(modelId) {
  const normalized = String(modelId || '').trim().toLowerCase();
  return OPENAI_MODEL_IDS.has(normalized) ? normalized : DEFAULT_OPENAI_MODEL_ID;
}

function getOpenAIModelOption(modelId) {
  const normalized = normalizeOpenAIModelId(modelId);
  return OPENAI_MODEL_OPTIONS.find(model => model.id === normalized);
}

function getSelectedOpenAIModelId() {
  return selectedOpenAIModelId;
}

function setSelectedOpenAIModelId(modelId) {
  selectedOpenAIModelId = normalizeOpenAIModelId(modelId);
  return selectedOpenAIModelId;
}

function resetSelectedOpenAIModelId() {
  selectedOpenAIModelId = DEFAULT_OPENAI_MODEL_ID;
  return selectedOpenAIModelId;
}

function getOpenAIResponsesRoute(modelId = selectedOpenAIModelId) {
  const normalized = normalizeOpenAIModelId(modelId);
  const selectedIndex = OPENAI_MODEL_OPTIONS.findIndex(model => model.id === normalized);
  return OPENAI_MODEL_OPTIONS.slice(Math.max(0, selectedIndex)).map(model => model.id);
}

function getOpenAIChatRoute(modelId = selectedOpenAIModelId) {
  const normalized = normalizeOpenAIModelId(modelId);
  const selectedIndex = OPENAI_CHAT_MODEL_IDS.indexOf(normalized);
  return selectedIndex >= 0
    ? OPENAI_CHAT_MODEL_IDS.slice(selectedIndex)
    : [...OPENAI_CHAT_MODEL_IDS];
}

export function openAIChatOptions(modelId, maxTokens = 8192) {
  return /^gpt-(?:6(?:\.\d+)?|5\.6)-/.test(modelId)
    ? {max_completion_tokens: Math.max(maxTokens, 32768)}
    : {temperature: 0.3, max_tokens: maxTokens};
}

export function completedOpenAIChatText(data) {
  const choice = data?.choices?.[0];
  const text = choice?.message?.content;
  if (choice?.finish_reason !== 'stop' || choice?.message?.refusal || typeof text !== 'string' || !text.trim()) {
    throw Object.assign(new Error('OpenAI response incomplete or refused'), {terminal:true});
  }
  return text;
}

function formatOpenAIModelPrice(model) {
  const option = model || getOpenAIModelOption(DEFAULT_OPENAI_MODEL_ID);
  return `入力 $${Number(option.inputPriceUsdPerM).toFixed(2)} / 出力 $${Number(option.outputPriceUsdPerM).toFixed(2)} USD / 100万トークン`;
}

function emitOpenAIModelRouteEvent(phase, modelId, runtime = globalThis) {
  if (typeof runtime?.dispatchEvent !== 'function' || typeof runtime?.CustomEvent !== 'function') return;
  runtime.dispatchEvent(new runtime.CustomEvent('story-maker:openai-model-route', {
    detail: {
      phase,
      modelId,
      selectedModelId: getSelectedOpenAIModelId(),
    },
  }));
}

export {
  DEFAULT_OPENAI_MODEL_ID,
  OPENAI_MODEL_OPTIONS,
  OPENAI_MODEL_PRICE_SNAPSHOT_DATE,
  emitOpenAIModelRouteEvent,
  formatOpenAIModelPrice,
  getOpenAIChatRoute,
  getOpenAIModelOption,
  getOpenAIResponsesRoute,
  getSelectedOpenAIModelId,
  resetSelectedOpenAIModelId,
  resolveDefaultOpenAIModelId,
  setSelectedOpenAIModelId,
};
