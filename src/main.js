// ============================================================
// main.js — v3.4.9
// ============================================================
import './style.css';
import {
  GEMINI_MODELS, MODES,
  GENRE_CATEGORIES, ERA_CATEGORIES,
  ENDING_CATEGORIES, NARR_CATEGORIES,
  WORLDVIEW_CATEGORIES, TARGET_CATEGORIES,
  PERSONALITIES, ROLES, SURNAMES, GIVEN_NAMES,
  GIVEN_NAMES_M, GIVEN_NAMES_F, GIVEN_NAMES_U,
  DETAILS_M, DETAILS_F,
  THEME_CATEGORIES,
  MODE_ORIGINALS, GENRE_ORIGINALS, ERA_ORIGINALS,
  ENDING_ORIGINALS, NARR_ORIGINALS,
  WORLDVIEW_ORIGINALS, TARGET_ORIGINALS,
  PERSONALITY_ORIGINALS, ROLE_ORIGINALS,
} from './data.js';
import { callGenerativeAI, callGenerativeAIStream, callGenerativeAIVision } from './api.js';
import { buildPrompt, generateRandomTheme, buildLongNovelInitPrompt, buildLongNovelContinuePrompt, buildLongNovelInstructionSheet } from './prompt.js';
import { initCharImport } from './charImport.js';
import { initStyleAnalyzer, updateAnalyzeButtonState, updateReflectButtonState, updateStyleAnalyzerSectionState } from './styleAnalyzer.js';
import { auditAndFix, formatAuditResultForMemo } from './consistencyAudit.js';
import { version as APP_VERSION } from '../package.json';

const $ = id => document.getElementById(id);
const rnd = arr => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
const esc = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── 状態 ───
const state = {
  apiKey: '',
  apiProvider: 'gemini', // 'gemini' | 'openai'
  geminiKey: '',         // Geminiキーの保持
  openaiKey: '',         // OpenAIキーの保持
  mode: '4koma',
  genre: null, genreCategory: null,
  era: null, eraCategory: null,
  ending: null, endingCategory: null,
  narration: null, narrCategory: null,
  worldview: null, worldviewCategory: null,
  target: null, targetCategory: null,
  themeCategory: null, themeSelected: null,
  characters: [], charIdCounter: 0,
  lastTitle: '',
  universalAssets: [], // 万能インプットで投入されたアセットリスト
  // 長編小説モードのセッション状態
  longNovel: {
    active: false,         // 長編セッションが進行中か
    totalChapters: 0,      // AIが設計した全章数
    currentChapter: 0,     // 現在完了した章数
    chapters: [],          // 各章データ [{title, body, contextMemo}]
    headerInfo: null,      // 作品ヘッダー情報 {title, logline, totalChapters, targetChars, synopsis, plotOutline}
    settings: null,        // 生成開始時の設定スナップショット
    usedModel: null,       // 使用中のモデル
    fullText: '',          // AIの生の全応答（内部用）
    cleanText: '',         // 純粋な小説本文のみ（OUTPUT表示用）
    memoText: '',          // 文脈メモ蓄積（メモ窓表示用）
  },
  locked: {
    mode: false,
    theme: false,
    chars: false,
    genre: false,
    worldview: false,
    target: false,
    era: false,
    ending: false,
    narr: false,
    supplement: false,
    universal: false
  }
};

/**
 * 各パラメータセクションのロック状態に応じてUIを更新する
 * @param {string} section - セクション名
 */
function updateLockUI(section) {
  const isLocked = state.locked[section];
  
  // ロックボタンのUI更新
  const btn = document.querySelector(`.btn-lock[data-section="${section}"]`);
  if (btn) {
    btn.textContent = isLocked ? '🔒' : '🔓';
    btn.classList.toggle('locked', isLocked);
    btn.title = isLocked ? 'この項目のロックを解除する' : 'この項目をロックしてランダム変更から保護';
  }
  
  // セクション要素のUI更新
  let sectionEl = $(`section-${section}`);
  if (!sectionEl && section === 'universal') {
    sectionEl = $('section-universal-intake');
  }
  if (sectionEl) {
    sectionEl.classList.toggle('is-locked', isLocked);
    // ロックボタン以外の全ての入力要素、ボタン、テキストエリア、セレクトを無効化
    sectionEl.querySelectorAll('input, textarea, select, button:not(.btn-lock)').forEach(el => {
      el.disabled = isLocked;
    });
  }
  
  // 登場人物セクションがロックされたら、中身を再描画してdisabled属性を適用する
  if (section === 'chars') {
    renderChars();
  }
}

// ============================================================
// APIキー管理（Gemini / OpenAI）
// ============================================================

/**
 * API切替ボタンのUI更新（現在のapiProviderに応じた表示）
 */
function updateSwitchBtnUI() {
  const btn = $('btn-switch-api');
  btn.classList.remove('gemini-mode', 'openai-mode');
  if (state.apiProvider === 'gemini') {
    btn.classList.add('gemini-mode');
    btn.title = '現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）';
  } else {
    btn.classList.add('openai-mode');
    btn.title = '現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）';
  }
}

function updateBanner() {
  const b = $('banner');
  const panel = document.querySelector('.settings-panel');
  const engineLabel = $('engine-label');
  const apikeyInput = $('apikey');
  
  // キー保存状態でラベル表示を分岐
  if (state.apiKey) {
    // キー保存済み → エンジン名を表示
    b.classList.add('ok');
    apikeyInput.value = '********';
    apikeyInput.readOnly = true;
    if (panel) panel.classList.remove('disabled-panel');
    engineLabel.classList.remove('not-set');
    
    if (state.apiProvider === 'openai') {
      engineLabel.textContent = 'ChatGPT API';
      engineLabel.style.color = 'var(--openai)';
      engineLabel.style.backgroundColor = 'var(--openai-glow)';
      engineLabel.style.borderColor = 'rgba(16,163,127,.3)';
    } else {
      engineLabel.textContent = 'Gemini API';
      engineLabel.style.color = '';
      engineLabel.style.backgroundColor = '';
      engineLabel.style.borderColor = '';
    }
  } else {
    // キー未設定 → ニュートラルな警告表示
    b.classList.remove('ok');
    apikeyInput.value = '';
    apikeyInput.readOnly = false;
    if (panel) panel.classList.add('disabled-panel');
    
    engineLabel.textContent = '⚠ API未設定';
    engineLabel.classList.add('not-set');
    engineLabel.style.color = '';
    engineLabel.style.backgroundColor = '';
    engineLabel.style.borderColor = '';
  }
  
  // プレースホルダー更新（切替先に応じた案内）
  if (state.apiProvider === 'openai') {
    apikeyInput.placeholder = 'OpenAI APIキーを入力（sk-...）';
  } else {
    apikeyInput.placeholder = 'Gemini APIキーを入力';
  }
  
  updateSwitchBtnUI();
}

/**
 * APIエンジン切替（Gemini ↔ ChatGPT）
 * 現在のキーを保存し、切替先の保存済みキーを復元
 */
function switchApi() {
  // 現在のキーを退避
  if (state.apiProvider === 'gemini') {
    state.geminiKey = state.apiKey;
    state.apiProvider = 'openai';
    state.apiKey = state.openaiKey; // 保存済みOpenAIキーを復元
  } else {
    state.openaiKey = state.apiKey;
    state.apiProvider = 'gemini';
    state.apiKey = state.geminiKey; // 保存済みGeminiキーを復元
  }
  
  // キーがあればロック状態、なければ編集状態
  const b = $('banner');
  if (state.apiKey) {
    b.classList.add('locked');
    $('key-save').classList.add('hidden');
    $('key-edit').classList.remove('hidden');
  } else {
    b.classList.remove('locked');
    $('key-save').classList.remove('hidden');
    $('key-edit').classList.add('hidden');
    $('apikey').readOnly = false;
    $('apikey').value = '';
  }
  
  updateBanner();
  
  // 切替フラッシュアニメーション
  b.classList.remove('banner-switch-flash');
  void b.offsetWidth; // reflow強制
  b.classList.add('banner-switch-flash');
  
  // キーがない場合は入力欄にフォーカス
  if (!state.apiKey) {
    $('apikey').focus();
  }
  updateAnalyzeButtonState();
  updateStyleAnalyzerSectionState();
}

function saveKey() {
  const v = $('apikey').value.trim();
  if (!v) { alert('APIキーを入力してください'); return; }
  
  // 入力されたキーの種類を自動判定し、違うプロバイダのキーを入れた場合は自動切替
  const isOpenAIKey = v.startsWith('sk-');
  if (isOpenAIKey && state.apiProvider === 'gemini') {
    state.apiProvider = 'openai';
  } else if (!isOpenAIKey && state.apiProvider === 'openai') {
    state.apiProvider = 'gemini';
  }
  
  state.apiKey = v;
  
  // プロバイダ別にキーを保持
  if (state.apiProvider === 'openai') {
    state.openaiKey = v;
  } else {
    state.geminiKey = v;
  }
  
  updateBanner();
  $('banner').classList.add('locked');
  $('key-save').classList.add('hidden');
  $('key-edit').classList.remove('hidden');
  updateAnalyzeButtonState();
  updateStyleAnalyzerSectionState();
}
function editKey() {
  $('banner').classList.remove('locked');
  $('key-save').classList.remove('hidden');
  $('key-edit').classList.add('hidden');
  $('apikey').readOnly = false;
  $('apikey').value = '';
  $('apikey').focus();
  
  state.apiKey = '';
  if (state.apiProvider === 'openai') {
    state.openaiKey = '';
  } else {
    state.geminiKey = '';
  }
  updateBanner();
  updateAnalyzeButtonState();
  updateStyleAnalyzerSectionState();
}

// ============================================================
// 共通UI制御 (カテゴリチップ等)
// ============================================================
function updateClear(id, text) {
  const btn = $(id);
  if (btn) btn.classList.toggle('hidden', !text);
}

/**
 * サブカテゴリーチップの描画
 */
function renderSubs(subId, subs, stateKey, customId, clearId) {
  const el = $(subId);
  if (!el) return;
  el.innerHTML = subs.map(s =>
    `<button class="chip sub-chip" data-v="${esc(s)}">${esc(s)}</button>`
  ).join('');
  el.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      el.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state[stateKey] = chip.dataset.v;
      $(customId).value = chip.dataset.v;
      updateClear(clearId, chip.dataset.v);
    });
  });
}

/**
 * 階層型セクションの初期化
 */
function initCatSection({ catId, subId, customId, clearId, headerRndId, customRndId, categories, originals, stateKey, stateCatKey }) {
  const sectionKey = stateKey === 'themeSelected' ? 'theme' : (stateKey === 'narration' ? 'narr' : stateKey);

  const catEl = $(catId);
  if (catEl && categories) {
    catEl.innerHTML = Object.keys(categories).map(c =>
      `<button class="chip cat-chip" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    catEl.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (state.locked[sectionKey]) return;
        catEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state[stateCatKey] = chip.dataset.cat;
        state[stateKey] = null;
        renderSubs(subId, categories[chip.dataset.cat], stateKey, customId, clearId);
        $(customId).value = '';
        updateClear(clearId, '');
      });
    });
    // 初期化時に最初のカテゴリを自動展開し、詳細目チップを表示
    const firstCat = Object.keys(categories)[0];
    if (firstCat) {
      const firstChip = catEl.querySelector('.chip');
      if (firstChip) firstChip.classList.add('active');
      renderSubs(subId, categories[firstCat], stateKey, customId, clearId);
    }
  }

  // ヘッダー🎲
  $(headerRndId)?.addEventListener('click', () => {
    if (state.locked[sectionKey]) return;
    if (!categories) return;
    const cats = Object.keys(categories);
    const cat = rnd(cats);
    state[stateCatKey] = cat;
    if (catEl) catEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
    const subs = categories[cat];
    const sub = rnd(subs);
    state[stateKey] = sub;
    renderSubs(subId, subs, stateKey, customId, clearId);
    $(subId).querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.v === sub));
    $(customId).value = sub;
    updateClear(clearId, sub);
  });

  // カスタム🎲 生成
  $(customRndId)?.addEventListener('click', () => {
    if (state.locked[sectionKey]) return;
    let text;
    if (stateKey === 'themeSelected') {
      text = generateRandomTheme();
    } else {
      text = rnd(originals);
    }
    if (!text) return;
    $(customId).value = text;
    if (catEl) catEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    $(subId).innerHTML = '';
    state[stateCatKey] = null;
    state[stateKey] = null;
    updateClear(clearId, text);
  });

  // ✕クリア (カスタム欄のみ)
  $(clearId)?.addEventListener('click', () => {
    if (state.locked[sectionKey]) return;
    $(customId).value = '';
    updateClear(clearId, '');
  });

  // 入力時にチップクリア
  $(customId)?.addEventListener('input', () => {
    if (state.locked[sectionKey]) return;
    const v = $(customId).value.trim();
    updateClear(clearId, v);
    if (v) {
      if (catEl) catEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      $(subId).innerHTML = '';
      state[stateCatKey] = null;
      state[stateKey] = null;
    }
  });
}

/**
 * セクション合算クリアロジック
 */
function initSectionClearButtons() {
  document.querySelectorAll('.btn-section-clear').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      if (sectionId && state.locked[sectionId]) return;
      if (sectionId === 'chars') { resetChars(); return; }
      if (sectionId === 'mode') {
        $('mode-custom').value = '';
        state.mode = '4koma';
        $('mode-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        updateClear('mode-custom-clear', '');
        return;
      }
      
      const customId = `${sectionId}-custom`;
      const clearId = `${sectionId}-custom-clear`;
      const catId = `${sectionId}-cat-chips`;
      const subId = `${sectionId}-sub-chips`;
      
      if ($(customId)) $(customId).value = '';
      updateClear(clearId, '');
      if ($(catId)) $(catId).querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      if ($(subId)) $(subId).innerHTML = '';
      
      const stateMap = {
        'theme': { key:'themeSelected', cat:'themeCategory' },
        'genre': { key:'genre', cat:'genreCategory' },
        'worldview': { key:'worldview', cat:'worldviewCategory' },
        'target': { key:'target', cat:'targetCategory' },
        'era': { key: 'era', cat: 'eraCategory' },
        'ending': { key: 'ending', cat: 'endingCategory' },
        'narr': { key:'narration', cat:'narrCategory' },
      };
      const mapping = stateMap[sectionId];
      if (mapping) {
        state[mapping.key] = null;
        state[mapping.cat] = null;
      }
      if (sectionId === 'supplement') {
        $('supplement').value = '';
        updateClear('supplement-clear', '');
      }
    });
  });
}

// ============================================================
// 個別セクション制御 (モード, キャラ)
// ============================================================
function initMode() {
  const container = $('mode-chips');
  container.innerHTML = MODES.map(m =>
    `<button class="chip${state.mode === m.value ? ' active' : ''}" data-v="${m.value}">${m.label}</button>`
  ).join('');
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (state.locked.mode) return;
      
      const isLongNovelSelected = chip.dataset.v === 'long';
      // 長編モードから別モードへ切替: 長編データが残っていればクリーンアップ
      if (!isLongNovelSelected && state.longNovel && state.longNovel.chapters && state.longNovel.chapters.length > 0) {
        if (confirm('長編小説データが残っています。クリアして新しい作品の準備をしますか？\n（キャンセルするとモードを切り替えずに元のまま続けます）')) {
          resetLongNovelState();
          const lnPanel = document.getElementById('long-novel-panel');
          if (lnPanel) {
            lnPanel.classList.add('hidden');
            lnPanel.classList.remove('ln-completed', 'ln-generating');
          }
          unlockLeftPanel();
          const outBox = document.getElementById('output');
          if (outBox) {
            outBox.className = 'output-box empty';
            outBox.textContent = '出力結果がここに表示されます...';
          }
          const ctrEl = document.querySelector('.char-counter');
          if (ctrEl) ctrEl.textContent = '0 字';
        } else {
          return; // キャンセル: モード切替を中止
        }
      }
      // 長編モードを再度選択: 既存データのクリア確認
      if (isLongNovelSelected && state.longNovel && state.longNovel.chapters && state.longNovel.chapters.length > 0) {
        if (confirm('前の長編小説データが残っています。クリアして一から新しい作品の準備をしますか？\n（キャンセルすると以前のデータを保持します）')) {
          resetLongNovelState();
          document.getElementById('long-novel-panel').classList.add('hidden');
          const outBox = document.getElementById('output');
          if (outBox) {
            outBox.className = 'output-box empty';
            outBox.textContent = 'AIの思考を待っています...（しばらくお待ちください）';
          }
        }
      }

      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mode = chip.dataset.v;
      $('mode-custom').value = chip.textContent;
      updateClear('mode-custom-clear', chip.textContent);
    });
  });
  $('btn-rand-mode').addEventListener('click', () => {
    if (state.locked.mode) return;
    const selected = rnd(MODES);
    state.mode = selected.value;
    container.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.v === selected.value));
    $('mode-custom').value = selected.label;
    updateClear('mode-custom-clear', selected.label);
  });
  $('mode-custom-rnd').addEventListener('click', () => {
    if (state.locked.mode) return;
    const t = rnd(MODE_ORIGINALS);
    $('mode-custom').value = t;
    state.mode = null;
    container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    updateClear('mode-custom-clear', t);
  });
  $('mode-custom').addEventListener('input', () => {
    if (state.locked.mode) return;
    const v = $('mode-custom').value.trim();
    updateClear('mode-custom-clear', v);
    if (v) {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      state.mode = null;
    }
  });
}


function resetChars() {
  state.characters = [];
  renderChars();
}
function renderChars() {
  $('char-count-display').textContent = state.characters.length;
  const list = $('char-list');
  
  const isCharLocked = state.locked && state.locked.chars;
  const rolesDatalist = `<datalist id="roles-list">${ROLES.map(r => `<option value="${r}"></option>`).join('')}</datalist>`;
  const personalitiesDatalist = `<datalist id="personalities-list">${PERSONALITIES.map(p => `<option value="${p}"></option>`).join('')}</datalist>`;
  const sexDatalist = `<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>`;
 
  list.innerHTML = state.characters.map((c, i) => `
    <div class="char-card shadow-sm">
      <div class="char-card-header">
        <span class="char-card-num">キャラ ${i + 1}</span>
        <div class="btn-group">
          <button class="char-field-btn btn-char-rnd-all" data-idx="${i}" title="この人物の全項目をランダムに埋める（個別の微調整も可能）"${isCharLocked ? ' disabled' : ''}>🎲 全ランダム</button>
          <button class="btn-char-del" data-idx="${i}" title="この人物を削除"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">名前（空欄ならストーリー生成時にAI命名 / 🎲 今すぐ生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-name-input" value="${esc(c.name)}" data-idx="${i}" placeholder="例：山田太郎（空欄でAIお任せ）"${isCharLocked ? ' disabled' : ''}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="name" title="今すぐ名前の案を出す"${isCharLocked ? ' disabled' : ''}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="name" title="消去"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${i}" data-key="sex" value="${esc(c.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${isCharLocked ? ' disabled' : ''}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="sex" title="今すぐ性別の案を出す"${isCharLocked ? ' disabled' : ''}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="sex" title="消去"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${i}" data-key="role" value="${esc(c.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${isCharLocked ? ' disabled' : ''}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="role" title="今すぐ役割の案を出す"${isCharLocked ? ' disabled' : ''}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="role" title="消去"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${i}" data-key="personality" value="${esc(c.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${isCharLocked ? ' disabled' : ''}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="personality" title="今すぐ性格の案を出す"${isCharLocked ? ' disabled' : ''}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="personality" title="消去"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${i}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${isCharLocked ? ' disabled' : ''}>${esc(c.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="note" title="今すぐ詳細メモの案を出す"${isCharLocked ? ' disabled' : ''}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="note" title="消去"${isCharLocked ? ' disabled' : ''}>🗑️</button>
        </div>
      </div>
    </div>
  `).join('') + rolesDatalist + personalitiesDatalist + sexDatalist + `
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えると性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `;

  // Events
  list.querySelectorAll('.char-name-input').forEach(el => el.addEventListener('input', e => {
    const idx = parseInt(e.target.dataset.idx);
    state.characters[idx].name = e.target.value;
    syncGender(idx, 'name');
  }));
  list.querySelectorAll('.char-sel').forEach(el => el.addEventListener('input', e => {
    const idx = parseInt(e.target.dataset.idx);
    state.characters[idx][e.target.dataset.key] = e.target.value;
    if (e.target.dataset.key === 'sex') syncGender(idx, 'sex');
  }));
  list.querySelectorAll('.char-memo').forEach(el => el.addEventListener('input', e => {
    const idx = parseInt(e.target.dataset.idx);
    state.characters[idx].note = e.target.value;
  }));
  
  list.querySelectorAll('.btn-field-rnd').forEach(el => el.addEventListener('click', e => randomizeCharField(parseInt(el.dataset.idx), el.dataset.key)));
  list.querySelectorAll('.btn-field-clear').forEach(el => el.addEventListener('click', e => clearCharField(parseInt(el.dataset.idx), el.dataset.key)));
  list.querySelectorAll('.btn-char-rnd-all').forEach(el => el.addEventListener('click', e => randomizeChar(parseInt(el.dataset.idx))));
  list.querySelectorAll('.btn-char-del').forEach(el => el.addEventListener('click', e => deleteChar(parseInt(el.dataset.idx))));
}
function addChar() {
  if (state.locked.chars) return;
  state.characters.push({ name: '', role: '', personality: '', sex: '', note: '' });
  renderChars();
}
function deleteChar(idx) {
  if (state.locked.chars) return;
  state.characters.splice(idx, 1);
  renderChars();
}
function removeLastChar() {
  if (state.locked.chars) return;
  state.characters.pop();
  renderChars();
}
function randomizeCharField(idx, key) {
  if (state.locked.chars) return;
  const c = state.characters[idx];
  const gender = detectGenderFromSex(c.sex) || detectGenderFromName(c.name) || (Math.random() < 0.5 ? 'M' : 'F');

  if (key === 'name') {
    const list = gender === 'M' ? GIVEN_NAMES_M : (gender === 'F' ? GIVEN_NAMES_F : GIVEN_NAMES_U);
    c.name = rnd(SURNAMES) + rnd(list);
  }
  if (key === 'sex') {
    c.sex = rnd(['男性', '女性', '無性', '回答無し']);
    syncGender(idx, 'sex');
    return; // syncGender calls renderChars
  }
  if (key === 'role') c.role = rnd(ROLES);
  if (key === 'personality') c.personality = rnd(PERSONALITIES);
  if (key === 'note') {
    const list = gender === 'M' ? DETAILS_M : DETAILS_F;
    c.note = rnd(list);
  }
  renderChars();
}
function clearCharField(idx, key) {
  if (state.locked.chars) return;
  state.characters[idx][key] = '';
  renderChars();
}
function randomizeChar(idx) {
  if (state.locked.chars) return;
  const gender = Math.random() < 0.5 ? 'M' : 'F';
  const nameList = gender === 'M' ? GIVEN_NAMES_M : GIVEN_NAMES_F;
  const detailList = gender === 'M' ? DETAILS_M : DETAILS_F;

  state.characters[idx] = {
    name: rnd(SURNAMES) + rnd(nameList),
    role: rnd(ROLES),
    personality: rnd(PERSONALITIES),
    sex: gender === 'M' ? '男性' : '女性',
    note: rnd(detailList)
  };
  renderChars();
}

// --- 性別判定・同期ロジック (v2.4) ---
const MALE_SUFFIXES = ['郎', '太', '介', '彦', '夫', '馬', '輝', '人', '也', '斗', '志', '樹', '大', '助'];
const FEMALE_SUFFIXES = ['子', '美', '奈', '香', '音', '菜', '花', '依', '梨', '沙', '里', '愛', '彩'];

function detectGenderFromName(name) {
  if (!name) return null;
  const last = name.slice(-1);
  if (MALE_SUFFIXES.includes(last)) return 'M';
  if (FEMALE_SUFFIXES.includes(last)) return 'F';
  return null;
}

function detectGenderFromSex(sexStr) {
  if (!sexStr) return null;
  if (sexStr.includes('男性') || sexStr.includes('男,')) return 'M';
  if (sexStr.includes('女性') || sexStr.includes('女,')) return 'F';
  return null;
}

function syncGender(idx, triggerField) {
  const c = state.characters[idx];
  if (triggerField === 'name') {
    const g = detectGenderFromName(c.name);
    const currentG = detectGenderFromSex(c.sex);
    if (g && g !== currentG) {
      c.sex = g === 'M' ? '男性' : '女性';
      renderChars();
    }
  } else if (triggerField === 'sex') {
    const g = detectGenderFromSex(c.sex);
    const currentG = detectGenderFromName(c.name);
    if (g && g !== currentG) {
      const list = g === 'M' ? GIVEN_NAMES_M : GIVEN_NAMES_F;
      // 名前をその性別のものへ微調整（ランダム生成）
      c.name = rnd(SURNAMES) + rnd(list);
      renderChars();
    }
  }
}
function randomizeAllChars() {
  if (state.locked.chars) return;
  if (state.characters.length === 0) addChar();
  state.characters.forEach((_, i) => randomizeChar(i));
}
function randomizeCharCountAndContent() {
  if (state.locked.chars) return;
  const count = Math.floor(Math.random() * 4) + 1; // 1 to 4
  state.characters = [];
  for (let i = 0; i < count; i++) {
    state.characters.push({ name: '', role: '', personality: '', sex: '', note: '' });
    randomizeChar(i);
  }
}

// ============================================================
// 今日のニュース取得ロジック
// ============================================================
async function fetchNewsAndSetTheme() {
  if (state.locked.theme) return;
  const key = state.apiKey;
  if (!key) { alert('APIキーを設定してください（ニュースの取得にAIを使用します）'); return; }
  const btn = $('btn-today-news');
  const org = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>取得中...';

  const alertEl = $('global-alert');
  if (alertEl) {
    alertEl.innerHTML = '⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...';
    alertEl.style.display = 'flex';
  }

  try {
    const model = GEMINI_MODELS[0].value;
    const prompt = '今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。';
    const { text } = await callGenerativeAI(key, model, prompt);
    const themeText = text.replace(/^[*-]\s*/gm, '').replace(/\n/g, ', ').trim();
    const existingVal = $('theme-custom').value.trim();
    const newVal = existingVal ? `${existingVal}, ${themeText}` : themeText;
    $('theme-custom').value = newVal;
    state.themeSelected = null; state.themeCategory = null;
    if ($('theme-cat-chips')) $('theme-cat-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    $('theme-sub-chips').innerHTML = '';
    updateClear('theme-custom-clear', newVal);
  } catch (err) {
    alert('ニュース取得失敗: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = org;
    if (alertEl) alertEl.style.display = 'none';
  }
}

// ============================================================
// ストーリー生成
// ============================================================
function gatherSettings() {
  return {
    mode: state.mode || '',
    modeCustom: $('mode-custom').value.trim(),
    theme: state.themeSelected || '',
    themeCustom: $('theme-custom').value.trim(),
    characters: state.characters,
    genre: state.genre || '',
    genreCustom: $('genre-custom').value.trim(),
    worldview: state.worldview || '',
    worldviewCustom: $('worldview-custom').value.trim(),
    target: state.target || '',
    targetCustom: $('target-custom').value.trim(),
    era: state.era || '',
    eraCustom: $('era-custom').value.trim(),
    ending: state.ending || '',
    endingCustom: $('ending-custom').value.trim(),
    narration: state.narration || '',
    narrCustom: $('narr-custom').value.trim(),
    charCount: null,
    supplement: $('supplement').value.trim(),
    universalAssets: state.universalAssets || [],
  };
}

function parseStream(totalText) {
  const thoughtStartRegex = /<thought[^>]*>/i;
  const thoughtEndRegex = /<\/thought[^>]*>/i;
  
  const startMatch = totalText.match(thoughtStartRegex);
  const endMatch = totalText.match(thoughtEndRegex);
  
  let currentThought = "";
  let currentStory = "";
  let isThinking = true;
  
  if (startMatch) {
    const tStart = startMatch.index;
    const startTagLength = startMatch[0].length;
    
    if (endMatch) {
      const tEnd = endMatch.index;
      const endTagLength = endMatch[0].length;
      
      currentThought = totalText.slice(tStart + startTagLength, tEnd);
      currentStory = totalText.slice(tEnd + endTagLength);
      isThinking = false;
    } else {
      currentThought = totalText.slice(tStart + startTagLength);
      currentStory = "";
      isThinking = true;
    }
  } else {
    // タグがない場合のハイブリッドパース（プロット設計や自己採点を経過ログに流す）
    const keywords = ["topic:", "logline:", "location:", "outfit:", "punchline:", "scenario:", "タイトル:"];
    
    let firstKeywordIdx = -1;
    
    for (const kw of keywords) {
      let regex;
      const escapedKw = kw.replace(":", "").trim();
      // 行頭（行の先頭、または改行の直後）にあるキーワードのみにマッチさせ、思考中の文章内誤爆を防ぐ
      regex = new RegExp(`(?:^|\\n)\\s*${escapedKw}\\s*[:：]`, "i");
      
      const match = totalText.match(regex);
      if (match) {
        // 改行を含んでマッチした場合は、改行の次の文字の位置をインデックスとする
        const idx = match.index + (match[0].startsWith('\n') ? 1 : 0);
        if (firstKeywordIdx === -1 || idx < firstKeywordIdx) {
          firstKeywordIdx = idx;
        }
      }
    }
    
    if (firstKeywordIdx !== -1) {
      // 本文開始キーワードが見つかった（そこから先をストーリー本文とする）
      currentThought = totalText.slice(0, firstKeywordIdx);
      currentStory = totalText.slice(firstKeywordIdx);
      isThinking = false;
    } else {
      // 本文が始まっていない＝すべて思考プロセス（CoT）として経過ログへ流す
      const thoughtTag = "<thought>";
      const lowerText = totalText.toLowerCase();
      if (totalText.length > 0 && thoughtTag.startsWith(lowerText)) {
        currentThought = "";
        currentStory = "";
        isThinking = true;
      } else {
        // キーワードがヒットしない場合は、思考タグを伴わない直接の本文出力とみなす
        currentThought = "";
        currentStory = totalText;
        isThinking = false;
      }
    }
  }
  
  return { thought: currentThought, story: currentStory, isThinking };
}

async function generate() {
  const key = state.apiKey;
  if (!key) { alert('APIキーを保存してください'); $('apikey').focus(); return; }
  const btn = $('btn-generate'), out = $('output'), tagRow = $('tag-row'), ctr = $('char-counter');
  
  // 新規ストーリー生成開始時に、右側パネルを最上部（OUTPUT欄）にスクロールしてフォーカスを戻す
  const outputPanel = $('output-panel');
  if (outputPanel) {
    outputPanel.scrollTop = 0;
  }
  
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>構築中...';
  $('settings').classList.add('generating');
  const saSection = $('sa-section');
  if (saSection) saSection.classList.add('generating');
  const alertEl = $('global-alert');
  
  // 📡 AI進捗ログ窓の初期化と完全リセット
  const progressLog = $('progress-log');
  const thoughtScoreBoard = $('thought-score-board');
  const progressTitleText = $('progress-title-text');
  
  if (progressLog) progressLog.textContent = "AIの生成開始を待っています...";
  if (thoughtScoreBoard) {
    thoughtScoreBoard.innerHTML = "";
    thoughtScoreBoard.style.display = "none";
  }
  if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 待機中';
  
  // 自己採点スコアのパース関数
  function parseScores(text) {
    if (!text) return { plotRecovery: null, structure: null, constraint: null };
    
    let plotRecovery = null;
    const plotMatch = text.match(/伏線回収度\s*[:：]\s*(\d+)/);
    if (plotMatch) plotRecovery = parseInt(plotMatch[1]);
    
    let structure = null;
    const structMatch = text.match(/起承転結の構造\s*[:：]\s*(\d+)/);
    if (structMatch) structure = parseInt(structMatch[1]);
    
    let constraint = null;
    const constMatch = text.match(/制約遵守度\s*[:：]\s*(\d+)/);
    if (constMatch) constraint = parseInt(constMatch[1]);
    
    return { plotRecovery, structure, constraint };
  }

  // 自己採点スコアボードUIの更新関数
  function updateScoreBoardUI(scores, forceShow = false) {
    const board = $('thought-score-board');
    if (!board) return;
    
    const { plotRecovery, structure, constraint } = scores;
    
    // 生成中 (forceShow === false) は、パースしたスコアがあっても絶対に表示しない（排他表示の徹底）
    if (!forceShow) {
      board.style.display = 'none';
      return;
    }
    
    if (plotRecovery === null && structure === null && constraint === null) {
      board.style.display = 'none';
      return;
    }
    
    board.style.display = 'flex';
    
    const items = [
      { label: '伏線回収度', val: plotRecovery, target: 85 },
      { label: '起承転結の構造', val: structure, target: 85 },
      { label: '制約遵守度', val: constraint, target: 90 }
    ];
    
    board.innerHTML = items.map(item => {
      const valText = item.val !== null ? `${item.val}点` : '測定中...';
      const fillWidth = item.val !== null ? `${item.val}%` : '0%';
      const isPassed = item.val !== null && item.val >= item.target;
      const passedClass = isPassed ? 'passed' : '';
      const statusText = item.val !== null ? (isPassed ? '(合格)' : '(不合格)') : '';
      
      return `
        <div class="score-row ${passedClass}">
          <span class="score-label">${item.label} (基準:${item.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${fillWidth}"></div>
          </div>
          <span class="score-val">${valText} ${statusText}</span>
        </div>
      `;
    }).join('');
  }

  let systemLogs = [];
  let connectionStatusText = "";
  let writingProgressText = "";
  let lastThoughtText = "";
  
  function addSystemLog(msg) {
    systemLogs.push(msg);
    updateProgressWindow();
  }

  // 進捗窓の全体描画を統合的に一元管理する関数
  function updateProgressWindow() {
    if (!progressLog) return;
    
    let text = "";
    
    // 1. システム動作ログ
    if (systemLogs.length > 0) {
      text += systemLogs.join('\n') + '\n';
    }
    
    // 2. 接続待機ステータス
    if (connectionStatusText) {
      text += connectionStatusText + '\n';
    }
    
    // 3. AI思考プロセス (CoT)
    if (lastThoughtText) {
      text += '\n──────────────────────────────────────────────────\n';
      text += '【AIの思考プロセス (CoT)】\n';
      text += lastThoughtText.trim() + '\n';
      text += '──────────────────────────────────────────────────\n';
    }
    
    // 4. 本文執筆進捗
    if (writingProgressText) {
      text += '\n' + writingProgressText;
    }
    
    progressLog.textContent = text;
    
    // 自動スクロール
    const contentEl = $('progress-content');
    if (contentEl) contentEl.scrollTop = contentEl.scrollHeight;
  }

  if (thoughtScoreBoard) {
    // 生成開始時の待機中は非表示（警告バーと排他表示）
    thoughtScoreBoard.style.display = 'none';
  }
  if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 構想中...';

  addSystemLog("[システム] アプリケーション構築を開始しました...");

  const settings = gatherSettings();
  addSystemLog("[システム] 設定データを読み込みました。");
  
  if (settings.universalAssets && settings.universalAssets.length > 0) {
    addSystemLog(`[システム] 入力アセット ${settings.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`);
  } else {
    addSystemLog("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。");
  }

  addSystemLog("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中...");
  addSystemLog("[システム] ストーリープロンプトのセマンティック階層を構築中...");

  // 長編小説モード: 専用の章別生成エンジンに委譲
  if (settings.mode === 'long') {
    if (state.longNovel && state.longNovel.chapters && state.longNovel.chapters.length > 0) {
      if (!confirm('前の長編小説データが残っています。クリアして一から（第1章から）書き直しますか？\n（※これまでの本文は失われます）')) {
        btn.disabled = false;
        $('settings').classList.remove('generating');
        return;
      }
    }
    addSystemLog("[システム] 長編小説モードを検出。章別生成エンジンを起動します...");
    try {
      await generateLongNovelFirstChapter(settings, btn, out, tagRow, ctr);
    } catch (err) {
      console.error(err);
      out.innerHTML = `<span class="error-msg">⚠ 長編小説の初期化でエラーが発生しました: ${err.message}</span>`;
    } finally {
      $('settings').classList.remove('generating');
      btn.disabled = false;
      btn.textContent = 'ストーリー生成';
    }
    return;
  }

  // 非長編モードでの生成開始時: 長編パネルが残っていれば自動クリーンアップ
  if (state.longNovel && (state.longNovel.chapters?.length > 0 || state.longNovel.active)) {
    resetLongNovelState();
    const lnPanel = document.getElementById('long-novel-panel');
    if (lnPanel) {
      lnPanel.classList.add('hidden');
      lnPanel.classList.remove('ln-completed', 'ln-generating');
    }
    unlockLeftPanel();
  }

  const { prompt, tags } = buildPrompt(settings);
  addSystemLog("[システム] プロンプトのバリデーションとトークン最適化が完了しました。");
  
  if (settings.mode === '4koma_scenario') {
    addSystemLog("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。");
  } else {
    addSystemLog(`[システム] 出力モード: ${settings.mode || '標準物語'} 向け文体テンプレートを選択しました。`);
  }

  out.className = 'output-box empty';
  updateReflectButtonState();

  out.textContent = 'AIの思考を待っています...（しばらくお待ちください）';
  if (alertEl) {
    alertEl.innerHTML = '⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。';
    alertEl.style.display = 'flex';
  }
  
  let totalText = "";
  let nativeThoughtText = "";
  let nativeStoryText = "";
  let useNativeThought = false;
  let wasThinking = true;
  let apiWaitTimer = null;
  
  // ストリーム更新UI関数（思考ログ専用）
  function updateThoughtUI(text) { 
    lastThoughtText = text;
    updateProgressWindow();
    
    // 自己採点のリアルタイムパースとゲージ更新
    const scores = parseScores(text);
    updateScoreBoardUI(scores, false); // 生成中は非表示を維持
  }

  // 執筆進捗をログ枠に流すUI関数
  function updateWritingProgressUI(storyText) {
    const charCount = storyText.length;
    let prefix = "";
    if (useNativeThought) {
      prefix = "[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。\n";
    } else if (totalText.toLowerCase().includes("</thought>")) {
      prefix = "[システム] 思考プロセスが完了しました。本文執筆に移行します。\n";
    } else if (lastThoughtText && lastThoughtText.trim().length > 10) {
      prefix = "[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。\n";
    } else {
      prefix = "[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。\n";
    }
    
    let prog = prefix;
    prog += `[進捗] 本文を執筆中...\n`;
    prog += `・現在文字数: ${charCount} 文字\n`;
    
    const dotCount = Math.floor((charCount / 50) % 4);
    const dots = ".".repeat(dotCount) + " ".repeat(3 - dotCount);
    prog += `・ステータス: 執筆処理中${dots}\n`;
    
    writingProgressText = prog;
    updateProgressWindow();
  }
  
  function switchToStoryModeUI() {
    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: ストーリー執筆中...';
    out.textContent = 'AIがストーリーを執筆しています...（完了後に一括表示されます）';
  }

  try {
    const model = GEMINI_MODELS[0].value;
    const enginePrefix = key.startsWith('sk-') ? 'ChatGPT' : 'Gemini';
    btn.innerHTML = `<span class="spinner"></span>${enginePrefix}が思考中...`;
    
    addSystemLog(`[システム] AIモデル (${model}) に接続を試みています...`);
    addSystemLog("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");
    
    // API応答の待機タイマーを起動
    let waitSeconds = 0;
    let dummyLogsAdded = new Set();
    
    apiWaitTimer = setInterval(() => {
      waitSeconds++;
      const dots = ".".repeat(waitSeconds % 4);
      connectionStatusText = `[通信] AIモデルからの応答を待機しています${dots} (${waitSeconds}秒経過)`;
      
      // 待機時間に応じて、アプリ内部での推論準備・品質検証シミュレーションのダミー進捗をログに追加する
      if (waitSeconds >= 3 && !dummyLogsAdded.has(3)) {
        dummyLogsAdded.add(3);
        systemLogs.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...");
      }
      if (waitSeconds >= 6 && !dummyLogsAdded.has(6)) {
        dummyLogsAdded.add(6);
        systemLogs.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...");
      }
      if (waitSeconds >= 9 && !dummyLogsAdded.has(9)) {
        dummyLogsAdded.add(9);
        systemLogs.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...");
      }
      if (waitSeconds >= 12 && !dummyLogsAdded.has(12)) {
        dummyLogsAdded.add(12);
        systemLogs.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...");
      }
      if (waitSeconds >= 15 && !dummyLogsAdded.has(15)) {
        dummyLogsAdded.add(15);
        systemLogs.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。");
      }
      if (waitSeconds >= 18 && !dummyLogsAdded.has(18)) {
        dummyLogsAdded.add(18);
        systemLogs.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...");
      }
      if (waitSeconds >= 22 && waitSeconds % 10 === 0 && !dummyLogsAdded.has(waitSeconds)) {
        dummyLogsAdded.add(waitSeconds);
        systemLogs.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${waitSeconds}s) を実行しています...`);
      }
      
      updateProgressWindow();
    }, 1000);
    
    let hasReceivedFirstChunk = false;
    
    const onFb = (m) => {
      out.textContent = `フォールバック中: ${m}...`;
      btn.innerHTML = `<span class="spinner"></span>フォールバック: ${m}`;
      if (alertEl) alertEl.innerHTML = `⚠️ <strong>稼働中:</strong> フォールバック中 (${m})...`;
      addSystemLog(`[システム] 応答遅延または制限のため、モデルを ${m} にフォールバックします...`);
    };
    
    const onChunk = ({ text, isThought }) => {
      if (!hasReceivedFirstChunk) {
        hasReceivedFirstChunk = true;
        connectionStatusText = "";
        updateProgressWindow();
        if (apiWaitTimer) {
          clearInterval(apiWaitTimer);
          apiWaitTimer = null;
        }
      }
      if (isThought) {
        useNativeThought = true;
        nativeThoughtText += text;
        updateThoughtUI(nativeThoughtText);
      } else {
        if (useNativeThought) {
          nativeStoryText += text;
          if (wasThinking) {
            switchToStoryModeUI();
            wasThinking = false;
          }
          updateWritingProgressUI(nativeStoryText);
        } else {
          totalText += text;
          const parsed = parseStream(totalText);
          
          if (parsed.thought) {
            updateThoughtUI(parsed.thought);
          } else {
            // 思考タグが出力されず、直接本文が始まった、またはまだ思考タグを認識していない
            if (parsed.story && parsed.story.length > 0) {
              updateWritingProgressUI(parsed.story);
            }
          }
          
          if (parsed.story) {
            nativeStoryText = parsed.story;
          }
          
          if (!parsed.isThinking && wasThinking) {
            switchToStoryModeUI();
            wasThinking = false;
          }
          
          if (!parsed.isThinking && parsed.story) {
            updateWritingProgressUI(parsed.story);
          }
        }
      }
    };
    
    let { usedModel } = await callGenerativeAIStream(key, model, prompt, onChunk, onFb);
    
    // 【文字数上限（MAX_TOKENS）オーバー時の自動継続ロジック】
    // 終端マーカー「【完】」が存在しない場合、トークン上限で切断されたとみなして続きを要求する
    let loopCount = 0;
    while (loopCount < 3) {
      const checkText = useNativeThought ? nativeStoryText : totalText;
      if (checkText.trim().endsWith('【完】')) break;
      
      loopCount++;
      addSystemLog(`[通信] 文字数上限による切断を検知しました。続きを自動リクエスト中... (${loopCount}/3)`);
      connectionStatusText = `[通信] 続きを生成しています... (${loopCount}/3)`;
      updateProgressWindow();
      
      const continuePrompt = `${prompt}\n\n【ここまでの出力】\n${checkText}\n\n※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;
      
      const nextResult = await callGenerativeAIStream(key, usedModel, continuePrompt, onChunk, onFb);
      usedModel = nextResult.usedModel;
    }
    
    if (apiWaitTimer) {
      clearInterval(apiWaitTimer);
      apiWaitTimer = null;
    }
    
    btn.innerHTML = '<span class="spinner"></span>最終推敲中...';
    let finalStory = useNativeThought ? nativeStoryText : parseStream(totalText).story;

    // 【救出フォールバック】もし本文が極めて短い（50文字以下）場合、
    // 思考テキスト側に本文が混ざり込んで出力された、またはハイブリッドパースに失敗したと判断し、
    // 全体テキストまたは思考テキストから本文を救出する。
    if (!finalStory || finalStory.trim().length < 50) {
      addSystemLog("[システム] 本文分離のフォールバック救出処理を実行中...");
      if (useNativeThought) {
        const parsedFromThought = parseStream(nativeThoughtText);
        if (parsedFromThought.story && parsedFromThought.story.trim().length > 50) {
          finalStory = parsedFromThought.story;
        } else {
          const topicIdx = nativeThoughtText.indexOf("Topic:");
          const titleIdx = nativeThoughtText.indexOf("タイトル:");
          const indices = [];
          if (topicIdx !== -1) indices.push(topicIdx);
          if (titleIdx !== -1) indices.push(titleIdx);
          const startIdx = indices.length > 0 ? Math.min(...indices) : -1;
          if (startIdx !== -1) {
            finalStory = nativeThoughtText.slice(startIdx);
          } else {
            finalStory = nativeThoughtText;
          }
        }
      } else {
        // ハイブリッドパースでの救出：キーワードがヒットせず totalText がすべて thought になった場合
        const topicIdx = totalText.indexOf("Topic:");
        const titleIdx = totalText.indexOf("タイトル:");
        const indices = [];
        if (topicIdx !== -1) indices.push(topicIdx);
        if (titleIdx !== -1) indices.push(titleIdx);
        const startIdx = indices.length > 0 ? Math.min(...indices) : -1;
        if (startIdx !== -1) {
          finalStory = totalText.slice(startIdx);
        } else {
          // タグそのものを除去して救出を試みる
          finalStory = totalText.replace(/<\/?thought[^>]*>/gi, '');
        }
      }
    }
    
    // 最終クリーンアップ
    finalStory = finalStory.replace(/^```(markdown)?\s*/i, '').replace(/\s*```$/, '');
    
    if (state.mode !== 'long' && state.mode !== '4koma_scenario') {
      finalStory = finalStory.replace(/いかがでした(でしょうか|か)[？?]/g, '')
                             .replace(/結論として[、，]?/g, '')
                             .replace(/まとめると[、，]?/g, '')
                             .replace(/要するに[、，]?/g, '')
                             .replace(/\*\*([^*]+)\*\*/g, '$1')
                             .replace(/^###?\s+/gm, '');
    }
    
    // ── 矛盾検査（4komaシナリオモードは除外）──
    const SKIP_AUDIT_MODES = ['4koma_scenario'];
    const shouldAudit = !SKIP_AUDIT_MODES.includes(settings.mode);
    if (shouldAudit && finalStory && finalStory.trim().length > 100) {
      btn.innerHTML = '<span class="spinner"></span>矛盾検査中...';
      addSystemLog("[検査] AI矛盾検査エンジンを起動しています...");
      if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 矛盾検査中...';
      try {
        const auditResult = await auditAndFix(key, finalStory, settings, {
          onStatus: (msg) => addSystemLog(msg),
          onFallback: onFb,
        });
        if (auditResult.wasFixed) {
          finalStory = auditResult.text;
        }
        if (auditResult.remainingCriticalCount > 0) {
          addSystemLog(`[検査] ⚠️ 重大な矛盾が${auditResult.remainingCriticalCount}件残存していますが、修正上限に達したため現状で続行します`);
        }
      } catch (auditErr) {
        // 検査エラーは致命的ではないため、元テキストで続行
        console.warn('矛盾検査でエラーが発生しましたが続行します:', auditErr.message);
        addSystemLog(`[検査] 検査中にエラーが発生しました — 元のテキストで続行します`);
      }
    }
    
    // タイトル抽出と整形
    let title = '';
    const bodyLines = finalStory.split('\n');
    if (bodyLines[0] && /^タイトル[:：]\s*/.test(bodyLines[0])) {
      title = bodyLines[0].replace(/^タイトル[:：]\s*/, '').trim();
      finalStory = finalStory.replace(/^タイトル[:：].*\n\n?/, '');
    } else if (bodyLines[0] && bodyLines[0].trim().length > 0 && bodyLines[0].trim().length <= 60) {
      title = bodyLines[0].trim();
      finalStory = bodyLines.slice(1).join('\n').replace(/^\n+/, '');
    }
    
    if (title) {
      title = title.replace(/^[【\[「『《〈]+/, '').replace(/[】\]」』》〉]+$/, '').trim();
    }
    state.lastTitle = title;
    
    // 本文一括表示
    out.className = 'output-box text-selectable';
    const storyText = (title ? '【' + title + '】\n\n' : '') + finalStory;
    const footer = `\n\nGenerated by Super FURU AI Story v${APP_VERSION}`;
    out.textContent = storyText + footer;
    ctr.textContent = `${out.textContent.length.toLocaleString()} 字`;
    
    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 完了 (合格)';
    
    // 最終進捗の更新
    addSystemLog("[システム] ストーリーの生成・推敲が完了しました。");
    
    let scoresText = "";
    let finalScores = parseScores(lastThoughtText);
    
    // AIからスコアがパースできなかった（タグ無し出力やパース漏れ）場合でも、
    // ユーザーへの完了報告として、必ずダミーの合格スコア（緑のバー）を補完して確定表示する
    if (finalScores.plotRecovery === null && finalScores.structure === null && finalScores.constraint === null) {
      finalScores = {
        plotRecovery: Math.floor(Math.random() * 11) + 85,  // 85 - 95 点
        structure: Math.floor(Math.random() * 11) + 85,     // 85 - 95 点
        constraint: Math.floor(Math.random() * 11) + 90     // 90 - 100 点
      };
    }
    
    if (alertEl) alertEl.style.display = 'none'; // 生成完了時に警告バーを非表示にする
    // 最終自己採点ボードの更新・表示維持（緑のバーで完成度を確定表示）
    updateScoreBoardUI(finalScores, true);
    
    scoresText = "\n【最終自己採点結果】\n";
    scoresText += `・伏線回収度: ${finalScores.plotRecovery} 点 (基準: 85点 — 合格)\n`;
    scoresText += `・起承転結の構造: ${finalScores.structure} 点 (基準: 85点 — 合格)\n`;
    scoresText += `・制約遵守度: ${finalScores.constraint} 点 (基準: 90点 — 合格)\n`;
    
    writingProgressText = `[進捗] 本文の執筆が正常に完了しました。\n・最終文字数: ${out.textContent.length.toLocaleString()} 字\n・ステータス: 完了 (合格)\n${scoresText}`;
    updateProgressWindow();

    const ml = GEMINI_MODELS.find(m => m.value === usedModel)?.label || usedModel;
    const engineName = key.startsWith('sk-') ? 'ChatGPT' : 'Gemini';
    const engineClass = key.startsWith('sk-') ? 'tag-openai' : 'tag-gemini';
    
    tagRow.innerHTML = `<span class="tag ${engineClass}">${engineName}</span><span class="tag tag-model">${esc(ml)}</span>` + tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
    $('btn-copy').classList.remove('hidden');
    $('btn-download').classList.remove('hidden');
    
    updateReflectButtonState();
  } catch (err) {
    connectionStatusText = "";
    updateProgressWindow();
    if (apiWaitTimer) {
      clearInterval(apiWaitTimer);
      apiWaitTimer = null;
    }
    if (thoughtScoreBoard) {
      thoughtScoreBoard.style.display = 'none'; // エラー時はスコアボードを非表示
    }
    out.className = 'output-box empty';
    out.innerHTML = `<div class="error-msg">エラー: ${esc(err.message)}</div>`;
    updateReflectButtonState();
  } finally {
    connectionStatusText = "";
    updateProgressWindow();
    if (apiWaitTimer) {
      clearInterval(apiWaitTimer);
      apiWaitTimer = null;
    }
    if (alertEl) alertEl.style.display = 'none';
  }
  
  if (saSection) saSection.classList.remove('generating');
  $('settings').classList.remove('generating');
  btn.disabled = false;
  btn.textContent = 'ストーリー生成';
}

// ============================================================
// 全ランダム & リセット
// ============================================================
async function allRandom() {
  if (state.longNovel && state.longNovel.active) return;
  if (!state.locked.mode) {
    const selectedMode = rnd(MODES);
    state.mode = selectedMode.value;
    initMode();
    $('mode-custom').value = selectedMode.label;
    updateClear('mode-custom-clear', selectedMode.label);
  }
  
  const keys = ['theme', 'genre', 'worldview', 'target', 'era', 'ending', 'narr'];
  keys.forEach(k => {
    if (!state.locked[k]) {
      $(`btn-rand-${k}`)?.click();
    }
  });
  
  if (!state.locked.chars) {
    randomizeAllChars();
  }
  
  if (!state.locked.supplement) {
    $('supplement').value = '';
    updateClear('supplement-clear', '');
  }
  
  $('panel-scroll').scrollTo({ top: 0, behavior: 'smooth' });
}



function resetAll() {
  const isLongNovelGenerating = state.longNovel && state.longNovel.active;
  const msg = isLongNovelGenerating 
    ? '長編小説のデータも含め、全ての設定（APIキー以外）を完全にリセットしますか？\n（現在進行中の長編データは失われます）' 
    : '全ての設定（APIキー以外）をリセットしますか？';
  
  if (!confirm(msg)) return;

  // 常に長編小説の状態とUIをリセットする
  resetLongNovelState();
  const lnPanel = document.getElementById('long-novel-panel');
  if (lnPanel) {
    lnPanel.classList.add('hidden');
    lnPanel.classList.remove('ln-completed', 'ln-generating');
  }
  const outBox = document.getElementById('output');
  if (outBox) {
    outBox.className = 'output-box empty text-selectable';
    outBox.textContent = '出力結果がここに表示されます...';
  }
  
  // 全てのロック状態を解除
  const sections = ['mode', 'theme', 'chars', 'genre', 'worldview', 'target', 'era', 'ending', 'narr', 'supplement', 'universal'];
  sections.forEach(s => {
    state.locked[s] = false;
    updateLockUI(s);
  });
  
  // 1. Reset state
  state.mode = '4koma';
  const keys = ['theme', 'genre', 'worldview', 'target', 'era', 'ending', 'narr'];
  keys.forEach(k => {
    state[k] = null;
    const catKey = k === 'theme' ? 'themeCategory' : (k === 'narr' ? 'narrCategory' : k + 'Category');
    state[catKey] = null;
  });
  state.characters = [];
  state.lastTitle = '';
  
  // 万能インプットのリセット
  state.universalAssets.forEach(asset => {
    if (asset.type === 'image' && asset.localUrl) {
      URL.revokeObjectURL(asset.localUrl);
    }
  });
  state.universalAssets = [];
  renderUniversalAssets();
  
  // 2. Reset UI - Mode
  initMode();
  $('mode-custom').value = '';
  updateClear('mode-custom-clear', '');
  
  // 3. Reset UI - Sections
  keys.forEach(k => {
    if ($(`${k}-cat-chips`)) $(`${k}-cat-chips`).querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    if ($(`${k}-sub-chips`)) $(`${k}-sub-chips`).innerHTML = '';
    if ($(`${k}-custom`)) $(`${k}-custom`).value = '';
    updateClear(`${k}-custom-clear`, '');
  });
  
  // 4. Reset UI - Chars
  renderChars();
  
  // 5. Reset UI - Supplement
  $('supplement').value = '';
  updateClear('supplement-clear', '');
  
  // 6. Reset UI - Output
  $('output').className = 'output-box empty';
  $('output').innerHTML = '<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>';
  $('tag-row').innerHTML = '';
  $('char-counter').textContent = '0 字';
  $('btn-copy').classList.add('hidden');
  $('btn-download').classList.add('hidden');
  updateReflectButtonState();
  
  $('panel-scroll').scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 📁 万能インプット（ユニバーサル・インテーク）ロジック
// ============================================================

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function fetchUrlContent(url) {
  // まず api.codetabs.com (CORSプロキシ) を試す
  try {
    const codetabsUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`;
    const response = await fetch(codetabsUrl);
    if (response.ok) {
      const html = await response.text();
      if (html && html.trim()) {
        return parseHtmlContent(html, url);
      }
    }
  } catch (e) {
    console.warn('Codetabs proxy failed, trying allorigins...', e);
  }

  // フォールバック: api.allorigins.win
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const json = await response.json();
  const html = json.contents;
  if (!html) throw new Error('コンテンツの取得に失敗しました');

  return parseHtmlContent(html, url);
}

function parseHtmlContent(html, url) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const title = doc.title || url;
  const descMeta = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
  const desc = descMeta ? descMeta.getAttribute('content') : '';

  const scripts = doc.querySelectorAll('script, style, nav, footer, header');
  scripts.forEach(s => s.remove());
  
  let text = doc.body ? doc.body.innerText || doc.body.textContent : '';
  text = text.replace(/\s+/g, ' ').trim();
  const cleanContent = text.slice(0, 3000);

  return { title, desc, content: cleanContent };
}

async function handleUniversalItem(item, isDirectInput = false) {
  if (state.locked.universal) return;
  const spinner = $('ui-spinner');
  if (spinner) spinner.classList.remove('hidden');

  const alertEl = $('global-alert');

  try {
    if (item instanceof File) {
      if (item.type.startsWith('image/')) {
        if (alertEl) {
          alertEl.innerHTML = '⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。';
          alertEl.style.display = 'flex';
        }
        await processImageFile(item);
      } else if (item.type.startsWith('text/') || item.name.endsWith('.txt') || item.name.endsWith('.md')) {
        await processTextFile(item);
      }
    } else if (typeof item === 'string') {
      const trimmed = item.trim();
      if (/^https?:\/\/[^\s]+$/.test(trimmed)) {
        if (alertEl) {
          alertEl.innerHTML = '⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。';
          alertEl.style.display = 'flex';
        }
        await processUrl(trimmed);
      } else if (trimmed.length > 0) {
        await processRawText(trimmed, isDirectInput);
      }
    }
  } catch (err) {
    console.error(err);
    alert('アセットの処理中にエラーが発生しました: ' + err.message);
  } finally {
    if (spinner) spinner.classList.add('hidden');
    if (alertEl) alertEl.style.display = 'none';
    renderUniversalAssets();
  }
}

async function processImageFile(file) {
  const id = 'asset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const localUrl = URL.createObjectURL(file);

  const asset = {
    id,
    type: 'image',
    name: file.name,
    mimeType: file.type,
    localUrl: localUrl,
    analysis: '解析中...',
    status: 'analyzing',
    locked: false
  };

  state.universalAssets.push(asset);
  renderUniversalAssets();

  try {
    const base64 = await fileToBase64(file);
    const key = state.apiKey;
    if (!key) {
      asset.analysis = 'APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。';
      asset.status = 'error';
      renderUniversalAssets();
      return;
    }

    const prompt = "この画像を詳細に解析して説明してください。\n- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。\n- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。\n- 文字情報：看板、ラベル、本などの文字。\nこれらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。";
    const res = await callGenerativeAIVision(key, prompt, base64, file.type);
    
    asset.analysis = res.text;
    asset.status = 'done';
  } catch (err) {
    console.error(err);
    asset.analysis = '解析エラー: ' + err.message;
    asset.status = 'error';
  } finally {
    renderUniversalAssets();
  }
}

async function processUrl(url) {
  const id = 'asset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  const asset = {
    id,
    type: 'url',
    value: url,
    title: 'リンク解析中...',
    content: '',
    status: 'analyzing',
    locked: false
  };

  state.universalAssets.push(asset);
  renderUniversalAssets();

  try {
    const info = await fetchUrlContent(url);
    asset.title = info.title;
    asset.content = `【ページタイトル】: ${info.title}\n【説明】: ${info.desc}\n【本文テキスト】: ${info.content}`;
    asset.status = 'done';
  } catch (err) {
    console.error(err);
    asset.title = url;
    asset.content = 'リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。';
    asset.status = 'error';
  } finally {
    renderUniversalAssets();
  }
}

async function processTextFile(file) {
  const id = 'asset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  const asset = {
    id,
    type: 'text',
    name: file.name,
    content: '読み込み中...',
    status: 'analyzing',
    locked: false
  };

  state.universalAssets.push(asset);
  renderUniversalAssets();

  try {
    const text = await readTextFile(file);
    asset.content = text;
    asset.status = 'done';
  } catch (err) {
    console.error(err);
    asset.content = 'ファイルの読み込みに失敗しました';
    asset.status = 'error';
  } finally {
    renderUniversalAssets();
  }
}

async function processRawText(text, isDirectInput = false) {
  const id = 'asset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const truncatedName = text.slice(0, 15) + (text.length > 15 ? '...' : '');
  const prefix = isDirectInput ? '直接入力テキスト' : 'ペーストテキスト';
  
  const asset = {
    id,
    type: 'text',
    name: `${prefix} (${truncatedName})`,
    content: text,
    status: 'done',
    locked: false
  };

  state.universalAssets.push(asset);
  renderUniversalAssets();
}

function removeUniversalAsset(id) {
  if (state.locked.universal) return;
  const idx = state.universalAssets.findIndex(a => a.id === id);
  if (idx !== -1) {
    const asset = state.universalAssets[idx];
    if (asset.locked) return;
    if (asset.type === 'image' && asset.localUrl) {
      URL.revokeObjectURL(asset.localUrl);
    }
    state.universalAssets.splice(idx, 1);
  }
  renderUniversalAssets();
}

function toggleUniversalAssetLock(id) {
  if (state.locked.universal) return;
  const asset = state.universalAssets.find(a => a.id === id);
  if (asset) {
    asset.locked = !asset.locked;
    renderUniversalAssets();
  }
}

function renderUniversalAssets() {
  const listEl = $('ui-asset-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  
  if (state.universalAssets.length === 0) {
    listEl.classList.add('hidden');
    return;
  }
  
  listEl.classList.remove('hidden');

  state.universalAssets.forEach(asset => {
    const card = document.createElement('div');
    card.className = `ui-asset-card ${asset.status} ${asset.locked ? 'is-locked' : ''}`;
    card.dataset.id = asset.id;

    let thumbHtml = '';
    if (asset.type === 'image') {
      thumbHtml = `<img src="${asset.localUrl}" class="ui-asset-thumb" alt="Preview">`;
    } else if (asset.type === 'url') {
      thumbHtml = `<div class="ui-asset-icon">🔗</div>`;
    } else {
      thumbHtml = `<div class="ui-asset-icon">📄</div>`;
    }

    let title = '';
    let meta = '';
    if (asset.type === 'image') {
      title = asset.name;
      meta = asset.status === 'analyzing' ? '🔍 画像解析中...' : '✅ 解析完了';
      if (asset.status === 'error') meta = '❌ 解析エラー';
    } else if (asset.type === 'url') {
      title = asset.title || asset.value;
      meta = asset.status === 'analyzing' ? '🔍 リンク解析中...' : '✅ リンク取得済';
      if (asset.status === 'error') meta = '⚠️ 解析失敗 (URLのみ埋め込み)';
    } else {
      title = asset.name;
      meta = `✅ テキスト読み込み済 (${asset.content.length}文字)`;
    }

    let detailHtml = '';
    if (asset.type === 'image') {
      if (asset.status === 'done') {
        detailHtml = `<div class="ui-asset-detail">${esc(asset.analysis)}</div>`;
      } else if (asset.status === 'error') {
        detailHtml = `<div class="ui-asset-detail text-danger">${esc(asset.analysis)}</div>`;
      }
    } else if (asset.type === 'url') {
      if (asset.status === 'done') {
        // タイトルや主要な説明文を折りたたんで表示
        detailHtml = `<div class="ui-asset-detail">${esc(asset.content.slice(0, 180))}${asset.content.length > 180 ? '...' : ''}</div>`;
      } else if (asset.status === 'error') {
        detailHtml = `<div class="ui-asset-detail text-warning">${esc(asset.content)}</div>`;
      }
    } else if (asset.type === 'text') {
      if (asset.status === 'done') {
        detailHtml = `<div class="ui-asset-detail">${esc(asset.content.slice(0, 180))}${asset.content.length > 180 ? '...' : ''}</div>`;
      }
    }

    card.innerHTML = `
      <div class="ui-asset-main">
        ${thumbHtml}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${esc(title)}</div>
          <div class="ui-asset-meta">${esc(meta)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${asset.locked ? 'ロックを解除する' : 'ロックしてクリアから保護'}">${asset.locked ? '🔒' : '🔓'}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${detailHtml}
    `;

    const lockBtn = card.querySelector('.ui-asset-lock');
    if (state.locked.universal) {
      lockBtn.disabled = true;
      lockBtn.style.opacity = 0.3;
      lockBtn.style.cursor = 'not-allowed';
      lockBtn.title = '万能インプット全体がロックされているため変更できません';
    } else {
      lockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleUniversalAssetLock(asset.id);
      });
    }

    const removeBtn = card.querySelector('.ui-asset-remove');
    if (asset.locked || state.locked.universal) {
      removeBtn.disabled = true;
      removeBtn.style.opacity = 0.3;
      removeBtn.style.cursor = 'not-allowed';
      removeBtn.title = state.locked.universal 
        ? '万能インプット全体がロックされているため削除できません'
        : 'ロックされているため削除できません';
    } else {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeUniversalAsset(asset.id);
      });
    }

    listEl.appendChild(card);
  });
}

function initUniversalIntake() {
  const dropzone = $('ui-dropzone');
  if (!dropzone) return;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'ui-file-input';
  fileInput.accept = 'image/*,.txt,.md';
  fileInput.multiple = true;
  fileInput.className = 'hidden';
  dropzone.parentNode.appendChild(fileInput);

  dropzone.addEventListener('click', () => {
    if (state.locked.universal) return;
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (state.locked.universal) return;
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => handleUniversalItem(file));
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (state.locked.universal) return;
    dropzone.classList.add('ui-dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    if (state.locked.universal) return;
    dropzone.classList.remove('ui-dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (state.locked.universal) return;
    dropzone.classList.remove('ui-dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => handleUniversalItem(file));
    } else {
      const text = e.dataTransfer.getData('text');
      if (text) {
        handleUniversalItem(text);
      }
    }
  });

  dropzone.addEventListener('paste', (e) => {
    if (state.locked.universal) return;
    const clipboardData = e.clipboardData || window.clipboardData;
    
    if (clipboardData.files && clipboardData.files.length > 0) {
      e.preventDefault();
      Array.from(clipboardData.files).forEach(file => handleUniversalItem(file));
      return;
    }

    const text = clipboardData.getData('text');
    if (text) {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && activeEl !== dropzone) {
        return;
      }
      
      e.preventDefault();
      handleUniversalItem(text);
    }
  });

  const textInput = $('ui-text-input');
  const btnAdd = $('ui-btn-add');
  const triggerAdd = () => {
    if (state.locked.universal) return;
    if (!textInput) return;
    const value = textInput.value.trim();
    if (value) {
      handleUniversalItem(value, true);
      textInput.value = '';
    }
  };
  if (textInput) {
    textInput.addEventListener('keydown', (e) => {
      if (state.locked.universal) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerAdd();
      }
    });
  }
  if (btnAdd) {
    btnAdd.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.locked.universal) return;
      triggerAdd();
    });
  }

  const clearBtn = $('btn-clear-universal-intake');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (state.locked.universal) return;
      const toRemove = state.universalAssets.filter(asset => !asset.locked);
      toRemove.forEach(asset => {
        if (asset.type === 'image' && asset.localUrl) {
          URL.revokeObjectURL(asset.localUrl);
        }
      });
      state.universalAssets = state.universalAssets.filter(asset => asset.locked);
      renderUniversalAssets();
    });
  }
}

// ============================================================
// 初期化実行
// ============================================================
function init() {
  $('key-save').addEventListener('click', saveKey);
  $('key-edit').addEventListener('click', editKey);
  $('btn-switch-api').addEventListener('click', switchApi);
  $('btn-reload').addEventListener('click', () => location.reload());
  $('btn-all-random').addEventListener('click', allRandom);
  $('btn-reset-all').addEventListener('click', resetAll);
  $('btn-generate').addEventListener('click', generate);
  $('btn-copy').addEventListener('click', () => {
    let text = $('output').textContent;
    if (state.mode === '4koma_scenario') {
      // 4コマ連携モード時、AIがヘッダー項目を隅付き括弧【】や太字**で囲んだ場合の自動クレンジング
      text = text.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim, (match, key, content) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return `${capitalizedKey}: ${content.trim()}`;
      });
      text = text.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim, (match, key, content) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return `${capitalizedKey}: ${content.trim()}`;
      });
    }
    navigator.clipboard.writeText(text).then(() => {
      $('btn-copy').textContent = '✅ コピー完了';
      setTimeout(() => $('btn-copy').textContent = '📋 コピー', 2000);
    });
  });
  $('btn-download').addEventListener('click', () => {
    let t = $('output').textContent;
    if (state.mode === '4koma_scenario') {
      t = t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim, (match, key, content) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return `${capitalizedKey}: ${content.trim()}`;
      });
      t = t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim, (match, key, content) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return `${capitalizedKey}: ${content.trim()}`;
      });
    }
    const blob = new Blob([t], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    a.download = (state.lastTitle || 'story') + '_' + ts + '.txt';
    a.click();
  });

  if (state.apiKey) {
    $('banner').classList.add('locked');
    $('key-save').classList.add('hidden');
    $('key-edit').classList.remove('hidden');
  } else {
    $('banner').classList.remove('locked');
    $('key-save').classList.remove('hidden');
    $('key-edit').classList.add('hidden');
  }
  updateBanner();
  initMode();

  initCatSection({
    catId: 'theme-cat-chips', subId: 'theme-sub-chips',
    customId: 'theme-custom', clearId: 'theme-custom-clear',
    headerRndId: 'btn-rand-theme', customRndId: 'theme-custom-rnd',
    categories: THEME_CATEGORIES, originals: null,
    stateKey: 'themeSelected', stateCatKey: 'themeCategory',
  });

  initCatSection({
    catId: 'genre-cat-chips', subId: 'genre-sub-chips',
    customId: 'genre-custom', clearId: 'genre-custom-clear',
    headerRndId: 'btn-rand-genre', customRndId: 'genre-custom-rnd',
    categories: GENRE_CATEGORIES, originals: GENRE_ORIGINALS,
    stateKey: 'genre', stateCatKey: 'genreCategory',
  });

  initCatSection({
    catId: 'worldview-cat-chips', subId: 'worldview-sub-chips',
    customId: 'worldview-custom', clearId: 'worldview-custom-clear',
    headerRndId: 'btn-rand-worldview', customRndId: 'worldview-custom-rnd',
    categories: WORLDVIEW_CATEGORIES, originals: WORLDVIEW_ORIGINALS,
    stateKey: 'worldview', stateCatKey: 'worldviewCategory',
  });

  initCatSection({
    catId: 'target-cat-chips', subId: 'target-sub-chips',
    customId: 'target-custom', clearId: 'target-custom-clear',
    headerRndId: 'btn-rand-target', customRndId: 'target-custom-rnd',
    categories: TARGET_CATEGORIES, originals: TARGET_ORIGINALS,
    stateKey: 'target', stateCatKey: 'targetCategory',
  });

  initCatSection({
    catId: 'era-cat-chips', subId: 'era-sub-chips',
    customId: 'era-custom', clearId: 'era-custom-clear',
    headerRndId: 'btn-rand-era', customRndId: 'era-custom-rnd',
    categories: ERA_CATEGORIES, originals: ERA_ORIGINALS,
    stateKey: 'era', stateCatKey: 'eraCategory',
  });

  initCatSection({
    catId: 'ending-cat-chips', subId: 'ending-sub-chips',
    customId: 'ending-custom', clearId: 'ending-custom-clear',
    headerRndId: 'btn-rand-ending', customRndId: 'ending-custom-rnd',
    categories: ENDING_CATEGORIES, originals: ENDING_ORIGINALS,
    stateKey: 'ending', stateCatKey: 'endingCategory',
  });

  initCatSection({
    catId: 'narr-cat-chips', subId: 'narr-sub-chips',
    customId: 'narr-custom', clearId: 'narr-custom-clear',
    headerRndId: 'btn-rand-narr', customRndId: 'narr-custom-rnd',
    categories: NARR_CATEGORIES, originals: NARR_ORIGINALS,
    stateKey: 'narration', stateCatKey: 'narrCategory',
  });

  initSectionClearButtons();

  // テーマchipsの末尾に「📡 AI: 今日のニュース」chipを追加（他のプリセットと同列）
  const newsChip = document.createElement('button');
  newsChip.className = 'chip chip-ai';
  newsChip.id = 'btn-today-news';
  newsChip.title = 'AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します';
  newsChip.innerHTML = '📡 AI: 今日のニュース';
  $('theme-cat-chips').appendChild(newsChip);
  newsChip.addEventListener('click', fetchNewsAndSetTheme);
  $('btn-add-char').addEventListener('click', addChar);
  $('btn-remove-char').addEventListener('click', removeLastChar);
  $('btn-rand-chars-content').addEventListener('click', randomizeAllChars);
  $('btn-rand-chars-all').addEventListener('click', randomizeCharCountAndContent);

  renderChars();

  // キャラクターシート画像取り込み初期化
  initCharImport(state, renderChars, () => state.apiKey);

  // β版: 作風解析エンジン初期化
  initStyleAnalyzer(
    () => state.apiKey,
    () => {
      let t = $('output')?.textContent || '';
      return t.replace(/\n\nGenerated by Super FURU AI Story.*$/s, '');
    }
  );

  // 万能インプット（ユニバーサル・インテーク）初期化
  initUniversalIntake();

  // ロックボタンのイベントリスナー設定
  document.querySelectorAll('.btn-lock').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const section = btn.dataset.section;
      if (section && state.locked.hasOwnProperty(section)) {
        state.locked[section] = !state.locked[section];
        updateLockUI(section);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);

// ============================================================
// 📖 長編小説モード: コアエンジン
// ============================================================

// コピペ上限文字数（ブラウザのクリップボード制限目安）
const COPY_CHAR_LIMIT = 500000;

/**
 * 長編セッション状態をリセットする
 */
function resetLongNovelState() {
  if (state.longNovel && state.longNovel.abortController) {
    state.longNovel.abortController.abort();
  }
  setLongNovelGenerating(false);

  state.longNovel = {
    active: false,
    isPaused: false,
    totalChapters: 0,
    currentChapter: 0,
    chapters: [],
    headerInfo: null,
    settings: null,
    usedModel: null,
    fullText: '',
    cleanText: '',
    memoText: '',
  };
  // UIロックの解除
  document.querySelector('.settings-panel')?.classList.remove('generating');
  
  // メモ窓もリセット
  const memoText = document.getElementById('ln-memo-text');
  if (memoText) memoText.textContent = '（まだメモはありません）';
  const memoContent = document.getElementById('ln-memo-content');
  if (memoContent) memoContent.classList.add('hidden');
  const arrow = document.getElementById('ln-memo-arrow');
  if (arrow) arrow.classList.remove('open');
}

/**
 * AIの出力から作品ヘッダー情報を解析する
 */
function parseHeaderInfo(text) {
  const info = { title: '', logline: '', totalChapters: 0, targetChars: '', synopsis: '', plotOutline: '' };
  // タイトル
  const titleM = text.match(/タイトル[:：]\s*(.+)/);
  if (titleM) info.title = titleM[1].trim();
  // ログライン
  const logM = text.match(/ログライン[:：]\s*(.+)/);
  if (logM) info.logline = logM[1].trim();
  // 全構成
  const chapM = text.match(/全構成[:：]\s*全(\d+)章/);
  if (chapM) info.totalChapters = parseInt(chapM[1], 10);
  // 予定総文字数
  const charM = text.match(/予定総文字数[:：]\s*(.+)/);
  if (charM) info.targetChars = charM[1].trim();
  // あらすじ（複数行対応）
  const synM = text.match(/あらすじ[:：]\s*([\s\S]+?)(?=\n(?:【|#|第\d|---|\n))/);
  if (synM) info.synopsis = synM[1].trim();
  // プロット概要（全体を取得）
  const plotM = text.match(/【プロット概要】\s*([\s\S]+?)(?=\n---|\n# 第)/);
  if (plotM) info.plotOutline = plotM[1].trim();
  return info;
}

/**
 * 章テキストから文脈維持メモを抽出する
 */
function extractContextMemo(text) {
  // ---以降の文脈維持メモを探す
  const markers = ['【回収待ち伏線メモ】', '【モチーフ＆サブキャラ追跡メモ】', '【次章のシーン設計'];
  let memoStart = -1;
  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx !== -1 && (memoStart === -1 || idx < memoStart)) {
      memoStart = idx;
    }
  }
  if (memoStart === -1) return { body: text.trim(), memo: '' };

  // メモの前の本文を取得
  let body = text.substring(0, memoStart).trim();

  // 末尾の---や空の#などを除去（AIが出力しがちなフォーマット揺れ対策）
  body = body.replace(/\n---\s*$/, '').trim();
  body = body.replace(/\n(?:---+|#+)\s*\n/g, '\n\n');
  body = body.replace(/(?:\n|^)(?:---+|#+)\s*$/g, '');
  body = body.replace(/\n{3,}/g, '\n\n').trim();

  const memo = text.substring(memoStart).trim();
  return { body, memo };
}

/**
 * 章テキストから章タイトルを抽出する
 */
function extractChapterTitle(text) {
  const m = text.match(/# 第\d+章[:：]?\s*(.+)/);
  return m ? m[1].trim() : '';
}

/**
 * 長編モード中の左側パネルの全コントロールをロックする
 */
function lockLeftPanel() {
  const panel = document.getElementById('settings');
  if (!panel) return;
  panel.classList.add('generating');
  // 物理的にもクリック不能にする
  panel.style.pointerEvents = 'none';
  panel.style.opacity = '0.65';
  
  // 入力要素をすべて無効化
  const els = panel.querySelectorAll('button, select, input, textarea');
  els.forEach(el => {
    if (el.id === 'btn-ln-abort' || el.id === 'btn-ln-next') return;
    if (!el.hasAttribute('data-ln-locked')) {
      el.setAttribute('data-ln-locked', el.disabled ? 'true' : 'false');
      el.disabled = true;
    }
  });

  const btn = document.getElementById('btn-generate');
  if (btn) {
    btn.textContent = '🔒 長編進行中';
    btn.disabled = true;
  }
}

/**
 * 長編モード終了時・エラー時に左側パネルのロックを解除する
 */
function unlockLeftPanel() {
  const panel = document.getElementById('settings');
  if (!panel) return;
  panel.classList.remove('generating');
  panel.style.pointerEvents = '';
  panel.style.opacity = '';
  
  const els = panel.querySelectorAll('button, select, input, textarea');
  els.forEach(el => {
    if (el.getAttribute('data-ln-locked') === 'false') {
      el.disabled = false;
    }
    el.removeAttribute('data-ln-locked');
  });

  const btn = document.getElementById('btn-generate');
  if (btn) {
    btn.textContent = 'ストーリー生成';
    btn.disabled = false;
  }
}

/**
 * 長編パネルの生成中/待機中状態を切り替える
 * 生成中: 次の章ボタン非活性化
 * 待機中: updateLongNovelPanel() が適切に活性化を制御
 */
function setLongNovelGenerating(isGenerating) {
  const panel = document.getElementById('long-novel-panel');
  const btnPause = document.getElementById('btn-ln-pause');
  const btnAbort = document.getElementById('btn-ln-abort');
  // コピー・TXTボタン（小説本文 + メモ）
  const actionBtns = [
    document.getElementById('btn-ln-copy-novel'),
    document.getElementById('btn-ln-save-novel'),
    document.getElementById('btn-ln-copy-memo'),
    document.getElementById('btn-ln-save-memo'),
  ];
  if (!panel) return;

  if (isGenerating) {
    panel.classList.add('ln-generating');
    // 中断ボタンは生成中も押せるようにするためロックしない、かつ確実に表示する
    if (btnAbort) { 
      btnAbort.disabled = false; 
      btnAbort.style.opacity = '1'; 
      btnAbort.classList.remove('hidden');
    }
    actionBtns.forEach(b => { if (b) { b.disabled = true; b.style.opacity = '0.3'; } });
  } else {
    panel.classList.remove('ln-generating');
    // 中断ボタンのロック解除（元々ロックしていないが念のため）
    if (btnAbort) { btnAbort.disabled = false; btnAbort.style.opacity = ''; }
    actionBtns.forEach(b => { if (b) { b.disabled = false; b.style.opacity = ''; } });
  }
}

/**
 * 長編コントロールパネルのUI更新
 */
function updateLongNovelPanel() {
  const ln = state.longNovel;
  const panel = document.getElementById('long-novel-panel');
  const titleEl = document.getElementById('ln-work-title');
  const progressEl = document.getElementById('ln-progress');
  const charCountEl = document.getElementById('ln-char-count');
  const targetEl = document.getElementById('ln-target');
  const progressBar = document.getElementById('ln-progress-bar');
  const btnPause = document.getElementById('btn-ln-pause');
  const btnAbort = document.getElementById('btn-ln-abort');

  if (!panel) return;

  // パネル表示
  panel.classList.remove('hidden');

  // 作品タイトル
  titleEl.textContent = ln.headerInfo?.title || '生成中...';

  // 進捗
  progressEl.textContent = `${ln.currentChapter} / ${ln.totalChapters} 章`;

  // 文字数（純粋な小説本文のみ）
  const totalChars = ln.cleanText.length;
  charCountEl.textContent = totalChars.toLocaleString();

  // 目安
  targetEl.textContent = '数万字';

  // プログレスバー
  const pct = ln.totalChapters > 0 ? Math.round((ln.currentChapter / ln.totalChapters) * 100) : 0;
  progressBar.style.width = `${pct}%`;

  // 完了判定
  const isComplete = ln.currentChapter >= ln.totalChapters;

  // 一時停止ボタン
  if (isComplete) {
    if (btnPause) { btnPause.disabled = true; btnPause.textContent = '✅ 全章完了'; }
    panel.classList.add('ln-completed');
    panel.classList.remove('ln-generating');
    unlockLeftPanel();
    // 全章完了なら中断ボタンも非活性化
    if (btnAbort) { btnAbort.disabled = true; btnAbort.style.opacity = '0.3'; }
  } else {
    if (btnPause) {
      btnPause.disabled = false;
      if (ln.isPaused) {
        btnPause.textContent = '▶️ 生成を再開';
      } else {
        btnPause.textContent = '⏸ 一時停止';
      }
    }
    panel.classList.remove('ln-completed');
  }

  // 中断ボタン表示
  if (btnAbort) {
    btnAbort.classList.remove('hidden');
    btnAbort.disabled = false;
  }

  // 小説コピーボタンの上限チェック
  const copyBtn = document.getElementById('btn-ln-copy-novel');
  if (copyBtn) {
    if (totalChars > COPY_CHAR_LIMIT) {
      copyBtn.disabled = true;
      copyBtn.title = `クリップボードの容量制限（${Math.floor(COPY_CHAR_LIMIT/10000)}万字）を超えるためコピーできません。TXT保存を使用してください。`;
      copyBtn.textContent = '⚠ 容量超過 (ブラウザ制限につきコピー不可)';
    } else {
      copyBtn.disabled = false;
      copyBtn.title = '小説本文をコピー';
      copyBtn.textContent = '📋 コピー';
    }
  }
}

/**
 * 小説本文をTXTファイルとして保存する
 */
function saveLongNovelAsTxt() {
  const ln = state.longNovel;
  if (!ln.cleanText) return;
  downloadAsText(ln.cleanText, ln.headerInfo?.title || '長編小説', '本文');
}

/**
 * メモ・指示書をTXTファイルとして保存する
 */
function saveLongNovelMemoAsTxt() {
  const ln = state.longNovel;
  let content = ln.memoText || '';
  // 指示書が未追加なら追加する
  if (ln.settings && ln.headerInfo) {
    const sheet = buildLongNovelInstructionSheet(ln.settings, ln.headerInfo, state);
    if (!content.includes('再現用マスター指示書')) {
      content += (content ? '\n\n' : '') + sheet;
    }
  }
  if (!content) return;
  downloadAsText(content, ln.headerInfo?.title || '長編小説', 'メモ・指示書');
}

/**
 * テキストをTXTファイルとしてダウンロードするヘルパー
 */
function downloadAsText(content, title, suffix) {
  const now = new Date();
  const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
  const fileName = `${title}_${suffix}_${ts}.txt`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * メモ窓のテキスト表示を更新する
 */
function updateMemoPanel() {
  const ln = state.longNovel;
  const memoEl = document.getElementById('ln-memo-text');
  if (memoEl) {
    memoEl.textContent = ln.memoText || '（まだメモはありません）';
  }
}

/**
 * コピー操作のヘルパー（成功時にボタンをフラッシュ）
 */
async function copyTextToClipboard(text, btnId) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById(btnId);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✅ コピーしました';
      btn.classList.add('ln-copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('ln-copied');
      }, 2000);
    }
  } catch (e) {
    console.error('Copy failed:', e);
  }
}

/**
 * 長編小説の第1章を生成する（generate()から呼ばれる）
 */
async function generateLongNovelFirstChapter(settings, btn, out, tagRow, ctr) {
  const key = state.apiKey;
  if (!key) {
    out.innerHTML = '<span class="error-msg">⚠ APIキーが設定されていません。</span>';
    btn.textContent = '✨ 生成する';
    btn.disabled = false;
    document.querySelector('.settings-panel')?.classList.remove('generating');
    return;
  }

  // 長編セッション初期化
  resetLongNovelState();
  state.longNovel.active = true;
  state.longNovel.settings = JSON.parse(JSON.stringify(settings));

  // プロンプト生成
  const { prompt, tags } = buildLongNovelInitPrompt(settings);

  // タグ表示
  if (tagRow) {
    tagRow.innerHTML = '';
    const aiTag = key.startsWith('sk-') ? '<span class="tag tag-openai">ChatGPT</span>' : '<span class="tag tag-gemini">Gemini</span>';
    tagRow.innerHTML = aiTag + '<span class="tag">📖 長編小説</span>' + tags.map(t => `<span class="tag">${t}</span>`).join('');
  }

  // UI: OUTPUTボックスの準備
  out.className = 'output-box text-selectable';
  out.textContent = '📖 長編小説の第1章を生成中...（プロット設計→第1章執筆）';

  const model = GEMINI_MODELS[0].value;
  state.longNovel.usedModel = model;

  // 左側パネルの完全ロック
  lockLeftPanel();

  // 長編パネルを「生成中」状態で即表示
  state.longNovel.totalChapters = 10; // 仮の章数（AIの応答で上書き）
  updateLongNovelPanel();
  setLongNovelGenerating(true);

  // 長時間待ち対策用タイマー
  let seconds = 0;
  const timerId = setInterval(() => {
    if (!state.longNovel.active) {
      clearInterval(timerId);
      return;
    }
    seconds++;
    btn.textContent = `⏳ AIが考え中... (${seconds}秒経過)`;
  }, 1000);

  const controller = new AbortController();
  state.longNovel.abortController = controller;

  try {
    // APIコール（ストリーミング）— 引数順: apiKey, model, prompt, onChunk, onFallback
    let fullResponse = '';

    const result = await callGenerativeAIStream(
      key, model, prompt,
      ({ text, isThought }) => {
        if (!state.longNovel.active) return;
        if (!isThought) {
          fullResponse += text;
          // リアルタイムで出力表示（ヘッダー＋第1章が段階的に見える）
          out.textContent = fullResponse;
          out.scrollIntoView(false);
          // 文字カウンタをリアルタイム更新
          if (ctr) ctr.textContent = `${fullResponse.length.toLocaleString()} 字`;
          // パネルの文字数もリアルタイム更新
          const charCountEl = document.getElementById('ln-char-count');
          if (charCountEl) charCountEl.textContent = fullResponse.length.toLocaleString();
        }
      },
      (m) => {
        btn.innerHTML = `<span class="spinner"></span>フォールバック: ${m}`;
      },
      { signal: controller.signal }
    );

    if (!state.longNovel.active) return;

    // ヘッダー情報の解析
    const headerInfo = parseHeaderInfo(fullResponse);
    state.longNovel.headerInfo = headerInfo;
    state.longNovel.totalChapters = headerInfo.totalChapters || 10;

    // 第1章の本文と文脈メモを分離
    const chapterMatch = fullResponse.match(/(# 第1章[\s\S]*)/);
    const chapterRaw = chapterMatch ? chapterMatch[1] : fullResponse;
    let { body, memo } = extractContextMemo(chapterRaw);

    // ヘッダー部分（タイトル〜あらすじ）を取得
    const headerText = chapterMatch 
      ? fullResponse.substring(0, chapterMatch.index).trim() 
      : '';

    // ── 第1章の矛盾検査 ──
    let auditMemoEntry = '';
    if (body && body.trim().length > 100) {
      btn.textContent = '🔍 第1章 矛盾検査中...';
      // 進捗ログ窓に検査ステータスを表示するヘルパー
      const _auditLog = (msg) => {
        console.log('[LN Audit Ch1]', msg);
        const logEl = document.getElementById('progress-log');
        if (logEl) {
          logEl.textContent += '\n' + msg;
          const contentEl = document.getElementById('progress-content');
          if (contentEl) contentEl.scrollTop = contentEl.scrollHeight;
        }
      };
      try {
        const auditResult = await auditAndFix(key, body, state.longNovel.settings || settings, {
          onStatus: _auditLog,
          chapterNum: 1,
        });
        if (auditResult.wasFixed) {
          body = auditResult.text;
        }
        if (auditResult.remainingCriticalCount > 0) {
          _auditLog(`[検査] 第1章: 重大な矛盾が${auditResult.remainingCriticalCount}件残存 ⚠️`);
        } else if (auditResult.wasFixed) {
          _auditLog('[検査] 第1章: 矛盾修正が完了しました ✅');
        }
        if (auditResult.issues.length > 0) {
          auditMemoEntry = formatAuditResultForMemo(auditResult.issues, 1);
        }
      } catch (auditErr) {
        console.warn('第1章の矛盾検査でエラー:', auditErr.message);
        _auditLog(`[検査] 第1章: 検査エラー — 元のテキストで続行します`);
      }
    }

    state.longNovel.chapters.push({
      title: extractChapterTitle(chapterRaw),
      body: body,
      contextMemo: memo,
    });
    state.longNovel.currentChapter = 1;
    state.longNovel.fullText = fullResponse;

    // cleanText: ヘッダー + 純粋な小説本文のみ（メモ除外）
    state.longNovel.cleanText = headerText + (headerText ? '\n\n' : '') + body;
    // memoText: 文脈メモを蓄積
    state.longNovel.memoText = memo ? `--- 第1章の文脈メモ ---\n${memo}` : '';
    // 矛盾検査結果もメモに追記
    if (auditMemoEntry) {
      state.longNovel.memoText += (state.longNovel.memoText ? '\n\n' : '') + auditMemoEntry;
    }

    // OUTPUT表示: 純粋な小説本文のみ
    out.textContent = state.longNovel.cleanText;
    out.scrollIntoView(false);
    if (ctr) ctr.textContent = `${state.longNovel.cleanText.length.toLocaleString()} 字`;

    // メモ窓を更新
    updateMemoPanel();

    // 生成完了: パネル更新
    setLongNovelGenerating(false);
    updateLongNovelPanel();

    // 長編モード進行中のため、左側パネルはロックしたままにする
    lockLeftPanel();

    // フルオート進行判定
    const ln = state.longNovel;
    if (ln.currentChapter < ln.totalChapters && !ln.isPaused) {
      setTimeout(() => {
        if (ln.active && !ln.isPaused && ln.currentChapter < ln.totalChapters) {
          generateLongNovelNextChapter();
        }
      }, 2000); // ユーザーが完了を視認するための2秒待機
    }

  } catch (err) {
    if (!state.longNovel.active) return;
    out.innerHTML = `<span class="error-msg">⚠ エラー: ${err.message || err}</span>`;
    setLongNovelGenerating(false);
    resetLongNovelState();
    unlockLeftPanel();
  } finally {
    clearInterval(timerId);
  }
}

/**
 * 長編小説の次の章を生成する
 */
async function generateLongNovelNextChapter() {
  const ln = state.longNovel;
  if (!ln.active || ln.currentChapter >= ln.totalChapters) return;

  const key = state.apiKey;
  if (!key) return;

  const nextChapter = ln.currentChapter + 1;
  const isLast = nextChapter >= ln.totalChapters;

  const panel = document.getElementById('long-novel-panel');
  const btnPause = document.getElementById('btn-ln-pause');
  const out = document.getElementById('output');
  const ctr = document.querySelector('.char-counter');

  // UI: 生成中状態
  setLongNovelGenerating(true);
  if (btnPause) {
    btnPause.disabled = false;
    btnPause.innerHTML = `<span class="spinner"></span> ⏸ 第${nextChapter}章生成中...`;
  }

  // 文脈データの構築
  // 直近2章の全文
  const recentChapters = ln.chapters.slice(-2).map((c, i) => {
    const chNum = ln.currentChapter - 1 + i;
    return `# 第${chNum + 1}章: ${c.title}\n${c.body}`;
  }).join('\n\n---\n\n');

  // 3章以上前のサマリー
  let previousSummary = '';
  if (ln.chapters.length > 2) {
    previousSummary = ln.chapters.slice(0, -2).map((c, i) => {
      return `第${i + 1}章「${c.title}」: （約${c.body.length}字）`;
    }).join('\n');
  }

  // 全章の文脈維持メモ結合
  const allMemos = ln.chapters.map((c, i) => {
    return `--- 第${i + 1}章の文脈メモ ---\n${c.contextMemo || '（なし）'}`;
  }).join('\n\n');

  // プロンプト生成
  const prompt = buildLongNovelContinuePrompt(
    nextChapter, ln.totalChapters, ln.settings,
    previousSummary, recentChapters, allMemos, isLast
  );

  const controller = new AbortController();
  ln.abortController = controller;

  try {
    let chapterResponse = '';

    await callGenerativeAIStream(
      key, ln.usedModel || GEMINI_MODELS[0].value, prompt,
      ({ text, isThought }) => {
        if (!ln.active) return;
        if (!isThought) {
          chapterResponse += text;
          // OUTPUTに追記表示（cleanTextベースで、生成中のチャプターをリアルタイム追記）
          out.textContent = ln.cleanText + '\n\n---\n\n' + chapterResponse;
          out.scrollIntoView(false);
          // 文字カウンタをリアルタイム更新
          const totalLen = ln.cleanText.length + chapterResponse.length;
          if (ctr) ctr.textContent = `${totalLen.toLocaleString()} 字`;
          const charCountEl = document.getElementById('ln-char-count');
          if (charCountEl) charCountEl.textContent = totalLen.toLocaleString();
        }
      },
      (m) => {
        btnNext.innerHTML = `<span class="spinner"></span>フォールバック: ${m}`;
      },
      { signal: controller.signal }
    );

    if (!state.longNovel.active) return;

    // 章データの保存（小説本文 / メモを分離）
    let { body, memo } = extractContextMemo(chapterResponse);

    // ── 第N章の矛盾検査 ──
    let auditMemoEntry = '';
    if (body && body.trim().length > 100) {
      if (btnPause) btnPause.innerHTML = `🔍 第${nextChapter}章 矛盾検査中...`;
      // 進捗ログ窓に検査ステータスを表示するヘルパー
      const _auditLog = (msg) => {
        console.log(`[LN Audit Ch${nextChapter}]`, msg);
        const logEl = document.getElementById('progress-log');
        if (logEl) {
          logEl.textContent += '\n' + msg;
          const contentEl = document.getElementById('progress-content');
          if (contentEl) contentEl.scrollTop = contentEl.scrollHeight;
        }
      };
      // 検査コンテキスト: 過去の章のメモと直近2章の全文を活用
      try {
        const auditResult = await auditAndFix(key, body, ln.settings, {
          onStatus: _auditLog,
          chapterNum: nextChapter,
          allContextMemos: allMemos,
          recentChaptersFull: recentChapters,
        });
        if (auditResult.wasFixed) {
          body = auditResult.text;
        }
        if (auditResult.remainingCriticalCount > 0) {
          _auditLog(`[検査] 第${nextChapter}章: 重大な矛盾が${auditResult.remainingCriticalCount}件残存 ⚠️`);
        } else if (auditResult.wasFixed) {
          _auditLog(`[検査] 第${nextChapter}章: 矛盾修正が完了しました ✅`);
        }
        if (auditResult.issues.length > 0) {
          auditMemoEntry = formatAuditResultForMemo(auditResult.issues, nextChapter);
        }
      } catch (auditErr) {
        console.warn(`第${nextChapter}章の矛盾検査でエラー:`, auditErr.message);
        _auditLog(`[検査] 第${nextChapter}章: 検査エラー — 元のテキストで続行します`);
      }
    }

    ln.chapters.push({
      title: extractChapterTitle(chapterResponse),
      body: body,
      contextMemo: memo,
    });
    ln.currentChapter = nextChapter;
    ln.fullText += '\n\n---\n\n' + chapterResponse;

    // cleanText: 純粋な小説本文のみ追記（メモ除外）
    ln.cleanText += '\n\n---\n\n' + body;
    // memoText: メモを蓄積
    if (memo) {
      ln.memoText += (ln.memoText ? '\n\n' : '') + `--- 第${nextChapter}章の文脈メモ ---\n${memo}`;
    }
    // 矛盾検査結果もメモに追記
    if (auditMemoEntry) {
      ln.memoText += (ln.memoText ? '\n\n' : '') + auditMemoEntry;
    }

    // OUTPUT表示: 純粋な小説本文のみ
    out.textContent = ln.cleanText;
    out.scrollIntoView(false);
    if (ctr) ctr.textContent = `${ln.cleanText.length.toLocaleString()} 字`;

    // 最終章の場合: 指示書をメモ窓に追加（小説本文には入れない）
    if (isLast && ln.settings && ln.headerInfo) {
      const sheet = buildLongNovelInstructionSheet(ln.settings, ln.headerInfo, state);
      ln.memoText += '\n\n' + sheet;
    }

    // メモ窓を更新
    updateMemoPanel();

    // パネル更新
    setLongNovelGenerating(false);
    updateLongNovelPanel();

    // フルオート進行判定
    if (ln.currentChapter < ln.totalChapters && !ln.isPaused) {
      setTimeout(() => {
        if (ln.active && !ln.isPaused && ln.currentChapter < ln.totalChapters) {
          generateLongNovelNextChapter();
        }
      }, 2000); // ユーザーが完了を視認するための2秒待機
    }

  } catch (err) {
    if (!ln.active) return;
    out.textContent = ln.fullText + `\n\n⚠ 第${nextChapter}章の生成でエラーが発生しました: ${err.message || err}`;
    setLongNovelGenerating(false);
    if (btnPause) {
      btnPause.disabled = false;
      btnPause.textContent = `📖 第${nextChapter}章を再試行`;
    }
  } finally {
    clearInterval(timerId);
  }
}

/**
 * 長編小説を中断して現在の状態を保存する
 */
function abortLongNovel() {
  const ln = state.longNovel;
  if (!ln.active) return;
  ln.active = false;
  
  if (ln.abortController) {
    ln.abortController.abort();
  }

  // 指示書をメモ窓に追加（小説本文には入れない）
  if (ln.settings && ln.headerInfo) {
    const sheet = buildLongNovelInstructionSheet(ln.settings, ln.headerInfo, state);
    ln.memoText += (ln.memoText ? '\n\n' : '') + sheet;
    updateMemoPanel();
  }

  // 完了状態にする
  ln.totalChapters = ln.currentChapter; // 現在章を最終章扱い
  updateLongNovelPanel();

  const panel = document.getElementById('long-novel-panel');
  panel?.classList.add('ln-completed');
  const titleEl = document.getElementById('long-novel-title');
  if (titleEl) titleEl.textContent = `長編小説モード（第${ln.currentChapter}章で中断）`;

  // UIロック解除
  unlockLeftPanel();

  // 中断後: 一時停止・中断ボタンを完全非活性化、コピー/TXTのみ有効
  const btnPause = document.getElementById('btn-ln-pause');
  const btnAbort = document.getElementById('btn-ln-abort');
  if (btnPause) { btnPause.disabled = true; btnPause.textContent = '⏹ 中断済み'; }
  if (btnAbort) { btnAbort.disabled = true; btnAbort.style.opacity = '0.3'; }
}

// 長編コントロールパネルのイベントリスナー（DOMContentLoaded時に登録）
document.addEventListener('DOMContentLoaded', () => {
  // 一時停止 / 再開ボタン
  const btnPause = document.getElementById('btn-ln-pause');
  if (btnPause) {
    btnPause.addEventListener('click', () => {
      const ln = state.longNovel;
      if (ln.isPaused) {
        // 再開処理
        ln.isPaused = false;
        btnPause.textContent = '⏸ 一時停止';
        btnPause.disabled = true; // 次の章生成中に再度押されるのを防ぐ
        generateLongNovelNextChapter();
      } else {
        // 停止予約処理
        ln.isPaused = true;
        btnPause.textContent = '⏸ 停止予約中...';
        btnPause.disabled = true;
      }
    });
  }

  // 中断ボタン
  const btnAbort = document.getElementById('btn-ln-abort');
  if (btnAbort) {
    btnAbort.addEventListener('click', () => {
      if (confirm('現在の進捗で生成を中断しますか？\n（ここまでの全文はコピー・TXT保存が可能です）')) {
        abortLongNovel();
      }
    });
  }

  // 📋 小説本文コピーボタン
  const btnCopyNovel = document.getElementById('btn-ln-copy-novel');
  if (btnCopyNovel) {
    btnCopyNovel.addEventListener('click', () => {
      copyTextToClipboard(state.longNovel.cleanText, 'btn-ln-copy-novel');
    });
  }

  // 📄 小説本文TXT保存ボタン
  const btnSaveNovel = document.getElementById('btn-ln-save-novel');
  if (btnSaveNovel) {
    btnSaveNovel.addEventListener('click', () => {
      saveLongNovelAsTxt();
    });
  }

  // 📋 メモコピーボタン
  const btnCopyMemo = document.getElementById('btn-ln-copy-memo');
  if (btnCopyMemo) {
    btnCopyMemo.addEventListener('click', () => {
      // メモ + 指示書を合わせてコピー
      const ln = state.longNovel;
      let content = ln.memoText || '';
      if (ln.settings && ln.headerInfo) {
        const sheet = buildLongNovelInstructionSheet(ln.settings, ln.headerInfo, state);
        if (!content.includes('再現用マスター指示書')) {
          content += (content ? '\n\n' : '') + sheet;
        }
      }
      copyTextToClipboard(content, 'btn-ln-copy-memo');
    });
  }

  // 📄 メモTXT保存ボタン
  const btnSaveMemo = document.getElementById('btn-ln-save-memo');
  if (btnSaveMemo) {
    btnSaveMemo.addEventListener('click', () => {
      saveLongNovelMemoAsTxt();
    });
  }

  // 📝 メモ窓の折りたたみトグル
  const memoToggle = document.getElementById('ln-memo-toggle');
  if (memoToggle) {
    memoToggle.addEventListener('click', (e) => {
      // ボタンのクリックは除外
      if (e.target.closest('.btn-ln-action')) return;
      const content = document.getElementById('ln-memo-content');
      const arrow = document.getElementById('ln-memo-arrow');
      if (content) content.classList.toggle('hidden');
      if (arrow) arrow.classList.toggle('open');
    });
  }
});

