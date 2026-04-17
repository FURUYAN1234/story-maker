Fixed an issue where clicking the background overlay of the character recognition result modal would accidentally close it, causing data loss. The modal now strictly closes only via the designated close or cancel buttons, improving input safety.

---

キャラクター認識結果モーダルの背景領域（オーバーレイ）をクリックした際に、意図せずモーダルが閉じてしまう問題を修正しました。
これにより、フォーム入力中に誤って画面外をクリックしてしまい、せっかくの認識結果（データ）が消失してしまう事故を防げます。現在は「✕ボタン」または「キャンセルボタン」でのみ閉じる仕様となっています。
