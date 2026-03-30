(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const k=[{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-2.5-flash-lite",label:"Gemini 2.5 Flash-Lite"},{value:"gemini-3-flash-preview",label:"Gemini 3 Flash (Preview)"},{value:"gemini-3.1-flash-lite-preview",label:"Gemini 3.1 Flash-Lite (Preview)"}],T=[{value:"4koma",label:"4コマ漫画風"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(10万字〜/プロンプト生成)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],ee={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},te={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},ne={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},ae={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},re={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},se={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},oe={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},G=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],_=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],F=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],H=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],P=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],ce=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],q=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],D=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],le=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],ie=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],de=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],ue=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],me=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],he=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],pe=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],ve=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],ge=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],fe=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],ye=async n=>{if(!n)return"API Key not set.";try{const a=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`)).json();return a.error?`API Error: ${a.error.message}`:a.models?`Available Models: ${a.models.map(r=>r.name.replace("models/","")).filter(r=>r.includes("gemini")).join(", ")}`:"No models returned by API."}catch(e){return`Diagnostic Failed: ${e.message}`}};async function be(n,e,a){var l,i,m,g;const s=`https://generativelanguage.googleapis.com/v1beta/models/${e}:generateContent?key=${n}`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:a}]}],generationConfig:{maxOutputTokens:8192,temperature:1},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(!r.ok){const u=await r.text();let f=`Gemini HTTP ${r.status}`;try{const b=JSON.parse(u);b.error&&b.error.message&&(f+=` — ${b.error.message}`)}catch{f+=` — ${u.slice(0,300)}`}throw new Error(f)}const o=await r.json();if((l=o.promptFeedback)!=null&&l.blockReason)throw new Error(`Blocked by Safety Filter: ${o.promptFeedback.blockReason}`);if((g=(m=(i=o.candidates)==null?void 0:i[0])==null?void 0:m.content)!=null&&g.parts){const u=o.candidates[0].content.parts.map(f=>f.text||"").join("");if(!u){const f=o.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${f}).`)}return u}throw o.error?new Error(`Gemini API Error: ${o.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}async function B(n,e,a,s){const r=[e,...k.map(i=>i.value).filter(i=>i!==e)];for(const i of r)try{return i!==e&&s&&s(i),{text:await be(n,i,a),usedModel:i}}catch(m){console.warn(`Model ${i} failed:`,m.message);continue}console.log("All models failed. Running diagnosis...");const o=await ye(n);console.error("DIAGNOSIS RESULT:",o);let l=`全モデル接続失敗: ${o}
`;throw o.includes("Quota exceeded")||o.includes("429")?l=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:o.includes("API Error: API key not valid")||o.includes("403")?l="【認証エラー】APIキーが無効です。正しいキーを設定してください。":o.includes("SAFETY")||o.includes("PROHIBITED")?l="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":o.includes("404")&&(l="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。"),new Error(l)}const M=n=>n[Math.floor(Math.random()*n.length)];function Ee(n){const e=n.mode||"4koma",a=n.genreCustom||n.genre||"コメディ",s=n.themeCustom||n.theme||"ランダム",r=n.worldviewCustom||n.worldview||"現代日本",o=n.eraCustom||n.era||"現代",l=n.targetCustom||n.target||"全年齢",i=n.endingCustom||n.ending||"意外な結末",m=n.narrCustom||n.narration||"三人称・客観";let g;!n.characters||n.characters.length===0?g="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":g=n.characters.map((y,w)=>{const z=y.name||`(AI命名:キャラ${w+1})`,X=y.role||"未定",Q=y.personality||"未定",Z=y.note?` [${y.note}]`:"";return`${w+1}. ${z} (${X}) — 性格:${Q}${Z}`}).join(`
`);const u=n.charCount?`
※ 指定文字数：約${n.charCount}文字程度`:"",f=n.supplement?`
【追加指示】
${n.supplement}`:"",b={"4koma":"4コマネタ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},C=n.modeCustom||b[e]||e,h={"4koma":`

【文体指定：4コマ漫画風】
起承転結を4段階で明確にし、最後に笑いまたは意外性のあるオチをつけること。文体は軽快でテンポよく、深刻になりすぎないこと。セリフ主体で進行させること。暗い展開・壮大な伏線は原則不要。`,short_short:`

【文体指定：ショートショート】
短い中にキレのあるオチや余韻を残すこと。冗長な描写は避け、簡潔で鋭い文体を心がけること。星新一のような洗練された構成を意識すること。`,novel:`

【文体指定：短編小説】
キャラクターの内面描写と情景描写のバランスを取り、文学的な読み応えを出すこと。`,medium:`

【文体指定：中編小説】
複数のシーンや場面転換を含め、物語に厚みを持たせること。伏線と回収を意識した構成にすること。`,scenario:`

【文体指定：脚本・台本】
ト書き（情景・動作指示）とセリフを明確に分離すること。映像的な演出を指示に含め、脚本フォーマットに準拠すること。`,manga:`

【文体指定：ストーリー漫画原作】
ビジュアルで映える場面構成を意識し、セリフは簡潔に、動きのある描写を心がけること。コマ割りを意識した場面切り替えを行うこと。`,essay:`

【文体指定：エッセイ】
個人的な視点や体験を交え、読者に共感や気づきを与える柔らかな文体にすること。劇的な展開・伏線・「封印」「覚醒」「運命」のような大仰な要素は厳禁。日常の機微を丁寧に拾い、肩の力を抜いた語り口にすること。`,poem:`

【文体指定：詩・ポエム】
リズムと韻律を意識し、言葉の響きと余白を大切にすること。散文的にならず、詩的な飛躍を恐れないこと。`,fairy:`

【文体指定：童話・絵本】
平易で温かみのある言葉遣いを使い、教訓や希望を込めること。暗すぎる展開は避け、子供にも読み聞かせられるトーンを保つこと。`,letter:`

【文体指定：手紙・書簡体】
特定の相手に語りかける形式を守ること。日付や挨拶文も自然に含め、人間味のある文体にすること。`,diary:`

【文体指定：日記・独白体】
書き手の内面を生々しく描くこと。整理されすぎない思考の流れを意識し、独り言のような率直さを大切にすること。`,documentary:`

【文体指定：ドキュメンタリー】
客観的な視点を基調としつつ、取材対象への共感を込めた文体にすること。事実の積み重ねで説得力を出すこと。`,radio:`

【文体指定：ラジオドラマ】
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[e]||"",d=o&&!["現代","ランダム",""].includes(o)?`

【時代考証ルール（厳守）】
・時代設定「`+o+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"";let I="";e==="long"?I=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${a}
・テーマ: ${s}
・時代: ${o}
・世界観・雰囲気: ${r}
・語り口: ${m}
・ターゲット層: ${l}
・結末の方向性: ${i}
・登場人物: ${g}
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
・ジャンル: ${a}
・テーマ: ${s}
・時代: ${o}
・世界観・雰囲気: ${r}
・語り口: ${m}
・ターゲット層: ${l}
・結末の方向性: ${i}

【登場人物】
${g}

【執筆ルール（最重要）】
1. 予測可能な展開を意図的に回避し、読者を驚かせること。
2. キャラクターは設定された性格から生まれる固有の反応をすること。
3. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
4. 「${i}」という結末に向かって、伏線を自然に配置すること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。

【伏線・構成ルール（厳守）】
1. 伏線の事前配置：物語の後半で重要な役割を果たす要素（人物の過去・記憶・アイテム・設定）は、必ず冒頭〜前半に自然な形で言及・暗示しておくこと。後半で唐突に新設定を投入することを禁止する。
2. キャラクターの物語的機能：登場人物には全員、物語の選択・葛藤・展開に影響を与える明確な「役割」を持たせること。単なる傍観者・リアクション要員・庇われるだけの存在は禁止。各キャラの行動や言動が物語を動かすこと。
3. 結末の着地：短編の結末は「主人公が何らかの意志・行動・決断を具体的に示す」形で閉じること。問題の完全解決は不要だが、主人公がどの方向に進むかの意志表示は必須。深呼吸や一言だけで決断する安易な処理は避け、決断に至る感情的または論理的な根拠（きっかけとなる出来事・記憶・他者の言葉など）を必ず描写すること。また、主人公が何かを受け入れる・犠牲にする展開の場合、受容の前に必ず一度は拒絶・恐怖・抵抗・迷いを描写すること。最初から全てを受け入れる主人公は読者の感情移入を阻害するため禁止する。「葛藤→抵抗→それでも選ぶ」という段階を経ることで、決断に説得力を持たせること。
4. 設定の必然性：物語に登場する特殊な要素（歴史的題材・SF設定・ファンタジー要素など）は、主人公の個人的背景や物語の核心テーマと必ず接続させること。「なぜこの設定なのか」が読者に伝わる因果関係を構築すること。
5. Show, Don't Tell：世界観やSF設定の説明を、キャラクターの台詞や主人公の内面独白による長い解説で済ませることを禁止する。「私はすべてを理解した」と宣言して設定を列挙する手法も同様に禁止。特に「一人のキャラクターが真相や設定を一度にまとめて語る」構成（老人・証人・導師などの説明役が全てを明かすパターン）を厳禁とする。情報は複数の断片（物証・回想・異なるキャラの証言・環境描写など）として段階的に開示し、読者が自ら点と点を繋いで真相に辿り着く構成にすること。
6. 別れと関係性の重み：物語中で重要な関係にあるキャラクターとの別離や決別のシーンでは、その関係に見合った感情的重みを描写すること。一言で切り捨てるような別れは禁止。短くても、相手への感情（感謝・申し訳なさ・名残惜しさなど）が伝わる描写を入れること。
7. 文体の緩急：物語全体を通じて同じトーン・テンポで書き続けないこと。主人公の心理状態の変化に応じて、文体自体にも変化を持たせること（例：焦燥時は短文の連続、回想時はゆったりとした長文、決断時は力強い断言調など）。特に物語の最大の衝撃・転換点（真相の判明、裏切りの発覚、喪失の瞬間など）では、「息を飲んだ」の一文で処理せず、主人公の思考の断片化・身体反応・時間感覚の歪みなどを通じて、読者にも衝撃を追体験させること。${d}${h}${u}${f}

【出力形式】
※ 禁止：タイトルに「」や【】などの装飾記号はAI側で付与せず、テキストのみで出力すること。
1行目に「タイトル: ○○」の形式で物語のタイトルを出力すること。
2行目は空行。
3行目から本文を開始してください。
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;const A=[a,o,r,l,i,C];return n.charCount&&A.push(`${n.charCount}字`),{prompt:I,tags:A}}function Le(){let n=M(ve);return Math.random()<.55&&(n+=" "+M(ge)),Math.random()<.35&&(n+=" "+M(fe)),n}const Ie="2.4.9",t=n=>document.getElementById(n),p=n=>n&&n.length?n[Math.floor(Math.random()*n.length)]:null,E=n=>(n||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),c={apiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:""};function Y(){const n=t("banner"),e=document.querySelector(".settings-panel");c.apiKey?(n.classList.add("ok"),t("apikey").value="********",t("apikey").readOnly=!0,e&&e.classList.remove("disabled-panel")):(n.classList.remove("ok"),t("apikey").value="",t("apikey").readOnly=!1,e&&e.classList.add("disabled-panel"))}function Ae(){const n=t("apikey").value.trim();if(!n){alert("APIキーを入力してください");return}c.apiKey=n,Y(),t("banner").classList.add("locked"),t("key-save").classList.add("hidden"),t("key-edit").classList.remove("hidden")}function Ce(){t("banner").classList.remove("locked"),t("key-save").classList.remove("hidden"),t("key-edit").classList.add("hidden"),t("apikey").readOnly=!1,t("apikey").value="",t("apikey").focus()}function v(n,e){const a=t(n);a&&a.classList.toggle("hidden",!e)}function x(n,e,a,s,r){const o=t(n);o&&(o.innerHTML=e.map(l=>`<button class="chip sub-chip" data-v="${E(l)}">${E(l)}</button>`).join(""),o.querySelectorAll(".chip").forEach(l=>{l.addEventListener("click",()=>{o.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),l.classList.add("active"),c[a]=l.dataset.v,t(s).value=l.dataset.v,v(r,l.dataset.v)})}))}function $({catId:n,subId:e,customId:a,clearId:s,headerRndId:r,customRndId:o,categories:l,originals:i,stateKey:m,stateCatKey:g}){var f,b,C,S;const u=t(n);if(u&&l){u.innerHTML=Object.keys(l).map(d=>`<button class="chip cat-chip" data-cat="${E(d)}">${E(d)}</button>`).join(""),u.querySelectorAll(".chip").forEach(d=>{d.addEventListener("click",()=>{u.querySelectorAll(".chip").forEach(I=>I.classList.remove("active")),d.classList.add("active"),c[g]=d.dataset.cat,c[m]=null,x(e,l[d.dataset.cat],m,a,s),t(a).value="",v(s,"")})});const h=Object.keys(l)[0];if(h){const d=u.querySelector(".chip");d&&d.classList.add("active"),x(e,l[h],m,a,s)}}(f=t(r))==null||f.addEventListener("click",()=>{if(!l)return;const h=Object.keys(l),d=p(h);c[g]=d,u&&u.querySelectorAll(".chip").forEach(y=>y.classList.toggle("active",y.dataset.cat===d));const I=l[d],A=p(I);c[m]=A,x(e,I,m,a,s),t(e).querySelectorAll(".chip").forEach(y=>y.classList.toggle("active",y.dataset.v===A)),t(a).value=A,v(s,A)}),(b=t(o))==null||b.addEventListener("click",()=>{let h;m==="themeSelected"?h=Le():h=p(i),h&&(t(a).value=h,u&&u.querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),t(e).innerHTML="",c[g]=null,c[m]=null,v(s,h))}),(C=t(s))==null||C.addEventListener("click",()=>{t(a).value="",v(s,"")}),(S=t(a))==null||S.addEventListener("input",()=>{const h=t(a).value.trim();v(s,h),h&&(u&&u.querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),t(e).innerHTML="",c[g]=null,c[m]=null)})}function we(){document.querySelectorAll(".btn-section-clear").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.section;if(e==="chars"){Se();return}if(e==="mode"){t("mode-custom").value="",c.mode="4koma",t("mode-chips").querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),v("mode-custom-clear","");return}const a=`${e}-custom`,s=`${e}-custom-clear`,r=`${e}-cat-chips`,o=`${e}-sub-chips`;t(a)&&(t(a).value=""),v(s,""),t(r)&&t(r).querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),t(o)&&(t(o).innerHTML="");const i={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[e];i&&(c[i.key]=null,c[i.cat]=null),e==="supplement"&&(t("supplement").value="",v("supplement-clear",""))})})}function j(){const n=t("mode-chips");n.innerHTML=T.map(e=>`<button class="chip${c.mode===e.value?" active":""}" data-v="${e.value}">${e.label}</button>`).join(""),n.querySelectorAll(".chip").forEach(e=>{e.addEventListener("click",()=>{n.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),e.classList.add("active"),c.mode=e.dataset.v,t("mode-custom").value=e.textContent,v("mode-custom-clear",e.textContent),R(c.mode)})}),t("btn-rand-mode").addEventListener("click",()=>{const e=p(T);c.mode=e.value,n.querySelectorAll(".chip").forEach(a=>a.classList.toggle("active",a.dataset.v===e.value)),t("mode-custom").value=e.label,v("mode-custom-clear",e.label),R(c.mode)}),t("mode-custom-rnd").addEventListener("click",()=>{const e=p(le);t("mode-custom").value=e,c.mode=null,n.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),v("mode-custom-clear",e)}),t("mode-custom").addEventListener("input",()=>{const e=t("mode-custom").value.trim();v("mode-custom-clear",e),e&&(n.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),c.mode=null,R(null))}),t("charcount-check").addEventListener("change",()=>{t("charcount-wrap").classList.toggle("hidden",!t("charcount-check").checked)}),t("char-count").addEventListener("input",e=>{const a=parseInt(e.target.max)||6e3;parseInt(e.target.value)>a&&(e.target.value=a)})}function R(n){const e=t("char-count"),a=t("charcount-hint");!e||!a||(n==="long"?(e.max="300000",e.step="10000",e.value="100000",a.textContent="※長編モードでは、長編小説をGeminiに各章ごと分割執筆させるための『専用指示書』を生成します。",a.style.color="#4caf50"):(e.max="4000",e.step="500",parseInt(e.value)>4e3&&(e.value="2000"),a.textContent="※直接生成で途切れない安全な文字数は約4,000字までです",a.style.color="#aaa"))}function Se(){c.characters=[],L()}function L(){t("char-count-display").textContent=c.characters.length;const n=t("char-list"),e=`<datalist id="roles-list">${G.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,a=`<datalist id="personalities-list">${_.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`;n.innerHTML=c.characters.map((s,r)=>`
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
  `).join("")+e+a+`
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：詳細メモの性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えるとメモの性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `,n.querySelectorAll(".char-name-input").forEach(s=>s.addEventListener("input",r=>{const o=parseInt(r.target.dataset.idx);c.characters[o].name=r.target.value,U(o,"name")})),n.querySelectorAll(".char-sel").forEach(s=>s.addEventListener("input",r=>c.characters[r.target.dataset.idx][r.target.dataset.key]=r.target.value)),n.querySelectorAll(".char-memo").forEach(s=>s.addEventListener("input",r=>{const o=parseInt(r.target.dataset.idx);c.characters[o].note=r.target.value,U(o,"note")})),n.querySelectorAll(".btn-field-rnd").forEach(s=>s.addEventListener("click",r=>Me(parseInt(s.dataset.idx),s.dataset.key))),n.querySelectorAll(".btn-field-clear").forEach(s=>s.addEventListener("click",r=>xe(parseInt(s.dataset.idx),s.dataset.key))),n.querySelectorAll(".btn-char-rnd-all").forEach(s=>s.addEventListener("click",r=>K(parseInt(s.dataset.idx)))),n.querySelectorAll(".btn-char-del").forEach(s=>s.addEventListener("click",r=>$e(parseInt(s.dataset.idx))))}function J(){c.characters.push({name:"",role:"",personality:"",note:""}),L()}function $e(n){c.characters.splice(n,1),L()}function ke(){c.characters.pop(),L()}function Me(n,e){const a=c.characters[n],s=N(a.note)||O(a.name)||(Math.random()<.5?"M":"F");if(e==="name"){const r=s==="M"?H:s==="F"?P:ce;a.name=p(F)+p(r)}if(e==="role"&&(a.role=p(G)),e==="personality"&&(a.personality=p(_)),e==="note"){const r=s==="M"?q:D;a.note=p(r)}L()}function xe(n,e){c.characters[n][e]="",L()}function K(n){const e=Math.random()<.5?"M":"F",a=e==="M"?H:P,s=e==="M"?q:D;c.characters[n]={name:p(F)+p(a),role:p(G),personality:p(_),note:p(s)},L()}const Re=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],Te=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function O(n){if(!n)return null;const e=n.slice(-1);return Re.includes(e)?"M":Te.includes(e)?"F":null}function N(n){return n?n.includes("男性")||n.includes("男,")?"M":n.includes("女性")||n.includes("女,")?"F":null:null}function U(n,e){const a=c.characters[n];if(e==="name"){const s=O(a.name),r=N(a.note);if(s&&s!==r){const o=s==="M"?"男性":"女性";a.note?r?a.note=a.note.replace(/^(男性|女性)/,o):a.note=o+", "+a.note:a.note=p(s==="M"?q:D),L()}}else if(e==="note"){const s=N(a.note),r=O(a.name);if(s&&s!==r){const o=s==="M"?H:P;a.name=p(F)+p(o),L()}}}function V(){c.characters.length===0&&J(),c.characters.forEach((n,e)=>K(e))}function Oe(){const n=Math.floor(Math.random()*4)+1;c.characters=[];for(let e=0;e<n;e++)c.characters.push({name:"",role:"",personality:"",note:""}),K(e)}async function Ne(){const n=c.apiKey;if(!n){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const e=t("btn-today-news"),a=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="spinner"></span>取得中...';try{const s=k[0].value,r="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇条書きで出力してください。",{text:o}=await B(n,s,r),l=o.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim();t("theme-custom").value=l,c.themeSelected=null,c.themeCategory=null,t("theme-cat-chips")&&t("theme-cat-chips").querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),t("theme-sub-chips").innerHTML="",v("theme-custom-clear",l)}catch(s){alert("ニュース取得失敗: "+s.message)}finally{e.disabled=!1,e.innerHTML=a}}function Ge(){return{mode:c.mode||"",modeCustom:t("mode-custom").value.trim(),theme:c.themeSelected||"",themeCustom:t("theme-custom").value.trim(),characters:c.characters,genre:c.genre||"",genreCustom:t("genre-custom").value.trim(),worldview:c.worldview||"",worldviewCustom:t("worldview-custom").value.trim(),target:c.target||"",targetCustom:t("target-custom").value.trim(),era:c.era||"",eraCustom:t("era-custom").value.trim(),ending:c.ending||"",endingCustom:t("ending-custom").value.trim(),narration:c.narration||"",narrCustom:t("narr-custom").value.trim(),charCount:t("charcount-check").checked&&parseInt(t("char-count").value)||null,supplement:t("supplement").value.trim()}}async function W(){var g;const n=c.apiKey;if(!n){alert("APIキーを保存してください"),t("apikey").focus();return}const e=t("btn-generate"),a=t("output"),s=t("tag-row"),r=t("char-counter");e.disabled=!0,e.innerHTML='<span class="spinner"></span>構築中...',t("settings").classList.add("generating");const o=t("global-alert"),l=Ge(),{prompt:i,tags:m}=Ee(l);a.textContent="AIの思考を待っています...（しばらくお待ちください）",o&&(o.style.display="flex");try{const u=k[0].value;e.innerHTML='<span class="spinner"></span>Geminiに送信中...';const f=w=>{a.textContent=`フォールバック中: ${w}...`},{text:b,usedModel:C}=await B(n,u,i,f);e.innerHTML='<span class="spinner"></span>解析中...';const S=b.split(`
`);let h="",d=b;d=d.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),S[0]&&/^タイトル[:：]\s*/.test(S[0])&&(h=S[0].replace(/^タイトル[:：]\s*/,"").trim(),d=d.replace(/^タイトル[:：].*\n\n?/,"")),c.lastTitle=h,a.className="output-box text-selectable";const I=(h?"【"+h+`】

`:"")+d,A=`

Generated by Super FURU AI Story v${Ie}`;a.textContent=I+A,r.textContent=`${a.textContent.length.toLocaleString()} 字`;const y=((g=k.find(w=>w.value===C))==null?void 0:g.label)||C;s.innerHTML=`<span class="tag tag-gemini">Gemini</span><span class="tag tag-model">${E(y)}</span>`+m.map(w=>`<span class="tag">${E(w)}</span>`).join(""),t("btn-copy").classList.remove("hidden"),t("btn-download").classList.remove("hidden")}catch(u){a.className="output-box empty",a.innerHTML=`<div class="error-msg">エラー: ${E(u.message)}</div>`}finally{o&&(o.style.display="none")}t("settings").classList.remove("generating"),e.disabled=!1,e.textContent="ストーリー生成"}async function _e(){const n=p(T);c.mode=n.value,j(),t("mode-custom").value=n.label,v("mode-custom-clear",n.label),["theme","genre","worldview","target","era","ending","narr"].forEach(a=>{var s;return(s=t(`btn-rand-${a}`))==null?void 0:s.click()}),V(),t("supplement").value="",v("supplement-clear",""),t("settings").scrollTo({top:0,behavior:"smooth"}),await new Promise(a=>setTimeout(a,800)),W()}function Fe(){if(!confirm("全ての設定（APIキー以外）をリセットしますか？"))return;c.mode="4koma";const n=["theme","genre","worldview","target","era","ending","narr"];n.forEach(e=>{c[e]=null;const a=e==="theme"?"themeCategory":e==="narr"?"narrCategory":e+"Category";c[a]=null}),c.characters=[],c.lastTitle="",j(),t("mode-custom").value="",v("mode-custom-clear",""),n.forEach(e=>{t(`${e}-cat-chips`)&&t(`${e}-cat-chips`).querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),t(`${e}-sub-chips`)&&(t(`${e}-sub-chips`).innerHTML=""),t(`${e}-custom`)&&(t(`${e}-custom`).value=""),v(`${e}-custom-clear`,"")}),L(),t("supplement").value="",v("supplement-clear",""),t("charcount-check").checked=!1,t("charcount-wrap").classList.add("hidden"),t("char-count").value="400",t("output").className="output-box empty",t("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. Gemini APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',t("tag-row").innerHTML="",t("char-counter").textContent="0 字",t("btn-copy").classList.add("hidden"),t("btn-download").classList.add("hidden"),t("settings").scrollTo({top:0,behavior:"smooth"})}function He(){t("key-save").addEventListener("click",Ae),t("key-edit").addEventListener("click",Ce),t("btn-reload").addEventListener("click",()=>location.reload()),t("btn-all-random").addEventListener("click",_e),t("btn-reset-all").addEventListener("click",Fe),t("btn-generate").addEventListener("click",W),t("btn-copy").addEventListener("click",()=>{navigator.clipboard.writeText(t("output").textContent).then(()=>{t("btn-copy").textContent="✅ コピー完了",setTimeout(()=>t("btn-copy").textContent="📋 コピー",2e3)})}),t("btn-download").addEventListener("click",()=>{const n=t("output").textContent,e=new Blob([n],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(e),a.download=(c.lastTitle||"story")+".txt",a.click()}),Y(),j(),$({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:ee,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),$({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:te,originals:ie,stateKey:"genre",stateCatKey:"genreCategory"}),$({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:ne,originals:he,stateKey:"worldview",stateCatKey:"worldviewCategory"}),$({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:ae,originals:pe,stateKey:"target",stateCatKey:"targetCategory"}),$({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:re,originals:de,stateKey:"era",stateCatKey:"eraCategory"}),$({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:se,originals:ue,stateKey:"ending",stateCatKey:"endingCategory"}),$({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:oe,originals:me,stateKey:"narration",stateCatKey:"narrCategory"}),we(),t("btn-today-news").addEventListener("click",Ne),t("btn-add-char").addEventListener("click",J),t("btn-remove-char").addEventListener("click",ke),t("btn-rand-chars-content").addEventListener("click",V),t("btn-rand-chars-all").addEventListener("click",Oe),L()}document.addEventListener("DOMContentLoaded",He);
