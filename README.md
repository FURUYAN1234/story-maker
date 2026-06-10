# Story Maker v5.0.0 / AI物語メーカー

Story Maker is a static web application for generating short-form creative text with Google Gemini API or OpenAI API. It is not a plain prompt box. It combines output mode, theme, genre, worldview, audience, era, ending style, narration, characters, source material, optional image input, and optional style analysis into a structured generation contract.

Story Maker は、Google Gemini API または OpenAI API を使って短い創作文を生成する静的Webアプリです。単なるプロンプト入力欄ではなく、出力モード、テーマ、ジャンル、世界観、読者層、時代、結末、語り口、登場人物、素材入力、画像入力、作風解析を組み合わせて、生成用の契約を組み立てます。

## Current Release / 現在のリリース

- Current public version: `v5.0.0`
- Build target: static Vite app deployed to GitHub Pages
- Supported public output modes: 14
- Verified providers in this release pass: Gemini and OpenAI
- Public documentation intentionally describes only the supported public feature set.

- 現在の公開版: `v5.0.0`
- ビルド対象: GitHub Pages に配置する静的 Vite アプリ
- 対応する公開出力モード: 14
- 今回の検証済みAPI: Gemini / OpenAI
- 公開READMEでは、現在サポート対象の公開機能だけを説明します。

## API Key Safety / APIキーの安全性

API keys are entered by the user in the browser UI. The repository, README, release notes, release assets, and deployed static files must not contain API keys, private credentials, billing data, or personal secrets.

APIキーはユーザーがブラウザUIへ入力します。リポジトリ、README、リリースノート、リリース成果物、デプロイ済み静的ファイルには、APIキー、秘密資格情報、課金情報、個人的な秘密情報を含めてはいけません。

API keys are sent only to the selected provider when an API request is made for generation, image understanding, style analysis, or news-grounded keyword assistance. Story Maker does not send API keys to the repository, issue tracker, release system, documentation, or unrelated external services.

APIキーは、生成、画像理解、作風解析、ニュース接地キーワード補助などで必要なAPIリクエストを行う時だけ、選択中のAPI提供元へ送信されます。Story Maker は、APIキーをリポジトリ、Issue、リリース管理、公開文書、無関係な外部サービスへ送信しません。

Do not paste API keys into issues, pull requests, release notes, screenshots, public documents, or chat logs.

APIキーを Issue、Pull Request、リリースノート、スクリーンショット、公開文書、チャットログへ貼らないでください。

## Core Concept / 基本コンセプト

The app builds a generation request from multiple visible axes instead of relying on one free-form prompt. The goal is to make quick generation more stable, more mode-aware, and less likely to collapse into generic AI prose.

このアプリは、自由入力だけに頼らず、複数の見える創作軸から生成リクエストを組み立てます。狙いは、短時間の生成でも、出力形式を守り、選択内容と整合し、AIらしい均一な説明文へ崩れにくくすることです。

Main axes:

- output mode
- theme or seed
- characters
- genre
- worldview or setting
- audience
- era
- ending style
- narrator or point of view
- universal input text or image material
- supplemental user constraints
- optional style analysis

主な創作軸:

- 出力モード
- テーマまたはシード
- 登場人物
- ジャンル
- 世界観・舞台
- 読者層
- 時代
- 結末
- 語り口・視点
- 万能インプットのテキストまたは画像素材
- 補足メモ
- 任意の作風解析

## Supported Public Output Modes / 対応公開出力モード

The public release supports the following 14 output modes. Each mode has a mode contract, so the label is not decorative: the generated text is expected to follow the shape of that mode.

公開版では次の14モードに対応します。各モードには出力契約があり、単なるラベルではありません。生成本文は、そのモードに合った形で出力されます。

| Mode | Japanese Label | Expected Output Shape |
|---|---|---|
| `4koma` | 4コマ漫画風 | Four-panel beat structure with setup, turn, punchline, visual action, and dialogue. |
| `4koma_scenario` | AI 4koma シナリオ連携 | Topic, logline, location, outfit, punchline, and panel-ready scenario details. |
| `short_short` | ショート | Compact prose with setup, turn, aftertaste, and a final line that changes the meaning. |
| `novel` | 短編小説 | Scene-based short fiction with desire, obstacle, choice, cost, and relationship change. |
| `medium` | 中編小説 | Multi-section prose with stronger development and a larger emotional arc. |
| `scenario` | 脚本/台本 | Character list, scene direction, stage directions, and speaker-based dialogue. |
| `manga` | ストーリー漫画 | Page and panel descriptions, separated visual direction, dialogue, and staging. |
| `essay` | エッセイ | Four blocks: `主張:`, `観察:`, `考察:`, `結論:`. No fictional scene ending marker. |
| `poem` | 詩・ポエム | Line-based poetic output with concrete images and no explanatory afterword. |
| `fairy` | 童話/絵本 | Gentle story form with visible action, lesson-like change, and child-readable clarity. |
| `letter` | 手紙/書簡体 | Addressee, body, closing, sender, and relationship change through written voice. |
| `diary` | 日記/独白体 | Date-like or diary-like first-person reflection with self-deception and small truth. |
| `documentary` | ドキュメンタリー | Narration, testimony, observation, unresolved question, and factual-feeling structure. |
| `radio` | ラジオドラマ | BGM, SE, narration, dialogue, and sound-driven scene movement. |

## v5.0.0 Quality System / v5.0.0 品質システム

v5.0.0 keeps the public-mode quality layer outside the older large application file and treats it as the stable place for prompt contracts, provider-specific tuning, output cleanup, and generic-rule checks. Its purpose is to make the current public modes stronger without adding one-off rules tied to a specific setting, shop, job, person, object, or clue.

v5.0.0では、既存の巨大なアプリ本体の外側にある公開モード用の品質レイヤーを、プロンプト契約、API別補正、出力整形、汎用ルール検査の安定した置き場所として扱います。目的は、特定の舞台、店、職業、人物、物、証拠品に依存した局所ルールを増やさず、現在の公開モード全体を強くすることです。

### Selected-Mode Priority / 選択モード優先

The quality layer resolves the active output mode from the selected UI chip first. It does not let an incidental word inside the prompt override the user's selected output mode.

品質レイヤーは、まず画面で選択中の出力モードを優先します。プロンプト本文に偶然出てきた別モード名が、ユーザーの選択モードを上書きしないようにしています。

### Public Mode Contract / 公開モード契約

Every supported mode receives a mode-specific contract before generation. The contract tells the model what kind of final text is expected and what must not appear in the visible output.

対応モードごとに、生成前のモード契約を追加します。契約には、期待される完成形と、本文に出してはいけない内部指示・自己評価・チェックリスト・プロンプト断片などを含めています。

### Under-Length Rewrite / 短すぎる初稿の改稿

For both Gemini and OpenAI streaming generation, v5.0.0 checks public-mode draft length before the final text reaches the output panel. If a supported mode returns a draft that is too short for the mode, the app asks the selected provider to rewrite the draft into a fuller final piece using the same input conditions. The short draft is not accepted as the final displayed result.

Gemini と OpenAI のストリーム生成では、出力欄へ最終表示する前に、公開モードの本文長を確認します。対応モードで短すぎる初稿が返った場合、同じ入力条件を使って、選択中のAPIに完成稿として全面改稿させます。短すぎる初稿を、そのまま最終表示として採用しません。

This is intentionally mode-generic. It expands by adding action, dialogue, silence, physical sensation, aftermath, and relationship change from the selected inputs and draft content, not by injecting hard-coded places, people, jobs, shop names, products, or evidence items.

この仕組みはモード汎用です。会話、行動、沈黙、身体感覚、後始末、関係変化を、選択済み入力と初稿内容から増やします。固定の舞台、人物、職業、店名、商品、証拠品を勝手に差し込むための仕組みではありません。

### Provider-Specific Tuning / API別チューニング

Gemini and OpenAI use the same public-mode contract, but the runtime adjusts how the contract is delivered. Gemini receives additional rewrite pressure when the answer is too neat, explanatory, or short. OpenAI receives a system-level public-mode contract that suppresses analysis text, checklist fragments, and over-short endings while keeping the selected mode strict.

Gemini と OpenAI は同じ公開モード契約を使いますが、実行時の渡し方をAPIごとに調整します。Gemini には、整いすぎる説明文・短すぎる回答を避けるための改稿圧を加えます。OpenAI には、分析文、チェックリスト断片、短すぎる締めを抑え、選択モードを厳守する system レベルの公開モード契約を追加します。

### Final Output Cleanup / 最終出力整形

Before the generated text is treated as the visible final output, the public cleanup layer removes prompt artifacts, stale completion markers, and internal footer text. It also keeps mode-specific readability: letters are paragraphized, poems are kept line-based, essays are capped at a readable finished length, and manga/script-like outputs are trimmed at a complete sentence or panel boundary.

生成本文を画面に出す最終稿として扱う前に、公開出力整形レイヤーが、プロンプト断片、古い完了マーカー、内部フッターを取り除きます。あわせて、手紙は段落化し、詩は行形式を守り、エッセイは読み切れる完成稿の長さに収め、漫画・脚本系は文またはコマの区切りで自然に閉じます。

### Dormant Long-Form Path / 長編再開余地

The public release does not expose long-novel generation as a supported mode. The runtime hides the long-mode chip, excludes it from random mode selection, and strips the dormant long-novel control panel from the production build. The internal path is intentionally left behind the implementation boundary so development can resume later if model reliability becomes high enough, but it is not documented as a public feature.

公開版では、長編生成をサポート対象モードとして表示しません。実行時は長編チップを非表示にし、ランダム選択から除外し、本番ビルドでは休止中の長編コントロールパネルを取り除きます。将来、モデルの信頼性が十分に上がった場合に開発を再開できるよう実装上の余地だけは残しますが、公開機能としては記載しません。

### Generic Rule Guard / 汎用ルールガード

The repository includes a public-rule guard:

```powershell
npm run check:generic-rules
```

It scans the public rule files for known non-generic examples, stale local-only wording, and mojibake sentinel terms that should not be present in release-facing rules.

リポジトリには公開ルール用のガードがあります。

```powershell
npm run check:generic-rules
```

公開ルールに、特定条件に寄りすぎた例、古い局所ルール、公開前に残すべきではない文字化け検出語が混ざっていないかを確認します。

The build script runs the fixer and guard before Vite build:

```powershell
npm run build
```

ビルドでは、Viteビルド前に修正器とガードを実行します。

## Verified v5.0.0 Output Matrix / v5.0.0 検証済み出力マトリクス

The v5.0.0 release verification used the in-app browser on `localhost:5179` with user-entered provider keys. API key values were not printed, copied, committed, or included in release assets. The table records release-scope pass/fail and body length only; generated sample bodies are not stored as permanent documentation because provider behavior can change.

v5.0.0のリリース検証では、`localhost:5179` のアプリ画面で、ユーザーが入力したAPIキーを使いました。APIキーの値は表示、コピー、コミット、リリース成果物への同梱をしていません。この表はリリース範囲の合否と本文文字数だけを記録します。API提供元の挙動は変わり得るため、生成サンプル本文は恒久的な公開文書として保存しません。

OpenAI public-mode QA passed all 14 modes:

| Mode | Result | Body Characters |
|---|---:|---:|
| `4koma` | pass | 420 |
| `4koma_scenario` | pass | 841 |
| `short_short` | pass | 959 |
| `novel` | pass | 3,000 |
| `medium` | pass | 3,889 |
| `scenario` | pass | 3,970 |
| `manga` | pass | 4,109 |
| `essay` | pass | 3,385 |
| `poem` | pass | 308 |
| `fairy` | pass | 2,204 |
| `letter` | pass | 935 |
| `diary` | pass | 1,344 |
| `documentary` | pass | 3,366 |
| `radio` | pass | 3,374 |

Gemini public-mode QA passed all 14 modes:

| Mode | Result | Body Characters |
|---|---:|---:|
| `4koma` | pass | 332 |
| `4koma_scenario` | pass | 769 |
| `short_short` | pass | 940 |
| `novel` | pass | 3,091 |
| `medium` | pass | 3,779 |
| `scenario` | pass | 3,950 |
| `manga` | pass | 3,921 |
| `essay` | pass | 3,220 |
| `poem` | pass | 320 |
| `fairy` | pass | 2,203 |
| `letter` | pass | 894 |
| `diary` | pass | 1,379 |
| `documentary` | pass | 3,523 |
| `radio` | pass | 3,772 |

## UI Overview / UI概要

### Header / ヘッダー

The header shows:

- app title and version
- selected provider status
- runtime API key input
- provider switch button
- reload button
- provider key-page links
- progress and waiting notices during API communication

ヘッダーには次を表示します。

- アプリ名とバージョン
- 選択中のAPI提供元
- 実行時APIキー入力欄
- API提供元切り替えボタン
- リロードボタン
- APIキー取得ページへのリンク
- API通信中の進捗・待機表示

### Left Control Panel / 左コントロールパネル

The left panel contains the generation controls. Sections can be locked so all-random operations do not overwrite that section.

左側パネルには生成設定を配置しています。各セクションはロックでき、全項目ランダム時にその欄だけ維持できます。

Main sections:

- output mode
- theme or seed
- characters
- genre
- worldview
- audience
- era
- ending style
- narrator
- universal input
- supplemental note

主なセクション:

- 出力モード
- テーマ・シード
- 登場人物
- ジャンル
- 世界観
- 読者層
- 時代
- 結末
- 語り口
- 万能インプット
- 補足メモ

### Output Panel / 出力欄

The output panel shows:

- generated text
- approximate character count
- selected mode and axis tags
- provider and model tags when available
- copy and text export controls
- optional style-analysis card

出力欄には次を表示します。

- 生成本文
- おおよその文字数
- 選択モードと主要軸タグ
- 利用できる場合のAPI/モデルタグ
- コピーとテキスト出力操作
- 任意の作風解析カード

## Randomization / ランダム生成

The all-random button randomizes the visible creative axes and starts generation. Locked sections keep their current values. The output-mode section can also be randomized when it is unlocked.

「全項目ランダム」は、見えている創作軸をまとめてランダム化し、そのまま生成を開始します。ロック中のセクションは現在値を維持します。出力モード欄が未ロックなら、出力モードも再抽選されます。

Individual section random buttons are available for focused exploration, such as changing only the theme, only characters, or only genre.

個別セクションのランダムボタンもあり、テーマだけ、登場人物だけ、ジャンルだけなど、範囲を絞って試せます。

## Character Controls / 登場人物操作

The character section can set the number of characters and generate roles or descriptions. Roles are intended as story functions, such as protagonist, rival, helper, observer, witness, trickster, or fixer. The app should avoid making every character equally reasonable or equally explanatory.

登場人物欄では、人数、役割、説明を設定できます。役割は、主人公、ライバル、協力者、観測者、目撃者、トリックスター、解決役など、物語内での機能として扱います。全員が同じように物分かりよく説明する状態を避けるためです。

## Character Sheet Image Import / キャラクターシート画像読み取り

Users can drop a character-sheet-like image into the character import area. When a supported provider can read the image, the app extracts visible character traits and turns them into generation inputs.

キャラクターシート風の画像を登場人物読み取りエリアへドロップできます。対応APIで画像を読める場合、見えている特徴を抽出して生成入力へ変換します。

Supported use cases:

- character appearance extraction
- role or personality hints
- multiple character references
- image-based source material for a story seed

想定用途:

- 外見特徴の抽出
- 役割や性格の手がかり
- 複数人物の参照
- 画像を使った物語シード作成

## Universal Input / 万能インプット

Universal Input accepts free-form text or supported image material. It can be used as a source memo, character note, scene hint, style reference, or object reference.

万能インプットは、自由テキストや対応画像素材を受け取ります。素材メモ、人物メモ、場面の手がかり、文体参照、物の参照として使えます。

The app should treat Universal Input as source material, not as a command to expose private data or publish hidden information.

万能インプットは素材として扱います。非公開情報を公開したり、隠れた情報を外へ出したりする命令として扱うものではありません。

## Style Analyzer / 作風解析

The style analyzer is an experimental assistant for extracting style hints from user-provided text or images. It can produce structured JSON and a rewrite result for the user's local workflow.

作風解析は、ユーザーが与えた文章や画像から作風の手がかりを抽出する実験的な補助機能です。ローカルの文章ワークフロー向けに構造化JSONやリライト結果を出せます。

It is designed as a creative aid. It is not a guarantee of author identification, copyright status, or legal safety.

これは創作補助です。作者識別、著作権状態、法的安全性を保証するものではありません。

## News Keyword Assistance / ニュースキーワード補助

When Gemini search grounding is available, the app can ask for current Japanese news topics and turn them into creative seed keywords.

Gemini検索グラウンディングが利用できる場合、現在の日本語ニュース話題を取得し、創作シード用のキーワードへ変換できます。

The purpose is creative grounding, not news reporting. Users should verify facts separately before using generated news-related material as factual writing.

目的は創作上の接地であり、報道ではありません。ニュース由来の素材を事実として使う場合は、ユーザー側で別途確認してください。

## Output And Export / 出力と書き出し

Generated text can be copied from the output panel. The app also supports text export for generated output and structured JSON export for style-analysis workflows.

生成本文は出力欄からコピーできます。生成本文のテキスト書き出しと、作風解析ワークフロー向けの構造化JSON書き出しにも対応しています。

Export files are local user actions. The repository should not receive generated text, API keys, or user settings as part of normal app usage.

書き出しファイルはユーザーのローカル操作です。通常利用で、生成本文、APIキー、ユーザー設定がリポジトリへ書き戻されることは想定していません。

## Local Development / ローカル開発

Install dependencies:

```powershell
npm install
```

Start the local development server:

```powershell
npm run dev -- --host 127.0.0.1 --port 5179
```

Build for release:

```powershell
npm run build
```

Run public-rule guard:

```powershell
npm run check:generic-rules
```

依存関係のインストール:

```powershell
npm install
```

ローカル開発サーバー:

```powershell
npm run dev -- --host 127.0.0.1 --port 5179
```

リリースビルド:

```powershell
npm run build
```

公開ルール検査:

```powershell
npm run check:generic-rules
```

## Deployment / デプロイ

The project is a static Vite app. GitHub Pages deployment can be run with:

```powershell
npm run deploy
```

The deploy script builds the app and publishes the `dist` directory with `gh-pages`.

このプロジェクトは静的 Vite アプリです。GitHub Pages へのデプロイは次で実行できます。

```powershell
npm run deploy
```

デプロイスクリプトはビルド後、`gh-pages` で `dist` ディレクトリを公開します。

## Release Checklist / リリースチェックリスト

Before a public release, check:

- build, lint, and syntax checks pass
- public-rule guard passes
- no API-key-like strings are present in repository or release assets
- no private credentials, billing data, or sensitive personal data are present
- generated garbage, temporary verification artifacts, and local scratch files are not published
- public documentation describes only supported public behavior
- release tag message is bilingual English/Japanese
- GitHub Release body is bilingual English/Japanese
- deployed page loads with the expected version

公開リリース前に確認すること:

- build、lint、構文チェックが通ること
- 公開ルールガードが通ること
- APIキーらしき文字列がリポジトリやリリース成果物にないこと
- 秘密資格情報、課金情報、機微な個人情報がないこと
- 生成ゴミ、一時検証ファイル、ローカル scratch が公開されないこと
- 公開文書がサポート対象の公開挙動だけを説明していること
- tag メッセージが英日併記であること
- GitHub Release 本文が英日併記であること
- デプロイ済みページが期待バージョンで読み込めること

## Public Safety Boundaries / 公開上の注意

Do not use this project to:

- publish API keys or private credentials
- upload billing data or secrets into public documents
- treat generated fiction as verified factual reporting
- claim model output is legally reviewed or publication-safe by default
- expose private personal information through prompts, screenshots, release notes, or issues

このプロジェクトでは、次の扱いをしないでください。

- APIキーや秘密資格情報を公開する
- 課金情報や秘密情報を公開文書へ入れる
- 生成された創作文を検証済みの事実報道として扱う
- モデル出力が法的確認済み、または無条件に公開安全だと主張する
- プロンプト、スクリーンショット、リリースノート、Issueを通じて個人情報を公開する

## Known Limitations / 既知の制限

- Output quality depends on provider availability, model behavior, prompt complexity, and user-provided input.
- The rewrite layer reduces short draft failures but does not guarantee literary excellence.
- Generated text can still require human editing for tone, originality, factual accuracy, legal safety, and publication quality.
- Current QA verifies representative real browser output, not all possible input combinations.

- 出力品質は、API提供元の状態、モデル挙動、プロンプトの複雑さ、ユーザー入力に左右されます。
- 改稿レイヤーは短すぎる初稿の失敗を減らしますが、文学的完成度を保証するものではありません。
- 生成本文は、トーン、独自性、事実性、法的安全性、公開品質のために人間の編集が必要になる場合があります。
- 現在のQAは実ブラウザでの代表的出力検証であり、すべての入力組み合わせを保証するものではありません。

## Release History / 変更履歴

### v5.0.0 (2026-06-10)

- Bumped the public release line from `v4.9.9` to `v5.0.0`.
- Kept supported public generation focused on the 14 non-long output modes.
- Hid dormant long-novel controls in the runtime and strips the dormant long-novel panel from production builds unless an explicit development flag is used.
- Strengthened provider-specific public-mode tuning for Gemini and OpenAI while keeping the rules generic.
- Restored final output cleanup for paragraphing, completion-marker removal, poem endings, essay caps, and manga/script boundary trimming.
- Updated the README to describe the current public specification and the v5.0.0 browser QA scope.

- 公開版の系統を `v4.9.9` から `v5.0.0` に更新しました。
- サポート対象の公開生成は、長編以外の14出力モードに絞っています。
- 実行時に休止中の長編UIを非表示にし、明示的な開発フラグがない本番ビルドでは休止中の長編パネルを取り除きます。
- 汎用ルールを保ったまま、Gemini / OpenAI それぞれの公開モード補正を強化しました。
- 段落整形、完了マーカー除去、詩の終端、エッセイの長さ調整、漫画・脚本系の自然な区切りでの整形を復旧しました。
- READMEを現在の公開仕様と v5.0.0 のブラウザQA範囲に合わせて更新しました。

### v4.9.9 (2026-06-09)

- Rewrote the public README around the currently supported public feature set.
- Added selected-mode-first public quality contracts.
- Added generic public-rule guard checks.
- Added provider-side rewrite handling for under-length public drafts before display.
- Verified all 14 supported public modes on both Gemini and OpenAI in the in-app browser.
- Kept API keys out of repository files, release notes, release assets, and deployed static files.

- 公開READMEを、現在サポート中の公開機能に合わせて全面整理しました。
- 画面で選択中の出力モードを優先する公開品質契約を追加しました。
- 汎用公開ルールガードを追加しました。
- 短すぎる公開モード初稿を表示前に同じAPIで改稿する処理を追加しました。
- Gemini / OpenAI の両方で、対応14公開モードを実ブラウザ検証しました。
- APIキーをリポジトリ、リリースノート、リリース成果物、デプロイ済み静的ファイルへ含めないことを確認しました。

### v4.9.6 to v4.9.8 / v4.9.6〜v4.9.8

- Rebuilt detailed public documentation.
- Improved output-mode randomization behavior.
- Added paragraph-density guidance and public output cleanup.
- Kept public documentation focused on supported public generation modes.

- 詳細な公開READMEを再構成しました。
- 出力モードのランダム選択挙動を改善しました。
- 改行密度の指示と公開出力の整形を追加しました。
- 公開READMEの中心を、サポート対象の公開生成モードに戻しました。

### v4.9.5

- Added explicit output-mode contracts for all supported public modes.
- Verified Gemini and OpenAI public-mode generation in the browser.

- 対応する公開モードすべてに明示的な出力形式契約を追加しました。
- Gemini / OpenAI の公開モード生成をブラウザで検証しました。

### Earlier Versions / 以前のバージョン

- Built the core static story generator, multi-axis randomization, character controls, style-analysis support, image-assisted input, and GitHub Pages deployment workflow.

- 静的な物語生成基盤、多軸ランダム、登場人物操作、作風解析補助、画像入力補助、GitHub Pages デプロイ手順を構築しました。

## License / ライセンス

This project is provided as a creative tool without warranty. API availability, provider terms, model behavior, browser behavior, and hosting behavior may change.

このプロジェクトは保証なしの創作ツールとして提供されます。APIの利用可否、提供元規約、モデル挙動、ブラウザ挙動、ホスティング挙動は変わる可能性があります。
