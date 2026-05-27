# HANDOFF (Story Maker → Codex)

## Snapshot Date
2026-05-28T00:46:00+09:00

## Current Status
- 🛠️ **v3.4.4** — API接続時のフォールバック遅延バグの修正と、キャッシュ機能の導入完了
- ブランチ: `main`
- 未コミット変更: あり（`package.json`, `index.html`, `README.md`, `src/api.js`, `src/data.js`, `src/main.js`）
- 現在実行中の開発サーバー: `http://localhost:5178/`

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `index.html` (SPA構成) |
| メインロジック | `src/main.js` |
| API呼び出し | `src/api.js` (キャッシュ機能およびモデル優先順位最適化) |
| スタイル定義 | `src/style.css` |
| ビルド設定 | `vite.config.js` (base: GH Pages用設定 — 変更禁止) |

## Done (今回作業)
- **キャッシュ機能の導入**: 接続に成功したモデルID（`lastSuccessfulGeminiModel` / `lastSuccessfulOpenAIModel`）をキャッシュし、2回目以降のAPI接続時の無駄なフォールバックと遅延を根絶しました。
- **モデル優先順位の最適化**: `OPENAI_TEXT_MODELS` の先頭に最も普及・安定している `gpt-4o` / `gpt-4o-mini` を配置し、初回接続時のフォールバック回数をゼロに抑えました。
- **バージョンの同期**: バージョン表記を `3.4.4` に一括更新・同期しました（`package.json`, `index.html`, `README.md`, `src/main.js`, `src/data.js`）。

## Remaining Tasks
- [ ] ユーザーによるローカル試用およびデプロイ・リリース承認
- [ ] （承認後）「デプロイして」プロトコルに沿ったフルデプロイ・リリース
  - `npm run deploy` で GitHub Pages へデプロイ。
  - タグ `v3.4.4` の作成・プッシュ、および GitHub Release `v3.4.4` の作成。
  - リリースZIPをダウンロード検証し、`C:\story-maker-main` へ上書き同期。
