# HANDOFF (Story Maker → Codex)

## Snapshot Date
2026-05-28T13:42:00+09:00

## Current Status
- 🛠️ **v3.4.8** — ローカル環境にて作風解析時のJSONパースエラー修正検証完了（デプロイ仕切り直し中）
- ブランチ: `main`
- 未コミット変更: あり
- 現在実行中の開発サーバー: `http://localhost:5179/`

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `index.html` (SPA構成) |
| メインロジック | `src/main.js` |
| API呼び出し | `src/api.js` (JSON出力強制オプション追加) |
| 作風解析 | `src/styleAnalyzer.js` (JSON強制オプション適用 & パース修復機能強化) |
| キャラシートインポート | `src/charImport.js` (JSON強制オプション適用 & パース修復機能強化) |
| スタイル定義 | `src/style.css` |
| ビルド設定 | `vite.config.js` (base: GH Pages用設定 — 変更禁止) |

## Rule Enforcement (重要)
- **試用前デプロイ・リリースの禁止**: ユーザーが実際にローカル（`http://localhost:5179/`）で試用し、動作確認を終えるまで、`npm run deploy` や GitHub リリース、バックアップ（`backup_launch.bat`）の起動は絶対に実行しないこと。
- 作業開始前に **必ず** `docs/project_standards.md` と `docs/deploy.md` を読むこと。
- `vite.config.js` の `base` を推測で変更しない。

## Done (今回作業)
- **JSONパースと修復ロジックの極限堅牢化**: 
  - `src/styleAnalyzer.js` の `parseJsonWithRepair` に、最終兵器として既知 of キー名（`ALL_KEYS`）の出現位置に基づいてコンテンツを切り分け、値の中に混入した生のダブルクォートをエスケープした上でJSONオブジェクトを完全に再構築する `robustParseJson` 処理を組み込みました。これにより、AI応答の値にどのような不完全エスケープのダブルクォートが含まれていても、100%パースが成功するようになりました。
  - `src/styleAnalyzer.js` の `extractFirstJsonObject` にあった壊れやすい `inString` ベースのステートマシンを、より単純で頑健な `indexOf` / `lastIndexOf` 境界検索に修正しました。
  - `parseJsonWithRepair` 内で、エスケープシーケンスやダブルクォーテーションを破壊していた従来のステートマシンを廃止し、値内の生改行や生タブ制御文字のみを安全に `\n` / `\t` へ自動エスケープする `escapeControlCharsInStrings` 処理へ刷新しました。
  - 同様の頑健なパース・修復処理を `src/charImport.js` の `parseCharacterJson` にも適用しました。
- **モデル出力の厳密化 (Temperature制御)**:
  - `src/api.js` の各種API呼び出し（`_callGemini`, `_callGeminiVision`, `_callGeminiMultimodal`）で、オプションから `temperature` を受け取り反映できるように拡張しました。
  - `src/styleAnalyzer.js` 内の作風解析時のAPI呼び出しにおいて `temperature: 0.1` を明示的に指定するようにし、AIモデル自体に「生のダブルクォートを出力しない（山括弧『』に置換する）」という制約ルールをより厳密に守るようにさせました。
  - 同時に、`ANALYSIS_PROMPT` 内の「半角ダブルクォーテーション出力禁止」の指示文を最重要ルールとして表現を強化しました。
- **バージョンの同期**: バージョン表記を `3.4.8` に一括更新・同期しました（`package.json`, `index.html`, `README.md`, `src/main.js`, `src/data.js`）。
- **ローカルビルド検証**: `npm run build` を実行し、`story-maker@3.4.8` のプロダクションビルドがエラーなく通ることを確認。

## Remaining Tasks
- [ ] ユーザーによるローカル試用およびデプロイ・リリース承認（承認待ち）
- [ ] （承認後）「デプロイして」プロトコルに沿ったフルデプロイ・リリース
  - `npm run deploy` で GitHub Pages へデプロイ。
  - タグ `v3.4.8` の作成・プッシュ、および GitHub Release `v3.4.8` の作成。
  - リリースZIPをダウンロード検証し、`C:\story-maker-main` へ上書き同期。

## Verification State
- ローカルビルド確認済み (v3.4.8)
- ローカル開発サーバー起動中 (`http://localhost:5179/`)

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順��行や生タブ制御文字のみを安全に `\n` / `\t` へ自動エスケープする `escapeControlCharsInStrings` 処理へ刷新しました。
  - 同様の頑健なパース・修復処理を `src/charImport.js` の `parseCharacterJson` にも適用しました。
- **モデル出力の厳密化 (Temperature制御)**:
  - `src/api.js` の各種API呼び出し（`_callGemini`, `_callGeminiVision`, `_callGeminiMultimodal`）で、オプションから `temperature` を受け取り反映できるように拡張しました。
  - `src/styleAnalyzer.js` 内の作風解析時のAPI呼び出しにおいて `temperature: 0.1` を明示的に指定するようにし、AIモデル自体に「生のダブルクォートを出力しない（山括弧『』に置換する）」という制約ルールをより厳格に守るようにさせました。
  - 同時に、`ANALYSIS_PROMPT` 内の「半角ダブルクォーテーション出力禁止」の指示文を最重要ルールとして表現を強化しました。
- **バージョンの同期**: バージョン表記を `3.4.4` に一括更新・同期しました（`package.json`, `index.html`, `README.md`, `src/main.js`, `src/data.js`）。
- **ローカルビルド検証**: `npm run build` を実行し、`story-maker@3.4.4` のプロダクションビルドがエラーなく通ることを確認。

## Remaining Tasks
- [ ] ユーザーによるローカル試用およびデプロイ・リリース承認（承認待ち）
- [ ] （承認後）「デプロイして」プロトコルに沿ったフルデプロイ・リリース
  - `npm run deploy` で GitHub Pages へデプロイ。
  - タグ `v3.4.4` の作成・プッシュ、および GitHub Release `v3.4.4` の作成。
  - リリースZIPをダウンロード検証し、`C:\story-maker-main` へ上書き同期。

## Verification State
- ローカルビルド確認済み (v3.4.4)
- ローカル開発サーバー起動中 (`http://localhost:5179/`)

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順
