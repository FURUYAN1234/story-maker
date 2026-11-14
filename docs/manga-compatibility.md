# Manga compatibility / 漫画アプリ互換性

`4koma_scenario` keeps its saved mode ID, but generates **4–8 panels** for the manga app's default free-layout mode. The separate `4koma` story mode remains four panels. / 保存済みモードID `4koma_scenario` を維持し、漫画アプリの既定の自由配置に合わせて**4〜8コマ**を生成します。別の `4koma` モードは4コマのままです。

- Choose the count from the story and record `PanelCountReason`; preserve an accepted count during revision. / 内容から必要なコマ数を選んで `PanelCountReason` に理由を書き、改稿時も採用済みコマ数を保持します。
- Put one `PageComposition` JSON line after `Scenario:` and before panel 1. Preserve it through cleanup. / `Scenario:` と1コマ目の間に `PageComposition` の1行JSONを置き、最終整形でも保持します。
- Use the manga app's unchanged page-composition validator and guidance, copied to `src/vendor/nanoMangaPageComposition.js` from its MIT-licensed `src/lib/manga-page-composition.js`. / 漫画アプリのMITライセンスの同ファイルから、ページ構成の検証と指示を変更せず取り込んでいます。


### Character handoff / 人物設定の受け渡し

When Story Maker has actually imported character-sheet images into its character settings, it outputs the scenario only. Supply the same sheets to the manga app and include references for all characters used. Images are not automatically compared between apps. Without an imported character sheet, Story Maker adds separate STEP1 character text after the final scenario and provides full, scenario-only and character-only copy. Names, appearance and clothing follow the scenario; different ages of one person stay within one entry. / Story Makerでキャラクターシート画像を実際に取り込み人物登録した場合は、台本だけを出力します。漫画アプリにも同じシートを読み込み、登場人物全員の資料を用意してください。両アプリの画像の同一性は自動照合しません。シート未取り込み時は、最終台本の完成後にSTEP1用人物設定を別途追加し、全文・台本のみ・人物設定のみの3種類をコピーできます。名前・外見・服装を台本に合わせ、同一人物の年齢違いは一つの項目内にまとめます。

1. Copy the character text to the manga app’s STEP1 “人物情報” (`#reference-recognition-editor`). / 人物設定だけをコピーし、漫画アプリのSTEP1「人物情報」（`#reference-recognition-editor`）へ貼ります。
2. Copy the scenario to STEP2 “生成されたシナリオ”, then run STEP3 to build the image prompt. The scenario copy route is **STEP2 → STEP3**. / 台本だけをSTEP2「生成されたシナリオ」へ貼り、STEP3で画像指示文を作ります。台本コピーの経路は **STEP2 → STEP3** です。
3. Use STEP4 for image generation. Full copy retains clearly separated STEP1 and scenario sections; separate copy buttons avoid mixing their contents. / STEP4で画像を生成します。全体コピーではSTEP1用と台本用を区切り、それぞれの個別コピーボタンで混在を避けられます。

With no character-reference images, usable STEP1 character text defines the cast in both API prompts and Web copy. Backgrounds and style examples are not character references. With character images, their identity priority is retained. Empty or insufficient character text does not bypass input validation. / 人物参照画像がなくても、十分なSTEP1の人物設定があればAPI指示文とWebコピーの両方で人物を定義します。背景や描法見本は人物参照画像として扱いません。人物画像がある場合は、その同一性を優先する既存の動作を保ちます。空欄や不十分な設定で入力検査を迂回することはできません。

## Automatic checks / 自動検査

`npm run dev`, `npm test`, and `npm run build` run `npm run check:nano-4koma-contract`. The historical command name is retained. The Antigravity official manga release's validation stage runs the same Story Maker command before publication. / ローカル起動・テスト・ビルド時に既存名の互換性検査を実行します。Antigravityの漫画アプリ正式公開でも、公開前の検証段階で同じ検査を実行します。

The default source is the adjacent `../nano-banana-pro`. `NANO_BANANA_PRO_ROOT` may explicitly select another checkout. Missing source is an error. Story Maker CI checks out the public manga `main` branch alongside Story Maker. / 既定の参照先は同じAntigravity内の `../nano-banana-pro` です。別配置は環境変数で明示できます。ソース欠落はエラーにします。Story MakerのCIでは公開中の漫画アプリのmainを隣へ取得します。

The gate compares the specification, parsing/validation boundaries, story-structure policy, emitted legacy format, shared rendering rules and styles, and the exact vendored composition module. It also executes the actual manga parser on 4, 5, 6, 7 and 8 panels, speech, silence, multiple speakers and nested quotes, and verifies malformed inputs are rejected. / 仕様書、解析・検証境界、物語設計、従来形式、共通描画ルール・画風、取り込んだページ構成コードを照合します。実際の漫画パーサーへ4〜8コマ、台詞・無言・複数話者・入れ子引用を渡し、不正入力の拒否も確認します。

Source drift means **review required**, not proven incompatibility. Line-ending differences are ignored; unrelated files do not invalidate the baseline. / ソース変更は**追従確認が必要**という意味で、非互換と断定するものではありません。改行コードの差や対象外ファイルの変更では停止しません。

## When the manga contract changes / 漫画アプリの仕様変更時

1. Read the reported diff and current `docs/scenario_spec.md`. / 指摘された差分と現行仕様書を読みます。
2. Update Story generation, output validation, cleanup and revision handling where necessary. Synchronize the vendored module unchanged if its source changed. / 生成・検証・整形・改稿の影響箇所を修正し、必要なら取り込み元のページ構成モジュールをそのまま同期します。
3. Add meaningful valid/invalid compatibility cases and verify normal API generation when runtime behavior changes. / 正常例・異常例の互換性検査を追加し、実行時の挙動を変えた場合は通常経路のAPI生成も検証します。
4. Only after review, update `scripts/nano-contract-baseline.json` and any reviewed prompt hash. Do not refresh hashes merely to silence a failure. / 差分確認後にのみ基準ハッシュを更新します。検査を通すだけの無条件更新は禁止です。

These are checks at explicit development/release events. No resident watcher, periodic job, automatic code rewrite, deployment or paid generation is installed. / 開発・公開操作時の検査です。常駐監視、定期実行、ソースの自動書換え、デプロイ、有料生成は追加していません。
