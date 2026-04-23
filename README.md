# AI Story Maker - Multi-Axis Entropy Injection System

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**
>
> A web application that generates high-variety stories (4-panel manga plots or fiction) using the Gemini API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.
> Gemini APIを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・小説）を生成するWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。

> [!TIP]
> **Detailed Commentary Available / 詳細な解説記事を公開中**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 本プロジェクトの設計思想や、Google Gemini APIのモデル毎の挙動の違いについては、以下のnote記事で詳しく解説しています。
> [Story Maker — AI物語メーカー　AI特有の似たり寄ったりのストーリーにならないシステム / A system designed to break away from repetitive, generic AI-generated plots. (note / Japanese content)](https://note.com/happy_duck780/n/nd3d972922868)

---

## 💡 Concept: Breaking Away from Predictable AI Stories / コンセプト：AI特有の「予定調和」からの脱却
The core insight: AI outputs converge toward "average" stories when inputs have low entropy. This app injects entropy through multiple independent axes, generating narratives that are statistically improbable to repeat.
基本となる考え方：AIの出力は、入力のエントロピー（不確実性）が低いと「平均的」な物語に収束しがちです。本システムは、単純なプロンプトのラッパーツールとは異なり、決定論的なミドルウェアパイプライン（多軸ランダム化と反復防止プロンプトエンジン）を用いることで、既存の特定作品の模倣・盗用ではなく、高次元の意味的制御に基づきオリジナルの物語構造を自律的に生成します。

---

## 🚀 Core Features / 主要機能
- **Multiple Output Modes / 複数の出力モード**: Supports 14 distinct modes including 4-panel manga plots (Ki-sho-ten-ketsu + dialogue), short stories (~3,000 chars), novellas (~4,000 chars), full-length novels (~100,000 chars via prompt generation), scenarios, essays, and poems. / 4コマ漫画ネタ（起承転結＋セリフ案）、短編・中編小説、プロンプト生成による長編小説（〜10万字）、エッセイ、詩など、14種の出力モードに対応。
- **Character Sheet OCR Import / キャラクターシート自動認識**: Drag & drop character sheet images onto the drop zone to auto-extract character data via Gemini Vision API. Supports multiple images. / キャラクターシート画像をドラッグ＆ドロップするだけで、Gemini Vision APIが自動認識してキャラクター情報を抽出。複数枚同時処理に対応。
- **One-Shot Full Random / 全ランダム一発生成**: Single button randomizes all axes (genre, era, ending, perspective, characters) and generates immediately. / 1ボタンで全項目をランダム設定して即生成。
- **Random Theme Seeding / ランダムテーマシード**: Combines base event + modifier + adjunct for unpredictable story seeds. / 基本イベント＋修飾語＋状況語を確率的に組み合わせ、予期せぬ物語の種を生成。
- **AI 4koma Scenario Link / AI 4koma シナリオ連携 (STEP2)**: Generates scenarios in Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System のSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。

---

## 🏗️ Unique Architecture Highlights / 固有アーキテクチャ・技術的要点
This system acts as a sophisticated prompt engineering compiler. It leverages multi-layered constraints to force the LLM into producing highly creative outcomes.
本システムは高度なプロンプトエンジニアリング・コンパイラとして機能します。LLMに対して多層的な制約を課すことで、強制的に独創性の高い結果を引き出します。

* **Multi-Axis Randomization / 多軸ランダム化**: 
  `Output = f(Character × Theme × Genre × Era × Ending × Perspective)`
  Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable. / キャラ×テーマ×ジャンル×時代×オチ×語り口を独立計算し、組み合わせの爆発によりハルシネーションではなく「意味のある多様性」を生み出す設計。
* **Anti-Repetition Engine / 反復防止プロンプトエンジン**: Explicitly instructs Gemini to avoid the most predictable development for the genre, connect the theme in an indirect/unexpected way, and use each character's personality to generate unique reactions. / ありきたりな展開を構造的に回避するよう、「ジャンルの王道展開の回避」「テーマの間接的接続」などをAIに明示的に指示。
* **Foreshadowing Tier System / 伏線ルールのモード別ティア制**: Dynamically switches prompt constraints based on the narrative mode. / 出力モードによってプロンプトの制約レベルを動的に切り替える仕組み。
  * **Tier 1 (Full)**: Narrative modes (novel, scenario, manga, etc.) retain all 7 foreshadowing & composition rules. / 物語系モードはフル伏線・構成ルール（7項目）をそのまま適用。
  * **Tier 2 (Light)**: `4koma` mode uses lightweight "setup & punchline" guidance, prioritizing comedic timing. / 4コマモードは「フリとオチ」の軽量ルールに差し替え、テンポを優先。
  * **Tier 3 (None)**: Non-narrative modes (essay, poem, letter, diary) exclude foreshadowing entirely, replaced with mode-specific composition rules. / 非物語系モードは伏線ルールを完全除外。
* **Full-Category Style Guide Engine / 全カテゴリ対応・文体ガイドエンジン**: Centralized style guide data (~250 entries). Instead of passing preset selections (e.g., "Surreal Gag") as mere labels, the system injects specific, actionable writing instructions into the prompt. / 単なるラベル名渡しではなく、250以上の詳細な執筆ルール（文体・構成指示等）をプロンプトに注入するエンジン。
* **7-Rule Narrative Structure / 7つの伏線・構成厳守ルール**: Strict guidelines including "Show Don't Tell" (no info-dumping characters), narrative function requirements for all characters, and explicit protagonist conviction at the ending to prevent shallow AI narratives. / 「説明役の禁止(Show Don't Tell)」「結末での主人公の意志表示」など、AI特有の薄っぺらい物語を防ぐための強力な制約。
* **Era Consistency Rules / 時代設定の整合性ルール**: AI auto-corrects anachronistic expressions when historical era settings are selected. / 非現代の時代設定時にAIが時代にそぐわない語彙を自動で読み替えるルール。

---

## 💻 Tech Stack / 技術スタック
- **Frontend**: Vite + Vanilla HTML/CSS/JS (Lightweight frontend / 軽量フロントエンド構成)
- **LLM/VFM**: Google Gemini API (`gemini-3-flash-preview`, `gemini-1.5-pro`, `gemini-1.5-flash`, plus `gemini-2.5-pro` for vision/OCR tasks)
- **Deployment**: GitHub Pages (static hosting / 静的ホスティングによるデプロイ)

---

## 🌍 Cloud / Browser (Deploy)
1. **Access**: Open the deployed web app / [Story Maker (GitHub Pages)](https://furuyan1234.github.io/story-maker/) にアクセス
2. **Get API Key**: Obtain a Gemini API key at [Google AI Studio](https://aistudio.google.com/app/apikey) / [Google AI Studio](https://aistudio.google.com/app/apikey) でGemini APIキーを取得
3. **Run**: Enter your Gemini API key at the top and click generate buttons / 上部のAPIキー欄に入力して「保存」後、「🎲 全てランダムで生成」または「ストーリー生成」ボタンを押す

> Billing is pay-per-use (or free tier). Story generation typically uses ~1,000–1,500 tokens per request.
> 料金は従量課金制（または無料枠）です。通常、1回の物語生成で約1,000〜1,500トークンを消費します。
>
> **Note:** The API key is held in memory only and never sent anywhere except the official Google Gemini API endpoint.  
> **注:** APIキーはメモリ内のみで保持され、Google Gemini公式エンドポイント以外には送信されません。

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
All generations are performed through the official Google Gemini API. This system adheres strictly to Google's "Generative AI Forbidden Use Policy" and Terms of Service.
本システムはGoogle公式のGemini APIを介して動作しており、Googleが定める「生成AI禁止事項」および利用規約を厳格に遵守しています。

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

#### 1. Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System
A system specialized in creating 4-panel manga with AI.
AIを活用した4コマ漫画制作に特化したシステムです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndf063558c1f5)
- [Demo / デモ](https://furuyan1234.github.io/nano-banana-pro/)
- [Code / コード](https://github.com/FURUYAN1234/nano-banana-pro)

#### 2. AI Story Maker
A tool for generating creative stories and plots using AI.
AIを用いてクリエイティブなストーリーやプロットを生成するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nd3d972922868)
- [Demo / デモ](https://furuyan1234.github.io/story-maker/)
- [Code / コード](https://github.com/FURUYAN1234/story-maker)

#### 3. AI Character Sheet Maker
An assistant for designing detailed character sheets and settings.
詳細なキャラクターシートや設定をデザインするための支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/neccbebd7d957)
- [Demo / デモ](https://furuyan1234.github.io/character-sheet-maker/)
- [Code / コード](https://github.com/FURUYAN1234/character-sheet-maker)

#### 4. AI Comic Translation Tool
A tool for translating manga into 10 languages using AI. 
AIを使って漫画を10言語に翻訳するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nbdf826604ce7)
- [Demo / デモ](https://furuyan1234.github.io/comic-translation/)
- [Code / コード](https://github.com/FURUYAN1234/comic-translation)

---

## 📝 Changelog / 更新履歴

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
- **AI 4koma Scenario Link (STEP2)**: New output mode that generates scenarios in Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / AI 4koma シナリオ連携（STEP2）モードを追加。Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma SystemのSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。
- **Multi-Image Drop Support**: Drop zone now accepts multiple images simultaneously, processing each sequentially and merging all detected characters into a single review modal with gallery preview. / ドロップゾーンが複数画像の同時ドロップに対応。順次処理し、全キャラクターを統合してギャラリー付きモーダルで表示。
- **UI Improvements**: Moved "ストーリー生成" button to top of settings panel (below "全項目ランダム"). Added clear guidance for character input methods (drop/manual/auto). Fixed API input bar stretching issue. / 生成ボタンをパネル最上部に移動。キャラクター入力の3パターン案内を追加。API入力欄の横伸び問題を修正。
- **OCR Progress Bar**: Added global alert bar during character sheet recognition to match story generation UX. / キャラクターシート認識中にグローバルアラートバーを表示し、ストーリー生成時と同等のUXを実現。
- **Model Priority Update**: Image recognition models follow Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System v2.26 priority (gemini-2.5-pro first for filter tolerance). Text generation models updated with gemini-3-flash-preview as top priority. / 画像認識モデルをNano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System v2.26準拠の優先順位に更新。テキスト生成モデルもgemini-3-flash-previewを最優先に変更。

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
