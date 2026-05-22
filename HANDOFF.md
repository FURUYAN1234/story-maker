# HANDOFF (Story Maker → Codex)

## Snapshot Date
2026-05-22T16:00:00+09:00

## Current Status
- 🛠️ **v3.3.3** — ローカル環境にてGemini 3.5 Flash向けJSONパースエラー修正検証完了（試用前のデプロイ保留中）
- ブランチ: `main`
- 未コミット変更: あり（`package.json`, `index.html`, `README.md`, `src/api.js`, `src/charImport.js`, `src/main.js`, `src/styleAnalyzer.js` がローカルで修正・検証完了状態。試用前デプロイ防止ルールに基づき、コミット・プッシュ・デプロイ・タグ作成・リリース・バックアップはすべて未実行です）
- 現在実行中の開発サーバー: `http://localhost:5178/`

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `index.html` (SPA構成) |
| メインロジック | `src/main.js` |
| API呼び出し | `src/api.js` (JSON出力強制オプション追加) |
| 作風解析 | `src/styleAnalyzer.js` (JSON強制オプション適用) |
| キャラシートインポート | `src/charImport.js` (JSON強制オプション適用) |
| スタイル定義 | `src/style.css` |
| ビルド設定 | `vite.config.js` (base: GH Pages用設定 — 変更禁止) |

## Rule Enforcement (重要)
- **試用前デプロイ・リリースの禁止**: ユーザーが実際にローカル（`http://localhost:5178/`）で試用し、動作確認を終えるまで、`npm run deploy` や GitHub リリース、バックアップ（`backup_launch.bat`）の起動は絶対に実行しないこと。
- 作業開始前に **必ず** `docs/project_standards.md` 和 `docs/deploy.md` を読むこと。
- `vite.config.js` の `base` を推測で変更しない。

## Done (今回作業)
- **JSON強制出力の設定**: `src/api.js` 内の `_callGemini`, `_callGeminiVision`, `_callGeminiMultimodal` の引数に `options` を受け取り、`responseMimeType: "application/json"` を `generationConfig` へ指定できるようにしました。
- **パースエラーの解消**: `src/styleAnalyzer.js`（作風解析）と `src/charImport.js`（キャラクターシート画像解析）でのAPI呼び出しに `{ responseMimeType: 'application/json' }` を指定し、Gemini 3.5 Flashが確実にパース可能なJSONのみを返却するように制御しました。
- **バージョンの同期**: バージョン表記を `3.3.3` に一括更新・同期しました（`package.json`, `index.html`, `README.md`, `src/main.js`）。
- **ローカルビルド検証**: `npm run build` を実行し、`story-maker@3.3.3` のプロダクションビルドがエラーなく通ることを確認。

## Remaining Tasks
- [ ] ユーザーによるローカル試用およびデプロイ・リリース承認（承認待ち）
- [ ] （承認後）「デプロイして」プロトコルに沿ったフルデプロイ・リリース
  - `npm run deploy` で GitHub Pages へデプロイ。
  - タグ `v3.3.3` の作成・プッシュ、および GitHub Release `v3.3.3` の作成。
  - リリースZIPをダウンロード検証し、`C:\story-maker-main` へ上書き同期。

## Verification State
- ローカルビルド確認済み (v3.3.3)
- ローカル開発サーバー起動中 (`http://localhost:5178/`)

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順
