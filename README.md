# Story Maker v4.9.6 / AI物語メーカー

Story Maker is a browser-based AI story generator for short prose, 4-panel manga plots, scripts, poems, essays, letters, diaries, documentaries, and radio-drama style text. It uses a bring-your-own-key model for Google Gemini API or OpenAI API and focuses on multi-axis randomization so outputs do not collapse into the same predictable pattern.

Story Maker は、Google Gemini API または OpenAI API のユーザー所有キーで動くブラウザ型の物語生成アプリです。4コマ漫画プロット、短編小説、脚本、詩、エッセイ、手紙、日記、ドキュメンタリー、ラジオドラマなどを、多軸ランダム化で単調になりにくく生成します。

## Public Status / 公開状況

- Current public version: `v4.9.6`
- Public page: https://furuyan1234.github.io/story-maker/
- Long-novel mode is not promoted as a public feature in this README. It remains below the release-quality bar for public use and is treated as suspended for now.

- 公開版: `v4.9.6`
- 公開ページ: https://furuyan1234.github.io/story-maker/
- 長編モードは公開品質基準を満たすまで、公開機能として紹介しません。現在は公開停止扱いです。

## Main Features / 主な機能

- Dual API support: switch between Gemini and OpenAI without changing the story settings.
- Runtime API entry: API keys are entered by the user in the browser UI and are not included in repository files or release assets.
- Multi-axis randomization: output mode, theme, genre, era, worldview, target reader, ending, narration, and characters can be randomized independently.
- All-random generation: one button randomizes the selected axes and generates immediately.
- Output-mode lock: lock a mode when you want all-random to preserve the current format.
- Character controls: number of characters, names, sex, roles, and personalities can be edited or randomized.
- Universal intake: text, markdown, URLs, and images can be used as source material where supported.
- Style analysis and rewrite: analyze an input style and apply it to generated text while preserving the plot.
- Today's news keyword assist: Gemini search grounding can extract current Japanese news keywords for story seeds.

- Gemini / OpenAI の2系統APIに対応し、設定を保ったまま切り替えできます。
- APIキーはユーザーがブラウザUIに入力する方式で、リポジトリファイルやリリース成果物には含めません。
- 出力モード、テーマ、ジャンル、時代、世界観、読者層、結末、語り口、登場人物を独立してランダム化できます。
- 全項目ランダムは、選択軸をまとめてランダム化して即生成します。
- 出力モードをロックすれば、全項目ランダムでも現在の形式を保てます。
- 登場人物の人数、名前、性別、役割、性格を編集またはランダム生成できます。
- テキスト、Markdown、URL、画像を素材として取り込めます。
- 作風解析とリライトにより、生成済み本文へ文体だけを反映できます。
- Gemini の検索グラウンディングで、今日の日本語ニュースから物語キーワードを抽出できます。

## Public Output Modes / 公開出力モード

The public release targets the following non-long output modes:

公開版では、以下の非長編モードを対象にしています。

| Mode | Japanese label |
|---|---|
| 4-panel manga plot | 4コマ漫画風 |
| AI 4koma scenario link | AI 4koma シナリオ連携（STEP2） |
| Flash fiction | ショート（〜1000字） |
| Short story | 短編小説（〜3000字） |
| Novella | 中編小説（〜4000字） |
| Script | 脚本 / 台本 |
| Story manga | ストーリー漫画 |
| Essay | エッセイ |
| Poem | 詩・ポエム |
| Fairy tale / picture book | 童話 / 絵本 |
| Letter | 手紙 / 書簡体 |
| Diary / monologue | 日記 / 独白体 |
| Documentary | ドキュメンタリー |
| Radio drama | ラジオドラマ |

## v4.9.6 Changes / v4.9.6 更新内容

- Fixed all-random output-mode behavior: when output mode is not locked, all-random now rerolls the output mode instead of keeping the previous mode.
- Long-novel mode is excluded from all-random public selection.
- Improved paragraph readability for non-long outputs by adding stronger paragraph-density guidance and cleanup.
- Verified Gemini and OpenAI across all 14 public non-long output modes.
- Rewrote this README in clean UTF-8 English/Japanese and removed the long-novel feature promotion.
- Tightened public release checks and wording review.

- 全項目ランダム時、出力モードがロックされていない場合は出力モードも再抽選されるよう修正しました。
- 公開版の全項目ランダムから長編モードを除外しました。
- 非長編出力で改行が少なすぎる問題に対し、段落密度の指示と整形を強化しました。
- Gemini / OpenAI の両APIで、公開対象の非長編14モードを検証しました。
- README を UTF-8 の英日併記で作り直し、長編モードの機能紹介を削除しました。
- 公開前チェックと公開文言の確認を見直しました。

## API Key And Privacy / APIキーとプライバシー

- API keys are typed by the user in the browser UI.
- Keys are runtime inputs and are not part of the source repository, release notes, or release assets.
- A request is sent only to the selected provider needed for generation or analysis.
- No API key, personal credential, billing data, or private token is committed to this repository.
- Do not paste API keys into issues, pull requests, release notes, or public documentation.
- Public documentation is limited to user-facing behavior.

- APIキーはユーザーがブラウザUIに入力します。
- キーは実行時入力であり、ソース、リリースノート、リリース成果物には含めません。
- 生成・解析に必要な場合のみ、選択中のAPI提供元へリクエストを送ります。
- このリポジトリには APIキー、認証情報、課金情報、秘密トークンを含めません。
- APIキーを issue、pull request、release note、公開文書に貼らないでください。
- 公開文書では、ユーザーに見える機能だけを説明します。

## Local Development / ローカル開発

```powershell
npm install
npm run dev
```

Story Maker uses port `5179` in the Antigravity workspace.

Antigravity ワークスペースでは Story Maker のローカル開発ポートは `5179` です。

```powershell
npm run build
npm run deploy
```

Deployment target: GitHub Pages (`gh-pages` branch).

デプロイ先は GitHub Pages（`gh-pages` ブランチ）です。

## Verification / 検証

Current release checks:

現在のリリース確認:

- `node --check src/main.js`
- `node --check vite.config.js`
- `npm run lint --if-present`
- `npm run build`
- `git diff --check -- . ':!dist'`
- All-random browser check: all 14 public modes appeared across repeated runs, with no long mode selected.
- Gemini API matrix: 14 / 14 public modes passed.
- OpenAI API matrix: 14 / 14 public modes passed.
- Public asset scan: no API-key pattern, private-token pattern, personal path, or unintended project-specific name found in the live public asset.

- 全項目ランダムのブラウザ確認で、公開対象14モードすべてが出現し、長編モードは選ばれませんでした。
- Gemini API マトリクスは 14 / 14 公開モードで通過しました。
- OpenAI API マトリクスは 14 / 14 公開モードで通過しました。
- 公開アセット確認で、APIキー風パターン、秘密トークン風パターン、個人パス、意図しない固有名詞が残っていないことを確認しました。

## Release Notes / リリースノート

### v4.9.6 (2026-06-08)

- Public README repaired from mojibake and rewritten in English/Japanese.
- Long-novel feature promotion removed until quality is acceptable for public release.
- All-random output-mode reroll fixed.
- Non-long paragraph readability improved.
- Public release checks and wording review tightened.
- Gemini/OpenAI public-mode verification completed.

- README の文字化けを修正し、英日併記で再構成しました。
- 長編モードの機能紹介を削除し、品質が満たされるまで公開停止扱いにしました。
- 全項目ランダムで出力モードもランダム化されるよう修正しました。
- 非長編出力の改行・段落の読みやすさを改善しました。
- 公開前チェックと公開文言の確認を見直しました。
- Gemini / OpenAI の公開モード検証を完了しました。

### v4.9.5 (2026-06-08)

- Verified non-long output modes and kept long-novel public selection sealed.
- 非長編出力モードの検証を行い、長編モードの公開選択封鎖を継続しました。
