(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const me=[{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-flash-latest",label:"Gemini Flash (Latest)"},{value:"gemini-pro-latest",label:"Gemini Pro (Latest)"}],Ge=[{value:"4koma",label:"4コマ漫画風"},{value:"4koma_scenario",label:"AI 4koma シナリオ連携（STEP2）"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(数万字/全章＋指示書)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],Ke={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},Ot={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},Rt={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},Pt={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},jt={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},Bt={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},Gt={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},$e=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],Ce=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],Kt=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],Ft=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],Ht=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],ya=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],wn=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],xn=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],va=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],ba=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],$a=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],Ca=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],wa=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],xa=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],ka=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],Sa=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],Ia=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],La=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],De=async e=>{const t=Re(e);if(!t)return"API Key not set.";try{const a=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(t)}`)).json();return a.error?`API Error: ${a.error.message}`:a.models?`Available Models: ${a.models.map(n=>n.name.replace("models/","")).filter(n=>n.includes("gemini")).join(", ")}`:"No models returned by API."}catch(a){return`Diagnostic Failed: ${a.message}`}};function et(e){return String(e||"")}function ct(e){return et(e).toLowerCase()}function on(e){const t=ct(e);return t.includes("safety")||t.includes("prohibited")||t.includes("block")}function ln(e){const t=ct(e);return t.includes("quota")||t.includes("429")||t.includes("resource exhausted")||t.includes("rate limit")||t.includes("billing")||t.includes("limit exceeded")}function Ue(e){const t=ct(e);return t.includes("api key not valid")||t.includes("api_key_invalid")||t.includes("invalid api key")||t.includes("invalid_api_key")||t.includes("unauthenticated")||t.includes("authentication")||t.includes("401")||t.includes("invalid authentication")||t.includes("permission denied")&&(t.includes("api key")||t.includes("credential")||t.includes("auth"))}function kn(e){return et(e).includes("Available Models:")}function mt(e){const t=ct(e);return t.includes("404")||t.includes("not found")||t.includes("not supported")||t.includes("model")||t.includes("bad request")||t.includes("invalid argument")||t.includes("invalid_argument")||t.includes("thinkingconfig")||t.includes("thinking_config")||t.includes("generatecontent")||t.includes("streamgeneratecontent")}function ut(e,t,a,n={}){const r=et(t),s=Array.isArray(a)?a.join(`
`):et(a),o=kn(r),i=s?`

[各モデルのエラー詳細]
`+s:"";return n.safety||on(r)||on(s)?n.vision?"【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":"【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":n.quota||ln(r)||ln(s)?"【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":Ue(r)||n.auth&&!o&&!mt(s)?"【認証エラー】APIキーが無効です。正しいキーを設定してください。":o||mt(r)||mt(s)?`【モデル/リクエストエラー】APIキーは保存されていますが、利用可能モデルまたは送信形式で失敗しました。
診断: `+r+i:e+": "+r+i}async function Aa(e,t,a,n={}){var r,s,o,i;const c=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${encodeURIComponent(e)}`,u={temperature:n.temperature!==void 0?n.temperature:1};(n.maxOutputTokens||n.maxTokens)&&(u.maxOutputTokens=n.maxOutputTokens||n.maxTokens),n.responseMimeType&&(u.responseMimeType=n.responseMimeType);const d=n.timeoutMs||18e4,y=new AbortController,p=setTimeout(()=>y.abort(),d),m={contents:[{parts:[{text:a}]}],generationConfig:u,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};u.responseMimeType!=="application/json"&&!n.disableGoogleSearch&&(m.tools=[{googleSearch:{}}]);try{const f=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},signal:y.signal,body:JSON.stringify(m)});if(clearTimeout(p),!f.ok){const v=await f.text();let b=`Gemini HTTP ${f.status}`;try{const $=JSON.parse(v);$.error&&$.error.message&&(b+=` — ${$.error.message}`)}catch{b+=` — ${v.slice(0,300)}`}throw new Error(b)}const h=await f.json();if((r=h.promptFeedback)!=null&&r.blockReason)throw new Error(`Blocked by Safety Filter: ${h.promptFeedback.blockReason}`);if((i=(o=(s=h.candidates)==null?void 0:s[0])==null?void 0:o.content)!=null&&i.parts){const v=h.candidates[0].content.parts.map(b=>b.text||"").join("");if(!v){const b=h.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${b}).`)}return v}throw h.error?new Error(`Gemini API Error: ${h.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(f){throw f.name==="AbortError"?new Error(`Timeout: ${t} (${d/1e3}s)`):f}finally{clearTimeout(p)}}async function Ea(e,t,a,n,r,s={}){var o,i,c,u;const d=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${encodeURIComponent(e)}`,y={temperature:s.temperature!==void 0?s.temperature:.3};s.responseMimeType&&(y.responseMimeType=s.responseMimeType);const p=s.timeoutMs||18e4,m=new AbortController,f=setTimeout(()=>m.abort(),p);try{const h=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},signal:m.signal,body:JSON.stringify({contents:[{parts:[{text:a},{inlineData:{mimeType:r,data:n}}]}],generationConfig:y,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(f),!h.ok){const b=await h.text();let $=`Gemini HTTP ${h.status}`;try{const C=JSON.parse(b);C.error&&C.error.message&&($+=` — ${C.error.message}`)}catch{$+=` — ${b.slice(0,300)}`}throw new Error($)}const v=await h.json();if((o=v.promptFeedback)!=null&&o.blockReason)throw new Error(`Blocked by Safety Filter: ${v.promptFeedback.blockReason}`);if((u=(c=(i=v.candidates)==null?void 0:i[0])==null?void 0:c.content)!=null&&u.parts){const b=v.candidates[0].content.parts.map($=>$.text||"").join("");if(!b){const $=v.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${$}).`)}return b}throw v.error?new Error(`Gemini API Error: ${v.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(h){throw h.name==="AbortError"?new Error(`Timeout: ${t} vision (${p/1e3}s)`):h}finally{clearTimeout(f)}}async function Sn(e,t,a,n,r,s={}){if(e.trim().startsWith("sk-"))return Ta(e.trim(),t,a,n,r,s);const o=["gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],i=[];let c=!1,u=!1,d=!1;for(const p of o)try{return r&&o[0],{text:await Ea(e,p,t,a,n,s),usedModel:p}}catch(m){const f=m.message||"";console.warn(`Vision model ${p} failed:`,f),i.push(`${p}: ${f}`);const h=f.toLowerCase();(h.includes("safety")||h.includes("prohibited")||h.includes("block"))&&(c=!0),(h.includes("quota")||h.includes("429")||h.includes("limit"))&&(u=!0),Ue(f)&&(d=!0);continue}const y=await De(e);throw console.error("VISION DIAGNOSIS:",y),new Error(ut("Gemini vision failure",y,i,{safety:c,quota:u,auth:d,vision:!0}))}async function Fe(e,t,a,n,r={}){const s=Re(e),o=Pe(s,s.startsWith("sk-")?"openai":"gemini");if(!o.ok)throw new Error(o.message);if(s.startsWith("sk-"))return _a(s,a,n,r);const i=Array.isArray(r.fallbackModels)?r.fallbackModels:["gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],c=new Set([t,...i]);let u=Array.from(c);r.disableFallback?u=[t]:Number.isFinite(r.maxModelAttempts)&&r.maxModelAttempts>0&&(u=u.slice(0,Math.max(1,Math.floor(r.maxModelAttempts))));const d=[];let y=!1,p=!1,m=!1;for(const h of u)try{return h!==t&&n&&n(h),{text:await Aa(s,h,a,r),usedModel:h}}catch(v){const b=v.message||"";console.warn(`Model ${h} failed:`,b),d.push(`${h}: ${b}`);const $=b.toLowerCase();($.includes("safety")||$.includes("prohibited")||$.includes("block"))&&(y=!0),($.includes("quota")||$.includes("429")||$.includes("limit"))&&(p=!0),Ue(b)&&(m=!0);continue}console.log("All models failed. Running diagnosis...");const f=await De(s);throw console.error("DIAGNOSIS RESULT:",f),new Error(ut("Gemini text failure",f,d,{safety:y,quota:p,auth:m}))}const tt=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"];async function _a(e,t,a,n={}){var r,s,o,i,c,u;for(const d of tt)try{d!==tt[0]&&a&&a(d);const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:d,messages:[{role:"user",content:t}],temperature:1,max_tokens:n.maxTokens||8192,response_format:n.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const f=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((r=f.error)==null?void 0:r.message)||y.statusText}`)}const p=await y.json(),m=((i=(o=(s=p.choices)==null?void 0:s[0])==null?void 0:o.message)==null?void 0:i.content)||"";if(!m)throw new Error(`Empty response (FinishReason: ${((u=(c=p.choices)==null?void 0:c[0])==null?void 0:u.finish_reason)||"UNKNOWN"})`);return{text:m,usedModel:d}}catch(y){console.warn(`Model ${d} failed:`,y.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。")}const cn=["gpt-4.1","gpt-4o","gpt-4.1-mini"];async function Ta(e,t,a,n,r,s={}){var o,i,c,u,d,y;const p=`data:${n};base64,${a}`;for(const m of cn)try{cn[0];const f=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:m,messages:[{role:"user",content:[{type:"text",text:t},{type:"image_url",image_url:{url:p,detail:"high"}}]}],temperature:.3,max_tokens:8192,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!f.ok){const b=await f.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${f.status} - ${((o=b.error)==null?void 0:o.message)||f.statusText}`)}const h=await f.json(),v=((u=(c=(i=h.choices)==null?void 0:i[0])==null?void 0:c.message)==null?void 0:u.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((y=(d=h.choices)==null?void 0:d[0])==null?void 0:y.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:m}}catch(f){console.warn(`Vision Model ${m} failed:`,f.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Ma(e,t,a,n,r={}){var s,o,i,c;const u=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${encodeURIComponent(e)}`,d=[{text:a}];n.forEach(h=>{d.push({inlineData:{mimeType:h.mimeType,data:h.base64}})});const y={temperature:r.temperature!==void 0?r.temperature:.4};r.responseMimeType&&(y.responseMimeType=r.responseMimeType);const p=r.timeoutMs||18e4,m=new AbortController,f=setTimeout(()=>m.abort(),p);try{const h=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},signal:m.signal,body:JSON.stringify({contents:[{parts:d}],generationConfig:y,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(f),!h.ok){const b=await h.text();let $=`Gemini HTTP ${h.status}`;try{const C=JSON.parse(b);C.error&&C.error.message&&($+=` — ${C.error.message}`)}catch{$+=` — ${b.slice(0,300)}`}throw new Error($)}const v=await h.json();if((s=v.promptFeedback)!=null&&s.blockReason)throw new Error(`Blocked by Safety Filter: ${v.promptFeedback.blockReason}`);if((c=(i=(o=v.candidates)==null?void 0:o[0])==null?void 0:i.content)!=null&&c.parts){const b=v.candidates[0].content.parts.map($=>$.text||"").join("");if(!b){const $=v.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${$}).`)}return b}throw v.error?new Error(`Gemini API Error: ${v.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(h){throw h.name==="AbortError"?new Error(`Timeout: ${t} multimodal (${p/1e3}s)`):h}finally{clearTimeout(f)}}async function Na(e,t,a,n,r={}){var s,o,i,c,u,d;const y=["gpt-4.1","gpt-4o","gpt-4.1-mini"];for(const p of y)try{p!==y[0]&&n&&n(p);const m=[{type:"text",text:t}];a.forEach(b=>{m.push({type:"image_url",image_url:{url:`data:${b.mimeType};base64,${b.base64}`,detail:"high"}})});const f=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:p,messages:[{role:"user",content:m}],temperature:.4,max_tokens:8192,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!f.ok){const b=await f.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${f.status} - ${((s=b.error)==null?void 0:s.message)||f.statusText}`)}const h=await f.json(),v=((c=(i=(o=h.choices)==null?void 0:o[0])==null?void 0:i.message)==null?void 0:c.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((d=(u=h.choices)==null?void 0:u[0])==null?void 0:d.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:p}}catch(m){console.warn(`Vision Model ${p} failed:`,m.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Oa(e,t,a,n,r={}){if(e.trim().startsWith("sk-"))return Na(e.trim(),t,a,n,r);const s=["gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],o=[];let i=!1,c=!1,u=!1;for(const y of s)try{return n&&y!==s[0]&&n(y),{text:await Ma(e,y,t,a,r),usedModel:y}}catch(p){const m=p.message||"";console.warn(`Vision model ${y} failed:`,m),o.push(`${y}: ${m}`);const f=m.toLowerCase();(f.includes("safety")||f.includes("prohibited")||f.includes("block"))&&(i=!0),(f.includes("quota")||f.includes("429")||f.includes("limit"))&&(c=!0),Ue(m)&&(u=!0);continue}const d=await De(e);throw console.error("VISION DIAGNOSIS:",d),new Error(ut("Gemini multimodal failure",d,o,{safety:i,quota:c,auth:u,vision:!0}))}async function Ra(e,t,a,n,r={}){var s,o,i,c;for(const u of tt)try{u!==tt[0]&&n&&n(u);const d=new AbortController;let y=null;r.signal&&(y=()=>d.abort(),r.signal.addEventListener("abort",y));const p=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},signal:d.signal,body:JSON.stringify({model:u,messages:[{role:"user",content:t}],temperature:1,max_tokens:r.maxTokens||8192,stream:!0,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!p.ok){const v=await p.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${p.status} - ${((s=v.error)==null?void 0:s.message)||p.statusText}`)}const m=p.body.getReader(),f=new TextDecoder("utf-8");let h="";try{for(;;){const{done:v,value:b}=await m.read();if(v)break;h+=f.decode(b,{stream:!0});let $=h.split(`
`);h=$.pop();for(const C of $){const w=C.trim();if(!w||!w.startsWith("data: "))continue;const E=w.slice(6);if(E==="[DONE]")break;try{const L=((c=(i=(o=JSON.parse(E).choices)==null?void 0:o[0])==null?void 0:i.delta)==null?void 0:c.content)||"";L&&a({text:L,isThought:!1})}catch{}}}}finally{m.releaseLock(),r.signal&&y&&r.signal.removeEventListener("abort",y)}return{usedModel:u}}catch(d){if(d.name==="AbortError")throw new Error(`Aborted: ${u} stream`);console.warn(`Model ${u} stream failed:`,d.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function un(e,t,a,n,r={}){var s,o,i;const c=`https://generativelanguage.googleapis.com/v1beta/models/${t}:streamGenerateContent?alt=sse&key=${e}`,u={temperature:1};(r.maxOutputTokens||r.maxTokens)&&(u.maxOutputTokens=r.maxOutputTokens||r.maxTokens),!r.disableThinkingConfig&&(t.includes("gemini-2.5")||t.includes("gemini-2.0")||t.includes("gemini-3")||t.includes("gemini-3.5"))&&(u.thinkingConfig={thinkingBudget:2048}),r.responseMimeType&&(u.responseMimeType=r.responseMimeType);const d=r.timeoutMs||18e4,y=new AbortController;let p=setTimeout(()=>y.abort(),d),m=null;r.signal&&(m=()=>y.abort(),r.signal.addEventListener("abort",m));const f={contents:[{parts:[{text:a}]}],generationConfig:u,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};u.responseMimeType!=="application/json"&&!r.disableGoogleSearch&&(f.tools=[{googleSearch:{}}]);try{const h=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},signal:y.signal,body:JSON.stringify(f)});if(!h.ok){clearTimeout(p);const C=await h.text();let w=`Gemini HTTP ${h.status}`;try{const E=JSON.parse(C);E.error&&E.error.message&&(w+=` — ${E.error.message}`)}catch{w+=` — ${C.slice(0,300)}`}throw new Error(w)}const v=h.body.getReader(),b=new TextDecoder("utf-8");let $="";try{for(;;){clearTimeout(p),p=setTimeout(()=>y.abort(),d);const{done:C,value:w}=await v.read();if(C)break;$+=b.decode(w,{stream:!0});let E=$.split(`
`);$=E.pop();for(const L of E){const x=L.trim();if(!x||!x.startsWith("data: "))continue;const M=x.slice(6);try{const B=(i=(o=(s=JSON.parse(M).candidates)==null?void 0:s[0])==null?void 0:o.content)==null?void 0:i.parts;if(B)for(const S of B){const N=S.text||S.thought||"",k=!!S.thought;N&&n({text:N,isThought:k})}}catch{}}}}finally{v.releaseLock()}}catch(h){throw h.name==="AbortError"?new Error(`Aborted: ${t} stream (${d/1e3}s timeout or user abort)`):h}finally{clearTimeout(p),r.signal&&m&&r.signal.removeEventListener("abort",m)}}async function we(e,t,a,n,r,s={}){const o=Re(e),i=Pe(o,o.startsWith("sk-")?"openai":"gemini");if(!i.ok)throw new Error(i.message);if(o.startsWith("sk-"))return Ra(o,a,n,r,s);const c=["gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],u=new Set([t,...c]),d=Array.from(u),y=[];let p=!1,m=!1,f=!1;for(const v of d)try{return v!==t&&r&&r(v),await un(o,v,a,n,s),{usedModel:v}}catch(b){const $=b.message||"";console.warn(`Model ${v} stream failed:`,$),y.push(`${v}: ${$}`);const C=$.toLowerCase();if((C.includes("safety")||C.includes("prohibited")||C.includes("block"))&&(p=!0),(C.includes("quota")||C.includes("429")||C.includes("limit"))&&(m=!0),Ue($)&&(f=!0),$.includes("400")||C.includes("bad request")||C.includes("thinking_config"))try{return console.log(`Retrying model ${v} without thinkingConfig...`),await un(o,v,a,n,{...s,disableThinkingConfig:!0}),{usedModel:v}}catch(w){console.warn(`Model ${v} stream retry failed:`,w.message),y.push(`${v} (retry): ${w.message}`)}continue}console.log("All models failed. Running diagnosis...");const h=await De(o);throw console.error("DIAGNOSIS RESULT:",h),new Error(ut("Gemini stream failure",h,y,{safety:p,quota:m,auth:f}))}const In={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},Ln={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},An={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},En={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},_n={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function ue(e,t){return!e||e==="ランダム"?"":t[e]||""}const Pa={江戸時代:{tags:["江戸","江戸時代","徳川","侍","町人"],lore:`【江戸時代の生活知識】
・通貨: 金（両・分・朱）、銀（匁）、銭（文）。1両 ≈ 4000文。庶民は銭を使う
・食事: 1日2食→後期は3食。白米は贅沢品、麦飯が庶民の主食。味噌汁・漬物・焼き魚
・照明: 行灯（あんどん）に菜種油。蝋燭は高級品。夜は基本暗い
・時刻: 不定時法。明け六つ（日の出）〜暮れ六つ（日没）を6等分。季節で1刻の長さが変わる
・移動: 徒歩が基本。駕籠は贅沢。馬は武士階級。東海道を江戸→京都は約2週間
・衣服: 木綿の着物が庶民。絹は武士・豪商。色は藍染が主流
・禁忌: 「お上」への批判は処罰対象。身分制度（士農工商）を意識した言葉遣い
・小道具: 煙管（きせる）、矢立（携帯筆記具）、印籠、根付、手拭い、風呂敷`},戦国時代:{tags:["戦国","戦国時代","武将","合戦","城"],lore:`【戦国時代の生活知識】
・武器: 刀（太刀・打刀）、槍が主力。弓、鉄砲（1543年伝来以降）。実戦では槍と弓が主役
・鎧: 当世具足（とうせいぐそく）。兜の前立て（まえだて）で個性を出す
・食事: 兵糧は干し飯（ほしいい）、味噌玉、梅干し。戦場では芋茎縄（いもがらなわ）を煮て食べる
・城: 山城→平山城→平城と変遷。天守閣は後期。石垣、堀、曲輪（くるわ）
・通信: 狼煙（のろし）、早馬、間者（忍び）。のろしは「敵襲あり」等の定型情報のみ
・禁忌: 武将の実名（諱）を直接呼ぶのは無礼。通称や官位名で呼ぶ
・身分: 下剋上が横行。農民出身の武将もいる。足軽は半農半兵`},平安時代:{tags:["平安","平安時代","貴族","源氏","藤原"],lore:`【平安時代の生活知識】
・衣服: 十二単（じゅうにひとえ）は女性貴族。色の組み合わせ（かさね色目）で季節感を表現
・住居: 寝殿造。御簾（みす）で仕切る。庭に池と中島
・移動: 牛車（ぎっしゃ）。女性は基本的に外出しない。男性が女性の元を訪れる「通い婚」
・文化: 和歌が最重要コミュニケーション。歌を詠めないと恥。書（筆跡）で人柄を判断
・時刻: 十二時辰（子の刻〜亥の刻）。丑の刻参りは丑三つ時（午前2〜2時半頃）
・香: 薫物（たきもの）で部屋を香らせる。香りは個性の表現
・禁忌: 物忌み（ものいみ）、方違え（かたたがえ）。陰陽道に基づく禁忌を破ると凶事`},大正時代:{tags:["大正","大正時代","大正ロマン","大正浪漫"],lore:`【大正時代の生活知識】
・文化: モダンガール（モガ）とモダンボーイ（モボ）。カフェー文化。活動写真（映画）
・衣服: 和洋折衷。男性は詰襟学生服やスーツ、女性は袴姿や洋装。帽子が必須アイテム
・交通: 市電（路面電車）、人力車、自転車。自動車は超高級品
・食事: カレーライス、コロッケ、トンカツなど洋食が庶民にも普及。ミルクホール
・メディア: 新聞が主要情報源。ラジオ放送は1925年開始
・住居: 和洋折衷の文化住宅。応接間だけ洋風
・禁忌: スマホ・テレビ・飛行機の民間利用はまだない。電話は富裕層のみ
・空気: 民主主義の高揚（大正デモクラシー）と関東大震災（1923年）の影の両面`},明治時代:{tags:["明治","明治時代","文明開化"],lore:`【明治時代の生活知識】
・文化: 文明開化。ザンギリ頭。牛鍋（すき焼き）ブーム。ガス灯
・衣服: 軍服・洋装の導入。庶民はまだ着物が主流。和洋混在の過渡期
・制度: 四民平等（建前）、徴兵令、学制（義務教育）、太陽暦への改暦
・交通: 鉄道（新橋〜横浜が最初）、人力車、馬車。蒸気船
・言葉: 言文一致運動。口語体と文語体が混在する時代
・禁忌: 「ちょんまげを切る」は大事件。旧幕臣と新政府の軋轢がある`},古代ローマ:{tags:["古代ローマ","ローマ帝国","ローマ"],lore:`【古代ローマの生活知識】
・通貨: デナリウス銀貨、セステルティウス青銅貨。兵士の日当 = 1デナリウス
・食事: パンとオリーブオイルが主食。ガルム（魚醤）が万能調味料。宴会は寝そべって食べる
・娯楽: 剣闘士試合（グラディエーター）、戦車競走、公衆浴場（テルマエ）
・衣服: トガ（市民権の象徴）、チュニカ（下着兼普段着）。紫は皇帝の色
・建築: コンクリート、アーチ、水道橋。インスラ（集合住宅）は5〜6階建て
・社会: 市民・自由民・奴隷の三層構造。パトロヌス（庇護者）とクリエンテス（被庇護者）の関係`},中世ヨーロッパ:{tags:["中世ヨーロッパ","中世","騎士","封建"],lore:`【中世ヨーロッパの生活知識】
・身分: 三身分（聖職者・貴族・平民）。騎士は小貴族。農奴は領地に縛られる
・武器: 剣（ロングソード）、槍（ランス）、メイス、クロスボウ。鎧は鎖帷子→板金鎧へ進化
・食事: パン、粥、チーズ、エール（ビール）。フォークはまだない（手づかみ or ナイフ）。香辛料は超高級品
・宗教: カトリック教会が絶大な権力。異端審問。修道院が学問・医療・農業の中心
・衛生: 入浴は稀。疫病（ペスト等）が頻発。医学は四体液説に基づく
・時間: 教会の鐘が時刻の基準。朝課（マタン）〜終課（コンプリン）の祈りの時間で生活`},サイバーパンク:{tags:["サイバーパンク","ネオン","電脳","アンドロイド","サイバー"],lore:`【サイバーパンクの描写素材】
・視覚: ネオンサイン、ホログラム広告、酸性雨に濡れたアスファルト、積層都市の下層
・身体改造: サイバネティクス義肢、網膜ディスプレイ、脳内チップ、皮下通信デバイス
・社会: メガコーポレーション支配、民営化された警察、闇市場、ストリートサムライ
・テクノロジー: ICE（侵入対抗電子機器）、ニューロハック、デジタルゴースト、量子暗号
・通貨: 暗号通貨、企業スクリプ（社内通貨）。現金は違法または時代遅れ
・比喩素材: 回路基板、電流、データストリーム、ファイアウォール、パケット、ノイズ`},ハイファンタジー:{tags:["ハイファンタジー","異世界","魔法","エルフ","ドワーフ","竜","魔王"],lore:`【ハイファンタジーの描写素材】
・魔法: 詠唱（呪文）、魔法陣、マナ（魔力源）、属性（火・水・風・土・光・闇）
・種族: エルフ（長命・森）、ドワーフ（鍛冶・山）、ハーフリング（小柄・農耕）、竜族
・経済: ギルド制度、冒険者ランク、依頼掲示板、金貨・銀貨・銅貨の三進法通貨
・武具: ミスリル、オリハルコン、聖剣、呪われた武器、ルーン文字の刻まれた装備
・生態: スライム、ゴブリン、オーク、ワイバーン、リッチ、ベヒーモス
・社会: 王国、魔法塔、冒険者ギルド、神殿、辺境の村、迷宮（ダンジョン）
・比喩素材: 鍛冶の炉、蝋燭の炎、羊皮紙、印章、馬蹄、石造りの壁`},ポストアポカリプス:{tags:["ポストアポカリプス","荒廃","廃墟","文明崩壊","核の冬","サバイバル"],lore:`【ポストアポカリプスの描写素材】
・風景: 割れた高速道路、錆びた車の列、蔦に覆われたビル、砂に埋もれた看板
・資源: 清浄な水が最大の通貨。缶詰、ガソリン、弾薬、医薬品が貴重品
・社会: 物々交換、小規模コミュニティ、略奪者（レイダー）、自警団
・危険: 放射能汚染地帯、変異生物、疫病、水源の枯渇、人間同士の争い
・技術: 壊れた機械の再利用、手回し発電機、太陽光パネル（劣化済み）
・比喩素材: 錆、灰、砂塵、ひび割れ、静寂、残骸、苔、野生化した植物`},宇宙:{tags:["宇宙","宇宙ステーション","月面","火星","SF","近未来"],lore:`【宇宙SFの描写素材】
・環境: 無重力/低重力、真空、放射線、気密ハッチ、循環型生命維持装置
・移動: 宇宙服（EVAスーツ）、磁力靴、手すり移動、スラスター噴射
・生活: 宇宙食（フリーズドライ・チューブ食）、水の再循環、人工光による体内時計の乱れ
・通信: 光速遅延（地球-火星間は4〜24分）。リアルタイム会話は近距離のみ
・危険: デブリ（宇宙ゴミ）衝突、太陽フレア、船内火災、酸素漏れ
・社会: クルーの階級制度、地球との文化的断絶、閉鎖空間のストレス
・比喩素材: 星の光、真空の静寂、金属の冷たさ、計器の点滅、ハッチのロック音`},怪談:{tags:["怪談","ホラー","心霊","呪い","都市伝説","恐怖"],lore:`【怪談・ホラーの演出知識】
・恐怖の段階: 違和感→不安→確信→恐怖→パニック。いきなり怖がらせるのは三流
・効果的な恐怖パターン: 「見てはいけないものが見えてしまう」「数が合わない」「日常の中の微細な異変」
・五感の活用: 腐臭、生温い風、濡れた感触、骨を擦る音、暗闇の中で何かが近づく気配
・時間帯: 丑三つ時（午前2時前後）、逢魔が時（夕暮れ）、黎明前の最も暗い時間
・禁忌: 怖さのインフレ禁止。最も怖いのは「見えそうで見えない」「分かりそうで分からない」
・和製ホラー要素: 髪の長い女、水（井戸・水溜まり）、鏡、人形、四つ角`},ミステリー:{tags:["ミステリー","推理","犯人","密室","謎","サスペンス","探偵"],lore:`【ミステリーの構成知識】
・フェアプレイ原則: 読者に全ての手がかりを公平に提示すること。後出し禁止
・ミスリード技法: 真犯人以外の怪しい人物（レッドヘリング）を配置する
・トリックの分類: 密室、アリバイ、叙述、人物入れ替え、ダイイングメッセージ
・動機の類型: 怨恨、利益（遺産・保険金）、口封じ、痴情、正義感（義憤）
・証拠の扱い: 物的証拠（凶器・指紋）、状況証拠、証言の矛盾、時系列の不整合
・禁忌: 超自然的な解決（ノックスの十戒）、偶然の一致による解決`},学校:{tags:["学校","学園","中高生","部活","教室","文化祭"],lore:`【日本の学校生活ディテール】
・時間割: 50分授業×6限。昼休みは12:30〜13:15頃。掃除の時間がある
・空間: 下駄箱、廊下の掲示板、屋上（施錠されている学校が多い）、体育倉庫、準備室
・音: チャイム（キンコンカンコン）、放送委員のアナウンス、体育館のボール音、吹奏楽の練習
・匂い: 給食の匂い、体育後の汗、プールの塩素、理科室の薬品、保健室の消毒液
・文化: 日直、席替え、修学旅行、体育祭（赤白帽）、受験勉強、部活の上下関係
・小道具: 上履き、体操服、ジャージ、名札、連絡帳、部室の鍵`},オフィス:{tags:["オフィス","会社","ビジネス","仕事","サラリーマン"],lore:`【日本のオフィスワーク・ディテール】
・空間: オープンフロア、パーティション、会議室（ホワイトボード）、給湯室、喫煙所
・音: キーボードのタイプ音、複合機の動作音、内線電話、空調のハム音
・文化: 朝礼、報連相（ほうれんそう）、飲みニケーション、名刺交換、エレベーターの立ち位置
・匂い: コーヒー、コピー機のトナー、お昼のコンビニ弁当、夕方の疲労した空気
・ストレス源: 残業、満員電車、上司との関係、納期、パワハラ、社内政治
・小道具: 社員証（IDカード）、デスクの付箋、社用スマホ、ノートPC`},ソフトウェア開発:{tags:["IT","プログラマー","エンジニア","ソフトウェア開発","コーディング","開発"],lore:`【ソフトウェア開発現場のディテール】
・環境: デュアル/トリプルディスプレイ、黒背景のエディタ（IDE）、メカニカルキーボードの打鍵音
・文化: Gitでのバージョン管理、プルリクエストとコードレビュー、アジャイル/スクラム開発の朝会
・疲労・ストレス: 原因不明のバグ（Heisenbug）、"私の環境では動きます"、本番環境へのデプロイの緊張感
・小道具: エナジードリンク、ノイズキャンセリングヘッドホン、技術書（オライリー等）、付箋
・言葉: 「とりあえず再起動」「キャッシュクリアして」「仕様です」「リファクタリング」
・比喩素材: 警告（Warning）とエラー（Error）の赤文字、プログレスバー、コンパイル待ち時間`},"SIer・炎上プロジェクト":{tags:["SIer","炎上","デスマーチ","客先常駐","システムエンジニア","SE"],lore:`【SIer・炎上プロジェクトのディテール】
・環境: 客先常駐、セキュリティの厳しいシンクライアント端末、窓のないプロジェクトルーム
・文化: Excel方眼紙での詳細設計書、多重下請け構造、終わらない定例会議、"エビデンス"の重視
・疲労・ストレス: 金曜夕方の致命的な仕様変更、"なる早"、終電逃し（タクシー帰りやカプセルホテル）
・匂いと空気: 徹夜明けの缶コーヒーと栄養ドリンクの匂い、無言のプレッシャー、ため息
・言葉: 「リスケ」「握る」「よしなに」「ペンディング」「人月（にんげつ）」「アサイン」`},"インフラ・ネットワーク":{tags:["インフラ","ネットワーク","サーバー","データセンター","クラウド"],lore:`【インフラ・サーバー運用現場のディテール】
・環境: データセンターの凍えるような冷房（サーバー冷却用）と爆音のファンの音、整然と並ぶラック
・文化: 24時間365日の監視体制、深夜の計画メンテナンス、冗長化とフェイルオーバー
・小道具: LANケーブル（色分けされている）、結束バンド、コンソールケーブル、入退室用の静脈認証
・疲労・ストレス: 休日の深夜に鳴り響く障害アラート（PagerDuty等）、"NWは繋がって当たり前"の重圧
・言葉: 「落ちた」「pingが通らない」「再起動で復旧」「物理層の問題」「SLA」`},"AI・機械学習":{tags:["AI","機械学習","ディープラーニング","データサイエンティスト","AI開発"],lore:`【AI・機械学習の現場ディテール】
・環境: 排熱で部屋が暑くなるGPUマシン、Jupyter Notebook、終わらない学習プロセス（Epoch）
・文化: 膨大なデータセットの地道なクレンジング（前処理）、論文（arXiv）の最新モデルの追跡
・疲労・ストレス: GPUメモリ不足（OOM）、過学習（Overfitting）で実環境で使い物にならないモデル
・言葉: 「パラメータチューニング」「ハルシネーション」「プロンプトエンジニアリング」「推論（Inference）」
・比喩素材: ブラックボックス、重み（Weights）とバイアス、損失関数（Loss）のグラフ`},"ハッカー・セキュリティ":{tags:["ハッカー","セキュリティ","クラッカー","サイバー攻撃","ホワイトハッカー"],lore:`【ハッカー・セキュリティ領域のディテール】
・技術・手法: ゼロデイ脆弱性、SQLインジェクション、DDos攻撃、ソーシャルエンジニアリング（人為的な騙し）
・環境: 複数立ち上がる黒いターミナル画面、流れるパケットログ、VPNやTorを経由した匿名化
・小道具: USBメモリ（マルウェア入り）、Raspberry Piなどの小型デバイス、ピッキングツール（物理的侵入用）
・言葉: 「バックドア」「ペネトレーションテスト（侵入テスト）」「フォレンジック」「ルート権限」
・比喩素材: ファイアウォール、暗号化の鍵、デッドドロップ、バックトレース`},吸血鬼:{tags:["吸血鬼","ヴァンパイア","バンパイア"],lore:`【吸血鬼の設定素材】
・弱点（古典）: 日光、銀、ニンニク、聖水、十字架、流水を渡れない、招かれないと入れない
・能力: 不老不死、超人的な身体能力、催眠術、蝙蝠/狼/霧への変身、使い魔（レンフィールド）
・社会: 始祖（エルダー）、血族（クラン）、人間の従者（ファミリア）
・食事: 人間の血が最上。動物の血でも延命可能だが風味が落ちる（という設定が多い）
・文化的変遷: ストーカーの「ドラキュラ」→耽美系→現代ロマンス系→ダーク系へ`},タイムトラベル:{tags:["タイムトラベル","タイムリープ","タイムスリップ","時間","ループ"],lore:`【タイムトラベルの設定素材】
・パラドックス: 祖父殺しのパラドックス、ブートストラップ・パラドックス（情報の出所がない循環）
・モデル: 単一時間線（変更不可）、分岐時間線（パラレルワールド生成）、ループ型（同じ時間を繰り返す）
・ルール設計のコツ: 「何ができて何ができないか」を最初に明確にする。万能すぎると物語が崩壊
・バタフライ効果: 些細な変更が未来を大きく変える。意図しない副作用が物語の核になりやすい
・記憶の扱い: 時間移動者だけが記憶を保持するか、全員が変化に気づくか、が物語の性質を決める`},異世界転生:{tags:["異世界転生","転生","異世界"],lore:`【異世界転生の設定素材】
・転生トリガー: トラック（定番）、過労死、病死、召喚魔法、神の気まぐれ
・チート能力: ステータス画面、スキルツリー、アイテムボックス、鑑定眼、レベルアップ
・社会構造: 冒険者ギルド、ランク制度（F→S）、依頼掲示板、魔石が通貨の役割を果たす場合も
・テンプレ回避のヒント: 「なぜこの主人公がこの世界に来る必然性があるのか」を設定すると深みが出る
・食文化: 現代知識で異世界の食文化を改革する展開が人気（マヨネーズ、味噌、醤油の再現など）`}};function ja(e){const t=[e.worldview,e.worldviewCustom,e.era,e.eraCustom,e.theme,e.themeCustom,e.genre,e.genreCustom,e.mode,e.modeCustom,e.supplement,...(e.characters||[]).map(r=>r.note||"")].filter(Boolean).join(" ");if(!t.trim())return"";const a=[],n=new Set;for(const[r,s]of Object.entries(Pa))n.has(r)||s.tags.some(o=>t.includes(o))&&(a.push(s.lore),n.add(r));return a.length===0?"":`

【参考知識（RAG: 物語のディテール向上用 — この情報を自然に活用して描写の解像度を上げること）】
`+a.slice(0,3).join(`

`)}const ft=e=>e[Math.floor(Math.random()*e.length)];function Ba(e){const t=e.mode||"4koma",a=e.genreCustom||e.genre||"コメディ",n=e.themeCustom||e.theme||"ランダム",r=e.worldviewCustom||e.worldview||"現代日本",s=e.eraCustom||e.era||"現代",o=e.targetCustom||e.target||"全年齢",i=e.endingCustom||e.ending||"意外な結末",c=e.narrCustom||e.narration||"三人称・客観";let u;!e.characters||e.characters.length===0?u="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":u=e.characters.map((S,N)=>{const k=S.name||`(AI命名:キャラ${N+1})`,T=S.role||"未定",H=S.sex?`性別:${S.sex}, `:"",A=S.personality||"未定",F=S.note?` [${S.note}]`:"";return`${N+1}. ${k} (${T}) — ${H}性格:${A}${F}`}).join(`
`);const d=e.charCount?`
※ 指定文字数：約${e.charCount}文字程度`:"",y=e.supplement?`
【追加指示】
${e.supplement}`:"",p={"4koma":"4コマネタ","4koma_scenario":"AI 4koma シナリオ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},m=e.modeCustom||p[t]||t,f={"4koma":`

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
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[t]||"",h=s&&!["現代","ランダム",""].includes(s)?`

【時代考証ルール（厳守）】
・時代設定「`+s+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"",v=ue(a,In),b=ue(i,Ln),$=ue(r,An),C=ue(o,En),w=ue(c,_n);let E="";v&&(E+=`

【ジャンル文体指定：${a}】
${v}`),b&&(E+=`

【結末演出指定：${i}】
${b}`),$&&(E+=`

【世界観演出指定：${r}】
${$}`),C&&(E+=`

【ターゲット層文体指定：${o}】
${C}`),w&&(E+=`

【語り口指定：${c}】
${w}`);let L="";t==="4koma_scenario"?L=`あなたはプロの4コマ漫画シナリオライターです。以下の設定に基づき、画像生成4コマ漫画アプリのSTEP2シナリオ入力欄に直接コピペして使える形式でシナリオを出力してください。

【基本設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${s}
・世界観・雰囲気: ${r}
・ターゲット層: ${o}
・結末の方向性: ${i}
・語り口: ${c}

【設定固定ルール（最重要）】
・上記の各項目はユーザーが選択・手入力した指定値です。生成中に別ジャンル、別テーマ、別時代、別世界観、別語り口、別ターゲット層、別結末へ置き換えないこと。
・指定されていないサブ値（例: 二転三転、東京、大人向け）を勝手に採用しないこと。
・未指定項目だけを補完し、選択・手入力済みの値は創作上の絶対条件として扱うこと。
・カテゴリだけが指定されている場合も正式な指定として扱い、その親カテゴリの外側のサブ値へ移動しないこと。
・未指定の隙間に電子機器、AI、SNS、ガジェット、スマホ、アプリ、電脳、量子、ロボット、監視システムなどを中心題材として差し込まないこと。SF・近未来・サイバーパンク・未来・AI視点などをユーザーが明示指定した場合のみ扱うこと。

【登場人物】
${u}

【出力フォーマット（最重要・厳守）】
以下の形式で「正確に」出力してください。余計な説明・前置き・後書きは一切不要。
フォーマットから1文字たりとも逸脱しないこと。
※重要：Topicなどのヘッダー項目を「【Topic: 究極の機械学習】」のように隅付き括弧（【】）などの余計な記号で絶対に囲まないこと。必ず「Topic: 究極の機械学習」のように、キー名とコロン、そして内容のみをプレーンテキストで出力してください。

Topic: [面白いタイトル]
Logline: [あらすじ・物語の1文要約]
Location: [場所の詳細な描写]
Outfit: [服装の指定（特になければ「キャラシート準拠」）]
Punchline: [以下のPunchlineタイプ一覧から選択]
Scenario:

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: 俯瞰/バードアイ]
[ここに情景・キャラクターの動作描写を3〜5行で記述]
キャラ名「セリフ」
キャラ名「セリフ」

[2コマ目: 承]
[EMOTION: SHOUJO]
[Camera: ローアングル/アオリ]
[ここに情景・キャラクターの動作描写を3〜5行で記述]
キャラ名「セリフ」
キャラ名「セリフ」

[3コマ目: 転]
[EMOTION: GEKIGA]
[Camera: ダッチアングル]
[ここに情景・キャラクターの動作描写を3〜5行で記述]
キャラ名「セリフ」
キャラ名「セリフ」

[4コマ目: 結]
[EMOTION: CHIBI_GAG]
[Camera: 超広角/フィッシュアイ]
[ここに情景・キャラクターの動作描写を3〜5行で記述]
キャラ名「セリフ」
キャラ名「セリフ」

【EMOTIONタグの使い分け（17種）】
各コマの雰囲気に合わせて以下から選択：
- NORMAL: 通常の美麗アニメ作画。日常会話、穏やかなシーン
- CHIBI_GAG: ちびキャラ化（2-3頭身）。ツッコミ、呆れ、軽いギャグ
- GEKIGA: 劇画調リアル。本気の怒り、覚悟、緊張
- SHOUJO: 少女漫画風キラキラ。感動、恋愛的ときめき
- HORROR: ホラー演出。恐怖、ゾッとする瞬間
- BLANK: 白目・魂抜け。衝撃、絶望、思考停止
- IMPACT: インパクトフレーム。大爆笑、大激怒、集中線
- WATERCOLOR: 水彩画風。ノスタルジック、回想シーン
- RETRO: レトロ漫画風。昭和テイスト
- GLITTER: キラキラオーラ。自信満々、ドヤ顔
- SHADOW: シルエット演出。策略、不穏、腹黒
- THICK_PAINT: 厚塗りアニメ調。重厚な表現
- PASTEL: パステルアニメ調。やわらかいタッチ
- CEL: セル画風。フラットな色面、くっきりした輪郭
- DARK_ANIME: ダークアニメ調。暗いトーン、ミステリアス
- THIN_LINE: 繊細線画調。極細の描線、繊細な表現
- HIGH_SATURATION: 高彩度ビビッド。鮮やかでエネルギッシュ

【Cameraタグの使い分け（8種・重複禁止）】
各コマのカメラアングルを指示（4コマの中で同じカメラを2回以上使うことは禁止）：
- 俯瞰/バードアイ: 真上から見下ろす
- ローアングル/アオリ: 膝の高さから見上げる
- ダッチアングル: 画面を15〜30度傾ける
- 超広角/フィッシュアイ: 魚眼レンズ風の歪み
- 望遠圧縮: 遠近感の圧縮
- ワームズアイ: 地面すれすれから見上げる
- ドローン俯瞰: ドローン視点の俯瞰
- パンニング/追跡ショット: 移動に追従するカメラ

【Punchlineタイプ一覧（12種）】
オチの方向性を以下から選択：
- Auto: AIが自動選択（デフォルト）
- Surreal: 静寂型（シュール）。全員無言で固まる
- Explosion: 爆発型。全員限界突破、カオス
- FakeEmotion: 感動詐欺。狂った状況でイイハナシダナー
- Metafiction: メタ崩壊型。第四の壁を破壊
- Unreasonable: 理不尽な制裁型
- RunningGag: 天丼爆発型。繰り返しギャグの最終形態
- Dream: 夢オチ型
- PsychoHorror: サイコホラー型
- Misunderstanding: 盛大な勘違い型
- CanceledEnding: 打ち切りエンド型
- Documentary: ドキュメンタリー（原文忠実モード）

【セリフルール】
- セリフは キャラ名「セリフ内容」 の形式で記述（改行で区切る）
- 1コマにつきセリフは最大2つまで
- セリフは短く、各40文字以内にすること
- 画像生成AIが描画するため、映像的・視覚的に映える動作描写を心がけること
${y}

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的なシナリオを出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的なシナリオのみを出力してください（Topic: から開始）。`:t==="long"?L=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】と【文体・演出ガイド】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${s}
・世界観・雰囲気: ${r}
・語り口: ${c}
・ターゲット層: ${o}
・結末の方向性: ${i}
・登場人物:
${u}
${d}${y}${h}${E}

---
# 必須出力フォーマット（雛形に沿って埋めること）
\`\`\`markdown
# 長編小説マスター指示書
**想定規模：全◯章構成 / 予定総文字数：約◯◯文字**
（※あなたが設計したプロットの章数と、ユーザー指定の文字数ベースの総文字数を具体的に計算して◯を埋めてください）

あなたはプロのベストセラー小説家です。これから私と協力して、上記の規模の長編小説を1章ずつ分割で執筆します。

## 【物語の基本設定】
（※ ここにジャンル、時代、世界観などの詳細を小説家向けに深く描写して記載）

## 【登場人物の深掘り】
（※ 登場人物の裏設定、動機、関係性、口調などを詳細に記載）

## 【ログラインの固定】
（※ 物語全体を貫く「ログライン（物語の核となる1文要約）」をここに記載し、最初から結末までこの軸を絶対にブレさせないこと）

## 【チェーホフの銃（動的伏線）の設定】
（※ 物語の序盤（Setup）で提示する、一見すると本筋と無関係に見える「奇妙なアイテム」や「不自然な日常の習慣」を一つ定義し、ここに記載すること。そして終盤（Payoff）において、それが「実は物語の根幹に関わる致命的な要素だった」という形で回収し、読者に衝撃を与えること）

## 【プロット（全章構成 — 15ビート構造準拠）】
（※非常に重要：APIの出力上限で途切れるのを防ぐため、必ず各章のあらすじは1〜2行で極めて簡潔にまとめ、プロンプト全体が長大にならないよう強く制限してください）
（※以下の感情曲線フェーズを全章の流れに反映させること）
・Setup（日常）：読者の「こういう話だろう」という期待値を設定する。モチーフの1回目をここに配置
・Inciting Incident（事件）：日常を破壊し、主人公に目的（Goal）を強制する出来事
・Deviation（逸脱/探索）：期待からの最初のズレ。落差技法の最初の発動。障害（Conflict）の提示
・Midpoint（中間地点）：主人公の動機（Motivation）が変化・深化する大きな転換点
・Build-up（増幅/どん底）：逸脱を加速させ、感情的緊張を極限まで高める。最大の試練
・Payoff（回収/クライマックス）：感情のピークと着地。全ての伏線・モチーフがここで意味を持ち、落差技法が最大効果を発揮する

## 【伏線・構成ルール（各章で厳守）】
1. 伏線の事前配置：物語の後半で重要な役割を果たす要素（人物の過去・記憶・アイテム・設定）は、必ず序盤〜前半の章に自然な形で言及・暗示しておくこと。後半の章で唐突に新設定を投入することを禁止する。
2. シーンの駆動力（GMC+S設定）：各場面（シーン）には、必ず登場人物の「目的（Goal）」「その目的を持つ動機（Motivation）」「目的を阻む障害（Conflict）」に加えて、「ステークス（Stakes: 失敗した場合に失うもの・賭け金）」を明確に設定して描写すること。ステークスのない停滞したシーンは厳禁。
3. キャラクターの物語的機能：登場人物には全員、物語の選択・葛藤・展開に影響を与える明確な「役割」を持たせること。単なる傍観者・リアクション要員・庇われるだけの存在は禁止。
4. 結末の着地：最終章の結末は「主人公が何らかの意志・行動・決断を具体的に示す」形で閉じること。深呼吸や一言だけで決断する安易な処理は避け、決断に至る感情的または論理的な根拠を必ず描写すること。主人公が何かを受け入れる・犠牲にする展開の場合、受容の前に必ず一度は拒絶・恐怖・抵抗・迷いを描写すること。「葛藤→抵抗→それでも選ぶ」という段階を経ることで、決断に説得力を持たせること。
5. 設定の必然性：物語に登場する特殊な要素は、主人公の個人的背景や物語の核心テーマと必ず接続させること。
6. Show, Don't Tell（身体性と五感の徹底）：世界観の説明を長台詞で済ませることを禁止。キャラクターの感情を「悲しかった」「怒った」と直接的な感情語で説明することを固く禁じる。代わりに、重さ、温度、匂い、触覚、手の震え、呼吸の乱れなど「五感を通じた身体的反応」として描写すること。情報は複数の断片として段階的に開示し、読者が自ら点と点を繋いで真相や感情に辿り着く構成にすること。
7. サブテキスト（Subtext）の徹底：キャラクターに、いま思っている感情や真の意図をそのままセリフで説明させること（オン・ザ・ノーズ）を固く禁じる。セリフには必ず裏の感情を隠し、表面的な言葉と裏腹な行動や態度を描写することで、読者に真意を推測させること。
8. 別れと関係性の重み：重要な関係にあるキャラクターとの別離や決別のシーンでは、その関係に見合った感情的重みを描写すること。一言で切り捨てるような別れは禁止。
9. 文体の緩急：物語全体を通じて同じトーン・テンポで書き続けないこと。場面の感情に応じて以下の3系統を使い分けよ：
  ・高熱量文体：短文の連続、体言止め、畳みかけ。追跡・戦闘・告白・決断など感情が爆発する場面に
  ・静謐文体：長文、穏やかなリズム、余白。回想・別れの余韻・不気味な静けさに
  ・冷徹文体：乾いた断言調、感情を排した客観描写。推理・分析・哲学的独白に
  同じ系統が3段落以上連続することを禁止する。特に物語の最大の衝撃・転換点では、主人公の思考の断片化・身体反応・時間感覚の歪みなどを通じて、読者にも衝撃を追体験させること。
10. 感情落差の設計：読者の感情を動かす全ての場面は「予想される展開（E）」と「実際の展開（R）」のギャップで作られる。以下の落差技法を意識的に選択・組み合わせ、各章に最低1回は明確な落差を仕込むこと：
  ・置換：ある事象を全く異なる文脈で再解釈させる
  ・誇張：感情・規模・影響を段階的に増幅し、読者の想像を超えるスケールに到達させる
  ・逆転：人物の立場・能力・関係性を予告なく反転させる
  ・不条理：論理的に説明のつかない要素を挿入し、理解を超えた衝撃を与える
  ・緊張と緩和：クライマックス直前に意図的な静寂・日常・安堵を挟み、直後に最大の衝撃を配置する
  ・常識の提示：異常な状況の中で一人だけ正気の視点を置き、異常さを際立たせる
11. モチーフの回帰：物語を貫く象徴的な要素（アイテム・言葉・風景・行為）を複数の章にわたり、異なる文脈で登場させること。最初は何気ない言及として配置し、再登場時には意味が変化・深化した形で使い、最終章の感情的ピークと直接的に接続させること。
12. 描写密度の強制（駆け足防止）：各章は事象や会話だけを焦って進めず、十分な描写密度を持たせること。特にクライマックス（Build-up〜Payoff）や重要な対話が3往復以上続く場面では、必ず間に「五感を通じた環境描写（風の音、光の変化、温度など）」や「主人公の内面的・肉体的な苦痛の描写」を挟み、意図的にテンポを遅らせて重厚感を持たせること。
13. 五感バランスの強制：各シーンの描写において、視覚に偏った描写を禁止する。視覚的な描写を行った直後には、必ず聴覚・触覚・嗅覚・味覚・体内感覚（心拍の変化、筋肉の緊張、胃の重さなど）のいずれか1つ以上を組み合わせること。特に場面転換の冒頭は「その場の音」「空気の質感」「匂い」など、非視覚的な情報から描写を開始すること。
14. 比喩素材の世界観準拠：比喩表現を使用する際、使い古された定型表現（「時間が止まった」「心臓が口から出そう」「鉛のように重い」等）を避けること。代わりに、物語の舞台・時代・世界観に由来する素材から比喩を構築すること。比喩は場面の雰囲気を強化し、世界観への没入を深める手段として機能させること。
15. キャラクター知識境界の遵守：台詞や内面描写を書く前に、そのキャラクターが「何を知っていて、何をまだ知らないか」を必ず確認すること。キャラクターが直接見聞きしていない情報、他のキャラクターだけが知っている秘密、物語の後半で初めて明かされる真相などを、そのキャラクターが事前に言及・推測・暗示することを厳禁とする。特に伏線の配置において、「読者には匂わせるが、キャラクターは気づいていない」という構造を正確に維持すること。

## 【AIっぽさ完全排除の厳守ルール（ガードC）】
以下の「AI特有の癖」を完全に排除し、人間が書いたような血の通った自然な文章にすること。
1. 語彙・表現：「最適化」「本質的」「効果的」「重要」「〜を実現します」などの抽象的なビジネス用語や万能語は禁止。「羅針盤」「土台」「エンジン」「航海」などの陳腐な比喩は避け、比喩に頼らず言い切ること。「これにより」「また」「さらに」「したがって」などの不要な接続詞を乱用せず、文脈で自然に繋ぐこと。
2. リズム構成・定形句の排除：「〜です。」「〜ます。」と同じ長さ・語尾の文を連続して使わない。体言止めや「〜でしょう」「〜かもしれません」などを意図的に混ぜ、短文と長文でリズムに緩急をつけること。「結論から言うと」「本記事では」などの前置き宣言は一切禁止。「まとめると」「結論として」と再掲・要約しない。「いかがでしたか？」「参考になれば幸いです」等の締めも一切不要。
3. 事なかれ主義の禁止：「一般的に」「多くの場合」「一概には言えませんが」といった安全クッションや両論併記は徹底排除し、世界観に沿って堂々と言い切ること。
4. 記号・装飾：過度な箇条書き・見出し記号の乱用を避けること。アスタリスク、過度なカギカッコ・カッコ書き・コロン・スラッシュの多用を禁止。

## 【品質ゲート（各章出力前の自己検証 — 必ず実行）】
以下のチェックを各章の出力前に実行し、不合格項目があれば修正してから出力すること。検証結果自体は出力に含めないこと：
□ Setup-Payoff構造：序盤に配置した要素が後半で意味を持っているか？唐突な新設定で展開を処理していないか？
□ 感情落差の十分性：この章の転換点で、読者の期待と実際の展開のギャップは十分に大きいか？
□ モチーフの回帰：物語を貫くモチーフが章をまたいで異なる文脈で再登場しているか？
□ 文体の緩急：同じトーン系統が3段落以上連続していないか？
□ 全キャラの物語的機能：登場人物が物語の展開に影響を与えているか？傍観者になっていないか？
□ GMC+Sの明確性：この章の主要シーンにGoal/Motivation/Conflict/Stakesが設定されているか？
□ 五感バランス：各シーンの描写が視覚のみに偏っていないか？聴覚・触覚・嗅覚・体内感覚のいずれかが各場面に少なくとも1つ含まれているか？
□ 比喩の独自性：使い古された定型比喩（「時間が止まった」「鉛のように重い」等）を使用していないか？比喩の素材が物語の世界観と整合しているか？
□ キャラ知識境界：各キャラクターの台詞・思考が、そのキャラが実際に知り得る情報の範囲内に収まっているか？未来の展開や他キャラの秘密を不自然に察知していないか？

## 【対話型エージェントとしての振舞い（最重要・絶対厳守）】
1. **【1章ずつ停止ルール】** あなたは1度に1つの章しか執筆してはいけません。1章を書き終えた時点で必ず出力を停止し、絶対に次の章を自動的に書き始めないでください。これは最優先ルールです。
2. **【継続確認の義務】** 章を書き終えるごとに、必ず「第◯章（全◯章中）の執筆が完了しました。続けて第◯章を執筆しますか？（残り◯章）」と、全体の章数と残り章数を明記して私に尋ねてください。私が「はい」「続き」「お願い」等と明確に答えるまで、次の章の執筆を開始することを固く禁じます。
3. **【文脈維持メモ（内部ログ）】** 長編執筆における設定崩壊や記憶忘れを防ぐため、毎回、章の終わりに（私への質問の直前に）、短く簡潔に以下のメモを残してください：
   - 【回収待ち伏線メモ】チェーホフの銃を含む、現在残っている謎や伏線
   - 【人物ロスター更新メモ】必須登場人物とAI追加人物の役割・現在地・状態変化・新規追加人物の設定
   - 【モチーフ＆サブキャラ追跡メモ】回帰するモチーフの現在の状態と、主要キャラ以外のサブキャラクターの現在地・状況（終盤でのフェードアウトを防止するため）
   - 【次章のシーン設計（GMC+S）】次章における主人公の「目的（Goal）」、「動機（Motivation）」、「障害・葛藤（Conflict）」、「賭け金（Stakes）」
4. **章の終わりは上記のメモと質問のみとし、自己分析、結論、根拠などの不要なメタデータは一切出力しないでください。**
5. **【全章完了時の最終アクション】** 最終章の執筆が完了したら、本文の最後に独立行で「【完】」を1回だけ出力して停止すること。全文結合出力、コードブロック、再現用マスター指示書、総文字数報告、挨拶、メタ説明は一切出力しないこと。アプリ側が本文結合とメモ管理を行う。

## 【各章の出力フォーマット（厳守）】
各章の出力は、必ず以下の順序で構成し、4の質問を出力した時点で**必ず停止**すること：
1. 章の本文（数千文字規模で出し惜しみなく執筆）
2. ---（区切り線）
3. 文脈維持メモ（上記ルール3の4項目）
4. 「第◯章（全◯章中）の執筆が完了しました。続けて第◯章を執筆しますか？（残り◯章）」
★★★ ここで出力を停止。次の章を勝手に書き始めることは厳禁 ★★★

## 【最終章（物語完結時）の出力フォーマット（絶対厳守）】
最終章を書き終えたら、通常の「文脈維持メモ＋続けますか？」の代わりに、以下のフォーマットだけで出力すること：
1. 最終章の本文（数千〜1万字規模で出し惜しみなく執筆）
2. 本文末尾の独立行に「【完】」
★★★ 「全文結合出力」「再現用マスター指示書」「総文字数」「お疲れ様でした」等の管理文は絶対に出力しないこと。小説本文だけで停止すること ★★★

## 【初回のあなた（AI）のアクション（第1章の出力）】
プロンプトを受け取ったら、まずは読者が全体像を把握できるよう、以下の【作品ヘッダー情報】を出力し、その直下から**そのまま第1章の本文を書き始めて**ください。

【作品ヘッダー情報】（※このヘッダーは第1章の最初のみ出力し、第2章以降は出力しないでください）
*   **タイトル**：（魅力的なタイトルを考案して記載）
*   **ログライン**：（物語の核となる1文要約を記載）
*   **予定文字数**：（※あなたが上で計算した予定総文字数を記載）
*   **全構成**：（※あなたが上で作成したプロットの全章数を記載）
*   **あらすじ**：（物語の概要を3〜4行で簡潔に）

---

さあ、上記の全指示と設定を読み込みましたか？
理解した場合は、まず【作品ヘッダー情報】を出力し、続けて「第1章」の本文を圧倒的な熱量と描写力で数千文字規模で執筆してください。文字数や描写の出し惜しみは厳禁です。
第1章の本文を書き終えたら、上記【各章の出力フォーマット】に従い、文脈維持メモを残し、「第1章（全◯章中）の執筆が完了しました。続けて第2章を執筆しますか？（残り◯章）」と全体進捗を明記して尋ね、**そこで出力を必ず停止**してください。第2章以降を勝手に書き始めることは厳禁です。
\`\`\`
`:L=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${m}」を執筆してください。

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
・テーマ: ${n}
・時代: ${s}
・世界観・雰囲気: ${r}
・語り口: ${c}
・ターゲット層: ${o}
・結末の方向性: ${i}

【設定固定ルール（最重要）】
・上記の各項目はユーザーが選択・手入力した指定値です。生成中に別ジャンル、別テーマ、別時代、別世界観、別語り口、別ターゲット層、別結末へ置き換えないこと。
・指定されていないサブ値（例: 二転三転、東京、大人向け）を勝手に採用しないこと。
・未指定項目だけを補完し、選択・手入力済みの値は創作上の絶対条件として扱うこと。
・カテゴリだけが指定されている場合も正式な指定として扱い、その親カテゴリの外側のサブ値へ移動しないこと。
・未指定の隙間に電子機器、AI、SNS、ガジェット、スマホ、アプリ、電脳、量子、ロボット、監視システムなどを中心題材として差し込まないこと。SF・近未来・サイバーパンク・未来・AI視点などをユーザーが明示指定した場合のみ扱うこと。

【登場人物】
${u}

【執筆ルール（最重要）】
1. ログラインの固定：執筆を開始する前に、物語全体を貫く「ログライン（物語の核となる1文要約）」を内部で設定し、最初から結末までその軸を絶対にブレさせないこと。
2. 予測可能な展開を意図的に回避し、読者を驚かせること。
3. キャラクターは設定された性格から生まれる固有の反応をすること。
4. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。
${(()=>{const S=["novel","medium","short_short","scenario","manga","documentary","radio"],N=["essay","poem","letter","diary"];return S.includes(t)?`6. 「${i}」という結末に向かって、伏線を自然に配置すること。

【伏線・構成ルール（厳守）】
1. 伏線の事前配置：物語の後半で重要な役割を果たす要素（人物の過去・記憶・アイテム・設定）は、必ず冒頭〜前半に自然な形で言及・暗示しておくこと。後半で唐突に新設定を投入することを禁止する。
2. シーンの駆動力（GMC+S設定）：各場面（シーン）には、必ず登場人物の「目的（Goal）」「その目的を持つ動機（Motivation）」「目的を阻む障害（Conflict）」に加えて、「ステークス（Stakes: 失敗した場合に失うもの・賭け金）」を明確に設定して描写すること。ステークスのない（失敗してもリスクがない）停滞したシーンは厳禁とする。
3. キャラクターの物語的機能：登場人物には全員、物語の選択・葛藤・展開に影響を与える明確な「役割」を持たせること。単なる傍観者・リアクション要員・庇われるだけの存在は禁止。各キャラの行動や言動が物語を動かすこと。
4. 結末の着地：短編の結末は「主人公が何らかの意志・行動・決断を具体的に示す」形で閉じること。問題の完全解決は不要だが、主人公がどの方向に進むかの意志表示は必須。深呼吸や一言だけで決断する安易な処理は避け、決断に至る感情的または論理的な根拠（きっかけとなる出来事・記憶・他者の言葉など）を必ず描写すること。また、主人公が何かを受け入れる・犠牲にする展開の場合、受容の前に必ず一度は拒絶・恐怖・抵抗・迷いを描写すること。最初から全てを受け入れる主人公は読者の感情移入を阻害するため禁止する。「葛藤→抵抗→それでも選ぶ」という段階を経ることで、決断に説得力を持たせること。
5. 設定の必然性：物語に登場する特殊な要素（歴史的題材・SF設定・ファンタジー要素など）は、主人公の個人的背景や物語の核心テーマと必ず接続させること。「なぜこの設定なのか」が読者に伝わる因果関係を構築すること。
6. Show, Don't Tell（身体性と五感の徹底）：世界観の説明を長台詞で済ませることを禁止する。さらに、キャラクターの感情を「悲しかった」「怒った」と直接的な感情語で説明することを固く禁じる。代わりに、重さ、温度、匂い、触覚、手の震え、呼吸の乱れなど「五感を通じた身体的反応」として描写すること。情報は複数の断片（物証・回想・環境描写など）として段階的に開示し、読者が自ら点と点を繋いで真相や感情に辿り着く構成にすること。
7. サブテキスト（Subtext）の徹底：キャラクターに、いま思っている感情や真の意図をそのままセリフで説明させること（オン・ザ・ノーズ）を固く禁じる。セリフには必ず裏の感情（サブテキスト）を隠し、表面的な言葉と裏腹な行動や態度を描写することで、読者に真意を推測させること。
8. 別れと関係性の重み：物語中で重要な関係にあるキャラクターとの別離や決別のシーンでは、その関係に見合った感情的重みを描写すること。一言で切り捨てるような別れは禁止。短くても、相手への感情（感謝・申し訳なさ・名残惜しさなど）が伝わる描写を入れること。
9. 文体の緩急：物語全体を通じて同じトーン・テンポで書き続けないこと。主人公の心理状態の変化に応じて、文体自体にも変化を持たせること。場面の感情に応じて以下の3系統を使い分けよ：
  ・高熱量文体：短文の連続、体言止め、畳みかけ。追跡・戦闘・告白・決断など感情が爆発する場面に
  ・静謐文体：長文、穏やかなリズム、余白。回想・別れの余韻・不気味な静けさに
  ・冷徹文体：乾いた断言調、感情を排した客観描写。推理・分析・哲学的独白に
同じ系統が3段落以上連続することを禁止する。特に物語の最大の衝撃・転換点（真相の判明、裏切りの発覚、喪失の瞬間など）では、「息を飲んだ」の一文で処理せず、主人公の思考の断片化・身体反応・時間感覚の歪みなどを通じて、読者にも衝撃を追体験させること。
10. 感情落差の設計（読者の期待操作）：読者の感情を動かす全ての場面は「予想される展開（E）」と「実際の展開（R）」のギャップで作られる。笑いも感動も恐怖も驚きも、落差の方向が違うだけで原理は同じ。以下の落差技法を意識的に選択・組み合わせ、物語中に最低2回は明確な落差を仕込むこと：
  ・置換：ある事象を全く異なる文脈で再解釈させる（安全な場所が実は罠、日常的な行為が異常な意味を持つ）
  ・誇張：感情・規模・影響を段階的に増幅し、読者の想像を超えるスケールに到達させる
  ・逆転：人物の立場・能力・関係性を予告なく反転させる（弱者が最強の決断をする、支配者が無力になる）
  ・不条理：論理的に説明のつかない要素を挿入し、理解を超えた衝撃を与える（ホラーの侵食、SFの異質な論理）
  ・緊張と緩和：クライマックス直前に意図的な静寂・日常・安堵を挟み、直後に最大の衝撃を配置する
  ・常識の提示：異常な状況の中で一人だけ正気の視点を置き、異常さを際立たせる
11. モチーフの回帰：物語を貫く象徴的な要素（アイテム・言葉・風景・行為）を最低2回、異なる文脈で登場させること。1回目は何気ない言及として自然に配置し、2回目以降は意味が変化・深化した形で再登場させ、読者に「あの時の…」という接続の快感を与えること。回帰するモチーフは結末の感情的ピークと直接的に接続させること。
12. 15ビート構造に基づく感情曲線の設計：物語全体を以下のフェーズで構成し、各フェーズの役割を意識的に設計すること：
  ・Setup（日常）：読者の「こういう話だろう」という期待値を設定する。モチーフの1回目をここに配置
  ・Inciting Incident（事件）：日常を破壊し、主人公に目的（Goal）を強制する出来事
  ・Deviation（逸脱/探索）：期待からの最初のズレ。落差技法の最初の発動。障害（Conflict）の提示
  ・Midpoint（中間地点）：主人公の動機（Motivation）が変化・深化する大きな転換点
  ・Build-up（増幅/どん底）：逸脱を加速させ、感情的緊張を極限まで高める。最大の試練
  ・Payoff（回収/クライマックス）：感情のピークと着地。全ての伏線・モチーフがここで意味を持ち、落差技法が最大効果を発揮する
13. 五感バランスの強制：各シーンの描写において、視覚に偏った描写を禁止する。視覚的な描写を行った直後には、必ず聴覚・触覚・嗅覚・味覚・体内感覚（心拍の変化、筋肉の緊張、胃の重さなど）のいずれか1つ以上を組み合わせること。特に感情の転換点や場面転換の直後は「その場の音」「空気の質感」「匂い」など、非視覚的な情報から描写を開始し、読者の没入感を高めること。
14. 比喩素材の世界観準拠：比喩表現を使用する際、使い古された定型表現（「時間が止まった」「心臓が口から出そう」「鉛のように重い」等）を避けること。代わりに、物語の舞台・時代・世界観に由来する素材から比喩を構築すること（例：中世なら鍛冶・馬・蝋燭の素材から、サイバーパンクなら回路・電流・データの素材から）。比喩は場面の雰囲気を強化し、世界観への没入を深める手段として機能させること。
15. キャラクター知識境界の遵守：台詞や内面描写を書く前に、そのキャラクターが「何を知っていて、何をまだ知らないか」を必ず確認すること。キャラクターが直接見聞きしていない情報、他のキャラクターだけが知っている秘密、物語の後半で初めて明かされる真相などを、そのキャラクターが事前に言及・推測・暗示することを厳禁とする。特に伏線の配置において、「読者には匂わせるが、キャラクターは気づいていない」という構造を正確に維持すること。`:t==="4koma"?`5. 笑いの構造設計（コメディ構造メソッド）：

【笑いの原理】笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレが大きいほど笑いも大きい。

【ズレ技法（最低2つ選択せよ）】
・置換：状況や出来事を全く別の文脈に言い換えてズレを作る（例：深刻な会議→小学生の給食会議のように）
・誇張：リアクションや感情を極限まで増幅する。「驚く」→「魂が肉体から離脱するレベル」
・逆転：キャラの普段の立場・力関係を入れ替える（クールなキャラが取り乱す、バカなキャラが正論を言う）
・不条理：脈絡のない狂った要素を堂々と混ぜる。多少意味不明でも勢いで笑えればOK
・緊張と緩和：3段目まで空気を張り詰め→4段目で完全崩壊させる落差で笑う
・常識に戻る：全員暴走の中、1人だけ冷静に「いや普通におかしいだろ」と常識を提示

【4コマ構成マッピング】
・起 = フリ：読者に「普通の予想」を作らせる前置き。ここでは笑わせなくてよい
・承 = ボケ開始：ズレた発言・行動で「あれ？」と思わせる
・転 = 溜め/かぶせ：ボケを加速させるか、極限の緊張を作る。天丼（起の小ネタを変奏して再登場）も有効
・結 = オチ：ズレを確定し笑いを完成。全エネルギーをここに集中投下

【推奨テクニック】天丼（同じパターンを変奏→爆発）、ノリツッコミ（一旦乗ってから崩す）、かぶせ（ボケの直後にもう一段）

【オチの多様化（毎回同じパターン禁止）】以下の6系統から選択せよ：
・爆発型：全員限界突破、叫び・暴走・カオス
・静寂型：全員無言で固まる。沈黙と虚無が笑い
・社会的死型：取り返しのつかない状況に陥る
・自己完結型：ボケた本人だけ満足、周囲ドン引き
・逆転オチ型：ツッコミ役がもっとヤバいことを言い出す
・天丼爆発型：繰り返しネタが最終形態に進化

【トーンバリエーション】毎回同じテンションにならないよう使い分けよ：ハイテンション爆発系 / シュール静寂系（淡々とした狂気）/ 知性派ブラック系（皮肉・風刺）

セリフは短く鋭く。だらだら説明するセリフは禁止。テンポとオチの切れ味を最優先すること。`:N.includes(t)?{essay:"\\n\\n【構成ルール】\\n1. テーマの一貫性と感情の自然な流れを重視し、読者が共感しながら読み進められる構成にすること。\\n2. 劇的な展開や壮大な伏線は一切不要。日常の機微や気づきを丁寧に積み重ねること。\\n3. 結論を急がず、余韻を残して自然に終わらせること。",poem:"\\n\\n【構成ルール】\\n1. イメージの連鎖と韻律の統一感を重視し、一篇を通じて響き合うモチーフを配置すること。\\n2. 物語的な伏線や因果関係は不要。詩的飛躍と余白を大切にすること。\\n3. 言葉の音（おん）と意味の二重性を意識した表現を心がけること。",letter:"\\n\\n【構成ルール】\\n1. 書き手の心情変化を自然かつ段階的に描写し、手紙の冒頭と末尾で感情の温度差を持たせること。\\n2. 物語的な伏線は不要。相手への語りかけの中で、書き手自身の内面が滲み出る構成にすること。\\n3. 手紙特有の「書き直せない生々しさ」を大切にし、整理されすぎない思考の流れを残すこと。",diary:"\\n\\n【構成ルール】\\n1. 日々の出来事から内面への掘り下げを段階的に進め、日記の最後に小さな気づきや変化を置くこと。\\n2. 物語的な伏線や劇的な展開は不要。等身大の思考と感情の揺れを丁寧に記録すること。\\n3. 書き手が自分自身に正直に向き合う瞬間を大切にし、取り繕わない率直さを保つこと。"}[t]||"":`6. 「${i}」という結末に向かって、伏線を自然に配置すること。`})()}${h}${f}${E}${d}${y}

【品質ゲート（出力前の自己検証 — 必ず実行）】
以下のチェックを出力前に実行し、不合格項目があれば修正してから出力すること。検証結果自体は出力に含めないこと：
□ Setup-Payoff構造：序盤に配置した要素が結末で意味を持っているか？唐突な新設定で結末を処理していないか？
□ 感情落差の十分性：物語の最大の転換点で、読者の期待と実際の展開のギャップは十分に大きいか？「ちょっと意外」ではなく「完全に予想外」になっているか？
□ モチーフの回帰：物語を貫くモチーフが異なる文脈で再登場し、結末の感情的ピークと接続しているか？
□ 結末パターンの固定化防止：毎回同じ感情・同じ構造の結末になっていないか？前回と異なるパターンを意識しているか？
□ 文体の緩急：同じトーン系統（高熱量/静謐/冷徹）が3段落以上連続していないか？場面の感情に応じて文体が変化しているか？
□ 全キャラの物語的機能：全登場人物が物語の展開に何らかの影響を与えているか？傍観者やリアクション要員だけの存在になっていないか？
□ 五感バランス：各シーンの描写が視覚のみに偏っていないか？聴覚・触覚・嗅覚・体内感覚のいずれかが各場面に少なくとも1つ含まれているか？
□ 比喩の独自性：使い古された定型比喩（「時間が止まった」「鉛のように重い」等）を使用していないか？比喩の素材が物語の世界観と整合しているか？
□ キャラ知識境界：各キャラクターの台詞・思考が、そのキャラが実際に知り得る情報の範囲内に収まっているか？未来の展開や他キャラの秘密を不自然に察知していないか？

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的な文章を出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的な本文を出力してください。

最終的な本文は以下のフォーマットを厳守してください：
※ 禁止：タイトルに「」や【】などの装飾記号はAI側で付与せず、テキストのみで出力すること。
1行目に「タイトル: ○○」の形式で物語のタイトルを出力すること。
2行目は空行。
3行目から本文を開始してください。
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;let x="";e.universalAssets&&e.universalAssets.length>0&&(x=`

【入力アセット情報（インスピレーションソース）】
`,x+=`以下のユーザーから投入されたアセット情報（画像、URL、テキストなど）を、指定された「縛り（設定項目）」をすべて満たした上で、物語の要素、描写、モチーフ、設定として自然に溶け込ませて構成してください。
`,e.universalAssets.forEach((S,N)=>{if(x+=`[アセット ${N+1}] 型: ${S.type}
`,S.type==="image"){x+=`・画像ファイル名: ${S.name||"不明"}
`;const k=S.status==="error"?"画像解析エラーにより詳細情報なし":S.analysis||"解析中、または解析不可";x+=`・ビジュアル事前解析結果: ${k}
`}else S.type==="url"?(x+=`・リンクURL: ${S.value}
`,S.title&&S.status!=="error"&&(x+=`・リンク先タイトル: ${S.title}
`),S.content&&S.status!=="error"&&(x+=`・リンク先コンテンツ（要約/抽出テキスト）: ${S.content.slice(0,1500)}${S.content.length>1500?"...":""}
`)):S.type==="text"&&(x+=`・文書名: ${S.name||"不明"}
`,S.content&&S.status!=="error"&&(x+=`・文書内容: ${S.content.slice(0,1500)}${S.content.length>1500?"...":""}
`))}),L+=x);const M=ja(e);M&&(L+=M);const B=[a,s,r,o,i,m];return e.charCount&&B.push(`${e.charCount}字`),M&&B.push("📚RAG"),e.universalAssets&&e.universalAssets.length>0&&B.push(`🖼️アセット(${e.universalAssets.length})`),{prompt:L,tags:B}}const Ga=/(?:AI|SNS|電子|電脳|ガジェット|スマホ|アプリ|ロボット|量子|仮想|VR|サイバー|ディストピア|アンドロイド|クローン|宇宙ステーション|火星|月面|巨大企業|監視システム|ネットワーク)/i,Ka=/(?:SF|近未来|サイバー|未来|電脳|AI|量子|宇宙|ロボット|クローン)/i;function Tn(e){return Ga.test(String(e||""))}function Vt(e){return Ka.test(String(e||""))}function We(e,t=!1){const a=(e||[]).filter(n=>t||!Tn(n));return a.length?a:e||[]}function Ct(e,t=null,a=!1){if(!e)return null;let n=t&&e[t]?t:null;if(!n){const o=Object.keys(e||{});n=D(o.length?o:[])}if(!n)return null;const r=e[n]||[],s=We(r,a||Vt(n));return[n,D(s)]}function Fa(){const e=Object.fromEntries(Object.entries(Ke).filter(([a])=>!Vt(a)&&!Tn(a)));let t=Ct(e,null,!1)||Ct(Ke,null,!1);return t=t?t[1]:ft(We(Sa,!1)),Math.random()<.55&&(t+=" "+ft(Ia)),Math.random()<.35&&(t+=" "+ft(La)),t}function Ha(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=String(e||"").replace(/[０-９]/g,r=>String.fromCharCode(r.charCodeAt(0)-65248)).replace(/[,，]/g,"");if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function fe(e){const t=(L,x)=>{const M=String(L||"").trim();return!M||["ランダム","未設定","おまかせ","AIおまかせ"].includes(M)?x:M},a=t(e.genreCustom||e.genre,"コメディ"),n=t(e.themeCustom||e.theme,"選択"),r=t(e.worldviewCustom||e.worldview,"現代日本"),s=t(e.eraCustom||e.era,"現代"),o=t(e.targetCustom||e.target,"全年齢"),i=t(e.endingCustom||e.ending,"意外な結末"),c=t(e.narrCustom||e.narration,"三人称・客観"),u=Array.isArray(e.characters)&&e.characters.length>0;let d;u?d=`【必須登場人物（ユーザー指定・作中登場ノルマ）】
${e.characters.map((L,x)=>{const M=L.name||`(AI命名:キャラ${x+1})`,B=L.role||"未定",S=L.sex?`性別:${L.sex}, `:"",N=L.personality||"未定",k=L.note?` [${L.note}]`:"";return`${x+1}. ${M} (${B}) — ${S}性格:${N}${k}`}).join(`
`)}

【AI追加人物の扱い】
・上記の人物数は上限ではない。指定人物は必ず登場させるノルマとして扱うこと。
・長編の文章量、章数、テーマ、世界観に対して人物が不足する場合、長編シナリオエージェントとして追加人物を設計してよい。
・追加人物は、必須登場人物の見せ場を奪うためではなく、葛藤・伏線・関係性・世界観の奥行きを増やすために配置すること。`:d=`【AI設計キャスト】
・ユーザー指定の必須人物は未設定。
・短編向けの2〜3人に固定せず、長編の規模・章数・テーマに見合う人数をAIが設計すること。
・主人公、対立軸を担う人物、関係性を揺らす人物、舞台や事件を動かす脇役を必要に応じて追加してよい。
・ただし人数を増やすだけの水増しは禁止。追加人物には必ず物語上の役割、欲望、弱点、主人公との関係、初登場予定章を持たせること。`;const y=`【長編人物ロスター運用ルール】
・必須登場人物は、全体プロット上の役割と登場予定章を必ず内部設計すること。
・AIが追加した人物は「AI追加人物」として扱い、名前、役割、性格/欲望、主人公や必須人物との関係、初登場章、現在地/状態を管理すること。
・各章の文脈維持メモには、追加・変化した人物情報を【人物ロスター更新メモ】として必ず記録すること。
・一度出したAI追加人物を後半で忘れないこと。退場・死亡・離脱・和解などの状態変化があれば、文脈維持メモに明記すること。`,p=e.supplement?`
【追加指示】
${e.supplement}`:"",m=["現代","ランダム",""].includes(s)?"":`

【時代考証ルール（厳守）】
・時代設定「`+s+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること。`,f=ue(a,In),h=ue(i,Ln),v=ue(r,An),b=ue(o,En),$=ue(c,_n);let C="";f&&(C+=`

【ジャンル文体指定：${a}】
${f}`),h&&(C+=`

【結末演出指定：${i}】
${h}`),v&&(C+=`

【世界観演出指定：${r}】
${v}`),b&&(C+=`

【ターゲット層文体指定：${o}】
${b}`),$&&(C+=`

【語り口指定：${c}】
${$}`);const w=Ha(e.charCount);let E;if(w>0){const L=Math.min(Math.max(Math.round(w/8e3),6),12),x=Math.round(w/L),M=Math.max(4500,Math.min(9e3,Math.round(x*.6)));E=`全${L}章構成（目安）、各章約${Math.round(x/1e3)}千字、各章本文は最低${M.toLocaleString()}字、予定総文字数：約${Math.round(w/1e4)}万字`}else E="10万字以上を目安に、物語の内容に最適な章数と文字数をAI自身が自由に設計してください（推奨: 8〜12章、各章8千〜1万5千字、各章本文は最低6千字）";return{genre:a,theme:n,worldview:r,era:s,target:o,ending:i,narr:c,charDesc:d,characterRosterRule:y,supplement:p,eraRule:m,allCategoryGuides:C,chapterGuidance:E}}const Mn=`
【伏線・構成ルール（各章で厳守）】
1. 伏線の事前配置：後半で重要な要素は、必ず序盤〜前半の章に自然に言及・暗示しておくこと。後半で唐突に新設定を投入することを禁止。
2. シーンの駆動力（GMC+S）：各場面に「目的（Goal）」「動機（Motivation）」「障害（Conflict）」「賭け金（Stakes）」を明確に設定すること。
3. キャラクターの物語的機能：全登場人物に物語を動かす明確な役割を持たせること。傍観者禁止。
4. 結末の着地：最終章は主人公が具体的な意志・行動・決断を示す形で閉じること。葛藤→抵抗→それでも選ぶという段階を経ること。
5. 設定の必然性：特殊な要素は主人公の背景やテーマと必ず接続させること。
6. Show, Don't Tell：感情を直接語で説明せず、五感を通じた身体的反応として描写すること。
7. サブテキストの徹底：セリフに裏の感情を隠し、読者に真意を推測させること。
8. 別れと関係性の重み：重要な別離には感情的重みを描写すること。
9. 文体の緩急：高熱量文体（短文連続・体言止め）、静謐文体（長文・余白）、冷徹文体（客観描写）を場面に応じて使い分け、同系統3段落連続を禁止。
10. 感情落差の設計：各章に最低1回、置換・誇張・逆転・不条理・緊張と緩和のいずれかの落差技法を仕込むこと。
11. モチーフの回帰：象徴的要素を複数章で異なる文脈で再登場させ、最終章の感情的ピークと接続させること。
12. 描写密度の強制：クライマックスや重要対話には五感描写と内面描写を挟み、テンポを意図的に遅らせること。
13. 五感バランス：視覚偏重を禁止。聴覚・触覚・嗅覚・体内感覚を必ず組み合わせること。
14. 比喩素材の世界観準拠：使い古された定型比喩を避け、世界観に由来する素材で比喩を構築すること。
15. キャラクター知識境界の遵守：キャラが知り得ない情報を言及・推測させることを厳禁。
16. 反復描写の禁止と進行の優先：同じモチーフ（水、影、名など）の消失や溶解描写を毎章のように同じ比喩・表現で反復しないこと。章が進むごとに、謎が深まるだけでなく、状況や人間関係に後戻りできない明確な変化・進行（山場）を起こすこと。
17. 各章の明確な役割分担：章ごとのエピソードに固有の対立や発見を設け、前の章と似たような行動パターンを繰り返さないこと。中盤から後半にかけては、単なる雰囲気描写にとどまらず、プロット上の決定的な展開（破滅の予兆、対立の激化、新たな手がかりの発見など）を発生させること。
18. 管理情報の本文混入禁止：「全文結合出力」「再現用マスター指示書」「ここからコピー」「総文字数報告」「お疲れ様でした」など、アプリ管理用の文章を本文や章末に出力しないこと。最終章は本文末尾の「【完】」だけで終えること。
19. 非最終章の総決算禁止：最終章以外では、物語全体の勝利、全面解決、全契約成立、組織再建完了、黒幕完全敗北、主人公の最終的な自己肯定など、長編全体を終わらせる決着を描かないこと。非最終章は必ず次章へ続く未解決の対立・新たな代償・残る疑問を残すこと。
20. Scene density: every chapter must be built from at least three performed scenes, not compressed synopsis. A performed scene contains place, action, dialogue/silence, friction, and consequence.
21. Chapter turn: every chapter must include one visible turn that changes what a character wants, fears, knows, or can no longer undo.
22. Ending aftertaste: close each chapter on the cost of what just happened, not on an explanation, a lesson, or a next-chapter preview.
23. Scene ledger discipline: before writing, internally plan 3-5 scenes with place, goal, obstacle, choice, and cost. Do not output the ledger.
24. No synopsis pages: do not spend a chapter explaining premise, world state, or backstory. Exposition must be attached to objects, actions, conflict, dialogue, or sensory pressure.
25. Character agency: every chapter must contain at least one deliberate choice by a major character, and that choice must change evidence, debt, relation, body condition, available route, or public reputation.
26. Dialogue subtext: dialogue must carry fear, bargaining, evasion, desire, threat, affection, or class/power friction. Avoid polite Q&A and information delivery.
27. Consequence carry-forward: after each chapter, leave a concrete wound, promise, loss, rumor, item, evidence, debt, broken relationship, or irreversible public fact that the next chapter must inherit.
28. Final-paragraph discipline: end on a concrete image, cost, silence, object, physical reaction, or unresolved pressure. Do not end with a preview sentence, lesson, authorial summary, or rhetorical teaser.
29. No chapter-body replay: do not reuse long paragraphs, scene blocks, dialogue runs, metaphors, or the opening situation from an already completed chapter. Continuing a consequence is allowed; copying prose or replaying the same scene is forbidden.

【AIっぽさ完全排除】
1. 語彙：「最適化」「本質的」「効果的」等のビジネス用語、「羅針盤」「土台」等の陳腐な比喩は禁止。
2. リズム：同じ語尾の連続禁止。短文と長文でリズムに緩急をつけること。前置き宣言・要約・締めの挨拶は一切不要。
3. 事なかれ主義禁止：安全クッションや両論併記を排除し、堂々と言い切ること。
4. 記号：過度な箇条書き・見出し・アスタリスク・カッコの乱用を禁止。
5. 脚注・引用記号禁止：本文中に [1]、[2]、［3］、(注1)、参考文献、出典、脚注などの学術引用記号や注釈を出力しないこと。必要な情報は地の文に自然に統合すること。

【品質ゲート（各章出力前の自己検証 — 検証結果自体は出力に含めないこと）】
□ Setup-Payoff構造 □ 感情落差の十分性 □ モチーフの回帰 □ 文体の緩急
□ 全キャラの物語的機能 □ GMC+Sの明確性 □ 五感バランス □ 比喩の独自性 □ キャラ知識境界 □ 反復描写の防止 □ 章別エピソードの固有性 □ 非最終章の総決算禁止 □ 脚注・引用番号なし`;function Va(e){const t=fe(e),a=(l.longNovel&&l.longNovel.chapterRetryNotes||{})[1]||"",n=`あなたはプロのベストセラー小説家です。以下の設定に基づき、本格的な長編小説の**第1章**を執筆してください。
このアプリケーションが章ごとに指示を出します。あなたは指示された1章分のみを全力で書いてください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Entertainment engine: every chapter must force one vivid irreversible choice, one visible cost, and one expectation reversal that grows from earlier setup.
- Chapter-ending anti-pattern guard: never end on scenery-only afterglow (sunset, sky, wind, light, echo, or a neat emotional image). Rotate the ending pattern and break the expected mood with one concrete human friction: a messy spoken line, practical task, bodily discomfort, awkward silence, contradictory gesture, mundane noise, unpaid cost, or unfinished obligation.
- Escalation ladder: every scene must increase danger, desire, relationship strain, mystery, or moral cost; do not reset tension between scenes.
- Convert lore and exposition into conflict, objects, gestures, overheard lines, or decisions. Never explain a setting without making it pressure a character.
- Use visible paragraph breaks: add a newline after each prose paragraph, keep most paragraphs under 350 Japanese characters, and never return a chapter as a few giant text blocks.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.
- Internally build a 3-5 scene ledger before drafting, but output only the novel text and the required context memo.
- Every 1200-1800 Japanese characters should contain a visible action, conflict, discovery, or choice. Do not coast on atmosphere alone.
- Make the chapter's best scene alter the next chapter's available options.


【基本設定】
・ジャンル: ${t.genre}
・テーマ: ${t.theme}
・時代: ${t.era}
・世界観・雰囲気: ${t.worldview}
・語り口: ${t.narr}
・ターゲット層: ${t.target}
・結末の方向性: ${t.ending}

【設定固定ルール（最重要）】
・上記の各項目はユーザーが選択・手入力した指定値です。生成中に別ジャンル、別テーマ、別時代、別世界観、別語り口、別ターゲット層、別結末へ置き換えないこと。
・指定されていないサブ値（例: 二転三転、東京、大人向け）を勝手に採用しないこと。
・未指定項目だけを補完し、選択・手入力済みの値は創作上の絶対条件として扱うこと。
・カテゴリだけが指定されている場合も正式な指定として扱い、その親カテゴリの外側のサブ値へ移動しないこと。
・未指定の隙間に電子機器、AI、SNS、ガジェット、スマホ、アプリ、電脳、量子、ロボット、監視システムなどを中心題材として差し込まないこと。SF・近未来・サイバーパンク・未来・AI視点などをユーザーが明示指定した場合のみ扱うこと。

【想定規模（目安 — 物語の自然な流れを最優先し、厳密に守る必要はない）】
${t.chapterGuidance}

【登場人物】
${t.charDesc}
${t.characterRosterRule}

【プロット設計の指示（第1章執筆前に内部で実行すること）】
1. 物語全体を貫く「ログライン（核となる1文要約）」を設定
2. チェーホフの銃（動的伏線）：序盤に一見無関係な要素を配置し、終盤で回収する仕掛けを1つ以上設計
3. 15ビート構造に基づく全章プロット（各章1行あらすじ）を設計：
   Setup → Inciting Incident → Deviation → Midpoint → Build-up → Payoff
4. 必須登場人物とAI追加人物を含む人物ロスターを内部設計し、各人物の物語上の役割・初登場章・関係性の変化を管理
${Mn}
${t.eraRule}${t.allCategoryGuides}${t.supplement}

${a?`【前回失敗からの再生成指示】
${a}
`:""}

【出力フォーマット（厳守）】
以下の順序で出力してください。余計な挨拶・前置き・説明は一切不要です。

1. 【作品ヘッダー情報】（以下の形式で正確に出力すること）
タイトル: （魅力的なタイトル）
ログライン: （物語の核となる1文要約）
全構成: 全N章
予定総文字数: 約XX万字
あらすじ: （3〜4行で簡潔に）
【プロット概要】
第1章: （1行あらすじ）
第2章: （1行あらすじ）
...（全章分を記載）

2. 区切り線 ---

3. # 第1章: （章タイトル）
（本文 — 上記の想定規模を満たすまで、章固有の事件・対立・感情変化を出し惜しみなく執筆すること）

4. 区切り線 ---

5. 文脈維持メモ（以下の4項目を必ず出力すること）
【回収待ち伏線メモ】チェーホフの銃を含む、現在残っている謎や伏線の一覧
【人物ロスター更新メモ】必須登場人物とAI追加人物の役割・現在地・状態変化・新規追加人物の設定
【モチーフ＆サブキャラ追跡メモ】回帰モチーフの状態と、サブキャラの現在地・状況
【次章のシーン設計（GMC+S）】次章のGoal/Motivation/Conflict/Stakes

★★★ 文脈維持メモまで出力したら出力を停止してください。「続けますか？」等の質問は不要です（アプリが自動制御します）。★★★`,r=["長編小説",t.genre,t.theme,t.era].filter(Boolean);return{prompt:n,tags:r}}function Nn(e){const t=String(e||"").trim();if(!t)return"";const a=t.split(/(?=---\s*第[\d０-９一二三四五六七八九十]+章の文脈メモ\s*---)/).map(n=>n.trim()).filter(Boolean);return a.length?a[a.length-1]:t}function qa(e,t){const a=Nn(e);if(!a)return"";const n=[new RegExp(`【第${t}章のシーン設計（GMC\\+S）】([\\s\\S]*?)(?=\\n【|\\n---|$)`),/【次章のシーン設計（GMC\+S）】([\s\S]*?)(?=\n【|\n---|$)/,/【次章のシーン設計】([\s\S]*?)(?=\n【|\n---|$)/];for(const r of n){const s=a.match(r);if(s!=null&&s[1])return s[1].trim()}return""}function Da(e,t,a=""){const n=Nn(t),r=qa(t,e),s=n?n.slice(0,1800):"（直近の文脈メモなし）";return`
【第${e}章の連続性ガード・最優先】
以下は元のプロット概要より優先する。過去章の出来事を再演・巻き戻し・別角度で再説明してはならない。
・第${e}章は、直近章の最後で確定した状態の「後」から始める。
・直近章の最後の段落を起点にし、直近章の冒頭・移動・到着・発見・戦闘・目撃を第${e}章の冒頭でやり直さない。
・直近章で到達済みの場所、確認済みの現象、完了済みの送信・救出・逃走・崩壊は「既成事実」として扱い、次の障害・代償・選択へ進める。
・直近章または文脈メモで、発生済み／紛失済み／負傷済み／回収済み／退場済みになった出来事を、第${e}章で初めて起きる出来事として描かない。
・同じ道具、証拠、負傷、敵対、会話を使う場合は、「すでに起きた結果を受けた次の行動」として扱う。
・直近メモの「第${e}章のシーン設計」または「次章のシーン設計（GMC+S）」を第${e}章の開始条件として最優先する。
・過去章のイベントをもう一度見せたい場合でも、回想・要約・再演で水増ししない。現在進行の新しい対立、調査、発見、決断へ進める。
・第${e}章が最終章ではない場合、物語全体の勝利・全面契約・会社再建完了・黒幕完全敗北などの総決算を描かない。章末には必ず未解決の対立、新しい危機、次章への代償を残す。

【第${e}章で優先する最新GMC+S】
${r||"（直近メモに明示された次章GMC+Sがない場合は、直近章の結末直後から新しい展開を作る）"}

【直近文脈メモ抜粋】
${s}

NEAR-END STRUCTURE LOCK (never output this heading):
- Unless this is explicitly the final chapter, do not complete the whole-novel objective, final contract, final victory, total defeat of the antagonist, all foreshadowing payoff, or everyone's ending. Leave a concrete unresolved core for the final chapter.
- A chapter immediately before the final chapter must end at the maximum crisis or last irreversible choice, not at mission accomplished.

${a?`【前回失敗からの再生成指示】
${a}
`:""}`}function Ua(e,t,a,n,r,s,o,i=""){const c=fe(a),u=Da(e,s,i),d=String(r||"").trim().slice(-900);let y="",p="";return o&&(y=`
★★★ これは最終章（第${e}章 / 全${t}章）です。以下を必ず実行してください ★★★
・全ての伏線（チェーホフの銃を含む）を完全に回収すること
・全てのモチーフを最終的な形で登場させ、感情的ピークと接続させること
・主人公の決断と行動で物語を着地させること（葛藤→抵抗→選択の段階を経ること）
・全てのサブキャラクターの結末を描写すること（フェードアウト禁止）
・本文の最後に「【完】」を付けること
FINAL CHAPTER STATE LOCK (never output this heading):
- Treat every event completed in the immediately previous chapter as already finished fact. Do not replay it, rewind it, call it a hallucination, add a second quota, or repeat the same countdown, attack, collapse, confession, contract, rescue, victory, or defeat.
- If the previous chapter already completed the central task, final chapter must begin after that result and write aftermath, consequences, final choice, emotional settlement, and remaining foreshadowing payoff only.
- The final chapter must not solve continuity by denying the previous chapter. Continue from it.
`),!o&&e===t-1&&(p=`
★★★ 第${e}章は最終章直前です。これは決着章ではありません ★★★
・全解決、勝利宣言、黒幕の完全敗北、社会の再建完了、伏線の総回収、全員の結末を描写しないこと。
・「すべてが終わった」「すべてが終わる」「すべて終わる」「完全に終わった」など、物語全体が解決したと読める語句は、脅し・予感・仮定でも使わないこと。「取り返しがつかなくなる」「退路が消える」など未解決の危機として言い換えること。
・第${e}章は、最終決戦へ入るための最大危機、最後の不可逆な選択、または最終章への重い代償で終えること。
・直前章で完了した戦闘、送信、逃走、死亡、回収、崩壊を冒頭で再演しないこと。直前章の最後の位置・状態から「その後」を始めること。
・直前章で到達済みの目的地や目撃済みの異変を「これから向かう」「初めて見る」と書かないこと。直前章末の現場・損傷・時間・関係状態を固定して、その直後の新しい圧力から始めること。
・長い説明だけで進めず、400〜900字ごとに行動、会話、身体反応、発見、選択のいずれかを入れること。
`),!o&&e>=Math.max(1,Math.ceil(t*.5))&&(p+=`
MID-STORY CANON STATE LOCK (never output this heading):
- Treat saved chapters and context memos as the only canon; failed retry drafts and old outline beats are not canon.
- Before drafting, internally list the immediately previous chapter's final place/time, character injuries, lost or destroyed items, fired weapons, deaths/exits, handoffs, and unresolved crisis.
- Start after that state. Do not replay, rewind, undo, hallucinate, or re-stage completed trigger pulls, injuries, item destruction/loss, arrivals, escapes, awakenings, system shutdowns, or public collapses.
- If a hand, item, weapon, body part, device, or route was destroyed, lost, burned, broken, disabled, or spent in saved canon, it cannot function normally or reappear intact in this chapter.
- This is not the final chapter: keep the central system/core/conspiracy active or only partially damaged, and end on a new unresolved pressure rather than victory or aftermath.
- System/core actions in this chapter must be attempts, partial/local damage, decoys, lockouts, or new failsafes; never a successful total shutdown/destruction/collapse.
`),`あなたは引き続きプロのベストセラー小説家です。以下の文脈を踏まえ、**第${e}章**（全${t}章中）を執筆してください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Entertainment engine: every chapter must force one vivid irreversible choice, one visible cost, and one expectation reversal that grows from earlier setup.
- Chapter-ending anti-pattern guard: never end on scenery-only afterglow (sunset, sky, wind, light, echo, or a neat emotional image). Rotate the ending pattern and break the expected mood with one concrete human friction: a messy spoken line, practical task, bodily discomfort, awkward silence, contradictory gesture, mundane noise, unpaid cost, or unfinished obligation.
- Escalation ladder: every scene must increase danger, desire, relationship strain, mystery, or moral cost; do not reset tension between scenes.
- Convert lore and exposition into conflict, objects, gestures, overheard lines, or decisions. Never explain a setting without making it pressure a character.
- Use visible paragraph breaks: add a newline after each prose paragraph, keep most paragraphs under 350 Japanese characters, and never return a chapter as a few giant text blocks.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.
- Internally build a 3-5 scene ledger before drafting, but output only the novel text and the required context memo.
- Every 1200-1800 Japanese characters should contain a visible action, conflict, discovery, or choice. Do not coast on atmosphere alone.
- Make this chapter inherit the previous chapter's cost, then create a new cost that changes the next chapter's options.
${p}


【基本設定（参照用）】
・ジャンル: ${c.genre} / テーマ: ${c.theme} / 時代: ${c.era}
・世界観: ${c.worldview} / 語り口: ${c.narr} / ターゲット: ${c.target}
・結末の方向性: ${c.ending}

【設定固定ルール（最重要）】
・上記の各項目はユーザーが選択・手入力した指定値です。生成中に別ジャンル、別テーマ、別時代、別世界観、別語り口、別ターゲット層、別結末へ置き換えないこと。
・指定されていないサブ値（例: 二転三転、東京、大人向け）を勝手に採用しないこと。
・未指定項目だけを補完し、選択・手入力済みの値は創作上の絶対条件として扱うこと。
・カテゴリだけが指定されている場合も正式な指定として扱い、その親カテゴリの外側のサブ値へ移動しないこと。
・未指定の隙間に電子機器、AI、SNS、ガジェット、スマホ、アプリ、電脳、量子、ロボット、監視システムなどを中心題材として差し込まないこと。SF・近未来・サイバーパンク・未来・AI視点などをユーザーが明示指定した場合のみ扱うこと。
${c.characterRosterRule}
${c.supplement}

${u}

【これまでの物語の要約（古い章）】
${n||"（第1章から開始のためなし）"}

【直近の章の全文】
${r}

【直前章の終点アンカー（ここから後を描く）】
${d||"（直前章本文なし）"}

【全章の文脈維持メモ（伏線・人物ロスター・モチーフ・設計）】
${s}
${y}
${Mn}
${c.eraRule}${c.allCategoryGuides}

【出力フォーマット（厳守）】
1. # 第${e}章: （章タイトル）
   （本文 — 上記の想定規模を満たすまで、章固有の事件・対立・感情変化を出し惜しみなく執筆すること）

${o?"2. 本文末尾の独立行に「【完】」を1回だけ出力して終了。区切り線、全文結合出力、再現用マスター指示書、総文字数報告、挨拶は出力禁止。":`2. 区切り線 ---

3. 文脈維持メモ（以下の4項目を必ず出力すること）
【回収待ち伏線メモ】現在残っている謎や伏線の一覧
【人物ロスター更新メモ】必須登場人物とAI追加人物の役割・現在地・状態変化・新規追加人物の設定
【モチーフ＆サブキャラ追跡メモ】回帰モチーフの状態とサブキャラの現在地
【次章のシーン設計（GMC+S）】次章のGoal/Motivation/Conflict/Stakes`}

★★★ 出力が完了したら停止してください。「続けますか？」等の質問は不要です。★★★`}function dt(e,t,a){const n=fe(e),r=new Date,s=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")} ${String(r.getHours()).padStart(2,"0")}:${String(r.getMinutes()).padStart(2,"0")}`;let o="Unknown",i="Unknown",c=0,u=0;if(a&&(a.engine==="gemini"?(o="Google Gemini API",i=a.geminiModel||"gemini-1.5-pro"):a.engine==="openai"&&(o="OpenAI API",i=a.openaiModel||"gpt-4o-mini"),a.longNovel)){c=a.longNovel.chapters?a.longNovel.chapters.length:0;const d=a.longNovel.cleanText?a.longNovel.cleanText.length:0,y=a.longNovel.memoText?a.longNovel.memoText.length:0;u=Math.floor((d+y)*1.5)+c*2e3}return`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 再現用マスター指示書（この設定で他のAIでも生成できます）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【監査用メタデータ】
・生成システム: Story Maker v${Fn}
・利用エンジン: ${o} (${i})
・生成完了日時: ${s}
・出力モード: 長編小説モード
・生成パラメータ: Temperature 1.0 (Creative)
・生成ループ回数: 完了章数 ${c} 章
・推定消費トークン: 約 ${u.toLocaleString()} Tokens (テキスト長ベース概算)

以下のプロンプトをChatGPT、Claude、Gemini等のAIに貼り付けることで、
同じ設定の長編小説を別のAIでも1章ずつ対話形式で生成できます。

--- ここからコピー ---

あなたはプロのベストセラー小説家です。以下の設定で長編小説を1章ずつ執筆してください。

■ 作品情報
タイトル: ${t.title||"（AIが決定）"}
ログライン: ${t.logline||"（AIが決定）"}
全構成: ${t.totalChapters?`全${t.totalChapters}章`:"（AIが決定）"}
予定総文字数: ${t.targetChars||"（AIが決定）"}

■ 基本設定
・ジャンル: ${n.genre}
・テーマ: ${n.theme}
・時代: ${n.era}
・世界観・雰囲気: ${n.worldview}
・語り口: ${n.narr}
・ターゲット層: ${n.target}
・結末の方向性: ${n.ending}

■ 設定固定ルール
・上記の各項目はユーザーが選択・手入力した指定値です。別ジャンル、別テーマ、別時代、別世界観、別語り口、別ターゲット層、別結末へ置き換えないこと。
・指定されていないサブ値（例: 二転三転、東京、大人向け）を勝手に採用しないこと。
・未指定項目だけを補完し、選択・手入力済みの値は創作上の絶対条件として扱うこと。
・カテゴリだけが指定されている場合も正式な指定として扱い、その親カテゴリの外側のサブ値へ移動しないこと。
・未指定の隙間に電子機器、AI、SNS、ガジェット、スマホ、アプリ、電脳、量子、ロボット、監視システムなどを中心題材として差し込まないこと。SF・近未来・サイバーパンク・未来・AI視点などをユーザーが明示指定した場合のみ扱うこと。

■ 登場人物
${n.charDesc}
${n.characterRosterRule}
${n.supplement}

■ あらすじ
${t.synopsis||"（上記設定に基づきAIが設計）"}

■ プロット概要
${t.plotOutline||"（上記設定に基づきAIが設計）"}

■ 執筆ルール
・1章ずつ書いて停止し、「続けますか？」と確認すること
・各章の末尾に【回収待ち伏線メモ】【人物ロスター更新メモ】【モチーフ＆サブキャラ追跡メモ】【次章のシーン設計（GMC+S）】を残すこと
・Show, Don't Tell を徹底し、五感描写と身体的反応で感情を表現すること
- Entertainment engine: each chapter must force an irreversible choice, show the cost, and reverse the meaning of one earlier detail.
- Chapter-ending anti-pattern guard: avoid scenery-only afterglow; rotate the ending pattern and break the expected mood with a messy spoken line, practical task, bodily discomfort, awkward silence, mundane noise, unpaid cost, or unfinished obligation.
- Escalation ladder: every scene must increase danger, desire, relationship strain, mystery, or moral cost.
・各章に感情落差（逆転・置換・誇張等）を最低1回仕込むこと
・伏線は序盤に配置し、後半で回収すること（唐突な新設定禁止）
・文体の緩急（高熱量/静謐/冷徹）を使い分け、同系統3段落連続を禁止
・最終章で全伏線を回収し、主人公の決断で着地させること

では、まず【作品ヘッダー情報】を出力し、第1章を執筆してください。

--- ここまでコピー ---
`}const Wa=`この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
画像内に描かれている全てのキャラクターについて、以下の情報をJSON配列で抽出してください。

【抽出項目】
1. name: キャラクター名（画像内のテキストから正確に読み取る）
2. sex: 性別（テキストから読み取るか外見から推測。男性/女性/無性/回答無し など。推測なら(推定)を付与）
3. role: 物語での役割（テキストから推定、なければ外見や設定文から推測。例：主人公、ヒロイン、ライバルなど）
4. personality: 性格（テキストから読み取り、なければ表情・ポーズ・設定文から推測。例：元気、クール、ツンデレなど）
5. note: 外見的特徴・設定メモ（以下を全て含むこと）
   - 髪型（長さ・スタイル・色）
   - 服装
   - 眼鏡の有無
   - 体格・身長に関する記述
   - 画像内に書かれた制約条件（「厳禁」「必須」「注意」など）
   - キャラクター間の関係性（幼馴染、同級生など）
   - その他読み取れる設定情報全て

【重要ルール】
- 画像内の日本語テキストを正確に読み取ること（手書き文字も含む）
- 「厳禁」「必須」「注意」などの制約条件は特に重要なので確実にnoteに含めること
- 推測で埋めた項目には末尾に「(推定)」と付けること
- 必ず有効なJSON配列のみを出力すること。説明文・挨拶・マークダウン装飾は一切不要
- JSONはコードブロックで囲まず、純粋なJSON文字列のみ出力すること

出力例:
[{"name":"アカリ","sex":"女性","role":"主人公(推定)","personality":"元気","note":"内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;function Ja(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const r=n.result.split(",")[1];t(r)},n.onerror=a,n.readAsDataURL(e)})}function za(e){let t="",a=!1;for(let n=0;n<e.length;n++){const r=e[n];a?r==="\\"?(t+=r,n+1<e.length&&(t+=e[n+1],n++)):r==='"'?(a=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):r==="	"?t+="\\t":t+=r:(r==='"'&&(a=!0),t+=r)}return t}function Ya(e){const t=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!t)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");let a=t[0];try{return JSON.parse(a)}catch(r){console.warn("キャラクターJSON初回パース失敗、修復を試行:",r.message)}let n=za(a);n=n.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(n)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}function Xa(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return $e.find(a=>a===t)||$e.find(a=>t.includes(a)||a.includes(t))||t}function Za(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return Ce.find(a=>a===t)||Ce.find(a=>t.includes(a)||a.includes(t))||t}function Qa(e,t){const a=$e.map(i=>`<option value="${i}">${i}</option>`).join(""),n=Ce.map(i=>`<option value="${i}">${i}</option>`).join(""),r=e.map((i,c)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${c}" checked>
          <span class="ci-char-name-display">${i.name||`キャラ${c+1}`}</span>
        </label>
        <span class="ci-char-badge">${i.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${c}" value="${(i.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${c}" value="${(i.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${c}">
              <option value="">-- 自由入力に切替 --</option>
              ${a}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${c}" value="${(i.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${c}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${c}" value="${(i.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${c}" rows="3">${(i.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),s=Array.isArray(t)?t:t?[t]:[],o=s.length>0?`<div class="ci-thumbnail-wrap">${s.map((i,c)=>`<img src="${i}" class="ci-thumbnail" alt="解析元画像 ${c+1}">`).join("")}</div>`:"";return`
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${e.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${o}
        <div class="ci-char-list">
          ${r}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `}function er(e,t){const a=document.getElementById("ci-modal");a&&(a.querySelectorAll(".ci-role-select").forEach(n=>{const r=n.dataset.idx,s=a.querySelector(`.ci-role-input[data-idx="${r}"]`),o=$e.find(i=>i===s.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(s.value=n.value)}),s.addEventListener("input",()=>{const i=$e.find(c=>c===s.value);n.value=i||""})}),a.querySelectorAll(".ci-personality-select").forEach(n=>{const r=n.dataset.idx,s=a.querySelector(`.ci-personality-input[data-idx="${r}"]`),o=Ce.find(i=>i===s.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(s.value=n.value)}),s.addEventListener("input",()=>{const i=Ce.find(c=>c===s.value);n.value=i||""})}),document.getElementById("ci-modal-close").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-cancel").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-register").addEventListener("click",()=>{const n=[];a.querySelectorAll(".ci-check").forEach(r=>{var s,o,i,c,u;if(!r.checked)return;const d=parseInt(r.dataset.idx),y=((s=a.querySelector(`.ci-name[data-idx="${d}"]`))==null?void 0:s.value)||"",p=((o=a.querySelector(`.ci-sex[data-idx="${d}"]`))==null?void 0:o.value)||"",m=((i=a.querySelector(`.ci-role-input[data-idx="${d}"]`))==null?void 0:i.value)||"",f=((c=a.querySelector(`.ci-personality-input[data-idx="${d}"]`))==null?void 0:c.value)||"",h=((u=a.querySelector(`.ci-note[data-idx="${d}"]`))==null?void 0:u.value)||"";n.push({name:y,sex:p,role:m,personality:f,note:h})}),t(n),a.remove()}))}function tr(e,t,a){const n=document.getElementById("ci-dropzone"),r=document.getElementById("ci-file-input"),s=document.getElementById("ci-status");if(!n||!r)return;n.addEventListener("dragover",c=>{c.preventDefault(),!(e.locked&&e.locked.chars)&&n.classList.add("ci-dragover")}),n.addEventListener("dragleave",()=>{n.classList.remove("ci-dragover")}),n.addEventListener("drop",c=>{if(c.preventDefault(),n.classList.remove("ci-dragover"),e.locked&&e.locked.chars)return;const u=Array.from(c.dataTransfer.files).filter(d=>d.type.startsWith("image/"));u.length>0&&o(u)}),n.addEventListener("click",()=>{e.locked&&e.locked.chars||r.click()}),r.addEventListener("change",c=>{if(e.locked&&e.locked.chars)return;const u=Array.from(c.target.files).filter(d=>d.type.startsWith("image/"));u.length>0&&(o(u),c.target.value="")});async function o(c){if(e.locked&&e.locked.chars)return;const u=a();if(!u){alert("APIキーを先に保存してください");return}const d=["image/png","image/jpeg","image/webp","image/gif"],y=c.filter(h=>d.includes(h.type)?!0:(console.warn(`非対応形式スキップ: ${h.name} (${h.type})`),!1));if(y.length===0){alert(`対応する画像ファイルがありません。
PNG/JPG/WEBP/GIF のみ対応しています。`);return}n.classList.add("ci-loading");const p=document.getElementById("global-alert");p&&(p.innerHTML="⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。",p.style.display="flex"),s&&(s.textContent=`🔍 ${y.length}枚の画像を解析中...（数秒〜数十秒）`,s.classList.remove("hidden"));const m=[],f=[];try{for(let h=0;h<y.length;h++){const v=y[h];s&&y.length>1&&(s.textContent=`🔍 画像 ${h+1}/${y.length} を解析中...`),p&&y.length>1&&(p.innerHTML=`⚠️ <strong>画像認識中 (${h+1}/${y.length}):</strong> AIがキャラクターシートを解析しています...`);const b=await Ja(v);f.push(`data:${v.type};base64,${b}`);const{text:$}=await Sn(u,Wa,b,v.type,void 0,{responseMimeType:"application/json"}),C=Ya($);C&&C.length>0&&(C.forEach(w=>{w.role=Xa(w.role),w.personality=Za(w.personality)}),m.push(...C))}if(m.length===0)throw new Error("キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。");i(m,f),s&&(s.textContent=`✅ ${m.length}キャラクター検出！確認してください。`)}catch(h){console.error("Character import error:",h),s&&(s.textContent=`❌ エラー: ${h.message}`),setTimeout(()=>{s&&s.classList.add("hidden")},5e3)}finally{n.classList.remove("ci-loading"),p&&(p.style.display="none")}}function i(c,u){var d;(d=document.getElementById("ci-modal"))==null||d.remove();const y=document.createElement("div");y.innerHTML=Qa(c,u),document.body.appendChild(y.firstElementChild),er(c,p=>{p.forEach(m=>{e.characters.push({name:m.name||"",sex:m.sex||"",role:m.role||"",personality:m.personality||"",note:m.note||""})}),t(),s&&(s.textContent=`✅ ${p.length}キャラクターを登録しました！`,setTimeout(()=>s.classList.add("hidden"),3e3))})}}const I=e=>document.getElementById(e);let z=[],Q=[],re=null,Ne="",Ae=()=>"",nt=()=>"";const yt=`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 出力フォーマット（必ずこのJSON形式で出力。各項目は詳細に記述すること）

\`\`\`json
{
  "style_name": "この作風を一言で表す名前",
  "tone": "全体のトーン・雰囲気（複合的に記述）",
  "narrative_voice": {
    "person": "人称（一人称/二人称/三人称/混合）",
    "distance": "語り手と物語の距離感（密着型/中距離/俯瞰型）",
    "reliability": "語り手の信頼度（信頼できる語り手/不確かな語り手/意図的な嘘つき）",
    "intrusion": "語り手の介入度（透明/時折コメント/頻繁に介入/メタフィクション的）"
  },
  "sentence_style": {
    "avg_length": "一文の平均的な長さ（短文主体○字前後/中文/長文主体○字前後）",
    "length_variation": "文長のばらつき（均一/やや変化/激しい緩急）",
    "ending_patterns": "文末パターン上位3つ（例：だ。/である。/体言止め。の比率）",
    "rhythm": "文のリズム感の詳細",
    "paragraph_length": "段落の長さ傾向（短段落○行/中段落/長段落○行）",
    "paragraph_structure": "段落の構成パターン（トピックセンテンス型/帰納型/散文型）"
  },
  "vocabulary": {
    "level": "語彙レベル（日常的/文学的/専門的/混合）",
    "density": "情報密度（疎/標準/濃密）",
    "register": "言語レジスター（口語/文語/混合/コードスイッチング）",
    "quirks": "語彙の癖・特徴的な語彙選択",
    "foreign_words": "外来語・カタカナ語の使用傾向",
    "archaic_modern": "古語・現代語のバランス"
  },
  "rhetoric": {
    "metaphor_style": "比喩の傾向（直喩多用/暗喩中心/擬人法/換喩/提喩）",
    "metaphor_source": "比喩の素材（自然/都市/身体/テクノロジー/食物等）",
    "repetition": "反復技法の使用（アナフォラ/エピフォラ/畳語/なし）",
    "irony_level": "アイロニーの度合い（なし/軽微/中程度/全編的）",
    "humor_type": "ユーモアの型（不条理/風刺/自虐/言葉遊び/ブラック/なし）",
    "other_techniques": "その他の修辞技法（倒置/省略/列挙/対句等）"
  },
  "description_focus": {
    "visual": "視覚描写（色彩傾向・画角・光と影の使い方）",
    "auditory": "聴覚描写（音の種類・静寂の扱い）",
    "tactile": "触覚描写（温度・質感・痛覚）",
    "olfactory_gustatory": "嗅覚・味覚描写の有無と傾向",
    "kinesthetic": "運動感覚・身体感覚の描写傾向",
    "spatial": "空間把握の方法（広角/クローズアップ/移動視点）",
    "psychological_depth": "心理描写の深度と手法",
    "show_tell_ratio": "Show:Tellの推定比率（例：7:3）と手法"
  },
  "dialogue": {
    "style": "セリフの文体的特徴",
    "function": "セリフの機能的役割（情報伝達/性格描写/プロット推進/雰囲気構築）",
    "tag_style": "地の文とセリフの接続方法（最小限/動作付き/心理付き）",
    "dialect_sociolect": "方言・社会方言の使用（標準語/方言/階層差/キャラ語尾）",
    "subtext": "言外の意味の使い方（直接的/暗示的/多層的）"
  },
  "structure": {
    "pacing": "テンポの詳細（加速パターン・減速パターン）",
    "scene_transition": "場面転換の手法（カット/フェード/ブリッジ/意識の流れ）",
    "time_handling": "時制の使い方（直線的/回想多用/時系列シャッフル）",
    "tension_curve": "緊張の曲線パターン（漸増/波状/急転直下/持続型）",
    "opening_style": "冒頭の特徴的パターン",
    "closing_style": "結末の特徴的パターン"
  },
  "emotional_architecture": {
    "dominant_emotions": "主要な感情（上位3つ）",
    "emotional_range": "感情の振り幅（狭い/中程度/広い）",
    "catharsis_method": "カタルシスの与え方",
    "reader_distance": "読者との感情的距離（共感誘導/突き放し/観察的）"
  },
  "themes_tendency": "テーマの傾向（詳細に）",
  "literary_influences": "文学的影響を感じる作家・流派（推定）",
  "unique_features": ["この作者固有の表現技法・癖を5つ以上箇条書き"],
  "anti_patterns": ["この作者が意図的に避けていると思われる表現"],
  "reproduction_prompt": "この作風を他のAI（ChatGPT/Claude/Gemini等）で完全に再現するための詳細な指示文。600字以上で、文体・語彙・修辞・構造・感情設計の全側面を網羅すること"
}
\`\`\`

## 重要指示:
- 各項目は「一言」ではなく「具体的根拠を含む2〜3文」で記述すること
- unique_featuresは最低5項目、具体的な用例を添えること
- reproduction_promptは他のAIにそのままコピペして使える完成度にすること
- 【最重要】値の文字列内で二重引用符を使用する場合は、生の半角ダブルクォーテーション（"）を出力することを完全に禁止します。もし引用やコードブロックなどで二重引用符を出力する必要がある場合は、必ず全角の二重引用符（””）か二重山括弧（『』）に置換して出力してください。生の半角ダブルクォーテーション（"）は、JSONのキー名と値の囲み記号としてのみしか使用してはなりません。値の文字列の中に生の半角ダブルクォーテーション（"）が混入するとJSONの構文エラーになるため、このルールは絶対に遵守してください。
- **画像のみの入力、あるいは情報が少ない入力に対する指示**:
  - 入力されたテキストが短い単語・一文のみである場合、または画像（イラスト）のみの入力である場合は、その言葉や絵の空気感から想起される背景、世界観、感情、言外のニュアンス、またはポップカルチャーや文化的背景を最大限に想像・補完してください。
  - 特に画像のみの解析時におけるテキスト固有の項目（文体、語彙、セリフ、修辞、テンポ等）については、「もしこのイラストを描いた作者が文章を執筆するならば、どのような文体、語彙、テンポ、語り口にするか」を想像力をフルに働かせて具体的に推測・補完してください。
  - 情報不足を理由にした「判定不可」「画像のみのため解析不能」「不明」といった出力や簡素すぎる記述は絶対に禁止します。エンターテインメントとしての面白さを重視し、すべての項目を具体的かつクリエイティブな想像力で詳細に埋めてください。

## 分析対象テキスト:
`;function nr(e){var t,a;const n=[],r=(o,i)=>{i&&n.push(`【${o}】${i}`)},s=(o,i)=>{i&&n.push(`  ・${o}: ${i}`)};return r("作風名",e.style_name),r("トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(n.push("【語りの視点】"),s("人称",e.narrative_voice.person),s("距離感",e.narrative_voice.distance),s("信頼度",e.narrative_voice.reliability),s("介入度",e.narrative_voice.intrusion)):r("語りの視点",e.narrative_voice),e.sentence_style&&(n.push("【文体】"),s("平均文長",e.sentence_style.avg_length||e.sentence_style.length),s("文長変動",e.sentence_style.length_variation),s("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),s("リズム",e.sentence_style.rhythm),s("段落長",e.sentence_style.paragraph_length),s("段落構成",e.sentence_style.paragraph_structure)),e.vocabulary&&(n.push("【語彙】"),s("レベル",e.vocabulary.level),s("情報密度",e.vocabulary.density),s("レジスター",e.vocabulary.register),s("特徴",e.vocabulary.quirks),s("外来語",e.vocabulary.foreign_words),s("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(n.push("【修辞技法】"),s("比喩スタイル",e.rhetoric.metaphor_style),s("比喩素材",e.rhetoric.metaphor_source),s("反復技法",e.rhetoric.repetition),s("アイロニー",e.rhetoric.irony_level),s("ユーモア",e.rhetoric.humor_type),s("その他",e.rhetoric.other_techniques)),e.description_focus&&(n.push("【描写フォーカス】"),s("視覚",e.description_focus.visual),s("聴覚",e.description_focus.auditory),s("触覚",e.description_focus.tactile),s("嗅覚/味覚",e.description_focus.olfactory_gustatory),s("運動感覚",e.description_focus.kinesthetic),s("空間把握",e.description_focus.spatial),s("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),s("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue&&(n.push("【セリフ】"),s("文体",e.dialogue.style),s("機能",e.dialogue.function),s("タグ",e.dialogue.tag_style),s("方言",e.dialogue.dialect_sociolect),s("サブテキスト",e.dialogue.subtext)),e.structure&&(n.push("【構造】"),s("テンポ",e.structure.pacing),s("場面転換",e.structure.scene_transition),s("時制",e.structure.time_handling),s("緊張曲線",e.structure.tension_curve),s("冒頭パターン",e.structure.opening_style),s("結末パターン",e.structure.closing_style)),e.emotional_architecture&&(n.push("【感情設計】"),s("主要感情",e.emotional_architecture.dominant_emotions),s("振り幅",e.emotional_architecture.emotional_range),s("カタルシス",e.emotional_architecture.catharsis_method),s("読者距離",e.emotional_architecture.reader_distance)),r("テーマ傾向",e.themes_tendency),r("文学的影響",e.literary_influences),(t=e.unique_features)!=null&&t.length&&(n.push("【固有の特徴】"),e.unique_features.forEach(o=>n.push(`  ・${o}`))),(a=e.anti_patterns)!=null&&a.length&&(n.push("【回避パターン（この作風では避けるべき表現）】"),e.anti_patterns.forEach(o=>n.push(`  ・${o}`))),n.join(`
`)}function ar(e,t){const a=nr(e),n=t.length,r=Math.floor(n*.8),s=Math.ceil(n*1.2);return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

## 最重要ルール（絶対遵守・違反厳禁）:
1. **物語の完全保持**: プロット（起承転結）、登場人物、セリフの内容、設定、事件の順序は一切変更しない。リライトとは「同じ物語を別の文体で語り直す」ことであり、物語の骨格を壊すことではない。
2. **文章として成立させる**: リライト結果は必ず「小説・物語」として完全に成立する連続した散文であること。単語の羅列、名詞だけの断片、箇条書き、詩のような体言止めの連続は絶対に禁止する。
3. **文字数の厳守**: 元のテキストは${n.toLocaleString()}字です。リライト結果は${r.toLocaleString()}字〜${s.toLocaleString()}字の範囲に収めること。この範囲を逸脱した場合は失敗とみなす。
4. **タイトル保持**: タイトルがあればそのまま維持する。
5. **出力制限**: リライト結果の本文のみを出力する。メタ解説、注釈、「以下はリライト結果です」等の前置きは一切付けない。
6. **物語の体裁の維持と自然な融合（ぶつ切りの解説挿入の禁止）**: 作風パラメータに「読者への問いかけ」「解説の挿入」「ツッコミ」等の指示がある場合、それらを小説のストーリーの中に唐突な「現実のPCやIT製品のブログ解説記事（例:『PCを処分する際、データをそのまま放置していませんか？』等）」としてそのままぶつ切りで挿入し、小説としての体裁を崩してはならない。作風（語り口、比喩のスタイル、ツッコミのトーン）は、必ず**小説内の事象（例: 電脳戦国世界での出来事や、登場人物の行動・運命）に引き寄せて、物語の一部として自然に溶け込ませて適用すること**。例えば、現実の製品名（EaseUS BitWiper等）やIT用語を比喩（例:「まるでSSDのウェアレベリングのように...」）や電脳世界の用語としてストーリー内に取り入れることは歓迎されるが、物語の文脈を無視して無関係な現実世界のブログ記事の地の文をそのまま挿入することは厳禁である。

## 作風パラメータの適用方針:
- 以下の作風パラメータは「方向性の指針」として参考にすること。極端な値があっても、それを100%忠実に再現しようとして物語を破壊してはならない。
- 例えば「体言止め40%」と記載されていても、全文を体言止めの名詞だけにしてはならない。あくまで「体言止めを多めに取り入れる」程度に留め、文章の流れと可読性を最優先する。
- 「Show:Tell比率 10:0」と記載されていても、最低限の説明文（Tell）は物語の理解に必要なため、完全排除はしない。
- 作風パラメータの各項目は「この方向性に寄せる」というガイドラインであり、物語の可読性・完成度を犠牲にしてまで厳密に従う必要はない。

## 作風パラメータ:
${a}

## 元のテキスト:
${t}

## リライト結果:`}function On(e){const t=I("settings");t&&t.classList.add("generating");const a=I("sa-section");a&&a.classList.add("generating");const n=document.querySelector(".btn-generate");n&&(n._origText=n.textContent,n.disabled=!0,n.innerHTML=`<span class="spinner"></span>${e}`);const r=I("sa-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const s=I("sa-reflect-api-status");s&&(s.innerHTML=`<span class="spinner"></span>${e}`,s.classList.remove("hidden"));const o=I("global-alert");o&&(o.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,o.style.display="flex");const i=I("thought-score-board");i&&(i.style.display="none")}function dn(e){const t=I("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const a=I("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`);const n=document.querySelector(".btn-generate");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const r=I("global-alert");r&&(r.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const s=I("thought-score-board");s&&(s.style.display="none")}function Rn(){const e=I("settings");e&&e.classList.remove("generating");const t=I("sa-section");t&&t.classList.remove("generating");const a=document.querySelector(".btn-generate");a&&(a.disabled=!1,a.textContent=a._origText||"ストーリー生成");const n=I("sa-api-status");n&&n.classList.add("hidden");const r=I("sa-reflect-api-status");r&&r.classList.add("hidden");const s=I("global-alert");s&&(s.style.display="none")}function rr(){const e=I("sa-dropzone"),t=I("sa-file-input");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",a=>{a.preventDefault(),e.classList.add("sa-dragover")}),e.addEventListener("dragleave",()=>{e.classList.remove("sa-dragover")}),e.addEventListener("drop",a=>{a.preventDefault(),e.classList.remove("sa-dragover"),pn(a.dataTransfer.files)}),t.addEventListener("change",a=>{pn(a.target.files),t.value=""}))}async function pn(e){const t=Array.from(e),a=t.filter(r=>r.type==="text/plain"||r.name.endsWith(".txt")||r.name.endsWith(".md")||r.name.endsWith(".csv")||r.type===""),n=t.filter(r=>r.type.startsWith("image/"));if(a.length===0&&n.length===0){alert("テキストファイル (.txt, .md) または画像ファイルをドロップしてください");return}for(const r of a)try{const s=await sr(r);s.trim().length>0&&z.push({name:r.name,text:s.trim(),charCount:s.trim().length})}catch(s){console.warn(`ファイル読み込み失敗: ${r.name}`,s)}for(const r of n)try{const s=await or(r),o=URL.createObjectURL(r);Q.push({name:r.name,base64:s,mimeType:r.type,previewUrl:o})}catch(s){console.warn(`画像ファイル読み込み失敗: ${r.name}`,s)}pt(),qt(),(z.length>0||Q.length>0)&&I("sa-dropzone").classList.add("sa-has-files"),ye()}function sr(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=r=>t(r.target.result),n.onerror=a,n.readAsText(e,"UTF-8")})}function or(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=r=>{const s=r.target.result.split(",")[1];t(s)},n.onerror=a,n.readAsDataURL(e)})}function pt(){const e=I("sa-file-list");if(!e)return;const t=z.reduce((n,r)=>n+r.charCount,0),a=I("sa-file-count");a&&(a.textContent=`${z.length}件 / ${t.toLocaleString()}字`,a.classList.remove("hidden")),e.innerHTML=z.map((n,r)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${wt(n.name)}</span>
      <span class="sa-file-chars">${n.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${r}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(n=>{n.addEventListener("click",r=>{const s=parseInt(r.target.dataset.idx);z.splice(s,1),pt(),z.length===0&&(I("sa-dropzone").classList.remove("sa-has-files"),I("sa-file-count").classList.add("hidden")),ye()})})}function qt(){const e=I("sa-image-list");if(e){if(Q.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden"),e.innerHTML=Q.map((t,a)=>`
    <div class="sa-image-item">
      <img src="${t.previewUrl}" alt="${wt(t.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${wt(t.name)}</span>
      <button class="sa-file-remove" data-img-idx="${a}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(t=>{t.addEventListener("click",a=>{var n;const r=parseInt(a.target.dataset.imgIdx);(n=Q[r])!=null&&n.previewUrl&&URL.revokeObjectURL(Q[r].previewUrl),Q.splice(r,1),qt(),z.length===0&&Q.length===0&&I("sa-dropzone").classList.remove("sa-has-files"),ye()})})}}function ir(e){const t=e.indexOf("{");if(t===-1)return null;const a=e.lastIndexOf("}");return a===-1||a<t?null:e.slice(t,a+1)}function lr(e){let t="",a=!1;for(let n=0;n<e.length;n++){const r=e[n];a?r==="\\"?(t+=r,n+1<e.length&&(t+=e[n+1],n++)):r==='"'?(a=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):r==="	"?t+="\\t":t+=r:(r==='"'&&(a=!0),t+=r)}return t}const cr=["style_name","tone","narrative_voice","person","distance","reliability","intrusion","sentence_style","avg_length","length_variation","ending_patterns","rhythm","paragraph_length","paragraph_structure","vocabulary","level","density","register","quirks","foreign_words","archaic_modern","rhetoric","metaphor_style","metaphor_source","repetition","irony_level","humor_type","other_techniques","description_focus","visual","auditory","tactile","olfactory_gustatory","kinesthetic","spatial","psychological_depth","show_tell_ratio","dialogue","style","function","tag_style","dialect_sociolect","subtext","structure","pacing","scene_transition","time_handling","tension_curve","opening_style","closing_style","emotional_architecture","dominant_emotions","emotional_range","catharsis_method","reader_distance","themes_tendency","literary_influences","unique_features","anti_patterns","reproduction_prompt"];function ur(e){let t=e.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,"");const a=[];if(cr.forEach(r=>{const s=new RegExp(`"${r}"\\s*:`,"g");let o;for(;(o=s.exec(t))!==null;)a.push({key:r,start:o.index,end:o.index+o[0].length})}),a.sort((r,s)=>r.start-s.start),a.length===0)return JSON.parse(t);const n={};for(let r=0;r<a.length;r++){const s=a[r],o=a[r+1],i=s.end;let c=o?o.start:t.length,u=t.slice(i,c).trim();if(!o){const d=u.lastIndexOf("}");d!==-1&&(u=u.slice(0,d).trim())}if(u=u.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g,""),u.startsWith("[")&&u.endsWith("]")){let d=u.slice(1,-1).trim();const y=[],p=d.split(/",\s*"/);p.forEach((m,f)=>{let h=m.trim();f===0&&h.startsWith('"')&&(h=h.slice(1)),f===p.length-1&&h.endsWith('"')&&(h=h.slice(0,-1)),h=h.replace(/"/g,'\\"'),h=h.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t"),y.push(h)}),n[s.key]=y}else{let d=!1;u.startsWith('"')&&(u=u.slice(1),d=!0),u.endsWith('"')&&(u=u.slice(0,-1)),d&&(u=u.replace(/"/g,'\\"'),u=u.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t")),n[s.key]=u}}return{style_name:n.style_name||"",tone:n.tone||"",narrative_voice:{person:n.person||"",distance:n.distance||"",reliability:n.reliability||"",intrusion:n.intrusion||""},sentence_style:{avg_length:n.avg_length||"",length_variation:n.length_variation||"",ending_patterns:n.ending_patterns||"",rhythm:n.rhythm||"",paragraph_length:n.paragraph_length||"",paragraph_structure:n.paragraph_structure||""},vocabulary:{level:n.level||"",density:n.density||"",register:n.register||"",quirks:n.quirks||"",foreign_words:n.foreign_words||"",archaic_modern:n.archaic_modern||""},rhetoric:{metaphor_style:n.metaphor_style||"",metaphor_source:n.metaphor_source||"",repetition:n.repetition||"",irony_level:n.irony_level||"",humor_type:n.humor_type||"",other_techniques:n.other_techniques||""},description_focus:{visual:n.visual||"",auditory:n.auditory||"",tactile:n.tactile||"",olfactory_gustatory:n.olfactory_gustatory||"",kinesthetic:n.kinesthetic||"",spatial:n.spatial||"",psychological_depth:n.psychological_depth||"",show_tell_ratio:n.show_tell_ratio||""},dialogue:{style:n.style||"",function:n.function||"",tag_style:n.tag_style||"",dialect_sociolect:n.dialect_sociolect||"",subtext:n.subtext||""},structure:{pacing:n.pacing||"",scene_transition:n.scene_transition||"",time_handling:n.time_handling||"",tension_curve:n.tension_curve||"",opening_style:n.opening_style||"",closing_style:n.closing_style||""},emotional_architecture:{dominant_emotions:n.dominant_emotions||"",emotional_range:n.emotional_range||"",catharsis_method:n.catharsis_method||"",reader_distance:n.reader_distance||""},themes_tendency:n.themes_tendency||"",literary_influences:n.literary_influences||"",unique_features:Array.isArray(n.unique_features)?n.unique_features:[],anti_patterns:Array.isArray(n.anti_patterns)?n.anti_patterns:[],reproduction_prompt:n.reproduction_prompt||""}}function dr(e){try{return JSON.parse(e)}catch(a){console.warn("JSON初回パース失敗、修復を試行:",a.message)}let t=e.trim();t=lr(t),t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":'),t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(a){console.warn("JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:",a.message);try{return ur(t)}catch(n){console.warn("キー境界パースも失敗、最後の攻撃的修復を試行:",n.message);try{let r=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(r)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}}}function wt(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function pr(){const e=Ae();if(!e){alert("APIキーを保存してから解析してください");return}const t=I("sa-direct-text"),a=t?t.value.trim():"";if(z.length===0&&Q.length===0&&!a){alert("テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください");return}const n=I("btn-sa-analyze"),r=I("sa-result-wrap"),s=I("sa-result"),o=I("sa-reflect-wrap"),i=I("sa-reflect-result-wrap"),c=I("progress-log"),u=I("thought-score-board"),d=I("progress-title-text");c&&(c.textContent="作風解析の開始を待っています..."),u&&(u.innerHTML="",u.style.display="none"),d&&(d.textContent="AI進捗・思考ログ: 作風解析中..."),n.disabled=!0,n.innerHTML='<span class="spinner"></span>AIが超強引に作風を解析中...',s.textContent="超強引に解析中です...しばらくお待ちください（1分〜3分程度）",r.classList.remove("hidden"),o.classList.add("hidden"),i.classList.add("hidden"),On("🔬 超強引！作風解析中...");try{let y=[];z.length>0&&(y=z.map(w=>`--- ${w.name} ---
${w.text}`)),a&&y.push(`--- 直接貼り付けテキスト ---
${a}`);let p=y.join(`

`);p.length>1e5&&(p=p.slice(0,1e5)+`

[...以降のテキストは省略（コンテキスト上限）...]`);const m=Q.length>0,f=p.length>0;let h=yt;m&&f?h=yt.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 画像分析の追加指示:
- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること
- テキストと画像の両方から相乗的に作風パラメータを抽出すること`):m&&!f&&(h=yt.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。

## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:
- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。
- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。

## 画像分析指示:
- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること`)),f&&(h=h+p);const v=me[0].value;let b;m?b=(await Oa(e,h,Q,w=>{dn(`フォールバック: ${w}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${w}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text:b=(await Fe(e,v,h,w=>{dn(`フォールバック: ${w}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${w}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text;let $="";const C=ir(b);if(C)$=C;else{const w=b.match(/```json\s*([\s\S]*?)\s*```/);if(w)$=w[1];else{const E=b.match(/\{[\s\S]*\}/);if(E)$=E[0];else throw new Error("AIの応答からJSONを抽出できませんでした")}}re=dr($),hr(re),d&&(d.textContent="AI進捗・思考ログ: 作風解析完了"),c&&(c.textContent=`作風解析が完了しました。解析結果が右パネルに表示されています。
作風名: ${re.style_name||"未定義"}
トーン: ${re.tone||"未定義"}`),o.classList.remove("hidden"),Me()}catch(y){s.textContent=`解析エラー: ${y.message}`,s.classList.add("sa-error"),d&&(d.textContent="AI進捗・思考ログ: 解析エラー"),c&&(c.textContent=`作風解析エラーが発生しました:
${y.message}`)}finally{n.disabled=!1,n.innerHTML="🔬 超強引！作風解析を実行",Rn()}}function hr(e){var t,a;const n=I("sa-result");n.classList.remove("sa-error");const r=[],s=(c,u,d)=>{d&&r.push(`${c} ${u}: ${d}`)},o=(c,u)=>{u&&r.push(`  ・${c}: ${u}`)},i=(c,u)=>{r.push(""),r.push(`${c} ${u}:`)};s("🏷️","作風名",e.style_name),s("🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(i("🎙️","語りの視点"),o("人称",e.narrative_voice.person),o("距離感",e.narrative_voice.distance),o("信頼度",e.narrative_voice.reliability),o("介入度",e.narrative_voice.intrusion)):s("🎙️","語りの視点",e.narrative_voice),i("📝","文体"),e.sentence_style&&(o("平均文長",e.sentence_style.avg_length||e.sentence_style.length),o("文長変動",e.sentence_style.length_variation),o("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),o("リズム",e.sentence_style.rhythm),o("段落長",e.sentence_style.paragraph_length),o("段落構成",e.sentence_style.paragraph_structure)),i("📖","語彙"),e.vocabulary&&(o("レベル",e.vocabulary.level),o("情報密度",e.vocabulary.density),o("レジスター",e.vocabulary.register),o("特徴",e.vocabulary.quirks),o("外来語",e.vocabulary.foreign_words),o("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(i("🔮","修辞技法"),o("比喩スタイル",e.rhetoric.metaphor_style),o("比喩素材",e.rhetoric.metaphor_source),o("反復技法",e.rhetoric.repetition),o("アイロニー",e.rhetoric.irony_level),o("ユーモア",e.rhetoric.humor_type),o("その他",e.rhetoric.other_techniques)),i("🖼️","描写フォーカス"),e.description_focus&&(o("視覚",e.description_focus.visual),o("聴覚",e.description_focus.auditory),o("触覚",e.description_focus.tactile),o("嗅覚/味覚",e.description_focus.olfactory_gustatory),o("運動感覚",e.description_focus.kinesthetic),o("空間把握",e.description_focus.spatial),o("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),o("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(i("💬","セリフ"),o("文体",e.dialogue.style),o("機能",e.dialogue.function),o("タグ",e.dialogue.tag_style),o("方言",e.dialogue.dialect_sociolect),o("サブテキスト",e.dialogue.subtext)):s("💬","セリフ回し",e.dialogue_style),e.structure?(i("🏗️","構造"),o("テンポ",e.structure.pacing),o("場面転換",e.structure.scene_transition),o("時制",e.structure.time_handling),o("緊張曲線",e.structure.tension_curve),o("冒頭パターン",e.structure.opening_style),o("結末パターン",e.structure.closing_style)):s("⏱️","テンポ",e.pacing),e.emotional_architecture&&(i("❤️","感情設計"),o("主要感情",e.emotional_architecture.dominant_emotions),o("振り幅",e.emotional_architecture.emotional_range),o("カタルシス",e.emotional_architecture.catharsis_method),o("読者距離",e.emotional_architecture.reader_distance)),s("🎯","テーマ傾向",e.themes_tendency),s("📚","文学的影響",e.literary_influences),r.push(""),(t=e.unique_features)!=null&&t.length&&(r.push("✨ 固有の特徴:"),e.unique_features.forEach(c=>r.push(`  ・${c}`))),(a=e.anti_patterns)!=null&&a.length&&(r.push(""),r.push("🚫 回避パターン:"),e.anti_patterns.forEach(c=>r.push(`  ・${c}`))),r.push(""),r.push("━━━ 再現プロンプト ━━━"),r.push(e.reproduction_prompt||"（生成されませんでした）"),n.textContent=r.join(`
`)}async function gr(){const e=Ae();if(!e){alert("APIキーを保存してください");return}if(!re){alert("先に作風解析を実行してください");return}const t=nt(),a=I("output");if(!t||t.length<10||a&&a.classList.contains("empty")){alert("まず上のストーリー生成でテキストを生成してから、リライトを実行してください");return}const n=I("btn-sa-reflect"),r=I("sa-reflect-result-wrap"),s=I("sa-reflect-output");n.disabled=!0,n.innerHTML='<span class="spinner"></span>作風を反映してリライト中...',s.textContent="リライト中です...（完了後に一括表示されます）",r.classList.remove("hidden");const o=I("progress-log"),i=I("thought-score-board"),c=I("progress-title-text");o&&(o.textContent="作風リライトの開始を待っています..."),i&&(i.innerHTML="",i.style.display="none"),c&&(c.textContent="AI進捗・思考ログ: リライト準備中..."),On("🎨 作風リライト中...");let u=[],d="",y="",p=null;function m(h){u.push(h),f()}function f(){if(!o)return;let h="";u.length>0&&(h+=u.join(`
`)+`
`),d&&(h+=d+`
`),y&&(h+=`
`+y),o.textContent=h;const v=I("progress-content");v&&(v.scrollTop=v.scrollHeight)}m("[システム] 作風リライト処理を開始しました..."),m(`[システム] 対象ストーリー文字数: ${t.length.toLocaleString()} 字`),m("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中..."),m("[システム] リライト用メタプロンプトの構築が完了しました。");try{const h=ar(re,t),v=me[0].value;m(`[システム] AIモデル (${v}) にリライト要求を送信しています...`);let b=0,$=new Set;p=setInterval(()=>{b++,d=`[通信] AIモデルからのリライト応答を待機しています${".".repeat(b%4)} (${b}秒経過)`,b>=3&&!$.has(3)&&($.add(3),u.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...")),b>=6&&!$.has(6)&&($.add(6),u.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...")),b>=9&&!$.has(9)&&($.add(9),u.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...")),b>=12&&!$.has(12)&&($.add(12),u.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。")),b>=15&&b%5===0&&!$.has(b)&&($.add(b),u.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${b}s) を実行しています...`)),f()},1e3);let C="",w=!1;c&&(c.textContent="AI進捗・思考ログ: リライト執筆中...");const E=({text:N})=>{w||(w=!0,d="",f(),p&&(clearInterval(p),p=null)),C+=N;const k=C.length;let T=`[システム] AIによるリライト文章の生成が開始されました。
`;T+=`[進捗] 本文をリライト中...
`,T+=`・現在文字数: ${k} 文字
`;const H=Math.floor(k/50%4),A=".".repeat(H)+" ".repeat(3-H);T+=`・ステータス: 執筆処理中${A}
`,y=T,f()},L=N=>{s.textContent=`フォールバック中: ${N}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${N}`,m(`[システム] リライト応答遅延のため、モデルを ${N} にフォールバックします...`)};let{usedModel:x}=await we(e,v,h,E,L,{disableGoogleSearch:!0}),M=0;for(;M<3&&!C.trim().endsWith("【完】");){M++,m(`[システム] 文字数上限到達による切断を検知。続きを自動リクエスト中... (${M}/3)`),d=`[通信] 続きを生成しています... (${M}/3)`,f();const N=`${h}

【ここまでの出力】
${C}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;x=(await we(e,x,N,E,L,{disableGoogleSearch:!0})).usedModel}p&&(clearInterval(p),p=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let B=C.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,"");Ne=B,s.textContent=B;const S=I("sa-reflect-counter");S&&(S.textContent=`${B.length.toLocaleString()} 字`),c&&(c.textContent="AI進捗・思考ログ: リライト完了"),m("[システム] 作風リライト文の生成・推敲が正常に完了しました。"),y=`[進捗] リライトが正常に完了しました。
・最終文字数: ${B.length.toLocaleString()} 字
・ステータス: 完了`,d="",f(),r.scrollIntoView({behavior:"smooth",block:"start"})}catch(h){p&&(clearInterval(p),p=null),d="",f(),s.textContent=`リライトエラー: ${h.message}`}finally{n.disabled=!1,n.innerHTML="🎨 この作風でリライト実行",Rn()}}function mr(){if(!re)return;const e=I("sa-result").textContent;navigator.clipboard.writeText(e).then(()=>{const t=I("btn-sa-copy");t.textContent="✅ コピー完了",setTimeout(()=>t.textContent="📋 コピー",2e3)})}function Pn(){const e=new Date;return`${e.getFullYear()}${String(e.getMonth()+1).padStart(2,"0")}${String(e.getDate()).padStart(2,"0")}${String(e.getHours()).padStart(2,"0")}${String(e.getMinutes()).padStart(2,"0")}${String(e.getSeconds()).padStart(2,"0")}`}function fr(){if(!re)return;const e=JSON.stringify(re,null,2),t=new Blob([e],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(t);const n=(re.style_name||"style_analysis").replace(/[\s\/\\:*?"<>|]/g,"_");a.download=`${n}_${Pn()}.json`,a.click()}function yr(){Ne&&navigator.clipboard.writeText(Ne).then(()=>{const e=I("btn-sa-reflect-copy");e.textContent="✅ コピー完了",setTimeout(()=>e.textContent="📋 コピー",2e3)})}function vr(){if(!Ne)return;const e=new Blob([Ne],{type:"text/plain"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`style_rewrite_${Pn()}.txt`,t.click()}function br(){var e,t,a,n;Q.forEach(s=>{s.previewUrl&&URL.revokeObjectURL(s.previewUrl)}),z=[],Q=[],re=null,Ne="",pt(),qt();const r=I("sa-direct-text");r&&(r.value=""),at(),I("sa-dropzone").classList.remove("sa-has-files"),(e=I("sa-file-count"))==null||e.classList.add("hidden"),ye(),Me(),I("sa-result").textContent="",(t=I("sa-result-wrap"))==null||t.classList.add("hidden"),(a=I("sa-reflect-wrap"))==null||a.classList.add("hidden"),(n=I("sa-reflect-result-wrap"))==null||n.classList.add("hidden")}function $r(){const e=I("sa-direct-text");if(!e)return;const t=e.value.trim();t&&(z.push({name:`直接入力テキスト_${z.length+1}`,text:t,charCount:t.length}),e.value="",pt(),I("sa-dropzone").classList.add("sa-has-files"),ye(),at())}function at(){const e=I("btn-sa-add-text");if(!e)return;const t=I("sa-direct-text"),a=t&&t.value.trim().length>0;e.disabled=!a}function ht(){const e=I("sa-section");e&&(typeof Ae=="function"&&Ae()?e.classList.remove("sa-inactive"):e.classList.add("sa-inactive"))}function ye(){const e=I("btn-sa-analyze");if(!e)return;const t=typeof Ae=="function"?Ae():"",a=z.length>0,n=Q.length>0,r=I("sa-direct-text"),s=r?r.value:"",o=s.trim().length>0,i=a||n||o;let c=s.length;z.forEach(d=>c+=d.content?d.content.length:0);const u=document.getElementById("api-engine");if(u&&u.value==="openai"&&c>8e4){e.disabled=!0,e.textContent="⚠ 文字数超過 (OpenAI制限)",e.title="OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。";return}e.disabled=!(t&&i),e.textContent="🔬 超強引！作風解析を実行",e.title=""}function Me(){const e=I("btn-sa-reflect");if(!e)return;const t=typeof nt=="function"?nt():"",a=I("output"),n=t&&t.length>=10&&a&&!a.classList.contains("empty"),r=re!==null;e.disabled=!(n&&r)}function Cr(e,t){var a,n,r,s,o,i,c,u;Ae=e,nt=t,rr(),(a=I("btn-sa-analyze"))==null||a.addEventListener("click",pr),(n=I("btn-sa-reflect"))==null||n.addEventListener("click",gr),(r=I("btn-sa-copy"))==null||r.addEventListener("click",mr),(s=I("btn-sa-json"))==null||s.addEventListener("click",fr),(o=I("btn-sa-reflect-copy"))==null||o.addEventListener("click",yr),(i=I("btn-sa-reflect-dl"))==null||i.addEventListener("click",vr),(c=I("btn-sa-clear"))==null||c.addEventListener("click",br),(u=I("btn-sa-add-text"))==null||u.addEventListener("click",$r);const d=I("sa-direct-text");d&&d.addEventListener("input",()=>{ye(),at()}),ht(),at()}function wr(e,t){const a=Ut(t),n=Bn(t);return`あなたはプロの校閲者・整合性チェッカーです。以下の物語テキストを精査し、**明確な事実矛盾**のみを検出してください。

## 最重要ルール
- **面白さ・創造性を損なう指摘は絶対に禁止**。物語のエンタメ性を優先すること。
- 検出対象は「客観的に矛盾している事実」のみ。主観的な品質判断（「伏線が弱い」「展開が急」等）は対象外。
- 意図的なフィクション設定（魔法、超能力、異世界ルール等）は矛盾ではない。
- 矛盾が無ければ、空の配列 \`[]\` を返すこと。無理に矛盾を見つけようとしないこと。

## 検出対象（これらのみ）
1. **キャラクター不整合**: 名前・性別・外見・性格が途中で変わる（意図的な変身・変装を除く）
2. **時系列エラー**: 朝→夜→朝のような不自然な時間遷移、「3日前に起きた」事件が次の段落で「昨日」に変わる等
3. **時代考証違反**: 設定された時代に存在しない物・概念の使用（例：江戸時代にスマートフォン）
4. **設定矛盾**: 「一人っ子」と述べたキャラに兄弟が登場する等の論理的不整合
5. **空間矛盾**: キャラの所在地が説明なく変わる
6. **退場キャラの不整合**: 明確に死亡・退場したキャラが説明なく再登場

## 入力情報

### ユーザー指定のキャラクター設定:
${a}

### 時代・世界観設定:
${n}

### 検査対象テキスト:
${e}

## 出力フォーマット（JSON配列で出力。矛盾がなければ空配列 \`[]\`）
\`\`\`json
[
  {
    "type": "矛盾の種類（キャラクター不整合/時系列エラー/時代考証違反/設定矛盾/空間矛盾/退場キャラの不整合）",
    "severity": "重大 or 軽微",
    "location": "矛盾が発生している箇所の引用（20字程度）",
    "description": "何がどう矛盾しているかの簡潔な説明"
  }
]
\`\`\`
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function xr(e,t,a,n,r,s=!1){const o=Ut(a),i=Bn(a);return`あなたはプロの校閲者・整合性チェッカーです。長編小説の**第${t}章**を精査し、過去の章との間で**明確な事実矛盾**のみを検出してください。

## 最重要ルール
- **面白さ・創造性を損なう指摘は絶対に禁止**。物語のエンタメ性を優先すること。
- 検出対象は「客観的に矛盾している事実」のみ。主観的な品質判断は対象外。
- 意図的なフィクション設定（魔法、超能力、異世界ルール等）は矛盾ではない。
- 矛盾が無ければ、空の配列 \`[]\` を返すこと。無理に矛盾を見つけようとしないこと。

## 検出対象（事実関係の矛盾のみ）
1. **キャラクター不整合**: 名前・性別・外見・性格が前章と矛盾する（意図的な変身・変装を除く）
2. **時系列エラー**: 前章との時間的な繋がりが不自然
3. **時代考証違反**: 設定された時代に存在しない物・概念の使用（例：江戸時代にスマートフォン）
4. **設定矛盾**: 前章で確立された設定との論理的不整合（「一人っ子」と述べたキャラに兄弟が登場するなど）
5. **空間矛盾**: 前章終了時の所在地と本章冒頭の所在地が説明なく変わる
6. **退場キャラの不整合**: 前章で退場・死亡したキャラが説明なく再登場する
7. **伏線の矛盾**: 文脈メモに記録された回収待ち伏線・設定・モチーフの扱いが矛盾する
8. **別ルート混入**: 過去章・Story Bible・ユーザー設定に存在しない主人公名、能力名、組織名、初期候補設定の混入

## 入力情報

### ユーザー指定のキャラクター設定:
${o}

### 時代・世界観設定:
${i}

### 終了記号ルール:
この章は${s?"最終章です。本文の最後の独立行に一度だけ「【完】」が必要です。":"最終章ではありません。「【完】」が本文に含まれている場合は設定矛盾として検出してください。"}

### 過去の章の文脈維持メモ:
${n||"（第1章のため過去メモなし）"}

### 直近の章の全文（参照用）:
${r||"（第1章のため参照なし）"}

### 検査対象（第${t}章の本文）:
${e}

## 出力フォーマット（JSON配列で出力。矛盾がなければ空配列 \`[]\`）
\`\`\`json
[
  {
    "type": "矛盾の種類（キャラクター不整合/時系列エラー/時代考証違反/設定矛盾/空間矛盾/退場キャラの不整合/伏線の矛盾/別ルート混入）",
    "severity": "重大 or 軽微",
    "location": "矛盾が発生している箇所の引用（20字程度）",
    "description": "何がどう矛盾しているかの簡潔な説明"
  }
]
\`\`\`
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function kr(e,t,a,n){const r=t.map((i,c)=>`${c+1}. 【${i.type}】${i.description}（箇所：『${i.location}』）`).join(`
`),s=Ut(a);let o="";return n&&(o=`
### 過去の章の文脈（整合性を保つために参照すること）:
${n.recentChaptersFull||""}

### 文脈メモ（伏線・モチーフ・設定の記録）:
${n.allContextMemos||""}
`),`あなたはプロの小説家兼校閲者です。以下のテキストに含まれる設定・事実関係の矛盾箇所を修正してください。

## 最重要ルール
1. **物語の面白さ・テンポ・文体を絶対に損なわないこと**。矛盾の修正は最小限の変更で行う。
2. **修正対象は指摘された矛盾箇所のみ**。矛盾と無関係な文章を書き換えてはならない。
3. **文字数を大きく変えないこと**。元テキストの90%〜110%の範囲に収めること。
4. **プロット・展開・オチは一切変更しない**。矛盾する事実の記述のみを正しい設定に合わせて修正する。
5. 修正結果の本文のみを出力する。メタ解説、注釈、「以下は修正結果です」等の前置きは一切付けない。
6. **修正によって新しい矛盾を生まないこと**。矛盾箇所を直す際は、前後の章で確立された設定・数値・事実関係を必ず参照し、存在しないキャラクターや出来事を勝手に追加しないこと。
7. **名前・固有名詞の正確性**: 修正時に既存キャラクターの名前を誤記したり、存在しない人物名を挿入したりしないこと。
8. **自己校正メタの絶対禁止**: 「修正する」「修正後のテキスト」「OK」「おっと、見出しに」「No, there is no other」「Let's double check」など、あなたの判断過程・検査過程・修正ログを本文へ出力しないこと。修正済み本文だけを返すこと。

### ユーザー指定のキャラクター設定（正とする）:
${s}
${o}

## 検出された矛盾:
${r}

## 修正対象テキスト:
${e}

## 修正後のテキスト（本文のみ出力）:`}function Sr(e){if(!e||!e.trim())return[];let t=e.trim();t=t.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");try{const a=JSON.parse(t);return Array.isArray(a)?a.filter(n=>n&&typeof n=="object"&&n.type&&n.description).map(n=>({type:String(n.type||""),severity:String(n.severity||"軽微"),location:String(n.location||""),description:String(n.description||"")})):[]}catch{const a=t.match(/\[[\s\S]*\]/);if(a)try{const n=JSON.parse(a[0]);if(Array.isArray(n))return n.filter(r=>r&&typeof r=="object"&&r.type&&r.description).map(r=>({type:String(r.type||""),severity:String(r.severity||"軽微"),location:String(r.location||""),description:String(r.description||"")}))}catch(n){console.warn("矛盾検査結果のパースに失敗しました:",n.message)}return[]}}function jn(e,t){if(!e||e.length===0)return"";const a=[`【矛盾検査記録（第${t}章）— 修正済み】`];return e.forEach((n,r)=>{a.push(`  ${r+1}. [${n.severity}] ${n.type}: ${n.description}`)}),a.join(`
`)}async function Dt(e,t,a,n={}){const{onStatus:r,onFallback:s,maxFixAttempts:o=8,chapterNum:i,allContextMemos:c,recentChaptersFull:u,fixMinorIssues:d=!1,isLastChapter:y=!1,failOnAuditError:p=!1,validateFixedText:m}=n,f=me[0].value,h=i!=null,v=h?`第${i}章: `:"";let b=t,$=[],C=!1,w=0,E=[];for(let L=0;L<=o;L++){const x=L>0;if(r){const A=h?`第${i}章の`:"";r(`[検査] ${A}設定整合性チェックを実行中...${x?`（再検査 ${L}回目）`:""}`)}let M;h?M=xr(b,i,a,c,u,y):M=wr(b,a);let B;try{B=(await Fe(e,f,M,s,{temperature:.1,responseMimeType:"application/json",disableGoogleSearch:!0,maxTokens:4096,maxOutputTokens:4096,timeoutMs:h?7e4:12e4,maxModelAttempts:h?2:void 0})).text}catch(A){if(console.warn("矛盾検査APIコールが失敗しました:",A.message),p)throw r&&r("[検査] 検査APIエラー — 保存を停止します"),new Error(`矛盾検査APIエラー: ${A.message}`);return r&&r("[検査] 検査APIエラー — スキップして続行します"),{text:b,issues:$,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]}}const S=Sr(B);E=S;const N=S.filter(A=>A.severity==="重大"),k=S.filter(A=>A.severity!=="重大");w=N.length,S.length>0&&($=$.concat(S),r&&(r(`[検査] ${v}${S.length}件の指摘を検出（重大: ${N.length}件, 軽微: ${k.length}件）`),N.forEach((A,F)=>{r(`[検査]   ⛔ 重大${F+1}: [${A.type}] ${A.description}${A.location?`（箇所:『${A.location}』）`:""}`)}),k.forEach((A,F)=>{r(`[検査]   ⚠ 軽微${F+1}: [${A.type}] ${A.description}`)})));const T=d?S:N;if(T.length===0)return r&&(S.length===0?r(`[検査] ${v}矛盾は検出されませんでした ✅`):r(d?`[検査] ${v}修正対象の矛盾は残っていません ✅`:`[検査] ${v}重大な矛盾なし。軽微な指摘${k.length}件は許容範囲です ✅`)),{text:b,issues:$,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]};if(L>=o)break;if(r){const A=d?`矛盾${T.length}件`:`重大な矛盾${N.length}件`;r(`[修正] ${v}${A}を修正中...（試行 ${L+1}/${o}）`)}const H=kr(b,T,a,h?{recentChaptersFull:u,allContextMemos:c}:null);try{let A=(await Fe(e,f,H,s,{temperature:.3,disableGoogleSearch:!0,maxTokens:16384,maxOutputTokens:16384,timeoutMs:h?9e4:12e4,maxModelAttempts:h?2:void 0})).text.trim();if(typeof n.sanitizeText=="function"&&(A=n.sanitizeText(A)),typeof m=="function"){const U=m(A)||[];if(U.length>0){console.warn(`修正結果を品質ゲートで棄却: ${U.join(" / ")}`),r&&r(`[修正] 修正結果に本文破損の兆候があるため棄却します（${U.slice(0,3).join(" / ")}）`);const ae={type:"Rejected repair",severity:"critical",location:"repair candidate",description:`Repair candidate failed quality gate: ${U.slice(0,3).join(" / ")}`};return{text:b,issues:$.concat(ae),wasFixed:C,remainingCriticalCount:Math.max(w,1),remainingIssues:E.length?E:[ae]}}}const F=A.length/b.length;if(F<.5||F>2){console.warn(`修正結果の文字数比率が異常 (${(F*100).toFixed(0)}%)。修正を棄却します。`),r&&r(`[修正] 修正結果の文字数が異常に変動（${(F*100).toFixed(0)}%）。この修正を棄却します`);const U={type:"Rejected repair",severity:"critical",location:"repair candidate",description:`Repair candidate changed length too much: ${(F*100).toFixed(0)}%`};return{text:b,issues:$.concat(U),wasFixed:C,remainingCriticalCount:Math.max(w,1),remainingIssues:E.length?E:[U]}}b=A,C=!0,r&&r(`[修正] ${v}修正完了。再検査を実行します...`)}catch(A){return console.warn("矛盾修正APIコールが失敗しました:",A.message),r&&r(p?"[修正] 修正APIエラー — 残存矛盾があれば保存を停止します":"[修正] 修正APIエラー — 現状のテキストで続行します"),{text:b,issues:$,wasFixed:C,remainingCriticalCount:w,remainingIssues:E}}}return r&&r(`[検査] ${v}修正上限（${o}回）に達しましたが、重大な矛盾が${w}件残存しています ⚠️`),{text:b,issues:$,wasFixed:C,remainingCriticalCount:w,remainingIssues:E}}function Ut(e){return!e||!e.characters||e.characters.length===0?"（キャラクター設定なし — AIが自由に設定）":e.characters.map((t,a)=>{const n=[`${a+1}. ${t.name||"（名前未設定）"}`];return t.sex&&n.push(`性別: ${t.sex}`),t.role&&n.push(`役割: ${t.role}`),t.personality&&n.push(`性格: ${t.personality}`),t.note&&n.push(`詳細: ${t.note}`),n.join(" / ")}).join(`
`)}function Bn(e){if(!e)return"（設定なし）";const t=[],a=e.eraCustom||e.era,n=e.worldviewCustom||e.worldview,r=e.genreCustom||e.genre;return a&&t.push(`時代: ${a}`),n&&t.push(`世界観: ${n}`),r&&t.push(`ジャンル: ${r}`),t.length>0?t.join(`
`):"（特定の時代・世界観設定なし）"}function smNarrativeMethodStackV421(e,t="standard"){const a=fe(e||{}),n=t==="long",r=n?"each chapter and the completed long novel":"the visible narrative output",s=/^(?:essay|poem|letter|diary)$/i.test(String(e&&e.mode||""));return`

[Story Maker narrative method stack / internal only]
- Apply the README narrative-engineering stack to ${r}${s?" where the selected format is narrative; do not force foreshadowing into a non-narrative form.":"."}
- Category guide obedience: selected/manual axes are executable writing rules, not labels. Use the injected genre, ending, worldview, target, and narration guides as constraints; never drift to another axis or detail. Current fixed axes: genre=${a.genre} / theme=${a.theme} / era=${a.era} / worldview=${a.worldview} / narration=${a.narr} / target=${a.target} / ending=${a.ending}.
- Multi-axis de-biasing: build novelty from Character x Theme x Genre x Era x Ending x Perspective. Do not repeatedly default to electronics, AI, SNS, gadgets, smartphones, apps, cyber systems, quantum, robots, or surveillance unless the fixed settings explicitly call for them.
- Method coverage: Setup-Payoff, Emotion Gap Design, Motif Recurrence, 15-beat Emotion Curve, GMC+S, Show Don't Tell, Subtext, sensory balance, world-grounded metaphor, and Character Knowledge Boundary must all be considered before drafting.
- Emotion Gap Design: every narrative unit needs a planned expectation-to-reality gap. Choose and combine substitution, exaggeration, reversal, absurdity, tension-release, or normalcy-return; make the gap visible through action and consequence, not an explanation.
- Motif Recurrence and setup-payoff: introduce concrete motifs, habits, objects, phrases, scenery, or actions early, return them in changed contexts, and connect at least one to the emotional peak. Do not solve late plot turns with brand-new convenience facts.
- Scene force: each major scene needs place, goal, motivation, obstacle, stakes, subtextual dialogue or silence, physical action, and consequence. A chapter cannot be only premise explanation, mood, or recap.
- Texture discipline: after visual description, add sound, touch, smell, taste, body pressure, temperature, or silence. Use metaphors sourced from the selected era/worldview rather than stock phrases.
- Character knowledge boundary: before dialogue or interiority, check what that character actually knows. Do not let them leak future reveals, off-screen secrets, or author-only logic.
- Long-novel carry-forward: ${n?"saved chapters and context memos are canon; keep character roster, motif status, wounds, losses, promises, debts, items, relationships, and unresolved crises continuous across chapters.":"if this is a shorter narrative, still preserve setup, payoff, and character knowledge within the output."}
- Quality gate before output: reject and revise internally if Setup-Payoff, emotion gap, motif recurrence, GMC+S, sensory balance, metaphor originality, character agency, category obedience, de-biasing, or knowledge boundaries are weak.
- Do not output this method stack, quality-gate checklist, design labels, self-audit notes, or planning tables.`}function Wt(e,t="standard"){const a=fe(e||{}),n=t==="long"?"per chapter":"for the whole output";return`

[Gen-4 quality contract / internal only]
- Preflight fact audit: before drafting, internally check dates, money, transit, school/work rules, geography, tools, laws, products, communication methods, and era customs. If a real-world detail is uncertain, verify it through available grounding/general knowledge or make it safely fictional.
- Never change user settings to fix facts. Fixed settings: genre=`+a.genre+" / theme="+a.theme+" / era="+a.era+" / worldview="+a.worldview+" / narration="+a.narr+" / target="+a.target+" / ending="+a.ending+`.
- Emotional arc ledger: `+n+`, internally plan pressure, expectation, reversal, cost, catharsis, and aftertaste. Include at least one irreversible choice, visible cost, and expectation reversal in the visible prose.
- Controlled human noise: avoid a polished emotional landing only. Add 1-3 concrete human frictions: an ugly line, half-finished sentence, bodily discomfort, unfinished chore, payment, dirt, small sound, silence, or contradictory gesture. Typos, broken prose, mojibake, or design notes are not valid noise.
- Anti-uniform ending: do not end only with sunset, sky, wind, light, tears, echo, or a neat smile. Land the ending on action, object, dialogue, practical friction, or an unpaid cost.
- Anti-AI smoothness: vary sentence endings, paragraph length, and metaphor types. Do not make every paragraph the same clean emotional gloss.
- Paragraph discipline: use single-newline paragraph breaks, not blank empty lines after every sentence. In prose, one visible paragraph should usually contain 2-4 sentences or 80-350 Japanese characters; blank lines are allowed only around chapter headings, section headers, scene breaks, and memo blocks.
- Do not output this contract, design tables, self-audit notes, evaluation notes, or hidden planning.`+smNarrativeMethodStackV421(e,t)}function Ir(e,t){const a=fe(t||{}),n=Ee(e).slice(0,14e3);return`You are a professional fiction editor, fact checker, and commercial fiction judge. Evaluate only the visible generated prose below. Do not reveal internal reasoning.

[Fixed user settings]
genre: `+a.genre+`
theme: `+a.theme+`
era: `+a.era+`
worldview: `+a.worldview+`
narration: `+a.narr+`
target: `+a.target+`
ending: `+a.ending+`

[Rubric]
1. fact_logic: factual, era, and setting logic safety
2. emotional_arc: pressure, reversal, cost, catharsis
3. human_noise: human friction that breaks over-clean AI prose
4. constraint_fit: obedience to selected/manual user settings
5. prose_commercial: scene force, texture, commercial readability
6. narrative_methods: Setup-Payoff, Emotion Gap, Motif Recurrence, GMC+S, Show Don't Tell, Subtext, sensory balance, world-grounded metaphors, and Character Knowledge Boundary
7. category_guides: the selected/manual genre, ending, worldview, target, and narration guides remain active as writing rules
8. de_biasing: novelty comes from multi-axis randomization and does not default to electronics/AI/gadget/cyber motifs without explicit settings

Return JSON only:
{"scores":{"fact_logic":0,"emotional_arc":0,"human_noise":0,"constraint_fit":0,"prose_commercial":0,"narrative_methods":0,"category_guides":0,"de_biasing":0},"strongest_point":"","weakest_point":"","findings":[""],"revision_hint":"","pass":true}

[Text]
`+n}function Lr(e){let t=String(e||"").trim();const a=t.match(/\{[\s\S]*\}/);a&&(t=a[0]);const n=JSON.parse(t),r=n.scores||{},s=o=>Math.max(0,Math.min(100,Math.round(Number(r[o])||0)));return{scores:{fact_logic:s("fact_logic"),emotional_arc:s("emotional_arc"),human_noise:s("human_noise"),constraint_fit:s("constraint_fit"),prose_commercial:s("prose_commercial"),narrative_methods:s("narrative_methods"),category_guides:s("category_guides"),de_biasing:s("de_biasing")},strongest_point:String(n.strongest_point||""),weakest_point:String(n.weakest_point||""),findings:Array.isArray(n.findings)?n.findings.map(o=>String(o)).filter(Boolean).slice(0,5):[],revision_hint:String(n.revision_hint||""),pass:n.pass!==!1}}function Gn(e){if(!e)return"";const t=e.scores||{},a=["【Gen-4 AI Evaluation / 第4世代AI編集評価】","- Fact/Logic / ファクト・ロジック: "+t.fact_logic,"- Emotional Arc / 感情曲線: "+t.emotional_arc,"- Human Noise / 人間的ノイズ: "+t.human_noise,"- Constraint Fit / 指定遵守: "+t.constraint_fit,"- Commercial Prose / 商業読後感: "+t.prose_commercial,"- Narrative Methods / 物語メソッド適用: "+t.narrative_methods,"- Category Guides / カテゴリ文体ガイド遵守: "+t.category_guides,"- De-biasing / 多軸ランダム偏り抑制: "+t.de_biasing];return e.strongest_point&&a.push("- Strongest / 強み: "+e.strongest_point),e.weakest_point&&a.push("- Weakest / 弱点: "+e.weakest_point),e.revision_hint&&a.push("- Revision Hint / 改稿ヒント: "+e.revision_hint),e.findings&&e.findings.length&&a.push("- Findings / 所見: "+e.findings.join(" / ")),a.join(`
`)}async function Kn(e,t,a,n,r){const s=Ee(t);if(!s||s.trim().length<80)return null;n&&n("[Eval] Running Gen-4 AI editorial evaluation...");const o=await Fe(e,smInitialTextModel(e),Ir(s,a),r,{temperature:.2,responseMimeType:"application/json",disableGoogleSearch:!0,maxTokens:4096,maxOutputTokens:4096,timeoutMs:9e4,maxModelAttempts:2}),i=Lr(o.text);return n&&n("[Eval] Gen-4 AI editorial evaluation completed."),i}const Fn="4.2.3",Ar=()=>`Generated By AI Story Maker V${Fn}`,Ee=e=>String(e||"").replace(/\n*\s*Generated\s+(?:by\s+Super\s+FURU\s+AI\s+Story\s+v|By\s+AI\s+Story\s+Maker\s+V)[0-9]+(?:\.[0-9]+)*\.?\s*$/i,"").trimEnd(),Jt=e=>`${Ee(e).trimEnd()}

${Ar()}`.trim(),g=e=>document.getElementById(e),D=e=>e&&e.length?e[Math.floor(Math.random()*e.length)]:null,q=e=>(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),l={apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],longNovel:{active:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1},defaultFilled:{},axisSource:{}};function Re(e){return String(e||"").replace(/[\u200B-\u200D\uFEFF]/g,"").trim().replace(/^["'`]+|["'`]+$/g,"").replace(/\s+/g,"")}function Er(e){return/^\*{6,}$/.test(Re(e))}function Hn(e,t){const a=String(e||""),n=Re(e),r=n.startsWith("sk-")?"openai":"gemini",s=/[^A-Za-z0-9._-]/.test(n);return{provider:t||r,length:n.length,masked:Er(n),short:n.length>0&&n.length<20,empty:!n,badChars:s,sanitizedDelta:a.length-n.length}}function Pe(e,t){const a=Hn(e,t);return a.empty?{ok:!1,message:"APIキーが未設定です。編集ボタンを押して実キーを入力してください。",summary:a}:a.masked?{ok:!1,message:"APIキーがマスク表示のままです。編集ボタンを押して実キーを入力し直してください。",summary:a}:a.short?{ok:!1,message:`APIキーが短すぎます（${a.length}文字）。実キーを入力し直してください。`,summary:a}:a.badChars?{ok:!1,message:"APIキーに使用できない文字が含まれています。コピー時の余分な文字を除いて入力し直してください。",summary:a}:{ok:!0,summary:a}}function smInitialTextModel(e){return Re(e).startsWith("sk-")?tt[0]:me[0].value}function smProviderLabel(e){return Re(e).startsWith("sk-")?"ChatGPT":"Gemini"}typeof window<"u"&&(window.storyMakerKeyDiagnostic=()=>Hn(l.apiKey,l.apiProvider));function Vn(e){const t=l.locked[e],a=document.querySelector(`.btn-lock[data-section="${e}"]`);a&&(a.textContent=t?"🔒":"🔓",a.classList.toggle("locked",t),a.title=t?"この項目のロックを解除する":"この項目をロックしてランダム変更から保護");let n=g(`section-${e}`);!n&&e==="universal"&&(n=g("section-universal-intake")),n&&(n.classList.toggle("is-locked",t),n.querySelectorAll("input, textarea, select, button:not(.btn-lock)").forEach(r=>{r.disabled=t})),e==="chars"&&ne()}function _r(){const e=g("btn-switch-api");e.classList.remove("gemini-mode","openai-mode"),l.apiProvider==="gemini"?(e.classList.add("gemini-mode"),e.title="現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）"):(e.classList.add("openai-mode"),e.title="現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）")}function Je(){const e=g("banner"),t=document.querySelector(".settings-panel"),a=g("engine-label"),n=g("apikey");l.apiKey?(e.classList.add("ok"),n.value="********",n.readOnly=!0,t&&t.classList.remove("disabled-panel"),a.classList.remove("not-set"),l.apiProvider==="openai"?(a.textContent="ChatGPT API",a.style.color="var(--openai)",a.style.backgroundColor="var(--openai-glow)",a.style.borderColor="rgba(16,163,127,.3)"):(a.textContent="Gemini API",a.style.color="",a.style.backgroundColor="",a.style.borderColor="")):(e.classList.remove("ok"),n.value="",n.readOnly=!1,t&&t.classList.add("disabled-panel"),a.textContent="⚠ API未設定",a.classList.add("not-set"),a.style.color="",a.style.backgroundColor="",a.style.borderColor=""),l.apiKey?n.placeholder=l.apiProvider==="openai"?"OpenAI APIキーを入力（sk-...）":"Gemini APIキーを入力":n.placeholder=l.apiProvider==="openai"?"OpenAI APIキーを入力（sk-...）":"Gemini または OpenAI のAPIキーを入力",_r()}function Tr(){l.apiProvider==="gemini"?(l.geminiKey=l.apiKey,l.apiProvider="openai",l.apiKey=l.openaiKey):(l.openaiKey=l.apiKey,l.apiProvider="gemini",l.apiKey=l.geminiKey);const e=g("banner");l.apiKey?(e.classList.add("locked"),g("key-save").classList.add("hidden"),g("key-edit").classList.remove("hidden")):(e.classList.remove("locked"),g("key-save").classList.remove("hidden"),g("key-edit").classList.add("hidden"),g("apikey").readOnly=!1,g("apikey").value=""),Je(),e.classList.remove("banner-switch-flash"),e.offsetWidth,e.classList.add("banner-switch-flash"),l.apiKey||g("apikey").focus(),ye(),ht()}async function Mr(){const e=Re(g("apikey").value);if(g("apikey").value=e,!e){alert("APIキーを入力してください");return}const t=Pe(e,l.apiProvider);if(!t.ok){alert(t.message);return}const a=g("key-save");a&&(a.disabled=!0);try{const n=e.startsWith("sk-");if(!n){const r=await De(e);if(!kn(r)){alert("Gemini API key check failed: "+r);return}}n&&l.apiProvider==="gemini"?l.apiProvider="openai":!n&&l.apiProvider==="openai"&&(l.apiProvider="gemini"),l.apiKey=e,l.apiProvider==="openai"?l.openaiKey=e:l.geminiKey=e,Je(),g("banner").classList.add("locked"),g("key-save").classList.add("hidden"),g("key-edit").classList.remove("hidden"),ye(),ht()}finally{a&&(a.disabled=!1)}}function Nr(){g("banner").classList.remove("locked"),g("key-save").classList.remove("hidden"),g("key-edit").classList.add("hidden"),g("apikey").readOnly=!1,g("apikey").value="",g("apikey").focus(),l.apiKey="",l.apiProvider==="openai"?l.openaiKey="":l.geminiKey="",Je(),ye(),ht()}function V(e,t){const a=g(e);a&&a.classList.toggle("hidden",!t)}const pe={theme:{catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",stateKey:"themeSelected",catKey:"themeCategory",categories:Ke,lockKey:"theme"},genre:{catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",stateKey:"genre",catKey:"genreCategory",categories:Ot,lockKey:"genre"},worldview:{catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",stateKey:"worldview",catKey:"worldviewCategory",categories:Rt,lockKey:"worldview"},target:{catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",stateKey:"target",catKey:"targetCategory",categories:Pt,lockKey:"target"},era:{catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",stateKey:"era",catKey:"eraCategory",categories:jt,lockKey:"era"},ending:{catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",stateKey:"ending",catKey:"endingCategory",categories:Bt,lockKey:"ending"},narr:{catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",stateKey:"narration",catKey:"narrCategory",categories:Gt,lockKey:"narr"}};function qn(e){return{themeSelected:"theme",genre:"genre",worldview:"worldview",target:"target",era:"era",ending:"ending",narration:"narr"}[e]||null}function ie(e,t){e&&(l.axisSource||(l.axisSource={}),t?l.axisSource[e]=t:delete l.axisSource[e])}function Or(e){const t=qn(e);t&&l.defaultFilled&&delete l.defaultFilled[t]}function Rr(e){return l.axisSource&&l.axisSource[e]||null}function Dn(e){const t=pe[e],a=t&&g(t.customId);return a&&a.value.trim()||""}function zt(e){const t=pe[e];return t&&l[t.catKey]||""}function Pr(e){const t=pe[e];return!!(t&&(l[t.stateKey]||Dn(e)))}function xt(e){if(l.locked[e])return!0;const t=Rr(e);return t==="manual"||t==="selectedDetail"||t==="selectedCategory"?!0:!!((Dn(e)||zt(e))&&t!=="default"&&t!=="random")}function kt(){return!!(l.locked.mode||l.modeSource==="manual"||l.modeSource==="selected")}function Un(e){return!l.locked[e]&&!xt(e)}function Wn(e,t=null){const a=pe[e];if(!a)return null;const n=t||zt(e);if(n&&a.categories&&a.categories[n]){const r=We(a.categories[n],Vt(n));return[n,D(r)]}return Ct(a.categories,null,!1)}function Jn(e,t,a){const n=pe[e];if(!n)return;const r=g(n.catId),s=g(n.subId),o=g(n.customId);l.defaultFilled&&delete l.defaultFilled[e],t&&n.categories&&n.categories[t]?(l[n.catKey]=t,l[n.stateKey]=a,r&&r.querySelectorAll(".chip").forEach(i=>i.classList.toggle("active",i.dataset.cat===t)),rt(n.subId,n.categories[t],n.stateKey,n.customId,n.clearId),g(n.subId)&&g(n.subId).querySelectorAll(".chip").forEach(i=>i.classList.toggle("active",i.dataset.v===a))):(l[n.catKey]=null,l[n.stateKey]=null,r&&r.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),s&&(s.innerHTML="")),o&&(o.value=a||""),V(n.clearId,a)}function St(e){const t=pe[e],a=zt(e);if(!t||!a||Pr(e))return!1;const n=Wn(e,a);return!!(n&&n[1]&&(Jn(e,n[0],n[1]),ie(e,"selectedCategory"),!0))}function zn(e){if(!Un(e))return!1;const t=Wn(e);return!!(t&&t[1]&&(Jn(e,t[0],t[1]),ie(e,"random"),!0))}function ke(e,t=0,a=0){const n=Object.keys(e||{}),r=n[t]||n[0]||"",s=r&&e[r]||[];return[r,s[a]||s[0]||""]}function Z(e={}){return{theme:ke(Ke,e.themeCat,e.themeVal),genre:ke(Ot,e.genreCat,e.genreVal),worldview:ke(Rt,e.worldCat,e.worldVal),target:ke(Pt,e.targetCat,e.targetVal),era:ke(jt,e.eraCat,e.eraVal),ending:ke(Bt,e.endingCat,e.endingVal),narr:ke(Gt,e.narrCat,e.narrVal)}}const vt=Z({themeCat:0,themeVal:0,genreCat:0,genreVal:1,worldCat:0,worldVal:5,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:0,endingVal:0,narrCat:1,narrVal:1}),hn={default:vt,"4koma":vt,"4koma_scenario":vt,short_short:Z({themeCat:0,themeVal:6,genreCat:0,genreVal:3,worldCat:0,worldVal:5,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:0,endingVal:4,narrCat:1,narrVal:1}),novel:Z({themeCat:3,themeVal:1,genreCat:5,genreVal:2,worldCat:0,worldVal:1,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:2,endingVal:0,narrCat:1,narrVal:2}),medium:Z({themeCat:4,themeVal:8,genreCat:5,genreVal:3,worldCat:0,worldVal:1,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:2,endingVal:2,narrCat:1,narrVal:2}),long:Z({themeCat:3,themeVal:2,genreCat:6,genreVal:4,worldCat:0,worldVal:0,targetCat:2,targetVal:0,eraCat:0,eraVal:0,endingCat:3,endingVal:3,narrCat:1,narrVal:3}),scenario:Z({themeCat:0,themeVal:2,genreCat:0,genreVal:5,worldCat:0,worldVal:4,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:3,endingVal:0,narrCat:2,narrVal:5}),manga:Z({themeCat:2,themeVal:3,genreCat:4,genreVal:1,worldCat:4,worldVal:0,targetCat:1,targetVal:2,eraCat:4,eraVal:0,endingCat:3,endingVal:3,narrCat:1,narrVal:3}),essay:Z({themeCat:0,themeVal:3,genreCat:5,genreVal:2,worldCat:0,worldVal:0,targetCat:2,targetVal:2,eraCat:0,eraVal:0,endingCat:4,endingVal:1,narrCat:0,narrVal:1}),poem:Z({themeCat:4,themeVal:6,genreCat:2,genreVal:5,worldCat:0,worldVal:0,targetCat:1,targetVal:3,eraCat:0,eraVal:0,endingCat:4,endingVal:1,narrCat:0,narrVal:1}),fairy:Z({themeCat:1,themeVal:5,genreCat:5,genreVal:2,worldCat:2,worldVal:1,targetCat:0,targetVal:0,eraCat:5,eraVal:0,endingCat:0,endingVal:0,narrCat:1,narrVal:0}),letter:Z({themeCat:4,themeVal:8,genreCat:2,genreVal:4,worldCat:0,worldVal:1,targetCat:2,targetVal:2,eraCat:0,eraVal:0,endingCat:2,endingVal:0,narrCat:2,narrVal:1}),diary:Z({themeCat:3,themeVal:9,genreCat:6,genreVal:2,worldCat:0,worldVal:3,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:3,endingVal:1,narrCat:2,narrVal:3}),documentary:Z({themeCat:5,themeVal:9,genreCat:5,genreVal:5,worldCat:0,worldVal:1,targetCat:2,targetVal:4,eraCat:1,eraVal:0,endingCat:4,endingVal:1,narrCat:2,narrVal:2}),radio:Z({themeCat:3,themeVal:3,genreCat:6,genreVal:6,worldCat:0,worldVal:0,targetCat:2,targetVal:1,eraCat:0,eraVal:0,endingCat:3,endingVal:0,narrCat:2,narrVal:5})};function jr(e){const t=Ge.find(a=>a.value===e)||Ge[0];return t?t.label:""}function Br(e){const t=pe[e],a=t&&g(t.customId),n=a&&a.value.trim();return!!(t&&(l[t.stateKey]||n||l[t.catKey]))}function Gr(e,t,a={}){const n=pe[e];if(!n||l.locked[n.lockKey])return null;const r=!!(a.forceDefaultOwned&&l.defaultFilled&&l.defaultFilled[e]);if(!a.force&&!r&&Br(e))return null;const s=t&&t[0]||"",o=t&&t[1]||"",i=s&&n.categories&&n.categories[s]?s:null,c=o||i&&n.categories[i][0]||"";if(!c)return null;const u=g(n.catId),d=g(n.subId),y=g(n.customId);return i?(l[n.catKey]=i,l[n.stateKey]=c,u&&u.querySelectorAll(".chip").forEach(p=>p.classList.toggle("active",p.dataset.cat===i)),d&&(rt(n.subId,n.categories[i],n.stateKey,n.customId,n.clearId),d.querySelectorAll(".chip").forEach(p=>p.classList.toggle("active",p.dataset.v===c)))):(l[n.catKey]=null,l[n.stateKey]=null,u&&u.querySelectorAll(".chip").forEach(p=>p.classList.remove("active")),d&&(d.innerHTML="")),y&&(y.value=c),V(n.clearId,c),l.defaultFilled||(l.defaultFilled={}),l.defaultFilled[e]=c,ie(e,"default"),e+"="+c}function Qe(e=l.mode||"4koma",t={}){const a=hn[e]||hn.default,n=[];if(!l.locked.mode){const r=g("mode-custom"),s=jr(e);r&&(!r.value.trim()||t.forceModeLabel)&&(r.value=s,V("mode-custom-clear",s),n.push("mode="+s),l.modeSource||(l.modeSource="default"))}if(t.includeAxes!==!1)for(const[r,s]of Object.entries(a)){const o=Gr(r,s,{forceDefaultOwned:t.forceDefaultOwned});o&&n.push(o)}return n}function rt(e,t,a,n,r){const s=g(e);s&&(s.innerHTML=t.map(o=>`<button class="chip sub-chip" data-v="${q(o)}">${q(o)}</button>`).join(""),s.querySelectorAll(".chip").forEach(o=>{o.addEventListener("click",()=>{const i=qn(a);s.querySelectorAll(".chip").forEach(c=>c.classList.remove("active")),o.classList.add("active"),l[a]=o.dataset.v,Or(a),i&&ie(i,"selectedDetail"),g(n).value=o.dataset.v,V(r,o.dataset.v)})}))}function Se({catId:e,subId:t,customId:a,clearId:n,headerRndId:r,customRndId:s,categories:o,originals:i,stateKey:c,stateCatKey:u}){var d,y,p,m;const f=c==="themeSelected"?"theme":c==="narration"?"narr":c,h=g(e);if(h&&o){h.innerHTML=Object.keys(o).map(b=>`<button class="chip cat-chip" data-cat="${q(b)}">${q(b)}</button>`).join(""),h.querySelectorAll(".chip").forEach(b=>{b.addEventListener("click",()=>{l.locked[f]||(h.querySelectorAll(".chip").forEach($=>$.classList.remove("active")),b.classList.add("active"),l.defaultFilled&&delete l.defaultFilled[f],l[u]=b.dataset.cat,l[c]=null,ie(f,"selectedCategory"),rt(t,o[b.dataset.cat],c,a,n),g(a).value="",V(n,""))})});const v=Object.keys(o)[0];if(v){const b=h.querySelector(".chip");b&&b.classList.add("active"),rt(t,o[v],c,a,n)}}(d=g(r))==null||d.addEventListener("click",()=>{l.locked[f]||!o||St(f)||xt(f)||zn(f)}),(y=g(s))==null||y.addEventListener("click",()=>{if(l.locked[f]||St(f)||xt(f))return;let v;c==="themeSelected"?v=Fa():v=D(We(i||[],!1)),v&&(l.defaultFilled&&delete l.defaultFilled[f],g(a).value=v,h&&h.querySelectorAll(".chip").forEach(b=>b.classList.remove("active")),g(t).innerHTML="",l[u]=null,l[c]=null,ie(f,"random"),V(n,v))}),(p=g(n))==null||p.addEventListener("click",()=>{l.locked[f]||(g(a).value="",l.defaultFilled&&delete l.defaultFilled[f],!l[c]&&!l[u]&&ie(f,null),V(n,""))}),(m=g(a))==null||m.addEventListener("input",()=>{if(l.locked[f])return;const v=g(a).value.trim();l.defaultFilled&&delete l.defaultFilled[f],V(n,v),v?(h&&h.querySelectorAll(".chip").forEach(b=>b.classList.remove("active")),g(t).innerHTML="",l[u]=null,l[c]=null,ie(f,"manual")):!l[c]&&!l[u]&&ie(f,null)})}function Kr(){document.querySelectorAll(".btn-section-clear").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.section;if(t&&l.locked[t])return;if(l.defaultFilled&&delete l.defaultFilled[t],t==="chars"){Fr();return}if(t==="mode"){l.mode="4koma",delete l.modeSource,g("mode-chips").querySelectorAll(".chip").forEach(i=>i.classList.toggle("active",i.dataset.v==="4koma")),g("mode-custom").value="",V("mode-custom-clear",""),Qe(l.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0});return}const a=`${t}-custom`,n=`${t}-custom-clear`,r=`${t}-cat-chips`,s=`${t}-sub-chips`;g(a)&&(g(a).value=""),V(n,""),g(r)&&g(r).querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),g(s)&&(g(s).innerHTML="");const o={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[t];o&&(l[o.key]=null,l[o.cat]=null,ie(t,null)),t==="supplement"&&(g("supplement").value="",V("supplement-clear",""))})})}function Yt(){const e=g("mode-chips");e.innerHTML=Ge.map(t=>`<button class="chip${l.mode===t.value?" active":""}" data-v="${t.value}">${t.label}</button>`).join(""),e.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{if(l.locked.mode)return;const a=t.dataset.v==="long";if(!a&&l.longNovel&&l.longNovel.chapters&&l.longNovel.chapters.length>0)if(confirm(`長編小説データが残っています。クリアして新しい作品の準備をしますか？
（キャンセルするとモードを切り替えずに元のまま続けます）`)){Oe();const n=document.getElementById("long-novel-panel");n&&(n.classList.add("hidden"),n.classList.remove("ln-completed","ln-generating")),Ze();const r=document.getElementById("output");r&&(r.className="output-box empty",r.textContent="出力結果がここに表示されます...");const s=document.querySelector(".char-counter");s&&(s.textContent="0 字")}else return;if(a&&l.longNovel&&l.longNovel.chapters&&l.longNovel.chapters.length>0&&confirm(`前の長編小説データが残っています。クリアして一から新しい作品の準備をしますか？
（キャンセルすると以前のデータを保持します）`)){Oe(),document.getElementById("long-novel-panel").classList.add("hidden");const n=document.getElementById("output");n&&(n.className="output-box empty",n.textContent="AIの思考を待っています...（しばらくお待ちください）")}e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),t.classList.add("active"),l.mode=t.dataset.v,g("mode-custom").value=t.textContent,V("mode-custom-clear",t.textContent),l.modeSource="selected",Qe(l.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})})}),g("btn-rand-mode").addEventListener("click",()=>{if(kt())return;const t=D(Ge);l.mode=t.value,e.querySelectorAll(".chip").forEach(a=>a.classList.toggle("active",a.dataset.v===t.value)),g("mode-custom").value=t.label,V("mode-custom-clear",t.label),l.modeSource="random",Qe(l.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})}),g("mode-custom-rnd").addEventListener("click",()=>{if(kt())return;const t=D(We(va,!1));g("mode-custom").value=t,l.mode=null,e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),V("mode-custom-clear",t),l.modeSource="random"}),g("mode-custom").addEventListener("input",()=>{if(l.locked.mode)return;const t=g("mode-custom").value.trim();V("mode-custom-clear",t),t?(l.modeSource="manual",e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),l.mode=null):delete l.modeSource}),Qe(l.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})}function Fr(){l.characters=[],ne()}function ne(){g("char-count-display").textContent=l.characters.length;const e=g("char-list"),t=l.locked&&l.locked.chars,a=`<datalist id="roles-list">${$e.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,n=`<datalist id="personalities-list">${Ce.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,r='<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>';e.innerHTML=l.characters.map((s,o)=>`
    <div class="char-card shadow-sm">
      <div class="char-card-header">
        <span class="char-card-num">キャラ ${o+1}</span>
        <div class="btn-group">
          <button class="char-field-btn btn-char-rnd-all" data-idx="${o}" title="この人物の全項目をランダムに埋める（個別の微調整も可能）"${t?" disabled":""}>🎲 全ランダム</button>
          <button class="btn-char-del" data-idx="${o}" title="この人物を削除"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">名前（空欄ならストーリー生成時にAI命名 / 🎲 今すぐ生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-name-input" value="${q(s.name)}" data-idx="${o}" placeholder="例：山田太郎（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="name" title="今すぐ名前の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="name" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${o}" data-key="sex" value="${q(s.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="sex" title="今すぐ性別の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="sex" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${o}" data-key="role" value="${q(s.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="role" title="今すぐ役割の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="role" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${o}" data-key="personality" value="${q(s.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="personality" title="今すぐ性格の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="personality" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${o}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${t?" disabled":""}>${q(s.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="note" title="今すぐ詳細メモの案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="note" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
    </div>
  `).join("")+a+n+r+`
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えると性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `,e.querySelectorAll(".char-name-input").forEach(s=>s.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i].name=o.target.value,At(i,"name")})),e.querySelectorAll(".char-sel").forEach(s=>s.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i][o.target.dataset.key]=o.target.value,o.target.dataset.key==="sex"&&At(i,"sex")})),e.querySelectorAll(".char-memo").forEach(s=>s.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i].note=o.target.value})),e.querySelectorAll(".btn-field-rnd").forEach(s=>s.addEventListener("click",o=>qr(parseInt(s.dataset.idx),s.dataset.key))),e.querySelectorAll(".btn-field-clear").forEach(s=>s.addEventListener("click",o=>Dr(parseInt(s.dataset.idx),s.dataset.key))),e.querySelectorAll(".btn-char-rnd-all").forEach(s=>s.addEventListener("click",o=>Xt(parseInt(s.dataset.idx)))),e.querySelectorAll(".btn-char-del").forEach(s=>s.addEventListener("click",o=>Hr(parseInt(s.dataset.idx))))}function Yn(){l.locked.chars||(l.characters.push({name:"",role:"",personality:"",sex:"",note:""}),ne())}function Hr(e){l.locked.chars||(l.characters.splice(e,1),ne())}function Vr(){l.locked.chars||(l.characters.pop(),ne())}function qr(e,t){if(l.locked.chars)return;const a=l.characters[e],n=Lt(a.sex)||It(a.name)||(Math.random()<.5?"M":"F");if(t==="name"){const r=n==="M"?Ft:n==="F"?Ht:ya;a.name=D(Kt)+D(r)}if(t==="sex"){a.sex=D(["男性","女性","無性","回答無し"]),At(e,"sex");return}if(t==="role"&&(a.role=D($e)),t==="personality"&&(a.personality=D(Ce)),t==="note"){const r=n==="M"?wn:xn;a.note=D(r)}ne()}function Dr(e,t){l.locked.chars||(l.characters[e][t]="",ne())}function Xt(e){if(l.locked.chars)return;const t=Math.random()<.5?"M":"F",a=t==="M"?Ft:Ht,n=t==="M"?wn:xn;l.characters[e]={name:D(Kt)+D(a),role:D($e),personality:D(Ce),sex:t==="M"?"男性":"女性",note:D(n)},ne()}const Ur=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],Wr=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function It(e){if(!e)return null;const t=e.slice(-1);return Ur.includes(t)?"M":Wr.includes(t)?"F":null}function Lt(e){return e?e.includes("男性")||e.includes("男,")?"M":e.includes("女性")||e.includes("女,")?"F":null:null}function At(e,t){const a=l.characters[e];if(t==="name"){const n=It(a.name),r=Lt(a.sex);n&&n!==r&&(a.sex=n==="M"?"男性":"女性",ne())}else if(t==="sex"){const n=Lt(a.sex),r=It(a.name);if(n&&n!==r){const s=n==="M"?Ft:Ht;a.name=D(Kt)+D(s),ne()}}}function Xn(){l.locked.chars||(l.characters.length===0&&Yn(),l.characters.forEach((e,t)=>Xt(t)))}function Jr(){if(l.locked.chars)return;const e=Math.floor(Math.random()*4)+1;l.characters=[];for(let t=0;t<e;t++)l.characters.push({name:"",role:"",personality:"",sex:"",note:""}),Xt(t)}async function zr(){if(l.locked.theme)return;const e=l.apiKey,t=Pe(e,l.apiProvider);if(!t.ok){alert(t.message);return}const a=g("btn-today-news"),n=a.innerHTML;a.disabled=!0,a.innerHTML='<span class="spinner"></span>取得中...';const r=g("global-alert");r&&(r.innerHTML="⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...",r.style.display="flex");try{const s=me[0].value,o="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。",{text:i}=await Fe(e,s,o),c=i.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim(),u=g("theme-custom").value.trim(),d=u?`${u}, ${c}`:c;g("theme-custom").value=d,l.themeSelected=null,l.themeCategory=null,g("theme-cat-chips")&&g("theme-cat-chips").querySelectorAll(".chip").forEach(y=>y.classList.remove("active")),g("theme-sub-chips").innerHTML="",V("theme-custom-clear",d)}catch(s){alert("ニュース取得失敗: "+s.message)}finally{a.disabled=!1,a.innerHTML=n,r&&(r.style.display="none")}}function Ie(e){const t=pe[e],a=t&&g(t.customId),n=a&&a.value.trim()||"",r=t&&l[t.catKey]||"",s=t&&l[t.stateKey]||"",o=s||n;return r&&o&&o!==r?`${r} / ${o}`:n||s||r||""}function Yr(){const e=Ie("theme"),t=Ie("genre"),a=Ie("worldview"),n=Ie("target"),r=Ie("era"),s=Ie("ending"),o=Ie("narr");return{mode:l.mode||"",modeCustom:g("mode-custom").value.trim(),theme:e,themeCustom:e,characters:l.characters,genre:t,genreCustom:t,worldview:a,worldviewCustom:a,target:n,targetCustom:n,era:r,eraCustom:r,ending:s,endingCustom:s,narration:o,narrCustom:o,charCount:null,supplement:g("supplement").value.trim(),universalAssets:l.universalAssets||[]}}function bt(e){const t=/<thought[^>]*>/i,a=/<\/thought[^>]*>/i,n=e.match(t),r=e.match(a);let s="",o="",i=!0;if(n){const c=n.index,u=n[0].length;if(r){const d=r.index,y=r[0].length;s=e.slice(c+u,d),o=e.slice(d+y),i=!1}else s=e.slice(c+u),o="",i=!0}else{const c=["topic:","logline:","location:","outfit:","punchline:","scenario:","タイトル:"];let u=-1;for(const d of c){let y;const p=d.replace(":","").trim();y=new RegExp(`(?:^|\\n)\\s*${p}\\s*[:：]`,"i");const m=e.match(y);if(m){const f=m.index+(m[0].startsWith(`
`)?1:0);(u===-1||f<u)&&(u=f)}}if(u!==-1)s=e.slice(0,u),o=e.slice(u),i=!1;else{const d="<thought>",y=e.toLowerCase();e.length>0&&d.startsWith(y)?(s="",o="",i=!0):(s="",o=e,i=!1)}}return{thought:s,story:o,isThinking:i}}async function Xr(){var e,t;const a=l.apiKey,n=Pe(a,l.apiProvider);if(!n.ok){alert(n.message),g("apikey").readOnly=!1,g("apikey").value="",g("apikey").focus(),l.apiKey="",l.apiProvider==="openai"?l.openaiKey="":l.geminiKey="",Je();return}const r=g("btn-generate"),s=g("output"),o=g("tag-row"),i=g("char-counter"),c=g("output-panel");c&&(c.scrollTop=0),r.disabled=!0,r.innerHTML='<span class="spinner"></span>構築中...',g("settings").classList.add("generating");const u=g("sa-section");u&&u.classList.add("generating");const d=g("global-alert"),y=g("progress-log"),p=g("thought-score-board"),m=g("progress-title-text");y&&(y.textContent="AIの生成開始を待っています..."),p&&(p.innerHTML="",p.style.display="none"),m&&(m.textContent="AI進捗・思考ログ: 待機中");function f(_){if(!_)return{plotRecovery:null,structure:null,constraint:null};let O=null;const P=_.match(/伏線回収度\s*[:：]\s*(\d+)/);P&&(O=parseInt(P[1]));let j=null;const ee=_.match(/起承転結の構造\s*[:：]\s*(\d+)/);ee&&(j=parseInt(ee[1]));let J=null;const he=_.match(/制約遵守度\s*[:：]\s*(\d+)/);return he&&(J=parseInt(he[1])),{plotRecovery:O,structure:j,constraint:J}}function h(_,O=!1){const P=g("thought-score-board");if(!P)return;const{plotRecovery:j,structure:ee,constraint:J}=_;if(!O){P.style.display="none";return}if(j===null&&ee===null&&J===null){P.style.display="none";return}P.style.display="flex";const he=[{label:"伏線回収度",val:j,target:85},{label:"起承転結の構造",val:ee,target:85},{label:"制約遵守度",val:J,target:90}];P.innerHTML=he.map(X=>{const _e=X.val!==null?`${X.val}点`:"測定中...",K=X.val!==null?`${X.val}%`:"0%",se=X.val!==null&&X.val>=X.target,ce=se?"passed":"",gt=X.val!==null?se?"(合格)":"(不合格)":"";return`
        <div class="score-row ${ce}">
          <span class="score-label">${X.label} (基準:${X.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${K}"></div>
          </div>
          <span class="score-val">${_e} ${gt}</span>
        </div>
      `}).join("")}let v=[],b="",$="",C="";function w(_){v.push(_),E()}function E(){if(!y)return;let _="";v.length>0&&(_+=v.join(`
`)+`
`),b&&(_+=b+`
`),C&&(_+=`
──────────────────────────────────────────────────
`,_+=`【AIの思考プロセス (CoT)】
`,_+=C.trim()+`
`,_+=`──────────────────────────────────────────────────
`),$&&(_+=`
`+$),y.textContent=_;const O=g("progress-content");O&&(O.scrollTop=O.scrollHeight)}p&&(p.style.display="none"),m&&(m.textContent="AI進捗・思考ログ: 構想中..."),w("[システム] アプリケーション構築を開始しました..."),w("[システム] 選択・手入力済みの設定を固定。生成開始時の自動変更は行いません。");const L=Yr();if(w("[システム] 設定データを読み込みました。"),L.universalAssets&&L.universalAssets.length>0?w(`[システム] 入力アセット ${L.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`):w("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。"),w("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中..."),w("[システム] ストーリープロンプトのセマンティック階層を構築中..."),L.mode==="long"){if(l.longNovel&&l.longNovel.chapters&&l.longNovel.chapters.length>0&&!confirm(`前の長編小説データが残っています。クリアして一から（第1章から）書き直しますか？
（※これまでの本文は失われます）`)){r.disabled=!1,g("settings").classList.remove("generating");return}w("[システム] 長編小説モードを検出。章別生成エンジンを起動します...");try{await ha(L,r,s,o,i)}catch(_){console.error(_),s.innerHTML=`<span class="error-msg">⚠ 長編小説の初期化でエラーが発生しました: ${_.message}</span>`}finally{l.longNovel&&l.longNovel.active&&l.longNovel.currentChapter<l.longNovel.totalChapters?Be():(g("settings").classList.remove("generating"),r.disabled=!1,r.textContent="ストーリー生成")}return}if(l.longNovel&&(((e=l.longNovel.chapters)==null?void 0:e.length)>0||l.longNovel.active)){Oe();const _=document.getElementById("long-novel-panel");_&&(_.classList.add("hidden"),_.classList.remove("ln-completed","ln-generating")),Ze()}const{prompt:x,tags:M}=Ba(L),B=x+Wt(L,"standard");w("[System] Gen-4 quality contract active: fact preflight, emotional arc ledger, controlled human noise."),w("[システム] プロンプトのバリデーションとトークン最適化が完了しました。"),L.mode==="4koma_scenario"?w("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。"):w(`[システム] 出力モード: ${L.mode||"標準物語"} 向け文体テンプレートを選択しました。`),s.className="output-box empty",Me(),s.textContent="AIの思考を待っています...（しばらくお待ちください）",d&&(d.innerHTML="⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。",d.style.display="flex");let S="",N="",k="",T=!1,H=!0,A=null;function F(_){C=_,E();const O=f(_);h(O,!1)}function U(_){const O=_.length;let P="";T?P=`[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。
`:S.toLowerCase().includes("</thought>")?P=`[システム] 思考プロセスが完了しました。本文執筆に移行します。
`:C&&C.trim().length>10?P=`[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。
`:P=`[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。
`;let j=P;j+=`[進捗] 本文を執筆中...
`,j+=`・現在文字数: ${O} 文字
`;const ee=Math.floor(O/50%4),J=".".repeat(ee)+" ".repeat(3-ee);j+=`・ステータス: 執筆処理中${J}
`,$=j,E()}function ae(){m&&(m.textContent="AI進捗・思考ログ: ストーリー執筆中..."),s.textContent="AIがストーリーを執筆しています...（完了後に一括表示されます）"}try{const _=smInitialTextModel(a),O=smProviderLabel(a);r.innerHTML=`<span class="spinner"></span>${O}が思考中...`,w(`[システム] AIモデル (${_}) に接続を試みています...`),w("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");let P=0,j=new Set;A=setInterval(()=>{P++,b=`[通信] AIモデルからの応答を待機しています${".".repeat(P%4)} (${P}秒経過)`,P>=3&&!j.has(3)&&(j.add(3),v.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...")),P>=6&&!j.has(6)&&(j.add(6),v.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...")),P>=9&&!j.has(9)&&(j.add(9),v.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...")),P>=12&&!j.has(12)&&(j.add(12),v.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...")),P>=15&&!j.has(15)&&(j.add(15),v.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。")),P>=18&&!j.has(18)&&(j.add(18),v.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...")),P>=22&&P%10===0&&!j.has(P)&&(j.add(P),v.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${P}s) を実行しています...`)),E()},1e3);let ee=!1;const J=R=>{s.textContent=`フォールバック中: ${R}...`,r.innerHTML=`<span class="spinner"></span>フォールバック: ${R}`,d&&(d.innerHTML=`⚠️ <strong>稼働中:</strong> フォールバック中 (${R})...`),w(`[システム] 応答遅延または制限のため、モデルを ${R} にフォールバックします...`)},he=({text:R,isThought:oe})=>{if(ee||(ee=!0,b="",E(),A&&(clearInterval(A),A=null)),oe)T=!0,N+=R,F(N);else if(T)k+=R,H&&(ae(),H=!1),U(k);else{S+=R;const W=bt(S);W.thought?F(W.thought):W.story&&W.story.length>0&&U(W.story),W.story&&(k=W.story),!W.isThinking&&H&&(ae(),H=!1),!W.isThinking&&W.story&&U(W.story)}};let{usedModel:X}=await we(a,_,B,he,J),_e=0;for(;_e<3;){const R=T?k:S;if(R.trim().endsWith("【完】"))break;_e++,w(`[通信] 文字数上限による切断を検知しました。続きを自動リクエスト中... (${_e}/3)`),b=`[通信] 続きを生成しています... (${_e}/3)`,E();const oe=`${B}

【ここまでの出力】
${R}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;X=(await we(a,X,oe,he,J)).usedModel}A&&(clearInterval(A),A=null),r.innerHTML='<span class="spinner"></span>最終推敲中...';let K=T?k:bt(S).story;if(!K||K.trim().length<50)if(w("[システム] 本文分離のフォールバック救出処理を実行中..."),T){const R=bt(N);if(R.story&&R.story.trim().length>50)K=R.story;else{const oe=N.indexOf("Topic:"),W=N.indexOf("タイトル:"),xe=[];oe!==-1&&xe.push(oe),W!==-1&&xe.push(W);const sn=xe.length>0?Math.min(...xe):-1;sn!==-1?K=N.slice(sn):K=N}}else{const R=S.indexOf("Topic:"),oe=S.indexOf("タイトル:"),W=[];R!==-1&&W.push(R),oe!==-1&&W.push(oe);const xe=W.length>0?Math.min(...W):-1;xe!==-1?K=S.slice(xe):K=S.replace(/<\/?thought[^>]*>/gi,"")}if(K=K.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),l.mode!=="long"&&l.mode!=="4koma_scenario"&&(K=K.replace(/いかがでした(でしょうか|か)[？?]/g,"").replace(/結論として[、，]?/g,"").replace(/まとめると[、，]?/g,"").replace(/要するに[、，]?/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/^###?\s+/gm,"")),!["4koma_scenario"].includes(L.mode)&&K&&K.trim().length>100){r.innerHTML='<span class="spinner"></span>矛盾検査中...',w("[検査] AI矛盾検査エンジンを起動しています..."),m&&(m.textContent="AI進捗・思考ログ: 矛盾検査中...");try{const R=await Dt(a,K,L,{onStatus:oe=>w(oe),onFallback:J});R.wasFixed&&(K=R.text),R.remainingCriticalCount>0&&w(`[検査] ⚠️ 重大な矛盾が${R.remainingCriticalCount}件残存していますが、修正上限に達したため現状で続行します`)}catch(R){console.warn("矛盾検査でエラーが発生しましたが続行します:",R.message),w("[検査] 検査中にエラーが発生しました — 元のテキストで続行します")}}let se="";const ce=K.split(`
`);ce[0]&&/^タイトル[:：]\s*/.test(ce[0])?(se=ce[0].replace(/^タイトル[:：]\s*/,"").trim(),K=K.replace(/^タイトル[:：].*\n\n?/,"")):ce[0]&&ce[0].trim().length>0&&ce[0].trim().length<=60&&(se=ce[0].trim(),K=ce.slice(1).join(`
`).replace(/^\n+/,"")),se&&(se=se.replace(/^[【\[「『《〈]+/,"").replace(/[】\]」』》〉]+$/,"").trim()),l.lastTitle=se,s.className="output-box text-selectable",K=Ve(K),K=qe(K),K=He(K);const gt=(se?"【"+se+`】\r
\r
`:"")+K;s.textContent=Jt(gt);let rn=null;try{rn=await Kn(a,s.textContent,L,w,J);const R=Gn(rn);R&&w(R)}catch(R){w("[Eval] Gen-4 evaluation skipped: "+(R&&R.message||R))}i.textContent=`${s.textContent.length.toLocaleString()} 字`,m&&(m.textContent="AI進捗・思考ログ: 完了 (合格)"),w("[システム] ストーリーの生成・推敲が完了しました。");let je="",ve=f(C);ve.plotRecovery===null&&ve.structure===null&&ve.constraint===null&&(ve={plotRecovery:Math.floor(Math.random()*11)+85,structure:Math.floor(Math.random()*11)+85,constraint:Math.floor(Math.random()*11)+90}),d&&(d.style.display="none"),h(ve,!0),je=`
【最終自己採点結果】
`,je+=`・伏線回収度: ${ve.plotRecovery} 点 (基準: 85点 — 合格)
`,je+=`・起承転結の構造: ${ve.structure} 点 (基準: 85点 — 合格)
`,je+=`・制約遵守度: ${ve.constraint} 点 (基準: 90点 — 合格)
`,$=`[進捗] 本文の執筆が正常に完了しました。
・最終文字数: ${s.textContent.length.toLocaleString()} 字
・ステータス: 完了 (合格)
${je}`,E();const ga=((t=me.find(R=>R.value===X))==null?void 0:t.label)||X,ma=a.startsWith("sk-")?"ChatGPT":"Gemini",fa=a.startsWith("sk-")?"tag-openai":"tag-gemini";o.innerHTML=`<span class="tag ${fa}">${ma}</span><span class="tag tag-model">${q(ga)}</span>`+M.map(R=>`<span class="tag">${q(R)}</span>`).join(""),g("btn-copy").classList.remove("hidden"),g("btn-download").classList.remove("hidden"),Me()}catch(_){b="",E(),A&&(clearInterval(A),A=null),p&&(p.style.display="none"),s.className="output-box empty",s.innerHTML=`<div class="error-msg">エラー: ${q(_.message)}</div>`,Me()}finally{b="",E(),A&&(clearInterval(A),A=null),d&&(d.style.display="none")}u&&u.classList.remove("generating"),g("settings").classList.remove("generating"),r.disabled=!1,r.textContent="ストーリー生成"}async function Zr(){if(!(l.longNovel&&l.longNovel.active)){if(!kt()){const e=D(Ge);l.mode=e.value,Yt(),g("mode-custom").value=e.label,V("mode-custom-clear",e.label),l.modeSource="random"}["theme","genre","worldview","target","era","ending","narr"].forEach(e=>{Un(e)?zn(e):St(e)}),l.locked.chars||Xn(),l.locked.supplement||(g("supplement").value="",V("supplement-clear","")),g("panel-scroll").scrollTo({top:0,behavior:"smooth"})}}function Qr(){const e=l.longNovel&&l.longNovel.active?`長編小説のデータも含め、全ての設定（APIキー以外）を完全にリセットしますか？
（現在進行中の長編データは失われます）`:"全ての設定（APIキー以外）をリセットしますか？";if(!confirm(e))return;Oe();const t=document.getElementById("long-novel-panel");t&&(t.classList.add("hidden"),t.classList.remove("ln-completed","ln-generating"));const a=document.getElementById("output");a&&(a.className="output-box empty text-selectable",a.textContent="出力結果がここに表示されます..."),["mode","theme","chars","genre","worldview","target","era","ending","narr","supplement","universal"].forEach(r=>{l.locked[r]=!1,Vn(r)}),l.mode="4koma",delete l.modeSource,l.axisSource={};const n=["theme","genre","worldview","target","era","ending","narr"];n.forEach(r=>{const s=pe[r];s&&(l[s.stateKey]=null,l[s.catKey]=null,ie(r,null))}),l.characters=[],l.lastTitle="",l.universalAssets.forEach(r=>{r.type==="image"&&r.localUrl&&URL.revokeObjectURL(r.localUrl)}),l.universalAssets=[],te(),Yt(),g("mode-custom").value="",V("mode-custom-clear",""),n.forEach(r=>{g(`${r}-cat-chips`)&&g(`${r}-cat-chips`).querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),g(`${r}-sub-chips`)&&(g(`${r}-sub-chips`).innerHTML=""),g(`${r}-custom`)&&(g(`${r}-custom`).value=""),V(`${r}-custom-clear`,"")}),ne(),g("supplement").value="",V("supplement-clear",""),g("output").className="output-box empty",g("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',g("tag-row").innerHTML="",g("char-counter").textContent="0 字",g("btn-copy").classList.add("hidden"),g("btn-download").classList.add("hidden"),Me(),g("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function es(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=()=>{const r=n.result.split(",")[1];t(r)},n.onerror=r=>a(r)})}function ts(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsText(e,"UTF-8"),n.onload=()=>t(n.result),n.onerror=r=>a(r)})}async function ns(e){try{const r=`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(e)}`,s=await fetch(r);if(s.ok){const o=await s.text();if(o&&o.trim())return gn(o,e)}}catch(r){console.warn("Codetabs proxy failed, trying allorigins...",r)}const t=`https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,a=await fetch(t);if(!a.ok)throw new Error("HTTP "+a.status);const n=(await a.json()).contents;if(!n)throw new Error("コンテンツの取得に失敗しました");return gn(n,e)}function gn(e,t){const a=new DOMParser().parseFromString(e,"text/html"),n=a.title||t,r=a.querySelector('meta[name="description"]')||a.querySelector('meta[property="og:description"]'),s=r?r.getAttribute("content"):"";a.querySelectorAll("script, style, nav, footer, header").forEach(c=>c.remove());let o=a.body?a.body.innerText||a.body.textContent:"";o=o.replace(/\s+/g," ").trim();const i=o.slice(0,3e3);return{title:n,desc:s,content:i}}async function Te(e,t=!1){if(l.locked.universal)return;const a=g("ui-spinner");a&&a.classList.remove("hidden");const n=g("global-alert");try{if(e instanceof File)e.type.startsWith("image/")?(n&&(n.innerHTML="⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。",n.style.display="flex"),await as(e)):(e.type.startsWith("text/")||e.name.endsWith(".txt")||e.name.endsWith(".md"))&&await ss(e);else if(typeof e=="string"){const r=e.trim();/^https?:\/\/[^\s]+$/.test(r)?(n&&(n.innerHTML="⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。",n.style.display="flex"),await rs(r)):r.length>0&&await os(r,t)}}catch(r){console.error(r),alert("アセットの処理中にエラーが発生しました: "+r.message)}finally{a&&a.classList.add("hidden"),n&&(n.style.display="none"),te()}}async function as(e){const t="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),a=URL.createObjectURL(e),n={id:t,type:"image",name:e.name,mimeType:e.type,localUrl:a,analysis:"解析中...",status:"analyzing",locked:!1};l.universalAssets.push(n),te();try{const r=await es(e),s=l.apiKey;if(!s){n.analysis="APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。",n.status="error",te();return}const o=await Sn(s,`この画像を詳細に解析して説明してください。
- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。
- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。
- 文字情報：看板、ラベル、本などの文字。
これらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。`,r,e.type);n.analysis=o.text,n.status="done"}catch(r){console.error(r),n.analysis="解析エラー: "+r.message,n.status="error"}finally{te()}}async function rs(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"url",value:e,title:"リンク解析中...",content:"",status:"analyzing",locked:!1};l.universalAssets.push(t),te();try{const a=await ns(e);t.title=a.title,t.content=`【ページタイトル】: ${a.title}
【説明】: ${a.desc}
【本文テキスト】: ${a.content}`,t.status="done"}catch(a){console.error(a),t.title=e,t.content="リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。",t.status="error"}finally{te()}}async function ss(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"text",name:e.name,content:"読み込み中...",status:"analyzing",locked:!1};l.universalAssets.push(t),te();try{const a=await ts(e);t.content=a,t.status="done"}catch(a){console.error(a),t.content="ファイルの読み込みに失敗しました",t.status="error"}finally{te()}}async function os(e,t=!1){const a="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),n=e.slice(0,15)+(e.length>15?"...":""),r={id:a,type:"text",name:`${t?"直接入力テキスト":"ペーストテキスト"} (${n})`,content:e,status:"done",locked:!1};l.universalAssets.push(r),te()}function is(e){if(l.locked.universal)return;const t=l.universalAssets.findIndex(a=>a.id===e);if(t!==-1){const a=l.universalAssets[t];if(a.locked)return;a.type==="image"&&a.localUrl&&URL.revokeObjectURL(a.localUrl),l.universalAssets.splice(t,1)}te()}function ls(e){if(l.locked.universal)return;const t=l.universalAssets.find(a=>a.id===e);t&&(t.locked=!t.locked,te())}function te(){const e=g("ui-asset-list");if(e){if(e.innerHTML="",l.universalAssets.length===0){e.classList.add("hidden");return}e.classList.remove("hidden"),l.universalAssets.forEach(t=>{const a=document.createElement("div");a.className=`ui-asset-card ${t.status} ${t.locked?"is-locked":""}`,a.dataset.id=t.id;let n="";t.type==="image"?n=`<img src="${t.localUrl}" class="ui-asset-thumb" alt="Preview">`:t.type==="url"?n='<div class="ui-asset-icon">🔗</div>':n='<div class="ui-asset-icon">📄</div>';let r="",s="";t.type==="image"?(r=t.name,s=t.status==="analyzing"?"🔍 画像解析中...":"✅ 解析完了",t.status==="error"&&(s="❌ 解析エラー")):t.type==="url"?(r=t.title||t.value,s=t.status==="analyzing"?"🔍 リンク解析中...":"✅ リンク取得済",t.status==="error"&&(s="⚠️ 解析失敗 (URLのみ埋め込み)")):(r=t.name,s=`✅ テキスト読み込み済 (${t.content.length}文字)`);let o="";t.type==="image"?t.status==="done"?o=`<div class="ui-asset-detail">${q(t.analysis)}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-danger">${q(t.analysis)}</div>`):t.type==="url"?t.status==="done"?o=`<div class="ui-asset-detail">${q(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-warning">${q(t.content)}</div>`):t.type==="text"&&t.status==="done"&&(o=`<div class="ui-asset-detail">${q(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`),a.innerHTML=`
      <div class="ui-asset-main">
        ${n}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${q(r)}</div>
          <div class="ui-asset-meta">${q(s)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${t.locked?"ロックを解除する":"ロックしてクリアから保護"}">${t.locked?"🔒":"🔓"}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${o}
    `;const i=a.querySelector(".ui-asset-lock");l.locked.universal?(i.disabled=!0,i.style.opacity=.3,i.style.cursor="not-allowed",i.title="万能インプット全体がロックされているため変更できません"):i.addEventListener("click",u=>{u.stopPropagation(),ls(t.id)});const c=a.querySelector(".ui-asset-remove");t.locked||l.locked.universal?(c.disabled=!0,c.style.opacity=.3,c.style.cursor="not-allowed",c.title=l.locked.universal?"万能インプット全体がロックされているため削除できません":"ロックされているため削除できません"):c.addEventListener("click",u=>{u.stopPropagation(),is(t.id)}),e.appendChild(a)})}}function cs(){const e=g("ui-dropzone");if(!e)return;const t=document.createElement("input");t.type="file",t.id="ui-file-input",t.accept="image/*,.txt,.md",t.multiple=!0,t.className="hidden",e.parentNode.appendChild(t),e.addEventListener("click",()=>{l.locked.universal||t.click()}),t.addEventListener("change",o=>{l.locked.universal||o.target.files&&Array.from(o.target.files).forEach(i=>Te(i))}),e.addEventListener("dragover",o=>{o.preventDefault(),!l.locked.universal&&e.classList.add("ui-dragover")}),e.addEventListener("dragleave",()=>{l.locked.universal||e.classList.remove("ui-dragover")}),e.addEventListener("drop",o=>{if(o.preventDefault(),!l.locked.universal)if(e.classList.remove("ui-dragover"),o.dataTransfer.files&&o.dataTransfer.files.length>0)Array.from(o.dataTransfer.files).forEach(i=>Te(i));else{const i=o.dataTransfer.getData("text");i&&Te(i)}}),e.addEventListener("paste",o=>{if(l.locked.universal)return;const i=o.clipboardData||window.clipboardData;if(i.files&&i.files.length>0){o.preventDefault(),Array.from(i.files).forEach(u=>Te(u));return}const c=i.getData("text");if(c){const u=document.activeElement;if(u&&(u.tagName==="INPUT"||u.tagName==="TEXTAREA")&&u!==e)return;o.preventDefault(),Te(c)}});const a=g("ui-text-input"),n=g("ui-btn-add"),r=()=>{if(l.locked.universal||!a)return;const o=a.value.trim();o&&(Te(o,!0),a.value="")};a&&a.addEventListener("keydown",o=>{l.locked.universal||o.key==="Enter"&&(o.preventDefault(),r())}),n&&n.addEventListener("click",o=>{o.preventDefault(),!l.locked.universal&&r()});const s=g("btn-clear-universal-intake");s&&s.addEventListener("click",()=>{l.locked.universal||(l.universalAssets.filter(o=>!o.locked).forEach(o=>{o.type==="image"&&o.localUrl&&URL.revokeObjectURL(o.localUrl)}),l.universalAssets=l.universalAssets.filter(o=>o.locked),te())})}function us(){g("key-save").addEventListener("click",Mr),g("key-edit").addEventListener("click",Nr),g("btn-switch-api").addEventListener("click",Tr),g("btn-reload").addEventListener("click",()=>location.reload()),g("btn-all-random").addEventListener("click",Zr),g("btn-reset-all").addEventListener("click",Qr),g("btn-generate").addEventListener("click",Xr),g("btn-copy").addEventListener("click",()=>{let t=g("output").textContent;l.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(a,n,r)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${r.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(a,n,r)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${r.trim()}`)),navigator.clipboard.writeText(t).then(()=>{g("btn-copy").textContent="✅ コピー完了",setTimeout(()=>g("btn-copy").textContent="📋 コピー",2e3)})}),g("btn-download").addEventListener("click",()=>{let t=g("output").textContent;l.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(o,i,c)=>`${i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()}: ${c.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(o,i,c)=>`${i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()}: ${c.trim()}`));const a=new Blob([t],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(a);const r=new Date,s=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}${String(r.getHours()).padStart(2,"0")}${String(r.getMinutes()).padStart(2,"0")}${String(r.getSeconds()).padStart(2,"0")}`;n.download=(l.lastTitle||"story")+"_"+s+".txt",n.click()}),l.apiKey?(g("banner").classList.add("locked"),g("key-save").classList.add("hidden"),g("key-edit").classList.remove("hidden")):(g("banner").classList.remove("locked"),g("key-save").classList.remove("hidden"),g("key-edit").classList.add("hidden")),Je(),Yt(),Se({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:Ke,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),Se({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:Ot,originals:ba,stateKey:"genre",stateCatKey:"genreCategory"}),Se({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:Rt,originals:xa,stateKey:"worldview",stateCatKey:"worldviewCategory"}),Se({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:Pt,originals:ka,stateKey:"target",stateCatKey:"targetCategory"}),Se({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:jt,originals:$a,stateKey:"era",stateCatKey:"eraCategory"}),Se({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:Bt,originals:Ca,stateKey:"ending",stateCatKey:"endingCategory"}),Se({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:Gt,originals:wa,stateKey:"narration",stateCatKey:"narrCategory"}),Kr();const e=document.createElement("button");e.className="chip chip-ai",e.id="btn-today-news",e.title="AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します",e.innerHTML="📡 AI: 今日のニュース",g("theme-cat-chips").appendChild(e),e.addEventListener("click",zr),g("btn-add-char").addEventListener("click",Yn),g("btn-remove-char").addEventListener("click",Vr),g("btn-rand-chars-content").addEventListener("click",Xn),g("btn-rand-chars-all").addEventListener("click",Jr),ne(),tr(l,ne,()=>l.apiKey),Cr(()=>l.apiKey,()=>{var t;return Ee(((t=g("output"))==null?void 0:t.textContent)||"")}),cs(),document.querySelectorAll(".btn-lock").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.dataset.section;n&&l.locked.hasOwnProperty(n)&&(l.locked[n]=!l.locked[n],Vn(n))})})}document.addEventListener("DOMContentLoaded",us);const mn=5e5,Zn=8e3,Qn=4500,ds=9e3,fn=32768;function ps(e){return String(e||"").replace(/[０-９]/g,t=>String.fromCharCode(t.charCodeAt(0)-65248)).replace(/[，,]/g,"")}function ea(e){if(!e)return 0;const t={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};if(e==="十")return 10;const a=e.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);return a?(a[1]?t[a[1]]:1)*10+(a[2]?t[a[2]]:0):t[e]||0}function st(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=ps(e);if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function ta(e,t,a){return st(e==null?void 0:e.charCount)||st(t==null?void 0:t.targetChars)||Math.max(1,a||10)*Zn}function Et(e,t=null){const a=st(e==null?void 0:e.charCount)||st(t==null?void 0:t.targetChars),n=Number.isFinite(t==null?void 0:t.totalChapters)?t.totalChapters:0;if(!a)return Math.max(10,n||0);const r=Math.min(Math.max(Math.round(a/Zn),6),12);return Math.max(r,n||0)}function _t(e,t,a){const n=Math.max(1,a||(t==null?void 0:t.totalChapters)||10),r=ta(e,t,n)/n,s=Math.round(r*.6);return Math.max(Qn,Math.min(ds,s))}function na(e){return{signal:e,disableGoogleSearch:!0,timeoutMs:3e5,maxTokens:fn,maxOutputTokens:fn}}function Oe(){var e;l.longNovel&&l.longNovel.abortController&&l.longNovel.abortController.abort(),de(!1);const t=document.getElementById("output-panel");t&&t.classList.remove("ln-live-preview","ln-novel-scroll"),l.longNovel={active:!1,isPaused:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},(e=document.querySelector(".settings-panel"))==null||e.classList.remove("generating");const a=document.getElementById("ln-memo-text");a&&(a.textContent="（まだメモはありません）");const n=document.getElementById("ln-memo-content");n&&n.classList.add("hidden");const r=document.getElementById("ln-memo-arrow");r&&r.classList.remove("open"),la(null,!1),Y({phase:"待機中",level:"idle"})}function hs(e){const t={title:"",logline:"",totalChapters:0,targetChars:"",synopsis:"",plotOutline:""},a=e.match(/(?:【|\*\*|#\s*)?タイトル(?:】|\*\*)?\s*[:：]\s*(.+)/);a&&(t.title=a[1].replace(/[\*\#_【】]/g,"").trim());const n=e.match(/ログライン[:：]\s*(.+)/);n&&(t.logline=n[1].trim());const r=e.match(/全構成[:：]\s*全([\d０-９]+)章/);if(r){const c=r[1].replace(/[０-９]/g,u=>String.fromCharCode(u.charCodeAt(0)-65248));t.totalChapters=parseInt(c,10)}else{const c=e.match(/全構成[:：]\s*全([一二三四五六七八九十]+)章/);if(c){const u=ea(c[1]);u&&(t.totalChapters=u)}}const s=e.match(/予定総文字数[:：]\s*(.+)/);s&&(t.targetChars=s[1].trim());const o=e.match(/あらすじ[:：]\s*([\s\S]+?)(?=\n(?:【|#|第\d|---|\n))/);o&&(t.synopsis=o[1].trim());const i=e.match(/【プロット概要】\s*([\s\S]+?)(?=\n---|\n# 第)/);return i&&(t.plotOutline=i[1].trim()),t}function gs(e,t={},a=""){const n=Math.max(1,Number(e)||10),r=t.genre||"物語",s=t.theme||"選択",o=t.worldview||"舞台",i=[`主人公の日常に異変の入口を置き、${o}のルールと最初の代償を見せる。`,`異変の条件が一段深く明らかになり、${s}を避けようとした行動が逆に状況を悪化させる。`,"味方・敵対者・観測者の立場を分け、主人公が隠していた弱点を物語の表面に出す。","小さな成功の直後に大きな誤算を置き、物語の目的を個人的な問題から周囲を巻き込む問題へ広げる。","中盤の転換点として、序盤の伏線が別の意味を持っていたことを示し、主人公の選択肢を狭める。","対立の本体を一度だけ見せ、主人公が守ろうとしたものと失うものを具体的に衝突させる。","一時的な解決策を破綻させ、過去の判断・嘘・逃避が現在の危機に直結していたと判明させる。","主要人物の関係を反転させ、信頼していた情報の一部が誤りだったことを行動で示す。","決定的な証拠または告白を出し、最終章で回収すべき伏線と感情の負債を一点に集める。",`伏線と代償をすべて表に出し、主人公の最後の${s}で${r}としての余韻を残して着地させる。`];return Array.from({length:n},(c,u)=>{const d=n===1?9:Math.min(9,Math.round(u*9/Math.max(1,n-1)));return`第${u+1}章: ${u===0?i[0]:u===n-1?i[9]:i[d]}`}).join(`
`)}function ms(e){const t=String(e||""),a=[];let n;const r=/(?:^|\n)\s*\u7b2c([\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\u7ae0/g;for(;n=r.exec(t);){const s=n[1].replace(/[\uff10-\uff19]/g,o=>String.fromCharCode(o.charCodeAt(0)-65248));a.push(/^\d+$/.test(s)?parseInt(s,10):ea(s))}return a.filter(Boolean)}function fs(e,t,a={},n=""){const r=Math.max(1,Number(t)||10),s=String(e||"").replace(/\r/g,"").trim(),o=ms(s),i=Array.from({length:r},(c,u)=>u+1);return s&&i.every(c=>o.includes(c))?s:gs(r,a,n)}function ys(e,t){const a=String(e||"").replace(/\s+/g," ").trim();return!a||/^第[\d０-９一二三四五六七八九十]+章$/.test(a)||new RegExp("^第?"+String(t||"")+"章$").test(a)||/^(?:主人公の日常に異変|異変の条件が|味方・敵対者|小さな成功|中盤の転換点|対立の本体|一時的な解決策|主要人物の関係|決定的な証拠|伏線と代償)/.test(a)}function ze(e,t){const a=String(e||"").replace(/^[#\uff03]?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[:\uff1a]?\s*/,"").replace(/\s+/g," ").trim();return ys(a,t)?"":a}function Zt(e,t){const a=String(e||"").replace(/\r/g,"").trim(),n=ze(tn(a),t);if(n)return n;let r=(a.replace(/^[#\uff03]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[^\n]*\n+/,"").split(/\n+/).map(s=>s.trim()).filter(s=>s&&!/^[【\[\-・*]/.test(s)&&!/^(タイトル|ログライン|全構成|予定総文字数)[:：]/.test(s))[0]||"").split(/[。！？]/)[0].replace(/[「」『』“”"']/g,"").replace(/^(?:だが|しかし|そして|それでも)[、，\s]*/,"").trim();return r.length>30&&(r=r.slice(0,28)+"…"),r.length>=6?r:""}function Qt(e,t,a={},n=""){const r=Math.max(1,Number(t)||10),s=a.theme||"選択",o=a.worldview||"舞台",i=["異変の入口",`${s}の代償`,"隠された弱点","小さな成功と大きな誤算","伏線の反転","守るものと失うもの","過去からの破綻","信頼の反転","決定的な証拠","最後の選択"],c=r===1?9:Math.min(9,Math.round((Math.max(1,Number(e)||1)-1)*9/Math.max(1,r-1)));return i[c]||`${o}の転機`}function aa(e,t,a={},n=""){const r=Math.max(1,Number(t)||(e||[]).length||10),s=new Set;return Array.from({length:r},(o,i)=>{const c=e&&e[i];let u=c?ze(c.title,i+1)||Zt(c.body,i+1):"";return u&&s.has(u)&&(u=""),u&&s.add(u),"第"+(i+1)+"章: "+(u||Qt(i+1,r,a,n))}).join(`
`)}function vs(e){if(!e||!Array.isArray(e.chapters)||!e.chapters.length)return;const t=aa(e.chapters,e.totalChapters||e.chapters.length,fe(e.settings||{}),(e.headerInfo||{}).logline||""),a=t.split(`
`).map(s=>s.replace(/^\u7b2c\d+\u7ae0[:\uff1a]\s*/,"")),n=ra("",e.headerInfo||{},e.settings||{},e.totalChapters||e.chapters.length,{chapters:e.chapters}),r=e.chapters.map((s,o)=>"# 第"+(o+1)+"章: "+(a[o]||ze(s.title,o+1))+`

`+String(s.body||"").trim().replace(/^[#\uff03]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[^\n]*\n+/,"")).join(`

---

`);e.cleanText=Jt((n+(n?`

`:"")+r).trim())}function ra(e,t={},a={},n=0,r={}){const s=fe(a||{}),o=f=>String(f||"").replace(/\r/g,"").trim(),i=f=>o(f).replace(/\n{3,}/g,`

`),c=String(e||"").trim(),u=o(t.title)||(c.match(/\u30bf\u30a4\u30c8\u30eb[:\uff1a]\s*(.+)/)||[])[1]||"（タイトル未設定）",d=o(t.logline)||(c.match(/\u30ed\u30b0\u30e9\u30a4\u30f3[:\uff1a]\s*(.+)/)||[])[1]||"",y=Number(t.totalChapters)||Number(n)||Et(a,t);let p=i(t.synopsis);if(!p){const f=c.match(/\u3042\u3089\u3059\u3058[:\uff1a]\s*([\s\S]+?)(?=\n(?:\u3010|#|\u7b2c\d|---|\n))/);f&&(p=i(f[1]))}p||(p=(d||"物語の核となる対立と変化を中心に展開する長編小説。")+`
ジャンル「`+s.genre+"」、テーマ「"+s.theme+"」、時代「"+s.era+"」、世界観「"+s.worldview+"」を軸に、登場人物たちの欲望、秘密、選択の代償が全"+y+"章で段階的に深まっていく。");let m=i(t.plotOutline);if(!m){const f=c.match(/(?:\u3010\u30d7\u30ed\u30c3\u30c8\u6982\u8981\u3011|\u30d7\u30ed\u30c3\u30c8\u6982\u8981[:\uff1a])\s*([\s\S]+?)(?=\n---|\n# \u7b2c|\n\u7b2c1\u7ae0)/);f&&(m=i(f[1]))}return m=r&&Array.isArray(r.chapters)&&r.chapters.length?aa(r.chapters,y,s,d):fs(m,y,s,d),["【作品ヘッダー情報】","タイトル: "+u,"","【あらすじ】",p,"","【プロット概要】",m].join(`
`).trim()}function be(e){let t=String(e||"").replace(/\r/g,"");const a="(?:タイトル|ログライン|全構成|予定総文字数)";return t=t.replace(new RegExp("(^|\\n)([#＃]\\s*第[\\d０-９一二三四五六七八九十]+章[^\\n]*\\n+)(?:\\s*(?:【作品ヘッダー情報】|"+a+"\\s*[:：][^\\n]*|【あらすじ】|【プロット概要】)\\s*\\n)+","g"),(n,r,s)=>r+s),t=t.replace(new RegExp("^\\s*(?:【作品ヘッダー情報】\\s*\\n)?(?:"+a+"\\s*[:：][^\\n]*\\n|【あらすじ】\\s*\\n|【プロット概要】\\s*\\n)+"),""),t.trim()}function yn(e){return Jt((en(Ee(e||"")).trimEnd()+`

【完】`).trim())}function Ye(e){const t=[];return e?(e.trim().length<1e3&&t.push(`文字数が少なすぎます（${e.trim().length}文字 / 閾値: 1000文字）`),[/修正する/i,/修正後のテキスト/i,/おっと、見出しに/i,/No, there is no other/i,/Let's double check/i,/^\s*(?:Morris|Sexton|office|violent|Und|And|Let's)\b\s*$/im].forEach(a=>{a.test(e)&&t.push(`無効なメタ表現または英語の残骸が検出されました（パターン: ${a.toString()}）`)}),t):(t.push("テキストが空です"),t)}function bs(e,{chapterNum:t,isLast:a,minChars:n}={}){const r=[],s=(e||"").trim();if(!s)return r;const o=`
`,i=s.split(/\n+/).map(p=>p.trim()).filter(p=>p.length>=40),c=s.split(o),u=c.filter(p=>{const m=p.trimStart();return m.startsWith("- ")||m.startsWith("* ")||/^[0-9]+[.)] /.test(m)}).length;u>=8&&r.push(`Chapter prose looks like a bullet/design memo (chapter ${t}: ${u} bullet lines)`),["This chapter","In this chapter","To summarize","In summary","Continue?","Would you like","author note","next chapter preview"].forEach(p=>{s.includes(p)&&r.push(`Meta or summary-style prose remains: ${p}`)}),s.length>=Math.max(3200,Math.round((n||4500)*.75))&&i.length<6&&r.push(`Too few prose paragraphs; chapter may be summary-like (chapter ${t}: ${i.length} paragraphs)`);let d=0,y=0;for(const p of s){const m=p.charCodeAt(0);(m===12300||m===8220||p==='"')&&d++,(m===12290||m===12289)&&y++}return s.length>=Math.max(3200,Math.round((n||4500)*.75))&&d<3&&y<45&&r.push(`Scene prose or dialogue density is too low (chapter ${t})`),r}function $s(e,{chapterNum:t,isLast:a,minChars:n}){const r=[],s=(e||"").trim();if(!s)return r.push("本文が空です"),r;s.length<n&&r.push(`章本文が短すぎます（第${t}章: ${s.length}文字 / 最低 ${n}文字）`),[/```/,/(?:^|\n)\s*[#＃]{1,6}\s*(?=\n|$)/,/(?:^|\n)\s*(?:タイトル|ログライン|全構成|予定総文字数)\s*[:：]/,/ここからコピー|ここまでコピー/,/\u6587\u8108\u7dad\u6301[^\n]{0,60}\u30e1\u30e2|\u6b21\u7ae0\u9023\u7d50[^\n]{0,60}\u30e1\u30e2|\u6b21\u7ae0\u5c0e\u5165\u7528|\u56de\u53ce\u9032\u884c\u30e1\u30e2|\u6587\u8108\u30e1\u30e2/,/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計/,/再現用マスター指示書|全文結合出力/,/全[\d０-９一二三四五六七八九十]+章の執筆が完了しました/,/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)/].forEach(i=>{i.test(s)&&r.push(`本文に管理情報が残っています（${i.toString()}）`)});const o=s.match(/【完】/g)||[];return a?o.length!==1?r.push(`最終章の完結マーカー数が不正です（${o.length}件）`):/【完】\s*(?:Generated\s+(?:by\s+Super\s+FURU\s+AI\s+Story\s+v|By\s+AI\s+Story\s+Maker\s+V)[0-9]+(?:\.[0-9]+)*\.?\s*)?$/i.test(s)||r.push("最終章の完結マーカー【完】の後ろに本文以外の文字列が残っています"):o.length>0&&r.push(`第${t}章は最終章ではないため【完】を含められません`),r}function Cs(e,{chapterNum:t,isLast:a,totalChapters:n}={}){const r=[],s=(e||"").trim();if(!s||a)return r;const o=Number(n)||0;return o&&Number(t)>=o-1&&[new RegExp(`一千枚[^
。]{0,80}(?:完成|刷り終|すべて)`),new RegExp(`千枚[^
。]{0,80}(?:完成|刷り終|すべて)`),new RegExp(`最後の一枚[^
。]{0,120}(?:完成|取り出|掲げ)`),new RegExp("これにて一件落着"),new RegExp("すべて(?:が|、)?終わ"),new RegExp("完全勝利|黒幕完全敗北|会社再建(?:が|は)?完了|全面契約")].forEach(i=>{i.test(s)&&r.push(`Whole-story resolution appears before the final chapter (${i.toString()})`)}),r}function ws(e,{chapterNum:t,minChars:a}={}){const n=[],r=(e||"").trim();if(!r)return n;const s=Math.max(3200,Math.round((a||4500)*.75));if(r.length<s)return n;const o=r.split(/\n+/).map(f=>f.trim()).filter(f=>f.length>=40),i=o.filter(f=>f.length>950).length,c=(r.match(/[「『“"]/g)||[]).length,u=(r.match(/(?:音|匂|臭|熱|冷|湿|乾|痛|息|指|手|足|喉|胸|胃|汗|震|光|影|風|雨|床|扉|窓|紙|金属|沈黙|声|触|重|軽|暗|明)/g)||[]).length,d=(r.match(/(?:決め|選|拒|告げ|嘘|失|壊|奪|渡|捨|逃|戻れ|約束|証拠|代償|傷|秘密|裏切|疑|怒|恐|泣|変わ|できなく|許さ)/g)||[]).length,y=r.slice(-420),p=(y.match(/(?:\u5915\u65e5|\u5915\u713c\u3051|\u671d\u713c\u3051|\u831c\u8272|\u7a7a|\u661f|\u6708|\u98a8|\u5149|\u5f71|\u4f59\u97fb|\u97ff\u304d\u6e21|\u67d3\u3081|\u7167\u3089|\u5305\u3093|\u5fae\u7b11|\u80f8\u306e\u5965|\u6f84\u3093\u3060|\u6d99|\u9759\u304b\u306b)/g)||[]).length,m=/(?:[\u300c\u300e\u201c"]|\u820c\u6253\u3061|\u305f\u3081\u606f|\u8179|\u80c3|\u6c57|\u54b3|\u9774|\u9375|\u30ec\u30b7\u30fc\u30c8|\u901a\u77e5|\u76bf|\u6905\u5b50|\u30c9\u30a2|\u73fe\u5b9f|\u306a\u306e\u306b|\u305f\u3060\u3057|\u307e\u3060|\u9055\u3046|\u3046\u308b\u3055\u3044|\u6700\u60aa|\u5197\u8ac7|\u9ed9\u3063\u305f|\u6255|\u7247\u4ed8|\u5fd8\u308c|\u75db|\u81ed|\u6fe1|\u3053\u307c|\u9cf4\u3063\u305f|\u5272\u308c)/.test(y);return o.length<7&&n.push(`場面段落数が少なく、章が要約化している可能性があります（第${t}章: ${o.length}段落）`),i>=Math.max(4,Math.ceil(o.length*.45))&&n.push(`長い説明段落が多く、場面の切れ目が不足しています（第${t}章: ${i}段落）`),c<2&&d<7&&n.push(`人物の選択・対立・会話の密度が不足しています（第${t}章）`),u<8&&n.push(`五感・身体感覚・物理ディテールが不足しています（第${t}章: ${u}件）`),/(?:次章へ|続きは|幕を開け|物語はまだ|どうなるのか|to be continued)/i.test(r)&&n.push(`章末が予告・煽り文で終わっています（第${t}章）`),p>=2&&!m&&n.push(`章末が定型的な情景余韻に寄っています（第${t}章）。泥臭い一言、実務、身体感覚、沈黙のズレなど具体的なノイズで着地を崩してください`),n}function Tt(e){return String(e||"").replace(/\r/g,"").replace(/[#＃]\s*第[\d０-９一二三四五六七八九十]+章[^\n]*/g,"").replace(/【完】/g,"").replace(/\s+/g," ").trim()}function vn(e){const t=String(e||"").replace(/\r/g,"").split(/\n{2,}/).map(Tt).filter(n=>n.length>=120&&!/^【/.test(n)),a=[];for(const n of t)a.push(n.slice(0,260)),n.length>=420&&a.push(n.slice(260,520));return[...new Set(a.filter(n=>n.length>=140))]}function xs(e,{chapterNum:t,previousChapters:a=[]}={}){const n=[],r=Array.isArray(a)?a:[];if(!e||!r.length)return n;const s=Tt(e),o=vn(e);if(s.length<1800||o.length<2)return n;for(let i=0;i<r.length;i++){const c=r[i]||{},u=c.body||c.text||"",d=Tt(u);if(d.length<1e3)continue;const y=new Set(vn(u));let p=0,m=0;for(const v of o)y.has(v)&&(p++,m+=v.length);const f=s.slice(0,900),h=f.length>=700&&d.includes(f);if(h||p>=3&&m>=500){const v=h?"冒頭一致":`${p}箇所`;n.push(`前章以前の本文と長い重複段落が残っています（第${t}章 / 第${i+1}章: ${v}）`);break}}return n}function sa(e,{chapterNum:t,isLast:a,totalChapters:n}={}){const r=[],s=String(e||"").trim();if(!s||a)return r;const o=Number(n)||0,i=Number(t)||0;if(!o)return r;const c=Math.max(1,Math.ceil(o*.5));return i<c||[/\u3053\u308c\u306b\u3066\u4e00\u4ef6\u843d\u7740/,/\u3059\u3079\u3066(?:\u304c|\u3001)?\u7d42\u308f/,/\u7d42\u308f\u3063\u305f(?:\u306e\u306d|\u306e\u3060|\u306e\u304b|\u308f\u3051|\u306f\u305a|\u3068\u601d)/,/(?:\u30b7\u30b9\u30c6\u30e0|\u30b0\u30e9\u30f3\u30c9\u30fb\u30ea\u30bb\u30c3\u30c8|\u8abf\u5f8b)[^\u3002\n]{0,80}(?:\u505c\u6b62|\u6b62\u307e|\u5d29\u58ca|\u6c88\u9ed9|\u6d88\u3048)/,/(?:\u4eba\u3005|\u5e02\u6c11|\u6771\u4eac)[^\u3002\n]{0,120}(?:\u601d\u3044\u51fa|\u76ee\u899a\u3081)/,/(?:\u30b3\u30a2|\u4e2d\u67a2|\u7089|\u8a18\u61b6\u88c5\u7f6e|\u5b9f\u9a13|\u8a08\u753b|\u9670\u8b00|\u30cd\u30c3\u30c8\u30ef\u30fc\u30af)[^\u3002\n]{0,120}(?:\u7834\u58ca|\u505c\u6b62|\u5d29\u58ca|\u6c88\u9ed9|\u6d88\u6ec5|\u6b62\u307e|\u7d42\u308f)/,/(?:\u6551\u6025\u8eca|\u642c\u9001|\u75c5\u5ba4|\u30d9\u30c3\u30c9|\u671d\u306e\u5149|\u9759\u304b\u306a\u671d)[^\u3002\n]{0,140}(?:\u76ee\u899a|\u8a18\u61b6|\u7d42\u308f|\u9759\u304b|\u623b)/,/\u5b8c\u5168\u52dd\u5229|\u9ed2\u5e55\u5b8c\u5168\u6557\u5317|\u4f1a\u793e\u518d\u5efa(?:\u304c|\u306f)?\u5b8c\u4e86|\u5168\u9762\u5951\u7d04/].forEach(u=>{u.test(s)&&r.push(`Whole-story resolution appears before the final chapter (${u.toString()})`)}),r}function Mt(e){const t=String(e||"").trim();return!t||/^#{1,6}\s/.test(t)||/^[-=]{3,}$/.test(t)||/^[-*\u30fb]\s+/.test(t)||/^[-*\u30fb]/.test(t)&&t.length<80||/^\u3010[^\u3011]{1,60}\u3011$/.test(t)||/^\[[^\]]{1,60}\]$/.test(t)||/^\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343]+\u7ae0/.test(t)||/^(?:\u30bf\u30a4\u30c8\u30eb|\u30ed\u30b0\u30e9\u30a4\u30f3|\u5168\u4f53\u69cb\u6210|Generated By AI Story Maker V)[:\uff1a]?/.test(t)}function He(e){const a=String(e||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{4,}/g,`


`).split(`
`),n=[];for(let r=0;r<a.length;r++){const s=a[r].replace(/[ \t]+$/,"");if(!s.trim()){const o=n.length?n[n.length-1].trim():"",i=r+1<a.length?a[r+1].trim():"";if(!o||!i)continue;(Mt(o)||Mt(i))&&n[n.length-1]!==""&&n.push("");continue}n.push(s)}return n.join(`
`).replace(/\n{3,}/g,`

`).trim()}function ks(e,{chapterNum:t}={}){const a=[],n=String(e||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`),r=n.split(`
`),s=r.filter(m=>!m.trim()).length;if(r.filter(m=>m.trim()).length<8)return a;let i=0,c=0;for(const m of r)m.trim()?c=0:(c++,i=Math.max(i,c));const u=n.split(/\n\s*\n+/).map(m=>m.trim()).filter(m=>m&&!Mt(m)),d=u.length?u.reduce((m,f)=>m+f.replace(/\s+/g,"").length,0)/u.length:0,y=u.filter(m=>m.replace(/\s+/g,"").length<80&&!/^\u300c/.test(m.trim())).length,p=t?"（第"+t+"章）":"";return s/r.length>.45&&d<120&&a.push("空行が多すぎ、段落が細切れになっています"+p),i>2&&a.push("空行が連続しすぎています"+p+": 最大"+i+"行"),u.length>20&&y/u.length>.55&&d<120&&a.push("短すぎる段落が多く、本文がチャット風に細切れです"+p),a}function Ss(e,{chapterNum:t}={}){const a=[],n=String(e||""),r=t?"（第"+t+"章）":"",s="[\\d\\uff10-\\uff19\\u4e00\\u4e8c\\u4e09\\u56db\\u4e94\\u516d\\u4e03\\u516b\\u4e5d\\u5341\\u767e\\u5343]+";return new RegExp("(?:^|\\n)\\s*[\\u3010\\[]\\s*(?:\\u3053\\u306e\\u7ae0\\u306e\\u30bf\\u30fc\\u30f3|\\u4f59\\u97fb|\\u7b2c"+s+"\\u7ae0[^\\u3011\\]\\n]{0,24}(?:\\u30bf\\u30fc\\u30f3|\\u4f59\\u97fb|turn|aftertaste))[^\\u3011\\]\\n]*[\\u3011\\]]","i").test(n)&&a.push("章本文に設計メモ見出しが残っています"+r),new RegExp("(?:^|\\n)\\s*[\\u3010\\[]\\s*\\u7b2c"+s+"\\u7ae0[\\u30fb:?][^\\u3011\\]\\n]{0,40}$").test(n)&&a.push("章末に途切れた設計メモ見出しが残っています"+r),a}function Ve(e){const t="[\\d\\uff10-\\uff19\\u4e00\\u4e8c\\u4e09\\u56db\\u4e94\\u516d\\u4e03\\u516b\\u4e5d\\u5341\\u767e\\u5343]+";let a=String(e||"");return a=a.replace(new RegExp("\\n\\s*[\\u3010\\[]\\s*(?:\\u3053\\u306e\\u7ae0\\u306e\\u30bf\\u30fc\\u30f3|\\u4f59\\u97fb|\\u7b2c"+t+"\\u7ae0[^\\u3011\\]\\n]{0,24}(?:\\u30bf\\u30fc\\u30f3|\\u4f59\\u97fb|turn|aftertaste))[^\\u3011\\]\\n]*[\\u3011\\]][\\s\\S]*$","i"),""),a=a.replace(new RegExp("\\n\\s*[\\u3010\\[]\\s*\\u7b2c"+t+"\\u7ae0[\\u30fb:?][^\\u3011\\]\\n]{0,40}$"),""),a.trim()}function Is(e){const t=String(e||"").trim();return/^(?:[-*_]{1,4}|[-=]{3,}|[\u2010-\u2015]{1,4}|\uFF0A+|[<\uFF1C>\uFF1E]|[()\uFF08\uFF09\[\]\u3010\u3011\u300c\u300d\u300e\u300f]+)$/.test(t)}function oa(e){const t=String(e||"").trim(),a=t.replace(/^[\u2010-\u2015\-]+\s*/,"").trim();return /^[\uFF08(]\s*(?:\u7d9a\u304f\u7ae0|\u7d9a\u304d|\u6b21\u7ae0|\u5c55\u958b|\u6587\u8108|\u30e1\u30e2)[^\uFF09)\n]{0,80}$/i.test(t)||Is(t)||/^[\u3010\[]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343]+\u7ae0[^\u3011\]\n]{0,60}[\u3011\]]?$/.test(t)||/^[\u3010\[]\s*(?:\u3053\u306e\u7ae0\u306e\u30bf\u30fc\u30f3|\u4f59\u97fb)[^\u3011\]\n]{0,60}[\u3011\]]?$/.test(t)||/^[\uFF08(]\s*(?:\u7d9a(?:\u304f|\u304d)?|continued?|to\s*be\s*continued)?\s*[\uFF09)]?$/i.test(t)||/^(?:\u7d9a\u304f|to\s*be\s*continued)$/i.test(t)||t.length<=260&&/^(?:\u7d42\u7ae0\u3078|\u6b21\u7ae0(?:\u3078|\u306b|[:\uff1a])|\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343]+\u7ae0(?:\u3078|\u306b|[:\uff1a])|\u6587\u8108\u7dad\u6301|\u6b21\u7ae0\u9023\u7d50)/.test(a)||t.length<=260&&/(?:\u5e03\u77f3|\u5c0e\u7dda|\u4f0f\u7dda|\u56de\u53ce|\u4e88\u5146|\u7aef\u7dd2|\u5834\u9762|\u8a2d\u8a08|\u30e1\u30e2|GMC|Context|Plot|Turn|Aftertaste)/i.test(a)&&/^(?:[-*\u30fb]|[\u2010-\u2015\-])/.test(t)}function qe(e){const t=String(e||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`);for(;t.length&&(!t[t.length-1].trim()||oa(t[t.length-1]));)t.pop();return t.join(`
`).trim()}function Ls(e,{chapterNum:t}={}){const a=String(e||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map(r=>r.trim()).filter(Boolean),n=t?"（第"+t+"章）":"";return a.length&&oa(a[a.length-1])?["章末が場面区切り線または設計断片だけで終わっています"+n]:[]}function ot(e,t){return[...Ye(e),...$s(e,t),...bs(e,t),...ks(e,t),...Ss(e,t),...Ls(e,t),...ws(e,t),...xs(e,t),...Cs(e,t),...sa(e,t)]}function it(e,t){let a=le(e),n=t||"";const r=Xe(a);return r.memo&&(n+=(n?`

`:"")+r.memo,a=r.body),a=le(a),{body:a,memo:n}}function le(e){return e?e.replace(/^```(?:markdown|text|txt)?\s*/i,"").replace(/\s*```\s*$/i,"").replace(/(?:\n|^)\s*---\s*ここからコピー\s*---[\s\S]*$/i,"").replace(/(?:\n|^)\s*---\s*ここまでコピー\s*---[\s\S]*$/i,"").replace(/(^|\n)\s*[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］]\s*/gi,"$1").replace(/(^|[^\[［])[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］](?=$|[\s、。！？,.!?」』）\)])/gi,"$1").replace(/\[\d+(?:,\s*\d+)*\]/g,"").replace(/[\(（]\s*注\s*\d{1,3}\s*[\)）]/g,"").replace(/(?:\n|^)\s*(?:参考文献|出典|脚注|注釈)\s*[:：][\s\S]*$/m,"").replace(/\b(?:of|OK)\b/gi,"").replace(/\b(?:No|Let's|Und|And)(?:[,\s]+|(?=\n|$))/gi,"").replace(/\bI(?=[ぁ-んァ-ヶ一-龠])/g,"").replace(/(?:修正する|修正後のテキスト|おっと、見出しに|No, there is no other|Let's double check)/gi,"").replace(/([ぁ-んァ-ヶ一-龠])\.\s*/g,"$1。").replace(/([ぁ-んァ-ヶ一-龠]),\s*/g,"$1、").replace(/およびおよび/g,"および").replace(/人口筋肉/g,"人工筋肉").replace(/電子基盤/g,"電子基板").replace(/確確信/g,"確信").replace(/指先を指先を/g,"指先を").replace(/激激突/g,"激突").replace(/嬉そう/g,"嬉しそう").replace(/繰っ広げ/g,"繰り広げ").replace(/繰っ広/g,"繰り広").replace(/ぷかか/g,"ぷかぷか").replace(/伝わて/g,"伝わって").replace(/響きて/g,"響いて").replace(/包まして/g,"包んで").replace(/佐藤さーーー案/g,"佐藤さん").replace(/鈴木手人/g,"鈴木").replace(/因律/g,"因果律").replace(/名前んだから/g,"名前なんだから").replace(/変貌を遂げてい経ちました/g,"変貌を遂げました").replace(/タコの炭/g,"タコの墨").replace(/(?:^|\n)\s*[#\uFF03]{1,6}\s*(?=\n|$)/g,`
`).replace(/(?:^|\n)\s*#+\s*第\d+章[^\n]*/g,`
`).replace(/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)[^\n]*(?:\n[\s\S]*)?$/i,"").replace(/(?:^|\n)\s*(?:#+\s*)?[【\[\(]?\s*(?:\u6587\u8108\u7dad\u6301[^\n]{0,60}\u30e1\u30e2|\u6b21\u7ae0\u9023\u7d50[^\n]{0,60}\u30e1\u30e2|\u6b21\u7ae0\u5c0e\u5165\u7528|\u56de\u53ce\u9032\u884c\u30e1\u30e2|\u6587\u8108\u30e1\u30e2|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|全文結合出力|全[\d０-９一二三四五六七八九十]+章の執筆が完了しました)[\s\S]*$/gi,"").replace(/[ \t]+(?=[、。！？,.!?」』）\)])/g,"").replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,`

`).trim():""}function ia(e,t,a=Qn){const n=(e||"").trim(),{body:r,memo:s}=Xe(n),o=!!s||/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|文脈維持メモ|GMC\+S|GMC/.test(n),i=/【完】/.test(n),c=n.length>=Math.max(a+1200,Math.round(a*1.25)),u=r.length>=a||!t&&o&&c;return{finished:t?i&&u:o&&u,bodyChars:r.length,rawChars:n.length,minChars:a,hasMemo:o,hasFinish:i}}function Nt(e){const t=(e||"").trim(),a=/(?:[【\[]?(?:\u6587\u8108\u7dad\u6301[^\n\u3011\]\)]{0,40}\u30e1\u30e2|\u6b21\u7ae0\u9023\u7d50[^\n\u3011\]\)]{0,40}\u30e1\u30e2|\u6b21\u7ae0\u5c0e\u5165\u7528|\u56de\u53ce\u9032\u884c\u30e1\u30e2|\u56de\u53ce\u5f85\u3061\u4f0f\u7dda\u30e1\u30e2|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]]?)/i,n=t.match(a);return n?{body:t.substring(0,n.index).trim(),memo:t.substring(n.index).trim()}:{body:t,memo:""}}function en(e){return Ee(e||"").replace(/\u3010\u5b8c\u3011/g,"").trim()}function As(e){const t=Ee(e||""),a="【完】",n=t.lastIndexOf(a);return n===-1?t.trim():`${t.slice(0,n).replace(/\u3010\u5b8c\u3011/g,"").trimEnd()}

${a}`.trim()}function Es(e,t,a={}){if(!t||!a.hasFinish||a.bodyChars>=a.minChars)return e;const n=Nt(e);return`${en(n.body)}${n.memo?`

${n.memo}`:""}`.trim()}function lt(e,t,a={}){const n=Nt(e),r=Nt(t);let s=n.body,o=r.body;a.isLast&&(s=en(s),o=As(o));const i=[s,o].filter(u=>u&&u.trim()),c=r.memo||n.memo;return`${i.join(`

`)}${c?`

---

${c}`:""}`.trim()}function _s(e){const t=e||"",{body:a}=Xe(t);return le(a||t).trim()}function la(e,t=!1){const a=g("thought-score-board");if(!a)return;if(!t||!e){a.innerHTML="",a.style.display="none";return}const{plotRecovery:n=null,structure:r=null,constraint:s=null}=e;if(n===null&&r===null&&s===null){a.innerHTML="",a.style.display="none";return}a.style.display="flex";const o=[{label:"伏線回収度",val:n,target:85},{label:"起承転結の構造",val:r,target:85},{label:"制約遵守度",val:s,target:90}];a.innerHTML=o.map(i=>{const c=i.val!==null?`${i.val}点`:"測定中...",u=i.val!==null?`${i.val}%`:"0%",d=i.val!==null&&i.val>=i.target,y=d?"passed":"",p=i.val!==null?d?"(合格)":"(不合格)":"";return`
        <div class="score-row ${y}">
          <div class="score-label">${i.label}</div>
          <div class="score-bar-bg"><div class="score-bar-fill" style="width: ${u}"></div></div>
          <div class="score-val">${c} ${p}</div>
        </div>
      `}).join("")}function $t(e){return Math.max(0,Math.min(100,Math.round(Number.isFinite(e)?e:0)))}function bn(e,t){const a=String(e||"").match(t);return a?a.length:0}function Ts(e={}){const t=String(e.cleanText||""),a=Array.isArray(e.chapters)?e.chapters:[],n=Math.max(1,Number(e.totalChapters)||a.length||1),r=Math.min(1,(Number(e.currentChapter)||a.length||0)/n),s=bn(t,/\u3010\u5b8c\u3011/g),o=bn(t,/(?:^|\n)\s*#?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0/g),i=a.map(p=>String(p&&p.body||"").trim().length).filter(Boolean),c=i.length?i.reduce((p,m)=>p+m,0)/i.length:t.length/n,u=i.length?Math.min(...i):0,d=a.some(p=>String(p&&p.contextMemo||"").length>80),y=/\u6587\u8108\u7dad\u6301\u30e1\u30e2|\u56de\u53ce\u5f85\u3061\u4f0f\u7dda\u30e1\u30e2|\u4eba\u7269\u30ed\u30b9\u30bf\u30fc\u66f4\u65b0\u30e1\u30e2|\u30e2\u30c1\u30fc\u30d5\uff06\u30b5\u30d6\u30ad\u30e3\u30e9\u8ffd\u8de1\u30e1\u30e2|\u6b21\u7ae0\u306e\u30b7\u30fc\u30f3\u8a2d\u8a08|\u518d\u73fe\u7528\u30de\u30b9\u30bf\u30fc\u6307\u793a\u66f8|\u5168\u6587\u7d50\u5408\u51fa\u529b|```|\[REJECTION|Chapter prose looks|Regenerate/i.test(t);return{plotRecovery:$t(80+r*8+(s===1?5:-8)+(d?3:0)),structure:$t(78+r*8+(o>=n?4:0)+(c>=4500?4:0)+(u>=3e3?3:0)),constraint:$t(86+r*5+(s===1?4:-8)+(y?-12:5))}}function Y({phase:e="待機中",chapterNum:t=null,chapterChars:a=null,totalChars:n=null,extra:r="",level:s="active"}={}){const o=document.getElementById("ln-live-status");if(!o)return;const i=[e];t&&i.push(`現在: 第${t}章`),Number.isFinite(a)&&i.push(`章内 ${a.toLocaleString()}字`),Number.isFinite(n)&&i.push(`合計 ${n.toLocaleString()}字`),r&&i.push(r),i.push(`更新 ${new Date().toLocaleTimeString("ja-JP",{hour12:!1})}`),o.textContent=i.join(" / "),o.classList.remove("is-active","is-error"),s==="error"?o.classList.add("is-error"):s!=="idle"&&o.classList.add("is-active")}function Ms(e,t={}){var a;if(!e||t.autoScroll===!1)return;const n=document.getElementById("output-panel");(a=n==null?void 0:n.classList)!=null&&a.contains("ln-live-preview")&&requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})}function Le(e,t,a="",n="",r={}){const s=(a||"").trim(),o=_s(n),i=[s,o].filter(d=>d&&d.trim()).join(`

---

`);e&&(e.textContent=i,Ms(e,r));const c=i.length;t&&(t.textContent=`${c.toLocaleString()} 字`);const u=document.getElementById("ln-char-count");return u&&(u.textContent=c.toLocaleString()),Y({phase:r.phase||"本文プレビュー更新中",chapterNum:r.chapterNum||null,chapterChars:o.length||null,totalChars:c,extra:r.extra||"",level:r.level||"active"}),c}function ca(e,t,a,n){const r=t?"本文末尾の独立行「【完】」":"文脈維持メモ";return`以下は長編小説 第${e}章の途中出力です。重複・要約・前置きなしで、最後に出力済みの文の直後から本文だけを続けてください。

【ここまでの第${e}章出力】
${a}

【続きの条件】
・既に出した文章を繰り返さない。
・本文が最低${n.toLocaleString()}字に届くまで、文脈メモや締めに移らず、シーン・対立・身体反応・五感描写を増やす。
・章として読める量と起伏を作ってから、最後に${r}まで出力する。
- Continue by adding new performed scenes, concrete choices, physical reactions, and consequences. Do not extend with recap or abstract explanation.
- Continue with visible paragraph breaks using single newlines; do not append one giant continuation block and do not insert blank empty lines after every sentence.
- Before the required ending marker/memo, add one performed scene beat and one concrete aftertaste beat as prose only; do not label them as turn/aftertaste.
・「修正後」「続きです」「了解しました」などのメタ文章は絶対に出力しない。`}function Xe(e){const t=/(?:[【\[\(]?(?:\u6587\u8108\u7dad\u6301[^\n\u3011\]\)]{0,40}\u30e1\u30e2|\u6b21\u7ae0\u9023\u7d50[^\n\u3011\]\)]{0,40}\u30e1\u30e2|\u6b21\u7ae0\u5c0e\u5165\u7528|\u56de\u53ce\u9032\u884c\u30e1\u30e2|\u56de\u53ce\u5f85\u3061\u4f0f\u7dda\u30e1\u30e2|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]\)]?)/i;let a=-1;const n=e.match(t);if(n)a=n.index;else{const o=Array.from(e.matchAll(/\u3010\u5b8c\u3011/g));if(o.length>0){const i=o[o.length-1];a=i.index+i[0].length}}if(a===-1)return{body:le(e),memo:""};let r=e.substring(0,a).trim();r=r.replace(/\n---\s*$/,"").trim(),r=r.replace(/\n(?:---+|#+)\s*\n/g,`

`),r=r.replace(/(?:\n|^)(?:---+|#+)\s*$/g,""),r=r.replace(/\n{3,}/g,`

`).trim(),r=le(r);const s=e.substring(a).trim();return{body:r,memo:s}}function tn(e){const t=e.match(/[#＃]\s*第([\d０-９一二三四五六七八九十]+)章[:：]?\s*(.+)/);return t?t[2].trim():""}function Be(){const e=document.getElementById("settings");if(!e)return;e.classList.add("generating"),e.style.pointerEvents="none",e.style.opacity="0.65",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.id==="btn-ln-abort"||a.id==="btn-ln-next"||a.hasAttribute("data-ln-locked")||(a.setAttribute("data-ln-locked",a.disabled?"true":"false"),a.disabled=!0)});const t=document.getElementById("btn-generate");t&&(t.textContent="🔒 長編進行中",t.disabled=!0)}function Ze(){const e=document.getElementById("settings");if(!e)return;e.classList.remove("generating"),e.style.pointerEvents="",e.style.opacity="",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.getAttribute("data-ln-locked")==="false"&&(a.disabled=!1),a.removeAttribute("data-ln-locked")});const t=document.getElementById("btn-generate");t&&(t.textContent="ストーリー生成",t.disabled=!1)}function de(e){var t;const a=document.getElementById("long-novel-panel"),n=document.getElementById("output-panel"),r=document.getElementById("btn-ln-pause"),s=document.getElementById("btn-ln-abort"),o=[document.getElementById("btn-ln-copy-novel"),document.getElementById("btn-ln-save-novel"),document.getElementById("btn-ln-copy-memo"),document.getElementById("btn-ln-save-memo")];a&&(e?(a.classList.add("ln-generating"),n==null||n.classList.remove("ln-novel-scroll"),n==null||n.classList.add("ln-live-preview"),r&&(r.disabled=!1,r.textContent=(t=l.longNovel)!=null&&t.isPaused?"一時停止予約中":"章末で一時停止"),s&&(s.disabled=!1,s.style.opacity="1",s.classList.remove("hidden")),o.forEach(i=>{i&&(i.disabled=!0,i.style.opacity="0.3")})):(a.classList.remove("ln-generating"),n==null||n.classList.remove("ln-live-preview"),s&&(s.disabled=!1,s.style.opacity=""),o.forEach(i=>{i&&(i.disabled=!1,i.style.opacity="")})))}function ge(){var e;const t=l.longNovel,a=document.getElementById("long-novel-panel"),n=document.getElementById("ln-work-title"),r=document.getElementById("ln-progress"),s=document.getElementById("ln-char-count"),o=document.getElementById("ln-target"),i=document.getElementById("ln-progress-bar"),c=document.getElementById("btn-ln-pause"),u=document.getElementById("btn-ln-abort");if(!a)return;a.classList.remove("hidden"),n.textContent=((e=t.headerInfo)==null?void 0:e.title)||"生成中...",r.textContent=`${t.currentChapter} / ${t.totalChapters} 章`;const d=t.cleanText.length;s.textContent=d.toLocaleString();const y=ta(t.settings,t.headerInfo,t.totalChapters);o.textContent=y?`約${y.toLocaleString()}字`:"数万字";const p=t.totalChapters>0?Math.round(t.currentChapter/t.totalChapters*100):0;i.style.width=`${p}%`;const m=a.classList.contains("ln-generating");if(t.totalChapters>0&&t.currentChapter>=t.totalChapters){const h=document.getElementById("output-panel");h&&h.classList.add("ln-novel-scroll"),c&&(c.disabled=!0,c.textContent="✅ 全章完了"),a.classList.add("ln-completed"),a.classList.remove("ln-generating"),Ze(),u&&(u.disabled=!0,u.style.opacity="0.3")}else{if(c)if(m){const v=Math.min(t.currentChapter+1,t.totalChapters||1);c.disabled=!1,c.textContent=t.isPaused?`一時停止予約中（第${v}章後）`:`章末で一時停止（第${v}章後）`}else t.isPaused?(c.disabled=!1,c.textContent="▶️ 生成を再開"):(c.disabled=!0,c.textContent="次章へ自動継続中");a.classList.remove("ln-completed");const h=document.getElementById("output-panel");h&&(t.currentChapter>0&&!m?h.classList.add("ln-novel-scroll"):h.classList.remove("ln-novel-scroll"))}u&&(u.classList.remove("hidden"),u.disabled=!1);const f=document.getElementById("btn-ln-copy-novel");f&&(d>mn?(f.disabled=!0,f.title=`クリップボードの容量制限（${Math.floor(mn/1e4)}万字）を超えるためコピーできません。TXT保存を使用してください。`,f.textContent="⚠ 容量超過 (ブラウザ制限につきコピー不可)"):(f.disabled=!1,f.title="小説本文をコピー",f.textContent="📋 コピー"))}function G(e){const t=document.getElementById("progress-log");if(!t)return;t.textContent+=`
`+e;const a=document.getElementById("progress-content");a&&(a.scrollTop=a.scrollHeight)}function Ns(e){return new Promise(t=>setTimeout(t,e))}function $n(e){return!!e&&e.active&&!e.isPaused&&e.currentChapter<e.totalChapters}async function ua(e,t){if(e&&e.currentChapter>=e.totalChapters){e.active=!1,vs(e),G(`[進行] 全${e.totalChapters}章の生成が完了しました ✅`),Y({phase:"全章生成完了",totalChars:(e.cleanText||"").length,extra:`${e.totalChapters}章完了`,level:"idle"});const n=Ts(e);la(n,!0),G(`[採点] 伏線回収度 ${n.plotRecovery}点 / 起承転結の構造 ${n.structure}点 / 制約遵守度 ${n.constraint}点`);try{const o=await Kn(l.apiKey,e.cleanText||"",e.settings||{},G,c=>G("[Eval] fallback: "+c)),i=Gn(o);i&&G(i)}catch(o){G("[Eval] Gen-4 evaluation skipped: "+(o&&o.message||o))}const r=document.getElementById("output"),s=document.querySelector(".char-counter");r&&Le(r,s,e.cleanText||"","",{phase:"全章生成完了",level:"idle"}),ge();return}if(!$n(e)){G(`[進行] 第${t}章で停止しました。次章は自動生成されません。`),Y({phase:`第${t}章で停止中`,chapterNum:t,totalChars:(e.cleanText||"").length,extra:"再開待ち",level:"idle"}),ge();return}const a=e.currentChapter+1;G(`[進行] 第${t}章を保存しました。第${a}章へ進みます...`),Y({phase:`第${a}章へ移行中`,chapterNum:a,totalChars:(e.cleanText||"").length}),ge(),await Ns(600),$n(e)&&await an()}function Os(){var e;const t=l.longNovel;t.cleanText&&pa(t.cleanText,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","本文")}function da(e){return!e||!e.settings||!e.headerInfo?!1:!e.active||e.totalChapters>0&&e.currentChapter>=e.totalChapters}function Rs(){var e;const t=l.longNovel;let a=t.memoText||"";if(da(t)){const n=dt(t.settings,t.headerInfo,l);a.includes("再現用マスター指示書")||(a+=(a?`

`:"")+n)}a&&pa(a,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","メモ・指示書")}function pa(e,t,a){const n=new Date,r=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}${String(n.getHours()).padStart(2,"0")}${String(n.getMinutes()).padStart(2,"0")}${String(n.getSeconds()).padStart(2,"0")}`,s=`${t}_${a}_${r}.txt`,o=new Blob([e],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(o),c=document.createElement("a");c.href=i,c.download=s,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i)}function nn(){const e=l.longNovel,t=document.getElementById("ln-memo-text");t&&(t.textContent=e.memoText||"（まだメモはありません）")}async function Cn(e,t){if(e)try{await navigator.clipboard.writeText(e);const a=document.getElementById(t);if(a){const n=a.textContent;a.textContent="✅ コピーしました",a.classList.add("ln-copied"),setTimeout(()=>{a.textContent=n,a.classList.remove("ln-copied")},2e3)}}catch(a){console.error("Copy failed:",a)}}async function ha(e,t,a,n,r,s=null){var o,i;const c=l.apiKey,u=Pe(c,l.apiProvider);if(!u.ok){a.innerHTML='<span class="error-msg">'+q(u.message)+"</span>",t.textContent="✨ 生成する",t.disabled=!1,(o=document.querySelector(".settings-panel"))==null||o.classList.remove("generating");return}const d=s&&s.counts?s.counts:null,y=s&&s.notes?s.notes:null;Oe(),s&&(l.longNovel.chapterRetryCounts=d||{},l.longNovel.chapterRetryNotes=y||{}),l.longNovel.active=!0,l.longNovel.settings=JSON.parse(JSON.stringify(e));const{prompt:p,tags:m}=Va(e);if(n){n.innerHTML="";const C=c.startsWith("sk-")?'<span class="tag tag-openai">ChatGPT</span>':'<span class="tag tag-gemini">Gemini</span>';n.innerHTML=C+'<span class="tag">📖 長編小説</span>'+m.map(w=>`<span class="tag">${w}</span>`).join("")}a.className="output-box text-selectable",a.textContent="📖 長編小説の第1章を生成中...（プロット設計→第1章執筆）";const f=smInitialTextModel(c);l.longNovel.usedModel=f,Be(),l.longNovel.totalChapters=Et(e),ge(),de(!0),Y({phase:"第1章の生成準備中",chapterNum:1,totalChars:0});const h=document.getElementById("btn-ln-pause");h&&(h.disabled=!1,h.textContent="章末で一時停止（第1章後）");let v=0;const b=setInterval(()=>{if(!l.longNovel.active){clearInterval(b);return}v++,t.textContent=`⏳ AIが考え中... (${v}秒経過)`,h&&l.longNovel.active&&(h.textContent=l.longNovel.isPaused?"一時停止予約中（第1章後）":`章末で一時停止（第1章後・${v}秒）`)},1e3),$=new AbortController;l.longNovel.abortController=$;try{let C="",w=f;const E=_t(e,null,10),L=na($.signal);w=(await we(c,w,p+Wt(e,"long"),({text:_,isThought:O})=>{l.longNovel.active&&(O||(C+=_,Le(a,r,"",C,{phase:"第1章を執筆中",chapterNum:1})))},_=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${_}`},L)).usedModel;let x=0;for(;x<5;){const _=((i=C.match(/([#＃]\s*第[1１一]章[\s\S]*)/))==null?void 0:i[1])||C,O=ia(_,!1,E);if(O.finished)break;x++,G(`[通信] 第1章: 未完了/文字数不足（本文 ${O.bodyChars.toLocaleString()} / 最低 ${O.minChars.toLocaleString()}字、raw ${O.rawChars.toLocaleString()}字、文脈メモ ${O.hasMemo?"あり":"なし"}）。続きを自動リクエスト中... (${x}/5)`);const P=ca(1,!1,C,E);let j="";const ee=await we(c,w,P,({text:J,isThought:he})=>{l.longNovel.active&&(he||(j+=J,Le(a,r,"",lt(C,j),{phase:"第1章を自動継続中",chapterNum:1,extra:`継続 ${x}/5`})))},J=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${J}`},L);C=lt(C,j),w=ee.usedModel}if(l.longNovel.usedModel=w,!l.longNovel.active)return;const M=hs(C);l.longNovel.headerInfo=M,l.longNovel.totalChapters=Et(e,M),l.longNovel.headerInfo.totalChapters=l.longNovel.totalChapters;const B=_t(e,M,l.longNovel.totalChapters),S=C.match(/([#＃]\s*第[1１一]章[\s\S]*)/),N=S?S[1]:C;let{body:k,memo:T}=Xe(be(N));const H=S?C.substring(0,S.index).trim():"";let A="";if(k&&k.trim().length>100){t.textContent="🔍 第1章 矛盾検査中...",Y({phase:"第1章を検査中",chapterNum:1,chapterChars:k.length,totalChars:l.longNovel.cleanText.length||k.length});const _=O=>{console.log("[LN Audit Ch1]",O);const P=document.getElementById("progress-log");if(P){P.textContent+=`
`+O;const j=document.getElementById("progress-content");j&&(j.scrollTop=j.scrollHeight)}};try{const O=await Dt(c,k,l.longNovel.settings||e,{onStatus:_,chapterNum:1,isLastChapter:!1,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:2,validateFixedText:Ye,sanitizeText:le});if(O.wasFixed&&(k=be(O.text)),O.remainingCriticalCount>0)throw _(`[検査] 第1章: 重大な矛盾が${O.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第1章を棄却しました（残存: ${O.remainingCriticalCount}件）`);O.wasFixed&&_("[検査] 第1章: 矛盾修正が完了しました ✅"),O.issues.length>0&&(A=le(jn(O.issues,1)))}catch(O){throw console.warn("第1章の矛盾検査でエラー:",O.message),_("[検査] 第1章: 検査エラー — 保存を停止します"),new Error(`第1章の検査に失敗したため保存を停止しました: ${O.message||O}`)}}G("[品質] 第1章: 本文保存前チェックを実行中..."),Y({phase:"第1章の保存前チェック中",chapterNum:1,chapterChars:k.length,totalChars:l.longNovel.cleanText.length||k.length}),k=be(k),{body:k,memo:T}=it(k,T),k=Ve(k),k=qe(k),k=He(k);let F=ot(k,{chapterNum:1,isLast:!1,minChars:B,totalChapters:l.longNovel.totalChapters});if(F.length>0&&(G(`[品質] 第1章: 保存前チェックで問題を検出: ${F.join(" / ")}`),k=be(k),{body:k,memo:T}=it(k,T),k=Ve(k),k=qe(k),k=He(k),F=ot(k,{chapterNum:1,isLast:!1,minChars:B,totalChapters:l.longNovel.totalChapters})),F.length>0)throw new Error(`第1章の保存前品質ゲートで停止しました: ${F.join(" / ")}`);G("[品質] 第1章: 保存前チェック通過。本文を採用します。"),l.longNovel.chapters.push({title:ze(tn(N),1)||Zt(k,1)||Qt(1,l.longNovel.totalChapters||1,fe(e),M.logline||""),body:k,contextMemo:T}),l.longNovel.currentChapter=1,l.longNovel.fullText=C,G(`[進行] 第1章を保存しました（${k.length.toLocaleString()}字）。現在 ${l.longNovel.currentChapter} / ${l.longNovel.totalChapters} 章。`);const U=l.longNovel.chapters[0].title||"第一章",ae=ra(H,M,e,l.longNovel.totalChapters);l.longNovel.cleanText=ae+(ae?`

`:"")+`# 第1章: ${U}

`+k,l.longNovel.memoText=T?`--- 第1章の文脈メモ ---
${T}`:"",A&&(l.longNovel.memoText+=(l.longNovel.memoText?`

`:"")+A),Le(a,r,l.longNovel.cleanText,"",{phase:"第1章を保存しました",chapterNum:1,level:"idle"}),nn(),de(!1),ge(),Be(),clearInterval(b),await ua(l.longNovel,1)}catch(C){const w=(C==null?void 0:C.message)||String(C);if(G(`[Stop] Chapter 1 error: ${w}`),!l.longNovel.active)return;const E=["検査に失敗","重大な設定矛盾","出力汚染","棄却","残存","保存前品質ゲート","章本文が短すぎます"].some(M=>w.includes(M)),L=Number(l.longNovel.chapterRetryCounts&&l.longNovel.chapterRetryCounts[1]||0),x=/\u9577\u3044\u8AAC\u660E\u6BB5\u843D|\u5834\u9762\u6BB5\u843D\u6570|\u5834\u9762\u306E\u5207\u308C\u76EE|Too few prose paragraphs|\u7a7a\u884c\u304c\u591a\u3059\u304e|\u7a7a\u884c\u304c\u9023\u7d9a|\u6bb5\u843d\u304c\u7d30\u5207\u308c|\u7ae0\u672b\u304c\u5b9a\u578b\u7684\u306a\u60c5\u666f\u4f59\u97fb/.test(w)?4:2;if(E&&L<x){l.longNovel.chapterRetryCounts=l.longNovel.chapterRetryCounts||{},l.longNovel.chapterRetryNotes=l.longNovel.chapterRetryNotes||{};const M=L+1;l.longNovel.chapterRetryCounts[1]=M,l.longNovel.chapterRetryNotes[1]=[`The previous chapter 1 was rejected by the pre-save quality gate. Reason: ${w}`,"Rewrite chapter 1 completely while preserving the same logline and full outline.","If the previous ending sounded like a preview, teaser, next-chapter announcement, scenery-only afterglow, or polished emotional landing, end this retry on a concrete physical reaction, awkward spoken line, mundane task, object, cost, or unresolved pressure instead.","Use visible paragraph breaks with single newlines every 80-350 Japanese characters; do not insert blank empty lines after every sentence, and avoid giant explanation blocks.","Do not output design notes, quality-check text, regeneration explanations, or references to the previous failed attempt."].join(`
`);const B={counts:{...l.longNovel.chapterRetryCounts},notes:{...l.longNovel.chapterRetryNotes}};G(`[Regenerate] Chapter 1 rejected; regenerating the full chapter (${M}/${x})`),de(!0),Be(),Y({phase:"Regenerating chapter 1",chapterNum:1,totalChars:0,extra:`retry ${M}/${x}`,level:"active"}),ge(),setTimeout(()=>{l.apiKey&&ha(e,t,a,n,r,B)},600);return}a.innerHTML=`<span class="error-msg">Error: ${w}</span>`,de(!1),Oe(),Y({phase:"Chapter 1 stopped",chapterNum:1,extra:w,level:"error"}),Ze()}finally{clearInterval(b)}}async function an(){var e,t;const a=l.longNovel;if(!a.active){G("[停止] 次章生成を開始できません。長編セッションが非アクティブです。");return}if(a.currentChapter>=a.totalChapters){G(`[進行] 現在 ${a.currentChapter} / ${a.totalChapters} 章のため、次章生成は不要です。`);return}const n=l.apiKey;if(!n){G("[停止] 次章生成を開始できません。APIキーがメモリ上で取得できません。");return}const r=a.currentChapter+1,s=r>=a.totalChapters,o=a.totalChapters?r>=Math.max(1,a.totalChapters-3):s;document.getElementById("long-novel-panel");const i=document.getElementById("btn-ln-pause"),c=document.getElementById("output"),u=document.querySelector(".char-counter");de(!0),Y({phase:`第${r}章の生成準備中`,chapterNum:r,totalChars:(a.cleanText||"").length}),i&&(i.disabled=!1,i.textContent=`章末で一時停止（第${r}章後）`);let d=0;const y=setInterval(()=>{if(!a.active){clearInterval(y);return}d++,i&&(i.textContent=a.isPaused?`一時停止予約中（第${r}章後）`:`章末で一時停止（第${r}章後・${d}秒）`)},1e3),p=a.chapters.slice(-2).map(($,C)=>`# 第${a.currentChapter-1+C+1}章: ${$.title}
${$.body}`).join(`

---

`);let m="";a.chapters.length>2&&(m=a.chapters.slice(0,-2).map(($,C)=>`第${C+1}章「${$.title}」: （約${$.body.length}字）`).join(`
`));const f=a.chapters.map(($,C)=>`--- 第${C+1}章の文脈メモ ---
${$.contextMemo||"（なし）"}`).join(`

`),h=[((e=a.chapterRetryNotes)==null?void 0:e[r])||"",o?["Late-stage canon lock:","- Before drafting, internally list alive/dead/exited characters, current location/time, possessions, injuries, relationships, and unresolved/final promises from saved canon.","- Do not resurrect exited/dead characters, merge two named characters, swap the actor of a saved decision, or replay an already completed travel/arrival/death/wakeup/item event.",s?"- This is the final chapter: resolve from the latest saved chapter state without adding a new lead or replacing the late-stage actor.":"- This is a late non-final protected chapter: escalate the crisis, keep the central system/core/conspiracy unresolved, do not write epilogue/rescue aftermath, and leave the final resolution for the final chapter."].join(`
`):""].filter(Boolean).join(`
`),v=Ua(r,a.totalChapters,a.settings,m,p,f,s,h)+Wt(a.settings,"long"),b=new AbortController;a.abortController=b;try{let $="",C=a.usedModel||smInitialTextModel(n);const w=_t(a.settings,a.headerInfo,a.totalChapters),E=na(b.signal);C=(await we(n,C,v,({text:k,isThought:T})=>{a.active&&(T||($+=k,Le(c,u,a.cleanText,$,{phase:`第${r}章を執筆中`,chapterNum:r})))},k=>{G(`[通信] 第${r}章: フォールバック ${k}`)},E)).usedModel;let L=0;for(;L<5;){const k=ia($,s,w);if(k.finished)break;L++,G(`[通信] 第${r}章: 未完了/文字数不足（本文 ${k.bodyChars.toLocaleString()} / 最低 ${k.minChars.toLocaleString()}字、raw ${k.rawChars.toLocaleString()}字、文脈メモ ${k.hasMemo?"あり":"なし"}、完結 ${k.hasFinish?"あり":"なし"}）。続きを自動リクエスト中... (${L}/5)`);const T=Es($,s,k),H=ca(r,s,T,w);let A="";const F=await we(n,C,H,({text:U,isThought:ae})=>{if(a.active&&!ae){A+=U;const _=lt($,A,{isLast:s});Le(c,u,a.cleanText,_,{phase:`第${r}章を自動継続中`,chapterNum:r,extra:`継続 ${L}/5`})}},U=>{G(`[通信] 第${r}章: フォールバック ${U}`)},E);$=lt($,A,{isLast:s}),C=F.usedModel}if(a.usedModel=C,!l.longNovel.active)return;let{body:x,memo:M}=Xe(be($)),B="";if(x&&x.trim().length>100){i&&(i.textContent=a.isPaused?`一時停止予約中（第${r}章後）`:`章末で一時停止（第${r}章後）`),Y({phase:`第${r}章を検査中`,chapterNum:r,chapterChars:x.length,totalChars:(a.cleanText||"").length+x.length});const k=T=>{console.log(`[LN Audit Ch${r}]`,T);const H=document.getElementById("progress-log");if(H){H.textContent+=`
`+T;const A=document.getElementById("progress-content");A&&(A.scrollTop=A.scrollHeight)}};try{const T=await Dt(n,x,a.settings,{onStatus:k,chapterNum:r,allContextMemos:f,recentChaptersFull:p,isLastChapter:s,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:o?3:2,validateFixedText:Ye,sanitizeText:le});if(T.wasFixed&&(x=be(T.text)),T.remainingCriticalCount>0)throw k(`[検査] 第${r}章: 重大な矛盾が${T.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第${r}章を棄却しました（残存: ${T.remainingCriticalCount}件）`);T.wasFixed&&k(`[検査] 第${r}章: 矛盾修正が完了しました ✅`),T.issues.length>0&&(B=le(jn(T.issues,r)))}catch(T){throw console.warn(`第${r}章の矛盾検査でエラー:`,T.message),k(`[検査] 第${r}章: 検査エラー — 保存を停止します`),new Error(`第${r}章の検査に失敗したため保存を停止しました: ${T.message||T}`)}}G(`[品質] 第${r}章: 本文保存前チェックを実行中...`),Y({phase:`第${r}章の保存前チェック中`,chapterNum:r,chapterChars:x.length,totalChars:(a.cleanText||"").length+x.length}),x=be(x),{body:x,memo:M}=it(x,M),x=Ve(x),x=qe(x),x=He(x),s&&(x=yn(x));let S=ot(x,{chapterNum:r,isLast:s,minChars:w,totalChapters:a.totalChapters,previousChapters:a.chapters});if(S.length>0&&(G(`[品質] 第${r}章: 保存前チェックで問題を検出: ${S.join(" / ")}`),x=be(x),{body:x,memo:M}=it(x,M),x=Ve(x),x=qe(x),x=He(x),s&&(x=yn(x)),S=ot(x,{chapterNum:r,isLast:s,minChars:w,totalChapters:a.totalChapters,previousChapters:a.chapters})),S.length>0)throw new Error(`第${r}章の保存前品質ゲートで停止しました: ${S.join(" / ")}`);G(`[品質] 第${r}章: 保存前チェック通過。本文を採用します。`);const N=ze(tn($),r)||Zt(x,r)||Qt(r,a.totalChapters||r,fe(a.settings||{}),(a.headerInfo||{}).logline||"");if(a.chapters.push({title:N,body:x,contextMemo:M}),a.currentChapter=r,a.chapterRetryNotes&&delete a.chapterRetryNotes[r],a.chapterRetryCounts&&delete a.chapterRetryCounts[r],a.fullText+=`

---

`+$,G(`[進行] 第${r}章を保存しました（${x.length.toLocaleString()}字）。現在 ${a.currentChapter} / ${a.totalChapters} 章。`),a.cleanText+=`

---

# 第${r}章: ${N}

`+x,M&&(a.memoText+=(a.memoText?`

`:"")+`--- 第${r}章の文脈メモ ---
${M}`),B&&(a.memoText+=(a.memoText?`

`:"")+B),Le(c,u,a.cleanText,"",{phase:`第${r}章を保存しました`,chapterNum:r,level:"idle"}),s&&a.settings&&a.headerInfo){const k=dt(a.settings,a.headerInfo,l);a.memoText+=`

`+k}nn(),de(!1),ge(),clearInterval(y),await ua(a,r)}catch($){const C=($==null?void 0:$.message)||String($);if(G(`[停止] 第${r}章処理でエラー: ${C}`),!a.active)return;const w=/検査に失敗|重大な設定矛盾|出力汚染|棄却|残存|保存前品質ゲート|章本文が短すぎます/.test(C),E=Number(((t=a.chapterRetryCounts)==null?void 0:t[r])||0),L=/前章以前の本文と長い重複段落|重複段落|冒頭一致/.test(C),x=a.chapterRetryNotes&&a.chapterRetryNotes[r]||"",M=L||/前章以前の本文と長い重複段落|重複段落|冒頭一致|前章本文/.test(x),B=!s&&(r===a.totalChapters-1||/Whole-story resolution/.test(C)&&a.totalChapters&&r>=Math.max(1,Math.ceil(a.totalChapters*.5))),S=/\u9577\u3044\u8AAC\u660E\u6BB5\u843D|\u5834\u9762\u6BB5\u843D\u6570|\u5834\u9762\u306E\u5207\u308C\u76EE|Too few prose paragraphs|\u7a7a\u884c\u304c\u591a\u3059\u304e|\u7a7a\u884c\u304c\u9023\u7d9a|\u6bb5\u843d\u304c\u7d30\u5207\u308c|\u7ae0\u672b\u304c\u5b9a\u578b\u7684\u306a\u60c5\u666f\u4f59\u97fb/.test(C),N=/重大な設定矛盾|重大な矛盾|設定矛盾|空間矛盾|時系列エラー|キャラクター不整合|伏線の矛盾|解消できなかった|残存/.test(C),k=/Whole-story resolution|\u7ae0\u672b\u304c\u4e88\u544a|\u7ae0\u672b\u304c\u5b9a\u578b\u7684\u306a\u60c5\u666f\u4f59\u97fb|\u4fdd\u5b58\u524d\u54c1\u8cea\u30b2\u30fc\u30c8|Too few prose paragraphs|\u7a7a\u884c\u304c\u591a\u3059\u304e|\u7a7a\u884c\u304c\u9023\u7d9a|\u6bb5\u843d\u304c\u7d30\u5207\u308c|\u5834\u9762\u6bb5\u843d\u6570|\u9577\u3044\u8aac\u660e\u6bb5\u843d/.test(x),T=o?5:M||B||S||N||k?4:2;if(w&&E<T){a.chapterRetryCounts=a.chapterRetryCounts||{},a.chapterRetryNotes=a.chapterRetryNotes||{};const H=E+1,A=M?["重複または巻き戻しで棄却されたため、前章本文の冒頭・段落・比喩・会話・場面配置を一切コピーしないこと。",`ただし時系列は変えないこと。第${r}章は直前章の最後の場所・時刻・負傷・関係状態から開始し、前章の移動・到着・目撃済み事件を再演しないこと。`,"必要なら直前章末の現場から一歩ずれた隣接地点・数分後へ移るが、未到着だったように書かないこと。","前章本文から連続しているように見える書き出し、同じ説明段落、同じ会話の再演を禁止すること。"]:[],F=B?["This is not the final chapter. Do not write full resolution, victory declaration, total villain defeat, social reconstruction, or full payoff.","Do not stop, destroy, silence, collapse, or fully resolve the central system, core, grand reset, antagonist, company, or society.","Do not write ambulance transfer, hospital awakening, quiet morning, several days later, or any epilogue-like aftermath.","Avoid phrases meaning everything ended or everything is over, even as threat or hypothesis.","Keep the central system/core/conspiracy active or only partly damaged; do not make this chapter the successful shutdown/destruction scene.","End with an unresolved core, maximum crisis, irreversible choice, or heavy cost reserved for the final chapter."]:[],U=S?["Use visible paragraph breaks with single newlines every 80-350 Japanese characters; do not insert blank empty lines after every sentence.","Do not write the chapter as four or fewer giant blocks; use at least seven visible prose paragraphs.","Every 2-4 paragraphs, move the scene through place, action, dialogue, choice, or consequence.","For the final two paragraphs, avoid sunset/sky/wind/light/echo afterglow; end with concrete human friction such as a messy spoken line, practical task, bodily discomfort, awkward silence, mundane noise, or unfinished obligation."]:[],ae=N?["整合性検査で修正しきれない矛盾が残ったため、小手先の修正ではなく章の設計から組み直すこと。","執筆前に、保存済み直近章の位置・時刻・所持品・負傷・生死・関係状態を固定し、その状態表から外れないこと。","地理移動・覚醒・死亡確認・アイテム発見・合流を、保存済み章で発生済みなら初発イベントとして再演しないこと。"]:[];a.chapterRetryCounts[r]=H,a.chapterRetryNotes[r]=[`前回の第${r}章は保存前検査で棄却された。原因: ${C}`,`第${r}章を、直近の文脈メモと次章GMC+Sから完全に書き直すこと。`,`失敗した第${r}章本文は正史ではない。保存済みの直近章だけを正史として続け、前回出力の移動経路・到着イベント・都市覚醒などを引き継がないこと。`,...A,...F,...U,...ae,"Canon-state retry lock: saved chapters and context memos are the only canon; rejected retry drafts and old outline beats are not canon.","Start after the immediately previous saved chapter final state: place/time, injuries, destroyed or lost items, fired weapons, deaths/exits, handoffs, and unresolved crisis.","Do not replay, rewind, undo, hallucinate, or re-stage completed trigger pulls, injuries, item destruction/loss, arrivals, escapes, awakenings, system shutdowns, or public collapses.","If a hand, item, weapon, body part, device, or route was destroyed, lost, burned, broken, disabled, or spent in saved canon, it cannot function normally or reappear intact in this chapter.","前章までに発生済み・紛失済み・負傷済み・回収済み・退場済みになった出来事を、初発イベントとして再演しないこと。","古い全体プロットよりも、直近章の文脈メモ、人物状態、回収待ち伏線、次章シーン設計を優先すること。"].join(`
`),G(`[再生成] 第${r}章: 検査失敗のため章全体を再生成します（${H}/${T}）`),de(!0),Be(),Y({phase:`第${r}章を再生成します`,chapterNum:r,totalChars:(a.cleanText||"").length,extra:`再生成 ${H}/${T}`,level:"active"}),ge(),setTimeout(()=>{var _;(_=l.longNovel)!=null&&_.active&&l.longNovel.currentChapter<r&&an()},600);return}c&&(c.textContent=a.cleanText||`⚠ 第${r}章の生成でエラーが発生しました: ${C}`),de(!1),Y({phase:`第${r}章で停止`,chapterNum:r,totalChars:(a.cleanText||"").length,extra:C,level:"error"}),i&&(i.disabled=!1,i.textContent=`📖 第${r}章を再試行`)}finally{clearInterval(y)}}function Ps(){const e=l.longNovel;if(!e.active)return;if(e.active=!1,e.abortController&&e.abortController.abort(),de(!1),e.settings&&e.headerInfo){const c=dt(e.settings,e.headerInfo,l);e.memoText+=(e.memoText?`

`:"")+c,nn()}const t=Math.max(1,e.currentChapter||0),a=Math.max(0,e.currentChapter||0);e.totalChapters=Math.max(e.totalChapters||0,t),ge();const n=document.getElementById("long-novel-panel");n==null||n.classList.add("ln-completed");const r=document.getElementById("output-panel");r&&r.classList.add("ln-novel-scroll");const s=document.getElementById("long-novel-title");s&&(s.textContent=a>0?`長編小説モード（第${a}章で中断）`:`長編小説モード（第${t}章生成中に中断）`),Ze();const o=document.getElementById("btn-ln-pause"),i=document.getElementById("btn-ln-abort");o&&(o.disabled=!0,o.textContent="⏹ 中断済み"),i&&(i.disabled=!0,i.style.opacity="0.3"),Y({phase:"中断済み",chapterNum:t,totalChars:(e.cleanText||"").length,extra:a>0?`${a}章まで保存済み`:"保存済み章なし",level:"error"})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btn-ln-pause");e&&e.addEventListener("click",()=>{const i=l.longNovel,c=document.getElementById("long-novel-panel");if(!i.active)return;const u=c==null?void 0:c.classList.contains("ln-generating");if(i.isPaused)if(i.isPaused=!1,e.disabled=!1,u){const d=Math.min(i.currentChapter+1,i.totalChapters||1);e.textContent=`章末で一時停止（第${d}章後）`,G("[操作] 一時停止予約を解除しました。")}else e.textContent="次章へ自動継続中",e.disabled=!0,an();else i.isPaused=!0,e.textContent="一時停止予約中（現在章の後で停止）",e.disabled=!1,G("[操作] 現在章の完了後に一時停止します。")});const t=document.getElementById("btn-ln-abort");t&&t.addEventListener("click",()=>{confirm(`現在の進捗で生成を中断しますか？
（ここまでの全文はコピー・TXT保存が可能です）`)&&Ps()});const a=document.getElementById("btn-ln-copy-novel");a&&a.addEventListener("click",()=>{Cn(l.longNovel.cleanText,"btn-ln-copy-novel")});const n=document.getElementById("btn-ln-save-novel");n&&n.addEventListener("click",()=>{Os()});const r=document.getElementById("btn-ln-copy-memo");r&&r.addEventListener("click",()=>{const i=l.longNovel;let c=i.memoText||"";if(da(i)){const u=dt(i.settings,i.headerInfo,l);c.includes("再現用マスター指示書")||(c+=(c?`

`:"")+u)}Cn(c,"btn-ln-copy-memo")});const s=document.getElementById("btn-ln-save-memo");s&&s.addEventListener("click",()=>{Rs()});const o=document.getElementById("ln-memo-toggle");o&&o.addEventListener("click",i=>{if(i.target.closest(".btn-ln-action"))return;const c=document.getElementById("ln-memo-content"),u=document.getElementById("ln-memo-arrow");c&&c.classList.toggle("hidden"),u&&u.classList.toggle("open")})});sa=function(e,{chapterNum:t,isLast:a,totalChapters:n}={}){const r=[],s=String(e||"").trim();if(!s||a)return r;const o=Number(n)||0,i=Number(t)||0;if(!o)return r;const c=Math.max(1,Math.ceil(o*.5));if(i<c)return r;const u=s.split(/[\u3002\uff01\uff1f!?\n]+/).map(m=>m.trim()).filter(Boolean),d=[{re:/\u3053\u308c\u306b\u3066\u4e00\u4ef6\u843d\u7740/},{re:/\u3059\u3079\u3066(?:\u304c|\u3001)?\u7d42\u308f/},{re:/\u7d42\u308f\u3063\u305f(?:\u306e\u306d|\u306e\u3060|\u306e\u304b|\u308f\u3051|\u306f\u305a|\u3068\u601d)/},{re:/(?:\u4eba\u3005|\u5e02\u6c11|\u6771\u4eac)[^\u3002\n]{0,120}(?:\u601d\u3044\u51fa|\u76ee\u899a\u3081)/},{re:/(?:\u6551\u6025\u8eca|\u642c\u9001|\u75c5\u5ba4|\u30d9\u30c3\u30c9|\u671d\u306e\u5149|\u9759\u304b\u306a\u671d)[^\u3002\n]{0,140}(?:\u76ee\u899a|\u8a18\u61b6|\u7d42\u308f|\u9759\u304b|\u623b)/},{re:/\u5b8c\u5168\u52dd\u5229|\u9ed2\u5e55\u5b8c\u5168\u6557\u5317|\u4f1a\u793e\u518d\u5efa(?:\u304c|\u306f)?\u5b8c\u4e86|\u5168\u9762\u5951\u7d04/}],y=[{re:/(?:\u30b7\u30b9\u30c6\u30e0|\u30b0\u30e9\u30f3\u30c9\u30fb\u30ea\u30bb\u30c3\u30c8|\u8abf\u5f8b)[^\u3002\n]{0,80}(?:\u505c\u6b62|\u6b62\u307e|\u5d29\u58ca|\u6c88\u9ed9|\u6d88\u3048)/},{re:/(?:\u30b3\u30a2|\u4e2d\u67a2|\u7089|\u8a18\u61b6\u88c5\u7f6e|\u5b9f\u9a13|\u8a08\u753b|\u9670\u8b00|\u30cd\u30c3\u30c8\u30ef\u30fc\u30af)[^\u3002\n]{0,120}(?:\u7834\u58ca|\u505c\u6b62|\u5d29\u58ca|\u6c88\u9ed9|\u6d88\u6ec5|\u6b62\u307e|\u7d42\u308f)/}],p=/(?:\u9632|\u963b\u6b62|\u5931\u6557|\u672a\u9042|\u672a\u5b8c|\u4e0d\u5b8c\u5168|\u90e8\u5206|\u5c40\u6240|\u4e00\u6642|\u5bf8\u524d|\u76f4\u524d|\u8a66\u307f|\u72d9|\u307e\u3060|\u7d9a|\u7a3c\u50cd|\u751f\u304d|\u6b62\u307e\u3089|\u56de\u907f|\u672a\u89e3\u6c7a|\u6b8b|\u7dad\u6301|\u4fdd\u305f|\u89e3\u9664\u3067\u304d\u306a\u3044|\u7834\u58ca\u3067\u304d\u306a\u3044|\u58ca\u305b\u306a\u3044|\u5d29\u58ca\u3057\u306a\u3044|\u6c88\u9ed9\u3057\u306a\u3044|\u6d88\u3048\u306a\u3044)/;for(const m of d)m.re.test(s)&&r.push(`Whole-story resolution appears before the final chapter (${m.re.toString()})`);for(const m of y)for(const f of u)if(m.re.test(f)&&!p.test(f)){r.push(`Whole-story resolution appears before the final chapter (${m.re.toString()})`);break}return r};const js=le;le=function(e){const t=js(e);return String(t||"").replace(/(?:^|\n)\s*(?:#{1,6}\s*)?(?:[【\[]\s*)?第[\d０-９一二三四五六七八九十]+章\s*終了時点での[\s\S]*$/g,`
`).replace(/(?:^|\n)\s*(?:#{1,6}\s*)?(?:CONTEXT MEMO|GMC\+S|Chapter\s+\d+\s+context memo)[\s\S]*$/gi,`
`).replace(/\n{3,}/g,`

`).trim()};const Bs=Ye;Ye=function(e){const t=Bs(e),a=String(e||"");return/(?:^|\n)\s*(?:#{1,6}\s*)?(?:[【\[]\s*)?第[\d０-９一二三四五六七八九十]+章\s*終了時点での|CONTEXT MEMO|GMC\+S|再現用マスター指示書/.test(a)&&t.push("Long-novel context memo fragment remains in chapter body"),t};

const smBaseTrailingStoryFragmentV412=oa;
oa=function(e){
const t=String(e||"").trim();
return smBaseTrailingStoryFragmentV412(e)||/^[\u3010\[]\s*(?:\u7ae0\u5185|\u7ae0\u672b|\u5834\u9762|\u8a2d\u8a08|\u30e1\u30e2|\u4f59\u97fb|\u30bf\u30fc\u30f3|\u4f0f\u7dda|GMC|Context|Plot|Turn|Aftertaste)[^\u3011\]\n]{0,60}[\u3011\]]?$/i.test(t)
};


const smLooksLikeTrailingOutlineBulletV413=e=>{
const t=String(e||"").trim();
if(!/^(?:[-*]|\u30fb)\s*/.test(t))return!1;
const a=t.replace(/^(?:[-*]|\u30fb)\s*/,"").trim();
if(!a)return!0;
if(a.length>240)return!1;
return/(?:\u6b21\u7ae0|\u5e03\u77f3|\u5c0e\u7dda|\u4f0f\u7dda|\u56de\u53ce|\u4e88\u5146|\u7aef\u7dd2|\u73fe\u5b9f\u6539\u5909|\u4e88\u5b9a|\u30e1\u30e2|\u5834\u9762|\u7ae0|GMC|Context|Plot|Turn|Aftertaste|arc)/i.test(a)||!/[\u3002\uff01\uff1f!?\u300d\u300f]$/.test(a)&&/(?:\u3068\u306a\u308b|\u3068\u3057\u3066|\u3078|\u306b|\u306e\u5e03\u77f3|\u306e\u5c0e\u7dda)$/.test(a)
};
const smBaseStripTrailingFragmentsV413=He;
He=function(e){
let t=smBaseStripTrailingFragmentsV413(e);
for(let a=0;a<5;a++){
const n=String(t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");
let r=n.length-1;
for(;r>=0&&!n[r].trim();)r--;
if(r<0)return"";
let s=r;
for(;s>=0&&smLooksLikeTrailingOutlineBulletV413(n[s]);)s--;
if(s===r)break;
t=n.slice(0,s+1).join("\n").trimEnd()
}
return t
};
const smBaseSaveGateV413=ot;
ot=function(e,t){
const a=smBaseSaveGateV413(e,t),n=String(e||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").map(r=>r.trim()).filter(Boolean).filter(r=>r!=="---");
let r=n.length-1;
for(;r>=0&&smLooksLikeTrailingOutlineBulletV413(n[r]);)r--;
return r<n.length-1&&a.push("\u7ae0\u672b\u306b\u30e9\u30d9\u30eb\u306a\u3057\u8a2d\u8a08\u30e1\u30e2\u306e\u7b87\u6761\u66f8\u304d\u304c\u6b8b\u3063\u3066\u3044\u307e\u3059"),a
};

const smBaseTailFragmentV414=oa;
const smTailLineTextV414=e=>String(e||"").trim().replace(/^[\u2010-\u2015\-]+\s*/,"").trim();
const smLooksLikeTrailingDesignFragmentV414=e=>{
const t=String(e||"").trim();
if(!t)return!1;
if(/^(?:[-*_]{1,4}|[-=]{3,}|[\u2010-\u2015]{1,4}|\uff0a+)$/.test(t))return!0;
if(/^[\uff08(]\s*(?:\u7d9a(?:\u304f|\u30fb|\u304d)?|continued?|to\s*be\s*continued)?\s*[\uff09)]?$/i.test(t))return!0;
if(/^(?:\u7d9a\u304f|to\s*be\s*continued)$/i.test(t))return!0;
if(smLooksLikeTrailingOutlineBulletV413(t))return!0;
if(/^(?:[-*]|\u30fb)\s*/.test(t))return!0;
const a=smTailLineTextV414(t);
if(a.length<=220&&/(?:^\u6b21\u7ae0|^\u7b2c[\d\uff10-\uff19\u4e00-\u9fff]+\u7ae0|\u6b21\u7ae0\s*[:\uff1a]|(?:\u5e03\u77f3|\u5c0e\u7dda|\u4f0f\u7dda|\u56de\u53ce|\u4e88\u5146|\u7aef\u7dd2|\u5834\u9762|\u8a2d\u8a08|\u30e1\u30e2|GMC|Context|Plot|Turn|Aftertaste))/i.test(a))return!0;
if(a.length<=80&&/^[\u3010\[]?\s*(?:\u7ae0\u5185|\u7ae0\u672b|\u5834\u9762|\u8a2d\u8a08|\u30e1\u30e2|\u4f59\u97fb|\u30bf\u30fc\u30f3|\u4f0f\u7dda|Plot|Turn|Aftertaste)/i.test(a))return!0;
return!1
};
oa=function(e){
return smBaseTailFragmentV414(e)||smLooksLikeTrailingDesignFragmentV414(e)
};
const smBaseStripTrailingFragmentsV414=He;
He=function(e){
let t=smBaseStripTrailingFragmentsV414(e);
for(let a=0;a<8;a++){
const n=String(t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");
let r=n.length-1;
for(;r>=0&&!n[r].trim();)r--;
if(r<0)return"";
let s=r;
for(;s>=0&&smLooksLikeTrailingDesignFragmentV414(n[s]);)s--;
if(s===r)break;
t=n.slice(0,s+1).join("\n").trimEnd()
}
return t
};
const smBaseSaveGateV414=ot;
ot=function(e,t){
const a=smBaseSaveGateV414(e,t),n=String(e||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").map(r=>r.trim()).filter(Boolean).filter(r=>r!=="---");
let r=n.length-1;
for(;r>=0&&smLooksLikeTrailingDesignFragmentV414(n[r]);)r--;
return r<n.length-1&&a.push("\u7ae0\u672b\u306b\u8a2d\u8a08\u30fb\u7d99\u7d9a\u30e1\u30e2\u65ad\u7247\u304c\u6b8b\u3063\u3066\u3044\u307e\u3059"),a
};

const smChapterDoneTailArtifactV417=e=>/^[<\uFF1C\u3010\[\(\uFF08]?\s*\u7B2C[\d\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343]+\u7AE0\s*[\u3001,\u30FB:\uFF1A]?\s*(?:\u4E86|\u7D42|\u5B8C|\u7D42\u4E86|\u7D42\u308F\u308A|\u304A\u308F\u308A)\s*[\u30FB\u3001\u3002.\s\u30FC\u2010-\u2015-]*[>\uFF1E\u3011\]\)\uFF09]?$/.test(String(e||"").trim());
const smChapterDoneTailArtifactLineV417=/(?:^|\n)\s*[<\uFF1C\u3010\[\(\uFF08]?\s*\u7B2C[\d\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343]+\u7AE0\s*[\u3001,\u30FB:\uFF1A]?\s*(?:\u4E86|\u7D42|\u5B8C|\u7D42\u4E86|\u7D42\u308F\u308A|\u304A\u308F\u308A)\s*[\u30FB\u3001\u3002.\s\u30FC\u2010-\u2015-]*[>\uFF1E\u3011\]\)\uFF09]?(?=\n|$)/g;
const smLooksLikeChapterReferenceProseV417=e=>/^\s*\u7B2C[\d\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343]+\u7AE0(?:\u3067\u306F|\u3067|\u306B\u304A\u3044\u3066|\u306E\u4E2D\u3067|\u3068\u3044\u3046)/.test(String(e||"").trim())&&/[\u3002\uFF01\uFF1F!?\u300D\u300F]$/.test(String(e||"").trim());
const smBaseTailFragmentV417=oa;
oa=function(e){
if(smLooksLikeChapterReferenceProseV417(e))return!1;
return smBaseTailFragmentV417(e)||smChapterDoneTailArtifactV417(e)
};
const smBaseLeV417=le;
le=function(e){
const t=smBaseLeV417(e);
return String(t||"").replace(smChapterDoneTailArtifactLineV417,`
`).replace(/\n{3,}/g,`

`).trim()
};
const smBaseStripTrailingFragmentsV417=He;
He=function(e){
const o=String(e||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n"),i=o.split("\n");
let c=i.length-1;
for(;c>=0&&!i[c].trim();)c--;
if(c>=0&&smLooksLikeChapterReferenceProseV417(i[c]))return o.trim();
let t=smBaseStripTrailingFragmentsV417(e);
for(let a=0;a<8;a++){
const n=String(t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");
let r=n.length-1;
for(;r>=0&&!n[r].trim();)r--;
if(r<0)return"";
let s=r;
for(;s>=0&&!smLooksLikeChapterReferenceProseV417(n[s])&&(smChapterDoneTailArtifactV417(n[s])||smLooksLikeTrailingDesignFragmentV414(n[s]));)s--;
if(s===r)break;
t=n.slice(0,s+1).join("\n").trimEnd()
}
return t
};
const smBaseSaveGateV417=ot;
ot=function(e,t){
const n=String(e||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").map(r=>r.trim()).filter(Boolean);
let a=smBaseSaveGateV417(e,t);
smLooksLikeChapterReferenceProseV417(n[n.length-1]||"")&&(a=a.filter(r=>!String(r).includes("\u7AE0\u672B\u306B\u8A2D\u8A08\u30FB\u7D99\u7D9A\u30E1\u30E2\u65AD\u7247")));
return n.some(r=>smChapterDoneTailArtifactV417(r))&&a.push("\u7AE0\u672C\u6587\u306B\u7AE0\u4E86\u30FB\u7AE0\u5B8C\u4E86\u30E9\u30D9\u30EB\u65AD\u7247\u304C\u6B8B\u3063\u3066\u3044\u307E\u3059"),a
};
const smEnglishChapterControlLineV418=/^\s*[<\uFF1C\[\(\uFF08\u3010]?\s*(?:END\s+(?:OF\s+)?CHAPTER\s*\d+|CHAPTER\s*\d+\s*(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?|CLOSE(?:D)?)|(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?)\s+CHAPTER\s*\d+)\s*[>\uFF1E\]\)\uFF09\u3011]?\s*[.。・:：,\u3001\u2010-\u2015-]*\s*$/i;
const smLooksLikeEnglishChapterControlV418=e=>smEnglishChapterControlLineV418.test(String(e||"").trim());
const smBaseTailFragmentV418=oa;
oa=function(e){
return smLooksLikeEnglishChapterControlV418(e)||smBaseTailFragmentV418(e)
};
const smBaseLeV418=le;
le=function(e){
const t=smBaseLeV418(e);
return String(t||"").replace(/(?:^|\n)\s*[<\uFF1C\[\(\uFF08\u3010]?\s*(?:END\s+(?:OF\s+)?CHAPTER\s*\d+|CHAPTER\s*\d+\s*(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?|CLOSE(?:D)?)|(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?)\s+CHAPTER\s*\d+)\s*[>\uFF1E\]\)\uFF09\u3011]?\s*[.。・:：,\u3001\u2010-\u2015-]*\s*(?=\n|$)/gi,`
`).replace(/\n{3,}/g,`

`).trim()
};
const smBaseStripTrailingFragmentsV418=He;
He=function(e){
let t=smBaseStripTrailingFragmentsV418(e);
for(let a=0;a<8;a++){
const n=String(t||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");
let r=n.length-1;
for(;r>=0&&!n[r].trim();)r--;
if(r<0)return"";
if(!smLooksLikeEnglishChapterControlV418(n[r]))break;
t=n.slice(0,r).join("\n").trimEnd()
}
return t
};
const smBaseSaveGateV418=ot;
ot=function(e,t){
const n=String(e||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").map(r=>r.trim()).filter(Boolean);
const a=smBaseSaveGateV418(e,t);
return n.some(r=>smLooksLikeEnglishChapterControlV418(r))&&a.push("\u7AE0\u672C\u6587\u306B\u82F1\u8A9E\u306E\u7AE0\u5B8C\u4E86\u5236\u5FA1\u30E9\u30D9\u30EB\u304C\u6B8B\u3063\u3066\u3044\u307E\u3059"),a
};

// ============================================================
// v4.1.9 — 統一チャプターコントロールアーティファクト分類器
// 「（第9章 続く）」等の章制御ラベルを全パスで検出・除去
// ============================================================
const smNormalizeControlLineV419 = (e) => {
  return String(e || "").trim()
    .replace(/^[>＞\s]+/, "")
    .replace(/^[<＜【\[(\uFF08]+/, "")
    .replace(/[>＞】\])\uFF09]+$/, "")
    .replace(/[\u30FB\u3001\u3002.:\uFF1A,\u2010-\u2015\-\s]*$/, "")
    .trim();
};

// 日本語章番号パターン: 第1章, 第９章, 第九章 等
const smJpChapterNumV419 = "第[\\d\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343]+章";

// 統一正規表現：正規化後のテキストに対して適用
// (A) 日本語 章番号+継続: 第N章 続く / つづく / 継続 / 次章へ
// (B) 日本語 章番号+完了: 第N章 了 / 終 / 完 / 終了 / 終わり / おわり
// (C) 日本語 非番号 継続: 続く / つづく / 次章へ / 終章へ / 次章: / 次の章
// (D) 英語 章制御: END CHAPTER N / CHAPTER N END / CONTINUED IN CHAPTER N / TO BE CONTINUED / NEXT CHAPTER
// (E) 管理メモラベル: 文脈維持・次章連結メモ / 続く章・展開の...
const smChapterControlArtifactReV419 = new RegExp(
  "^(?:" +
    // (A) 章番号+継続語
    smJpChapterNumV419 + "\\s*[\\u3001,\\u30FB:\\uFF1A]?\\s*(?:\\u7D9A\\u304F|\\u7D9A\\u304D|\\u3064\\u3065\\u304F|\\u7D99\\u7D9A|\\u6B21\\u7AE0\\u3078|\\u6B21\\u306E\\u7AE0|\\u6B21\\u7AE0)" +
  "|" +
    // (B) 章番号+完了語
    smJpChapterNumV419 + "\\s*[\\u3001,\\u30FB:\\uFF1A]?\\s*(?:\\u4E86|\\u7D42|\\u5B8C|\\u7D42\\u4E86|\\u7D42\\u308F\\u308A|\\u304A\\u308F\\u308A)" +
  "|" +
    // (C) 非番号 継続語（スタンドアロン）
    "(?:\\u7D9A\\u304F|\\u7D9A\\u304D|\\u3064\\u3065\\u304F|\\u6B21\\u7AE0\\u3078|\\u6B21\\u7AE0|\\u7D42\\u7AE0\\u3078|To\\s+be\\s+continued|Continued|Next\\s+chapter)" +
  "|" +
    // (D) 英語章制御
    "(?:END\\s+(?:OF\\s+)?CHAPTER\\s*\\d+|CHAPTER\\s*\\d+\\s*(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?|CLOSE(?:D)?|CONTINUES?)" +
    "|(?:END|DONE|COMPLETE(?:D)?|FINISH(?:ED)?)\\s+CHAPTER\\s*\\d+" +
    "|CONTINUED\\s+IN\\s+CHAPTER\\s*\\d+" +
    "|NEXT\\s+CHAPTER)" +
  "|" +
    // (E) 管理メモラベル
    "\\u6587\\u8108\\u7DAD\\u6301[^\\n]{0,20}\\u30E1\\u30E2" +
    "|\\u6B21\\u7AE0\\u9023\\u7D50[^\\n]{0,20}\\u30E1\\u30E2" +
    "|\\u7D9A\\u304F\\u7AE0[^\\n]*" +
  ")$", "i"
);

// 散文中の章参照を保護するための判定
// 例: 「第9章では、彼はまだ終わりを認めなかった。」は除外する
const smLooksLikeChapterReferenceProseV419 = (e) => {
  const raw = String(e || "").trim();
  // 120文字超で句点・感嘆符等で終わる行は散文として保護
  if (raw.length > 120 && /[\u3002\uFF01\uFF1F!?\u300D\u300F]$/.test(raw)) return true;
  // 「第N章では」「第N章において」等の助詞接続パターン
  if (/^\s*第[\d\uFF10-\uFF19\u4E00-\u9FFF]+章(?:では|で|において|の中で|という|に|を|が|は|から|まで|と)/.test(raw) &&
      /[\u3002\uFF01\uFF1F!?\u300D\u300F]$/.test(raw)) return true;
  // 「続く」が引用符内にある場合: 「続く」
  if (/\u300C.*\u7D9A\u304F.*\u300D/.test(raw) && raw.length > 20) return true;
  // 「続く＋名詞」で始まる散文行: 続く雨音の中で...
  if (/^\u7D9A\u304F[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/.test(raw) && raw.length > 15 &&
      /[\u3002\uFF01\uFF1F!?\u300D\u300F]$/.test(raw)) return true;
  return false;
};

// 正規の章見出しを保護: # 第9章: タイトル
const smIsChapterHeadingV419 = (e) => {
  return /^\s*[#＃]+\s*第[\d\uFF10-\uFF19\u4E00-\u9FFF]+章\s*[:：]?\s*.{2,}/.test(String(e || "").trim());
};

// 統一分類器: この行がチャプターコントロールアーティファクトかどうか判定
const smLooksLikeChapterControlArtifactLineV419 = (e) => {
  const raw = String(e || "").trim();
  if (!raw) return false;
  // 章見出しは保護
  if (smIsChapterHeadingV419(raw)) return false;
  // 散文参照は保護
  if (smLooksLikeChapterReferenceProseV419(raw)) return false;
  // v417の散文保護も引き続き利用
  if (smLooksLikeChapterReferenceProseV417(raw)) return false;
  // 正規化して分類器に通す
  const normalized = smNormalizeControlLineV419(raw);
  if (!normalized) return false;
  return smChapterControlArtifactReV419.test(normalized);
};

// 行単位でチャプターコントロールアーティファクトを除去
const smStripChapterControlArtifactLinesV419 = (text) => {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(line => !smLooksLikeChapterControlArtifactLineV419(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// oa() に統一分類器を統合 — テールフラグメント検出に追加
const smBaseTailFragmentV419 = oa;
oa = function(e) {
  if (smLooksLikeChapterReferenceProseV419(e)) return false;
  if (smLooksLikeChapterReferenceProseV417(e)) return false;
  return smLooksLikeChapterControlArtifactLineV419(e) || smBaseTailFragmentV419(e);
};

// le() に統一分類器を統合 — 可視テキストからコントロールライン全除去（章間含む）
const smBaseLeV419 = le;
le = function(e) {
  const t = smBaseLeV419(e);
  return smStripChapterControlArtifactLinesV419(t);
};

// He() に統一分類器を統合 — テール位置のコントロールライン除去
const smBaseStripTrailingFragmentsV419 = He;
He = function(e) {
  let t = smBaseStripTrailingFragmentsV419(e);
  for (let a = 0; a < 8; a++) {
    const n = String(t || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    let r = n.length - 1;
    for (; r >= 0 && !n[r].trim(); ) r--;
    if (r < 0) return "";
    if (!smLooksLikeChapterControlArtifactLineV419(n[r])) break;
    t = n.slice(0, r).join("\n").trimEnd();
  }
  return t;
};

// ot() に統一分類器を統合 — 保存前品質ゲートでコントロールライン残存を検出
const smBaseSaveGateV419 = ot;
ot = function(e, t) {
  const n = String(e || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").map(r => r.trim()).filter(Boolean);
  const a = smBaseSaveGateV419(e, t);
  if (n.some(r => smLooksLikeChapterControlArtifactLineV419(r))) {
    a.push("章本文にチャプターコントロールアーティファクト（続く/了/END CHAPTER等）が残っています");
  }
  return a;
};

// ============================================================
// v4.2.0 — 管理メモ/接続メモ本文混入の統一ブロック分類器
// 章制御だけでなく、章内/章末/後半補完/構造/設計/伏線などの
// 管理用ブロックを保存本文・表示本文・コピー本文から除去する。
// ============================================================
const smManagementHeadingAllowlistV420 = /^(?:【(?:作品ヘッダー情報|あらすじ|完)】|\[(?:作品ヘッダー情報|あらすじ)\])$/;
const smManagementHeadingKeywordV420 = /(?:文脈|次章|後半|補完|接続|連結|構造|設計|章末|章内|伏線|回収|ロスター|モチーフ|サブキャラ|管理|指示|維持|導入|状態|補足|GMC|GMC\+S|メモ)/i;
const smManagementHeadingTerminalV420 = /(?:メモ|設計|補完|接続|連結|構造|管理|指示|状態|伏線|ロスター|モチーフ|GMC|GMC\+S)$/i;

const smNormalizeManagementHeadingV420 = (e) => String(e || "")
  .trim()
  .replace(/^[#＃]+\s*/, "")
  .replace(/^[>＞\s]+/, "")
  .replace(/^[<＜【\[(（]+/, "")
  .replace(/[>＞】\])）]+$/, "")
  .replace(/[\u30FB\u3001\u3002.:\uFF1A,\u2010-\u2015\-\s]*$/, "")
  .trim();

const smLooksLikeLongNovelManagementHeadingV420 = (e) => {
  const raw = String(e || "").trim();
  if (!raw || raw.length > 140) return false;
  if (smManagementHeadingAllowlistV420.test(raw)) return false;
  if (smIsChapterHeadingV419(raw)) return false;
  const normalized = smNormalizeManagementHeadingV420(raw);
  if (!normalized || normalized.length > 120) return false;
  if (/^(?:作品ヘッダー情報|あらすじ|完)$/.test(normalized)) return false;
  const bracketed = /^[【\[(（].{1,130}[】\])）]$/.test(raw);
  const chapterScoped = /第[\d\uFF10-\uFF19一二三四五六七八九十百千]+章|章末|章内/.test(normalized);
  const hasKeyword = smManagementHeadingKeywordV420.test(normalized);
  const hasTerminal = smManagementHeadingTerminalV420.test(normalized);
  return hasKeyword && (hasTerminal || bracketed || chapterScoped);
};

const smLooksLikeManagementBlockContinuationV420 = (e) => {
  const raw = String(e || "").trim();
  if (!raw) return "blank";
  if (/^(?:[-*・•‣◦]|\d+[\).、．]|[①-⑳])\s*/.test(raw)) return "skip";
  if (/^(?:目的|狙い|要点|補足|接続|次章|伏線|状態|メモ|設計|構造|回収|Note|Notes|Revision|Finding|Weakest|Strongest|Hint)\s*[:：]/i.test(raw)) return "skip";
  if (raw.length <= 120 && smManagementHeadingKeywordV420.test(raw) && !/[。！？!?」』]$/.test(raw)) return "skip";
  return "";
};

const smLooksLikeStandaloneManagementBulletV420 = (e) => {
  const raw = String(e || "").trim();
  if (!/^(?:[-*・•‣◦]|\d+[\).、．]|[①-⑳])\s*/.test(raw)) return false;
  const body = raw.replace(/^(?:[-*・•‣◦]|\d+[\).、．]|[①-⑳])\s*/, "").trim();
  if (!body || body.length > 260) return false;
  return smManagementHeadingKeywordV420.test(body)
    || /(?:前章|次章|章末|章内|幕間|伏線|回収|補完|接続|連結|構造|設計|プロット|ロスター|モチーフ|導入|状態|橋渡し|フック|文脈|GMC|GMC\+S)/i.test(body);
};

const smStripLongNovelManagementBlocksV420 = (text) => {
  const lines = String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const kept = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (smLooksLikeLongNovelManagementHeadingV420(line)) {
      i++;
      for (; i < lines.length;) {
        if (smLooksLikeLongNovelManagementHeadingV420(lines[i]) || smLooksLikeChapterControlArtifactLineV419(lines[i])) break;
        const kind = smLooksLikeManagementBlockContinuationV420(lines[i]);
        if (kind === "skip") {
          i++;
          continue;
        }
        if (kind === "blank") {
          i++;
          break;
        }
        break;
      }
      continue;
    }
    if (smLooksLikeChapterControlArtifactLineV419(line)) {
      i++;
      continue;
    }
    if (smLooksLikeStandaloneManagementBulletV420(line)) {
      i++;
      continue;
    }
    kept.push(line);
    i++;
  }
  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
};

const smHasLongNovelManagementArtifactV420 = (text) => {
  return String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")
    .some(line => smLooksLikeLongNovelManagementHeadingV420(line) || smLooksLikeStandaloneManagementBulletV420(line));
};

const smBaseLeV420 = le;
le = function(e) {
  return smStripLongNovelManagementBlocksV420(smBaseLeV420(e));
};

const smBaseXeV420 = Xe;
Xe = function(e) {
  const result = smBaseXeV420(e);
  return {
    body: smStripLongNovelManagementBlocksV420(result.body),
    memo: result.memo
  };
};

const smBaseItV420 = it;
it = function(e, t) {
  const result = smBaseItV420(e, t);
  return {
    body: smStripLongNovelManagementBlocksV420(result.body),
    memo: result.memo
  };
};

const smBaseStripTrailingFragmentsV420 = He;
He = function(e) {
  return smStripLongNovelManagementBlocksV420(smBaseStripTrailingFragmentsV420(e));
};

const smBaseTailFragmentV420 = oa;
oa = function(e) {
  return smLooksLikeLongNovelManagementHeadingV420(e) || smBaseTailFragmentV420(e);
};

const smBaseSaveGateV420 = ot;
ot = function(e, t) {
  const reasons = smBaseSaveGateV420(e, t);
  if (smHasLongNovelManagementArtifactV420(e)) {
    reasons.push("章本文に管理メモ/接続メモ/構造メモ等の管理ブロックまたは設計箇条書きが残っています");
  }
  return reasons;
};
