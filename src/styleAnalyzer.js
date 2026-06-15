// ============================================================
// styleAnalyzer.js — 超強引！作風解析エンジン (β版)
// テキストをドロップ→AIで作風パラメータ抽出→JSON/コピー→リライト
// ============================================================
import { callGenerativeAI, callGenerativeAIMultimodal, callGenerativeAIStream } from './api.js';
import { GEMINI_MODELS } from './data.js';
import { buildStoryExportFileName } from './fileIoHelpers.js';

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
- 【最重要】値の文字列内で二重引用符を使用する場合は、生の半角ダブルクォーテーション（"）を出力することを完全に禁止します。もし引用やコードブロックなどで二重引用符を出力する必要がある場合は、必ず全角の二重引用符（””）か二重山括弧（『』）に置換して出力してください。生の半角ダブルクォーテーション（"）は、JSONのキー名と値の囲み記号としてのみしか使用してはなりません。値の文字列の中に生の半角ダブルクォーテーション（"）が混入するとJSONの構文エラーになるため、このルールは絶対に遵守してください。
- **画像のみの入力、あるいは情報が少ない入力に対する指示**:
  - 入力されたテキストが短い単語・一文のみである場合、または画像（イラスト）のみの入力である場合は、その言葉や絵の空気感から想起される背景、世界観、感情、言外のニュアンス、またはポップカルチャーや文化的背景を最大限に想像・補完してください。
  - 特に画像のみの解析時におけるテキスト固有の項目（文体、語彙、セリフ、修辞、テンポ等）については、「もしこのイラストを描いた作者が文章を執筆するならば、どのような文体、語彙、テンポ、語り口にするか」を想像力をフルに働かせて具体的に推測・補完してください。
  - 情報不足を理由にした「判定不可」「画像のみのため解析不能」「不明」といった出力や簡素すぎる記述は絶対に禁止します。エンターテインメントとしての面白さを重視し、すべての項目を具体的かつクリエイティブな想像力で詳細に埋めてください。

## 分析対象テキスト:
`;

// ============================================================
// 作風反映プロンプト（生成後リライト方式）
// ============================================================

/**
 * 作風JSONからリライト用の人間可読テキストを生成する。
 * reproduction_promptは「AI向け再現指示」であり、リライトプロンプトに含めると
 * モデルが二重指示に引きずられて暴走するため、意図的に除外する。
 */
function _formatStyleForRewrite(styleJson) {
  const lines = [];
  const add = (label, val) => { if (val) lines.push(`【${label}】${val}`); };
  const sub = (label, val) => { if (val) lines.push(`  ・${label}: ${val}`); };

  add('作風名', styleJson.style_name);
  add('トーン', styleJson.tone);

  // 語りの視点
  if (typeof styleJson.narrative_voice === 'object' && styleJson.narrative_voice) {
    lines.push('【語りの視点】');
    sub('人称', styleJson.narrative_voice.person);
    sub('距離感', styleJson.narrative_voice.distance);
    sub('信頼度', styleJson.narrative_voice.reliability);
    sub('介入度', styleJson.narrative_voice.intrusion);
  } else {
    add('語りの視点', styleJson.narrative_voice);
  }

  // 文体
  if (styleJson.sentence_style) {
    lines.push('【文体】');
    sub('平均文長', styleJson.sentence_style.avg_length || styleJson.sentence_style.length);
    sub('文長変動', styleJson.sentence_style.length_variation);
    sub('文末パターン', styleJson.sentence_style.ending_patterns || styleJson.sentence_style.ending);
    sub('リズム', styleJson.sentence_style.rhythm);
    sub('段落長', styleJson.sentence_style.paragraph_length);
    sub('段落構成', styleJson.sentence_style.paragraph_structure);
  }

  // 語彙
  if (styleJson.vocabulary) {
    lines.push('【語彙】');
    sub('レベル', styleJson.vocabulary.level);
    sub('情報密度', styleJson.vocabulary.density);
    sub('レジスター', styleJson.vocabulary.register);
    sub('特徴', styleJson.vocabulary.quirks);
    sub('外来語', styleJson.vocabulary.foreign_words);
    sub('古語/現代語', styleJson.vocabulary.archaic_modern);
  }

  // 修辞技法
  if (styleJson.rhetoric) {
    lines.push('【修辞技法】');
    sub('比喩スタイル', styleJson.rhetoric.metaphor_style);
    sub('比喩素材', styleJson.rhetoric.metaphor_source);
    sub('反復技法', styleJson.rhetoric.repetition);
    sub('アイロニー', styleJson.rhetoric.irony_level);
    sub('ユーモア', styleJson.rhetoric.humor_type);
    sub('その他', styleJson.rhetoric.other_techniques);
  }

  // 描写フォーカス
  if (styleJson.description_focus) {
    lines.push('【描写フォーカス】');
    sub('視覚', styleJson.description_focus.visual);
    sub('聴覚', styleJson.description_focus.auditory);
    sub('触覚', styleJson.description_focus.tactile);
    sub('嗅覚/味覚', styleJson.description_focus.olfactory_gustatory);
    sub('運動感覚', styleJson.description_focus.kinesthetic);
    sub('空間把握', styleJson.description_focus.spatial);
    sub('心理描写', styleJson.description_focus.psychological_depth || styleJson.description_focus.psychological);
    sub('Show:Tell', styleJson.description_focus.show_tell_ratio);
  }

  // セリフ
  if (styleJson.dialogue) {
    lines.push('【セリフ】');
    sub('文体', styleJson.dialogue.style);
    sub('機能', styleJson.dialogue.function);
    sub('タグ', styleJson.dialogue.tag_style);
    sub('方言', styleJson.dialogue.dialect_sociolect);
    sub('サブテキスト', styleJson.dialogue.subtext);
  }

  // 構造
  if (styleJson.structure) {
    lines.push('【構造】');
    sub('テンポ', styleJson.structure.pacing);
    sub('場面転換', styleJson.structure.scene_transition);
    sub('時制', styleJson.structure.time_handling);
    sub('緊張曲線', styleJson.structure.tension_curve);
    sub('冒頭パターン', styleJson.structure.opening_style);
    sub('結末パターン', styleJson.structure.closing_style);
  }

  // 感情設計
  if (styleJson.emotional_architecture) {
    lines.push('【感情設計】');
    sub('主要感情', styleJson.emotional_architecture.dominant_emotions);
    sub('振り幅', styleJson.emotional_architecture.emotional_range);
    sub('カタルシス', styleJson.emotional_architecture.catharsis_method);
    sub('読者距離', styleJson.emotional_architecture.reader_distance);
  }

  add('テーマ傾向', styleJson.themes_tendency);
  add('文学的影響', styleJson.literary_influences);

  // 固有の特徴（箇条書き変換）
  if (styleJson.unique_features?.length) {
    lines.push('【固有の特徴】');
    styleJson.unique_features.forEach(f => lines.push(`  ・${f}`));
  }

  // 回避パターン（箇条書き変換）
  if (styleJson.anti_patterns?.length) {
    lines.push('【回避パターン（この作風では避けるべき表現）】');
    styleJson.anti_patterns.forEach(f => lines.push(`  ・${f}`));
  }

  // reproduction_promptは意図的に除外（二重プロンプト暴走防止）

  return lines.join('\n');
}

function buildReflectionPrompt(styleJson, originalText) {
  // 作風パラメータを人間可読な形式に整形（JSON丸投げ防止）
  const formattedStyle = _formatStyleForRewrite(styleJson);

  // 元テキストの文字数を事前計算（目安指示に使用）
  const originalLength = originalText.length;
  const minLength = Math.floor(originalLength * 0.8);
  const maxLength = Math.ceil(originalLength * 1.2);

  return `あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

## 最重要ルール（絶対遵守・違反厳禁）:
1. **物語の完全保持**: プロット（起承転結）、登場人物、セリフの内容、設定、事件の順序は一切変更しない。リライトとは「同じ物語を別の文体で語り直す」ことであり、物語の骨格を壊すことではない。
2. **文章として成立させる**: リライト結果は必ず「小説・物語」として完全に成立する連続した散文であること。単語の羅列、名詞だけの断片、箇条書き、詩のような体言止めの連続は絶対に禁止する。
3. **文字数の厳守**: 元のテキストは${originalLength.toLocaleString()}字です。リライト結果は${minLength.toLocaleString()}字〜${maxLength.toLocaleString()}字の範囲に収めること。この範囲を逸脱した場合は失敗とみなす。
4. **タイトル保持**: タイトルがあればそのまま維持する。
5. **出力制限**: リライト結果の本文のみを出力する。メタ解説、注釈、「以下はリライト結果です」等の前置きは一切付けない。
6. **物語の体裁の維持と自然な融合（ぶつ切りの解説挿入の禁止）**: 作風パラメータに「読者への問いかけ」「解説の挿入」「ツッコミ」等の指示がある場合、それらを小説のストーリーの中に唐突な「現実のPCやIT製品のブログ解説記事（例:『PCを処分する際、データをそのまま放置していませんか？』等）」としてそのままぶつ切りで挿入し、小説としての体裁を崩してはならない。作風（語り口、比喩のスタイル、ツッコミのトーン）は、必ず**小説内の事象（例: 電脳戦国世界での出来事や、登場人物の行動・運命）に引き寄せて、物語の一部として自然に溶け込ませて適用すること**。例えば、現実の製品名（EaseUS BitWiper等）やIT用語を比喩（例:「まるでSSDのウェアレベリングのように...」）や電脳世界の用語としてストーリー内に取り入れることは歓迎されるが、物語の文脈を無視して無関係な現実世界のブログ記事の地の文をそのまま挿入することは厳禁である。

## 作風パラメータの適用方針:
- 以下の作風パラメータは「方向性の指針」として参考にすること。極端な値があっても、それを100%忠実に再現しようとして物語を破壊してはならない。
- 例えば「体言止め40%」と記載されていても、全文を体言止めの名詞だけにしてはならない。あくまで「体言止めを多めに取り入れる」程度に留め、文章の流れと可読性を最優先する。
- 「Show:Tell比率 10:0」と記載されていても、最低限の説明文（Tell）は物語の理解に必要なため、完全排除はしない。
- 作風パラメータの各項目は「この方向性に寄せる」というガイドラインであり、物語の可読性・完成度を犠牲にしてまで厳密に従う必要はない。

## 作風パラメータ:
${formattedStyle}

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
  const endIdx = text.lastIndexOf('}');
  if (endIdx === -1 || endIdx < startIdx) return null;
  return text.slice(startIdx, endIdx + 1);
}

// 文字列値内の制御文字（生改行、生タブ）を安全にエスケープする
function escapeControlCharsInStrings(jsonStr) {
  let result = '';
  let inString = false;
  
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    
    if (inString) {
      if (char === '\\') {
        result += char;
        if (i + 1 < jsonStr.length) {
          result += jsonStr[i + 1];
          i++;
        }
      } else if (char === '"') {
        inString = false;
        result += char;
      } else if (char === '\n') {
        result += '\\n';
      } else if (char === '\r') {
        result += '\\n';
        if (i + 1 < jsonStr.length && jsonStr[i + 1] === '\n') {
          i++;
        }
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    } else {
      if (char === '"') {
        inString = true;
        result += char;
      } else {
        result += char;
      }
    }
  }
  return result;
}

// 既知のすべてのキー名の一覧（ネストされたキーも含む）
const ALL_KEYS = [
  "style_name", "tone", "narrative_voice", "person", "distance", "reliability", "intrusion",
  "sentence_style", "avg_length", "length_variation", "ending_patterns", "rhythm", "paragraph_length", "paragraph_structure",
  "vocabulary", "level", "density", "register", "quirks", "foreign_words", "archaic_modern",
  "rhetoric", "metaphor_style", "metaphor_source", "repetition", "irony_level", "humor_type", "other_techniques",
  "description_focus", "visual", "auditory", "tactile", "olfactory_gustatory", "kinesthetic", "spatial", "psychological_depth", "show_tell_ratio",
  "dialogue", "style", "function", "tag_style", "dialect_sociolect", "subtext",
  "structure", "pacing", "scene_transition", "time_handling", "tension_curve", "opening_style", "closing_style",
  "emotional_architecture", "dominant_emotions", "emotional_range", "catharsis_method", "reader_distance",
  "themes_tendency", "literary_influences", "unique_features", "anti_patterns", "reproduction_prompt"
];

// キー境界ベースでJSONをスライス＆再構築する最終兵器パーサー
function robustParseJson(raw) {
  let fixed = raw.trim();

  // コメントの除去
  fixed = fixed.replace(/\/\/[^\n]*/g, '');
  fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

  const keyMatches = [];
  ALL_KEYS.forEach(key => {
    const regex = new RegExp(`"${key}"\\s*:`, 'g');
    let match;
    while ((match = regex.exec(fixed)) !== null) {
      keyMatches.push({
        key: key,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });

  keyMatches.sort((a, b) => a.start - b.start);

  if (keyMatches.length === 0) {
    return JSON.parse(fixed);
  }

  const parsedObj = {};

  for (let i = 0; i < keyMatches.length; i++) {
    const currentKeyInfo = keyMatches[i];
    const nextKeyInfo = keyMatches[i + 1];
    
    const valStart = currentKeyInfo.end;
    let valEnd = nextKeyInfo ? nextKeyInfo.start : fixed.length;
    
    let valText = fixed.slice(valStart, valEnd).trim();
    
    // もしこれが最後のキーである場合、JSON全体の閉じ括弧 '}' を取り除く
    if (!nextKeyInfo) {
      const lastBraceIdx = valText.lastIndexOf('}');
      if (lastBraceIdx !== -1) {
        valText = valText.slice(0, lastBraceIdx).trim();
      }
    }

    // 前後の不要なカンマや改行、空白をクリーンアップ
    valText = valText.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g, '');
    
    if (valText.startsWith('[') && valText.endsWith(']')) {
      let inner = valText.slice(1, -1).trim();
      const parsedElements = [];
      
      const matches = inner.split(/",\s*"/);
      matches.forEach((el, idx) => {
        let cleanEl = el.trim();
        if (idx === 0 && cleanEl.startsWith('"')) cleanEl = cleanEl.slice(1);
        if (idx === matches.length - 1 && cleanEl.endsWith('"')) cleanEl = cleanEl.slice(0, -1);
        
        cleanEl = cleanEl.replace(/"/g, '\\"');
        cleanEl = cleanEl.replace(/\r?\n/g, '\\n').replace(/\t/g, '\\t');
        parsedElements.push(cleanEl);
      });
      
      parsedObj[currentKeyInfo.key] = parsedElements;
    } 
    else {
      let isString = false;
      if (valText.startsWith('"')) {
        valText = valText.slice(1);
        isString = true;
      }
      if (valText.endsWith('"')) {
        valText = valText.slice(0, -1);
      }
      
      if (isString) {
        valText = valText.replace(/"/g, '\\"');
        valText = valText.replace(/\r?\n/g, '\\n').replace(/\t/g, '\\t');
      }
      
      parsedObj[currentKeyInfo.key] = valText;
    }
  }

  const finalJson = {
    style_name: parsedObj.style_name || "",
    tone: parsedObj.tone || "",
    narrative_voice: {
      person: parsedObj.person || "",
      distance: parsedObj.distance || "",
      reliability: parsedObj.reliability || "",
      intrusion: parsedObj.intrusion || ""
    },
    sentence_style: {
      avg_length: parsedObj.avg_length || "",
      length_variation: parsedObj.length_variation || "",
      ending_patterns: parsedObj.ending_patterns || "",
      rhythm: parsedObj.rhythm || "",
      paragraph_length: parsedObj.paragraph_length || "",
      paragraph_structure: parsedObj.paragraph_structure || ""
    },
    vocabulary: {
      level: parsedObj.level || "",
      density: parsedObj.density || "",
      register: parsedObj.register || "",
      quirks: parsedObj.quirks || "",
      foreign_words: parsedObj.foreign_words || "",
      archaic_modern: parsedObj.archaic_modern || ""
    },
    rhetoric: {
      metaphor_style: parsedObj.metaphor_style || "",
      metaphor_source: parsedObj.metaphor_source || "",
      repetition: parsedObj.repetition || "",
      irony_level: parsedObj.irony_level || "",
      humor_type: parsedObj.humor_type || "",
      other_techniques: parsedObj.other_techniques || ""
    },
    description_focus: {
      visual: parsedObj.visual || "",
      auditory: parsedObj.auditory || "",
      tactile: parsedObj.tactile || "",
      olfactory_gustatory: parsedObj.olfactory_gustatory || "",
      kinesthetic: parsedObj.kinesthetic || "",
      spatial: parsedObj.spatial || "",
      psychological_depth: parsedObj.psychological_depth || "",
      show_tell_ratio: parsedObj.show_tell_ratio || ""
    },
    dialogue: {
      style: parsedObj.style || "",
      function: parsedObj.function || "",
      tag_style: parsedObj.tag_style || "",
      dialect_sociolect: parsedObj.dialect_sociolect || "",
      subtext: parsedObj.subtext || ""
    },
    structure: {
      pacing: parsedObj.pacing || "",
      scene_transition: parsedObj.scene_transition || "",
      time_handling: parsedObj.time_handling || "",
      tension_curve: parsedObj.tension_curve || "",
      opening_style: parsedObj.opening_style || "",
      closing_style: parsedObj.closing_style || ""
    },
    emotional_architecture: {
      dominant_emotions: parsedObj.dominant_emotions || "",
      emotional_range: parsedObj.emotional_range || "",
      catharsis_method: parsedObj.catharsis_method || "",
      reader_distance: parsedObj.reader_distance || ""
    },
    themes_tendency: parsedObj.themes_tendency || "",
    literary_influences: parsedObj.literary_influences || "",
    unique_features: Array.isArray(parsedObj.unique_features) ? parsedObj.unique_features : [],
    anti_patterns: Array.isArray(parsedObj.anti_patterns) ? parsedObj.anti_patterns : [],
    reproduction_prompt: parsedObj.reproduction_prompt || ""
  };

  return finalJson;
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

  // 1. 文字列値内の制御文字（生改行・生タブ）のエスケープ
  fixed = escapeControlCharsInStrings(fixed);

  // 2. JSONコメント除去: // ... や /* ... */
  fixed = fixed.replace(/\/\/[^\n]*/g, '');
  fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. シングルクォートをダブルクォートに変換（キー名のみ、値内のアポストロフィは除外）
  fixed = fixed.replace(/(\{|,)\s*'([^']+)'\s*:/g, '$1"$2":');

  // 4. 末尾カンマ除去: },] や },} の前のカンマ
  fixed = fixed.replace(/,\s*([\]}])/g, '$1');

  // 修復後に再パース
  try {
    return JSON.parse(fixed);
  } catch (secondErr) {
    console.warn('JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:', secondErr.message);
    try {
      // 最終兵器: キー境界ベースのパース＆再構築
      return robustParseJson(fixed);
    } catch (thirdErr) {
      console.warn('キー境界パースも失敗、最後の攻撃的修復を試行:', thirdErr.message);
      try {
        let aggressive = fixed.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
        return JSON.parse(aggressive);
      } catch (fourthErr) {
        throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${fourthErr.message}`);
      }
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
      }, { responseMimeType: 'application/json', timeoutMs: 90000, temperature: 0.1 });
      text = result.text;
    } else {
      const result = await callGenerativeAI(apiKey, model, fullPrompt, (fb) => {
        updateApiStatus(`フォールバック: ${fb}`);
        btn.innerHTML = `<span class="spinner"></span>フォールバック: ${fb}`;
      }, { responseMimeType: 'application/json', timeoutMs: 90000, temperature: 0.1 });
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

    let { usedModel } = await callGenerativeAIStream(apiKey, model, prompt, onChunk, onFb, { disableGoogleSearch: true });

    let loopCount = 0;
    while (loopCount < 3) {
      if (totalText.trim().endsWith('【完】')) break;
      
      loopCount++;
      addSystemLog(`[システム] 文字数上限到達による切断を検知。続きを自動リクエスト中... (${loopCount}/3)`);
      connectionStatusText = `[通信] 続きを生成しています... (${loopCount}/3)`;
      updateProgressWindow();
      
      const continuePrompt = `${prompt}\n\n【ここまでの出力】\n${totalText}\n\n※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;
      
      const nextResult = await callGenerativeAIStream(apiKey, usedModel, continuePrompt, onChunk, onFb, { disableGoogleSearch: true });
      usedModel = nextResult.usedModel;
    }

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

function saveAnalysisJson() {
  if (!analysisResult) return;
  const json = JSON.stringify(analysisResult, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = buildStoryExportFileName(analysisResult.style_name || 'StyleAnalysis', 'json');
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
  a.download = buildStoryExportFileName('StyleRewrite', 'txt');
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
  const directText = directTextEl ? directTextEl.value : '';
  const hasDirectText = directText.trim().length > 0;
  
  // テキスト（ドロップ or 直貼り）または画像のいずれかがあればOK
  const hasInput = hasTexts || hasImages || hasDirectText;

  // OpenAPI向けの容量チェック
  let totalLen = directText.length;
  droppedTexts.forEach(t => totalLen += (t.content ? t.content.length : 0));
  const engineEl = document.getElementById('api-engine');
  const isOpenAI = engineEl && engineEl.value === 'openai';

  if (isOpenAI && totalLen > 80000) {
    btn.disabled = true;
    btn.textContent = '⚠ 文字数超過 (OpenAI制限)';
    btn.title = 'OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。';
    return;
  }

  btn.disabled = !(apiKey && hasInput);
  btn.textContent = '🔬 超強引！作風解析を実行';
  btn.title = '';
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
