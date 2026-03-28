# Story Maker — AI物語メーカー

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**

A web application that generates high-variety stories (4-panel manga plots or short fiction) using the Gemini API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.

Gemini APIを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・短編小説）を生成するWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。

---

## ✨ Features / 機能

- **Multi-axis randomization** — Genre, era, ending style, narrative perspective, and characters can each be randomized independently or all at once
- **Anti-repetition prompt engine** — Explicitly instructs the AI to avoid predictable story structures
- **Two output modes** — 4-panel manga plot (起承転結 + dialogue) or short fiction (800–1200 chars)
- **Random theme seeding** — Combines base event + modifier + adjunct for unpredictable story seeds
- **One-shot full random** — Single button randomizes all axes and generates immediately

---

- **多軸ランダム化** — ジャンル・時代・オチの型・語り口・キャラを各個または一括でランダム設定
- **反復防止プロンプトエンジン** — 予定調和な展開を構造的に回避するよう明示的に指示
- **2つの出力モード** — 4コマ漫画ネタ（起承転結＋セリフ案）またはショート（〜1000字）、短編小説（〜3000字）、中編小説（〜4000字）、長編小説（〜10万字/プロンプト生成）など
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

### v2.4.4 — 2026-03-28
- **Cleanup**: Removed remaining Claude residues in documentation. / ドキュメントに残存していたClaudeの記述残骸を完全に削除。
- **UI Logic**: Fixed long novel prompt logic so that the prompt string is directly displayed in the main output panel. / 長編小説モードにおいてAPI通信を挟まず直接OUTPUTへプロンプトを出力するロジックに修正。
- **UI Tweaks**: Added smart display control to hide the yellow alert banner outside of active generation windows. Removed right-aligned unnecessary prompt pane. / 黄色の警告表示をAPI通信中のみ表示されるよう変更・不要な右側パネルを削除。
- **Bilingual Support**: Translated core sections (API Key guide, System mechanics, Tech stack) into combined Japanese/English blocks. / 一部主要セクション（API取得手順、Anti-Repetitionの仕組み、技術スタック等）を英語・日本語併記へ統一。

### v2.4.3 — 2026-03-28
- **UI & Layout Revamp**: Removed the experimental System Dashboard from `index.html` and `main.js`.
- **Alert Notifications**: Added a global yellow alert banner (黄色の警告表示) to clarify wait times during API communication.
- **Model Reversion**: Fully scrubbed all unintended Claude API references, cementing the application on Gemini models. / コードおよびドキュメント内の意図しないClaude APIへの言及を完全に排除し、Gemini専用として再構築。
- **Files Management**: Renamed `run.bat` to `start_Story_app.bat` for clarity.

### v2.4.2 — 2026-03-28
- Long novel generation prompt fixes for API token limits / 長編小説生成時のAPIトークン上限対策（プロット文字数制限）
- UI hint enhancements for Character NPC generation / キャラクター「1人設定」時の挙動に関するUIヒント追加
- Adjusted standard length preset to 4000 chars / 安全出力文字数の上限値を4000字に修正

### v1.0.0 — 2026-03-27
- Initial release / 初回リリース
- 4-panel manga plot mode / 4コマネタモード
- Short fiction mode / 短編小説モード
- Full random generation / 全ランダム生成
- Multi-axis randomization for all settings / 全項目個別ランダム対応
- Character cards with per-field randomization / キャラカード（性格・役割個別ランダム）
- API key input with validation / APIキー入力欄（バリデーション付き）

---

## ⚖️ License / ライセンス

MIT License — Free to use, modify, and distribute.  
MITライセンス — 自由に使用・改変・配布可能。

---

Developed by **FURU**
