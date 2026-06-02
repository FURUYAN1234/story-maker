import fs from 'fs';

const lostCode = `
// ============================================================
// 📖 長編小説モード: コアエンジン
// ============================================================

// コピペ上限文字数（ブラウザのクリップボード制限目安）
const COPY_CHAR_LIMIT = 500000;
const LONG_NOVEL_DEFAULT_CHAPTER_CHARS = 8000;
const LONG_NOVEL_MIN_CHAPTER_CHARS = 4500;
const LONG_NOVEL_MAX_CHAPTER_CHARS = 9000;
const LONG_NOVEL_MAX_STREAM_TOKENS = 32768;

function normalizeFullWidthDigits(value) {
  return String(value || '')
    .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[，,]/g, '');
}

function parseKanjiNumber(text) {
  if (!text) return 0;
  const map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (text === '十') return 10;
  const m = text.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);
  if (m) return (m[1] ? map[m[1]] : 1) * 10 + (m[2] ? map[m[2]] : 0);
  return map[text] || 0;
}

function parseLongNovelTargetChars(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.round(value));
  const text = normalizeFullWidthDigits(value);
  if (!text) return 0;
  const manMatch = text.match(/(\\d+(?:\\.\\d+)?)\\s*万/);
  if (manMatch) return Math.round(parseFloat(manMatch[1]) * 10000);
  const digitMatch = text.match(/(\\d{4,})/);
  return digitMatch ? parseInt(digitMatch[1], 10) : 0;
}

function getLongNovelTargetChars(settings, headerInfo, totalChapters) {
  return parseLongNovelTargetChars(settings?.charCount)
    || parseLongNovelTargetChars(headerInfo?.targetChars)
    || Math.max(1, totalChapters || 10) * LONG_NOVEL_DEFAULT_CHAPTER_CHARS;
}

function getLongNovelMinChapterChars(settings, headerInfo, totalChapters) {
  const chapters = Math.max(1, totalChapters || headerInfo?.totalChapters || 10);
  const targetChars = getLongNovelTargetChars(settings, headerInfo, chapters);
  const perChapter = targetChars / chapters;
  const minChars = Math.round(perChapter * 0.6);
  return Math.max(
    LONG_NOVEL_MIN_CHAPTER_CHARS,
    Math.min(LONG_NOVEL_MAX_CHAPTER_CHARS, minChars)
  );
}

function getLongNovelStreamOptions(signal) {
  return {
    signal,
    disableGoogleSearch: true,
    timeoutMs: 300000,
    maxTokens: LONG_NOVEL_MAX_STREAM_TOKENS,
    maxOutputTokens: LONG_NOVEL_MAX_STREAM_TOKENS,
  };
}

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
  const titleM = text.match(/タイトル[:：]\\s*(.+)/);
  if (titleM) info.title = titleM[1].trim();
  // ログライン
  const logM = text.match(/ログライン[:：]\\s*(.+)/);
  if (logM) info.logline = logM[1].trim();
  // 全構成（全角数字や漢数字の揺れに対応）
  const chapM = text.match(/全構成[:：]\\s*全([\\d０-９]+)章/);
  if (chapM) {
    const numStr = chapM[1].replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
    info.totalChapters = parseInt(numStr, 10);
  } else {
    const chapM2 = text.match(/全構成[:：]\\s*全([一二三四五六七八九十]+)章/);
    if (chapM2) {
      const kanjiNum = parseKanjiNumber(chapM2[1]);
      if (kanjiNum) info.totalChapters = kanjiNum;
    }
  }
  // 予定総文字数
  const charM = text.match(/予定総文字数[:：]\\s*(.+)/);
  if (charM) info.targetChars = charM[1].trim();
  // あらすじ（複数行対応）
  const synM = text.match(/あらすじ[:：]\\s*([\\s\\S]+?)(?=\\n(?:【|#|第\\d|---|\\n))/);
  if (synM) info.synopsis = synM[1].trim();
  // プロット概要（全体を取得）
  const plotM = text.match(/【プロット概要】\\s*([\\s\\S]+?)(?=\\n---|\\n# 第)/);
  if (plotM) info.plotOutline = plotM[1].trim();
  return info;
}

/**
 * 修正後または生成後の小説本文テキストの品質を検査する品質ゲート関数
 * @param {string} text - 検査対象テキスト
 * @returns {Array<string>} 検出された問題のリスト（空なら問題なし）
 */
function validateFixedText(text) {
  const issues = [];
  if (!text) {
    issues.push('テキストが空です');
    return issues;
  }

  // 1. 極端な文字数不足のチェック（長編小説の1章あたり通常1000文字以上を期待）
  if (text.trim().length < 1000) {
    issues.push(\`文字数が少なすぎます（\${text.trim().length}文字 / 閾値: 1000文字）\`);
  }

  // 2. 英語残骸・AIのメタ表現・自己校正の残骸チェック
  const blacklistedRegexes = [
    /修正する/i,
    /修正後のテキスト/i,
    /おっと、見出しに/i,
    /No, there is no other/i,
    /Let's double check/i,
    /\\b(?:Morris|Sexton|office|violent|Und|And|Let's)\\b/i
  ];

  blacklistedRegexes.forEach(regex => {
    if (regex.test(text)) {
      issues.push(\`無効なメタ表現または英語の残骸が検出されました（パターン: \${regex.toString()}）\`);
    }
  });

  return issues;
}

function getLongNovelBodyHardIssues(text, { chapterNum, isLast, minChars }) {
  const issues = [];
  const body = (text || '').trim();
  if (!body) {
    issues.push('本文が空です');
    return issues;
  }

  // ★★★ 修正箇所１ ★★★
  const absoluteMin = Math.max(1500, Math.round(minChars * 0.3));
  if (body.length < absoluteMin) {
    issues.push(\`章本文が短すぎます（第\${chapterNum}章: \${body.length}文字 / 最低許容 \${absoluteMin}文字）\`);
  }

  const managementRegexes = [
    /\`\`\`/,
    /ここからコピー|ここまでコピー/,
    /文脈維持メモ|文脈メモ/,
    /回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計/,
    /再現用マスター指示書|全文結合出力/,
    /全[\\d０-９一二三四五六七八九十]+章の執筆が完了しました/,
  ];
  managementRegexes.forEach(regex => {
    if (regex.test(body)) issues.push(\`本文に管理情報が残っています（\${regex.toString()}）\`);
  });

  const finishMatches = body.match(/【完】/g) || [];
  if (isLast) {
    if (finishMatches.length !== 1) {
      issues.push(\`最終章の完結マーカー数が不正です（\${finishMatches.length}件）\`);
    } else if (!/【完】\\s*$/.test(body)) {
      issues.push('最終章の完結マーカー【完】の後ろに本文以外の文字列が残っています');
    }
  } else if (finishMatches.length > 0) {
    issues.push(\`第\${chapterNum}章は最終章ではないため【完】を含められません\`);
  }

  return issues;
}

function assertLongNovelChapterReady(text, options) {
  const issues = [
    ...validateFixedText(text),
    ...getLongNovelBodyHardIssues(text, options),
  ];
  if (issues.length > 0) {
    throw new Error(\`本文破損エラー（\${issues.join(' / ')}）により棄却しました\`);
  }
}

/**
 * 長編本文に紛れた学術引用風の孤立マーカーを除去する。
 * 4koma用の [EMOTION] などは長編本文には入らないため、数字脚注だけを対象にする。
 */
function sanitizeLongNovelBody(text) {
  if (!text) return '';
  return text
    .replace(/^\`\`\`(?:markdown|text|txt)?\\s*/i, '')
    .replace(/\\s*\`\`\`\\s*$/i, '')
    .replace(/(?:\\n|^)\\s*---\\s*ここからコピー\\s*---[\\s\\S]*$/i, '')
    .replace(/(?:\\n|^)\\s*---\\s*ここまでコピー\\s*---[\\s\\S]*$/i, '')
    // 既存の脚注クリーニング
    .replace(/(^|\\n)\\s*[\\[［]\\s*(?:\\d{1,3}|[ivxlcdm]{1,8})\\s*[\\]］]\\s*/gi, '$1')
    .replace(/(^|[^\\[［])[\\[［]\\s*(?:\\d{1,3}|[ivxlcdm]{1,8})\\s*[\\]］](?=$|[\\s、。！？,.!?」』）\\)])/gi, '$1')
    .replace(/\\[\\d+(?:,\\s*\\d+)*\\]/g, '') // [2, 3, 7] 等のグラウンディングマーカー
    .replace(/[\\(（]\\s*注\\s*\\d{1,3}\\s*[\\)）]/g, '')
    .replace(/(?:\\n|^)\\s*(?:参考文献|出典|脚注|注釈)\\s*[:：][\\s\\S]*$/m, '')
    // 英語残骸・自己修正メタ文の除去
    .replace(/\\b(?:of|Morris|Sexton|office|violent|OK)\\b/gi, '')
    // 【致命的バグ修正】 [,\\s]* (0回以上) だと「Not」が「t」になり、「Android」が「roid」になる破壊的置換が起きるため、[,\\s]+ に修正
    .replace(/\\b(?:No|Let's|Und|And)(?:[,\\s]+|(?=\\n|$))/gi, '')
    // 【致命的バグ修正】 漢字の範囲が「亜-熙」だと「一」「右」「雨」など大部分の常用漢字が漏れるため、「一-龠」に修正
    .replace(/\\bI(?=[ぁ-んァ-ヶ一-龠])/g, '')
    .replace(/(?:修正する|修正後のテキスト|おっと、見出しに|No, there is no other|Let's double check)/gi, '')
    // 和文直後の半角ピリオド・カンマの全角化（出力汚染エラー回避）
    .replace(/([ぁ-んァ-ヶ一-龠])\\.\\s*/g, '$1。')
    .replace(/([ぁ-んァ-ヶ一-龠]),\\s*/g, '$1、')
    // 誤字補正パターン
    .replace(/およびおよび/g, 'および')
    .replace(/人口筋肉/g, '人工筋肉')
    .replace(/電子基盤/g, '電子基板')
    .replace(/確確信/g, '確信')
    .replace(/指先を指先を/g, '指先を')
    .replace(/激激突/g, '激突')
    .replace(/嬉そう/g, '嬉しそう')
    .replace(/ぷかか/g, 'ぷかぷか')
    .replace(/伝わて/g, '伝わって')
    .replace(/響きて/g, '響いて')
    .replace(/包まして/g, '包んで')
    .replace(/佐藤さーーー案/g, '佐藤さん')
    .replace(/鈴木手人/g, '鈴木')
    .replace(/因律/g, '因果律')
    .replace(/名前んだから/g, '名前なんだから')
    .replace(/変貌を遂げてい経ちました/g, '変貌を遂げました')
    .replace(/タコの炭/g, 'タコの墨')
    // 章見出しの重複や本文内に混ざった # 第N章 を正規化（文頭もカバー）
    .replace(/(?:^|\\n)\\s*#+\\s*第\\d+章[^\\n]*/g, '\\n')
    // メモ見出し残骸・管理見出しの除去（文頭もカバー）
    .replace(/(?:^|\\n)\\s*(?:#+\\s*)?(?:文脈維持メモ|文脈メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|全文結合出力|全[\\d０-９一二三四五六七八九十]+章の執筆が完了しました)[\\s\\S]*$/gi, '')
    // 句読点前の半角スペース除去
    .replace(/[ \\t]+(?=[、。！？,.!?」』）\\)])/g, '')
    .replace(/[ \\t]{2,}/g, ' ')
    .replace(/\\n{3,}/g, '\\n\\n')
    .trim();
}

/**
 * 長編小説の章出力が十分に完了したかを判定する（自動継続ループ判定用）
 */
function isChapterFinished(text, isLast, minChars = LONG_NOVEL_MIN_CHAPTER_CHARS) {
  const trimmed = text.trim();
  const { body } = extractContextMemo(trimmed);
  const bodyEnough = body.length >= minChars;
  if (isLast) {
    return /【完】/.test(trimmed) && bodyEnough;
  } else {
    const hasMemo = /回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|GMC\\+S|GMC/.test(trimmed);
    return hasMemo && bodyEnough;
  }
}

/**
 * 章テキストから文脈維持メモを抽出する
 */
function extractContextMemo(text) {
  // ★★★ 修正箇所２ ★★★
  const markerRegex = /(?:[【\\[\\(]?(?:文脈維持メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全[\\d０-９一二三四五六七八九十]+章の執筆が完了しました)[】\\]\\)]?)/i;

  let memoStart = -1;
  const m = text.match(markerRegex);
  if (m) {
    memoStart = m.index;
  } else {
    // 最終章で【完】の後ろに管理情報が混ざるケースを分離する
    const finishMatch = text.match(/【完】/);
    if (finishMatch) {
      memoStart = finishMatch.index + finishMatch[0].length;
    }
  }

  if (memoStart === -1) return { body: sanitizeLongNovelBody(text), memo: '' };

  // メモの前の本文を取得
  let body = text.substring(0, memoStart).trim();

  // 末尾の---や空の#などを除去（AIが出力しがちなフォーマット揺れ対策）
  body = body.replace(/\\n---\\s*$/, '').trim();
  body = body.replace(/\\n(?:---+|#+)\\s*\\n/g, '\\n\\n');
  body = body.replace(/(?:\\n|^)(?:---+|#+)\\s*$/g, '');
  body = body.replace(/\\n{3,}/g, '\\n\\n').trim();
  body = sanitizeLongNovelBody(body);

  const memo = text.substring(memoStart).trim();
  return { body, memo };
}

/**
 * 章テキストから章タイトルを抽出する
 */
function extractChapterTitle(text) {
  const m = text.match(/[#＃]\\s*第([\\d０-９一二三四五六七八九十]+)章[:：]?\\s*(.+)/);
  return m ? m[2].trim() : '';
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
  progressEl.textContent = \`\${ln.currentChapter} / \${ln.totalChapters} 章\`;

  // 文字数（純粋な小説本文のみ）
  const totalChars = ln.cleanText.length;
  charCountEl.textContent = totalChars.toLocaleString();

  // 目安
  const targetChars = getLongNovelTargetChars(ln.settings, ln.headerInfo, ln.totalChapters);
  targetEl.textContent = targetChars ? \`約\${targetChars.toLocaleString()}字\` : '数万字';

  // プログレスバー
  const pct = ln.totalChapters > 0 ? Math.round((ln.currentChapter / ln.totalChapters) * 100) : 0;
  progressBar.style.width = \`\${pct}%\`;

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
      copyBtn.title = \`クリップボードの容量制限（\${Math.floor(COPY_CHAR_LIMIT/10000)}万字）を超えるためコピーできません。TXT保存を使用してください。\`;
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
      content += (content ? '\\n\\n' : '') + sheet;
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
  const ts = \`\${now.getFullYear()}\${String(now.getMonth()+1).padStart(2,'0')}\${String(now.getDate()).padStart(2,'0')}\${String(now.getHours()).padStart(2,'0')}\${String(now.getMinutes()).padStart(2,'0')}\${String(now.getSeconds()).padStart(2,'0')}\`;
  const fileName = \`\${title}_\${suffix}_\${ts}.txt\`;

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
\n\n`;

let content = fs.readFileSync('src/main.js', 'utf8');

// src/main.js の中から、現在の長編小説モードの実装部分を削除し、上記の完全版に差し替える
// 目印１： // ============================================================
//         // 📖 長編小説モード: コアエンジン
const startMarker = '// 📖 長編小説モード: コアエンジン';
let startIdx = content.indexOf(startMarker);
if (startIdx !== -1) {
  // マーカーの直前の '='行まで戻る
  startIdx = content.lastIndexOf('// ============================================================', startIdx);
}

// 目印２： function generateLongNovelFirstChapter
const endMarker = 'async function generateLongNovelFirstChapter';
let endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  // 古いブロックを削除し、新しいブロックに差し替える
  const newContent = content.substring(0, startIdx) + lostCode + content.substring(endIdx);
  fs.writeFileSync('src/main.js', newContent, 'utf8');
  console.log("Restore & Fix Success!");
} else {
  console.log("Error: markers not found. startIdx:", startIdx, "endIdx:", endIdx);
}
