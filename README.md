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
- Long-novel mode is not promoted as a public feature in this README. It remains below the release-quality bar for public use and is treated as suspended for now.

- 公開版: `v4.9.6`
- 公開ページ: https://furuyan1234.github.io/story-maker/
- リポジトリ: https://github.com/FURUYAN1234/story-maker
- 長編モードは公開品質基準を満たすまで、公開機能として紹介しません。現在は公開停止扱いです。

## API Key Safety / APIキーの安全性

- API keys are entered by the user in the browser UI.
- The public app does not include API keys in repository files, release notes, release assets, or deployed static files.
- The public app does not intentionally save API keys permanently. Keys are treated as runtime input for the current browser page.
- API requests are sent only to the selected provider needed for generation, style analysis, image understanding, or news grounding.
- Do not paste API keys into issues, pull requests, release notes, screenshots, or public documentation.

- APIキーはユーザーがブラウザUIに入力します。
- リポジトリファイル、リリースノート、リリース成果物、デプロイ済み静的ファイルには APIキーを含めません。
- 公開版アプリは APIキーを永続保存しません。キーは現在のブラウザページでの実行時入力として扱います。
- APIリクエストは、生成、作風解析、画像理解、ニュース取得などに必要な場合だけ、選択中の提供元へ送信されます。
- APIキーを issue、pull request、release note、スクリーンショット、公開文書に貼らないでください。

## Core Features / 主要機能

### Dual API Engine / デュアルAPIエンジン

- Gemini API and OpenAI API can be switched from the UI without rebuilding the app.
- The selected provider is used for generation and analysis workflows.
- Gemini can be used for large-context handling, image understanding, and search-grounded tasks.
- OpenAI can be used for prose generation and style-sensitive narrative drafting.

- Gemini API と OpenAI API をUIから切り替えできます。
- 選択中のAPI提供元を、物語生成や解析フローに利用します。
- Gemini は大きな文脈処理、画像理解、検索グラウンディングを含む処理に利用できます。
- OpenAI は文章生成や文体重視の物語生成に利用できます。

### Multi-Axis Randomization / 多軸ランダム化

Story Maker randomizes and combines multiple creative axes:

Story Maker は、以下の創作軸をランダム化・組み合わせできます。

- Output mode / 出力モード
- Theme / テーマ
- Genre / ジャンル
- Era / 時代
- Worldview / 世界観
- Target reader / 読者層
- Ending style / 結末
- Narration / 語り口
- Character count / 登場人物数
- Character names / 名前
- Character sex / 性別
- Character role / 役割
- Character personality / 性格
- Source materials / 素材入力

Each axis can be randomized independently, locked, or edited manually. This makes it possible to keep a favorite genre or character while randomizing the rest.

各軸は個別にランダム化、ロック、手入力できます。好きなジャンルやキャラクターだけを固定し、他の要素だけをランダム化できます。

### All-Random Generation / 全項目ランダム生成

- The all-random button randomizes selected axes and starts generation immediately.
- In `v4.9.6`, output mode is also rerolled when the output-mode section is not locked.
- Long-novel mode is excluded from public all-random selection.
- Locks protect selected fields from randomization and reset.

- 「全項目ランダム」ボタンで、選択対象の軸をまとめてランダム化し、そのまま生成します。
- `v4.9.6` では、出力モードがロックされていない場合、出力モードも再抽選されます。
- 公開版の全項目ランダムから長編モードは除外されています。
- ロックした項目はランダム化やリセットから保護されます。

### Public Output Modes / 公開出力モード

The public release targets these 14 non-long output modes:

公開版では、以下の非長編14モードを対象にしています。

| Mode | Japanese label | Purpose |
|---|---|---|
| 4-panel manga plot | 4コマ漫画風 | Ki-sho-ten-ketsu plot and punchline structure |
| AI 4koma scenario link | AI 4koma シナリオ連携（STEP2） | Scenario text for AI 4koma-style workflows |
| Flash fiction | ショート（〜1000字） | Very short fiction with a compact setup and payoff |
| Short story | 短編小説（〜3000字） | Standard short prose fiction |
| Novella | 中編小説（〜4000字） | Longer one-shot prose with more scene detail |
| Script | 脚本 / 台本 | Dialogue and stage-direction format |
| Story manga | ストーリー漫画 | Manga-style story beats and panel flow |
| Essay | エッセイ | Reflective prose and argument structure |
| Poem | 詩・ポエム | Poetic expression and imagery |
| Fairy tale / picture book | 童話 / 絵本 | Simple narrative for fairy-tale or picture-book tone |
| Letter | 手紙 / 書簡体 | Letter-style prose |
| Diary / monologue | 日記 / 独白体 | First-person reflective narration |
| Documentary | ドキュメンタリー | Report-like narrative structure |
| Radio drama | ラジオドラマ | Audio-first scene and dialogue writing |

### Character Controls / 登場人物コントロール

- Character count can be increased or decreased.
- Names, sex, roles, and personalities can be typed manually.
- Character content can be randomized independently.
- Character count and character content can be randomized together.
- Character fields support lock-like workflows through the broader section controls.

- 登場人物数を増減できます。
- 名前、性別、役割、性格を手入力できます。
- 登場人物の内容だけをランダム生成できます。
- 人数と内容をまとめてランダム生成できます。
- セクション単位の固定操作と組み合わせて、必要な人物設定を保持できます。

### Universal Intake / 万能インプット

Universal Intake lets the user feed source material into story generation.

万能インプットでは、物語生成の素材を追加できます。

- Direct text / 直接テキスト
- Markdown files / Markdownファイル
- Text files / テキストファイル
- URLs / URL
- Images / 画像
- Multiple dropped assets / 複数素材の同時投入

The app uses source materials as context for prompt assembly when the selected workflow supports them.

対応するワークフローでは、投入素材をプロンプト構築時の文脈として利用します。

### Character Sheet Image Import / キャラクターシート画像取り込み

- Character sheet images can be dropped into the app.
- When image understanding is available, the app can extract character information from the image.
- Extracted character details can be reflected in story generation.
- Multiple images can be handled as source material.

- キャラクターシート画像をアプリにドロップできます。
- 画像理解が利用できる場合、画像からキャラクター情報を読み取れます。
- 読み取った人物情報を物語生成に反映できます。
- 複数画像を素材として扱えます。

### Today's News Keyword Assist / 今日のニュースキーワード

- Gemini search grounding can collect current Japanese news topics.
- The app turns news topics into story seed keywords.
- The generated keyword can be inserted into the theme field.
- This is useful when the user wants timely or topical story seeds.

- Gemini の検索グラウンディングで、現在の日本語ニュース話題を取得できます。
- ニュース話題を物語の種になるキーワードへ変換します。
- 生成されたキーワードをテーマ欄に反映できます。
- 時事性のある物語の種が欲しい場合に使えます。

### Style Analyzer And Rewrite / 作風解析とリライト

- Text can be analyzed for style.
- Images can contribute visual tone when supported.
- The analyzer extracts writing tendencies such as sentence rhythm, vocabulary, description focus, dialogue style, emotional design, and atmosphere.
- Results can be copied as text.
- Generated stories can be rewritten using the analyzed style while preserving the plot.

- テキストから作風を解析できます。
- 対応する場合、画像からビジュアルトーンも取り込めます。
- 文のリズム、語彙、描写の焦点、セリフ傾向、感情設計、雰囲気などを解析します。
- 解析結果はコピーできます。
- 生成済みの物語に、解析した作風を反映してリライトできます。

### Local RAG-Style Detail Injection / ローカル辞書によるディテール注入

- The prompt can incorporate concrete details based on selected worldview, era, theme, and genre.
- This helps reduce vague, generic output.
- Era-specific terms, props, social context, sensory details, and setting flavor can be reflected.

- 選択された世界観、時代、テーマ、ジャンルに応じて、具体的なディテールをプロンプトへ反映できます。
- 抽象的で曖昧なAI出力を減らすための仕組みです。
- 時代語、小道具、社会背景、五感描写、舞台の手触りを反映できます。

### Copy And Text Export / コピーとテキスト保存

- Generated output can be copied to the clipboard.
- Output can be saved as `.txt`.
- File names use timestamped naming so generated stories can be sorted chronologically.

- 生成結果をクリップボードへコピーできます。
- 生成結果を `.txt` として保存できます。
- ファイル名には時刻情報を含め、生成物を時系列で整理しやすくしています。

## Narrative Engineering / 物語設計

Story Maker is not only a prompt form. It assembles a generation contract from multiple writing principles.

Story Maker は単なる入力フォームではなく、複数の物語設計原理を組み合わせて生成条件を構成します。

### Anti-Repetition Engine / 反復防止

- Avoid the most predictable development for the selected genre.
- Connect the selected theme indirectly or unexpectedly.
- Make each character react through their own role and personality.
- Avoid collapsing different genres into the same comedic or dramatic template.

- 選択ジャンルの最もありきたりな展開を避けます。
- テーマを直接ではなく、意外性のある形で接続します。
- 各キャラクターの役割と性格に基づいて反応を分けます。
- 異なるジャンルが同じコメディ型・ドラマ型に潰れないようにします。

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

### Quality Gates / 品質ゲート

Story Maker applies generation-time and display-time checks to reduce common AI writing failures.

Story Maker は、AI出力にありがちな破綻を減らすため、生成時・表示時の品質確認を行います。

- Setup and payoff consistency / 伏線と回収の整合性
- Character role function / キャラクターの物語上の役割
- Ending pattern diversity / 結末パターンの単調化防止
- Sensory balance / 五感描写の偏り防止
- Era consistency / 時代設定の整合性
- Worldview consistency / 世界観の整合性
- Paragraph readability / 段落の読みやすさ
- Mode-specific format compliance / 出力モード別フォーマット遵守

## v4.9.6 Changes / v4.9.6 更新内容

- Fixed all-random output-mode behavior: when output mode is not locked, all-random now rerolls the output mode instead of keeping the previous mode.
- Long-novel mode is excluded from all-random public selection.
- Improved paragraph readability for non-long outputs by strengthening paragraph-density guidance and cleanup.
- Verified Gemini and OpenAI across all 14 public non-long output modes.
- Repaired README mojibake and restored detailed public feature documentation.
- Rechecked public release wording, tags, release notes, and public assets.

- 全項目ランダム時、出力モードがロックされていない場合は出力モードも再抽選されるよう修正しました。
- 公開版の全項目ランダムから長編モードを除外しました。
- 非長編出力で改行が少なすぎる問題に対し、段落密度の指示と整形を強化しました。
- Gemini / OpenAI の両APIで、公開対象の非長編14モードを検証しました。
- README の文字化けを修正し、公開可能な詳細機能説明を戻しました。
- 公開文言、tag、release note、公開アセットを再確認しました。

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
- README scan: Japanese text is valid UTF-8 and no mojibake markers were found.

- 全項目ランダムのブラウザ確認で、公開対象14モードすべてが出現し、長編モードは選ばれませんでした。
- Gemini API マトリクスは 14 / 14 公開モードで通過しました。
- OpenAI API マトリクスは 14 / 14 公開モードで通過しました。
- 公開アセット確認で、APIキー風パターン、秘密トークン風パターン、個人パス、意図しない固有名詞が残っていないことを確認しました。
- README はUTF-8の日本語として読める状態で、文字化けマーカーがないことを確認しました。

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

## Release Notes / リリースノート

### v4.9.6 (2026-06-08)

- Public README repaired from mojibake and rewritten with detailed public feature documentation.
- API-key safety wording restored: public builds do not include keys and do not permanently save them.
- Long-novel feature promotion removed until quality is acceptable for public release.
- All-random output-mode reroll fixed.
- Non-long paragraph readability improved.
- Gemini/OpenAI public-mode verification completed.

- README の文字化けを修正し、公開可能な詳細機能説明を再構成しました。
- APIキーの安全性説明を戻しました。公開版はキーを含めず、永続保存しません。
- 長編モードの機能紹介を削除し、品質が満たされるまで公開停止扱いにしました。
- 全項目ランダムで出力モードもランダム化されるよう修正しました。
- 非長編出力の改行・段落の読みやすさを改善しました。
- Gemini / OpenAI の公開モード検証を完了しました。

### v4.9.5 (2026-06-08)

- Verified non-long output modes and kept long-novel public selection sealed.
- 非長編出力モードの検証を行い、長編モードの公開選択封鎖を継続しました。
