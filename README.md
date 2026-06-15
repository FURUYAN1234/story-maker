# Story Maker v5.0.7 / AI物語メーカー

Story Maker is a static web application for generating creative text with Google Gemini API or OpenAI API, including standard short-form outputs and a beta workflow that expands completed Output into a long-form manuscript. It is not a plain prompt box. It combines output mode, theme, genre, worldview, audience, era, ending style, narration, characters, source material, optional image input, and optional style analysis into a structured generation contract.

Story Maker は、Google Gemini API または OpenAI API を使って創作文を生成する静的Webアプリです。通常の短中編出力に加え、完成した Output を長編原稿へ拡張するβワークフローも備えています。単なるプロンプト入力欄ではなく、出力モード、テーマ、ジャンル、世界観、読者層、時代、結末、語り口、登場人物、素材入力、画像入力、作風解析を組み合わせて、生成用の契約を組み立てます。

## API Key Safety / APIキーの安全性

API keys are entered by the user in the browser UI. The repository, README, release notes, release assets, and public static files must not contain API keys, private credentials, billing data, or personal secrets.

APIキーはユーザーがブラウザUIへ入力します。リポジトリ、README、リリースノート、リリース成果物、公開静的ファイルには、APIキー、秘密資格情報、課金情報、個人的な秘密情報を含めてはいけません。

API keys are sent only to the selected provider when an API request is made for generation, image understanding, style analysis, or news-grounded keyword assistance. Story Maker does not send API keys to the repository, issue tracker, release system, documentation, or unrelated external services.

APIキーは、生成、画像理解、作風解析、ニュース接地キーワード補助などで必要なAPIリクエストを行う時だけ、選択中のAPI提供元へ送信されます。Story Maker は、APIキーをリポジトリ、Issue、リリース管理、公開文書、無関係な外部サービスへ送信しません。

Do not paste API keys into issues, pull requests, release notes, screenshots, public documents, or chat logs.

APIキーを Issue、Pull Request、リリースノート、スクリーンショット、公開文書、チャットログへ貼らないでください。

## Core Concept / 基本コンセプト

The app builds a generation request from multiple visible axes instead of relying on one free-form prompt. The goal is to move generated stories away from the similar, overly neat, AI-like patterns that often appear by default, and toward outputs that at least pursue a decent level of interestingness through concrete conflict, timing, texture, and mode-specific endings.

このアプリは、自由入力だけに頼らず、複数の見える創作軸から生成リクエストを組み立てます。狙いは、AI特有の似たり寄ったりで整いすぎたストーリーから離れ、短時間の生成でも、具体的な葛藤、間、手触り、モードごとの締めによって、そこそこ面白いところを追求することです。

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

### How Request Assembly Works / 生成条件の組み立て

Story Maker treats each visible selection as a separate creative constraint. The final request is assembled from the selected output form, the story seed, the genre pressure, the setting logic, the audience level, the era, the ending shape, the narrative voice, the characters, the universal input, and any style-analysis result. This makes the request easier to inspect than one large hidden prompt.

Story Maker は、画面上の各選択を別々の創作条件として扱います。最終リクエストは、出力形式、物語の種、ジャンル圧、舞台論理、読者層、時代、結末型、語り口、登場人物、万能インプット、作風解析結果を組み合わせて作られます。巨大な隠しプロンプト一つに任せるより、どの条件が効いているかを確認しやすくするためです。

The intent is not to force every work into the same template. The contract tells the model what shape must be preserved, while the selected axes decide the content, conflict, tone, and texture.

目的は、すべての作品を同じ型へ押し込むことではありません。契約は守るべき形を指定し、選択軸が内容、葛藤、トーン、質感を決めます。

## Feature Map / 機能マップ

| Area | Feature | Details |
|---|---|---|
| API | Gemini / OpenAI switching | Switch the selected provider from the UI while keeping the visible creative settings. |
| API | Runtime key entry | API keys are typed into the browser UI by the user and must not be committed or published. |
| API | Provider links | Header links help the user reach Gemini API and OpenAI API key pages. |
| Generation | 14 public output modes | Each public mode has its own expected structure and cleanup behavior. |
| Generation | Selected-mode priority | The selected output chip wins over incidental words inside prompts or source material. |
| Generation | Long-form expansion beta | Expands an existing Output manuscript into a chaptered long-form draft, then can brush it up from AI review feedback. |
| Randomization | All-random | Randomizes the visible creative axes and starts generation immediately. |
| Randomization | Per-section random | Individual sections can be randomized without changing the whole request. |
| Locking | Section locks | Locked sections are protected from randomization and reset where applicable. |
| Characters | Character count controls | Add or remove character slots with plus/minus controls. |
| Characters | Manual character fields | Name, sex, role, personality, and notes can be edited per character. |
| Characters | Character randomization | Randomize current character content, or randomize count plus content. |
| Characters | Character sheet image import | Drop PNG/JPG/WEBP character sheets and convert visible traits into character settings. |
| Intake | Universal Input | Add text, Markdown, URLs, local text files, and images as story context. |
| Intake | Asset list | Added materials can be reviewed and cleared from the intake area. |
| News | News keywords | Gemini search grounding can turn current Japanese news topics into creative seeds. |
| Style | Style analyzer | Analyze text or images into writing-style parameters. |
| Style | JSON export | Export style analysis as structured JSON for external writing workflows. |
| Style | Style rewrite | Rewrite generated output using the analyzed style while keeping the plot direction. |
| Output | Character counter | Output area shows current character count. |
| Output | Tags | Output tags show selected provider/model/mode and major generation axes. |
| Output | Copy and text export | Generated text can be copied or exported as a timestamped `.txt` file. |
| Progress | Thought log | Shows progress messages while API communication is running. |
| Quality | Mode contracts | Each public mode receives a required output shape. |
| Quality | Short-draft rewrite | Too-short public drafts are rewritten before they are accepted as final output. |
| Quality | Long-form AI review | Longification and brush-up results receive an AI score, pass/fail label, and concrete revision directions. |
| Quality | Final cleanup | Prompt artifacts, stale completion markers, and unreadable endings are cleaned before display. |
| Quality | Completion gates | Mode-specific endings such as final 4-koma scenario aim and documentary closing labels are checked or restored. |

| 領域 | 機能 | 詳細 |
|---|---|---|
| API | Gemini / OpenAI 切り替え | 画面上の創作設定を保ったまま、利用するAPI提供元を切り替えます。 |
| API | 実行時キー入力 | APIキーはユーザーがブラウザUIへ入力し、リポジトリや公開物へ含めません。 |
| API | キー取得リンク | ヘッダーから Gemini API と OpenAI API のキー取得ページへ移動できます。 |
| 生成 | 14公開出力モード | 各公開モードには、期待される構造と整形処理があります。 |
| 生成 | 選択モード優先 | プロンプトや素材文中の偶然の語より、選択中の出力チップを優先します。 |
| 生成 | 長編化β | 既存の Output 原稿を章立てされた長編下書きへ拡張し、AI講評をもとにブラッシュアップできます。 |
| ランダム | 全項目ランダム | 見えている創作軸をまとめてランダム化し、そのまま生成します。 |
| ランダム | セクション別ランダム | 全体を変えず、特定セクションだけを個別にランダム化できます。 |
| 固定 | セクションロック | ロックした欄は、対応するランダム化やリセットから保護されます。 |
| 人物 | 人数調整 | プラス/マイナスで登場人物枠を増減できます。 |
| 人物 | 手動項目 | 名前、性別、役割、性格、メモを人物ごとに編集できます。 |
| 人物 | 人物ランダム | 現在人数のまま内容だけ、または人数込みで人物をランダム生成できます。 |
| 人物 | キャラクターシート画像 | PNG/JPG/WEBP画像から人物情報を読み取り、設定へ反映します。 |
| 素材 | 万能インプット | テキスト、Markdown、URL、ローカルテキスト、画像を文脈として投入できます。 |
| 素材 | 素材一覧 | 追加した素材を一覧で確認・クリアできます。 |
| ニュース | ニュースキーワード | Gemini検索グラウンディングで日本語ニュース話題を創作の種にできます。 |
| 作風 | 作風解析 | テキストや画像から文体パラメータを抽出します。 |
| 作風 | JSON出力 | 作風解析結果を外部の文章ワークフロー向けJSONとして出力できます。 |
| 作風 | 作風リライト | 生成済み出力の筋を保ったまま、解析した文体で書き換えます。 |
| 出力 | 文字数表示 | 出力欄で現在の文字数を表示します。 |
| 出力 | タグ表示 | API、モデル、モード、主要軸をタグとして表示します。 |
| 出力 | コピーとテキスト出力 | 生成結果をコピーまたはタイムスタンプ付き `.txt` として書き出せます。 |
| 進捗 | 思考ログ | API通信中の進行メッセージを表示します。 |
| 品質 | モード契約 | 公開モードごとに必須の出力形を指定します。 |
| 品質 | 短すぎる初稿の改稿 | 公開モードの初稿が短すぎる場合、最終採用前に改稿します。 |
| 品質 | 長編AI講評 | 長編化とブラッシュアップの結果に、AI点数、合否表示、具体的な改稿指示を出します。 |
| 品質 | 最終出力整形 | プロンプト断片、古い完了マーカー、読みにくい終端を表示前に整えます。 |
| 品質 | 完走ゲート | 4コマシナリオ末尾の狙い、ドキュメンタリーの締めなど、モード固有の終端を確認・復元します。 |

## Technology Highlights / 技術ハイライト

Story Maker is designed as a small static application, but the generation pipeline is closer to a creative-control engine than a single textarea. The technical value is in how the app converts visible user choices into a stable, provider-aware writing contract.

Story Maker は小さな静的Webアプリとして動きますが、生成パイプラインは単一のテキスト欄ではなく、創作制御エンジンに近い構造です。技術的な価値は、画面上の選択を、API提供元ごとの癖まで考慮した安定した文章生成契約へ変換する点にあります。

### Multi-Axis Prompt Compiler / 多軸プロンプトコンパイラ

The app compiles many independent axes into one request: output mode, theme, genre, worldview, target reader, era, ending type, narration, characters, source material, supplemental constraints, and optional style-analysis results. This reduces the risk that one vague prompt will collapse into a generic summary.

このアプリは、出力モード、テーマ、ジャンル、世界観、読者層、時代、結末型、語り口、登場人物、素材、補足条件、任意の作風解析結果をまとめて一つのリクエストへコンパイルします。曖昧な一文プロンプトが、ありがちな要約文へ崩れるリスクを下げるためです。

The compiler keeps form and content separate. Output mode decides the finished shape, while the other axes decide material, tone, conflict, reader distance, and ending pressure.

コンパイラは「形式」と「内容」を分けて扱います。出力モードが完成形を決め、その他の軸が素材、トーン、葛藤、読者との距離、結末圧を決めます。

### Provider Adapter Layer / API別アダプタ層

Gemini and OpenAI are not treated as identical black boxes. They receive the same public-mode intent, but the app adjusts the delivery. Gemini receives extra pressure against tidy explanation, bland summary, and short closure. OpenAI receives stricter system-level mode constraints and stronger suppression of analysis fragments. The goal is to make both providers produce usable public-mode writing from the same UI.

Gemini と OpenAI を同じ黒箱として扱いません。同じ公開モード意図を渡しつつ、渡し方を調整します。Gemini には、整いすぎた説明、無難な要約、短い締めを避ける圧を追加します。OpenAI には、system レベルでモード制約を強く入れ、分析断片の混入を抑えます。同じUIから、両APIで使える文章を出すための層です。

### Multimodal Intake / マルチモーダル素材取り込み

The app can use text, Markdown, local text files, URLs, pasted notes, and supported images as source material. Character-sheet images and universal image input are converted into usable writing context instead of remaining as decorative attachments.

テキスト、Markdown、ローカルテキストファイル、URL、貼り付けメモ、対応画像を素材として扱えます。キャラクターシート画像や万能インプットの画像は、単なる添付物ではなく、文章生成に使える文脈へ変換されます。

### Style Analyzer And Rewrite Engine / 作風解析とリライトエンジン

The style analyzer extracts reusable writing-style signals from user-provided text or images. It can produce a readable analysis, structured JSON for external workflows, and a rewrite that keeps the generated plot direction while changing rhythm, diction, density, sensory focus, and tone.

作風解析は、ユーザーが与えた文章や画像から再利用できる文体信号を抽出します。読みやすい解析、外部ワークフロー向けの構造化JSON、生成済み本文の筋を保ったままリズム、語彙、密度、感覚描写、トーンを変えるリライトを出せます。

### Human-Texture Writing Controls / 人間味を出す文章制御

The quality layer does not only ask for "better writing." It pushes for specific craft signals: concrete action, uneven reaction, silence, physical sensation, relationship change, aftermath, information order, and a last line that changes or concentrates the meaning. These rules are kept generic so they work across many themes instead of depending on one fixed scenario.

品質レイヤーは、単に「良い文章にして」と頼むだけではありません。具体的な行動、均一でない反応、沈黙、身体感覚、関係変化、後始末、情報開示の順番、意味を反転または凝縮する最後の一文など、文章の手触りを作る要素を要求します。これらは固定シナリオに依存しない汎用ルールとして保ちます。

### Rewrite And Cleanup Pipeline / 改稿・整形パイプライン

Generated text passes through public-mode checks before it is treated as final. Too-short drafts can be rewritten by the selected provider. Final cleanup removes prompt residue, stale completion markers, analysis fragments, and awkward endings while preserving mode-specific readability such as poem line breaks, letter paragraphs, manga panel boundaries, and script labels.

生成本文は、最終出力として扱う前に公開モード用の検査を通ります。短すぎる初稿は、選択中のAPIで改稿できます。最終整形では、プロンプト残骸、古い完了マーカー、分析断片、不自然な終端を取り除きつつ、詩の行分け、手紙の段落、漫画のコマ境界、脚本ラベルなど、モードごとの読みやすさを守ります。

### Static Safety And Release Discipline / 静的公開と安全管理

The app is built for static hosting. Normal use does not require a custom backend, server-side account system, or repository writes. Public build checks also strip dormant unsupported controls, scan for non-generic rule leakage, and keep API keys, generated text, billing data, and private credentials out of release-facing files.

このアプリは静的ホスティングを前提にしています。通常利用に専用バックエンド、サーバー側アカウント、リポジトリへの書き込みは必要ありません。公開ビルドの確認では、休止中の非対応UIを除去し、非汎用ルールの混入を検査し、APIキー、生成本文、課金情報、秘密資格情報を公開向けファイルへ入れないようにしています。

## Supported Public Output Modes / 対応公開出力モード

The public release supports the following 14 output modes. Each mode has a mode contract, so the label is not decorative: the generated text is expected to follow the shape of that mode.

公開版では次の14モードに対応します。各モードには出力契約があり、単なるラベルではありません。生成本文は、そのモードに合った形で出力されます。

| Mode | Japanese Label | Expected Output Shape |
|---|---|---|
| `4koma` | 4コマ漫画風 | Four-panel beat structure with setup, turn, punchline, visual action, and dialogue. |
| `4koma_scenario` | AI 4koma シナリオ連携（STEP2） | Topic, logline, location, outfit, punchline, scenario notes, and four panel blocks with emotion/camera/dialogue cues. |
| `short_short` | ショート（1500字～） | Compact prose with setup, turn, aftertaste, and a final line that changes the meaning. |
| `novel` | 短編小説（4500字～） | Scene-based short fiction with desire, obstacle, choice, cost, and relationship change. |
| `medium` | 中編小説（5500字～） | Three-section prose with stronger development, scene movement, and a larger emotional arc. |
| `scenario` | 脚本/台本 | `タイトル:`, `登場人物:`, `場面:` plus stage directions and character-name dialogue. |
| `manga` | ストーリー漫画 | Page and panel descriptions, separated `絵:`, `セリフ:`, and `演出:` details. |
| `essay` | エッセイ | Claim, observation, reflection, and conclusion without escaping into incident-resolution fiction. |
| `poem` | 詩・ポエム | Title plus line-based poetic output with concrete images and no explanatory afterword. |
| `fairy` | 童話/絵本 | Gentle story form with visible action, lesson-like change, and child-readable clarity. |
| `letter` | 手紙/書簡体 | `宛先:`, paragraphized body, closing, sender, and relationship change through written voice. |
| `diary` | 日記/独白体 | Date-like or diary-like first-person reflection with self-deception and a small truth. |
| `documentary` | ドキュメンタリー | `ナレーション:`, testimony, observation, unresolved question, and factual-feeling structure. |
| `radio` | ラジオドラマ | `BGM:`, `SE:`, narration, dialogue, and sound-driven scene movement. |

### Mode Behavior / モード別の動作

- Narrative modes prioritize setup, conflict, payoff, character function, scene motion, and emotional landing.
- Comedy and 4-panel modes emphasize expectation gaps, misdirection, reversal, and punchline timing.
- Script, manga, documentary, and radio modes prioritize readable labels and production-friendly units.
- Essay, poem, letter, and diary modes protect their form instead of forcing story-like foreshadowing.
- All modes reject visible prompt analysis, self-evaluation, checklist fragments, and unfinished planning notes.

- 物語系モードでは、導入、葛藤、回収、人物機能、シーンの動き、感情の着地を重視します。
- コメディ/4コマ系では、期待とのズレ、ミスリード、反転、オチのタイミングを重視します。
- 脚本、漫画、ドキュメンタリー、ラジオでは、制作に使いやすいラベルと単位を重視します。
- エッセイ、詩、手紙、日記では、物語風の伏線を無理に足すより、その形式自体を守ります。
- すべてのモードで、見える本文中のプロンプト分析、自己評価、チェックリスト断片、未完成の設計メモを拒否します。

## Long-Form Expansion Beta / 長編化βワークフロー

Long-form expansion is not a fifteenth output chip. It is a downstream workflow that starts from the current Output text. A short story, short novel, medium novel, pasted manuscript, or imported text file can become the source. The workflow keeps the source premise as the core, expands it into a chaptered manuscript, evaluates the result with the selected AI provider, and can then brush it up from that critique.

長編化は15個目の出力チップではありません。現在の Output 本文を起点にする後段ワークフローです。ショート、短編小説、中編小説、貼り付け原稿、インポートしたテキストを元にできます。元の筋を芯として保持し、章立てされた長編原稿へ拡張し、選択中のAPIで結果を講評し、その講評を使ってブラッシュアップできます。

### When The Button Appears / ボタンの状態

- With no usable Output, the long-form panel stays disabled.
- With a short or medium Output, the main action is `この小説を長編化`.
- After the Output is already recognized as long-form, the action changes to `この長編小説をブラッシュアップする`.
- While brush-up is running, the button remains labeled as brush-up instead of reverting to longification.
- The target-character selector is used for the first longification pass. Brush-up reuses the existing long manuscript and disables the target selector.

- 使用できる Output がない間、長編化パネルは無効です。
- 短中編の Output がある場合、メイン操作は `この小説を長編化` になります。
- Output が長編原稿として認識された後は、操作が `この長編小説をブラッシュアップする` に切り替わります。
- ブラッシュアップ中は、途中で `この小説を長編化` 表示へ戻らず、ブラッシュアップ中として表示されます。
- 目標文字数は初回の長編化で使います。ブラッシュアップでは既存の長編原稿を対象にするため、目標文字数の選択は固定されます。

### Expansion Flow / 長編化の流れ

1. The app reads the current Output text and derives a source title, premise, characters, conflict, tone, and chapter direction.
2. It creates a chapter plan and a continuity ledger so later chapters do not discard the source setup.
3. It expands chapter by chapter through the selected provider instead of asking for one giant draft in a single response.
4. It assembles the chapter text, keeps a single Story Maker footer, and removes duplicated or draft-only artifacts.
5. It sends the completed long-form manuscript to AI review and displays the review under the Output.
6. The Kakuyomu-style preview uses the latest long-form Output and preserves the manuscript title instead of falling back to an unnamed novel title.

1. 現在の Output から、タイトル、前提、人物、葛藤、トーン、章方向を読み取ります。
2. 章構成と継続管理用の台帳を作り、後半の章が元の設定を捨てないようにします。
3. 一度に巨大な本文を書かせるのではなく、選択中のAPIで章ごとに拡張します。
4. 各章を結合し、Story Maker フッターを一つだけ残し、重複や下書き断片を取り除きます。
5. 完成した長編原稿をAI講評へ送り、講評を Output 下に表示します。
6. Kakuyomuフォーム風プレビューは最新の長編 Output を使い、タイトルが `名称未設定の小説` に落ちないように元タイトルを保持します。

### AI Review / AI講評

The long-form review is designed to be an AI critique, not a local placeholder sentence. After longification or brush-up, the selected provider reviews the manuscript and returns a score, a pass/fail label, a summary, strengths, problems, and concrete chapter-level revision directions. The score is treated as the AI's own assessment for the current manuscript.

長編講評は、ローカルで作った仮の文章ではなく、AIによる批評として扱います。長編化またはブラッシュアップ後、選択中のAPIが原稿を読み、点数、合否表示、総評、長所、問題点、章ごとの具体的な改稿方向を返します。この点数は、その時点の原稿に対するAI自身の評価として扱います。

The current passing score is 80. Scores at or above 80 are displayed as `合格点`; lower scores are displayed as `要ブラッシュアップ`. The review text is intentionally usable as the next brush-up instruction, so it should name problems such as thin conflict, weak chapter payoff, inconsistent character motivation, missing sensory detail, or underdeveloped ending pressure.

現在の合格点は80点です。80点以上は `合格点`、80点未満は `要ブラッシュアップ` と表示します。講評は次のブラッシュアップ指示として使える内容を想定しているため、葛藤の薄さ、章ごとの回収不足、人物動機の不一致、感覚描写不足、終盤圧の弱さなど、具体的な問題を挙げる設計です。

### Brush-Up And Auto Retry / ブラッシュアップと自動リトライ

Brush-up rewrites the existing long-form manuscript from the latest AI review. It does not start over from the short source. The goal is to improve the long manuscript while preserving the current story, chapter continuity, title, and major character functions.

ブラッシュアップは、最新のAI講評をもとに既存の長編原稿を書き直します。短い元ネタからやり直す処理ではありません。現在の物語、章の継続、タイトル、主要人物の機能を保ったまま、長編原稿として改善することを目的にしています。

The checkbox `合格点まで自動ブラッシュアップ（最大3回）` controls retry behavior:

- Checked: after longification or a manual brush-up, if the AI score is below 80, the app automatically starts another brush-up. It stops when the score reaches 80 or when three attempts have run.
- Unchecked: the app performs only one longification or one brush-up per button press, even if the score is below 80.
- After an automatic chain finishes, the checkbox is cleared so the next brush-up does not loop again unless the user turns it on.

チェックボックス `合格点まで自動ブラッシュアップ（最大3回）` は、リトライ挙動を決めます。

- ON: 長編化または手動ブラッシュアップ後、AI点数が80点未満なら自動で次のブラッシュアップを開始します。80点到達、または最大3回実行で停止します。
- OFF: 点数が80点未満でも、ボタン1回につき長編化またはブラッシュアップを1回だけ実行します。
- 自動チェーンが終わるとチェックは外れます。次回も最大3回リトライしたい場合は、ユーザーが再度ONにします。

### Shortening Guards / 短縮防止

Long-form brush-up can fail if a provider responds with a polished but much shorter rewrite. To reduce that failure, the app retries chapters that shrink too much and can add a final top-up pass when the assembled brush-up result falls below the long-form minimum. This is a guard against accidental compression; it is not a promise that every result will reach the selected target character count exactly.

長編ブラッシュアップでは、APIが整った短い要約のような改稿を返すことがあります。これを避けるため、短くなりすぎた章は再試行し、結合後の本文が長編最低ラインを下回る場合は最後に補強生成を行います。これは意図しない圧縮を防ぐための保護であり、毎回指定文字数ぴったりに到達することを保証するものではありません。

## v5.0.7 Quality System / v5.0.7 品質システム

v5.0.7 keeps the public-mode quality layer outside the older large application file and treats it as the stable place for prompt contracts, provider-specific tuning, output cleanup, live output presentation, completion gates, and generic-rule checks. Its purpose is not to promise a masterpiece every time. It is to push both Gemini and OpenAI away from similar AI-default story shapes and toward outputs that are at least structurally complete, concrete, and reasonably interesting for their selected mode.

v5.0.7では、既存の巨大なアプリ本体の外側にある公開モード用の品質レイヤーを、プロンプト契約、API別補正、出力整形、ライブ表示、完走ゲート、汎用ルール検査の安定した置き場所として扱います。目的は、毎回名作を保証することではありません。Gemini と OpenAI の両方で、AI初期値の似たり寄ったりな物語形から離れ、選択モードに対して構造が完走し、具体性があり、そこそこ面白い出力へ寄せることです。

The current release line also keeps release identity, footer text, and browser API-session persistence in small runtime modules. `src/main.js` still hosts the legacy UI flow, but version/footer handling now lives in `src/version.js`, and API-key tab/session restoration lives in `src/apiSession.js`. This keeps release text and key persistence behavior consistent without hiding API keys in source files.

現在のリリース系統では、リリース識別、フッター表記、ブラウザ内APIセッション保持も小さな実行時モジュールへ分離しています。`src/main.js` はまだ既存UIフローの中心ですが、版数とフッターは `src/version.js`、APIキーのタブ内保持と復元は `src/apiSession.js` に分けました。これにより、APIキーをソースへ保存せずに、公開表記とキー保持挙動を揃えています。

### Selected-Mode Priority / 選択モード優先

The quality layer resolves the active output mode from the selected UI chip first. It does not let an incidental word inside the prompt override the user's selected output mode.

品質レイヤーは、まず画面で選択中の出力モードを優先します。プロンプト本文に偶然出てきた別モード名が、ユーザーの選択モードを上書きしないようにしています。

### Public Mode Contract / 公開モード契約

Every supported mode receives a mode-specific contract before generation. The contract tells the model what kind of final text is expected and what must not appear in the visible output.

対応モードごとに、生成前のモード契約を追加します。契約には、期待される完成形と、本文に出してはいけない内部指示・自己評価・チェックリスト・プロンプト断片などを含めています。

### Under-Length Rewrite / 短すぎる初稿の改稿

For both Gemini and OpenAI streaming generation, the current quality layer checks public-mode draft length before the final text reaches the output panel. If a supported mode returns a draft that is too short for the mode, the app asks the selected provider to rewrite the draft into a fuller final piece using the same input conditions. The short draft is not accepted as the final displayed result.

Gemini と OpenAI のストリーム生成では、出力欄へ最終表示する前に、公開モードの本文長を確認します。対応モードで短すぎる初稿が返った場合、同じ入力条件を使って、選択中のAPIに完成稿として全面改稿させます。短すぎる初稿を、そのまま最終表示として採用しません。

This is intentionally mode-generic. It expands by adding action, dialogue, silence, physical sensation, aftermath, and relationship change from the selected inputs and draft content, not by injecting hard-coded places, people, jobs, shop names, products, or evidence items.

この仕組みはモード汎用です。会話、行動、沈黙、身体感覚、後始末、関係変化を、選択済み入力と初稿内容から増やします。固定の舞台、人物、職業、店名、商品、証拠品を勝手に差し込むための仕組みではありません。

### Provider-Specific Tuning / API別チューニング

Gemini and OpenAI use the same public-mode contract, but the runtime adjusts how the contract is delivered. Gemini receives additional rewrite pressure when the answer is too neat, explanatory, or short. OpenAI receives a system-level public-mode contract that suppresses analysis text, checklist fragments, and over-short endings while keeping the selected mode strict.

Gemini と OpenAI は同じ公開モード契約を使いますが、実行時の渡し方をAPIごとに調整します。Gemini には、整いすぎる説明文・短すぎる回答を避けるための改稿圧を加えます。OpenAI には、分析文、チェックリスト断片、短すぎる締めを抑え、選択モードを厳守する system レベルの公開モード契約を追加します。

### Final Output Cleanup / 最終出力整形

Before the generated text is treated as the visible final output, the public cleanup layer removes prompt artifacts, stale completion markers, and internal footer text. It also keeps mode-specific readability: letters are paragraphized, poems are kept line-based, essays are capped at a readable finished length, and manga/script-like outputs are trimmed at a complete sentence or panel boundary.

生成本文を画面に出す最終稿として扱う前に、公開出力整形レイヤーが、プロンプト断片、古い完了マーカー、内部フッターを取り除きます。あわせて、手紙は段落化し、詩は行形式を守り、エッセイは読み切れる完成稿の長さに収め、漫画・脚本系は文またはコマの区切りで自然に閉じます。

### Completion And Interest Gates / 完走と面白さのゲート

The app does not treat "some text appeared" as enough. Mode-specific completion gates check whether the output reached the part that makes the mode usable: for example, `4koma_scenario` must preserve a real final `狙い:` block for the fourth panel, and `documentary` must end with a documentary-style closing label instead of drifting into unlabeled prose. The browser QA then checks real Gemini/OpenAI outputs for concrete objects, friction, dialogue, choices, and non-generic endings.

このアプリでは、「何か文章が出た」だけでは合格にしません。モード別の完走ゲートで、その形式として使える終端まで到達したかを見ます。たとえば `4koma_scenario` では4コマ目の実質ある `狙い:` を保持し、`documentary` ではラベルなしの散文へ流れず、ドキュメンタリーとしての締めを残します。そのうえで、実ブラウザQAでは Gemini / OpenAI の実出力について、具体物、摩擦、会話、選択、汎用的すぎない終わり方を確認します。

## API Engine / APIエンジン

### Gemini / Gemini API

Gemini can be used for standard generation, image-aware character sheet reading, Universal Input image understanding, style analysis, and search-grounded news keyword assistance. In public writing modes, Gemini receives additional constraints against overly neat explanation, thin summaries, and short endings.

Gemini は、通常生成、キャラクターシート画像の読み取り、万能インプットの画像理解、作風解析、検索グラウンディングによるニュースキーワード補助に使えます。公開文章モードでは、整いすぎた説明、薄い要約、短い締めへ寄りすぎないよう追加制御を入れます。

### OpenAI / OpenAI API

OpenAI can be used for text generation and style-sensitive prose drafting. The app keeps visible settings intact while switching providers, so users can compare output tendencies without rebuilding the entire prompt by hand. Public writing modes receive stricter mode and cleanup instructions to prevent analysis text from leaking into the final output.

OpenAI は、文章生成と文体重視の散文生成に使えます。API提供元を切り替えても画面上の設定は維持されるため、プロンプトを手作業で組み直さずに出力傾向を比較できます。公開文章モードでは、分析文が最終出力へ混ざらないよう、モード契約と整形指示を強めています。

### Provider Switching / 提供元切り替え

- The provider switch changes Gemini/OpenAI selection while keeping the visible creative settings.
- Provider switching is useful when one provider is rate-limited or when the user wants to compare writing tendencies.
- The app does not write API keys, generated text, or user settings back to the repository.
- The visible provider label helps the user confirm which API is currently selected before generation.

- 提供元切り替えは、画面上の創作設定を残したまま Gemini/OpenAI の選択を変えます。
- 片方のAPIが制限中の場合や、出力傾向を比較したい場合に使えます。
- アプリはAPIキー、生成本文、ユーザー設定をリポジトリへ書き戻しません。
- 画面上のAPI表示で、生成前に現在の選択元を確認できます。

## Narrative Engineering / 物語設計

The writing layer uses recurring narrative methods rather than one-off prompt slogans. These methods are intentionally generic, so they can work with many themes, genres, and formats.

文章生成層は、一回限りの飾り文句ではなく、繰り返し使える物語設計メソッドを使います。これらはテーマ、ジャンル、形式が変わっても働くよう、意図的に汎用化しています。

| Method | Purpose |
|---|---|
| Desire and cost | Make the character want something and pay something, even in a short piece. |
| Choice focus | Avoid ending only with an event; make someone choose, refuse, hide, or accept something. |
| Information order | Control what the reader knows first, what is withheld, and what is reinterpreted at the end. |
| Relationship change | Make at least one distance, trust level, misunderstanding, or obligation shift. |
| Sensory anchoring | Add touch, smell, sound, light, weight, or bodily discomfort to reduce abstract summary. |
| Human friction | Add hesitation, misunderstanding, minor failure, awkward silence, fatigue, or small damage so the scene does not become too smooth. |
| Aftermath visibility | Show what remains after the gag, decision, or conflict: cleanup, a shifted object, embarrassment, debt, relief, or a changed distance. |
| Anti-template pressure | Avoid the most obvious genre route and over-familiar moral closure. |
| Last-line design | Use the final line to turn, collect, echo, or sharpen the meaning instead of merely stopping. |
| Mode-complete ending | Finish in the shape the selected mode needs, not in a generic prose ending. |
| Browser-backed calibration | Judge the method by actual Gemini/OpenAI browser outputs across modes, not by prompt intent alone. |

| メソッド | 目的 |
|---|---|
| 欲望と代償 | 短い文章でも、人物が何かを望み、何かを払う構造を作ります。 |
| 選択の焦点化 | 出来事だけで終わらせず、誰かが選ぶ、拒む、隠す、受け入れる瞬間を作ります。 |
| 情報開示の順番 | 読者が先に知ること、伏せること、最後に意味が変わることを制御します。 |
| 関係変化 | 距離、信頼、誤解、義務のどれかが変わるようにします。 |
| 感覚の接地 | 触覚、匂い、音、光、重さ、身体の違和感を入れ、抽象的な要約を避けます。 |
| 人間的な摩擦 | ためらい、勘違い、小さな失敗、気まずい沈黙、疲れ、少しの損を入れ、場面が滑らかすぎないようにします。 |
| 後始末の可視化 | ギャグ、決断、衝突のあとに残る片付け、動いた物、恥、借り、安堵、変わった距離を見せます。 |
| テンプレ回避 | もっともありがちなジャンル展開や安易な教訓で終わらないようにします。 |
| 最後の一文設計 | ただ止めるのではなく、意味を反転、回収、反響、凝縮する一文を狙います。 |
| モードとしての完走 | 汎用的な小説風の終わりではなく、選択された形式に必要な終端まで書き切ります。 |
| ブラウザ実出力での調整 | プロンプト上の意図だけでなく、Gemini / OpenAI の実ブラウザ出力をモード別に見て判断します。 |

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

### Independent Axes / 独立軸

| Axis | Role |
|---|---|
| Output mode | Decides the final format and required labels. |
| Theme / seed | Provides premise, incident, topic, or emotional trigger. |
| Genre | Sets story pressure, expectation, pacing, and payoff style. |
| Worldview | Sets setting logic, props, social rules, and atmosphere. |
| Target reader | Adjusts density, accessibility, tone, and genre literacy. |
| Era | Controls technology level, vocabulary, social background, and anachronism risk. |
| Ending type | Sets closure pattern, twist, open question, circular return, or emotional residue. |
| Narration | Sets viewpoint, distance, voice, and presentation style. |
| Characters | Supplies roles, relationships, personalities, and conflict engines. |
| Universal Input | Adds external text or image context. |
| Supplement | Adds constraints that do not fit the preset sections. |
| Style analysis | Adds extracted writing-style parameters for rewrite or guidance. |

| 軸 | 役割 |
|---|---|
| 出力モード | 完成形式と必須ラベルを決めます。 |
| テーマ・シード | 前提、事件、話題、感情の起点を与えます。 |
| ジャンル | 物語圧、期待、テンポ、回収の方向を決めます。 |
| 世界観 | 舞台論理、小道具、社会ルール、空気感を決めます。 |
| 読者層 | 密度、読みやすさ、トーン、ジャンル文脈の前提を調整します。 |
| 時代 | 技術水準、語彙、社会背景、時代錯誤リスクを調整します。 |
| 結末 | 閉じ方、反転、問い、円環、余韻を決めます。 |
| 語り口 | 視点、距離、声、見せ方を決めます。 |
| 登場人物 | 役割、関係、性格、葛藤のエンジンを与えます。 |
| 万能インプット | 外部テキストや画像の文脈を追加します。 |
| 補足メモ | プリセット欄に入らない制約を追加します。 |
| 作風解析 | リライトや生成補助に使う文体パラメータを追加します。 |

### Locks / ロック

- Each major section has a lock button where protection is useful.
- Locked sections are skipped by all-random and section-random actions.
- This supports workflows such as keeping the same characters while testing several genres, or keeping one theme while changing the output format.
- Universal Input can be protected so source materials survive broad reset operations.

- 主要セクションには、保護が必要な場面で使えるロックがあります。
- ロックされたセクションは、全項目ランダムや個別ランダムの対象から外れます。
- 同じ人物で複数ジャンルを試す、同じテーマで出力形式だけ変える、といった使い方ができます。
- 万能インプットは、広いリセット操作でも素材を残すために保護できます。

## Character Controls / 登場人物操作

The character section can set the number of characters and generate roles or descriptions. Roles are intended as story functions, such as protagonist, rival, helper, observer, witness, trickster, or fixer. The app should avoid making every character equally reasonable or equally explanatory.

登場人物欄では、人数、役割、説明を設定できます。役割は、主人公、ライバル、協力者、観測者、目撃者、トリックスター、解決役など、物語内での機能として扱います。全員が同じように物分かりよく説明する状態を避けるためです。

Each character can carry name, sex, role, personality, and notes. The role is not just profile decoration. It changes how the prompt assigns conflict, reaction, dialogue, scene movement, and emotional distance.

各人物には、名前、性別、役割、性格、メモを持たせられます。役割はプロフィール装飾ではありません。葛藤、反応、会話、シーン移動、感情距離の割り当てに影響します。

Character randomization can fill the current number of characters or change count and content together. Manual edits remain useful because the app treats entered characters as important generation context.

人物ランダムは、現在人数のまま内容を埋めることも、人数と内容をまとめて変えることもできます。手動編集した人物は、生成上の重要文脈として扱われます。

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

The import is intentionally practical. It looks for visible traits such as outfit, expression, age impression, posture, props, relationship hints, and written notes, then translates them into text settings that the generation request can use.

取り込みは実用目的です。服装、表情、年齢印象、姿勢、小物、関係性の手がかり、シート上の文字情報などを読み取り、生成リクエストで使えるテキスト設定へ変換します。

## Universal Input / 万能インプット

Universal Input accepts free-form text or supported image material. It can be used as a source memo, character note, scene hint, style reference, or object reference.

万能インプットは、自由テキストや対応画像素材を受け取ります。素材メモ、人物メモ、場面の手がかり、文体参照、物の参照として使えます。

The app should treat Universal Input as source material, not as a command to expose private data or publish hidden information.

万能インプットは素材として扱います。非公開情報を公開したり、隠れた情報を外へ出したりする命令として扱うものではありません。

### Supported Source Types / 対応素材

| Source Type | Behavior |
|---|---|
| Plain text | Added directly as source context. |
| Markdown | Keeps headings and structured notes useful for prompt context. |
| `.txt` / `.md` files | Reads local text files into the intake list. |
| URL | Adds a source reference where the current workflow supports it. |
| Image | Uses image understanding where the selected provider supports it. |
| Multiple assets | Combines several pieces of material with the selected generation settings. |

| 素材種別 | 動作 |
|---|---|
| 通常テキスト | そのまま素材文脈として追加します。 |
| Markdown | 見出しや構造化メモを文脈として活かします。 |
| `.txt` / `.md` ファイル | ローカルテキストファイルを取り込み一覧へ読み込みます。 |
| URL | 現在のワークフローで対応できる範囲で参照素材として追加します。 |
| 画像 | 選択中のAPIが対応する場合、画像理解を使います。 |
| 複数素材 | 複数の素材を、選択済み生成条件と組み合わせて扱います。 |

### Intake Controls / 取り込み操作

- Drag and drop images, URLs, text files, or text snippets.
- Paste directly into the intake zone.
- Add direct text from the input row.
- Review and clear the intake list.
- Lock the intake section to keep materials while changing other settings.

- 画像、URL、テキストファイル、テキスト断片をドラッグ&ドロップできます。
- 取り込み欄へ直接貼り付けられます。
- 入力行から直接テキストを追加できます。
- 取り込み一覧を確認・クリアできます。
- 万能インプット欄をロックし、他の設定を変えても素材を残せます。

## Style Analyzer / 作風解析

The style analyzer is an experimental assistant for extracting style hints from user-provided text or images. It can produce structured JSON and a rewrite result for the user's local workflow.

作風解析は、ユーザーが与えた文章や画像から作風の手がかりを抽出する実験的な補助機能です。ローカルの文章ワークフロー向けに構造化JSONやリライト結果を出せます。

It is designed as a creative aid. It is not a guarantee of author identification, copyright status, or legal safety.

これは創作補助です。作者識別、著作権状態、法的安全性を保証するものではありません。

### Extracted Style Signals / 抽出する作風信号

- sentence rhythm
- vocabulary level
- rhetorical pattern
- dialogue ratio
- description focus
- sensory density
- emotional curve
- camera distance
- tone intensity
- recurring motifs or image clusters

- 文のリズム
- 語彙レベル
- 修辞パターン
- 会話比率
- 描写の焦点
- 感覚密度
- 感情曲線
- カメラ距離
- トーンの濃度
- 反復モチーフやイメージ群

### Rewrite Use / リライト用途

After generation, the rewrite workflow can apply the extracted style to the output while keeping the rough plot direction. The aim is not to impersonate a protected author; it is to give the user a reusable analysis layer for their own local writing workflow.

生成後、リライト機能は抽出した作風を本文へ適用しつつ、大まかな筋の方向を保ちます。目的は保護された作者の模倣ではなく、ユーザー自身のローカル文章ワークフローで再利用できる解析層を提供することです。

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

---

## 💻 Tech Stack / 技術スタック

* **Frontend**: Vanilla JavaScript / Vite / CSS
* **AI Providers**: Google Gemini API and OpenAI API
* **Text Generation**: Provider-specific public-mode prompt contracts for Gemini and OpenAI, plus chapter-based long-form expansion
* **Image Understanding**: Character-sheet import and Universal Input image interpretation where supported by the selected provider
* **Style Analysis**: Text/image style extraction, structured JSON output, and style-aware rewrite flow
* **Quality Layer**: Mode contracts, under-length rewrite, provider tuning, long-form AI review, auto brush-up retry, and final output cleanup
* **Hosting Model**: Static web app suitable for GitHub Pages
* **Security Model**: User-entered runtime API keys, no repository key embedding

* **フロントエンド**: Vanilla JavaScript / Vite / CSS
* **AI提供元**: Google Gemini API と OpenAI API
* **文章生成**: Gemini / OpenAI それぞれに合わせた公開モード別プロンプト契約と、章単位の長編化
* **画像理解**: 対応APIでのキャラクターシート読み取りと万能インプット画像解析
* **作風解析**: テキスト/画像からの文体抽出、構造化JSON出力、作風リライト
* **品質レイヤー**: モード契約、短稿改稿、API別補正、長編AI講評、自動ブラッシュアップリトライ、最終出力整形
* **公開方式**: GitHub Pages に適した静的Webアプリ
* **安全設計**: ユーザー入力式APIキー、リポジトリへのキー埋め込みなし

---

## 📝 Setup & Launch / セットアップと起動

### Cloud / Browser / 公開ページ

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/) or an OpenAI API key from [OpenAI Platform](https://platform.openai.com/).
   [Google AI Studio](https://aistudio.google.com/) で Gemini API キー、または [OpenAI Platform](https://platform.openai.com/) で OpenAI API キーを取得します。
2. Open [Story Maker](https://furuyan1234.github.io/story-maker/).
   [Story Maker](https://furuyan1234.github.io/story-maker/) を開きます。
3. Enter the API key in the browser UI, select an output mode and creative settings, then generate.
   ブラウザUIにAPIキーを入力し、出力モードと創作設定を選んで生成します。

### Local Launch (Windows) / ローカルでの起動 (Windows)

1. Install Node.js if it is not already available.
   Node.js が未導入の場合はインストールします。
2. Open this project folder.
   このプロジェクトフォルダを開きます。
3. Double-click `start_Story_app.bat`, or run the following commands:
   `start_Story_app.bat` をダブルクリックするか、次のコマンドを実行します。

```powershell
npm install
npm run dev -- --host 0.0.0.0 --port 5179
```

4. Open `http://localhost:5179/` in the browser.
   ブラウザで `http://localhost:5179/` を開きます。

---

## ⚖️ License & Rights / ライセンス・権利関係

This project uses a hybrid rights model to balance technology sharing, prompt-design protection, and user ownership of generated works.
本プロジェクトは、技術共有、プロンプト設計の保護、生成物のユーザー帰属を両立するため、ハイブリッドな権利整理を採用しています。

* **Source Code**: MIT-style open source policy for implementation code unless a separate repository license states otherwise.
  ソフトウェア実装コードは、別途リポジトリライセンスで定めがある場合を除き、MIT系のオープンソース方針で扱います。
* **Logic & Prompts**: Original prompt structures, generation contracts, quality-control methods, and writing-engineering logic are treated as research and design assets.
  独自のプロンプト構造、生成契約、品質制御、文章設計ロジックは、研究・設計資産として扱います。
* **Output Ownership / 生成物の帰属**:
  The developer does not claim ownership of text generated by the user through this tool. Rights and responsibility for use belong to the user.
  本ツールでユーザーが生成した文章について、開発者は権利を主張しません。利用に関する権利と責任はユーザーに帰属します。

**Commercial Use and Paid Seminars / 商用利用・有料セミナーについて**
Using this system's prompts, contracts, or workflow as the core of high-priced information products, paid seminars, or "get-rich-quick" style businesses requires prior permission from the developer.
本システムのプロンプト、契約、ワークフローを、高額な情報商材、有料セミナー、または「副業・稼げる」系ビジネスの中核として利用する場合は、事前に開発者の許諾を得てください。

---

## 利用規約 / Terms of Use

### 1. 目的 / Purpose

Story Maker is intended for creative writing support, story drafting, format experimentation, and style exploration. It is not intended to reproduce existing works, protected characters, private personal information, or specific creators in a misleading way.
Story Maker は、創作文支援、物語草案、形式実験、作風研究を目的としたツールです。既存作品、保護されたキャラクター、個人情報、特定作者を誤認させる形で再現する目的のツールではありません。

### 2. 生成コンテンツに関する禁止事項 / Prohibited Uses

Users must not use this tool for the following:
ユーザーは、本ツールを次の目的で使用してはいけません。

#### (1) 著作権・知的財産権侵害 / Intellectual Property Infringement

- reproducing or closely imitating existing novels, manga, films, games, characters, brands, or protected settings
- copying protected plots, character designs, dialogue, or distinctive style in a way that causes confusion
- using trademarks, logos, or brand elements without permission

- 既存の小説、漫画、映画、ゲーム、キャラクター、ブランド、保護された設定を実質的に再現・模倣する行為
- 混同を招く形で、保護された筋、人物造形、セリフ、特徴的作風を流用する行為
- 商標、ロゴ、ブランド要素の無断使用

#### (2) 入力データの不正利用 / Misuse of Input Data

Users are responsible for having lawful rights or permission for any text, images, character sheets, style samples, URLs, or source materials they input.
ユーザーは、入力する文章、画像、キャラクターシート、作風サンプル、URL、素材について、適法な権利または使用許諾を持つ責任があります。

#### (3) 法令違反・不正行為 / Illegal Activities

The tool must not be used for illegal, harmful, fraudulent, privacy-invasive, or rights-infringing activity.
本ツールを、違法、有害、詐欺的、プライバシー侵害、権利侵害の目的で使用してはいけません。

### 3. 生成物の責任および権利 / Responsibility & Ownership

The user bears responsibility for generated text and its use. The developer does not guarantee factual accuracy, legal safety, originality, commercial suitability, or publication readiness.
生成本文の内容と利用に関する責任はユーザーにあります。開発者は、事実性、法的安全性、独自性、商用適合性、公開可能性を保証しません。

### 4. 免責事項 / Disclaimer

This tool is provided as is, without warranty. API behavior, provider terms, model behavior, browser behavior, and hosting behavior may change.
本ツールは現状有姿で提供され、保証はありません。API挙動、提供元規約、モデル挙動、ブラウザ挙動、ホスティング挙動は変わる可能性があります。

### 5. 規約の変更 / Changes

These terms may be updated without notice.
本規約は予告なく変更される場合があります。

### 6. 準拠法 / Governing Law

These terms are governed by the laws of Japan.
本規約は日本法に準拠します。

---

## AI Manga Creative Suite / AIまんが制作エコシステム

This project is part of an integrated ecosystem designed to support AI-powered manga, character, story, translation, background, and voice-comic production.
本プロジェクトは、AIを活用した漫画、キャラクター、物語、翻訳、背景、ボイスコミック制作を支援する統合エコシステムの一部です。

### Ecosystem Components / 構成システム

#### 1. Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System
A system specialized in creating 4-panel manga with AI. / AIを活用した4コマ漫画制作に特化したシステムです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndf063558c1f5)
- [Demo / デモ](https://furuyan1234.github.io/nano-banana-pro/)
- [Code / コード](https://github.com/FURUYAN1234/nano-banana-pro)

#### 2. AI Story Maker
A tool for generating creative stories and plots using AI. / AIを用いてクリエイティブなストーリーやプロットを生成するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nd3d972922868)
- [Demo / デモ](https://furuyan1234.github.io/story-maker/)
- [Code / コード](https://github.com/FURUYAN1234/story-maker)

#### 3. AI Character Sheet Maker
An assistant for designing detailed character sheets and settings. / 詳細なキャラクターシートや設定をデザインするための支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/neccbebd7d957)
- [Demo / デモ](https://furuyan1234.github.io/character-sheet-maker/)
- [Code / コード](https://github.com/FURUYAN1234/character-sheet-maker)

#### 4. AI Comic Translation Tool
A tool for translating manga into multiple languages using AI. / AIを使って漫画を多言語へ翻訳するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nbdf826604ce7)
- [Demo / デモ](https://furuyan1234.github.io/comic-translation/)
- [Code / コード](https://github.com/FURUYAN1234/comic-translation)

#### 5. 360° AI Panorama Generator
A tool that generates seamless 360-degree spatial backgrounds for manga and video. / 漫画や動画向けのシームレスな360度空間背景を生成するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nb53b121fef88)
- [Demo / デモ](https://furuyan1234.github.io/panoforge/)
- [Code / コード](https://github.com/FURUYAN1234/panoforge)

#### 6. AI Voice Comic Maker
A tool to convert static 4-koma manga into fully voiced animated videos. / 静止画の4コマ漫画をフルボイスの動画に変換するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndc6533c1512f)
- [Code / コード](https://github.com/FURUYAN1234/ai-voice-comic-maker)

## Known Limitations / 既知の制限

- Output quality depends on provider availability, model behavior, prompt complexity, and user-provided input.
- The rewrite layer reduces short draft failures but does not guarantee literary excellence.
- Long-form expansion is a beta workflow. It uses multiple provider calls for chapter generation, AI review, and optional brush-up, so it can take longer and consume more API quota than standard generation.
- AI review and pass/fail labels are revision aids, not publication guarantees.
- Generated text can still require human editing for tone, originality, factual accuracy, legal safety, and publication quality.
- Current QA verifies representative real browser output, not all possible input combinations.

- 出力品質は、API提供元の状態、モデル挙動、プロンプトの複雑さ、ユーザー入力に左右されます。
- 改稿レイヤーは短すぎる初稿の失敗を減らしますが、文学的完成度を保証するものではありません。
- 長編化はβワークフローです。章生成、AI講評、任意のブラッシュアップで複数回API通信を行うため、通常生成より時間とAPI使用量が増えます。
- AI講評と合否表示は改稿補助であり、公開品質を保証するものではありません。
- 生成本文は、トーン、独自性、事実性、法的安全性、公開品質のために人間の編集が必要になる場合があります。
- 現在のQAは実ブラウザでの代表的出力検証であり、すべての入力組み合わせを保証するものではありません。

## Release History / 変更履歴

### v5.0.7 (2026-06-15)

- Added optional automatic long-form brush-up until the AI review reaches the passing score, capped at three attempts.
- Documented the revived long-form beta workflow as an Output-based expansion and brush-up system rather than a normal output chip.
- Clarified that long-form review uses AI scoring, pass/fail display, and concrete revision directions for the next brush-up.
- Kept brush-up runs labeled as brush-up while they are running, preserved AI review state on failed brush-up attempts, and prevented brush-up output from shrinking below the long-form minimum.
- 合格点に達するまで自動ブラッシュアップする任意チェックを追加し、最大3回で止まるようにしました。
- 復活した長編βを、通常の出力チップではなく、Outputを起点にした長編化・ブラッシュアップ機能として説明しました。
- 長編講評がAI点数、合否表示、次回ブラッシュアップ用の具体的改稿指示を返すことを明記しました。
- ブラッシュアップ中のボタン表示、失敗時のAI講評保持、長編最低文字数を下回る短縮の補強を修正しました。

### v5.0.6 (2026-06-15)

- Stabilized standard-generation API responsiveness after the output-assist split, including OpenAI/Gemini in-app browser runs.
- Locked the style analyzer controls while normal story generation is active, then restored them after completion.
- Kept the standard typewriter cursor attached to live Output text and removed it after final rendering.
- Preserved imported/longified titles so longification and Kakuyomu preview do not fall back to an unnamed novel title.

### v5.0.5 (2026-06-14)

- Removed trailing `タイトル:` draft fragments across all public output modes when a provider appends a new title after the completed body.
- Added regression coverage for all visible public modes so the version footer remains while the extra trailing title fragment is removed.
- APIが完成本文の末尾に新しい `タイトル:` 下書きを付け足した場合、全公開出力モードでその断片を除去するようにしました。
- 全公開モードの回帰テストを追加し、バージョンフッターは保持しつつ余計な末尾タイトルだけ削ることを確認しました。

### v5.0.4 (2026-06-13)

- Restored smooth typewriter-style live output for standard public generation so large API chunks no longer appear as one sudden burst.
- Kept the output panel scroll anchored to the live manuscript instead of jumping down into the style analyzer section while text is streaming.
- Added more informative standard-generation progress signals, including current phase, dialogue count, sensory detail count, and choice/action signals.
- Removed medium-novel restart artifacts where a completed three-section draft could begin again from `タイトル:` / `第1節`, and trimmed trailing title-only artifacts before the footer.
- 標準公開生成の本文ライブ表示をタイプライター風に戻し、大きなAPIチャンクが一気に表示されたように見えないようにしました。
- 本文ストリーム中のスクロール位置をOutput本文に固定し、作風解析エンジンの下へ勝手に飛ばないようにしました。
- 標準生成の進捗ログに、現在フェーズ、会話数、感覚描写数、選択・行動シグナルを追加しました。
- 中編小説で完結後に `タイトル:` / `第1節` から再開する生成アーティファクトと、末尾タイトルだけ残るアーティファクトを除去しました。

### v5.0.3 (2026-06-13)

- Reframed the app concept around moving away from similar AI-default stories and pursuing reasonably interesting outputs through concrete conflict, timing, texture, and mode-specific endings.
- Documented the current interestingness methods: human friction, aftermath visibility, mode-complete endings, and browser-backed calibration across Gemini/OpenAI outputs.
- Fixed `4koma_scenario` cleanup so a multi-line final fourth-panel `狙い:` block is preserved instead of being trimmed into an empty footer-only ending.
- Added stricter `4koma_scenario` rewrite gating so incomplete final aim blocks are rejected before the text is accepted.
- Added documentary cleanup that restores or normalizes a closing `締め:` label when the generated text has a documentary closing but lacks the required final label.
- Verified all 14 visible non-long public modes on both Gemini and OpenAI in the in-app browser after the fixes.

- アプリのコンセプトを、AI特有の似たり寄ったりなストーリーから離れ、具体的な葛藤、間、手触り、モード別の締めによって、そこそこ面白い出力を追求する方向へ整理しました。
- 現在の面白さメソッドとして、人間的な摩擦、後始末の可視化、モードとしての完走、Gemini / OpenAI 実ブラウザ出力での調整をREADMEへ追記しました。
- `4koma_scenario` の最終整形で、4コマ目の複数行 `狙い:` が削られてフッターだけになる問題を修正しました。
- `4koma_scenario` の改稿ゲートを強化し、4コマ目の狙いが実質未完成の出力を採用しないようにしました。
- ドキュメンタリー出力で、締めに相当する段落があるのに `締め:` ラベルが欠ける場合、最終整形で復元・正規化するようにしました。
- 修正後、内蔵ブラウザで Gemini / OpenAI の両方について、可視の非長編14公開モードすべてを再確認しました。

### v5.0.2 (2026-06-13)

- Centralized the public release version and Story Maker footer text in `src/version.js`.
- Moved browser API-session persistence used by the legacy UI flow into `src/apiSession.js`.
- Connected `src/main.js`, public cleanup, and the long-form assembler to the shared version/footer module so release bumps no longer require scattered footer edits.
- Kept the long-form development path hidden from the public UI unless it is explicitly enabled for development.

- 公開版数と Story Maker フッター表記を `src/version.js` に集約しました。
- 既存UIフローが使うブラウザ内APIセッション保持を `src/apiSession.js` へ分離しました。
- `src/main.js`、公開出力整形、長編アセンブラを共通の版数・フッターモジュールにつなぎ、リリース時の表記ずれを起こしにくくしました。
- 長編開発ルートは、開発用に明示的に有効化した場合を除き、公開UIに出ない状態を維持しました。

### v5.0.1 (2026-06-11)

- Raised the public release line from `v5.0.0` to `v5.0.1`.
- Preserved user-entered API keys across local hot reloads and tab-local reloads without committing keys to repository files.
- Strengthened public output cleanup for all supported modes, including footer retention, prompt-artifact removal, letter paragraphing, diary labels, documentary/radio labels, and complete 4-koma scenario trimming.
- Added generic Essay structure recovery so long unlabeled drafts can be reshaped into `主張`, `観察`, `考察`, and `結論` without adding topic-specific local rules.
- Rechecked Gemini and OpenAI public modes for length, visible format, footer retention, and human-texture quality in the in-app browser.

- 公開版の系統を `v5.0.0` から `v5.0.1` に更新しました。
- ユーザーが画面で入力したAPIキーを、リロードやホットリロードをまたいでタブ内に保持できるようにしつつ、リポジトリ内のファイルには保存しない設計を維持しました。
- フッター保持、プロンプト断片の除去、手紙の段落、日記ラベル、ドキュメンタリー/ラジオのラベル、4コマシナリオの完結位置など、対応公開モード全体の最終出力整形を強化しました。
- 長いエッセイ初稿がラベルなしで返った場合でも、話題固有の局所ルールを足さず、`主張`、`観察`、`考察`、`結論` へ汎用的に復元する処理を追加しました。
- Gemini / OpenAI の公開モードについて、文字数、表示形式、フッター保持、人間味のある具体性を内蔵ブラウザで再確認しました。

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
- Kept API keys out of repository files, release notes, release assets, and public static files.

- 公開READMEを、現在サポート中の公開機能に合わせて全面整理しました。
- 画面で選択中の出力モードを優先する公開品質契約を追加しました。
- 汎用公開ルールガードを追加しました。
- 短すぎる公開モード初稿を表示前に同じAPIで改稿する処理を追加しました。
- Gemini / OpenAI の両方で、対応14公開モードを実ブラウザ検証しました。
- APIキーをリポジトリ、リリースノート、リリース成果物、公開静的ファイルへ含めないことを確認しました。

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

- Built the core static story generator, multi-axis randomization, character controls, style-analysis support, image-assisted input, and GitHub Pages publishing workflow.

- 静的な物語生成基盤、多軸ランダム、登場人物操作、作風解析補助、画像入力補助、GitHub Pages 公開手順を構築しました。
