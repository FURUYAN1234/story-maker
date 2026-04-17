# PROJECT RULES: story-maker

## Project Overview
Gemini などの生成AIを利用したアプリケーション。

## Architecture Guardrails (絶対防衛ライン)
AI（Codex等）の過剰な最適化によるシステム破壊を絶対に防ぐこと。以下のロジックは、冗長・特殊・長すぎるように見えても、推測で削除・短縮・単純化してはいけない。

### 1. API特有のエラーハンドリング
- Gemini API 等の `429 Too Many Requests` 回避や、非同期処理の確実性を担保するための意図的な `wait loop`, `retry` 処理, `defensive fallback` を勝手に削らないこと。

### 2. プロンプトの物理強制力
- AIのハルシネーションやフォーマット逸脱を防ぐための「執拗で長大なルール指定」を、冗長に見えても勝手に要約・短縮してはならない。

## Forbidden Files / Settings (変更禁止)
- `package.json` や `src` 内のバージョン管理ロジック（`APP_VERSION` 等）を単独変更しない。
- API Key などの機密情報をフロントエンドコードにハードコードしないこと（.env使用）。
