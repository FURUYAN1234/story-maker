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

### Phase 0: NBPシナリオ仕様確認（クロスプロジェクト同期）
0-1. `C:\nano-banana-pro-main\docs\scenario_spec.md` を `view_file` で読み取り、シナリオパーサーの最新仕様を確認する。
     （scenario_spec.md が存在しない場合は `C:\nano-banana-pro-main\src\App.jsx` をフォールバックとして参照）
     - 確認対象: ヘッダータグ (`Topic:`, `Logline:`, `Location:`, `Outfit:`, `Punchline:`, `Scenario:`)
     - 確認対象: コマ内タグ (`[EMOTION: XXX]`, `[Camera: XXX]`) と利用可能な値の一覧
     - 確認対象: Punchline タイプ一覧
     - 確認対象: セリフフォーマット、その他新規タグの有無
0-2. `src/prompt.js` の `4koma_scenario` モード（`baseMode === '4koma_scenario'` ブロック）と比較する。
0-3. **差異がある場合**: `src/prompt.js` を更新し、Phase 1 のバージョンバンプに含める。変更内容はコミットメッセージとREADMEのChangelogに記載する。
0-4. **差異がない場合**: 「NBP仕様確認: 変更なし」と記録し、Phase 1 に進む。
0-5. **参照ファイルが存在しない場合**: ユーザーに確認を取り、スキップ可否の判断を仰ぐ。推測で仕様を補完しない。

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

### Phase 6: タグ付け & リリース作成
10. `git tag vX.Y.Z` でタグを作成する
11. `git push origin vX.Y.Z` でタグをプッシュする
12. 英語・日本語併記のリリースノートを作成し、`gh release create vX.Y.Z --title "..." -F release_note_temp.md` でGitHub Releaseを作成する。作成後は一時ファイルを削除する。

### Phase 7: Zip ダウンロード検証
13. GitHub Releasesに正しく公開されたか、`gh release view vX.Y.Z` で確認する。
14. ブラウザツールを用いてZIPのURLにアクセスすると処理が固まるため、**絶対にブラウザツールでZIPを開かない**こと。代わりに `curl -I https://github.com/FURUYAN1234/story-maker/archive/refs/tags/vX.Y.Z.zip` を実行し、HTTPステータスを確認してダウンロード可能であることを検証する。

### Phase 8: ローカル環境更新 (`C:\story-maker-main`)
14. 一時フォルダ作成 & GitHub Release から ZIP をダウンロード
    ```powershell
    $tmp = "C:\temp_sm_deploy"
    New-Item -ItemType Directory -Path $tmp -Force
    gh release download vX.Y.Z --archive zip -D $tmp
    ```
15. 解凍 → 古いフォルダ削除 → 深い方のフォルダをコピー
    ```powershell
    Expand-Archive -Path "$tmp\*.zip" -DestinationPath "$tmp\extracted" -Force
    Remove-Item -Recurse -Force "C:\story-maker-main" -ErrorAction SilentlyContinue
    $inner = (Get-ChildItem "$tmp\extracted" -Directory)[0].FullName
    Copy-Item -Path $inner -Destination "C:\story-maker-main" -Recurse
    ```
16. 一時ファイル削除 & コピー成功確認
    ```powershell
    Remove-Item -Recurse -Force $tmp
    Test-Path "C:\story-maker-main\package.json"  # True なら成功
    ```

### Phase 9: 最終報告
17. 全手順の結果をまとめてユーザーに報告する
