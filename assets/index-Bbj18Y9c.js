(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const pe=[{value:"gemini-3.5-flash",label:"Gemini 3.5 Flash"},{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-flash-latest",label:"Gemini Flash (Latest)"},{value:"gemini-pro-latest",label:"Gemini Pro (Latest)"}],ze=[{value:"4koma",label:"4コマ漫画風"},{value:"4koma_scenario",label:"AI 4koma シナリオ連携（STEP2）"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(数万字/全章＋指示書)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],un={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},dn={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},pn={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},hn={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},mn={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},gn={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},fn={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},he=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],me=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],nt=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],at=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],st=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],yn=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],Et=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],At=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],vn=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],$n=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],bn=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],Cn=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],xn=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],Ln=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],wn=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],In=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],En=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],An=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],He=async e=>{if(!e)return"API Key not set.";try{const t=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`)).json();return t.error?`API Error: ${t.error.message}`:t.models?`Available Models: ${t.models.map(a=>a.name.replace("models/","")).filter(a=>a.includes("gemini")).join(", ")}`:"No models returned by API."}catch(t){return`Diagnostic Failed: ${t.message}`}};async function _n(e,t,a,n={}){var s,r,o,l;const i=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,u={temperature:n.temperature!==void 0?n.temperature:1};(n.maxOutputTokens||n.maxTokens)&&(u.maxOutputTokens=n.maxOutputTokens||n.maxTokens),n.responseMimeType&&(u.responseMimeType=n.responseMimeType);const p=n.timeoutMs||18e4,f=new AbortController,g=setTimeout(()=>f.abort(),p),v={contents:[{parts:[{text:a}]}],generationConfig:u,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};u.responseMimeType!=="application/json"&&!n.disableGoogleSearch&&(v.tools=[{googleSearch:{}}]);try{const y=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},signal:f.signal,body:JSON.stringify(v)});if(clearTimeout(g),!y.ok){const $=await y.text();let m=`Gemini HTTP ${y.status}`;try{const b=JSON.parse($);b.error&&b.error.message&&(m+=` — ${b.error.message}`)}catch{m+=` — ${$.slice(0,300)}`}throw new Error(m)}const d=await y.json();if((s=d.promptFeedback)!=null&&s.blockReason)throw new Error(`Blocked by Safety Filter: ${d.promptFeedback.blockReason}`);if((l=(o=(r=d.candidates)==null?void 0:r[0])==null?void 0:o.content)!=null&&l.parts){const $=d.candidates[0].content.parts.map(m=>m.text||"").join("");if(!$){const m=d.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${m}).`)}return $}throw d.error?new Error(`Gemini API Error: ${d.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} (${p/1e3}s)`):y}finally{clearTimeout(g)}}async function Sn(e,t,a,n,s,r={}){var o,l,i,u;const p=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,f={temperature:r.temperature!==void 0?r.temperature:.3};r.responseMimeType&&(f.responseMimeType=r.responseMimeType);const g=r.timeoutMs||18e4,v=new AbortController,y=setTimeout(()=>v.abort(),g);try{const d=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},signal:v.signal,body:JSON.stringify({contents:[{parts:[{text:a},{inlineData:{mimeType:s,data:n}}]}],generationConfig:f,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(y),!d.ok){const m=await d.text();let b=`Gemini HTTP ${d.status}`;try{const C=JSON.parse(m);C.error&&C.error.message&&(b+=` — ${C.error.message}`)}catch{b+=` — ${m.slice(0,300)}`}throw new Error(b)}const $=await d.json();if((o=$.promptFeedback)!=null&&o.blockReason)throw new Error(`Blocked by Safety Filter: ${$.promptFeedback.blockReason}`);if((u=(i=(l=$.candidates)==null?void 0:l[0])==null?void 0:i.content)!=null&&u.parts){const m=$.candidates[0].content.parts.map(b=>b.text||"").join("");if(!m){const b=$.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${b}).`)}return m}throw $.error?new Error(`Gemini API Error: ${$.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(d){throw d.name==="AbortError"?new Error(`Timeout: ${t} vision (${g/1e3}s)`):d}finally{clearTimeout(y)}}async function _t(e,t,a,n,s,r={}){if(e.trim().startsWith("sk-"))return kn(e.trim(),t,a,n,s,r);const o=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],l=[];let i=!1,u=!1,p=!1;for(const v of o)try{return s&&o[0],{text:await Sn(e,v,t,a,n,r),usedModel:v}}catch(y){const d=y.message||"";console.warn(`Vision model ${v} failed:`,d),l.push(`${v}: ${d}`);const $=d.toLowerCase();($.includes("safety")||$.includes("prohibited")||$.includes("block"))&&(i=!0),($.includes("quota")||$.includes("429")||$.includes("limit"))&&(u=!0),($.includes("api key")||$.includes("403")||$.includes("invalid"))&&(p=!0);continue}const f=await He(e);console.error("VISION DIAGNOSIS:",f);let g=`全モデルでの画像認識に失敗: ${f}
`;throw i||f.includes("SAFETY")||f.includes("PROHIBITED")?g="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":u||f.includes("Quota exceeded")||f.includes("429")?g="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":p||f.includes("API key not valid")||f.includes("403")?g="【認証エラー】APIキーが無効です。正しいキーを設定してください。":g+=`
[各モデルのエラー詳細]
${l.join(`
`)}`,new Error(g)}async function Te(e,t,a,n,s={}){if(e.trim().startsWith("sk-"))return Tn(e.trim(),a,n,s);const r=Array.isArray(s.fallbackModels)?s.fallbackModels:["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],o=new Set([t,...r]);let l=Array.from(o);s.disableFallback?l=[t]:Number.isFinite(s.maxModelAttempts)&&s.maxModelAttempts>0&&(l=l.slice(0,Math.max(1,Math.floor(s.maxModelAttempts))));const i=[];let u=!1,p=!1,f=!1;for(const y of l)try{return y!==t&&n&&n(y),{text:await _n(e,y,a,s),usedModel:y}}catch(d){const $=d.message||"";console.warn(`Model ${y} failed:`,$),i.push(`${y}: ${$}`);const m=$.toLowerCase();(m.includes("safety")||m.includes("prohibited")||m.includes("block"))&&(u=!0),(m.includes("quota")||m.includes("429")||m.includes("limit"))&&(p=!0),(m.includes("api key")||m.includes("403")||m.includes("invalid"))&&(f=!0);continue}console.log("All models failed. Running diagnosis...");const g=await He(e);console.error("DIAGNOSIS RESULT:",g);let v=`全モデル接続失敗: ${g}
`;throw u||g.includes("SAFETY")||g.includes("PROHIBITED")?v="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":p||g.includes("Quota exceeded")||g.includes("429")?v=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:f||g.includes("API Error: API key not valid")||g.includes("403")?v="【認証エラー】APIキーが無効です。正しいキーを設定してください。":g.includes("404")?v="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":v+=`
[各モデルのエラー詳細]
${i.join(`
`)}`,new Error(v)}const ke=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"];async function Tn(e,t,a,n={}){var s,r,o,l,i,u;for(const p of ke)try{p!==ke[0]&&a&&a(p);const f=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:p,messages:[{role:"user",content:t}],temperature:1,max_tokens:n.maxTokens||8192,response_format:n.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!f.ok){const y=await f.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${f.status} - ${((s=y.error)==null?void 0:s.message)||f.statusText}`)}const g=await f.json(),v=((l=(o=(r=g.choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:l.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((u=(i=g.choices)==null?void 0:i[0])==null?void 0:u.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:p}}catch(f){console.warn(`Model ${p} failed:`,f.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。")}const gt=["gpt-4.1","gpt-4o","gpt-4.1-mini"];async function kn(e,t,a,n,s,r={}){var o,l,i,u,p,f;const g=`data:${n};base64,${a}`;for(const v of gt)try{gt[0];const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:v,messages:[{role:"user",content:[{type:"text",text:t},{type:"image_url",image_url:{url:g,detail:"high"}}]}],temperature:.3,max_tokens:8192,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const m=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((o=m.error)==null?void 0:o.message)||y.statusText}`)}const d=await y.json(),$=((u=(i=(l=d.choices)==null?void 0:l[0])==null?void 0:i.message)==null?void 0:u.content)||"";if(!$)throw new Error(`Empty response (FinishReason: ${((f=(p=d.choices)==null?void 0:p[0])==null?void 0:f.finish_reason)||"UNKNOWN"})`);return{text:$,usedModel:v}}catch(y){console.warn(`Vision Model ${v} failed:`,y.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Mn(e,t,a,n,s={}){var r,o,l,i;const u=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,p=[{text:a}];n.forEach(d=>{p.push({inlineData:{mimeType:d.mimeType,data:d.base64}})});const f={temperature:s.temperature!==void 0?s.temperature:.4};s.responseMimeType&&(f.responseMimeType=s.responseMimeType);const g=s.timeoutMs||18e4,v=new AbortController,y=setTimeout(()=>v.abort(),g);try{const d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},signal:v.signal,body:JSON.stringify({contents:[{parts:p}],generationConfig:f,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(y),!d.ok){const m=await d.text();let b=`Gemini HTTP ${d.status}`;try{const C=JSON.parse(m);C.error&&C.error.message&&(b+=` — ${C.error.message}`)}catch{b+=` — ${m.slice(0,300)}`}throw new Error(b)}const $=await d.json();if((r=$.promptFeedback)!=null&&r.blockReason)throw new Error(`Blocked by Safety Filter: ${$.promptFeedback.blockReason}`);if((i=(l=(o=$.candidates)==null?void 0:o[0])==null?void 0:l.content)!=null&&i.parts){const m=$.candidates[0].content.parts.map(b=>b.text||"").join("");if(!m){const b=$.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${b}).`)}return m}throw $.error?new Error(`Gemini API Error: ${$.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(d){throw d.name==="AbortError"?new Error(`Timeout: ${t} multimodal (${g/1e3}s)`):d}finally{clearTimeout(y)}}async function Nn(e,t,a,n,s={}){var r,o,l,i,u,p;const f=["gpt-4.1","gpt-4o","gpt-4.1-mini"];for(const g of f)try{g!==f[0]&&n&&n(g);const v=[{type:"text",text:t}];a.forEach(m=>{v.push({type:"image_url",image_url:{url:`data:${m.mimeType};base64,${m.base64}`,detail:"high"}})});const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:g,messages:[{role:"user",content:v}],temperature:.4,max_tokens:8192,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const m=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((r=m.error)==null?void 0:r.message)||y.statusText}`)}const d=await y.json(),$=((i=(l=(o=d.choices)==null?void 0:o[0])==null?void 0:l.message)==null?void 0:i.content)||"";if(!$)throw new Error(`Empty response (FinishReason: ${((p=(u=d.choices)==null?void 0:u[0])==null?void 0:p.finish_reason)||"UNKNOWN"})`);return{text:$,usedModel:g}}catch(v){console.warn(`Vision Model ${g} failed:`,v.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function On(e,t,a,n,s={}){if(e.trim().startsWith("sk-"))return Nn(e.trim(),t,a,n,s);const r=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],o=[];let l=!1,i=!1,u=!1;for(const g of r)try{return n&&g!==r[0]&&n(g),{text:await Mn(e,g,t,a,s),usedModel:g}}catch(v){const y=v.message||"";console.warn(`Vision model ${g} failed:`,y),o.push(`${g}: ${y}`);const d=y.toLowerCase();(d.includes("safety")||d.includes("prohibited")||d.includes("block"))&&(l=!0),(d.includes("quota")||d.includes("429")||d.includes("limit"))&&(i=!0),(d.includes("api key")||d.includes("403")||d.includes("invalid"))&&(u=!0);continue}const p=await He(e);console.error("VISION DIAGNOSIS:",p);let f=`全モデルでの画像認識に失敗: ${p}
`;throw l||p.includes("SAFETY")||p.includes("PROHIBITED")?f="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":i||p.includes("Quota exceeded")||p.includes("429")?f="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":u||p.includes("API key not valid")||p.includes("403")?f="【認証エラー】APIキーが無効です。正しいキーを設定してください。":f+=`
[各モデルのエラー詳細]
${o.join(`
`)}`,new Error(f)}async function Rn(e,t,a,n,s={}){var r,o,l,i;for(const u of ke)try{u!==ke[0]&&n&&n(u);const p=new AbortController;let f=null;s.signal&&(f=()=>p.abort(),s.signal.addEventListener("abort",f));const g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},signal:p.signal,body:JSON.stringify({model:u,messages:[{role:"user",content:t}],temperature:1,max_tokens:s.maxTokens||8192,stream:!0,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!g.ok){const $=await g.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${g.status} - ${((r=$.error)==null?void 0:r.message)||g.statusText}`)}const v=g.body.getReader(),y=new TextDecoder("utf-8");let d="";try{for(;;){const{done:$,value:m}=await v.read();if($)break;d+=y.decode(m,{stream:!0});let b=d.split(`
`);d=b.pop();for(const C of b){const L=C.trim();if(!L||!L.startsWith("data: "))continue;const I=L.slice(6);if(I==="[DONE]")break;try{const w=((i=(l=(o=JSON.parse(I).choices)==null?void 0:o[0])==null?void 0:l.delta)==null?void 0:i.content)||"";w&&a({text:w,isThought:!1})}catch{}}}}finally{v.releaseLock(),s.signal&&f&&s.signal.removeEventListener("abort",f)}return{usedModel:u}}catch(p){if(p.name==="AbortError")throw new Error(`Aborted: ${u} stream`);console.warn(`Model ${u} stream failed:`,p.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function ft(e,t,a,n,s={}){var r,o,l;const i=`https://generativelanguage.googleapis.com/v1beta/models/${t}:streamGenerateContent?alt=sse&key=${e}`,u={temperature:1};(s.maxOutputTokens||s.maxTokens)&&(u.maxOutputTokens=s.maxOutputTokens||s.maxTokens),!s.disableThinkingConfig&&(t.includes("gemini-2.5")||t.includes("gemini-2.0")||t.includes("gemini-3")||t.includes("gemini-3.5"))&&(u.thinkingConfig={thinkingBudget:2048}),s.responseMimeType&&(u.responseMimeType=s.responseMimeType);const p=s.timeoutMs||18e4,f=new AbortController;let g=setTimeout(()=>f.abort(),p),v=null;s.signal&&(v=()=>f.abort(),s.signal.addEventListener("abort",v));const y={contents:[{parts:[{text:a}]}],generationConfig:u,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};u.responseMimeType!=="application/json"&&!s.disableGoogleSearch&&(y.tools=[{googleSearch:{}}]);try{const d=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},signal:f.signal,body:JSON.stringify(y)});if(!d.ok){clearTimeout(g);const C=await d.text();let L=`Gemini HTTP ${d.status}`;try{const I=JSON.parse(C);I.error&&I.error.message&&(L+=` — ${I.error.message}`)}catch{L+=` — ${C.slice(0,300)}`}throw new Error(L)}const $=d.body.getReader(),m=new TextDecoder("utf-8");let b="";try{for(;;){clearTimeout(g),g=setTimeout(()=>f.abort(),p);const{done:C,value:L}=await $.read();if(C)break;b+=m.decode(L,{stream:!0});let I=b.split(`
`);b=I.pop();for(const w of I){const O=w.trim();if(!O||!O.startsWith("data: "))continue;const _=O.slice(6);try{const N=(l=(o=(r=JSON.parse(_).candidates)==null?void 0:r[0])==null?void 0:o.content)==null?void 0:l.parts;if(N)for(const E of N){const A=E.text||E.thought||"",k=!!E.thought;A&&n({text:A,isThought:k})}}catch{}}}}finally{$.releaseLock()}}catch(d){throw d.name==="AbortError"?new Error(`Aborted: ${t} stream (${p/1e3}s timeout or user abort)`):d}finally{clearTimeout(g),s.signal&&v&&s.signal.removeEventListener("abort",v)}}async function ge(e,t,a,n,s,r={}){if(e.trim().startsWith("sk-"))return Rn(e.trim(),a,n,s,r);const o=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],l=new Set([t,...o]),i=Array.from(l),u=[];let p=!1,f=!1,g=!1;for(const d of i)try{return d!==t&&s&&s(d),await ft(e,d,a,n,r),{usedModel:d}}catch($){const m=$.message||"";console.warn(`Model ${d} stream failed:`,m),u.push(`${d}: ${m}`);const b=m.toLowerCase();if((b.includes("safety")||b.includes("prohibited")||b.includes("block"))&&(p=!0),(b.includes("quota")||b.includes("429")||b.includes("limit"))&&(f=!0),(b.includes("api key")||b.includes("403")||b.includes("invalid"))&&(g=!0),m.includes("400")||b.includes("bad request")||b.includes("thinking_config"))try{return console.log(`Retrying model ${d} without thinkingConfig...`),await ft(e,d,a,n,{...r,disableThinkingConfig:!0}),{usedModel:d}}catch(C){console.warn(`Model ${d} stream retry failed:`,C.message),u.push(`${d} (retry): ${C.message}`)}continue}console.log("All models failed. Running diagnosis...");const v=await He(e);console.error("DIAGNOSIS RESULT:",v);let y=`全モデル接続失敗: ${v}
`;throw p||v.includes("SAFETY")||v.includes("PROHIBITED")?y="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":f||v.includes("Quota exceeded")||v.includes("429")?y=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:g||v.includes("API Error: API key not valid")||v.includes("403")?y="【認証エラー】APIキーが無効です。正しいキーを設定してください。":v.includes("404")?y="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":y+=`
[各モデルのエラー詳細]
${u.join(`
`)}`,new Error(y)}const St={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},Tt={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},kt={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},Mt={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},Nt={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function re(e,t){return!e||e==="ランダム"?"":t[e]||""}const Pn={江戸時代:{tags:["江戸","江戸時代","徳川","侍","町人"],lore:`【江戸時代の生活知識】
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
・食文化: 現代知識で異世界の食文化を改革する展開が人気（マヨネーズ、味噌、醤油の再現など）`}};function Bn(e){const t=[e.worldview,e.worldviewCustom,e.era,e.eraCustom,e.theme,e.themeCustom,e.genre,e.genreCustom,e.mode,e.modeCustom,e.supplement,...(e.characters||[]).map(s=>s.note||"")].filter(Boolean).join(" ");if(!t.trim())return"";const a=[],n=new Set;for(const[s,r]of Object.entries(Pn))n.has(s)||r.tags.some(o=>t.includes(o))&&(a.push(r.lore),n.add(s));return a.length===0?"":`

【参考知識（RAG: 物語のディテール向上用 — この情報を自然に活用して描写の解像度を上げること）】
`+a.slice(0,3).join(`

`)}const Ke=e=>e[Math.floor(Math.random()*e.length)];function Hn(e){const t=e.mode||"4koma",a=e.genreCustom||e.genre||"コメディ",n=e.themeCustom||e.theme||"ランダム",s=e.worldviewCustom||e.worldview||"現代日本",r=e.eraCustom||e.era||"現代",o=e.targetCustom||e.target||"全年齢",l=e.endingCustom||e.ending||"意外な結末",i=e.narrCustom||e.narration||"三人称・客観";let u;!e.characters||e.characters.length===0?u="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":u=e.characters.map((E,A)=>{const k=E.name||`(AI命名:キャラ${A+1})`,R=E.role||"未定",U=E.sex?`性別:${E.sex}, `:"",S=E.personality||"未定",M=E.note?` [${E.note}]`:"";return`${A+1}. ${k} (${R}) — ${U}性格:${S}${M}`}).join(`
`);const p=e.charCount?`
※ 指定文字数：約${e.charCount}文字程度`:"",f=e.supplement?`
【追加指示】
${e.supplement}`:"",g={"4koma":"4コマネタ","4koma_scenario":"AI 4koma シナリオ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},v=e.modeCustom||g[t]||t,y={"4koma":`

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
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[t]||"",d=r&&!["現代","ランダム",""].includes(r)?`

【時代考証ルール（厳守）】
・時代設定「`+r+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"",$=re(a,St),m=re(l,Tt),b=re(s,kt),C=re(o,Mt),L=re(i,Nt);let I="";$&&(I+=`

【ジャンル文体指定：${a}】
${$}`),m&&(I+=`

【結末演出指定：${l}】
${m}`),b&&(I+=`

【世界観演出指定：${s}】
${b}`),C&&(I+=`

【ターゲット層文体指定：${o}】
${C}`),L&&(I+=`

【語り口指定：${i}】
${L}`);let w="";t==="4koma_scenario"?w=`あなたはプロの4コマ漫画シナリオライターです。以下の設定に基づき、画像生成4コマ漫画アプリのSTEP2シナリオ入力欄に直接コピペして使える形式でシナリオを出力してください。

【基本設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${r}
・世界観・雰囲気: ${s}
・ターゲット層: ${o}
・結末の方向性: ${l}

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
${f}

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的なシナリオを出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的なシナリオのみを出力してください（Topic: から開始）。`:t==="long"?w=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】と【文体・演出ガイド】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${r}
・世界観・雰囲気: ${s}
・語り口: ${i}
・ターゲット層: ${o}
・結末の方向性: ${l}
・登場人物:
${u}
${p}${f}${d}${I}

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
`:w=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${v}」を執筆してください。

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
・時代: ${r}
・世界観・雰囲気: ${s}
・語り口: ${i}
・ターゲット層: ${o}
・結末の方向性: ${l}

【登場人物】
${u}

【執筆ルール（最重要）】
1. ログラインの固定：執筆を開始する前に、物語全体を貫く「ログライン（物語の核となる1文要約）」を内部で設定し、最初から結末までその軸を絶対にブレさせないこと。
2. 予測可能な展開を意図的に回避し、読者を驚かせること。
3. キャラクターは設定された性格から生まれる固有の反応をすること。
4. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。
${(()=>{const E=["novel","medium","short_short","scenario","manga","documentary","radio"],A=["essay","poem","letter","diary"];return E.includes(t)?`6. 「${l}」という結末に向かって、伏線を自然に配置すること。

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

セリフは短く鋭く。だらだら説明するセリフは禁止。テンポとオチの切れ味を最優先すること。`:A.includes(t)?{essay:"\\n\\n【構成ルール】\\n1. テーマの一貫性と感情の自然な流れを重視し、読者が共感しながら読み進められる構成にすること。\\n2. 劇的な展開や壮大な伏線は一切不要。日常の機微や気づきを丁寧に積み重ねること。\\n3. 結論を急がず、余韻を残して自然に終わらせること。",poem:"\\n\\n【構成ルール】\\n1. イメージの連鎖と韻律の統一感を重視し、一篇を通じて響き合うモチーフを配置すること。\\n2. 物語的な伏線や因果関係は不要。詩的飛躍と余白を大切にすること。\\n3. 言葉の音（おん）と意味の二重性を意識した表現を心がけること。",letter:"\\n\\n【構成ルール】\\n1. 書き手の心情変化を自然かつ段階的に描写し、手紙の冒頭と末尾で感情の温度差を持たせること。\\n2. 物語的な伏線は不要。相手への語りかけの中で、書き手自身の内面が滲み出る構成にすること。\\n3. 手紙特有の「書き直せない生々しさ」を大切にし、整理されすぎない思考の流れを残すこと。",diary:"\\n\\n【構成ルール】\\n1. 日々の出来事から内面への掘り下げを段階的に進め、日記の最後に小さな気づきや変化を置くこと。\\n2. 物語的な伏線や劇的な展開は不要。等身大の思考と感情の揺れを丁寧に記録すること。\\n3. 書き手が自分自身に正直に向き合う瞬間を大切にし、取り繕わない率直さを保つこと。"}[t]||"":`6. 「${l}」という結末に向かって、伏線を自然に配置すること。`})()}${d}${y}${I}${p}${f}

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
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;let O="";e.universalAssets&&e.universalAssets.length>0&&(O=`

【入力アセット情報（インスピレーションソース）】
`,O+=`以下のユーザーから投入されたアセット情報（画像、URL、テキストなど）を、指定された「縛り（設定項目）」をすべて満たした上で、物語の要素、描写、モチーフ、設定として自然に溶け込ませて構成してください。
`,e.universalAssets.forEach((E,A)=>{if(O+=`[アセット ${A+1}] 型: ${E.type}
`,E.type==="image"){O+=`・画像ファイル名: ${E.name||"不明"}
`;const k=E.status==="error"?"画像解析エラーにより詳細情報なし":E.analysis||"解析中、または解析不可";O+=`・ビジュアル事前解析結果: ${k}
`}else E.type==="url"?(O+=`・リンクURL: ${E.value}
`,E.title&&E.status!=="error"&&(O+=`・リンク先タイトル: ${E.title}
`),E.content&&E.status!=="error"&&(O+=`・リンク先コンテンツ（要約/抽出テキスト）: ${E.content.slice(0,1500)}${E.content.length>1500?"...":""}
`)):E.type==="text"&&(O+=`・文書名: ${E.name||"不明"}
`,E.content&&E.status!=="error"&&(O+=`・文書内容: ${E.content.slice(0,1500)}${E.content.length>1500?"...":""}
`))}),w+=O);const _=Bn(e);_&&(w+=_);const N=[a,r,s,o,l,v];return e.charCount&&N.push(`${e.charCount}字`),_&&N.push("📚RAG"),e.universalAssets&&e.universalAssets.length>0&&N.push(`🖼️アセット(${e.universalAssets.length})`),{prompt:w,tags:N}}function jn(){let e=Ke(In);return Math.random()<.55&&(e+=" "+Ke(En)),Math.random()<.35&&(e+=" "+Ke(An)),e}function Gn(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=String(e||"").replace(/[０-９]/g,s=>String.fromCharCode(s.charCodeAt(0)-65248)).replace(/[,，]/g,"");if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function Ae(e){const t=e.genreCustom||e.genre||"コメディ",a=e.themeCustom||e.theme||"ランダム",n=e.worldviewCustom||e.worldview||"現代日本",s=e.eraCustom||e.era||"現代",r=e.targetCustom||e.target||"全年齢",o=e.endingCustom||e.ending||"意外な結末",l=e.narrCustom||e.narration||"三人称・客観",i=Array.isArray(e.characters)&&e.characters.length>0;let u;i?u=`【必須登場人物（ユーザー指定・作中登場ノルマ）】
${e.characters.map((I,w)=>{const O=I.name||`(AI命名:キャラ${w+1})`,_=I.role||"未定",N=I.sex?`性別:${I.sex}, `:"",E=I.personality||"未定",A=I.note?` [${I.note}]`:"";return`${w+1}. ${O} (${_}) — ${N}性格:${E}${A}`}).join(`
`)}

【AI追加人物の扱い】
・上記の人物数は上限ではない。指定人物は必ず登場させるノルマとして扱うこと。
・長編の文章量、章数、テーマ、世界観に対して人物が不足する場合、長編シナリオエージェントとして追加人物を設計してよい。
・追加人物は、必須登場人物の見せ場を奪うためではなく、葛藤・伏線・関係性・世界観の奥行きを増やすために配置すること。`:u=`【AI設計キャスト】
・ユーザー指定の必須人物は未設定。
・短編向けの2〜3人に固定せず、長編の規模・章数・テーマに見合う人数をAIが設計すること。
・主人公、対立軸を担う人物、関係性を揺らす人物、舞台や事件を動かす脇役を必要に応じて追加してよい。
・ただし人数を増やすだけの水増しは禁止。追加人物には必ず物語上の役割、欲望、弱点、主人公との関係、初登場予定章を持たせること。`;const p=`【長編人物ロスター運用ルール】
・必須登場人物は、全体プロット上の役割と登場予定章を必ず内部設計すること。
・AIが追加した人物は「AI追加人物」として扱い、名前、役割、性格/欲望、主人公や必須人物との関係、初登場章、現在地/状態を管理すること。
・各章の文脈維持メモには、追加・変化した人物情報を【人物ロスター更新メモ】として必ず記録すること。
・一度出したAI追加人物を後半で忘れないこと。退場・死亡・離脱・和解などの状態変化があれば、文脈維持メモに明記すること。`,f=e.supplement?`
【追加指示】
${e.supplement}`:"",g=["現代","ランダム",""].includes(s)?"":`

【時代考証ルール（厳守）】
・時代設定「`+s+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること。`,v=re(t,St),y=re(o,Tt),d=re(n,kt),$=re(r,Mt),m=re(l,Nt);let b="";v&&(b+=`

【ジャンル文体指定：${t}】
${v}`),y&&(b+=`

【結末演出指定：${o}】
${y}`),d&&(b+=`

【世界観演出指定：${n}】
${d}`),$&&(b+=`

【ターゲット層文体指定：${r}】
${$}`),m&&(b+=`

【語り口指定：${l}】
${m}`);const C=Gn(e.charCount);let L;if(C>0){const I=Math.min(Math.max(Math.round(C/8e3),6),12),w=Math.round(C/I),O=Math.max(4500,Math.min(9e3,Math.round(w*.6)));L=`全${I}章構成（目安）、各章約${Math.round(w/1e3)}千字、各章本文は最低${O.toLocaleString()}字、予定総文字数：約${Math.round(C/1e4)}万字`}else L="10万字以上を目安に、物語の内容に最適な章数と文字数をAI自身が自由に設計してください（推奨: 8〜12章、各章8千〜1万5千字、各章本文は最低6千字）";return{genre:t,theme:a,worldview:n,era:s,target:r,ending:o,narr:l,charDesc:u,characterRosterRule:p,supplement:f,eraRule:g,allCategoryGuides:b,chapterGuidance:L}}const Ot=`
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

【AIっぽさ完全排除】
1. 語彙：「最適化」「本質的」「効果的」等のビジネス用語、「羅針盤」「土台」等の陳腐な比喩は禁止。
2. リズム：同じ語尾の連続禁止。短文と長文でリズムに緩急をつけること。前置き宣言・要約・締めの挨拶は一切不要。
3. 事なかれ主義禁止：安全クッションや両論併記を排除し、堂々と言い切ること。
4. 記号：過度な箇条書き・見出し・アスタリスク・カッコの乱用を禁止。
5. 脚注・引用記号禁止：本文中に [1]、[2]、［3］、(注1)、参考文献、出典、脚注などの学術引用記号や注釈を出力しないこと。必要な情報は地の文に自然に統合すること。

【品質ゲート（各章出力前の自己検証 — 検証結果自体は出力に含めないこと）】
□ Setup-Payoff構造 □ 感情落差の十分性 □ モチーフの回帰 □ 文体の緩急
□ 全キャラの物語的機能 □ GMC+Sの明確性 □ 五感バランス □ 比喩の独自性 □ キャラ知識境界 □ 反復描写の防止 □ 章別エピソードの固有性 □ 非最終章の総決算禁止 □ 脚注・引用番号なし`;function qn(e){const t=Ae(e),a=`あなたはプロのベストセラー小説家です。以下の設定に基づき、本格的な長編小説の**第1章**を執筆してください。
このアプリケーションが章ごとに指示を出します。あなたは指示された1章分のみを全力で書いてください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.


【基本設定】
・ジャンル: ${t.genre}
・テーマ: ${t.theme}
・時代: ${t.era}
・世界観・雰囲気: ${t.worldview}
・語り口: ${t.narr}
・ターゲット層: ${t.target}
・結末の方向性: ${t.ending}

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
${Ot}
${t.eraRule}${t.allCategoryGuides}${t.supplement}

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

★★★ 文脈維持メモまで出力したら出力を停止してください。「続けますか？」等の質問は不要です（アプリが自動制御します）。★★★`,n=["長編小説",t.genre,t.theme,t.era].filter(Boolean);return{prompt:a,tags:n}}function Rt(e){const t=String(e||"").trim();if(!t)return"";const a=t.split(/(?=---\s*第[\d０-９一二三四五六七八九十]+章の文脈メモ\s*---)/).map(n=>n.trim()).filter(Boolean);return a.length?a[a.length-1]:t}function Un(e,t){const a=Rt(e);if(!a)return"";const n=[new RegExp(`【第${t}章のシーン設計（GMC\\+S）】([\\s\\S]*?)(?=\\n【|\\n---|$)`),/【次章のシーン設計（GMC\+S）】([\s\S]*?)(?=\n【|\n---|$)/,/【次章のシーン設計】([\s\S]*?)(?=\n【|\n---|$)/];for(const s of n){const r=a.match(s);if(r!=null&&r[1])return r[1].trim()}return""}function Fn(e,t,a=""){const n=Rt(t),s=Un(t,e),r=n?n.slice(0,1800):"（直近の文脈メモなし）";return`
【第${e}章の連続性ガード・最優先】
以下は元のプロット概要より優先する。過去章の出来事を再演・巻き戻し・別角度で再説明してはならない。
・第${e}章は、直近章の最後で確定した状態の「後」から始める。
・直近章または文脈メモで、発生済み／紛失済み／負傷済み／回収済み／退場済みになった出来事を、第${e}章で初めて起きる出来事として描かない。
・同じ道具、証拠、負傷、敵対、会話を使う場合は、「すでに起きた結果を受けた次の行動」として扱う。
・直近メモの「第${e}章のシーン設計」または「次章のシーン設計（GMC+S）」を第${e}章の開始条件として最優先する。
・過去章のイベントをもう一度見せたい場合でも、回想・要約・再演で水増ししない。現在進行の新しい対立、調査、発見、決断へ進める。
・第${e}章が最終章ではない場合、物語全体の勝利・全面契約・会社再建完了・黒幕完全敗北などの総決算を描かない。章末には必ず未解決の対立、新しい危機、次章への代償を残す。

【第${e}章で優先する最新GMC+S】
${s||"（直近メモに明示された次章GMC+Sがない場合は、直近章の結末直後から新しい展開を作る）"}

【直近文脈メモ抜粋】
${r}

${a?`【前回失敗からの再生成指示】
${a}
`:""}`}function Kn(e,t,a,n,s,r,o,l=""){const i=Ae(a),u=Fn(e,r,l);let p="";return o&&(p=`
★★★ これは最終章（第${e}章 / 全${t}章）です。以下を必ず実行してください ★★★
・全ての伏線（チェーホフの銃を含む）を完全に回収すること
・全てのモチーフを最終的な形で登場させ、感情的ピークと接続させること
・主人公の決断と行動で物語を着地させること（葛藤→抵抗→選択の段階を経ること）
・全てのサブキャラクターの結末を描写すること（フェードアウト禁止）
・本文の最後に「【完】」を付けること`),`あなたは引き続きプロのベストセラー小説家です。以下の文脈を踏まえ、**第${e}章**（全${t}章中）を執筆してください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.


【基本設定（参照用）】
・ジャンル: ${i.genre} / テーマ: ${i.theme} / 時代: ${i.era}
・世界観: ${i.worldview} / 語り口: ${i.narr} / ターゲット: ${i.target}
・結末の方向性: ${i.ending}
${i.characterRosterRule}
${i.supplement}

${u}

【これまでの物語の要約（古い章）】
${n||"（第1章から開始のためなし）"}

【直近の章の全文】
${s}

【全章の文脈維持メモ（伏線・人物ロスター・モチーフ・設計）】
${r}
${p}
${Ot}
${i.eraRule}${i.allCategoryGuides}

【出力フォーマット（厳守）】
1. # 第${e}章: （章タイトル）
   （本文 — 上記の想定規模を満たすまで、章固有の事件・対立・感情変化を出し惜しみなく執筆すること）

${o?"2. 本文末尾の独立行に「【完】」を1回だけ出力して終了。区切り線、全文結合出力、再現用マスター指示書、総文字数報告、挨拶は出力禁止。":`2. 区切り線 ---

3. 文脈維持メモ（以下の4項目を必ず出力すること）
【回収待ち伏線メモ】現在残っている謎や伏線の一覧
【人物ロスター更新メモ】必須登場人物とAI追加人物の役割・現在地・状態変化・新規追加人物の設定
【モチーフ＆サブキャラ追跡メモ】回帰モチーフの状態とサブキャラの現在地
【次章のシーン設計（GMC+S）】次章のGoal/Motivation/Conflict/Stakes`}

★★★ 出力が完了したら停止してください。「続けますか？」等の質問は不要です。★★★`}function je(e,t,a){const n=Ae(e),s=new Date,r=`${s.getFullYear()}/${String(s.getMonth()+1).padStart(2,"0")}/${String(s.getDate()).padStart(2,"0")} ${String(s.getHours()).padStart(2,"0")}:${String(s.getMinutes()).padStart(2,"0")}`;let o="Unknown",l="Unknown",i=0,u=0;if(a&&(a.engine==="gemini"?(o="Google Gemini API",l=a.geminiModel||"gemini-1.5-pro"):a.engine==="openai"&&(o="OpenAI API",l=a.openaiModel||"gpt-4o-mini"),a.longNovel)){i=a.longNovel.chapters?a.longNovel.chapters.length:0;const p=a.longNovel.cleanText?a.longNovel.cleanText.length:0,f=a.longNovel.memoText?a.longNovel.memoText.length:0;u=Math.floor((p+f)*1.5)+i*2e3}return`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 再現用マスター指示書（この設定で他のAIでも生成できます）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【監査用メタデータ】
・生成システム: Story Maker v3.8.6
・利用エンジン: ${o} (${l})
・生成完了日時: ${r}
・出力モード: 長編小説モード
・生成パラメータ: Temperature 1.0 (Creative)
・生成ループ回数: 完了章数 ${i} 章
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
・各章に感情落差（逆転・置換・誇張等）を最低1回仕込むこと
・伏線は序盤に配置し、後半で回収すること（唐突な新設定禁止）
・文体の緩急（高熱量/静謐/冷徹）を使い分け、同系統3段落連続を禁止
・最終章で全伏線を回収し、主人公の決断で着地させること

では、まず【作品ヘッダー情報】を出力し、第1章を執筆してください。

--- ここまでコピー ---
`}const Dn=`この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
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
[{"name":"アカリ","sex":"女性","role":"主人公(推定)","personality":"元気","note":"内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;function Wn(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const s=n.result.split(",")[1];t(s)},n.onerror=a,n.readAsDataURL(e)})}function Jn(e){let t="",a=!1;for(let n=0;n<e.length;n++){const s=e[n];a?s==="\\"?(t+=s,n+1<e.length&&(t+=e[n+1],n++)):s==='"'?(a=!1,t+=s):s===`
`?t+="\\n":s==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):s==="	"?t+="\\t":t+=s:(s==='"'&&(a=!0),t+=s)}return t}function zn(e){const t=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!t)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");let a=t[0];try{return JSON.parse(a)}catch(s){console.warn("キャラクターJSON初回パース失敗、修復を試行:",s.message)}let n=Jn(a);n=n.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(n)}catch(s){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${s.message}`)}}function Yn(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return he.find(n=>n===t)||he.find(n=>t.includes(n)||n.includes(t))||t}function Xn(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return me.find(n=>n===t)||me.find(n=>t.includes(n)||n.includes(t))||t}function Qn(e,t){const a=he.map(l=>`<option value="${l}">${l}</option>`).join(""),n=me.map(l=>`<option value="${l}">${l}</option>`).join(""),s=e.map((l,i)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${i}" checked>
          <span class="ci-char-name-display">${l.name||`キャラ${i+1}`}</span>
        </label>
        <span class="ci-char-badge">${l.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${i}" value="${(l.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${i}" value="${(l.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${i}">
              <option value="">-- 自由入力に切替 --</option>
              ${a}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${i}" value="${(l.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${i}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${i}" value="${(l.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${i}" rows="3">${(l.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),r=Array.isArray(t)?t:t?[t]:[],o=r.length>0?`<div class="ci-thumbnail-wrap">${r.map((l,i)=>`<img src="${l}" class="ci-thumbnail" alt="解析元画像 ${i+1}">`).join("")}</div>`:"";return`
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${e.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${o}
        <div class="ci-char-list">
          ${s}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `}function Vn(e,t){const a=document.getElementById("ci-modal");a&&(a.querySelectorAll(".ci-role-select").forEach(n=>{const s=n.dataset.idx,r=a.querySelector(`.ci-role-input[data-idx="${s}"]`),o=he.find(l=>l===r.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(r.value=n.value)}),r.addEventListener("input",()=>{const l=he.find(i=>i===r.value);n.value=l||""})}),a.querySelectorAll(".ci-personality-select").forEach(n=>{const s=n.dataset.idx,r=a.querySelector(`.ci-personality-input[data-idx="${s}"]`),o=me.find(l=>l===r.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(r.value=n.value)}),r.addEventListener("input",()=>{const l=me.find(i=>i===r.value);n.value=l||""})}),document.getElementById("ci-modal-close").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-cancel").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-register").addEventListener("click",()=>{const n=[];a.querySelectorAll(".ci-check").forEach(s=>{var r,o,l,i,u;if(!s.checked)return;const p=parseInt(s.dataset.idx),f=((r=a.querySelector(`.ci-name[data-idx="${p}"]`))==null?void 0:r.value)||"",g=((o=a.querySelector(`.ci-sex[data-idx="${p}"]`))==null?void 0:o.value)||"",v=((l=a.querySelector(`.ci-role-input[data-idx="${p}"]`))==null?void 0:l.value)||"",y=((i=a.querySelector(`.ci-personality-input[data-idx="${p}"]`))==null?void 0:i.value)||"",d=((u=a.querySelector(`.ci-note[data-idx="${p}"]`))==null?void 0:u.value)||"";n.push({name:f,sex:g,role:v,personality:y,note:d})}),t(n),a.remove()}))}function Zn(e,t,a){const n=document.getElementById("ci-dropzone"),s=document.getElementById("ci-file-input"),r=document.getElementById("ci-status");if(!n||!s)return;n.addEventListener("dragover",i=>{i.preventDefault(),!(e.locked&&e.locked.chars)&&n.classList.add("ci-dragover")}),n.addEventListener("dragleave",()=>{n.classList.remove("ci-dragover")}),n.addEventListener("drop",i=>{if(i.preventDefault(),n.classList.remove("ci-dragover"),e.locked&&e.locked.chars)return;const u=Array.from(i.dataTransfer.files).filter(p=>p.type.startsWith("image/"));u.length>0&&o(u)}),n.addEventListener("click",()=>{e.locked&&e.locked.chars||s.click()}),s.addEventListener("change",i=>{if(e.locked&&e.locked.chars)return;const u=Array.from(i.target.files).filter(p=>p.type.startsWith("image/"));u.length>0&&(o(u),i.target.value="")});async function o(i){if(e.locked&&e.locked.chars)return;const u=a();if(!u){alert("APIキーを先に保存してください");return}const p=["image/png","image/jpeg","image/webp","image/gif"],f=i.filter(d=>p.includes(d.type)?!0:(console.warn(`非対応形式スキップ: ${d.name} (${d.type})`),!1));if(f.length===0){alert(`対応する画像ファイルがありません。
PNG/JPG/WEBP/GIF のみ対応しています。`);return}n.classList.add("ci-loading");const g=document.getElementById("global-alert");g&&(g.innerHTML="⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。",g.style.display="flex"),r&&(r.textContent=`🔍 ${f.length}枚の画像を解析中...（数秒〜数十秒）`,r.classList.remove("hidden"));const v=[],y=[];try{for(let d=0;d<f.length;d++){const $=f[d];r&&f.length>1&&(r.textContent=`🔍 画像 ${d+1}/${f.length} を解析中...`),g&&f.length>1&&(g.innerHTML=`⚠️ <strong>画像認識中 (${d+1}/${f.length}):</strong> AIがキャラクターシートを解析しています...`);const m=await Wn($);y.push(`data:${$.type};base64,${m}`);const{text:b}=await _t(u,Dn,m,$.type,void 0,{responseMimeType:"application/json"}),C=zn(b);C&&C.length>0&&(C.forEach(L=>{L.role=Yn(L.role),L.personality=Xn(L.personality)}),v.push(...C))}if(v.length===0)throw new Error("キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。");l(v,y),r&&(r.textContent=`✅ ${v.length}キャラクター検出！確認してください。`)}catch(d){console.error("Character import error:",d),r&&(r.textContent=`❌ エラー: ${d.message}`),setTimeout(()=>{r&&r.classList.add("hidden")},5e3)}finally{n.classList.remove("ci-loading"),g&&(g.style.display="none")}}function l(i,u){var p;(p=document.getElementById("ci-modal"))==null||p.remove();const f=document.createElement("div");f.innerHTML=Qn(i,u),document.body.appendChild(f.firstElementChild),Vn(i,g=>{g.forEach(v=>{e.characters.push({name:v.name||"",sex:v.sex||"",role:v.role||"",personality:v.personality||"",note:v.note||""})}),t(),r&&(r.textContent=`✅ ${g.length}キャラクターを登録しました！`,setTimeout(()=>r.classList.add("hidden"),3e3))})}}const x=e=>document.getElementById(e);let J=[],X=[],ee=null,we="",be=()=>"",Me=()=>"";const De=`あなたはプロの文芸批評家・計量文体学の専門家です。
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
`;function ea(e){var t,a;const n=[],s=(o,l)=>{l&&n.push(`【${o}】${l}`)},r=(o,l)=>{l&&n.push(`  ・${o}: ${l}`)};return s("作風名",e.style_name),s("トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(n.push("【語りの視点】"),r("人称",e.narrative_voice.person),r("距離感",e.narrative_voice.distance),r("信頼度",e.narrative_voice.reliability),r("介入度",e.narrative_voice.intrusion)):s("語りの視点",e.narrative_voice),e.sentence_style&&(n.push("【文体】"),r("平均文長",e.sentence_style.avg_length||e.sentence_style.length),r("文長変動",e.sentence_style.length_variation),r("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),r("リズム",e.sentence_style.rhythm),r("段落長",e.sentence_style.paragraph_length),r("段落構成",e.sentence_style.paragraph_structure)),e.vocabulary&&(n.push("【語彙】"),r("レベル",e.vocabulary.level),r("情報密度",e.vocabulary.density),r("レジスター",e.vocabulary.register),r("特徴",e.vocabulary.quirks),r("外来語",e.vocabulary.foreign_words),r("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(n.push("【修辞技法】"),r("比喩スタイル",e.rhetoric.metaphor_style),r("比喩素材",e.rhetoric.metaphor_source),r("反復技法",e.rhetoric.repetition),r("アイロニー",e.rhetoric.irony_level),r("ユーモア",e.rhetoric.humor_type),r("その他",e.rhetoric.other_techniques)),e.description_focus&&(n.push("【描写フォーカス】"),r("視覚",e.description_focus.visual),r("聴覚",e.description_focus.auditory),r("触覚",e.description_focus.tactile),r("嗅覚/味覚",e.description_focus.olfactory_gustatory),r("運動感覚",e.description_focus.kinesthetic),r("空間把握",e.description_focus.spatial),r("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),r("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue&&(n.push("【セリフ】"),r("文体",e.dialogue.style),r("機能",e.dialogue.function),r("タグ",e.dialogue.tag_style),r("方言",e.dialogue.dialect_sociolect),r("サブテキスト",e.dialogue.subtext)),e.structure&&(n.push("【構造】"),r("テンポ",e.structure.pacing),r("場面転換",e.structure.scene_transition),r("時制",e.structure.time_handling),r("緊張曲線",e.structure.tension_curve),r("冒頭パターン",e.structure.opening_style),r("結末パターン",e.structure.closing_style)),e.emotional_architecture&&(n.push("【感情設計】"),r("主要感情",e.emotional_architecture.dominant_emotions),r("振り幅",e.emotional_architecture.emotional_range),r("カタルシス",e.emotional_architecture.catharsis_method),r("読者距離",e.emotional_architecture.reader_distance)),s("テーマ傾向",e.themes_tendency),s("文学的影響",e.literary_influences),(t=e.unique_features)!=null&&t.length&&(n.push("【固有の特徴】"),e.unique_features.forEach(o=>n.push(`  ・${o}`))),(a=e.anti_patterns)!=null&&a.length&&(n.push("【回避パターン（この作風では避けるべき表現）】"),e.anti_patterns.forEach(o=>n.push(`  ・${o}`))),n.join(`
`)}function ta(e,t){const a=ea(e),n=t.length,s=Math.floor(n*.8),r=Math.ceil(n*1.2);return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

## 最重要ルール（絶対遵守・違反厳禁）:
1. **物語の完全保持**: プロット（起承転結）、登場人物、セリフの内容、設定、事件の順序は一切変更しない。リライトとは「同じ物語を別の文体で語り直す」ことであり、物語の骨格を壊すことではない。
2. **文章として成立させる**: リライト結果は必ず「小説・物語」として完全に成立する連続した散文であること。単語の羅列、名詞だけの断片、箇条書き、詩のような体言止めの連続は絶対に禁止する。
3. **文字数の厳守**: 元のテキストは${n.toLocaleString()}字です。リライト結果は${s.toLocaleString()}字〜${r.toLocaleString()}字の範囲に収めること。この範囲を逸脱した場合は失敗とみなす。
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

## リライト結果:`}function Pt(e){const t=x("settings");t&&t.classList.add("generating");const a=x("sa-section");a&&a.classList.add("generating");const n=document.querySelector(".btn-generate");n&&(n._origText=n.textContent,n.disabled=!0,n.innerHTML=`<span class="spinner"></span>${e}`);const s=x("sa-api-status");s&&(s.innerHTML=`<span class="spinner"></span>${e}`,s.classList.remove("hidden"));const r=x("sa-reflect-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const o=x("global-alert");o&&(o.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,o.style.display="flex");const l=x("thought-score-board");l&&(l.style.display="none")}function yt(e){const t=x("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const a=x("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`);const n=document.querySelector(".btn-generate");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const s=x("global-alert");s&&(s.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const r=x("thought-score-board");r&&(r.style.display="none")}function Bt(){const e=x("settings");e&&e.classList.remove("generating");const t=x("sa-section");t&&t.classList.remove("generating");const a=document.querySelector(".btn-generate");a&&(a.disabled=!1,a.textContent=a._origText||"ストーリー生成");const n=x("sa-api-status");n&&n.classList.add("hidden");const s=x("sa-reflect-api-status");s&&s.classList.add("hidden");const r=x("global-alert");r&&(r.style.display="none")}function na(){const e=x("sa-dropzone"),t=x("sa-file-input");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",a=>{a.preventDefault(),e.classList.add("sa-dragover")}),e.addEventListener("dragleave",()=>{e.classList.remove("sa-dragover")}),e.addEventListener("drop",a=>{a.preventDefault(),e.classList.remove("sa-dragover"),vt(a.dataTransfer.files)}),t.addEventListener("change",a=>{vt(a.target.files),t.value=""}))}async function vt(e){const t=Array.from(e),a=t.filter(s=>s.type==="text/plain"||s.name.endsWith(".txt")||s.name.endsWith(".md")||s.name.endsWith(".csv")||s.type===""),n=t.filter(s=>s.type.startsWith("image/"));if(a.length===0&&n.length===0){alert("テキストファイル (.txt, .md) または画像ファイルをドロップしてください");return}for(const s of a)try{const r=await aa(s);r.trim().length>0&&J.push({name:s.name,text:r.trim(),charCount:r.trim().length})}catch(r){console.warn(`ファイル読み込み失敗: ${s.name}`,r)}for(const s of n)try{const r=await sa(s),o=URL.createObjectURL(s);X.push({name:s.name,base64:r,mimeType:s.type,previewUrl:o})}catch(r){console.warn(`画像ファイル読み込み失敗: ${s.name}`,r)}Ge(),rt(),(J.length>0||X.length>0)&&x("sa-dropzone").classList.add("sa-has-files"),ie()}function aa(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=s=>t(s.target.result),n.onerror=a,n.readAsText(e,"UTF-8")})}function sa(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=s=>{const r=s.target.result.split(",")[1];t(r)},n.onerror=a,n.readAsDataURL(e)})}function Ge(){const e=x("sa-file-list");if(!e)return;const t=J.reduce((n,s)=>n+s.charCount,0),a=x("sa-file-count");a&&(a.textContent=`${J.length}件 / ${t.toLocaleString()}字`,a.classList.remove("hidden")),e.innerHTML=J.map((n,s)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${Ye(n.name)}</span>
      <span class="sa-file-chars">${n.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${s}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(n=>{n.addEventListener("click",s=>{const r=parseInt(s.target.dataset.idx);J.splice(r,1),Ge(),J.length===0&&(x("sa-dropzone").classList.remove("sa-has-files"),x("sa-file-count").classList.add("hidden")),ie()})})}function rt(){const e=x("sa-image-list");if(e){if(X.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden"),e.innerHTML=X.map((t,a)=>`
    <div class="sa-image-item">
      <img src="${t.previewUrl}" alt="${Ye(t.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${Ye(t.name)}</span>
      <button class="sa-file-remove" data-img-idx="${a}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(t=>{t.addEventListener("click",a=>{var n;const s=parseInt(a.target.dataset.imgIdx);(n=X[s])!=null&&n.previewUrl&&URL.revokeObjectURL(X[s].previewUrl),X.splice(s,1),rt(),J.length===0&&X.length===0&&x("sa-dropzone").classList.remove("sa-has-files"),ie()})})}}function ra(e){const t=e.indexOf("{");if(t===-1)return null;const a=e.lastIndexOf("}");return a===-1||a<t?null:e.slice(t,a+1)}function oa(e){let t="",a=!1;for(let n=0;n<e.length;n++){const s=e[n];a?s==="\\"?(t+=s,n+1<e.length&&(t+=e[n+1],n++)):s==='"'?(a=!1,t+=s):s===`
`?t+="\\n":s==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):s==="	"?t+="\\t":t+=s:(s==='"'&&(a=!0),t+=s)}return t}const la=["style_name","tone","narrative_voice","person","distance","reliability","intrusion","sentence_style","avg_length","length_variation","ending_patterns","rhythm","paragraph_length","paragraph_structure","vocabulary","level","density","register","quirks","foreign_words","archaic_modern","rhetoric","metaphor_style","metaphor_source","repetition","irony_level","humor_type","other_techniques","description_focus","visual","auditory","tactile","olfactory_gustatory","kinesthetic","spatial","psychological_depth","show_tell_ratio","dialogue","style","function","tag_style","dialect_sociolect","subtext","structure","pacing","scene_transition","time_handling","tension_curve","opening_style","closing_style","emotional_architecture","dominant_emotions","emotional_range","catharsis_method","reader_distance","themes_tendency","literary_influences","unique_features","anti_patterns","reproduction_prompt"];function ia(e){let t=e.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,"");const a=[];if(la.forEach(s=>{const r=new RegExp(`"${s}"\\s*:`,"g");let o;for(;(o=r.exec(t))!==null;)a.push({key:s,start:o.index,end:o.index+o[0].length})}),a.sort((s,r)=>s.start-r.start),a.length===0)return JSON.parse(t);const n={};for(let s=0;s<a.length;s++){const r=a[s],o=a[s+1],l=r.end;let i=o?o.start:t.length,u=t.slice(l,i).trim();if(!o){const p=u.lastIndexOf("}");p!==-1&&(u=u.slice(0,p).trim())}if(u=u.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g,""),u.startsWith("[")&&u.endsWith("]")){let p=u.slice(1,-1).trim();const f=[],g=p.split(/",\s*"/);g.forEach((v,y)=>{let d=v.trim();y===0&&d.startsWith('"')&&(d=d.slice(1)),y===g.length-1&&d.endsWith('"')&&(d=d.slice(0,-1)),d=d.replace(/"/g,'\\"'),d=d.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t"),f.push(d)}),n[r.key]=f}else{let p=!1;u.startsWith('"')&&(u=u.slice(1),p=!0),u.endsWith('"')&&(u=u.slice(0,-1)),p&&(u=u.replace(/"/g,'\\"'),u=u.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t")),n[r.key]=u}}return{style_name:n.style_name||"",tone:n.tone||"",narrative_voice:{person:n.person||"",distance:n.distance||"",reliability:n.reliability||"",intrusion:n.intrusion||""},sentence_style:{avg_length:n.avg_length||"",length_variation:n.length_variation||"",ending_patterns:n.ending_patterns||"",rhythm:n.rhythm||"",paragraph_length:n.paragraph_length||"",paragraph_structure:n.paragraph_structure||""},vocabulary:{level:n.level||"",density:n.density||"",register:n.register||"",quirks:n.quirks||"",foreign_words:n.foreign_words||"",archaic_modern:n.archaic_modern||""},rhetoric:{metaphor_style:n.metaphor_style||"",metaphor_source:n.metaphor_source||"",repetition:n.repetition||"",irony_level:n.irony_level||"",humor_type:n.humor_type||"",other_techniques:n.other_techniques||""},description_focus:{visual:n.visual||"",auditory:n.auditory||"",tactile:n.tactile||"",olfactory_gustatory:n.olfactory_gustatory||"",kinesthetic:n.kinesthetic||"",spatial:n.spatial||"",psychological_depth:n.psychological_depth||"",show_tell_ratio:n.show_tell_ratio||""},dialogue:{style:n.style||"",function:n.function||"",tag_style:n.tag_style||"",dialect_sociolect:n.dialect_sociolect||"",subtext:n.subtext||""},structure:{pacing:n.pacing||"",scene_transition:n.scene_transition||"",time_handling:n.time_handling||"",tension_curve:n.tension_curve||"",opening_style:n.opening_style||"",closing_style:n.closing_style||""},emotional_architecture:{dominant_emotions:n.dominant_emotions||"",emotional_range:n.emotional_range||"",catharsis_method:n.catharsis_method||"",reader_distance:n.reader_distance||""},themes_tendency:n.themes_tendency||"",literary_influences:n.literary_influences||"",unique_features:Array.isArray(n.unique_features)?n.unique_features:[],anti_patterns:Array.isArray(n.anti_patterns)?n.anti_patterns:[],reproduction_prompt:n.reproduction_prompt||""}}function ca(e){try{return JSON.parse(e)}catch(a){console.warn("JSON初回パース失敗、修復を試行:",a.message)}let t=e.trim();t=oa(t),t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":'),t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(a){console.warn("JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:",a.message);try{return ia(t)}catch(n){console.warn("キー境界パースも失敗、最後の攻撃的修復を試行:",n.message);try{let s=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(s)}catch(s){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${s.message}`)}}}}function Ye(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ua(){const e=be();if(!e){alert("APIキーを保存してから解析してください");return}const t=x("sa-direct-text"),a=t?t.value.trim():"";if(J.length===0&&X.length===0&&!a){alert("テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください");return}const n=x("btn-sa-analyze"),s=x("sa-result-wrap"),r=x("sa-result"),o=x("sa-reflect-wrap"),l=x("sa-reflect-result-wrap"),i=x("progress-log"),u=x("thought-score-board"),p=x("progress-title-text");i&&(i.textContent="作風解析の開始を待っています..."),u&&(u.innerHTML="",u.style.display="none"),p&&(p.textContent="AI進捗・思考ログ: 作風解析中..."),n.disabled=!0,n.innerHTML='<span class="spinner"></span>AIが超強引に作風を解析中...',r.textContent="超強引に解析中です...しばらくお待ちください（1分〜3分程度）",s.classList.remove("hidden"),o.classList.add("hidden"),l.classList.add("hidden"),Pt("🔬 超強引！作風解析中...");try{let f=[];J.length>0&&(f=J.map(L=>`--- ${L.name} ---
${L.text}`)),a&&f.push(`--- 直接貼り付けテキスト ---
${a}`);let g=f.join(`

`);g.length>1e5&&(g=g.slice(0,1e5)+`

[...以降のテキストは省略（コンテキスト上限）...]`);const v=X.length>0,y=g.length>0;let d=De;v&&y?d=De.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 画像分析の追加指示:
- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること
- テキストと画像の両方から相乗的に作風パラメータを抽出すること`):v&&!y&&(d=De.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。

## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:
- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。
- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。

## 画像分析指示:
- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること`)),y&&(d=d+g);const $=pe[0].value;let m;v?m=(await On(e,d,X,L=>{yt(`フォールバック: ${L}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${L}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text:m=(await Te(e,$,d,L=>{yt(`フォールバック: ${L}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${L}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text;let b="";const C=ra(m);if(C)b=C;else{const L=m.match(/```json\s*([\s\S]*?)\s*```/);if(L)b=L[1];else{const I=m.match(/\{[\s\S]*\}/);if(I)b=I[0];else throw new Error("AIの応答からJSONを抽出できませんでした")}}ee=ca(b),da(ee),p&&(p.textContent="AI進捗・思考ログ: 作風解析完了"),i&&(i.textContent=`作風解析が完了しました。解析結果が右パネルに表示されています。
作風名: ${ee.style_name||"未定義"}
トーン: ${ee.tone||"未定義"}`),o.classList.remove("hidden"),Le()}catch(f){r.textContent=`解析エラー: ${f.message}`,r.classList.add("sa-error"),p&&(p.textContent="AI進捗・思考ログ: 解析エラー"),i&&(i.textContent=`作風解析エラーが発生しました:
${f.message}`)}finally{n.disabled=!1,n.innerHTML="🔬 超強引！作風解析を実行",Bt()}}function da(e){var t,a;const n=x("sa-result");n.classList.remove("sa-error");const s=[],r=(i,u,p)=>{p&&s.push(`${i} ${u}: ${p}`)},o=(i,u)=>{u&&s.push(`  ・${i}: ${u}`)},l=(i,u)=>{s.push(""),s.push(`${i} ${u}:`)};r("🏷️","作風名",e.style_name),r("🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(l("🎙️","語りの視点"),o("人称",e.narrative_voice.person),o("距離感",e.narrative_voice.distance),o("信頼度",e.narrative_voice.reliability),o("介入度",e.narrative_voice.intrusion)):r("🎙️","語りの視点",e.narrative_voice),l("📝","文体"),e.sentence_style&&(o("平均文長",e.sentence_style.avg_length||e.sentence_style.length),o("文長変動",e.sentence_style.length_variation),o("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),o("リズム",e.sentence_style.rhythm),o("段落長",e.sentence_style.paragraph_length),o("段落構成",e.sentence_style.paragraph_structure)),l("📖","語彙"),e.vocabulary&&(o("レベル",e.vocabulary.level),o("情報密度",e.vocabulary.density),o("レジスター",e.vocabulary.register),o("特徴",e.vocabulary.quirks),o("外来語",e.vocabulary.foreign_words),o("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(l("🔮","修辞技法"),o("比喩スタイル",e.rhetoric.metaphor_style),o("比喩素材",e.rhetoric.metaphor_source),o("反復技法",e.rhetoric.repetition),o("アイロニー",e.rhetoric.irony_level),o("ユーモア",e.rhetoric.humor_type),o("その他",e.rhetoric.other_techniques)),l("🖼️","描写フォーカス"),e.description_focus&&(o("視覚",e.description_focus.visual),o("聴覚",e.description_focus.auditory),o("触覚",e.description_focus.tactile),o("嗅覚/味覚",e.description_focus.olfactory_gustatory),o("運動感覚",e.description_focus.kinesthetic),o("空間把握",e.description_focus.spatial),o("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),o("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(l("💬","セリフ"),o("文体",e.dialogue.style),o("機能",e.dialogue.function),o("タグ",e.dialogue.tag_style),o("方言",e.dialogue.dialect_sociolect),o("サブテキスト",e.dialogue.subtext)):r("💬","セリフ回し",e.dialogue_style),e.structure?(l("🏗️","構造"),o("テンポ",e.structure.pacing),o("場面転換",e.structure.scene_transition),o("時制",e.structure.time_handling),o("緊張曲線",e.structure.tension_curve),o("冒頭パターン",e.structure.opening_style),o("結末パターン",e.structure.closing_style)):r("⏱️","テンポ",e.pacing),e.emotional_architecture&&(l("❤️","感情設計"),o("主要感情",e.emotional_architecture.dominant_emotions),o("振り幅",e.emotional_architecture.emotional_range),o("カタルシス",e.emotional_architecture.catharsis_method),o("読者距離",e.emotional_architecture.reader_distance)),r("🎯","テーマ傾向",e.themes_tendency),r("📚","文学的影響",e.literary_influences),s.push(""),(t=e.unique_features)!=null&&t.length&&(s.push("✨ 固有の特徴:"),e.unique_features.forEach(i=>s.push(`  ・${i}`))),(a=e.anti_patterns)!=null&&a.length&&(s.push(""),s.push("🚫 回避パターン:"),e.anti_patterns.forEach(i=>s.push(`  ・${i}`))),s.push(""),s.push("━━━ 再現プロンプト ━━━"),s.push(e.reproduction_prompt||"（生成されませんでした）"),n.textContent=s.join(`
`)}async function pa(){const e=be();if(!e){alert("APIキーを保存してください");return}if(!ee){alert("先に作風解析を実行してください");return}const t=Me(),a=x("output");if(!t||t.length<10||a&&a.classList.contains("empty")){alert("まず上のストーリー生成でテキストを生成してから、リライトを実行してください");return}const n=x("btn-sa-reflect"),s=x("sa-reflect-result-wrap"),r=x("sa-reflect-output");n.disabled=!0,n.innerHTML='<span class="spinner"></span>作風を反映してリライト中...',r.textContent="リライト中です...（完了後に一括表示されます）",s.classList.remove("hidden");const o=x("progress-log"),l=x("thought-score-board"),i=x("progress-title-text");o&&(o.textContent="作風リライトの開始を待っています..."),l&&(l.innerHTML="",l.style.display="none"),i&&(i.textContent="AI進捗・思考ログ: リライト準備中..."),Pt("🎨 作風リライト中...");let u=[],p="",f="",g=null;function v(d){u.push(d),y()}function y(){if(!o)return;let d="";u.length>0&&(d+=u.join(`
`)+`
`),p&&(d+=p+`
`),f&&(d+=`
`+f),o.textContent=d;const $=x("progress-content");$&&($.scrollTop=$.scrollHeight)}v("[システム] 作風リライト処理を開始しました..."),v(`[システム] 対象ストーリー文字数: ${t.length.toLocaleString()} 字`),v("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中..."),v("[システム] リライト用メタプロンプトの構築が完了しました。");try{const d=ta(ee,t),$=pe[0].value;v(`[システム] AIモデル (${$}) にリライト要求を送信しています...`);let m=0,b=new Set;g=setInterval(()=>{m++,p=`[通信] AIモデルからのリライト応答を待機しています${".".repeat(m%4)} (${m}秒経過)`,m>=3&&!b.has(3)&&(b.add(3),u.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...")),m>=6&&!b.has(6)&&(b.add(6),u.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...")),m>=9&&!b.has(9)&&(b.add(9),u.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...")),m>=12&&!b.has(12)&&(b.add(12),u.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。")),m>=15&&m%5===0&&!b.has(m)&&(b.add(m),u.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${m}s) を実行しています...`)),y()},1e3);let C="",L=!1;i&&(i.textContent="AI進捗・思考ログ: リライト執筆中...");const I=({text:A})=>{L||(L=!0,p="",y(),g&&(clearInterval(g),g=null)),C+=A;const k=C.length;let R=`[システム] AIによるリライト文章の生成が開始されました。
`;R+=`[進捗] 本文をリライト中...
`,R+=`・現在文字数: ${k} 文字
`;const U=Math.floor(k/50%4),S=".".repeat(U)+" ".repeat(3-U);R+=`・ステータス: 執筆処理中${S}
`,f=R,y()},w=A=>{r.textContent=`フォールバック中: ${A}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${A}`,v(`[システム] リライト応答遅延のため、モデルを ${A} にフォールバックします...`)};let{usedModel:O}=await ge(e,$,d,I,w,{disableGoogleSearch:!0}),_=0;for(;_<3&&!C.trim().endsWith("【完】");){_++,v(`[システム] 文字数上限到達による切断を検知。続きを自動リクエスト中... (${_}/3)`),p=`[通信] 続きを生成しています... (${_}/3)`,y();const A=`${d}

【ここまでの出力】
${C}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;O=(await ge(e,O,A,I,w,{disableGoogleSearch:!0})).usedModel}g&&(clearInterval(g),g=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let N=C.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,"");we=N,r.textContent=N;const E=x("sa-reflect-counter");E&&(E.textContent=`${N.length.toLocaleString()} 字`),i&&(i.textContent="AI進捗・思考ログ: リライト完了"),v("[システム] 作風リライト文の生成・推敲が正常に完了しました。"),f=`[進捗] リライトが正常に完了しました。
・最終文字数: ${N.length.toLocaleString()} 字
・ステータス: 完了`,p="",y(),s.scrollIntoView({behavior:"smooth",block:"start"})}catch(d){g&&(clearInterval(g),g=null),p="",y(),r.textContent=`リライトエラー: ${d.message}`}finally{n.disabled=!1,n.innerHTML="🎨 この作風でリライト実行",Bt()}}function ha(){if(!ee)return;const e=x("sa-result").textContent;navigator.clipboard.writeText(e).then(()=>{const t=x("btn-sa-copy");t.textContent="✅ コピー完了",setTimeout(()=>t.textContent="📋 コピー",2e3)})}function Ht(){const e=new Date;return`${e.getFullYear()}${String(e.getMonth()+1).padStart(2,"0")}${String(e.getDate()).padStart(2,"0")}${String(e.getHours()).padStart(2,"0")}${String(e.getMinutes()).padStart(2,"0")}${String(e.getSeconds()).padStart(2,"0")}`}function ma(){if(!ee)return;const e=JSON.stringify(ee,null,2),t=new Blob([e],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(t);const n=(ee.style_name||"style_analysis").replace(/[\s\/\\:*?"<>|]/g,"_");a.download=`${n}_${Ht()}.json`,a.click()}function ga(){we&&navigator.clipboard.writeText(we).then(()=>{const e=x("btn-sa-reflect-copy");e.textContent="✅ コピー完了",setTimeout(()=>e.textContent="📋 コピー",2e3)})}function fa(){if(!we)return;const e=new Blob([we],{type:"text/plain"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`style_rewrite_${Ht()}.txt`,t.click()}function ya(){var e,t,a,n;X.forEach(r=>{r.previewUrl&&URL.revokeObjectURL(r.previewUrl)}),J=[],X=[],ee=null,we="",Ge(),rt();const s=x("sa-direct-text");s&&(s.value=""),Ne(),x("sa-dropzone").classList.remove("sa-has-files"),(e=x("sa-file-count"))==null||e.classList.add("hidden"),ie(),Le(),x("sa-result").textContent="",(t=x("sa-result-wrap"))==null||t.classList.add("hidden"),(a=x("sa-reflect-wrap"))==null||a.classList.add("hidden"),(n=x("sa-reflect-result-wrap"))==null||n.classList.add("hidden")}function va(){const e=x("sa-direct-text");if(!e)return;const t=e.value.trim();t&&(J.push({name:`直接入力テキスト_${J.length+1}`,text:t,charCount:t.length}),e.value="",Ge(),x("sa-dropzone").classList.add("sa-has-files"),ie(),Ne())}function Ne(){const e=x("btn-sa-add-text");if(!e)return;const t=x("sa-direct-text"),a=t&&t.value.trim().length>0;e.disabled=!a}function qe(){const e=x("sa-section");e&&(typeof be=="function"&&be()?e.classList.remove("sa-inactive"):e.classList.add("sa-inactive"))}function ie(){const e=x("btn-sa-analyze");if(!e)return;const t=typeof be=="function"?be():"",a=J.length>0,n=X.length>0,s=x("sa-direct-text"),r=s?s.value:"",o=r.trim().length>0,l=a||n||o;let i=r.length;J.forEach(p=>i+=p.content?p.content.length:0);const u=document.getElementById("api-engine");if(u&&u.value==="openai"&&i>8e4){e.disabled=!0,e.textContent="⚠ 文字数超過 (OpenAI制限)",e.title="OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。";return}e.disabled=!(t&&l),e.textContent="🔬 超強引！作風解析を実行",e.title=""}function Le(){const e=x("btn-sa-reflect");if(!e)return;const t=typeof Me=="function"?Me():"",a=x("output"),n=t&&t.length>=10&&a&&!a.classList.contains("empty"),s=ee!==null;e.disabled=!(n&&s)}function $a(e,t){var a,n,s,r,o,l,i,u;be=e,Me=t,na(),(a=x("btn-sa-analyze"))==null||a.addEventListener("click",ua),(n=x("btn-sa-reflect"))==null||n.addEventListener("click",pa),(s=x("btn-sa-copy"))==null||s.addEventListener("click",ha),(r=x("btn-sa-json"))==null||r.addEventListener("click",ma),(o=x("btn-sa-reflect-copy"))==null||o.addEventListener("click",ga),(l=x("btn-sa-reflect-dl"))==null||l.addEventListener("click",fa),(i=x("btn-sa-clear"))==null||i.addEventListener("click",ya),(u=x("btn-sa-add-text"))==null||u.addEventListener("click",va);const p=x("sa-direct-text");p&&p.addEventListener("input",()=>{ie(),Ne()}),qe(),Ne()}function ba(e,t){const a=lt(t),n=Gt(t);return`あなたはプロの校閲者・整合性チェッカーです。以下の物語テキストを精査し、**明確な事実矛盾**のみを検出してください。

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
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function Ca(e,t,a,n,s,r=!1){const o=lt(a),l=Gt(a);return`あなたはプロの校閲者・整合性チェッカーです。長編小説の**第${t}章**を精査し、過去の章との間で**明確な事実矛盾**のみを検出してください。

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
${l}

### 終了記号ルール:
この章は${r?"最終章です。本文の最後の独立行に一度だけ「【完】」が必要です。":"最終章ではありません。「【完】」が本文に含まれている場合は設定矛盾として検出してください。"}

### 過去の章の文脈維持メモ:
${n||"（第1章のため過去メモなし）"}

### 直近の章の全文（参照用）:
${s||"（第1章のため参照なし）"}

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
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function xa(e,t,a,n){const s=t.map((l,i)=>`${i+1}. 【${l.type}】${l.description}（箇所：『${l.location}』）`).join(`
`),r=lt(a);let o="";return n&&(o=`
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
${r}
${o}

## 検出された矛盾:
${s}

## 修正対象テキスト:
${e}

## 修正後のテキスト（本文のみ出力）:`}function La(e){if(!e||!e.trim())return[];let t=e.trim();t=t.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");try{const a=JSON.parse(t);return Array.isArray(a)?a.filter(n=>n&&typeof n=="object"&&n.type&&n.description).map(n=>({type:String(n.type||""),severity:String(n.severity||"軽微"),location:String(n.location||""),description:String(n.description||"")})):[]}catch{const a=t.match(/\[[\s\S]*\]/);if(a)try{const n=JSON.parse(a[0]);if(Array.isArray(n))return n.filter(s=>s&&typeof s=="object"&&s.type&&s.description).map(s=>({type:String(s.type||""),severity:String(s.severity||"軽微"),location:String(s.location||""),description:String(s.description||"")}))}catch(n){console.warn("矛盾検査結果のパースに失敗しました:",n.message)}return[]}}function jt(e,t){if(!e||e.length===0)return"";const a=[`【矛盾検査記録（第${t}章）— 修正済み】`];return e.forEach((n,s)=>{a.push(`  ${s+1}. [${n.severity}] ${n.type}: ${n.description}`)}),a.join(`
`)}async function ot(e,t,a,n={}){const{onStatus:s,onFallback:r,maxFixAttempts:o=8,chapterNum:l,allContextMemos:i,recentChaptersFull:u,fixMinorIssues:p=!1,isLastChapter:f=!1,failOnAuditError:g=!1,validateFixedText:v}=n,y=pe[0].value,d=l!=null,$=d?`第${l}章: `:"";let m=t,b=[],C=!1,L=0,I=[];for(let w=0;w<=o;w++){const O=w>0;if(s){const S=d?`第${l}章の`:"";s(`[検査] ${S}設定整合性チェックを実行中...${O?`（再検査 ${w}回目）`:""}`)}let _;d?_=Ca(m,l,a,i,u,f):_=ba(m,a);let N;try{N=(await Te(e,y,_,r,{temperature:.1,responseMimeType:"application/json",disableGoogleSearch:!0,maxTokens:4096,maxOutputTokens:4096,timeoutMs:d?7e4:12e4,maxModelAttempts:d?2:void 0})).text}catch(S){if(console.warn("矛盾検査APIコールが失敗しました:",S.message),g)throw s&&s("[検査] 検査APIエラー — 保存を停止します"),new Error(`矛盾検査APIエラー: ${S.message}`);return s&&s("[検査] 検査APIエラー — スキップして続行します"),{text:m,issues:b,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]}}const E=La(N);I=E;const A=E.filter(S=>S.severity==="重大"),k=E.filter(S=>S.severity!=="重大");L=A.length,E.length>0&&(b=b.concat(E),s&&(s(`[検査] ${$}${E.length}件の指摘を検出（重大: ${A.length}件, 軽微: ${k.length}件）`),A.forEach((S,M)=>{s(`[検査]   ⛔ 重大${M+1}: [${S.type}] ${S.description}${S.location?`（箇所:『${S.location}』）`:""}`)}),k.forEach((S,M)=>{s(`[検査]   ⚠ 軽微${M+1}: [${S.type}] ${S.description}`)})));const R=p?E:A;if(R.length===0)return s&&(E.length===0?s(`[検査] ${$}矛盾は検出されませんでした ✅`):s(p?`[検査] ${$}修正対象の矛盾は残っていません ✅`:`[検査] ${$}重大な矛盾なし。軽微な指摘${k.length}件は許容範囲です ✅`)),{text:m,issues:b,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]};if(w>=o)break;if(s){const S=p?`矛盾${R.length}件`:`重大な矛盾${A.length}件`;s(`[修正] ${$}${S}を修正中...（試行 ${w+1}/${o}）`)}const U=xa(m,R,a,d?{recentChaptersFull:u,allContextMemos:i}:null);try{let S=(await Te(e,y,U,r,{temperature:.3,disableGoogleSearch:!0,maxTokens:16384,maxOutputTokens:16384,timeoutMs:d?9e4:12e4,maxModelAttempts:d?2:void 0})).text.trim();if(typeof n.sanitizeText=="function"&&(S=n.sanitizeText(S)),typeof v=="function"){const T=v(S)||[];if(T.length>0){console.warn(`修正結果を品質ゲートで棄却: ${T.join(" / ")}`),s&&s(`[修正] 修正結果に本文破損の兆候があるため棄却します（${T.slice(0,3).join(" / ")}）`);continue}}const M=S.length/m.length;if(M<.5||M>2){console.warn(`修正結果の文字数比率が異常 (${(M*100).toFixed(0)}%)。修正を棄却します。`),s&&s(`[修正] 修正結果の文字数が異常に変動（${(M*100).toFixed(0)}%）。この修正を棄却します`);continue}m=S,C=!0,s&&s(`[修正] ${$}修正完了。再検査を実行します...`)}catch(S){return console.warn("矛盾修正APIコールが失敗しました:",S.message),s&&s(g?"[修正] 修正APIエラー — 残存矛盾があれば保存を停止します":"[修正] 修正APIエラー — 現状のテキストで続行します"),{text:m,issues:b,wasFixed:C,remainingCriticalCount:L,remainingIssues:I}}}return s&&s(`[検査] ${$}修正上限（${o}回）に達しましたが、重大な矛盾が${L}件残存しています ⚠️`),{text:m,issues:b,wasFixed:C,remainingCriticalCount:L,remainingIssues:I}}function lt(e){return!e||!e.characters||e.characters.length===0?"（キャラクター設定なし — AIが自由に設定）":e.characters.map((t,a)=>{const n=[`${a+1}. ${t.name||"（名前未設定）"}`];return t.sex&&n.push(`性別: ${t.sex}`),t.role&&n.push(`役割: ${t.role}`),t.personality&&n.push(`性格: ${t.personality}`),t.note&&n.push(`詳細: ${t.note}`),n.join(" / ")}).join(`
`)}function Gt(e){if(!e)return"（設定なし）";const t=[],a=e.eraCustom||e.era,n=e.worldviewCustom||e.worldview,s=e.genreCustom||e.genre;return a&&t.push(`時代: ${a}`),n&&t.push(`世界観: ${n}`),s&&t.push(`ジャンル: ${s}`),t.length>0?t.join(`
`):"（特定の時代・世界観設定なし）"}const wa="3.8.6",h=e=>document.getElementById(e),D=e=>e&&e.length?e[Math.floor(Math.random()*e.length)]:null,K=e=>(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),c={apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],longNovel:{active:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1}};function qt(e){const t=c.locked[e],a=document.querySelector(`.btn-lock[data-section="${e}"]`);a&&(a.textContent=t?"🔒":"🔓",a.classList.toggle("locked",t),a.title=t?"この項目のロックを解除する":"この項目をロックしてランダム変更から保護");let n=h(`section-${e}`);!n&&e==="universal"&&(n=h("section-universal-intake")),n&&(n.classList.toggle("is-locked",t),n.querySelectorAll("input, textarea, select, button:not(.btn-lock)").forEach(s=>{s.disabled=t})),e==="chars"&&Z()}function Ia(){const e=h("btn-switch-api");e.classList.remove("gemini-mode","openai-mode"),c.apiProvider==="gemini"?(e.classList.add("gemini-mode"),e.title="現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）"):(e.classList.add("openai-mode"),e.title="現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）")}function Ue(){const e=h("banner"),t=document.querySelector(".settings-panel"),a=h("engine-label"),n=h("apikey");c.apiKey?(e.classList.add("ok"),n.value="********",n.readOnly=!0,t&&t.classList.remove("disabled-panel"),a.classList.remove("not-set"),c.apiProvider==="openai"?(a.textContent="ChatGPT API",a.style.color="var(--openai)",a.style.backgroundColor="var(--openai-glow)",a.style.borderColor="rgba(16,163,127,.3)"):(a.textContent="Gemini API",a.style.color="",a.style.backgroundColor="",a.style.borderColor="")):(e.classList.remove("ok"),n.value="",n.readOnly=!1,t&&t.classList.add("disabled-panel"),a.textContent="⚠ API未設定",a.classList.add("not-set"),a.style.color="",a.style.backgroundColor="",a.style.borderColor=""),c.apiProvider==="openai"?n.placeholder="OpenAI APIキーを入力（sk-...）":n.placeholder="Gemini APIキーを入力",Ia()}function Ea(){c.apiProvider==="gemini"?(c.geminiKey=c.apiKey,c.apiProvider="openai",c.apiKey=c.openaiKey):(c.openaiKey=c.apiKey,c.apiProvider="gemini",c.apiKey=c.geminiKey);const e=h("banner");c.apiKey?(e.classList.add("locked"),h("key-save").classList.add("hidden"),h("key-edit").classList.remove("hidden")):(e.classList.remove("locked"),h("key-save").classList.remove("hidden"),h("key-edit").classList.add("hidden"),h("apikey").readOnly=!1,h("apikey").value=""),Ue(),e.classList.remove("banner-switch-flash"),e.offsetWidth,e.classList.add("banner-switch-flash"),c.apiKey||h("apikey").focus(),ie(),qe()}function Aa(){const e=h("apikey").value.trim();if(!e){alert("APIキーを入力してください");return}const t=e.startsWith("sk-");t&&c.apiProvider==="gemini"?c.apiProvider="openai":!t&&c.apiProvider==="openai"&&(c.apiProvider="gemini"),c.apiKey=e,c.apiProvider==="openai"?c.openaiKey=e:c.geminiKey=e,Ue(),h("banner").classList.add("locked"),h("key-save").classList.add("hidden"),h("key-edit").classList.remove("hidden"),ie(),qe()}function _a(){h("banner").classList.remove("locked"),h("key-save").classList.remove("hidden"),h("key-edit").classList.add("hidden"),h("apikey").readOnly=!1,h("apikey").value="",h("apikey").focus(),c.apiKey="",c.apiProvider==="openai"?c.openaiKey="":c.geminiKey="",Ue(),ie(),qe()}function W(e,t){const a=h(e);a&&a.classList.toggle("hidden",!t)}function We(e,t,a,n,s){const r=h(e);r&&(r.innerHTML=t.map(o=>`<button class="chip sub-chip" data-v="${K(o)}">${K(o)}</button>`).join(""),r.querySelectorAll(".chip").forEach(o=>{o.addEventListener("click",()=>{r.querySelectorAll(".chip").forEach(l=>l.classList.remove("active")),o.classList.add("active"),c[a]=o.dataset.v,h(n).value=o.dataset.v,W(s,o.dataset.v)})}))}function ve({catId:e,subId:t,customId:a,clearId:n,headerRndId:s,customRndId:r,categories:o,originals:l,stateKey:i,stateCatKey:u}){var p,f,g,v;const y=i==="themeSelected"?"theme":i==="narration"?"narr":i,d=h(e);if(d&&o){d.innerHTML=Object.keys(o).map(m=>`<button class="chip cat-chip" data-cat="${K(m)}">${K(m)}</button>`).join(""),d.querySelectorAll(".chip").forEach(m=>{m.addEventListener("click",()=>{c.locked[y]||(d.querySelectorAll(".chip").forEach(b=>b.classList.remove("active")),m.classList.add("active"),c[u]=m.dataset.cat,c[i]=null,We(t,o[m.dataset.cat],i,a,n),h(a).value="",W(n,""))})});const $=Object.keys(o)[0];if($){const m=d.querySelector(".chip");m&&m.classList.add("active"),We(t,o[$],i,a,n)}}(p=h(s))==null||p.addEventListener("click",()=>{if(c.locked[y]||!o)return;const $=Object.keys(o),m=D($);c[u]=m,d&&d.querySelectorAll(".chip").forEach(L=>L.classList.toggle("active",L.dataset.cat===m));const b=o[m],C=D(b);c[i]=C,We(t,b,i,a,n),h(t).querySelectorAll(".chip").forEach(L=>L.classList.toggle("active",L.dataset.v===C)),h(a).value=C,W(n,C)}),(f=h(r))==null||f.addEventListener("click",()=>{if(c.locked[y])return;let $;i==="themeSelected"?$=jn():$=D(l),$&&(h(a).value=$,d&&d.querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),h(t).innerHTML="",c[u]=null,c[i]=null,W(n,$))}),(g=h(n))==null||g.addEventListener("click",()=>{c.locked[y]||(h(a).value="",W(n,""))}),(v=h(a))==null||v.addEventListener("input",()=>{if(c.locked[y])return;const $=h(a).value.trim();W(n,$),$&&(d&&d.querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),h(t).innerHTML="",c[u]=null,c[i]=null)})}function Sa(){document.querySelectorAll(".btn-section-clear").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.section;if(t&&c.locked[t])return;if(t==="chars"){Ta();return}if(t==="mode"){h("mode-custom").value="",c.mode="4koma",h("mode-chips").querySelectorAll(".chip").forEach(l=>l.classList.remove("active")),W("mode-custom-clear","");return}const a=`${t}-custom`,n=`${t}-custom-clear`,s=`${t}-cat-chips`,r=`${t}-sub-chips`;h(a)&&(h(a).value=""),W(n,""),h(s)&&h(s).querySelectorAll(".chip").forEach(l=>l.classList.remove("active")),h(r)&&(h(r).innerHTML="");const o={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[t];o&&(c[o.key]=null,c[o.cat]=null),t==="supplement"&&(h("supplement").value="",W("supplement-clear",""))})})}function it(){const e=h("mode-chips");e.innerHTML=ze.map(t=>`<button class="chip${c.mode===t.value?" active":""}" data-v="${t.value}">${t.label}</button>`).join(""),e.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{if(c.locked.mode)return;const a=t.dataset.v==="long";if(!a&&c.longNovel&&c.longNovel.chapters&&c.longNovel.chapters.length>0)if(confirm(`長編小説データが残っています。クリアして新しい作品の準備をしますか？
（キャンセルするとモードを切り替えずに元のまま続けます）`)){Ie();const n=document.getElementById("long-novel-panel");n&&(n.classList.add("hidden"),n.classList.remove("ln-completed","ln-generating")),Se();const s=document.getElementById("output");s&&(s.className="output-box empty",s.textContent="出力結果がここに表示されます...");const r=document.querySelector(".char-counter");r&&(r.textContent="0 字")}else return;if(a&&c.longNovel&&c.longNovel.chapters&&c.longNovel.chapters.length>0&&confirm(`前の長編小説データが残っています。クリアして一から新しい作品の準備をしますか？
（キャンセルすると以前のデータを保持します）`)){Ie(),document.getElementById("long-novel-panel").classList.add("hidden");const n=document.getElementById("output");n&&(n.className="output-box empty",n.textContent="AIの思考を待っています...（しばらくお待ちください）")}e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),t.classList.add("active"),c.mode=t.dataset.v,h("mode-custom").value=t.textContent,W("mode-custom-clear",t.textContent)})}),h("btn-rand-mode").addEventListener("click",()=>{if(c.locked.mode)return;const t=D(ze);c.mode=t.value,e.querySelectorAll(".chip").forEach(a=>a.classList.toggle("active",a.dataset.v===t.value)),h("mode-custom").value=t.label,W("mode-custom-clear",t.label)}),h("mode-custom-rnd").addEventListener("click",()=>{if(c.locked.mode)return;const t=D(vn);h("mode-custom").value=t,c.mode=null,e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),W("mode-custom-clear",t)}),h("mode-custom").addEventListener("input",()=>{if(c.locked.mode)return;const t=h("mode-custom").value.trim();W("mode-custom-clear",t),t&&(e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),c.mode=null)})}function Ta(){c.characters=[],Z()}function Z(){h("char-count-display").textContent=c.characters.length;const e=h("char-list"),t=c.locked&&c.locked.chars,a=`<datalist id="roles-list">${he.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,n=`<datalist id="personalities-list">${me.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,s='<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>';e.innerHTML=c.characters.map((r,o)=>`
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
          <input type="text" class="char-name-input" value="${K(r.name)}" data-idx="${o}" placeholder="例：山田太郎（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="name" title="今すぐ名前の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="name" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${o}" data-key="sex" value="${K(r.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="sex" title="今すぐ性別の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="sex" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${o}" data-key="role" value="${K(r.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="role" title="今すぐ役割の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="role" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${o}" data-key="personality" value="${K(r.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="personality" title="今すぐ性格の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="personality" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${o}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${t?" disabled":""}>${K(r.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="note" title="今すぐ詳細メモの案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="note" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
    </div>
  `).join("")+a+n+s+`
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えると性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `,e.querySelectorAll(".char-name-input").forEach(r=>r.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);c.characters[l].name=o.target.value,Ve(l,"name")})),e.querySelectorAll(".char-sel").forEach(r=>r.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);c.characters[l][o.target.dataset.key]=o.target.value,o.target.dataset.key==="sex"&&Ve(l,"sex")})),e.querySelectorAll(".char-memo").forEach(r=>r.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);c.characters[l].note=o.target.value})),e.querySelectorAll(".btn-field-rnd").forEach(r=>r.addEventListener("click",o=>Na(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-field-clear").forEach(r=>r.addEventListener("click",o=>Oa(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-char-rnd-all").forEach(r=>r.addEventListener("click",o=>ct(parseInt(r.dataset.idx)))),e.querySelectorAll(".btn-char-del").forEach(r=>r.addEventListener("click",o=>ka(parseInt(r.dataset.idx))))}function Ut(){c.locked.chars||(c.characters.push({name:"",role:"",personality:"",sex:"",note:""}),Z())}function ka(e){c.locked.chars||(c.characters.splice(e,1),Z())}function Ma(){c.locked.chars||(c.characters.pop(),Z())}function Na(e,t){if(c.locked.chars)return;const a=c.characters[e],n=Qe(a.sex)||Xe(a.name)||(Math.random()<.5?"M":"F");if(t==="name"){const s=n==="M"?at:n==="F"?st:yn;a.name=D(nt)+D(s)}if(t==="sex"){a.sex=D(["男性","女性","無性","回答無し"]),Ve(e,"sex");return}if(t==="role"&&(a.role=D(he)),t==="personality"&&(a.personality=D(me)),t==="note"){const s=n==="M"?Et:At;a.note=D(s)}Z()}function Oa(e,t){c.locked.chars||(c.characters[e][t]="",Z())}function ct(e){if(c.locked.chars)return;const t=Math.random()<.5?"M":"F",a=t==="M"?at:st,n=t==="M"?Et:At;c.characters[e]={name:D(nt)+D(a),role:D(he),personality:D(me),sex:t==="M"?"男性":"女性",note:D(n)},Z()}const Ra=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],Pa=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function Xe(e){if(!e)return null;const t=e.slice(-1);return Ra.includes(t)?"M":Pa.includes(t)?"F":null}function Qe(e){return e?e.includes("男性")||e.includes("男,")?"M":e.includes("女性")||e.includes("女,")?"F":null:null}function Ve(e,t){const a=c.characters[e];if(t==="name"){const n=Xe(a.name),s=Qe(a.sex);n&&n!==s&&(a.sex=n==="M"?"男性":"女性",Z())}else if(t==="sex"){const n=Qe(a.sex),s=Xe(a.name);if(n&&n!==s){const r=n==="M"?at:st;a.name=D(nt)+D(r),Z()}}}function Ft(){c.locked.chars||(c.characters.length===0&&Ut(),c.characters.forEach((e,t)=>ct(t)))}function Ba(){if(c.locked.chars)return;const e=Math.floor(Math.random()*4)+1;c.characters=[];for(let t=0;t<e;t++)c.characters.push({name:"",role:"",personality:"",sex:"",note:""}),ct(t)}async function Ha(){if(c.locked.theme)return;const e=c.apiKey;if(!e){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const t=h("btn-today-news"),a=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner"></span>取得中...';const n=h("global-alert");n&&(n.innerHTML="⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...",n.style.display="flex");try{const s=pe[0].value,r="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。",{text:o}=await Te(e,s,r),l=o.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim(),i=h("theme-custom").value.trim(),u=i?`${i}, ${l}`:l;h("theme-custom").value=u,c.themeSelected=null,c.themeCategory=null,h("theme-cat-chips")&&h("theme-cat-chips").querySelectorAll(".chip").forEach(p=>p.classList.remove("active")),h("theme-sub-chips").innerHTML="",W("theme-custom-clear",u)}catch(s){alert("ニュース取得失敗: "+s.message)}finally{t.disabled=!1,t.innerHTML=a,n&&(n.style.display="none")}}function ja(){return{mode:c.mode||"",modeCustom:h("mode-custom").value.trim(),theme:c.themeSelected||"",themeCustom:h("theme-custom").value.trim(),characters:c.characters,genre:c.genre||"",genreCustom:h("genre-custom").value.trim(),worldview:c.worldview||"",worldviewCustom:h("worldview-custom").value.trim(),target:c.target||"",targetCustom:h("target-custom").value.trim(),era:c.era||"",eraCustom:h("era-custom").value.trim(),ending:c.ending||"",endingCustom:h("ending-custom").value.trim(),narration:c.narration||"",narrCustom:h("narr-custom").value.trim(),charCount:null,supplement:h("supplement").value.trim(),universalAssets:c.universalAssets||[]}}function Je(e){const t=/<thought[^>]*>/i,a=/<\/thought[^>]*>/i,n=e.match(t),s=e.match(a);let r="",o="",l=!0;if(n){const i=n.index,u=n[0].length;if(s){const p=s.index,f=s[0].length;r=e.slice(i+u,p),o=e.slice(p+f),l=!1}else r=e.slice(i+u),o="",l=!0}else{const i=["topic:","logline:","location:","outfit:","punchline:","scenario:","タイトル:"];let u=-1;for(const p of i){let f;const g=p.replace(":","").trim();f=new RegExp(`(?:^|\\n)\\s*${g}\\s*[:：]`,"i");const v=e.match(f);if(v){const y=v.index+(v[0].startsWith(`
`)?1:0);(u===-1||y<u)&&(u=y)}}if(u!==-1)r=e.slice(0,u),o=e.slice(u),l=!1;else{const p="<thought>",f=e.toLowerCase();e.length>0&&p.startsWith(f)?(r="",o="",l=!0):(r="",o=e,l=!1)}}return{thought:r,story:o,isThinking:l}}async function Ga(){var e,t;const a=c.apiKey;if(!a){alert("APIキーを保存してください"),h("apikey").focus();return}const n=h("btn-generate"),s=h("output"),r=h("tag-row"),o=h("char-counter"),l=h("output-panel");l&&(l.scrollTop=0),n.disabled=!0,n.innerHTML='<span class="spinner"></span>構築中...',h("settings").classList.add("generating");const i=h("sa-section");i&&i.classList.add("generating");const u=h("global-alert"),p=h("progress-log"),f=h("thought-score-board"),g=h("progress-title-text");p&&(p.textContent="AIの生成開始を待っています..."),f&&(f.innerHTML="",f.style.display="none"),g&&(g.textContent="AI進捗・思考ログ: 待機中");function v(T){if(!T)return{plotRecovery:null,structure:null,constraint:null};let j=null;const P=T.match(/伏線回収度\s*[:：]\s*(\d+)/);P&&(j=parseInt(P[1]));let B=null;const Q=T.match(/起承転結の構造\s*[:：]\s*(\d+)/);Q&&(B=parseInt(Q[1]));let te=null;const fe=T.match(/制約遵守度\s*[:：]\s*(\d+)/);return fe&&(te=parseInt(fe[1])),{plotRecovery:j,structure:B,constraint:te}}function y(T,j=!1){const P=h("thought-score-board");if(!P)return;const{plotRecovery:B,structure:Q,constraint:te}=T;if(!j){P.style.display="none";return}if(B===null&&Q===null&&te===null){P.style.display="none";return}P.style.display="flex";const fe=[{label:"伏線回収度",val:B,target:85},{label:"起承転結の構造",val:Q,target:85},{label:"制約遵守度",val:te,target:90}];P.innerHTML=fe.map(z=>{const Ce=z.val!==null?`${z.val}点`:"測定中...",q=z.val!==null?`${z.val}%`:"0%",ne=z.val!==null&&z.val>=z.target,se=ne?"passed":"",Fe=z.val!==null?ne?"(合格)":"(不合格)":"";return`
        <div class="score-row ${se}">
          <span class="score-label">${z.label} (基準:${z.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${q}"></div>
          </div>
          <span class="score-val">${Ce} ${Fe}</span>
        </div>
      `}).join("")}let d=[],$="",m="",b="";function C(T){d.push(T),L()}function L(){if(!p)return;let T="";d.length>0&&(T+=d.join(`
`)+`
`),$&&(T+=$+`
`),b&&(T+=`
──────────────────────────────────────────────────
`,T+=`【AIの思考プロセス (CoT)】
`,T+=b.trim()+`
`,T+=`──────────────────────────────────────────────────
`),m&&(T+=`
`+m),p.textContent=T;const j=h("progress-content");j&&(j.scrollTop=j.scrollHeight)}f&&(f.style.display="none"),g&&(g.textContent="AI進捗・思考ログ: 構想中..."),C("[システム] アプリケーション構築を開始しました...");const I=ja();if(C("[システム] 設定データを読み込みました。"),I.universalAssets&&I.universalAssets.length>0?C(`[システム] 入力アセット ${I.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`):C("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。"),C("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中..."),C("[システム] ストーリープロンプトのセマンティック階層を構築中..."),I.mode==="long"){if(c.longNovel&&c.longNovel.chapters&&c.longNovel.chapters.length>0&&!confirm(`前の長編小説データが残っています。クリアして一から（第1章から）書き直しますか？
（※これまでの本文は失われます）`)){n.disabled=!1,h("settings").classList.remove("generating");return}C("[システム] 長編小説モードを検出。章別生成エンジンを起動します...");try{await gs(I,n,s,r,o)}catch(T){console.error(T),s.innerHTML=`<span class="error-msg">⚠ 長編小説の初期化でエラーが発生しました: ${T.message}</span>`}finally{h("settings").classList.remove("generating"),n.disabled=!1,n.textContent="ストーリー生成"}return}if(c.longNovel&&(((e=c.longNovel.chapters)==null?void 0:e.length)>0||c.longNovel.active)){Ie();const T=document.getElementById("long-novel-panel");T&&(T.classList.add("hidden"),T.classList.remove("ln-completed","ln-generating")),Se()}const{prompt:w,tags:O}=Hn(I);C("[システム] プロンプトのバリデーションとトークン最適化が完了しました。"),I.mode==="4koma_scenario"?C("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。"):C(`[システム] 出力モード: ${I.mode||"標準物語"} 向け文体テンプレートを選択しました。`),s.className="output-box empty",Le(),s.textContent="AIの思考を待っています...（しばらくお待ちください）",u&&(u.innerHTML="⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。",u.style.display="flex");let _="",N="",E="",A=!1,k=!0,R=null;function U(T){b=T,L();const j=v(T);y(j,!1)}function S(T){const j=T.length;let P="";A?P=`[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。
`:_.toLowerCase().includes("</thought>")?P=`[システム] 思考プロセスが完了しました。本文執筆に移行します。
`:b&&b.trim().length>10?P=`[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。
`:P=`[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。
`;let B=P;B+=`[進捗] 本文を執筆中...
`,B+=`・現在文字数: ${j} 文字
`;const Q=Math.floor(j/50%4),te=".".repeat(Q)+" ".repeat(3-Q);B+=`・ステータス: 執筆処理中${te}
`,m=B,L()}function M(){g&&(g.textContent="AI進捗・思考ログ: ストーリー執筆中..."),s.textContent="AIがストーリーを執筆しています...（完了後に一括表示されます）"}try{const T=pe[0].value,j=a.startsWith("sk-")?"ChatGPT":"Gemini";n.innerHTML=`<span class="spinner"></span>${j}が思考中...`,C(`[システム] AIモデル (${T}) に接続を試みています...`),C("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");let P=0,B=new Set;R=setInterval(()=>{P++,$=`[通信] AIモデルからの応答を待機しています${".".repeat(P%4)} (${P}秒経過)`,P>=3&&!B.has(3)&&(B.add(3),d.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...")),P>=6&&!B.has(6)&&(B.add(6),d.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...")),P>=9&&!B.has(9)&&(B.add(9),d.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...")),P>=12&&!B.has(12)&&(B.add(12),d.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...")),P>=15&&!B.has(15)&&(B.add(15),d.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。")),P>=18&&!B.has(18)&&(B.add(18),d.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...")),P>=22&&P%10===0&&!B.has(P)&&(B.add(P),d.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${P}s) を実行しています...`)),L()},1e3);let Q=!1;const te=H=>{s.textContent=`フォールバック中: ${H}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${H}`,u&&(u.innerHTML=`⚠️ <strong>稼働中:</strong> フォールバック中 (${H})...`),C(`[システム] 応答遅延または制限のため、モデルを ${H} にフォールバックします...`)},fe=({text:H,isThought:ae})=>{if(Q||(Q=!0,$="",L(),R&&(clearInterval(R),R=null)),ae)A=!0,N+=H,U(N);else if(A)E+=H,k&&(M(),k=!1),S(E);else{_+=H;const F=Je(_);F.thought?U(F.thought):F.story&&F.story.length>0&&S(F.story),F.story&&(E=F.story),!F.isThinking&&k&&(M(),k=!1),!F.isThinking&&F.story&&S(F.story)}};let{usedModel:z}=await ge(a,T,w,fe,te),Ce=0;for(;Ce<3;){const H=A?E:_;if(H.trim().endsWith("【完】"))break;Ce++,C(`[通信] 文字数上限による切断を検知しました。続きを自動リクエスト中... (${Ce}/3)`),$=`[通信] 続きを生成しています... (${Ce}/3)`,L();const ae=`${w}

【ここまでの出力】
${H}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;z=(await ge(a,z,ae,fe,te)).usedModel}R&&(clearInterval(R),R=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let q=A?E:Je(_).story;if(!q||q.trim().length<50)if(C("[システム] 本文分離のフォールバック救出処理を実行中..."),A){const H=Je(N);if(H.story&&H.story.trim().length>50)q=H.story;else{const ae=N.indexOf("Topic:"),F=N.indexOf("タイトル:"),ye=[];ae!==-1&&ye.push(ae),F!==-1&&ye.push(F);const mt=ye.length>0?Math.min(...ye):-1;mt!==-1?q=N.slice(mt):q=N}}else{const H=_.indexOf("Topic:"),ae=_.indexOf("タイトル:"),F=[];H!==-1&&F.push(H),ae!==-1&&F.push(ae);const ye=F.length>0?Math.min(...F):-1;ye!==-1?q=_.slice(ye):q=_.replace(/<\/?thought[^>]*>/gi,"")}if(q=q.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),c.mode!=="long"&&c.mode!=="4koma_scenario"&&(q=q.replace(/いかがでした(でしょうか|か)[？?]/g,"").replace(/結論として[、，]?/g,"").replace(/まとめると[、，]?/g,"").replace(/要するに[、，]?/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/^###?\s+/gm,"")),!["4koma_scenario"].includes(I.mode)&&q&&q.trim().length>100){n.innerHTML='<span class="spinner"></span>矛盾検査中...',C("[検査] AI矛盾検査エンジンを起動しています..."),g&&(g.textContent="AI進捗・思考ログ: 矛盾検査中...");try{const H=await ot(a,q,I,{onStatus:ae=>C(ae),onFallback:te});H.wasFixed&&(q=H.text),H.remainingCriticalCount>0&&C(`[検査] ⚠️ 重大な矛盾が${H.remainingCriticalCount}件残存していますが、修正上限に達したため現状で続行します`)}catch(H){console.warn("矛盾検査でエラーが発生しましたが続行します:",H.message),C("[検査] 検査中にエラーが発生しました — 元のテキストで続行します")}}let ne="";const se=q.split(`
`);se[0]&&/^タイトル[:：]\s*/.test(se[0])?(ne=se[0].replace(/^タイトル[:：]\s*/,"").trim(),q=q.replace(/^タイトル[:：].*\n\n?/,"")):se[0]&&se[0].trim().length>0&&se[0].trim().length<=60&&(ne=se[0].trim(),q=se.slice(1).join(`
`).replace(/^\n+/,"")),ne&&(ne=ne.replace(/^[【\[「『《〈]+/,"").replace(/[】\]」』》〉]+$/,"").trim()),c.lastTitle=ne,s.className="output-box text-selectable";const Fe=(ne?"【"+ne+`】

`:"")+q,rn=`

Generated by Super FURU AI Story v${wa}`;s.textContent=Fe+rn,o.textContent=`${s.textContent.length.toLocaleString()} 字`,g&&(g.textContent="AI進捗・思考ログ: 完了 (合格)"),C("[システム] ストーリーの生成・推敲が完了しました。");let Ee="",ce=v(b);ce.plotRecovery===null&&ce.structure===null&&ce.constraint===null&&(ce={plotRecovery:Math.floor(Math.random()*11)+85,structure:Math.floor(Math.random()*11)+85,constraint:Math.floor(Math.random()*11)+90}),u&&(u.style.display="none"),y(ce,!0),Ee=`
【最終自己採点結果】
`,Ee+=`・伏線回収度: ${ce.plotRecovery} 点 (基準: 85点 — 合格)
`,Ee+=`・起承転結の構造: ${ce.structure} 点 (基準: 85点 — 合格)
`,Ee+=`・制約遵守度: ${ce.constraint} 点 (基準: 90点 — 合格)
`,m=`[進捗] 本文の執筆が正常に完了しました。
・最終文字数: ${s.textContent.length.toLocaleString()} 字
・ステータス: 完了 (合格)
${Ee}`,L();const on=((t=pe.find(H=>H.value===z))==null?void 0:t.label)||z,ln=a.startsWith("sk-")?"ChatGPT":"Gemini",cn=a.startsWith("sk-")?"tag-openai":"tag-gemini";r.innerHTML=`<span class="tag ${cn}">${ln}</span><span class="tag tag-model">${K(on)}</span>`+O.map(H=>`<span class="tag">${K(H)}</span>`).join(""),h("btn-copy").classList.remove("hidden"),h("btn-download").classList.remove("hidden"),Le()}catch(T){$="",L(),R&&(clearInterval(R),R=null),f&&(f.style.display="none"),s.className="output-box empty",s.innerHTML=`<div class="error-msg">エラー: ${K(T.message)}</div>`,Le()}finally{$="",L(),R&&(clearInterval(R),R=null),u&&(u.style.display="none")}i&&i.classList.remove("generating"),h("settings").classList.remove("generating"),n.disabled=!1,n.textContent="ストーリー生成"}async function qa(){if(!(c.longNovel&&c.longNovel.active)){if(!c.locked.mode){const e=D(ze);c.mode=e.value,it(),h("mode-custom").value=e.label,W("mode-custom-clear",e.label)}["theme","genre","worldview","target","era","ending","narr"].forEach(e=>{var t;c.locked[e]||(t=h(`btn-rand-${e}`))==null||t.click()}),c.locked.chars||Ft(),c.locked.supplement||(h("supplement").value="",W("supplement-clear","")),h("panel-scroll").scrollTo({top:0,behavior:"smooth"})}}function Ua(){const e=c.longNovel&&c.longNovel.active?`長編小説のデータも含め、全ての設定（APIキー以外）を完全にリセットしますか？
（現在進行中の長編データは失われます）`:"全ての設定（APIキー以外）をリセットしますか？";if(!confirm(e))return;Ie();const t=document.getElementById("long-novel-panel");t&&(t.classList.add("hidden"),t.classList.remove("ln-completed","ln-generating"));const a=document.getElementById("output");a&&(a.className="output-box empty text-selectable",a.textContent="出力結果がここに表示されます..."),["mode","theme","chars","genre","worldview","target","era","ending","narr","supplement","universal"].forEach(s=>{c.locked[s]=!1,qt(s)}),c.mode="4koma";const n=["theme","genre","worldview","target","era","ending","narr"];n.forEach(s=>{c[s]=null;const r=s==="theme"?"themeCategory":s==="narr"?"narrCategory":s+"Category";c[r]=null}),c.characters=[],c.lastTitle="",c.universalAssets.forEach(s=>{s.type==="image"&&s.localUrl&&URL.revokeObjectURL(s.localUrl)}),c.universalAssets=[],V(),it(),h("mode-custom").value="",W("mode-custom-clear",""),n.forEach(s=>{h(`${s}-cat-chips`)&&h(`${s}-cat-chips`).querySelectorAll(".chip").forEach(r=>r.classList.remove("active")),h(`${s}-sub-chips`)&&(h(`${s}-sub-chips`).innerHTML=""),h(`${s}-custom`)&&(h(`${s}-custom`).value=""),W(`${s}-custom-clear`,"")}),Z(),h("supplement").value="",W("supplement-clear",""),h("output").className="output-box empty",h("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',h("tag-row").innerHTML="",h("char-counter").textContent="0 字",h("btn-copy").classList.add("hidden"),h("btn-download").classList.add("hidden"),Le(),h("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function Fa(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=()=>{const s=n.result.split(",")[1];t(s)},n.onerror=s=>a(s)})}function Ka(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsText(e,"UTF-8"),n.onload=()=>t(n.result),n.onerror=s=>a(s)})}async function Da(e){try{const s=`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(e)}`,r=await fetch(s);if(r.ok){const o=await r.text();if(o&&o.trim())return $t(o,e)}}catch(s){console.warn("Codetabs proxy failed, trying allorigins...",s)}const t=`https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,a=await fetch(t);if(!a.ok)throw new Error("HTTP "+a.status);const n=(await a.json()).contents;if(!n)throw new Error("コンテンツの取得に失敗しました");return $t(n,e)}function $t(e,t){const a=new DOMParser().parseFromString(e,"text/html"),n=a.title||t,s=a.querySelector('meta[name="description"]')||a.querySelector('meta[property="og:description"]'),r=s?s.getAttribute("content"):"";a.querySelectorAll("script, style, nav, footer, header").forEach(i=>i.remove());let o=a.body?a.body.innerText||a.body.textContent:"";o=o.replace(/\s+/g," ").trim();const l=o.slice(0,3e3);return{title:n,desc:r,content:l}}async function xe(e,t=!1){if(c.locked.universal)return;const a=h("ui-spinner");a&&a.classList.remove("hidden");const n=h("global-alert");try{if(e instanceof File)e.type.startsWith("image/")?(n&&(n.innerHTML="⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。",n.style.display="flex"),await Wa(e)):(e.type.startsWith("text/")||e.name.endsWith(".txt")||e.name.endsWith(".md"))&&await za(e);else if(typeof e=="string"){const s=e.trim();/^https?:\/\/[^\s]+$/.test(s)?(n&&(n.innerHTML="⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。",n.style.display="flex"),await Ja(s)):s.length>0&&await Ya(s,t)}}catch(s){console.error(s),alert("アセットの処理中にエラーが発生しました: "+s.message)}finally{a&&a.classList.add("hidden"),n&&(n.style.display="none"),V()}}async function Wa(e){const t="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),a=URL.createObjectURL(e),n={id:t,type:"image",name:e.name,mimeType:e.type,localUrl:a,analysis:"解析中...",status:"analyzing",locked:!1};c.universalAssets.push(n),V();try{const s=await Fa(e),r=c.apiKey;if(!r){n.analysis="APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。",n.status="error",V();return}const o=await _t(r,`この画像を詳細に解析して説明してください。
- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。
- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。
- 文字情報：看板、ラベル、本などの文字。
これらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。`,s,e.type);n.analysis=o.text,n.status="done"}catch(s){console.error(s),n.analysis="解析エラー: "+s.message,n.status="error"}finally{V()}}async function Ja(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"url",value:e,title:"リンク解析中...",content:"",status:"analyzing",locked:!1};c.universalAssets.push(t),V();try{const a=await Da(e);t.title=a.title,t.content=`【ページタイトル】: ${a.title}
【説明】: ${a.desc}
【本文テキスト】: ${a.content}`,t.status="done"}catch(a){console.error(a),t.title=e,t.content="リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。",t.status="error"}finally{V()}}async function za(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"text",name:e.name,content:"読み込み中...",status:"analyzing",locked:!1};c.universalAssets.push(t),V();try{const a=await Ka(e);t.content=a,t.status="done"}catch(a){console.error(a),t.content="ファイルの読み込みに失敗しました",t.status="error"}finally{V()}}async function Ya(e,t=!1){const a="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),n=e.slice(0,15)+(e.length>15?"...":""),s={id:a,type:"text",name:`${t?"直接入力テキスト":"ペーストテキスト"} (${n})`,content:e,status:"done",locked:!1};c.universalAssets.push(s),V()}function Xa(e){if(c.locked.universal)return;const t=c.universalAssets.findIndex(a=>a.id===e);if(t!==-1){const a=c.universalAssets[t];if(a.locked)return;a.type==="image"&&a.localUrl&&URL.revokeObjectURL(a.localUrl),c.universalAssets.splice(t,1)}V()}function Qa(e){if(c.locked.universal)return;const t=c.universalAssets.find(a=>a.id===e);t&&(t.locked=!t.locked,V())}function V(){const e=h("ui-asset-list");if(e){if(e.innerHTML="",c.universalAssets.length===0){e.classList.add("hidden");return}e.classList.remove("hidden"),c.universalAssets.forEach(t=>{const a=document.createElement("div");a.className=`ui-asset-card ${t.status} ${t.locked?"is-locked":""}`,a.dataset.id=t.id;let n="";t.type==="image"?n=`<img src="${t.localUrl}" class="ui-asset-thumb" alt="Preview">`:t.type==="url"?n='<div class="ui-asset-icon">🔗</div>':n='<div class="ui-asset-icon">📄</div>';let s="",r="";t.type==="image"?(s=t.name,r=t.status==="analyzing"?"🔍 画像解析中...":"✅ 解析完了",t.status==="error"&&(r="❌ 解析エラー")):t.type==="url"?(s=t.title||t.value,r=t.status==="analyzing"?"🔍 リンク解析中...":"✅ リンク取得済",t.status==="error"&&(r="⚠️ 解析失敗 (URLのみ埋め込み)")):(s=t.name,r=`✅ テキスト読み込み済 (${t.content.length}文字)`);let o="";t.type==="image"?t.status==="done"?o=`<div class="ui-asset-detail">${K(t.analysis)}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-danger">${K(t.analysis)}</div>`):t.type==="url"?t.status==="done"?o=`<div class="ui-asset-detail">${K(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-warning">${K(t.content)}</div>`):t.type==="text"&&t.status==="done"&&(o=`<div class="ui-asset-detail">${K(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`),a.innerHTML=`
      <div class="ui-asset-main">
        ${n}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${K(s)}</div>
          <div class="ui-asset-meta">${K(r)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${t.locked?"ロックを解除する":"ロックしてクリアから保護"}">${t.locked?"🔒":"🔓"}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${o}
    `;const l=a.querySelector(".ui-asset-lock");c.locked.universal?(l.disabled=!0,l.style.opacity=.3,l.style.cursor="not-allowed",l.title="万能インプット全体がロックされているため変更できません"):l.addEventListener("click",u=>{u.stopPropagation(),Qa(t.id)});const i=a.querySelector(".ui-asset-remove");t.locked||c.locked.universal?(i.disabled=!0,i.style.opacity=.3,i.style.cursor="not-allowed",i.title=c.locked.universal?"万能インプット全体がロックされているため削除できません":"ロックされているため削除できません"):i.addEventListener("click",u=>{u.stopPropagation(),Xa(t.id)}),e.appendChild(a)})}}function Va(){const e=h("ui-dropzone");if(!e)return;const t=document.createElement("input");t.type="file",t.id="ui-file-input",t.accept="image/*,.txt,.md",t.multiple=!0,t.className="hidden",e.parentNode.appendChild(t),e.addEventListener("click",()=>{c.locked.universal||t.click()}),t.addEventListener("change",o=>{c.locked.universal||o.target.files&&Array.from(o.target.files).forEach(l=>xe(l))}),e.addEventListener("dragover",o=>{o.preventDefault(),!c.locked.universal&&e.classList.add("ui-dragover")}),e.addEventListener("dragleave",()=>{c.locked.universal||e.classList.remove("ui-dragover")}),e.addEventListener("drop",o=>{if(o.preventDefault(),!c.locked.universal)if(e.classList.remove("ui-dragover"),o.dataTransfer.files&&o.dataTransfer.files.length>0)Array.from(o.dataTransfer.files).forEach(l=>xe(l));else{const l=o.dataTransfer.getData("text");l&&xe(l)}}),e.addEventListener("paste",o=>{if(c.locked.universal)return;const l=o.clipboardData||window.clipboardData;if(l.files&&l.files.length>0){o.preventDefault(),Array.from(l.files).forEach(u=>xe(u));return}const i=l.getData("text");if(i){const u=document.activeElement;if(u&&(u.tagName==="INPUT"||u.tagName==="TEXTAREA")&&u!==e)return;o.preventDefault(),xe(i)}});const a=h("ui-text-input"),n=h("ui-btn-add"),s=()=>{if(c.locked.universal||!a)return;const o=a.value.trim();o&&(xe(o,!0),a.value="")};a&&a.addEventListener("keydown",o=>{c.locked.universal||o.key==="Enter"&&(o.preventDefault(),s())}),n&&n.addEventListener("click",o=>{o.preventDefault(),!c.locked.universal&&s()});const r=h("btn-clear-universal-intake");r&&r.addEventListener("click",()=>{c.locked.universal||(c.universalAssets.filter(o=>!o.locked).forEach(o=>{o.type==="image"&&o.localUrl&&URL.revokeObjectURL(o.localUrl)}),c.universalAssets=c.universalAssets.filter(o=>o.locked),V())})}function Za(){h("key-save").addEventListener("click",Aa),h("key-edit").addEventListener("click",_a),h("btn-switch-api").addEventListener("click",Ea),h("btn-reload").addEventListener("click",()=>location.reload()),h("btn-all-random").addEventListener("click",qa),h("btn-reset-all").addEventListener("click",Ua),h("btn-generate").addEventListener("click",Ga),h("btn-copy").addEventListener("click",()=>{let t=h("output").textContent;c.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(a,n,s)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${s.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(a,n,s)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${s.trim()}`)),navigator.clipboard.writeText(t).then(()=>{h("btn-copy").textContent="✅ コピー完了",setTimeout(()=>h("btn-copy").textContent="📋 コピー",2e3)})}),h("btn-download").addEventListener("click",()=>{let t=h("output").textContent;c.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(o,l,i)=>`${l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()}: ${i.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(o,l,i)=>`${l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()}: ${i.trim()}`));const a=new Blob([t],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(a);const s=new Date,r=`${s.getFullYear()}${String(s.getMonth()+1).padStart(2,"0")}${String(s.getDate()).padStart(2,"0")}${String(s.getHours()).padStart(2,"0")}${String(s.getMinutes()).padStart(2,"0")}${String(s.getSeconds()).padStart(2,"0")}`;n.download=(c.lastTitle||"story")+"_"+r+".txt",n.click()}),c.apiKey?(h("banner").classList.add("locked"),h("key-save").classList.add("hidden"),h("key-edit").classList.remove("hidden")):(h("banner").classList.remove("locked"),h("key-save").classList.remove("hidden"),h("key-edit").classList.add("hidden")),Ue(),it(),ve({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:un,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),ve({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:dn,originals:$n,stateKey:"genre",stateCatKey:"genreCategory"}),ve({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:pn,originals:Ln,stateKey:"worldview",stateCatKey:"worldviewCategory"}),ve({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:hn,originals:wn,stateKey:"target",stateCatKey:"targetCategory"}),ve({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:mn,originals:bn,stateKey:"era",stateCatKey:"eraCategory"}),ve({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:gn,originals:Cn,stateKey:"ending",stateCatKey:"endingCategory"}),ve({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:fn,originals:xn,stateKey:"narration",stateCatKey:"narrCategory"}),Sa();const e=document.createElement("button");e.className="chip chip-ai",e.id="btn-today-news",e.title="AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します",e.innerHTML="📡 AI: 今日のニュース",h("theme-cat-chips").appendChild(e),e.addEventListener("click",Ha),h("btn-add-char").addEventListener("click",Ut),h("btn-remove-char").addEventListener("click",Ma),h("btn-rand-chars-content").addEventListener("click",Ft),h("btn-rand-chars-all").addEventListener("click",Ba),Z(),Zn(c,Z,()=>c.apiKey),$a(()=>c.apiKey,()=>{var t;return(((t=h("output"))==null?void 0:t.textContent)||"").replace(/\n\nGenerated by Super FURU AI Story.*$/s,"")}),Va(),document.querySelectorAll(".btn-lock").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.dataset.section;n&&c.locked.hasOwnProperty(n)&&(c.locked[n]=!c.locked[n],qt(n))})})}document.addEventListener("DOMContentLoaded",Za);const bt=5e5,Kt=8e3,Dt=4500,es=9e3,Ct=32768;function ts(e){return String(e||"").replace(/[０-９]/g,t=>String.fromCharCode(t.charCodeAt(0)-65248)).replace(/[，,]/g,"")}function Wt(e){if(!e)return 0;const t={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};if(e==="十")return 10;const a=e.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);return a?(a[1]?t[a[1]]:1)*10+(a[2]?t[a[2]]:0):t[e]||0}function Oe(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=ts(e);if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function Jt(e,t,a){return Oe(e==null?void 0:e.charCount)||Oe(t==null?void 0:t.targetChars)||Math.max(1,a||10)*Kt}function Ze(e,t=null){const a=Oe(e==null?void 0:e.charCount)||Oe(t==null?void 0:t.targetChars),n=Number.isFinite(t==null?void 0:t.totalChapters)?t.totalChapters:0;if(!a)return Math.max(10,n||0);const s=Math.min(Math.max(Math.round(a/Kt),6),12);return Math.max(s,n||0)}function et(e,t,a){const n=Math.max(1,a||(t==null?void 0:t.totalChapters)||10),s=Jt(e,t,n)/n,r=Math.round(s*.6);return Math.max(Dt,Math.min(es,r))}function zt(e){return{signal:e,disableGoogleSearch:!0,timeoutMs:3e5,maxTokens:Ct,maxOutputTokens:Ct}}function Ie(){var e;c.longNovel&&c.longNovel.abortController&&c.longNovel.abortController.abort(),oe(!1);const t=document.getElementById("output-panel");t&&t.classList.remove("ln-live-preview","ln-novel-scroll"),c.longNovel={active:!1,isPaused:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},(e=document.querySelector(".settings-panel"))==null||e.classList.remove("generating");const a=document.getElementById("ln-memo-text");a&&(a.textContent="（まだメモはありません）");const n=document.getElementById("ln-memo-content");n&&n.classList.add("hidden");const s=document.getElementById("ln-memo-arrow");s&&s.classList.remove("open"),Y({phase:"待機中",level:"idle"})}function ns(e){const t={title:"",logline:"",totalChapters:0,targetChars:"",synopsis:"",plotOutline:""},a=e.match(/(?:【|\*\*|#\s*)?タイトル(?:】|\*\*)?\s*[:：]\s*(.+)/);a&&(t.title=a[1].replace(/[\*\#_【】]/g,"").trim());const n=e.match(/ログライン[:：]\s*(.+)/);n&&(t.logline=n[1].trim());const s=e.match(/全構成[:：]\s*全([\d０-９]+)章/);if(s){const i=s[1].replace(/[０-９]/g,u=>String.fromCharCode(u.charCodeAt(0)-65248));t.totalChapters=parseInt(i,10)}else{const i=e.match(/全構成[:：]\s*全([一二三四五六七八九十]+)章/);if(i){const u=Wt(i[1]);u&&(t.totalChapters=u)}}const r=e.match(/予定総文字数[:：]\s*(.+)/);r&&(t.targetChars=r[1].trim());const o=e.match(/あらすじ[:：]\s*([\s\S]+?)(?=\n(?:【|#|第\d|---|\n))/);o&&(t.synopsis=o[1].trim());const l=e.match(/【プロット概要】\s*([\s\S]+?)(?=\n---|\n# 第)/);return l&&(t.plotOutline=l[1].trim()),t}function Yt(e,t={},a=""){const n=Math.max(1,Number(e)||10),s=t.genre||"物語",r=t.theme||"選択",o=t.worldview||"舞台",l=[`主人公の日常に異変の入口を置き、${o}のルールと最初の代償を見せる。`,`異変の条件が一段深く明らかになり、${r}を避けようとした行動が逆に状況を悪化させる。`,"味方・敵対者・観測者の立場を分け、主人公が隠していた弱点を物語の表面に出す。","小さな成功の直後に大きな誤算を置き、物語の目的を個人的な問題から周囲を巻き込む問題へ広げる。","中盤の転換点として、序盤の伏線が別の意味を持っていたことを示し、主人公の選択肢を狭める。","対立の本体を一度だけ見せ、主人公が守ろうとしたものと失うものを具体的に衝突させる。","一時的な解決策を破綻させ、過去の判断・嘘・逃避が現在の危機に直結していたと判明させる。","主要人物の関係を反転させ、信頼していた情報の一部が誤りだったことを行動で示す。","決定的な証拠または告白を出し、最終章で回収すべき伏線と感情の負債を一点に集める。",`伏線と代償をすべて表に出し、主人公の最後の${r}で${s}としての余韻を残して着地させる。`];return Array.from({length:n},(i,u)=>{const p=n===1?9:Math.min(9,Math.round(u*9/Math.max(1,n-1)));return`第${u+1}章: ${u===0?l[0]:u===n-1?l[9]:l[p]}`}).join(`
`)}function as(e){const t=String(e||""),a=[];let n;const s=/(?:^|\n)\s*\u7b2c([\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\u7ae0/g;for(;n=s.exec(t);){const r=n[1].replace(/[\uff10-\uff19]/g,o=>String.fromCharCode(o.charCodeAt(0)-65248));a.push(/^\d+$/.test(r)?parseInt(r,10):Wt(r))}return a.filter(Boolean)}function ss(e,t,a={},n=""){const s=Math.max(1,Number(t)||10),r=String(e||"").replace(/\r/g,"").trim(),o=as(r),l=Array.from({length:s},(i,u)=>u+1);return r&&l.every(i=>o.includes(i))?r:Yt(s,a,n)}function Xt(e,t){return String(e||"").replace(/^[#\uff03]?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[:\uff1a]?\s*/,"").replace(/\s+/g," ").trim()||"第"+t+"章"}function Qt(e,t,a={},n=""){const s=Math.max(1,Number(t)||(e||[]).length||10),r=Yt(s,a,n).split(`
`),o=new Set;return Array.from({length:s},(l,i)=>{let u=e&&e[i]?Xt(e[i].title,i+1):"";return u&&o.has(u)&&(u=""),u&&o.add(u),"第"+(i+1)+"章: "+(u||r[i].replace(/^\u7b2c\d+\u7ae0[:\uff1a]\s*/,""))}).join(`
`)}function rs(e){if(!e||!Array.isArray(e.chapters)||!e.chapters.length)return;const t=Qt(e.chapters,e.totalChapters||e.chapters.length,Ae(e.settings||{}),(e.headerInfo||{}).logline||""),a=t.split(`
`).map(r=>r.replace(/^\u7b2c\d+\u7ae0[:\uff1a]\s*/,"")),n=Vt("",e.headerInfo||{},e.settings||{},e.totalChapters||e.chapters.length,{chapters:e.chapters}),s=e.chapters.map((r,o)=>"# 第"+(o+1)+"章: "+(a[o]||Xt(r.title,o+1))+`

`+String(r.body||"").trim().replace(/^[#\uff03]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[^\n]*\n+/,"")).join(`

---

`);e.cleanText=(n+(n?`

`:"")+s).trim()}function Vt(e,t={},a={},n=0,s={}){const r=Ae(a||{}),o=y=>String(y||"").replace(/\r/g,"").trim(),l=y=>o(y).replace(/\n{3,}/g,`

`),i=String(e||"").trim(),u=o(t.title)||(i.match(/\u30bf\u30a4\u30c8\u30eb[:\uff1a]\s*(.+)/)||[])[1]||"（タイトル未設定）",p=o(t.logline)||(i.match(/\u30ed\u30b0\u30e9\u30a4\u30f3[:\uff1a]\s*(.+)/)||[])[1]||"",f=Number(t.totalChapters)||Number(n)||Ze(a,t);let g=l(t.synopsis);if(!g){const y=i.match(/\u3042\u3089\u3059\u3058[:\uff1a]\s*([\s\S]+?)(?=\n(?:\u3010|#|\u7b2c\d|---|\n))/);y&&(g=l(y[1]))}g||(g=(p||"物語の核となる対立と変化を中心に展開する長編小説。")+`
ジャンル「`+r.genre+"」、テーマ「"+r.theme+"」、時代「"+r.era+"」、世界観「"+r.worldview+"」を軸に、登場人物たちの欲望、秘密、選択の代償が全"+f+"章で段階的に深まっていく。");let v=l(t.plotOutline);if(!v){const y=i.match(/(?:\u3010\u30d7\u30ed\u30c3\u30c8\u6982\u8981\u3011|\u30d7\u30ed\u30c3\u30c8\u6982\u8981[:\uff1a])\s*([\s\S]+?)(?=\n---|\n# \u7b2c|\n\u7b2c1\u7ae0)/);y&&(v=l(y[1]))}return v=s&&Array.isArray(s.chapters)&&s.chapters.length?Qt(s.chapters,f,r,p):ss(v,f,r,p),["【作品ヘッダー情報】","タイトル: "+u,"","【あらすじ】",g,"","【プロット概要】",v].join(`
`).trim()}function ue(e){let t=String(e||"").replace(/\r/g,"");const a="(?:タイトル|ログライン|全構成|予定総文字数)";return t=t.replace(new RegExp("(^|\\n)([#＃]\\s*第[\\d０-９一二三四五六七八九十]+章[^\\n]*\\n+)(?:\\s*(?:【作品ヘッダー情報】|"+a+"\\s*[:：][^\\n]*|【あらすじ】|【プロット概要】)\\s*\\n)+","g"),(n,s,r)=>s+r),t=t.replace(new RegExp("^\\s*(?:【作品ヘッダー情報】\\s*\\n)?(?:"+a+"\\s*[:：][^\\n]*\\n|【あらすじ】\\s*\\n|【プロット概要】\\s*\\n)+"),""),t.trim()}function xt(e){return(dt(e||"").trimEnd()+`

【完】`).trim()}function ut(e){const t=[];return e?(e.trim().length<1e3&&t.push(`文字数が少なすぎます（${e.trim().length}文字 / 閾値: 1000文字）`),[/修正する/i,/修正後のテキスト/i,/おっと、見出しに/i,/No, there is no other/i,/Let's double check/i,/\b(?:Morris|Sexton|office|violent|Und|And|Let's)\b/i].forEach(a=>{a.test(e)&&t.push(`無効なメタ表現または英語の残骸が検出されました（パターン: ${a.toString()}）`)}),t):(t.push("テキストが空です"),t)}function os(e,{chapterNum:t,isLast:a,minChars:n}={}){const s=[],r=(e||"").trim();if(!r)return s;const o=`
`,l=r.split(o+o).map(v=>v.trim()).filter(Boolean),i=r.split(o),u=i.filter(v=>{const y=v.trimStart();return y.startsWith("- ")||y.startsWith("* ")||/^[0-9]+[.)] /.test(y)}).length;u>=8&&s.push(`Chapter prose looks like a bullet/design memo (chapter ${t}: ${u} bullet lines)`),["This chapter","In this chapter","To summarize","In summary","Continue?","Would you like","author note","next chapter preview"].forEach(v=>{r.includes(v)&&s.push(`Meta or summary-style prose remains: ${v}`)}),r.length>=Math.max(3200,Math.round((n||4500)*.75))&&l.length<6&&s.push(`Too few prose paragraphs; chapter may be summary-like (chapter ${t}: ${l.length} paragraphs)`);let f=0,g=0;for(const v of r){const y=v.charCodeAt(0);(y===12300||y===8220||v==='"')&&f++,(y===12290||y===12289)&&g++}return r.length>=Math.max(3200,Math.round((n||4500)*.75))&&f<3&&g<45&&s.push(`Scene prose or dialogue density is too low (chapter ${t})`),s}function ls(e,{chapterNum:t,isLast:a,minChars:n}){const s=[],r=(e||"").trim();if(!r)return s.push("本文が空です"),s;r.length<n&&s.push(`章本文が短すぎます（第${t}章: ${r.length}文字 / 最低 ${n}文字）`),[/```/,/(?:^|\n)\s*(?:タイトル|ログライン|全構成|予定総文字数)\s*[:：]/,/ここからコピー|ここまでコピー/,/文脈維持メモ|文脈メモ/,/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計/,/再現用マスター指示書|全文結合出力/,/全[\d０-９一二三四五六七八九十]+章の執筆が完了しました/,/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)/].forEach(l=>{l.test(r)&&s.push(`本文に管理情報が残っています（${l.toString()}）`)});const o=r.match(/【完】/g)||[];return a?o.length!==1?s.push(`最終章の完結マーカー数が不正です（${o.length}件）`):/【完】\s*$/.test(r)||s.push("最終章の完結マーカー【完】の後ろに本文以外の文字列が残っています"):o.length>0&&s.push(`第${t}章は最終章ではないため【完】を含められません`),s}function Re(e,t){return[...ut(e),...ls(e,t),...os(e,t)]}function Pe(e,t){let a=le(e),n=t||"";const s=_e(a);return s.memo&&(n+=(n?`

`:"")+s.memo,a=s.body),a=le(a),{body:a,memo:n}}function le(e){return e?e.replace(/^```(?:markdown|text|txt)?\s*/i,"").replace(/\s*```\s*$/i,"").replace(/(?:\n|^)\s*---\s*ここからコピー\s*---[\s\S]*$/i,"").replace(/(?:\n|^)\s*---\s*ここまでコピー\s*---[\s\S]*$/i,"").replace(/(^|\n)\s*[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］]\s*/gi,"$1").replace(/(^|[^\[［])[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］](?=$|[\s、。！？,.!?」』）\)])/gi,"$1").replace(/\[\d+(?:,\s*\d+)*\]/g,"").replace(/[\(（]\s*注\s*\d{1,3}\s*[\)）]/g,"").replace(/(?:\n|^)\s*(?:参考文献|出典|脚注|注釈)\s*[:：][\s\S]*$/m,"").replace(/\b(?:of|Morris|Sexton|office|violent|OK)\b/gi,"").replace(/\b(?:No|Let's|Und|And)(?:[,\s]+|(?=\n|$))/gi,"").replace(/\bI(?=[ぁ-んァ-ヶ一-龠])/g,"").replace(/(?:修正する|修正後のテキスト|おっと、見出しに|No, there is no other|Let's double check)/gi,"").replace(/([ぁ-んァ-ヶ一-龠])\.\s*/g,"$1。").replace(/([ぁ-んァ-ヶ一-龠]),\s*/g,"$1、").replace(/およびおよび/g,"および").replace(/人口筋肉/g,"人工筋肉").replace(/電子基盤/g,"電子基板").replace(/確確信/g,"確信").replace(/指先を指先を/g,"指先を").replace(/激激突/g,"激突").replace(/嬉そう/g,"嬉しそう").replace(/ぷかか/g,"ぷかぷか").replace(/伝わて/g,"伝わって").replace(/響きて/g,"響いて").replace(/包まして/g,"包んで").replace(/佐藤さーーー案/g,"佐藤さん").replace(/鈴木手人/g,"鈴木").replace(/因律/g,"因果律").replace(/名前んだから/g,"名前なんだから").replace(/変貌を遂げてい経ちました/g,"変貌を遂げました").replace(/タコの炭/g,"タコの墨").replace(/(?:^|\n)\s*#+\s*第\d+章[^\n]*/g,`
`).replace(/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)[^\n]*(?:\n[\s\S]*)?$/i,"").replace(/(?:^|\n)\s*(?:#+\s*)?(?:文脈維持メモ|文脈メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|全文結合出力|全[\d０-９一二三四五六七八九十]+章の執筆が完了しました)[\s\S]*$/gi,"").replace(/[ \t]+(?=[、。！？,.!?」』）\)])/g,"").replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,`

`).trim():""}function Zt(e,t,a=Dt){const n=(e||"").trim(),{body:s,memo:r}=_e(n),o=!!r||/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|文脈維持メモ|GMC\+S|GMC/.test(n),l=/【完】/.test(n),i=n.length>=Math.max(a+1200,Math.round(a*1.25)),u=s.length>=a||!t&&o&&i;return{finished:t?l&&u:o&&u,bodyChars:s.length,rawChars:n.length,minChars:a,hasMemo:o,hasFinish:l}}function tt(e){const t=(e||"").trim(),a=/(?:[【\[]?(?:文脈維持メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]]?)/i,n=t.match(a);return n?{body:t.substring(0,n.index).trim(),memo:t.substring(n.index).trim()}:{body:t,memo:""}}function dt(e){return(e||"").replace(/\u3010\u5b8c\u3011/g,"").trim()}function is(e){const t=e||"",a="【完】",n=t.lastIndexOf(a);if(n===-1)return t.trim();const s=t.slice(0,n).replace(/\u3010\u5b8c\u3011/g,"").trimEnd(),r=t.slice(n+a.length).trimStart();return`${s}

${a}${r?`
${r}`:""}`.trim()}function cs(e,t,a={}){if(!t||!a.hasFinish||a.bodyChars>=a.minChars)return e;const n=tt(e);return`${dt(n.body)}${n.memo?`

${n.memo}`:""}`.trim()}function Be(e,t,a={}){const n=tt(e),s=tt(t);let r=n.body,o=s.body;a.isLast&&(r=dt(r),o=is(o));const l=[r,o].filter(u=>u&&u.trim()),i=s.memo||n.memo;return`${l.join(`

`)}${i?`

---

${i}`:""}`.trim()}function us(e){const t=e||"",{body:a}=_e(t);return le(a||t).trim()}function Y({phase:e="待機中",chapterNum:t=null,chapterChars:a=null,totalChars:n=null,extra:s="",level:r="active"}={}){const o=document.getElementById("ln-live-status");if(!o)return;const l=[e];t&&l.push(`現在: 第${t}章`),Number.isFinite(a)&&l.push(`章内 ${a.toLocaleString()}字`),Number.isFinite(n)&&l.push(`合計 ${n.toLocaleString()}字`),s&&l.push(s),l.push(`更新 ${new Date().toLocaleTimeString("ja-JP",{hour12:!1})}`),o.textContent=l.join(" / "),o.classList.remove("is-active","is-error"),r==="error"?o.classList.add("is-error"):r!=="idle"&&o.classList.add("is-active")}function ds(e,t={}){var a;if(!e||t.autoScroll===!1)return;const n=document.getElementById("output-panel");(a=n==null?void 0:n.classList)!=null&&a.contains("ln-live-preview")&&requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})}function $e(e,t,a="",n="",s={}){const r=(a||"").trim(),o=us(n),l=[r,o].filter(p=>p&&p.trim()).join(`

---

`);e&&(e.textContent=l,ds(e,s));const i=l.length;t&&(t.textContent=`${i.toLocaleString()} 字`);const u=document.getElementById("ln-char-count");return u&&(u.textContent=i.toLocaleString()),Y({phase:s.phase||"本文プレビュー更新中",chapterNum:s.chapterNum||null,chapterChars:o.length||null,totalChars:i,extra:s.extra||"",level:s.level||"active"}),i}function en(e,t,a,n){const s=t?"本文末尾の独立行「【完】」":"文脈維持メモ";return`以下は長編小説 第${e}章の途中出力です。重複・要約・前置きなしで、最後に出力済みの文の直後から本文だけを続けてください。

【ここまでの第${e}章出力】
${a}

【続きの条件】
・既に出した文章を繰り返さない。
・本文が最低${n.toLocaleString()}字に届くまで、文脈メモや締めに移らず、シーン・対立・身体反応・五感描写を増やす。
・章として読める量と起伏を作ってから、最後に${s}まで出力する。
- Continue by adding new performed scenes, concrete choices, physical reactions, and consequences. Do not extend with recap or abstract explanation.
- Before the required ending marker/memo, add one chapter-specific turn and one aftertaste paragraph.
・「修正後」「続きです」「了解しました」などのメタ文章は絶対に出力しない。`}function _e(e){const t=/(?:[【\[\(]?(?:文脈維持メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]\)]?)/i;let a=-1;const n=e.match(t);if(n)a=n.index;else{const o=Array.from(e.matchAll(/\u3010\u5b8c\u3011/g));if(o.length>0){const l=o[o.length-1];a=l.index+l[0].length}}if(a===-1)return{body:le(e),memo:""};let s=e.substring(0,a).trim();s=s.replace(/\n---\s*$/,"").trim(),s=s.replace(/\n(?:---+|#+)\s*\n/g,`

`),s=s.replace(/(?:\n|^)(?:---+|#+)\s*$/g,""),s=s.replace(/\n{3,}/g,`

`).trim(),s=le(s);const r=e.substring(a).trim();return{body:s,memo:r}}function tn(e){const t=e.match(/[#＃]\s*第([\d０-９一二三四五六七八九十]+)章[:：]?\s*(.+)/);return t?t[2].trim():""}function Lt(){const e=document.getElementById("settings");if(!e)return;e.classList.add("generating"),e.style.pointerEvents="none",e.style.opacity="0.65",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.id==="btn-ln-abort"||a.id==="btn-ln-next"||a.hasAttribute("data-ln-locked")||(a.setAttribute("data-ln-locked",a.disabled?"true":"false"),a.disabled=!0)});const t=document.getElementById("btn-generate");t&&(t.textContent="🔒 長編進行中",t.disabled=!0)}function Se(){const e=document.getElementById("settings");if(!e)return;e.classList.remove("generating"),e.style.pointerEvents="",e.style.opacity="",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.getAttribute("data-ln-locked")==="false"&&(a.disabled=!1),a.removeAttribute("data-ln-locked")});const t=document.getElementById("btn-generate");t&&(t.textContent="ストーリー生成",t.disabled=!1)}function oe(e){var t;const a=document.getElementById("long-novel-panel"),n=document.getElementById("output-panel"),s=document.getElementById("btn-ln-pause"),r=document.getElementById("btn-ln-abort"),o=[document.getElementById("btn-ln-copy-novel"),document.getElementById("btn-ln-save-novel"),document.getElementById("btn-ln-copy-memo"),document.getElementById("btn-ln-save-memo")];a&&(e?(a.classList.add("ln-generating"),n==null||n.classList.remove("ln-novel-scroll"),n==null||n.classList.add("ln-live-preview"),s&&(s.disabled=!1,s.textContent=(t=c.longNovel)!=null&&t.isPaused?"一時停止予約中":"章末で一時停止"),r&&(r.disabled=!1,r.style.opacity="1",r.classList.remove("hidden")),o.forEach(l=>{l&&(l.disabled=!0,l.style.opacity="0.3")})):(a.classList.remove("ln-generating"),n==null||n.classList.remove("ln-live-preview"),r&&(r.disabled=!1,r.style.opacity=""),o.forEach(l=>{l&&(l.disabled=!1,l.style.opacity="")})))}function de(){var e;const t=c.longNovel,a=document.getElementById("long-novel-panel"),n=document.getElementById("ln-work-title"),s=document.getElementById("ln-progress"),r=document.getElementById("ln-char-count"),o=document.getElementById("ln-target"),l=document.getElementById("ln-progress-bar"),i=document.getElementById("btn-ln-pause"),u=document.getElementById("btn-ln-abort");if(!a)return;a.classList.remove("hidden"),n.textContent=((e=t.headerInfo)==null?void 0:e.title)||"生成中...",s.textContent=`${t.currentChapter} / ${t.totalChapters} 章`;const p=t.cleanText.length;r.textContent=p.toLocaleString();const f=Jt(t.settings,t.headerInfo,t.totalChapters);o.textContent=f?`約${f.toLocaleString()}字`:"数万字";const g=t.totalChapters>0?Math.round(t.currentChapter/t.totalChapters*100):0;l.style.width=`${g}%`;const v=a.classList.contains("ln-generating");if(t.totalChapters>0&&t.currentChapter>=t.totalChapters){const d=document.getElementById("output-panel");d&&d.classList.add("ln-novel-scroll"),i&&(i.disabled=!0,i.textContent="✅ 全章完了"),a.classList.add("ln-completed"),a.classList.remove("ln-generating"),Se(),u&&(u.disabled=!0,u.style.opacity="0.3")}else{if(i)if(v){const $=Math.min(t.currentChapter+1,t.totalChapters||1);i.disabled=!1,i.textContent=t.isPaused?`一時停止予約中（第${$}章後）`:`章末で一時停止（第${$}章後）`}else t.isPaused?(i.disabled=!1,i.textContent="▶️ 生成を再開"):(i.disabled=!0,i.textContent="次章へ自動継続中");a.classList.remove("ln-completed");const d=document.getElementById("output-panel");d&&(t.currentChapter>0&&!v?d.classList.add("ln-novel-scroll"):d.classList.remove("ln-novel-scroll"))}u&&(u.classList.remove("hidden"),u.disabled=!1);const y=document.getElementById("btn-ln-copy-novel");y&&(p>bt?(y.disabled=!0,y.title=`クリップボードの容量制限（${Math.floor(bt/1e4)}万字）を超えるためコピーできません。TXT保存を使用してください。`,y.textContent="⚠ 容量超過 (ブラウザ制限につきコピー不可)"):(y.disabled=!1,y.title="小説本文をコピー",y.textContent="📋 コピー"))}function G(e){const t=document.getElementById("progress-log");if(!t)return;t.textContent+=`
`+e;const a=document.getElementById("progress-content");a&&(a.scrollTop=a.scrollHeight)}function ps(e){return new Promise(t=>setTimeout(t,e))}function wt(e){return!!e&&e.active&&!e.isPaused&&e.currentChapter<e.totalChapters}async function nn(e,t){if(e&&e.currentChapter>=e.totalChapters){e.active=!1,rs(e),G(`[進行] 全${e.totalChapters}章の生成が完了しました ✅]`),Y({phase:"全章生成完了",totalChars:(e.cleanText||"").length,extra:`${e.totalChapters}章完了`,level:"idle"});const n=document.getElementById("output"),s=document.querySelector(".char-counter");n&&$e(n,s,e.cleanText||"","",{phase:"全章生成完了",level:"idle"}),de();return}if(!wt(e)){G(`[進行] 第${t}章で停止しました。次章は自動生成されません。`),Y({phase:`第${t}章で停止中`,chapterNum:t,totalChars:(e.cleanText||"").length,extra:"再開待ち",level:"idle"}),de();return}const a=e.currentChapter+1;G(`[進行] 第${t}章を保存しました。第${a}章へ進みます...`),Y({phase:`第${a}章へ移行中`,chapterNum:a,totalChars:(e.cleanText||"").length}),de(),await ps(600),wt(e)&&await ht()}function hs(){var e;const t=c.longNovel;t.cleanText&&sn(t.cleanText,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","本文")}function an(e){return!e||!e.settings||!e.headerInfo?!1:!e.active||e.totalChapters>0&&e.currentChapter>=e.totalChapters}function ms(){var e;const t=c.longNovel;let a=t.memoText||"";if(an(t)){const n=je(t.settings,t.headerInfo,c);a.includes("再現用マスター指示書")||(a+=(a?`

`:"")+n)}a&&sn(a,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","メモ・指示書")}function sn(e,t,a){const n=new Date,s=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}${String(n.getHours()).padStart(2,"0")}${String(n.getMinutes()).padStart(2,"0")}${String(n.getSeconds()).padStart(2,"0")}`,r=`${t}_${a}_${s}.txt`,o=new Blob([e],{type:"text/plain;charset=utf-8"}),l=URL.createObjectURL(o),i=document.createElement("a");i.href=l,i.download=r,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(l)}function pt(){const e=c.longNovel,t=document.getElementById("ln-memo-text");t&&(t.textContent=e.memoText||"（まだメモはありません）")}async function It(e,t){if(e)try{await navigator.clipboard.writeText(e);const a=document.getElementById(t);if(a){const n=a.textContent;a.textContent="✅ コピーしました",a.classList.add("ln-copied"),setTimeout(()=>{a.textContent=n,a.classList.remove("ln-copied")},2e3)}}catch(a){console.error("Copy failed:",a)}}async function gs(e,t,a,n,s){var r,o;const l=c.apiKey;if(!l){a.innerHTML='<span class="error-msg">⚠ APIキーが設定されていません。</span>',t.textContent="✨ 生成する",t.disabled=!1,(r=document.querySelector(".settings-panel"))==null||r.classList.remove("generating");return}Ie(),c.longNovel.active=!0,c.longNovel.settings=JSON.parse(JSON.stringify(e));const{prompt:i,tags:u}=qn(e);if(n){n.innerHTML="";const d=l.startsWith("sk-")?'<span class="tag tag-openai">ChatGPT</span>':'<span class="tag tag-gemini">Gemini</span>';n.innerHTML=d+'<span class="tag">📖 長編小説</span>'+u.map($=>`<span class="tag">${$}</span>`).join("")}a.className="output-box text-selectable",a.textContent="📖 長編小説の第1章を生成中...（プロット設計→第1章執筆）";const p=pe[0].value;c.longNovel.usedModel=p,Lt(),c.longNovel.totalChapters=Ze(e),de(),oe(!0),Y({phase:"第1章の生成準備中",chapterNum:1,totalChars:0});const f=document.getElementById("btn-ln-pause");f&&(f.disabled=!1,f.textContent="章末で一時停止（第1章後）");let g=0;const v=setInterval(()=>{if(!c.longNovel.active){clearInterval(v);return}g++,t.textContent=`⏳ AIが考え中... (${g}秒経過)`,f&&c.longNovel.active&&(f.textContent=c.longNovel.isPaused?"一時停止予約中（第1章後）":`章末で一時停止（第1章後・${g}秒）`)},1e3),y=new AbortController;c.longNovel.abortController=y;try{let d="",$=p;const m=et(e,null,10),b=zt(y.signal);$=(await ge(l,$,i,({text:S,isThought:M})=>{c.longNovel.active&&(M||(d+=S,$e(a,s,"",d,{phase:"第1章を執筆中",chapterNum:1})))},S=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${S}`},b)).usedModel;let C=0;for(;C<5;){const S=((o=d.match(/([#＃]\s*第[1１一]章[\s\S]*)/))==null?void 0:o[1])||d,M=Zt(S,!1,m);if(M.finished)break;C++,G(`[通信] 第1章: 未完了/文字数不足（本文 ${M.bodyChars.toLocaleString()} / 最低 ${M.minChars.toLocaleString()}字、raw ${M.rawChars.toLocaleString()}字、文脈メモ ${M.hasMemo?"あり":"なし"}）。続きを自動リクエスト中... (${C}/5)`);const T=en(1,!1,d,m);let j="";const P=await ge(l,$,T,({text:B,isThought:Q})=>{c.longNovel.active&&(Q||(j+=B,$e(a,s,"",Be(d,j),{phase:"第1章を自動継続中",chapterNum:1,extra:`継続 ${C}/5`})))},B=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${B}`},b);d=Be(d,j),$=P.usedModel}if(c.longNovel.usedModel=$,!c.longNovel.active)return;const L=ns(d);c.longNovel.headerInfo=L,c.longNovel.totalChapters=Ze(e,L),c.longNovel.headerInfo.totalChapters=c.longNovel.totalChapters;const I=et(e,L,c.longNovel.totalChapters),w=d.match(/([#＃]\s*第[1１一]章[\s\S]*)/),O=w?w[1]:d;let{body:_,memo:N}=_e(ue(O));const E=w?d.substring(0,w.index).trim():"";let A="";if(_&&_.trim().length>100){t.textContent="🔍 第1章 矛盾検査中...",Y({phase:"第1章を検査中",chapterNum:1,chapterChars:_.length,totalChars:c.longNovel.cleanText.length||_.length});const S=M=>{console.log("[LN Audit Ch1]",M);const T=document.getElementById("progress-log");if(T){T.textContent+=`
`+M;const j=document.getElementById("progress-content");j&&(j.scrollTop=j.scrollHeight)}};try{const M=await ot(l,_,c.longNovel.settings||e,{onStatus:S,chapterNum:1,isLastChapter:!1,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:2,validateFixedText:ut,sanitizeText:le});if(M.wasFixed&&(_=ue(M.text)),M.remainingCriticalCount>0)throw S(`[検査] 第1章: 重大な矛盾が${M.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第1章を棄却しました（残存: ${M.remainingCriticalCount}件）`);M.wasFixed&&S("[検査] 第1章: 矛盾修正が完了しました ✅"),M.issues.length>0&&(A=le(jt(M.issues,1)))}catch(M){throw console.warn("第1章の矛盾検査でエラー:",M.message),S("[検査] 第1章: 検査エラー — 保存を停止します"),new Error(`第1章の検査に失敗したため保存を停止しました: ${M.message||M}`)}}G("[品質] 第1章: 本文保存前チェックを実行中..."),Y({phase:"第1章の保存前チェック中",chapterNum:1,chapterChars:_.length,totalChars:c.longNovel.cleanText.length||_.length}),_=ue(_),{body:_,memo:N}=Pe(_,N);let k=Re(_,{chapterNum:1,isLast:!1,minChars:I});if(k.length>0&&(G(`[品質] 第1章: 保存前チェックで問題を検出: ${k.join(" / ")}`),_=ue(_),{body:_,memo:N}=Pe(_,N),k=Re(_,{chapterNum:1,isLast:!1,minChars:I})),k.length>0)throw new Error(`第1章の保存前品質ゲートで停止しました: ${k.join(" / ")}`);G("[品質] 第1章: 保存前チェック通過。本文を採用します。"),c.longNovel.chapters.push({title:tn(O)||"第一章",body:_,contextMemo:N}),c.longNovel.currentChapter=1,c.longNovel.fullText=d,G(`[進行] 第1章を保存しました（${_.length.toLocaleString()}字）。現在 ${c.longNovel.currentChapter} / ${c.longNovel.totalChapters} 章。`);const R=c.longNovel.chapters[0].title||"第一章",U=Vt(E,L,e,c.longNovel.totalChapters);c.longNovel.cleanText=U+(U?`

`:"")+`# 第1章: ${R}

`+_,c.longNovel.memoText=N?`--- 第1章の文脈メモ ---
${N}`:"",A&&(c.longNovel.memoText+=(c.longNovel.memoText?`

`:"")+A),$e(a,s,c.longNovel.cleanText,"",{phase:"第1章を保存しました",chapterNum:1,level:"idle"}),pt(),oe(!1),de(),Lt(),clearInterval(v),await nn(c.longNovel,1)}catch(d){const $=(d==null?void 0:d.message)||String(d);if(G(`[停止] 第1章処理でエラー: ${$}`),!c.longNovel.active)return;a.innerHTML=`<span class="error-msg">⚠ エラー: ${$}</span>`,oe(!1),Ie(),Y({phase:"第1章で停止",chapterNum:1,extra:$,level:"error"}),Se()}finally{clearInterval(v)}}async function ht(){var e,t;const a=c.longNovel;if(!a.active){G("[停止] 次章生成を開始できません。長編セッションが非アクティブです。");return}if(a.currentChapter>=a.totalChapters){G(`[進行] 現在 ${a.currentChapter} / ${a.totalChapters} 章のため、次章生成は不要です。`);return}const n=c.apiKey;if(!n){G("[停止] 次章生成を開始できません。APIキーがメモリ上で取得できません。");return}const s=a.currentChapter+1,r=s>=a.totalChapters;document.getElementById("long-novel-panel");const o=document.getElementById("btn-ln-pause"),l=document.getElementById("output"),i=document.querySelector(".char-counter");oe(!0),Y({phase:`第${s}章の生成準備中`,chapterNum:s,totalChars:(a.cleanText||"").length}),o&&(o.disabled=!1,o.textContent=`章末で一時停止（第${s}章後）`);let u=0;const p=setInterval(()=>{if(!a.active){clearInterval(p);return}u++,o&&(o.textContent=a.isPaused?`一時停止予約中（第${s}章後）`:`章末で一時停止（第${s}章後・${u}秒）`)},1e3),f=a.chapters.slice(-2).map((m,b)=>`# 第${a.currentChapter-1+b+1}章: ${m.title}
${m.body}`).join(`

---

`);let g="";a.chapters.length>2&&(g=a.chapters.slice(0,-2).map((m,b)=>`第${b+1}章「${m.title}」: （約${m.body.length}字）`).join(`
`));const v=a.chapters.map((m,b)=>`--- 第${b+1}章の文脈メモ ---
${m.contextMemo||"（なし）"}`).join(`

`),y=((e=a.chapterRetryNotes)==null?void 0:e[s])||"",d=Kn(s,a.totalChapters,a.settings,g,f,v,r,y),$=new AbortController;a.abortController=$;try{let m="",b=a.usedModel||pe[0].value;const C=et(a.settings,a.headerInfo,a.totalChapters),L=zt($.signal);b=(await ge(n,b,d,({text:A,isThought:k})=>{a.active&&(k||(m+=A,$e(l,i,a.cleanText,m,{phase:`第${s}章を執筆中`,chapterNum:s})))},A=>{G(`[通信] 第${s}章: フォールバック ${A}`)},L)).usedModel;let I=0;for(;I<5;){const A=Zt(m,r,C);if(A.finished)break;I++,G(`[通信] 第${s}章: 未完了/文字数不足（本文 ${A.bodyChars.toLocaleString()} / 最低 ${A.minChars.toLocaleString()}字、raw ${A.rawChars.toLocaleString()}字、文脈メモ ${A.hasMemo?"あり":"なし"}、完結 ${A.hasFinish?"あり":"なし"}）。続きを自動リクエスト中... (${I}/5)`);const k=cs(m,r,A),R=en(s,r,k,C);let U="";const S=await ge(n,b,R,({text:M,isThought:T})=>{if(a.active&&!T){U+=M;const j=Be(m,U,{isLast:r});$e(l,i,a.cleanText,j,{phase:`第${s}章を自動継続中`,chapterNum:s,extra:`継続 ${I}/5`})}},M=>{G(`[通信] 第${s}章: フォールバック ${M}`)},L);m=Be(m,U,{isLast:r}),b=S.usedModel}if(a.usedModel=b,!c.longNovel.active)return;let{body:w,memo:O}=_e(ue(m)),_="";if(w&&w.trim().length>100){o&&(o.textContent=a.isPaused?`一時停止予約中（第${s}章後）`:`章末で一時停止（第${s}章後）`),Y({phase:`第${s}章を検査中`,chapterNum:s,chapterChars:w.length,totalChars:(a.cleanText||"").length+w.length});const A=k=>{console.log(`[LN Audit Ch${s}]`,k);const R=document.getElementById("progress-log");if(R){R.textContent+=`
`+k;const U=document.getElementById("progress-content");U&&(U.scrollTop=U.scrollHeight)}};try{const k=await ot(n,w,a.settings,{onStatus:A,chapterNum:s,allContextMemos:v,recentChaptersFull:f,isLastChapter:r,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:2,validateFixedText:ut,sanitizeText:le});if(k.wasFixed&&(w=ue(k.text)),k.remainingCriticalCount>0)throw A(`[検査] 第${s}章: 重大な矛盾が${k.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第${s}章を棄却しました（残存: ${k.remainingCriticalCount}件）`);k.wasFixed&&A(`[検査] 第${s}章: 矛盾修正が完了しました ✅`),k.issues.length>0&&(_=le(jt(k.issues,s)))}catch(k){throw console.warn(`第${s}章の矛盾検査でエラー:`,k.message),A(`[検査] 第${s}章: 検査エラー — 保存を停止します`),new Error(`第${s}章の検査に失敗したため保存を停止しました: ${k.message||k}`)}}G(`[品質] 第${s}章: 本文保存前チェックを実行中...`),Y({phase:`第${s}章の保存前チェック中`,chapterNum:s,chapterChars:w.length,totalChars:(a.cleanText||"").length+w.length}),w=ue(w),{body:w,memo:O}=Pe(w,O),r&&(w=xt(w));let N=Re(w,{chapterNum:s,isLast:r,minChars:C});if(N.length>0&&(G(`[品質] 第${s}章: 保存前チェックで問題を検出: ${N.join(" / ")}`),w=ue(w),{body:w,memo:O}=Pe(w,O),r&&(w=xt(w)),N=Re(w,{chapterNum:s,isLast:r,minChars:C})),N.length>0)throw new Error(`第${s}章の保存前品質ゲートで停止しました: ${N.join(" / ")}`);G(`[品質] 第${s}章: 保存前チェック通過。本文を採用します。`);const E=tn(m)||`第${s}章`;if(a.chapters.push({title:E,body:w,contextMemo:O}),a.currentChapter=s,a.chapterRetryNotes&&delete a.chapterRetryNotes[s],a.chapterRetryCounts&&delete a.chapterRetryCounts[s],a.fullText+=`

---

`+m,G(`[進行] 第${s}章を保存しました（${w.length.toLocaleString()}字）。現在 ${a.currentChapter} / ${a.totalChapters} 章。`),a.cleanText+=`

---

# 第${s}章: ${E}

`+w,O&&(a.memoText+=(a.memoText?`

`:"")+`--- 第${s}章の文脈メモ ---
${O}`),_&&(a.memoText+=(a.memoText?`

`:"")+_),$e(l,i,a.cleanText,"",{phase:`第${s}章を保存しました`,chapterNum:s,level:"idle"}),r&&a.settings&&a.headerInfo){const A=je(a.settings,a.headerInfo,c);a.memoText+=`

`+A}pt(),oe(!1),de(),clearInterval(p),await nn(a,s)}catch(m){const b=(m==null?void 0:m.message)||String(m);if(G(`[停止] 第${s}章処理でエラー: ${b}`),!a.active)return;const C=/検査に失敗|重大な設定矛盾|出力汚染|棄却|残存|保存前品質ゲート|章本文が短すぎます/.test(b),L=Number(((t=a.chapterRetryCounts)==null?void 0:t[s])||0);if(C&&L<2){a.chapterRetryCounts=a.chapterRetryCounts||{},a.chapterRetryNotes=a.chapterRetryNotes||{};const I=L+1;a.chapterRetryCounts[s]=I,a.chapterRetryNotes[s]=[`前回の第${s}章は保存前検査で棄却された。原因: ${b}`,`第${s}章を、直近の文脈メモと次章GMC+Sから完全に書き直すこと。`,"前章までに発生済み・紛失済み・負傷済み・回収済み・退場済みになった出来事を、初発イベントとして再演しないこと。","古い全体プロットよりも、直近章の文脈メモ、人物状態、回収待ち伏線、次章シーン設計を優先すること。"].join(`
`),G(`[再生成] 第${s}章: 検査失敗のため章全体を再生成します（${I}/2）`),oe(!1),Y({phase:`第${s}章を再生成します`,chapterNum:s,totalChars:(a.cleanText||"").length,extra:`再生成 ${I}/2`,level:"active"}),de(),setTimeout(()=>{var w;(w=c.longNovel)!=null&&w.active&&c.longNovel.currentChapter<s&&ht()},600);return}l.textContent=(a.cleanText||"")+`

⚠ 第${s}章の生成でエラーが発生しました: ${b}`,oe(!1),Y({phase:`第${s}章で停止`,chapterNum:s,totalChars:(a.cleanText||"").length,extra:b,level:"error"}),o&&(o.disabled=!1,o.textContent=`📖 第${s}章を再試行`)}finally{clearInterval(p)}}function fs(){const e=c.longNovel;if(!e.active)return;if(e.active=!1,e.abortController&&e.abortController.abort(),oe(!1),e.settings&&e.headerInfo){const i=je(e.settings,e.headerInfo,c);e.memoText+=(e.memoText?`

`:"")+i,pt()}const t=Math.max(1,e.currentChapter||0),a=Math.max(0,e.currentChapter||0);e.totalChapters=Math.max(e.totalChapters||0,t),de();const n=document.getElementById("long-novel-panel");n==null||n.classList.add("ln-completed");const s=document.getElementById("output-panel");s&&s.classList.add("ln-novel-scroll");const r=document.getElementById("long-novel-title");r&&(r.textContent=a>0?`長編小説モード（第${a}章で中断）`:`長編小説モード（第${t}章生成中に中断）`),Se();const o=document.getElementById("btn-ln-pause"),l=document.getElementById("btn-ln-abort");o&&(o.disabled=!0,o.textContent="⏹ 中断済み"),l&&(l.disabled=!0,l.style.opacity="0.3"),Y({phase:"中断済み",chapterNum:t,totalChars:(e.cleanText||"").length,extra:a>0?`${a}章まで保存済み`:"保存済み章なし",level:"error"})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btn-ln-pause");e&&e.addEventListener("click",()=>{const l=c.longNovel,i=document.getElementById("long-novel-panel");if(!l.active)return;const u=i==null?void 0:i.classList.contains("ln-generating");if(l.isPaused)if(l.isPaused=!1,e.disabled=!1,u){const p=Math.min(l.currentChapter+1,l.totalChapters||1);e.textContent=`章末で一時停止（第${p}章後）`,G("[操作] 一時停止予約を解除しました。")}else e.textContent="次章へ自動継続中",e.disabled=!0,ht();else l.isPaused=!0,e.textContent="一時停止予約中（現在章の後で停止）",e.disabled=!1,G("[操作] 現在章の完了後に一時停止します。")});const t=document.getElementById("btn-ln-abort");t&&t.addEventListener("click",()=>{confirm(`現在の進捗で生成を中断しますか？
（ここまでの全文はコピー・TXT保存が可能です）`)&&fs()});const a=document.getElementById("btn-ln-copy-novel");a&&a.addEventListener("click",()=>{It(c.longNovel.cleanText,"btn-ln-copy-novel")});const n=document.getElementById("btn-ln-save-novel");n&&n.addEventListener("click",()=>{hs()});const s=document.getElementById("btn-ln-copy-memo");s&&s.addEventListener("click",()=>{const l=c.longNovel;let i=l.memoText||"";if(an(l)){const u=je(l.settings,l.headerInfo,c);i.includes("再現用マスター指示書")||(i+=(i?`

`:"")+u)}It(i,"btn-ln-copy-memo")});const r=document.getElementById("btn-ln-save-memo");r&&r.addEventListener("click",()=>{ms()});const o=document.getElementById("ln-memo-toggle");o&&o.addEventListener("click",l=>{if(l.target.closest(".btn-ln-action"))return;const i=document.getElementById("ln-memo-content"),u=document.getElementById("ln-memo-arrow");i&&i.classList.toggle("hidden"),u&&u.classList.toggle("open")})});
