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
- **AI 4koma Scenario Link / AI 4koma シナリオ連携 (STEP2)**: Generates scenarios in Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System のSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。

---

## 🏗️ Unique Architecture Highlights / 固有アーキテクチャ・技術的要点
This system acts as a sophisticated prompt engineering compiler. It leverages multi-layered constraints to force the LLM into producing highly creative outcomes.
本システムは高度なプロンプトエンジニアリング・コンパイラとして機能します。LLMに対して多層的な制約を課すことで、強制的に独創性の高い結果を引き出します。

* **Multi-Axis Randomization / 多軸ランダム化**: 
  `Output = f(Character × Theme × Genre × Era × Ending × Perspective)`
  Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable. / キャラ×テーマ×ジャンル×時代×オチ×語り口を独立計算し、組み合わせの爆発によりハルシネーションではなく「意味のある多様性」を生み出す設計。
* **Anti-Repetition Engine / 反復防止プロンプトエンジン**: Explicitly instructs Gemini to avoid the most predictable development for the genre, connect the theme in an indirect/unexpected way, and use each character's personality to generate unique reactions. / ありきたりな展開を構造的に回避するよう、「ジャンルの王道展開の回避」「テーマの間接的接続」などをAIに明示的に指示。
* **Foreshadowing Tier System / 伏線ルールのモード別ティア制**: Dynamically switches prompt constraints based on the narrative mode. / 出力モードによってプロンプトの制約レベルを動的に切り替える仕組み。
  * **Tier 1 (Full)**: Narrative modes (novel, scenario, manga, etc.) retain all 10 rules including Emotion Gap Design, Motif Recurrence, and Emotion Curve Design. / 物語系モードは、感情落差設計（6種のズレ技法）・モチーフ回帰・感情曲線設計を含む10の構成・感情設計ルールを適用。
  * **Tier 2 (Comedy)**: `4koma` mode uses the optimized Comedy Structure Method, integrating the generalized 6-gap techniques and tone variations to ensure high-impact punchlines. / 4コマモードは、一般化された6種のズレ技法とトーン調整を統合したコメディ構造メソッドを適用し、パンチラインのインパクトを最大化。
  * **Tier 3 (None)**: Non-narrative modes (essay, poem, letter, diary) exclude foreshadowing entirely, replaced with mode-specific composition rules. / 非物語系モードは伏線ルールを完全除外。
* **Full-Category Style Guide Engine / 全カテゴリ対応・文体ガイドエンジン**: Centralized style guide data (~250 entries). Instead of passing preset selections (e.g., "Surreal Gag") as mere labels, the system injects specific, actionable writing instructions into the prompt. / 単なるラベル名渡しではなく、250以上の詳細な執筆ルール（文体・構成指示等）をプロンプトに注入するエンジン。
* **10-Rule Narrative Structure / 10の伏線・構成・感情設計ルール**: Strict guidelines including "Show Don't Tell", protagonist conviction at endings, Emotion Gap Design (6 gap techniques), Motif Recurrence (symbolic element callbacks), and Emotion Curve Design (Setup→Deviation→Build-up→Payoff). / 「Show Don't Tell」「結末での主人公の意志表示」に加え、感情落差設計（6種の落差技法）・モチーフ回帰・感情曲線設計を追加。
* **Quality Gate / 品質ゲート**: AI self-verification checklist executed before output (6 checks including Setup-Payoff structure, emotion gap sufficiency, motif recurrence, ending pattern diversity, tone variation, and character narrative function). / AIが出力前に自己検証する6項目のチェックリスト。
* **Era Consistency Rules / 時代設定の整合性ルール**: AI auto-corrects anachronistic expressions when historical era settings are selected. / 非現代の時代設定時にAIが時代にそぐわない語彙を自動で読み替えるルール。

---

## 🧠 v2.9 Narrative Engineering Methods / v2.9 物語構造メソッド解説

> These methods were originally developed for comedy manga (4-panel gag) generation in [Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System](https://github.com/FURUYAN1234/nano-banana-pro). Through analysis, we discovered that their core principles are **universal narrative techniques** applicable to ALL genres — because laughter, fear, suspense, and emotional impact all share the same structural origin: **the gap between what the reader expects and what actually happens**.
> これらのメソッドは元々 [Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System](https://github.com/FURUYAN1234/nano-banana-pro) でギャグ漫画（4コマ）生成用に開発されました。分析の結果、その核心は**全ジャンルに適用可能な普遍的物語技法**であることが判明しました。笑い・恐怖・感動・驚きは全て同じ構造的原理、すなわち**「読者の期待（E）と実際の展開（R）の落差」**から生まれるためです。

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

### 2. Motif Recurrence / モチーフの回帰

Inspired by the comedy technique "Tendon" (天丼 — repeating the same gag pattern with variations until it explodes), generalized for all genres.
コメディ技法「天丼」（同じギャグパターンを変奏しながら繰り返し爆発させる手法）を全ジャンルに一般化。

**Rule**: A symbolic element (item, phrase, scenery, action) must appear **at least twice** in different contexts. The 1st mention is casual; the 2nd+ carries evolved meaning. The recurring motif must connect directly to the emotional climax.
**ルール**：象徴的要素（アイテム・言葉・風景・行為）を**最低2回**、異なる文脈で登場させる。1回目は何気ない言及、2回目以降は意味が変化・深化。回帰するモチーフは結末の感情的ピークと直接接続させる。

| In Comedy / コメディでは | In Other Genres / 他ジャンルでは |
|:---|:---|
| Same gag pattern → variation → explosion / 同じボケの変奏→爆発 | Chekhov's Gun, thematic echo, escalating pattern / チェーホフの銃、テーマの反復深化 |

### 3. Emotion Curve Design / 感情曲線設計

A 4-phase framework for designing the emotional arc of an entire story:
物語全体の感情曲線を設計する4フェーズ構成：

```
Setup → Deviation → Build-up → Payoff
導入  →   逸脱   →   増幅   →  回収
```

| Phase | Role / 役割 |
|:---|:---|
| **Setup** (導入) | Set reader expectations. Don't surprise yet. Place 1st motif here. / 読者の期待値を設定。まだ驚かせない。モチーフの1回目をここに |
| **Deviation** (逸脱) | First gap from expectations: "This isn't what I thought..." / 期待からの最初のズレ：「想像と違う…」 |
| **Build-up** (増幅) | Accelerate deviation, push emotional tension to the limit. Place motif variation here. / 逸脱を加速、感情的緊張を極限に。モチーフの変奏をここに |
| **Payoff** (回収) | Emotional peak + landing. All foreshadowing and motifs gain meaning here. / 感情のピーク＋着地。全伏線・モチーフがここで意味を持つ |

### 4. Tone Variation System / 文体緩急の3系統

To prevent monotonous writing, 3 concrete tone registers are defined with a **prohibition of same-tone streaks exceeding 3 paragraphs**:
文体の単調化を防ぐため、3種の具体的トーン系統を定義し、**同系統の3段落以上連続を禁止**：

| Register / 系統 | Style / 文体 | Use For / 適用場面 |
|:---|:---|:---|
| **High-energy / 高熱量** | Short sentences, abrupt endings, rapid-fire / 短文連続・体言止め・畳みかけ | Action, confession, decision / 追跡・告白・決断 |
| **Quiet-serene / 静謐** | Long sentences, gentle rhythm, white space / 長文・穏やかなリズム・余白 | Flashback, parting, eerie silence / 回想・別れ・不気味な静寂 |
| **Cold-analytical / 冷徹** | Dry declarative, emotion-stripped objectivity / 乾いた断言調・客観描写 | Deduction, analysis, philosophy / 推理・分析・哲学的独白 |

### 5. Quality Gate / 品質ゲート

An AI self-verification checklist executed **before** output. If any check fails, the AI must revise before delivering. The checklist itself is never shown in the output.
AIが出力**前**に実行する自己検証チェックリスト。不合格項目があればAI自身が修正してから出力する。チェックリスト自体は出力に含まれない。

| Check / チェック項目 | What It Prevents / 防止する問題 |
|:---|:---|
| Setup-Payoff structure / 伏線→回収構造 | Deus ex machina endings / 唐突な新設定で解決する結末 |
| Emotion gap sufficiency / 感情落差の十分性 | "Slightly surprising" instead of "completely unexpected" / 「ちょっと意外」止まりの展開 |
| Motif recurrence / モチーフの回帰 | Disconnected, one-off symbols / 使い捨ての象徴 |
| Ending pattern diversity / 結末パターン多様性 | Same structure every time / 毎回同じ構造の結末 |
| Tone variation / 文体の緩急 | Monotonous writing style / 単調な文体 |
| Character narrative function / キャラの物語的機能 | Bystander characters / 傍観者だけの登場人物 |

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

#### 1. Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System
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
- **AI 4koma Scenario Link (STEP2)**: New output mode that generates scenarios in Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / AI 4koma シナリオ連携（STEP2）モードを追加。Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma SystemのSTEP2入力欄にそのまま貼り付け可能なフォーマットで出力。
- **Multi-Image Drop Support**: Drop zone now accepts multiple images simultaneously, processing each sequentially and merging all detected characters into a single review modal with gallery preview. / ドロップゾーンが複数画像の同時ドロップに対応。順次処理し、全キャラクターを統合してギャラリー付きモーダルで表示。
- **UI Improvements**: Moved "ストーリー生成" button to top of settings panel (below "全項目ランダム"). Added clear guidance for character input methods (drop/manual/auto). Fixed API input bar stretching issue. / 生成ボタンをパネル最上部に移動。キャラクター入力の3パターン案内を追加。API入力欄の横伸び問題を修正。
- **OCR Progress Bar**: Added global alert bar during character sheet recognition to match story generation UX. / キャラクターシート認識中にグローバルアラートバーを表示し、ストーリー生成時と同等のUXを実現。
- **Model Priority Update**: Image recognition models follow Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System v2.26 priority (gemini-2.5-pro first for filter tolerance). Text generation models updated with gemini-3-flash-preview as top priority. / 画像認識モデルをNano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System v2.26準拠の優先順位に更新。テキスト生成モデルもgemini-3-flash-previewを最優先に変更。

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
