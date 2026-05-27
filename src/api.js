// ============================================================
// api.js — Gemini API呼び出し（フォールバック対応）
// ============================================================
import { GEMINI_MODELS } from './data.js';

export const diagnoseConnection = async (apiKey) => {
    if (!apiKey) return "API Key not set.";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            return `API Error: ${data.error.message}`;
        }
        if (!data.models) {
            return "No models returned by API.";
        }
        const relevantModels = data.models
            .map(m => m.name.replace("models/", ""))
            .filter(name => name.includes("gemini"));

        return `Available Models: ${relevantModels.join(", ")}`;
    } catch (e) {
        return `Diagnostic Failed: ${e.message}`;
    }
};

/**
 * Gemini API呼び出し（単一モデル）
 */
async function _callGemini(apiKey, model, prompt, options = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const generationConfig = { maxOutputTokens: 8192, temperature: 1.0 };
  if (options.responseMimeType) {
    generationConfig.responseMimeType = options.responseMimeType;
  }

  // 25秒タイムアウトの設定
  const timeoutMs = options.timeoutMs || 25000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig,
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ]
  };

  // JSON出力モード時はGoogle検索グラウンディングを無効化（API制限・バッドリクエスト防止）
  if (generationConfig.responseMimeType !== 'application/json' && !options.disableGoogleSearch) {
    requestBody.tools = [{ googleSearch: {} }];
  }

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(requestBody),
    });
    
    clearTimeout(timeoutId);

    if (!resp.ok) {
      const et = await resp.text();
      let errMsg = `Gemini HTTP ${resp.status}`;
      try {
          const errJson = JSON.parse(et);
          if (errJson.error && errJson.error.message) errMsg += ` — ${errJson.error.message}`;
      } catch (e) {
          errMsg += ` — ${et.slice(0, 300)}`;
      }
      throw new Error(errMsg);
    }
    const data = await resp.json();

    if (data.promptFeedback?.blockReason) {
      throw new Error(`Blocked by Safety Filter: ${data.promptFeedback.blockReason}`);
    }

    if (data.candidates?.[0]?.content?.parts) {
      const text = data.candidates[0].content.parts.map(p => p.text || '').join('');
      if (!text) {
          const reason = data.candidates[0].finishReason || "UNKNOWN";
          throw new Error(`Empty response (FinishReason: ${reason}).`);
      }
      return text;
    }
    if (data.error) throw new Error(`Gemini API Error: ${data.error.message}`);
    throw new Error("No response candidates (Unknown Model Refusal)");
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Timeout: ${model} (${timeoutMs / 1000}s)`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Gemini API呼び出し（フォールバック付き）
 */
/**
 * Gemini Vision API呼び出し（画像付き・単一モデル）
 */
async function _callGeminiVision(apiKey, model, prompt, imageBase64, mimeType, options = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const generationConfig = { maxOutputTokens: 8192, temperature: 0.3 };
  if (options.responseMimeType) {
    generationConfig.responseMimeType = options.responseMimeType;
  }

  // 60秒タイムアウト（画像解析対応）
  const timeoutMs = options.timeoutMs || 60000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: imageBase64 } }
          ]
        }],
        generationConfig,
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }),
    });
    
    clearTimeout(timeoutId);

    if (!resp.ok) {
      const et = await resp.text();
      let errMsg = `Gemini HTTP ${resp.status}`;
      try {
          const errJson = JSON.parse(et);
          if (errJson.error && errJson.error.message) errMsg += ` — ${errJson.error.message}`;
      } catch (e) {
          errMsg += ` — ${et.slice(0, 300)}`;
      }
      throw new Error(errMsg);
    }
    const data = await resp.json();

    if (data.promptFeedback?.blockReason) {
      throw new Error(`Blocked by Safety Filter: ${data.promptFeedback.blockReason}`);
    }

    if (data.candidates?.[0]?.content?.parts) {
      const text = data.candidates[0].content.parts.map(p => p.text || '').join('');
      if (!text) {
          const reason = data.candidates[0].finishReason || "UNKNOWN";
          throw new Error(`Empty response (FinishReason: ${reason}).`);
      }
      return text;
    }
    if (data.error) throw new Error(`Gemini API Error: ${data.error.message}`);
    throw new Error("No response candidates (Unknown Model Refusal)");
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Timeout: ${model} vision (${timeoutMs / 1000}s)`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Gemini Vision API呼び出し（フォールバック付き）
 * 画像認識用：キャラクターシート解析等に使用
 * 
 * モデル優先順位は画像認識に最適化された優先順位に準拠
 * gemini-3系はアニメ画像で PROHIBITED_CONTENT を返すため後方に配置
 */
export async function callGenerativeAIVision(apiKey, prompt, imageBase64, mimeType, onFallback, options = {}) {
  if (apiKey.trim().startsWith("sk-")) {
    return _callOpenAIVision(apiKey.trim(), prompt, imageBase64, mimeType, onFallback, options);
  }

  // 最新の安定かつ画像認識に適したモデル（非推奨化対策）
  const IMAGE_MODEL_IDS = [
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash"
  ];

  const errors = [];
  let isSafetyBlocked = false;
  let isQuotaExceeded = false;
  let isAuthError = false;

  for (const modelId of IMAGE_MODEL_IDS) {
    try {
      if (onFallback && modelId !== IMAGE_MODEL_IDS[0]) onFallback(modelId);
      const text = await _callGeminiVision(apiKey, modelId, prompt, imageBase64, mimeType, options);
      return { text, usedModel: modelId };
    } catch (err) {
      const msg = err.message || '';
      console.warn(`Vision model ${modelId} failed:`, msg);
      errors.push(`${modelId}: ${msg}`);
      
      const lowerMsg = msg.toLowerCase();
      if (lowerMsg.includes("safety") || lowerMsg.includes("prohibited") || lowerMsg.includes("block")) {
        isSafetyBlocked = true;
      }
      if (lowerMsg.includes("quota") || lowerMsg.includes("429") || lowerMsg.includes("limit")) {
        isQuotaExceeded = true;
      }
      if (lowerMsg.includes("api key") || lowerMsg.includes("403") || lowerMsg.includes("invalid")) {
        isAuthError = true;
      }
      continue;
    }
  }

  // --- 全モデル失敗時：アカウント診断 ---
  const diagnosis = await diagnoseConnection(apiKey);
  console.error("VISION DIAGNOSIS:", diagnosis);

  let errorMsg = `全モデルでの画像認識に失敗: ${diagnosis}\n`;
  if (isSafetyBlocked || diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
    errorMsg = "【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。";
  } else if (isQuotaExceeded || diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
    errorMsg = "【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。";
  } else if (isAuthError || diagnosis.includes("API key not valid") || diagnosis.includes("403")) {
    errorMsg = "【認証エラー】APIキーが無効です。正しいキーを設定してください。";
  } else {
    errorMsg += `\n[各モデルのエラー詳細]\n${errors.join('\n')}`;
  }

  throw new Error(errorMsg);
}

export async function callGenerativeAI(apiKey, initialModel, prompt, onFallback, options = {}) {
  if (apiKey.trim().startsWith("sk-")) {
    return _callOpenAI(apiKey.trim(), prompt, onFallback, options);
  }

  // 自動的に gemini-1.5-pro (または gemini-pro-latest) へフォールバックするロジックを優先的に差し込む
  const fallbackTargets = ['gemini-1.5-pro', 'gemini-pro-latest'];
  
  const modelList = [];
  if (lastSuccessfulGeminiModel) {
    modelList.push(lastSuccessfulGeminiModel);
  }
  modelList.push(initialModel);
  modelList.push(...fallbackTargets);
  modelList.push(...GEMINI_MODELS.map(m => m.value));

  const uniqueModels = new Set(modelList);
  const allModels = Array.from(uniqueModels);

  const errors = [];
  let isSafetyBlocked = false;
  let isQuotaExceeded = false;
  let isAuthError = false;

  const startModel = allModels[0];
  for (const modelId of allModels) {
      try {
          if (modelId !== startModel && onFallback) onFallback(modelId);
          const text = await _callGemini(apiKey, modelId, prompt, options);
          lastSuccessfulGeminiModel = modelId;
          return { text, usedModel: modelId };
      } catch (err) {
          const msg = err.message || '';
          console.warn(`Model ${modelId} failed:`, msg);
          errors.push(`${modelId}: ${msg}`);
          
          const lowerMsg = msg.toLowerCase();
          if (lowerMsg.includes("safety") || lowerMsg.includes("prohibited") || lowerMsg.includes("block")) {
            isSafetyBlocked = true;
          }
          if (lowerMsg.includes("quota") || lowerMsg.includes("429") || lowerMsg.includes("limit")) {
            isQuotaExceeded = true;
          }
          if (lowerMsg.includes("api key") || lowerMsg.includes("403") || lowerMsg.includes("invalid")) {
            isAuthError = true;
          }
          continue;
      }
  }

  // --- ALL MODELS FAILED: RUN DIAGNOSIS ---
  console.log("All models failed. Running diagnosis...");
  const diagnosis = await diagnoseConnection(apiKey);
  console.error("DIAGNOSIS RESULT:", diagnosis);

  let errorMsg = `全モデル接続失敗: ${diagnosis}\n`;
  if (isSafetyBlocked || diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
      errorMsg = "【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。";
  } else if (isQuotaExceeded || diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
      errorMsg = "【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)\nしばらく時間を置いてから再試行するか、課金プランを確認してください。";
  } else if (isAuthError || diagnosis.includes("API Error: API key not valid") || diagnosis.includes("403")) {
      errorMsg = "【認証エラー】APIキーが無効です。正しいキーを設定してください。";
  } else if (diagnosis.includes("404")) {
      errorMsg = "【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。";
  } else {
      errorMsg += `\n[各モデルのエラー詳細]\n${errors.join('\n')}`;
  }

  throw new Error(errorMsg);
}

// ============================================================
// OpenAI API呼び出しロジック
// ============================================================

// 一度接続成功したモデルのキャッシュ（フォールバック遅延防止）
let lastSuccessfulGeminiModel = null;
let lastSuccessfulOpenAIModel = null;
let lastSuccessfulOpenAIVisionModel = null;

const OPENAI_TEXT_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-5.5",
  "gpt-5.5-instant",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano"
];

async function _callOpenAI(apiKey, prompt, onFallback, options = {}) {
  const models = [];
  if (lastSuccessfulOpenAIModel) {
    models.push(lastSuccessfulOpenAIModel);
  }
  models.push(...OPENAI_TEXT_MODELS);
  const uniqueModels = Array.from(new Set(models));

  const startModel = uniqueModels[0];
  for (const modelId of uniqueModels) {
    try {
      if (modelId !== startModel && onFallback) onFallback(modelId);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: prompt }],
          temperature: 1.0,
          max_tokens: 8192,
          response_format: options.responseMimeType === "application/json" ? { type: "json_object" } : undefined,
        })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(`OpenAI HTTP ${resp.status} - ${errData.error?.message || resp.statusText}`);
      }

      const data = await resp.json();
      const text = data.choices?.[0]?.message?.content || "";
      if (!text) throw new Error(`Empty response (FinishReason: ${data.choices?.[0]?.finish_reason || "UNKNOWN"})`);

      lastSuccessfulOpenAIModel = modelId;
      return { text, usedModel: modelId };
    } catch (err) {
      console.warn(`Model ${modelId} failed:`, err.message);
      continue;
    }
  }

  throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。");
}

const OPENAI_VISION_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-5.5",
  "gpt-5.4",
  "gpt-5.4-mini"
];

async function _callOpenAIVision(apiKey, prompt, imageBase64, mimeType, onFallback, options = {}) {
  const imageUrl = `data:${mimeType};base64,${imageBase64}`;
  
  const models = [];
  if (lastSuccessfulOpenAIVisionModel) {
    models.push(lastSuccessfulOpenAIVisionModel);
  }
  models.push(...OPENAI_VISION_MODELS);
  const uniqueModels = Array.from(new Set(models));

  const startModel = uniqueModels[0];
  for (const modelId of uniqueModels) {
    try {
      if (modelId !== startModel && onFallback) onFallback(modelId);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: imageUrl, detail: "high" } }
              ]
            }
          ],
          temperature: 0.3,
          max_tokens: 8192,
          response_format: options.responseMimeType === "application/json" ? { type: "json_object" } : undefined,
        })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(`OpenAI HTTP ${resp.status} - ${errData.error?.message || resp.statusText}`);
      }

      const data = await resp.json();
      const text = data.choices?.[0]?.message?.content || "";
      if (!text) throw new Error(`Empty response (FinishReason: ${data.choices?.[0]?.finish_reason || "UNKNOWN"})`);

      lastSuccessfulOpenAIVisionModel = modelId;
      return { text, usedModel: modelId };
    } catch (err) {
      console.warn(`Vision Model ${modelId} failed:`, err.message);
      continue;
    }
  }

  throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。");
}

/**
 * Gemini マルチモーダルAPI呼び出し（複数画像対応・単一モデル）
 */
async function _callGeminiMultimodal(apiKey, model, prompt, images, options = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const parts = [{ text: prompt }];
  images.forEach(img => {
    parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
  });

  const generationConfig = { maxOutputTokens: 8192, temperature: 0.4 };
  if (options.responseMimeType) {
    generationConfig.responseMimeType = options.responseMimeType;
  }

  // 60秒タイムアウト（複数画像解析対応）
  const timeoutMs = options.timeoutMs || 60000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig,
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }),
    });
    
    clearTimeout(timeoutId);

    if (!resp.ok) {
      const et = await resp.text();
      let errMsg = `Gemini HTTP ${resp.status}`;
      try {
          const errJson = JSON.parse(et);
          if (errJson.error && errJson.error.message) errMsg += ` — ${errJson.error.message}`;
      } catch (e) {
          errMsg += ` — ${et.slice(0, 300)}`;
      }
      throw new Error(errMsg);
    }
    const data = await resp.json();

    if (data.promptFeedback?.blockReason) {
      throw new Error(`Blocked by Safety Filter: ${data.promptFeedback.blockReason}`);
    }

    if (data.candidates?.[0]?.content?.parts) {
      const text = data.candidates[0].content.parts.map(p => p.text || '').join('');
      if (!text) {
          const reason = data.candidates[0].finishReason || "UNKNOWN";
          throw new Error(`Empty response (FinishReason: ${reason}).`);
      }
      return text;
    }
    if (data.error) throw new Error(`Gemini API Error: ${data.error.message}`);
    throw new Error("No response candidates (Unknown Model Refusal)");
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Timeout: ${model} multimodal (${timeoutMs / 1000}s)`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * OpenAI マルチモーダルAPI呼び出し（複数画像対応・単一モデル）
 */
async function _callOpenAIMultimodal(apiKey, prompt, images, onFallback, options = {}) {
  const OPENAI_VISION_MODELS = ["gpt-4.1", "gpt-4o", "gpt-4.1-mini"];
  
  for (const modelId of OPENAI_VISION_MODELS) {
    try {
      if (modelId !== OPENAI_VISION_MODELS[0] && onFallback) onFallback(modelId);
      
      const content = [{ type: "text", text: prompt }];
      images.forEach(img => {
        content.push({
          type: "image_url",
          image_url: { url: `data:${img.mimeType};base64,${img.base64}`, detail: "high" }
        });
      });

      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content }],
          temperature: 0.4,
          max_tokens: 8192,
          response_format: options.responseMimeType === "application/json" ? { type: "json_object" } : undefined,
        })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(`OpenAI HTTP ${resp.status} - ${errData.error?.message || resp.statusText}`);
      }

      const data = await resp.json();
      const text = data.choices?.[0]?.message?.content || "";
      if (!text) throw new Error(`Empty response (FinishReason: ${data.choices?.[0]?.finish_reason || "UNKNOWN"})`);

      return { text, usedModel: modelId };
    } catch (err) {
      console.warn(`Vision Model ${modelId} failed:`, err.message);
      continue;
    }
  }

  throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。");
}

/**
 * 複合マルチモーダル解析API呼び出し（複数画像＋テキスト）
 */
export async function callGenerativeAIMultimodal(apiKey, prompt, images, onFallback, options = {}) {
  if (apiKey.trim().startsWith("sk-")) {
    return _callOpenAIMultimodal(apiKey.trim(), prompt, images, onFallback, options);
  }

  // 最新の安定かつ画像認識に適したモデル（非推奨化対策）
  const IMAGE_MODEL_IDS = [
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash"
  ];

  const errors = [];
  let isSafetyBlocked = false;
  let isQuotaExceeded = false;
  let isAuthError = false;

  for (const modelId of IMAGE_MODEL_IDS) {
    try {
      if (onFallback && modelId !== IMAGE_MODEL_IDS[0]) onFallback(modelId);
      const text = await _callGeminiMultimodal(apiKey, modelId, prompt, images, options);
      return { text, usedModel: modelId };
    } catch (err) {
      const msg = err.message || '';
      console.warn(`Vision model ${modelId} failed:`, msg);
      errors.push(`${modelId}: ${msg}`);
      
      const lowerMsg = msg.toLowerCase();
      if (lowerMsg.includes("safety") || lowerMsg.includes("prohibited") || lowerMsg.includes("block")) {
        isSafetyBlocked = true;
      }
      if (lowerMsg.includes("quota") || lowerMsg.includes("429") || lowerMsg.includes("limit")) {
        isQuotaExceeded = true;
      }
      if (lowerMsg.includes("api key") || lowerMsg.includes("403") || lowerMsg.includes("invalid")) {
        isAuthError = true;
      }
      continue;
    }
  }

  // --- 全モデル失敗時：アカウント診断 ---
  const diagnosis = await diagnoseConnection(apiKey);
  console.error("VISION DIAGNOSIS:", diagnosis);

  let errorMsg = `全モデルでの画像認識に失敗: ${diagnosis}\n`;
  if (isSafetyBlocked || diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
    errorMsg = "【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。";
  } else if (isQuotaExceeded || diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
    errorMsg = "【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。";
  } else if (isAuthError || diagnosis.includes("API key not valid") || diagnosis.includes("403")) {
    errorMsg = "【認証エラー】APIキーが無効です。正しいキーを設定してください。";
  } else {
    errorMsg += `\n[各モデルのエラー詳細]\n${errors.join('\n')}`;
  }

  throw new Error(errorMsg);
}

/**
 * OpenAI APIストリーミング呼び出し
 */
async function _callOpenAIStream(apiKey, prompt, onChunk, onFallback, options = {}) {
  const models = [];
  if (lastSuccessfulOpenAIModel) {
    models.push(lastSuccessfulOpenAIModel);
  }
  models.push(...OPENAI_TEXT_MODELS);
  const uniqueModels = Array.from(new Set(models));

  const startModel = uniqueModels[0];
  for (const modelId of uniqueModels) {
    try {
      if (modelId !== startModel && onFallback) onFallback(modelId);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: prompt }],
          temperature: 1.0,
          max_tokens: 8192,
          stream: true,
          response_format: options.responseMimeType === "application/json" ? { type: "json_object" } : undefined,
        })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(`OpenAI HTTP ${resp.status} - ${errData.error?.message || resp.statusText}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          
          let lines = buffer.split("\n");
          buffer = lines.pop();
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            
            const dataStr = trimmed.slice(6);
            if (dataStr === "[DONE]") break;
            
            try {
              const json = JSON.parse(dataStr);
              const content = json.choices?.[0]?.delta?.content || "";
              if (content) {
                onChunk({ text: content, isThought: false });
              }
            } catch (e) {
              // パーシャルなJSONのパースエラーは無視
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      lastSuccessfulOpenAIModel = modelId;
      return { usedModel: modelId };
    } catch (err) {
      console.warn(`Model ${modelId} stream failed:`, err.message);
      continue;
    }
  }
  throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。");
}

/**
 * Gemini APIストリーミング呼び出し
 */
async function _callGeminiStream(apiKey, model, prompt, onChunk, options = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
  const generationConfig = { maxOutputTokens: 8192, temperature: 1.0 };
  
  if (!options.disableThinkingConfig && (model.includes("gemini-2.5") || model.includes("gemini-2.0") || model.includes("gemini-3") || model.includes("gemini-3.5"))) {
    generationConfig.thinkingConfig = {
      thinkingBudget: 2048
    };
  }
  
  if (options.responseMimeType) {
    generationConfig.responseMimeType = options.responseMimeType;
  }
  
  // 25秒タイムアウト設定（データ無受信でタイムアウト）
  const timeoutMs = options.timeoutMs || 25000;
  const controller = new AbortController();
  let timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig,
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ]
  };

  // JSON出力モード時はGoogle検索グラウンディングを無効化（API制限・バッドリクエスト防止）
  if (generationConfig.responseMimeType !== 'application/json' && !options.disableGoogleSearch) {
    requestBody.tools = [{ googleSearch: {} }];
  }

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(requestBody),
    });

    if (!resp.ok) {
      clearTimeout(timeoutId);
      const et = await resp.text();
      let errMsg = `Gemini HTTP ${resp.status}`;
      try {
          const errJson = JSON.parse(et);
          if (errJson.error && errJson.error.message) errMsg += ` — ${errJson.error.message}`;
      } catch (e) {
          errMsg += ` — ${et.slice(0, 300)}`;
      }
      throw new Error(errMsg);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    try {
      while (true) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        
        let lines = buffer.split("\n");
        buffer = lines.pop();
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          
          const dataStr = trimmed.slice(6);
          try {
            const json = JSON.parse(dataStr);
            const parts = json.candidates?.[0]?.content?.parts;
            if (parts) {
              for (const part of parts) {
                const text = part.text || part.thought || "";
                const isThought = !!part.thought;
                if (text) {
                  onChunk({ text, isThought });
                }
              }
            }
          } catch (e) {
            // パーシャルなJSONのパースエラーは無視
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Timeout: ${model} stream (${timeoutMs / 1000}s)`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Gemini / OpenAI ストリーミング呼び出し（フォールバック付き）
 */
export async function callGenerativeAIStream(apiKey, initialModel, prompt, onChunk, onFallback, options = {}) {
  if (apiKey.trim().startsWith("sk-")) {
    return _callOpenAIStream(apiKey.trim(), prompt, onChunk, onFallback, options);
  }

  // 自動的に gemini-1.5-pro (または gemini-pro-latest) へフォールバックするロジックを優先的に差し込む
  const fallbackTargets = ['gemini-1.5-pro', 'gemini-pro-latest'];

  const modelList = [];
  if (lastSuccessfulGeminiModel) {
    modelList.push(lastSuccessfulGeminiModel);
  }
  modelList.push(initialModel);
  modelList.push(...fallbackTargets);
  modelList.push(...GEMINI_MODELS.map(m => m.value));

  const uniqueModels = new Set(modelList);
  const allModels = Array.from(uniqueModels);

  const errors = [];
  let isSafetyBlocked = false;
  let isQuotaExceeded = false;
  let isAuthError = false;

  const startModel = allModels[0];
  for (const modelId of allModels) {
      try {
          if (modelId !== startModel && onFallback) onFallback(modelId);
          await _callGeminiStream(apiKey, modelId, prompt, onChunk, options);
          lastSuccessfulGeminiModel = modelId;
          return { usedModel: modelId };
      } catch (err) {
          const msg = err.message || '';
          console.warn(`Model ${modelId} stream failed:`, msg);
          errors.push(`${modelId}: ${msg}`);
          
          const lowerMsg = msg.toLowerCase();
          if (lowerMsg.includes("safety") || lowerMsg.includes("prohibited") || lowerMsg.includes("block")) {
            isSafetyBlocked = true;
          }
          if (lowerMsg.includes("quota") || lowerMsg.includes("429") || lowerMsg.includes("limit")) {
            isQuotaExceeded = true;
          }
          if (lowerMsg.includes("api key") || lowerMsg.includes("403") || lowerMsg.includes("invalid")) {
            isAuthError = true;
          }
          
          if (msg.includes("400") || lowerMsg.includes("bad request") || lowerMsg.includes("thinking_config")) {
            try {
              console.log(`Retrying model ${modelId} without thinkingConfig...`);
              await _callGeminiStream(apiKey, modelId, prompt, onChunk, { ...options, disableThinkingConfig: true });
              return { usedModel: modelId };
            } catch (retryErr) {
              console.warn(`Model ${modelId} stream retry failed:`, retryErr.message);
              errors.push(`${modelId} (retry): ${retryErr.message}`);
            }
          }
          continue;
      }
  }

  // --- ALL MODELS FAILED: RUN DIAGNOSIS ---
  console.log("All models failed. Running diagnosis...");
  const diagnosis = await diagnoseConnection(apiKey);
  console.error("DIAGNOSIS RESULT:", diagnosis);

  let errorMsg = `全モデル接続失敗: ${diagnosis}\n`;
  if (isSafetyBlocked || diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
      errorMsg = "【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。";
  } else if (isQuotaExceeded || diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
      errorMsg = "【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)\nしばらく時間を置いてから再試行するか、課金プランを確認してください。";
  } else if (isAuthError || diagnosis.includes("API Error: API key not valid") || diagnosis.includes("403")) {
      errorMsg = "【認証エラー】APIキーが無効です。正しいキーを設定してください。";
  } else if (diagnosis.includes("404")) {
      errorMsg = "【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。";
  } else {
      errorMsg += `\n[各モデルのエラー詳細]\n${errors.join('\n')}`;
  }

  throw new Error(errorMsg);
}
