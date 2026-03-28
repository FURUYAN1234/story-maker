# Story Maker — AI物語メーカー

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**

A web application that generates high-variety stories (4-panel manga plots or fiction) using the Gemini API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.

Gemini APIを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・小説）を生成するWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。

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

### Japanese Copyright Law (Article 30-4)

This project is developed in full compliance with **Article 30-4 of the Japanese Copyright Act**, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
本プロジェクトは、日本の著作権法第30条の4（情報解析目的の外での利用）に基づき、技術検証および情報解析を目的として開発されており、法的に適正な範囲内で公開されています。

### Official API Usage

All generations are performed through the **official Google Gemini API**. This system adheres strictly to Google's "Generative AI Forbidden Use Policy" and Terms of Service.
本システムはGoogle公式のGemini APIを介して動作しており、Googleが定める「生成AI禁止事項」および利用規約を厳格に遵守しています。

### Autonomous & Deterministic Generation

Unlike simple image synthesis, this system uses an **autonomous "Unmanned" pipeline** and the **ABSOLUTE PHYSICAL GEOMETRY LOCK** protocol.

* It does not aim to replicate specific existing artworks.
* It generates original compositions based on real-time trend analysis and mathematical geometric constraints.
本システムは、特定の作品の模倣を目的としたものではありません。リアルタイムのトレンド分析と、独自の「物理幾何学ロック」プロトコルに基づき、AIが自律的に構図を決定・生成するものであり、依拠性のない独自創作を志向しています。

### No-Profit & Research Focus

The core logic (Prompts/Protocols) is released under **CC BY-NC-SA 4.0**. Any commercial misuse by third parties is strictly prohibited. This project exists solely for the advancement of AI agent technology and the democratization of creative tools.
核心的なロジックはCC BY-NC-SA 4.0（非営利）の下で公開されています。第三者による悪質な商用利用はライセンス違反となります。本プロジェクトは、AIエージェント技術の発展と、創作ツールの民主化を目的とした研究成果です。

---

## ⚖️ License & Rights / ライセンス・権利関係

This project uses a hybrid license to balance technology sharing and intellectual property protection.
技術の共有と創作の保護を両立するため、以下のハイブリッドライセンスを採用しています。

* **Source Code**: [MIT License](https://opensource.org/licenses/MIT)
  Applies to software logic and implementation code. / ソフトウェアの動作ロジックや実装コードに適用。
* **Logic & Prompts**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
  Applies to original design philosophy and prompt structure. / 設計思想およびプロンプト構造に適用。
* **Output Ownership / 生成物の帰属**:
  The CC SA (ShareAlike) requirement **does not apply** to works generated by this system. Rights belong to the user.
  本システムで生成された作品に上記CCライセンスの継承義務は適用されません。権利はユーザーに帰属します。
  *Maintaining the signature "Generated by Super FURU AI 4-Koma System" is strongly recommended.*
  署名の維持を強く推奨します。

**Commercial Use and Paid Seminars / 商用利用・有料セミナーについて**
Usage of this system (including prompts and logic) in high-priced information products, paid seminars, or any "get-rich-quick" schemes is strictly prohibited under the CC BY-NC-SA 4.0 license. 本システム（プロンプトおよびロジックを含む）を、高額な情報商材、有料セミナー、または「副業・稼げる」等の謳い文句を伴うビジネスに無断で使用することは、CC BY-NC-SA 4.0ライセンスに基づき、固く禁じます。

Any commercial or educational use involving fees requires explicit prior written consent from the developer (FURU). 有料の教育目的や商用利用を検討される場合は、必ず事前に開発者（FURU）の書面による承諾を得てください。

---

Developed by **FURU**
