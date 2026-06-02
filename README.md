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
- **Robust Auto-Recovery / 強牢な自動修復**: If structural logic or continuity checks fail, the engine performs up to two complete chapter regenerations with explicit failure guidance before a fail-closed stop, significantly improving success rates for long novels. / 論理・整合性の検証に失敗した場合、破綻したまま保存せず、最大2回までチャプター全体の再生成と自動修復を試みることで、長編完遂率を大幅に向上させました。
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

## 📝 Changelog / 更新履歴

### v3.5.5 — 2026-05-29
- **Long Novel Mode Bug Fixes & UI Improvements / 長編小説モードのバグ修正とUI改善**:
  - Fixed a critical UI freeze bug in Long Novel Mode caused by a missing variable declaration (`panel is not defined`) during the "Generating..." state. / 長編小説モード開始時に「構築中...」のままUIがフリーズする致命的なバグ（変数の未定義エラー）を修正しました。
  - Fixed a CSS bug where the "Pause" button was visually disabled (`pointer-events: none`) during text streaming, allowing users to correctly queue a pause request at any time. / 文字が流れている最中（生成中）に一時停止ボタンがクリック不可になっていたCSSのバグを修正し、いつでも一時停止の予約ができるようにしました。
  - Added a descriptive note explaining that the pause function completes the current chapter before stopping. / 一時停止ボタンを押しても即座には止まらず、現在執筆中の章が書き終わるまで処理が継続する旨の注意書きをUIに追記しました。

### v3.5.2 — 2026-05-28
- **Auto-Continue Loop for Ultra-Long Narratives / 超長文生成時の自動継続（オートコンティニュー）ループ実装**:
  - Implemented an automatic loop mechanism in `main.js` and `styleAnalyzer.js` to seamlessly resume output when hitting the strict 8,192 token limit of LLM APIs. The system now automatically fetches and appends the rest of the story behind the scenes without user intervention. / LLMの出力上限（8192トークン等）に到達して物語が途切れてしまう問題を解決するため、自動的に続きを要求してシームレスに結合するオートコンティニューループ機構を実装しました。
  - Fixed a bug where generated footer text was duplicated during style rewrite processing. / 作風リライト処理時に生成済みフッターが二重に処理されてしまうバグを修正しました。

### v3.5.0 — 2026-05-28
- **Eliminate AI-hallucinated Preview Models & Standardize Stable API Configs / 実在しない架空のプレビューモデル名の完全排除と実在モデルへの正常化**:
  - Completely cleaned up and standardized API model configurations by removing legacy preview model names. Synced default settings to active, stable production models (`gemini-2.0-flash`, `gpt-4o`, `gpt-4o-mini`). / AIエージェントが過去に勝手に想像して埋め込んでいた実在しない架空のプレビューモデル名をソースコードおよび設定ファイルから完全に一掃・根絶し、実在する最新の安定モデル（`gemini-2.0-flash` や `gpt-4o` など）に正常化しました。
  - Synced all version strings to `v3.5.0` due to strict versioning policy (patch version ending in `.9` bumps to next minor `.0`). / バージョン管理の厳格ルールに基づき、バージョン表記を `v3.5.0` に一括更新しました。

### v3.4.9 — 2026-05-28
- **Fix System-Wide Process Termination & Version Sync / システムプロセス強制終了バグの修正とバージョン同期**:
  - Removed `taskkill /F /IM node.exe` from `start_Story_app.bat` to prevent the startup script from killing unrelated Node.js applications (such as VOICEVOX or other dev servers) running in the background. / `start_Story_app.bat` から、起動時にバックグラウンドで動いている無関係な Node.js アプリ（VOICEVOX や他の開発サーバーなど）を巻き込んで強制終了させていた `taskkill` 処理を削除し、安全にローカルサーバーを起動できるよう改善しました。
  - Synced all version strings to `v3.4.9`. / バージョン表記を `v3.4.9` に一括同期しました。

### v3.4.8 — 2026-05-28
- **Robust JSON Parser for Technical Blogs & OpenAI API / 技術ブログ等に対するJSONパースの頑健化とOpenAI対応**:
  - Replaced the fragile `inString`-based state machine in `extractFirstJsonObject` with a simple and robust boundary search using `indexOf('{')` and `lastIndexOf('}')` to prevent truncation of valid JSON responses that contain double quotes inside values. / 文字列値内に生のダブルクォーテーションや中括弧が含まれる場合に、従来の `inString` ステートマシンが区切り文字と誤認して不完全なJSONを切り出してしまっていたバグを解消するため、`indexOf` / `lastIndexOf` を用いた境界抽出ロジックに修正しました。
  - Rewrote the repair mechanism in `parseJsonWithRepair` and `parseCharacterJson` to safely escape raw newline and tab control characters inside string values without corrupting existing valid escapes and quote boundaries. / `parseJsonWithRepair` および `parseCharacterJson` 内の修復処理を再設計し、エスケープシーケンスやクォート構造を破壊することなく、値内の実際の改行・タブ等の制御文字のみを安全に `\n` / `\t` に自動エスケープする堅牢な処理へと刷新しました。
  - Introduced key-boundary based JSON parser (`robustParseJson`) to slice and rebuild JSON fields based on known keys, completely avoiding parse errors even when unescaped quotes or raw newlines are included in values. This robust logic is shared across Gemini and OpenAI pipelines. / 既知のキー名（`style_name` 等）の出現位置に基づいて値を自動スライスし、値の中の生ダブルクォートや生改行を安全にエスケープした上でJSONオブジェクトを再構築する `robustParseJson` を導入。この頑健なパースロジックをGeminiおよびOpenAIの共通パイプラインに適用しました。
  - Configured `temperature: 0.1` for style analysis to drastically reduce format deviations from AI models. / 作風解析時のAPIオプションに `temperature: 0.1` を設定し、AIの出力のブレを最小限に抑えるよう最適化。

### v3.4.3 — 2026-05-28
- **Gemini Fallback Story Truncation & Hybrid Recovery Bug Fix / Geminiフォールバックストーリー欠落バグとハイブリッド救出処理の修正**:
  - Fixed a bug where index prioritisation of `Topic:` and `タイトル:` in fallback recovery logic was incorrectly truncating the main story text when both tags were present in the native thought process. Corrected the start index logic to select the minimum index (earliest occurrence) of either tag. / `useNativeThought` 時に `Topic:` と `タイトル:` の両方が存在する場合にインデックス優先判定が誤って後方のタグを選び、本文をすべて切り捨ててしまう（文字数が41字程度になる）バグを修正。より小さい（最初に出現する）インデックスを正しく `startIdx` に選定するように改善しました。
  - Enhanced the hybrid parse fallback recovery logic for cases where `useNativeThought` is `false` by allowing keyword-based slicing of `totalText` and cleaning leftover thought tags to prevent tag leakage. / `useNativeThought` が `false` の時の救出フォールバックにおいても、`totalText` の中に `Topic:` や `タイトル:` が含まれていればそこからスライスし、なければ `thought` タグを完全に除去して本文を救出する頑健なロジックへと拡張しました。

### v3.4.2 — 2026-05-28
- **Style Rewrite Robustness & OpenAI API Compatibility Fix / 作風解析リライト機能の堅牢化とOpenAI API互換性の修正**:
  - Replaced the direct injection of raw JSON style parameters with a formatted, human-readable text block. Removed the `reproduction_prompt` field from style analyzer data to prevent prompt confusion (competing instructions) in OpenAI models. / OpenAI API等の外部エンジンにおいてモデル競合（プロンプト内プロンプトによる誤認）を引き起こしていた `reproduction_prompt` の注入を廃止し、スタイルパラメータを人間が読みやすい整形プレーンテキスト形式で渡すように改善しました。
  - Reinforced rewrite prompt guardrails by explicitly prohibiting noun-only fragments (excessive noun-based endings) and instructing models to treat style parameters as guidelines rather than absolute commands. Added concrete character range targets to stabilize text density. / 体言止めの過剰適用によって文章が名詞だらけ（崩壊）になるのを防ぐため、プロット維持や自然な日本語の優先を指示するガードレールを強化しました。また、文字数範囲の数値指定を追加しました。

### v3.4.1 — 2026-05-25
- **Thought Tag Leakage & Hybrid Parser Fix / AI思考プロセス（thoughtタグ）のリーク防止とハイブリッドパーサーの判定改善**:
  - Improved the CoT (Chain of Thought) parsing regex to correctly match and strip all `<thought>` tags (using `/<thought[^>]*>/i`) from the generated text, preventing raw AI thought processes from leaking into user-visible outputs. / AIの内部思考プロセス（`<thought>`タグ等）が生成結果の本文中に混入してリークする問題を防ぐため、 thought タグの除去・パース用正規表現を `/<thought[^>]*>/i` に強化・改善しました。
  - Fixed a hybrid parser bug where thought process fragments containing certain keywords (e.g. `【完】`) were mistakenly identified as the boundary of the main story. Removed misleading keywords from the parsing fallback to ensure stable text extraction across all modes (long, diary, etc.). / ハイブリッドパーサーが `【完】` などのキーワードに過剰反応して思考プロセスの残骸を小説の本文開始/終了と誤認識していた不具合を修正。判定を厳格化し、長編や日記などの多様な生成モードにおいて常に欠落やリークのない安定したストーリー出力を保証しました。

### v3.4.0 — 2026-05-25
- **Gemini API Model Deprecation Fix & Error Protection Deployment / Gemini APIモデル非推奨化対応およびエラー防止策のデプロイ**:
  - Replaced legacy/deprecated Gemini models in both text and vision configurations with stable alternatives (`gemini-2.0-flash` as primary, `gemini-1.5-pro` and `gemini-1.5-flash` as fallbacks) to prevent 404 connection errors. / テキスト・画像認識・マルチモーダルAPIの全てにおいて、非推奨化された旧モデル設定を廃止し、最新の `gemini-2.0-flash` および安定した `gemini-1.5-pro` / `gemini-1.5-flash` への切り替えと自動フォールバックを実装しました。
  - Implemented AbortController-based timeouts (25s for text, 60s for vision/multimodal) and resolved memory leaks by ensuring proper `clearTimeout` cleanup, protecting the app from hanging. / 25秒（テキスト）および60秒（画像）の AbortController タイムアウトと `clearTimeout` によるタイマー解放漏れ・メモリリーク防止を徹底し、ハングアップ問題を解消しました。

### v3.3.9 — 2026-05-25
- **Vision & Multimodal API Modernization & Memory Leak Fix / 画像・マルチモーダルAPIの最新化とメモリリーク・フリーズ修正**:
  - **Vision Model Modernization**: Replaced legacy model configurations in `IMAGE_MODEL_IDS` with the latest stable model `gemini-2.0-flash` as primary, and added stable backup models `gemini-1.5-pro` and `gemini-1.5-flash` to mitigate deprecation errors during character sheet OCR import and multimodal style analysis. / キャラクターシート画像インポートおよびマルチモーダル作風解析で使用される `IMAGE_MODEL_IDS` から非推奨プレビューモデルを廃止し、最新の `gemini-2.0-flash` を第一優先に、高精度の画像理解実績を持つ `gemini-1.5-pro` と `gemini-1.5-flash` をバックアップフォールバックとして配置し、接続停止や 404 エラーを予防しました。
  - **Memory Leak and Hang Fix**: Replaced the inefficient Promise.race based timeout handler in `callGenerativeAIVision` and `callGenerativeAIMultimodal` with AbortController-based timeouts directly linked to fetch requests. Enforced `clearTimeout` to destroy timeout timers upon success/failure, completely preventing memory leaks and orphaned network connections during repetitive image drops. / 従来のタイムアウト処理で発生していた「タイマー解放漏れによるメモリリーク」および「タイムアウト時に fetch リクエストが切断されない問題」を解消。`AbortController` と `clearTimeout` を完全に連動させ、60秒タイムアウト発生時に速やかに接続を中止して安定モデルへフォールバックするロジックを実装しました。

### v3.3.8 — 2026-05-25
- **Gemini Model Modernization & Timeout with Auto-Fallback / Geminiモデルの最新化とタイムアウト付き自動フォールバック**:
  - **Model Modernization**: Replaced legacy model configurations with the latest stable model `gemini-2.0-flash` as the default first priority, and added `gemini-flash-latest` to the model list. / 非推奨モデルとなった旧モデル設定を廃止し、最新の安定動作モデル `gemini-2.0-flash` を第一優先（起動時デフォルト）に変更。また、`gemini-flash-latest` もモデルリストに組み込みました。
  - **25s Timeout & Fallback**: Implemented a 25-second timeout (using `AbortController`) for Gemini text generation and streaming requests to prevent generation from freezing when models are deprecated or unresponsive. If a timeout or API error occurs, the pipeline automatically falls back to `gemini-1.5-pro` (or `gemini-pro-latest`) and retries the generation. / テキスト生成およびストリーミング要求に対して `AbortController` による25秒のタイムアウト処理を導入。通信タイムアウトやAPIエラー（非推奨モデルによる 404 エラーなど）が発生した場合は、自動的に `gemini-1.5-pro`（または `gemini-pro-latest`）にフォールバックして再試行するロジックを実装し、フリーズや停止を防止しました。

### v3.3.7 — 2026-05-24
- **PC-Fit Viewport Layout (100vh Flexbox/Grid) / PC表示向け100vhフィットレイアウト**: Converted the hardcoded sidebar height styling (`height: calc(100vh - 345px)`) to a dynamic Flexbox and Grid layout. The header wrapper now sizes naturally, and the sidebar (`.settings-panel`) and output display area (`.output-panel`) expand to fill exactly 100% of the remaining screen height. This prevents panels from overflowing or failing to scroll when the API switches, API notice wraps, or connection bars change the banner size. / サイドバーの高さ指定（`height: calc(100vh - 345px)`）を廃止し、画面全体の高さ（100vh）に自動追従するFlexbox・Gridレイアウトへ刷新。APIエンジンの切り替えや警告文の折り返しなどでバナーの高さが変動しても、左右のパネルが画面からはみ出すことなく、枠内で常に快適にスクロールおよび固定表示されるようになりました。
- **Strict Scoreboard Visibility Exclusion / 自己採点スコアボード表示の完全排他制御**: Fixed a visibility bug where the green scoreboard (Plot Recovery, Structure, Constraint compliance bars) would pop up prematurely during active text generation if scoring metrics were parsed early in the thinking process. The scoreboard is now forced to remain hidden (`display: none`) until the generation is fully complete, ensuring only the yellow progress warning bar is shown during communication. / AIの思考プロセス（CoT）から中間採点結果がパースされた時点でスコアボードが途中で表示されてしまう不具合を修正。API稼働中（生成中）はパースされた結果があっても絶対にスコアボードを表示しない（`display: none`）よう排他表示を徹底し、ストーリーの推敲が完全に完了した段階で初めてスコアボードを表示するように変更しました。
- **Auto Scroll-To-Top and Focus Reset on Generation / 新規ストーリー生成開始時のスクロールリセットとフォーカス戻し**: Added logic that scrolls the right output display panel back to the very top (the start of the OUTPUT box and progress log) when the user clicks the "Generate Story" button. This ensures that even if the view was scrolled down to the bottom (e.g. at the Style Rewrite result section), the viewport instantly shifts focus back to the new story progress indicator and completion output. / 作風リライト等を実行して画面が下部にスクロールした状態から、新しく「ストーリー生成」を実行した際、右側パネル（`#output-panel`）のスクロール位置を自動的に最上部にスクロールしてフォーカスをリセットする処理を実装。新規の執筆進捗ログや本文を即座に視認できるよう改善しました。
- **Style Analyzer Mutual Disable / API稼働中の超解析モード非活性化**: Ensured that the Style Analyzer section (`#sa-section`) is dynamically disabled (pointer-events blocked and grayed out) using the `.generating` class during standard story generation, preventing unauthorized API calls or duplicate submissions. Reciprocally, the settings panel and Style Analyzer are both disabled during style analysis and rewrite operations. / ストーリー生成中（API通信中）に、右下の「超解析モード（作風解析）」セクション（`#sa-section`）も左側設定パネルと同様に非活性化（グレーアウト・クリック無効）にする制御を追加。また、作風解析やリライトの実行中も同セクション自身を非活性化するようにし、二重実行や通信中の誤操作によるバグを防止しました。

### v3.3.6 — 2026-05-24
- **AI Progress & Thought Log Window Integration / AI進捗・思考ログ窓の統合**: Added a sticky visual console window at the top of the app. It displays real-time connection statuses, procedural wait simulation logs, model fallbacks, raw thought processes (CoT / `<thought>` tag extraction), and live writing progress indicators. / 画面上部に常設された固定コンソール領域を実装。APIの接続待機プロセス、計算シミュレーション、モデルフォールバック、AIの思考プロセス（CoT / `<thought>`タグの分離抽出とリアルタイム表示）、および執筆進捗（リアルタイム文字数カウント）を視覚的に流し込みます。
- **Self-Grading Scoreboard with Exclusive Display / 自己採点スコアボードと排他表示**: Implemented a parser that evaluates AI-generated quality metrics (Plot Recovery, Structure, Constraint compliance) and visualizes them as progress bars and passing badges. Hides during generation to prevent screen clutter and appears instantly alongside the final story. / AIが出力した自己採点（「伏線回収度」「起承転結の構造」「制約遵守度」）をパースし、達成度を合格バッジ（緑のバー）でビジュアル表示。通信待機中のAPI警告バーと完全な排他表示を実装し、執筆完了時に一括表示されるようレイアウトを最適化しました。
- **Style Rewrite Progress Sync / 作風リライト時の進捗・ストリーミング同期**: Upgraded the style rewrite engine to support real-time progress logging and text streaming (`callGenerativeAIStream`). Rewriting now clears the log window and displays simulation step logs (rhythm check, vocabulary mapping) followed by a live character counter during text compilation. / 作風リライト処理をストリーミング通信化。実行時に進捗窓を自動リセットし、リライト待機中の適用シミュレーションログおよび執筆中の文字数を進捗窓内にリアルタイム同期表示します。
- **Robust Null-Story / Empty Output Prevention / 空白出力バグの完全な解消**: Resolved an issue where outputs without specific structure keywords (e.g. prompt generation in long novel mode) resulted in empty stories. If no keywords are matched, the parser defaults to treating the entire response as the story body. Added a double-gate rescue fallback that restores the raw `totalText` if the final output is less than 50 characters, ensuring no text is lost. / 長編小説モードのプロンプト生成など、文中に分離キーワードが含まれない場合に出力が空になるバグを修正。キーワード未検出時はテキスト全体を本文とみなし、さらに最終出力が50文字未満の場合は全体テキスト（`totalText`）から本文を強制救出するフェールセーフを実装しました。

### v3.3.4 — 2026-05-22
- **Nano Banana Pro Link Integration / Nano Banana Proへの連携説明文追加**: Added an explanation to the Style Analyzer JSON output section indicating that generated style JSON files can be directly dragged and dropped into AI 4-koma System's STEP1 drop zone. / 作風解析エンジンのJSON出力結果エリアおよびREADMEに、生成した作風JSONファイルが AI 4-koma System のSTEP1（ドロップエリア）に直接連携可能であることを明記する説明文を追加しました。

### v3.3.3 — 2026-05-22
- **Update Style Analyzer Engine Title & Explanation Polish / 「超強引！作風解析エンジン」への名称修正と説明文言のブラッシュアップ**:
  - **Title and UX Polish**: Renamed the Style Analyzer to "超強引！作風解析エンジン" (Super Forced! Style Analyzer Engine) across the UI, prompt guidelines, and footer to clearly convey the tool's ability to analyze any input. / 画像やテキスト、極端に短い文章からでも超強引に想像して作風を解析する仕様に合わせて、UI、プロンプト、フッターの表記を「超強引！作風解析エンジン — Super Forced! Style Analyzer Engine」に統一・ブラッシュアップしました。
  - **Instruction Enrichment**: Enriched the drop zone explanations to explicitly clarify that AI will fill 100% of the analysis items using rich imagination even for files with no text (image-only) or very short inputs. / 「ストーリー生成前でも作風解析は可能」「どんな資料でも強引に全項目を補完」する旨の詳細な説明・ヒントをドロップゾーンやバナー等に追加しました。
  - **API-Level JSON Response Enforcement & Short Input Parser Robustness**: Enforced JSON mode (`{ responseMimeType: 'application/json' }`) at the Gemini API level for Style Analyzer requests, and upgraded the JSON matcher to extract object patterns using recursive brace-matching to ensure short inputs (like single phrases) never crash the parser. / Gemini APIに対してレスポンスMIMEタイプに `application/json` を明示的に指定し、短文解析時（「あっちょんぶりけ」等）のパース処理において波括弧のネストを考慮した堅牢なJSON抽出処理を実装することで、パースエラーの発生を強固に予防しました。
  - **Wait Message Refinement**: Adjusted the expected wait time warning message for Gemini multimodal requests to "1-3 minutes" to align with actual API response timings. / API通信中の待機警告メッセージの目安時間を、実際の稼働実態に合わせて「1分〜3分程度」へ調整しました。

### v3.3.2 — 2026-05-22
- **Fix JSON Parse Errors & Extend API Timeout in Style Analyzer / 作風解析エンジンのJSONパースエラー修正とAPIタイムアウト時間延長**:
  - **Lookahead JSON Repair**: Enhanced the JSON repair state-machine by implementing token lookahead for commas. This ensures that unescaped double quotes inside value strings (e.g. in reproduction prompts) followed by commas are correctly treated as string content rather than misidentified as JSON delimiters, preventing JSON parse failures. / カンマ直後のトークンの先読みロジックを実装することでJSON修復エンジンを高度化。AIが生成した値の中にあるエスケープされていないダブルクォーテーションの誤判定を防ぎ、パースエラー（解析エラー：AIの応答からJSONを抽出できませんでした等）を完全に解消しました。
  - **Timeout Extension**: Extended the vision and multimodal API timeouts from 60 seconds to 180 seconds to ensure large texts (e.g. over 15k characters) and multiple images can be parsed without encountering network timeout errors. / 画像認識およびマルチモーダルAPIのタイムアウト時間を60秒から180秒へ大幅に延長。大容量テキスト（1.5万字超）や複数画像の同時解析時におけるネットワークタイムアウトエラーを防止しました。
  - **Prompt Reinforcement**: Reinforced the system prompt to explicitly restrict the AI from outputting raw double quotes inside JSON values, suggesting brackets (『』 or 「」) instead. / AIがJSONの値の中に生の二重引用符を出力するのを防ぐため、プロンプトを改訂し、二重山括弧（『』）や角括弧（「」）を推奨する指示を強化しました。

### v3.3.1 — 2026-05-22
- **Copy & Download Auto-Sanitization for NBP Integration / コピー・ダウンロード時のヘッダー記号自動クレンジング**: 
  - **Auto-Sanitization**: Implemented client-side auto-sanitization upon copy and download. This automatically detects and removes unneeded bracket characters (\`【】\`) or bold Markdown markers (\`**\`) from the generated headers (\`Topic\`, \`Logline\`, \`Location\`, \`Outfit\`, \`Punchline\`, \`Scenario\`), ensuring plain-text format alignment for Nano Banana Pro. / コピーおよびダウンロードの実行時に、生成されたテキストのヘッダー項目（\`Topic\`, \`Logline\`, \`Location\`, \`Outfit\`, \`Punchline\`, \`Scenario\`）に含まれる不要な隅付き括弧（\`【】\`）や太字（\`**\`）のMarkdown記号を正規表現で自動検出し、プレーンテキスト形式に正規化するクレンジング処理を実装しました。
  - **Residue Prevention**: This client-side sanitation guarantees zero bracket or formatting residue in clipboard data, securing the scenario parsing pipeline for Nano Banana Pro. / これにより、AIが出力に括弧や装飾を含めてしまった場合でも、コピー時に記号が完全にクレンジングされ、Nano Banana Pro側でのパース不具合や記号残存バグを完全に予防できます。

### v3.3.0 — 2026-05-22
- **Robust Style Analyzer & Direct Input Confirm & News Append / 頑健な作風解析エンジン（JSON自動修復）、テキスト確定追加、およびニューステーマ追記**: 
  - **Robust JSON Parsing**: Upgraded the Style Analyzer's JSON repair logic to a robust state-machine parser, successfully resolving parsing errors (`SyntaxError: Expected ',' or '}'`) by automatically escaping unescaped double quotes and handling control line-breaks inside AI-generated JSON values (such as in reproduction prompts). / 作風解析エンジンのJSON修復ロジックをステートマシンベースのパーサーに刷新。AIが生成したJSONの値に含まれるエスケープされていないダブルクォートや制御改行文字を安全に自動エスケープし、JSONパースエラー（`SyntaxError: Expected ',' or '}'`等）を堅牢に解消しました。
  - **Direct Input Confirm**: Added a "Confirm Add" button for direct text input in the Style Analyzer, allowing users to queue multiple text blocks as virtual files for cumulative analysis. / 作風解析のテキスト直接入力に「確定追加」ボタンを実装し、複数のテキストブロックを仮想ファイルとして蓄積（積み上げ）した上で一括解析できるように改善。
  - **News Theme Append**: Updated the Today's News Keywords feature to append new keywords to the custom theme field with a comma, preventing overwriting existing inputs. / 「今日のニュースキーワード取得」実行時に、既存のカスタムテーマ入力を上書きせず、カンマ（`, `）で繋げて追記する仕様に変更しました。
  - **Nano Banana Pro Scenario Alignment**: Enhanced the `4koma_scenario` prompt template by adding strict guidelines forbidding the AI from wrapping header values (e.g., Topic) in brackets like `【】`, ensuring seamless integration with the NBP scenario parser. / `4koma_scenario` プロンプトテンプレートを強化し、Topicなどのヘッダー値を `【Topic: xxx】` のように隅付き括弧（【】）で囲むことを厳密に禁止する指示を追加。NBPのシナリオパーサー仕様との整合性を向上させました。

### v3.2.9 — 2026-05-22
- **Multimodal Style Analyzer / マルチモーダル作風解析エンジン**: Enhanced the Style Analyzer to support composite analysis, allowing users to drop images, drop text files, and paste text directly to analyze artistic and narrative styles together. / 作風解析エンジンで画像ドロップ、テキストドロップ、テキスト直貼りの複合解析に対応し、ビジュアルと文体の両面から総合的な作風解析を行えるように強化しました。

### v3.2.8 — 2026-05-22
- **Specification Documentation & Cleanup / 仕様ドキュメント追加とクリーンアップ**: Added specifications for "Today's News Keywords" and "Individual Input Locking" functions to `README.md`. Removed obsolete development scripts and local test files to secure the release. Synchronized 4koma scenario modes with NBP parser format. / `README.md`に「今日のニュースキーワード取得」および「個別入力ロック機能」の詳細仕様を追加。不要な開発スクリプトや一時ファイルをクリーンアップし、デプロイ安全性を確保。4コマシナリオのフォーマットとNBPパーサー仕様を完全同期。

### v3.2.7 — 2026-05-22
- **Style Rewrite Activation Guard & README Expansion / 作風リライト実行ボタンのガード追加と新機能ドキュメント拡充**: Added validation to the Style Analyzer "Rewrite with Style" action. The button is now properly disabled until a story has actually been generated in the OUTPUT panel (empty states are detected via CSS `.empty` classes) and a style has been successfully analyzed. Also expanded README.md with detailed operational specifications and usage benefits for the Universal Intake (β) and Style Analyzer Engine (β). / 作風解析エンジンの「この作風でリライト実行」ボタンの不具合を修正。上の出力エリアにストーリーが生成されていない初期状態（および「思考中...」状態）ではリライト実行できないようガードロジックを追加しました。また、README.mdに「万能インプット（ユニバーサル・インテーク）」と「作風解析エンジン」の動作仕様やメリットに関する詳細説明を追記しました。

### v3.2.6 — 2026-05-22
- **Item Locking, Reset Integration & Universal Input Processing Indicator / 項目ロック・リセット連携 & 万能インプット解析時AI稼働状況アニメーション**: Implemented individual lock buttons for each input field (genre, theme, era, worldview, target, ending, perspective) to allow users to freeze specific settings during random generation. Integrated lock states with the master reset button to clear all locks automatically. Fixed an issue where the global processing indicator (yellow progress bar) failed to animate during heavy AI tasks, such as universal input asset scraping and image analysis. Also resolved code syntax errors and removed obsolete NBP code references from comments. / 各入力項目（ジャンル、テーマ、時代、世界観、ターゲット、結末、語り口）に個別ロックボタンを実装し、ランダム生成時に特定の選択を固定できるように改善。全リセット時にはロック状態も同時に解除されることを明記。万能インプットの画像解析やスクレイピングなど、AIが重い処理を実行している際も上部の黄色い稼働状況アニメーションバーが正しく動作し、稼働中であることが視覚的に伝わるように改善。その他、マージ時の構文エラー解消、コメント内の他プロジェクト由来の固有名詞 `NBP` をクリーンアップ。

### v3.2.5 — 2026-05-22
- **API Key Lock Fix & Memory Transition / APIキー保存確定の不具合修正とメモリ保持への差し戻し**: Reverted API key sessionStorage retention so that page reload properly initializes (clears) the key. Fixed an issue where saving/locking the API key did not persist the locked state properly. / リロード時にAPIキーが確実に初期化（消去）されるよう、sessionStorageによるキーの一時保持処理を完全に廃止しました。また、APIキー入力時の保存（確定）ボタン押下後に、APIキーが正しくロックされず再入力を求められる不具合を修正しました。

### v3.2.4 — 2026-05-22
- **Universal Intake Bug Fixes & UX Improvements / 万能インプット（ユニバーサル・インテーク）の不具合修正とUX改善**: Fixed API key reset issue on reload by using `sessionStorage` to temporarily retain keys. Fixed text asset limitation to allow short direct inputs (>0 chars). Improved CORS scraping failures and missing key states for images with user-friendly warnings, while preventing UI error texts from polluting the prompt during generation. / リロード時にAPIキーが消失する不具合を `sessionStorage` による一時保持で解決。テキストアセット登録時の文字数制限を緩和し、短い手動入力も登録可能に改善。Webリンクの解析失敗（CORSエラー）や画像解析の失敗（APIキー未設定時）のUI表現を分かりやすく修正し、エラー状態のアセットが生成時のプロンプトを汚染（エラーUI文字がそのままAIに入力される問題）しないよう除外ロジックを追加しました。

### v3.2.3 — 2026-05-19
- **NBP Scenario Parser Sync / NBPシナリオパーサー同期**: Updated the "4-koma scenario" output format to fully comply with the latest Nano Banana Pro (NBP) scenario parser specifications (v3.71-alpha). Expanded EMOTION tags from 6 to 17, adopted 8 Japanese Camera angle tags with strict non-duplication rules, and integrated 12 predefined Punchline types for robust cross-project synchronization. / 4コマシナリオ出力フォーマットをNano Banana Pro (NBP) の最新パーサー仕様（v3.71-alpha）に完全準拠するよう更新。EMOTIONタグを6種から17種へ拡大、Cameraアングルを重複禁止ルールの下で日本語8種に変更、さらに12種の定義済みPunchlineタイプを統合し、強固なクロスプロジェクト同期を実現しました。

### v3.2.2 — 2026-05-19
- **Expanded Local RAG Dictionary (IT & Technology) / ローカルRAG辞書の拡張（IT・テクノロジー領域）**: Added deep industry-specific knowledge to the Local RAG database, covering Software Development, SIer (System Integration) culture, Infrastructure/Networking, AI/Machine Learning, and Hacker/Cybersecurity domains. This empowers the AI to generate highly authentic, jargon-rich, and atmospherically accurate narratives set in modern tech environments. / ローカルRAGの知識データベースに「IT・テクノロジー領域」を新設。ソフトウェア開発、SIer・炎上プロジェクト、インフラ・ネットワーク、AI開発、ハッカー・セキュリティの5カテゴリを追加。開発現場特有の文化や過酷な空気感をAIに注入し、リアリティの高い専門的な描写が可能になりました。

### v3.2.1 — 2026-05-19
- **Local RAG Integration / 完全ローカルRAG（検索拡張生成）辞書の統合**: Implemented a standalone, zero-cost RAG system that injects specific world-building details (props, era-specific terminology, sensory elements) into the prompt based on the user's selected worldview, era, and theme. This forces the AI to ground its narrative in concrete details rather than abstract tropes, significantly improving world authenticity. / 外部サービス不要・完全無料のローカルRAG（検索拡張生成）システムを実装。ユーザーが選択した世界観・時代・テーマに基づき、専用辞書から具体的なディテール（小道具・通貨・歴史用語・匂いなど）をプロンプトに動的注入。AI特有の「抽象的でフワッとした描写」を防ぎ、物語の解像度と世界観の説得力を劇的に向上させます。
- **Google Search Grounding (Gemini) / Google検索グラウンディング対応**: Enabled Gemini's native Search Grounding tool for text generation. When the AI determines that factual accuracy is necessary (e.g., historical events, scientific terms, real-world locations), it will automatically perform a Google search and incorporate the findings into the story. / Geminiエンジンのテキスト生成においてGoogle検索グラウンディングを有効化。時代考証や専門知識が必要なテーマが選ばれた際、AIが自律的にGoogle検索を実行して事実確認を行い、正確な知識をベースにした物語を執筆できるようになりました。

### v3.5.1 — 2026-05-28
- **Release Correction (Fail Forward) / リリース修正（前進的復旧）**: Bumped patch version to v3.5.1 to resolve tag conflict in remote repository, following the fail-forward release protocol. / タグ競合問題を解消するため、Fail-Forwardリリースプロトコルに従いシステムバージョンを v3.5.1 に繰り上げて再デプロイを実施。

### v3.5.0 — 2026-05-28
- **Model Update & Fallback optimization / モデル更新とフォールバック最適化**: Updated the model priorities and dynamic fallback targets to modern engines (gemini-3.5-flash, gemini-2.5-flash, gemini-2.5-pro, gpt-4.1, gpt-4.1-mini, etc.) across the API client (`api.js`). Enhanced thinking mode detection to support next-generation engines. / APIクライアント（`api.js`）における画像解析・テキスト生成用の推奨モデル優先順位およびフォールバックターゲットを最新のモデル群（gemini-3.5-flash, gemini-2.5-flash, gemini-2.5-pro, gpt-4.1, gpt-4.1-mini 等）に更新。また、次世代エンジンに対応した思考モード判定ロジックの最適化を実施。

### v3.2.0 — 2026-05-19
- **Advanced Narrative Quality Engine**: Upgraded the prompt engineering architecture with 3 new writing rules and 3 new quality gate checks, raising the total from 12 to 15 rules and from 6 to 9 quality gate items. These enhancements apply to both standard and long-form modes, and work identically across Gemini and ChatGPT engines. / プロンプトエンジニアリングを大幅強化。執筆ルール3項目・品質ゲート3項目を新規追加し、構成ルール数を12→15、品質ゲート項目数を6→9に拡大。通常モードと長編モードの両方に適用され、Gemini/ChatGPT両エンジンで同一品質を実現。
  - **Sensory Balance Enforcement / 五感バランス強制**: Prohibits visual-only scene descriptions. After any visual description, at least one non-visual sense (auditory, tactile, olfactory, gustatory, or interoceptive) must be included. Scene transitions must begin with non-visual information (ambient sound, air texture, smell). / 各シーンで視覚偏重の描写を禁止。視覚描写の直後に聴覚・触覚・嗅覚・体内感覚のいずれかを必ず組み合わせ、場面転換時は非視覚情報から描写を開始することで没入感を向上。
  - **World-Grounded Metaphor Guard / 比喩素材の世界観準拠**: Bans overused cliché metaphors ("time stopped", "heavy as lead", etc.) and requires metaphors to be constructed from materials native to the story's setting and era (e.g., medieval → forge/candle/horseback imagery; cyberpunk → circuit/current/data imagery). / 使い古された定型比喩（「時間が止まった」「鉛のように重い」等）を禁止し、物語の舞台・時代・世界観に由来する素材で比喩を構築することを義務付け。
  - **Character Knowledge Boundary / キャラクター知識境界の遵守**: Before writing dialogue or inner thoughts, the AI must verify what each character knows and doesn't know. Characters are strictly prohibited from referencing unseen events, other characters' secrets, or truths revealed later in the story. Maintains the "reader suspects but character doesn't know" foreshadowing structure. / 台詞・内面描写の前にキャラの知識状態を検証し、未見の情報や他キャラの秘密への言及を厳禁。「読者には匂わせるがキャラは気づいていない」伏線構造を正確に維持。

### v3.1.4 — 2026-05-19
- **Feature/UI**: Added explicit "API Switch" (🔄 API切替) button to the banner to allow seamless toggling between Gemini and ChatGPT engines. Both API keys are now securely held in memory independently, avoiding the need to re-enter keys when switching. / バナー部に「🔄 API切替」ボタンを新設し、GeminiエンジンとChatGPTエンジンをワンクリックでシームレスに切り替えられるように改善。両方のAPIキーをメモリ内に個別に保持するため、切り替えごとの再入力が不要になりました。
- **UI Bugfix**: When no API key is entered, the banner now explicitly displays a neutral warning ("⚠ API未設定") instead of defaulting to "Gemini API". API acquisition links for both providers are now prominently displayed in the banner for easier onboarding. / APIキー未入力時に「Gemini API」とデフォルト表示されていた問題を修正し、中立的な警告表示（「⚠ API未設定」）に変更。また、APIキー取得用リンク（Gemini / OpenAI）をバナーに表示し、初回設定をサポートしました。

### v3.1.3 — 2026-05-18
- **Deploy**: System maintenance and deployment pipeline execution. / システムメンテナンスおよびデプロイパイプラインの実行。

### v3.1.2 — 2026-05-18
- **Documentation Update**: Expanded the README.md to provide detailed English and Japanese explanations of the new Dual API Engine (Gemini & OpenAI) architecture, updating the feature list, tech stack, and API usage sections. / デュアルAPI対応（Gemini＆OpenAI）に伴い、READMEの解説文を大幅に加筆修正。主要機能や技術スタック、API利用セクションにデュアルエンジン対応の旨を詳細に記載しました。

### v3.1.1 — 2026-05-18
- **UI Bugfix**: Removed hardcoded "Gemini API" labels from the initial API key input banner and tutorial guides to correctly reflect the new Dual API Engine support (Gemini & OpenAI). / 未入力時のAPIキー入力欄やチュートリアル文にハードコードされていた「Gemini」表記を、デュアルエンジン対応に合わせて中立的な名称に修正しUIの整合性を向上。

### v3.1.0 — 2026-05-18
- **Dual API Engine Integration (Gemini & OpenAI)**: Implemented dual-engine support. The application can now dynamically route text and vision requests between Google's Gemini models and OpenAI's GPT models (gpt-4o, gpt-4o-mini) based on the provided API key (sk-... prefix triggers OpenAI). / デュアルAPIエンジン（Gemini＆OpenAI）対応。入力されたAPIキーを判定（sk-から始まる場合はOpenAI）し、テキスト生成およびキャラクターシート画像解析の通信先をGeminiとChatGPT間で動的に切り替えるルーティング処理を実装。

### v3.0.0 — 2026-05-18
- **Bugfix: Startup Script**: Fixed an issue with the batch file for local deployment (`start_Story_app.bat`). / ローカル実行用のバッチファイル（`start_Story_app.bat`）の起動時挙動を修正。

### v2.9.9 — 2026-05-04
- **Long-Form Dynamic Scale**: The generated master prompt for long-form mode now dynamically declares the scale of the story (tens of thousands of characters) based on the theme, establishing a framework for automated continuous generation. / 長編モードのマスター指示書冒頭に「規模宣言」を追加。テーマに基づく章数と目標文字数（数万字規模）を動的に設定し、全自動生成の枠組みを構築します。
- **Automated Chapter Progression**: The interactive chapter-by-chapter confirmation has been upgraded to a fully automated streaming process. The AI writes continuously until completion, while users can safely pause the generation at chapter boundaries using the new pause toggle. / 各章完了時の確認メッセージを廃止し、全自動ストリーミング処理にアップグレード。執筆は完結まで自動継続されますが、新設された一時停止ボタンにより章の区切りで安全に処理を止めることが可能です。
- **Final Chapter Full-Text Output Enforcement**: Added a dedicated "Final Chapter Output Format" section to the long-form prompt with a concrete code block template showing the exact expected output structure. Previously, AIs would ignore the full-text compilation rule and end with just 「お疲れ様でした」. The new format makes the expected behavior unambiguous and explicitly prohibits skipping the full-text output. / 最終章完了時の全文コードブロック出力を強制化。専用の「最終章出力フォーマット」セクションを新設し、具体的なテンプレートを提示。AIが「お疲れ様でした」だけで終了する問題を解決。

### v2.9.8 — 2026-05-04
- **Long-Form Routine Enhancements (Pacing & Sub-plots)**: Implemented three advanced routines into the long-form prompt to solve common AI writing flaws in extended narratives. Added "Active Character Roster" tracking to prevent secondary characters from disappearing in late chapters. Added "Pacing Enforcement" to mandate sensory descriptions during climaxes to prevent rushed dialogue pacing. Added "Dynamic Chekhov's Gun" protocol to force the AI to plant an irrelevant item/habit in the Setup phase and weaponize it in the Payoff phase for maximum reader impact. / 長編小説モードにおけるAI特有の欠陥（終盤の脇役消失、クライマックスの駆け足展開、伏線の単調さ）を解消する3つのルーチンを統合。「サブキャラクター追跡」による脇役の生存確保、「描写密度強制」による対話間の五感・苦痛描写の義務付け、「動的チェーホフの銃」による序盤の何気ない日常描写の致命的要素への反転回収を実装。

### v2.9.7 — 2026-05-04
- **Long-Form Seamless Streaming Engine**: Upgraded the long-form generation from a stop-and-go manual confirmation flow to a seamless, fully automated streaming engine. The AI now continuously outputs chapters one after another without requiring user prompts, achieving true autonomous long-novel generation while preserving structural integrity. / 長編小説モードを「1章ずつ停止して確認」する手動フローから、シームレスな全自動ストリーミングエンジンへと刷新。ユーザーの指示待ちを排除し、構造の整合性を保ちながら自律的に章を連続出力する真の長編自動執筆を実現しました。
- **Full-Text Compilation on Completion**: Added a "Final Action" protocol to the long-form prompt template. When all chapters are complete, the AI is instructed to: (a) announce completion with total chapter count, (b) report total character count, and (c) output the entire novel text compiled into a single markdown code block — enabling easy one-click copy of the full work. / 長編プロンプトに「全章完了時の最終アクション」を追加。最終章完了時にAIが全章数・総文字数を報告し、第1章から最終章までの全文を1つのコードブロックにまとめて出力する機能。ワンクリックで全文コピーが可能に。

### v2.9.6 — 2026-05-03
- **Long-Form Prompt Overhaul**: Completely updated the master prompt template for long-form generation (novel) to fully support the latest narrative engineering methodologies. The template now integrates the 15-Beat Structure, GMC+S (Goal, Motivation, Conflict, Stakes) scene dynamics, "Show, Don't Tell" physicality rules, Subtext dialogue enforcement, 6 Emotion Gap Techniques, Motif Recurrence tracking, 3 Tone Variations, and a 6-point Quality Gate self-verification checklist. Added a "Logline Anchor" to keep the story axis fixed throughout the multi-chapter generation process. Includes the comprehensive "Guard C" mechanical filter rules to eliminate AI clichés. / 長編小説モード（long）の分割執筆用マスター指示書テンプレートを最新の物語エンジニアリング手法に完全対応。15ビート構造、GMC+S（ステークス）のシーン推進、五感描写（Show, Don't Tell）、サブテキスト（説明台詞禁止）、6種の落差技法、モチーフ回帰、文体の緩急、および出力前自己検証（品質ゲート）を統合。複数章にまたがる執筆での軸ブレを防ぐ「ログライン固定」や、AI特有の悪癖を排除する包括的ガードCルールを適用。

### v2.9.5 — 2026-05-03
- **Prompt Engineering Refinement (GMC+S, Subtext, Logline)**: Upgraded the scene dynamics protocol from GMC to GMC+S by mandating "Stakes" (what characters lose if they fail) for every scene. Enforced strict "Subtext" rules to eliminate "On the Nose" dialogue, and introduced a "Logline Anchor" rule to prevent the AI from wandering off-plot during generation. / シーン推進ロジックをGMCから「GMC+S（ステークス）」にアップグレードし、全シーンに失敗時の代償を設定。さらに「サブテキスト」ルールを追加して説明台詞（オン・ザ・ノーズ）を禁止し、物語開始時に「ログライン」を固定させることでポン出し生成時のプロットのブレを防止。

### v2.9.4 — 2026-05-03
- **Style Analyzer Engine (β) / 作風解析エンジン (β版)**: New experimental module that performs deep computational stylistics analysis on uploaded text files. Extracts 50+ parameters across 10 categories (rhetoric, sentence structure, vocabulary, description focus, dialogue style, emotional architecture, literary influences, anti-patterns, and reproduction prompt). Outputs in dual format: human-readable text for review and structured JSON for injection into other AI novel tools (ChatGPT, Claude, Gemini). Includes "Style Rewrite" function to apply extracted style to generated stories while preserving plot. Full model fallback support with real-time progress display. / 任意のテキストファイルをドロップするだけで、AIが修辞技法・文体・語彙・描写・セリフ・感情設計等50以上のパラメータを深層分析するβ版モジュール。結果は人間用テキストとAI小説ツール向けJSONの2形式で出力。解析した作風を生成済みストーリーに適用する「リライト」機能も搭載。モデルフォールバック完全対応。
- **Unified API Status Display / API稼働ステータス表示の統一**: Synchronized real-time API progress and fallback tracking across the global alert bar, the main generation button, and the dedicated Style Analyzer action buttons. / ストーリー生成・作風解析・リライト時のAPI稼働状況（およびフォールバック状況）を、画面上部のアラートバー・左パネルの生成ボタン・右パネルの各アクションボタン間で完全に同期してリアルタイム表示するよう統一。
- **Timestamped File Downloads**: All downloaded files (story .txt, analysis .json, rewrite .txt) now use `name_YYYYMMDDHHmmss` naming convention for organized file management. / ダウンロードファイル全てに `名前_年月日時分秒` 形式のタイムスタンプを付与し、ファイル管理を効率化。

### v2.9.3 — 2026-05-02
- **Narrative Logic Refinement**: Integrated advanced AI novel writing protocols (15-Beat Structure, GMC Scene Dynamics, and Physicality "Show, Don't Tell" rules). / 「AI小説固有の課題解決構造」から15ビート構造、シーンごとのGMC（目的・動機・葛藤）設定、および五感を通じた身体性（Show, Don't Tell）ルールを統合し、長編・中編の構成力と文学的質感を大幅に向上。
- **Guard C (Post-Output Filter)**: Implemented mechanical text sanitization in `main.js` to automatically remove AI clichés ("いかがでしたか", "結論として") and leftover markdown formatting before rendering. / `main.js`側に出力直前のテキストクリーニング処理（ガードC）を実装。

### v2.9.2 — 2026-05-02
- **Character UI Overhaul**: Separated the "Sex" (性別) attribute from the Detailed Memo into its own dedicated input field alongside Name and Role. Added dropdown options for 男性, 女性, 無性, 回答無し, and custom text.
- **Enhanced Gender Sync**: Updated the bidirectional gender synchronization logic to automatically update the Sex field based on Name inferences, and vice versa.
- **AI Vision Parsing**: Updated the character sheet OCR extraction prompt to recognize the sex attribute separately.



### v2.9.1 — 2026-04-30
- **Security Audit & Cleanup**: Performed pre-deployment security audit (confirmed no hardcoded credentials and zero `localStorage` API key leakage). Removed obsolete development artifacts (`diff.txt`, `gitlog.txt`, `pkg_log.txt`) from root. / デプロイ前セキュリティ監査を実施（ハードコードなし、localStorageへのAPIキー漏洩ゼロを確認）。ルートディレクトリから不要な開発時一時ファイル群を削除しクリーンアップ。

### v2.9.0 — 2026-04-28
- **Emotion Gap Design (All Genres)**: Ported and generalized the "Gap Technique" comedy structure methodology from Nano Banana Pro into a universal narrative technique applicable to ALL genres. 6 techniques (Substitution, Exaggeration, Reversal, Absurdity, Tension-Release, Normalcy Return) now guide AI story generation across comedy, horror, romance, suspense, action, and drama. / Nano Banana Proの「ズレ技法」を全ジャンル対応の普遍的物語構造技法として移植・一般化。6種の落差技法がコメディ・ホラー・恋愛・サスペンス等全ジャンルの物語生成を強化。
- **Motif Recurrence System**: Introduced symbolic element callback rules requiring motifs to appear at least twice in different contexts, with meaning evolution connected to the emotional climax. / モチーフ回帰システムを導入。象徴的要素が異なる文脈で最低2回登場し、意味が深化しながら結末の感情的ピークに接続する構成。
- **Emotion Curve Design**: Added 4-phase narrative structure framework (Setup→Deviation→Build-up→Payoff) for intentional emotional arc design across all narrative modes. / 感情曲線設計（4フェーズ構成）を全物語系モードに導入。
- **Tone Variation System**: Defined 3 concrete tone registers (High-energy / Quiet-serene / Cold-analytical) with prohibition of same-tone streaks exceeding 3 paragraphs. / 文体緩急の3系統定義（高熱量/静謐/冷徹）と同系統の3段落以上連続禁止。
- **Quality Gate**: Added AI self-verification checklist (6 items) executed before output generation. Checks Setup-Payoff structure, emotion gap sufficiency, motif recurrence, ending pattern diversity, tone variation, and character narrative function. / AIが出力前に実行する品質ゲート（6項目の自己検証チェックリスト）を導入。
- **Comedy Structure Method (4koma)**: Full port of Nano Banana Pro comedy methodology to 4koma mode: 6 gap techniques, 4-panel composition mapping (Setup→Gag→Build→Punchline), 6 punchline variety patterns, 3 tone variations, and recommended techniques (Callback, Nori-Tsukkomi, Stacking). / 4コマモードにNBPコメディ構造メソッドを完全移植。
- **Genre Style Guide Enhancement**: Enhanced ALL 7 major genre guides and 8 comedy sub-genre guides with specific gap technique recommendations, motif usage patterns, and tone preferences per genre. / 全ジャンル（7大カテゴリ）とコメディ系8サブジャンルの文体ガイドを強化。

### v2.8.2 — 2026-04-09
- **Bugfix: Modal Overlay Click**: Fixed an issue where clicking the background overlay of the character recognition result modal would accidentally close it, causing data loss. The modal now only closes via the close/cancel buttons. / キャラクター認識結果モーダルの背景（オーバーレイ）をクリックすると意図せず閉じてしまう問題を修正。閉じるボタンまたはキャンセルボタンでのみ閉じるように改善し、データ消失を防止。

### v2.8.1 — 2026-04-09
- **Sticky Panel Header**: Fixed the "ストーリー生成" (Generate Story) button and "全項目ランダム" (All Random) button at the top of the left settings panel. The setting sections below now scroll independently while the action buttons remain always visible. / 左パネルの「ストーリー生成」ボタンと「全項目ランダム」ボタンを上部に固定表示化。設定セクション群のみが独立スクロールし、アクションボタンが常に見える状態に改善。

### v2.8.0 — 2026-04-06
- **Foreshadowing Tier System**: Introduced a 3-tier foreshadowing rule system to resolve contradictions where narrative modes demanded foreshadowing while non-narrative modes prohibited it. / 伏線ルールのモード別ティア制を導入。物語系モードが伏線を要求し、非物語系モードが伏線を禁止するという矛盾を解消。
  - **Tier 1 (Full)**: Narrative modes (`novel`, `medium`, `short_short`, `scenario`, `manga`, `documentary`, `radio`) retain all 7 foreshadowing & composition rules. / 物語系モードはフル伏線・構成ルール（7項目）をそのまま適用。
  - **Tier 2 (Light)**: `4koma` mode uses lightweight "setup & punchline" guidance instead of heavy foreshadowing rules, prioritizing comedic timing. / 4コマモードは「フリとオチ」の軽量ルールに差し替え、テンポとオチの切れ味を優先。
  - **Tier 3 (None)**: Non-narrative modes (`essay`, `poem`, `letter`, `diary`) exclude foreshadowing entirely, replaced with mode-specific composition rules (thematic coherence, imagery chains, emotional progression). / 非物語系モード（エッセイ・詩・手紙・日記）は伏線ルールを完全除外し、各モード固有の構成ルールに差し替え。

### v2.7.1 — 2026-04-05
- **Bugfix: Stale Alert Message**: Fixed a bug where the global alert bar displayed "画像認識中" (image recognition in progress) when clicking the story generation button after importing character sheet images. The shared `global-alert` element's innerHTML was not reset before re-display during story generation. / キャラクターシート画像を取り込んだ後にストーリー生成ボタンを押すと、「画像認識中」の古いメッセージが表示されるバグを修正。共有の`global-alert`要素のinnerHTMLがストーリー生成時にリセットされていなかった問題を解消。

### v2.7.0 — 2026-04-03
- **Character Sheet OCR Import**: Drag & drop character sheet images onto the new drop zone to auto-extract character data via Gemini Vision API. Supports multiple images at once with progress indicator. / キャラクターシート画像をドロップゾーンにドラッグ＆ドロップするだけで、Gemini Vision APIが自動認識してキャラクター情報を抽出。複数枚同時処理・進捗表示に対応。
- **AI 4koma Scenario Link (STEP2)**: New output mode that generates scenarios in AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / AI 4koma シナリオ連携（STEP2）モードを追加。AI 4-koma SystemのSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。
- **Multi-Image Drop Support**: Drop zone now accepts multiple images simultaneously, processing each sequentially and merging all detected characters into a single review modal with gallery preview. / ドロップゾーンが複数画像の同時ドロップに対応。順次処理し、全キャラクターを統合してギャラリー付きモーダルで表示。
- **UI Improvements**: Moved "ストーリー生成" button to top of settings panel (below "全項目ランダム"). Added clear guidance for character input methods (drop/manual/auto). Fixed API input bar stretching issue. / 生成ボタンをパネル最上部に移動。キャラクター入力の3パターン案内を追加。API入力欄の横伸び問題を修正。
- **OCR Progress Bar**: Added global alert bar during character sheet recognition to match story generation UX. / キャラクターシート認識中にグローバルアラートバーを表示し、ストーリー生成時と同等のUXを実現。
- **Model Priority Update**: Image recognition models follow AI 4-koma System v2.26 priority (gemini-2.0-flash first for filter tolerance). Text generation models updated with gemini-1.5-pro as top priority. / 画像認識モデルをAI 4-koma System v2.26準拠の優先順位に更新。テキスト生成モデルもgemini-1.5-proを最優先に変更。

### v2.6.0 — 2026-03-31
- **Full-Category Style Guide Engine**: Added comprehensive AI writing-style guides for ALL preset categories. Previously, preset selections (e.g., "シュールギャグ", "どんでん返し") were passed as mere label text and largely ignored by the AI. Now, each selection injects specific, actionable writing instructions into the prompt. / 全カテゴリ×全サブプリセットに対応するAI文体ガイドエンジンを追加。従来はプリセット選択がラベル名としてしかプロンプトに渡されず、AIに無視されがちだった問題を解消。
  - **Genre (ジャンル)**: 7 categories + 50 sub-presets with specific tone/style rules (e.g., "シュールギャグ" → prohibit serious inner conflict, require escalating nonsense with deadpan delivery). / 7大カテゴリ＋50サブプリセットに文体ルール付与。
  - **Ending (オチの型)**: 6 categories + 25 sub-presets with structural direction (e.g., "どんでん返し" → require 3+ foreshadowing elements). / 6大カテゴリ＋25サブの結末演出指示。
  - **Worldview (世界観)**: 7 categories + 40 sub-presets with atmosphere/setting guides. / 7大カテゴリ＋40サブの舞台描写指示。
  - **Target (ターゲット層)**: 5 categories + 25 sub-presets with language-level adjustments. / 5大カテゴリ＋25サブの文体レベル指定。
  - **Narration (語り口)**: 3 categories + 15 sub-presets with perspective rules. / 3大カテゴリ＋15サブの語り方指定。
- **New File**: `src/styleGuides.js` — Centralized style guide data (~250 entries). / 文体ガイドデータを専用ファイルに分離。

### v2.5.0 — 2026-03-31
- **Title Bracket Enforcement**: Enhanced title parsing to always wrap story titles in 【】 brackets. AI output is now sanitized of existing decorations before JS-side bracketing, ensuring consistent formatting regardless of AI behavior. / タイトルの【】付与を厳格化。AI出力から既存の装飾記号を除去した上でJS側で必ず【】を付与するよう強化。AIの出力形式に依存せず常に一貫したフォーマットを保証。
- **Output Panel Scroll**: Added `max-height` and `overflow-y: auto` to the output box, enabling in-frame scrolling for long stories. The OUTPUT header (title, character count, copy/download buttons) remains always visible. / OUTPUT欄に`max-height`と枠内スクロールを追加。長文でもヘッダー（タイトル・字数・コピー/保存ボタン）が常に表示される設計に変更。


---

Developed by **FURU**


## ChangeLog

### v3.7.9 — 2026-06-02
* **UX**: Long-novel manuscript output now keeps the same readable in-box scroll area after all chapters complete, instead of expanding the entire page into one huge manuscript column.

### v3.7.8 — 2026-06-02
* **Fix**: Long-novel audit repair now stops after two failed repair attempts per chapter and hands the chapter to whole-chapter regeneration, instead of spending many cycles trying to patch structurally broken prose.
* **Prompt**: Long-novel rules now explicitly forbid non-final chapters from resolving the whole story with full victory, complete business recovery, total contract success, or final self-affirmation.

### v3.7.7 — 2026-06-02
* **Fix**: Long-novel memo extraction now treats partial management-marker fragments such as `【全章の` as memo/admin output, preventing them from being saved into the manuscript between chapters.
* **Fix**: Long-novel live preview now sanitizes the extracted body before display, so incomplete admin headings are removed from both the visible manuscript box and the saved chapter body.
* **Quality Gate**: Save-before-adoption checks now reject bracketed partial full-chapter/admin markers if they somehow remain in a chapter body.

### v3.7.6 — 2026-06-02
* **Fix**: Long-novel next-chapter prompts now prioritize the latest context memo and next-scene GMC+S over older outline text, preventing already-completed events from being replayed as new chapter events.
* **Fix**: If a chapter fails the long-novel audit or save-quality gate, the app now retries by regenerating the whole chapter with explicit failure guidance before fail-closing, instead of endlessly trying to patch a structurally broken chapter.
* **Improvement**: Long-novel audit and repair calls now use bounded timeout/model-attempt settings, reducing stalls when the provider returns weak or malformed inspection/fix output.

### v3.7.5 — 2026-06-02
* **Fix**: During long-novel live preview, the manuscript body now scrolls inside the novel display box instead of scrolling the entire right output column. The fixed progress/control area remains separate while the chapter text itself is readable.
* **UX**: Long-novel live preview now auto-scrolls the manuscript box itself to the latest generated text, so the first chapter title no longer stays pinned while generation continues below.

### v3.7.4 — 2026-06-02
* **Fix**: Final long-novel chapters now strip premature final markers before auto-continuation and keep only the latest final marker when merging continuation text. This prevents raw continuation text from growing while the saved body remains stuck at the first too-short ending.
* **Fix**: Final-chapter body/memo extraction now uses the last final marker as the split point, so continuation text after an early ending is not misclassified as management memo.

### v3.7.3 — 2026-06-02
* **UX**: Long-novel mode now shows a fixed live status line in the control panel with current phase, chapter number, chapter-local character count, total character count, and last update time, so progress remains visible even when the manuscript preview is not scrolled to the bottom.
* **Fix**: Aborting a long-novel run now clears the generating/live-preview state immediately, preventing the UI from looking active after the user has interrupted generation.

### v3.7.2 — 2026-06-02
* **Fix**: Long-novel live preview now strips context memo /伏線管理 blocks before rendering the visible novel body, so management notes no longer appear in the main manuscript preview during generation.
* **Fix**: Removed per-chunk `scrollIntoView` calls from long-novel streaming and disabled smooth scroll anchoring while live preview is active, preventing the lower-right output pane from violently jumping during long runs.

### v3.7.1 — 2026-06-02
* **Fix**: Long-novel generation now keeps the pause control clickable during active chapter generation. It works as a safe "pause after this chapter" reservation instead of disappearing or becoming a disabled progress label.
* **Fix**: Chapter completion checks now log body length, raw length, memo-marker detection, and finish-marker detection before every auto-continuation request. The app no longer hides why it is requesting continuation.
* **Fix**: First-chapter aborts no longer collapse the panel into `0 / 0` or "chapter 0 interrupted"; the panel keeps the planned chapter count and reports interruption during chapter 1.
* **Fix**: Continuation prompts now pass only the partial chapter text and a strict continuation contract, instead of resending the full initial prompt and encouraging reset/replanning.
* **Fix**: Continuation text is now inserted before the existing context memo, and a newer memo replaces the old one. This prevents appended prose from being discarded during body/memo extraction and fixes false "chapter body too short" stops after successful continuation.
* **Improvement**: Long-novel chapter planning now aligns target length and chapter count around roughly 8,000 characters per chapter, so an 80,000-character long novel is planned as about 10 chapters.

### v3.6.11 — 2026-06-02
* **Fix**: Long-novel auto-continuation no longer returns to the outer normal-generation `finally` after chapter 1. Chapter 2+ generation is now awaited inside the long-novel chain, so the left panel and generate button are not restored as if the whole run had finished after chapter 1.
* **Fix**: Added explicit progress logs when a chapter is saved and the next chapter starts, making chapter-chain failures visible instead of silently ending at chapter 1.

### v3.6.10 — 2026-06-02
* **Fix**: Long-novel generation no longer exposes the pause/resume control as an active "pause" button while a chapter is being written. The button is now a disabled progress indicator during generation, so accidental pause reservations cannot stop the run after chapter 1.
* **Fix**: Long-novel completion checks no longer treat the initial `0 / 0` state as complete, and the first chapter header cannot reduce the run below the expected 10-chapter long-novel plan.
* **UX**: Updated the long-novel warning text so users are directed to the explicit abort button for mid-generation stopping.

### v3.6.9 — 2026-06-02
* **Fix**: Antigravity側の途中修正後に長編生成フローへ未接続になっていた自動継続・最低文字数・保存前品質ゲートを再接続。短すぎる章、途中切れ章、管理情報混入章を保存前に停止する挙動を復旧。
* **Fix**: 第2章以降の生成処理に残っていた未定義変数 `btnNext` と未定義 `timerId` 参照を修正し、次章生成中の停止・不安定化を防止。
* **Fix**: 第1章/第2章以降の矛盾検査で、重大矛盾や検査APIエラーが発生しても元テキストで続行していた経路を再度 fail-closed 化。
* **Fix**: 生成途中のメモコピー/メモTXT保存で `再現用マスター指示書` が付与され、本文や途中ログと混同される問題を修正。指示書は全章完了または明示中断後のみ付与。

### v3.6.8 — 2026-06-02
* **Fix**: 長編小説モードの古い最終章プロンプトに残っていた「全文結合出力」「コードブロック」「再現用マスター指示書」の出力指示を除去し、本文欄へ管理情報が混入する経路を遮断。
* **Fix**: 第2章以降の監査で重大矛盾や検査APIエラーが残っても続行していた fail-open 経路を修正。長編では検査失敗・残存重大問題・本文破損を保存前に停止する fail-closed 動作へ統一。
* **Fix**: 章完了判定を「メモ見出しの有無」だけでなく章本文の最低文字数と最終章の `【完】` 位置で判定するよう強化。短すぎる章や途中切れを自動継続または棄却する。
* **Fix**: 次章生成中の未定義変数 `btnNext` 参照と未初期化 `timerId` による停止リスクを修正。
* **Improvement**: 長編ストリーム生成で Google Search を無効化し、最大出力トークンとタイムアウトを長編向けに拡張。進捗パネルには予定総文字数を表示。

### v3.6.6 — 2026-06-01
* **Fix**: 長編小説の第2章以降（次章生成フロー）において、`validateFixedText`（品質ゲート）および `sanitizeText`（サニタイズ関数）が `auditAndFix` オプションおよび最終採用チェックで適用されていなかったバグを修正。第1章と同様に、第2章以降でも本文破損（1000文字未満、自己校正メタ、英語残骸など）を検知して即棄却（Fail-Closed）するよう安全性を強化。
* **Fix**: `main.js` に `validateFixedText` の実体定義が欠落しており、長編小説生成フローで ReferenceError を吐いてクラッシュする致命的バグを修正。

### v3.6.7 — 2026-06-02
* **Feature**: 長編小説モードに自動継続ループを実装。1回のAPIコールの出力上限で途切れた場合、`isChapterFinished` 判定に基づき自動的に続きを要求・結合することで文字数不足（薄い原稿）の問題を解決。
* **Fix**: 本文から消去されてしまう章見出し（`# 第N章`）を、保存・結合時に明示的に付与して結合するよう改善。
* **Fix**: 最終章の末尾で `【完】` 以降に文脈メモや再現用マスター指示書などの管理情報が混ざる出力分離バグを修正。`【完】` の直後の改行以降を確実に `memo` へ退避するよう `extractContextMemo` を拡張。
* **Improvement**: 進捗ログ窓に、各章の完了通知、執筆文字数、累積文字数、Story Bibleの更新状態、および全体の完了・最終文字数表示ログを出力するよう強化。
* **Improvement**: 長編品質ルールに「同じモチーフ（水、影、名など）の反復描写の禁止」と「章ごとの固有の対立・山場の設計」を追加し、後半の描写のマンネリ化を防止。

### v3.6.6 — 2026-06-01
* **Fix**: 長編小説モードにおける文脈維持メモの残骸・英語自己校正チャッターの排除ロジックを強化。
* **Improvement**: Google検索グラウンディング機能の制御を調整。

### v3.6.5 — 2026-06-01
* **Fix**: 長編章の保存前に fail-closed 品質ゲートを追加し、自己校正メタ、英語片、章見出し重複、半角記号、内部管理見出しが残る本文を完成稿へ採用しないよう強化。
* **Fix**: 矛盾修正AIの返した修正候補を採用前に検査し、`修正する`、`OK`、`No, there is no other`、`Let's double check` などの本文破損を即棄却するよう改善。
* **Fix**: 修正上限後に設定矛盾などの重大問題が残った章は Story Bible 更新と次章生成へ進ませず、保存を停止するよう変更。
* **Improvement**: `電子基盤`、`嬉そう`、`激激突`、`ぷかか`、`伝わて`、`響きて`、`包まして`、`鈴木手人`、`因律` など、実生成で見つかった誤字・重複語の自動補正を追加。
* **Improvement**: Story Bible 更新へ渡す矛盾検査メモから英語片や具体的な汚染箇所を圧縮し、監査記録が次章を再汚染しにくいよう調整。

### v3.6.4 — 2026-06-01
* **Fix**: 長編本文保存時に、非最終章の `【完】` を必ず除去し、最終章では本文末尾の一度だけに正規化するよう強化。
* **Fix**: `Morris` などの英字残り、`人口筋肉`、`基班`、`確確信`、`高熱熱線`、`指先を指先を` などの校正残骸を保存前に自動補正。
* **Improvement**: 長編プロンプトと矛盾検査に、終了記号、翻訳調の `および`、誤字・重複語・敬体混入の検出ルールを追加。
* **Improvement**: 最終章の自動継続判定を、単なる `【完】` の有無ではなく本文末尾の独立行に限定し、途中混入で完了扱いにならないよう改善。

### v3.6.3 — 2026-06-01
* **Fix**: 長編最終章後の進捗ログが `Story Bible更新中...` で終わって見える問題を修正。Story Bible更新完了と全章生成完了ログを明示し、完了状態を一度だけ確定するよう改善。
* **Fix**: 本文に漏れた `全章の文脈維持メモ`、`Story Bible`、`章要約` などの内部管理見出しを保存前に本文から除去するサニタイズを追加。
* **Fix**: `And,` 型の英語片、日本語文中の半角カンマ・半角ピリオド、`指示されたゴースト・プログラム` のような翻訳調残骸を本文・メモ・Story Bible更新文から正規化。
* **Improvement**: 長編章の自動増補判定を調整し、最低文字数目安に届かなかった場合は進捗ログへ未達を明示するよう改善。

### v3.6.2 — 2026-06-01
* **Fix**: 長編小説の次章生成に二重起動ガードと予約タイマー管理を追加し、同じ章番号が重複保存される問題を防止。
* **Fix**: 長編本文サニタイズを強化し、英文の地の文、単独英単語修飾、`X of Y` 型の不自然な英語断片を保存前に除去・日本語化。
* **Fix**: 章見出しを保存時に指定章番号へ正規化し、本文内の重複章見出しや他章見出しを混入させないよう改善。
* **Improvement**: 長編プロンプトと矛盾検査に、別ルートの主人公名・能力名・組織名の混入検出と修正ルールを追加。

### v3.6.1 — 2026-06-01
* **Fix**: 長編小説本文に混入していた検索引用風マーカー（`[2, 7]`等）、文脈維持メモ見出し、句点前スペースを保存前サニタイズで除去するよう強化。
* **Fix**: 長編ストリーミング生成ではGoogle検索グラウンディングを無効化し、本文・メモへの出典番号混入を根本から防止。
* **Improvement**: 長編章本文が短すぎる場合に自動増補する改稿パスを追加し、各章を長編らしい密度へ近づけるよう改善。
* **Improvement**: 初期の章別プロットを第2章以降のプロンプトへ固定注入し、Story Bibleが強くなっても全体構成から逸脱しにくくした。
* **Improvement**: 長編完成稿では軽微な矛盾も自動修正対象にし、最終本文へ材質・左右・未説明道具などの不整合を残しにくくした。

### v3.6.0 — 2026-06-01
* **Feature**: 長編小説モードにStory Bible更新ループを追加。各章の矛盾検査後に、確定事実・人物状態・関係性・時系列・伏線・モチーフ・次章編集者ノートを再整理し、次章プロンプトへ長距離記憶として渡すよう改善。
* **Feature**: 長編小説のストリーミング出力が途中で切れた場合、未完判定に基づいて最大4回まで自動継続する復旧ループを追加。
* **Feature**: 長編小説プロンプトにもローカルRAG知識を注入し、ジャンル・時代・世界観の参照情報を長編生成に反映。
* **Fix**: 第2章以降の直近章コンテキストで章番号がずれる可能性と、次章生成後に未定義タイマー参照で落ちる不具合を修正。
* **Improvement**: OpenAI/Geminiの長編ストリーミング呼び出しで出力上限を拡張し、章本文が途中で切れにくくなるよう調整。

### v3.5.9 — 2026-05-31
* **Fix**: 長編小説の本文に学術引用記号（[1]、(注1)など）が混入する問題を修正。プロンプトでの禁止指定に加え、JS側での除去処理（サニタイズ）を追加。

### v3.5.8 — 2026-05-31
* **Feature**: 長編小説の生成において、AIが全体プロットの規模に合わせて必須人物以外の「追加人物」を自動設計し、全章にわたって役割・現在地・関係性の変化を追跡・管理する「人物ロスター更新メモ」機能を追加。長編特有のキャラクターの役割崩壊を防止。

### v3.5.7 — 2026-05-31
* **Fix**: 初期表示時にブラウザが `/favicon.ico` を要求して404エラーになる問題を修正（`favicon.svg` の追加およびリンク指定）。
* **Fix**: `src/data.js` などの内部バージョン表記のズレを同期・修正。

### v3.5.6 — 2026-05-30
* **Feature**: AI矛盾検査エンジンの修正ループ安全上限を5回から8回へ引き上げ、修正処理が新たな連鎖的矛盾を生まないようプロンプトの制約（存在しないキャラクターや設定の勝手な追加禁止など）を強化。

### v3.5.5 — 2026-05-30
* **Feature**: 長編小説・短編など主要モード向けに「AI矛盾検査エンジン」を実装。各章生成完了時に矛盾がないか自己診断し、矛盾があれば修正と再検査をループ（最大試行回数8回）して論理破綻を排除。
* **UI**: AI進捗ログ窓に、AIが検出した「重大な矛盾」および「軽微な指摘」の詳細内容をリアルタイムで出力し、内部の修正プロセスを可視化。

### v3.5.4 — 2026-05-29
* **Feature**: 長編小説モードにおける「状態の完全分離と文脈パネル」を実装。小説本文とAIの構造メモ（目的・伏線等）を状態レベルで完全に分離し、エクスポートされるテキストにメタノイズが混入しないよう改善。
* **Feature**: 全てのテキスト・JSON保存のファイル名をUTCズレのないローカル時刻（日本時間）14桁（YYYYMMDDHHmmss）に統一し、ファイル名の整合性と完全一致を担保。
* **Fix**: AIが出力しがちな空の見出し（`#`）や不要な区切り線（`---`）をクレンジングで完全除去する処理を強化し、長編生成時のフォーマット揺れを解消。
* **UI**: 長編パネルの「目標」を「目安」に変更し、文字数指定設定の文言を「AIおまかせ」に近いマイルドな表現に最適化。

### v3.5.3 — 2026-05-28
* **Feature**: Gemini APIフォールバックチェーンの最適化（Gemini 2.5系列の追加対応および、UI用モデルリストとの分離によるフォールバック精度の向上）
* **Fix**: `data.js` の `GEMINI_MODELS` リストから `gemini-1.5-pro` を削除し、`gemini-2.5-flash` および `gemini-2.5-pro` を追加。


---

## 📝 ChangeLog / 変更履歴

### v3.8.0 (2026-06-02)
- **長編モードの大規模改善**: 
  - 生成中の「一時停止」を現在の章の完了を待ってから停止する予約方式に変更。
  - ライブプレビューのスクロール追従を本文枠内に限定し、画面のガタつきを防止。
  - 最新のコンテキストメモとGMC+Sを優先し、完了済みイベントの再演を防止。
  - 最終章における「完」マークの最適化と完了状態のUIスクロール維持。
  - 長編パネルに固定ライブステータス行を追加。
  - 監査や保存ゲートでリジェクトされた場合、最大2回までのチャプター再生成による自動修復を実装。
- バグ修正:
  - 継続生成時の部分的な管理マーカーのサニタイズ漏れを修正。
  - 初回チャプター中断時の表示バグを修正。
