# HANDOFF (Story Maker → Codex)

## Snapshot Date
2026-05-22T14:45:00+09:00

## Current Status
- ✅ **v3.2.10** — 安定稼働中（GitHub Pages デプロイ＆リリース完了）
- ブランチ: `main`
- 未コミット変更: なし (Working tree clean)
- 直近のコミット:
  - `388cbcd` v3.2.10: Style Analyzer direct input confirm addition & News theme append / 作風解析直接入力確定追加＆ニューステーマ追記機能

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `index.html` (SPA構成) |
| メインロジック | `src/main.js` |
| 作風解析 | `src/styleAnalyzer.js` |
| スタイル定義 | `src/style.css` |
| ビルド設定 | `vite.config.js` (base: GH Pages用設定 — 変更禁止) |

## Rule Enforcement (重要)
- 作業開始前に **必ず** `docs/project_standards.md` と `docs/deploy.md` を読むこと。
- デプロイ先: GitHub Pages のみ（HF Spaces は対象外）
- `vite.config.js` の `base` を推測で変更しない

## Done (今回作業)
- **作風解析エンジン直接入力確定追加**: `index.html`・`src/style.css`・`src/styleAnalyzer.js` を修正し、直接入力されたテキストを「確定追加」ボタン (`#btn-sa-add-text`) で `droppedTexts` に仮想ファイルとして蓄積・解析できるようにしました。
- **ニュースキーワード追記化**: `src/main.js` 内のニュースキーワード取得処理を変更し、既存値がある場合はカンマ（`, `）で繋いで追記する仕様に改善しました。また、「📡 AI: 今日のニュース」チップスをプリセットチップスの末尾に移動しました。
- **堅牢なJSONパーサー**: `src/styleAnalyzer.js` に `parseJsonWithRepair(raw)` を実装し、AIが返すJSONの構文エラー（制御文字、余分なカンマ、シングルクォート）を自動修復してパースするガードを追加しました。
- **デプロイ＆リリース**: `npm run build` 検証成功後、`npm run deploy` で GitHub Pages にデプロイ。annotated tag `v3.2.10` および GitHub Release `v3.2.10` を作成。さらに ZIP アーカイブをダウンロード検証し、`C:\story-maker-main` へ正しく同期展開しました。

## Remaining Tasks
- なし (すべての要望に対応しデプロイ・同期完了)

## Verification State
- GitHub Pages デプロイ済み (v3.2.10)
- ローカル C ドライブ展開完了 (`C:\story-maker-main\package.json` 存在確認 True)

## Risks
- なし。現在の `main` ブランチとリモート `gh-pages` は完全に同期されています。

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順

## Root App Protection Rule
This workspace root app is an active product app and must not be treated as a scratchpad, disposable shell, or temporary target for unrelated UI experiments.

### Protected Existing App
- `C:\Users\sx717\Antigravity\story-maker`

### Protected Files
- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `src/lib/`
- `public/`
- `README.md`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `dist/`
