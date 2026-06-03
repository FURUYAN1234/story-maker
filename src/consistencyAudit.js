// ============================================================
// consistencyAudit.js — AI矛盾検査エンジン v1.1 (Optimized)
// 生成テキストの設定矛盾を自動検出し、修正する。
// 面白さ優先：明確な矛盾（設定不整合・時系列エラー）のみ検出。
// 主観的な品質判断（「伏線が弱い」等）は対象外。
// ============================================================
import { callGenerativeAI } from './api.js';
import { GEMINI_MODELS } from './data.js';

// ============================================================
// 矛盾検査プロンプト構築
// ============================================================

/**
 * 短編・中編用の矛盾検査プロンプトを構築する
 * @param {string} storyText - 検査対象の物語テキスト
 * @param {object} settings - gatherSettings() で収集した設定オブジェクト
 * @returns {string} 検査用プロンプト
 */
export function buildAuditPrompt(storyText, settings) {
  // キャラクター情報の構築
  const charContext = _buildCharContext(settings);
  const eraContext = _buildEraContext(settings);

  return `あなたはプロの校閲者・整合性チェッカーです。以下の物語テキストを精査し、**明確な事実矛盾**のみを検出してください。

## 最重要ルール
- **面白さ・創造性を損なう指摘は絶対に禁止**。物語のエンタメ性を優先すること。
- 検出対象は「客観的に矛盾している事実」のみ。主観的な品質判断（「伏線が弱い」「展開が急」等）は対象外。
- 意図的なフィクション設定（魔法、超能力、異世界ルール等）は矛盾ではない。
- 矛盾が無ければ、空の配列 \`[]\` を返すこと。無理に矛盾を見つけようとしないこと。

## 検出対象（これらのみ）
1. **キャラクター不整合**: 名前・性別・外見・性格が途中で変わる（意図的な変身・変装を除く）
2. **時系列エラー**: 朝→夜→朝のような不自然な時間遷移、「3日前に起きた」事件が次の段落で「昨日」に変わる等
3. **時代考証違反**: 設定された時代に存在しない物・概念の使用（例：江戸時代にスマートフォン）
4. **設定矛盾**: 「一人っ子」と述べたキャラに兄弟が登場する等の論理的不整合
5. **空間矛盾**: キャラの所在地が説明なく変わる
6. **退場キャラの不整合**: 明確に死亡・退場したキャラが説明なく再登場

## Canon-source rules for long-novel audit
- Treat the text under "検査対象" as an unsaved draft under review.
- Treat only the previous context memos and recent saved chapters as canon.
- Never say the current target chapter already exists in the recent saved chapters unless the same chapter number and title are literally present in the recent saved-chapters section.
- Rejected retry drafts are not canon. Ignore their route, location, title, and outcome unless they are explicitly present in saved chapters or context memos.
- When the draft conflicts with saved canon, report the draft-side conflict; do not invent a prior saved chapter from the draft itself.

## 入力情報

### ユーザー指定のキャラクター設定:
${charContext}

### 時代・世界観設定:
${eraContext}

### 検査対象テキスト:
${storyText}

## 出力フォーマット（JSON配列で出力。矛盾がなければ空配列 \`[]\`）
\`\`\`json
[
  {
    "type": "矛盾の種類（キャラクター不整合/時系列エラー/時代考証違反/設定矛盾/空間矛盾/退場キャラの不整合）",
    "severity": "重大 or 軽微",
    "location": "矛盾が発生している箇所の引用（20字程度）",
    "description": "何がどう矛盾しているかの簡潔な説明"
  }
]
\`\`\`
矛盾がない場合は必ず \`[]\` のみを出力すること。`;
}

/**
 * 長編用の章単位矛盾検査プロンプトを構築する
 * @param {string} chapterBody - 検査対象の章の本文
 * @param {number} chapterNum - 章番号
 * @param {object} settings - gatherSettings() で収集した設定オブジェクト
 * @param {string} allContextMemos - 全章の文脈維持メモ結合
 * @param {string} recentChaptersFull - 直近2章分の全文
 * @returns {string} 検査用プロンプト
 */
export function buildChapterAuditPrompt(chapterBody, chapterNum, settings, allContextMemos, recentChaptersFull, isLastChapter = false) {
  const charContext = _buildCharContext(settings);
  const eraContext = _buildEraContext(settings);

  return `あなたはプロの校閲者・整合性チェッカーです。長編小説の**第${chapterNum}章**を精査し、過去の章との間で**明確な事実矛盾**のみを検出してください。

## 最重要ルール
- **面白さ・創造性を損なう指摘は絶対に禁止**。物語のエンタメ性を優先すること。
- 検出対象は「客観的に矛盾している事実」のみ。主観的な品質判断は対象外。
- 意図的なフィクション設定（魔法、超能力、異世界ルール等）は矛盾ではない。
- 矛盾が無ければ、空の配列 \`[]\` を返すこと。無理に矛盾を見つけようとしないこと。

## 検出対象（事実関係の矛盾のみ）
1. **キャラクター不整合**: 名前・性別・外見・性格が前章と矛盾する（意図的な変身・変装を除く）
2. **時系列エラー**: 前章との時間的な繋がりが不自然
3. **時代考証違反**: 設定された時代に存在しない物・概念の使用（例：江戸時代にスマートフォン）
4. **設定矛盾**: 前章で確立された設定との論理的不整合（「一人っ子」と述べたキャラに兄弟が登場するなど）
5. **空間矛盾**: 前章終了時の所在地と本章冒頭の所在地が説明なく変わる
6. **退場キャラの不整合**: 前章で退場・死亡したキャラが説明なく再登場する
7. **伏線の矛盾**: 文脈メモに記録された回収待ち伏線・設定・モチーフの扱いが矛盾する
8. **別ルート混入**: 過去章・Story Bible・ユーザー設定に存在しない主人公名、能力名、組織名、初期候補設定の混入

## 入力情報

### ユーザー指定のキャラクター設定:
${charContext}

### 時代・世界観設定:
${eraContext}

### 終了記号ルール:
この章は${isLastChapter ? '最終章です。本文の最後の独立行に一度だけ「【完】」が必要です。' : '最終章ではありません。「【完】」が本文に含まれている場合は設定矛盾として検出してください。'}

### Canon-source rules for this chapter audit:
- The text under "検査対象" is the current unsaved draft. It is not saved canon yet.
- The sections "過去の章の文脈維持メモ" and "直近の章の全文" are the only prior canon sources.
- Do not treat a previous rejected draft for the same chapter number as canon.
- Do not claim the current draft already appears in the recent saved-chapters section unless it literally appears there.
- If a retry note mentions a failed draft, use it only as a warning about what to avoid, not as story history.

### 過去の章の文脈維持メモ:
${allContextMemos || '（第1章のため過去メモなし）'}

### 直近の章の全文（参照用）:
${recentChaptersFull || '（第1章のため参照なし）'}

### 検査対象（第${chapterNum}章の本文）:
${chapterBody}

## 出力フォーマット（JSON配列で出力。矛盾がなければ空配列 \`[]\`）
\`\`\`json
[
  {
    "type": "矛盾の種類（キャラクター不整合/時系列エラー/時代考証違反/設定矛盾/空間矛盾/退場キャラの不整合/伏線の矛盾/別ルート混入）",
    "severity": "重大 or 軽微",
    "location": "矛盾が発生している箇所の引用（20字程度）",
    "description": "何がどう矛盾しているかの簡潔な説明"
  }
]
\`\`\`
矛盾がない場合は必ず \`[]\` のみを出力すること。`;
}

// ============================================================
// 修正プロンプト構築
// ============================================================

/**
 * 矛盾修正用プロンプトを構築する
 * @param {string} originalText - 修正対象のテキスト
 * @param {Array} issues - 検出された矛盾リスト
 * @param {object} settings - gatherSettings() で収集した設定オブジェクト
 * @param {object} [longNovelContext] - 長編用の追加コンテキスト（オプション）
 * @returns {string} 修正用プロンプト
 */
export function buildFixPrompt(originalText, issues, settings, longNovelContext) {
  const issueList = issues.map((issue, i) =>
    `${i + 1}. 【${issue.type}】${issue.description}（箇所：『${issue.location}』）`
  ).join('\n');

  const charContext = _buildCharContext(settings);

  let contextSection = '';
  if (longNovelContext) {
    contextSection = `
### Canon-source rules for fixing:
- The target text is an unsaved draft being repaired.
- Use only saved recent chapters and context memos as canon.
- Rejected retry drafts are not canon and must not be carried forward.
- Fix the draft to match canon; do not rewrite canon to match the draft.

### 過去の章の文脈（整合性を保つために参照すること）:
${longNovelContext.recentChaptersFull || ''}

### 文脈メモ（伏線・モチーフ・設定の記録）:
${longNovelContext.allContextMemos || ''}
`;
  }

  return `あなたはプロの小説家兼校閲者です。以下のテキストに含まれる設定・事実関係の矛盾箇所を修正してください。

## 最重要ルール
1. **物語の面白さ・テンポ・文体を絶対に損なわないこと**。矛盾の修正は最小限の変更で行う。
2. **修正対象は指摘された矛盾箇所のみ**。矛盾と無関係な文章を書き換えてはならない。
3. **文字数を大きく変えないこと**。元テキストの90%〜110%の範囲に収めること。
4. **プロット・展開・オチは一切変更しない**。矛盾する事実の記述のみを正しい設定に合わせて修正する。
5. 修正結果の本文のみを出力する。メタ解説、注釈、「以下は修正結果です」等の前置きは一切付けない。
6. **修正によって新しい矛盾を生まないこと**。矛盾箇所を直す際は、前後の章で確立された設定・数値・事実関係を必ず参照し、存在しないキャラクターや出来事を勝手に追加しないこと。
7. **名前・固有名詞の正確性**: 修正時に既存キャラクターの名前を誤記したり、存在しない人物名を挿入したりしないこと。
8. **自己校正メタの絶対禁止**: 「修正する」「修正後のテキスト」「OK」「おっと、見出しに」「No, there is no other」「Let's double check」など、あなたの判断過程・検査過程・修正ログを本文へ出力しないこと。修正済み本文だけを返すこと。

### ユーザー指定のキャラクター設定（正とする）:
${charContext}
${contextSection}

## 検出された矛盾:
${issueList}

## 修正対象テキスト:
${originalText}

## 修正後のテキスト（本文のみ出力）:`;
}

// ============================================================
// 検査結果パース
// ============================================================

/**
 * AI応答から矛盾リストをパースする
 * @param {string} responseText - AIの応答テキスト
 * @returns {Array} 矛盾リスト（空配列 = 矛盾なし）
 */
export function parseAuditResult(responseText) {
  if (!responseText || !responseText.trim()) return [];

  let text = responseText.trim();

  // マークダウンコードブロックの除去
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

  // JSON配列のパースを試行
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      // 各要素のバリデーション
      return parsed.filter(item =>
        item && typeof item === 'object' &&
        item.type && item.description
      ).map(item => ({
        type: String(item.type || ''),
        severity: String(item.severity || '軽微'),
        location: String(item.location || ''),
        description: String(item.description || ''),
      }));
    }
    return [];
  } catch (e) {
    // JSONパース失敗 — テキストから配列部分を抽出して再試行
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        const parsed = JSON.parse(arrayMatch[0]);
        if (Array.isArray(parsed)) {
          return parsed.filter(item =>
            item && typeof item === 'object' &&
            item.type && item.description
          ).map(item => ({
            type: String(item.type || ''),
            severity: String(item.severity || '軽微'),
            location: String(item.location || ''),
            description: String(item.description || ''),
          }));
        }
      } catch (e2) {
        // パース不能 — 矛盾なしとして扱う（安全側に倒す）
        console.warn('矛盾検査結果のパースに失敗しました:', e2.message);
      }
    }
    return [];
  }
}

// ============================================================
// 矛盾検査結果の人間可読フォーマット
// ============================================================

/**
 * 検出された矛盾を文脈メモ用のテキストにフォーマットする
 * @param {Array} issues - 矛盾リスト
 * @param {number} chapterNum - 章番号（長編時）
 * @returns {string} メモ用テキスト
 */
export function formatAuditResultForMemo(issues, chapterNum) {
  if (!issues || issues.length === 0) return '';

  const lines = [`【矛盾検査記録（第${chapterNum}章）— 修正済み】`];
  issues.forEach((issue, i) => {
    lines.push(`  ${i + 1}. [${issue.severity}] ${issue.type}: ${issue.description}`);
  });
  return lines.join('\n');
}

// ============================================================
// 統合関数: 検査 → 修正 → 再検査ループ
// 重大矛盾は解消するまで修正を繰り返す（安全上限8回）。
// 長編完成稿ではオプションにより軽微な矛盾も修正対象にできる。
// ============================================================

/**
 * テキストの矛盾検査と修正を実行する統合関数
 * @param {string} apiKey - APIキー
 * @param {string} text - 検査対象テキスト
 * @param {object} settings - gatherSettings() で収集した設定
 * @param {object} options - オプション
 * @param {Function} [options.onStatus] - ステータス更新コールバック (message: string) => void
 * @param {Function} [options.onFallback] - モデルフォールバックコールバック
 * @param {number} [options.maxFixAttempts=8] - 修正の最大試行回数（安全上限）
 * @param {number} [options.chapterNum] - 章番号（長編時のみ）
 * @param {string} [options.allContextMemos] - 全章の文脈メモ（長編時のみ）
 * @param {string} [options.recentChaptersFull] - 直近2章の全文（長編時のみ）
 * @param {boolean} [options.fixMinorIssues=false] - 軽微な矛盾も完成稿向けに修正する
 * @param {boolean} [options.isLastChapter=false] - 長編時、この章が最終章かどうか
 * @param {boolean} [options.failOnAuditError=false] - 検査API失敗時にスキップせず例外化する
 * @param {Function} [options.validateFixedText] - 修正候補を採用前に検査する関数
 * @returns {Promise<{text: string, issues: Array, wasFixed: boolean, remainingCriticalCount: number, remainingIssues: Array}>}
 */
export async function auditAndFix(apiKey, text, settings, options = {}) {
  const {
    onStatus,
    onFallback,
    maxFixAttempts = 8,
    chapterNum,
    allContextMemos,
    recentChaptersFull,
    fixMinorIssues = false,
    isLastChapter = false,
    failOnAuditError = false,
    validateFixedText,
  } = options;

  const model = GEMINI_MODELS[0].value;
  const isLongNovel = chapterNum != null;
  const label = isLongNovel ? `第${chapterNum}章: ` : '';
  let currentText = text;
  let allIssues = []; // 全ループで検出された矛盾を蓄積
  let wasFixed = false;
  let lastCriticalCount = 0;
  let lastIssues = [];

  for (let attempt = 0; attempt <= maxFixAttempts; attempt++) {
    // --- 検査 ---
    const isRecheck = attempt > 0;
    if (onStatus) {
      const lnLabel = isLongNovel ? `第${chapterNum}章の` : '';
      onStatus(`[検査] ${lnLabel}設定整合性チェックを実行中...${isRecheck ? `（再検査 ${attempt}回目）` : ''}`);
    }

    let auditPrompt;
    if (isLongNovel) {
      auditPrompt = buildChapterAuditPrompt(
        currentText, chapterNum, settings,
        allContextMemos, recentChaptersFull, isLastChapter
      );
    } else {
      auditPrompt = buildAuditPrompt(currentText, settings);
    }

    let auditResponse;
    try {
      const result = await callGenerativeAI(apiKey, model, auditPrompt, onFallback, {
        temperature: 0.1,
        responseMimeType: 'application/json',
        disableGoogleSearch: true,
        maxTokens: 4096,
        maxOutputTokens: 4096,
        timeoutMs: isLongNovel ? 70000 : 120000,
        maxModelAttempts: isLongNovel ? 2 : undefined,
      });
      auditResponse = result.text;
    } catch (err) {
      console.warn('矛盾検査APIコールが失敗しました:', err.message);
      if (failOnAuditError) {
        if (onStatus) onStatus(`[検査] 検査APIエラー — 保存を停止します`);
        throw new Error(`矛盾検査APIエラー: ${err.message}`);
      }
      if (onStatus) onStatus(`[検査] 検査APIエラー — スキップして続行します`);
      return { text: currentText, issues: allIssues, wasFixed, remainingCriticalCount: 0, remainingIssues: [] };
    }

    // --- 結果パース ---
    const issues = parseAuditResult(auditResponse);
    lastIssues = issues;
    const criticalIssues = issues.filter(i => i.severity === '重大');
    const minorIssues = issues.filter(i => i.severity !== '重大');
    lastCriticalCount = criticalIssues.length;

    if (issues.length > 0) {
      allIssues = allIssues.concat(issues);
      if (onStatus) {
        onStatus(`[検査] ${label}${issues.length}件の指摘を検出（重大: ${criticalIssues.length}件, 軽微: ${minorIssues.length}件）`);
        // 矛盾の詳細内容をログに表示
        criticalIssues.forEach((issue, i) => {
          onStatus(`[検査]   ⛔ 重大${i + 1}: [${issue.type}] ${issue.description}${issue.location ? `（箇所:『${issue.location}』）` : ''}`);
        });
        minorIssues.forEach((issue, i) => {
          onStatus(`[検査]   ⚠ 軽微${i + 1}: [${issue.type}] ${issue.description}`);
        });
      }
    }

    const issuesToFix = fixMinorIssues ? issues : criticalIssues;

    // 修正対象の矛盾がなければ検査完了
    if (issuesToFix.length === 0) {
      if (onStatus) {
        if (issues.length === 0) {
          onStatus(`[検査] ${label}矛盾は検出されませんでした ✅`);
        } else if (fixMinorIssues) {
          onStatus(`[検査] ${label}修正対象の矛盾は残っていません ✅`);
        } else {
          onStatus(`[検査] ${label}重大な矛盾なし。軽微な指摘${minorIssues.length}件は許容範囲です ✅`);
        }
      }
      return { text: currentText, issues: allIssues, wasFixed, remainingCriticalCount: 0, remainingIssues: [] };
    }

    // 安全上限に達していたらこれ以上修正しない
    if (attempt >= maxFixAttempts) {
      break;
    }

    // --- 修正 ---
    if (onStatus) {
      const targetLabel = fixMinorIssues ? `矛盾${issuesToFix.length}件` : `重大な矛盾${criticalIssues.length}件`;
      onStatus(`[修正] ${label}${targetLabel}を修正中...（試行 ${attempt + 1}/${maxFixAttempts}）`);
    }

    const longNovelContext = isLongNovel ? { recentChaptersFull, allContextMemos } : null;
    const fixPrompt = buildFixPrompt(currentText, issuesToFix, settings, longNovelContext);

    try {
      const fixResult = await callGenerativeAI(apiKey, model, fixPrompt, onFallback, {
        temperature: 0.3,
        disableGoogleSearch: true,
        maxTokens: 16384,
        maxOutputTokens: 16384,
        timeoutMs: isLongNovel ? 90000 : 120000,
        maxModelAttempts: isLongNovel ? 2 : undefined,
      });

      let fixedText = fixResult.text.trim();
      if (typeof options.sanitizeText === 'function') {
        fixedText = options.sanitizeText(fixedText);
      }

      if (typeof validateFixedText === 'function') {
        const validationIssues = validateFixedText(fixedText) || [];
        if (validationIssues.length > 0) {
          console.warn(`修正結果を品質ゲートで棄却: ${validationIssues.join(' / ')}`);
          if (onStatus) onStatus(`[修正] 修正結果に本文破損の兆候があるため棄却します（${validationIssues.slice(0, 3).join(' / ')}）`);
          const syntheticIssue = {
            type: '修正結果破損',
            severity: '重大',
            location: '修正候補',
            description: `修正結果が品質ゲートに失敗しました: ${validationIssues.slice(0, 3).join(' / ')}`,
          };
          return {
            text: currentText,
            issues: allIssues.concat(syntheticIssue),
            wasFixed,
            remainingCriticalCount: Math.max(lastCriticalCount, failOnAuditError ? 1 : 0),
            remainingIssues: lastIssues.length ? lastIssues : [syntheticIssue],
          };
        }
      }
      const ratio = fixedText.length / currentText.length;
      if (ratio < 0.5 || ratio > 2.0) {
        console.warn(`修正結果の文字数比率が異常 (${(ratio * 100).toFixed(0)}%)。修正を棄却します。`);
        if (onStatus) onStatus(`[修正] 修正結果の文字数が異常に変動（${(ratio * 100).toFixed(0)}%）。この修正を棄却します`);
        const syntheticIssue = {
          type: '修正結果破損',
          severity: '重大',
          location: '修正候補',
          description: `修正結果の文字数が異常に変動しました: ${(ratio * 100).toFixed(0)}%`,
        };
        return {
          text: currentText,
          issues: allIssues.concat(syntheticIssue),
          wasFixed,
          remainingCriticalCount: Math.max(lastCriticalCount, failOnAuditError ? 1 : 0),
          remainingIssues: lastIssues.length ? lastIssues : [syntheticIssue],
        };
      }

      currentText = fixedText;
      wasFixed = true;

      if (onStatus) {
        onStatus(`[修正] ${label}修正完了。再検査を実行します...`);
      }

    } catch (err) {
      console.warn('矛盾修正APIコールが失敗しました:', err.message);
      if (onStatus) {
        onStatus(failOnAuditError
          ? `[修正] 修正APIエラー — 残存矛盾があれば保存を停止します`
          : `[修正] 修正APIエラー — 現状のテキストで続行します`);
      }
      return { text: currentText, issues: allIssues, wasFixed, remainingCriticalCount: lastCriticalCount, remainingIssues: lastIssues };
    }
  }

  // 安全上限に達しても重大矛盾が残っている場合
  if (onStatus) {
    onStatus(`[検査] ${label}修正上限（${maxFixAttempts}回）に達しましたが、重大な矛盾が${lastCriticalCount}件残存しています ⚠️`);
  }

  return { text: currentText, issues: allIssues, wasFixed, remainingCriticalCount: lastCriticalCount, remainingIssues: lastIssues };
}

// ============================================================
// 内部ヘルパー
// ============================================================

/**
 * キャラクター設定をコンテキスト文字列に変換する
 */
function _buildCharContext(settings) {
  if (!settings || !settings.characters || settings.characters.length === 0) {
    return '（キャラクター設定なし — AIが自由に設定）';
  }

  return settings.characters.map((c, i) => {
    const parts = [`${i + 1}. ${c.name || '（名前未設定）'}`];
    if (c.sex) parts.push(`性別: ${c.sex}`);
    if (c.role) parts.push(`役割: ${c.role}`);
    if (c.personality) parts.push(`性格: ${c.personality}`);
    if (c.note) parts.push(`詳細: ${c.note}`);
    return parts.join(' / ');
  }).join('\n');
}

/**
 * 時代・世界観設定をコンテキスト文字列に変換する
 */
function _buildEraContext(settings) {
  if (!settings) return '（設定なし）';

  const parts = [];
  const era = settings.eraCustom || settings.era;
  const worldview = settings.worldviewCustom || settings.worldview;
  const genre = settings.genreCustom || settings.genre;

  if (era) parts.push(`時代: ${era}`);
  if (worldview) parts.push(`世界観: ${worldview}`);
  if (genre) parts.push(`ジャンル: ${genre}`);

  return parts.length > 0 ? parts.join('\n') : '（特定の時代・世界観設定なし）';
}
