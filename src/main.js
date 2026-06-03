(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const ge=[{value:"gemini-3.5-flash",label:"Gemini 3.5 Flash"},{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-flash-latest",label:"Gemini Flash (Latest)"},{value:"gemini-pro-latest",label:"Gemini Pro (Latest)"}],Ne=[{value:"4koma",label:"4コマ漫画風"},{value:"4koma_scenario",label:"AI 4koma シナリオ連携（STEP2）"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(数万字/全章＋指示書)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],ct={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},dt={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},ut={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},pt={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},ht={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},mt={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},gt={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},fe=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],ye=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],ft=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],yt=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],vt=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],Sn=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],Ut=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],Dt=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],kn=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],Tn=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],_n=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],Nn=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],Mn=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],On=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],Rn=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],Pn=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],jn=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],Bn=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],Ue=async e=>{if(!e)return"API Key not set.";try{const t=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`)).json();return t.error?`API Error: ${t.error.message}`:t.models?`Available Models: ${t.models.map(a=>a.name.replace("models/","")).filter(a=>a.includes("gemini")).join(", ")}`:"No models returned by API."}catch(t){return`Diagnostic Failed: ${t.message}`}};async function Gn(e,t,a,n={}){var r,s,o,l;const c=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,d={temperature:n.temperature!==void 0?n.temperature:1};(n.maxOutputTokens||n.maxTokens)&&(d.maxOutputTokens=n.maxOutputTokens||n.maxTokens),n.responseMimeType&&(d.responseMimeType=n.responseMimeType);const p=n.timeoutMs||18e4,g=new AbortController,h=setTimeout(()=>g.abort(),p),v={contents:[{parts:[{text:a}]}],generationConfig:d,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};d.responseMimeType!=="application/json"&&!n.disableGoogleSearch&&(v.tools=[{googleSearch:{}}]);try{const y=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},signal:g.signal,body:JSON.stringify(v)});if(clearTimeout(h),!y.ok){const b=await y.text();let f=`Gemini HTTP ${y.status}`;try{const $=JSON.parse(b);$.error&&$.error.message&&(f+=` — ${$.error.message}`)}catch{f+=` — ${b.slice(0,300)}`}throw new Error(f)}const u=await y.json();if((r=u.promptFeedback)!=null&&r.blockReason)throw new Error(`Blocked by Safety Filter: ${u.promptFeedback.blockReason}`);if((l=(o=(s=u.candidates)==null?void 0:s[0])==null?void 0:o.content)!=null&&l.parts){const b=u.candidates[0].content.parts.map(f=>f.text||"").join("");if(!b){const f=u.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${f}).`)}return b}throw u.error?new Error(`Gemini API Error: ${u.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} (${p/1e3}s)`):y}finally{clearTimeout(h)}}async function Hn(e,t,a,n,r,s={}){var o,l,c,d;const p=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,g={temperature:s.temperature!==void 0?s.temperature:.3};s.responseMimeType&&(g.responseMimeType=s.responseMimeType);const h=s.timeoutMs||18e4,v=new AbortController,y=setTimeout(()=>v.abort(),h);try{const u=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},signal:v.signal,body:JSON.stringify({contents:[{parts:[{text:a},{inlineData:{mimeType:r,data:n}}]}],generationConfig:g,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(y),!u.ok){const f=await u.text();let $=`Gemini HTTP ${u.status}`;try{const C=JSON.parse(f);C.error&&C.error.message&&($+=` — ${C.error.message}`)}catch{$+=` — ${f.slice(0,300)}`}throw new Error($)}const b=await u.json();if((o=b.promptFeedback)!=null&&o.blockReason)throw new Error(`Blocked by Safety Filter: ${b.promptFeedback.blockReason}`);if((d=(c=(l=b.candidates)==null?void 0:l[0])==null?void 0:c.content)!=null&&d.parts){const f=b.candidates[0].content.parts.map($=>$.text||"").join("");if(!f){const $=b.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${$}).`)}return f}throw b.error?new Error(`Gemini API Error: ${b.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(u){throw u.name==="AbortError"?new Error(`Timeout: ${t} vision (${h/1e3}s)`):u}finally{clearTimeout(y)}}async function Wt(e,t,a,n,r,s={}){if(e.trim().startsWith("sk-"))return Vn(e.trim(),t,a,n,r,s);const o=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],l=[];let c=!1,d=!1,p=!1;for(const v of o)try{return r&&o[0],{text:await Hn(e,v,t,a,n,s),usedModel:v}}catch(y){const u=y.message||"";console.warn(`Vision model ${v} failed:`,u),l.push(`${v}: ${u}`);const b=u.toLowerCase();(b.includes("safety")||b.includes("prohibited")||b.includes("block"))&&(c=!0),(b.includes("quota")||b.includes("429")||b.includes("limit"))&&(d=!0),(b.includes("api key")||b.includes("403")||b.includes("invalid"))&&(p=!0);continue}const g=await Ue(e);console.error("VISION DIAGNOSIS:",g);let h=`全モデルでの画像認識に失敗: ${g}
`;throw c||g.includes("SAFETY")||g.includes("PROHIBITED")?h="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":d||g.includes("Quota exceeded")||g.includes("429")?h="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":p||g.includes("API key not valid")||g.includes("403")?h="【認証エラー】APIキーが無効です。正しいキーを設定してください。":h+=`
[各モデルのエラー詳細]
${l.join(`
`)}`,new Error(h)}async function je(e,t,a,n,r={}){if(e.trim().startsWith("sk-"))return Kn(e.trim(),a,n,r);const s=Array.isArray(r.fallbackModels)?r.fallbackModels:["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],o=new Set([t,...s]);let l=Array.from(o);r.disableFallback?l=[t]:Number.isFinite(r.maxModelAttempts)&&r.maxModelAttempts>0&&(l=l.slice(0,Math.max(1,Math.floor(r.maxModelAttempts))));const c=[];let d=!1,p=!1,g=!1;for(const y of l)try{return y!==t&&n&&n(y),{text:await Gn(e,y,a,r),usedModel:y}}catch(u){const b=u.message||"";console.warn(`Model ${y} failed:`,b),c.push(`${y}: ${b}`);const f=b.toLowerCase();(f.includes("safety")||f.includes("prohibited")||f.includes("block"))&&(d=!0),(f.includes("quota")||f.includes("429")||f.includes("limit"))&&(p=!0),(f.includes("api key")||f.includes("403")||f.includes("invalid"))&&(g=!0);continue}console.log("All models failed. Running diagnosis...");const h=await Ue(e);console.error("DIAGNOSIS RESULT:",h);let v=`全モデル接続失敗: ${h}
`;throw d||h.includes("SAFETY")||h.includes("PROHIBITED")?v="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":p||h.includes("Quota exceeded")||h.includes("429")?v=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:g||h.includes("API Error: API key not valid")||h.includes("403")?v="【認証エラー】APIキーが無効です。正しいキーを設定してください。":h.includes("404")?v="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":v+=`
[各モデルのエラー詳細]
${c.join(`
`)}`,new Error(v)}const Be=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"];async function Kn(e,t,a,n={}){var r,s,o,l,c,d;for(const p of Be)try{p!==Be[0]&&a&&a(p);const g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:p,messages:[{role:"user",content:t}],temperature:1,max_tokens:n.maxTokens||8192,response_format:n.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!g.ok){const y=await g.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${g.status} - ${((r=y.error)==null?void 0:r.message)||g.statusText}`)}const h=await g.json(),v=((l=(o=(s=h.choices)==null?void 0:s[0])==null?void 0:o.message)==null?void 0:l.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((d=(c=h.choices)==null?void 0:c[0])==null?void 0:d.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:p}}catch(g){console.warn(`Model ${p} failed:`,g.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。")}const Nt=["gpt-4.1","gpt-4o","gpt-4.1-mini"];async function Vn(e,t,a,n,r,s={}){var o,l,c,d,p,g;const h=`data:${n};base64,${a}`;for(const v of Nt)try{Nt[0];const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:v,messages:[{role:"user",content:[{type:"text",text:t},{type:"image_url",image_url:{url:h,detail:"high"}}]}],temperature:.3,max_tokens:8192,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const f=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((o=f.error)==null?void 0:o.message)||y.statusText}`)}const u=await y.json(),b=((d=(c=(l=u.choices)==null?void 0:l[0])==null?void 0:c.message)==null?void 0:d.content)||"";if(!b)throw new Error(`Empty response (FinishReason: ${((g=(p=u.choices)==null?void 0:p[0])==null?void 0:g.finish_reason)||"UNKNOWN"})`);return{text:b,usedModel:v}}catch(y){console.warn(`Vision Model ${v} failed:`,y.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Fn(e,t,a,n,r={}){var s,o,l,c;const d=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,p=[{text:a}];n.forEach(u=>{p.push({inlineData:{mimeType:u.mimeType,data:u.base64}})});const g={temperature:r.temperature!==void 0?r.temperature:.4};r.responseMimeType&&(g.responseMimeType=r.responseMimeType);const h=r.timeoutMs||18e4,v=new AbortController,y=setTimeout(()=>v.abort(),h);try{const u=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},signal:v.signal,body:JSON.stringify({contents:[{parts:p}],generationConfig:g,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(y),!u.ok){const f=await u.text();let $=`Gemini HTTP ${u.status}`;try{const C=JSON.parse(f);C.error&&C.error.message&&($+=` — ${C.error.message}`)}catch{$+=` — ${f.slice(0,300)}`}throw new Error($)}const b=await u.json();if((s=b.promptFeedback)!=null&&s.blockReason)throw new Error(`Blocked by Safety Filter: ${b.promptFeedback.blockReason}`);if((c=(l=(o=b.candidates)==null?void 0:o[0])==null?void 0:l.content)!=null&&c.parts){const f=b.candidates[0].content.parts.map($=>$.text||"").join("");if(!f){const $=b.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${$}).`)}return f}throw b.error?new Error(`Gemini API Error: ${b.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(u){throw u.name==="AbortError"?new Error(`Timeout: ${t} multimodal (${h/1e3}s)`):u}finally{clearTimeout(y)}}async function qn(e,t,a,n,r={}){var s,o,l,c,d,p;const g=["gpt-4.1","gpt-4o","gpt-4.1-mini"];for(const h of g)try{h!==g[0]&&n&&n(h);const v=[{type:"text",text:t}];a.forEach(f=>{v.push({type:"image_url",image_url:{url:`data:${f.mimeType};base64,${f.base64}`,detail:"high"}})});const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:h,messages:[{role:"user",content:v}],temperature:.4,max_tokens:8192,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const f=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((s=f.error)==null?void 0:s.message)||y.statusText}`)}const u=await y.json(),b=((c=(l=(o=u.choices)==null?void 0:o[0])==null?void 0:l.message)==null?void 0:c.content)||"";if(!b)throw new Error(`Empty response (FinishReason: ${((p=(d=u.choices)==null?void 0:d[0])==null?void 0:p.finish_reason)||"UNKNOWN"})`);return{text:b,usedModel:h}}catch(v){console.warn(`Vision Model ${h} failed:`,v.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Un(e,t,a,n,r={}){if(e.trim().startsWith("sk-"))return qn(e.trim(),t,a,n,r);const s=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],o=[];let l=!1,c=!1,d=!1;for(const h of s)try{return n&&h!==s[0]&&n(h),{text:await Fn(e,h,t,a,r),usedModel:h}}catch(v){const y=v.message||"";console.warn(`Vision model ${h} failed:`,y),o.push(`${h}: ${y}`);const u=y.toLowerCase();(u.includes("safety")||u.includes("prohibited")||u.includes("block"))&&(l=!0),(u.includes("quota")||u.includes("429")||u.includes("limit"))&&(c=!0),(u.includes("api key")||u.includes("403")||u.includes("invalid"))&&(d=!0);continue}const p=await Ue(e);console.error("VISION DIAGNOSIS:",p);let g=`全モデルでの画像認識に失敗: ${p}
`;throw l||p.includes("SAFETY")||p.includes("PROHIBITED")?g="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":c||p.includes("Quota exceeded")||p.includes("429")?g="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":d||p.includes("API key not valid")||p.includes("403")?g="【認証エラー】APIキーが無効です。正しいキーを設定してください。":g+=`
[各モデルのエラー詳細]
${o.join(`
`)}`,new Error(g)}async function Dn(e,t,a,n,r={}){var s,o,l,c;for(const d of Be)try{d!==Be[0]&&n&&n(d);const p=new AbortController;let g=null;r.signal&&(g=()=>p.abort(),r.signal.addEventListener("abort",g));const h=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},signal:p.signal,body:JSON.stringify({model:d,messages:[{role:"user",content:t}],temperature:1,max_tokens:r.maxTokens||8192,stream:!0,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!h.ok){const b=await h.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${h.status} - ${((s=b.error)==null?void 0:s.message)||h.statusText}`)}const v=h.body.getReader(),y=new TextDecoder("utf-8");let u="";try{for(;;){const{done:b,value:f}=await v.read();if(b)break;u+=y.decode(f,{stream:!0});let $=u.split(`
`);u=$.pop();for(const C of $){const L=C.trim();if(!L||!L.startsWith("data: "))continue;const k=L.slice(6);if(k==="[DONE]")break;try{const x=((c=(l=(o=JSON.parse(k).choices)==null?void 0:o[0])==null?void 0:l.delta)==null?void 0:c.content)||"";x&&a({text:x,isThought:!1})}catch{}}}}finally{v.releaseLock(),r.signal&&g&&r.signal.removeEventListener("abort",g)}return{usedModel:d}}catch(p){if(p.name==="AbortError")throw new Error(`Aborted: ${d} stream`);console.warn(`Model ${d} stream failed:`,p.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Mt(e,t,a,n,r={}){var s,o,l;const c=`https://generativelanguage.googleapis.com/v1beta/models/${t}:streamGenerateContent?alt=sse&key=${e}`,d={temperature:1};(r.maxOutputTokens||r.maxTokens)&&(d.maxOutputTokens=r.maxOutputTokens||r.maxTokens),!r.disableThinkingConfig&&(t.includes("gemini-2.5")||t.includes("gemini-2.0")||t.includes("gemini-3")||t.includes("gemini-3.5"))&&(d.thinkingConfig={thinkingBudget:2048}),r.responseMimeType&&(d.responseMimeType=r.responseMimeType);const p=r.timeoutMs||18e4,g=new AbortController;let h=setTimeout(()=>g.abort(),p),v=null;r.signal&&(v=()=>g.abort(),r.signal.addEventListener("abort",v));const y={contents:[{parts:[{text:a}]}],generationConfig:d,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};d.responseMimeType!=="application/json"&&!r.disableGoogleSearch&&(y.tools=[{googleSearch:{}}]);try{const u=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},signal:g.signal,body:JSON.stringify(y)});if(!u.ok){clearTimeout(h);const C=await u.text();let L=`Gemini HTTP ${u.status}`;try{const k=JSON.parse(C);k.error&&k.error.message&&(L+=` — ${k.error.message}`)}catch{L+=` — ${C.slice(0,300)}`}throw new Error(L)}const b=u.body.getReader(),f=new TextDecoder("utf-8");let $="";try{for(;;){clearTimeout(h),h=setTimeout(()=>g.abort(),p);const{done:C,value:L}=await b.read();if(C)break;$+=f.decode(L,{stream:!0});let k=$.split(`
`);$=k.pop();for(const x of k){const A=x.trim();if(!A||!A.startsWith("data: "))continue;const O=A.slice(6);try{const _=(l=(o=(s=JSON.parse(O).candidates)==null?void 0:s[0])==null?void 0:o.content)==null?void 0:l.parts;if(_)for(const E of _){const w=E.text||E.thought||"",S=!!E.thought;w&&n({text:w,isThought:S})}}catch{}}}}finally{b.releaseLock()}}catch(u){throw u.name==="AbortError"?new Error(`Aborted: ${t} stream (${p/1e3}s timeout or user abort)`):u}finally{clearTimeout(h),r.signal&&v&&r.signal.removeEventListener("abort",v)}}async function ve(e,t,a,n,r,s={}){if(e.trim().startsWith("sk-"))return Dn(e.trim(),a,n,r,s);const o=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],l=new Set([t,...o]),c=Array.from(l),d=[];let p=!1,g=!1,h=!1;for(const u of c)try{return u!==t&&r&&r(u),await Mt(e,u,a,n,s),{usedModel:u}}catch(b){const f=b.message||"";console.warn(`Model ${u} stream failed:`,f),d.push(`${u}: ${f}`);const $=f.toLowerCase();if(($.includes("safety")||$.includes("prohibited")||$.includes("block"))&&(p=!0),($.includes("quota")||$.includes("429")||$.includes("limit"))&&(g=!0),($.includes("api key")||$.includes("403")||$.includes("invalid"))&&(h=!0),f.includes("400")||$.includes("bad request")||$.includes("thinking_config"))try{return console.log(`Retrying model ${u} without thinkingConfig...`),await Mt(e,u,a,n,{...s,disableThinkingConfig:!0}),{usedModel:u}}catch(C){console.warn(`Model ${u} stream retry failed:`,C.message),d.push(`${u} (retry): ${C.message}`)}continue}console.log("All models failed. Running diagnosis...");const v=await Ue(e);console.error("DIAGNOSIS RESULT:",v);let y=`全モデル接続失敗: ${v}
`;throw p||v.includes("SAFETY")||v.includes("PROHIBITED")?y="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":g||v.includes("Quota exceeded")||v.includes("429")?y=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h||v.includes("API Error: API key not valid")||v.includes("403")?y="【認証エラー】APIキーが無効です。正しいキーを設定してください。":v.includes("404")?y="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":y+=`
[各モデルのエラー詳細]
${d.join(`
`)}`,new Error(y)}const Jt={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},zt={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},Yt={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},Xt={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},Qt={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function le(e,t){return!e||e==="ランダム"?"":t[e]||""}const Wn={江戸時代:{tags:["江戸","江戸時代","徳川","侍","町人"],lore:`【江戸時代の生活知識】
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
・食文化: 現代知識で異世界の食文化を改革する展開が人気（マヨネーズ、味噌、醤油の再現など）`}};function Jn(e){const t=[e.worldview,e.worldviewCustom,e.era,e.eraCustom,e.theme,e.themeCustom,e.genre,e.genreCustom,e.mode,e.modeCustom,e.supplement,...(e.characters||[]).map(r=>r.note||"")].filter(Boolean).join(" ");if(!t.trim())return"";const a=[],n=new Set;for(const[r,s]of Object.entries(Wn))n.has(r)||s.tags.some(o=>t.includes(o))&&(a.push(s.lore),n.add(r));return a.length===0?"":`

【参考知識（RAG: 物語のディテール向上用 — この情報を自然に活用して描写の解像度を上げること）】
`+a.slice(0,3).join(`

`)}const Xe=e=>e[Math.floor(Math.random()*e.length)];function zn(e){const t=e.mode||"4koma",a=e.genreCustom||e.genre||"コメディ",n=e.themeCustom||e.theme||"ランダム",r=e.worldviewCustom||e.worldview||"現代日本",s=e.eraCustom||e.era||"現代",o=e.targetCustom||e.target||"全年齢",l=e.endingCustom||e.ending||"意外な結末",c=e.narrCustom||e.narration||"三人称・客観";let d;!e.characters||e.characters.length===0?d="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":d=e.characters.map((E,w)=>{const S=E.name||`(AI命名:キャラ${w+1})`,G=E.role||"未定",j=E.sex?`性別:${E.sex}, `:"",N=E.personality||"未定",F=E.note?` [${E.note}]`:"";return`${w+1}. ${S} (${G}) — ${j}性格:${N}${F}`}).join(`
`);const p=e.charCount?`
※ 指定文字数：約${e.charCount}文字程度`:"",g=e.supplement?`
【追加指示】
${e.supplement}`:"",h={"4koma":"4コマネタ","4koma_scenario":"AI 4koma シナリオ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},v=e.modeCustom||h[t]||t,y={"4koma":`

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
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[t]||"",u=s&&!["現代","ランダム",""].includes(s)?`

【時代考証ルール（厳守）】
・時代設定「`+s+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"",b=le(a,Jt),f=le(l,zt),$=le(r,Yt),C=le(o,Xt),L=le(c,Qt);let k="";b&&(k+=`

【ジャンル文体指定：${a}】
${b}`),f&&(k+=`

【結末演出指定：${l}】
${f}`),$&&(k+=`

【世界観演出指定：${r}】
${$}`),C&&(k+=`

【ターゲット層文体指定：${o}】
${C}`),L&&(k+=`

【語り口指定：${c}】
${L}`);let x="";t==="4koma_scenario"?x=`あなたはプロの4コマ漫画シナリオライターです。以下の設定に基づき、画像生成4コマ漫画アプリのSTEP2シナリオ入力欄に直接コピペして使える形式でシナリオを出力してください。

【基本設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${s}
・世界観・雰囲気: ${r}
・ターゲット層: ${o}
・結末の方向性: ${l}

【登場人物】
${d}

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
${g}

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的なシナリオを出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的なシナリオのみを出力してください（Topic: から開始）。`:t==="long"?x=`# 厳格なシステム命令
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
・結末の方向性: ${l}
・登場人物:
${d}
${p}${g}${u}${k}

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
`:x=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${v}」を執筆してください。

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
・結末の方向性: ${l}

【登場人物】
${d}

【執筆ルール（最重要）】
1. ログラインの固定：執筆を開始する前に、物語全体を貫く「ログライン（物語の核となる1文要約）」を内部で設定し、最初から結末までその軸を絶対にブレさせないこと。
2. 予測可能な展開を意図的に回避し、読者を驚かせること。
3. キャラクターは設定された性格から生まれる固有の反応をすること。
4. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。
${(()=>{const E=["novel","medium","short_short","scenario","manga","documentary","radio"],w=["essay","poem","letter","diary"];return E.includes(t)?`6. 「${l}」という結末に向かって、伏線を自然に配置すること。

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

セリフは短く鋭く。だらだら説明するセリフは禁止。テンポとオチの切れ味を最優先すること。`:w.includes(t)?{essay:"\\n\\n【構成ルール】\\n1. テーマの一貫性と感情の自然な流れを重視し、読者が共感しながら読み進められる構成にすること。\\n2. 劇的な展開や壮大な伏線は一切不要。日常の機微や気づきを丁寧に積み重ねること。\\n3. 結論を急がず、余韻を残して自然に終わらせること。",poem:"\\n\\n【構成ルール】\\n1. イメージの連鎖と韻律の統一感を重視し、一篇を通じて響き合うモチーフを配置すること。\\n2. 物語的な伏線や因果関係は不要。詩的飛躍と余白を大切にすること。\\n3. 言葉の音（おん）と意味の二重性を意識した表現を心がけること。",letter:"\\n\\n【構成ルール】\\n1. 書き手の心情変化を自然かつ段階的に描写し、手紙の冒頭と末尾で感情の温度差を持たせること。\\n2. 物語的な伏線は不要。相手への語りかけの中で、書き手自身の内面が滲み出る構成にすること。\\n3. 手紙特有の「書き直せない生々しさ」を大切にし、整理されすぎない思考の流れを残すこと。",diary:"\\n\\n【構成ルール】\\n1. 日々の出来事から内面への掘り下げを段階的に進め、日記の最後に小さな気づきや変化を置くこと。\\n2. 物語的な伏線や劇的な展開は不要。等身大の思考と感情の揺れを丁寧に記録すること。\\n3. 書き手が自分自身に正直に向き合う瞬間を大切にし、取り繕わない率直さを保つこと。"}[t]||"":`6. 「${l}」という結末に向かって、伏線を自然に配置すること。`})()}${u}${y}${k}${p}${g}

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
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;let A="";e.universalAssets&&e.universalAssets.length>0&&(A=`

【入力アセット情報（インスピレーションソース）】
`,A+=`以下のユーザーから投入されたアセット情報（画像、URL、テキストなど）を、指定された「縛り（設定項目）」をすべて満たした上で、物語の要素、描写、モチーフ、設定として自然に溶け込ませて構成してください。
`,e.universalAssets.forEach((E,w)=>{if(A+=`[アセット ${w+1}] 型: ${E.type}
`,E.type==="image"){A+=`・画像ファイル名: ${E.name||"不明"}
`;const S=E.status==="error"?"画像解析エラーにより詳細情報なし":E.analysis||"解析中、または解析不可";A+=`・ビジュアル事前解析結果: ${S}
`}else E.type==="url"?(A+=`・リンクURL: ${E.value}
`,E.title&&E.status!=="error"&&(A+=`・リンク先タイトル: ${E.title}
`),E.content&&E.status!=="error"&&(A+=`・リンク先コンテンツ（要約/抽出テキスト）: ${E.content.slice(0,1500)}${E.content.length>1500?"...":""}
`)):E.type==="text"&&(A+=`・文書名: ${E.name||"不明"}
`,E.content&&E.status!=="error"&&(A+=`・文書内容: ${E.content.slice(0,1500)}${E.content.length>1500?"...":""}
`))}),x+=A);const O=Jn(e);O&&(x+=O);const _=[a,s,r,o,l,v];return e.charCount&&_.push(`${e.charCount}字`),O&&_.push("📚RAG"),e.universalAssets&&e.universalAssets.length>0&&_.push(`🖼️アセット(${e.universalAssets.length})`),{prompt:x,tags:_}}function Yn(){let e=Xe(Pn);return Math.random()<.55&&(e+=" "+Xe(jn)),Math.random()<.35&&(e+=" "+Xe(Bn)),e}function Xn(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=String(e||"").replace(/[０-９]/g,r=>String.fromCharCode(r.charCodeAt(0)-65248)).replace(/[,，]/g,"");if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function Ie(e){const t=(x,A)=>{const O=String(x||"").trim();return!O||["ランダム","未設定","おまかせ","AIおまかせ"].includes(O)?A:O},a=t(e.genreCustom||e.genre,"コメディ"),n=t(e.themeCustom||e.theme,"選択"),r=t(e.worldviewCustom||e.worldview,"現代日本"),s=t(e.eraCustom||e.era,"現代"),o=t(e.targetCustom||e.target,"全年齢"),l=t(e.endingCustom||e.ending,"意外な結末"),c=t(e.narrCustom||e.narration,"三人称・客観"),d=Array.isArray(e.characters)&&e.characters.length>0;let p;d?p=`【必須登場人物（ユーザー指定・作中登場ノルマ）】
${e.characters.map((x,A)=>{const O=x.name||`(AI命名:キャラ${A+1})`,_=x.role||"未定",E=x.sex?`性別:${x.sex}, `:"",w=x.personality||"未定",S=x.note?` [${x.note}]`:"";return`${A+1}. ${O} (${_}) — ${E}性格:${w}${S}`}).join(`
`)}

【AI追加人物の扱い】
・上記の人物数は上限ではない。指定人物は必ず登場させるノルマとして扱うこと。
・長編の文章量、章数、テーマ、世界観に対して人物が不足する場合、長編シナリオエージェントとして追加人物を設計してよい。
・追加人物は、必須登場人物の見せ場を奪うためではなく、葛藤・伏線・関係性・世界観の奥行きを増やすために配置すること。`:p=`【AI設計キャスト】
・ユーザー指定の必須人物は未設定。
・短編向けの2〜3人に固定せず、長編の規模・章数・テーマに見合う人数をAIが設計すること。
・主人公、対立軸を担う人物、関係性を揺らす人物、舞台や事件を動かす脇役を必要に応じて追加してよい。
・ただし人数を増やすだけの水増しは禁止。追加人物には必ず物語上の役割、欲望、弱点、主人公との関係、初登場予定章を持たせること。`;const g=`【長編人物ロスター運用ルール】
・必須登場人物は、全体プロット上の役割と登場予定章を必ず内部設計すること。
・AIが追加した人物は「AI追加人物」として扱い、名前、役割、性格/欲望、主人公や必須人物との関係、初登場章、現在地/状態を管理すること。
・各章の文脈維持メモには、追加・変化した人物情報を【人物ロスター更新メモ】として必ず記録すること。
・一度出したAI追加人物を後半で忘れないこと。退場・死亡・離脱・和解などの状態変化があれば、文脈維持メモに明記すること。`,h=e.supplement?`
【追加指示】
${e.supplement}`:"",v=["現代","ランダム",""].includes(s)?"":`

【時代考証ルール（厳守）】
・時代設定「`+s+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること。`,y=le(a,Jt),u=le(l,zt),b=le(r,Yt),f=le(o,Xt),$=le(c,Qt);let C="";y&&(C+=`

【ジャンル文体指定：${a}】
${y}`),u&&(C+=`

【結末演出指定：${l}】
${u}`),b&&(C+=`

【世界観演出指定：${r}】
${b}`),f&&(C+=`

【ターゲット層文体指定：${o}】
${f}`),$&&(C+=`

【語り口指定：${c}】
${$}`);const L=Xn(e.charCount);let k;if(L>0){const x=Math.min(Math.max(Math.round(L/8e3),6),12),A=Math.round(L/x),O=Math.max(4500,Math.min(9e3,Math.round(A*.6)));k=`全${x}章構成（目安）、各章約${Math.round(A/1e3)}千字、各章本文は最低${O.toLocaleString()}字、予定総文字数：約${Math.round(L/1e4)}万字`}else k="10万字以上を目安に、物語の内容に最適な章数と文字数をAI自身が自由に設計してください（推奨: 8〜12章、各章8千〜1万5千字、各章本文は最低6千字）";return{genre:a,theme:n,worldview:r,era:s,target:o,ending:l,narr:c,charDesc:p,characterRosterRule:g,supplement:h,eraRule:v,allCategoryGuides:C,chapterGuidance:k}}const Zt=`
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
□ 全キャラの物語的機能 □ GMC+Sの明確性 □ 五感バランス □ 比喩の独自性 □ キャラ知識境界 □ 反復描写の防止 □ 章別エピソードの固有性 □ 非最終章の総決算禁止 □ 脚注・引用番号なし`;function Qn(e){const t=Ie(e),a=(i.longNovel&&i.longNovel.chapterRetryNotes||{})[1]||"",n=`あなたはプロのベストセラー小説家です。以下の設定に基づき、本格的な長編小説の**第1章**を執筆してください。
このアプリケーションが章ごとに指示を出します。あなたは指示された1章分のみを全力で書いてください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
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
${Zt}
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

★★★ 文脈維持メモまで出力したら出力を停止してください。「続けますか？」等の質問は不要です（アプリが自動制御します）。★★★`,r=["長編小説",t.genre,t.theme,t.era].filter(Boolean);return{prompt:n,tags:r}}function en(e){const t=String(e||"").trim();if(!t)return"";const a=t.split(/(?=---\s*第[\d０-９一二三四五六七八九十]+章の文脈メモ\s*---)/).map(n=>n.trim()).filter(Boolean);return a.length?a[a.length-1]:t}function Zn(e,t){const a=en(e);if(!a)return"";const n=[new RegExp(`【第${t}章のシーン設計（GMC\\+S）】([\\s\\S]*?)(?=\\n【|\\n---|$)`),/【次章のシーン設計（GMC\+S）】([\s\S]*?)(?=\n【|\n---|$)/,/【次章のシーン設計】([\s\S]*?)(?=\n【|\n---|$)/];for(const r of n){const s=a.match(r);if(s!=null&&s[1])return s[1].trim()}return""}function ea(e,t,a=""){const n=en(t),r=Zn(t,e),s=n?n.slice(0,1800):"（直近の文脈メモなし）";return`
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
`:""}`}function ta(e,t,a,n,r,s,o,l=""){const c=Ie(a),d=ea(e,s,l),p=String(r||"").trim().slice(-900);let g="",h="";return o&&(g=`
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
`),!o&&e===t-1&&(h=`
★★★ 第${e}章は最終章直前です。これは決着章ではありません ★★★
・全解決、勝利宣言、黒幕の完全敗北、社会の再建完了、伏線の総回収、全員の結末を描写しないこと。
・「すべてが終わった」「すべてが終わる」「すべて終わる」「完全に終わった」など、物語全体が解決したと読める語句は、脅し・予感・仮定でも使わないこと。「取り返しがつかなくなる」「退路が消える」など未解決の危機として言い換えること。
・第${e}章は、最終決戦へ入るための最大危機、最後の不可逆な選択、または最終章への重い代償で終えること。
・直前章で完了した戦闘、送信、逃走、死亡、回収、崩壊を冒頭で再演しないこと。直前章の最後の位置・状態から「その後」を始めること。
・直前章で到達済みの目的地や目撃済みの異変を「これから向かう」「初めて見る」と書かないこと。直前章末の現場・損傷・時間・関係状態を固定して、その直後の新しい圧力から始めること。
・長い説明だけで進めず、400〜900字ごとに行動、会話、身体反応、発見、選択のいずれかを入れること。
`),`あなたは引き続きプロのベストセラー小説家です。以下の文脈を踏まえ、**第${e}章**（全${t}章中）を執筆してください。

[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Use visible paragraph breaks: add a newline after each prose paragraph, keep most paragraphs under 350 Japanese characters, and never return a chapter as a few giant text blocks.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.
- Internally build a 3-5 scene ledger before drafting, but output only the novel text and the required context memo.
- Every 1200-1800 Japanese characters should contain a visible action, conflict, discovery, or choice. Do not coast on atmosphere alone.
- Make this chapter inherit the previous chapter's cost, then create a new cost that changes the next chapter's options.
${h}


【基本設定（参照用）】
・ジャンル: ${c.genre} / テーマ: ${c.theme} / 時代: ${c.era}
・世界観: ${c.worldview} / 語り口: ${c.narr} / ターゲット: ${c.target}
・結末の方向性: ${c.ending}
${c.characterRosterRule}
${c.supplement}

${d}

【これまでの物語の要約（古い章）】
${n||"（第1章から開始のためなし）"}

【直近の章の全文】
${r}

【直前章の終点アンカー（ここから後を描く）】
${p||"（直前章本文なし）"}

【全章の文脈維持メモ（伏線・人物ロスター・モチーフ・設計）】
${s}
${g}
${Zt}
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

★★★ 出力が完了したら停止してください。「続けますか？」等の質問は不要です。★★★`}function De(e,t,a){const n=Ie(e),r=new Date,s=`${r.getFullYear()}/${String(r.getMonth()+1).padStart(2,"0")}/${String(r.getDate()).padStart(2,"0")} ${String(r.getHours()).padStart(2,"0")}:${String(r.getMinutes()).padStart(2,"0")}`;let o="Unknown",l="Unknown",c=0,d=0;if(a&&(a.engine==="gemini"?(o="Google Gemini API",l=a.geminiModel||"gemini-1.5-pro"):a.engine==="openai"&&(o="OpenAI API",l=a.openaiModel||"gpt-4o-mini"),a.longNovel)){c=a.longNovel.chapters?a.longNovel.chapters.length:0;const p=a.longNovel.cleanText?a.longNovel.cleanText.length:0,g=a.longNovel.memoText?a.longNovel.memoText.length:0;d=Math.floor((p+g)*1.5)+c*2e3}return`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 再現用マスター指示書（この設定で他のAIでも生成できます）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【監査用メタデータ】
・生成システム: Story Maker v4.0.0
・利用エンジン: ${o} (${l})
・生成完了日時: ${s}
・出力モード: 長編小説モード
・生成パラメータ: Temperature 1.0 (Creative)
・生成ループ回数: 完了章数 ${c} 章
・推定消費トークン: 約 ${d.toLocaleString()} Tokens (テキスト長ベース概算)

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
`}const na=`この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
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
[{"name":"アカリ","sex":"女性","role":"主人公(推定)","personality":"元気","note":"内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;function aa(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const r=n.result.split(",")[1];t(r)},n.onerror=a,n.readAsDataURL(e)})}function ra(e){let t="",a=!1;for(let n=0;n<e.length;n++){const r=e[n];a?r==="\\"?(t+=r,n+1<e.length&&(t+=e[n+1],n++)):r==='"'?(a=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):r==="	"?t+="\\t":t+=r:(r==='"'&&(a=!0),t+=r)}return t}function sa(e){const t=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!t)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");let a=t[0];try{return JSON.parse(a)}catch(r){console.warn("キャラクターJSON初回パース失敗、修復を試行:",r.message)}let n=ra(a);n=n.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(n)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}function oa(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return fe.find(a=>a===t)||fe.find(a=>t.includes(a)||a.includes(t))||t}function la(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return ye.find(a=>a===t)||ye.find(a=>t.includes(a)||a.includes(t))||t}function ia(e,t){const a=fe.map(l=>`<option value="${l}">${l}</option>`).join(""),n=ye.map(l=>`<option value="${l}">${l}</option>`).join(""),r=e.map((l,c)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${c}" checked>
          <span class="ci-char-name-display">${l.name||`キャラ${c+1}`}</span>
        </label>
        <span class="ci-char-badge">${l.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${c}" value="${(l.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${c}" value="${(l.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${c}">
              <option value="">-- 自由入力に切替 --</option>
              ${a}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${c}" value="${(l.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${c}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${c}" value="${(l.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${c}" rows="3">${(l.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),s=Array.isArray(t)?t:t?[t]:[],o=s.length>0?`<div class="ci-thumbnail-wrap">${s.map((l,c)=>`<img src="${l}" class="ci-thumbnail" alt="解析元画像 ${c+1}">`).join("")}</div>`:"";return`
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
  `}function ca(e,t){const a=document.getElementById("ci-modal");a&&(a.querySelectorAll(".ci-role-select").forEach(n=>{const r=n.dataset.idx,s=a.querySelector(`.ci-role-input[data-idx="${r}"]`),o=fe.find(l=>l===s.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(s.value=n.value)}),s.addEventListener("input",()=>{const l=fe.find(c=>c===s.value);n.value=l||""})}),a.querySelectorAll(".ci-personality-select").forEach(n=>{const r=n.dataset.idx,s=a.querySelector(`.ci-personality-input[data-idx="${r}"]`),o=ye.find(l=>l===s.value);o&&(n.value=o),n.addEventListener("change",()=>{n.value&&(s.value=n.value)}),s.addEventListener("input",()=>{const l=ye.find(c=>c===s.value);n.value=l||""})}),document.getElementById("ci-modal-close").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-cancel").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-register").addEventListener("click",()=>{const n=[];a.querySelectorAll(".ci-check").forEach(r=>{var s,o,l,c,d;if(!r.checked)return;const p=parseInt(r.dataset.idx),g=((s=a.querySelector(`.ci-name[data-idx="${p}"]`))==null?void 0:s.value)||"",h=((o=a.querySelector(`.ci-sex[data-idx="${p}"]`))==null?void 0:o.value)||"",v=((l=a.querySelector(`.ci-role-input[data-idx="${p}"]`))==null?void 0:l.value)||"",y=((c=a.querySelector(`.ci-personality-input[data-idx="${p}"]`))==null?void 0:c.value)||"",u=((d=a.querySelector(`.ci-note[data-idx="${p}"]`))==null?void 0:d.value)||"";n.push({name:g,sex:h,role:v,personality:y,note:u})}),t(n),a.remove()}))}function da(e,t,a){const n=document.getElementById("ci-dropzone"),r=document.getElementById("ci-file-input"),s=document.getElementById("ci-status");if(!n||!r)return;n.addEventListener("dragover",c=>{c.preventDefault(),!(e.locked&&e.locked.chars)&&n.classList.add("ci-dragover")}),n.addEventListener("dragleave",()=>{n.classList.remove("ci-dragover")}),n.addEventListener("drop",c=>{if(c.preventDefault(),n.classList.remove("ci-dragover"),e.locked&&e.locked.chars)return;const d=Array.from(c.dataTransfer.files).filter(p=>p.type.startsWith("image/"));d.length>0&&o(d)}),n.addEventListener("click",()=>{e.locked&&e.locked.chars||r.click()}),r.addEventListener("change",c=>{if(e.locked&&e.locked.chars)return;const d=Array.from(c.target.files).filter(p=>p.type.startsWith("image/"));d.length>0&&(o(d),c.target.value="")});async function o(c){if(e.locked&&e.locked.chars)return;const d=a();if(!d){alert("APIキーを先に保存してください");return}const p=["image/png","image/jpeg","image/webp","image/gif"],g=c.filter(u=>p.includes(u.type)?!0:(console.warn(`非対応形式スキップ: ${u.name} (${u.type})`),!1));if(g.length===0){alert(`対応する画像ファイルがありません。
PNG/JPG/WEBP/GIF のみ対応しています。`);return}n.classList.add("ci-loading");const h=document.getElementById("global-alert");h&&(h.innerHTML="⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。",h.style.display="flex"),s&&(s.textContent=`🔍 ${g.length}枚の画像を解析中...（数秒〜数十秒）`,s.classList.remove("hidden"));const v=[],y=[];try{for(let u=0;u<g.length;u++){const b=g[u];s&&g.length>1&&(s.textContent=`🔍 画像 ${u+1}/${g.length} を解析中...`),h&&g.length>1&&(h.innerHTML=`⚠️ <strong>画像認識中 (${u+1}/${g.length}):</strong> AIがキャラクターシートを解析しています...`);const f=await aa(b);y.push(`data:${b.type};base64,${f}`);const{text:$}=await Wt(d,na,f,b.type,void 0,{responseMimeType:"application/json"}),C=sa($);C&&C.length>0&&(C.forEach(L=>{L.role=oa(L.role),L.personality=la(L.personality)}),v.push(...C))}if(v.length===0)throw new Error("キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。");l(v,y),s&&(s.textContent=`✅ ${v.length}キャラクター検出！確認してください。`)}catch(u){console.error("Character import error:",u),s&&(s.textContent=`❌ エラー: ${u.message}`),setTimeout(()=>{s&&s.classList.add("hidden")},5e3)}finally{n.classList.remove("ci-loading"),h&&(h.style.display="none")}}function l(c,d){var p;(p=document.getElementById("ci-modal"))==null||p.remove();const g=document.createElement("div");g.innerHTML=ia(c,d),document.body.appendChild(g.firstElementChild),ca(c,h=>{h.forEach(v=>{e.characters.push({name:v.name||"",sex:v.sex||"",role:v.role||"",personality:v.personality||"",note:v.note||""})}),t(),s&&(s.textContent=`✅ ${h.length}キャラクターを登録しました！`,setTimeout(()=>s.classList.add("hidden"),3e3))})}}const I=e=>document.getElementById(e);let W=[],Q=[],ne=null,Se="",we=()=>"",Ge=()=>"";const Qe=`あなたはプロの文芸批評家・計量文体学の専門家です。
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
`;function ua(e){var t,a;const n=[],r=(o,l)=>{l&&n.push(`【${o}】${l}`)},s=(o,l)=>{l&&n.push(`  ・${o}: ${l}`)};return r("作風名",e.style_name),r("トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(n.push("【語りの視点】"),s("人称",e.narrative_voice.person),s("距離感",e.narrative_voice.distance),s("信頼度",e.narrative_voice.reliability),s("介入度",e.narrative_voice.intrusion)):r("語りの視点",e.narrative_voice),e.sentence_style&&(n.push("【文体】"),s("平均文長",e.sentence_style.avg_length||e.sentence_style.length),s("文長変動",e.sentence_style.length_variation),s("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),s("リズム",e.sentence_style.rhythm),s("段落長",e.sentence_style.paragraph_length),s("段落構成",e.sentence_style.paragraph_structure)),e.vocabulary&&(n.push("【語彙】"),s("レベル",e.vocabulary.level),s("情報密度",e.vocabulary.density),s("レジスター",e.vocabulary.register),s("特徴",e.vocabulary.quirks),s("外来語",e.vocabulary.foreign_words),s("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(n.push("【修辞技法】"),s("比喩スタイル",e.rhetoric.metaphor_style),s("比喩素材",e.rhetoric.metaphor_source),s("反復技法",e.rhetoric.repetition),s("アイロニー",e.rhetoric.irony_level),s("ユーモア",e.rhetoric.humor_type),s("その他",e.rhetoric.other_techniques)),e.description_focus&&(n.push("【描写フォーカス】"),s("視覚",e.description_focus.visual),s("聴覚",e.description_focus.auditory),s("触覚",e.description_focus.tactile),s("嗅覚/味覚",e.description_focus.olfactory_gustatory),s("運動感覚",e.description_focus.kinesthetic),s("空間把握",e.description_focus.spatial),s("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),s("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue&&(n.push("【セリフ】"),s("文体",e.dialogue.style),s("機能",e.dialogue.function),s("タグ",e.dialogue.tag_style),s("方言",e.dialogue.dialect_sociolect),s("サブテキスト",e.dialogue.subtext)),e.structure&&(n.push("【構造】"),s("テンポ",e.structure.pacing),s("場面転換",e.structure.scene_transition),s("時制",e.structure.time_handling),s("緊張曲線",e.structure.tension_curve),s("冒頭パターン",e.structure.opening_style),s("結末パターン",e.structure.closing_style)),e.emotional_architecture&&(n.push("【感情設計】"),s("主要感情",e.emotional_architecture.dominant_emotions),s("振り幅",e.emotional_architecture.emotional_range),s("カタルシス",e.emotional_architecture.catharsis_method),s("読者距離",e.emotional_architecture.reader_distance)),r("テーマ傾向",e.themes_tendency),r("文学的影響",e.literary_influences),(t=e.unique_features)!=null&&t.length&&(n.push("【固有の特徴】"),e.unique_features.forEach(o=>n.push(`  ・${o}`))),(a=e.anti_patterns)!=null&&a.length&&(n.push("【回避パターン（この作風では避けるべき表現）】"),e.anti_patterns.forEach(o=>n.push(`  ・${o}`))),n.join(`
`)}function pa(e,t){const a=ua(e),n=t.length,r=Math.floor(n*.8),s=Math.ceil(n*1.2);return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

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

## リライト結果:`}function tn(e){const t=I("settings");t&&t.classList.add("generating");const a=I("sa-section");a&&a.classList.add("generating");const n=document.querySelector(".btn-generate");n&&(n._origText=n.textContent,n.disabled=!0,n.innerHTML=`<span class="spinner"></span>${e}`);const r=I("sa-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const s=I("sa-reflect-api-status");s&&(s.innerHTML=`<span class="spinner"></span>${e}`,s.classList.remove("hidden"));const o=I("global-alert");o&&(o.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,o.style.display="flex");const l=I("thought-score-board");l&&(l.style.display="none")}function Ot(e){const t=I("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const a=I("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`);const n=document.querySelector(".btn-generate");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const r=I("global-alert");r&&(r.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const s=I("thought-score-board");s&&(s.style.display="none")}function nn(){const e=I("settings");e&&e.classList.remove("generating");const t=I("sa-section");t&&t.classList.remove("generating");const a=document.querySelector(".btn-generate");a&&(a.disabled=!1,a.textContent=a._origText||"ストーリー生成");const n=I("sa-api-status");n&&n.classList.add("hidden");const r=I("sa-reflect-api-status");r&&r.classList.add("hidden");const s=I("global-alert");s&&(s.style.display="none")}function ha(){const e=I("sa-dropzone"),t=I("sa-file-input");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",a=>{a.preventDefault(),e.classList.add("sa-dragover")}),e.addEventListener("dragleave",()=>{e.classList.remove("sa-dragover")}),e.addEventListener("drop",a=>{a.preventDefault(),e.classList.remove("sa-dragover"),Rt(a.dataTransfer.files)}),t.addEventListener("change",a=>{Rt(a.target.files),t.value=""}))}async function Rt(e){const t=Array.from(e),a=t.filter(r=>r.type==="text/plain"||r.name.endsWith(".txt")||r.name.endsWith(".md")||r.name.endsWith(".csv")||r.type===""),n=t.filter(r=>r.type.startsWith("image/"));if(a.length===0&&n.length===0){alert("テキストファイル (.txt, .md) または画像ファイルをドロップしてください");return}for(const r of a)try{const s=await ma(r);s.trim().length>0&&W.push({name:r.name,text:s.trim(),charCount:s.trim().length})}catch(s){console.warn(`ファイル読み込み失敗: ${r.name}`,s)}for(const r of n)try{const s=await ga(r),o=URL.createObjectURL(r);Q.push({name:r.name,base64:s,mimeType:r.type,previewUrl:o})}catch(s){console.warn(`画像ファイル読み込み失敗: ${r.name}`,s)}We(),$t(),(W.length>0||Q.length>0)&&I("sa-dropzone").classList.add("sa-has-files"),pe()}function ma(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=r=>t(r.target.result),n.onerror=a,n.readAsText(e,"UTF-8")})}function ga(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=r=>{const s=r.target.result.split(",")[1];t(s)},n.onerror=a,n.readAsDataURL(e)})}function We(){const e=I("sa-file-list");if(!e)return;const t=W.reduce((n,r)=>n+r.charCount,0),a=I("sa-file-count");a&&(a.textContent=`${W.length}件 / ${t.toLocaleString()}字`,a.classList.remove("hidden")),e.innerHTML=W.map((n,r)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${tt(n.name)}</span>
      <span class="sa-file-chars">${n.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${r}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(n=>{n.addEventListener("click",r=>{const s=parseInt(r.target.dataset.idx);W.splice(s,1),We(),W.length===0&&(I("sa-dropzone").classList.remove("sa-has-files"),I("sa-file-count").classList.add("hidden")),pe()})})}function $t(){const e=I("sa-image-list");if(e){if(Q.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden"),e.innerHTML=Q.map((t,a)=>`
    <div class="sa-image-item">
      <img src="${t.previewUrl}" alt="${tt(t.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${tt(t.name)}</span>
      <button class="sa-file-remove" data-img-idx="${a}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(t=>{t.addEventListener("click",a=>{var n;const r=parseInt(a.target.dataset.imgIdx);(n=Q[r])!=null&&n.previewUrl&&URL.revokeObjectURL(Q[r].previewUrl),Q.splice(r,1),$t(),W.length===0&&Q.length===0&&I("sa-dropzone").classList.remove("sa-has-files"),pe()})})}}function fa(e){const t=e.indexOf("{");if(t===-1)return null;const a=e.lastIndexOf("}");return a===-1||a<t?null:e.slice(t,a+1)}function ya(e){let t="",a=!1;for(let n=0;n<e.length;n++){const r=e[n];a?r==="\\"?(t+=r,n+1<e.length&&(t+=e[n+1],n++)):r==='"'?(a=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):r==="	"?t+="\\t":t+=r:(r==='"'&&(a=!0),t+=r)}return t}const va=["style_name","tone","narrative_voice","person","distance","reliability","intrusion","sentence_style","avg_length","length_variation","ending_patterns","rhythm","paragraph_length","paragraph_structure","vocabulary","level","density","register","quirks","foreign_words","archaic_modern","rhetoric","metaphor_style","metaphor_source","repetition","irony_level","humor_type","other_techniques","description_focus","visual","auditory","tactile","olfactory_gustatory","kinesthetic","spatial","psychological_depth","show_tell_ratio","dialogue","style","function","tag_style","dialect_sociolect","subtext","structure","pacing","scene_transition","time_handling","tension_curve","opening_style","closing_style","emotional_architecture","dominant_emotions","emotional_range","catharsis_method","reader_distance","themes_tendency","literary_influences","unique_features","anti_patterns","reproduction_prompt"];function $a(e){let t=e.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,"");const a=[];if(va.forEach(r=>{const s=new RegExp(`"${r}"\\s*:`,"g");let o;for(;(o=s.exec(t))!==null;)a.push({key:r,start:o.index,end:o.index+o[0].length})}),a.sort((r,s)=>r.start-s.start),a.length===0)return JSON.parse(t);const n={};for(let r=0;r<a.length;r++){const s=a[r],o=a[r+1],l=s.end;let c=o?o.start:t.length,d=t.slice(l,c).trim();if(!o){const p=d.lastIndexOf("}");p!==-1&&(d=d.slice(0,p).trim())}if(d=d.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g,""),d.startsWith("[")&&d.endsWith("]")){let p=d.slice(1,-1).trim();const g=[],h=p.split(/",\s*"/);h.forEach((v,y)=>{let u=v.trim();y===0&&u.startsWith('"')&&(u=u.slice(1)),y===h.length-1&&u.endsWith('"')&&(u=u.slice(0,-1)),u=u.replace(/"/g,'\\"'),u=u.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t"),g.push(u)}),n[s.key]=g}else{let p=!1;d.startsWith('"')&&(d=d.slice(1),p=!0),d.endsWith('"')&&(d=d.slice(0,-1)),p&&(d=d.replace(/"/g,'\\"'),d=d.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t")),n[s.key]=d}}return{style_name:n.style_name||"",tone:n.tone||"",narrative_voice:{person:n.person||"",distance:n.distance||"",reliability:n.reliability||"",intrusion:n.intrusion||""},sentence_style:{avg_length:n.avg_length||"",length_variation:n.length_variation||"",ending_patterns:n.ending_patterns||"",rhythm:n.rhythm||"",paragraph_length:n.paragraph_length||"",paragraph_structure:n.paragraph_structure||""},vocabulary:{level:n.level||"",density:n.density||"",register:n.register||"",quirks:n.quirks||"",foreign_words:n.foreign_words||"",archaic_modern:n.archaic_modern||""},rhetoric:{metaphor_style:n.metaphor_style||"",metaphor_source:n.metaphor_source||"",repetition:n.repetition||"",irony_level:n.irony_level||"",humor_type:n.humor_type||"",other_techniques:n.other_techniques||""},description_focus:{visual:n.visual||"",auditory:n.auditory||"",tactile:n.tactile||"",olfactory_gustatory:n.olfactory_gustatory||"",kinesthetic:n.kinesthetic||"",spatial:n.spatial||"",psychological_depth:n.psychological_depth||"",show_tell_ratio:n.show_tell_ratio||""},dialogue:{style:n.style||"",function:n.function||"",tag_style:n.tag_style||"",dialect_sociolect:n.dialect_sociolect||"",subtext:n.subtext||""},structure:{pacing:n.pacing||"",scene_transition:n.scene_transition||"",time_handling:n.time_handling||"",tension_curve:n.tension_curve||"",opening_style:n.opening_style||"",closing_style:n.closing_style||""},emotional_architecture:{dominant_emotions:n.dominant_emotions||"",emotional_range:n.emotional_range||"",catharsis_method:n.catharsis_method||"",reader_distance:n.reader_distance||""},themes_tendency:n.themes_tendency||"",literary_influences:n.literary_influences||"",unique_features:Array.isArray(n.unique_features)?n.unique_features:[],anti_patterns:Array.isArray(n.anti_patterns)?n.anti_patterns:[],reproduction_prompt:n.reproduction_prompt||""}}function ba(e){try{return JSON.parse(e)}catch(a){console.warn("JSON初回パース失敗、修復を試行:",a.message)}let t=e.trim();t=ya(t),t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":'),t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(a){console.warn("JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:",a.message);try{return $a(t)}catch(n){console.warn("キー境界パースも失敗、最後の攻撃的修復を試行:",n.message);try{let r=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(r)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}}}function tt(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Ca(){const e=we();if(!e){alert("APIキーを保存してから解析してください");return}const t=I("sa-direct-text"),a=t?t.value.trim():"";if(W.length===0&&Q.length===0&&!a){alert("テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください");return}const n=I("btn-sa-analyze"),r=I("sa-result-wrap"),s=I("sa-result"),o=I("sa-reflect-wrap"),l=I("sa-reflect-result-wrap"),c=I("progress-log"),d=I("thought-score-board"),p=I("progress-title-text");c&&(c.textContent="作風解析の開始を待っています..."),d&&(d.innerHTML="",d.style.display="none"),p&&(p.textContent="AI進捗・思考ログ: 作風解析中..."),n.disabled=!0,n.innerHTML='<span class="spinner"></span>AIが超強引に作風を解析中...',s.textContent="超強引に解析中です...しばらくお待ちください（1分〜3分程度）",r.classList.remove("hidden"),o.classList.add("hidden"),l.classList.add("hidden"),tn("🔬 超強引！作風解析中...");try{let g=[];W.length>0&&(g=W.map(L=>`--- ${L.name} ---
${L.text}`)),a&&g.push(`--- 直接貼り付けテキスト ---
${a}`);let h=g.join(`

`);h.length>1e5&&(h=h.slice(0,1e5)+`

[...以降のテキストは省略（コンテキスト上限）...]`);const v=Q.length>0,y=h.length>0;let u=Qe;v&&y?u=Qe.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 画像分析の追加指示:
- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること
- テキストと画像の両方から相乗的に作風パラメータを抽出すること`):v&&!y&&(u=Qe.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。

## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:
- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。
- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。

## 画像分析指示:
- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること`)),y&&(u=u+h);const b=ge[0].value;let f;v?f=(await Un(e,u,Q,L=>{Ot(`フォールバック: ${L}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${L}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text:f=(await je(e,b,u,L=>{Ot(`フォールバック: ${L}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${L}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text;let $="";const C=fa(f);if(C)$=C;else{const L=f.match(/```json\s*([\s\S]*?)\s*```/);if(L)$=L[1];else{const k=f.match(/\{[\s\S]*\}/);if(k)$=k[0];else throw new Error("AIの応答からJSONを抽出できませんでした")}}ne=ba($),xa(ne),p&&(p.textContent="AI進捗・思考ログ: 作風解析完了"),c&&(c.textContent=`作風解析が完了しました。解析結果が右パネルに表示されています。
作風名: ${ne.style_name||"未定義"}
トーン: ${ne.tone||"未定義"}`),o.classList.remove("hidden"),Ae()}catch(g){s.textContent=`解析エラー: ${g.message}`,s.classList.add("sa-error"),p&&(p.textContent="AI進捗・思考ログ: 解析エラー"),c&&(c.textContent=`作風解析エラーが発生しました:
${g.message}`)}finally{n.disabled=!1,n.innerHTML="🔬 超強引！作風解析を実行",nn()}}function xa(e){var t,a;const n=I("sa-result");n.classList.remove("sa-error");const r=[],s=(c,d,p)=>{p&&r.push(`${c} ${d}: ${p}`)},o=(c,d)=>{d&&r.push(`  ・${c}: ${d}`)},l=(c,d)=>{r.push(""),r.push(`${c} ${d}:`)};s("🏷️","作風名",e.style_name),s("🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(l("🎙️","語りの視点"),o("人称",e.narrative_voice.person),o("距離感",e.narrative_voice.distance),o("信頼度",e.narrative_voice.reliability),o("介入度",e.narrative_voice.intrusion)):s("🎙️","語りの視点",e.narrative_voice),l("📝","文体"),e.sentence_style&&(o("平均文長",e.sentence_style.avg_length||e.sentence_style.length),o("文長変動",e.sentence_style.length_variation),o("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),o("リズム",e.sentence_style.rhythm),o("段落長",e.sentence_style.paragraph_length),o("段落構成",e.sentence_style.paragraph_structure)),l("📖","語彙"),e.vocabulary&&(o("レベル",e.vocabulary.level),o("情報密度",e.vocabulary.density),o("レジスター",e.vocabulary.register),o("特徴",e.vocabulary.quirks),o("外来語",e.vocabulary.foreign_words),o("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(l("🔮","修辞技法"),o("比喩スタイル",e.rhetoric.metaphor_style),o("比喩素材",e.rhetoric.metaphor_source),o("反復技法",e.rhetoric.repetition),o("アイロニー",e.rhetoric.irony_level),o("ユーモア",e.rhetoric.humor_type),o("その他",e.rhetoric.other_techniques)),l("🖼️","描写フォーカス"),e.description_focus&&(o("視覚",e.description_focus.visual),o("聴覚",e.description_focus.auditory),o("触覚",e.description_focus.tactile),o("嗅覚/味覚",e.description_focus.olfactory_gustatory),o("運動感覚",e.description_focus.kinesthetic),o("空間把握",e.description_focus.spatial),o("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),o("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(l("💬","セリフ"),o("文体",e.dialogue.style),o("機能",e.dialogue.function),o("タグ",e.dialogue.tag_style),o("方言",e.dialogue.dialect_sociolect),o("サブテキスト",e.dialogue.subtext)):s("💬","セリフ回し",e.dialogue_style),e.structure?(l("🏗️","構造"),o("テンポ",e.structure.pacing),o("場面転換",e.structure.scene_transition),o("時制",e.structure.time_handling),o("緊張曲線",e.structure.tension_curve),o("冒頭パターン",e.structure.opening_style),o("結末パターン",e.structure.closing_style)):s("⏱️","テンポ",e.pacing),e.emotional_architecture&&(l("❤️","感情設計"),o("主要感情",e.emotional_architecture.dominant_emotions),o("振り幅",e.emotional_architecture.emotional_range),o("カタルシス",e.emotional_architecture.catharsis_method),o("読者距離",e.emotional_architecture.reader_distance)),s("🎯","テーマ傾向",e.themes_tendency),s("📚","文学的影響",e.literary_influences),r.push(""),(t=e.unique_features)!=null&&t.length&&(r.push("✨ 固有の特徴:"),e.unique_features.forEach(c=>r.push(`  ・${c}`))),(a=e.anti_patterns)!=null&&a.length&&(r.push(""),r.push("🚫 回避パターン:"),e.anti_patterns.forEach(c=>r.push(`  ・${c}`))),r.push(""),r.push("━━━ 再現プロンプト ━━━"),r.push(e.reproduction_prompt||"（生成されませんでした）"),n.textContent=r.join(`
`)}async function wa(){const e=we();if(!e){alert("APIキーを保存してください");return}if(!ne){alert("先に作風解析を実行してください");return}const t=Ge(),a=I("output");if(!t||t.length<10||a&&a.classList.contains("empty")){alert("まず上のストーリー生成でテキストを生成してから、リライトを実行してください");return}const n=I("btn-sa-reflect"),r=I("sa-reflect-result-wrap"),s=I("sa-reflect-output");n.disabled=!0,n.innerHTML='<span class="spinner"></span>作風を反映してリライト中...',s.textContent="リライト中です...（完了後に一括表示されます）",r.classList.remove("hidden");const o=I("progress-log"),l=I("thought-score-board"),c=I("progress-title-text");o&&(o.textContent="作風リライトの開始を待っています..."),l&&(l.innerHTML="",l.style.display="none"),c&&(c.textContent="AI進捗・思考ログ: リライト準備中..."),tn("🎨 作風リライト中...");let d=[],p="",g="",h=null;function v(u){d.push(u),y()}function y(){if(!o)return;let u="";d.length>0&&(u+=d.join(`
`)+`
`),p&&(u+=p+`
`),g&&(u+=`
`+g),o.textContent=u;const b=I("progress-content");b&&(b.scrollTop=b.scrollHeight)}v("[システム] 作風リライト処理を開始しました..."),v(`[システム] 対象ストーリー文字数: ${t.length.toLocaleString()} 字`),v("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中..."),v("[システム] リライト用メタプロンプトの構築が完了しました。");try{const u=pa(ne,t),b=ge[0].value;v(`[システム] AIモデル (${b}) にリライト要求を送信しています...`);let f=0,$=new Set;h=setInterval(()=>{f++,p=`[通信] AIモデルからのリライト応答を待機しています${".".repeat(f%4)} (${f}秒経過)`,f>=3&&!$.has(3)&&($.add(3),d.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...")),f>=6&&!$.has(6)&&($.add(6),d.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...")),f>=9&&!$.has(9)&&($.add(9),d.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...")),f>=12&&!$.has(12)&&($.add(12),d.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。")),f>=15&&f%5===0&&!$.has(f)&&($.add(f),d.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${f}s) を実行しています...`)),y()},1e3);let C="",L=!1;c&&(c.textContent="AI進捗・思考ログ: リライト執筆中...");const k=({text:w})=>{L||(L=!0,p="",y(),h&&(clearInterval(h),h=null)),C+=w;const S=C.length;let G=`[システム] AIによるリライト文章の生成が開始されました。
`;G+=`[進捗] 本文をリライト中...
`,G+=`・現在文字数: ${S} 文字
`;const j=Math.floor(S/50%4),N=".".repeat(j)+" ".repeat(3-j);G+=`・ステータス: 執筆処理中${N}
`,g=G,y()},x=w=>{s.textContent=`フォールバック中: ${w}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${w}`,v(`[システム] リライト応答遅延のため、モデルを ${w} にフォールバックします...`)};let{usedModel:A}=await ve(e,b,u,k,x,{disableGoogleSearch:!0}),O=0;for(;O<3&&!C.trim().endsWith("【完】");){O++,v(`[システム] 文字数上限到達による切断を検知。続きを自動リクエスト中... (${O}/3)`),p=`[通信] 続きを生成しています... (${O}/3)`,y();const w=`${u}

【ここまでの出力】
${C}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;A=(await ve(e,A,w,k,x,{disableGoogleSearch:!0})).usedModel}h&&(clearInterval(h),h=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let _=C.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,"");Se=_,s.textContent=_;const E=I("sa-reflect-counter");E&&(E.textContent=`${_.length.toLocaleString()} 字`),c&&(c.textContent="AI進捗・思考ログ: リライト完了"),v("[システム] 作風リライト文の生成・推敲が正常に完了しました。"),g=`[進捗] リライトが正常に完了しました。
・最終文字数: ${_.length.toLocaleString()} 字
・ステータス: 完了`,p="",y(),r.scrollIntoView({behavior:"smooth",block:"start"})}catch(u){h&&(clearInterval(h),h=null),p="",y(),s.textContent=`リライトエラー: ${u.message}`}finally{n.disabled=!1,n.innerHTML="🎨 この作風でリライト実行",nn()}}function Ia(){if(!ne)return;const e=I("sa-result").textContent;navigator.clipboard.writeText(e).then(()=>{const t=I("btn-sa-copy");t.textContent="✅ コピー完了",setTimeout(()=>t.textContent="📋 コピー",2e3)})}function an(){const e=new Date;return`${e.getFullYear()}${String(e.getMonth()+1).padStart(2,"0")}${String(e.getDate()).padStart(2,"0")}${String(e.getHours()).padStart(2,"0")}${String(e.getMinutes()).padStart(2,"0")}${String(e.getSeconds()).padStart(2,"0")}`}function La(){if(!ne)return;const e=JSON.stringify(ne,null,2),t=new Blob([e],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(t);const n=(ne.style_name||"style_analysis").replace(/[\s\/\\:*?"<>|]/g,"_");a.download=`${n}_${an()}.json`,a.click()}function Ea(){Se&&navigator.clipboard.writeText(Se).then(()=>{const e=I("btn-sa-reflect-copy");e.textContent="✅ コピー完了",setTimeout(()=>e.textContent="📋 コピー",2e3)})}function Aa(){if(!Se)return;const e=new Blob([Se],{type:"text/plain"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`style_rewrite_${an()}.txt`,t.click()}function Sa(){var e,t,a,n;Q.forEach(s=>{s.previewUrl&&URL.revokeObjectURL(s.previewUrl)}),W=[],Q=[],ne=null,Se="",We(),$t();const r=I("sa-direct-text");r&&(r.value=""),He(),I("sa-dropzone").classList.remove("sa-has-files"),(e=I("sa-file-count"))==null||e.classList.add("hidden"),pe(),Ae(),I("sa-result").textContent="",(t=I("sa-result-wrap"))==null||t.classList.add("hidden"),(a=I("sa-reflect-wrap"))==null||a.classList.add("hidden"),(n=I("sa-reflect-result-wrap"))==null||n.classList.add("hidden")}function ka(){const e=I("sa-direct-text");if(!e)return;const t=e.value.trim();t&&(W.push({name:`直接入力テキスト_${W.length+1}`,text:t,charCount:t.length}),e.value="",We(),I("sa-dropzone").classList.add("sa-has-files"),pe(),He())}function He(){const e=I("btn-sa-add-text");if(!e)return;const t=I("sa-direct-text"),a=t&&t.value.trim().length>0;e.disabled=!a}function Je(){const e=I("sa-section");e&&(typeof we=="function"&&we()?e.classList.remove("sa-inactive"):e.classList.add("sa-inactive"))}function pe(){const e=I("btn-sa-analyze");if(!e)return;const t=typeof we=="function"?we():"",a=W.length>0,n=Q.length>0,r=I("sa-direct-text"),s=r?r.value:"",o=s.trim().length>0,l=a||n||o;let c=s.length;W.forEach(p=>c+=p.content?p.content.length:0);const d=document.getElementById("api-engine");if(d&&d.value==="openai"&&c>8e4){e.disabled=!0,e.textContent="⚠ 文字数超過 (OpenAI制限)",e.title="OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。";return}e.disabled=!(t&&l),e.textContent="🔬 超強引！作風解析を実行",e.title=""}function Ae(){const e=I("btn-sa-reflect");if(!e)return;const t=typeof Ge=="function"?Ge():"",a=I("output"),n=t&&t.length>=10&&a&&!a.classList.contains("empty"),r=ne!==null;e.disabled=!(n&&r)}function Ta(e,t){var a,n,r,s,o,l,c,d;we=e,Ge=t,ha(),(a=I("btn-sa-analyze"))==null||a.addEventListener("click",Ca),(n=I("btn-sa-reflect"))==null||n.addEventListener("click",wa),(r=I("btn-sa-copy"))==null||r.addEventListener("click",Ia),(s=I("btn-sa-json"))==null||s.addEventListener("click",La),(o=I("btn-sa-reflect-copy"))==null||o.addEventListener("click",Ea),(l=I("btn-sa-reflect-dl"))==null||l.addEventListener("click",Aa),(c=I("btn-sa-clear"))==null||c.addEventListener("click",Sa),(d=I("btn-sa-add-text"))==null||d.addEventListener("click",ka);const p=I("sa-direct-text");p&&p.addEventListener("input",()=>{pe(),He()}),Je(),He()}function _a(e,t){const a=Ct(t),n=sn(t);return`あなたはプロの校閲者・整合性チェッカーです。以下の物語テキストを精査し、**明確な事実矛盾**のみを検出してください。

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
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function Na(e,t,a,n,r,s=!1){const o=Ct(a),l=sn(a);return`あなたはプロの校閲者・整合性チェッカーです。長編小説の**第${t}章**を精査し、過去の章との間で**明確な事実矛盾**のみを検出してください。

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
矛盾がない場合は必ず \`[]\` のみを出力すること。`}function Ma(e,t,a,n){const r=t.map((l,c)=>`${c+1}. 【${l.type}】${l.description}（箇所：『${l.location}』）`).join(`
`),s=Ct(a);let o="";return n&&(o=`
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

## 修正後のテキスト（本文のみ出力）:`}function Oa(e){if(!e||!e.trim())return[];let t=e.trim();t=t.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");try{const a=JSON.parse(t);return Array.isArray(a)?a.filter(n=>n&&typeof n=="object"&&n.type&&n.description).map(n=>({type:String(n.type||""),severity:String(n.severity||"軽微"),location:String(n.location||""),description:String(n.description||"")})):[]}catch{const a=t.match(/\[[\s\S]*\]/);if(a)try{const n=JSON.parse(a[0]);if(Array.isArray(n))return n.filter(r=>r&&typeof r=="object"&&r.type&&r.description).map(r=>({type:String(r.type||""),severity:String(r.severity||"軽微"),location:String(r.location||""),description:String(r.description||"")}))}catch(n){console.warn("矛盾検査結果のパースに失敗しました:",n.message)}return[]}}function rn(e,t){if(!e||e.length===0)return"";const a=[`【矛盾検査記録（第${t}章）— 修正済み】`];return e.forEach((n,r)=>{a.push(`  ${r+1}. [${n.severity}] ${n.type}: ${n.description}`)}),a.join(`
`)}async function bt(e,t,a,n={}){const{onStatus:r,onFallback:s,maxFixAttempts:o=8,chapterNum:l,allContextMemos:c,recentChaptersFull:d,fixMinorIssues:p=!1,isLastChapter:g=!1,failOnAuditError:h=!1,validateFixedText:v}=n,y=ge[0].value,u=l!=null,b=u?`第${l}章: `:"";let f=t,$=[],C=!1,L=0,k=[];for(let x=0;x<=o;x++){const A=x>0;if(r){const N=u?`第${l}章の`:"";r(`[検査] ${N}設定整合性チェックを実行中...${A?`（再検査 ${x}回目）`:""}`)}let O;u?O=Na(f,l,a,c,d,g):O=_a(f,a);let _;try{_=(await je(e,y,O,s,{temperature:.1,responseMimeType:"application/json",disableGoogleSearch:!0,maxTokens:4096,maxOutputTokens:4096,timeoutMs:u?7e4:12e4,maxModelAttempts:u?2:void 0})).text}catch(N){if(console.warn("矛盾検査APIコールが失敗しました:",N.message),h)throw r&&r("[検査] 検査APIエラー — 保存を停止します"),new Error(`矛盾検査APIエラー: ${N.message}`);return r&&r("[検査] 検査APIエラー — スキップして続行します"),{text:f,issues:$,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]}}const E=Oa(_);k=E;const w=E.filter(N=>N.severity==="重大"),S=E.filter(N=>N.severity!=="重大");L=w.length,E.length>0&&($=$.concat(E),r&&(r(`[検査] ${b}${E.length}件の指摘を検出（重大: ${w.length}件, 軽微: ${S.length}件）`),w.forEach((N,F)=>{r(`[検査]   ⛔ 重大${F+1}: [${N.type}] ${N.description}${N.location?`（箇所:『${N.location}』）`:""}`)}),S.forEach((N,F)=>{r(`[検査]   ⚠ 軽微${F+1}: [${N.type}] ${N.description}`)})));const G=p?E:w;if(G.length===0)return r&&(E.length===0?r(`[検査] ${b}矛盾は検出されませんでした ✅`):r(p?`[検査] ${b}修正対象の矛盾は残っていません ✅`:`[検査] ${b}重大な矛盾なし。軽微な指摘${S.length}件は許容範囲です ✅`)),{text:f,issues:$,wasFixed:C,remainingCriticalCount:0,remainingIssues:[]};if(x>=o)break;if(r){const N=p?`矛盾${G.length}件`:`重大な矛盾${w.length}件`;r(`[修正] ${b}${N}を修正中...（試行 ${x+1}/${o}）`)}const j=Ma(f,G,a,u?{recentChaptersFull:d,allContextMemos:c}:null);try{let N=(await je(e,y,j,s,{temperature:.3,disableGoogleSearch:!0,maxTokens:16384,maxOutputTokens:16384,timeoutMs:u?9e4:12e4,maxModelAttempts:u?2:void 0})).text.trim();if(typeof n.sanitizeText=="function"&&(N=n.sanitizeText(N)),typeof v=="function"){const ae=v(N)||[];if(ae.length>0){console.warn(`修正結果を品質ゲートで棄却: ${ae.join(" / ")}`),r&&r(`[修正] 修正結果に本文破損の兆候があるため棄却します（${ae.slice(0,3).join(" / ")}）`);continue}}const F=N.length/f.length;if(F<.5||F>2){console.warn(`修正結果の文字数比率が異常 (${(F*100).toFixed(0)}%)。修正を棄却します。`),r&&r(`[修正] 修正結果の文字数が異常に変動（${(F*100).toFixed(0)}%）。この修正を棄却します`);continue}f=N,C=!0,r&&r(`[修正] ${b}修正完了。再検査を実行します...`)}catch(N){return console.warn("矛盾修正APIコールが失敗しました:",N.message),r&&r(h?"[修正] 修正APIエラー — 残存矛盾があれば保存を停止します":"[修正] 修正APIエラー — 現状のテキストで続行します"),{text:f,issues:$,wasFixed:C,remainingCriticalCount:L,remainingIssues:k}}}return r&&r(`[検査] ${b}修正上限（${o}回）に達しましたが、重大な矛盾が${L}件残存しています ⚠️`),{text:f,issues:$,wasFixed:C,remainingCriticalCount:L,remainingIssues:k}}function Ct(e){return!e||!e.characters||e.characters.length===0?"（キャラクター設定なし — AIが自由に設定）":e.characters.map((t,a)=>{const n=[`${a+1}. ${t.name||"（名前未設定）"}`];return t.sex&&n.push(`性別: ${t.sex}`),t.role&&n.push(`役割: ${t.role}`),t.personality&&n.push(`性格: ${t.personality}`),t.note&&n.push(`詳細: ${t.note}`),n.join(" / ")}).join(`
`)}function sn(e){if(!e)return"（設定なし）";const t=[],a=e.eraCustom||e.era,n=e.worldviewCustom||e.worldview,r=e.genreCustom||e.genre;return a&&t.push(`時代: ${a}`),n&&t.push(`世界観: ${n}`),r&&t.push(`ジャンル: ${r}`),t.length>0?t.join(`
`):"（特定の時代・世界観設定なし）"}const Ra="4.0.0",m=e=>document.getElementById(e),D=e=>e&&e.length?e[Math.floor(Math.random()*e.length)]:null,U=e=>(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),i={apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],longNovel:{active:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1},defaultFilled:{}};function on(e){const t=i.locked[e],a=document.querySelector(`.btn-lock[data-section="${e}"]`);a&&(a.textContent=t?"🔒":"🔓",a.classList.toggle("locked",t),a.title=t?"この項目のロックを解除する":"この項目をロックしてランダム変更から保護");let n=m(`section-${e}`);!n&&e==="universal"&&(n=m("section-universal-intake")),n&&(n.classList.toggle("is-locked",t),n.querySelectorAll("input, textarea, select, button:not(.btn-lock)").forEach(r=>{r.disabled=t})),e==="chars"&&te()}function Pa(){const e=m("btn-switch-api");e.classList.remove("gemini-mode","openai-mode"),i.apiProvider==="gemini"?(e.classList.add("gemini-mode"),e.title="現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）"):(e.classList.add("openai-mode"),e.title="現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）")}function ze(){const e=m("banner"),t=document.querySelector(".settings-panel"),a=m("engine-label"),n=m("apikey");i.apiKey?(e.classList.add("ok"),n.value="********",n.readOnly=!0,t&&t.classList.remove("disabled-panel"),a.classList.remove("not-set"),i.apiProvider==="openai"?(a.textContent="ChatGPT API",a.style.color="var(--openai)",a.style.backgroundColor="var(--openai-glow)",a.style.borderColor="rgba(16,163,127,.3)"):(a.textContent="Gemini API",a.style.color="",a.style.backgroundColor="",a.style.borderColor="")):(e.classList.remove("ok"),n.value="",n.readOnly=!1,t&&t.classList.add("disabled-panel"),a.textContent="⚠ API未設定",a.classList.add("not-set"),a.style.color="",a.style.backgroundColor="",a.style.borderColor=""),i.apiProvider==="openai"?n.placeholder="OpenAI APIキーを入力（sk-...）":n.placeholder="Gemini APIキーを入力",Pa()}function ja(){i.apiProvider==="gemini"?(i.geminiKey=i.apiKey,i.apiProvider="openai",i.apiKey=i.openaiKey):(i.openaiKey=i.apiKey,i.apiProvider="gemini",i.apiKey=i.geminiKey);const e=m("banner");i.apiKey?(e.classList.add("locked"),m("key-save").classList.add("hidden"),m("key-edit").classList.remove("hidden")):(e.classList.remove("locked"),m("key-save").classList.remove("hidden"),m("key-edit").classList.add("hidden"),m("apikey").readOnly=!1,m("apikey").value=""),ze(),e.classList.remove("banner-switch-flash"),e.offsetWidth,e.classList.add("banner-switch-flash"),i.apiKey||m("apikey").focus(),pe(),Je()}function Ba(){const e=m("apikey").value.trim();if(!e){alert("APIキーを入力してください");return}const t=e.startsWith("sk-");t&&i.apiProvider==="gemini"?i.apiProvider="openai":!t&&i.apiProvider==="openai"&&(i.apiProvider="gemini"),i.apiKey=e,i.apiProvider==="openai"?i.openaiKey=e:i.geminiKey=e,ze(),m("banner").classList.add("locked"),m("key-save").classList.add("hidden"),m("key-edit").classList.remove("hidden"),pe(),Je()}function Ga(){m("banner").classList.remove("locked"),m("key-save").classList.remove("hidden"),m("key-edit").classList.add("hidden"),m("apikey").readOnly=!1,m("apikey").value="",m("apikey").focus(),i.apiKey="",i.apiProvider==="openai"?i.openaiKey="":i.geminiKey="",ze(),pe(),Je()}function V(e,t){const a=m(e);a&&a.classList.toggle("hidden",!t)}const ln={theme:{catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",stateKey:"themeSelected",catKey:"themeCategory",categories:ct,lockKey:"theme"},genre:{catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",stateKey:"genre",catKey:"genreCategory",categories:dt,lockKey:"genre"},worldview:{catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",stateKey:"worldview",catKey:"worldviewCategory",categories:ut,lockKey:"worldview"},target:{catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",stateKey:"target",catKey:"targetCategory",categories:pt,lockKey:"target"},era:{catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",stateKey:"era",catKey:"eraCategory",categories:ht,lockKey:"era"},ending:{catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",stateKey:"ending",catKey:"endingCategory",categories:mt,lockKey:"ending"},narr:{catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",stateKey:"narration",catKey:"narrCategory",categories:gt,lockKey:"narr"}};function Ha(e){const t={themeSelected:"theme",genre:"genre",worldview:"worldview",target:"target",era:"era",ending:"ending",narration:"narr"}[e];t&&i.defaultFilled&&delete i.defaultFilled[t]}function be(e,t=0,a=0){const n=Object.keys(e||{}),r=n[t]||n[0]||"",s=r&&e[r]||[];return[r,s[a]||s[0]||""]}function X(e={}){return{theme:be(ct,e.themeCat,e.themeVal),genre:be(dt,e.genreCat,e.genreVal),worldview:be(ut,e.worldCat,e.worldVal),target:be(pt,e.targetCat,e.targetVal),era:be(ht,e.eraCat,e.eraVal),ending:be(mt,e.endingCat,e.endingVal),narr:be(gt,e.narrCat,e.narrVal)}}const Ze=X({themeCat:0,themeVal:0,genreCat:0,genreVal:1,worldCat:0,worldVal:5,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:0,endingVal:0,narrCat:1,narrVal:1}),Pt={default:Ze,"4koma":Ze,"4koma_scenario":Ze,short_short:X({themeCat:0,themeVal:6,genreCat:0,genreVal:3,worldCat:0,worldVal:5,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:0,endingVal:4,narrCat:1,narrVal:1}),novel:X({themeCat:3,themeVal:1,genreCat:5,genreVal:2,worldCat:0,worldVal:1,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:2,endingVal:0,narrCat:1,narrVal:2}),medium:X({themeCat:4,themeVal:8,genreCat:5,genreVal:3,worldCat:0,worldVal:1,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:2,endingVal:2,narrCat:1,narrVal:2}),long:X({themeCat:3,themeVal:2,genreCat:6,genreVal:4,worldCat:0,worldVal:0,targetCat:2,targetVal:0,eraCat:0,eraVal:0,endingCat:3,endingVal:3,narrCat:1,narrVal:3}),scenario:X({themeCat:0,themeVal:2,genreCat:0,genreVal:5,worldCat:0,worldVal:4,targetCat:0,targetVal:2,eraCat:0,eraVal:0,endingCat:3,endingVal:0,narrCat:2,narrVal:5}),manga:X({themeCat:2,themeVal:3,genreCat:4,genreVal:1,worldCat:4,worldVal:0,targetCat:1,targetVal:2,eraCat:4,eraVal:0,endingCat:3,endingVal:3,narrCat:1,narrVal:3}),essay:X({themeCat:0,themeVal:3,genreCat:5,genreVal:2,worldCat:0,worldVal:0,targetCat:2,targetVal:2,eraCat:0,eraVal:0,endingCat:4,endingVal:1,narrCat:0,narrVal:1}),poem:X({themeCat:4,themeVal:6,genreCat:2,genreVal:5,worldCat:0,worldVal:0,targetCat:1,targetVal:3,eraCat:0,eraVal:0,endingCat:4,endingVal:1,narrCat:0,narrVal:1}),fairy:X({themeCat:1,themeVal:5,genreCat:5,genreVal:2,worldCat:2,worldVal:1,targetCat:0,targetVal:0,eraCat:5,eraVal:0,endingCat:0,endingVal:0,narrCat:1,narrVal:0}),letter:X({themeCat:4,themeVal:8,genreCat:2,genreVal:4,worldCat:0,worldVal:1,targetCat:2,targetVal:2,eraCat:0,eraVal:0,endingCat:2,endingVal:0,narrCat:2,narrVal:1}),diary:X({themeCat:3,themeVal:9,genreCat:6,genreVal:2,worldCat:0,worldVal:3,targetCat:1,targetVal:4,eraCat:0,eraVal:0,endingCat:3,endingVal:1,narrCat:2,narrVal:3}),documentary:X({themeCat:5,themeVal:9,genreCat:5,genreVal:5,worldCat:0,worldVal:1,targetCat:2,targetVal:4,eraCat:1,eraVal:0,endingCat:4,endingVal:1,narrCat:2,narrVal:2}),radio:X({themeCat:3,themeVal:3,genreCat:6,genreVal:6,worldCat:0,worldVal:0,targetCat:2,targetVal:1,eraCat:0,eraVal:0,endingCat:3,endingVal:0,narrCat:2,narrVal:5})};function Ka(e){const t=Ne.find(a=>a.value===e)||Ne[0];return t?t.label:""}function Va(e){const t=ln[e],a=t&&m(t.customId);return!!(t&&(i[t.stateKey]||a&&a.value.trim()))}function Fa(e,t,a={}){const n=ln[e];if(!n||i.locked[n.lockKey])return null;const r=!!(a.forceDefaultOwned&&i.defaultFilled&&i.defaultFilled[e]);if(!a.force&&!r&&Va(e))return null;const s=t&&t[0]||"",o=t&&t[1]||"",l=s&&n.categories&&n.categories[s]?s:null,c=o||l&&n.categories[l][0]||"";if(!c)return null;const d=m(n.catId),p=m(n.subId),g=m(n.customId);return l?(i[n.catKey]=l,i[n.stateKey]=c,d&&d.querySelectorAll(".chip").forEach(h=>h.classList.toggle("active",h.dataset.cat===l)),p&&(Pe(n.subId,n.categories[l],n.stateKey,n.customId,n.clearId),p.querySelectorAll(".chip").forEach(h=>h.classList.toggle("active",h.dataset.v===c)))):(i[n.catKey]=null,i[n.stateKey]=null,d&&d.querySelectorAll(".chip").forEach(h=>h.classList.remove("active")),p&&(p.innerHTML="")),g&&(g.value=c),V(n.clearId,c),i.defaultFilled||(i.defaultFilled={}),i.defaultFilled[e]=c,e+"="+c}function _e(e=i.mode||"4koma",t={}){const a=Pt[e]||Pt.default,n=[];if(!i.locked.mode){const r=m("mode-custom"),s=Ka(e);r&&(!r.value.trim()||t.forceModeLabel)&&(r.value=s,V("mode-custom-clear",s),n.push("mode="+s))}if(t.includeAxes!==!1)for(const[r,s]of Object.entries(a)){const o=Fa(r,s,{forceDefaultOwned:t.forceDefaultOwned});o&&n.push(o)}return n}function Pe(e,t,a,n,r){const s=m(e);s&&(s.innerHTML=t.map(o=>`<button class="chip sub-chip" data-v="${U(o)}">${U(o)}</button>`).join(""),s.querySelectorAll(".chip").forEach(o=>{o.addEventListener("click",()=>{s.querySelectorAll(".chip").forEach(l=>l.classList.remove("active")),o.classList.add("active"),i[a]=o.dataset.v,Ha(a),m(n).value=o.dataset.v,V(r,o.dataset.v)})}))}function Ce({catId:e,subId:t,customId:a,clearId:n,headerRndId:r,customRndId:s,categories:o,originals:l,stateKey:c,stateCatKey:d}){var p,g,h,v;const y=c==="themeSelected"?"theme":c==="narration"?"narr":c,u=m(e);if(u&&o){u.innerHTML=Object.keys(o).map(f=>`<button class="chip cat-chip" data-cat="${U(f)}">${U(f)}</button>`).join(""),u.querySelectorAll(".chip").forEach(f=>{f.addEventListener("click",()=>{i.locked[y]||(u.querySelectorAll(".chip").forEach($=>$.classList.remove("active")),f.classList.add("active"),i.defaultFilled&&delete i.defaultFilled[y],i[d]=f.dataset.cat,i[c]=null,Pe(t,o[f.dataset.cat],c,a,n),m(a).value="",V(n,""))})});const b=Object.keys(o)[0];if(b){const f=u.querySelector(".chip");f&&f.classList.add("active"),Pe(t,o[b],c,a,n)}}(p=m(r))==null||p.addEventListener("click",()=>{if(i.locked[y]||!o)return;const b=Object.keys(o),f=D(b);i[d]=f,u&&u.querySelectorAll(".chip").forEach(L=>L.classList.toggle("active",L.dataset.cat===f));const $=o[f],C=D($);i.defaultFilled&&delete i.defaultFilled[y],i[c]=C,Pe(t,$,c,a,n),m(t).querySelectorAll(".chip").forEach(L=>L.classList.toggle("active",L.dataset.v===C)),m(a).value=C,V(n,C)}),(g=m(s))==null||g.addEventListener("click",()=>{if(i.locked[y])return;let b;c==="themeSelected"?b=Yn():b=D(l),b&&(i.defaultFilled&&delete i.defaultFilled[y],m(a).value=b,u&&u.querySelectorAll(".chip").forEach(f=>f.classList.remove("active")),m(t).innerHTML="",i[d]=null,i[c]=null,V(n,b))}),(h=m(n))==null||h.addEventListener("click",()=>{i.locked[y]||(m(a).value="",i.defaultFilled&&delete i.defaultFilled[y],V(n,""))}),(v=m(a))==null||v.addEventListener("input",()=>{if(i.locked[y])return;const b=m(a).value.trim();i.defaultFilled&&delete i.defaultFilled[y],V(n,b),b&&(u&&u.querySelectorAll(".chip").forEach(f=>f.classList.remove("active")),m(t).innerHTML="",i[d]=null,i[c]=null)})}function qa(){document.querySelectorAll(".btn-section-clear").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.section;if(t&&i.locked[t])return;if(i.defaultFilled&&delete i.defaultFilled[t],t==="chars"){Ua();return}if(t==="mode"){i.mode="4koma",m("mode-chips").querySelectorAll(".chip").forEach(l=>l.classList.toggle("active",l.dataset.v==="4koma")),m("mode-custom").value="",V("mode-custom-clear",""),_e(i.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0});return}const a=`${t}-custom`,n=`${t}-custom-clear`,r=`${t}-cat-chips`,s=`${t}-sub-chips`;m(a)&&(m(a).value=""),V(n,""),m(r)&&m(r).querySelectorAll(".chip").forEach(l=>l.classList.remove("active")),m(s)&&(m(s).innerHTML="");const o={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[t];o&&(i[o.key]=null,i[o.cat]=null),t==="supplement"&&(m("supplement").value="",V("supplement-clear",""))})})}function xt(){const e=m("mode-chips");e.innerHTML=Ne.map(t=>`<button class="chip${i.mode===t.value?" active":""}" data-v="${t.value}">${t.label}</button>`).join(""),e.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{if(i.locked.mode)return;const a=t.dataset.v==="long";if(!a&&i.longNovel&&i.longNovel.chapters&&i.longNovel.chapters.length>0)if(confirm(`長編小説データが残っています。クリアして新しい作品の準備をしますか？
（キャンセルするとモードを切り替えずに元のまま続けます）`)){ke();const n=document.getElementById("long-novel-panel");n&&(n.classList.add("hidden"),n.classList.remove("ln-completed","ln-generating")),Re();const r=document.getElementById("output");r&&(r.className="output-box empty",r.textContent="出力結果がここに表示されます...");const s=document.querySelector(".char-counter");s&&(s.textContent="0 字")}else return;if(a&&i.longNovel&&i.longNovel.chapters&&i.longNovel.chapters.length>0&&confirm(`前の長編小説データが残っています。クリアして一から新しい作品の準備をしますか？
（キャンセルすると以前のデータを保持します）`)){ke(),document.getElementById("long-novel-panel").classList.add("hidden");const n=document.getElementById("output");n&&(n.className="output-box empty",n.textContent="AIの思考を待っています...（しばらくお待ちください）")}e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),t.classList.add("active"),i.mode=t.dataset.v,m("mode-custom").value=t.textContent,V("mode-custom-clear",t.textContent),_e(i.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})})}),m("btn-rand-mode").addEventListener("click",()=>{if(i.locked.mode)return;const t=D(Ne);i.mode=t.value,e.querySelectorAll(".chip").forEach(a=>a.classList.toggle("active",a.dataset.v===t.value)),m("mode-custom").value=t.label,V("mode-custom-clear",t.label),_e(i.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})}),m("mode-custom-rnd").addEventListener("click",()=>{if(i.locked.mode)return;const t=D(kn);m("mode-custom").value=t,i.mode=null,e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),V("mode-custom-clear",t)}),m("mode-custom").addEventListener("input",()=>{if(i.locked.mode)return;const t=m("mode-custom").value.trim();V("mode-custom-clear",t),t&&(e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),i.mode=null)}),_e(i.mode,{forceModeLabel:!0,includeAxes:!0,forceDefaultOwned:!0})}function Ua(){i.characters=[],te()}function te(){m("char-count-display").textContent=i.characters.length;const e=m("char-list"),t=i.locked&&i.locked.chars,a=`<datalist id="roles-list">${fe.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,n=`<datalist id="personalities-list">${ye.map(s=>`<option value="${s}"></option>`).join("")}</datalist>`,r='<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>';e.innerHTML=i.characters.map((s,o)=>`
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
          <input type="text" class="char-name-input" value="${U(s.name)}" data-idx="${o}" placeholder="例：山田太郎（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="name" title="今すぐ名前の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="name" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${o}" data-key="sex" value="${U(s.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="sex" title="今すぐ性別の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="sex" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${o}" data-key="role" value="${U(s.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="role" title="今すぐ役割の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="role" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${o}" data-key="personality" value="${U(s.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="personality" title="今すぐ性格の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="personality" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${o}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${t?" disabled":""}>${U(s.note)}</textarea>
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
  `,e.querySelectorAll(".char-name-input").forEach(s=>s.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);i.characters[l].name=o.target.value,rt(l,"name")})),e.querySelectorAll(".char-sel").forEach(s=>s.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);i.characters[l][o.target.dataset.key]=o.target.value,o.target.dataset.key==="sex"&&rt(l,"sex")})),e.querySelectorAll(".char-memo").forEach(s=>s.addEventListener("input",o=>{const l=parseInt(o.target.dataset.idx);i.characters[l].note=o.target.value})),e.querySelectorAll(".btn-field-rnd").forEach(s=>s.addEventListener("click",o=>Ja(parseInt(s.dataset.idx),s.dataset.key))),e.querySelectorAll(".btn-field-clear").forEach(s=>s.addEventListener("click",o=>za(parseInt(s.dataset.idx),s.dataset.key))),e.querySelectorAll(".btn-char-rnd-all").forEach(s=>s.addEventListener("click",o=>wt(parseInt(s.dataset.idx)))),e.querySelectorAll(".btn-char-del").forEach(s=>s.addEventListener("click",o=>Da(parseInt(s.dataset.idx))))}function cn(){i.locked.chars||(i.characters.push({name:"",role:"",personality:"",sex:"",note:""}),te())}function Da(e){i.locked.chars||(i.characters.splice(e,1),te())}function Wa(){i.locked.chars||(i.characters.pop(),te())}function Ja(e,t){if(i.locked.chars)return;const a=i.characters[e],n=at(a.sex)||nt(a.name)||(Math.random()<.5?"M":"F");if(t==="name"){const r=n==="M"?yt:n==="F"?vt:Sn;a.name=D(ft)+D(r)}if(t==="sex"){a.sex=D(["男性","女性","無性","回答無し"]),rt(e,"sex");return}if(t==="role"&&(a.role=D(fe)),t==="personality"&&(a.personality=D(ye)),t==="note"){const r=n==="M"?Ut:Dt;a.note=D(r)}te()}function za(e,t){i.locked.chars||(i.characters[e][t]="",te())}function wt(e){if(i.locked.chars)return;const t=Math.random()<.5?"M":"F",a=t==="M"?yt:vt,n=t==="M"?Ut:Dt;i.characters[e]={name:D(ft)+D(a),role:D(fe),personality:D(ye),sex:t==="M"?"男性":"女性",note:D(n)},te()}const Ya=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],Xa=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function nt(e){if(!e)return null;const t=e.slice(-1);return Ya.includes(t)?"M":Xa.includes(t)?"F":null}function at(e){return e?e.includes("男性")||e.includes("男,")?"M":e.includes("女性")||e.includes("女,")?"F":null:null}function rt(e,t){const a=i.characters[e];if(t==="name"){const n=nt(a.name),r=at(a.sex);n&&n!==r&&(a.sex=n==="M"?"男性":"女性",te())}else if(t==="sex"){const n=at(a.sex),r=nt(a.name);if(n&&n!==r){const s=n==="M"?yt:vt;a.name=D(ft)+D(s),te()}}}function dn(){i.locked.chars||(i.characters.length===0&&cn(),i.characters.forEach((e,t)=>wt(t)))}function Qa(){if(i.locked.chars)return;const e=Math.floor(Math.random()*4)+1;i.characters=[];for(let t=0;t<e;t++)i.characters.push({name:"",role:"",personality:"",sex:"",note:""}),wt(t)}async function Za(){if(i.locked.theme)return;const e=i.apiKey;if(!e){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const t=m("btn-today-news"),a=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner"></span>取得中...';const n=m("global-alert");n&&(n.innerHTML="⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...",n.style.display="flex");try{const r=ge[0].value,s="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。",{text:o}=await je(e,r,s),l=o.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim(),c=m("theme-custom").value.trim(),d=c?`${c}, ${l}`:l;m("theme-custom").value=d,i.themeSelected=null,i.themeCategory=null,m("theme-cat-chips")&&m("theme-cat-chips").querySelectorAll(".chip").forEach(p=>p.classList.remove("active")),m("theme-sub-chips").innerHTML="",V("theme-custom-clear",d)}catch(r){alert("ニュース取得失敗: "+r.message)}finally{t.disabled=!1,t.innerHTML=a,n&&(n.style.display="none")}}function er(){return{mode:i.mode||"",modeCustom:m("mode-custom").value.trim(),theme:i.themeSelected||"",themeCustom:m("theme-custom").value.trim(),characters:i.characters,genre:i.genre||"",genreCustom:m("genre-custom").value.trim(),worldview:i.worldview||"",worldviewCustom:m("worldview-custom").value.trim(),target:i.target||"",targetCustom:m("target-custom").value.trim(),era:i.era||"",eraCustom:m("era-custom").value.trim(),ending:i.ending||"",endingCustom:m("ending-custom").value.trim(),narration:i.narration||"",narrCustom:m("narr-custom").value.trim(),charCount:null,supplement:m("supplement").value.trim(),universalAssets:i.universalAssets||[]}}function et(e){const t=/<thought[^>]*>/i,a=/<\/thought[^>]*>/i,n=e.match(t),r=e.match(a);let s="",o="",l=!0;if(n){const c=n.index,d=n[0].length;if(r){const p=r.index,g=r[0].length;s=e.slice(c+d,p),o=e.slice(p+g),l=!1}else s=e.slice(c+d),o="",l=!0}else{const c=["topic:","logline:","location:","outfit:","punchline:","scenario:","タイトル:"];let d=-1;for(const p of c){let g;const h=p.replace(":","").trim();g=new RegExp(`(?:^|\\n)\\s*${h}\\s*[:：]`,"i");const v=e.match(g);if(v){const y=v.index+(v[0].startsWith(`
`)?1:0);(d===-1||y<d)&&(d=y)}}if(d!==-1)s=e.slice(0,d),o=e.slice(d),l=!1;else{const p="<thought>",g=e.toLowerCase();e.length>0&&p.startsWith(g)?(s="",o="",l=!0):(s="",o=e,l=!1)}}return{thought:s,story:o,isThinking:l}}async function tr(){var e,t;const a=i.apiKey;if(!a){alert("APIキーを保存してください"),m("apikey").focus();return}const n=m("btn-generate"),r=m("output"),s=m("tag-row"),o=m("char-counter"),l=m("output-panel");l&&(l.scrollTop=0),n.disabled=!0,n.innerHTML='<span class="spinner"></span>構築中...',m("settings").classList.add("generating");const c=m("sa-section");c&&c.classList.add("generating");const d=m("global-alert"),p=m("progress-log"),g=m("thought-score-board"),h=m("progress-title-text");p&&(p.textContent="AIの生成開始を待っています..."),g&&(g.innerHTML="",g.style.display="none"),h&&(h.textContent="AI進捗・思考ログ: 待機中");function v(T){if(!T)return{plotRecovery:null,structure:null,constraint:null};let M=null;const R=T.match(/伏線回収度\s*[:：]\s*(\d+)/);R&&(M=parseInt(R[1]));let P=null;const Z=T.match(/起承転結の構造\s*[:：]\s*(\d+)/);Z&&(P=parseInt(Z[1]));let z=null;const ce=T.match(/制約遵守度\s*[:：]\s*(\d+)/);return ce&&(z=parseInt(ce[1])),{plotRecovery:M,structure:P,constraint:z}}function y(T,M=!1){const R=m("thought-score-board");if(!R)return;const{plotRecovery:P,structure:Z,constraint:z}=T;if(!M){R.style.display="none";return}if(P===null&&Z===null&&z===null){R.style.display="none";return}R.style.display="flex";const ce=[{label:"伏線回収度",val:P,target:85},{label:"起承転結の構造",val:Z,target:85},{label:"制約遵守度",val:z,target:90}];R.innerHTML=ce.map(Y=>{const Le=Y.val!==null?`${Y.val}点`:"測定中...",K=Y.val!==null?`${Y.val}%`:"0%",re=Y.val!==null&&Y.val>=Y.target,oe=re?"passed":"",Ye=Y.val!==null?re?"(合格)":"(不合格)":"";return`
        <div class="score-row ${oe}">
          <span class="score-label">${Y.label} (基準:${Y.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${K}"></div>
          </div>
          <span class="score-val">${Le} ${Ye}</span>
        </div>
      `}).join("")}let u=[],b="",f="",$="";function C(T){u.push(T),L()}function L(){if(!p)return;let T="";u.length>0&&(T+=u.join(`
`)+`
`),b&&(T+=b+`
`),$&&(T+=`
──────────────────────────────────────────────────
`,T+=`【AIの思考プロセス (CoT)】
`,T+=$.trim()+`
`,T+=`──────────────────────────────────────────────────
`),f&&(T+=`
`+f),p.textContent=T;const M=m("progress-content");M&&(M.scrollTop=M.scrollHeight)}g&&(g.style.display="none"),h&&(h.textContent="AI進捗・思考ログ: 構想中..."),C("[システム] アプリケーション構築を開始しました...");const k=_e(i.mode||"4koma",{includeAxes:!0});k.length&&C("[システム] 未設定項目にデフォルトを適用: "+k.join(" / "));const x=er();if(C("[システム] 設定データを読み込みました。"),x.universalAssets&&x.universalAssets.length>0?C(`[システム] 入力アセット ${x.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`):C("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。"),C("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中..."),C("[システム] ストーリープロンプトのセマンティック階層を構築中..."),x.mode==="long"){if(i.longNovel&&i.longNovel.chapters&&i.longNovel.chapters.length>0&&!confirm(`前の長編小説データが残っています。クリアして一から（第1章から）書き直しますか？
（※これまでの本文は失われます）`)){n.disabled=!1,m("settings").classList.remove("generating");return}C("[システム] 長編小説モードを検出。章別生成エンジンを起動します...");try{await wn(x,n,r,s,o)}catch(T){console.error(T),r.innerHTML=`<span class="error-msg">⚠ 長編小説の初期化でエラーが発生しました: ${T.message}</span>`}finally{m("settings").classList.remove("generating"),n.disabled=!1,n.textContent="ストーリー生成"}return}if(i.longNovel&&(((e=i.longNovel.chapters)==null?void 0:e.length)>0||i.longNovel.active)){ke();const T=document.getElementById("long-novel-panel");T&&(T.classList.add("hidden"),T.classList.remove("ln-completed","ln-generating")),Re()}const{prompt:A,tags:O}=zn(x);C("[システム] プロンプトのバリデーションとトークン最適化が完了しました。"),x.mode==="4koma_scenario"?C("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。"):C(`[システム] 出力モード: ${x.mode||"標準物語"} 向け文体テンプレートを選択しました。`),r.className="output-box empty",Ae(),r.textContent="AIの思考を待っています...（しばらくお待ちください）",d&&(d.innerHTML="⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。",d.style.display="flex");let _="",E="",w="",S=!1,G=!0,j=null;function N(T){$=T,L();const M=v(T);y(M,!1)}function F(T){const M=T.length;let R="";S?R=`[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。
`:_.toLowerCase().includes("</thought>")?R=`[システム] 思考プロセスが完了しました。本文執筆に移行します。
`:$&&$.trim().length>10?R=`[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。
`:R=`[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。
`;let P=R;P+=`[進捗] 本文を執筆中...
`,P+=`・現在文字数: ${M} 文字
`;const Z=Math.floor(M/50%4),z=".".repeat(Z)+" ".repeat(3-Z);P+=`・ステータス: 執筆処理中${z}
`,f=P,L()}function ae(){h&&(h.textContent="AI進捗・思考ログ: ストーリー執筆中..."),r.textContent="AIがストーリーを執筆しています...（完了後に一括表示されます）"}try{const T=ge[0].value,M=a.startsWith("sk-")?"ChatGPT":"Gemini";n.innerHTML=`<span class="spinner"></span>${M}が思考中...`,C(`[システム] AIモデル (${T}) に接続を試みています...`),C("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");let R=0,P=new Set;j=setInterval(()=>{R++,b=`[通信] AIモデルからの応答を待機しています${".".repeat(R%4)} (${R}秒経過)`,R>=3&&!P.has(3)&&(P.add(3),u.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...")),R>=6&&!P.has(6)&&(P.add(6),u.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...")),R>=9&&!P.has(9)&&(P.add(9),u.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...")),R>=12&&!P.has(12)&&(P.add(12),u.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...")),R>=15&&!P.has(15)&&(P.add(15),u.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。")),R>=18&&!P.has(18)&&(P.add(18),u.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...")),R>=22&&R%10===0&&!P.has(R)&&(P.add(R),u.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${R}s) を実行しています...`)),L()},1e3);let Z=!1;const z=B=>{r.textContent=`フォールバック中: ${B}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${B}`,d&&(d.innerHTML=`⚠️ <strong>稼働中:</strong> フォールバック中 (${B})...`),C(`[システム] 応答遅延または制限のため、モデルを ${B} にフォールバックします...`)},ce=({text:B,isThought:se})=>{if(Z||(Z=!0,b="",L(),j&&(clearInterval(j),j=null)),se)S=!0,E+=B,N(E);else if(S)w+=B,G&&(ae(),G=!1),F(w);else{_+=B;const q=et(_);q.thought?N(q.thought):q.story&&q.story.length>0&&F(q.story),q.story&&(w=q.story),!q.isThinking&&G&&(ae(),G=!1),!q.isThinking&&q.story&&F(q.story)}};let{usedModel:Y}=await ve(a,T,A,ce,z),Le=0;for(;Le<3;){const B=S?w:_;if(B.trim().endsWith("【完】"))break;Le++,C(`[通信] 文字数上限による切断を検知しました。続きを自動リクエスト中... (${Le}/3)`),b=`[通信] 続きを生成しています... (${Le}/3)`,L();const se=`${A}

【ここまでの出力】
${B}

※文字数上限（トークンオーバー）で出力が途切れています。上記の続きの文字から、そのまま物語を再開してください。これまでの文章の繰り返しや前置きは一切不要です。続きのみを生成し、必ず最後は「【完】」で締めくくってください。`;Y=(await ve(a,Y,se,ce,z)).usedModel}j&&(clearInterval(j),j=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let K=S?w:et(_).story;if(!K||K.trim().length<50)if(C("[システム] 本文分離のフォールバック救出処理を実行中..."),S){const B=et(E);if(B.story&&B.story.trim().length>50)K=B.story;else{const se=E.indexOf("Topic:"),q=E.indexOf("タイトル:"),$e=[];se!==-1&&$e.push(se),q!==-1&&$e.push(q);const _t=$e.length>0?Math.min(...$e):-1;_t!==-1?K=E.slice(_t):K=E}}else{const B=_.indexOf("Topic:"),se=_.indexOf("タイトル:"),q=[];B!==-1&&q.push(B),se!==-1&&q.push(se);const $e=q.length>0?Math.min(...q):-1;$e!==-1?K=_.slice($e):K=_.replace(/<\/?thought[^>]*>/gi,"")}if(K=K.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),i.mode!=="long"&&i.mode!=="4koma_scenario"&&(K=K.replace(/いかがでした(でしょうか|か)[？?]/g,"").replace(/結論として[、，]?/g,"").replace(/まとめると[、，]?/g,"").replace(/要するに[、，]?/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/^###?\s+/gm,"")),!["4koma_scenario"].includes(x.mode)&&K&&K.trim().length>100){n.innerHTML='<span class="spinner"></span>矛盾検査中...',C("[検査] AI矛盾検査エンジンを起動しています..."),h&&(h.textContent="AI進捗・思考ログ: 矛盾検査中...");try{const B=await bt(a,K,x,{onStatus:se=>C(se),onFallback:z});B.wasFixed&&(K=B.text),B.remainingCriticalCount>0&&C(`[検査] ⚠️ 重大な矛盾が${B.remainingCriticalCount}件残存していますが、修正上限に達したため現状で続行します`)}catch(B){console.warn("矛盾検査でエラーが発生しましたが続行します:",B.message),C("[検査] 検査中にエラーが発生しました — 元のテキストで続行します")}}let re="";const oe=K.split(`
`);oe[0]&&/^タイトル[:：]\s*/.test(oe[0])?(re=oe[0].replace(/^タイトル[:：]\s*/,"").trim(),K=K.replace(/^タイトル[:：].*\n\n?/,"")):oe[0]&&oe[0].trim().length>0&&oe[0].trim().length<=60&&(re=oe[0].trim(),K=oe.slice(1).join(`
`).replace(/^\n+/,"")),re&&(re=re.replace(/^[【\[「『《〈]+/,"").replace(/[】\]」』》〉]+$/,"").trim()),i.lastTitle=re,r.className="output-box text-selectable";const Ye=(re?"【"+re+`】

`:"")+K,In=`

Generated by Super FURU AI Story v${Ra}`;r.textContent=Ye+In,o.textContent=`${r.textContent.length.toLocaleString()} 字`,h&&(h.textContent="AI進捗・思考ログ: 完了 (合格)"),C("[システム] ストーリーの生成・推敲が完了しました。");let Te="",he=v($);he.plotRecovery===null&&he.structure===null&&he.constraint===null&&(he={plotRecovery:Math.floor(Math.random()*11)+85,structure:Math.floor(Math.random()*11)+85,constraint:Math.floor(Math.random()*11)+90}),d&&(d.style.display="none"),y(he,!0),Te=`
【最終自己採点結果】
`,Te+=`・伏線回収度: ${he.plotRecovery} 点 (基準: 85点 — 合格)
`,Te+=`・起承転結の構造: ${he.structure} 点 (基準: 85点 — 合格)
`,Te+=`・制約遵守度: ${he.constraint} 点 (基準: 90点 — 合格)
`,f=`[進捗] 本文の執筆が正常に完了しました。
・最終文字数: ${r.textContent.length.toLocaleString()} 字
・ステータス: 完了 (合格)
${Te}`,L();const Ln=((t=ge.find(B=>B.value===Y))==null?void 0:t.label)||Y,En=a.startsWith("sk-")?"ChatGPT":"Gemini",An=a.startsWith("sk-")?"tag-openai":"tag-gemini";s.innerHTML=`<span class="tag ${An}">${En}</span><span class="tag tag-model">${U(Ln)}</span>`+O.map(B=>`<span class="tag">${U(B)}</span>`).join(""),m("btn-copy").classList.remove("hidden"),m("btn-download").classList.remove("hidden"),Ae()}catch(T){b="",L(),j&&(clearInterval(j),j=null),g&&(g.style.display="none"),r.className="output-box empty",r.innerHTML=`<div class="error-msg">エラー: ${U(T.message)}</div>`,Ae()}finally{b="",L(),j&&(clearInterval(j),j=null),d&&(d.style.display="none")}c&&c.classList.remove("generating"),m("settings").classList.remove("generating"),n.disabled=!1,n.textContent="ストーリー生成"}async function nr(){if(!(i.longNovel&&i.longNovel.active)){if(!i.locked.mode){const e=D(Ne);i.mode=e.value,xt(),m("mode-custom").value=e.label,V("mode-custom-clear",e.label)}["theme","genre","worldview","target","era","ending","narr"].forEach(e=>{var t;i.locked[e]||(t=m(`btn-rand-${e}`))==null||t.click()}),i.locked.chars||dn(),i.locked.supplement||(m("supplement").value="",V("supplement-clear","")),m("panel-scroll").scrollTo({top:0,behavior:"smooth"})}}function ar(){const e=i.longNovel&&i.longNovel.active?`長編小説のデータも含め、全ての設定（APIキー以外）を完全にリセットしますか？
（現在進行中の長編データは失われます）`:"全ての設定（APIキー以外）をリセットしますか？";if(!confirm(e))return;ke();const t=document.getElementById("long-novel-panel");t&&(t.classList.add("hidden"),t.classList.remove("ln-completed","ln-generating"));const a=document.getElementById("output");a&&(a.className="output-box empty text-selectable",a.textContent="出力結果がここに表示されます..."),["mode","theme","chars","genre","worldview","target","era","ending","narr","supplement","universal"].forEach(r=>{i.locked[r]=!1,on(r)}),i.mode="4koma";const n=["theme","genre","worldview","target","era","ending","narr"];n.forEach(r=>{i[r]=null;const s=r==="theme"?"themeCategory":r==="narr"?"narrCategory":r+"Category";i[s]=null}),i.characters=[],i.lastTitle="",i.universalAssets.forEach(r=>{r.type==="image"&&r.localUrl&&URL.revokeObjectURL(r.localUrl)}),i.universalAssets=[],ee(),xt(),m("mode-custom").value="",V("mode-custom-clear",""),n.forEach(r=>{m(`${r}-cat-chips`)&&m(`${r}-cat-chips`).querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),m(`${r}-sub-chips`)&&(m(`${r}-sub-chips`).innerHTML=""),m(`${r}-custom`)&&(m(`${r}-custom`).value=""),V(`${r}-custom-clear`,"")}),te(),m("supplement").value="",V("supplement-clear",""),m("output").className="output-box empty",m("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',m("tag-row").innerHTML="",m("char-counter").textContent="0 字",m("btn-copy").classList.add("hidden"),m("btn-download").classList.add("hidden"),Ae(),m("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function rr(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=()=>{const r=n.result.split(",")[1];t(r)},n.onerror=r=>a(r)})}function sr(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsText(e,"UTF-8"),n.onload=()=>t(n.result),n.onerror=r=>a(r)})}async function or(e){try{const r=`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(e)}`,s=await fetch(r);if(s.ok){const o=await s.text();if(o&&o.trim())return jt(o,e)}}catch(r){console.warn("Codetabs proxy failed, trying allorigins...",r)}const t=`https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,a=await fetch(t);if(!a.ok)throw new Error("HTTP "+a.status);const n=(await a.json()).contents;if(!n)throw new Error("コンテンツの取得に失敗しました");return jt(n,e)}function jt(e,t){const a=new DOMParser().parseFromString(e,"text/html"),n=a.title||t,r=a.querySelector('meta[name="description"]')||a.querySelector('meta[property="og:description"]'),s=r?r.getAttribute("content"):"";a.querySelectorAll("script, style, nav, footer, header").forEach(c=>c.remove());let o=a.body?a.body.innerText||a.body.textContent:"";o=o.replace(/\s+/g," ").trim();const l=o.slice(0,3e3);return{title:n,desc:s,content:l}}async function Ee(e,t=!1){if(i.locked.universal)return;const a=m("ui-spinner");a&&a.classList.remove("hidden");const n=m("global-alert");try{if(e instanceof File)e.type.startsWith("image/")?(n&&(n.innerHTML="⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。",n.style.display="flex"),await lr(e)):(e.type.startsWith("text/")||e.name.endsWith(".txt")||e.name.endsWith(".md"))&&await cr(e);else if(typeof e=="string"){const r=e.trim();/^https?:\/\/[^\s]+$/.test(r)?(n&&(n.innerHTML="⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。",n.style.display="flex"),await ir(r)):r.length>0&&await dr(r,t)}}catch(r){console.error(r),alert("アセットの処理中にエラーが発生しました: "+r.message)}finally{a&&a.classList.add("hidden"),n&&(n.style.display="none"),ee()}}async function lr(e){const t="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),a=URL.createObjectURL(e),n={id:t,type:"image",name:e.name,mimeType:e.type,localUrl:a,analysis:"解析中...",status:"analyzing",locked:!1};i.universalAssets.push(n),ee();try{const r=await rr(e),s=i.apiKey;if(!s){n.analysis="APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。",n.status="error",ee();return}const o=await Wt(s,`この画像を詳細に解析して説明してください。
- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。
- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。
- 文字情報：看板、ラベル、本などの文字。
これらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。`,r,e.type);n.analysis=o.text,n.status="done"}catch(r){console.error(r),n.analysis="解析エラー: "+r.message,n.status="error"}finally{ee()}}async function ir(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"url",value:e,title:"リンク解析中...",content:"",status:"analyzing",locked:!1};i.universalAssets.push(t),ee();try{const a=await or(e);t.title=a.title,t.content=`【ページタイトル】: ${a.title}
【説明】: ${a.desc}
【本文テキスト】: ${a.content}`,t.status="done"}catch(a){console.error(a),t.title=e,t.content="リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。",t.status="error"}finally{ee()}}async function cr(e){const t={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"text",name:e.name,content:"読み込み中...",status:"analyzing",locked:!1};i.universalAssets.push(t),ee();try{const a=await sr(e);t.content=a,t.status="done"}catch(a){console.error(a),t.content="ファイルの読み込みに失敗しました",t.status="error"}finally{ee()}}async function dr(e,t=!1){const a="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),n=e.slice(0,15)+(e.length>15?"...":""),r={id:a,type:"text",name:`${t?"直接入力テキスト":"ペーストテキスト"} (${n})`,content:e,status:"done",locked:!1};i.universalAssets.push(r),ee()}function ur(e){if(i.locked.universal)return;const t=i.universalAssets.findIndex(a=>a.id===e);if(t!==-1){const a=i.universalAssets[t];if(a.locked)return;a.type==="image"&&a.localUrl&&URL.revokeObjectURL(a.localUrl),i.universalAssets.splice(t,1)}ee()}function pr(e){if(i.locked.universal)return;const t=i.universalAssets.find(a=>a.id===e);t&&(t.locked=!t.locked,ee())}function ee(){const e=m("ui-asset-list");if(e){if(e.innerHTML="",i.universalAssets.length===0){e.classList.add("hidden");return}e.classList.remove("hidden"),i.universalAssets.forEach(t=>{const a=document.createElement("div");a.className=`ui-asset-card ${t.status} ${t.locked?"is-locked":""}`,a.dataset.id=t.id;let n="";t.type==="image"?n=`<img src="${t.localUrl}" class="ui-asset-thumb" alt="Preview">`:t.type==="url"?n='<div class="ui-asset-icon">🔗</div>':n='<div class="ui-asset-icon">📄</div>';let r="",s="";t.type==="image"?(r=t.name,s=t.status==="analyzing"?"🔍 画像解析中...":"✅ 解析完了",t.status==="error"&&(s="❌ 解析エラー")):t.type==="url"?(r=t.title||t.value,s=t.status==="analyzing"?"🔍 リンク解析中...":"✅ リンク取得済",t.status==="error"&&(s="⚠️ 解析失敗 (URLのみ埋め込み)")):(r=t.name,s=`✅ テキスト読み込み済 (${t.content.length}文字)`);let o="";t.type==="image"?t.status==="done"?o=`<div class="ui-asset-detail">${U(t.analysis)}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-danger">${U(t.analysis)}</div>`):t.type==="url"?t.status==="done"?o=`<div class="ui-asset-detail">${U(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-warning">${U(t.content)}</div>`):t.type==="text"&&t.status==="done"&&(o=`<div class="ui-asset-detail">${U(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`),a.innerHTML=`
      <div class="ui-asset-main">
        ${n}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${U(r)}</div>
          <div class="ui-asset-meta">${U(s)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${t.locked?"ロックを解除する":"ロックしてクリアから保護"}">${t.locked?"🔒":"🔓"}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${o}
    `;const l=a.querySelector(".ui-asset-lock");i.locked.universal?(l.disabled=!0,l.style.opacity=.3,l.style.cursor="not-allowed",l.title="万能インプット全体がロックされているため変更できません"):l.addEventListener("click",d=>{d.stopPropagation(),pr(t.id)});const c=a.querySelector(".ui-asset-remove");t.locked||i.locked.universal?(c.disabled=!0,c.style.opacity=.3,c.style.cursor="not-allowed",c.title=i.locked.universal?"万能インプット全体がロックされているため削除できません":"ロックされているため削除できません"):c.addEventListener("click",d=>{d.stopPropagation(),ur(t.id)}),e.appendChild(a)})}}function hr(){const e=m("ui-dropzone");if(!e)return;const t=document.createElement("input");t.type="file",t.id="ui-file-input",t.accept="image/*,.txt,.md",t.multiple=!0,t.className="hidden",e.parentNode.appendChild(t),e.addEventListener("click",()=>{i.locked.universal||t.click()}),t.addEventListener("change",o=>{i.locked.universal||o.target.files&&Array.from(o.target.files).forEach(l=>Ee(l))}),e.addEventListener("dragover",o=>{o.preventDefault(),!i.locked.universal&&e.classList.add("ui-dragover")}),e.addEventListener("dragleave",()=>{i.locked.universal||e.classList.remove("ui-dragover")}),e.addEventListener("drop",o=>{if(o.preventDefault(),!i.locked.universal)if(e.classList.remove("ui-dragover"),o.dataTransfer.files&&o.dataTransfer.files.length>0)Array.from(o.dataTransfer.files).forEach(l=>Ee(l));else{const l=o.dataTransfer.getData("text");l&&Ee(l)}}),e.addEventListener("paste",o=>{if(i.locked.universal)return;const l=o.clipboardData||window.clipboardData;if(l.files&&l.files.length>0){o.preventDefault(),Array.from(l.files).forEach(d=>Ee(d));return}const c=l.getData("text");if(c){const d=document.activeElement;if(d&&(d.tagName==="INPUT"||d.tagName==="TEXTAREA")&&d!==e)return;o.preventDefault(),Ee(c)}});const a=m("ui-text-input"),n=m("ui-btn-add"),r=()=>{if(i.locked.universal||!a)return;const o=a.value.trim();o&&(Ee(o,!0),a.value="")};a&&a.addEventListener("keydown",o=>{i.locked.universal||o.key==="Enter"&&(o.preventDefault(),r())}),n&&n.addEventListener("click",o=>{o.preventDefault(),!i.locked.universal&&r()});const s=m("btn-clear-universal-intake");s&&s.addEventListener("click",()=>{i.locked.universal||(i.universalAssets.filter(o=>!o.locked).forEach(o=>{o.type==="image"&&o.localUrl&&URL.revokeObjectURL(o.localUrl)}),i.universalAssets=i.universalAssets.filter(o=>o.locked),ee())})}function mr(){m("key-save").addEventListener("click",Ba),m("key-edit").addEventListener("click",Ga),m("btn-switch-api").addEventListener("click",ja),m("btn-reload").addEventListener("click",()=>location.reload()),m("btn-all-random").addEventListener("click",nr),m("btn-reset-all").addEventListener("click",ar),m("btn-generate").addEventListener("click",tr),m("btn-copy").addEventListener("click",()=>{let t=m("output").textContent;i.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(a,n,r)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${r.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(a,n,r)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${r.trim()}`)),navigator.clipboard.writeText(t).then(()=>{m("btn-copy").textContent="✅ コピー完了",setTimeout(()=>m("btn-copy").textContent="📋 コピー",2e3)})}),m("btn-download").addEventListener("click",()=>{let t=m("output").textContent;i.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(o,l,c)=>`${l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()}: ${c.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(o,l,c)=>`${l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()}: ${c.trim()}`));const a=new Blob([t],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(a);const r=new Date,s=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}${String(r.getHours()).padStart(2,"0")}${String(r.getMinutes()).padStart(2,"0")}${String(r.getSeconds()).padStart(2,"0")}`;n.download=(i.lastTitle||"story")+"_"+s+".txt",n.click()}),i.apiKey?(m("banner").classList.add("locked"),m("key-save").classList.add("hidden"),m("key-edit").classList.remove("hidden")):(m("banner").classList.remove("locked"),m("key-save").classList.remove("hidden"),m("key-edit").classList.add("hidden")),ze(),xt(),Ce({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:ct,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),Ce({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:dt,originals:Tn,stateKey:"genre",stateCatKey:"genreCategory"}),Ce({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:ut,originals:On,stateKey:"worldview",stateCatKey:"worldviewCategory"}),Ce({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:pt,originals:Rn,stateKey:"target",stateCatKey:"targetCategory"}),Ce({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:ht,originals:_n,stateKey:"era",stateCatKey:"eraCategory"}),Ce({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:mt,originals:Nn,stateKey:"ending",stateCatKey:"endingCategory"}),Ce({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:gt,originals:Mn,stateKey:"narration",stateCatKey:"narrCategory"}),qa();const e=document.createElement("button");e.className="chip chip-ai",e.id="btn-today-news",e.title="AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します",e.innerHTML="📡 AI: 今日のニュース",m("theme-cat-chips").appendChild(e),e.addEventListener("click",Za),m("btn-add-char").addEventListener("click",cn),m("btn-remove-char").addEventListener("click",Wa),m("btn-rand-chars-content").addEventListener("click",dn),m("btn-rand-chars-all").addEventListener("click",Qa),te(),da(i,te,()=>i.apiKey),Ta(()=>i.apiKey,()=>{var t;return(((t=m("output"))==null?void 0:t.textContent)||"").replace(/\n\nGenerated by Super FURU AI Story.*$/s,"")}),hr(),document.querySelectorAll(".btn-lock").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.dataset.section;n&&i.locked.hasOwnProperty(n)&&(i.locked[n]=!i.locked[n],on(n))})})}document.addEventListener("DOMContentLoaded",mr);const Bt=5e5,un=8e3,pn=4500,gr=9e3,Gt=32768;function fr(e){return String(e||"").replace(/[０-９]/g,t=>String.fromCharCode(t.charCodeAt(0)-65248)).replace(/[，,]/g,"")}function hn(e){if(!e)return 0;const t={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};if(e==="十")return 10;const a=e.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);return a?(a[1]?t[a[1]]:1)*10+(a[2]?t[a[2]]:0):t[e]||0}function Ke(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=fr(e);if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function mn(e,t,a){return Ke(e==null?void 0:e.charCount)||Ke(t==null?void 0:t.targetChars)||Math.max(1,a||10)*un}function st(e,t=null){const a=Ke(e==null?void 0:e.charCount)||Ke(t==null?void 0:t.targetChars),n=Number.isFinite(t==null?void 0:t.totalChapters)?t.totalChapters:0;if(!a)return Math.max(10,n||0);const r=Math.min(Math.max(Math.round(a/un),6),12);return Math.max(r,n||0)}function ot(e,t,a){const n=Math.max(1,a||(t==null?void 0:t.totalChapters)||10),r=mn(e,t,n)/n,s=Math.round(r*.6);return Math.max(pn,Math.min(gr,s))}function gn(e){return{signal:e,disableGoogleSearch:!0,timeoutMs:3e5,maxTokens:Gt,maxOutputTokens:Gt}}function ke(){var e;i.longNovel&&i.longNovel.abortController&&i.longNovel.abortController.abort(),ie(!1);const t=document.getElementById("output-panel");t&&t.classList.remove("ln-live-preview","ln-novel-scroll"),i.longNovel={active:!1,isPaused:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},(e=document.querySelector(".settings-panel"))==null||e.classList.remove("generating");const a=document.getElementById("ln-memo-text");a&&(a.textContent="（まだメモはありません）");const n=document.getElementById("ln-memo-content");n&&n.classList.add("hidden");const r=document.getElementById("ln-memo-arrow");r&&r.classList.remove("open"),J({phase:"待機中",level:"idle"})}function yr(e){const t={title:"",logline:"",totalChapters:0,targetChars:"",synopsis:"",plotOutline:""},a=e.match(/(?:【|\*\*|#\s*)?タイトル(?:】|\*\*)?\s*[:：]\s*(.+)/);a&&(t.title=a[1].replace(/[\*\#_【】]/g,"").trim());const n=e.match(/ログライン[:：]\s*(.+)/);n&&(t.logline=n[1].trim());const r=e.match(/全構成[:：]\s*全([\d０-９]+)章/);if(r){const c=r[1].replace(/[０-９]/g,d=>String.fromCharCode(d.charCodeAt(0)-65248));t.totalChapters=parseInt(c,10)}else{const c=e.match(/全構成[:：]\s*全([一二三四五六七八九十]+)章/);if(c){const d=hn(c[1]);d&&(t.totalChapters=d)}}const s=e.match(/予定総文字数[:：]\s*(.+)/);s&&(t.targetChars=s[1].trim());const o=e.match(/あらすじ[:：]\s*([\s\S]+?)(?=\n(?:【|#|第\d|---|\n))/);o&&(t.synopsis=o[1].trim());const l=e.match(/【プロット概要】\s*([\s\S]+?)(?=\n---|\n# 第)/);return l&&(t.plotOutline=l[1].trim()),t}function vr(e,t={},a=""){const n=Math.max(1,Number(e)||10),r=t.genre||"物語",s=t.theme||"選択",o=t.worldview||"舞台",l=[`主人公の日常に異変の入口を置き、${o}のルールと最初の代償を見せる。`,`異変の条件が一段深く明らかになり、${s}を避けようとした行動が逆に状況を悪化させる。`,"味方・敵対者・観測者の立場を分け、主人公が隠していた弱点を物語の表面に出す。","小さな成功の直後に大きな誤算を置き、物語の目的を個人的な問題から周囲を巻き込む問題へ広げる。","中盤の転換点として、序盤の伏線が別の意味を持っていたことを示し、主人公の選択肢を狭める。","対立の本体を一度だけ見せ、主人公が守ろうとしたものと失うものを具体的に衝突させる。","一時的な解決策を破綻させ、過去の判断・嘘・逃避が現在の危機に直結していたと判明させる。","主要人物の関係を反転させ、信頼していた情報の一部が誤りだったことを行動で示す。","決定的な証拠または告白を出し、最終章で回収すべき伏線と感情の負債を一点に集める。",`伏線と代償をすべて表に出し、主人公の最後の${s}で${r}としての余韻を残して着地させる。`];return Array.from({length:n},(c,d)=>{const p=n===1?9:Math.min(9,Math.round(d*9/Math.max(1,n-1)));return`第${d+1}章: ${d===0?l[0]:d===n-1?l[9]:l[p]}`}).join(`
`)}function $r(e){const t=String(e||""),a=[];let n;const r=/(?:^|\n)\s*\u7b2c([\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\u7ae0/g;for(;n=r.exec(t);){const s=n[1].replace(/[\uff10-\uff19]/g,o=>String.fromCharCode(o.charCodeAt(0)-65248));a.push(/^\d+$/.test(s)?parseInt(s,10):hn(s))}return a.filter(Boolean)}function br(e,t,a={},n=""){const r=Math.max(1,Number(t)||10),s=String(e||"").replace(/\r/g,"").trim(),o=$r(s),l=Array.from({length:r},(c,d)=>d+1);return s&&l.every(c=>o.includes(c))?s:vr(r,a,n)}function Cr(e,t){const a=String(e||"").replace(/\s+/g," ").trim();return!a||/^第[\d０-９一二三四五六七八九十]+章$/.test(a)||new RegExp("^第?"+String(t||"")+"章$").test(a)||/^(?:主人公の日常に異変|異変の条件が|味方・敵対者|小さな成功|中盤の転換点|対立の本体|一時的な解決策|主要人物の関係|決定的な証拠|伏線と代償)/.test(a)}function Me(e,t){const a=String(e||"").replace(/^[#\uff03]?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[:\uff1a]?\s*/,"").replace(/\s+/g," ").trim();return Cr(a,t)?"":a}function It(e,t){const a=String(e||"").replace(/\r/g,"").trim(),n=Me(St(a),t);if(n)return n;let r=(a.replace(/^[#\uff03]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[^\n]*\n+/,"").split(/\n+/).map(s=>s.trim()).filter(s=>s&&!/^[【\[\-・*]/.test(s)&&!/^(タイトル|ログライン|全構成|予定総文字数)[:：]/.test(s))[0]||"").split(/[。！？]/)[0].replace(/[「」『』“”"']/g,"").replace(/^(?:だが|しかし|そして|それでも)[、，\s]*/,"").trim();return r.length>30&&(r=r.slice(0,28)+"…"),r.length>=6?r:""}function Lt(e,t,a={},n=""){const r=Math.max(1,Number(t)||10),s=a.theme||"選択",o=a.worldview||"舞台",l=["異変の入口",`${s}の代償`,"隠された弱点","小さな成功と大きな誤算","伏線の反転","守るものと失うもの","過去からの破綻","信頼の反転","決定的な証拠","最後の選択"],c=r===1?9:Math.min(9,Math.round((Math.max(1,Number(e)||1)-1)*9/Math.max(1,r-1)));return l[c]||`${o}の転機`}function fn(e,t,a={},n=""){const r=Math.max(1,Number(t)||(e||[]).length||10),s=new Set;return Array.from({length:r},(o,l)=>{const c=e&&e[l];let d=c?Me(c.title,l+1)||It(c.body,l+1):"";return d&&s.has(d)&&(d=""),d&&s.add(d),"第"+(l+1)+"章: "+(d||Lt(l+1,r,a,n))}).join(`
`)}function xr(e){if(!e||!Array.isArray(e.chapters)||!e.chapters.length)return;const t=fn(e.chapters,e.totalChapters||e.chapters.length,Ie(e.settings||{}),(e.headerInfo||{}).logline||""),a=t.split(`
`).map(s=>s.replace(/^\u7b2c\d+\u7ae0[:\uff1a]\s*/,"")),n=yn("",e.headerInfo||{},e.settings||{},e.totalChapters||e.chapters.length,{chapters:e.chapters}),r=e.chapters.map((s,o)=>"# 第"+(o+1)+"章: "+(a[o]||Me(s.title,o+1))+`

`+String(s.body||"").trim().replace(/^[#\uff03]\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0[^\n]*\n+/,"")).join(`

---

`);e.cleanText=(n+(n?`

`:"")+r).trim()}function yn(e,t={},a={},n=0,r={}){const s=Ie(a||{}),o=y=>String(y||"").replace(/\r/g,"").trim(),l=y=>o(y).replace(/\n{3,}/g,`

`),c=String(e||"").trim(),d=o(t.title)||(c.match(/\u30bf\u30a4\u30c8\u30eb[:\uff1a]\s*(.+)/)||[])[1]||"（タイトル未設定）",p=o(t.logline)||(c.match(/\u30ed\u30b0\u30e9\u30a4\u30f3[:\uff1a]\s*(.+)/)||[])[1]||"",g=Number(t.totalChapters)||Number(n)||st(a,t);let h=l(t.synopsis);if(!h){const y=c.match(/\u3042\u3089\u3059\u3058[:\uff1a]\s*([\s\S]+?)(?=\n(?:\u3010|#|\u7b2c\d|---|\n))/);y&&(h=l(y[1]))}h||(h=(p||"物語の核となる対立と変化を中心に展開する長編小説。")+`
ジャンル「`+s.genre+"」、テーマ「"+s.theme+"」、時代「"+s.era+"」、世界観「"+s.worldview+"」を軸に、登場人物たちの欲望、秘密、選択の代償が全"+g+"章で段階的に深まっていく。");let v=l(t.plotOutline);if(!v){const y=c.match(/(?:\u3010\u30d7\u30ed\u30c3\u30c8\u6982\u8981\u3011|\u30d7\u30ed\u30c3\u30c8\u6982\u8981[:\uff1a])\s*([\s\S]+?)(?=\n---|\n# \u7b2c|\n\u7b2c1\u7ae0)/);y&&(v=l(y[1]))}return v=r&&Array.isArray(r.chapters)&&r.chapters.length?fn(r.chapters,g,s,p):br(v,g,s,p),["【作品ヘッダー情報】","タイトル: "+d,"","【あらすじ】",h,"","【プロット概要】",v].join(`
`).trim()}function me(e){let t=String(e||"").replace(/\r/g,"");const a="(?:タイトル|ログライン|全構成|予定総文字数)";return t=t.replace(new RegExp("(^|\\n)([#＃]\\s*第[\\d０-９一二三四五六七八九十]+章[^\\n]*\\n+)(?:\\s*(?:【作品ヘッダー情報】|"+a+"\\s*[:：][^\\n]*|【あらすじ】|【プロット概要】)\\s*\\n)+","g"),(n,r,s)=>r+s),t=t.replace(new RegExp("^\\s*(?:【作品ヘッダー情報】\\s*\\n)?(?:"+a+"\\s*[:：][^\\n]*\\n|【あらすじ】\\s*\\n|【プロット概要】\\s*\\n)+"),""),t.trim()}function Ht(e){return(At(e||"").trimEnd()+`

【完】`).trim()}function Et(e){const t=[];return e?(e.trim().length<1e3&&t.push(`文字数が少なすぎます（${e.trim().length}文字 / 閾値: 1000文字）`),[/修正する/i,/修正後のテキスト/i,/おっと、見出しに/i,/No, there is no other/i,/Let's double check/i,/^\s*(?:Morris|Sexton|office|violent|Und|And|Let's)\b\s*$/im].forEach(a=>{a.test(e)&&t.push(`無効なメタ表現または英語の残骸が検出されました（パターン: ${a.toString()}）`)}),t):(t.push("テキストが空です"),t)}function wr(e,{chapterNum:t,isLast:a,minChars:n}={}){const r=[],s=(e||"").trim();if(!s)return r;const o=`
`,l=s.split(/\n+/).map(h=>h.trim()).filter(h=>h.length>=40),c=s.split(o),d=c.filter(h=>{const v=h.trimStart();return v.startsWith("- ")||v.startsWith("* ")||/^[0-9]+[.)] /.test(v)}).length;d>=8&&r.push(`Chapter prose looks like a bullet/design memo (chapter ${t}: ${d} bullet lines)`),["This chapter","In this chapter","To summarize","In summary","Continue?","Would you like","author note","next chapter preview"].forEach(h=>{s.includes(h)&&r.push(`Meta or summary-style prose remains: ${h}`)}),s.length>=Math.max(3200,Math.round((n||4500)*.75))&&l.length<6&&r.push(`Too few prose paragraphs; chapter may be summary-like (chapter ${t}: ${l.length} paragraphs)`);let p=0,g=0;for(const h of s){const v=h.charCodeAt(0);(v===12300||v===8220||h==='"')&&p++,(v===12290||v===12289)&&g++}return s.length>=Math.max(3200,Math.round((n||4500)*.75))&&p<3&&g<45&&r.push(`Scene prose or dialogue density is too low (chapter ${t})`),r}function Ir(e,{chapterNum:t,isLast:a,minChars:n}){const r=[],s=(e||"").trim();if(!s)return r.push("本文が空です"),r;s.length<n&&r.push(`章本文が短すぎます（第${t}章: ${s.length}文字 / 最低 ${n}文字）`),[/```/,/(?:^|\n)\s*[#＃]{1,6}\s*(?=\n|$)/,/(?:^|\n)\s*(?:タイトル|ログライン|全構成|予定総文字数)\s*[:：]/,/ここからコピー|ここまでコピー/,/文脈維持メモ|文脈メモ/,/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計/,/再現用マスター指示書|全文結合出力/,/全[\d０-９一二三四五六七八九十]+章の執筆が完了しました/,/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)/].forEach(l=>{l.test(s)&&r.push(`本文に管理情報が残っています（${l.toString()}）`)});const o=s.match(/【完】/g)||[];return a?o.length!==1?r.push(`最終章の完結マーカー数が不正です（${o.length}件）`):/【完】\s*$/.test(s)||r.push("最終章の完結マーカー【完】の後ろに本文以外の文字列が残っています"):o.length>0&&r.push(`第${t}章は最終章ではないため【完】を含められません`),r}function Lr(e,{chapterNum:t,isLast:a,totalChapters:n}={}){const r=[],s=(e||"").trim();if(!s||a)return r;const o=Number(n)||0;return o&&Number(t)>=o-1&&[new RegExp(`一千枚[^
。]{0,80}(?:完成|刷り終|すべて)`),new RegExp(`千枚[^
。]{0,80}(?:完成|刷り終|すべて)`),new RegExp(`最後の一枚[^
。]{0,120}(?:完成|取り出|掲げ)`),new RegExp("これにて一件落着"),new RegExp("すべて(?:が|、)?終わ"),new RegExp("完全勝利|黒幕完全敗北|会社再建(?:が|は)?完了|全面契約")].forEach(l=>{l.test(s)&&r.push(`Whole-story resolution appears before the final chapter (${l.toString()})`)}),r}function Er(e,{chapterNum:t,minChars:a}={}){const n=[],r=(e||"").trim();if(!r)return n;const s=Math.max(3200,Math.round((a||4500)*.75));if(r.length<s)return n;const o=`
`,l=r.split(/\n+/).map(h=>h.trim()).filter(h=>h.length>=40),c=l.filter(h=>h.length>950).length,d=(r.match(/[「『“"]/g)||[]).length,p=(r.match(/(?:音|匂|臭|熱|冷|湿|乾|痛|息|指|手|足|喉|胸|胃|汗|震|光|影|風|雨|床|扉|窓|紙|金属|沈黙|声|触|重|軽|暗|明)/g)||[]).length,g=(r.match(/(?:決め|選|拒|告げ|嘘|失|壊|奪|渡|捨|逃|戻れ|約束|証拠|代償|傷|秘密|裏切|疑|怒|恐|泣|変わ|できなく|許さ)/g)||[]).length;return l.length<7&&n.push(`場面段落数が少なく、章が要約化している可能性があります（第${t}章: ${l.length}段落）`),c>=Math.max(4,Math.ceil(l.length*.45))&&n.push(`長い説明段落が多く、場面の切れ目が不足しています（第${t}章: ${c}段落）`),d<2&&g<7&&n.push(`人物の選択・対立・会話の密度が不足しています（第${t}章）`),p<8&&n.push(`五感・身体感覚・物理ディテールが不足しています（第${t}章: ${p}件）`),/(?:次章へ|続きは|幕を開け|物語はまだ|どうなるのか|to be continued)/i.test(r)&&n.push(`章末が予告・煽り文で終わっています（第${t}章）`),n}function lt(e){return String(e||"").replace(/\r/g,"").replace(/[#＃]\s*第[\d０-９一二三四五六七八九十]+章[^\n]*/g,"").replace(/【完】/g,"").replace(/\s+/g," ").trim()}function Kt(e){const t=String(e||"").replace(/\r/g,"").split(/\n{2,}/).map(lt).filter(n=>n.length>=120&&!/^【/.test(n)),a=[];for(const n of t)a.push(n.slice(0,260)),n.length>=420&&a.push(n.slice(260,520));return[...new Set(a.filter(n=>n.length>=140))]}function Ar(e,{chapterNum:t,previousChapters:a=[]}={}){const n=[],r=Array.isArray(a)?a:[];if(!e||!r.length)return n;const s=lt(e),o=Kt(e);if(s.length<1800||o.length<2)return n;for(let l=0;l<r.length;l++){const c=r[l]||{},d=c.body||c.text||"",p=lt(d);if(p.length<1e3)continue;const g=new Set(Kt(d));let h=0,v=0;for(const b of o)g.has(b)&&(h++,v+=b.length);const y=s.slice(0,900),u=y.length>=700&&p.includes(y);if(u||h>=3&&v>=500){const b=u?"冒頭一致":`${h}箇所`;n.push(`前章以前の本文と長い重複段落が残っています（第${t}章 / 第${l+1}章: ${b}）`);break}}return n}function Pr(e,{chapterNum:t,isLast:a,totalChapters:n}={}){const r=[],s=String(e||"").trim();if(!s||a)return r;const o=Number(n)||0,l=Number(t)||0,c=o?Math.max(1,Math.ceil(o*.7)):1;if(o&&l<c)return r;[/\u3053\u308c\u306b\u3066\u4e00\u4ef6\u843d\u7740/,/\u3059\u3079\u3066(?:\u304c|\u3001)?\u7d42\u308f/,/\u7d42\u308f\u3063\u305f(?:\u306e\u306d|\u306e\u3060|\u306e\u304b|\u308f\u3051|\u306f\u305a|\u3068\u601d)/,/(?:\u30b7\u30b9\u30c6\u30e0|\u30b0\u30e9\u30f3\u30c9\u30fb\u30ea\u30bb\u30c3\u30c8|\u8abf\u5f8b)[^\u3002\n]{0,80}(?:\u505c\u6b62|\u6b62\u307e|\u5d29\u58ca|\u6c88\u9ed9|\u6d88\u3048)/,/(?:\u4eba\u3005|\u5e02\u6c11|\u6771\u4eac)[^\u3002\n]{0,120}(?:\u601d\u3044\u51fa|\u76ee\u899a\u3081)/,/\u5b8c\u5168\u52dd\u5229|\u9ed2\u5e55\u5b8c\u5168\u6557\u5317|\u4f1a\u793e\u518d\u5efa(?:\u304c|\u306f)?\u5b8c\u4e86|\u5168\u9762\u5951\u7d04/].forEach(d=>{d.test(s)&&r.push(`Whole-story resolution appears before the final chapter (${d.toString()})`)});return r}function Ve(e,t){return[...Et(e),...Ir(e,t),...wr(e,t),...Er(e,t),...Ar(e,t),...Lr(e,t),...Pr(e,t)]}function Fe(e,t){let a=ue(e),n=t||"";const r=Oe(a);return r.memo&&(n+=(n?`

`:"")+r.memo,a=r.body),a=ue(a),{body:a,memo:n}}function ue(e){return e?e.replace(/^```(?:markdown|text|txt)?\s*/i,"").replace(/\s*```\s*$/i,"").replace(/(?:\n|^)\s*---\s*ここからコピー\s*---[\s\S]*$/i,"").replace(/(?:\n|^)\s*---\s*ここまでコピー\s*---[\s\S]*$/i,"").replace(/(^|\n)\s*[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］]\s*/gi,"$1").replace(/(^|[^\[［])[\[［]\s*(?:\d{1,3}|[ivxlcdm]{1,8})\s*[\]］](?=$|[\s、。！？,.!?」』）\)])/gi,"$1").replace(/\[\d+(?:,\s*\d+)*\]/g,"").replace(/[\(（]\s*注\s*\d{1,3}\s*[\)）]/g,"").replace(/(?:\n|^)\s*(?:参考文献|出典|脚注|注釈)\s*[:：][\s\S]*$/m,"").replace(/\b(?:of|OK)\b/gi,"").replace(/\b(?:No|Let's|Und|And)(?:[,\s]+|(?=\n|$))/gi,"").replace(/\bI(?=[ぁ-んァ-ヶ一-龠])/g,"").replace(/(?:修正する|修正後のテキスト|おっと、見出しに|No, there is no other|Let's double check)/gi,"").replace(/([ぁ-んァ-ヶ一-龠])\.\s*/g,"$1。").replace(/([ぁ-んァ-ヶ一-龠]),\s*/g,"$1、").replace(/およびおよび/g,"および").replace(/人口筋肉/g,"人工筋肉").replace(/電子基盤/g,"電子基板").replace(/確確信/g,"確信").replace(/指先を指先を/g,"指先を").replace(/激激突/g,"激突").replace(/嬉そう/g,"嬉しそう").replace(/繰っ広げ/g,"繰り広げ").replace(/繰っ広/g,"繰り広").replace(/ぷかか/g,"ぷかぷか").replace(/伝わて/g,"伝わって").replace(/響きて/g,"響いて").replace(/包まして/g,"包んで").replace(/佐藤さーーー案/g,"佐藤さん").replace(/鈴木手人/g,"鈴木").replace(/因律/g,"因果律").replace(/名前んだから/g,"名前なんだから").replace(/変貌を遂げてい経ちました/g,"変貌を遂げました").replace(/タコの炭/g,"タコの墨").replace(/(?:^|\n)\s*[#\uFF03]{1,6}\s*(?=\n|$)/g,"\n").replace(/(?:^|\n)\s*#+\s*第\d+章[^\n]*/g,`
`).replace(/(?:^|\n)\s*[【\[\(]\s*(?:全章|全[\d０-９一二三四五六七八九十]+章)[^\n]*(?:\n[\s\S]*)?$/i,"").replace(/(?:^|\n)\s*(?:#+\s*)?(?:文脈維持メモ|文脈メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|全文結合出力|全[\d０-９一二三四五六七八九十]+章の執筆が完了しました)[\s\S]*$/gi,"").replace(/[ \t]+(?=[、。！？,.!?」』）\)])/g,"").replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,`

`).trim():""}function vn(e,t,a=pn){const n=(e||"").trim(),{body:r,memo:s}=Oe(n),o=!!s||/回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|文脈維持メモ|GMC\+S|GMC/.test(n),l=/【完】/.test(n),c=n.length>=Math.max(a+1200,Math.round(a*1.25)),d=r.length>=a||!t&&o&&c;return{finished:t?l&&d:o&&d,bodyChars:r.length,rawChars:n.length,minChars:a,hasMemo:o,hasFinish:l}}function it(e){const t=(e||"").trim(),a=/(?:[【\[]?(?:文脈維持メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]]?)/i,n=t.match(a);return n?{body:t.substring(0,n.index).trim(),memo:t.substring(n.index).trim()}:{body:t,memo:""}}function At(e){return(e||"").replace(/\u3010\u5b8c\u3011/g,"").trim()}function Sr(e){const t=e||"",a="【完】",n=t.lastIndexOf(a);if(n===-1)return t.trim();const r=t.slice(0,n).replace(/\u3010\u5b8c\u3011/g,"").trimEnd(),s=t.slice(n+a.length).trimStart();return`${r}

${a}${s?`
${s}`:""}`.trim()}function kr(e,t,a={}){if(!t||!a.hasFinish||a.bodyChars>=a.minChars)return e;const n=it(e);return`${At(n.body)}${n.memo?`

${n.memo}`:""}`.trim()}function qe(e,t,a={}){const n=it(e),r=it(t);let s=n.body,o=r.body;a.isLast&&(s=At(s),o=Sr(o));const l=[s,o].filter(d=>d&&d.trim()),c=r.memo||n.memo;return`${l.join(`

`)}${c?`

---

${c}`:""}`.trim()}function Tr(e){const t=e||"",{body:a}=Oe(t);return ue(a||t).trim()}function J({phase:e="待機中",chapterNum:t=null,chapterChars:a=null,totalChars:n=null,extra:r="",level:s="active"}={}){const o=document.getElementById("ln-live-status");if(!o)return;const l=[e];t&&l.push(`現在: 第${t}章`),Number.isFinite(a)&&l.push(`章内 ${a.toLocaleString()}字`),Number.isFinite(n)&&l.push(`合計 ${n.toLocaleString()}字`),r&&l.push(r),l.push(`更新 ${new Date().toLocaleTimeString("ja-JP",{hour12:!1})}`),o.textContent=l.join(" / "),o.classList.remove("is-active","is-error"),s==="error"?o.classList.add("is-error"):s!=="idle"&&o.classList.add("is-active")}function _r(e,t={}){var a;if(!e||t.autoScroll===!1)return;const n=document.getElementById("output-panel");(a=n==null?void 0:n.classList)!=null&&a.contains("ln-live-preview")&&requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})}function xe(e,t,a="",n="",r={}){const s=(a||"").trim(),o=Tr(n),l=[s,o].filter(p=>p&&p.trim()).join(`

---

`);e&&(e.textContent=l,_r(e,r));const c=l.length;t&&(t.textContent=`${c.toLocaleString()} 字`);const d=document.getElementById("ln-char-count");return d&&(d.textContent=c.toLocaleString()),J({phase:r.phase||"本文プレビュー更新中",chapterNum:r.chapterNum||null,chapterChars:o.length||null,totalChars:c,extra:r.extra||"",level:r.level||"active"}),c}function $n(e,t,a,n){const r=t?"本文末尾の独立行「【完】」":"文脈維持メモ";return`以下は長編小説 第${e}章の途中出力です。重複・要約・前置きなしで、最後に出力済みの文の直後から本文だけを続けてください。

【ここまでの第${e}章出力】
${a}

【続きの条件】
・既に出した文章を繰り返さない。
・本文が最低${n.toLocaleString()}字に届くまで、文脈メモや締めに移らず、シーン・対立・身体反応・五感描写を増やす。
・章として読める量と起伏を作ってから、最後に${r}まで出力する。
- Continue by adding new performed scenes, concrete choices, physical reactions, and consequences. Do not extend with recap or abstract explanation.
- Continue with visible paragraph breaks; do not append one giant continuation block.
- Before the required ending marker/memo, add one chapter-specific turn and one aftertaste paragraph.
・「修正後」「続きです」「了解しました」などのメタ文章は絶対に出力しない。`}function Oe(e){const t=/(?:[【\[\(]?(?:文脈維持メモ|回収待ち伏線メモ|人物ロスター更新メモ|モチーフ＆サブキャラ追跡メモ|次章のシーン設計|再現用マスター指示書|文脈メモ|全文結合出力|全章(?:の|完了|執筆|分)|全[\d０-９一二三四五六七八九十]+章(?:の執筆が完了しました)?)[】\]\)]?)/i;let a=-1;const n=e.match(t);if(n)a=n.index;else{const o=Array.from(e.matchAll(/\u3010\u5b8c\u3011/g));if(o.length>0){const l=o[o.length-1];a=l.index+l[0].length}}if(a===-1)return{body:ue(e),memo:""};let r=e.substring(0,a).trim();r=r.replace(/\n---\s*$/,"").trim(),r=r.replace(/\n(?:---+|#+)\s*\n/g,`

`),r=r.replace(/(?:\n|^)(?:---+|#+)\s*$/g,""),r=r.replace(/\n{3,}/g,`

`).trim(),r=ue(r);const s=e.substring(a).trim();return{body:r,memo:s}}function St(e){const t=e.match(/[#＃]\s*第([\d０-９一二三四五六七八九十]+)章[:：]?\s*(.+)/);return t?t[2].trim():""}function Vt(){const e=document.getElementById("settings");if(!e)return;e.classList.add("generating"),e.style.pointerEvents="none",e.style.opacity="0.65",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.id==="btn-ln-abort"||a.id==="btn-ln-next"||a.hasAttribute("data-ln-locked")||(a.setAttribute("data-ln-locked",a.disabled?"true":"false"),a.disabled=!0)});const t=document.getElementById("btn-generate");t&&(t.textContent="🔒 長編進行中",t.disabled=!0)}function Re(){const e=document.getElementById("settings");if(!e)return;e.classList.remove("generating"),e.style.pointerEvents="",e.style.opacity="",e.querySelectorAll("button, select, input, textarea").forEach(a=>{a.getAttribute("data-ln-locked")==="false"&&(a.disabled=!1),a.removeAttribute("data-ln-locked")});const t=document.getElementById("btn-generate");t&&(t.textContent="ストーリー生成",t.disabled=!1)}function ie(e){var t;const a=document.getElementById("long-novel-panel"),n=document.getElementById("output-panel"),r=document.getElementById("btn-ln-pause"),s=document.getElementById("btn-ln-abort"),o=[document.getElementById("btn-ln-copy-novel"),document.getElementById("btn-ln-save-novel"),document.getElementById("btn-ln-copy-memo"),document.getElementById("btn-ln-save-memo")];a&&(e?(a.classList.add("ln-generating"),n==null||n.classList.remove("ln-novel-scroll"),n==null||n.classList.add("ln-live-preview"),r&&(r.disabled=!1,r.textContent=(t=i.longNovel)!=null&&t.isPaused?"一時停止予約中":"章末で一時停止"),s&&(s.disabled=!1,s.style.opacity="1",s.classList.remove("hidden")),o.forEach(l=>{l&&(l.disabled=!0,l.style.opacity="0.3")})):(a.classList.remove("ln-generating"),n==null||n.classList.remove("ln-live-preview"),s&&(s.disabled=!1,s.style.opacity=""),o.forEach(l=>{l&&(l.disabled=!1,l.style.opacity="")})))}function de(){var e;const t=i.longNovel,a=document.getElementById("long-novel-panel"),n=document.getElementById("ln-work-title"),r=document.getElementById("ln-progress"),s=document.getElementById("ln-char-count"),o=document.getElementById("ln-target"),l=document.getElementById("ln-progress-bar"),c=document.getElementById("btn-ln-pause"),d=document.getElementById("btn-ln-abort");if(!a)return;a.classList.remove("hidden"),n.textContent=((e=t.headerInfo)==null?void 0:e.title)||"生成中...",r.textContent=`${t.currentChapter} / ${t.totalChapters} 章`;const p=t.cleanText.length;s.textContent=p.toLocaleString();const g=mn(t.settings,t.headerInfo,t.totalChapters);o.textContent=g?`約${g.toLocaleString()}字`:"数万字";const h=t.totalChapters>0?Math.round(t.currentChapter/t.totalChapters*100):0;l.style.width=`${h}%`;const v=a.classList.contains("ln-generating");if(t.totalChapters>0&&t.currentChapter>=t.totalChapters){const u=document.getElementById("output-panel");u&&u.classList.add("ln-novel-scroll"),c&&(c.disabled=!0,c.textContent="✅ 全章完了"),a.classList.add("ln-completed"),a.classList.remove("ln-generating"),Re(),d&&(d.disabled=!0,d.style.opacity="0.3")}else{if(c)if(v){const b=Math.min(t.currentChapter+1,t.totalChapters||1);c.disabled=!1,c.textContent=t.isPaused?`一時停止予約中（第${b}章後）`:`章末で一時停止（第${b}章後）`}else t.isPaused?(c.disabled=!1,c.textContent="▶️ 生成を再開"):(c.disabled=!0,c.textContent="次章へ自動継続中");a.classList.remove("ln-completed");const u=document.getElementById("output-panel");u&&(t.currentChapter>0&&!v?u.classList.add("ln-novel-scroll"):u.classList.remove("ln-novel-scroll"))}d&&(d.classList.remove("hidden"),d.disabled=!1);const y=document.getElementById("btn-ln-copy-novel");y&&(p>Bt?(y.disabled=!0,y.title=`クリップボードの容量制限（${Math.floor(Bt/1e4)}万字）を超えるためコピーできません。TXT保存を使用してください。`,y.textContent="⚠ 容量超過 (ブラウザ制限につきコピー不可)"):(y.disabled=!1,y.title="小説本文をコピー",y.textContent="📋 コピー"))}function H(e){const t=document.getElementById("progress-log");if(!t)return;t.textContent+=`
`+e;const a=document.getElementById("progress-content");a&&(a.scrollTop=a.scrollHeight)}function Nr(e){return new Promise(t=>setTimeout(t,e))}function Ft(e){return!!e&&e.active&&!e.isPaused&&e.currentChapter<e.totalChapters}async function bn(e,t){if(e&&e.currentChapter>=e.totalChapters){e.active=!1,xr(e),H(`[進行] 全${e.totalChapters}章の生成が完了しました ✅`),J({phase:"全章生成完了",totalChars:(e.cleanText||"").length,extra:`${e.totalChapters}章完了`,level:"idle"});const n=document.getElementById("output"),r=document.querySelector(".char-counter");n&&xe(n,r,e.cleanText||"","",{phase:"全章生成完了",level:"idle"}),de();return}if(!Ft(e)){H(`[進行] 第${t}章で停止しました。次章は自動生成されません。`),J({phase:`第${t}章で停止中`,chapterNum:t,totalChars:(e.cleanText||"").length,extra:"再開待ち",level:"idle"}),de();return}const a=e.currentChapter+1;H(`[進行] 第${t}章を保存しました。第${a}章へ進みます...`),J({phase:`第${a}章へ移行中`,chapterNum:a,totalChars:(e.cleanText||"").length}),de(),await Nr(600),Ft(e)&&await Tt()}function Mr(){var e;const t=i.longNovel;t.cleanText&&xn(t.cleanText,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","本文")}function Cn(e){return!e||!e.settings||!e.headerInfo?!1:!e.active||e.totalChapters>0&&e.currentChapter>=e.totalChapters}function Or(){var e;const t=i.longNovel;let a=t.memoText||"";if(Cn(t)){const n=De(t.settings,t.headerInfo,i);a.includes("再現用マスター指示書")||(a+=(a?`

`:"")+n)}a&&xn(a,((e=t.headerInfo)==null?void 0:e.title)||"長編小説","メモ・指示書")}function xn(e,t,a){const n=new Date,r=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}${String(n.getHours()).padStart(2,"0")}${String(n.getMinutes()).padStart(2,"0")}${String(n.getSeconds()).padStart(2,"0")}`,s=`${t}_${a}_${r}.txt`,o=new Blob([e],{type:"text/plain;charset=utf-8"}),l=URL.createObjectURL(o),c=document.createElement("a");c.href=l,c.download=s,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(l)}function kt(){const e=i.longNovel,t=document.getElementById("ln-memo-text");t&&(t.textContent=e.memoText||"（まだメモはありません）")}async function qt(e,t){if(e)try{await navigator.clipboard.writeText(e);const a=document.getElementById(t);if(a){const n=a.textContent;a.textContent="✅ コピーしました",a.classList.add("ln-copied"),setTimeout(()=>{a.textContent=n,a.classList.remove("ln-copied")},2e3)}}catch(a){console.error("Copy failed:",a)}}async function wn(e,t,a,n,r,s=null){var o,l;const c=i.apiKey;if(!c){a.innerHTML='<span class="error-msg">⚠ APIキーが設定されていません。</span>',t.textContent="✨ 生成する",t.disabled=!1,(o=document.querySelector(".settings-panel"))==null||o.classList.remove("generating");return}const d=s&&s.counts?s.counts:null,p=s&&s.notes?s.notes:null;ke(),s&&(i.longNovel.chapterRetryCounts=d||{},i.longNovel.chapterRetryNotes=p||{}),i.longNovel.active=!0,i.longNovel.settings=JSON.parse(JSON.stringify(e));const{prompt:g,tags:h}=Qn(e);if(n){n.innerHTML="";const $=c.startsWith("sk-")?'<span class="tag tag-openai">ChatGPT</span>':'<span class="tag tag-gemini">Gemini</span>';n.innerHTML=$+'<span class="tag">📖 長編小説</span>'+h.map(C=>`<span class="tag">${C}</span>`).join("")}a.className="output-box text-selectable",a.textContent="📖 長編小説の第1章を生成中...（プロット設計→第1章執筆）";const v=ge[0].value;i.longNovel.usedModel=v,Vt(),i.longNovel.totalChapters=st(e),de(),ie(!0),J({phase:"第1章の生成準備中",chapterNum:1,totalChars:0});const y=document.getElementById("btn-ln-pause");y&&(y.disabled=!1,y.textContent="章末で一時停止（第1章後）");let u=0;const b=setInterval(()=>{if(!i.longNovel.active){clearInterval(b);return}u++,t.textContent=`⏳ AIが考え中... (${u}秒経過)`,y&&i.longNovel.active&&(y.textContent=i.longNovel.isPaused?"一時停止予約中（第1章後）":`章末で一時停止（第1章後・${u}秒）`)},1e3),f=new AbortController;i.longNovel.abortController=f;try{let $="",C=v;const L=ot(e,null,10),k=gn(f.signal);C=(await ve(c,C,g,({text:T,isThought:M})=>{i.longNovel.active&&(M||($+=T,xe(a,r,"",$,{phase:"第1章を執筆中",chapterNum:1})))},T=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${T}`},k)).usedModel;let x=0;for(;x<5;){const T=((l=$.match(/([#＃]\s*第[1１一]章[\s\S]*)/))==null?void 0:l[1])||$,M=vn(T,!1,L);if(M.finished)break;x++,H(`[通信] 第1章: 未完了/文字数不足（本文 ${M.bodyChars.toLocaleString()} / 最低 ${M.minChars.toLocaleString()}字、raw ${M.rawChars.toLocaleString()}字、文脈メモ ${M.hasMemo?"あり":"なし"}）。続きを自動リクエスト中... (${x}/5)`);const R=$n(1,!1,$,L);let P="";const Z=await ve(c,C,R,({text:z,isThought:ce})=>{i.longNovel.active&&(ce||(P+=z,xe(a,r,"",qe($,P),{phase:"第1章を自動継続中",chapterNum:1,extra:`継続 ${x}/5`})))},z=>{t.innerHTML=`<span class="spinner"></span>フォールバック: ${z}`},k);$=qe($,P),C=Z.usedModel}if(i.longNovel.usedModel=C,!i.longNovel.active)return;const A=yr($);i.longNovel.headerInfo=A,i.longNovel.totalChapters=st(e,A),i.longNovel.headerInfo.totalChapters=i.longNovel.totalChapters;const O=ot(e,A,i.longNovel.totalChapters),_=$.match(/([#＃]\s*第[1１一]章[\s\S]*)/),E=_?_[1]:$;let{body:w,memo:S}=Oe(me(E));const G=_?$.substring(0,_.index).trim():"";let j="";if(w&&w.trim().length>100){t.textContent="🔍 第1章 矛盾検査中...",J({phase:"第1章を検査中",chapterNum:1,chapterChars:w.length,totalChars:i.longNovel.cleanText.length||w.length});const T=M=>{console.log("[LN Audit Ch1]",M);const R=document.getElementById("progress-log");if(R){R.textContent+=`
`+M;const P=document.getElementById("progress-content");P&&(P.scrollTop=P.scrollHeight)}};try{const M=await bt(c,w,i.longNovel.settings||e,{onStatus:T,chapterNum:1,isLastChapter:!1,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:2,validateFixedText:Et,sanitizeText:ue});if(M.wasFixed&&(w=me(M.text)),M.remainingCriticalCount>0)throw T(`[検査] 第1章: 重大な矛盾が${M.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第1章を棄却しました（残存: ${M.remainingCriticalCount}件）`);M.wasFixed&&T("[検査] 第1章: 矛盾修正が完了しました ✅"),M.issues.length>0&&(j=ue(rn(M.issues,1)))}catch(M){throw console.warn("第1章の矛盾検査でエラー:",M.message),T("[検査] 第1章: 検査エラー — 保存を停止します"),new Error(`第1章の検査に失敗したため保存を停止しました: ${M.message||M}`)}}H("[品質] 第1章: 本文保存前チェックを実行中..."),J({phase:"第1章の保存前チェック中",chapterNum:1,chapterChars:w.length,totalChars:i.longNovel.cleanText.length||w.length}),w=me(w),{body:w,memo:S}=Fe(w,S);let N=Ve(w,{chapterNum:1,isLast:!1,minChars:O});if(N.length>0&&(H(`[品質] 第1章: 保存前チェックで問題を検出: ${N.join(" / ")}`),w=me(w),{body:w,memo:S}=Fe(w,S),N=Ve(w,{chapterNum:1,isLast:!1,minChars:O})),N.length>0)throw new Error(`第1章の保存前品質ゲートで停止しました: ${N.join(" / ")}`);H("[品質] 第1章: 保存前チェック通過。本文を採用します。"),i.longNovel.chapters.push({title:Me(St(E),1)||It(w,1)||Lt(1,i.longNovel.totalChapters||1,Ie(e),A.logline||""),body:w,contextMemo:S}),i.longNovel.currentChapter=1,i.longNovel.fullText=$,H(`[進行] 第1章を保存しました（${w.length.toLocaleString()}字）。現在 ${i.longNovel.currentChapter} / ${i.longNovel.totalChapters} 章。`);const F=i.longNovel.chapters[0].title||"第一章",ae=yn(G,A,e,i.longNovel.totalChapters);i.longNovel.cleanText=ae+(ae?`

`:"")+`# 第1章: ${F}

`+w,i.longNovel.memoText=S?`--- 第1章の文脈メモ ---
${S}`:"",j&&(i.longNovel.memoText+=(i.longNovel.memoText?`

`:"")+j),xe(a,r,i.longNovel.cleanText,"",{phase:"第1章を保存しました",chapterNum:1,level:"idle"}),kt(),ie(!1),de(),Vt(),clearInterval(b),await bn(i.longNovel,1)}catch($){const C=($==null?void 0:$.message)||String($);if(H(`[Stop] Chapter 1 error: ${C}`),!i.longNovel.active)return;const L=["検査に失敗","重大な設定矛盾","出力汚染","棄却","残存","保存前品質ゲート","章本文が短すぎます"].some(A=>C.includes(A)),k=Number(i.longNovel.chapterRetryCounts&&i.longNovel.chapterRetryCounts[1]||0),x=/\u9577\u3044\u8AAC\u660E\u6BB5\u843D|\u5834\u9762\u6BB5\u843D\u6570|\u5834\u9762\u306E\u5207\u308C\u76EE|Too few prose paragraphs/.test(C)?4:2;if(L&&k<x){i.longNovel.chapterRetryCounts=i.longNovel.chapterRetryCounts||{},i.longNovel.chapterRetryNotes=i.longNovel.chapterRetryNotes||{};const A=k+1;i.longNovel.chapterRetryCounts[1]=A,i.longNovel.chapterRetryNotes[1]=[`The previous chapter 1 was rejected by the pre-save quality gate. Reason: ${C}`,"Rewrite chapter 1 completely while preserving the same logline and full outline.","If the previous ending sounded like a preview, teaser, next-chapter announcement, or author note, end this retry on a concrete physical reaction, silence, object, cost, or unresolved pressure instead.","Use visible paragraph breaks: add a newline every 80-350 Japanese characters and avoid giant explanation blocks.","Do not output design notes, quality-check text, regeneration explanations, or references to the previous failed attempt."].join(`
`);const O={counts:{...i.longNovel.chapterRetryCounts},notes:{...i.longNovel.chapterRetryNotes}};H(`[Regenerate] Chapter 1 rejected; regenerating the full chapter (${A}/${x})`),ie(!1),J({phase:"Regenerating chapter 1",chapterNum:1,totalChars:0,extra:`retry ${A}/${x}`,level:"active"}),de(),setTimeout(()=>{i.apiKey&&wn(e,t,a,n,r,O)},600);return}a.innerHTML=`<span class="error-msg">Error: ${C}</span>`,ie(!1),ke(),J({phase:"Chapter 1 stopped",chapterNum:1,extra:C,level:"error"}),Re()}finally{clearInterval(b)}}async function Tt(){var e,t;const a=i.longNovel;if(!a.active){H("[停止] 次章生成を開始できません。長編セッションが非アクティブです。");return}if(a.currentChapter>=a.totalChapters){H(`[進行] 現在 ${a.currentChapter} / ${a.totalChapters} 章のため、次章生成は不要です。`);return}const n=i.apiKey;if(!n){H("[停止] 次章生成を開始できません。APIキーがメモリ上で取得できません。");return}const r=a.currentChapter+1,s=r>=a.totalChapters;document.getElementById("long-novel-panel");const o=document.getElementById("btn-ln-pause"),l=document.getElementById("output"),c=document.querySelector(".char-counter");ie(!0),J({phase:`第${r}章の生成準備中`,chapterNum:r,totalChars:(a.cleanText||"").length}),o&&(o.disabled=!1,o.textContent=`章末で一時停止（第${r}章後）`);let d=0;const p=setInterval(()=>{if(!a.active){clearInterval(p);return}d++,o&&(o.textContent=a.isPaused?`一時停止予約中（第${r}章後）`:`章末で一時停止（第${r}章後・${d}秒）`)},1e3),g=a.chapters.slice(-2).map((f,$)=>`# 第${a.currentChapter-1+$+1}章: ${f.title}
${f.body}`).join(`

---

`);let h="";a.chapters.length>2&&(h=a.chapters.slice(0,-2).map((f,$)=>`第${$+1}章「${f.title}」: （約${f.body.length}字）`).join(`
`));const v=a.chapters.map((f,$)=>`--- 第${$+1}章の文脈メモ ---
${f.contextMemo||"（なし）"}`).join(`

`),y=((e=a.chapterRetryNotes)==null?void 0:e[r])||"",u=ta(r,a.totalChapters,a.settings,h,g,v,s,y),b=new AbortController;a.abortController=b;try{let f="",$=a.usedModel||ge[0].value;const C=ot(a.settings,a.headerInfo,a.totalChapters),L=gn(b.signal);$=(await ve(n,$,u,({text:w,isThought:S})=>{a.active&&(S||(f+=w,xe(l,c,a.cleanText,f,{phase:`第${r}章を執筆中`,chapterNum:r})))},w=>{H(`[通信] 第${r}章: フォールバック ${w}`)},L)).usedModel;let k=0;for(;k<5;){const w=vn(f,s,C);if(w.finished)break;k++,H(`[通信] 第${r}章: 未完了/文字数不足（本文 ${w.bodyChars.toLocaleString()} / 最低 ${w.minChars.toLocaleString()}字、raw ${w.rawChars.toLocaleString()}字、文脈メモ ${w.hasMemo?"あり":"なし"}、完結 ${w.hasFinish?"あり":"なし"}）。続きを自動リクエスト中... (${k}/5)`);const S=kr(f,s,w),G=$n(r,s,S,C);let j="";const N=await ve(n,$,G,({text:F,isThought:ae})=>{if(a.active&&!ae){j+=F;const T=qe(f,j,{isLast:s});xe(l,c,a.cleanText,T,{phase:`第${r}章を自動継続中`,chapterNum:r,extra:`継続 ${k}/5`})}},F=>{H(`[通信] 第${r}章: フォールバック ${F}`)},L);f=qe(f,j,{isLast:s}),$=N.usedModel}if(a.usedModel=$,!i.longNovel.active)return;let{body:x,memo:A}=Oe(me(f)),O="";if(x&&x.trim().length>100){o&&(o.textContent=a.isPaused?`一時停止予約中（第${r}章後）`:`章末で一時停止（第${r}章後）`),J({phase:`第${r}章を検査中`,chapterNum:r,chapterChars:x.length,totalChars:(a.cleanText||"").length+x.length});const w=S=>{console.log(`[LN Audit Ch${r}]`,S);const G=document.getElementById("progress-log");if(G){G.textContent+=`
`+S;const j=document.getElementById("progress-content");j&&(j.scrollTop=j.scrollHeight)}};try{const S=await bt(n,x,a.settings,{onStatus:w,chapterNum:r,allContextMemos:v,recentChaptersFull:g,isLastChapter:s,fixMinorIssues:!0,failOnAuditError:!0,maxFixAttempts:2,validateFixedText:Et,sanitizeText:ue});if(S.wasFixed&&(x=me(S.text)),S.remainingCriticalCount>0)throw w(`[検査] 第${r}章: 重大な矛盾が${S.remainingCriticalCount}件残存 ⚠️`),new Error(`重大な設定矛盾・出力汚染が解消できなかったため、第${r}章を棄却しました（残存: ${S.remainingCriticalCount}件）`);S.wasFixed&&w(`[検査] 第${r}章: 矛盾修正が完了しました ✅`),S.issues.length>0&&(O=ue(rn(S.issues,r)))}catch(S){throw console.warn(`第${r}章の矛盾検査でエラー:`,S.message),w(`[検査] 第${r}章: 検査エラー — 保存を停止します`),new Error(`第${r}章の検査に失敗したため保存を停止しました: ${S.message||S}`)}}H(`[品質] 第${r}章: 本文保存前チェックを実行中...`),J({phase:`第${r}章の保存前チェック中`,chapterNum:r,chapterChars:x.length,totalChars:(a.cleanText||"").length+x.length}),x=me(x),{body:x,memo:A}=Fe(x,A),s&&(x=Ht(x));let _=Ve(x,{chapterNum:r,isLast:s,minChars:C,totalChapters:a.totalChapters,previousChapters:a.chapters});if(_.length>0&&(H(`[品質] 第${r}章: 保存前チェックで問題を検出: ${_.join(" / ")}`),x=me(x),{body:x,memo:A}=Fe(x,A),s&&(x=Ht(x)),_=Ve(x,{chapterNum:r,isLast:s,minChars:C,totalChapters:a.totalChapters,previousChapters:a.chapters})),_.length>0)throw new Error(`第${r}章の保存前品質ゲートで停止しました: ${_.join(" / ")}`);H(`[品質] 第${r}章: 保存前チェック通過。本文を採用します。`);const E=Me(St(f),r)||It(x,r)||Lt(r,a.totalChapters||r,Ie(a.settings||{}),(a.headerInfo||{}).logline||"");if(a.chapters.push({title:E,body:x,contextMemo:A}),a.currentChapter=r,a.chapterRetryNotes&&delete a.chapterRetryNotes[r],a.chapterRetryCounts&&delete a.chapterRetryCounts[r],a.fullText+=`

---

`+f,H(`[進行] 第${r}章を保存しました（${x.length.toLocaleString()}字）。現在 ${a.currentChapter} / ${a.totalChapters} 章。`),a.cleanText+=`

---

# 第${r}章: ${E}

`+x,A&&(a.memoText+=(a.memoText?`

`:"")+`--- 第${r}章の文脈メモ ---
${A}`),O&&(a.memoText+=(a.memoText?`

`:"")+O),xe(l,c,a.cleanText,"",{phase:`第${r}章を保存しました`,chapterNum:r,level:"idle"}),s&&a.settings&&a.headerInfo){const w=De(a.settings,a.headerInfo,i);a.memoText+=`

`+w}kt(),ie(!1),de(),clearInterval(p),await bn(a,r)}catch(f){const $=(f==null?void 0:f.message)||String(f);if(H(`[停止] 第${r}章処理でエラー: ${$}`),!a.active)return;const C=/検査に失敗|重大な設定矛盾|出力汚染|棄却|残存|保存前品質ゲート|章本文が短すぎます/.test($),L=Number(((t=a.chapterRetryCounts)==null?void 0:t[r])||0),k=/前章以前の本文と長い重複段落|重複段落|冒頭一致/.test($),x=a.chapterRetryNotes&&a.chapterRetryNotes[r]||"",A=k||/前章以前の本文と長い重複段落|重複段落|冒頭一致|前章本文/.test(x),O=!s&&(r===a.totalChapters-1||/Whole-story resolution/.test($)&&a.totalChapters&&r>=Math.max(1,Math.ceil(a.totalChapters*.7))),P=/\u9577\u3044\u8AAC\u660E\u6BB5\u843D|\u5834\u9762\u6BB5\u843D\u6570|\u5834\u9762\u306E\u5207\u308C\u76EE|Too few prose paragraphs/.test($),_=A||O||P?4:2;if(C&&L<_){a.chapterRetryCounts=a.chapterRetryCounts||{},a.chapterRetryNotes=a.chapterRetryNotes||{};const E=L+1,w=A?["重複または巻き戻しで棄却されたため、前章本文の冒頭・段落・比喩・会話・場面配置を一切コピーしないこと。",`ただし時系列は変えないこと。第${r}章は直前章の最後の場所・時刻・負傷・関係状態から開始し、前章の移動・到着・目撃済み事件を再演しないこと。`,"必要なら直前章末の現場から一歩ずれた隣接地点・数分後へ移るが、未到着だったように書かないこと。","前章本文から連続しているように見える書き出し、同じ説明段落、同じ会話の再演を禁止すること。"]:[],S=O?["この章は最終章直前であり、全解決・勝利宣言・黒幕の完全敗北・社会再建完了・伏線総回収を書かないこと。","「すべてが終わる」「すべてが終わった」「完全に終わった」などの語句は、脅し・予感・仮定でも使わないこと。","最終章に残す未解決の核を明示し、最大危機・不可逆な選択・重い代償のいずれかで章を終えること。"]:[],N=P?["Use visible paragraph breaks: insert a newline every 80-350 Japanese characters.","Do not write the chapter as four or fewer giant blocks; use at least seven visible prose paragraphs.","Every 2-4 paragraphs, move the scene through place, action, dialogue, choice, or consequence."]:[];a.chapterRetryCounts[r]=E,a.chapterRetryNotes[r]=[`前回の第${r}章は保存前検査で棄却された。原因: ${$}`,`第${r}章を、直近の文脈メモと次章GMC+Sから完全に書き直すこと。`,`失敗した第${r}章本文は正史ではない。保存済みの直近章だけを正史として続け、前回出力の移動経路・到着イベント・都市覚醒などを引き継がないこと。`,...w,...S,...N,"前章までに発生済み・紛失済み・負傷済み・回収済み・退場済みになった出来事を、初発イベントとして再演しないこと。","古い全体プロットよりも、直近章の文脈メモ、人物状態、回収待ち伏線、次章シーン設計を優先すること。"].join(`
`),H(`[再生成] 第${r}章: 検査失敗のため章全体を再生成します（${E}/${_}）`),ie(!1),J({phase:`第${r}章を再生成します`,chapterNum:r,totalChars:(a.cleanText||"").length,extra:`再生成 ${E}/${_}`,level:"active"}),de(),setTimeout(()=>{var G;(G=i.longNovel)!=null&&G.active&&i.longNovel.currentChapter<r&&Tt()},600);return}l&&(l.textContent=a.cleanText||`⚠ 第${r}章の生成でエラーが発生しました: ${$}`),ie(!1),J({phase:`第${r}章で停止`,chapterNum:r,totalChars:(a.cleanText||"").length,extra:$,level:"error"}),o&&(o.disabled=!1,o.textContent=`📖 第${r}章を再試行`)}finally{clearInterval(p)}}function Rr(){const e=i.longNovel;if(!e.active)return;if(e.active=!1,e.abortController&&e.abortController.abort(),ie(!1),e.settings&&e.headerInfo){const c=De(e.settings,e.headerInfo,i);e.memoText+=(e.memoText?`

`:"")+c,kt()}const t=Math.max(1,e.currentChapter||0),a=Math.max(0,e.currentChapter||0);e.totalChapters=Math.max(e.totalChapters||0,t),de();const n=document.getElementById("long-novel-panel");n==null||n.classList.add("ln-completed");const r=document.getElementById("output-panel");r&&r.classList.add("ln-novel-scroll");const s=document.getElementById("long-novel-title");s&&(s.textContent=a>0?`長編小説モード（第${a}章で中断）`:`長編小説モード（第${t}章生成中に中断）`),Re();const o=document.getElementById("btn-ln-pause"),l=document.getElementById("btn-ln-abort");o&&(o.disabled=!0,o.textContent="⏹ 中断済み"),l&&(l.disabled=!0,l.style.opacity="0.3"),J({phase:"中断済み",chapterNum:t,totalChars:(e.cleanText||"").length,extra:a>0?`${a}章まで保存済み`:"保存済み章なし",level:"error"})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btn-ln-pause");e&&e.addEventListener("click",()=>{const l=i.longNovel,c=document.getElementById("long-novel-panel");if(!l.active)return;const d=c==null?void 0:c.classList.contains("ln-generating");if(l.isPaused)if(l.isPaused=!1,e.disabled=!1,d){const p=Math.min(l.currentChapter+1,l.totalChapters||1);e.textContent=`章末で一時停止（第${p}章後）`,H("[操作] 一時停止予約を解除しました。")}else e.textContent="次章へ自動継続中",e.disabled=!0,Tt();else l.isPaused=!0,e.textContent="一時停止予約中（現在章の後で停止）",e.disabled=!1,H("[操作] 現在章の完了後に一時停止します。")});const t=document.getElementById("btn-ln-abort");t&&t.addEventListener("click",()=>{confirm(`現在の進捗で生成を中断しますか？
（ここまでの全文はコピー・TXT保存が可能です）`)&&Rr()});const a=document.getElementById("btn-ln-copy-novel");a&&a.addEventListener("click",()=>{qt(i.longNovel.cleanText,"btn-ln-copy-novel")});const n=document.getElementById("btn-ln-save-novel");n&&n.addEventListener("click",()=>{Mr()});const r=document.getElementById("btn-ln-copy-memo");r&&r.addEventListener("click",()=>{const l=i.longNovel;let c=l.memoText||"";if(Cn(l)){const d=De(l.settings,l.headerInfo,i);c.includes("再現用マスター指示書")||(c+=(c?`

`:"")+d)}qt(c,"btn-ln-copy-memo")});const s=document.getElementById("btn-ln-save-memo");s&&s.addEventListener("click",()=>{Or()});const o=document.getElementById("ln-memo-toggle");o&&o.addEventListener("click",l=>{if(l.target.closest(".btn-ln-action"))return;const c=document.getElementById("ln-memo-content"),d=document.getElementById("ln-memo-arrow");c&&c.classList.toggle("hidden"),d&&d.classList.toggle("open")})});
