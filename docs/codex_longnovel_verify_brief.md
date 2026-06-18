# Codex 指示書: 長編モード構造バグ修正の内容確認と検証

あなた（Codex）は、別セッションで行われた修正を**レビューして検証する**役割です。コードは既に変更済み。あなたのタスクは「変更が正しく機能し、既存挙動を壊していないこと」を独立に確認し、不備があれば指摘・修正することです。

## 0. 前提（対象の確定・誤爆防止）

- 本番「長編モード（長編化β）」の実体は **`src/longifyBeta.js` の `runLongifyBeta()`**。今回のバグ原稿（6章 / 約30,935字 / 末尾 `Created By AI Story Maker V5.1.x`）はこの経路の出力。
- 触ってよいのは `src/longifyBeta.js` / 新規 `src/longifyContinuity.js` / `tests/`。
- **`src/longNovel/*`（別エンジン）と `src/legacyMain.js` の対話式長編フローは対象外**。今回の出力には使われていない。
- バージョンは 5.1.6 → **5.1.7** に bump 済み（AGENTS.md の桁上げルール準拠）。

## 1. 今回行った修正（4つの構造バグ）

新規 `src/longifyContinuity.js`（純関数群）を追加し、`longifyBeta.js` から配線。

### A. 章間に物語状態が引き継がれない＝再演ループ（主因）
- `summarizeForContinuity(chapterText, chapterNumber)` を、**定型文**から**実体ダイジェスト**へ置換（`buildContinuityDigest`：到達状態 / 主な出来事 / 使用済みビート＝場所×行為）。
- `runLongifyBeta` で各章ダイジェストを `continuityDigests[]` に**累積**し、`renderRollingMemo()` で「前章までの接続メモ」として全章プロンプトへ注入（旧実装は直近章の定型文を毎章上書き＝具体情報ゼロ）。

### B. 学年・設定の混線（ランドセル↔中学）
- `buildLongifyLedgerPrompt` に `00. 不変設定`（学年/年齢/時代/季節）の出力を必須化。
- `extractInvariants(ledgerText)` で凍結 → `buildLongifyChapterPrompt` に `【不変設定（厳守）】` ブロックを注入（`formatInvariantBlock`）。
- `detectSettingContradiction(text, invariants)` で矛盾章を検出し、章採用前にリトライ対象化。

### C. 重複（ループ）検出が完全一致しか見ない
- `detectLongifyChapterOverlap` に `detectParaphrasedOverlap` を OR 追加。
- **ライブ再生成ゲートはビート（場所×行為）信号のみ**（`{ useShingle:false }`）。英語/一様テキストでの誤検出を避けるため。
- ファジー類似度（文字4-gram Jaccard/包含）は**非ブロッキングの構造監査**側で使用。

### D. トークン切れ（尻切れ "「うーん」と考"）
- `isLikelyTruncated(body, finishReason)`：末尾が終止記号か（`。！？」』）…—` 等）で判定。finishReason はストリーミング provider 層で破棄されるため**終止記号ヒューリスティックを主**に使用。
- 章確定前に切断を検知したら `buildLongifyChapterContinuationPrompt` で末尾から自動継続（最大 `LONGIFY_CHAPTER_TRUNCATION_RETRIES=3` 回）。
- **最終章**は完結（終止）しなければ採用せずエラー送出。

### E. 講評が構造バグを見ない
- `auditLongifyStructure({ chapters, invariants })` を AI講評の前段で実行（切断 / 設定矛盾 / 章ループ を検出）。
- `onStage` に `phase:'structureAudit'` で報告し、戻り値に `result.structureAudit` を追加（**非ブロッキング**。文芸スコア経路は不変）。

## 2. 検証手順（必ず実行し、結果を報告）

### 2-1. 自動テスト・ビルド（必須・全て pass を確認）
```
cd story-maker
node --test "tests/**/*.test.js"      # 55 tests, 0 fail を確認
npm run check:generic-rules           # passed
npm run build                         # built 成功（chunk-size 警告は既存・無視可）
```

### 2-2. 純関数の単体確認（`src/longifyContinuity.js`）
`tests/longifyContinuity.test.js` が次を担保していることを読んで確認し、必要なら追加ケースを書く:
- `isLikelyTruncated('…「うーん」と考') === true` / `'…頷いた。' === false` / `(_, 'MAX_TOKENS') === true`。
- `detectParaphrasedOverlap`：同じビートを別語で書いた2章＝`ok:false`、無関係な章＝`ok:true`。
- `extractInvariants` が `学年/年齢/時代/季節` を抽出、`schoolLevel` を分類。
- `detectSettingContradiction`：`小学`不変 × 本文「中学」＝`ok:false`、矛盾語なし＝`ok:true`。
- `buildContinuityDigest`：入力章により出力が変わる（定型文ではない）。
- `auditLongifyStructure`：切断・設定矛盾・章ループを `blocking` に計上。

### 2-3. 回帰の妥当性レビュー（重要）
今回 `tests/longifyBeta.test.js` の一部フィクスチャを変更している。**変更が「テスト意図の改変」ではなく「非現実的な一様フィクスチャの現実化」であること**を確認せよ:
- 複数章を同一フィラー文（章番号の1桁だけ差）で返していたモックを、章ごとに内容の異なる本文へ変更。
- 接続メモ書式変更に伴い、アサーション `第1章までの接続` → `第1章の確定` を更新。
- 「duplicate gate」テストは**完全一致検出（既存）**で動作し続けること、overlap リトライ分岐（`前回候補は既存章と重なったため参照しない`）が発火することを確認。
- もしテスト意図を損なう変更があれば指摘・修正せよ。

### 2-4. 配線レビュー（コードを読んで確認）
- `runLongifyBeta` で `extractInvariants` → `chapterPromptArgs.invariants` → `buildLongifyChapterPrompt` まで実際に流れているか。
- 章確定後に `continuityDigests.push(summarizeForContinuity(...))` → `previousBridge = renderRollingMemo(...)` の順で**累積**しているか（上書きでないこと）。
- 切断継続ループが「短すぎ増補」経路とは独立に、**長いが切れた**章にも発火するか。
- `auditLongifyStructure` が AI講評**前**に呼ばれ、戻り値 `structureAudit` が `return` に含まれるか。

### 2-5. 実機（ブラウザ Gemini）スモーク ※可能なら
> HANDOFF.md 方針: 実機未検証のためデプロイ/タグ禁止。実機での確認をもって pass とする。
1. `npm run dev` で起動し、短編を Output に生成 → 長編化β（6章 / 30,000字目安）を実行。
2. 確認ポイント:
   - **ループ**: 章をまたいで同じ行動（ベンチ/ごみ/リボン投げ等）が別の言葉で再演されていない。進行ログに `chapterRetry`（重複理由）が出れば検出が働いている。
   - **学年**: `ランドセル` と `中学卒業` のような矛盾が出ない。進行ログ/`structureAudit` に `setting_contradiction` が残っていない。
   - **尻切れ**: 最終章が文の途中（終止記号なし）で終わっていない。途中切断時に `chapterContinue` ログが出て継続される。
   - **構造チェック**: 完了時に `構造チェック: 合格`（または要修正と理由）が `onStage` で表示される。
3. 文字数 30,000 以上を維持していること。

## 3. 受け入れ条件（pass の定義）
- [ ] `node --test "tests/**/*.test.js"` が 0 fail。
- [ ] `npm run check:generic-rules` と `npm run build` が成功。
- [ ] 2-4 の配線が全てコード上で確認できる。
- [ ] 2-3 のフィクスチャ変更がテスト意図を損なっていない。
- [ ]（実機実施時）ループ・学年矛盾・尻切れが再現せず、構造チェックが表示される。

## 4. 不備があった場合
- ライブ・ゲートの過検出/未検出があれば、`OVERLAP_*_THRESHOLD` と `LONGIFY_CHAPTER_TRUNCATION_RETRIES`、ビート辞書（`PLACE_CATEGORIES`/`ACTION_CATEGORIES`）をチューニング。
- finishReason をより確実に使いたい場合は `src/providerClients.js` のストリーミング（`zs`）で `candidates[0].finishReason` を拾い、`streamTextCall` 経由で `runLongifyBeta` まで透過する配線を追加（minified のため慎重に）。
- 修正したら 1 タスク = 1 コミット、各コミット前にテストと `check:generic-rules` を通すこと。デプロイ・タグはユーザー承認まで行わない。

参考: 詳細な根本原因分析は `docs/codex_longnovel_bugfix_plan.md`。
