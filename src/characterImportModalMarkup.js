import { Ce } from './domHelpers.js';
import { At, Et } from './legacyOptionData.js';

function Cf(e,t){const n=At.map(c=>`<option value="${c}">${c}</option>`).join(""),o=Et.map(c=>`<option value="${c}">${c}</option>`).join(""),r=e.map((c,p)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${p}" checked>
          <span class="ci-char-name-display">${c.name||`キャラ${p+1}`}</span>
        </label>
        <span class="ci-char-badge">${c.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${p}" value="${(c.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${p}" value="${(c.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${p}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${p}" value="${(c.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${p}">
              <option value="">-- 自由入力に切替 --</option>
              ${o}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${p}" value="${(c.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${p}" rows="3">${(c.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),a=Array.isArray(t)?t:t?[t]:[],i=a.length>0?`<div class="ci-thumbnail-wrap">${a.map((c,p)=>`<img src="${c}" class="ci-thumbnail" alt="解析元画像 ${p+1}">`).join("")}</div>`:"";return`
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${e.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${i}
        <div class="ci-char-list">
          ${r}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `}

export {
  Cf,
};
