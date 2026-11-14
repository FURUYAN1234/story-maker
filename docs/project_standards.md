# PROJECT RULES: story-maker

## Project Overview
`story-maker` is the real product app in this workspace.

It is not disposable scaffolding, not a temporary shell, and not a place to build unrelated UI experiments by overwriting the current app.

## Architecture Guardrails

### 1. API handling
- Keep defensive handling for Gemini-style API limits such as `429 Too Many Requests`.
- Do not remove retry loops, wait handling, or fallback behavior without an explicit task.

### 2. Story logic
- Treat story generation logic, prompt construction, and output formatting as product behavior.
- Do not simplify or replace core behavior just because another app or prototype wants a lighter UI.

### 3. Version / config handling
- Keep any user-visible versioning aligned with `package.json` and the intended release flow.
- Do not make isolated version tweaks without an explicit request.

### 4. Cross-Project Synchronization (Nano Banana Pro)

#### 4.1 出力フォーマットの準拠
- **漫画シナリオ連携**: 保存済みID `4koma_scenario` は維持し、漫画アプリ既定の自由配置4〜8コマへ対応する。コマ数は内容から選び、改稿では採用済みコマ数を保つ。通常の `4koma` は別モードとして4コマ固定を維持する。
- **確認対象タグ**: `Topic:`, `Logline:`, `Location:`, `VisualEvidence:`, `Outfit:`, `Punchline:`, `PanelCountReason:`, `Scenario:`, `PageComposition:`, `[EMOTION: XXX]`, `[Camera: XXX]`, `BalloonLayout:` と現行の許容値・配置検証。整形でページ設計を削除しない。

#### 4.2 仕様確認のタイミング（必須）
- **デプロイ時確認**: バージョンアップ・デプロイの際は、NBP のシナリオパーサー仕様に変更がないか **必ず** 確認し、差異があれば `src/prompt.js` の `4koma_scenario` モードを更新すること。
- **4komaモード改修時**: 4komaシナリオモードを修正する際は、事前にNBP側の最新パーサー仕様を確認すること。
- **自動検査**: 起動・テスト・ビルドとAntigravityの漫画アプリ正式公開時に現行ソースと実パーサーを照合する。仕様変更を検出したら差分を読んで修正・検証し、検査を通すだけの基準ハッシュ更新は行わない。手順は `docs/manga-compatibility.md`。

#### 4.3 参照方法
- **優先参照先**: `NBP/docs/scenario_spec.md` を最優先で参照すること。NBP側がパーサー仕様変更時にこのファイルを同期更新する義務を負っている。
- **フォールバック**: `scenario_spec.md` が存在しない場合は `NBP/src/App.jsx` を読み取り専用で確認すること。
- **参照不可時の対応**: 通常は同じAntigravityフォルダの `../nano-banana-pro` を使う。参照欠落・未確認の変更を成功扱いで省略しない。実際の配置と設定を調べ、必須入力が不足するときだけユーザーへ確認する。推測で仕様を補完しない。

#### 4.4 プロジェクト分離の原則（厳守）
- **書き込み禁止**: NBP 側のエージェントが story-maker のファイルを直接編集することは **禁止** する。仕様変更は Story Maker 側のエージェントが自律的に検知・対応すること。
- **逆方向も同様**: Story Maker 側のエージェントが `nano-banana-pro` のファイルを編集することも禁止。

## Forbidden Changes

### Protected product files
Unless the user explicitly says to modify `story-maker` itself, do not edit:

- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `src/lib/**`
- `public/**`
- `README.md`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `dist/**`

### Sensitive settings
- Never hardcode API keys, secrets, or private credentials into frontend files.
- Keep runtime secrets in user input flow or proper environment handling.

### Separate-app rule
- If the user asks for a separate app, public-safe clone, mock UI, experiment, prototype, or rewrite not explicitly for `story-maker`, create a new subfolder.
- Never satisfy those requests by replacing this app's root files.

### No-assumption rule
- Similarity of visible UI, category structure, or workflow is not permission to overwrite this app.
- If it is not explicit that `story-maker` is the target, do not edit product files.
- If the target app cannot be identified with confidence, stop and clarify before editing.

## Build / Deploy Safety
- Do not run `npm run build`, `npm run deploy`, or any command that rewrites `dist/` unless `story-maker` is the confirmed target.
- Do not infer deploy behavior from any other app in OneDrive.

## Recovery Rule
- If the wrong app is modified by mistake, stop all feature work immediately.
- Restore the changed files first.
- Restore generated outputs such as `dist/` if they were rewritten.
