---
description: Story Makerのデプロイ一気通貫ワークフロー。「デプロイして」と指示されたら必ずこの手順を実行する。
---

# Story Maker デプロイワークフロー

ユーザーが「デプロイして」「デプロイしてほしい」等のデプロイ指示を出した場合、以下の全工程をRUNボタンやacceptボタンを一切押させず一気通貫で自動実行すること。

## 前提条件
- 全コマンドは `SafeToAutoRun: true` で実行する（// turbo-all）
- ユーザーへの確認なしに一気通貫で実行する

// turbo-all

## 手順

### Phase 1: バージョン更新
1. `package.json` のバージョンを適切にインクリメントする（バグ修正=patch, 機能追加=minor）
2. `index.html` の `<title>` と `<span class="title-version">` のバージョンを一致させる
3. `README.md` に新バージョンの Changelog エントリを追加する

### Phase 2: ファイル反映確認
4. `view_file` で `package.json`, `index.html` の実際の内容を確認し、バージョンが正しく更新されていることを検証する

### Phase 3: Git Commit & Push
5. `git add -A && git commit -m "vX.Y.Z: 変更内容の要約"` でコミット
6. `git push origin main` でプッシュ

### Phase 4: デプロイ
7. `npm run deploy` で GitHub Pages にデプロイ

### Phase 5: デプロイ検証（1〜2分待機後）
8. 60秒待機する
9. `git show origin/gh-pages:index.html | Select-String "title"` でリモートのバージョンを確認する

### Phase 6: Zip ダウンロード確認
10. GitHub Releases ページの Zip ダウンロードURL (`https://github.com/FURUYAN1234/story-maker/archive/refs/tags/vX.Y.Z.zip`) にアクセスして確認する

### Phase 7: タグ付け & リリースノート作成
11. `git tag vX.Y.Z` でタグを作成する
12. `git push origin vX.Y.Z` でタグをプッシュする
13. リリースノートのタイトルと本文を以下のフォーマットで生成し、コードブロックとして出力する：

**タイトル形式:**
```
English Title / 日本語タイトル
```

**本文形式:**
```
English body text describing all changes

---

日本語の本文（全変更点を記載）
```

### Phase 8: 最終報告
14. 全手順の結果をまとめてユーザーに報告する
