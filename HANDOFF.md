# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, personal paths, billing data, private tokens, or unpublished implementation mechanics.

## 2026-06-09 v4.9.9 Long-Novel QA Update

### Current Root-Fix Status

- Browser state: in-app browser remains on `http://localhost:5179/`, Gemini API is saved/masked/read-only, and no reload/tab close was performed after the user re-entered keys. Do not ask the user to paste a key into chat or write it to files.
- Root cause found: later guardrail work made AI drafts fail more often, then the local-safe fallback path turned those failures into saved manuscript prose. That made the original block-by-block design optimize for completion and forbidden-token avoidance instead of natural fiction.
- Current `src/main.js` root fixes: local-safe block/chapter text is no longer adopted as saved manuscript text; failed blocks get natural-prose rescue regeneration; chapter-level failures throw and rebuild rather than recomposing local-safe chapters; local prose gates reject known safe-filler phrases; honorific aliases such as `健太さん` can match existing ledger names like `高橋健太`.
- Verification currently passing after the root fix: `node --check src/main.js`, `npm run lint --if-present`, `git diff --check -- . ':!dist'`, and `npm run build`.
- Next step: restart Gemini long QA from the current browser without reloading, monitor with long browser timeouts, and final-scan chapter count, visible labels, category terms, local-safe filler phrases, broken grammar, mojibake, and off-ledger recurring names before considering OpenAI.

- Target: local Story Maker on port `5179`.
- Deploy/tag/backup are still paused by user request.
- Current objective: fresh Gemini long-novel QA first; OpenAI QA only after Gemini passes.
- Important blocker: browser is ready with `mode-custom=長編小説`, but the API key must be entered and saved manually in the UI. Do not ask the user to paste a key into chat or write it to files.
- Recent Gemini QA attempts were intentionally stopped before final completion because saved/prospective text exposed quality leaks: visible event labels, quoted category labels such as `未対応の出来事`, broken fallback grammar such as `...を使うを進める`, and repeated side-character/person-name drift.
- Current `src/main.js` fixes include: event-label actionization, visible category-label rejection/repair, stronger Japanese full-name drift detection without canonizing previous generated body text, local-dev long-chip enablement, and generate-button long-mode synchronization.
- Verification currently passing: `node --check src/main.js`, `npm run lint --if-present`, `git diff --check -- . ':!dist'`, and `npm run build`.
- Next step after user enters/saves the key: restart Gemini long QA from the current browser, monitor with long browser timeouts, and perform final scans for chapter count, visible labels, category terms, broken grammar, mojibake, and off-ledger recurring names before considering OpenAI.

このファイルは公開リポジトリに置かれる前提の引き継ぎメモです。APIキー、認証情報、個人パス、課金情報、秘密トークン、未公開の実装手順を書かないでください。

## Current Status / 現状

- App: Story Maker
- Public version: `v4.9.6`
- Local development port: `5179`
- Public page: https://furuyan1234.github.io/story-maker/
- Long-novel mode is not promoted as a public feature and remains suspended for public release.

- アプリ: Story Maker
- 公開版: `v4.9.6`
- ローカル開発ポート: `5179`
- 公開ページ: https://furuyan1234.github.io/story-maker/
- 長編モードは公開機能として紹介せず、公開停止扱いを継続します。

## v4.9.6 Summary / v4.9.6 要約

- Repaired README mojibake and rewrote public documentation in English/Japanese.
- Removed long-novel feature promotion while the mode remains below the public release-quality bar.
- Fixed all-random output-mode rerolling when the output mode section is not locked.
- Excluded long-novel mode from public all-random selection.
- Improved paragraph readability for non-long prose outputs.
- Rechecked public release wording and public assets.

- README の文字化けを修正し、公開文書を英日併記で作り直しました。
- 長編モードは公開品質基準を満たすまで機能紹介から削除しました。
- 出力モードがロックされていない全項目ランダムで、出力モードも再抽選されるよう修正しました。
- 公開版の全項目ランダムから長編モードを除外しました。
- 非長編の散文出力について、改行・段落の読みやすさを改善しました。
- 公開文言と公開アセットを再確認しました。

## Verification / 検証

- `node --check src/main.js`
- `node --check vite.config.js`
- `npm run lint --if-present`
- `npm run build`
- `git diff --check -- . ':!dist'`
- Gemini API matrix: 14 / 14 public non-long modes passed.
- OpenAI API matrix: 14 / 14 public non-long modes passed.
- Local browser check showed Story Maker `v4.9.6`, 14 public output-mode chips, and no long-mode chip.
- Public asset scan found no API-key pattern, private-token pattern, personal path, or unintended project-specific name.

## Release Checklist / リリース確認

- Keep release notes bilingual.
- Keep public docs focused on visible user behavior.
- Do not document private test procedures, key-management mechanics, personal paths, or non-release file names.
- Before tagging or releasing, scan README, public notes, and annotated tag messages for accidental internal wording.

- リリースノートは英日併記にします。
- 公開文書はユーザーに見える機能説明に限定します。
- 非公開の検証手順、キー管理の仕組み、個人パス、リリース対象外ファイル名を書かないでください。
- tag / release 前に、README、公開ノート、annotated tag 本文へ内部向け文言が混入していないか確認します。
