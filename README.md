# Story Maker v4.9.6 / AI物語メーカー

> Stop generating predictable stories. Start generating stories that surprise you.
>
> 予定調和な物語ではなく、自分が驚ける物語を生成するための、ブラウザ型AI物語メーカーです。

Story Maker is a static web application that generates stories, scripts, manga beats, essays, poems, letters, diaries, documentaries, and radio dramas through Google Gemini API or OpenAI API. It is not a single prompt box. It is a multi-axis prompt compiler that combines output mode, theme, genre, worldview, target reader, era, ending type, narration, characters, source materials, and optional style analysis into one generation contract.

Story Maker は、Google Gemini API または OpenAI API を使って、物語、脚本、漫画ネーム、エッセイ、詩、手紙、日記、ドキュメンタリー、ラジオドラマなどを生成する静的Webアプリです。単なるテキスト入力欄ではなく、出力モード、テーマ、ジャンル、世界観、読者層、時代、結末、語り口、登場人物、素材入力、作風解析を組み合わせる多軸プロンプトコンパイラとして動作します。

## Public Status / 公開状況

- Current public version: `v4.9.6`
- Public page: https://furuyan1234.github.io/story-maker/
- Repository: https://github.com/FURUYAN1234/story-maker
- Local development port in the Antigravity workspace: `5179`
- The public release focuses on the 14 non-long output modes listed below.
- Long-novel mode is not promoted as a public feature while it remains below the current release-quality bar. The app blocks or redirects long-mode entry in the public workflow, and this README intentionally does not present long-mode implementation details as a supported feature.

- 現在の公開版: `v4.9.6`
- 公開ページ: https://furuyan1234.github.io/story-maker/
- リポジトリ: https://github.com/FURUYAN1234/story-maker
- Antigravity ワークスペースでのローカル開発ポート: `5179`
- 公開版では、下記の非長編14出力モードを対象にしています。
- 長編モードは現時点の公開品質基準を満たすまで、公開機能として紹介しません。公開ワークフローでは長編入口を封鎖または別モードへ戻す扱いであり、このREADMEでも長編の内部実装詳細をサポート済み機能として掲載しません。

## API Key Safety / APIキーの安全性

API keys are entered by the user in the browser UI. The repository, README, release notes, release assets, and deployed static files do not include API keys. The public app does not intentionally save API keys permanently; keys are treated as current-page runtime input. Closing or reloading the page clears entered page state.

API keys are sent only when an API request is made to the selected provider needed for story generation, style analysis, image understanding, or news grounding. Story Maker does not send keys to the repository, release system, issue tracker, documentation, or unrelated external apps. Users should still manage billing, usage limits, key rotation, and revocation on the provider side.

APIキーはユーザーがブラウザUIに入力します。リポジトリ、README、リリースノート、リリース成果物、デプロイ済み静的ファイルにはAPIキーを含めません。公開版アプリはAPIキーを永続保存しません。キーは現在開いているページの実行時入力として扱い、ページを閉じる、またはリロードすると入力状態は消えます。

APIキーは、物語生成、作風解析、画像理解、ニュース取得などで必要になったときだけ、選択中のAPI提供元へのリクエストに使われます。Story Makerは、キーをリポジトリ、リリース管理、Issue、公開文書、無関係な外部アプリへ送信しません。ただし、利用量、課金、制限、キーのローテーション、失効は各API提供元側で管理してください。

Do not paste API keys into issues, pull requests, release notes, screenshots, public documents, or chat logs.

APIキーを Issue、Pull Request、リリースノート、スクリーンショット、公開文書、チャットログへ貼らないでください。

## What This App Does / このアプリの役割

Story Maker is designed to reduce repetitive AI outputs by separating the creative request into many independent axes. Instead of asking an LLM to "write a story" from one vague instruction, it assembles a contract such as:

- output format: four-panel manga, scenario, short story, essay, radio drama, etc.
- creative seed: theme, event, premise, or today's-news keyword
- genre pressure: comedy, mystery, horror, romance, action, drama, suspense, fantasy, science fiction, etc.
- setting pressure: present-day Japan, overseas city, historical period, fantasy world, near future, closed room, school, store, island, and more
- target reader: light casual reading, manga fans, late-night reading, music fans, history fans, horror beginners, and other audience profiles
- ending type: twist, dreamlike ending, bittersweet close, circular ending, question left to the reader, quiet everyday return, and more
- narration: first person, third person, interview style, documentary voice, radio DJ style, letter style, and other voices
- character function: protagonist, rival, observer, helper, witness, fixer, trickster, and other story roles
- source context: pasted text, Markdown, local text files, images, URLs, character sheets, and supplementary notes
- style target: analyzed writing rhythm, vocabulary, visual tone, rhetoric, dialogue balance, and emotional architecture

Story Maker は、創作依頼を多くの独立軸に分解することで、AI出力の反復を減らす設計です。「物語を書いて」という一文だけを投げるのではなく、次のような条件を組み合わせて生成契約を作ります。

- 出力形式: 4コマ、シナリオ、短編、エッセイ、ラジオドラマなど
- 創作の種: テーマ、出来事、前提、今日のニュース由来キーワード
- ジャンル圧: コメディ、ミステリー、ホラー、恋愛、アクション、ドラマ、サスペンス、ファンタジー、SFなど
- 舞台圧: 現代日本、海外都市、時代劇、異世界、近未来、密室、学校、店舗、孤島など
- 読者層: 軽い読み物、漫画好き、寝る前の読書、音楽好き、歴史好き、ホラー初心者など
- 結末型: どんでん返し、夢オチ、ほろ苦い着地、円環構造、読者への問い、静かな日常への帰還など
- 語り口: 一人称、三人称、インタビュー、ドキュメンタリー調、ラジオDJ風、手紙文体など
- 人物機能: 主人公、ライバル、観測者、助力者、証人、調整役、トリックスターなど
- 素材文脈: 貼り付け文、Markdown、ローカルテキスト、画像、URL、キャラクターシート、補足メモ
- 作風目標: 解析した文のリズム、語彙、視覚トーン、修辞、会話比率、感情設計

## Feature Map / 機能マップ

| Area | Feature | Details |
|---|---|---|
| API | Gemini / OpenAI switching | Switch the selected provider from the UI without changing repository files. |
| API | User-entered runtime key | API keys are entered in the browser and are not shipped in the repo or release assets. |
| API | Provider links | The header links to Gemini API and OpenAI API key pages for user-managed keys. |
| API | Reload clear | The reload control clears entered page state, including the key field. |
| Randomization | All-random | Randomizes major axes and starts generation immediately. |
| Randomization | v4.9.6 output-mode reroll | Output mode is rerolled during all-random when the output-mode section is not locked. |
| Randomization | Per-section random | Each major section can be randomized independently. |
| Randomization | Custom generation buttons | Custom fields include small generation buttons for fresh labels or ideas. |
| Locking | Section locks | Locked sections are protected from randomization and reset actions where applicable. |
| Modes | 14 public output modes | Non-long public modes are documented in the output-mode table below. |
| Characters | Character count controls | Add or remove character slots with plus/minus controls. |
| Characters | Manual character fields | Name, sex, role, personality, and notes can be edited per character. |
| Characters | Character randomization | Randomize current character content, or randomize count plus content. |
| Characters | Character sheet image import | Drop PNG/JPG/WEBP character sheets and convert visual information into character settings. |
| Intake | Universal Intake | Drop or paste text, Markdown, URLs, images, and local text files as story context. |
| Intake | Asset list | Added assets can be reviewed and cleared from the intake area. |
| News | Today's news keywords | Gemini search grounding can extract current Japanese news topics into creative seeds. |
| Style | Style analyzer | Analyze text and images into writing-style parameters. |
| Style | JSON export | Export style analysis as structured JSON for reuse in other AI writing workflows. |
| Style | Style rewrite | Rewrite generated output using the analyzed style while keeping the plot direction. |
| Output | Character counter | Output area shows current character count. |
| Output | Tags | Output tags show selected provider/model/mode and major generation axes. |
| Output | Copy | Copy generated text from the output area. |
| Output | Text export | Save generated text as a timestamped `.txt` file. |
| Progress | Thought log | Shows progress messages while API communication is running. |
| Progress | Score board | Displays generation/evaluation status when available. |
| Quality | Mode contracts | Each public mode receives a required output shape. |
| Quality | Paragraph density | v4.9.6 adds line-break guidance and post-formatting for readable prose blocks. |
| Quality | Long-mode seal | Long mode is excluded from public all-random and blocked from public generation entry. |

| 領域 | 機能 | 詳細 |
|---|---|---|
| API | Gemini / OpenAI 切り替え | リポジトリを変更せず、UI上でAPI提供元を切り替えます。 |
| API | ユーザー入力式キー | APIキーはブラウザで入力し、リポジトリやリリース成果物に含めません。 |
| API | キー取得リンク | ヘッダーからGemini APIとOpenAI APIのキー取得ページへ移動できます。 |
| API | リロードでクリア | リロード操作でAPIキー欄を含む入力状態を消します。 |
| ランダム | 全項目ランダム | 主要軸をまとめてランダム化し、そのまま生成します。 |
| ランダム | v4.9.6 出力モード再抽選 | 出力モードがロックされていない場合、全項目ランダムで出力モードも変わります。 |
| ランダム | セクション別ランダム | 各主要セクションだけを個別にランダム化できます。 |
| ランダム | カスタム欄生成 | カスタム入力欄には、候補を生成する小ボタンがあります。 |
| 固定 | セクションロック | ロックした欄はランダム化やリセットから保護されます。 |
| モード | 公開14出力モード | 非長編の公開対象モードを下の表で説明しています。 |
| 人物 | 人数調整 | プラス/マイナスで登場人物枠を増減できます。 |
| 人物 | 手動項目 | 名前、性別、役割、性格、メモを人物ごとに編集できます。 |
| 人物 | 人物ランダム | 現在人数のまま内容だけ、または人数込みで人物をランダム生成できます。 |
| 人物 | キャラクターシート画像 | PNG/JPG/WEBP画像から人物情報を読み取り、設定へ反映します。 |
| 素材 | 万能インプット | テキスト、Markdown、URL、画像、ローカルテキストを文脈として投入できます。 |
| 素材 | 素材一覧 | 追加した素材は一覧で確認・クリアできます。 |
| ニュース | 今日のニュースキーワード | Gemini検索グラウンディングで日本語ニュース話題を創作の種にできます。 |
| 作風 | 作風解析 | テキストや画像から文体パラメータを抽出します。 |
| 作風 | JSON出力 | 作風解析結果を外部AI文章ワークフロー向けJSONとして保存できます。 |
| 作風 | 作風リライト | 生成済み出力の筋を保ったまま、解析した文体で書き換えます。 |
| 出力 | 文字数表示 | 出力欄で現在の文字数を表示します。 |
| 出力 | タグ表示 | API、モデル、モード、主要軸をタグとして表示します。 |
| 出力 | コピー | 生成結果をコピーできます。 |
| 出力 | `.txt`保存 | タイムスタンプ付きテキストとして保存できます。 |
| 進捗 | 思考ログ | API通信中の進行メッセージを表示します。 |
| 進捗 | スコア表示 | 生成・評価の状態を必要に応じて表示します。 |
| 品質 | モード契約 | 公開モードごとに必須の出力形を指定します。 |
| 品質 | 改行密度 | v4.9.6で読みやすい段落分割の指示と整形を追加しました。 |
| 品質 | 長編封鎖 | 長編は公開全項目ランダムから除外し、公開生成入口もブロックしています。 |

## Public Output Modes / 公開出力モード

The public release targets 14 non-long modes. Each mode has a distinct output contract, not merely a label.

公開版では非長編14モードを対象にしています。各モードは単なる名前ではなく、出力の完成形を固定する契約を持ちます。

| Mode | Japanese label | Output contract |
|---|---|---|
| `4koma` | 4コマ漫画風 | Title plus panels 1-4, each with situation/image, dialogue, intent, and punchline. |
| `4koma_scenario` | AI 4koma シナリオ連携（STEP2） | `Topic`, `Logline`, `Location`, `Outfit`, `Punchline`, `Scenario`, and four panel blocks with emotion/camera/dialogue cues. |
| `short_short` | ショート（〜1000字） | 400-650 characters, up to four paragraphs, compact setup, turn, and lingering or surprising close. |
| `novel` | 短編小説（〜3000字） | 900-1500 characters, up to five paragraphs, scene flow through narration and dialogue, emotional or situational change near the end. |
| `medium` | 中編小説（〜4000字） | `タイトル:`, `第1節`, `第2節`, `第3節` in order, three-section one-shot fiction with richer scene movement. |
| `scenario` | 脚本/台本 | `タイトル:`, `登場人物:`, `場面:` plus stage directions and character-name dialogue. |
| `manga` | ストーリー漫画 | `タイトル:`, page labels, panel numbers, and `絵:`, `セリフ:`, `演出:` for each panel. |
| `essay` | エッセイ | Claim, observation or experience, reflection, and conclusion without escaping into incident-resolution fiction. |
| `poem` | 詩・ポエム | Title plus 8-20 poetic lines; no prose explanation block. |
| `fairy` | 童話/絵本 | Gentle narration, wish or problem, trial, and warm lesson; avoids adult suspense drift. |
| `letter` | 手紙/書簡体 | `宛先:`, `本文:`, `結び:`, `差出人:` and optional postscript. |
| `diary` | 日記/独白体 | `日付:`, `天気:`, `本文:` with first-person emotional change. |
| `documentary` | ドキュメンタリー | `タイトル:`, `ナレーション:`, `証言/インタビュー:`, `記録映像:`, `締め:`. |
| `radio` | ラジオドラマ | `タイトル:`, `登場人物:`, `BGM:`, `SE:` plus audio-first dialogue and sound cues. |

### Mode Behavior / モード別の動作

- Narrative modes prioritize setup, conflict, payoff, character function, scene motion, and emotional landing.
- Comedy and 4-panel modes emphasize expectation gaps, misdirection, reversal, and punchline timing.
- Script, manga, documentary, and radio modes prioritize readable labels and production-friendly units.
- Essay, poem, letter, and diary modes avoid forced foreshadowing when it would damage the form.
- v4.9.5 and v4.9.6 keep the selected mode from collapsing into ordinary prose.

- 物語系モードでは、導入、葛藤、回収、人物機能、シーンの動き、感情の着地を重視します。
- コメディ/4コマ系では、期待とのズレ、ミスリード、反転、オチのタイミングを重視します。
- 脚本、漫画、ドキュメンタリー、ラジオでは、制作に使いやすいラベルと単位を重視します。
- エッセイ、詩、手紙、日記では、形式を壊す無理な伏線を避けます。
- v4.9.5 と v4.9.6 では、選択モードが普通の散文へ崩れる問題を抑えています。

## Randomization System / ランダム化システム

### All-Random / 全項目ランダム

The all-random button randomizes major creative axes and starts generation immediately. In v4.9.6, output mode is also rerolled when the output-mode section is not locked. Long mode is excluded from the public all-random candidate set.

「全項目ランダム」は主要な創作軸をまとめてランダム化し、そのまま生成を開始します。v4.9.6では、出力モード欄がロックされていない場合、出力モードも再抽選されます。長編モードは公開版の全項目ランダム候補から除外しています。

### Independent Axes / 独立軸

| Axis | Role |
|---|---|
| Output mode | Decides final format and required labels. |
| Theme / seed | Provides premise, subject, incident, or topic. |
| Genre | Sets emotional and structural pressure. |
| Worldview | Sets setting logic, atmosphere, props, and social rules. |
| Target reader | Adjusts accessibility, density, tone, and genre literacy. |
| Era | Controls vocabulary, technology level, social background, and anachronism avoidance. |
| Ending type | Sets closure pattern, twist, open question, circular return, or emotional residue. |
| Narration | Sets viewpoint, voice, distance, and presentation style. |
| Characters | Supplies roles, relationships, personalities, and conflict engines. |
| Universal Intake | Adds external or pasted context. |
| Supplement | Adds user-specific constraints that do not fit the preset sections. |
| Style analysis | Adds extracted writing-style parameters for rewrite or guidance. |

### Locks / ロック

- Each major section has a lock button.
- Locked sections are skipped by randomization.
- Reset actions respect lock state where the section supports protection.
- Workflows such as "keep these characters and randomize everything else" or "keep this genre and test many output modes" are supported.
- Universal Intake can be locked so source materials survive full reset.

- 主要セクションにはロックボタンがあります。
- ロックされたセクションはランダム化対象から外れます。
- リセット操作も、保護対象セクションではロック状態を尊重します。
- 「人物だけ固定して他をランダム」「ジャンルだけ固定して複数出力モードを試す」といった運用ができます。
- 万能インプットは、全リセット時に素材を残すためのロックに対応しています。

## API Engine / APIエンジン

### Gemini / Gemini API

Gemini can be used for standard story generation, image-aware character sheet reading, Universal Intake image understanding, style analysis, and search-grounded news keyword extraction. Gemini model labels include Gemini 2.5 Flash, Gemini 2.5 Pro, Gemini Flash Latest, and Gemini Pro Latest.

Gemini は、通常の物語生成、キャラクターシート画像の読み取り、万能インプットの画像理解、作風解析、検索グラウンディングによるニュースキーワード取得に使えます。モデル表示は Gemini 2.5 Flash、Gemini 2.5 Pro、Gemini Flash Latest、Gemini Pro Latest に対応しています。

### OpenAI / OpenAI API

OpenAI can be used for text generation and style-sensitive prose drafting. The app keeps settings visible while switching providers, so users can compare output tendencies without rebuilding the entire prompt manually.

OpenAI は文章生成や文体重視の散文生成に使えます。API提供元を切り替えても設定内容は画面上に残るため、プロンプトを組み直さずに出力傾向を比較できます。

### Provider Switching / 提供元切り替え

- The `API切替` button switches Gemini/OpenAI selection while keeping current page inputs visible.
- The switch is useful when one provider is rate-limited or when the user wants to compare model tendencies.
- The app does not commit API keys, generated text, or settings back to the repository.
- The `リロード` button reloads the page and clears entered state.

- `API切替` ボタンは、現在ページ上にある入力内容を残したまま Gemini/OpenAI の選択を切り替えます。
- 一方の提供元で利用制限が出た場合や、モデルの出力傾向を比較したい場合に使えます。
- アプリはAPIキー、生成本文、設定内容をリポジトリへ書き戻しません。
- `リロード` ボタンはページを再読み込みし、入力状態をクリアします。

## Character System / 登場人物システム

### Character Count / 人数

The character section can start from zero characters or from a manually controlled count. Users can add or remove character slots, randomize content for the current count, or randomize both count and content for short-form work.

登場人物欄は0人からでも、手動で人数を指定しても使えます。人物枠は追加・削除でき、現在人数のまま内容だけをランダム化することも、短編向けに人数込みでランダム化することもできます。

### Character Fields / 人物項目

Each character card can include:

- name
- sex
- role
- personality
- notes or supplementary detail

各人物カードには次の情報を入れられます。

- 名前
- 性別
- 役割
- 性格
- メモや補足

### Character Function / 人物機能

Roles are treated as story functions, not just profile labels. A rival, helper, observer, victim, fixer, trickster, or narrator changes how the prompt assigns conflict, reaction, dialogue, and scene movement.

役割は単なるプロフィール名ではなく、物語上の機能として扱われます。ライバル、助力者、観測者、被害者、調整役、トリックスター、語り部などの違いが、葛藤、反応、会話、シーン移動に影響します。

### Character Sheet Image Import / キャラクターシート画像取り込み

Users can drop character sheet images into the dedicated character drop zone. When image understanding is available, the app reads visible character information such as appearance, expression, outfit, role hints, and written notes, then converts it into story-ready character settings. Multiple images are accepted.

専用のキャラクター画像ドロップ欄へキャラクターシート画像を入れられます。画像理解が使える場合、外見、表情、服装、役割の手がかり、シート上の文字情報などを読み取り、物語生成に使える人物設定へ変換します。複数画像にも対応しています。

## Universal Intake / 万能インプット

Universal Intake is a source-material pipeline. It lets users add external context without rewriting every field by hand.

万能インプットは、外部素材を物語文脈として投入するための仕組みです。すべての欄を手で書き直さなくても、素材を生成条件へ足せます。

### Supported Source Types / 対応素材

| Source type | Behavior |
|---|---|
| Plain text | Directly added as source context. |
| Markdown | Keeps headings and structured notes useful for prompts. |
| `.txt` / `.md` files | Reads local text files into the asset list. |
| URL | Adds web source text where supported by the current workflow. |
| Image | Uses image understanding where available. |
| Multiple assets | Combines several materials with the selected settings. |

### Intake Controls / 取り込み操作

- Drag and drop images, URLs, text files, or text snippets.
- Paste directly into the intake zone.
- Enter a URL or text into the input row and press Enter or the plus button.
- Clear the intake list.
- Lock the intake section to keep materials during full reset.

- 画像、URL、テキストファイル、テキスト断片をドラッグ&ドロップできます。
- 取り込み欄へ直接貼り付けられます。
- 入力行にURLやテキストを入れ、Enterまたはプラスボタンで追加できます。
- 素材一覧をクリアできます。
- 万能インプット欄をロックし、全リセット時にも素材を残せます。

## Today's News Keyword Assist / 今日のニュースキーワード

When a valid Gemini key is active, the app can use Gemini search grounding to collect current Japanese news topics and turn them into story-seed keywords. The purpose is creative grounding, not news reporting. The generated keywords should be treated as inspiration that may need human verification before factual use.

有効なGeminiキーがある場合、Gemini検索グラウンディングを使って現在の日本語ニュース話題を取得し、物語の種になるキーワードへ変換できます。目的は創作上の接地であり、報道内容の保証ではありません。事実として使う場合は人間側で確認してください。

## Style Analyzer And Rewrite / 作風解析とリライト

The Style Analyzer is an experimental but public UI section placed below the main output. It can run before story generation or after output exists.

作風解析は、メイン出力欄の下にある実験的な公開UIセクションです。ストーリー生成前にも、生成後にも使えます。

### Style Analyzer / 作風解析

The analyzer accepts text, Markdown, plain text files, and images. It extracts style parameters such as:

- rhetorical patterns
- sentence rhythm
- vocabulary level
- description focus
- dialogue style
- emotional architecture
- tonal density
- visual tone from images
- color, composition, and lighting hints when images are used

作風解析は、テキスト、Markdown、プレーンテキストファイル、画像を受け付けます。抽出対象は次のような文体パラメータです。

- 修辞パターン
- 文のリズム
- 語彙レベル
- 描写の焦点
- 会話の傾向
- 感情設計
- トーンの濃度
- 画像から読み取る視覚トーン
- 画像使用時の色彩、構図、照明の手がかり

### Analyzer Outputs / 解析結果

- Human-readable analysis can be copied.
- Structured JSON can be saved for AI writing workflows.
- The JSON is designed for reuse in other prompt-based writing or manga-planning tools.
- The analyzer can complete all fields aggressively even when the provided material is short or image-only.

- 人間が読める解析テキストをコピーできます。
- AI文章ワークフロー向けの構造化JSONを保存できます。
- JSONは、他のプロンプト型文章生成・漫画設計ツールで再利用しやすい形式です。
- 入力素材が短い、または画像のみの場合でも、AIが不足項目を補完して解析を出します。

### Style Rewrite / 作風リライト

After story output exists and style analysis has completed, the rewrite function applies the extracted style to the generated text. It aims to preserve the plot direction and structural beats while changing voice, rhythm, diction, sensory focus, and tone.

ストーリー出力があり、作風解析が完了している場合、リライト機能で解析した作風を生成本文へ反映できます。筋の方向性と構成の骨格を保ちながら、語り口、リズム、語彙、感覚描写、トーンを変えることを目的とします。

## Local Detail Injection / ローカル辞書によるディテール注入

Story Maker includes local guide data for genre, worldview, ending, and narration. These guides keep presets from becoming mere labels. For example, choosing a genre or ending type can inject specific writing pressure, scene logic, or structural reminders into the prompt.

Story Maker には、ジャンル、世界観、結末、語り口などに対応するローカルガイドデータがあります。プリセット名をただのラベルにせず、選択内容に応じた文体圧、シーン論理、構造上の注意をプロンプトへ入れます。

### Detail Categories / ディテール分類

- Genre style guides: comedy, serious drama, romance, horror, action, human drama, suspense, fantasy, science fiction, and related modes.
- Worldview guides: present-day settings, schools, offices, shopping streets, islands, fantasy worlds, future cities, closed spaces, and other setting types.
- Era guides: vocabulary and technology constraints for present, recent past, historical, fantasy, or future settings.
- Ending guides: twist, return, sacrifice, unresolved question, circular close, dreamlike close, and other closure patterns.
- Narration guides: viewpoint, distance, documentary tone, radio tone, letter voice, and other presentation styles.

- ジャンルガイド: コメディ、シリアス、恋愛、ホラー、アクション、ヒューマンドラマ、サスペンス、ファンタジー、SFなど
- 世界観ガイド: 現代、学校、職場、商店街、孤島、異世界、未来都市、密室など
- 時代ガイド: 現代、近過去、歴史、ファンタジー、未来に応じた語彙・技術水準の制御
- 結末ガイド: 反転、帰還、犠牲、問い残し、円環、夢のような終わり方など
- 語り口ガイド: 視点距離、ドキュメンタリー調、ラジオ調、手紙文体など

## Narrative Engineering / 物語設計

Story Maker's prompt stack uses several narrative-engineering methods from older README versions and current code paths. These are not one-off phrases; they are recurring design rules that help the selected output avoid generic summaries.

Story Maker のプロンプト層には、旧READMEから継続している物語設計メソッドと現行コードの制御が入っています。これは単発の飾り文句ではなく、AI出力が汎用的なあらすじに寄りすぎるのを防ぐための設計ルールです。

### Anti-Repetition Engine / 反復防止

The app asks the model to avoid the most obvious genre route, connect the selected theme indirectly, and let character personality produce different reactions. This reduces repeated "template" stories where the same premise only changes names.

アプリは、ジャンルの最も安直な展開を避け、選択テーマを間接的につなぎ、人物の性格差から反応を変えるよう促します。名前だけ違う同型テンプレート物語を減らすための基本方針です。

### Emotion Gap Design / 感情落差設計

Emotion gaps create surprise by separating expectation from result, appearance from truth, spoken words from hidden emotion, desire from consequence, confidence from failure, or seriousness from comedy.

感情落差は、期待と結果、見た目と真相、言葉と本心、欲望と結果、自信と失敗、深刻さと笑いの差から驚きを作ります。

### Motif Recurrence / モチーフ回帰

Small props, phrases, gestures, weather, colors, or repeated actions can return later with changed meaning. The goal is payoff, not decoration.

小道具、言葉、仕草、天気、色、反復行動などを後半で意味を変えて戻します。目的は装飾ではなく回収です。

### Emotion Curve / 感情曲線

Narrative modes are encouraged to move through a clear emotional curve: setup, pressure, misread, turn, cost, action, and residue. This helps avoid flat summaries.

物語系モードでは、導入、圧、誤読、転換、代償、行動、余韻へ感情が動くよう促します。平板な説明で終わるのを避けるためです。

### Scene Dynamics & Physicality / シーン駆動と身体性

Scenes should move through action, object handling, body position, distance, sound, smell, and touch instead of only abstract explanation.

シーンは抽象説明だけで進めず、行動、物の扱い、身体の位置、距離、音、匂い、触覚で動かします。

### Tone Variation / 文体緩急

The prompt stack can ask for varied tempo: short lines at impact points, longer reflective lines after action, and controlled pauses around emotional turns.

プロンプトは、衝撃点では短く、行動後は少し長く、感情の転換部では間を置くなど、文体のテンポ差を求めます。

### Knowledge Boundary / 知識境界

Characters should not know information they have not observed, heard, inferred, or been told. This is especially important for mystery, suspense, documentary, and dialogue-heavy modes.

人物は、見ていない、聞いていない、推測できない、伝えられていない情報を知っているように振る舞うべきではありません。ミステリー、サスペンス、ドキュメンタリー、会話中心モードで特に重要です。

### Show, Do Not Merely Explain / 説明だけにしない描写

The app favors visible behavior and concrete details over abstract declarations. It should show someone gripping a receipt, avoiding eye contact, or stepping out of the queue rather than only saying "she was anxious."

抽象的な宣言より、見える行動と具体物を重視します。「彼女は不安だった」とだけ言うのではなく、レシートを握る、目を逸らす、列から一歩外れるといった動作で見せる方向です。

## Quality Gates / 品質ゲート

The app uses prompt-side and display-side quality controls. These controls are meant to keep public modes in their expected shapes and prevent unreadable output.

アプリは、プロンプト側と表示側の品質制御を使います。公開モードが期待形式から外れたり、読みにくい出力になったりすることを抑えるためです。

### Mode Contract / モード契約

v4.9.5 introduced explicit output-mode contracts for all public non-long modes. v4.9.6 keeps that contract and also adds paragraph-density guidance. This means "4コマ" should not become a normal short story, "ラジオドラマ" should not become prose without sound cues, and "日記" should not become third-person narration.

v4.9.5で非長編全モードの明示的な出力形式契約を追加しました。v4.9.6ではその契約を維持し、さらに改行密度の指示を追加しています。これにより、「4コマ」が普通の短編になったり、「ラジオドラマ」が音のない散文になったり、「日記」が三人称小説になったりする崩れを抑えます。

### Paragraph Readability / 改行の読みやすさ

v4.9.6 adds guidance and cleanup so prose is not packed into one long block. For prose modes, the app encourages paragraph breaks around time, place, emotional, and action shifts. For structured modes, it separates labels, panels, pages, verse lines, dates, addressees, narration, BGM, and SE into readable units.

v4.9.6では、本文が長い一塊にならないよう、改行指示と整形を追加しています。散文系モードでは、時間、場所、感情、行動の切れ目で段落を分けるよう促します。構造系モードでは、ラベル、コマ、ページ、詩行、日付、宛先、ナレーション、BGM、SEなどを読みやすい単位に分けます。

### Public Long-Mode Seal / 公開長編モード封鎖

Long-novel mode remains present historically in the repository, but it is not treated as a public feature in this release. The public mode list excludes it, all-random selection excludes it, and generation entry is blocked when long-mode labels are detected. Historical long-mode implementation details are intentionally not promoted in this README while the mode is suspended.

長編モードは履歴上リポジトリに存在しますが、このリリースでは公開機能として扱いません。公開モード一覧から除外し、全項目ランダムから除外し、長編ラベルが検出された場合は生成入口で止めます。公開停止中のため、長編の実装詳細はこのREADMEで機能紹介として宣伝しません。

## Output And Export / 出力と保存

### Output Display / 出力表示

The output panel shows generated text, character count, active tags, provider/model tags, and mode-related tags. The panel keeps the main text selectable so users can copy or inspect output manually.

出力パネルには、生成本文、文字数、選択タグ、API/モデルタグ、モード関連タグを表示します。本文は選択可能で、ユーザーが手動でコピーや確認をできます。

### Copy And Text Export / コピーとテキスト保存

- The main output can be copied.
- The main output can be saved as `.txt`.
- Style analysis text can be copied.
- Style analysis JSON can be saved.
- Style rewrite output can be copied or saved as `.txt`.
- Export filenames use local timestamp-style naming so repeated outputs remain sortable.

- メイン出力はコピーできます。
- メイン出力は `.txt` として保存できます。
- 作風解析テキストはコピーできます。
- 作風解析JSONは保存できます。
- 作風リライト結果はコピーまたは `.txt` 保存できます。
- 出力ファイル名はローカル時刻ベースのタイムスタンプ形式を使い、複数回保存しても並べやすいようにしています。

## System Feature Specifications / システム機能仕様

### 1. Header And API Controls / ヘッダーとAPI操作

- Displays app name and version.
- Shows API status.
- Accepts Gemini or OpenAI API key input.
- Provides save/edit buttons for the current page input.
- Provides provider switching.
- Provides reload clearing.
- Links to API key creation pages.
- Shows progress and waiting notices during API communication.

- アプリ名とバージョンを表示します。
- API状態を表示します。
- GeminiまたはOpenAIのAPIキー入力欄を持ちます。
- 現在ページ上の入力に対する保存/編集ボタンがあります。
- API提供元切り替えボタンがあります。
- リロードによるクリア操作があります。
- APIキー取得ページへのリンクがあります。
- API通信中の進捗や待機案内を表示します。

### 2. Settings Panel / 設定パネル

- Fixed top area: all-random, full reset, and generate button.
- Scrollable settings area: output mode, theme, characters, genre, worldview, target reader, era, ending, narration, Universal Intake, and supplement.
- Each section uses chips, custom inputs, random buttons, lock buttons, and clear buttons where appropriate.

- 固定上部には、全項目ランダム、全リセット、生成ボタンがあります。
- スクロール領域には、出力モード、テーマ、登場人物、ジャンル、世界観、読者層、時代、結末、語り口、万能インプット、補足メモがあります。
- 各セクションは必要に応じて、チップ、カスタム入力、ランダム、ロック、クリアを持ちます。

### 3. Output Mode Section / 出力モード欄

- Shows public mode chips.
- Provides random mode selection.
- Provides custom output format input.
- Supports lock and clear.
- v4.9.6 all-random changes this section only when it is unlocked.

- 公開出力モードのチップを表示します。
- 出力モード単体のランダム選択ができます。
- プリセット外の形式をカスタム入力できます。
- ロックとクリアに対応しています。
- v4.9.6の全項目ランダムでは、この欄が未ロックの時だけ出力モードを変更します。

### 4. Theme / Seed Section / テーマ・シード欄

- Supports category chips and sub-chips.
- Supports custom theme input.
- Supports random seed generation.
- Supports today's-news keyword assist when Gemini search grounding is available.
- Can be locked to preserve a premise while other axes change.

- カテゴリチップとサブチップに対応します。
- カスタムテーマを入力できます。
- ランダムな物語の種を生成できます。
- Gemini検索グラウンディングが使える場合、今日のニュースキーワード補助を使えます。
- 前提だけ固定して他の軸を変えるためにロックできます。

### 5. Character Section / 登場人物欄

- Supports manual count.
- Supports add/remove.
- Supports character sheet image drop.
- Supports multiple image selection.
- Supports content random and count-plus-content random.
- Treats entered characters as important context for generation.

- 手動人数に対応します。
- 人物の追加/削除に対応します。
- キャラクターシート画像のドロップに対応します。
- 複数画像選択に対応します。
- 内容ランダムと人数＋内容ランダムに対応します。
- 入力された人物を生成上の重要文脈として扱います。

### 6. Genre, Worldview, Target, Era, Ending, Narration / ジャンル・世界観・読者層・時代・結末・語り口

These sections provide the core creative pressure. Each can use category chips, sub-chips, custom text, random generation, lock, and clear. They are independent enough that a user can combine unexpected axes, such as a documentary voice with a fantasy worldview, or a radio drama format with a mystery ending.

これらの欄は創作圧の中心です。カテゴリチップ、サブチップ、カスタム入力、ランダム、ロック、クリアを使えます。それぞれ独立しているため、ファンタジー世界観にドキュメンタリー調、ミステリー結末にラジオドラマ形式のような組み合わせができます。

### 7. Universal Intake Section / 万能インプット欄

- Accepts images, URLs, text snippets, and `.txt` / `.md` files.
- Supports paste.
- Supports direct input row.
- Shows asset list.
- Supports clear.
- Supports lock against full reset.

- 画像、URL、テキスト断片、`.txt` / `.md` ファイルを受け付けます。
- 貼り付けに対応します。
- 直接入力行に対応します。
- 素材一覧を表示します。
- クリアできます。
- 全リセットから守るロックに対応します。

### 8. Supplement Section / 補足メモ欄

The supplement field is for explicit user constraints that do not fit other sections, such as "include a scene where the protagonist laughs at the end", "use Kansai dialect", "make the final line quiet", or "avoid romance".

補足メモ欄は、他の欄に入れにくい明示条件を入れる場所です。例として、「最後に主人公が笑う場面を入れて」「関西弁を使って」「最後の一文は静かに」「恋愛には寄せない」などを指定できます。

### 9. Progress Window / 進捗・思考ログ欄

The progress window is always present near the top of the app. It gives users visible feedback while API communication is running, including waiting notices and progress text.

進捗欄はアプリ上部に常設されています。API通信中に、待機案内や進捗テキストを表示し、処理中であることをユーザーに伝えます。

### 10. Style Analyzer Section / 作風解析欄

- Lives below the main output.
- Can run before story generation.
- Accepts text and images.
- Can clear all analysis inputs.
- Can add direct text.
- Can run analysis through the selected API workflow.
- Can copy readable analysis.
- Can save structured JSON.
- Can rewrite generated story text using the analysis.
- Can copy or save rewrite output.

- メイン出力の下にあります。
- ストーリー生成前にも使えます。
- テキストと画像を受け付けます。
- 解析用入力を全クリアできます。
- 直接入力した文章を追加できます。
- 選択中のAPIワークフローで解析できます。
- 読める解析テキストをコピーできます。
- 構造化JSONを保存できます。
- 解析結果を使って生成済み本文をリライトできます。
- リライト結果をコピーまたは保存できます。

## Verification And Public Safety Checks / 検証と公開安全チェック

Before public-facing release work, the repository should be checked for:

- build success
- lint script availability
- Markdown encoding
- README mojibake markers
- accidental API-key-like strings
- public wording that over-explains non-user-facing implementation details
- tag and release body bilingual text
- release notes that explain user-facing changes without exposing internal implementation labels
- long-mode promotional text, which should remain absent while the mode is suspended

公開向けリリース作業では、次を確認します。

- build 成功
- lint script の有無
- Markdown の文字化け
- README の文字化け痕跡
- APIキーらしき文字列の混入
- 内部補助の詳細が分かる公開文言
- tag と release body の英日併記
- ユーザー向け変更を説明しつつ内部実装ラベルを出しすぎないリリースノート
- 公開停止中の長編を宣伝する文言が残っていないこと

## Local Development / ローカル開発

```powershell
cd C:\Users\sx717\Antigravity\story-maker
npm install
npm run dev -- --host 127.0.0.1 --port 5179
```

Open:

```text
http://127.0.0.1:5179/
```

Build:

```powershell
npm run build
```

Preview build:

```powershell
npm run preview
```

## Deployment / デプロイ

The app is a static Vite project. GitHub Pages deployment can be run with:

```powershell
npm run deploy
```

The deploy script builds the app and publishes the `dist` directory through `gh-pages`.

このアプリは静的なViteプロジェクトです。GitHub Pagesへは次でデプロイできます。

```powershell
npm run deploy
```

デプロイスクリプトはアプリをビルドし、`dist` ディレクトリを `gh-pages` 経由で公開します。

## Tech Stack / 技術スタック

- Vanilla JavaScript
- Vite
- CSS
- Static HTML
- Google Gemini API
- OpenAI API
- Gemini image understanding where available
- Gemini search grounding where available
- GitHub Pages for static hosting

- Vanilla JavaScript
- Vite
- CSS
- 静的HTML
- Google Gemini API
- OpenAI API
- 利用可能な場合のGemini画像理解
- 利用可能な場合のGemini検索グラウンディング
- 静的ホスティングとしてのGitHub Pages

## Compliance And Legal Stance / 法務・権利に関する考え方

### Purpose / 目的

Story Maker is intended as a creative writing support tool. It helps users create original story ideas, drafts, scripts, and style experiments.

Story Maker は創作支援ツールです。ユーザーがオリジナルの物語案、下書き、脚本、作風実験を作ることを支援します。

### Prohibited Uses / 禁止用途

Do not use this app to:

- infringe copyrights, trademarks, publicity rights, privacy rights, or other rights
- reproduce protected works in a way that violates applicable law or platform rules
- impersonate real people or organizations in harmful or misleading ways
- generate harassment, threats, non-consensual sexual content, or illegal instructions
- upload or paste API keys, private credentials, billing data, or sensitive personal data into public spaces

このアプリを次の用途に使わないでください。

- 著作権、商標権、肖像権、プライバシー権、その他の権利の侵害
- 適用法令やプラットフォーム規約に反する保護作品の再現
- 実在の人物や組織になりすます有害・誤認的な利用
- 嫌がらせ、脅迫、同意のない性的内容、違法行為の手順生成
- APIキー、秘密資格情報、課金情報、機微な個人情報を公開空間へ貼る行為

### Responsibility And Ownership / 責任と権利

Users are responsible for reviewing generated output before publication or commercial use. Generated text may contain mistakes, unintentional similarity, factual errors, or unsuitable expressions. Users should verify rights, facts, and suitability for their own use case.

生成結果を公開または商用利用する前に確認する責任はユーザーにあります。生成文には、誤り、意図しない類似、事実誤認、不適切表現が含まれる場合があります。権利、事実、用途適合性はユーザー自身で確認してください。

### Disclaimer / 免責

This project is provided as a creative tool without warranty. API availability, provider terms, model behavior, browser behavior, and hosting behavior may change.

このプロジェクトは保証なしの創作ツールとして提供されます。APIの利用可否、提供元規約、モデル挙動、ブラウザ挙動、ホスティング挙動は変わる可能性があります。

### Infringement And Takedown / 権利侵害への対応

If a generated sample, documentation text, or repository asset appears to infringe rights, report it through the repository issue or contact path with enough information to identify the affected material.

生成サンプル、ドキュメント、リポジトリ内素材が権利侵害に見える場合は、該当箇所を特定できる情報を添えて、リポジトリのIssueなどから連絡してください。

### Changes / 変更

The project may change UI, prompts, model support, wording, release notes, or public feature scope without prior notice.

UI、プロンプト、対応モデル、文言、リリースノート、公開機能範囲は予告なく変更される場合があります。

### Governing Law / 準拠法

Unless otherwise required by applicable mandatory law, this project is described and maintained under the assumption of Japanese law for public documentation purposes.

強行法規により別段の扱いが必要な場合を除き、このプロジェクトの公開文書は日本法を前提として記述・管理します。

## Integrated Ecosystem / 関連ワークフロー

Story Maker can be used as an upstream idea and text generator for surrounding creative workflows:

- manga plot drafting
- four-panel scenario planning
- character sheet writing
- prose drafting
- radio/audio drama drafting
- documentary-style narration
- style analysis and style transfer experiments
- JSON-based style reuse in other AI writing tools

Story Maker は、周辺の創作ワークフローに対する上流のアイデア・文章生成ツールとして使えます。

- 漫画プロット作成
- 4コマシナリオ設計
- キャラクターシート文章化
- 散文下書き
- ラジオ/音声ドラマ下書き
- ドキュメンタリー調ナレーション
- 作風解析と文体転写の実験
- JSONによる作風データの他AI文章ツールへの再利用

## Changelog / 変更履歴

### v4.9.6 (2026-06-08)

- Fixed all-random so output mode is rerolled when the mode section is unlocked.
- Excluded long mode from public all-random selection.
- Added paragraph-density guidance and cleanup for non-long output modes.
- Preserved locked sections during all-random.
- Restored a full README structure with API safety, feature coverage, mode coverage, development, deployment, legal stance, and release history.
- Reworded public documentation so release notes focus on user-facing changes while keeping the API safety explanation visible.

- 出力モード欄が未ロックの場合、全項目ランダムで出力モードも再抽選されるよう修正。
- 公開版の全項目ランダムから長編モードを除外。
- 非長編出力モードに改行密度の指示と整形を追加。
- 全項目ランダム時にロック済みセクションを保持。
- API安全性、機能網羅、モード説明、開発、デプロイ、法務、変更履歴を含む詳細READMEへ復元。
- API安全性の説明は残しつつ、ユーザー向け変更に焦点が当たる公開文言へ整理。

### v4.9.5 (2026-06-07)

- Added non-long output-mode format contracts for all public modes.
- Prevented `4koma` from falling back into ordinary prose.
- Added strict labels and output shapes for 4koma scenario, script, manga, letter, diary, documentary, and radio modes.
- Kept long mode sealed and excluded.

- 非長編の全公開モードへ出力形式契約を追加。
- `4koma` が普通の散文へ崩れる問題を抑止。
- 4コマシナリオ、脚本、漫画、手紙、日記、ドキュメンタリー、ラジオで必須ラベルと完成形を固定。
- 長編モードは封鎖・除外を継続。

### v4.9.4 (2026-06-07)

- Sealed long-novel mode from public entry after verification showed it did not meet the release-quality bar.
- Disabled visible long-mode chip entry and blocked custom long labels at generation start.
- Redirected long selection back to supported short or medium modes.

- 検証の結果、長編モードが公開品質基準を満たさないため公開入口を封鎖。
- 表示上の長編チップとカスタム長編指定を生成開始時にブロック。
- 長編選択時は短編・中編などの対応モードへ戻す扱いに変更。

### v4.9.3 (2026-06-07)

- Historical long-mode hardening release.
- Added chapter planning and continuity safeguards for the suspended long-mode path.
- Not promoted as a current public feature.

- 長編経路に対する履歴上の補強リリース。
- 章設計と連続性維持のための制御を追加。
- 現在の公開機能としては紹介しません。

### v4.9.2 (2026-06-07)

- Historical long-mode correction release.
- Reduced false positives around ordinary store, receipt, invoice, package, customer, and storefront prose in the suspended path.

- 長編経路に対する履歴上の補正リリース。
- 店舗、レシート、納品書、包装、客、店先などの通常描写に対する過検出を低減。

### v4.9.1 (2026-06-07)

- Historical genre-dominance correction.
- Kept selected genre from being overwritten by local setting assumptions in the suspended path.

- ジャンル主導性に関する履歴上の補正。
- 選択ジャンルが舞台条件に吸われすぎる問題を抑制。

### v4.9.0 (2026-06-07)

- Historical selected-genre payoff correction.
- Strengthened setup-to-payoff behavior for the suspended long-mode path.

- 選択ジャンルの回収に関する履歴上の補正。
- 公開停止中の長編経路で、導入から回収へつなげる制御を補強。

### v4.8.x (2026-06-07)

- Historical long-mode stabilization series.
- Focused on continuation growth, repeated-block collapse, route drift reduction, selected-genre preservation, and false-positive filtering.
- Details are intentionally summarized while long mode remains suspended, because the public README should not advertise long-mode implementation as a supported feature.

- 長編安定化に関する履歴上の連続リリース。
- 継続本文の増加、重複ブロック抑制、逸脱ルート低減、選択ジャンル維持、過検出の抑制を扱いました。
- 長編モードは公開停止中のため、内部実装詳細は公開機能紹介としては展開しません。

### v4.7.x (2026-06-07)

- Historical long-mode guard series.
- Added additional output cleanup, continuity, completion, and route-control safeguards for the suspended long-mode path.

- 長編ガードに関する履歴上の連続リリース。
- 公開停止中の長編経路に対し、出力整形、連続性、完了、ルート制御の補強を追加。

### v4.6.x (2026-06-06 to 2026-06-07)

- Historical long-mode quality-control series.
- Added more detailed detection of off-route story material and unsupported route drift.
- Preserved as release history, not as a current public feature promise.

- 長編品質制御に関する履歴上の連続リリース。
- 逸脱素材や不適切な方向への寄り道検出を強化。
- 現在の公開機能保証ではなく、リリース履歴として保持。

### v4.5.x (2026-06-06)

- Historical long-mode and consistency-control series.
- Improved cleanup around repeated body text, incomplete endings, and continuity artifacts in the suspended path.

- 長編および整合性制御に関する履歴上の連続リリース。
- 反復本文、不完全な終端、連続性由来の不要断片に対する処理を改善。

### v4.4.x (2026-06-06)

- Historical route-control and quality-gate series.
- Strengthened detection of unsupported props, setting drift, and non-prose fragments in the suspended path.

- ルート制御と品質ゲートに関する履歴上の連続リリース。
- 不適切な小道具、設定逸脱、本文ではない断片の検出を強化。

### v4.3.x (2026-06-05 to 2026-06-06)

- Historical long-mode generation and export refinements.
- Improved manuscript output handling, footer/version alignment, and cleanup around control labels.

- 長編生成と出力に関する履歴上の改善。
- 原稿出力、フッター/バージョン整合、制御ラベル除去を改善。

### v4.2.x (2026-06-05)

- Improved provider-accurate model display for Gemini and OpenAI paths.
- Unified narrative-method injection across standard and historical long-mode paths.
- Added additional management-block cleanup in the historical long-mode path.

- Gemini/OpenAI経路で、提供元に合ったモデル表示を改善。
- 標準生成と履歴上の長編経路で、物語設計メソッド注入を統一。
- 履歴上の長編経路で管理ブロック除去を強化。

### v4.1.x (2026-06-04 to 2026-06-05)

- Historical cleanup series for chapter-control labels and non-prose fragments.
- Added broader artifact classifiers and output cleanup in the historical long-mode path.

- 章制御ラベルや本文ではない断片の除去に関する履歴上の連続リリース。
- 履歴上の長編経路で、分類器と出力クリーニングを拡張。

### v4.0.x (2026-06-03 to 2026-06-04)

- Introduced and iterated the long-form generation foundation that is now suspended from public feature promotion.
- Added early consistency, cleanup, and export controls.
- Public documentation now keeps these as historical notes rather than current public feature claims.

- 現在は公開機能紹介から外している長編生成基盤を導入・反復。
- 初期の整合性、クリーニング、出力制御を追加。
- 現在の公開文書では、これらを現行公開機能ではなく履歴として扱います。

### v3.9.x and earlier / v3.9以前

- Earlier versions built the core story generator, randomization, mode system, character controls, style guide foundations, and static deployment workflow.
- See GitHub tags, releases, and commit history for older granular release entries.

- 初期バージョンでは、物語生成、ランダム化、モードシステム、人物制御、スタイルガイド基盤、静的デプロイ手順を構築しました。
- さらに細かな過去履歴はGitHubのタグ、リリース、コミット履歴を参照してください。
