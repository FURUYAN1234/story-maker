# Story Maker v4.9.6 / AI物語メーカー

> Stop generating predictable stories. Start generating stories that surprise you.
>
> 予定調和な物語ではなく、自分が驚ける物語を生成するためのAI物語メーカーです。

Story Maker is a browser-based AI story generator using Google Gemini API and OpenAI API. It combines output mode, theme, genre, era, worldview, target reader, ending style, narration, character settings, and source materials as independent creative axes so generated stories do not collapse into the same predictable pattern.

Story Maker は、Google Gemini API と OpenAI API に対応したブラウザ型の物語生成アプリです。出力モード、テーマ、ジャンル、時代、世界観、読者層、結末、語り口、登場人物、素材入力を独立した創作軸として組み合わせ、似たり寄ったりなAI出力を避けることを目的としています。

## Public Status / 公開状況

- Current public version: `v4.9.6`
- Public page: https://furuyan1234.github.io/story-maker/
- Repository: https://github.com/FURUYAN1234/story-maker
- Local development port in Antigravity: `5179`
- Long-novel mode is not promoted as a public feature in this README. It remains below the public release-quality bar and is treated as suspended for now.

- 公開版: `v4.9.6`
- 公開ページ: https://furuyan1234.github.io/story-maker/
- リポジトリ: https://github.com/FURUYAN1234/story-maker
- Antigravity でのローカル開発ポート: `5179`
- 長編モードは公開品質基準を満たすまで、公開機能として紹介しません。現在は公開停止扱いです。

## API Key Safety / APIキーの安全性

- API keys are entered by the user in the browser UI.
- The public app does not include API keys in repository files, release notes, release assets, or deployed static files.
- The public app does not intentionally save API keys permanently. Keys are treated as runtime input for the current browser page.
- API requests are sent only to the selected provider needed for generation, style analysis, image understanding, or news grounding.
- The app is a bring-your-own-key tool. Users should manage provider usage, billing, and key rotation on the provider side.
- Do not paste API keys into issues, pull requests, release notes, screenshots, or public documentation.

- APIキーはユーザーがブラウザUIに入力します。
- リポジトリファイル、リリースノート、リリース成果物、デプロイ済み静的ファイルには APIキーを含めません。
- 公開版アプリは APIキーを永続保存しません。キーは現在のブラウザページでの実行時入力として扱います。
- APIリクエストは、生成、作風解析、画像理解、ニュース取得などに必要な場合だけ、選択中の提供元へ送信されます。
- このアプリはユーザー所有キーで利用するツールです。利用量、課金、キーのローテーションは各API提供元側で管理してください。
- APIキーを issue、pull request、release note、スクリーンショット、公開文書に貼らないでください。

## Feature Overview / 機能概要

Story Maker is built as a multi-axis prompt compiler rather than a single text box. The app collects user choices, random selections, locked fields, character settings, and source material, then assembles a generation contract for the selected output mode.

Story Maker は単なるテキスト入力欄ではなく、多軸プロンプトコンパイラとして構成されています。ユーザーの選択、ランダム抽選、固定項目、登場人物設定、素材入力を集め、選択した出力モードに合わせて生成条件を組み立てます。

### Main Feature List / 主要機能一覧

| Area | Feature | Japanese |
|---|---|---|
| API | Gemini / OpenAI switching | Gemini / OpenAI 切り替え |
| API | User-entered runtime key | ユーザー入力式APIキー |
| Randomization | All-random generation | 全項目ランダム生成 |
| Randomization | Per-section random buttons | セクション別ランダム |
| Randomization | Output-mode reroll in v4.9.6 | v4.9.6 出力モード再抽選 |
| Locking | Section locks | セクション固定 |
| Mode | 14 public non-long output modes | 公開対象14モード |
| Character | Character count control | 人数調整 |
| Character | Name, sex, role, personality fields | 名前・性別・役割・性格 |
| Character | Character content randomization | 登場人物内容ランダム |
| Intake | Text and Markdown source input | テキスト・Markdown入力 |
| Intake | URL source input | URL素材入力 |
| Intake | Image source input | 画像素材入力 |
| Intake | Character sheet image reading | キャラシート画像読み取り |
| Style | Style analysis | 作風解析 |
| Style | Style rewrite | 作風リライト |
| News | Today's news keyword assist | 今日のニュースキーワード |
| Output | Copy output | コピー |
| Output | Timestamped text export | 時刻付きテキスト保存 |
| Quality | Mode-specific format contracts | モード別形式契約 |
| Quality | Paragraph readability cleanup | 段落読みやすさ整形 |
| Quality | Narrative structure guidance | 物語構造ガイド |

## Public Output Modes / 公開出力モード

The public release targets these 14 non-long output modes. Each mode has its own expected shape, not just a different label.

公開版では、以下の非長編14モードを対象にしています。各モードは単なるラベルではなく、完成形の形式契約を持ちます。

| Mode | Japanese label | Target output shape |
|---|---|---|
| 4-panel manga plot | 4コマ漫画風 | Four-beat gag or story structure with setup, turn, and punchline |
| AI 4koma scenario link | AI 4koma シナリオ連携（STEP2） | Scenario text with location, emotion, dialogue, and panel-compatible structure |
| Flash fiction | ショート（〜1000字） | Compact fiction with a clear setup and payoff |
| Short story | 短編小説（〜3000字） | One-shot prose with scene flow and emotional landing |
| Novella | 中編小説（〜4000字） | Longer short fiction with richer scene and character movement |
| Script | 脚本 / 台本 | Dialogue-centered script with staging and line flow |
| Story manga | ストーリー漫画 | Manga-style scene beats, panel rhythm, and visual action |
| Essay | エッセイ | Reflective prose with a point of view and thematic development |
| Poem | 詩・ポエム | Image-driven poetic language and rhythm |
| Fairy tale / picture book | 童話 / 絵本 | Simple, readable story with picture-book or folk-tale tone |
| Letter | 手紙 / 書簡体 | Letter-style prose with addressee and emotional voice |
| Diary / monologue | 日記 / 独白体 | First-person reflection and interior voice |
| Documentary | ドキュメンタリー | Report-like structure with observation and narration |
| Radio drama | ラジオドラマ | Audio-first dialogue, sound cues, and scene transitions |

### Mode Behavior / モード別の動作

- Narrative modes receive setup, conflict, payoff, character function, and scene-dynamics guidance.
- Comedy and 4-panel modes emphasize expectation gaps, reversal, and punchline timing.
- Prose modes receive paragraph-density guidance so long blocks do not become hard to read.
- Nonfiction-like modes such as essay and documentary use argument, observation, and structure rather than forced foreshadowing.
- Audio/script modes prioritize dialogue clarity, role separation, and stage or sound cues.

- 物語系モードでは、導入、葛藤、回収、キャラクターの物語上の役割、シーン駆動を重視します。
- コメディ・4コマ系では、期待とのズレ、反転、オチのタイミングを重視します。
- 散文系モードでは、長い塊の本文にならないよう段落密度を制御します。
- エッセイやドキュメンタリーのような非小説寄りモードでは、無理に伏線を入れず、論旨・観察・構成を優先します。
- 音声・脚本系モードでは、セリフの聞き分け、役割分離、ト書きや音の手がかりを優先します。

## Randomization System / ランダム化システム

### All-Random / 全項目ランダム

- The all-random button randomizes selected axes and starts generation immediately.
- In `v4.9.6`, output mode is also rerolled when the output-mode section is not locked.
- Long-novel mode is excluded from public all-random selection.
- Locked fields are preserved.
- User-entered custom text is respected when its section is locked.

- 「全項目ランダム」ボタンで、選択対象の軸をまとめてランダム化し、そのまま生成します。
- `v4.9.6` では、出力モードがロックされていない場合、出力モードも再抽選されます。
- 公開版の全項目ランダムから長編モードは除外されています。
- ロックされた項目は保持されます。
- セクションを固定している場合、ユーザーが入力したカスタムテキストも尊重されます。

### Independent Axes / 独立した創作軸

| Axis | Description | Japanese |
|---|---|---|
| Output mode | Decides final format | 出力形式を決める |
| Theme | Main seed or subject | 物語の種・主題 |
| Genre | Emotional and structural direction | 感情・構成の方向性 |
| Era | Time period and vocabulary context | 時代と語彙 |
| Worldview | Setting logic and atmosphere | 舞台の法則と雰囲気 |
| Target reader | Tone and accessibility | 読者層 |
| Ending | Resolution pattern | 結末の型 |
| Narration | Point of view and voice | 視点・語り口 |
| Characters | Cast, roles, and relationships | 人物・役割・関係 |
| Source material | External or pasted context | 外部素材・貼り付け文脈 |

### Locks / ロック

- Each major section can be locked.
- Locked sections are skipped by randomization.
- Locks allow workflows such as "keep this character, randomize everything else" or "keep this genre, test many output modes."
- Reset actions respect the lock state.

- 主要セクションは個別に固定できます。
- 固定されたセクションはランダム化対象から外れます。
- 「この人物だけ固定して他はランダム」「このジャンルだけ固定して出力モードを試す」といった使い方ができます。
- リセット操作でも固定状態を尊重します。

## API Engine / APIエンジン

### Gemini / Gemini API

Gemini can be used for story generation, image-aware source reading, style analysis, and search-grounded news keyword extraction where the selected workflow uses those capabilities.

Gemini は、物語生成、画像素材の理解、作風解析、検索グラウンディングによるニュースキーワード取得など、対応ワークフローで利用できます。

### OpenAI / OpenAI API

OpenAI can be used for text generation and style-sensitive prose drafting. Story Maker keeps the same story settings while switching providers, so users can compare output tendencies without rebuilding the prompt manually.

OpenAI は、文章生成や文体重視の散文生成に利用できます。Story Maker は設定を保ったままAPI提供元を切り替えられるため、手作業でプロンプトを組み直さずに出力傾向を比較できます。

### Provider Switching / 提供元切り替え

- The UI has a provider switch control.
- Settings remain visible when switching.
- The selected provider is reflected in generation.
- The app does not require repository changes to switch providers.

- UI上でAPI提供元を切り替えられます。
- 切り替えても設定内容は画面上に残ります。
- 選択中の提供元が生成処理に反映されます。
- API提供元の切り替えにリポジトリ変更は不要です。

## Character System / 登場人物システム

### Character Count / 人数

- Character count can be increased or decreased.
- The app can generate character content for the selected count.
- Character count can be part of full randomization.
- Character count can also be held steady while other fields change.

- 登場人物数を増減できます。
- 選択人数に合わせて人物内容を生成できます。
- 人数も全項目ランダムの対象にできます。
- 人数だけ固定し、他の項目を変えることもできます。

### Character Fields / 人物項目

Each character can include:

各登場人物には、以下の項目を設定できます。

- Name / 名前
- Sex / 性別
- Role / 役割
- Personality / 性格
- Optional manual notes / 任意の補足

### Character Randomization / 人物ランダム

- Character content can be randomized without changing the whole app.
- Name and role can be generated as a matching set.
- Character role can be used as a story function, not only as a profile label.
- Personalities are fed into reactions, dialogue, and conflict.

- アプリ全体をランダム化しなくても、人物内容だけをランダム化できます。
- 名前と役割を組み合わせて生成できます。
- 役割はプロフィール名ではなく、物語上の機能として扱います。
- 性格はリアクション、セリフ、葛藤に反映されます。

## Universal Intake / 万能インプット

Universal Intake lets the user provide source material to influence the generated story.

万能インプットでは、生成結果に反映したい素材を投入できます。

### Supported Source Types / 対応素材

| Source type | Use | Japanese |
|---|---|---|
| Plain text | Direct context or story seed | 直接文脈・物語の種 |
| Markdown | Structured notes or drafts | 構造化メモ・下書き |
| Text file | Longer source material | 長めの素材文 |
| URL | Web source reference where supported | 対応時のWeb素材 |
| Image | Visual reference or character sheet | 画像素材・キャラシート |
| Multiple assets | Combined context | 複数素材の統合 |

### Intake Behavior / 取り込み動作

- Dropped text can be used as context.
- Markdown can preserve headings and structure.
- Images can be used when the selected provider/workflow supports image understanding.
- URL input can be used as a source reference where supported.
- Source assets are combined with selected settings rather than replacing them.

- ドロップしたテキストは文脈として利用できます。
- Markdown は見出しや構造を保った素材として扱えます。
- 画像理解が使えるワークフローでは、画像を参照素材にできます。
- URL は対応する場合、参照素材として扱えます。
- 素材入力は設定を置き換えるのではなく、選択済み設定と組み合わせて使います。

## Character Sheet Image Import / キャラクターシート画像取り込み

- Character sheet images can be dropped into the app.
- When image understanding is available, character information can be extracted.
- Extracted character details can be reflected in story generation.
- Multiple images can be handled as source material.
- This is useful for converting visual character references into story-ready text settings.

- キャラクターシート画像をアプリにドロップできます。
- 画像理解が利用できる場合、画像から人物情報を読み取れます。
- 読み取った人物情報を物語生成に反映できます。
- 複数画像を素材として扱えます。
- 視覚的なキャラクター資料を、物語生成に使えるテキスト設定へ変換する用途に向いています。

## Style Analyzer And Rewrite / 作風解析とリライト

### Style Analyzer / 作風解析

- Text can be analyzed for writing style.
- Images can contribute visual tone when supported.
- The analyzer extracts sentence rhythm, vocabulary, description focus, dialogue style, emotional design, and atmosphere.
- Results can be copied as text.
- Analysis can be performed independently before story generation.

- テキストから作風を解析できます。
- 対応する場合、画像からビジュアルトーンも取り込めます。
- 文のリズム、語彙、描写の焦点、セリフ傾向、感情設計、雰囲気などを解析します。
- 解析結果はコピーできます。
- ストーリー生成前でも作風解析を単独実行できます。

### Rewrite / リライト

- Generated text can be rewritten using analyzed style.
- The rewrite keeps the plot direction while changing tone and expression.
- This is useful when the generated story is structurally right but stylistically plain.

- 生成済み本文に、解析した作風を反映してリライトできます。
- リライトでは筋の方向性を保ちつつ、文体や表現を変えます。
- 構成は良いが文体が弱い出力を整える用途に向いています。

## Today's News Keyword Assist / 今日のニュースキーワード

- Gemini search grounding can collect current Japanese news topics.
- The app turns news topics into story seed keywords.
- The generated keyword can be inserted into the theme field.
- This is useful when the user wants timely or topical story seeds.
- News-derived keywords are treated as creative seeds, not as a guarantee of factual reporting.

- Gemini の検索グラウンディングで、現在の日本語ニュース話題を取得できます。
- ニュース話題を物語の種になるキーワードへ変換します。
- 生成されたキーワードをテーマ欄に反映できます。
- 時事性のある物語の種が欲しい場合に使えます。
- ニュース由来のキーワードは創作の種であり、報道の正確性保証ではありません。

## Local Detail Injection / ローカル辞書によるディテール注入

Story Maker can add concrete details from local in-app data based on selected settings.

Story Maker は、選択設定に応じて、アプリ内のローカル辞書から具体的なディテールを補助的に加えます。

### Detail Categories / ディテール分類

- Era-specific vocabulary / 時代ごとの語彙
- Props and tools / 小道具・道具
- Social context / 社会背景
- Sensory cues / 五感の手がかり
- Setting flavor / 舞台の手触り
- Genre tone hints / ジャンルごとの温度感

### Purpose / 目的

- Reduce vague, generic AI prose.
- Help the model write with concrete objects and places.
- Keep era and worldview details more coherent.
- Give the story more texture without forcing a fixed plot.

- 抽象的で曖昧なAI文を減らします。
- 具体的な物、場所、手触りを持った描写に寄せます。
- 時代や世界観のディテールを揃えやすくします。
- 固定プロットを押し付けず、文章の解像度を上げます。

## Prompt Compiler Architecture / プロンプトコンパイラ構造

Story Maker compiles a prompt from visible UI settings and source materials.

Story Maker は、画面上の設定と素材からプロンプトを組み立てます。

### Input Layers / 入力レイヤー

1. API provider / API提供元
2. Output mode / 出力モード
3. Theme and genre / テーマとジャンル
4. Era and worldview / 時代と世界観
5. Target reader and ending / 読者層と結末
6. Narration / 語り口
7. Character settings / 登場人物設定
8. Universal Intake materials / 万能インプット素材
9. Mode-specific output contract / モード別出力契約
10. Quality guidance / 品質ガイド

### Compilation Goals / コンパイルの目的

- Preserve the user's visible selections.
- Randomize only the axes that should be randomized.
- Keep each output mode in its required format.
- Avoid repetitive, predictable story patterns.
- Improve paragraph readability for prose modes.
- Keep the final displayed text focused on the requested output.

- ユーザーが画面で選んだ設定を保ちます。
- ランダム化すべき軸だけをランダム化します。
- 各出力モードの形式を守ります。
- 似た展開の反復を避けます。
- 散文系モードの段落の読みやすさを改善します。
- 最終表示本文を、ユーザーが求めた出力に集中させます。

## Narrative Engineering / 物語設計

Story Maker is not only a prompt form. It assembles a generation contract from multiple writing principles.

Story Maker は単なる入力フォームではなく、複数の物語設計原理を組み合わせて生成条件を構成します。

### Anti-Repetition Engine / 反復防止

- Avoid the most predictable development for the selected genre.
- Connect the selected theme indirectly or unexpectedly.
- Make each character react through their own role and personality.
- Avoid collapsing different genres into the same comedic or dramatic template.
- Prevent the selected setting from being overwritten by unrelated grand templates.

- 選択ジャンルの最もありきたりな展開を避けます。
- テーマを直接ではなく、意外性のある形で接続します。
- 各キャラクターの役割と性格に基づいて反応を分けます。
- 異なるジャンルが同じコメディ型・ドラマ型に潰れないようにします。
- 選択舞台が無関係な巨大テンプレートに上書きされることを防ぎます。

### Emotion Gap Design / 感情落差設計

The system uses expectation gaps as a core principle for laughter, fear, surprise, suspense, romance, and emotional payoff.

笑い、恐怖、驚き、サスペンス、恋愛、感動を、読者の期待と実際の展開の落差として扱います。

| Technique | Japanese | Role |
|---|---|---|
| Substitution | 置換 | Reinterpret an event in a different context |
| Exaggeration | 誇張 | Push scale or emotion beyond expectation |
| Reversal | 逆転 | Flip roles, power, or relationships |
| Absurdity | 不条理 | Insert a surprising break from logic |
| Tension and release | 緊張と緩和 | Use calm before impact |
| Normalcy return | 常識の提示 | Place a sane viewpoint inside chaos |

### Motif Recurrence / モチーフ回帰

- A symbolic item, phrase, habit, or image can appear more than once.
- The first appearance can be casual.
- Later appearances can return with changed meaning.
- The motif should connect to the emotional payoff.

- 象徴的な小道具、言葉、癖、風景を複数回登場させます。
- 初回は何気ない要素として出せます。
- 後半で意味を変えて回収できます。
- モチーフは結末の感情的な着地へ接続します。

### Emotion Curve / 感情曲線

Story Maker can guide stories through a compact emotional arc:

Story Maker は、短い物語でも感情の流れを持たせます。

```text
Setup -> Inciting Incident -> Deviation -> Build-up -> Payoff
導入 -> 事件 -> 逸脱 -> 増幅 -> 回収
```

### Scene Dynamics / シーン駆動

- Every scene should have a goal, motivation, conflict, and stakes.
- Dialogue should avoid explaining everything directly.
- Emotion should appear through behavior, sensory details, rhythm, and subtext.
- The ending should show a choice, cost, change, or consequence.

- 各シーンに目的、動機、障害、代償を持たせます。
- セリフで全てを説明しすぎないようにします。
- 感情は行動、五感、リズム、サブテキストで表現します。
- 結末には選択、代償、変化、結果を置きます。

### Tone Variation / 文体緩急

- High-energy: short sentences and rapid movement.
- Quiet-serene: slower rhythm, silence, memory, aftertaste.
- Cold-analytical: dry description, deduction, report-like clarity.

- 高熱量: 短文、畳みかけ、動きの速さ。
- 静謐: ゆっくりしたリズム、沈黙、記憶、余韻。
- 冷徹: 乾いた描写、推理、報告書的な明晰さ。

### Show, Do Not Merely Explain / 説明しすぎない描写

- Avoid replacing scenes with summaries.
- Make character decisions visible through action.
- Use sensory details where they help the scene.
- Keep exposition tied to conflict or discovery.

- 場面を要約だけで済ませないようにします。
- 人物の決断を行動で見せます。
- 必要な場面では五感描写を使います。
- 説明は葛藤や発見と結び付けます。

## Quality Gates / 品質ゲート

Story Maker applies generation-time and display-time checks to reduce common AI writing failures.

Story Maker は、AI出力にありがちな破綻を減らすため、生成時・表示時の品質確認を行います。

### Checked Areas / 確認領域

- Setup and payoff consistency / 伏線と回収の整合性
- Character role function / キャラクターの物語上の役割
- Ending pattern diversity / 結末パターンの単調化防止
- Sensory balance / 五感描写の偏り防止
- Era consistency / 時代設定の整合性
- Worldview consistency / 世界観の整合性
- Paragraph readability / 段落の読みやすさ
- Mode-specific format compliance / 出力モード別フォーマット遵守
- Avoidance of unrelated template takeover / 無関係なテンプレートへの乗っ取られ防止
- Visible output cleanliness / 表示本文の読みやすさ

### v4.9.6 Paragraph Readability / v4.9.6 段落改善

- Non-long prose modes now receive stronger paragraph-density guidance.
- Final display cleanup improves blank-line placement for prose outputs.
- Section-like transitions and paragraph boundaries are easier to scan.

- 非長編の散文系モードでは、段落密度の指示を強化しました。
- 表示前の整形で、空行の入り方を改善しました。
- 節の切り替わりや段落境界を読み取りやすくしました。

### v4.9.6 Output-Mode Contract / v4.9.6 出力モード契約

- Each public non-long mode has a clearer required output shape.
- `4koma` is kept in four-panel structure instead of falling into ordinary prose.
- Script, letter, diary, documentary, and radio drama preserve their own formats.
- Genre can change the content, but should not erase the selected output mode.

- 公開対象の非長編モードごとに、必要な完成形を明確化しました。
- `4koma` が普通の散文に落ちず、4コマ構造を保つようにしました。
- 脚本、手紙、日記、ドキュメンタリー、ラジオドラマはそれぞれの形式を保ちます。
- ジャンルは内容を変えますが、選択された出力形式を消さないようにします。

## Output And Export / 出力と保存

### Output Display / 出力表示

- The generated output is displayed in the main output panel.
- Mode chips and metadata show the active settings.
- Paragraph cleanup is applied for prose-like modes.
- The footer includes the Story Maker version marker.

- 生成結果はメイン出力欄に表示されます。
- モードチップやメタ情報で、使用中の設定を確認できます。
- 散文系モードでは段落整形が適用されます。
- フッターに Story Maker のバージョン表記が入ります。

### Copy / コピー

- The output can be copied to the clipboard.
- AI 4koma scenario output is normalized for easier downstream use.
- Copying is useful for moving results into writing tools or manga-production workflows.

- 生成結果をクリップボードへコピーできます。
- AI 4koma シナリオ出力は、後続利用しやすい形へ整えられます。
- 執筆ツールや漫画制作ワークフローへ移す用途に使えます。

### Text Export / テキスト保存

- Output can be saved as `.txt`.
- File names use timestamped naming so generated stories can be sorted chronologically.
- The saved file contains the displayed generated text.

- 生成結果を `.txt` として保存できます。
- ファイル名には時刻情報を含め、生成物を時系列で整理しやすくしています。
- 保存ファイルには、画面に表示された生成本文が入ります。

## System Feature Specifications / システム機能仕様

### 1. Settings Panel / 設定パネル

The settings panel is the main control surface. It contains output mode, theme, genre, worldview, era, target reader, ending, narration, character controls, source input, and lock/random controls.

設定パネルは主要な操作面です。出力モード、テーマ、ジャンル、世界観、時代、読者層、結末、語り口、登場人物、素材入力、固定/ランダム操作を扱います。

### 2. Output Mode Section / 出力モード欄

- Shows the public mode chips.
- Allows manual mode selection.
- Supports random mode selection unless locked.
- Excludes suspended long-novel mode from public random selection.

- 公開対象モードのチップを表示します。
- 手動で出力モードを選べます。
- ロックされていなければランダム選択できます。
- 公開停止中の長編モードは公開ランダム選択から除外されます。

### 3. Theme And Genre Sections / テーマ・ジャンル欄

- Preset chips provide quick creative seeds.
- Custom input allows direct user ideas.
- Random buttons generate new combinations.
- Locks keep selected content stable.

- プリセットチップから素早く創作の種を選べます。
- カスタム入力でユーザーの直接アイデアを入れられます。
- ランダムボタンで新しい組み合わせを作れます。
- ロックで選択内容を保持できます。

### 4. Worldview And Era Sections / 世界観・時代欄

- Worldview controls setting logic and atmosphere.
- Era controls vocabulary, technology level, and social context.
- These sections affect descriptions, props, metaphors, and plausibility.

- 世界観は舞台の法則と雰囲気を制御します。
- 時代は語彙、技術水準、社会背景に影響します。
- これらは描写、小道具、比喩、説得力に反映されます。

### 5. Target Reader And Ending Sections / 読者層・結末欄

- Target reader affects complexity, tone, and accessibility.
- Ending controls the landing pattern.
- Ending is treated as a direction, not as a fixed canned sentence.

- 読者層は文章の複雑さ、温度、読みやすさに影響します。
- 結末は着地の方向性を制御します。
- 結末は固定文ではなく、方向性として扱います。

### 6. Narration Section / 語り口欄

- Narration affects viewpoint and voice.
- It can shift output toward first person, third person, documentary voice, diary voice, letter voice, or audio drama voice depending on mode.

- 語り口は視点と声を変えます。
- モードに応じて、一人称、三人称、ドキュメンタリー調、日記調、手紙調、音声劇調などに寄せられます。

### 7. Character Section / 登場人物欄

- Character settings are fed into conflict, dialogue, and scene actions.
- Roles are used as narrative functions.
- Personality is used to differentiate reactions.

- 登場人物設定は、葛藤、セリフ、場面行動に反映されます。
- 役割は物語上の機能として扱われます。
- 性格はリアクションの違いに使われます。

### 8. Universal Intake Section / 万能インプット欄

- Source materials are optional.
- Materials can enrich the prompt when present.
- The app can combine multiple material types with manual settings.

- 素材入力は任意です。
- 入力された素材はプロンプトの文脈を補強します。
- 複数種類の素材と手動設定を組み合わせられます。

### 9. Generation Button / 生成ボタン

- Starts generation using the current settings.
- Uses the selected API provider.
- Displays progress and final output in the app.

- 現在の設定で生成を開始します。
- 選択中のAPI提供元を使います。
- 進行状況と最終出力をアプリ内に表示します。

### 10. Reset Button / リセット

- Resets visible settings where appropriate.
- Locked sections are protected.
- It is useful when starting a new setup from scratch.

- 必要に応じて画面上の設定をリセットします。
- 固定されたセクションは保護されます。
- 新しい設定を一から組み直す時に使えます。

## Verification Summary / 検証概要

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
- README scan: Japanese text is valid UTF-8 and no mojibake markers were found.
- Tag and release-note scan: no internal-only wording found.

- 全項目ランダムのブラウザ確認で、公開対象14モードすべてが出現し、長編モードは選ばれませんでした。
- Gemini API マトリクスは 14 / 14 公開モードで通過しました。
- OpenAI API マトリクスは 14 / 14 公開モードで通過しました。
- 公開アセット確認で、APIキー風パターン、秘密トークン風パターン、個人パス、意図しない固有名詞が残っていないことを確認しました。
- README はUTF-8の日本語として読める状態で、文字化けマーカーがないことを確認しました。
- tag と release note には、内部向け文言が残っていないことを確認しました。

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

## Deployment / デプロイ

- The app is built with Vite.
- `npm run build` creates the static `dist` output.
- `npm run deploy` publishes `dist` to GitHub Pages.
- GitHub Pages serves the static application.
- Users enter their own API key in the browser UI at runtime.

- Vite でビルドします。
- `npm run build` で静的な `dist` を生成します。
- `npm run deploy` で `dist` を GitHub Pages へ公開します。
- GitHub Pages は静的アプリとして配信します。
- APIキーはユーザーが実行時にブラウザUIへ入力します。

## Changelog / 変更履歴

### v4.9.6 (2026-06-08)

- Public README repaired from mojibake and rewritten with detailed public feature documentation.
- API-key safety wording restored: public builds do not include keys and do not permanently save them.
- Long-novel feature promotion removed until quality is acceptable for public release.
- All-random output-mode reroll fixed.
- Non-long paragraph readability improved.
- Gemini/OpenAI public-mode verification completed.
- Public tags, release notes, repository files, and public assets rechecked.

- README の文字化けを修正し、公開可能な詳細機能説明を再構成しました。
- APIキーの安全性説明を戻しました。公開版はキーを含めず、永続保存しません。
- 長編モードの機能紹介を削除し、品質が満たされるまで公開停止扱いにしました。
- 全項目ランダムで出力モードもランダム化されるよう修正しました。
- 非長編出力の改行・段落の読みやすさを改善しました。
- Gemini / OpenAI の公開モード検証を完了しました。
- 公開tag、release note、リポジトリファイル、公開アセットを再確認しました。

### v4.9.5 (2026-06-08)

- Verified non-long output modes and kept long-novel public selection sealed.
- 非長編出力モードの検証を行い、長編モードの公開選択封鎖を継続しました。

### v4.9.4 (2026-06-07)

- Suspended long-novel mode from the public selection path after full-generation quality did not meet the release bar.
- 長編生成品質が公開基準に届かなかったため、長編モードを公開選択経路から停止しました。

### v4.9.3 (2026-06-07)

- Improved chapter planning and retry behavior for the suspended long-form workflow.
- 公開停止中の長編系ワークフローについて、章設計と再試行処理を改善しました。

### v4.9.2 (2026-06-07)

- Reduced false positives in quality filtering around ordinary analog store-work scenes.
- 通常のアナログ店内業務シーンに対する品質フィルタの誤判定を減らしました。

### v4.9.1 (2026-06-07)

- Strengthened selected-genre dominance so settings do not collapse into unrelated templates.
- 選択ジャンルの主導性を強化し、無関係なテンプレートへ潰れにくくしました。

### v4.9.0 (2026-06-07)

- Strengthened selected-genre payoff behavior and completion rescue.
- 選択ジャンルに沿った回収と完成救済を強化しました。

## License And Rights / ライセンスと権利

- Source code: MIT License unless otherwise noted.
- Generated outputs belong to the user subject to the terms of the API provider and applicable law.
- Users are responsible for how they use generated content.
- Do not use the app to generate unlawful, infringing, or harmful content.

- ソースコードは、別記がない限り MIT License です。
- 生成物は、API提供元の規約および適用法の範囲でユーザーに帰属します。
- 生成物の利用責任はユーザーにあります。
- 違法、権利侵害、有害なコンテンツ生成に利用しないでください。

## Integrated Ecosystem / 関連ワークフロー

Story Maker can be used as an upstream idea and text generator for writing, manga planning, audio drama drafting, and style experimentation workflows.

Story Maker は、執筆、漫画プロット、音声ドラマ原稿、作風実験などの上流アイデア生成・テキスト生成ツールとして利用できます。
