(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const S=[{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-2.5-flash-lite",label:"Gemini 2.5 Flash-Lite"},{value:"gemini-3-flash-preview",label:"Gemini 3 Flash (Preview)"},{value:"gemini-3.1-flash-lite-preview",label:"Gemini 3.1 Flash-Lite (Preview)"}],R=[{value:"4koma",label:"4コマ漫画風"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(10万字〜/プロンプト生成)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],X={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},Q={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},Z={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},ee={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},te={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},ae={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},ne={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},N=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター"],G=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然"],_=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],H=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真"],P=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈"],re=["光","葵","凛","渚","空","悠","怜","真尋"],F=["男性, 短髪, 眼鏡をかけている","男性, 長身, スポーツマン体型","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人"],q=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールなオフィスレディ","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい"],se=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト"],oe=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ"],ce=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会"],le=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ"],ie=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風"],de=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界"],ue=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話"],me=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],he=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],pe=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],ge=async a=>{if(!a)return"API Key not set.";try{const n=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${a}`)).json();return n.error?`API Error: ${n.error.message}`:n.models?`Available Models: ${n.models.map(r=>r.name.replace("models/","")).filter(r=>r.includes("gemini")).join(", ")}`:"No models returned by API."}catch(e){return`Diagnostic Failed: ${e.message}`}};async function ve(a,e,n){var l,d,m,v;const s=`https://generativelanguage.googleapis.com/v1beta/models/${e}:generateContent?key=${a}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:n}]}],generationConfig:{maxOutputTokens:8192,temperature:1},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(!r.ok){const u=await r.text();let f=`Gemini HTTP ${r.status}`;try{const b=JSON.parse(u);b.error&&b.error.message&&(f+=` — ${b.error.message}`)}catch{f+=` — ${u.slice(0,300)}`}throw new Error(f)}const o=await r.json();if((l=o.promptFeedback)!=null&&l.blockReason)throw new Error(`Blocked by Safety Filter: ${o.promptFeedback.blockReason}`);if((v=(m=(d=o.candidates)==null?void 0:d[0])==null?void 0:m.content)!=null&&v.parts){const u=o.candidates[0].content.parts.map(f=>f.text||"").join("");if(!u){const f=o.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${f}).`)}return u}throw o.error?new Error(`Gemini API Error: ${o.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}async function B(a,e,n,s){const r=[e,...S.map(d=>d.value).filter(d=>d!==e)];for(const d of r)try{return d!==e&&s&&s(d),{text:await ve(a,d,n),usedModel:d}}catch(m){console.warn(`Model ${d} failed:`,m.message);continue}console.log("All models failed. Running diagnosis...");const o=await ge(a);console.error("DIAGNOSIS RESULT:",o);let l=`全モデル接続失敗: ${o}
`;throw o.includes("Quota exceeded")||o.includes("429")?l=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:o.includes("API Error: API key not valid")||o.includes("403")?l="【認証エラー】APIキーが無効です。正しいキーを設定してください。":o.includes("SAFETY")||o.includes("PROHIBITED")?l="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":o.includes("404")&&(l="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。"),new Error(l)}const k=a=>a[Math.floor(Math.random()*a.length)];function fe(a){const e=a.mode||"4koma",n=a.genreCustom||a.genre||"コメディ",s=a.themeCustom||a.theme||"ランダム",r=a.worldviewCustom||a.worldview||"現代日本",o=a.eraCustom||a.era||"現代",l=a.targetCustom||a.target||"全年齢",d=a.endingCustom||a.ending||"意外な結末",m=a.narrCustom||a.narration||"三人称・客観";let v;!a.characters||a.characters.length===0?v="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":v=a.characters.map((i,A)=>{const y=i.name||`(AI命名:キャラ${A+1})`,w=i.role||"未定",W=i.personality||"未定",z=i.note?` [${i.note}]`:"";return`${A+1}. ${y} (${w}) — 性格:${W}${z}`}).join(`
`);const u=a.charCount?`
※ 指定文字数：約${a.charCount}文字程度`:"",f=a.supplement?`
【追加指示】
${a.supplement}`:"",b={"4koma":"4コマネタ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},C=a.modeCustom||b[e]||e;let I="";e==="long"?I=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${n}
・テーマ: ${s}
・時代: ${o}
・世界観・雰囲気: ${r}
・語り口: ${m}
・ターゲット層: ${l}
・結末の方向性: ${d}
・登場人物: ${v}
${u}${f}

---
# 必須出力フォーマット（雛形に沿って埋めること）
\`\`\`markdown
あなたはプロのベストセラー小説家です。これから私と協力して、数万〜数十万文字におよぶ長編小説を1章ずつ分割で執筆します。

## 【物語の基本設定】
（※ ここにジャンル、時代、世界観などの詳細を小説家向けに深く描写して記載）

## 【登場人物の深掘り】
（※ 登場人物の裏設定、動機、関係性、口調などを詳細に記載）

## 【プロット（全章構成）】
（※非常に重要：APIの出力上限で途切れるのを防ぐため、必ず各章のあらすじは1〜2行で極めて簡潔にまとめ、プロンプト全体が長大にならないよう強く制限してください）

## 【AIっぽさ排除の厳守ルール】
・「最適化」「本質的」「羅針盤」「〜を実現します」などの抽象語、ビジネス用語、陳腐な比喩を一切禁止。
・「まとめると」「いかがでしたか？」などのブログ的末尾は禁止。
・「です」「ます」の単調な連続を避け、体言止めや感情表現を交えリズム良く。

## 【対話型エージェントとしての振舞い（最重要）】
1. あなたは1度に1つの章しか執筆してはいけません。
2. 章を書き終えるごとに、必ず『第◯章の執筆が完了しました。続けて次の章を執筆しますか？』と私に尋ね、私が『はい』や『続きをお願い』と簡単に答えるまで、絶対に次の章を勝手に書き始めないでください。
3. **【文脈維持メモ（内部ログ）】** 長編執筆における設定崩壊や記憶忘れを防ぐため、毎回、章の終わりに（私への質問の直前に）、短く簡潔に以下のメモを残してください：
   - 【回収待ち伏線メモ】現在残っている謎や伏線
   - 【次章の展開予定】次章で何を書くかの簡単な備忘録
4. **章の終わりは上記のメモと質問のみとし、自己分析、結論、根拠などの不要なメタデータは一切出力しないでください。**

## 【初回のあなた（AI）のアクション（第1章の出力）】
プロンプトを受け取ったら、まずは読者が全体像を把握できるよう、以下の【作品ヘッダー情報】を出力し、その直下から**そのまま第1章の本文を書き始めて**ください。

【作品ヘッダー情報】（※このヘッダーは第1章の最初のみ出力し、第2章以降は出力しないでください）
*   **タイトル**：（魅力的なタイトルを考案）
*   **予定文字数**：（例：約15万字）
*   **全構成**：（例：全12章構成）
*   **あらすじ**：（物語の概要を3〜4行で簡潔に）

---

さあ、上記の全指示と設定を読み込みましたか？
理解した場合は、まず【作品ヘッダー情報】を出力し、続けて「第1章」の本文を圧倒的な熱量と描写力で数千文字規模で執筆してください。文字数や描写の出し惜しみは厳禁です。
最後には必ず上記ルールの通り「文脈維持メモ」を残し、「第1章の執筆が完了しました。続けて第2章を執筆しますか？」と尋ねて待機してください。
\`\`\`
`:I=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${C}」を執筆してください。

【AIっぽさを完全に排除するための厳守ルール】
以下の「AI特有の癖」を完全に排除し、人間が書いたような血の通った自然な文章にしてください。
1. 語彙・表現：
   - 「最適化」「本質的」「効果的」「重要」「〜を実現します」などの抽象的なビジネス用語や万能語は禁止。具体的な動詞や情景描写（五感や感情）に言い換えること。
   - 「羅針盤」「土台」「エンジン」「航海」などの既視感のある陳腐な比喩は避け、比喩に頼らず言い切ること。
   - 「これにより」「また」「さらに」「したがって」などの不要な接続詞を乱用せず、文脈で自然に繋ぐこと。
2. リズム構成・定形句の排除：
   - 「〜です。」「〜ます。」と同じ長さ・語尾の文を連続して使わない。体言止めや「〜でしょう」「〜かもしれません」「〜ではないでしょうか」などを意図的に混ぜ、短文と長文でリズムに緩急をつけること。
   - 「結論から言うと」「本記事では」「以下で解説します」などの説明書のような前置き宣言は一切禁止。
   - 文章の最後に「まとめると」「結論として」「要するに」と再掲・要約しない。読者への「いかがでしたか？」等の問いかけや「参考になれば幸いです」といった締めの言葉も一切不要。余韻を残して自然に終わらせること。
3. 事なかれ主義・逃避の禁止：
   - 「一般的に」「多くの場合」「一概には言えませんが」「状況によりますが」といった安全クッション（保険）や両論併記は徹底排除し、世界観に沿って堂々と言い切ること。
4. 記号・装飾：
   - 短い文章での過度な箇条書き、見出し記号（#）の乱用を避けること。
   - アスタリスク（*）、過度な「」（カギカッコ）や（）（カッコ書き）、コロン（：）、スラッシュ（／）の多用を禁止し、文脈に自然に溶け込ませること。

【基本設定】
・ジャンル: ${n}
・テーマ: ${s}
・時代: ${o}
・世界観・雰囲気: ${r}
・語り口: ${m}
・ターゲット層: ${l}
・結末の方向性: ${d}

【登場人物】
${v}

【執筆ルール（最重要）】
1. 予測可能な展開を意図的に回避し、読者を驚かせること。
2. キャラクターは設定された性格から生まれる固有の反応をすること。
3. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
4. 「${d}」という結末に向かって、伏線を自然に配置すること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。${u}${f}

【出力形式】
※ 禁止：タイトルに「」や【】などの装飾記号はAI側で付与せず、テキストのみで出力すること。
1行目に「タイトル: ○○」の形式で物語のタイトルを出力すること。
2行目は空行。
3行目から本文を開始してください。
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;const h=[n,o,r,l,d,C];return a.charCount&&h.push(`${a.charCount}字`),{prompt:I,tags:h}}function be(){let a=k(me);return Math.random()<.55&&(a+=" "+k(he)),Math.random()<.35&&(a+=" "+k(pe)),a}const t=a=>document.getElementById(a),p=a=>a&&a.length?a[Math.floor(Math.random()*a.length)]:null,E=a=>(a||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),c={apiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:""};function U(){const a=t("banner"),e=document.querySelector(".settings-panel");c.apiKey?(a.classList.add("ok"),t("apikey").value="********",t("apikey").readOnly=!0,e&&e.classList.remove("disabled-panel")):(a.classList.remove("ok"),t("apikey").value="",t("apikey").readOnly=!1,e&&e.classList.add("disabled-panel"))}function ye(){const a=t("apikey").value.trim();if(!a){alert("APIキーを入力してください");return}c.apiKey=a,U(),t("banner").classList.add("locked"),t("key-save").classList.add("hidden"),t("key-edit").classList.remove("hidden")}function Ee(){t("banner").classList.remove("locked"),t("key-save").classList.remove("hidden"),t("key-edit").classList.add("hidden"),t("apikey").readOnly=!1,t("apikey").value="",t("apikey").focus()}function g(a,e){const n=t(a);n&&n.classList.toggle("hidden",!e)}function M(a,e,n,s,r){const o=t(a);o&&(o.innerHTML=e.map(l=>`<button class="chip sub-chip" data-v="${E(l)}">${E(l)}</button>`).join(""),o.querySelectorAll(".chip").forEach(l=>{l.addEventListener("click",()=>{o.querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),l.classList.add("active"),c[n]=l.dataset.v,t(s).value=l.dataset.v,g(r,l.dataset.v)})}))}function $({catId:a,subId:e,customId:n,clearId:s,headerRndId:r,customRndId:o,categories:l,originals:d,stateKey:m,stateCatKey:v}){var f,b,C,I;const u=t(a);if(u&&l){u.innerHTML=Object.keys(l).map(i=>`<button class="chip cat-chip" data-cat="${E(i)}">${E(i)}</button>`).join(""),u.querySelectorAll(".chip").forEach(i=>{i.addEventListener("click",()=>{u.querySelectorAll(".chip").forEach(A=>A.classList.remove("active")),i.classList.add("active"),c[v]=i.dataset.cat,c[m]=null,M(e,l[i.dataset.cat],m,n,s),t(n).value="",g(s,"")})});const h=Object.keys(l)[0];if(h){const i=u.querySelector(".chip");i&&i.classList.add("active"),M(e,l[h],m,n,s)}}(f=t(r))==null||f.addEventListener("click",()=>{if(!l)return;const h=Object.keys(l),i=p(h);c[v]=i,u&&u.querySelectorAll(".chip").forEach(w=>w.classList.toggle("active",w.dataset.cat===i));const A=l[i],y=p(A);c[m]=y,M(e,A,m,n,s),t(e).querySelectorAll(".chip").forEach(w=>w.classList.toggle("active",w.dataset.v===y)),t(n).value=y,g(s,y)}),(b=t(o))==null||b.addEventListener("click",()=>{let h;m==="themeSelected"?h=be():h=p(d),h&&(t(n).value=h,u&&u.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),t(e).innerHTML="",c[v]=null,c[m]=null,g(s,h))}),(C=t(s))==null||C.addEventListener("click",()=>{t(n).value="",g(s,"")}),(I=t(n))==null||I.addEventListener("input",()=>{const h=t(n).value.trim();g(s,h),h&&(u&&u.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),t(e).innerHTML="",c[v]=null,c[m]=null)})}function Le(){document.querySelectorAll(".btn-section-clear").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.section;if(e==="chars"){Ie();return}if(e==="mode"){t("mode-custom").value="",c.mode="4koma",t("mode-chips").querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),g("mode-custom-clear","");return}const n=`${e}-custom`,s=`${e}-custom-clear`,r=`${e}-cat-chips`,o=`${e}-sub-chips`;t(n)&&(t(n).value=""),g(s,""),t(r)&&t(r).querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),t(o)&&(t(o).innerHTML="");const d={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[e];d&&(c[d.key]=null,c[d.cat]=null),e==="supplement"&&(t("supplement").value="",g("supplement-clear",""))})})}function D(){const a=t("mode-chips");a.innerHTML=R.map(e=>`<button class="chip${c.mode===e.value?" active":""}" data-v="${e.value}">${e.label}</button>`).join(""),a.querySelectorAll(".chip").forEach(e=>{e.addEventListener("click",()=>{a.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),e.classList.add("active"),c.mode=e.dataset.v,t("mode-custom").value=e.textContent,g("mode-custom-clear",e.textContent),x(c.mode)})}),t("btn-rand-mode").addEventListener("click",()=>{const e=p(R);c.mode=e.value,a.querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n.dataset.v===e.value)),t("mode-custom").value=e.label,g("mode-custom-clear",e.label),x(c.mode)}),t("mode-custom-rnd").addEventListener("click",()=>{const e=p(se);t("mode-custom").value=e,c.mode=null,a.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),g("mode-custom-clear",e)}),t("mode-custom").addEventListener("input",()=>{const e=t("mode-custom").value.trim();g("mode-custom-clear",e),e&&(a.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),c.mode=null,x(null))}),t("charcount-check").addEventListener("change",()=>{t("charcount-wrap").classList.toggle("hidden",!t("charcount-check").checked)}),t("char-count").addEventListener("input",e=>{const n=parseInt(e.target.max)||6e3;parseInt(e.target.value)>n&&(e.target.value=n)})}function x(a){const e=t("char-count"),n=t("charcount-hint");!e||!n||(a==="long"?(e.max="300000",e.step="10000",e.value="100000",n.textContent="※長編モードでは、長編小説をGeminiに各章ごと分割執筆させるための『専用指示書』を生成します。",n.style.color="#4caf50"):(e.max="4000",e.step="500",parseInt(e.value)>4e3&&(e.value="2000"),n.textContent="※直接生成で途切れない安全な文字数は約4,000字までです",n.style.color="#aaa"))}function Ie(){c.characters=[],L()}function L(){t("char-count-display").textContent=c.characters.length;const a=t("char-list"),e=`<datalist id="roles-list">${N.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,n=`<datalist id="personalities-list">${G.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`;a.innerHTML=c.characters.map((s,r)=>`
    <div class="char-card shadow-sm">
      <div class="char-card-header">
        <span class="char-card-num">キャラ ${r+1}</span>
        <div class="btn-group">
          <button class="char-field-btn btn-char-rnd-all" data-idx="${r}" title="この人物の全項目をランダムに埋める（個別の微調整も可能）">🎲 全ランダム</button>
          <button class="btn-char-del" data-idx="${r}" title="この人物を削除">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">名前（空欄ならストーリー生成時にAI命名 / 🎲 今すぐ生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-name-input" value="${E(s.name)}" data-idx="${r}" placeholder="例：山田太郎（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${r}" data-key="name" title="今すぐ名前の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${r}" data-key="name" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${r}" data-key="role" value="${E(s.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${r}" data-key="role" title="今すぐ役割の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${r}" data-key="role" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${r}" data-key="personality" value="${E(s.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）">
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${r}" data-key="personality" title="今すぐ性格の案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${r}" data-key="personality" title="消去">🗑️</button>
        </div>
      </div>

      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成 / ⚡ 性別変更時は名前も自動調整）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${r}" placeholder="例：男性, 短髪, 眼鏡（性別を変えると名前も自動調整）">${E(s.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${r}" data-key="note" title="今すぐ詳細メモの案を出す">🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${r}" data-key="note" title="消去">🗑️</button>
        </div>
      </div>
    </div>
  `).join("")+e+n+`
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：詳細メモの性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えるとメモの性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `,a.querySelectorAll(".char-name-input").forEach(s=>s.addEventListener("input",r=>{const o=parseInt(r.target.dataset.idx);c.characters[o].name=r.target.value,K(o,"name")})),a.querySelectorAll(".char-sel").forEach(s=>s.addEventListener("input",r=>c.characters[r.target.dataset.idx][r.target.dataset.key]=r.target.value)),a.querySelectorAll(".char-memo").forEach(s=>s.addEventListener("input",r=>{const o=parseInt(r.target.dataset.idx);c.characters[o].note=r.target.value,K(o,"note")})),a.querySelectorAll(".btn-field-rnd").forEach(s=>s.addEventListener("click",r=>we(parseInt(s.dataset.idx),s.dataset.key))),a.querySelectorAll(".btn-field-clear").forEach(s=>s.addEventListener("click",r=>$e(parseInt(s.dataset.idx),s.dataset.key))),a.querySelectorAll(".btn-char-rnd-all").forEach(s=>s.addEventListener("click",r=>j(parseInt(s.dataset.idx)))),a.querySelectorAll(".btn-char-del").forEach(s=>s.addEventListener("click",r=>Ae(parseInt(s.dataset.idx))))}function Y(){c.characters.push({name:"",role:"",personality:"",note:""}),L()}function Ae(a){c.characters.splice(a,1),L()}function Ce(){c.characters.pop(),L()}function we(a,e){const n=c.characters[a],s=O(n.note)||T(n.name)||(Math.random()<.5?"M":"F");if(e==="name"){const r=s==="M"?H:s==="F"?P:re;n.name=p(_)+p(r)}if(e==="role"&&(n.role=p(N)),e==="personality"&&(n.personality=p(G)),e==="note"){const r=s==="M"?F:q;n.note=p(r)}L()}function $e(a,e){c.characters[a][e]="",L()}function j(a){const e=Math.random()<.5?"M":"F",n=e==="M"?H:P,s=e==="M"?F:q;c.characters[a]={name:p(_)+p(n),role:p(N),personality:p(G),note:p(s)},L()}const Se=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],ke=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function T(a){if(!a)return null;const e=a.slice(-1);return Se.includes(e)?"M":ke.includes(e)?"F":null}function O(a){return a?a.includes("男性")||a.includes("男,")?"M":a.includes("女性")||a.includes("女,")?"F":null:null}function K(a,e){const n=c.characters[a];if(e==="name"){const s=T(n.name),r=O(n.note);if(s&&s!==r){const o=s==="M"?"男性":"女性";n.note?r?n.note=n.note.replace(/^(男性|女性)/,o):n.note=o+", "+n.note:n.note=p(s==="M"?F:q),L()}}else if(e==="note"){const s=O(n.note),r=T(n.name);if(s&&s!==r){const o=s==="M"?H:P;n.name=p(_)+p(o),L()}}}function J(){c.characters.length===0&&Y(),c.characters.forEach((a,e)=>j(e))}function Me(){const a=Math.floor(Math.random()*3)+1;c.characters=[];for(let e=0;e<a;e++)c.characters.push({name:"",role:"",personality:"",note:""}),j(e)}async function xe(){const a=c.apiKey;if(!a){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const e=t("btn-today-news"),n=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spinner"></span>取得中...';try{const s=S[0].value,r="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇条書きで出力してください。",{text:o}=await B(a,s,r),l=o.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim();t("theme-custom").value=l,c.themeSelected=null,c.themeCategory=null,t("theme-cat-chips")&&t("theme-cat-chips").querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),t("theme-sub-chips").innerHTML="",g("theme-custom-clear",l)}catch(s){alert("ニュース取得失敗: "+s.message)}finally{e.disabled=!1,e.innerHTML=n}}function Re(){return{mode:c.mode||"",modeCustom:t("mode-custom").value.trim(),theme:c.themeSelected||"",themeCustom:t("theme-custom").value.trim(),characters:c.characters,genre:c.genre||"",genreCustom:t("genre-custom").value.trim(),worldview:c.worldview||"",worldviewCustom:t("worldview-custom").value.trim(),target:c.target||"",targetCustom:t("target-custom").value.trim(),era:c.era||"",eraCustom:t("era-custom").value.trim(),ending:c.ending||"",endingCustom:t("ending-custom").value.trim(),narration:c.narration||"",narrCustom:t("narr-custom").value.trim(),charCount:t("charcount-check").checked&&parseInt(t("char-count").value)||null,supplement:t("supplement").value.trim()}}async function V(){var v;const a=c.apiKey;if(!a){alert("APIキーを保存してください"),t("apikey").focus();return}const e=t("btn-generate"),n=t("output"),s=t("tag-row"),r=t("char-counter");e.disabled=!0,e.innerHTML='<span class="spinner"></span>構築中...',t("settings").classList.add("generating");const o=t("global-alert"),l=Re(),{prompt:d,tags:m}=fe(l);n.textContent="AIの思考を待っています...（しばらくお待ちください）",o&&(o.style.display="flex");try{const u=S[0].value;e.innerHTML='<span class="spinner"></span>Geminiに送信中...';const f=y=>{n.textContent=`フォールバック中: ${y}...`},{text:b,usedModel:C}=await B(a,u,d,f);e.innerHTML='<span class="spinner"></span>解析中...';const I=b.split(`
`);let h="",i=b;i=i.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),I[0]&&/^タイトル[:：]\s*/.test(I[0])&&(h=I[0].replace(/^タイトル[:：]\s*/,"").trim(),i=i.replace(/^タイトル[:：].*\n\n?/,"")),c.lastTitle=h,n.className="output-box text-selectable",n.textContent=(h?"【"+h+`】

`:"")+i,r.textContent=`${n.textContent.length.toLocaleString()} 字`;const A=((v=S.find(y=>y.value===C))==null?void 0:v.label)||C;s.innerHTML=`<span class="tag tag-gemini">Gemini</span><span class="tag tag-model">${E(A)}</span>`+m.map(y=>`<span class="tag">${E(y)}</span>`).join(""),t("btn-copy").classList.remove("hidden"),t("btn-download").classList.remove("hidden")}catch(u){n.className="output-box empty",n.innerHTML=`<div class="error-msg">エラー: ${E(u.message)}</div>`}finally{o&&(o.style.display="none")}t("settings").classList.remove("generating"),e.disabled=!1,e.textContent="ストーリー生成"}async function Te(){c.mode=p(R).value,D(),t("mode-custom").value="",g("mode-custom-clear",""),["theme","genre","worldview","target","era","ending","narr"].forEach(e=>{var n;return(n=t(`btn-rand-${e}`))==null?void 0:n.click()}),J(),t("supplement").value="",g("supplement-clear",""),t("settings").scrollTo({top:0,behavior:"smooth"}),await new Promise(e=>setTimeout(e,800)),V()}function Oe(){if(!confirm("全ての設定（APIキー以外）をリセットしますか？"))return;c.mode="4koma";const a=["theme","genre","worldview","target","era","ending","narr"];a.forEach(e=>{c[e]=null;const n=e==="theme"?"themeCategory":e==="narr"?"narrCategory":e+"Category";c[n]=null}),c.characters=[],c.lastTitle="",D(),t("mode-custom").value="",g("mode-custom-clear",""),a.forEach(e=>{t(`${e}-cat-chips`)&&t(`${e}-cat-chips`).querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),t(`${e}-sub-chips`)&&(t(`${e}-sub-chips`).innerHTML=""),t(`${e}-custom`)&&(t(`${e}-custom`).value=""),g(`${e}-custom-clear`,"")}),L(),t("supplement").value="",g("supplement-clear",""),t("charcount-check").checked=!1,t("charcount-wrap").classList.add("hidden"),t("char-count").value="400",t("output").className="output-box empty",t("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. Gemini APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',t("tag-row").innerHTML="",t("char-counter").textContent="0 字",t("btn-copy").classList.add("hidden"),t("btn-download").classList.add("hidden"),t("settings").scrollTo({top:0,behavior:"smooth"})}function Ne(){t("key-save").addEventListener("click",ye),t("key-edit").addEventListener("click",Ee),t("btn-reload").addEventListener("click",()=>location.reload()),t("btn-all-random").addEventListener("click",Te),t("btn-reset-all").addEventListener("click",Oe),t("btn-generate").addEventListener("click",V),t("btn-copy").addEventListener("click",()=>{navigator.clipboard.writeText(t("output").textContent).then(()=>{t("btn-copy").textContent="✅ コピー完了",setTimeout(()=>t("btn-copy").textContent="📋 コピー",2e3)})}),t("btn-download").addEventListener("click",()=>{const a=t("output").textContent,e=new Blob([a],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=(c.lastTitle||"story")+".txt",n.click()}),U(),D(),$({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:X,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),$({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:Q,originals:oe,stateKey:"genre",stateCatKey:"genreCategory"}),$({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:Z,originals:de,stateKey:"worldview",stateCatKey:"worldviewCategory"}),$({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:ee,originals:ue,stateKey:"target",stateCatKey:"targetCategory"}),$({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:te,originals:ce,stateKey:"era",stateCatKey:"eraCategory"}),$({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:ae,originals:le,stateKey:"ending",stateCatKey:"endingCategory"}),$({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:ne,originals:ie,stateKey:"narration",stateCatKey:"narrCategory"}),Le(),t("btn-today-news").addEventListener("click",xe),t("btn-add-char").addEventListener("click",Y),t("btn-remove-char").addEventListener("click",Ce),t("btn-rand-chars-content").addEventListener("click",J),t("btn-rand-chars-all").addEventListener("click",Me),L()}document.addEventListener("DOMContentLoaded",Ne);
