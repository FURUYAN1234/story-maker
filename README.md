# Story Maker — AI物語メーカー

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **「予定調和な物語を生成するのをやめ、自分が驚くような物語を生成せよ。」**

A single-file web application that generates high-variety stories (4-panel manga plots or short fiction) using the Claude API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.

Claude APIを使い、バラエティ豊かなストーリー（4コマ漫画ネタ・短編小説）を生成するシングルファイルWebアプリです。「似たり寄ったりになる問題」をキャラクター・テーマ・ジャンル・時代・オチの型の多軸ランダム化によって構造的に解決することを目的としています。

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
- **2つの出力モード** — 4コマ漫画ネタ（起承転結＋セリフ案）または短編小説（800〜1200字）
- **ランダムテーマシード** — 基本イベント＋修飾語＋状況語を確率的に組み合わせ
- **全ランダム一発生成** — 1ボタンで全項目をランダム設定して即生成

---

## 🚀 Quick Start / クイックスタート

### Browser / ブラウザで使う

1. Download `index.html`  
   `index.html` をダウンロード
2. Open in any browser  
   ブラウザで開く
3. Enter your Claude API key at the top  
   上部のAPIキー欄に入力して「保存」
4. Click **ストーリー生成** or **🎲 全てランダムで生成**  
   生成ボタンを押す

### Deploy to GitHub Pages / GitHub Pagesでデプロイ

```bash
git clone https://github.com/YOUR_USERNAME/story-maker
cd story-maker
# Push to main branch, then enable GitHub Pages in repo Settings
```

> **Note:** The API key is held in memory only and never sent anywhere except the official Anthropic API endpoint.  
> **注:** APIキーはメモリ内のみで保持され、Anthropic公式エンドポイント以外には送信されません。

---

## 🔑 Getting a Claude API Key / Claude APIキーの取得

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-`)

> Billing is pay-per-use. Story generation typically uses ~1,000–1,500 tokens per request (~$0.003–0.005 USD per story with claude-sonnet).

---

## 🎛️ How the Anti-Repetition System Works / 反復防止システムの仕組み

The core insight: AI outputs converge toward "average" stories when inputs have low entropy. This app injects entropy through multiple independent axes:

```
Output = f(Character × Theme × Genre × Era × Ending × Perspective)
```

Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable.

The prompt also explicitly instructs Claude to:
- Avoid the most predictable development for the genre
- Connect the theme in an indirect, unexpected way
- Use each character's personality to generate unique reactions

---

## 💻 Tech Stack / 技術スタック

- **Vanilla HTML/CSS/JS** — Zero dependencies, single file
- **Claude API** — `claude-sonnet-4-20250514`
- **Deployment** — GitHub Pages (static hosting)

---

## 📝 Changelog / 変更履歴

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
