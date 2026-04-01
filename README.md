# Story Maker — AI物語メーカー

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**

A web application that generates high-variety stories (4-panel manga plots or fiction) using the Gemini API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.

Gemini APIを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・小説）を生成するWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。

> [!TIP]
> **Detailed Commentary Available / 詳細な解説記事を公開中**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 本プロジェクトの設計思想や、Google Gemini APIのモデル毎の挙動の違いについては、以下のnote記事で詳しく解説しています。
> [Story Maker — AI物語メーカー　AI特有の似たり寄ったりのストーリーにならないシステム / A system designed to break away from repetitive, generic AI-generated plots. (note / Japanese content)](https://note.com/happy_duck780/n/nd3d972922868)

---

## ✨ Features / 機能

- **Multi-axis randomization** — Genre, era, ending style, narrative perspective, and characters can each be randomized independently or all at once
- **Anti-repetition prompt engine** — Explicitly instructs the AI to avoid predictable story structures
- **Multiple Output Modes** — Supports 4-panel manga plots (Ki-sho-ten-ketsu + dialogue), flash fiction (~1,000 chars), short stories (~3,000 chars), novellas (~4,000 chars), and full-length novels (~100,000 chars via prompt generation).
- **Random theme seeding** — Combines base event + modifier + adjunct for unpredictable story seeds
- **One-shot full random** — Single button randomizes all axes and generates immediately

---

- **多軸ランダム化** — ジャンル・時代・オチの型・語り口・キャラを各個または一括でランダム設定
- **反復防止プロンプトエンジン** — 予定調和な展開を構造的に回避するよう明示的に指示
- **複数の出力モード** — 4コマ漫画ネタ（起承転結＋セリフ案）またはショート（〜1000字）、短編小説（〜3000字）、中編小説（〜4000字）、長編小説（〜10万字/プロンプト生成）など
- **ランダムテーマシード** — 基本イベント＋修飾語＋状況語を確率的に組み合わせ
- **全ランダム一発生成** — 1ボタンで全項目をランダム設定して即生成

---

## 🚀 Quick Start / クイックスタート

### Web Browser / ブラウザで使う（推奨）

1. [Story Maker (GitHub Pages)](https://furuyan1234.github.io/story-maker/) にアクセス / Open the web app
2. 上部のAPIキー欄にGeminiのAPIキーを入力して「保存」 / Enter your Gemini API key at the top
3. 「🎲 全てランダムで生成」または「ストーリー生成」ボタンを押す / Click generate buttons

### Run Locally (Windows) / ローカル実行版（ZIPダウンロード時）

1. [Releases](https://github.com/FURUYAN1234/story-maker/releases) からZIPファイルをダウンロードし、展開する / Unzip the downloaded folder
2. フォルダ内の `start_Story_app.bat` をダブルクリックする / Double-click `start_Story_app.bat`
3. 依存ライブラリが自動インストールされ、ブラウザが起動します。 / Node.js dependencies are automatically installed and the app launches.
*(※実行には[Node.js](https://nodejs.org/)のインストールが必要です / Requires Node.js installed)*

### Deploy to GitHub Pages / GitHub Pagesでデプロイ

```bash
git clone https://github.com/YOUR_USERNAME/story-maker
cd story-maker
# Push to main branch, then enable GitHub Pages in repo Settings
```

> **Note:** The API key is held in memory only and never sent anywhere except the official Google Gemini API endpoint.  
> **注:** APIキーはメモリ内のみで保持され、Google Gemini公式エンドポイント以外には送信されません。

---

## 🔑 Getting a Gemini API Key / Gemini APIキーの取得

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) / [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセスする
2. Sign in with your Google Account / Googleアカウントでログインする
3. Click "Create API Key" / 「Create API Key」ボタンをクリックする
4. Copy the generated key / 生成されたAPIキーをコピーする

> Billing is pay-per-use (or free tier). Story generation typically uses ~1,000–1,500 tokens per request.
> 料金は従量課金制（または無料枠）です。通常、1回の物語生成で約1,000〜1,500トークンを消費します。

---

## 🎛️ How the Anti-Repetition System Works / 反復防止システムの仕組み

The core insight: AI outputs converge toward "average" stories when inputs have low entropy. This app injects entropy through multiple independent axes:
基本となる考え方：AIの出力は、入力のエントロピー（不確実性）が低いと「平均的」な物語に収束しがちです。このアプリでは、複数の独立した軸を通じてエントロピーを注入します。

```
Output = f(Character × Theme × Genre × Era × Ending × Perspective)
```

Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable.
各軸は独立してランダム化が可能です。組み合わせの空間が非常に広範であるため、全く同じ出力が生成されることは統計的にほぼ起こり得ません。

The prompt also explicitly instructs Gemini to:
さらに、システムプロンプトからGeminiに対して以下の明確な指示を出しています：
- Avoid the most predictable development for the genre (ジャンルにおける最もありきたりな展開を避ける)
- Connect the theme in an indirect, unexpected way (テーマを間接的かつ予期せぬ形で結びつける)
- Use each character's personality to generate unique reactions (登場人物それぞれの性格を活かし、ユニークな反応を生み出す)

---

## 💻 Tech Stack / 技術スタック

- **Vite + Vanilla HTML/CSS/JS** — Lightweight frontend / 軽量フロントエンド構成
- **Gemini API** — `gemini-1.5-pro` / `gemini-1.5-flash` / Geminiモデルを主軸に構築
- **Deployment** — GitHub Pages (static hosting) / GitHub Pages（静的ホスティングによるデプロイ）

---

## 📝 Changelog / 変更履歴

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

### v2.4.9 — 2026-03-31
- **Narrative Structure Rules**: Added 7-rule "Foreshadowing & Composition Rules" to the prompt engine, dramatically improving story quality. / プロンプトエンジンに7項目の「伏線・構成ルール（厳守）」を追加し、生成される物語の品質を劇的に向上。
  - **Foreshadowing**: Elements important in the second half must be hinted at in the first half. / 後半で重要な要素は前半で必ず暗示。
  - **Character Function**: All characters must have a narrative role; passive bystanders are prohibited. / 全キャラに物語的機能を義務付け、傍観者キャラ禁止。
  - **Ending Conviction**: Protagonists must show clear will/action; acceptance requires prior resistance. / 結末で主人公の明確な意志表示を要求、受容前の抵抗描写を必須化。
  - **Setting Necessity**: Special elements must connect to protagonist's personal background. / 特殊設定は主人公の個人的背景と接続必須。
  - **Show Don't Tell**: Prohibits info-dump via dialogue, monologue, or single "explainer" characters. / 台詞・独白・説明役キャラによる設定の一括説明を禁止。
  - **Farewell Weight**: Meaningful partings must carry emotional weight. / 別離シーンに感情的重みの描写を要求。
  - **Tonal Variation**: Writing style must shift with protagonist's emotional state; shock scenes require immersive body/mind description. / 心理状態に応じた文体変化と衝撃シーンの追体験描写を要求。

### v2.4.8 — 2026-03-30
- **Maintenance Release**: Version bump and redeployment for stable release packaging. / 安定版リリースパッケージング用のバージョン更新と再デプロイ。

### v2.4.7 — 2026-03-30
- **Mode-Specific Style Guide**: Added unique tone/writing-style instructions for all 14 output modes (4-panel, essay, poem, etc.) to eliminate the "everything sounds the same" problem. / 全14出力モードに個別の文体・トーン指示を追加し、どのモードでも似たような厨二病的文章になる問題を解消。
- **Era Consistency Rules**: AI now auto-corrects anachronistic expressions when historical era settings are selected (e.g., no "smartphone" in Taisho era). / 非現代の時代設定時にAIが時代にそぐわない語彙を自動で読み替えるルールを追加。
- **Preset Data Expansion**: Doubled character name pools (M/F: 10→20), detail memos (7→15), roles (10→18), personalities (10→18), and all ORIGINALS lists (5-8→12-14) to reduce repetitive randomization. / キャラ名・詳細メモ・役割・性格・各ランダム生成プールを大幅拡充し、ランダム生成時のワンパターン化を解消。
- **Bugfix: Random Mode Field**: Fixed the output mode custom field being empty when using "All Random & Generate". / 全ランダム生成時に出力モード欄が空欄になるバグを修正。
- **Random Character Count**: Increased max random character count from 3 to 4. / ランダム生成時の最大人数を3人→4人に変更。
- **Output Footer**: Added "Generated by Super FURU AI Story vX.Y.Z" credit line after story endings. / 生成結果の末尾にクレジットフッターを自動表示。

### v2.4.6 — 2026-03-29
- **UI Bugfix**: Added missing `autocomplete="off"` to custom input fields (Theme, Era, Ending Type) to prevent browser default auto-complete history from covering the UI as speech bubble-like popups. / 一部のカスタム入力欄（テーマ・時代設定・オチの型）でブラウザの自動補完履歴がフキダシのように被って表示されるバグを修正。

### v2.4.5 — 2026-03-28
- **Icon Redesign**: Replaced white-washed emoji book icon (📖) with a custom SVG book icon in vivid purple with glow effect. / 白飛びしていた絵文字アイコンを、紫色のSVGアイコン（グロウエフェクト付き）に差し替え。
- **Critical Layout Fix**: Fixed output box background not covering full text content by adding `flex-shrink: 0`. Added bottom margin to prevent text sticking to screen edge. / 出力テキストが枠からはみ出す致命的バグを `flex-shrink: 0` で修正。下余白も追加。
- **Long-Form Mode Enhancement**: Removed placeholder text from master prompt template. Added direct instruction for receiving LLM to write full chapter text. Added "【完】/【続く】" end markers for all output modes. / 長編マスタープロンプトの雛形テンプレートを直接的な執筆命令に書き換え。全モードに終了マーカーを追加。
- **Deploy Fix**: Corrected GitHub Pages source from `main` branch to `gh-pages` branch, resolving the issue where presets were not displayed on the deployed site. / GitHub Pagesの配信元を `main` から `gh-pages` に修正し、デプロイ先でプリセットが表示されない問題を解消。

### v2.4.4 — 2026-03-28
- **Cleanup**: Removed remaining Claude residues in documentation. / ドキュメントに残存していたClaudeの記述残骸を完全に削除。
- **UI Logic**: Fixed long novel prompt logic so that the prompt string is directly displayed in the main output panel. / 長編小説モードにおいてAPI通信を挟まず直接OUTPUTへプロンプトを出力するロジックに修正。
- **UI Tweaks**: Added smart display control to hide the yellow alert banner outside of active generation windows. Removed right-aligned unnecessary prompt pane. / 黄色の警告表示をAPI通信中のみ表示されるよう変更・不要な右側パネルを削除。

### v2.4.3 — 2026-03-28
- **UI & Layout Revamp**: Removed the experimental System Dashboard from `index.html` and `main.js`.
- **Alert Notifications**: Added a global yellow alert banner (黄色の警告表示) to clarify wait times during API communication.
- **Model Reversion**: Fully scrubbed all unintended Claude API references, cementing the application on Gemini models. / Claude APIへの言及を完全に排除し、Gemini専用として再構築。

### v2.4.2 — 2026-03-28
- Long novel generation prompt fixes / 長編小説生成時のプロンプト修正
- UI hint enhancements / UIヒント追加

### v1.0.0 — 2026-03-27
- Initial release / 初回リリース

---

## ⚖️ Compliance & Legal Stance / 法的遵守について

**Japanese Copyright Law (Article 30-4)**
This project is developed in full compliance with Article 30-4 of the Japanese Copyright Act, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
本プロジェクトは、日本の著作権法第30条の4（情報解析目的等での利用）に基づき、技術検証および情報解析を目的として開発されており、法的に適正な範囲内で公開されています。

**Official API Usage**
All generations are performed through the official Google Gemini API. This system adheres strictly to Google's "Generative AI Forbidden Use Policy" and Terms of Service.
本システムはGoogle公式のGemini APIを介して動作しており、Googleが定める「生成AI禁止事項」および利用規約を厳格に遵守しています。

**Autonomous & Deterministic Text Generation**
Unlike simple prompt wrappers, this system uses a deterministic middleware pipeline (Multi-Axis Randomization and Anti-Repetition Prompt Engine). It does not aim to plagiarize specific existing novels or stories. It generates original narrative structures based on high-dimensional semantic control.
単なるプロンプトのラッパーツールとは異なり、本システムは「多軸ランダム化」および「反復防止プロンプトエンジン」という決定論的なミドルウェアパイプラインを使用しています。既存の特定の小説や物語の盗用を目的としたものではなく、高次元の意味的制御に基づきオリジナルの物語構造を自律的に生成します。

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

## 利用規約 / Terms of Use

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

Developed by **FURU**
