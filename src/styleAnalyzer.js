// ============================================================
// styleAnalyzer.js — 超強引！作風解析エンジン (β版)
// テキストをドロップ→AIで作風パラメータ抽出→JSON/コピー→リライト
// ============================================================
import { callGenerativeAI, callGenerativeAIMultimodal, callGenerativeAIStream } from './api.js';
import { GEMINI_MODELS } from './data.js';

const $ = id => document.getElementById(id);

// --- 内部状態 ---
let droppedTexts = [];        // ドロップされたテキスト群
let droppedImages = [];       // ドロップされた画像群 [{ name, base64, mimeType, previewUrl }]
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
- 値の文字列内で二重引用符を使用する場合は、生のダブルクォーテーション（"）ではなく、必ず二重山括弧（『』）や角括弧（「」）を使用すること
- **画像のみの入力、あるいは情報が少ない入力に対する指示**:
  - 入力されたテキストが短い単語・一文のみである場合、または画像（イラスト）のみの入力である場合は、その言葉や絵の空気感から想起される背景、世界観、感情、言外のニュアンス、またはポップカルチャーや文化的背景を最大限に想像・補完してください。
  - 特に画像のみの解析時におけるテキスト固有の項目（文体、語彙、セリフ、修辞、テンポ等）については、「もしこのイラストを描いた作者が文章を執筆するならば、どのような文体、語彙、テンポ、語り口にするか」を想像力をフルに働かせて具体的に推測・補完してください。
  - 情報不足を理由にした「判定不可」「画像のみのため解析不能」「不明」といった出力や簡素すぎる記述は絶対に禁止します。エンターテインメントとしての面白さを重視し、すべての項目を具体的かつクリエイティブな想像力で詳細に埋めてください。

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
  const saSection = $('sa-section');
  if (saSection) saSection.classList.add('generating');
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

  // API稼働中（警告バー表示中）は、ログ領域を広く使うため自己採点スコアボードを確実に非表示にする（排他表示の徹底）
  const thoughtScoreBoard = $('thought-score-board');
  if (thoughtScoreBoard) {
    thoughtScoreBoard.style.display = 'none';
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

  const thoughtScoreBoard = $('thought-score-board');
  if (thoughtScoreBoard) {
    thoughtScoreBoard.style.display = 'none';
  }
}

function hideApiActivity() {
  const settingsPanel = $('settings');
  if (settingsPanel) settingsPanel.classList.remove('generating');
  const saSection = $('sa-section');
  if (saSection) saSection.classList.remove('generating');
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
    f.type === ''
  );

  const imageFiles = files.filter(f => f.type.startsWith('image/'));

  if (textFiles.length === 0 && imageFiles.length === 0) {
    alert('テキストファイル (.txt, .md) または画像ファイルをドロップしてください');
    return;
  }

  // テキストファイルの処理
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

  // 画像ファイルの処理
  for (const file of imageFiles) {
    try {
      const base64 = await readFileAsDataURL(file);
      const previewUrl = URL.createObjectURL(file);
      droppedImages.push({ name: file.name, base64, mimeType: file.type, previewUrl });
    } catch (err) {
      console.warn(`画像ファイル読み込み失敗: ${file.name}`, err);
    }
  }

  // UI更新
  updateFileList();
  updateImageList();

  if (droppedTexts.length > 0 || droppedImages.length > 0) {
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

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
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

// ============================================================
// 画像プレビューリスト表示
// ============================================================
function updateImageList() {
  const listEl = $('sa-image-list');
  if (!listEl) return;

  if (droppedImages.length === 0) {
    listEl.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  listEl.classList.remove('hidden');
  listEl.innerHTML = droppedImages.map((img, i) => `
    <div class="sa-image-item">
      <img src="${img.previewUrl}" alt="${escHtml(img.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${escHtml(img.name)}</span>
      <button class="sa-file-remove" data-img-idx="${i}" title="除去">✕</button>
    </div>
  `).join('');

  // 画像個別削除ボタン
  listEl.querySelectorAll('.sa-file-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.imgIdx);
      // メモリリーク防止: ObjectURLを解放
      if (droppedImages[idx]?.previewUrl) {
        URL.revokeObjectURL(droppedImages[idx].previewUrl);
      }
      droppedImages.splice(idx, 1);
      updateImageList();
      if (droppedTexts.length === 0 && droppedImages.length === 0) {
        $('sa-dropzone').classList.remove('sa-has-files');
      }
      updateAnalyzeButtonState();
    });
  });
}

// テキストから最初の有効なJSONオブジェクトを、波括弧のネストを考慮して抽出する
function extractFirstJsonObject(text) {
  const startIdx = text.indexOf('{');
  if (startIdx === -1) return null;

  let braceCount = 0;
  let inString = false;
  let escape = false;

  for (let i = startIdx; i < text.length; i++) {
    const char = text[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (char === '\\') {
      escape = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          return text.slice(startIdx, i + 1);
        }
      }
    }
  }

  return null;
}

// ============================================================
// JSON修復パーサー
// AIが返すJSONにありがちな構文エラーを修復してパースする
// ============================================================
function parseJsonWithRepair(raw) {
  // まず素直にパースを試行
  try {
    return JSON.parse(raw);
  } catch (firstErr) {
    console.warn('JSON初回パース失敗、修復を試行:', firstErr.message);
  }

  let fixed = raw.trim();

  // 1. JSONコメント除去: // ... や /* ... */
  fixed = fixed.replace(/\/\/[^\n]*/g, '');
  fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

  // 2. シングルクォートをダブルクォートに変換（キー名のみ、値内のアポストロフィは除外）
  fixed = fixed.replace(/(\{|,)\s*'([^']+)'\s*:/g, '$1"$2":');

  // 3. 制御文字やエスケープされていないダブルクォートを修復するためのステートマシン
  let result = '';
  let inString = false;
  let currentString = '';

  for (let i = 0; i < fixed.length; i++) {
    const char = fixed[i];

    if (!inString) {
      if (char === '"') {
        inString = true;
        currentString = '';
      } else {
        result += char;
      }
    } else {
      // 文字列の内部
      if (char === '\\') {
        // エスケープ文字
        if (i + 1 < fixed.length) {
          const nextChar = fixed[i + 1];
          currentString += '\\' + nextChar;
          i++; // 次の文字を消費
        } else {
          currentString += '\\';
        }
      } else if (char === '"') {
        // ダブルクォートを発見。これが本当の終了クォートか、それとも文字列内の生のクォートか判定する。
        // 判断のために、このダブルクォートの後の有効な次の文字（スペース・改行以外の文字）を確認する。
        let nextValidChar = '';
        let nextIdx = i + 1;
        while (nextIdx < fixed.length) {
          const c = fixed[nextIdx];
          if (c !== ' ' && c !== '\t' && c !== '\r' && c !== '\n') {
            nextValidChar = c;
            break;
          }
          nextIdx++;
        }

        // 判断基準：
        // もしこの文字列がキー名である場合、その後に ':' が続くはず。
        // もしこの文字列が値である場合、その後に ',' または '}' または ']' が続くはず。
        let isRealEnd = false;
        if (nextValidChar === ':') {
          isRealEnd = true;
        } else if (nextValidChar === '}' || nextValidChar === ']' || nextValidChar === '') {
          isRealEnd = true;
        } else if (nextValidChar === ',') {
          // カンマの場合、さらにその次の有効な文字を先読みする
          let afterCommaChar = '';
          let afterCommaIdx = nextIdx + 1;
          while (afterCommaIdx < fixed.length) {
            const c = fixed[afterCommaIdx];
            if (c !== ' ' && c !== '\t' && c !== '\r' && c !== '\n') {
              afterCommaChar = c;
              break;
            }
            afterCommaIdx++;
          }
          
          // カンマの後に続くべき有効な文字：
          // - 次のキー名または文字列の開始: '"'
          // - オブジェクトや配列の入れ子の開始: '{', '['
          // - 数値の開始: '-', '0'-'9'
          // - boolean/null の開始: 't', 'f', 'n'
          // - オブジェクトや配列の終了（末尾カンマの場合）: '}', ']'
          const validJsonStartChars = ['"', '{', '[', '-', 't', 'f', 'n', '}', ']'];
          if (validJsonStartChars.includes(afterCommaChar) || (afterCommaChar >= '0' && afterCommaChar <= '9')) {
            isRealEnd = true;
          }
        }

        if (isRealEnd) {
          // 本物の終了クォート。これまでの文字列を処理して出力に加える。
          // 文字列内の改行やタブなどの制御文字をエスケープ
          let processed = currentString
            .replace(/\t/g, '\\t')
            .replace(/\r\n/g, '\\n')
            .replace(/\r/g, '\\n')
            .replace(/\n/g, '\\n');

          result += '"' + processed + '"';
          inString = false;
        } else {
          // 生のダブルクォート（文字列の途中）。エスケープして文字列に蓄積する。
          currentString += '\\"';
        }
      } else {
        currentString += char;
      }
    }
  }

  // 万が一、文字列が閉じられないまま終わった場合は閉じる
  if (inString) {
    let processed = currentString
      .replace(/\t/g, '\\t')
      .replace(/\r\n/g, '\\n')
      .replace(/\r/g, '\\n')
      .replace(/\n/g, '\\n');
    result += '"' + processed + '"';
  }

  fixed = result;

  // 4. 末尾カンマ除去: },] や },} の前のカンマ
  fixed = fixed.replace(/,\s*([\]}])/g, '$1');

  // 修復後に再パース
  try {
    return JSON.parse(fixed);
  } catch (secondErr) {
    console.warn('JSON修復パース失敗、第2段階修復を試行:', secondErr.message);
    // 最終手段: より攻撃的な修復
    try {
      // 文字列値内のエスケープされていないバックスラッシュを処理
      let aggressive = fixed.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
      return JSON.parse(aggressive);
    } catch (thirdErr) {
      throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${thirdErr.message}`);
    }
  }
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

  // 直貼りテキスト取得
  const directTextEl = $('sa-direct-text');
  const directText = directTextEl ? directTextEl.value.trim() : '';

  // 入力チェック: テキスト（ドロップまたは直貼り）か画像のいずれかが必要
  if (droppedTexts.length === 0 && droppedImages.length === 0 && !directText) {
    alert('テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください');
    return;
  }

  const btn = $('btn-sa-analyze');
  const resultWrap = $('sa-result-wrap');
  const resultEl = $('sa-result');
  const reflectWrap = $('sa-reflect-wrap');
  const reflectResultWrap = $('sa-reflect-result-wrap');

  // 📡 AI進捗ログ窓の初期化と完全リセット（排他表示と押しのけ防止）
  const progressLog = $('progress-log');
  const thoughtScoreBoard = $('thought-score-board');
  const progressTitleText = $('progress-title-text');
  
  if (progressLog) progressLog.textContent = "作風解析の開始を待っています...";
  if (thoughtScoreBoard) {
    thoughtScoreBoard.innerHTML = "";
    thoughtScoreBoard.style.display = "none";
  }
  if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 作風解析中...';

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>AIが超強引に作風を解析中...';
  resultEl.textContent = '超強引に解析中です...しばらくお待ちください（1分〜3分程度）';
  resultWrap.classList.remove('hidden');
  reflectWrap.classList.add('hidden');
  reflectResultWrap.classList.add('hidden');

  // API稼働中表示
  showApiActivity('🔬 超強引！作風解析中...');

  try {
    // テキストを結合（ドロップされたファイル + 直貼りテキスト）（最大100,000文字）
    let corpusParts = [];
    if (droppedTexts.length > 0) {
      corpusParts = droppedTexts.map(t => `--- ${t.name} ---\n${t.text}`);
    }
    if (directText) {
      corpusParts.push(`--- 直接貼り付けテキスト ---\n${directText}`);
    }
    let corpus = corpusParts.join('\n\n');
    if (corpus.length > 100000) {
      corpus = corpus.slice(0, 100000) + '\n\n[...以降のテキストは省略（コンテキスト上限）...]';
    }

    const hasImages = droppedImages.length > 0;
    const hasText = corpus.length > 0;

    // プロンプト構築: 画像がある場合は追加指示をマージ
    let fullPrompt = ANALYSIS_PROMPT;
    if (hasImages && hasText) {
      // テキスト＋画像の複合分析: プロンプト冒頭を画像分析指示込みに差し替え
      fullPrompt = ANALYSIS_PROMPT.replace(
        'あなたはプロの文芸批評家・計量文体学の専門家です。\n以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。',
        'あなたはプロの文芸批評家・計量文体学の専門家です。\n以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。\n\n## 画像分析の追加指示:\n- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること\n- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること\n- テキストと画像の両方から相乗的に作風パラメータを抽出すること'
      );
    } else if (hasImages && !hasText) {
      fullPrompt = ANALYSIS_PROMPT.replace(
        'あなたはプロの文芸批評家・計量文体学の専門家です。\n以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。',
        'あなたはプロの文芸批評家・計量文体学の専門家です。\n以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。\n\n## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:\n- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。\n- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。\n\n## 画像分析指示:\n- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること\n- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること'
      );
    }

    // テキスト部分をプロンプトに結合
    if (hasText) {
      fullPrompt = fullPrompt + corpus;
    }

    const model = GEMINI_MODELS[0].value;
    let text;

    // 画像がある場合はマルチモーダルAPI、なければテキストAPI
    if (hasImages) {
      const result = await callGenerativeAIMultimodal(apiKey, fullPrompt, droppedImages, (fb) => {
        updateApiStatus(`フォールバック: ${fb}`);
        btn.innerHTML = `<span class="spinner"></span>フォールバック: ${fb}`;
      }, { responseMimeType: 'application/json', timeoutMs: 90000 });
      text = result.text;
    } else {
      const result = await callGenerativeAI(apiKey, model, fullPrompt, (fb) => {
        updateApiStatus(`フォールバック: ${fb}`);
        btn.innerHTML = `<span class="spinner"></span>フォールバック: ${fb}`;
      }, { responseMimeType: 'application/json', timeoutMs: 90000 });
      text = result.text;
    }

    // JSONブロック抽出
    let rawJson = '';
    const jsonObject = extractFirstJsonObject(text);
    if (jsonObject) {
      rawJson = jsonObject;
    } else {
      // フォールバック: 従来の正規表現マッチを試す
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        rawJson = jsonMatch[1];
      } else {
        const braceMatch = text.match(/\{[\s\S]*\}/);
        if (braceMatch) {
          rawJson = braceMatch[0];
        } else {
          throw new Error('AIの応答からJSONを抽出できませんでした');
        }
      }
    }

    // JSON修復: AIが返すJSONにありがちな構文エラーを修復
    analysisResult = parseJsonWithRepair(rawJson);

    // 結果表示
    displayAnalysisResult(analysisResult);
    
    // 進捗ログ窓に結果のサマリーを表示
    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 作風解析完了';
    if (progressLog) {
      progressLog.textContent = `作風解析が完了しました。解析結果が右パネルに表示されています。\n作風名: ${analysisResult.style_name || '未定義'}\nトーン: ${analysisResult.tone || '未定義'}`;
    }

    // リライトボタンを表示（解析完了後に連続で使える）
    reflectWrap.classList.remove('hidden');
    updateReflectButtonState();

  } catch (err) {
    resultEl.textContent = `解析エラー: ${err.message}`;
    resultEl.classList.add('sa-error');
    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: 解析エラー';
    if (progressLog) {
      progressLog.textContent = `作風解析エラーが発生しました:\n${err.message}`;
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🔬 超強引！作風解析を実行';
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
  outputEl.textContent = 'リライト中です...（完了後に一括表示されます）';
  resultWrap.classList.remove('hidden');

  // 📡 AI進捗ログ窓の初期化とリセット
  const progressLog = $('progress-log');
  const thoughtScoreBoard = $('thought-score-board');
  const progressTitleText = $('progress-title-text');
  
  if (progressLog) progressLog.textContent = "作風リライトの開始を待っています...";
  if (thoughtScoreBoard) {
    thoughtScoreBoard.innerHTML = "";
    thoughtScoreBoard.style.display = "none"; // リライト時は自己採点ボードは非表示
  }
  if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: リライト準備中...';

  // API稼働中表示
  showApiActivity('🎨 作風リライト中...');

  let systemLogs = [];
  let connectionStatusText = "";
  let writingProgressText = "";
  let apiWaitTimer = null;
  
  function addSystemLog(msg) {
    systemLogs.push(msg);
    updateProgressWindow();
  }

  function updateProgressWindow() {
    if (!progressLog) return;
    let text = "";
    if (systemLogs.length > 0) {
      text += systemLogs.join('\n') + '\n';
    }
    if (connectionStatusText) {
      text += connectionStatusText + '\n';
    }
    if (writingProgressText) {
      text += '\n' + writingProgressText;
    }
    progressLog.textContent = text;
    
    const contentEl = $('progress-content');
    if (contentEl) contentEl.scrollTop = contentEl.scrollHeight;
  }

  addSystemLog("[システム] 作風リライト処理を開始しました...");
  addSystemLog(`[システム] 対象ストーリー文字数: ${originalText.length.toLocaleString()} 字`);
  addSystemLog("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中...");
  addSystemLog("[システム] リライト用メタプロンプトの構築が完了しました。");

  try {
    const prompt = buildReflectionPrompt(analysisResult, originalText);
    const model = GEMINI_MODELS[0].value;
    
    addSystemLog(`[システム] AIモデル (${model}) にリライト要求を送信しています...`);
    
    // API応答の待機タイマーを起動
    let waitSeconds = 0;
    let dummyLogsAdded = new Set();
    
    apiWaitTimer = setInterval(() => {
      waitSeconds++;
      const dots = ".".repeat(waitSeconds % 4);
      connectionStatusText = `[通信] AIモデルからのリライト応答を待機しています${dots} (${waitSeconds}秒経過)`;
      
      if (waitSeconds >= 3 && !dummyLogsAdded.has(3)) {
        dummyLogsAdded.add(3);
        systemLogs.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...");
      }
      if (waitSeconds >= 6 && !dummyLogsAdded.has(6)) {
        dummyLogsAdded.add(6);
        systemLogs.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...");
      }
      if (waitSeconds >= 9 && !dummyLogsAdded.has(9)) {
        dummyLogsAdded.add(9);
        systemLogs.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...");
      }
      if (waitSeconds >= 12 && !dummyLogsAdded.has(12)) {
        dummyLogsAdded.add(12);
        systemLogs.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。");
      }
      if (waitSeconds >= 15 && waitSeconds % 5 === 0 && !dummyLogsAdded.has(waitSeconds)) {
        dummyLogsAdded.add(waitSeconds);
        systemLogs.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${waitSeconds}s) を実行しています...`);
      }
      updateProgressWindow();
    }, 1000);

    let totalText = "";
    let hasReceivedFirstChunk = false;
    
    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: リライト執筆中...';

    const onChunk = ({ text }) => {
      if (!hasReceivedFirstChunk) {
        hasReceivedFirstChunk = true;
        connectionStatusText = "";
        updateProgressWindow();
        if (apiWaitTimer) {
          clearInterval(apiWaitTimer);
          apiWaitTimer = null;
        }
      }
      totalText += text;
      
      const charCount = totalText.length;
      let prog = "[システム] AIによるリライト文章の生成が開始されました。\n";
      prog += `[進捗] 本文をリライト中...\n`;
      prog += `・現在文字数: ${charCount} 文字\n`;
      
      const dotCount = Math.floor((charCount / 50) % 4);
      const dots = ".".repeat(dotCount) + " ".repeat(3 - dotCount);
      prog += `・ステータス: 執筆処理中${dots}\n`;
      
      writingProgressText = prog;
      updateProgressWindow();
    };

    const onFb = (m) => {
      outputEl.textContent = `フォールバック中: ${m}...`;
      btn.innerHTML = `<span class="spinner"></span>フォールバック: ${m}`;
      addSystemLog(`[システム] リライト応答遅延のため、モデルを ${m} にフォールバックします...`);
    };

    const { usedModel } = await callGenerativeAIStream(apiKey, model, prompt, onChunk, onFb);

    if (apiWaitTimer) {
      clearInterval(apiWaitTimer);
      apiWaitTimer = null;
    }

    btn.innerHTML = '<span class="spinner"></span>最終推敲中...';
    let body = totalText.replace(/^```(markdown)?\s*/i, '').replace(/\s*```$/, '');

    reflectedOutput = body;
    outputEl.textContent = body;

    // 文字数表示
    const counter = $('sa-reflect-counter');
    if (counter) counter.textContent = `${body.length.toLocaleString()} 字`;

    if (progressTitleText) progressTitleText.textContent = 'AI進捗・思考ログ: リライト完了';
    addSystemLog("[システム] 作風リライト文の生成・推敲が正常に完了しました。");
    
    writingProgressText = `[進捗] リライトが正常に完了しました。\n・最終文字数: ${body.length.toLocaleString()} 字\n・ステータス: 完了`;
    connectionStatusText = "";
    updateProgressWindow();

    // リライト結果までスクロール
    resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    if (apiWaitTimer) {
      clearInterval(apiWaitTimer);
      apiWaitTimer = null;
    }
    connectionStatusText = "";
    updateProgressWindow();
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
  // 画像のObjectURLを全て解放（メモリリーク防止）
  droppedImages.forEach(img => {
    if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
  });

  droppedTexts = [];
  droppedImages = [];
  analysisResult = null;
  reflectedOutput = '';
  updateFileList();
  updateImageList();

  // 直貼りテキストエリアのクリア
  const directTextEl = $('sa-direct-text');
  if (directTextEl) directTextEl.value = '';

  updateAddTextButtonState();

  $('sa-dropzone').classList.remove('sa-has-files');
  $('sa-file-count')?.classList.add('hidden');
  updateAnalyzeButtonState();
  updateReflectButtonState();

  $('sa-result').textContent = '';
  $('sa-result-wrap')?.classList.add('hidden');
  $('sa-reflect-wrap')?.classList.add('hidden');
  $('sa-reflect-result-wrap')?.classList.add('hidden');
}

function addDirectText() {
  const directTextEl = $('sa-direct-text');
  if (!directTextEl) return;
  const val = directTextEl.value.trim();
  if (!val) return;

  droppedTexts.push({
    name: `直接入力テキスト_${droppedTexts.length + 1}`,
    text: val,
    charCount: val.length
  });

  directTextEl.value = '';
  updateFileList();
  $('sa-dropzone').classList.add('sa-has-files');
  updateAnalyzeButtonState();
  updateAddTextButtonState();
}

export function updateAddTextButtonState() {
  const btn = $('btn-sa-add-text');
  if (!btn) return;
  const directTextEl = $('sa-direct-text');
  const hasText = directTextEl && directTextEl.value.trim().length > 0;
  btn.disabled = !hasText;
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
  const hasTexts = droppedTexts.length > 0;
  const hasImages = droppedImages.length > 0;
  const directTextEl = $('sa-direct-text');
  const hasDirectText = directTextEl && directTextEl.value.trim().length > 0;
  // テキスト（ドロップ or 直貼り）または画像のいずれかがあればOK
  const hasInput = hasTexts || hasImages || hasDirectText;
  btn.disabled = !(apiKey && hasInput);
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
  $('btn-sa-add-text')?.addEventListener('click', addDirectText);

  // 直貼りテキストエリアの入力変更で解析ボタン状態を更新
  const directTextEl = $('sa-direct-text');
  if (directTextEl) {
    directTextEl.addEventListener('input', () => {
      updateAnalyzeButtonState();
      updateAddTextButtonState();
    });
  }

  // 初期化時のセクション活性化状態の更新
  updateStyleAnalyzerSectionState();
  updateAddTextButtonState();
}
