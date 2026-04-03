// ============================================================
// charImport.js — キャラクターシート画像取り込みモジュール v1.0
// ============================================================
import { callGeminiVision } from './api.js';
import { ROLES, PERSONALITIES } from './data.js';

// OCR用プロンプト（キャラクターシート解析）
const CHAR_ANALYSIS_PROMPT = `この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
画像内に描かれている全てのキャラクターについて、以下の情報をJSON配列で抽出してください。

【抽出項目】
1. name: キャラクター名（画像内のテキストから正確に読み取る）
2. role: 物語での役割（テキストから推定、なければ外見や設定文から推測。例：主人公、ヒロイン、ライバルなど）
3. personality: 性格（テキストから読み取り、なければ表情・ポーズ・設定文から推測。例：元気、クール、ツンデレなど）
4. note: 外見的特徴・設定メモ（以下を全て含むこと）
   - 性別
   - 髪型（長さ・スタイル・色）
   - 服装
   - 眼鏡の有無
   - 体格・身長に関する記述
   - 画像内に書かれた制約条件（「厳禁」「必須」「注意」など）
   - キャラクター間の関係性（幼馴染、同級生など）
   - その他読み取れる設定情報全て

【重要ルール】
- 画像内の日本語テキストを正確に読み取ること（手書き文字も含む）
- 「厳禁」「必須」「注意」などの制約条件は特に重要なので確実にnoteに含めること
- 推測で埋めた項目には末尾に「(推定)」と付けること
- 必ず有効なJSON配列のみを出力すること。説明文・挨拶・マークダウン装飾は一切不要
- JSONはコードブロックで囲まず、純粋なJSON文字列のみ出力すること

出力例:
[{"name":"アカリ","role":"主人公(推定)","personality":"元気","note":"女性, 内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;

/**
 * 画像ファイルをBase64に変換
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // data:image/png;base64,XXXX の形式から XXXX 部分だけを取得
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * AIレスポンスからJSONを安全にパース
 */
function parseCharacterJson(text) {
  // マークダウンコードブロック除去
  let cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  // JSON配列部分だけを抽出
  const match = cleaned.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('AIの応答からキャラクター情報を抽出できませんでした');
  return JSON.parse(match[0]);
}

/**
 * 役割をROLESリストの最も近いものにマッピング
 */
function mapToRole(roleText) {
  if (!roleText) return '';
  const clean = roleText.replace(/\(推定\)/g, '').trim();
  const exact = ROLES.find(r => r === clean);
  if (exact) return exact;
  // 部分一致
  const partial = ROLES.find(r => clean.includes(r) || r.includes(clean));
  return partial || clean;
}

/**
 * 性格をPERSONALITIESリストの最も近いものにマッピング
 */
function mapToPersonality(personalityText) {
  if (!personalityText) return '';
  const clean = personalityText.replace(/\(推定\)/g, '').trim();
  const exact = PERSONALITIES.find(p => p === clean);
  if (exact) return exact;
  const partial = PERSONALITIES.find(p => clean.includes(p) || p.includes(clean));
  return partial || clean;
}

/**
 * モーダルHTMLを生成
 */
function buildModalHtml(characters, thumbnails) {
  const rolesOptions = ROLES.map(r => `<option value="${r}">${r}</option>`).join('');
  const personalitiesOptions = PERSONALITIES.map(p => `<option value="${p}">${p}</option>`).join('');

  const charCards = characters.map((c, i) => `
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${i}" checked>
          <span class="ci-char-name-display">${c.name || `キャラ${i+1}`}</span>
        </label>
        <span class="ci-char-badge">${c.role.includes('(推定)') ? '🤖 AI推定' : '📖 テキスト読取'}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${i}" value="${(c.name || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${i}">
              <option value="">-- 自由入力に切替 --</option>
              ${rolesOptions}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${i}" value="${(c.role || '').replace(/\(推定\)/g, '').trim().replace(/"/g, '&quot;')}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${i}">
              <option value="">-- 自由入力に切替 --</option>
              ${personalitiesOptions}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${i}" value="${(c.personality || '').replace(/\(推定\)/g, '').trim().replace(/"/g, '&quot;')}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${i}" rows="3">${(c.note || '').replace(/</g, '&lt;')}</textarea>
        </div>
      </div>
    </div>
  `).join('');

  // サムネイルギャラリー（複数枚対応）
  const thumbsArray = Array.isArray(thumbnails) ? thumbnails : (thumbnails ? [thumbnails] : []);
  const thumbnailHtml = thumbsArray.length > 0
    ? `<div class="ci-thumbnail-wrap">${thumbsArray.map((src, i) => `<img src="${src}" class="ci-thumbnail" alt="解析元画像 ${i+1}">`).join('')}</div>`
    : '';

  return `
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${characters.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${thumbnailHtml}
        <div class="ci-char-list">
          ${charCards}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * モーダルの内部イベントを設定
 */
function setupModalEvents(characters, onRegister) {
  const modal = document.getElementById('ci-modal');
  if (!modal) return;

  // ドロップダウン↔自由入力の連動（役割）
  modal.querySelectorAll('.ci-role-select').forEach(sel => {
    const idx = sel.dataset.idx;
    const input = modal.querySelector(`.ci-role-input[data-idx="${idx}"]`);
    // 初期値がリストにあればセレクトを合わせる
    const matchRole = ROLES.find(r => r === input.value);
    if (matchRole) sel.value = matchRole;

    sel.addEventListener('change', () => {
      if (sel.value) input.value = sel.value;
    });
    input.addEventListener('input', () => {
      // 自由入力中はセレクトをリセット
      const match = ROLES.find(r => r === input.value);
      sel.value = match || '';
    });
  });

  // 性格も同様
  modal.querySelectorAll('.ci-personality-select').forEach(sel => {
    const idx = sel.dataset.idx;
    const input = modal.querySelector(`.ci-personality-input[data-idx="${idx}"]`);
    const matchPers = PERSONALITIES.find(p => p === input.value);
    if (matchPers) sel.value = matchPers;

    sel.addEventListener('change', () => {
      if (sel.value) input.value = sel.value;
    });
    input.addEventListener('input', () => {
      const match = PERSONALITIES.find(p => p === input.value);
      sel.value = match || '';
    });
  });

  // 閉じるボタン
  document.getElementById('ci-modal-close').addEventListener('click', () => modal.remove());
  document.getElementById('ci-btn-cancel').addEventListener('click', () => modal.remove());

  // オーバーレイクリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // 登録ボタン
  document.getElementById('ci-btn-register').addEventListener('click', () => {
    const result = [];
    modal.querySelectorAll('.ci-check').forEach(chk => {
      if (!chk.checked) return;
      const idx = parseInt(chk.dataset.idx);
      const name = modal.querySelector(`.ci-name[data-idx="${idx}"]`)?.value || '';
      const role = modal.querySelector(`.ci-role-input[data-idx="${idx}"]`)?.value || '';
      const personality = modal.querySelector(`.ci-personality-input[data-idx="${idx}"]`)?.value || '';
      const note = modal.querySelector(`.ci-note[data-idx="${idx}"]`)?.value || '';
      result.push({ name, role, personality, note });
    });
    onRegister(result);
    modal.remove();
  });
}

/**
 * キャラクター取り込みモジュールの初期化
 * @param {object} state - メインアプリのstate
 * @param {function} renderChars - キャラカード再描画関数
 * @param {function} getApiKey - APIキー取得関数
 */
export function initCharImport(state, renderChars, getApiKey) {
  const dropzone = document.getElementById('ci-dropzone');
  const fileInput = document.getElementById('ci-file-input');
  const statusEl = document.getElementById('ci-status');

  if (!dropzone || !fileInput) return;

  // ドラッグ＆ドロップ
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('ci-dragover');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('ci-dragover');
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('ci-dragover');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) processImages(files);
  });

  // クリックでファイル選択（複数対応）
  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      processImages(files);
      e.target.value = ''; // 同じファイルを再選択可能に
    }
  });

  /**
   * 複数画像を順次処理し、全キャラクターを統合してモーダル表示
   */
  async function processImages(files) {
    const apiKey = getApiKey();
    if (!apiKey) {
      alert('APIキーを先に保存してください');
      return;
    }

    // サポートフォーマットチェック
    const supported = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    const validFiles = files.filter(f => {
      if (!supported.includes(f.type)) {
        console.warn(`非対応形式スキップ: ${f.name} (${f.type})`);
        return false;
      }
      return true;
    });
    if (validFiles.length === 0) {
      alert('対応する画像ファイルがありません。\nPNG/JPG/WEBP/GIF のみ対応しています。');
      return;
    }

    // UI: ローディング状態 + グローバルアラートバー表示
    dropzone.classList.add('ci-loading');
    const alertEl = document.getElementById('global-alert');
    if (alertEl) {
      alertEl.innerHTML = '⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。';
      alertEl.style.display = 'flex';
    }
    if (statusEl) {
      statusEl.textContent = `🔍 ${validFiles.length}枚の画像を解析中...（数秒〜数十秒）`;
      statusEl.classList.remove('hidden');
    }

    const allCharacters = [];
    const allThumbnails = [];

    try {
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        if (statusEl && validFiles.length > 1) {
          statusEl.textContent = `🔍 画像 ${i+1}/${validFiles.length} を解析中...`;
        }
        if (alertEl && validFiles.length > 1) {
          alertEl.innerHTML = `⚠️ <strong>画像認識中 (${i+1}/${validFiles.length}):</strong> AIがキャラクターシートを解析しています...`;
        }

        // Base64変換
        const base64 = await fileToBase64(file);

        // サムネイルを収集
        allThumbnails.push(`data:${file.type};base64,${base64}`);

        // Gemini Vision API呼び出し
        const { text } = await callGeminiVision(
          apiKey,
          CHAR_ANALYSIS_PROMPT,
          base64,
          file.type
        );

        // JSONパース
        const characters = parseCharacterJson(text);
        if (characters && characters.length > 0) {
          // 役割・性格を既存リストにマッピング
          characters.forEach(c => {
            c.role = mapToRole(c.role);
            c.personality = mapToPersonality(c.personality);
          });
          allCharacters.push(...characters);
        }
      }

      if (allCharacters.length === 0) {
        throw new Error('キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。');
      }

      // モーダル表示（全画像の結果を統合）
      showResultModal(allCharacters, allThumbnails);

      if (statusEl) {
        statusEl.textContent = `✅ ${allCharacters.length}キャラクター検出！確認してください。`;
      }

    } catch (err) {
      console.error('Character import error:', err);
      if (statusEl) {
        statusEl.textContent = `❌ エラー: ${err.message}`;
      }
      setTimeout(() => {
        if (statusEl) statusEl.classList.add('hidden');
      }, 5000);
    } finally {
      dropzone.classList.remove('ci-loading');
      // グローバルアラートバー非表示
      if (alertEl) alertEl.style.display = 'none';
    }
  }



  function showResultModal(characters, thumbnails) {
    // 既存モーダルがあれば除去
    document.getElementById('ci-modal')?.remove();

    const container = document.createElement('div');
    container.innerHTML = buildModalHtml(characters, thumbnails);
    document.body.appendChild(container.firstElementChild);

    setupModalEvents(characters, (selectedChars) => {
      // 既存キャラクターに追加
      selectedChars.forEach(c => {
        state.characters.push({
          name: c.name || '',
          role: c.role || '',
          personality: c.personality || '',
          note: c.note || ''
        });
      });
      renderChars();

      if (statusEl) {
        statusEl.textContent = `✅ ${selectedChars.length}キャラクターを登録しました！`;
        setTimeout(() => statusEl.classList.add('hidden'), 3000);
      }
    });
  }
}
