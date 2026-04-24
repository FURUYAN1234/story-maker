# HANDOFF (Story Maker → Codex)

## Snapshot Date
2026-04-24T10:27:00+09:00

## Current Status
- ✅ **v2.8.2** — 安定稼働中（GitHub Pages デプロイ済み）
- ブランチ: `main`
- 未コミット変更: `.agents/workflows/deploy.md`, `AGENTS.md`（Antigravity側で編集中、未コミット）
- 直近5コミット:
  - `a6e40b0` Revise model priority update in README
  - `e6656f9` Update README.md
  - `68be601` docs: clean up old changelog and restructure README
  - `d4eb08e` chore: update AGENTS.md with codex sync reference
  - `45f9e5d` docs: setup Four-File Operating Model

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `src/App.jsx` (または `index.html` — SPA構成確認必要) |
| Gemini APIクライアント | `src/` 配下の該当ファイル |
| ビルド設定 | `vite.config.js` (base: GH Pages用設定 — 変更禁止) |

## Rule Enforcement (重要)
- 作業開始前に **必ず** `docs/project_standards.md` と `docs/deploy.md` を読むこと。
- デプロイ先: GitHub Pages のみ（HF Spaces は対象外）
- `vite.config.js` の `base` を推測で変更しない

## Done (前回作業)
- `AGENTS.md`, `docs/project_standards.md`, `docs/deploy.md` の整備完了
- README の restructure & changelog cleanup

## Remaining Tasks
- 未コミットの `AGENTS.md` と `.agents/workflows/deploy.md` のコミット・Push

## Verification State
- GitHub Pages デプロイ済み (v2.8.2)

## Risks
- 未コミット変更2件あり（AGENTS.md, deploy.md workflow）。Codexが作業開始前にPushするか、ローカルの変更を確認すること。

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順

## Suggested First Command
```bash
git pull origin main
```

---

## Root App Protection Rule

This workspace root app is an active product app and must not be treated as a scratchpad, disposable shell, or temporary target for unrelated UI experiments.

### Protected Existing App
- `C:\Users\sx717\OneDrive\Documents\Codex_App\story-maker`

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

### Mandatory Interpretation
- Requests for a separate app, clone-like UI, prototype, experiment, mock, or public-safe rewrite must be implemented in a new subfolder.
- Do not satisfy those requests by replacing the current app.
- If the target app is not explicit, do not edit anything until the target is clarified.

### Build / Deploy Guardrail
- Do not run `npm run build`, `npm run deploy`, or any command that rewrites `dist/` unless the current root app is explicitly the intended target.

### Multi-Agent / Multi-PC Guardrail
- These protection rules apply equally in Codex and Antigravity.
- Opening the correct folder is required but not sufficient; agents must still respect the protected-file and separate-subfolder rules above.
