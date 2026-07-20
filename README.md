# Story Maker v5.3.6 / AI物語メーカー

[!['ChatGPT Image 2026年6月25日 22_19_30'](https://github.com/user-attachments/assets/d850ac7f-aa1c-40cc-a378-b8c6673c726c)](https://youtu.be/pqYVxUUg0Cs?si=27g1I3tO2EuZkOuxJ)

Story Maker is a static web application for generating creative text with Google Gemini API or OpenAI API. Its 15 public output modes include direct `Long-form (10,000 characters+)` generation, and every supported Output can receive an AI editorial score and guarded brush-up. It is not a plain prompt box. It combines output mode, theme, genre, worldview, audience, era, ending style, narration, characters, source material, optional image input, and optional style analysis into a structured generation contract.

Story Maker は、Google Gemini API または OpenAI API を使って創作文を生成する静的Webアプリです。15の公開出力モードには「長編（10000字～）」の直接生成が含まれ、対応するすべてのOutputでAI編集採点と安全判定付きブラッシュアップを使えます。単なるプロンプト入力欄ではなく、出力モード、テーマ、ジャンル、世界観、読者層、時代、結末、語り口、登場人物、素材入力、画像入力、作風解析を組み合わせて、生成用の契約を組み立てます。

## API Key Safety / APIキーの安全性

API keys are entered by the user in the browser UI. The repository, README, release notes, release assets, and public static files must not contain API keys, private credentials, billing data, or personal secrets.

APIキーはユーザーがブラウザUIへ入力します。リポジトリ、README、リリースノート、リリース成果物、公開静的ファイルには、APIキー、秘密資格情報、課金情報、個人的な秘密情報を含めてはいけません。

API keys are kept only in the active page memory and are cleared on reload or when the page closes. They are not stored in `localStorage`, `sessionStorage`, or `window.name`. Keys are sent only to the selected provider when an API request is made for generation, image understanding, style analysis, or news-grounded keyword assistance. Story Maker does not send API keys to the repository, issue tracker, release system, documentation, or unrelated external services. URL body fetching through third-party proxy services is disabled; paste source text directly instead. See [PRIVACY.md](./PRIVACY.md) for the full policy.

APIキーは、生成、画像理解、作風解析、ニュース接地キーワード補助などで必要なAPIリクエストを行う時だけ、選択中のAPI提供元へ送信されます。Story Maker は、APIキーをリポジトリ、Issue、リリース管理、公開文書、無関係な外部サービスへ送信しません。

Do not paste API keys into issues, pull requests, release notes, screenshots, public documents, or chat logs.

APIキーを Issue、Pull Request、リリースノート、スクリーンショット、公開文書、チャットログへ貼らないでください。

## Core Concept / 基本コンセプト

The app builds a generation request from multiple visible axes instead of relying on one free-form prompt. The goal is to move generated stories away from the similar, overly neat, AI-like patterns that often appear by default, and toward outputs that at least pursue a decent level of interestingness through concrete conflict, timing, texture, and mode-specific endings.

このアプリは、自由入力だけに頼らず、複数の見える創作軸から生成リクエストを組み立てます。狙いは、AI特有の似たり寄ったりで整いすぎたストーリーから離れ、短時間の生成でも、具体的な葛藤、間、手触り、モードごとの締めによって、そこそこ面白いところを追求することです。

![Story Maker 物語生成アルゴリズム 全体図](docs/images/story-maker-algorithm-overview.png)

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

| Area / 領域 | Feature / 機能 | Details / 詳細 |
|---|---|---|
| API<br>API | Gemini / OpenAI switching<br>Gemini / OpenAI 切り替え | Switch the selected provider from the UI while keeping the visible creative settings.<br>画面上の創作設定を保ったまま、利用するAPI提供元を切り替えます。 |
| API<br>API | Runtime key entry<br>実行時キー入力 | API keys are typed into the browser UI by the user and must not be committed or published.<br>APIキーはユーザーがブラウザUIへ入力し、リポジトリや公開物へ含めません。 |
| API<br>API | Provider links<br>キー取得リンク | Header links help the user reach Gemini API and OpenAI API key pages.<br>ヘッダーから Gemini API と OpenAI API のキー取得ページへ移動できます。 |
| Generation<br>生成 | 15 public output modes<br>15公開出力モード | Each public mode has its own expected structure and cleanup behavior. The public set includes direct `Long-form (10,000 characters+)` generation.<br>各公開モードには、期待される構造と整形処理があります。公開モードには直接生成の「長編（10000字～）」も含まれます。 |
| Generation<br>生成 | Selected-mode priority<br>選択モード優先 | The selected output chip wins over incidental words inside prompts or source material.<br>プロンプトや素材文中の偶然の語より、選択中の出力チップを優先します。 |
| Generation<br>生成 | Direct long-form generation<br>長編の直接生成 | `Long-form (10,000 characters+)` creates one complete long manuscript directly from the selected settings. It is separate from the sealed legacy chapter-by-chapter long-novel mode.<br>「長編（10000字～）」は、選択中の設定から一つの完結した長編原稿を直接生成します。封印中の旧章単位長編モードとは別経路です。 |
| Randomization<br>ランダム | All-random<br>全項目ランダム | Randomizes the visible creative axes and starts generation immediately.<br>見えている創作軸をまとめてランダム化し、そのまま生成します。 |
| Randomization<br>ランダム | Per-section random<br>セクション別ランダム | Individual sections can be randomized without changing the whole request.<br>全体を変えず、特定セクションだけを個別にランダム化できます。 |
| Locking<br>固定 | Section locks<br>セクションロック | Locked sections are protected from randomization and reset where applicable.<br>ロックした欄は、対応するランダム化やリセットから保護されます。 |
| Characters<br>人物 | Character count controls<br>人数調整 | Add or remove character slots with plus/minus controls.<br>プラス/マイナスで登場人物枠を増減できます。 |
| Characters<br>人物 | Manual character fields<br>手動項目 | Name, sex, role, personality, and notes can be edited per character.<br>名前、性別、役割、性格、メモを人物ごとに編集できます。 |
| Characters<br>人物 | Character randomization<br>人物ランダム | Randomize current character content, or randomize count plus content.<br>現在人数のまま内容だけ、または人数込みで人物をランダム生成できます。 |
| Characters<br>人物 | Character sheet image import<br>キャラクターシート画像 | Drop PNG/JPG/WEBP character sheets and convert visible traits into character settings.<br>PNG/JPG/WEBP画像から人物情報を読み取り、設定へ反映します。 |
| Intake<br>素材 | Universal Input<br>万能インプット | Add text, Markdown, URLs, local text files, and images as story context.<br>テキスト、Markdown、URL、ローカルテキスト、画像を文脈として投入できます。 |
| Intake<br>素材 | Asset list<br>素材一覧 | Added materials can be reviewed and cleared from the intake area.<br>追加した素材を一覧で確認・クリアできます。 |
| News<br>ニュース | News keywords<br>ニュースキーワード | Gemini search grounding can turn current Japanese news topics into creative seeds.<br>Gemini検索グラウンディングで日本語ニュース話題を創作の種にできます。 |
| Style<br>作風 | Style analyzer<br>作風解析 | Analyze text or images into writing-style parameters.<br>テキストや画像から文体パラメータを抽出します。 |
| Style<br>作風 | JSON export<br>JSON出力 | Export style analysis as structured JSON for external writing workflows.<br>作風解析結果を外部の文章ワークフロー向けJSONとして出力できます。 |
| Style<br>作風 | Style rewrite<br>作風リライト | Rewrite generated output using the analyzed style while keeping the plot direction.<br>生成済み出力の筋を保ったまま、解析した文体で書き換えます。 |
| Output<br>出力 | Character counter<br>文字数表示 | Output area shows current character count.<br>出力欄で現在の文字数を表示します。 |
| Output<br>出力 | Tags<br>タグ表示 | Output tags show selected provider/model/mode and major generation axes.<br>API、モデル、モード、主要軸をタグとして表示します。 |
| Output<br>出力 | Copy and text export<br>コピーとテキスト出力 | Generated text can be copied or exported as a timestamped `.txt` file.<br>生成結果をコピーまたはタイムスタンプ付き `.txt` として書き出せます。 |
| Progress<br>進捗 | Thought log<br>思考ログ | Shows progress messages while API communication is running.<br>API通信中の進行メッセージを表示します。 |
| Quality<br>品質 | Mode contracts<br>モード契約 | Each public mode receives a required output shape.<br>公開モードごとに必須の出力形を指定します。 |
| Quality<br>品質 | Short-draft rewrite<br>短すぎる初稿の改稿 | Too-short public drafts are rewritten before they are accepted as final output.<br>公開モードの初稿が短すぎる場合、最終採用前に改稿します。 |
| Quality<br>品質 | Universal AI review and brush-up<br>全モードAI講評・ブラッシュアップ | Every generated, pasted, or imported manuscript receives a three-tier AI review and guarded rewrite: 90+ editorial pass, 85–89 publishable with optional brush-up, and 84 or below needs brush-up.<br>生成・貼り付け・インポートしたすべての原稿を三段階でAI採点し、安全判定付きで改稿できます。90点以上は編集合格、85〜89点は公開可能・任意ブラッシュアップ、84点以下は要ブラッシュアップです。 |
| Quality<br>品質 | Final cleanup<br>最終出力整形 | Prompt artifacts, stale completion markers, and unreadable endings are cleaned before display.<br>プロンプト断片、古い完了マーカー、読みにくい終端を表示前に整えます。 |
| Quality<br>品質 | Completion gates<br>完走ゲート | Mode-specific endings such as final 4-koma scenario aim and documentary closing labels are checked or restored.<br>4コマシナリオ末尾の狙い、ドキュメンタリーの締めなど、モード固有の終端を確認・復元します。 |

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

The public release supports the following 15 output modes. Each mode has a mode contract, so the label is not decorative: the generated text is expected to follow the shape of that mode.

公開版では次の15モードに対応します。各モードには出力契約があり、単なるラベルではありません。生成本文は、そのモードに合った形で出力されます。

| Mode / モード | Japanese Label / 日本語ラベル | Expected Output Shape / 想定出力形式 |
|---|---|---|
| `4koma` | 4コマ漫画風 | Four-panel beat structure with setup, turn, punchline, visual action, and dialogue.<br>導入、展開、オチ、視覚的な動き、セリフで構成する4コマ形式です。 |
| `4koma_scenario` | AI 4koma シナリオ連携（STEP2） | Topic, logline, location, outfit, punchline, scenario notes, and four panel blocks with emotion/camera/dialogue cues.<br>テーマ、ログライン、場所、服装、オチ、シナリオメモと、感情・カメラ・セリフを含む4コマ分のブロックを出力します。 |
| `short_short` | ショート（1500字～） | Compact prose with setup, turn, aftertaste, and a final line that changes the meaning.<br>導入、転換、余韻を備え、最後の一文で意味が変わる短い物語です。 |
| `novel` | 短編小説（4500字～） | Scene-based short fiction with desire, obstacle, choice, cost, and relationship change.<br>欲求、障害、選択、代償、関係性の変化を場面で描く短編小説です。 |
| `medium` | 中編小説（5500字～） | Three-section prose with stronger development, scene movement, and a larger emotional arc.<br>展開、場面の推移、感情の変化を厚く描く3節構成の中編小説です。 |
| `long_10000` | 長編（10000字～） | One complete long-form manuscript generated directly from the selected premise, with a 10,000 non-whitespace body-character minimum and a finished ending.<br>選択した前提から直接生成する完結した長編原稿です。空白を除く本文10,000字以上と、物語として完結した結末を必須とします。 |
| `scenario` | 脚本/台本 | `タイトル:`, `登場人物:`, `場面:` plus stage directions and character-name dialogue.<br>`タイトル:`、`登場人物:`、`場面:`に加え、ト書きと役名付きのセリフを出力します。 |
| `manga` | ストーリー漫画 | Page and panel descriptions, separated `絵:`, `セリフ:`, and `演出:` details.<br>ページ・コマごとの説明を、`絵:`、`セリフ:`、`演出:`に分けて出力します。 |
| `essay` | エッセイ | Claim, observation, reflection, and conclusion without escaping into incident-resolution fiction.<br>出来事を解決する物語へ逃げず、主張、観察、考察、結論を組み立てます。 |
| `poem` | 詩・ポエム | Title plus line-based poetic output with concrete images and no explanatory afterword.<br>題名と行単位の詩本文を出力し、具体的なイメージを用い、説明的な後書きは付けません。 |
| `fairy` | 童話/絵本 | Gentle story form with visible action, lesson-like change, and child-readable clarity.<br>目に浮かぶ行動、教訓につながる変化、子どもにも読みやすい明快さを備えた物語です。 |
| `letter` | 手紙/書簡体 | `宛先:`, paragraphized body, closing, sender, and relationship change through written voice.<br>`宛先:`、段落を分けた本文、結び、差出人を含め、書かれた言葉を通じた関係性の変化を描きます。 |
| `diary` | 日記/独白体 | Date-like or diary-like first-person reflection with self-deception and a small truth.<br>日付や日記らしい形式で、自己欺瞞と小さな真実を含む一人称の内省を描きます。 |
| `documentary` | ドキュメンタリー | `ナレーション:`, testimony, observation, unresolved question, and factual-feeling structure.<br>`ナレーション:`、証言、観察、未解決の問いを用い、事実を追うような構成にします。 |
| `radio` | ラジオドラマ | `BGM:`, `SE:`, narration, dialogue, and sound-driven scene movement.<br>`BGM:`、`SE:`、ナレーション、セリフを用い、音を軸に場面を展開します。 |

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

## Direct Long-Form And Universal Brush-Up / 長編直接生成と全モード共通ブラッシュアップ

The current public long-form design has two clearly separated parts. `Long-form (10,000 characters+)` is a normal output chip that generates one complete long manuscript directly from the selected settings. The section below Output is no longer a Longify expansion tool: it is a universal AI editorial review and brush-up tool for every public output mode.

現在の公開版の長編機能は、二つの役割に分かれています。「長編（10000字～）」は通常の出力チップで、選択中の設定から一つの完結した長編原稿を直接生成します。Output下のコーナーは長編化ツールではなく、全公開モードで使えるAI講評・ブラッシュアップ機能です。

### At A Glance / 全体像

| Topic / 項目 | Current behavior / 現行動作 |
|---|---|
| Direct long-form<br>長編直接生成 | Select `Long-form (10,000 characters+)` before generation. The app requests one completed long manuscript and validates a 10,000+ non-whitespace body-character minimum and a closed ending.<br>生成前に「長編（10000字～）」を選びます。一つの完結した長編として生成し、空白を除く本文10,000字以上と完結した終端を検証します。 |
| Universal review<br>全モードAI講評 | After any supported mode finishes, the selected provider reviews the visible Output and shows a 0–100 score, a three-tier state, and paragraph-preserving commentary: 90+ editorial pass, 85–89 publishable, 84 or below needs brush-up.<br>対応モードの生成完了後、選択中のAPIが表示中Outputを読み、0～100点、三段階判定、段落を保持した講評を表示します。90点以上は編集合格、85〜89点は公開可能、84点以下は要ブラッシュアップです。 |
| Universal brush-up<br>全モードブラッシュアップ | `この小説をブラッシュアップ` rewrites the current Output in its active output format. It can also use text pasted into Output or imported from TXT/MD.<br>「この小説をブラッシュアップ」は、現在のOutputを選択中の出力形式のまま改稿します。Outputへ貼り付けた本文やTXT/MDからインポートした本文にも使えます。 |
| Legacy path<br>旧長編経路 | The old chapter-by-chapter `long` mode and its long-novel control panel remain sealed and are not the supported public route.<br>旧章単位の `long` モードと長編小説コントロールパネルは封印中で、公開版の利用経路ではありません。 |
| Posting previews<br>投稿補助 | Kakuyomu-style and Alphapolis-style previews read the latest Output independently of review and brush-up.<br>Kakuyomuフォーム風・アルファポリスフォーム風プレビューは、講評・ブラッシュアップとは別に最新Outputを読み取ります。 |

### Recommended Workflow / 推奨手順

1. Choose an output mode. For a new long manuscript, select `Long-form (10,000 characters+)`.
2. Set the theme, genre, worldview, audience, ending, narration, characters, and optional source material.
3. Generate the manuscript, or paste/import an existing manuscript into Output.
4. Read the automatically displayed AI score and commentary.
5. Leave automatic brush-up on for up to three attempts toward the 100-point target, or turn it off to run exactly one rewrite per click. A score of 90 or higher passes.
6. Review the retained Output, then copy, save as TXT, or use the posting previews.

1. 出力モードを選びます。新しい長編を作る場合は「長編（10000字～）」を選びます。
2. テーマ、ジャンル、世界観、読者層、結末、語り口、登場人物、必要なら素材を設定します。
3. 原稿を生成するか、既存原稿をOutputへ貼り付け／TXT・MDインポートします。
4. 自動表示されるAI点数と講評を確認します。
5. 84点以下だけを最大3回まで自動ブラッシュアップできます。85〜89点は公開可能で、必要なときだけ手動ブラッシュアップを使います。90点以上は編集合格です。
6. Outputに保持された原稿を確認し、コピー、TXT保存、投稿プレビューを使います。

### Display And Controls / 表示と操作

| UI element / UI要素 | Behavior / 動作 |
|---|---|
| Status line<br>状態表示 | Shows review acquisition, pass, needs brush-up, completion score, or failure with manuscript preservation.<br>講評取得中、合格、要ブラッシュアップ、完了点数、または元原稿保持を伴う失敗を表示します。 |
| Score card<br>点数カード | Uses a full-width card with a large score, `/100`, pass/needs-brush-up label, score bar, and optional attempt count.<br>全幅カードに大きな点数、`/100`、合格／要ブラッシュアップ、スコアバー、必要に応じて実行回数を表示します。 |
| Commentary<br>講評 | Preserves paragraphs and line breaks so concrete revision advice remains readable instead of becoming one dense line.<br>具体的な改稿指示が一行に潰れないよう、段落と改行を保持して表示します。 |
| Brush-up button<br>ブラッシュアップボタン | Disabled until Output contains a usable manuscript of at least 20 visible characters. While running, settings are protected from conflicting changes.<br>Outputに20文字以上の利用可能な原稿が入るまで無効です。実行中は競合する設定変更を防ぎます。 |
| Automatic checkbox<br>自動チェック | ON: automatically rewrites only manuscripts at 84 or below, stopping once the retained score reaches 85 or after three attempts. OFF: performs one rewrite attempt per click; scores from 85 to 89 remain available for optional manual brush-up.<br>ON: 84点以下だけを自動改稿し、保持点が85点に達するか最大3回で停止します。OFF: クリックごとに1回だけ改稿します。85〜89点は公開可能として任意の手動ブラッシュアップを使えます。 |

### Review And Adoption Pipeline / 講評・採用パイプライン

| Step / 手順 | What happens / 処理 | Safety purpose / 安全目的 |
|---|---|---|
| 1. Read Output<br>Output読解 | Reads the currently visible generated, pasted, or imported manuscript and the active output mode.<br>表示中の生成・貼り付け・インポート原稿と、選択中の出力モードを読み取ります。 | Keeps the review tied to the manuscript the user can actually see.<br>ユーザーが実際に見ている原稿を講評対象に固定します。 |
| 2. AI review<br>AI講評 | Requests a structured score and concrete commentary from the selected provider. If the review format is invalid, it retries once with stricter format instructions.<br>選択中のAPIへ構造化された点数と具体的講評を求めます。形式不正なら、形式指定を強めて1回再取得します。 | No local placeholder score is shown as a real review.<br>ローカルの仮点数を実講評として表示しません。 |
| 3. Rewrite<br>改稿 | Sends the current manuscript, active mode, current score, and commentary to the selected provider, requesting completed manuscript text only.<br>現在の原稿、出力モード、点数、講評を選択中APIへ渡し、完成稿本文だけを求めます。 | Preserves the subject, characters, facts, ending, and output format while targeting diagnosed weaknesses.<br>主題、人物、事実、結末、出力形式を保ち、指摘された弱点だけを直します。 |
| 4. Re-review<br>再講評 | Scores the rewrite before it can replace Output.<br>改稿候補がOutputを置き換える前に再採点します。 | A rewrite is not accepted merely because an API returned text.<br>APIが文章を返しただけでは採用しません。 |
| 5. Candidate gate<br>候補採用判定 | Adopts only a format-valid, completed, non-duplicated candidate whose score is higher than the retained manuscript.<br>形式が正しく、完結し、段落重複がなく、保持中原稿より高得点の候補だけを採用します。 | Prevents a polished-looking regression from overwriting a better draft.<br>見た目だけ整った劣化稿が良い原稿を上書きするのを防ぎます。 |
| 6. Continue or stop<br>継続／停止 | With auto mode ON, repeats only while the retained score is 84 or below, stopping at 85 or after three attempts. Completion distinguishes editorial pass (90+), publishable (85–89), and needs brush-up (84 or below).<br>自動ONでは保持点が84点以下の間だけ改稿し、85点到達または3回実行で停止します。完了時は「編集合格（90点以上）」「公開可能（85〜89点）」「要ブラッシュアップ（84点以下）」を分けて表示します。 | Gives a bounded quality loop and reports the appropriate publication state.<br>上限付きの品質ループにし、公開判断に使える状態を明示します。 |

### Manuscript Protection / 原稿保護

| Risk / リスク | Result / 結果 |
|---|---|
| API or review failure<br>API・講評失敗 | Output is restored to the manuscript present before the brush-up began, and the review card states that the manuscript was preserved.<br>ブラッシュアップ開始前の原稿をOutputへ戻し、講評カードにも原稿保持を表示します。 |
| Lower or invalid score<br>点数低下・採点不正 | The candidate is rejected because it did not prove an improvement.<br>改善を証明できないため候補を破棄します。 |
| Major content loss<br>大幅な本文消失 | For any source of 500+ characters, a candidate below 60% of the current manuscript length is rejected.<br>500文字以上の元原稿では、現在原稿の60%未満まで短縮した候補を破棄します。 |
| Incomplete ending<br>未完の終端 | Candidates ending in continuation markers, unfinished sentences, or unclosed dialogue are rejected.<br>続き表示、文の途中、閉じていない会話で終わる候補を破棄します。 |
| Duplicate paragraphs<br>段落重複 | Repeated substantial paragraphs are rejected.<br>実質的な同一段落の重複がある候補を破棄します。 |
| Direct long-form falls below contract<br>長編契約未達 | In `long_10000`, a candidate must still satisfy the dedicated 10,000+ non-whitespace body-character and completion checks.<br>`long_10000` では、空白を除く本文10,000字以上と完結チェックを改稿後も満たす必要があります。 |

### Long-Output Timing / 長文処理時間

Direct `Long-form (10,000 characters+)` generation and brush-up of a long manuscript may take several minutes. The OpenAI Responses path allows up to 600 seconds for these long-output stages. Review-only calls keep a shorter timeout because they return commentary rather than a full manuscript.

「長編（10000字～）」の直接生成と長い原稿のブラッシュアップは、数分かかる場合があります。OpenAI Responses経路では、長文を返す段階に最大600秒を確保します。講評だけの通信は全文原稿を返さないため、より短いタイムアウトを使います。

## Current Quality System / 現行品質システム

The current v5.3.6 release line keeps direct public `Long-form (10,000 characters+)` generation while providing visible, score-driven universal AI editorial review and brush-up. The legacy long-novel path remains sealed.

現在のv5.3.6系では、直接生成の「長編（10000字～）」を維持しつつ、全モードAI講評と進捗・採点結果が見える安全な点数駆動ブラッシュアップを提供します。旧来の長編小説経路は封印したままです。

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

For direct long-form generation and long-manuscript brush-up, the OpenAI Responses route uses an extended long-output timeout. The same universal 90-point pass score, 100-point brush-up target, and guarded adoption rules apply regardless of provider; provider availability, latency, and output quality can still differ.

長編直接生成と長い原稿のブラッシュアップでは、OpenAI Responses経路に長文用の拡張タイムアウトを使います。どのAPIでも全モード共通の三段階判定（90点以上の編集合格、85〜89点の公開可能、84点以下の要ブラッシュアップ）と安全な候補採用規則を適用しますが、モデルの利用可否、処理時間、出力品質は提供元ごとに異なる場合があります。

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

| Method / メソッド | Purpose / 目的 |
|---|---|
| Desire and cost<br>欲望と代償 | Make the character want something and pay something, even in a short piece.<br>短い文章でも、人物が何かを望み、何かを払う構造を作ります。 |
| Choice focus<br>選択の焦点化 | Avoid ending only with an event; make someone choose, refuse, hide, or accept something.<br>出来事だけで終わらせず、誰かが選ぶ、拒む、隠す、受け入れる瞬間を作ります。 |
| Information order<br>情報開示の順番 | Control what the reader knows first, what is withheld, and what is reinterpreted at the end.<br>読者が先に知ること、伏せること、最後に意味が変わることを制御します。 |
| Relationship change<br>関係変化 | Make at least one distance, trust level, misunderstanding, or obligation shift.<br>距離、信頼、誤解、義務のどれかが変わるようにします。 |
| Sensory anchoring<br>感覚の接地 | Add touch, smell, sound, light, weight, or bodily discomfort to reduce abstract summary.<br>触覚、匂い、音、光、重さ、身体の違和感を入れ、抽象的な要約を避けます。 |
| Human friction<br>人間的な摩擦 | Add hesitation, misunderstanding, minor failure, awkward silence, fatigue, or small damage so the scene does not become too smooth.<br>ためらい、勘違い、小さな失敗、気まずい沈黙、疲れ、少しの損を入れ、場面が滑らかすぎないようにします。 |
| Aftermath visibility<br>後始末の可視化 | Show what remains after the gag, decision, or conflict: cleanup, a shifted object, embarrassment, debt, relief, or a changed distance.<br>ギャグ、決断、衝突のあとに残る片付け、動いた物、恥、借り、安堵、変わった距離を見せます。 |
| Anti-template pressure<br>テンプレ回避 | Avoid the most obvious genre route and over-familiar moral closure.<br>もっともありがちなジャンル展開や安易な教訓で終わらないようにします。 |
| Last-line design<br>最後の一文設計 | Use the final line to turn, collect, echo, or sharpen the meaning instead of merely stopping.<br>ただ止めるのではなく、意味を反転、回収、反響、凝縮する一文を狙います。 |
| Mode-complete ending<br>モードとしての完走 | Finish in the shape the selected mode needs, not in a generic prose ending.<br>汎用的な小説風の終わりではなく、選択された形式に必要な終端まで書き切ります。 |
| Browser-backed calibration<br>ブラウザ実出力での調整 | Judge the method by actual Gemini/OpenAI browser outputs across modes, not by prompt intent alone.<br>プロンプト上の意図だけでなく、Gemini / OpenAI の実ブラウザ出力をモード別に見て判断します。 |

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
- Kakuyomu-style and Alphapolis-style posting previews
- the universal AI review score card, commentary, and brush-up controls
- optional style-analysis card

出力欄には次を表示します。

- 生成本文
- おおよその文字数
- 選択モードと主要軸タグ
- 利用できる場合のAPI/モデルタグ
- コピーとテキスト出力操作
- Kakuyomuフォーム風・アルファポリスフォーム風の投稿プレビュー
- 全モード共通のAI講評点数カード、講評、ブラッシュアップ操作
- 任意の作風解析カード

## Randomization / ランダム生成

The all-random button randomizes the visible creative axes and starts generation. Locked sections keep their current values. The output-mode section can also be randomized when it is unlocked.

「全項目ランダム」は、見えている創作軸をまとめてランダム化し、そのまま生成を開始します。ロック中のセクションは現在値を維持します。出力モード欄が未ロックなら、出力モードも再抽選されます。

Individual section random buttons are available for focused exploration, such as changing only the theme, only characters, or only genre.

個別セクションのランダムボタンもあり、テーマだけ、登場人物だけ、ジャンルだけなど、範囲を絞って試せます。

### Independent Axes / 独立軸

| Axis / 軸 | Role / 役割 |
|---|---|
| Output mode<br>出力モード | Decides the final format and required labels.<br>完成形式と必須ラベルを決めます。 |
| Theme / seed<br>テーマ・シード | Provides premise, incident, topic, or emotional trigger.<br>前提、事件、話題、感情の起点を与えます。 |
| Genre<br>ジャンル | Sets story pressure, expectation, pacing, and payoff style.<br>物語圧、期待、テンポ、回収の方向を決めます。 |
| Worldview<br>世界観 | Sets setting logic, props, social rules, and atmosphere.<br>舞台論理、小道具、社会ルール、空気感を決めます。 |
| Target reader<br>読者層 | Adjusts density, accessibility, tone, and genre literacy.<br>密度、読みやすさ、トーン、ジャンル文脈の前提を調整します。 |
| Era<br>時代 | Controls technology level, vocabulary, social background, and anachronism risk.<br>技術水準、語彙、社会背景、時代錯誤リスクを調整します。 |
| Ending type<br>結末 | Sets closure pattern, twist, open question, circular return, or emotional residue.<br>閉じ方、反転、問い、円環、余韻を決めます。 |
| Narration<br>語り口 | Sets viewpoint, distance, voice, and presentation style.<br>視点、距離、声、見せ方を決めます。 |
| Characters<br>登場人物 | Supplies roles, relationships, personalities, and conflict engines.<br>役割、関係、性格、葛藤のエンジンを与えます。 |
| Universal Input<br>万能インプット | Adds external text or image context.<br>外部テキストや画像の文脈を追加します。 |
| Supplement<br>補足メモ | Adds constraints that do not fit the preset sections.<br>プリセット欄に入らない制約を追加します。 |
| Style analysis<br>作風解析 | Adds extracted writing-style parameters for rewrite or guidance.<br>リライトや生成補助に使う文体パラメータを追加します。 |

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

| Source Type / 素材種別 | Behavior / 動作 |
|---|---|
| Plain text<br>通常テキスト | Added directly as source context.<br>そのまま素材文脈として追加します。 |
| Markdown<br>Markdown | Keeps headings and structured notes useful for prompt context.<br>見出しや構造化メモを文脈として活かします。 |
| `.txt` / `.md` files<br>`.txt` / `.md` ファイル | Reads local text files into the intake list.<br>ローカルテキストファイルを取り込み一覧へ読み込みます。 |
| URL<br>URL | Adds a source reference where the current workflow supports it.<br>現在のワークフローで対応できる範囲で参照素材として追加します。 |
| Image<br>画像 | Uses image understanding where the selected provider supports it.<br>選択中のAPIが対応する場合、画像理解を使います。 |
| Multiple assets<br>複数素材 | Combines several pieces of material with the selected generation settings.<br>複数の素材を、選択済み生成条件と組み合わせて扱います。 |

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
* **文章生成**: Gemini / OpenAI それぞれに合わせた15公開モード別プロンプト契約と、10,000字以上の長編直接生成
* **画像理解**: 対応APIでのキャラクターシート読み取りと万能インプット画像解析
* **作風解析**: テキスト/画像からの文体抽出、構造化JSON出力、作風リライト
* **品質レイヤー**: モード契約、短稿改稿、API別補正、全モードAI講評、90点編集合格・85点公開可能・84点以下の最大3回ブラッシュアップ、安全な候補採用、最終出力整形
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

* **Source Code**: Released under the [MIT License](./LICENSE), including the implementation and its included prompt templates.
  ソフトウェア実装コードおよび同梱のプロンプトテンプレートは [MIT License](./LICENSE) で公開します。
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

#### 1. Super FURU AI 4-koma System
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
- [Explanation / 解説](https://note.com/happy_duck780/n/ne462dfc55ec8)
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

#### 7. Monogatari Buzz Maker / 物語バズメーカー
A trend-to-story planning tool that converts public Web/RSS signals into practical manga, short video, explainer video, and novel briefs. / 公開Web/RSSの話題シグナルを、漫画・ショート動画・解説動画・小説の実用企画へ変換する創作支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ncc593101d77f)
- [Demo / デモ](https://furuyan1234.github.io/viral-radar/)
- [Code / コード](https://github.com/FURUYAN1234/viral-radar)

## Known Limitations / 既知の制限

| Area / 領域 | Limitation / 制限 | Practical meaning / 実用上の意味 |
|---|---|---|
| Provider behavior<br>API挙動 | Output quality depends on provider availability, model behavior, prompt complexity, and user-provided input.<br>出力品質は、API提供元の状態、モデル挙動、プロンプトの複雑さ、ユーザー入力に左右されます。 | The same settings can still produce different quality depending on Gemini/OpenAI state and input difficulty.<br>同じ設定でも、Gemini/OpenAI側の状態や入力の難しさによって品質は変動します。 |
| Rewrite layer<br>改稿レイヤー | The rewrite layer reduces short draft failures but does not guarantee literary excellence.<br>改稿レイヤーは短すぎる初稿の失敗を減らしますが、文学的完成度を保証するものではありません。 | It catches common structural failures, but human editing can still be necessary.<br>構造的な失敗は減らしますが、人間の編集が不要になるわけではありません。 |
| Direct long-form<br>長編直接生成 | The public `Long-form (10,000 characters+)` mode requests at least 10,000 non-whitespace body characters and a completed ending.<br>公開版の「長編（10000字～）」は、空白を除く本文10,000字以上と完結した終端を要求します。 | It is AI generation, not an exact character-count or publication-quality guarantee. Very long responses can take several minutes or fail because of provider limits.<br>AI生成であり、文字数ぴったりや出版品質を保証するものではありません。長文応答は数分かかるか、提供元の制限で失敗する場合があります。 |
| AI review and brush-up<br>AI講評・ブラッシュアップ | The score and commentary are AI-generated editorial signals, not an objective certification.<br>点数と講評はAIによる編集上の目安であり、客観的な品質認証ではありません。 | A candidate is adopted only after mechanical and score checks, but users should still read the retained manuscript before publishing.<br>候補は機械判定と点数改善を通った場合だけ採用しますが、公開前には保持された原稿を必ず人が確認してください。 |
| AI review<br>AI講評 | AI review and pass/fail labels are revision aids, not publication guarantees.<br>AI講評と合否表示は改稿補助であり、公開品質を保証するものではありません。 | A passing score means the AI review judged it usable, not that the manuscript is ready for public release without human judgment.<br>合格点はAI講評上の判定であり、人間の判断なしに公開品質を保証するものではありません。 |
| Publication readiness<br>公開前確認 | Generated text can still require human editing for tone, originality, factual accuracy, legal safety, and publication quality.<br>生成本文は、トーン、独自性、事実性、法的安全性、公開品質のために人間の編集が必要になる場合があります。 | Users remain responsible for final use and publication decisions.<br>最終利用と公開判断の責任はユーザー側に残ります。 |
| QA scope<br>QA範囲 | Current QA verifies representative real browser output, not all possible input combinations.<br>現在のQAは実ブラウザでの代表的出力検証であり、すべての入力組み合わせを保証するものではありません。 | Passing QA means tested scenarios worked, not that every possible prompt and file combination is guaranteed.<br>QA通過は検証済みシナリオの通過であり、全入力パターン保証ではありません。 |

## Release History / 変更履歴

### v5.3.6 (2026-07-20)

- API keys are now page-memory-only: legacy `sessionStorage` and `window.name` restore paths are cleared and disabled.
- URL body retrieval through CodeTabs and AllOrigins is blocked; the app now directs users to paste source text instead.
- Added GitHub Actions CI, an MIT license, and linked public privacy policy. Production bundles are split into core, editorial, long-form, and style-analysis chunks.
- Real API smoke tests completed for both OpenAI and Gemini from the local browser UI without reading key values.

### v5.3.5 (2026-07-17)

- Restored automatic high-score brush-up for 85–99-point reviews, capped at three attempts, while retaining only score-improving candidates.
- Made sub-100 editorial reviews actionable: exact passages, point-loss reasons, and matching numbered revision actions are now visible in the app.
- Fixed the GPT-5.x Responses request so unsupported temperature parameters do not force fallback, and made all review text boxes wrap safely.

### v5.3.4 (2026-07-16)

- Added a three-tier editorial state: 90+ is editorial pass, 85–89 is publishable with optional manual brush-up, and 84 or below needs brush-up. Automatic brush-up now runs only for the last tier and stops once the retained score reaches 85 or the three-attempt cap.
- Added cognitive-rhythm editorial guidance for fiction and practical writing. The review now checks for document-progress prose that does not update the subject matter, source-grounded concrete/abstract movement, unresolved commitments, and rubric leakage without adding new facts.
- 90点以上を編集合格、85〜89点を公開可能・任意ブラッシュアップ、84点以下を要ブラッシュアップとする三段階判定を追加しました。自動ブラッシュアップは要ブラッシュアップ時だけ実行し、保持点が85点に達するか最大3回で停止します。
- 小説／実用文向けに認知リズムの編集観点を追加しました。対象の進行を更新しないメタ進行文、原稿内の根拠に基づく具体と抽象の往復、未解消事項、編集用語の本文露出を確認し、新しい事実は加えません。

### v5.3.3 (2026-07-12)

- Added automatic brush-up start after the initial review when the checkbox is enabled, with a 100-point target and up to three attempts.
- Added visible API activity, elapsed seconds, attempt progress, progressive manuscript rendering, and a single final Story Maker footer.
- Reused the latest review for each attempt and displayed every candidate score, adoption decision, and rejection reason.
- Clarified the 90-point pass line versus the 100-point target and now reports exhausted below-pass runs as explicitly unpassed.

- 自動ブラッシュアップON時は初回講評後に自動開始し、100点を目標として最大3回まで実行します。
- API稼働状況、経過秒、試行回数、本文の流れる表示、最後に1回だけ付与するフッターを追加しました。
- 各回で直近講評を再利用し、候補点、採用・不採用、拒否理由を進捗ログへ表示します。
- 合格90点と目標100点を分離し、最大回数終了時に90点未満なら未合格と明示します。

### v5.3.2 (2026-07-11)

- Replaced public Longify expansion with universal AI editorial review and `この小説をブラッシュアップ`.
- Added an 82-point pass gate, up to three automatic attempts, original-text rollback, and cross-mode content-loss rejection.
- Long-form generation and 10,000+ character brush-up calls use a 10-minute OpenAI Responses timeout.
- Restored a full-width score card with a 32 px score, readable commentary, and preserved paragraph breaks.

### v5.3.1 (2026-07-11)

- Added the public `長編（10000字～）` mode while preserving the existing short and medium modes.
- The mode generates the long story directly through the standard provider path and remains separate from the sealed legacy long-novel route.
- Added fail-closed checks for a minimum 10,000-character body, completion, and duplicate paragraphs.
- Real OpenAI browser proof completed with 20,785 body characters and no dedicated validation issues.

### v5.3.0 (2026-07-08)

- Changed the default OpenAI text path to GPT-5.x Responses beta with fallback to GPT-5.5, GPT-5.4, GPT-5.4-mini, and the existing Chat Completions route.
- Kept normal generation on GPT-5.5 first while letting Longify continue across the GPT-5.x fallback chain.
- Prevented post-evaluation fallback notices from overwriting completed standard Output.
- Kept Longify retry behavior for repeated episode arcs, but after retries are exhausted it can accept an otherwise valid chapter with an explicit warning instead of failing the whole run.
- OpenAI実ブラウザ検証で、通常生成は `gpt-5.5 (Responses beta)`、Longify betaは `gpt-5.4 (Responses beta)` で3章10,916字・AI講評82点・形式/構造チェック合格を確認しました。

### v5.2.9 (2026-07-08)

- Added a Longify brush-up quality-precision contract so each chapter rewrite carries opening state, turning action, ending state, required delta, and concrete anchors.
- Added event-target repetition detection to catch chapter pairs that reuse the same action-target shape even when raw keywords differ.
- Fed `quality_precision_review` guidance into the Longify AI review prompt so weak causal deltas, anchors, or character-state changes reduce the review score and return chapter directions.

- Longifyブラッシュアップに品質精度契約を追加し、各章の改稿が開始状態、転換行動、終了状態、必須差分、具体アンカーを持つようにしました。
- 生のキーワードが違っていても同じ行動対象パターンを繰り返す章ペアを検出できるよう、event-target反復検出を追加しました。
- LongifyのAI講評プロンプトへ `quality_precision_review` を渡し、因果差分、アンカー、人物状態変化が弱い場合に点数と章別方針へ反映されるようにしました。

### v5.2.8 (2026-07-06)

- Kept the legacy long-novel output mode fail-closed while the public Longify beta remains the supported long-form path.
- Fed structure warnings into Longify top-up prompts so episode-retake warnings steer additions toward irreversible progress instead of replaying old scenes.
- Added regression coverage for both the sealed legacy long-mode prompt path and the top-up warning injection.

### v5.2.7 (2026-07-02)

- Reopened Longify beta in the public/default UI as a limited beta for OpenAI-recommended 10,000/20,000-character expansion while keeping 30,000+ targets disabled.
- Kept the old legacy long-novel output mode sealed; this release only reopens the downstream Longify beta panel.
- Recorded the 86-point OpenAI browser proof as a reusable verification sample for future regression checks.

- 公開/通常UIで長編化βを限定βとして再開しました。OpenAI推奨の10,000字/20,000字長編化は使える一方、30,000字以上は引き続き無効化しています。
- 旧来の長編小説出力モードは封印を維持しています。今回の再開対象は、Output後段の長編化βパネルだけです。
- 86点のOpenAI実ブラウザ検証結果を、今後の回帰確認に使える検証サンプルとして記録しました。

### v5.2.6 (2026-07-02)

- Reopened Longify beta only for local development with `?longifyBetaDev=1`, while keeping the public/default page sealed.
- Relaxed final `episode_retake` handling into an advisory warning, tightened hard chapter-loop detection, and added brush-up progression ledgers so accepted chapter progress can guide later rewrites.
- Verified a real OpenAI local-dev run through seed generation, 10,000-character expansion, and manual brush-up: the final browser output reached 3 chapters, 11,222 posting-site characters, format/structure pass, and an 82-point AI review. The AI review still notes subjective scene-role repetition, so further literary redesign remains needed.

- `?longifyBetaDev=1` 付きのローカル開発URLだけで長編化βを再開し、公開/通常URLでは引き続き封印したままにしました。
- 最終稿の `episode_retake` を警告扱いへ緩和し、強い章ループ判定を絞り込み、ブラッシュアップ時に章ごとの進行台帳を渡して後続章の改稿が同じ出来事を再演しにくいようにしました。
- OpenAIの実APIで、通常生成、10,000字長編化、手動ブラッシュアップまで内蔵ブラウザで検証しました。最終結果は3章、投稿サイト換算11,222字、形式/構造チェック合格、AI講評82点です。ただしAI講評上は場面役割の主観的な反復感が残っており、さらに点数を上げるには文学設計側の再検討が必要です。

### v5.2.5 (2026-06-28)

- Paused the public Longify beta after a real in-app 20,000-character expansion plus three automatic brush-up attempts failed to reach a structure-safe passing result.
- Added broader structural guards for repeated episode arcs across chapters and repeated event loops inside a chapter, while keeping the Longify beta entry point disabled until a stronger redesign is available.
- Updated the public UI so the Longify beta button, auto brush-up checkbox, and target selector are disabled with an explicit paused status instead of allowing another unreliable run.

- 内蔵ブラウザで20,000字長編化と最大3回の自動ブラッシュアップを実行しても、構造的に安全な合格結果へ到達しなかったため、公開版の長編化βを停止しました。
- 章をまたいだ同一エピソードの再演と、章内のイベント列ループを検出する構造ガードを追加しました。ただし、より強い再設計ができるまでは長編化βの入口は無効化しています。
- 公開UIでは、長編化βボタン、自動ブラッシュアップ、目標文字数選択を無効化し、不確かな再実行ではなく停止状態を明示するようにしました。

### v5.2.4 (2026-06-28)

- Clarified the initial Output guide so imported or pasted text is described as usable for the Kakuyomu preview, the Alphapolis preview, and the source text for `この小説を長編化`.

- 初期Output案内文を修正し、貼り付けまたはインポートした本文が、Kakuyomuプレビュー、アルファポリスプレビュー、そして `この小説を長編化` の元本文として使えることを明記しました。

### v5.2.3 (2026-06-23)

- Raised the public Longify beta selectable ceiling from 10,000 to 20,000 characters after a real in-app OpenAI proof passed 24,464 submission characters, format check, structure check, and an 84-point AI review.
- Kept 30,000+ targets disabled after a temporary OpenAI proof reached 34,549 characters after brush-up but failed the structure gate due to repeated final-chapter content.
- Documented the current 20,000-character public ceiling and the 30,000+ pause in the README feature details, Longify beta details, known limitations, and release history.

- 内蔵ブラウザのOpenAI実証で、24,464字、形式チェック合格、構造チェック合格、AI講評84点を確認したため、公開版Longify betaの選択可能上限を10,000字から20,000字へ引き上げました。
- 一時的な30,000字OpenAI検証では、ブラッシュアップ後に34,549字へ到達したものの、最終章の反復により構造チェック不合格となったため、30,000字以上は引き続き無効化しています。
- READMEの機能詳細、長編化β詳細、既知の制限、変更履歴に、現時点の公開上限が20,000字であることと30,000字以上の停止理由を明記しました。

### v5.2.2 (2026-06-21)

- Retired the hidden M4 ten-chapter dev proof route as a release/proof target and kept M4 URL pins disabled.
- Moved visible Longify beta target choices into runtime policy so the standard UI rebuilds `#longify-target-chars` from the same source as chapter-count logic.
- Fixed the standard empty-output page so the Longify target select no longer stays on the temporary loading placeholder.
- Verified the visible standard Longify beta API route on Gemini through seed generation, 10,000-character expansion, and auto brush-up execution without browser crash or console errors. Gemini long-form quality remains a known provider limitation and is not treated as a release blocker.

### v5.2.1 (2026-06-19)

- Updated the shared Gemini fallback chain to start with `gemini-3.5-flash`, followed by `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-flash-latest`, and `gemini-pro-latest`.
- Aligned the default Gemini model used for standard generation and longify beta provider calls with the shared fallback chain.
- Updated `4koma_scenario` for the current Nano Banana Pro STEP2 contract by adding per-panel `状況:` fields and mandatory quoted speech-bubble dialogue.
- Added a pre-deploy Nano 4koma contract check so Story Maker stops before deploy when Nano Banana Pro's STEP2 contract changes.
- Kept the OpenAI text and vision chains unchanged because they already match the current `gpt-4.1` first fallback order.

- Geminiの共通フォールバックチェーンを `gemini-3.5-flash` 先頭に更新し、`gemini-2.5-flash`、`gemini-2.5-pro`、`gemini-flash-latest`、`gemini-pro-latest` の順に揃えました。
- 通常生成と長編化βのGemini初期モデルを、共通フォールバックチェーンに合わせました。
- `4koma_scenario` を現行Nano Banana Pro STEP2契約に合わせ、各コマの `状況:` と吹き出し用の引用台詞を必須化しました。
- Nano Banana ProのSTEP2契約が変わった場合に、Story Maker側の追従漏れをデプロイ前に止めるチェックを追加しました。
- OpenAIのテキスト/画像認識チェーンは、現行の `gpt-4.1` 先頭構成と一致しているため変更していません。

### v5.2.0 (2026-06-18)

- Temporarily limited the longify beta UI to the 10,000-character target while keeping larger targets visible as stopped options, with an in-app notice that multi-ten-thousand-character generation is paused due to AI resource limits.
- Added copy and TXT export actions for the longify review panel.
- Kept Kakuyomu catch copy output within 35 characters and made the limit visible in the preview.
- Tightened Alphapolis preview choices so HOT ranking and category values are selected from the real option lists, removed copy buttons from posting checks, and limited episode posting actions to title/body copy.

- 長編化βの文字数指定は、数万字以上を当面停止の選択肢として表示しつつ、UIからは10,000字のみ選べるようにしました。AIリソース不足による一時停止の注意書きも追加しました。
- 長編化の講評欄に、講評コピーとTXT保存を追加しました。
- Kakuyomuのキャッチコピーを35文字以内に収め、その上限をプレビュー内にも表示しました。
- Alphapolisプレビューでは、HOTランキング用ジャンルとカテゴリを実際の選択肢へ丸め、投稿前チェックのコピー導線を外し、話投稿の操作を話タイトルコピーと本文コピーだけに絞りました。

### v5.1.9 (2026-06-18)

- Replaced the longify-beta storyboard/scene-card detector's sample-specific runtime terms with generic scene/location/object terms only.
- Added a generic-rule guard so longify runtime files fail checks if sample-specific detector terms or hidden 10,000-character / 3-chapter auto-overrides are reintroduced.
- 長編化βの場面カード検出語からサンプル固有の地名・店名・人物名を外し、汎用的な場所・場面・小物語だけに置き換えました。
- 長編化ランタイムにサンプル固有語や 10,000字 / 3章の隠し自動上書きが再混入した場合、generic-rules で検出して落ちるようにしました。

### v5.1.8 (2026-06-18)

- Reverted the uncommitted longify-beta experimental hardening that was added after the last stable OpenAI proof, returning the deploy target to the v5.1.7 structural-fix line.
- Kept the stable longify-beta behavior that was verified before those experiments: 10,000-character / 3-chapter OpenAI run with one brush-up reaching 83 points, format check passed, structure check passed, and no episode-retake detection.
- 直近の安定実証後に追加された未コミットの長編化β実験変更を戻し、v5.1.7 の構造修正ラインを公開対象に戻しました。
- 安定実証済みの挙動（OpenAI APIで10,000字・3章・1回ブラッシュアップ後83点、形式チェック合格、構造チェック合格、episode_retake検出なし）を基準にしました。

### v5.1.7 (2026-06-18)

- 長編モード（長編化β）の構造バグを修正。章間に実際の物語状態を引き継ぐ連続性メモ、言い換え再演（ループ）検出、学年・設定の矛盾検出、トークン切れ（尻切れ）の自動継続、完成稿の構造健全性チェックを追加。
- Fixed structural bugs in long-novel mode: a real cross-chapter continuity digest (was content-free boilerplate), beat-based re-enactment-loop detection, school-level/setting contradiction gating, mid-sentence truncation detection with auto-continuation, and a deterministic whole-manuscript structure audit. New module `src/longifyContinuity.js` with unit tests.

### v5.1.6 (2026-06-17)

- Aligned the Alphapolis paste-form preview with the real submission form options shown in the user-provided screenshots.
- HOT ranking now uses only `未選択`, `男性向け`, and `女性向け`; category, length, status, rating, tag, and chapter-setting candidates now follow the Alphapolis form more closely.
- Added per-tag copy buttons, default `AI生成作品` tagging, two-choice chapter setting support, and posting-guideline reminder checks.
- ユーザー提供スクリーンショットに合わせて、アルファポリス貼り付け用フォームプレビューの選択肢を実フォーム寄りに修正しました。
- HOTランキングは `未選択`、`男性向け`、`女性向け` のみにし、カテゴリ、長編/短編、執筆状態、R指定、タグ、章設定の候補をアルファポリス仕様へ近づけました。
- タグごとのコピーボタン、`AI生成作品` のデフォルトタグ、2択の章設定、投稿ガイドライン確認項目を追加しました。

### v5.1.5 (2026-06-17)

- Added an Alphapolis form-style paste preview next to the existing Kakuyomu preview.
- The preview builds Alphapolis-ready fields from Output: title, content introduction, HOT ranking genre, category, length, writing status, rating, tags, cover image state, and impression setting.
- Chaptered manuscripts are split into episode blocks with separate copy controls for chapter name, episode title, and episode body.
- The preview also refreshes after manual Output paste/import and after long-form expansion or brush-up completion.
- 既存のカクヨムプレビューに加えて、アルファポリス向けのフォーム風貼り付けプレビューを追加しました。
- Outputから、タイトル、内容紹介、HOTランキング用ジャンル、カテゴリ、長編/短編、執筆状態、R指定、タグ、表紙画像状態、感想受付の候補を生成します。
- 章付き本文は話単位に分割し、章名、話タイトル、本文をそれぞれコピーできるようにしました。
- Outputへの手動貼り付け/TXTインポート後や、長編化/ブラッシュアップ完了後にも自動更新されます。

### v5.1.4 (2026-06-17)

- Made longify beta progress labels explicit for longification versus brush-up, including round labels such as `ブラッシュアップ 2周目/3・4/6章`.
- Tightened brush-up score regression handling so any lower AI review score keeps the best previous manuscript instead of overwriting the Output.
- Added final-format cleanup for bracketed chapter headings, title labels, speaker-cue script lines, and storyboard-style directive residue in longify/brush-up drafts.
- Documented longify beta fallback and rollback behavior, including source restoration, short-chapter preservation, top-up suppression during compression, and best-manuscript retention.
- 長編化βの進捗表示で、長編化中かブラッシュアップ中か、また `ブラッシュアップ 2周目/3・4/6章` のような周回と章番号が分かるようにしました。
- ブラッシュアップ後にAI講評点が下がった場合は、Outputを低得点稿で上書きせず、これまでの最高点稿を保持するようにしました。
- 長編化/ブラッシュアップ草稿に残る角括弧付き章見出し、タイトルラベル、話者名つき脚本行、演出指示風の残骸を最終整形で掃除するよう補強しました。
- 長編化βのフォールバックとロールバック挙動として、元章復元、短すぎる章の保持、圧縮中の補強抑制、最高点稿保持をREADMEに明記しました。

### v5.1.3 (2026-06-17)

- Added a Gemini-specific warning to the longify beta panel explaining that Gemini API is not recommended for longification or auto brush-up to an 80+ pass score after repeated real-browser verification stalled around 45-68 points despite meeting formal shape requirements.
- Kept OpenAI as the recommended provider for users trying to reach the longify beta 80+ AI review target.
- Added regression coverage for the provider warning state and tightened markdown-wrapped manga/script artifact cleanup around longify drafts.
- 長編化βパネルに、Gemini API は長編化や80点以上合格狙いの自動ブラッシュアップでは非推奨であることを表示しました。実ブラウザ検証では形式条件を満たしても45〜68点付近で停滞したためです。
- 80点以上を狙う長編化βでは OpenAI API を推奨する案内を明示しました。
- API提供元警告の回帰テストを追加し、長編化草稿でMarkdown強調付きの漫画/脚本形式ラベルが残るケースも掃除・検出できるよう補強しました。

### v5.1.2 (2026-06-16)

- Fixed longify beta so queued auto brush-up waits for the button to become runnable instead of stopping after a single disabled-state check.
- Added a clean stop path for queued auto brush-up so the progress title and log no longer stay stuck at `API稼働中` when the queued pass cannot start.
- Verified the fix with fresh real API runs in the in-app browser: Gemini auto brush-up now starts automatically after a failing longify review, and OpenAI keeps auto brush-up off after an 84-point pass.
- 長編化βの自動ブラッシュアップ予約が、ボタンの一時的な無効状態を見ただけで止まらないように修正しました。
- 予約済みブラッシュアップが開始不能だった場合も、進捗タイトルやログが `API稼働中` のまま残らないよう停止処理を整理しました。
- 内蔵ブラウザでの実API再検証を行い、Gemini では不合格長編化後に自動ブラッシュアップが実際に開始され、OpenAI では 84点合格後に自動ブラッシュアップが走らないことを確認しました。

### v5.1.1 (2026-06-16)

- Fixed generation settings JSON import so selected output-mode and axis chips stay selected instead of becoming manual/free-input fields.
- Restored imported character settings exactly, without triggering name/sex auto-inference or random name replacement during import.
- Removed a local attachment path from quality-boost tests and kept the regression coverage in repository-safe inline samples.

- 生成条件JSONのImportで、出力モードや各軸の選択チップが手入力扱いに化ける問題を修正しました。
- Import時に名前/性別の自動推定やランダム名生成が走らないようにし、キャラクター設定をJSON通りに復元するよう修正しました。
- qualityBoostテストからローカル添付パスを除去し、リポジトリ内の安全なインラインサンプルで回帰確認を維持しました。

### v5.1.0 (2026-06-15)

- Fixed standard public-mode cleanup so OpenAI documentary output cannot collapse to an empty `締め:` block after a complete generation.
- Hardened documentary restart detection so repeated documentary labels such as `ナレーション:` are not treated as a second draft unless the kept candidate remains complete and long enough.
- Added regression coverage for empty trailing documentary closing labels and reran the fresh 14-mode matrix for both Gemini and OpenAI.
- OpenAIのドキュメンタリー出力が完了後に空の `締め:` だけへ潰れる問題を修正しました。
- `ナレーション:` などドキュメンタリーで自然に再登場するラベルを、本文を壊す下書き再開として誤検出しないよう強化しました。
- 空のドキュメンタリー締めラベルの回帰テストを追加し、Gemini/OpenAI両方で14モードの再検証を行いました。

### v5.0.9 (2026-06-15)

- Fixed long-form beta auto brush-up so the default checkbox stays on for the first run and clears only after a passing review with the target length met, or after the maximum three automatic attempts.
- Confirmed that a high AI review score is not treated as passing when the selected minimum character count is still unmet.
- Hardened long-form ending recovery for OpenAI by preserving exact source-ending anchors when the model paraphrases the final repair.
- 長編βの自動ブラッシュアップ初回チェックをONに保ち、目標文字数達成＋合格点、または最大3回到達時だけ自動でOFFになるよう修正しました。
- AI講評が高得点でも、選択中の最低文字数に届いていなければ合格扱いにしないことを確認しました。
- OpenAIが最終補強を言い換えた場合でも、元本文終盤アンカーを保持して結末回収できるよう長編化の終盤復帰を強化しました。

### v5.0.8 (2026-06-15)

- Fixed long-form chapter extraction so a model response that repeats multiple chapters cannot leak the next chapter into the current chapter.
- Made long-form AI review pass/fail respect the selected minimum character count, so a high score still shows `needs brush-up` until the target is reached.
- Updated automatic brush-up to use the selected long-form target as the rewrite and top-up floor, including the 30,000-character preset.
- Preserved the original chapter when an AI brush-up rewrite is too short, then continued the chain instead of stopping or shrinking the manuscript.
- 長編化中にAI応答が複数章を含んでも、現在章へ次章本文が混ざらないように章抽出を修正しました。
- AI講評の合否判定を選択中の最低文字数と連動させ、高得点でも文字数未達なら「要ブラッシュアップ」と表示します。
- 自動ブラッシュアップの章別改稿・不足補強が、30,000字など選択中の最低文字数を目標にするよう修正しました。
- AI改稿が短すぎる章は元章を保持して処理を継続し、長編原稿が縮む・止まる状態を避けます。

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
