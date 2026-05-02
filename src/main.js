// ============================================================
// main.js — v2.9.2
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
  DETAIL_ORIGINALS,
} from './data.js';
import { callGemini } from './api.js';
import { buildPrompt, generateRandomTheme } from './prompt.js';
import { initCharImport } from './charImport.js';
import { version as APP_VERSION } from '../package.json';

const $ = id => document.getElementById(id);
const rnd = arr => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
const esc = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── 状態 ───
const state = {
  apiKey: '',
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
};

// ============================================================
// APIキー管理（Gemini専用）
// ============================================================
function updateBanner() {
  const b = $('banner');
  const panel = document.querySelector('.settings-panel');
  if (state.apiKey) {
    b.classList.add('ok');
    $('apikey').value = '********';
    $('apikey').readOnly = true;
    if (panel) panel.classList.remove('disabled-panel');
  } else {
    b.classList.remove('ok');
    $('apikey').value = '';
    $('apikey').readOnly = false;
    if (panel) panel.classList.add('disabled-panel');
  }
}
function saveKey() {
  const v = $('apikey').value.trim();
  if (!v) { alert('APIキーを入力してください'); return; }
  state.apiKey = v;
  updateBanner();
  $('banner').classList.add('locked');
  $('key-save').classList.add('hidden');
  $('key-edit').classList.remove('hidden');
}
function editKey() {
  $('banner').classList.remove('locked');
  $('key-save').classList.remove('hidden');
  $('key-edit').classList.add('hidden');
  $('apikey').readOnly = false;
  $('apikey').value = '';
  $('apikey').focus();
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
  const catEl = $(catId);
  if (catEl && categories) {
    catEl.innerHTML = Object.keys(categories).map(c =>
      `<button class="chip cat-chip" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    catEl.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
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
    $(customId).value = '';
    updateClear(clearId, '');
  });

  // 入力時にチップクリア
  $(customId)?.addEventListener('input', () => {
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
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mode = chip.dataset.v;
      $('mode-custom').value = chip.textContent;
      updateClear('mode-custom-clear', chip.textContent);
      updateCharCountLimit(state.mode);
    });
  });
  $('btn-rand-mode').addEventListener('click', () => {
    const selected = rnd(MODES);
    state.mode = selected.value;
    container.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.v === selected.value));
    $('mode-custom').value = selected.label;
    updateClear('mode-custom-clear', selected.label);
    updateCharCountLimit(state.mode);
  });
  $('mode-custom-rnd').addEventListener('click', () => {
    const t = rnd(MODE_ORIGINALS);
    $('mode-custom').value = t;
    state.mode = null;
    container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    updateClear('mode-custom-clear', t);
  });
  $('mode-custom').addEventListener('input', () => {
    const v = $('mode-custom').value.trim();
    updateClear('mode-custom-clear', v);
    if (v) {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      state.mode = null;
      updateCharCountLimit(null);
    }
  });
  $('charcount-check').addEventListener('change', () => {
    $('charcount-wrap').classList.toggle('hidden', !$('charcount-check').checked);
  });
  
  $('char-count').addEventListener('input', (e) => {
    const max = parseInt(e.target.max) || 6000;
    const val = parseInt(e.target.value);
    if (val > max) e.target.value = max;
  });
}

function updateCharCountLimit(modeValue) {
  const input = $('char-count');
  const hint = $('charcount-hint');
  if (!input || !hint) return;
  
  if (modeValue === 'long') {
    input.max = "300000";
    input.step = "10000";
    input.value = "100000";
    hint.textContent = "※長編モードでは、長編小説をGeminiに各章ごと分割執筆させるための『専用指示書』を生成します。";
    hint.style.color = "#4caf50";
  } else {
    input.max = "4000";
    input.step = "500";
    if (parseInt(input.value) > 4000) input.value = "2000";
    hint.textContent = "※直接生成で途切れない安全な文字数は約4,000字までです";
    hint.style.color = "#aaa";
  }
}


function resetChars() {
  state.characters = [];
  renderChars();
}
function renderChars() {
  $('char-count-display').textContent = state.characters.length;
  const list = $('char-list');
  
  const rolesDatalist = `<datalist id="roles-list">${ROLES.map(r => `<option value="${r}"></option>`).join('')}</datalist>`;
  const personalitiesDatalist = `<datalist id="personalities-list">${PERSONALITIES.map(p => `<option value="${p}"></option>`).join('')}</datalist>`;
  const sexDatalist = `<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>`;

  list.innerHTML = state.characters.map((c, i) => `
    <div class="char-card shadow-sm">
      <div class="char-card-header">
        <span class="char-card-num">キャラ ${i + 1}</span>
        <div class="btn-group">
          <button class="char-field-btn btn-char-rnd-all" data-idx="${i}" title="この人物の全項目をランダムに埋める（個別の微調整も可能）">🎲 全ランダム</button>
          <button class="btn-char-del" data-idx="${i}" title="この人物を削除">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">名前（空欄ならストーリー生成時にAI命名 / 🎲 今すぐ生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-name-input" value="${esc(c.name)}" data-idx="${i}" placeholder="例：山田太郎（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="name" title="今すぐ名前の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="name" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${i}" data-key="sex" value="${esc(c.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="sex" title="今すぐ性別の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="sex" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${i}" data-key="role" value="${esc(c.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="role" title="今すぐ役割の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="role" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${i}" data-key="personality" value="${esc(c.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="personality" title="今すぐ性格の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="personality" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${i}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている">${esc(c.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="note" title="今すぐ詳細メモの案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="note" title="消去">🗑️</button>
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
  state.characters.push({ name: '', role: '', personality: '', sex: '', note: '' });
  renderChars();
}
function deleteChar(idx) {
  state.characters.splice(idx, 1);
  renderChars();
}
function removeLastChar() {
  state.characters.pop();
  renderChars();
}
function randomizeCharField(idx, key) {
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
  state.characters[idx][key] = '';
  renderChars();
}
function randomizeChar(idx) {
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
  if (state.characters.length === 0) addChar();
  state.characters.forEach((_, i) => randomizeChar(i));
}
function randomizeCharCountAndContent() {
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
  const key = state.apiKey;
  if (!key) { alert('APIキーを設定してください（ニュースの取得にAIを使用します）'); return; }
  const btn = $('btn-today-news');
  const org = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>取得中...';
  try {
    const model = GEMINI_MODELS[0].value;
    const prompt = '今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇条書きで出力してください。';
    const { text } = await callGemini(key, model, prompt);
    const themeText = text.replace(/^[*-]\s*/gm, '').replace(/\n/g, ', ').trim();
    $('theme-custom').value = themeText;
    state.themeSelected = null; state.themeCategory = null;
    if ($('theme-cat-chips')) $('theme-cat-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    $('theme-sub-chips').innerHTML = '';
    updateClear('theme-custom-clear', themeText);
  } catch (err) {
    alert('ニュース取得失敗: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = org;
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
    charCount: $('charcount-check').checked ? parseInt($('char-count').value) || null : null,
    supplement: $('supplement').value.trim(),
  };
}

async function generate() {
  const key = state.apiKey;
  if (!key) { alert('APIキーを保存してください'); $('apikey').focus(); return; }
  const btn = $('btn-generate'), out = $('output'), tagRow = $('tag-row'), ctr = $('char-counter');
  
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>構築中...';
  $('settings').classList.add('generating');
  const alertEl = $('global-alert');
  
  const settings = gatherSettings();
  const { prompt, tags } = buildPrompt(settings);
  

  out.textContent = 'AIの思考を待っています...（しばらくお待ちください）';
  if (alertEl) {
    alertEl.innerHTML = '⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は数十秒〜1分程度かかる場合があります。結果が表示されるまでお待ちください。';
    alertEl.style.display = 'flex';
  }
  
  try {
    const model = GEMINI_MODELS[0].value;
    btn.innerHTML = '<span class="spinner"></span>Geminiに送信中...';
    
    const onFb = (m) => {
      out.textContent = `フォールバック中: ${m}...`;
    };
    
    const { text, usedModel } = await callGemini(key, model, prompt, onFb);
    
    btn.innerHTML = '<span class="spinner"></span>解析中...';
    let body = text;
    // 長編のプロンプト出力など、マークダウンブロックで囲まれた場合のクリーンアップ
    body = body.replace(/^```(markdown)?\s*/i, '').replace(/\s*```$/, '');
    
    // タイトル抽出の強化：必ず【】で囲む
    let title = '';
    const bodyLines = body.split('\n');
    if (bodyLines[0] && /^タイトル[:：]\s*/.test(bodyLines[0])) {
      // 「タイトル:」形式の行を検出
      title = bodyLines[0].replace(/^タイトル[:：]\s*/, '').trim();
      body = body.replace(/^タイトル[:：].*\n\n?/, '');
    } else if (bodyLines[0] && bodyLines[0].trim().length > 0 && bodyLines[0].trim().length <= 60) {
      // 1行目が短い場合はタイトルとみなす（60文字以下）
      title = bodyLines[0].trim();
      body = bodyLines.slice(1).join('\n').replace(/^\n+/, '');
    }
    // タイトルから既存の装飾記号を除去してから【】で囲む
    if (title) {
      title = title.replace(/^[【\[「『《〈]+/, '').replace(/[】\]」』》〉]+$/, '').trim();
    }
    state.lastTitle = title;
    out.className = 'output-box text-selectable';
    // フッター追加: 【完】or【続く】の後に改行+クレジットを付与
    const storyText = (title ? '【' + title + '】\n\n' : '') + body;
    const footer = `\n\nGenerated by Super FURU AI Story v${APP_VERSION}`;
    out.textContent = storyText + footer;
    ctr.textContent = `${out.textContent.length.toLocaleString()} 字`;
    
    const ml = GEMINI_MODELS.find(m => m.value === usedModel)?.label || usedModel;
    tagRow.innerHTML = `<span class="tag tag-gemini">Gemini</span><span class="tag tag-model">${esc(ml)}</span>` + tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
    $('btn-copy').classList.remove('hidden');
    $('btn-download').classList.remove('hidden');
    
  } catch (err) {
    out.className = 'output-box empty';
    out.innerHTML = `<div class="error-msg">エラー: ${esc(err.message)}</div>`;
  } finally {
    if (alertEl) alertEl.style.display = 'none';
  }
  
  $('settings').classList.remove('generating');
  btn.disabled = false;
  btn.textContent = 'ストーリー生成';
}

// ============================================================
// 全ランダム & リセット
// ============================================================
async function allRandom() {
  const selectedMode = rnd(MODES);
  state.mode = selectedMode.value;
  initMode();
  $('mode-custom').value = selectedMode.label;
  updateClear('mode-custom-clear', selectedMode.label);
  
  const keys = ['theme', 'genre', 'worldview', 'target', 'era', 'ending', 'narr'];
  keys.forEach(k => $(`btn-rand-${k}`)?.click());
  
  randomizeAllChars();
  $('supplement').value = '';
  updateClear('supplement-clear', '');
  
  $('panel-scroll').scrollTo({ top: 0, behavior: 'smooth' });
}

function resetAll() {
  if (!confirm('全ての設定（APIキー以外）をリセットしますか？')) return;
  
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
  
  // 5. Reset UI - Supplement & Charcount
  $('supplement').value = '';
  updateClear('supplement-clear', '');
  $('charcount-check').checked = false;
  $('charcount-wrap').classList.add('hidden');
  $('char-count').value = '400';
  
  // 6. Reset UI - Output
  $('output').className = 'output-box empty';
  $('output').innerHTML = '<div class="guide"><h3>はじめ方</h3>1. Gemini APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>';
  $('tag-row').innerHTML = '';
  $('char-counter').textContent = '0 字';
  $('btn-copy').classList.add('hidden');
  $('btn-download').classList.add('hidden');
  
  $('panel-scroll').scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 初期化実行
// ============================================================
function init() {
  $('key-save').addEventListener('click', saveKey);
  $('key-edit').addEventListener('click', editKey);
  $('btn-reload').addEventListener('click', () => location.reload());
  $('btn-all-random').addEventListener('click', allRandom);
  $('btn-reset-all').addEventListener('click', resetAll);
  $('btn-generate').addEventListener('click', generate);
  $('btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText($('output').textContent).then(() => {
      $('btn-copy').textContent = '✅ コピー完了';
      setTimeout(() => $('btn-copy').textContent = '📋 コピー', 2000);
    });
  });
  $('btn-download').addEventListener('click', () => {
    const t = $('output').textContent;
    const blob = new Blob([t], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (state.lastTitle || 'story') + '.txt';
    a.click();
  });

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
  $('btn-today-news').addEventListener('click', fetchNewsAndSetTheme);
  $('btn-add-char').addEventListener('click', addChar);
  $('btn-remove-char').addEventListener('click', removeLastChar);
  $('btn-rand-chars-content').addEventListener('click', randomizeAllChars);
  $('btn-rand-chars-all').addEventListener('click', randomizeCharCountAndContent);

  renderChars();

  // キャラクターシート画像取り込み初期化
  initCharImport(state, renderChars, () => state.apiKey);
}

document.addEventListener('DOMContentLoaded', init);
