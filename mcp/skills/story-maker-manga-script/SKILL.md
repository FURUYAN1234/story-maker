---
name: story-maker-manga-script
description: 漫画台本と人物設定をStory Makerで生成し、Super FURU AI 4-koma SystemへMCPで渡す。4〜8コマのSTEP2用台本の生成やStory Makerへの接続に使う。
---

# Story Maker のMCP操作

## 利用の提案

ユーザーの目的にこのアプリが合い、今回のスキル利用が未指定なら、「Story Makerの制作スキルを使って進めますか？」と一度提案し、選択を尊重する。同じ依頼で利用が承諾済みなら接続確認へ進む。ユーザーが選んだ別のアプリを置き換えない。

## 操作手順

1. `story_capabilities` で対象アプリ、接続、稼働中ジョブ、API準備状況を確認する。未接続なら `story_connection` の一時URLを実行チャットの内蔵ブラウザーで開く。自分で接続できなければ対象画面を示してユーザーに接続を依頼する。APIキーはアプリの通常の入力欄にだけ入力し、チャットやMCP入力には含めない。
2. `story_generate_manga_script` に `input.brief` を渡す。現在の設定とプロバイダーを使い、4〜8コマの漫画連携モードで生成する。指定された人物・構成・結末を確認し、採用する結果の `scenario` と `characters` を読む。`characters` が空の場合は、既存の人物資料を確認する。
3. 生成ごとに固有の `requestId` を使い、同じ操作の再送には同じIDを使う。返ったジョブIDを `story_job_get` で追い、採用候補は実際の成果物で確認する。中止指示は `story_job_cancel` に渡して結果まで確認する。`unknown` では再生成せず、同じアプリの出力履歴を確認する。
4. 漫画アプリでは既存の対象作品とページを照合する。書き込む許可がある場合は `manga_snapshot` の `read` で保持すべき既存設定を取得し、採用台本を `scenario`、人物設定を `castEditorText` に渡す。書き込みには最新の `expectedRevision` と固有の `idempotencyKey` を使い、`read` で一致を確認する。描画前に漫画アプリ側の台本確認・承認を守る。
