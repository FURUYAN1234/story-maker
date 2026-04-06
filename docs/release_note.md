# v2.7.1 — Bugfix: Stale Alert Message / 画像認識アラート残留バグ修正

## What's Changed / 変更内容

### 🐛 Bug Fix / バグ修正

- **Stale Alert Message Fix**: Fixed a bug where the global alert bar displayed "画像認識中" (image recognition in progress) when clicking the story generation button after importing character sheet images. The shared `global-alert` element's innerHTML was not reset before re-display during story generation.
- **画像認識アラート残留バグ修正**: キャラクターシート画像を取り込んだ後にストーリー生成ボタンを押すと、「画像認識中」の古いメッセージが表示されるバグを修正。共有の `global-alert` 要素の innerHTML がストーリー生成時にリセットされていなかった問題を解消。

## How to Use / 使い方

### Web Browser / ブラウザ版（推奨）
👉 [Story Maker (GitHub Pages)](https://furuyan1234.github.io/story-maker/)

### Local / ローカル実行版
1. 下の **Source code (zip)** をダウンロード・展開
2. `start_Story_app.bat` をダブルクリック
   *(※ [Node.js](https://nodejs.org/) が必要です)*

**Full Changelog**: https://github.com/FURUYAN1234/story-maker/compare/v2.7.0...v2.7.1
