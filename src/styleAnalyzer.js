// ============================================================
// styleAnalyzer.js — 作風解析エンジン (β版)
// テキストをドロップ→AIで作風パラメータ抽出→JSON/コピー→リライト
// ============================================================
import { callGenerativeAI } from './api.js';
import { GEMINI_MODELS } from './data.js';

const $ = id => document.getElementById(id);

// --- 内部状態 ---
let droppedTexts = [];        // ドロップされたテキスト群
let analysisResult = null;    // 解析結果（JSONオブジェクト）
let reflectedOutput = '';     // リライト後のテキスト
let getApiKey = () => '';     // APIキー取得コールバック
let getLastOutput = () => ''; // 直前のストーリー出力取得コールバック

// ============================================================
// 作風解析プロンプト
// ============================================================
const ANALYSIS_PROMPT = `あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 出力フォーマット（必ずこのJSON形式で出力。各項目は詳細に記述すること）

\`\`\`json
{
  "style_name": "この作風を一言で表す名前",
  "tone": "全体のトーン・雰囲気（複合的に記述）",
  "narrative_voice": {
    "person": "人称（一人称/二人称/三人称/混合）",
    "distance": "語り手と物語の距離感（密着型/中距離/俯瞰型）",
    "reliability": "語り手の信頼度（信頼できる語り手/不確かな語り手/意図的な嘘つき）",
    "intrusion": "語り手の介入度（透明/時折コメント/頻繁に介入/メタフィクション的）"
  },
  "sentence_style": {
    "avg_length": "一文の平均的な長さ（短文主体○字前後/中文/長文主体○字前後）",
    "length_variation": "文長のばらつき（均一/やや変化/激しい緩急）",
    "ending_patterns": "文末パターン上位3つ（例：だ。/である。/体言止め。の比率）",
    "rhythm": "文のリズム感の詳細",
    "paragraph_length": "段落の長さ傾向（短段落○行/中段落/長段落○行）",
    "paragraph_structure": "段落の構成パターン（トピックセンテンス型/帰納型/散文型）"
  },
  "vocabulary": {
    "level": "語彙レベル（日常的/文学的/専門的/混合）",
    "density": "情報密度（疎/標準/濃密）",
    "register": "言語レジスター（口語/文語/混合/コードスイッチング）",
    "quirks": "語彙の癖・特徴的な語彙選択",
    "foreign_words": "外来語・カタカナ語の使用傾向",
    "archaic_modern": "古語・現代語のバランス"
  },
  "rhetoric": {
    "metaphor_style": "比喩の傾向（直喩多用/暗喩中心/擬人法/換喩/提喩）",
    "metaphor_source": "比喩の素材（自然/都市/身体/テクノロジー/食物等）",
    "repetition": "反復技法の使用（アナフォラ/エピフォラ/畳語/なし）",
    "irony_level": "アイロニーの度合い（なし/軽微/中程度/全編的）",
    "humor_type": "ユーモアの型（不条理/風刺/自虐/言葉遊び/ブラック/なし）",
    "other_techniques": "その他の修辞技法（倒置/省略/列挙/対句等）"
  },
  "description_focus": {
    "visual": "視覚描写（色彩傾向・画角・光と影の使い方）",
    "auditory": "聴覚描写（音の種類・静寂の扱い）",
    "tactile": "触覚描写（温度・質感・痛覚）",
    "olfactory_gustatory": "嗅覚・味覚描写の有無と傾向",
    "kinesthetic": "運動感覚・身体感覚の描写傾向",
    "spatial": "空間把握の方法（広角/クローズアップ/移動視点）",
    "psychological_depth": "心理描写の深度と手法",
    "show_tell_ratio": "Show:Tellの推定比率（例：7:3）と手法"
  },
  "dialogue": {
    "style": "セリフの文体的特徴",
    "function": "セリフの機能的役割（情報伝達/性格描写/プロット推進/雰囲気構築）",
    "tag_style": "地の文とセリフの接続方法（最小限/動作付き/心理付き）",
    "dialect_sociolect": "方言・社会方言の使用（標準語/方言/階層差/キャラ語尾）",
    "subtext": "言外の意味の使い方（直接的/暗示的/多層的）"
  },
  "structure": {
    "pacing": "テンポの詳細（加速パターン・減速パターン）",
    "scene_transition": "場面転換の手法（カット/フェード/ブリッジ/意識の流れ）",
    "time_handling": "時制の使い方（直線的/回想多用/時系列シャッフル）",
    "tension_curve": "緊張の曲線パターン（漸増/波状/急転直下/持続型）",
    "opening_style": "冒頭の特徴的パターン",
    "closing_style": "結末の特徴的パターン"
  },
  "emotional_architecture": {
    "dominant_emotions": "主要な感情（上位3つ）",
    "emotional_range": "感情の振り幅（狭い/中程度/広い）",
    "catharsis_method": "カタルシスの与え方",
    "reader_distance": "読者との感情的距離（共感誘導/突き放し/観察的）"
  },
  "themes_tendency": "テーマの傾向（詳細に）",
  "literary_influences": "文学的影響を感じる作家・流派（推定）",
  "unique_features": ["この作者固有の表現技法・癖を5つ以上箇条書き"],
  "anti_patterns": ["この作者が意図的に避けていると思われる表現"],
  "reproduction_prompt": "この作風を他のAI（ChatGPT/Claude/Gemini等）で完全に再現するための詳細な指示文。600字以上で、文体・語彙・修辞・構造・感情設計の全側面を網羅すること"
}
\`\`\`

## 重要指示:
- 各項目は「一言」ではなく「具体的根拠を含む2〜3文」で記述すること
- unique_featuresは最低5項目、具体的な用例を添えること
- reproduction_promptは他のAIにそのままコピペして使える完成度にすること

## 分析対象テキスト:
`;

// ============================================================
// 作風反映プロンプト（生成後リライト方式）
// ============================================================
function buildReflectionPrompt(styleJson, originalText) {
  return `あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」に完全に従ってリライトしてください。

## 絶対遵守ルール:
1. 物語のプロット（起承転結）、登場人物、設定は一切変更しない
2. 文体・語彙・描写方法・セリフ回しのみを作風パラメータに合わせて変換する
3. 文字数は元のテキストの80%〜120%の範囲に収める
4. タイトルがあればそのまま維持する
5. リライト結果のみを出力し、解説や注釈は一切付けない

## 作風パラメータ:
${JSON.stringify(styleJson, null, 2)}

## 元のテキスト:
${originalText}

## リライト結果:`;
}

// ============================================================
// API稼働表示ヘルパー
// ============================================================
function showApiActivity(msg) {
  // 左パネルの生成ボタンに表示
  const settingsPanel = $('settings');
  if (settingsPanel) settingsPanel.classList.add('generating');
  const genBtn = document.querySelector('.btn-generate');
  if (genBtn) {
    genBtn._origText = genBtn.textContent;
    genBtn.disabled = true;
    genBtn.innerHTML = `<span class="spinner"></span>${msg}`;
  }
  // STEP2/3のAPIステータスバーに表示
  const statusEl = $('sa-api-status');
  if (statusEl) {
    statusEl.innerHTML = `<span class="spinner"></span>${msg}`;
    statusEl.classList.remove('hidden');
  }
  const reflectStatusEl = $('sa-reflect-api-status');
  if (reflectStatusEl) {
    reflectStatusEl.innerHTML = `<span class="spinner"></span>${msg}`;
    reflectStatusEl.classList.remove('hidden');
  }
  
  // 画面上部のグローバルアラートにも同期表示
  const alertEl = $('global-alert');
  if (alertEl) {
    alertEl.innerHTML = `⚠️ <strong>稼働中:</strong> ${msg}`;
    alertEl.style.display = 'flex';
  }
}

function updateApiStatus(msg) {
  const statusEl = $('sa-api-status');
  if (statusEl) statusEl.innerHTML = `<span class="spinner"></span>${msg}`;
  const reflectStatusEl = $('sa-reflect-api-status');
  if (reflectStatusEl) reflectStatusEl.innerHTML = `<span class="spinner"></span>${msg}`;
  const genBtn = document.querySelector('.btn-generate');
  if (genBtn) genBtn.innerHTML = `<span class="spinner"></span>${msg}`;

  const alertEl = $('global-alert');
  if (alertEl) alertEl.innerHTML = `⚠️ <strong>稼働中:</strong> ${msg}`;
}

function hideApiActivity() {
  const settingsPanel = $('settings');
  if (settingsPanel) settingsPanel.classList.remove('generating');
  const genBtn = document.querySelector('.btn-generate');
  if (genBtn) {
    genBtn.disabled = false;
    genBtn.textContent = genBtn._origText || 'ストーリー生成';
  }
  const statusEl = $('sa-api-status');
  if (statusEl) statusEl.classList.add('hidden');
  const reflectStatusEl = $('sa-reflect-api-status');
  if (reflectStatusEl) reflectStatusEl.classList.add('hidden');

  const alertEl = $('global-alert');
  if (alertEl) alertEl.style.display = 'none';
}

// ============================================================
// ドロップゾーン初期化
// ============================================================
function initDropzone() {
  const dropzone = $('sa-dropzone');
  const fileInput = $('sa-file-input');
  if (!dropzone || !fileInput) return;

  // クリックでファイル選択
  dropzone.addEventListener('click', () => fileInput.click());

  // ドラッグ操作
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('sa-dragover');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('sa-dragover');
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('sa-dragover');
    handleFiles(e.dataTransfer.files);
  });

  // ファイル選択
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    fileInput.value = ''; // リセット
  });
}

// ============================================================
// ファイル読み込み処理
// ============================================================
async function handleFiles(fileList) {
  const files = Array.from(fileList);
  const textFiles = files.filter(f =>
    f.type === 'text/plain' ||
    f.name.endsWith('.txt') ||
    f.name.endsWith('.md') ||
    f.name.endsWith('.csv') ||
    f.type === '' // 拡張子なしのテキストファイル対策
  );

  if (textFiles.length === 0) {
    alert('テキストファイル (.txt, .md) をドロップしてください');
    return;
  }

  for (const file of textFiles) {
    try {
      const text = await readFileAsText(file);
      if (text.trim().length > 0) {
        droppedTexts.push({ name: file.name, text: text.trim(), charCount: text.trim().length });
      }
    } catch (err) {
      console.warn(`ファイル読み込み失敗: ${file.name}`, err);
    }
  }

  // UI更新
  updateFileList();

  if (droppedTexts.length > 0) {
    $('sa-dropzone').classList.add('sa-has-files');
  }
  updateAnalyzeButtonState();
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });
}

// ============================================================
// ファイルリスト表示
// ============================================================
function updateFileList() {
  const listEl = $('sa-file-list');
  if (!listEl) return;

  const totalChars = droppedTexts.reduce((sum, t) => sum + t.charCount, 0);
  const fileCountEl = $('sa-file-count');
  if (fileCountEl) {
    fileCountEl.textContent = `${droppedTexts.length}件 / ${totalChars.toLocaleString()}字`;
    fileCountEl.classList.remove('hidden');
  }

  listEl.innerHTML = droppedTexts.map((t, i) => `
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${escHtml(t.name)}</span>
      <span class="sa-file-chars">${t.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${i}" title="除去">✕</button>
    </div>
  `).join('');

  // 削除ボタン
  listEl.querySelectorAll('.sa-file-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      droppedTexts.splice(idx, 1);
      updateFileList();
      if (droppedTexts.length === 0) {
        $('sa-dropzone').classList.remove('sa-has-files');
        $('sa-file-count').classList.add('hidden');
      }
      updateAnalyzeButtonState();
    });
  });
}

function escHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
// 作風解析実行
// ============================================================
async function runAnalysis() {
  const apiKey = getApiKey();
  if (!apiKey) { alert('APIキーを保存してから解析してください'); return; }
  if (droppedTexts.length === 0) { alert('テキストファイルをドロップしてください'); return; }

  const btn = $('btn-sa-analyze');
  const resultWrap = $('sa-result-wrap');
  const resultEl = $('sa-result');
  const reflectWrap = $('sa-reflect-wrap');
  const reflectResultWrap = $('sa-reflect-result-wrap');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>AIが作風を解析中...';
  resultEl.textContent = '解析中です...しばらくお待ちください（30秒〜1分）';
  resultWrap.classList.remove('hidden');
  reflectWrap.classList.add('hidden');
  reflectResultWrap.classList.add('hidden');

  // API稼働中表示
  showApiActivity('🔬 作風解析中...');

  try {
    // テキストを結合（最大100,000文字）
    let corpus = droppedTexts.map(t => `--- ${t.name} ---\n${t.text}`).join('\n\n');
    if (corpus.length > 100000) {
      corpus = corpus.slice(0, 100000) + '\n\n[...以降のテキストは省略（コンテキスト上限）...]';
    }

    const fullPrompt = ANALYSIS_PROMPT + corpus;
    const model = GEMINI_MODELS[0].value;
    const { text } = await callGenerativeAI(apiKey, model, fullPrompt, (fb) => {
      updateApiStatus(`フォールバック: ${fb}`);
      btn.innerHTML = `<span class="spinner"></span>フォールバック: ${fb}`;
    });

    // JSONブロック抽出
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      analysisResult = JSON.parse(jsonMatch[1]);
    } else {
      const braceMatch = text.match(/\{[\s\S]*\}/);
      if (braceMatch) {
        analysisResult = JSON.parse(braceMatch[0]);
      } else {
        throw new Error('AIの応答からJSONを抽出できませんでした');
      }
    }

    // 結果表示
    displayAnalysisResult(analysisResult);

    // リライトボタンを表示（解析完了後に連続で使える）
    reflectWrap.classList.remove('hidden');
    updateReflectButtonState();

  } catch (err) {
    resultEl.textContent = `解析エラー: ${err.message}`;
    resultEl.classList.add('sa-error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🔬 作風解析を実行';
    hideApiActivity();
  }
}

// ============================================================
// 解析結果表示（人間可読フォーマット）
// ============================================================
function displayAnalysisResult(result) {
  const el = $('sa-result');
  el.classList.remove('sa-error');
  const L = [];
  const add = (icon, label, val) => { if (val) L.push(`${icon} ${label}: ${val}`); };
  const sub = (label, val) => { if (val) L.push(`  ・${label}: ${val}`); };
  const sec = (icon, title) => { L.push(''); L.push(`${icon} ${title}:`); };

  add('🏷️', '作風名', result.style_name);
  add('🎭', 'トーン', result.tone);

  // 語りの視点（新旧スキーマ両対応）
  if (typeof result.narrative_voice === 'object' && result.narrative_voice) {
    sec('🎙️', '語りの視点');
    sub('人称', result.narrative_voice.person);
    sub('距離感', result.narrative_voice.distance);
    sub('信頼度', result.narrative_voice.reliability);
    sub('介入度', result.narrative_voice.intrusion);
  } else {
    add('🎙️', '語りの視点', result.narrative_voice);
  }

  sec('📝', '文体');
  if (result.sentence_style) {
    sub('平均文長', result.sentence_style.avg_length || result.sentence_style.length);
    sub('文長変動', result.sentence_style.length_variation);
    sub('文末パターン', result.sentence_style.ending_patterns || result.sentence_style.ending);
    sub('リズム', result.sentence_style.rhythm);
    sub('段落長', result.sentence_style.paragraph_length);
    sub('段落構成', result.sentence_style.paragraph_structure);
  }

  sec('📖', '語彙');
  if (result.vocabulary) {
    sub('レベル', result.vocabulary.level);
    sub('情報密度', result.vocabulary.density);
    sub('レジスター', result.vocabulary.register);
    sub('特徴', result.vocabulary.quirks);
    sub('外来語', result.vocabulary.foreign_words);
    sub('古語/現代語', result.vocabulary.archaic_modern);
  }

  if (result.rhetoric) {
    sec('🔮', '修辞技法');
    sub('比喩スタイル', result.rhetoric.metaphor_style);
    sub('比喩素材', result.rhetoric.metaphor_source);
    sub('反復技法', result.rhetoric.repetition);
    sub('アイロニー', result.rhetoric.irony_level);
    sub('ユーモア', result.rhetoric.humor_type);
    sub('その他', result.rhetoric.other_techniques);
  }

  sec('🖼️', '描写フォーカス');
  if (result.description_focus) {
    sub('視覚', result.description_focus.visual);
    sub('聴覚', result.description_focus.auditory);
    sub('触覚', result.description_focus.tactile);
    sub('嗅覚/味覚', result.description_focus.olfactory_gustatory);
    sub('運動感覚', result.description_focus.kinesthetic);
    sub('空間把握', result.description_focus.spatial);
    sub('心理描写', result.description_focus.psychological_depth || result.description_focus.psychological);
    sub('Show:Tell', result.description_focus.show_tell_ratio);
  }

  if (result.dialogue) {
    sec('💬', 'セリフ');
    sub('文体', result.dialogue.style);
    sub('機能', result.dialogue.function);
    sub('タグ', result.dialogue.tag_style);
    sub('方言', result.dialogue.dialect_sociolect);
    sub('サブテキスト', result.dialogue.subtext);
  } else {
    add('💬', 'セリフ回し', result.dialogue_style);
  }

  if (result.structure) {
    sec('🏗️', '構造');
    sub('テンポ', result.structure.pacing);
    sub('場面転換', result.structure.scene_transition);
    sub('時制', result.structure.time_handling);
    sub('緊張曲線', result.structure.tension_curve);
    sub('冒頭パターン', result.structure.opening_style);
    sub('結末パターン', result.structure.closing_style);
  } else {
    add('⏱️', 'テンポ', result.pacing);
  }

  if (result.emotional_architecture) {
    sec('❤️', '感情設計');
    sub('主要感情', result.emotional_architecture.dominant_emotions);
    sub('振り幅', result.emotional_architecture.emotional_range);
    sub('カタルシス', result.emotional_architecture.catharsis_method);
    sub('読者距離', result.emotional_architecture.reader_distance);
  }

  add('🎯', 'テーマ傾向', result.themes_tendency);
  add('📚', '文学的影響', result.literary_influences);
  L.push('');

  if (result.unique_features?.length) {
    L.push('✨ 固有の特徴:');
    result.unique_features.forEach(f => L.push(`  ・${f}`));
  }
  if (result.anti_patterns?.length) {
    L.push('');
    L.push('🚫 回避パターン:');
    result.anti_patterns.forEach(f => L.push(`  ・${f}`));
  }
  L.push('');
  L.push('━━━ 再現プロンプト ━━━');
  L.push(result.reproduction_prompt || '（生成されませんでした）');

  el.textContent = L.join('\n');
}

// ============================================================
// リライト実行
// ============================================================
async function runReflection() {
  const apiKey = getApiKey();
  if (!apiKey) { alert('APIキーを保存してください'); return; }
  if (!analysisResult) { alert('先に作風解析を実行してください'); return; }

  // OUTPUTエリアのテキストを取得
  const originalText = getLastOutput();
  const storyOutputEl = $('output');
  if (!originalText || originalText.length < 10 || (storyOutputEl && storyOutputEl.classList.contains('empty'))) {
    alert('まず上のストーリー生成でテキストを生成してから、リライトを実行してください');
    return;
  }

  const btn = $('btn-sa-reflect');
  const resultWrap = $('sa-reflect-result-wrap');
  const outputEl = $('sa-reflect-output');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>作風を反映してリライト中...';
  outputEl.textContent = 'リライト中です...しばらくお待ちください';
  resultWrap.classList.remove('hidden');

  // API稼働中表示
  showApiActivity('🎨 作風リライト中...');

  try {
    const prompt = buildReflectionPrompt(analysisResult, originalText);
    const model = GEMINI_MODELS[0].value;
    const { text } = await callGenerativeAI(apiKey, model, prompt, (fb) => {
      updateApiStatus(`リライト フォールバック: ${fb}`);
      btn.innerHTML = `<span class="spinner"></span>フォールバック: ${fb}`;
    });

    // マークダウンブロック除去
    let body = text.replace(/^```(markdown)?\s*/i, '').replace(/\s*```$/, '');

    reflectedOutput = body;
    outputEl.textContent = body;

    // 文字数表示
    const counter = $('sa-reflect-counter');
    if (counter) counter.textContent = `${body.length.toLocaleString()} 字`;

    // リライト結果までスクロール
    resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    outputEl.textContent = `リライトエラー: ${err.message}`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🎨 この作風でリライト実行';
    hideApiActivity();
  }
}

// ============================================================
// コピー・保存ユーティリティ
// ============================================================
function copyAnalysis() {
  if (!analysisResult) return;
  const text = $('sa-result').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = $('btn-sa-copy');
    btn.textContent = '✅ コピー完了';
    setTimeout(() => btn.textContent = '📋 コピー', 2000);
  });
}

function makeTimestamp() {
  return new Date().toISOString().replace(/[-T:]/g,'').slice(0,14);
}

function saveAnalysisJson() {
  if (!analysisResult) return;
  const json = JSON.stringify(analysisResult, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const name = (analysisResult.style_name || 'style_analysis').replace(/[\s\/\\:*?"<>|]/g, '_');
  a.download = `${name}_${makeTimestamp()}.json`;
  a.click();
}

function copyReflection() {
  if (!reflectedOutput) return;
  navigator.clipboard.writeText(reflectedOutput).then(() => {
    const btn = $('btn-sa-reflect-copy');
    btn.textContent = '✅ コピー完了';
    setTimeout(() => btn.textContent = '📋 コピー', 2000);
  });
}

function saveReflectionTxt() {
  if (!reflectedOutput) return;
  const blob = new Blob([reflectedOutput], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `style_rewrite_${makeTimestamp()}.txt`;
  a.click();
}

function clearAll() {
  droppedTexts = [];
  analysisResult = null;
  reflectedOutput = '';
  updateFileList();

  $('sa-dropzone').classList.remove('sa-has-files');
  $('sa-file-count')?.classList.add('hidden');
  updateAnalyzeButtonState();
  updateReflectButtonState();

  $('sa-result').textContent = '';
  $('sa-result-wrap')?.classList.add('hidden');
  $('sa-reflect-wrap')?.classList.add('hidden');
  $('sa-reflect-result-wrap')?.classList.add('hidden');
  $('sa-reflect-output').textContent = '';
}

export function updateStyleAnalyzerSectionState() {
  const saSection = $('sa-section');
  if (!saSection) return;
  const apiKey = (typeof getApiKey === 'function') ? getApiKey() : '';
  if (apiKey) {
    saSection.classList.remove('sa-inactive');
  } else {
    saSection.classList.add('sa-inactive');
  }
}

export function updateAnalyzeButtonState() {
  const btn = $('btn-sa-analyze');
  if (!btn) return;
  const apiKey = (typeof getApiKey === 'function') ? getApiKey() : '';
  const hasFiles = droppedTexts.length > 0;
  btn.disabled = !(apiKey && hasFiles);
}

export function updateReflectButtonState() {
  const reflectBtn = $('btn-sa-reflect');
  if (!reflectBtn) return;
  const originalText = (typeof getLastOutput === 'function') ? getLastOutput() : '';
  const outputEl = $('output');
  const hasStory = originalText && originalText.length >= 10 && outputEl && !outputEl.classList.contains('empty');
  const hasAnalysis = analysisResult !== null;
  reflectBtn.disabled = !(hasStory && hasAnalysis);
}

// ============================================================
// 外部インターフェース（main.js から呼び出す）
// ============================================================
export function initStyleAnalyzer(apiKeyGetter, lastOutputGetter) {
  getApiKey = apiKeyGetter;
  getLastOutput = lastOutputGetter;

  initDropzone();

  // ボタンイベント
  $('btn-sa-analyze')?.addEventListener('click', runAnalysis);
  $('btn-sa-reflect')?.addEventListener('click', runReflection);
  $('btn-sa-copy')?.addEventListener('click', copyAnalysis);
  $('btn-sa-json')?.addEventListener('click', saveAnalysisJson);
  $('btn-sa-reflect-copy')?.addEventListener('click', copyReflection);
  $('btn-sa-reflect-dl')?.addEventListener('click', saveReflectionTxt);
  $('btn-sa-clear')?.addEventListener('click', clearAll);

  // 初期化時のセクション活性化状態の更新
  updateStyleAnalyzerSectionState();
}
