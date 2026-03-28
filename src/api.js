// ============================================================
// api.js — Gemini API呼び出し（フォールバック対応・Nano Banana Pro準拠）
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
async function _callGemini(apiKey, model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 8192, temperature: 1.0 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ]
    }),
  });
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
}

/**
 * Gemini API呼び出し（Nano Banana Pro 準拠のフォールバック付き）
 */
export async function callGemini(apiKey, initialModel, prompt, onFallback) {
  const allModels = [initialModel, ...GEMINI_MODELS.map(m => m.value).filter(m => m !== initialModel)];

  for (const modelId of allModels) {
      try {
          if (modelId !== initialModel && onFallback) onFallback(modelId);
          const text = await _callGemini(apiKey, modelId, prompt);
          return { text, usedModel: modelId };
      } catch (err) {
          console.warn(`Model ${modelId} failed:`, err.message);
          // 429(Rate Limit) or Quota => 待機すべきだが今回は次のモデルへ
          continue;
      }
  }

  // --- ALL MODELS FAILED: RUN DIAGNOSIS ---
  console.log("All models failed. Running diagnosis...");
  const diagnosis = await diagnoseConnection(apiKey);
  console.error("DIAGNOSIS RESULT:", diagnosis);

  let errorMsg = `全モデル接続失敗: ${diagnosis}\n`;
  if (diagnosis.includes("Quota exceeded") || diagnosis.includes("429")) {
      errorMsg = "【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)\nしばらく時間を置いてから再試行するか、課金プランを確認してください。";
  } else if (diagnosis.includes("API Error: API key not valid") || diagnosis.includes("403")) {
      errorMsg = "【認証エラー】APIキーが無効です。正しいキーを設定してください。";
  } else if (diagnosis.includes("SAFETY") || diagnosis.includes("PROHIBITED")) {
      errorMsg = "【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。";
  } else if (diagnosis.includes("404")) {
      errorMsg = "【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。";
  }

  throw new Error(errorMsg);
}
