# Adaptive story structure / 尺と形式に合わせる物語設計

The three-act reference is a selection aid, not a required beat list. / 三幕構成の参考図を、必須項目一覧ではなく展開を選ぶ手掛かりとして使う。

- Generation: `promptBuilder.js` (ordinary UI) and `prompt.js` use `storyStructure.js`; `modeContracts.js` and `editorialEvaluationHelpers.js` carry the same priority through request assembly. / 通常UI・互換生成・品質指示の組立後まで共通指針を保持する。
- Editorial review and revision: `editorialReviewContracts.js` and `editorialBrushupRuntime.js` inspect concrete comprehension gaps and repair existing material. / 検査は該当場面と実害を示し、改稿は既存の人物・事実・結末を保つ。型の不足だけでは減点しない。
- Brief works combine beats; multi-scene works can use a developing response, a mid-story change and a final consequence. Existing length and output labels stay authoritative. / 短尺は展開を統合し、複数場面では行動と応答、中盤の変化、終盤の帰結を必要に応じて使う。既存字数・出力ラベルは維持する。
- Poetry, essays, letters and diaries need not have an event plot. Documentary work must distinguish supported facts from uncertainty. / 詩・エッセイ・手紙・日記に事件を強制しない。記録作品は裏付けのある事実と不明点を分け、動機・証言・解決を創作しない。
- Preserve quiet, surreal, tragic, open and unchanged endings; no required villain, crisis, death, growth or fixed beat percentages. Structure guidance adds no API call, parser field or retry. / 静かさ・シュール・悲劇・未解決・不変を保ち、敵・危機・死・成長・固定比率を必須にしない。構成指針のためのAPI呼出し・解析項目・再試行は追加しない。

Nano integration: reviewed the adjacent current rule changes for optional full-body action and visible-face-only acting; synchronize those two snapshots without altering the four-panel format. / 漫画連携では通常の結末にも使える任意の全身演技と、顔が見える人物だけに適用する顔演技の2差分を確認して同期した。4コマ形式は変更しない。

Review boundary: an application-owned review marker keeps editorial requests outside the generation-quality request decorator and stream length repair. Drafting and rewriting retain their existing length and format checks. Review uses the public minimum, not an internal drafting target. / 講評用の要求には本文生成用の品質指示や字数補完を追加しない。生成・改稿の既存検査は維持し、講評では公開下限と内部の執筆目標を区別する。

Progress reports the selected request model and elapsed waiting time. Timer ticks do not claim that hidden planning, fixed beats or validation have completed. / 進捗は選択モデルと応答待ち時間を表示し、時間経過だけで内部計画・固定ビート・検証の完了を表示しない。

Public minimum length is measured on the cleaned body, excluding title, footer, completion marker and whitespace. The existing initial format-repair step also handles a short body once; a failed repair preserves the manuscript and reports failure. Higher-scored rewrites below the public minimum are rejected, retaining the valid manuscript. / 公開字数の下限は清書後の本文で数え、タイトル・フッター・完結マーカー・空白を除外する。初稿の既存形式修正で字数不足も1回補い、失敗時は原稿を保持して未完了を表示する。高得点でも下限未満の改稿は採用しない。

Imported manuscripts use the same editorial flow. Readiness unlocks the editorial region as well as its button and automatic-revision option. / 取り込んだ本文にも同じ講評・改稿処理を使う。準備完了時は編集ボタンだけでなく、親欄と自動改稿の選択肢も操作可能にする。
