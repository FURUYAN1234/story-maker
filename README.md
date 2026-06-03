# AI Story Maker - Multi-Axis Entropy Injection System

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**
>
> A web application that generates high-variety stories (4-panel manga plots or fiction) using Google's Gemini and OpenAI's GPT engines. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.
> Google Gemini および OpenAI GPTのデュアルエンジンを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・小説）を生成するWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。
>
> [!['AI_Creative_Studio'](https://github.com/user-attachments/assets/d9b97ee9-5051-4f99-8bd3-fb82967d5c12)](https://youtu.be/Ik59dL_zG1s?si=VduXBkmCTGfz51aJ)

> [!TIP]
> **Detailed Commentary Available / 詳細な解説記事を公開中**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 本プロジェクトの設計思想や、Google Gemini APIのモデル毎の挙動の違いについては、以下のnote記事で詳しく解説しています。
> [Story Maker — AI物語メーカー　AI特有の似たり寄ったりのストーリーにならないシステム / A system designed to break away from repetitive, generic AI-generated plots. (note / Japanese content)](https://note.com/happy_duck780/n/nd3d972922868)

---

## 🚀 Core Features / 主要機能
- **Character Roster Management (Long Novels) / 長編向け人物ロスター管理**: Automatically designs and tracks supplementary characters necessary for long novel generation, preserving character consistency, tracking state changes, and maintaining clear relationships with required main characters across multiple chapters. / 長編小説の生成において、必須登場人物に加えて物語の規模に必要な追加人物（ロスター）をAIが自動設計し、全章にわたって役割・現在地・状態変化・関係性を厳密に追跡・管理することで、長編特有のキャラクターの破綻を防ぎます。
- **Dual API Engine Architecture / デュアルAPIエンジン対応**: Dynamically routes requests to Google Gemini or OpenAI (GPT-4.1 / GPT-4o) based on your API key prefix (`sk-`). Enjoy Gemini's large context processing or OpenAI's high-nuance narrative generation effortlessly. / 入力されたAPIキーのプレフィックス（`sk-`）を自動判別し、Google GeminiとOpenAI（GPT-4.1やGPT-4o等）へ動的にリクエストを振り分けます。Geminiの巨大コンテキスト処理と、OpenAIの繊細な心理描写・プロット構築力をシームレスに使い分けることが可能です。
- **Local RAG Integration / 完全ローカルRAG辞書の統合**: Implemented a standalone, zero-cost RAG system that injects specific world-building details (props, era-specific terminology, sensory elements) into the prompt based on the user's selected worldview, era, and theme. This forces the AI to ground its narrative in concrete details rather than abstract tropes, significantly improving world authenticity. / 外部サービス不要・完全無料のローカルRAG（検索拡張生成）システムを実装。ユーザーが選択した世界観・時代・テーマに基づき、専用辞書から具体的なディテール（小道具・通貨・歴史用語・匂いなど）をプロンプトに動的注入。AI特有の「抽象的でフワッとした描写」を防ぎ、物語の解像度と世界観の説得力を劇的に向上させます。
- **Google Search Grounding / Google検索グラウンディング対応**: Enabled Gemini's native Search Grounding tool for text generation. When the AI determines that factual accuracy is necessary (e.g., historical events, scientific terms, real-world locations), it will automatically perform a Google search and incorporate the findings into the story. / Geminiエンジンのテキスト生成においてGoogle検索グラウンディングを有効化。時代考証や専門知識が必要なテーマが選ばれた際、AIが自律的にGoogle検索を実行して事実確認を行い、正確な知識をベースにした物語を執筆できるようになりました。
- **Multiple Output Modes / 複数の出力モード**: Supports 14 distinct modes including 4-panel manga plots (Ki-sho-ten-ketsu + dialogue), short stories (~3,000 chars), novellas (~4,000 chars), full-length novels (tens of thousands of characters via automated sequential generation), scenarios, essays, and poems. / 4コマ漫画ネタ（起承転結＋セリフ案）、短編・中編小説、全自動ストリーミングによる長編小説（数万字規模）、エッセイ、詩など、14種の出力モードに対応。
- **Character Sheet OCR Import / キャラクターシート自動認識**: Drag & drop character sheet images onto the drop zone to auto-extract character data via Gemini Vision API. Supports multiple images. / キャラクターシート画像をドラッグ＆ドロップするだけで、Gemini Vision APIが自動認識してキャラクター情報を抽出。複数枚同時処理に対応。
- **Universal Intake (β) / 万能インプット (β版)**: Dropping images, URLs, text files (.txt/.md), or pasting direct text into the intake zone feeds multiple assets into prompt compilation. Uses Gemini Vision for images and web proxy scraping for URLs, blending diverse sources seamlessly. / 画像・URL・テキストファイル等をドラッグ＆ドロップまたはペーストするだけで、多様な情報リソースをストーリー生成時のコンテキストとしてプロンプトに動的注入します。
- **Today's News Keywords / 今日のニュースキーワード取得**: Integrates Gemini's Search Grounding to fetch today's major Japanese news headlines across balanced categories and generate narrative keywords. Click the "🌐 ニュース" button to auto-fill the theme with fresh, AI-extracted news. / Geminiの検索グラウンディングを利用し、今日の主要ニュースからAIが物語のキーフレーズをバランスよく自動抽出。ワンクリックでカスタムテーマ欄を設定します。
- **Individual Input Locking / 個別入力ロック機能**: Freeze specific setting fields (genre, theme, era, worldview, etc.) to protect them during random generation or master reset, enabling granular control over randomized creative paths. / 各入力項目（ジャンル、テーマ、時代、世界観など）の個別固定（ロック）が可能。「🎲全項目ランダム」生成時にもお気に入りの設定を保護できます。
- **One-Shot Full Random / 全ランダム一発生成**: Single button randomizes all axes (genre, era, ending, perspective, characters) and generates immediately. / 1ボタンで全項目をランダム設定して即生成。
- **Smart Gender Sync / スマート性別同期**: The character's Sex field and Name are bidirectionally linked. Changing the sex automatically generates a fitting name, and entering a name automatically infers the sex, ensuring consistency with minimal effort. / キャラクターの「性別」と「名前」が双方向に連動。性別を変えると適した名前が自動調整され、名前を手入力すると性別が自動推論されるため、一貫性のあるキャラ設定を支援します。
- **Random Theme Seeding / ランダムテーマシード**: Combines base event + modifier + adjunct for unpredictable story seeds. / 基本イベント＋修飾語＋状況語を確率的に組み合わせ、予期せぬ物語の種を生成。
- **AI 4koma Scenario Link / AI 4koma シナリオ連携 (STEP2)**: Generates scenarios in AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / AI 4-koma System のSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。
- **Style Analyzer Engine (β) / 作風解析エンジン (β版)**: Supports multimodal composite analysis — drop text files (.txt/.md), images (illustrations, art), or paste text directly into the text area. The AI performs deep computational stylistics analysis, extracting 50+ parameters covering rhetoric, sentence structure, vocabulary, description focus, dialogue style, emotional architecture, and more. When images are included, visual tone (color palette, composition, lighting) is integrated into the analysis. Results are available in two formats: human-readable text (copy) and structured JSON for direct injection into other AI novel tools (ChatGPT, Claude, etc.) or drag-and-drop into AI 4-koma System. Includes a "Rewrite" function that applies the extracted style to your generated story while preserving the plot. Style analysis can be executed independently before story generation. / テキストファイルのドロップ・画像ドロップ（イラスト等）・テキスト直接貼り付けの3入力方式に対応したマルチモーダル複合解析。AIが修辞技法・文体・語彙・描写・セリフ・感情設計等50以上のパラメータを深層分析。画像が含まれる場合は色彩傾向・構図・タッチ等のビジュアルトーンも統合解析。結果は人間用テキスト（コピー）と他のAI小説ツール（ChatGPT等）への投入や AI 4-koma System への直接ドラッグ＆ドロップ連携が可能な構造化JSONの2形式で提供。解析した作風を生成済みストーリーに適用する「リライト」機能も搭載。ストーリー生成前でも作風解析は単独実行可能。

---

## 🏗️ Unique Architecture Highlights / 固有アーキテクチャ・技術的要点
This system acts as a sophisticated prompt engineering compiler. It leverages multi-layered constraints to force the LLM into producing highly creative outcomes.
本システムは高度なプロンプトエンジニアリング・コンパイラとして機能します。LLMに対して多層的な制約を課すことで、強制的に独創性の高い結果を引き出します。

* **Multi-Axis Randomization / 多軸ランダム化**: 
  `Output = f(Character × Theme × Genre × Era × Ending × Perspective)`
  Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable. / キャラ×テーマ×ジャンル×時代×オチ×語り口を独立計算し、組み合わせの爆発によりハルシネーションではなく「意味のある多様性」を生み出す設計。
* **Anti-Repetition Engine / 反復防止プロンプトエンジン**: Explicitly instructs Gemini to avoid the most predictable development for the genre, connect the theme in an indirect/unexpected way, and use each character's personality to generate unique reactions. / ありきたりな展開を構造的に回避するよう、「ジャンルの王道展開の回避」「テーマの間接的接続」などをAIに明示的に指示。
* **Foreshadowing Tier System / 伏線ルールのモード別ティア制**: Dynamically switches prompt constraints based on the narrative mode. / 出力モードによってプロンプトの制約レベルを動的に切り替える仕組み。
  * **Tier 1 (Full)**: Narrative modes (novel, scenario, manga, etc.) retain all 15 rules including Emotion Gap Design, Motif Recurrence, Emotion Curve Design, Sensory Balance Enforcement, World-Grounded Metaphor Guard, and Character Knowledge Boundary. / 物語系モードは、感情落差設計・モチーフ回帰・感情曲線設計に加え、五感バランス強制・世界観準拠の比喩ガード・キャラクター知識境界チェックを含む15の構成・感情・描写設計ルールを適用。
  * **Tier 2 (Comedy)**: `4koma` mode uses the optimized Comedy Structure Method, integrating the generalized 6-gap techniques and tone variations to ensure high-impact punchlines. / 4コマモードは、一般化された6種のズレ技法とトーン調整を統合したコメディ構造メソッドを適用し、パンチラインのインパクトを最大化。
  * **Tier 3 (None)**: Non-narrative modes (essay, poem, letter, diary) exclude foreshadowing entirely, replaced with mode-specific composition rules. / 非物語系モードは伏線ルールを完全除外。
* **Full-Category Style Guide Engine / 全カテゴリ対応・文体ガイドエンジン**: Centralized style guide data (~250 entries). Instead of passing preset selections (e.g., "Surreal Gag") as mere labels, the system injects specific, actionable writing instructions into the prompt. / 単なるラベル名渡しではなく、250以上の詳細な執筆ルール（文体・構成指示等）をプロンプトに注入するエンジン。
* **15-Rule Narrative Structure / 15の物語構成・描写設計ルール**: Strict guidelines including "Show Don't Tell", protagonist conviction at endings, Emotion Gap Design (6 gap techniques), Motif Recurrence, Emotion Curve Design, Sensory Balance Enforcement (anti-visual-bias), World-Grounded Metaphor Guard (cliché elimination), and Character Knowledge Boundary (information leak prevention). / 「Show Don't Tell」「結末での主人公の意志表示」に加え、感情落差設計・モチーフ回帰・感情曲線設計・五感バランス強制（視覚偏重防止）・比喩の世界観準拠（クリシェ排除）・キャラクター知識境界（情報漏洩防止）を追加した15の構造ルール。
* **Quality Gate / 品質ゲート**: AI self-verification checklist executed before output (9 checks including Setup-Payoff structure, emotion gap sufficiency, motif recurrence, ending pattern diversity, tone variation, character narrative function, sensory balance, metaphor originality, and character knowledge boundary). / AIが出力前に自己検証する9項目のチェックリスト。五感バランス・比喩の独自性・キャラ知識境界チェックを新たに追加。
* **Era Consistency Rules / 時代設定の整合性ルール**: AI auto-corrects anachronistic expressions when historical era settings are selected. / 非現代の時代設定時にAIが時代にそぐわない語彙を自動で読み替えるルール。

---

## 🧠 v2.9 Narrative Engineering Methods / v2.9 物語構造メソッド解説

> These methods were originally developed for comedy manga (4-panel gag) generation in [AI 4-koma System](https://github.com/FURUYAN1234/nano-banana-pro). Through analysis, we discovered that their core principles are **universal narrative techniques** applicable to ALL genres — because laughter, fear, suspense, and emotional impact all share the same structural origin: **the gap between what the reader expects and what actually happens**.
> これらのメソッドは元々 [AI 4-koma System](https://github.com/FURUYAN1234/nano-banana-pro) でギャグ漫画（4コマ）生成用に開発されました。分析の結果、その核心は**全ジャンルに適用可能な普遍的物語技法**であることが判明しました。笑い・恐怖・感動・驚きは全て同じ構造的原理、すなわち**「読者の期待（E）と実際の展開（R）の落差」**から生まれるためです。

### 1. Emotion Gap Design / 感情落差設計

The fundamental principle: **all emotional impact = Gap between Expected (E) and Reality (R).**
The direction of the gap determines the emotion:

基本原理：**あらゆる感情的インパクト ＝ 予想（E）と現実（R）のギャップ**。
ギャップの方向が感情の種類を決める：

| Gap Direction / 落差の方向 | Emotion / 感情 | Example / 例 |
|:---|:---|:---|
| More absurd than expected / 予想よりおかしい | Laughter / 笑い | Comedy, Gag / コメディ |
| More terrifying than expected / 予想より怖い | Fear / 恐怖 | Horror, Suspense / ホラー |
| More heartbreaking than expected / 予想より切ない | Emotion / 感動 | Drama, Romance / ドラマ・恋愛 |
| More shocking than expected / 予想より衝撃的 | Surprise / 驚き | Mystery, Plot twist / ミステリー |

The system provides **6 gap techniques** for the AI to consciously select and combine:
AIが意識的に選択・組み合わせる**6種の落差技法**を提供：

1. **Substitution / 置換**: Reinterpret an event in a completely different context / ある事象を全く異なる文脈で再解釈させる
2. **Exaggeration / 誇張**: Amplify emotions and scale beyond the reader's imagination / 感情・規模を読者の想像を超えるレベルまで増幅
3. **Reversal / 逆転**: Flip character positions, abilities, or relationships without warning / 人物の立場・能力・関係性を予告なく反転
4. **Absurdity / 不条理**: Insert logically inexplicable elements for shock / 論理的に説明のつかない要素で衝撃を与える
5. **Tension & Release / 緊張と緩和**: Place intentional calm before maximum impact / クライマックス直前に意図的な静寂を挟む
6. **Normalcy Return / 常識の提示**: Place one sane perspective amid chaos to highlight abnormality / 異常の中に正気の視点を置いて異常さを際立たせる

- **Active Character Roster / サブキャラ追跡**: Tracks supporting characters' current locations and statuses in the internal memo to prevent them from disappearing in later chapters. / サブキャラクターの現在地と状況を毎章の内部メモとして記録し、終盤での消失を防ぐ。
- **Pacing Enforcement / 描写密度の強制**: Forces the AI to include sensory details, physical pain, and environmental descriptions during climax scenes and dialogue to prevent rushed pacing. / クライマックスや会話劇において五感描写や肉体的痛覚を強制的に挿入させ、展開の「駆け足」を防止する。
- **Dynamic Chekhov's Gun / 動的チェーホフの銃**: Introduces a seemingly irrelevant item or habit in early chapters, intentionally leaving it unresolved, to be used as a critical breakthrough in the final chapter. / 序盤に無関係に見えるアイテムや習慣を配置し、終盤の致命的な突破口として反転回収させる動的伏線。
- **Dynamic Scale & Full-Auto Generation / 動的規模設計と全自動生成**: The AI automatically determines the optimal chapter count and target length (tens of thousands of characters) based on the input theme. The writing process is fully automated, continuously generating chapter by chapter until completion without requiring manual prompts. / 入力テーマに基づき、AIが最適な章数と目標文字数（数万字規模）を動的に決定します。手動でのプロンプト入力は不要で、完結まで全自動で章ごとに連続生成されます。
- **State Separation & Context Panel / 状態の完全分離と文脈パネル**: Novel text and AI's structural memos (GMC+S, foreshadowing) are strictly separated at the state level. Memos are routed to a collapsible side panel, ensuring the final text export is 100% clean novel prose without any meta-noise or markdown artifacts. / 小説本文とAIの構造メモ（目的・伏線等）を内部状態レベルで完全に分離。メモは折りたたみ可能な専用パネルへルーティングされ、AI特有の空のマークダウン記号なども強力にクレンジング除去されるため、エクスポートされるテキストには純粋な小説本文のみが含まれます。
- **Local Timestamped Export / ローカル時刻での厳密なファイル管理**: All text and JSON exports enforce a rigid 14-digit local timestamp (`YYYYMMDDHHmmss`) to resolve timezone drift and ensure chronological sorting consistency across long-term serialized writing. / 全てのテキスト・JSON保存のファイル名において、UTCズレのない日本時間（ローカル時刻）の完全な数字14桁（`YYYYMMDDHHmmss`）を強制。長期間にわたる連載執筆時の時系列ソートの一貫性を保証します。

### 2. Motif Recurrence / モチーフの回帰

Inspired by the comedy technique "Tendon" (天丼 — repeating the same gag pattern with variations until it explodes), generalized for all genres.
コメディ技法「天丼」（同じギャグパターンを変奏しながら繰り返し爆発させる手法）を全ジャンルに一般化。

**Rule**: A symbolic element (item, phrase, scenery, action) must appear **at least twice** in different contexts. The 1st mention is casual; the 2nd+ carries evolved meaning. The recurring motif must connect directly to the emotional climax.
**ルール**：象徴的要素（アイテム・言葉・風景・行為）を**最低2回**、異なる文脈で登場させる。1回目は何気ない言及、2回目以降は意味が変化・深化。回帰するモチーフは結末の感情的ピークと直接接続させる。

| In Comedy / コメディでは | In Other Genres / 他ジャンルでは |
|:---|:---|
| Same gag pattern → variation → explosion / 同じボケの変奏→爆発 | Chekhov's Gun, thematic echo, escalating pattern / チェーホフの銃、テーマの反復深化 |

### 3. Emotion Curve Design / 感情曲線設計

A 15-beat integrated framework for designing the emotional arc of an entire story, based on professional screenwriting methods:
物語全体の感情曲線を設計する15ビート統合型フレームワーク：

```
Setup (導入) → Inciting Incident (事件) → Deviation (逸脱/第一の扉) → Midpoint (中間地点) → Build-up (増幅/どん底) → Payoff (回収/クライマックス)
```

| Phase | Role / 役割 |
|:---|:---|
| **Setup** (導入/日常) | Set reader expectations. Don't surprise yet. Place 1st motif here. / 読者の期待値を設定。まだ驚かせない。モチーフの1回目をここに |
| **Deviation** (逸脱) | First gap from expectations (Inciting Incident & Plot Point 1). / 期待からの最初のズレ（事件の発生と第一の扉） |
| **Build-up** (増幅/どん底) | Accelerate deviation via Midpoint, push emotional tension to the "All is Lost" limit. / 中間地点を経て逸脱を加速、感情的緊張を「すべてを失う」極限に |
| **Payoff** (回収/決着) | Emotional peak + landing (Climax). All foreshadowing and motifs gain meaning here. / 感情のピーク＋着地。全伏線・モチーフがここで意味を持つ |

### 4. Scene Dynamics & Physicality / シーンの駆動力と身体性

To prevent flat, "AI-like" abstract writing, every scene must adhere to strict rules including Stakes, Subtext, and Loglines:
AI特有の平坦で抽象的な文章を防ぐため、全シーンにステークス・サブテキスト・ログラインを含む以下の厳格なルールを適用：

- **Logline Anchor (ログラインによる軸固定)**: The AI must establish a 1-sentence core summary (Logline) before writing and strictly adhere to it throughout the story to prevent plot wandering. / 執筆前に物語の核となる1文要約（ログライン）を内部設定させ、途中で話がブレるのを防ぐ。
- **G.M.C.+S. (Goal, Motivation, Conflict, Stakes)**: Every scene must clearly define what the character wants, why they want it, what stands in their way, and what they lose if they fail (Stakes). / 全てのシーンに「目的」「動機」「障害」に加え「ステークス（失敗時の代償）」を設定し、物語の停滞を防ぎ緊迫感を高める。
- **Physicality (Show, Don't Tell)**: Direct emotion words ("I was sad") are banned. Emotions must be described through five senses (weight, temperature, smell, trembling hands). / 「悲しい」などの直接的な感情語を禁止。重さ、温度、匂い、身体反応（五感）を通して感情を描写する。
- **Subtext (サブテキスト)**: Direct expression of true feelings in dialogue is banned (No "On the Nose" dialogue). Characters must hide their true intentions, requiring readers to infer meaning from actions. / セリフで直接感情を説明させること（オン・ザ・ノーズ）を禁止。裏の感情を隠し、行動との矛盾から読者に推測させる。

### 5. Tone Variation System / 文体緩急の3系統

To prevent monotonous writing, 3 concrete tone registers are defined with a **prohibition of same-tone streaks exceeding 3 paragraphs**:
文体の単調化を防ぐため、3種の具体的トーン系統を定義し、**同系統の3段落以上連続を禁止**：

| Register / 系統 | Style / 文体 | Use For / 適用場面 |
|:---|:---|:---|
| **High-energy / 高熱量** | Short sentences, abrupt endings, rapid-fire / 短文連続・体言止め・畳みかけ | Action, confession, decision / 追跡・告白・決断 |
| **Quiet-serene / 静謐** | Long sentences, gentle rhythm, white space / 長文・穏やかなリズム・余白 | Flashback, parting, eerie silence / 回想・別れ・不気味な静寂 |
| **Cold-analytical / 冷徹** | Dry declarative, emotion-stripped objectivity / 乾いた断言調・客観描写 | Deduction, analysis, philosophy / 推理・分析・哲学的独白 |

### 6. Quality Gate & Guard C / 品質ゲートと機械的フィルタリング

An AI self-verification checklist executed **before** output, followed by a mechanical JavaScript filter **after** output.
AIが出力**前**に実行する自己検証チェックリストと、出力**後**にJSで実行される機械的フィルタリング（ガードC）の二段構え。

| Check / チェック項目 | What It Prevents / 防止する問題 |
|:---|:---|
| Setup-Payoff structure / 伏線→回収構造 | Deus ex machina endings / 唐突な新設定で解決する結末 |
| Emotion gap sufficiency / 感情落差の十分性 | "Slightly surprising" instead of "completely unexpected" / 「ちょっと意外」止まりの展開 |
| Motif recurrence / モチーフの回帰 | Disconnected, one-off symbols / 使い捨ての象徴 |
| Ending pattern diversity / 結末パターン多様性 | Same structure every time / 毎回同じ構造の結末 |
| Tone variation / 文体の緩急 | Monotonous writing style / 単調な文体 |
| Character narrative function / キャラの物語的機能 | Bystander characters / 傍観者だけの登場人物 |
| Sensory balance / 五感バランス | Visual-only descriptions / 視覚偏重の描写 |
| Metaphor originality / 比喩の独自性 | Cliché metaphors / 使い古された定型比喩 |
| Character knowledge boundary / キャラ知識境界 | Information leaks across characters / キャラ間の不自然な情報漏洩 |
| **Guard C (Post-filter)** / ガードC | Cliché phrases ("In conclusion...") / AI特有の陳腐な言い回し（「いかがでしたか」等）の物理削除 |

### 7. Long-Form Narrative Protocols / 長編専用・文脈維持プロトコル
These protocols apply exclusively to the `long` (長編小説) mode to prevent structural collapse and loss of detail across fully automated, multi-chapter (tens of thousands of characters) generated text.
長編小説モード専用のプロトコル群。数万字規模の物語を全自動で連続生成する際に生じる「伏線の破綻」や「後半の息切れ」を防ぎます。

- **Active Character Roster / サブキャラ追跡**: Tracks supporting characters' current locations and statuses in the internal memo to prevent them from disappearing in later chapters. / サブキャラクターの現在地と状況を毎章の内部メモとして記録し、終盤での消失を防ぐ。
- **Pacing Enforcement / 描写密度の強制**: Forces the AI to include sensory details, physical pain, and environmental descriptions during climax scenes and dialogue to prevent rushed pacing. / クライマックスや会話劇において五感描写や肉体的痛覚を強制的に挿入させ、展開の「駆け足」を防止する。
- **Dynamic Chekhov's Gun / 動的チェーホフの銃**: Introduces a seemingly irrelevant item or habit in early chapters, intentionally leaving it unresolved, to be used as a critical breakthrough in the final chapter. / 序盤に無関係に見えるアイテムや習慣を配置し、終盤の致命的な突破口として反転回収させる動的伏線。
- **Dynamic Scale & Full-Auto Generation / 動的規模設計と全自動生成**: The AI automatically determines the optimal chapter count and target length (tens of thousands of characters) based on the input theme. The writing process is fully automated, continuously generating chapter by chapter until completion without requiring manual prompts. / 入力テーマに基づき、AIが最適な章数と目標文字数（数万字規模）を動的に決定します。手動でのプロンプト入力は不要で、完結まで全自動で章ごとに連続生成されます。
- **Graceful Pause Control / 安全な一時停止予約機能**: Features a pause reservation toggle during active generation. Pausing does not interrupt mid-sentence; it waits for the current chapter to finish and safely stops before the next chapter begins. / 全自動生成中の「一時停止」は即座の遮断ではなく、現在執筆中の章を最後まで書き切ってから安全に待機状態に移行する「予約」として機能します。
- **Live Preview Scroll Optimization / ライブプレビューのスクロール最適化**: During long-novel generation, the visible manuscript auto-scrolls smoothly within its dedicated container without forcing page-level scroll jumps, while stripping context memos for a clean preview. / 長編生成中、メタ情報である文脈メモを自動除去したプレビューを表示しつつ、画面全体のガタつきを防ぐため小説本文枠内でのみ自動スクロール追従を行います。
- **Final Chapter Optimization & State Retention / 最終章の最適化と完了状態維持**: The final chapter automatically strips premature final markers, splits at the true end, and maintains the manuscript scroll view cleanly after completion. / 最終章の生成時に、途中に入り込んだ不要な「完」マークを自動除去して正確に完結判定を行い、完了後も生成中のスクロール状態を綺麗に維持します。
- **Live Status Header / ステータスバー常時表示**: The long-novel panel features a fixed live status row updating current phase, chapter progress, and character counts in real-time. / 長編パネル上部に、現在のフェーズ、章進捗、リアルタイム文字数を常時更新する固定ステータスバーを搭載。
- **Fail-Closed Save Gates / 保存前フェイルクローズ**: Before a chapter is accepted into the manuscript or Story Bible context, the engine rejects management memos, design-note bullets, bare headings, under-length prose, paragraph-density failures, premature non-final resolution, and unresolved audit contradictions. / 章本文やストーリーバイブルへ保存する前に、管理メモ、設計箇条書き、見出しだけの出力、短すぎる本文、段落密度不足、非最終章の早期完結、未解決の整合性エラーを保存拒否します。
- **Robust Auto-Recovery / 強牢な自動修復**: If structural logic or continuity checks fail, the engine performs up to two complete chapter regenerations by default, and up to four for duplicate/replay, paragraph/scene-density, or late non-final premature-resolution failures before a fail-closed stop. / 論理・整合性の検証に失敗した場合、通常は最大2回、重複・再演、段落/シーン密度不足、終盤非最終章の早期完結については最大4回まで、明示的な失敗理由つきで章全体の再生成を試みます。
- **Final Chapter Full-Text Output / 最終章全文出力**: Upon final chapter completion, the AI compiles ALL chapters into a single markdown code block for one-click copy. A dedicated output format section with concrete template prevents AIs from skipping this step. / 最終章完了時に全章の本文を1つのコードブロックにまとめて出力する義務を強化。専用フォーマットとテンプレートでAIの省略を防止。
- **State Separation & Context Panel / 状態の完全分離と文脈パネル**: Novel text and AI's structural memos (GMC+S, foreshadowing) are strictly separated at the state level. Memos are routed to a collapsible side panel, ensuring the final text export is 100% clean novel prose without any meta-noise or markdown artifacts. / 小説本文とAIの構造メモ（目的・伏線等）を内部状態レベルで完全に分離。メモは折りたたみ可能な専用パネルへルーティングされ、AI特有の空のマークダウン記号なども強力にクレンジング除去されるため、エクスポートされるテキストには純粋な小説本文のみが含まれます。
- **Local Timestamped Export / ローカル時刻での厳密なファイル管理**: All text and JSON exports enforce a rigid 14-digit local timestamp (`YYYYMMDDHHmmss`) to resolve timezone drift and ensure chronological sorting consistency across long-term serialized writing. / 全てのテキスト・JSON保存のファイル名において、UTCズレのない日本時間（ローカル時刻）の完全な数字14桁（`YYYYMMDDHHmmss`）を強制。長期間にわたる連載執筆時の時系列ソートの一貫性を保証します。
- **AI Consistency Audit Engine / AI矛盾検査エンジン**: Implemented a recursive loop mechanism (check -> fix -> recheck) with a maximum of 8 iterations to ruthlessly eliminate logical paradoxes and setting inconsistencies during long-form continuous generation. Detailed audit logs are displayed to the user in real-time. / 長編連続生成中に発生する設定の破綻や論理的矛盾を検知し、安全上限8回まで「検査→修正→再検査」のループを回して徹底的に矛盾を排除するエンジンを搭載。何が矛盾しているかの詳細を進行ログにリアルタイム表示します。


---

## 🛠️ System Feature Specifications / システム機能詳細仕様

### 1. Universal Intake Spec / 万能インプット（ユニバーサル・インテーク）詳細仕様
A unified asset injection pipeline that accepts various content types (images, web links, documents, and manual text) and dynamic embeds context into prompt generation.
画像、Webリンク、文書ファイル、直接入力などの多種多様なアセットを一つのインターフェースで受領し、ストーリー生成のコンテキストとして動的にプロンプトへ注入する機能です。

- **Operational Value & Benefits / 導入メリット**:
  - **Multi-Source Context Synthesis / 多元情報の統合**: Allows users to blend visual cues from character sheets, factual details from real-time web articles, and structural drafts from local text files simultaneously. The AI naturally synthesizes these distinct elements into a cohesive narrative. / 手元のキャラシート画像、インスピレーション元のWebページ、下書きのテキストといった全く異なる情報源を1つのストーリー生成へシームレスに調和させ、深みのあるストーリーを生み出します。
  - **Fault-Tolerant Engine / 耐障害設計**: If a URL scrape fails due to CORS or an image analysis is blocked by missing API keys, the system automatically bypasses the faulty asset, ensuring prompt generation proceeds without polluting the prompt with UI error strings. / 解析エラーやアクセス制限（CORSエラーなど）が発生したアセットを自動検知してプロンプト構築から排除するため、生成処理が途中で停滞したり、エラーテキストがプロンプトに入り込んでAIの出力を汚染したりするのを防ぎます。
- **Multi-Format Ingestion / 多彩なフォーマット受領**:
  - **Images (画像)**: Automatically processes characters, illustrations, or product sheets. Uses Gemini Vision API to convert visual cues (outfit, facial expressions, actions, objects, specific brands) into a 100-250 characters textual summary. / キャラクター設定シートや製品イラストなどをドロップすると、Gemini Vision APIが自動でビジュアル要素（服装、表情、物体、ブランド、看板文字など）を抽出し、100〜250文字の解説要約としてテキスト化します。
  - **Web Links (URL)**: Resolves CORS scraping limitations using public proxies (Codetabs & Allorigins fallback). Automatically strips boilerplate code (`<script>`, `<style>`, `nav`, `footer`, etc.) and digests the core metadata and text body up to 3,000 characters. / Webサイト of URLを入力すると、CORSプロキシを経由して本文をスクレイピング。不要なスクリプトやナビゲーションを除去した上で、最大3000文字のコンテキストデータを抽出します。
  - **Text Documents (文書ドロップ)**: Instantly processes local `.txt` or `.md` files via FileReader API (UTF-8 encoding). / ローカルのテキストファイル（.txt / .md）をドロップするだけで、即座にアセットとして登録します。
- **Asset Control / アセット制御システム**:
  - Each item supports independent locking (locking freezes the asset status during random generation) and individual deletion. / 投入したアセットは個別にロック（全ランダム生成でのクリアから保護）および個別削除が可能です。
  - OBSTACLE-FREE GENERATION: Built-in validation filters out error state assets (e.g., scraping failure messages) from prompt construction to prevent prompt pollution. / 解析エラーになったアセットがプロンプトへ混入するのを防ぐ物理除外ガードを搭載。

### 2. Style Analyzer Engine / 超強引！作風解析エンジン詳細仕様
Deep computational stylistics analysis tool that evaluates user-provided texts and clones the target writing style onto the generated story plot.
自筆の文章や好きな作家のテキストを解析し、その文体や修辞特徴を深層分析して、生成したストーリーのプロット（構成）を維持したまま文章をその作風へと「リライト」するエンジンです。

- **Operational Value & Benefits / 導入メリット**:
  - **Rhetorical Fingerprinting / 文体の客観的分析**: Deconstructs target text patterns into structured data, making it easier for writers to study other styles or ensure their own work remains linguistically consistent. / 自筆・他者の文章構造（修辞、語彙、文長など）を50以上の指標で視覚的・客観的に可視化し、自身の文体の癖を把握したり、他作家のスタイルを分析・学習したりするのを助けます。
  - **Zero-Data-Loss Writing / プロット維持型変換**: The "Style Rewrite" engine converts prose styles without losing a single plot point (Ki-sho-ten-ketsu structure). This resolves a major pain point where AI rewrites typically alter the plot or omit character actions. / 「この作風でリライト実行」機能は、元の起承転結プロットを完全に固定した上で、描写表現とトーンのみを選択した作風に入れ替えます。AIにありがちな「リライトすると話の内容やキャラの行動まで勝手に変わってしまう」という問題を解決します。
  - **Portability / 外部連携性**: Structured JSON reports can be exported and directly loaded into ChatGPT, Claude, or other LLMs to replicate the analyzed writing style on external platforms. / 解析結果を構造化JSONとして保存し、ChatGPTやClaude等の外部AIチャットツールに「この文体で執筆して」と直接命令として投入することが可能です。また、生成した作風JSONは AI 4-koma System のSTEP1に直接ドラッグ＆ドロップして適用することも可能です。
- **50+ Parameter Analysis / 50以上のパラメータ解析**:
  - Dropping a text sample triggers deep stylistic parsing covering Rhetoric (metaphors, repetition), Syntax (average sentence length, ending verbs), Vocabulary (parts of speech, density of abstract words), Dialogue balance, and Emotional arc. / テキストをドロップして解析を実行すると、AIが修辞技法、構文（文長、体言止め比率）、語彙の偏り、会話比率、感情曲線など50以上の文体特徴を深層分析します。
- **Dual Format Output / 2形式のレポート出力**:
  - **Human-Readable (文章表示)**: Clear, itemized analysis of the writer's style for study or presentation. / 解析結果を論理的に解説した人間用文章レポート。
  - **Structured JSON (構造化JSON)**: Outputs a structured JSON representing the stylistic fingerprint. Can be copied and pasted directly into external tools (ChatGPT, Claude, etc.) or dragged and dropped into AI 4-koma System's STEP1. / 外部ツール（ChatGPT / Claude等）にそのままコピー＆ペーストして作風クローンを指示できるほか、AI 4-koma System のSTEP1に直接ドラッグ＆ドロップして適用可能な構造化JSON出力。
- **Plot-Preserving Rewrite / 構成維持型リライト機能**:
  - Implements the "Rewrite with Style" feature. It takes the original generated story, maps its core plot points, and uses the saved style parameters to rewrite the draft. Changes style, voice, and sensory details while retaining 100% of the original story progression (Ki-sho-ten-ketsu structure). / 解析した文体を、上の出力エリアに生成されたストーリーに適用して「リライト」を実行。ストーリー展開（起承転結）を完全に保ったまま、文章表現・描写・語り口のみを解析した作風へとコンバートします。
- **Style Rewrite Progress Sync / 作風リライト時の進捗・ストリーミング同期**:
  - Rewriting now clears the log window and displays simulation step logs (rhythm check, vocabulary mapping) followed by a live character counter during text compilation. / 作風リライト処理がストリーミング通信化され、実行時に進捗窓が自動リセットされ、リライト待機中の適用シミュレーションログおよび執筆中の文字数が進捗窓内にリアルタイム同期表示されます。

### 3. Today's News Keywords / 今日のニュースキーワード取得詳細仕様
Leverages Google Gemini's Search Grounding to fetch the latest real-time Japanese news headlines and extract multi-category narrative keywords to feed the story generator.
Google Geminiの検索グラウンディング（Search Grounding）ツールを利用して、リアルタイムの日本の主要ニュースから、創作の刺激となる多角的なキーワードを自動抽出し、カスタムテーマとしてセットする機能です。

- **Operational Value & Benefits / 導入メリット**:
  - **Real-Time Synergy / リアルタイム性の融合**: Automatically grounds fictional settings in active, real-world events. Writers can effortlessly craft topical stories that resonate with current social conversations. / 現実社会のホットな話題や時事ニュースを即座に創作プロットの切り口として取り込み、トレンドを反映した社会的共感性の高い物語を容易に生み出すことができます。
  - **Curation Diversity & Balance / 偏りのないキュレーション**: The search agent is strictly instructed to pull keywords across social, international, business, entertainment, sports, and science categories. This breaks the LLM's natural tendency to overfocus on high-tech topics like AI or IT. / AIに対して社会、国際、経済、エンタメ、科学などの各ジャンルからバランスよくキーワードを集めるよう指示しており、AIが「IT・AI」などの一部のトピックに偏ったネタばかりを選ぶのを防ぎ、多様性に富んだ物語の種を供給します。
- **Interactive Execution / インタラクティブな実行フロー**:
  - Requires a valid API key. When the "🌐 ニュース" button is clicked, the app sends a semantic search request to the Gemini engine, processes the headlines, format them as comma-separated values, and appends the new keywords to the custom theme field with a comma, preventing overwriting existing inputs. / 有効なAPIキーを設定した状態で「🌐 ニュース」ボタンをクリックすると、AIがWeb検索を介して最新ニュースを見出しとして収集・構造化し、テーマ入力欄へ既存の入力を上書きせず、カンマ（`, `）で繋げて追記します。

### 4. Individual Input Locking Spec / 個別入力ロック機能詳細仕様
Granular interface freeze mechanism that allows writers to lock down specific fields, protecting them from random generation or reset operations.
特定の入力フィールドを個別に固定（ロック）し、一括ランダム生成や全リセットといった操作による予期せぬ値の上書きから保護するためのインターフェース制御機能です。

- **Operational Value & Benefits / 導入メリット**:
  - **Granular Control in Randomization / 意図的なランダム性の制御**: Enables an iterative brainstorming workflow. Writers can lock down their established characters and worldview while letting the engine randomize themes, eras, and endings to discover unexpected scenarios. / 「登場人物や世界観だけは固定し、他のテーマやオチ、ジャンルだけをランダムに変更して色々なアイデアを出したい」といった、意図的な部分固定ランダム生成が可能になり、効率的なシナリオハンティングをサポートします。
  - **Safe Reset / 安全な一括クリアガード**: Protects highly customized assets (such as visual data in the Universal Intake or complex character sheets) during a reset operation, eliminating the anxiety of accidental data loss. / 万能インプットにドロップした多数のアセットや、作り込んだキャラクターシートなど、再入力に時間のかかる重要なカスタム情報を保持したまま他のパラメータのみを一掃し、安全に次の試行に移ることができます。
- **Toggle Lock Interface / トグルロックインターフェース**:
  - Every setting section features a lock button (`🔓`/`🔒`). When toggled to locked (`🔒`), the field becomes read-only and ignores all global operations, including "One-Shot Full Random" (`🎲 全項目ランダム`), specific section randomizer, and "Reset All" (`🗑️ 全リセット`). / 各入力セクションに配置された「🔓/🔒」トグルボタンをクリックしてロック状態にすると、その欄への入力やランダム変更が完全に抑止され、「🎲 全項目ランダム」や「🗑️ 全リセット」時にも影響を受けずに設定値が維持されます。

### 5. AI Progress & Thought Log Window Spec / AI進捗・思考ログ窓詳細仕様
A visual status console and parser framework that exposes the LLM's internal cognitive process (Chain of Thought) and live writing metrics to the user.
LLMの内部思考プロセス（Chain of Thought）およびリアルタイムな執筆状況を可視化し、進捗の不透明さやフリーズ感を解消するためのコンソール型表示・解析システムです。

- **Operational Value & Benefits / 導入メリット**:
  - **Zero-Freeze Visibility / フリーズ感の完全な払拭**: API接続時の通信待機中も、約3秒ごとにダミーの内部計算ログ（起承転結妥当性の検証、感情落差比率のシミュレーション等）が出力され、AIが裏で動いている様子がリアルタイムに伝わります。
  - **Cognitive Process Transparency / 思考プロセスの透明化**: AIが思考した内容（`<thought>`タグ内）を自動的に分離・抽出し、専用のスクロール領域に「思考プロセス」として流し込みます。AIがどのようなプロットを立て、自己採点を行ったかを直接デバッグ・確認できます。
  - **Interactive Character Counter / リアルタイム執筆カウント**: 本文の執筆が開始されると、ストリーミング通信と連動して「・現在文字数: XXX文字」と文字数がカウントアップされ、執筆の進捗度がビジュアルで分かります。
- **Exclusive Scoreboard Layout / 排他表示型自己採点スコアボード**:
  - Displays progress bars and passing badges representing the AI's self-verified scores (Plot Recovery, Structure, Constraint compliance).
  - To maximize log visibility and prevent UI clutter inside the 200px fixed-height console, the scoreboard is completely hidden during active generation while the API warning bar (yellow) is visible. Upon successful generation, the warning bar disappears, and the finalized self-grading scoreboard (green passing bars) instantly populates the top of the progress log. / AIの自己検証結果（伏線回収・構造・制約）を可視化する合格グラフ（緑のバー）。進行ログの表示領域（高さ200px）を圧迫しないよう、生成中は黄色の警告バーを表示しスコアボードは非表示にします。完了時に警告バーが消え、合格確定したグラフが上部に一括表示される排他表示レイアウトを採用しています。
- **Robust Empty Output Prevention / 空白出力バグの完全な解消**:
  - Implemented an automatic rescue logic in the thought log parsing (CoT extraction) where the entire text is treated as the story body if no output markers (e.g., 'Topic:') are detected. Furthermore, a double-layered empty output prevention guardrail has been introduced to forcibly restore text from the raw response if the final parsed output is 50 characters or less, resolving the blank output bug completely. / 長編小説モードのプロンプト生成など、文中に分離キーワード（`Topic:` 等）が含まれない場合に出力が空になるバグを修正。キーワード未検出時はテキスト全体を本文とみなし、さらに最終出力が50文字未満の場合は全体テキスト（`totalText`）から本文を強制救出するフェールセーフを実装し、空白出力バグを完全に解消しました。

---


## 💻 Tech Stack / 技術スタック
- **Frontend**: Vite + Vanilla HTML/CSS/JS (Lightweight frontend / 軽量フロントエンド構成)
- **LLM/VFM**: Google Gemini API (`gemini-3-flash-preview`, `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-2.5-pro`) & OpenAI API (`gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-mini`)
- **Deployment**: GitHub Pages (static hosting / 静的ホスティングによるデプロイ)

---

## 🌍 Cloud / Browser (Deploy)
1. **Access**: Open the deployed web app / [Story Maker (GitHub Pages)](https://furuyan1234.github.io/story-maker/) にアクセス
2. **Get API Key**: Obtain a Gemini API key at [Google AI Studio](https://aistudio.google.com/app/apikey) or an OpenAI API key at [OpenAI Platform](https://platform.openai.com/api-keys) / [Google AI Studio](https://aistudio.google.com/app/apikey) でGemini APIキー、または [OpenAI Platform](https://platform.openai.com/api-keys) でOpenAI APIキーを取得
3. **Run**: Enter your API key at the top and click generate buttons / 上部のAPIキー欄に入力して「保存」後、「🎲 全てランダムで生成」または「ストーリー生成」ボタンを押す

> Billing is pay-per-use (or free tier). Story generation typically uses ~1,000–1,500 tokens per request.
> 料金は従量課金制（または無料枠）です。通常、1回の物語生成で約1,000〜1,500トークンを消費します。
>
> **Note:** The API key is held in memory only and never sent anywhere except the official Google/OpenAI API endpoints.  
> **注:** APIキーはメモリ内のみで保持され、GoogleおよびOpenAIの公式エンドポイント以外には送信されません。

### 💻 Run Locally (Windows) / ローカル実行版（ZIPダウンロード時）
1. [Releases](https://github.com/FURUYAN1234/story-maker/releases) からZIPファイルをダウンロードし、展開する / Unzip the downloaded folder
2. フォルダ内の `start_Story_app.bat` をダブルクリックする / Double-click `start_Story_app.bat`
3. 依存ライブラリが自動インストールされ、ブラウザが起動します。 / Node.js dependencies are automatically installed and the app launches.
*(※実行には[Node.js](https://nodejs.org/)のインストールが必要です / Requires Node.js installed)*

### 🚀 Deploy to GitHub Pages / GitHub Pagesでデプロイ
```bash
git clone https://github.com/YOUR_USERNAME/story-maker
cd story-maker
# Push to main branch, then enable GitHub Pages in repo Settings
```

---

## ⚖️ Compliance & Legal Stance / 法的遵守について
**Japanese Copyright Law (Article 30-4)**
This project is developed in full compliance with Article 30-4 of the Japanese Copyright Act, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
本プロジェクトは、日本の著作権法第30条の4（情報解析目的等での利用）に基づき、技術検証および情報解析を目的として開発されており、法的に適正な範囲内で公開されています。

**Official API Usage**
All generations are performed through the official Google Gemini API and OpenAI API. This system adheres strictly to their respective usage policies.
本システムはGoogle公式のGemini APIおよびOpenAI公式のAPIを介して動作しており、各社が定める「生成AI禁止事項」および利用規約を厳格に遵守しています。

**No-Profit & Research Focus**
The core logic (Prompts/Protocols) is released under CC BY-NC-SA 4.0. Any commercial misuse by third parties is strictly prohibited. This project exists solely for the advancement of LLM control technology and the democratization of creative writing tools.
核心的なロジックはCC BY-NC-SA 4.0（非営利）の下で公開されています。第三者による悪質な商用利用はライセンス違反となります。本プロジェクトは、LLM制御技術の発展と、執筆活動の民主化を目的とした研究成果です。

---

## ⚖️ License & Rights / ライセンス・権利関係
This project uses a hybrid license to balance technology sharing and intellectual property protection.
技術の共有と創作の保護を両立するため、以下のハイブリッドライセンスを採用しています。

* **Source Code**: [MIT License](https://opensource.org/licenses/MIT)
  Applies to software logic and implementation code. / ソフトウェアの動作ロジックや実装コードに適用。
* **Logic & Prompts**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
  Applies to original design philosophy, multi-axis randomization arrays, and anti-repetition structures. / 設計思想、多軸ランダム化の配列、および反復防止プロンプト構造に適用。

* **Output Ownership / 生成物の帰属**:
  The CC SA (ShareAlike) requirement **does not apply** to texts generated by this system. Rights belong to the user.
  本システムで生成されたテキスト（物語・プロット）に上記CCライセンスの継承義務は適用されません。権利はユーザーに帰属します。

**Commercial Use and Paid Seminars / 商用利用・有料セミナーについて**
Usage of this system (including prompts and logic) in high-priced information products, paid seminars, or any "get-rich-quick" schemes is strictly prohibited under the CC BY-NC-SA 4.0 license.
本システム（プロンプトおよびロジックを含む）を、高額な情報商材、有料セミナー、または「副業・稼げる」等の謳い文句を伴うビジネスに無断で使用することは、CC BY-NC-SA 4.0ライセンスに基づき、固く禁じます。

Any commercial or educational use involving fees requires explicit prior written consent from the developer (FURU).
有料の教育目的や商用利用を検討される場合は、必ず事前に開発者（FURU）の書面による承諾を得てください。

---

### 1. 目的 / Purpose
本ツールは創作支援を目的としたものであり、既存の著作物、ブランド、キャラクター、または特定の作家・作品の再現や代替を目的とした利用は想定していません。  
This tool is intended for creative assistance and is not designed to reproduce, substitute, or replicate existing copyrighted works, brands, characters, or specific creators.

---

### 2. 生成コンテンツに関する禁止事項 / Prohibited Uses
ユーザーは、本ツールを使用して以下の行為を行ってはなりません。  
Users must not engage in the following:

#### (1) 著作権・知的財産権侵害 / Intellectual Property Infringement
既存の小説、脚本、記事、漫画原作、その他文章コンテンツを実質的に再現・模倣する行為
Reproducing or closely imitating existing written works such as novels, scripts, articles, or story content

特定の作家・作品の文体、語り口、プロット構造、キャラクター構成を識別可能なレベルで再現する行為  
Replicating the writing style, narrative voice, plot structure, or character composition of a specific author or work in a recognizable manner

既存作品のストーリー展開、設定、プロットを言い換え・変形して再利用する行為  
Reusing or paraphrasing existing storylines, settings, or plots from copyrighted works

#### (2) 権利侵害コンテンツの利用 / Use of Infringing Content
- 第三者の著作権、商標権、肖像権、パブリシティ権等を侵害するコンテンツの生成、公開、販売、共有  
- 既存IPに類似したコンテンツの無断商用利用  

Generating, distributing, or monetizing infringing or derivative content without permission.

#### (3) 入力データの不正利用 / Misuse of Input Data
- ユーザーは、入力する画像・テキスト等について、適法な権利または使用許諾を有することを保証するものとします  
- 権利を有しない第三者コンテンツを入力として使用する行為  

Users must have legal rights to all input data.

#### (4) 不正利用の助長 / Facilitation of Misuse
- 権利侵害を目的としたプロンプト、テンプレート、ワークフローの作成・共有  
- 他者に侵害行為を促す行為  

Creating or sharing tools intended for infringement.

#### (5) 法令違反・不正行為 / Illegal Activities
- 適用される法令に違反する行為  
- 詐欺、不正行為、または有害な目的での利用  

Any illegal or harmful use.

---

### 3. 生成物の責任および権利 / Responsibility & Ownership
生成されたコンテンツの内容および利用に関するすべての責任はユーザーに帰属します。  
The user bears full responsibility for generated content.

本ツールの利用によって生成されたコンテンツについて、開発者は著作権その他の権利を主張しませんが、その適法性・利用可能性を保証するものではありません。  
The developer does not claim ownership of generated content but does not guarantee its legality or usability.

---

### 4. 免責事項 / Disclaimer
本ツールは「現状有姿（AS IS）」で提供され、明示または黙示を問わず、いかなる保証も行いません。  
This tool is provided "as is" without any warranties.

開発者は、本ツールの利用または生成コンテンツに起因するいかなる損害についても責任を負いません。  
The developer shall not be liable for any damages arising from use.

---

### 5. 権利侵害への対応 / Infringement & Takedown
権利侵害の申し立てがあった場合、開発者は独自の判断により以下の対応を行う場合があります。  
Upon receiving a valid claim, the developer may:

- 該当コンテンツの削除要請または削除  
- 利用の制限または禁止  
- リポジトリの公開停止等の措置  

Remove content, restrict usage, or take necessary actions.

---

### 6. 規約の変更 / Changes
本規約は予告なく変更される場合があります。  
These terms may be updated without notice.

---

### 7. 準拠法 / Governing Law
本規約は日本法に準拠します。  
These terms are governed by the laws of Japan.

---

## 🔗 Integrated Ecosystem / 統合エコシステム
This project is part of an integrated ecosystem designed to support AI-powered manga and story creation.
本プロジェクトは、AIを活用した漫画・ストーリー制作を支援する統合エコシステムの一部です。

#### 1. AI 4-koma System
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
A tool for translating manga into 10 languages using AI. / AIを使って漫画を10言語に翻訳するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nbdf826604ce7)
- [Demo / デモ](https://furuyan1234.github.io/comic-translation/)
- [Code / コード](https://github.com/FURUYAN1234/comic-translation)

#### 5. 360° AI Panorama Generator
A tool that generates seamless 360-degree spatial backgrounds to provide background assets for manga and video. / シームレスな360度空間の背景を生成し、漫画や動画の背景素材として提供するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nb53b121fef88)
- [Demo / デモ](https://furuyan1234.github.io/panoforge/)
- [Code / コード](https://github.com/FURUYAN1234/panoforge)

#### 6. AI Voice Comic Maker
A tool to automatically convert static 4-koma manga into fully voiced animated videos. / 静止画の4コマ漫画をフルボイスの動画に自動変換するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndc6533c1512f)
- [Code / コード](https://github.com/FURUYAN1234/ai-voice-comic-maker)

---

## Changelog / 変更履歴

This changelog is intentionally compact. Older noisy patch-by-patch notes were removed from README to keep the project overview readable. For older detail, use GitHub Releases, tags, or commit history.
この変更履歴は読みやすさを優先して整理しています。古い細かなパッチ履歴や重複したメモは README から削除し、必要な場合は GitHub Releases / tags / commit history を参照してください。

### v4.0.4 (2026-06-03)
- **Late-Stage Retry Margin / 終盤リトライ余裕化**: The final four long-novel chapters now receive a late-stage canon lock, three audit repair attempts, and up to five whole-chapter regenerations so character state, life/death status, possessions, and final-resolution timing have more room to stabilize before fail-closed stop. / 長編終盤4章では、人物状態・生死・所持品・役割・最終解決タイミングを固定するガイドを追加し、部分修正3回、章全体再生成最大5回まで余裕を持たせました。
- **Retry Budget Carry-Forward / リトライ予算の持ち越し**: Once a chapter enters the extended regeneration path because of a structural or save-gate failure, later failures in the same chapter no longer collapse the budget back to two attempts. / 構造問題や保存前ゲートで拡張再生成に入った章は、同じ章内で失敗理由が変わっても上限が2回へ戻らないようにしました。
- **Context Memo Fragment Guard / 文脈メモ断片ガード**: Incomplete long-novel memo headings such as chapter-end state notes are stripped before save, and any remaining memo fragments are rejected before they can enter the readable manuscript or Story Bible context. / `第○章 終了時点での...` のような途中で切れた長編メモ見出しは保存前に除去し、残存した場合は本文やストーリーバイブルへ入る前に拒否します。
- **Premature Resolution Gate / 早期完結ゲート強化**: Non-final long-novel chapters now reject whole-story resolution from the mid-story onward, including core destruction, system shutdown, rescue-transfer epilogues, and hospital-awakening style false endings. / 長編の非最終章では、中盤以降のコア破壊・システム停止・救急搬送エピローグ・病室目覚め系の疑似完結を保存前に拒否します。
- **Premature Gate Precision / 早期完結ゲート精度調整**: Failed, prevented, partial, temporary, or local system/core shutdown attempts are now treated as mid-story crisis beats instead of completed resolution, reducing unnecessary retries around the middle chapters. / 失敗・阻止・部分的・一時的・局所的なシステム/コア停止未遂は、中盤の危機として扱い、完結済みと誤判定して不要な再生成を消費しないよう調整しました。
- **Mid-Story Canon State Lock / 中盤以降の正史状態固定**: Mid-story and retry prompts now explicitly inherit the previous saved chapter's final place, injuries, destroyed/lost items, spent weapons, exits, handoffs, and unresolved crisis so retries do not rewind irreversible events. / 中盤以降と再生成時の指示に、直前保存章の位置・負傷・破壊/紛失アイテム・発射済み武器・退場・引き渡し・未解決危機を正史として固定するルールを追加し、不可逆イベントの巻き戻しを抑えます。
- **Chapter-1 Gate Scope / 第1章ゲート範囲修正**: Chapter 1 now passes the total chapter count into the pre-save quality gate, and premature-resolution checks stay disabled until the configured mid-story threshold. / 第1章の保存前品質ゲートにも総章数を渡し、早期完結チェックが中盤到達前に誤発火しないようにしました。
- **Full API QA / 実機API検証**: Fresh Gemini browser QA completed 12 / 12 chapters at 96,684 visible characters, with clean manuscript scan, one final marker, visible score bars, and scores of 96 / 97 / 100. Late protected chapters stayed within margin: chapter 10 used 2 / 5 regenerations and chapter 11 used 1 / 3 audit repairs. / Gemini実機QAで12章・96,684字を完走し、本文スキャン、完結マーカー1個、採点バー表示、96 / 97 / 100点を確認しました。終盤保護章の消費は第10章が再生成2 / 5、第11章が整合性修正1 / 3に収まりました。
- **Backup Rule / バックアップ運用**: Antigravity full backup should be launched in a visible PowerShell window by directly running `backup_full.ps1` with `-File`, avoiding wrapper commands that can print unrelated startup errors. / Antigravityのフルバックアップは、ユーザーがログを目視できる黒いPowerShell窓でPS1を直接起動する運用に統一しました。

### v4.0.3 (2026-06-03)
- **Score Bar Visibility / 採点バー表示修正**: Long-novel self-grading now uses the same score-row, bar-fill, and score-value classes as the existing short-form score board, with CSS compatibility for already-rendered long-novel score rows. / 長編完了時の自己採点が短編等と同じバー表示クラスを使うよう修正し、既に表示済みの長編スコアにもバーが見える互換CSSを追加しました。
- **Structural Retry Budget / 構造矛盾リトライ強化**: Repair attempts stay capped to avoid over-patching a broken draft, but unresolved chronology, geography, setting, character, or foreshadowing contradictions now receive the extended chapter-regeneration budget and stronger state-lock retry guidance. / 壊れた章を部分修正し続けないよう修正試行は据え置きつつ、時系列・地理・設定・人物・伏線の構造矛盾が残る場合は章再生成の予算と状態固定指示を強化しました。

### v4.0.2 (2026-06-03)
- **Long-Novel Repair Fail-Closed / 長編修正ゲートのfail-closed化**: Rejected repair candidates now block saving and trigger chapter regeneration instead of letting the original draft pass a second audit. / 破損・異常な修正候補を棄却した後、未修正本文を再検査で保存してしまう経路を塞ぎ、章全体の再生成へ回すようにしました。
- **Duplicate Carry-Over Guard / 重複持ち越し対策**: Hardened the path caught during API QA where chapter-to-chapter duplicated prose could be saved after a too-short or length-shifted repair result was rejected. / API検証中に検出した章またぎの重複本文について、短すぎる修正案や文字数変動が大きい修正案を保存に通さないよう強化しました。

### v4.0.1 (2026-06-03)
- **Long-Novel Self-Grading / 長編自己採点表示**: Completed long novels now show the existing three-item score board: Plot Recovery, Structure, and Constraint compliance. / 長編小説の全章完了時にも、短編等と同じ「伏線回収度」「起承転結の構造」「制約遵守度」の3項目スコアボードを表示します。
- **Story Quality / 小説本編の面白さ強化**: Long-novel prompts now emphasize irreversible choices, visible costs, expectation reversals, scene-to-scene escalation, and exposition converted into character pressure. / 不可逆な選択、代償、期待の反転、シーンごとの緊張上昇、説明を葛藤へ変換する指示を追加しました。
- **Verification / 検証**: Local checks passed: `node --check src/main.js`, `npm run build`, `npm run lint --if-present`, `git diff --check`, and browser DOM smoke check on port 5179. Fresh full API QA and deploy are still pending. / ローカル検証は通過済み。新しいフルAPI QAとデプロイは未実施です。

### v4.0.0 (2026-06-03)
- **Versioning / バージョン運用**: Corrected the post-`v3.9.9` release line to `v4.0.0`, keeping minor and patch slots from becoming two digits. / `v3.9.9` の次を `v4.0.0` に補正し、2桁化しない運用にしました。
- **Long-Novel Reliability / 長編安定化**: Paragraph-density checks now count normal visible line breaks, reducing false rejection of properly paragraphed Japanese prose. / 通常の改行段落を正しく数え、適切に段落分けされた日本語本文の誤リジェクトを減らしました。
- **Recovery / 自動復旧**: Paragraph/scene-density failures now use extended regeneration with explicit retry guidance. / 段落・シーン密度の失敗時に、具体的な再生成指示と拡張リトライを使うようにしました。
- **QA and Deploy / QAとデプロイ**: Fresh Gemini browser QA completed 12 / 12 chapters at 96,555 visible characters with clean final scan, then GitHub Pages deploy passed. / Gemini実機QAで12章完走、本文スキャン通過後にGitHub Pagesへデプロイしました。

### v3.9.x (2026-06-03)
- **Fail-Closed Long-Novel Gates / フェイルクローズ強化**: Added duplicate/replay rejection, empty-heading cleanup, late non-final premature-resolution detection, and clean output preservation after failed retries. / 重複・再演、空見出し、終盤手前の早すぎる解決、失敗時の本文汚染を防ぐ保存前ゲートを強化しました。
- **Prompt and Recovery / プロンプトと復旧**: Added endpoint anchors, retry chronology guidance, duplicate-specific regeneration, and chapter-1 quality-gate retry handling. / 直前章の到達点固定、時系列維持、重複専用リトライ、第1章の品質ゲート再生成を整備しました。
- **Startup Defaults / 初期値修正**: Mode defaults are applied before generation while preserving user-entered, random, or locked values. / 生成前にモード初期値を確実に反映しつつ、ユーザー入力・ランダム・ロック済み値は保持します。

### v3.8.x (2026-06-02)
- **Completed Manuscript Display / 完成原稿表示**: Rebuilt final long-novel headers from saved chapters and kept completed manuscripts in the scroll-contained output box. / 保存済み章から完成ヘッダーを再構築し、完成後も本文欄内スクロールを維持しました。
- **Final Chapter Safety / 最終章安全化**: Added final-chapter state locks, proper final marker normalization, and near-final resolution guards. / 最終章の状態固定、完了マーカー正規化、終盤手前の決着防止を追加しました。
- **QA / 検証**: Multiple full Gemini browser runs verified 10 / 10 chapter completion and clean manuscript scans, while exposing and fixing header/title regressions. / 複数回の10章完走QAで本文汚染を確認し、ヘッダーや章タイトルの退行を修正しました。

### v3.7.x (2026-06-02)
- **Long-Novel Control / 長編制御**: Stabilized chapter-end pause, automatic continuation, live preview scrolling, and full-run QA handling. / 章末一時停止、自動継続、ライブプレビューのスクロール、フルラン検証を安定化しました。
- **Output Hygiene / 出力衛生**: Kept clean manuscripts visible after completion and prevented context memo leakage into the readable body. / 完成後の本文表示を保持し、文脈メモが可読本文へ混入しないようにしました。

### v3.6.x (2026-06-01 to 2026-06-02)
- **Long-Form Foundation / 長編基盤**: Introduced long-novel memory/state separation, chapter memo handling, Story Bible safeguards, and fail-closed adoption before saved text or carry-forward context can be polluted. / 長編の状態分離、章メモ、Story Bible保護、保存前フェイルクローズ採用を導入しました。
- **Quality Cleanup / 品質クリーンアップ**: Hardened body cleanup against repair chatter, memo residue, citation-like artifacts, malformed attempts, and continuity contradictions. / 修復ログ、メモ残骸、引用風ノイズ、不正な章試行、整合性矛盾を保存前に除去・拒否する仕組みを強化しました。

### v3.5 and Earlier / v3.5以前
- Archived from this README to reduce noise. See GitHub Releases, tags, and commit history for older detail. / READMEの可読性維持のため詳細履歴は削除しました。古い詳細はGitHub Releases、tags、commit historyを参照してください。
