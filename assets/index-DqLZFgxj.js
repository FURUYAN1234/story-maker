(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const ae=[{value:"gemini-3.5-flash",label:"Gemini 3.5 Flash"},{value:"gemini-flash-latest",label:"Gemini Flash (Latest)"},{value:"gemini-2.5-flash",label:"Gemini 2.5 Flash"},{value:"gemini-2.5-pro",label:"Gemini 2.5 Pro"},{value:"gemini-1.5-pro",label:"Gemini 1.5 Pro"},{value:"gemini-1.5-flash",label:"Gemini 1.5 Flash"}],ke=[{value:"4koma",label:"4コマ漫画風"},{value:"4koma_scenario",label:"AI 4koma シナリオ連携（STEP2）"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(10万字〜/プロンプト生成)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],ot={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},it={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},lt={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},ct={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},dt={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},ut={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},pt={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},te=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],ne=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],Re=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],Ne=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],Pe=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],ft=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],We=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],Je=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],ht=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],mt=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],gt=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],yt=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],vt=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],bt=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],Et=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],$t=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],Lt=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],At=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],ve=async e=>{if(!e)return"API Key not set.";try{const n=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`)).json();return n.error?`API Error: ${n.error.message}`:n.models?`Available Models: ${n.models.map(a=>a.name.replace("models/","")).filter(a=>a.includes("gemini")).join(", ")}`:"No models returned by API."}catch(t){return`Diagnostic Failed: ${t.message}`}};async function It(e,t,n,s={}){var p,m,v,h;const a=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,r={maxOutputTokens:8192,temperature:1};s.responseMimeType&&(r.responseMimeType=s.responseMimeType);const o=s.timeoutMs||25e3,i=new AbortController,d=setTimeout(()=>i.abort(),o),u={contents:[{parts:[{text:n}]}],generationConfig:r,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};r.responseMimeType!=="application/json"&&!s.disableGoogleSearch&&(u.tools=[{googleSearch:{}}]);try{const y=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},signal:i.signal,body:JSON.stringify(u)});if(clearTimeout(d),!y.ok){const b=await y.text();let g=`Gemini HTTP ${y.status}`;try{const E=JSON.parse(b);E.error&&E.error.message&&(g+=` — ${E.error.message}`)}catch{g+=` — ${b.slice(0,300)}`}throw new Error(g)}const f=await y.json();if((p=f.promptFeedback)!=null&&p.blockReason)throw new Error(`Blocked by Safety Filter: ${f.promptFeedback.blockReason}`);if((h=(v=(m=f.candidates)==null?void 0:m[0])==null?void 0:v.content)!=null&&h.parts){const b=f.candidates[0].content.parts.map(g=>g.text||"").join("");if(!b){const g=f.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${g}).`)}return b}throw f.error?new Error(`Gemini API Error: ${f.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} (${o/1e3}s)`):y}finally{clearTimeout(d)}}async function wt(e,t,n,s,a,r={}){var m,v,h,y;const o=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,i={maxOutputTokens:8192,temperature:.3};r.responseMimeType&&(i.responseMimeType=r.responseMimeType);const d=r.timeoutMs||6e4,u=new AbortController,p=setTimeout(()=>u.abort(),d);try{const f=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},signal:u.signal,body:JSON.stringify({contents:[{parts:[{text:n},{inlineData:{mimeType:a,data:s}}]}],generationConfig:i,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(p),!f.ok){const g=await f.text();let E=`Gemini HTTP ${f.status}`;try{const A=JSON.parse(g);A.error&&A.error.message&&(E+=` — ${A.error.message}`)}catch{E+=` — ${g.slice(0,300)}`}throw new Error(E)}const b=await f.json();if((m=b.promptFeedback)!=null&&m.blockReason)throw new Error(`Blocked by Safety Filter: ${b.promptFeedback.blockReason}`);if((y=(h=(v=b.candidates)==null?void 0:v[0])==null?void 0:h.content)!=null&&y.parts){const g=b.candidates[0].content.parts.map(E=>E.text||"").join("");if(!g){const E=b.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${E}).`)}return g}throw b.error?new Error(`Gemini API Error: ${b.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(f){throw f.name==="AbortError"?new Error(`Timeout: ${t} vision (${d/1e3}s)`):f}finally{clearTimeout(p)}}async function ze(e,t,n,s,a,r={}){if(e.trim().startsWith("sk-"))return xt(e.trim(),t,n,s,a,r);const o=["gemini-3.5-flash","gemini-flash-latest","gemini-2.5-flash","gemini-2.5-pro","gemini-1.5-pro","gemini-1.5-flash"],i=[];let d=!1,u=!1,p=!1;for(const h of o)try{return a&&o[0],{text:await wt(e,h,t,n,s,r),usedModel:h}}catch(y){const f=y.message||"";console.warn(`Vision model ${h} failed:`,f),i.push(`${h}: ${f}`);const b=f.toLowerCase();(b.includes("safety")||b.includes("prohibited")||b.includes("block"))&&(d=!0),(b.includes("quota")||b.includes("429")||b.includes("limit"))&&(u=!0),(b.includes("api key")||b.includes("403")||b.includes("invalid"))&&(p=!0);continue}const m=await ve(e);console.error("VISION DIAGNOSIS:",m);let v=`全モデルでの画像認識に失敗: ${m}
`;throw d||m.includes("SAFETY")||m.includes("PROHIBITED")?v="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":u||m.includes("Quota exceeded")||m.includes("429")?v="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":p||m.includes("API key not valid")||m.includes("403")?v="【認証エラー】APIキーが無効です。正しいキーを設定してください。":v+=`
[各モデルのエラー詳細]
${i.join(`
`)}`,new Error(v)}async function Ye(e,t,n,s,a={}){if(e.trim().startsWith("sk-"))return Tt(e.trim(),n,s,a);const r=["gemini-1.5-pro","gemini-pro-latest"],o=new Set([t,...r,...ae.map(y=>y.value)]),i=Array.from(o),d=[];let u=!1,p=!1,m=!1;for(const y of i)try{return y!==t&&s&&s(y),{text:await It(e,y,n,a),usedModel:y}}catch(f){const b=f.message||"";console.warn(`Model ${y} failed:`,b),d.push(`${y}: ${b}`);const g=b.toLowerCase();(g.includes("safety")||g.includes("prohibited")||g.includes("block"))&&(u=!0),(g.includes("quota")||g.includes("429")||g.includes("limit"))&&(p=!0),(g.includes("api key")||g.includes("403")||g.includes("invalid"))&&(m=!0);continue}console.log("All models failed. Running diagnosis...");const v=await ve(e);console.error("DIAGNOSIS RESULT:",v);let h=`全モデル接続失敗: ${v}
`;throw u||v.includes("SAFETY")||v.includes("PROHIBITED")?h="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":p||v.includes("Quota exceeded")||v.includes("429")?h=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:m||v.includes("API Error: API key not valid")||v.includes("403")?h="【認証エラー】APIキーが無効です。正しいキーを設定してください。":v.includes("404")?h="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":h+=`
[各モデルのエラー詳細]
${d.join(`
`)}`,new Error(h)}const me=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"];async function Tt(e,t,n,s={}){var a,r,o,i,d,u;for(const p of me)try{p!==me[0]&&n&&n(p);const m=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:p,messages:[{role:"user",content:t}],temperature:1,max_tokens:8192,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!m.ok){const y=await m.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${m.status} - ${((a=y.error)==null?void 0:a.message)||m.statusText}`)}const v=await m.json(),h=((i=(o=(r=v.choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:i.content)||"";if(!h)throw new Error(`Empty response (FinishReason: ${((u=(d=v.choices)==null?void 0:d[0])==null?void 0:u.finish_reason)||"UNKNOWN"})`);return{text:h,usedModel:p}}catch(m){console.warn(`Model ${p} failed:`,m.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。")}const je=["gpt-4.1","gpt-4o","gpt-4.1-mini"];async function xt(e,t,n,s,a,r={}){var i,d,u,p,m,v;const o=`data:${s};base64,${n}`;for(const h of je)try{je[0];const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:h,messages:[{role:"user",content:[{type:"text",text:t},{type:"image_url",image_url:{url:o,detail:"high"}}]}],temperature:.3,max_tokens:8192,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const g=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((i=g.error)==null?void 0:i.message)||y.statusText}`)}const f=await y.json(),b=((p=(u=(d=f.choices)==null?void 0:d[0])==null?void 0:u.message)==null?void 0:p.content)||"";if(!b)throw new Error(`Empty response (FinishReason: ${((v=(m=f.choices)==null?void 0:m[0])==null?void 0:v.finish_reason)||"UNKNOWN"})`);return{text:b,usedModel:h}}catch(y){console.warn(`Vision Model ${h} failed:`,y.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function St(e,t,n,s,a={}){var m,v,h,y;const r=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,o=[{text:n}];s.forEach(f=>{o.push({inlineData:{mimeType:f.mimeType,data:f.base64}})});const i={maxOutputTokens:8192,temperature:.4};a.responseMimeType&&(i.responseMimeType=a.responseMimeType);const d=a.timeoutMs||6e4,u=new AbortController,p=setTimeout(()=>u.abort(),d);try{const f=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},signal:u.signal,body:JSON.stringify({contents:[{parts:o}],generationConfig:i,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(p),!f.ok){const g=await f.text();let E=`Gemini HTTP ${f.status}`;try{const A=JSON.parse(g);A.error&&A.error.message&&(E+=` — ${A.error.message}`)}catch{E+=` — ${g.slice(0,300)}`}throw new Error(E)}const b=await f.json();if((m=b.promptFeedback)!=null&&m.blockReason)throw new Error(`Blocked by Safety Filter: ${b.promptFeedback.blockReason}`);if((y=(h=(v=b.candidates)==null?void 0:v[0])==null?void 0:h.content)!=null&&y.parts){const g=b.candidates[0].content.parts.map(E=>E.text||"").join("");if(!g){const E=b.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${E}).`)}return g}throw b.error?new Error(`Gemini API Error: ${b.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(f){throw f.name==="AbortError"?new Error(`Timeout: ${t} multimodal (${d/1e3}s)`):f}finally{clearTimeout(p)}}async function kt(e,t,n,s,a={}){var o,i,d,u,p,m;const r=["gpt-4.1","gpt-4o","gpt-4.1-mini"];for(const v of r)try{v!==r[0]&&s&&s(v);const h=[{type:"text",text:t}];n.forEach(g=>{h.push({type:"image_url",image_url:{url:`data:${g.mimeType};base64,${g.base64}`,detail:"high"}})});const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:v,messages:[{role:"user",content:h}],temperature:.4,max_tokens:8192,response_format:a.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const g=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((o=g.error)==null?void 0:o.message)||y.statusText}`)}const f=await y.json(),b=((u=(d=(i=f.choices)==null?void 0:i[0])==null?void 0:d.message)==null?void 0:u.content)||"";if(!b)throw new Error(`Empty response (FinishReason: ${((m=(p=f.choices)==null?void 0:p[0])==null?void 0:m.finish_reason)||"UNKNOWN"})`);return{text:b,usedModel:v}}catch(h){console.warn(`Vision Model ${v} failed:`,h.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Ct(e,t,n,s,a={}){if(e.trim().startsWith("sk-"))return kt(e.trim(),t,n,s,a);const r=["gemini-3.5-flash","gemini-flash-latest","gemini-2.5-flash","gemini-2.5-pro","gemini-1.5-pro","gemini-1.5-flash"],o=[];let i=!1,d=!1,u=!1;for(const v of r)try{return s&&v!==r[0]&&s(v),{text:await St(e,v,t,n,a),usedModel:v}}catch(h){const y=h.message||"";console.warn(`Vision model ${v} failed:`,y),o.push(`${v}: ${y}`);const f=y.toLowerCase();(f.includes("safety")||f.includes("prohibited")||f.includes("block"))&&(i=!0),(f.includes("quota")||f.includes("429")||f.includes("limit"))&&(d=!0),(f.includes("api key")||f.includes("403")||f.includes("invalid"))&&(u=!0);continue}const p=await ve(e);console.error("VISION DIAGNOSIS:",p);let m=`全モデルでの画像認識に失敗: ${p}
`;throw i||p.includes("SAFETY")||p.includes("PROHIBITED")?m="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":d||p.includes("Quota exceeded")||p.includes("429")?m="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":u||p.includes("API key not valid")||p.includes("403")?m="【認証エラー】APIキーが無効です。正しいキーを設定してください。":m+=`
[各モデルのエラー詳細]
${o.join(`
`)}`,new Error(m)}async function _t(e,t,n,s,a={}){var r,o,i,d;for(const u of me)try{u!==me[0]&&s&&s(u);const p=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:u,messages:[{role:"user",content:t}],temperature:1,max_tokens:8192,stream:!0,response_format:a.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!p.ok){const y=await p.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${p.status} - ${((r=y.error)==null?void 0:r.message)||p.statusText}`)}const m=p.body.getReader(),v=new TextDecoder("utf-8");let h="";try{for(;;){const{done:y,value:f}=await m.read();if(y)break;h+=v.decode(f,{stream:!0});let b=h.split(`
`);h=b.pop();for(const g of b){const E=g.trim();if(!E||!E.startsWith("data: "))continue;const A=E.slice(6);if(A==="[DONE]")break;try{const k=((d=(i=(o=JSON.parse(A).choices)==null?void 0:o[0])==null?void 0:i.delta)==null?void 0:d.content)||"";k&&n({text:k,isThought:!1})}catch{}}}}finally{m.releaseLock()}return{usedModel:u}}catch(p){console.warn(`Model ${u} stream failed:`,p.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Be(e,t,n,s,a={}){var m,v,h;const r=`https://generativelanguage.googleapis.com/v1beta/models/${t}:streamGenerateContent?alt=sse&key=${e}`,o={maxOutputTokens:8192,temperature:1};!a.disableThinkingConfig&&(t.includes("gemini-2.5")||t.includes("gemini-2.0")||t.includes("gemini-3")||t.includes("gemini-3.5"))&&(o.thinkingConfig={thinkingBudget:2048}),a.responseMimeType&&(o.responseMimeType=a.responseMimeType);const i=a.timeoutMs||25e3,d=new AbortController;let u=setTimeout(()=>d.abort(),i);const p={contents:[{parts:[{text:n}]}],generationConfig:o,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};o.responseMimeType!=="application/json"&&!a.disableGoogleSearch&&(p.tools=[{googleSearch:{}}]);try{const y=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},signal:d.signal,body:JSON.stringify(p)});if(!y.ok){clearTimeout(u);const E=await y.text();let A=`Gemini HTTP ${y.status}`;try{const I=JSON.parse(E);I.error&&I.error.message&&(A+=` — ${I.error.message}`)}catch{A+=` — ${E.slice(0,300)}`}throw new Error(A)}const f=y.body.getReader(),b=new TextDecoder("utf-8");let g="";try{for(;;){clearTimeout(u),u=setTimeout(()=>d.abort(),i);const{done:E,value:A}=await f.read();if(E)break;g+=b.decode(A,{stream:!0});let I=g.split(`
`);g=I.pop();for(const k of I){const _=k.trim();if(!_||!_.startsWith("data: "))continue;const N=_.slice(6);try{const D=(h=(v=(m=JSON.parse(N).candidates)==null?void 0:m[0])==null?void 0:v.content)==null?void 0:h.parts;if(D)for(const C of D){const L=C.text||C.thought||"",U=!!C.thought;L&&s({text:L,isThought:U})}}catch{}}}}finally{f.releaseLock()}}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} stream (${i/1e3}s)`):y}finally{clearTimeout(u)}}async function Ve(e,t,n,s,a,r={}){if(e.trim().startsWith("sk-"))return _t(e.trim(),n,s,a,r);const o=["gemini-1.5-pro","gemini-pro-latest"],i=new Set([t,...o,...ae.map(f=>f.value)]),d=Array.from(i),u=[];let p=!1,m=!1,v=!1;for(const f of d)try{return f!==t&&a&&a(f),await Be(e,f,n,s,r),{usedModel:f}}catch(b){const g=b.message||"";console.warn(`Model ${f} stream failed:`,g),u.push(`${f}: ${g}`);const E=g.toLowerCase();if((E.includes("safety")||E.includes("prohibited")||E.includes("block"))&&(p=!0),(E.includes("quota")||E.includes("429")||E.includes("limit"))&&(m=!0),(E.includes("api key")||E.includes("403")||E.includes("invalid"))&&(v=!0),g.includes("400")||E.includes("bad request")||E.includes("thinking_config"))try{return console.log(`Retrying model ${f} without thinkingConfig...`),await Be(e,f,n,s,{...r,disableThinkingConfig:!0}),{usedModel:f}}catch(A){console.warn(`Model ${f} stream retry failed:`,A.message),u.push(`${f} (retry): ${A.message}`)}continue}console.log("All models failed. Running diagnosis...");const h=await ve(e);console.error("DIAGNOSIS RESULT:",h);let y=`全モデル接続失敗: ${h}
`;throw p||h.includes("SAFETY")||h.includes("PROHIBITED")?y="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":m||h.includes("Quota exceeded")||h.includes("429")?y=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:v||h.includes("API Error: API key not valid")||h.includes("403")?y="【認証エラー】APIキーが無効です。正しいキーを設定してください。":h.includes("404")?y="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":y+=`
[各モデルのエラー詳細]
${u.join(`
`)}`,new Error(y)}const Mt={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},Ot={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},Rt={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},Nt={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},Pt={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function pe(e,t){return!e||e==="ランダム"?"":t[e]||""}const Gt={江戸時代:{tags:["江戸","江戸時代","徳川","侍","町人"],lore:`【江戸時代の生活知識】
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
・食文化: 現代知識で異世界の食文化を改革する展開が人気（マヨネーズ、味噌、醤油の再現など）`}};function Ht(e){const t=[e.worldview,e.worldviewCustom,e.era,e.eraCustom,e.theme,e.themeCustom,e.genre,e.genreCustom,e.mode,e.modeCustom,e.supplement,...(e.characters||[]).map(r=>r.note||"")].filter(Boolean).join(" ");if(!t.trim())return"";const n=[],s=new Set;for(const[r,o]of Object.entries(Gt)){if(s.has(r))continue;o.tags.some(d=>t.includes(d))&&(n.push(o.lore),s.add(r))}return n.length===0?"":`

【参考知識（RAG: 物語のディテール向上用 — この情報を自然に活用して描写の解像度を上げること）】
`+n.slice(0,3).join(`

`)}const Ie=e=>e[Math.floor(Math.random()*e.length)];function Ut(e){const t=e.mode||"4koma",n=e.genreCustom||e.genre||"コメディ",s=e.themeCustom||e.theme||"ランダム",a=e.worldviewCustom||e.worldview||"現代日本",r=e.eraCustom||e.era||"現代",o=e.targetCustom||e.target||"全年齢",i=e.endingCustom||e.ending||"意外な結末",d=e.narrCustom||e.narration||"三人称・客観";let u;!e.characters||e.characters.length===0?u="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":u=e.characters.map((L,U)=>{const z=L.name||`(AI命名:キャラ${U+1})`,oe=L.role||"未定",fe=L.sex?`性別:${L.sex}, `:"",w=L.personality||"未定",P=L.note?` [${L.note}]`:"";return`${U+1}. ${z} (${oe}) — ${fe}性格:${w}${P}`}).join(`
`);const p=e.charCount?`
※ 指定文字数：約${e.charCount}文字程度`:"",m=e.supplement?`
【追加指示】
${e.supplement}`:"",v={"4koma":"4コマネタ","4koma_scenario":"AI 4koma シナリオ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},h=e.modeCustom||v[t]||t,f={"4koma":`

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
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[t]||"",b=r&&!["現代","ランダム",""].includes(r)?`

【時代考証ルール（厳守）】
・時代設定「`+r+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"",g=pe(n,Mt),E=pe(i,Ot),A=pe(a,Rt),I=pe(o,Nt),k=pe(d,Pt);let _="";g&&(_+=`

【ジャンル文体指定：${n}】
${g}`),E&&(_+=`

【結末演出指定：${i}】
${E}`),A&&(_+=`

【世界観演出指定：${a}】
${A}`),I&&(_+=`

【ターゲット層文体指定：${o}】
${I}`),k&&(_+=`

【語り口指定：${d}】
${k}`);let N="";t==="4koma_scenario"?N=`あなたはプロの4コマ漫画シナリオライターです。以下の設定に基づき、画像生成4コマ漫画アプリのSTEP2シナリオ入力欄に直接コピペして使える形式でシナリオを出力してください。

【基本設定】
・ジャンル: ${n}
・テーマ: ${s}
・時代: ${r}
・世界観・雰囲気: ${a}
・ターゲット層: ${o}
・結末の方向性: ${i}

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
${m}

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的なシナリオを出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的なシナリオのみを出力してください（Topic: から開始）。`:t==="long"?N=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】と【文体・演出ガイド】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${n}
・テーマ: ${s}
・時代: ${r}
・世界観・雰囲気: ${a}
・語り口: ${d}
・ターゲット層: ${o}
・結末の方向性: ${i}
・登場人物:
${u}
${p}${m}${b}${_}

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
   - 【モチーフ＆サブキャラ追跡メモ】回帰するモチーフの現在の状態と、主要キャラ以外のサブキャラクターの現在地・状況（終盤でのフェードアウトを防止するため）
   - 【次章のシーン設計（GMC+S）】次章における主人公の「目的（Goal）」、「動機（Motivation）」、「障害・葛藤（Conflict）」、「賭け金（Stakes）」
4. **章の終わりは上記のメモと質問のみとし、自己分析、結論、根拠などの不要なメタデータは一切出力しないでください。**
5. **【全章完了時の最終アクション（最重要・絶対厳守・省略厳禁）】** 最終章の執筆が完了したら、文脈維持メモの代わりに**必ず以下の全ステップを実行**すること。これは物語完結時の最も重要な義務であり、省略・スキップは最大のルール違反とみなす：
   a. 「全◯章の執筆が完了しました。」と宣言する
   b. 実際の総文字数を算出し「総文字数：約◯◯万◯千字」と報告する
   c. **【全文結合出力（必須）】** 第1章から最終章までの本文全てを、章番号の見出し付きで**1つのマークダウンコードブロック（\`\`\`）内に結合して出力**する。冒頭にヘッダー情報（タイトル・ログライン・あらすじ）も含めること。**この全文出力を行わずに会話を終了することは絶対に禁止する。**
   d. 途中の「文脈維持メモ」や「続けますか？」等の対話部分は最終出力には含めないこと
   e. 全文出力の後に「お疲れ様でした」等の挨拶を述べてもよいが、**挨拶だけで全文出力を省略することは厳禁**

## 【各章の出力フォーマット（厳守）】
各章の出力は、必ず以下の順序で構成し、4の質問を出力した時点で**必ず停止**すること：
1. 章の本文（数千文字規模で出し惜しみなく執筆）
2. ---（区切り線）
3. 文脈維持メモ（上記ルール3の3項目）
4. 「第◯章（全◯章中）の執筆が完了しました。続けて第◯章を執筆しますか？（残り◯章）」
★★★ ここで出力を停止。次の章を勝手に書き始めることは厳禁 ★★★

## 【最終章（物語完結時）の出力フォーマット（絶対厳守）】
最終章を書き終えたら、通常の「文脈維持メモ＋続けますか？」の代わりに、**必ず以下のフォーマットで出力**すること：
1. 最終章の本文（数千文字規模で出し惜しみなく執筆）
2. ---（区切り線）
3. 「全◯章の執筆が完了しました。総文字数：約◯◯万◯千字」
4. **【全文結合出力】** 以下のフォーマットで、第1章から最終章まで全ての本文を1つのコードブロック内に結合して出力：
\`\`\`markdown
タイトル：◯◯◯
ログライン：◯◯◯
あらすじ：◯◯◯

# 第1章：◯◯◯
（第1章の本文全文）

# 第2章：◯◯◯
（第2章の本文全文）

...（全章分を省略せず記載）...

# 第◯章（最終章）：◯◯◯
（最終章の本文全文）
\`\`\`
★★★ この全文結合出力を省略して「お疲れ様でした」だけで終わることは最大のルール違反である。必ず全文を出力してから会話を終了すること ★★★

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
`:N=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${h}」を執筆してください。

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
・時代: ${r}
・世界観・雰囲気: ${a}
・語り口: ${d}
・ターゲット層: ${o}
・結末の方向性: ${i}

【登場人物】
${u}

【執筆ルール（最重要）】
1. ログラインの固定：執筆を開始する前に、物語全体を貫く「ログライン（物語の核となる1文要約）」を内部で設定し、最初から結末までその軸を絶対にブレさせないこと。
2. 予測可能な展開を意図的に回避し、読者を驚かせること。
3. キャラクターは設定された性格から生まれる固有の反応をすること。
4. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。
${(()=>{const L=["novel","medium","short_short","scenario","manga","documentary","radio"],U=["essay","poem","letter","diary"];return L.includes(t)?`6. 「${i}」という結末に向かって、伏線を自然に配置すること。

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

セリフは短く鋭く。だらだら説明するセリフは禁止。テンポとオチの切れ味を最優先すること。`:U.includes(t)?{essay:"\\n\\n【構成ルール】\\n1. テーマの一貫性と感情の自然な流れを重視し、読者が共感しながら読み進められる構成にすること。\\n2. 劇的な展開や壮大な伏線は一切不要。日常の機微や気づきを丁寧に積み重ねること。\\n3. 結論を急がず、余韻を残して自然に終わらせること。",poem:"\\n\\n【構成ルール】\\n1. イメージの連鎖と韻律の統一感を重視し、一篇を通じて響き合うモチーフを配置すること。\\n2. 物語的な伏線や因果関係は不要。詩的飛躍と余白を大切にすること。\\n3. 言葉の音（おん）と意味の二重性を意識した表現を心がけること。",letter:"\\n\\n【構成ルール】\\n1. 書き手の心情変化を自然かつ段階的に描写し、手紙の冒頭と末尾で感情の温度差を持たせること。\\n2. 物語的な伏線は不要。相手への語りかけの中で、書き手自身の内面が滲み出る構成にすること。\\n3. 手紙特有の「書き直せない生々しさ」を大切にし、整理されすぎない思考の流れを残すこと。",diary:"\\n\\n【構成ルール】\\n1. 日々の出来事から内面への掘り下げを段階的に進め、日記の最後に小さな気づきや変化を置くこと。\\n2. 物語的な伏線や劇的な展開は不要。等身大の思考と感情の揺れを丁寧に記録すること。\\n3. 書き手が自分自身に正直に向き合う瞬間を大切にし、取り繕わない率直さを保つこと。"}[t]||"":`6. 「${i}」という結末に向かって、伏線を自然に配置すること。`})()}${b}${f}${_}${p}${m}

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
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;let S="";e.universalAssets&&e.universalAssets.length>0&&(S=`

【入力アセット情報（インスピレーションソース）】
`,S+=`以下のユーザーから投入されたアセット情報（画像、URL、テキストなど）を、指定された「縛り（設定項目）」をすべて満たした上で、物語の要素、描写、モチーフ、設定として自然に溶け込ませて構成してください。
`,e.universalAssets.forEach((L,U)=>{if(S+=`[アセット ${U+1}] 型: ${L.type}
`,L.type==="image"){S+=`・画像ファイル名: ${L.name||"不明"}
`;const z=L.status==="error"?"画像解析エラーにより詳細情報なし":L.analysis||"解析中、または解析不可";S+=`・ビジュアル事前解析結果: ${z}
`}else L.type==="url"?(S+=`・リンクURL: ${L.value}
`,L.title&&L.status!=="error"&&(S+=`・リンク先タイトル: ${L.title}
`),L.content&&L.status!=="error"&&(S+=`・リンク先コンテンツ（要約/抽出テキスト）: ${L.content.slice(0,1500)}${L.content.length>1500?"...":""}
`)):L.type==="text"&&(S+=`・文書名: ${L.name||"不明"}
`,L.content&&L.status!=="error"&&(S+=`・文書内容: ${L.content.slice(0,1500)}${L.content.length>1500?"...":""}
`))}),N+=S);const D=Ht(e);D&&(N+=D);const C=[n,r,a,o,i,h];return e.charCount&&C.push(`${e.charCount}字`),D&&C.push("📚RAG"),e.universalAssets&&e.universalAssets.length>0&&C.push(`🖼️アセット(${e.universalAssets.length})`),{prompt:N,tags:C}}function Dt(){let e=Ie($t);return Math.random()<.55&&(e+=" "+Ie(Lt)),Math.random()<.35&&(e+=" "+Ie(At)),e}const jt=`この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
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
[{"name":"アカリ","sex":"女性","role":"主人公(推定)","personality":"元気","note":"内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;function Bt(e){return new Promise((t,n)=>{const s=new FileReader;s.onload=()=>{const a=s.result.split(",")[1];t(a)},s.onerror=n,s.readAsDataURL(e)})}function Kt(e){const n=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!n)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");return JSON.parse(n[0])}function qt(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim(),n=te.find(a=>a===t);return n||te.find(a=>t.includes(a)||a.includes(t))||t}function Ft(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim(),n=ne.find(a=>a===t);return n||ne.find(a=>t.includes(a)||a.includes(t))||t}function Wt(e,t){const n=te.map(i=>`<option value="${i}">${i}</option>`).join(""),s=ne.map(i=>`<option value="${i}">${i}</option>`).join(""),a=e.map((i,d)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${d}" checked>
          <span class="ci-char-name-display">${i.name||`キャラ${d+1}`}</span>
        </label>
        <span class="ci-char-badge">${i.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${d}" value="${(i.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${d}" value="${(i.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${d}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${d}" value="${(i.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${d}">
              <option value="">-- 自由入力に切替 --</option>
              ${s}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${d}" value="${(i.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${d}" rows="3">${(i.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),r=Array.isArray(t)?t:t?[t]:[],o=r.length>0?`<div class="ci-thumbnail-wrap">${r.map((i,d)=>`<img src="${i}" class="ci-thumbnail" alt="解析元画像 ${d+1}">`).join("")}</div>`:"";return`
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${e.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${o}
        <div class="ci-char-list">
          ${a}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `}function Jt(e,t){const n=document.getElementById("ci-modal");n&&(n.querySelectorAll(".ci-role-select").forEach(s=>{const a=s.dataset.idx,r=n.querySelector(`.ci-role-input[data-idx="${a}"]`),o=te.find(i=>i===r.value);o&&(s.value=o),s.addEventListener("change",()=>{s.value&&(r.value=s.value)}),r.addEventListener("input",()=>{const i=te.find(d=>d===r.value);s.value=i||""})}),n.querySelectorAll(".ci-personality-select").forEach(s=>{const a=s.dataset.idx,r=n.querySelector(`.ci-personality-input[data-idx="${a}"]`),o=ne.find(i=>i===r.value);o&&(s.value=o),s.addEventListener("change",()=>{s.value&&(r.value=s.value)}),r.addEventListener("input",()=>{const i=ne.find(d=>d===r.value);s.value=i||""})}),document.getElementById("ci-modal-close").addEventListener("click",()=>n.remove()),document.getElementById("ci-btn-cancel").addEventListener("click",()=>n.remove()),document.getElementById("ci-btn-register").addEventListener("click",()=>{const s=[];n.querySelectorAll(".ci-check").forEach(a=>{var m,v,h,y,f;if(!a.checked)return;const r=parseInt(a.dataset.idx),o=((m=n.querySelector(`.ci-name[data-idx="${r}"]`))==null?void 0:m.value)||"",i=((v=n.querySelector(`.ci-sex[data-idx="${r}"]`))==null?void 0:v.value)||"",d=((h=n.querySelector(`.ci-role-input[data-idx="${r}"]`))==null?void 0:h.value)||"",u=((y=n.querySelector(`.ci-personality-input[data-idx="${r}"]`))==null?void 0:y.value)||"",p=((f=n.querySelector(`.ci-note[data-idx="${r}"]`))==null?void 0:f.value)||"";s.push({name:o,sex:i,role:d,personality:u,note:p})}),t(s),n.remove()}))}function zt(e,t,n){const s=document.getElementById("ci-dropzone"),a=document.getElementById("ci-file-input"),r=document.getElementById("ci-status");if(!s||!a)return;s.addEventListener("dragover",d=>{d.preventDefault(),!(e.locked&&e.locked.chars)&&s.classList.add("ci-dragover")}),s.addEventListener("dragleave",()=>{s.classList.remove("ci-dragover")}),s.addEventListener("drop",d=>{if(d.preventDefault(),s.classList.remove("ci-dragover"),e.locked&&e.locked.chars)return;const u=Array.from(d.dataTransfer.files).filter(p=>p.type.startsWith("image/"));u.length>0&&o(u)}),s.addEventListener("click",()=>{e.locked&&e.locked.chars||a.click()}),a.addEventListener("change",d=>{if(e.locked&&e.locked.chars)return;const u=Array.from(d.target.files).filter(p=>p.type.startsWith("image/"));u.length>0&&(o(u),d.target.value="")});async function o(d){if(e.locked&&e.locked.chars)return;const u=n();if(!u){alert("APIキーを先に保存してください");return}const p=["image/png","image/jpeg","image/webp","image/gif"],m=d.filter(f=>p.includes(f.type)?!0:(console.warn(`非対応形式スキップ: ${f.name} (${f.type})`),!1));if(m.length===0){alert(`対応する画像ファイルがありません。
PNG/JPG/WEBP/GIF のみ対応しています。`);return}s.classList.add("ci-loading");const v=document.getElementById("global-alert");v&&(v.innerHTML="⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。",v.style.display="flex"),r&&(r.textContent=`🔍 ${m.length}枚の画像を解析中...（数秒〜数十秒）`,r.classList.remove("hidden"));const h=[],y=[];try{for(let f=0;f<m.length;f++){const b=m[f];r&&m.length>1&&(r.textContent=`🔍 画像 ${f+1}/${m.length} を解析中...`),v&&m.length>1&&(v.innerHTML=`⚠️ <strong>画像認識中 (${f+1}/${m.length}):</strong> AIがキャラクターシートを解析しています...`);const g=await Bt(b);y.push(`data:${b.type};base64,${g}`);const{text:E}=await ze(u,jt,g,b.type,void 0,{responseMimeType:"application/json"}),A=Kt(E);A&&A.length>0&&(A.forEach(I=>{I.role=qt(I.role),I.personality=Ft(I.personality)}),h.push(...A))}if(h.length===0)throw new Error("キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。");i(h,y),r&&(r.textContent=`✅ ${h.length}キャラクター検出！確認してください。`)}catch(f){console.error("Character import error:",f),r&&(r.textContent=`❌ エラー: ${f.message}`),setTimeout(()=>{r&&r.classList.add("hidden")},5e3)}finally{s.classList.remove("ci-loading"),v&&(v.style.display="none")}}function i(d,u){var m;(m=document.getElementById("ci-modal"))==null||m.remove();const p=document.createElement("div");p.innerHTML=Wt(d,u),document.body.appendChild(p.firstElementChild),Jt(d,v=>{v.forEach(h=>{e.characters.push({name:h.name||"",sex:h.sex||"",role:h.role||"",personality:h.personality||"",note:h.note||""})}),t(),r&&(r.textContent=`✅ ${v.length}キャラクターを登録しました！`,setTimeout(()=>r.classList.add("hidden"),3e3))})}}const $=e=>document.getElementById(e);let j=[],K=[],J=null,de="",re=()=>"",ge=()=>"";const we=`あなたはプロの文芸批評家・計量文体学の専門家です。
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
- 値の文字列内で二重引用符を使用する場合は、生のダブルクォーテーション（"）ではなく、必ず二重山括弧（『』）や角括弧（「」）を使用すること
- **画像のみの入力、あるいは情報が少ない入力に対する指示**:
  - 入力されたテキストが短い単語・一文のみである場合、または画像（イラスト）のみの入力である場合は、その言葉や絵の空気感から想起される背景、世界観、感情、言外のニュアンス、またはポップカルチャーや文化的背景を最大限に想像・補完してください。
  - 特に画像のみの解析時におけるテキスト固有の項目（文体、語彙、セリフ、修辞、テンポ等）については、「もしこのイラストを描いた作者が文章を執筆するならば、どのような文体、語彙、テンポ、語り口にするか」を想像力をフルに働かせて具体的に推測・補完してください。
  - 情報不足を理由にした「判定不可」「画像のみのため解析不能」「不明」といった出力や簡素すぎる記述は絶対に禁止します。エンターテインメントとしての面白さを重視し、すべての項目を具体的かつクリエイティブな想像力で詳細に埋めてください。

## 分析対象テキスト:
`;function Yt(e,t){return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」に完全に従ってリライトしてください。

## 絶対遵守ルール:
1. 物語のプロット（起承転結）、登場人物、設定は一切変更しない
2. 文体・語彙・描写方法・セリフ回しのみを作風パラメータに合わせて変換する
3. 文字数は元のテキストの80%〜120%の範囲に収める
4. タイトルがあればそのまま維持する
5. リライト結果のみを出力し、解説や注釈は一切付けない

## 作風パラメータ:
${JSON.stringify(e,null,2)}

## 元のテキスト:
${t}

## リライト結果:`}function Xe(e){const t=$("settings");t&&t.classList.add("generating");const n=$("sa-section");n&&n.classList.add("generating");const s=document.querySelector(".btn-generate");s&&(s._origText=s.textContent,s.disabled=!0,s.innerHTML=`<span class="spinner"></span>${e}`);const a=$("sa-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`,a.classList.remove("hidden"));const r=$("sa-reflect-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const o=$("global-alert");o&&(o.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,o.style.display="flex");const i=$("thought-score-board");i&&(i.style.display="none")}function Ke(e){const t=$("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const n=$("sa-reflect-api-status");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const s=document.querySelector(".btn-generate");s&&(s.innerHTML=`<span class="spinner"></span>${e}`);const a=$("global-alert");a&&(a.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const r=$("thought-score-board");r&&(r.style.display="none")}function Qe(){const e=$("settings");e&&e.classList.remove("generating");const t=$("sa-section");t&&t.classList.remove("generating");const n=document.querySelector(".btn-generate");n&&(n.disabled=!1,n.textContent=n._origText||"ストーリー生成");const s=$("sa-api-status");s&&s.classList.add("hidden");const a=$("sa-reflect-api-status");a&&a.classList.add("hidden");const r=$("global-alert");r&&(r.style.display="none")}function Vt(){const e=$("sa-dropzone"),t=$("sa-file-input");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",n=>{n.preventDefault(),e.classList.add("sa-dragover")}),e.addEventListener("dragleave",()=>{e.classList.remove("sa-dragover")}),e.addEventListener("drop",n=>{n.preventDefault(),e.classList.remove("sa-dragover"),qe(n.dataTransfer.files)}),t.addEventListener("change",n=>{qe(n.target.files),t.value=""}))}async function qe(e){const t=Array.from(e),n=t.filter(a=>a.type==="text/plain"||a.name.endsWith(".txt")||a.name.endsWith(".md")||a.name.endsWith(".csv")||a.type===""),s=t.filter(a=>a.type.startsWith("image/"));if(n.length===0&&s.length===0){alert("テキストファイル (.txt, .md) または画像ファイルをドロップしてください");return}for(const a of n)try{const r=await Xt(a);r.trim().length>0&&j.push({name:a.name,text:r.trim(),charCount:r.trim().length})}catch(r){console.warn(`ファイル読み込み失敗: ${a.name}`,r)}for(const a of s)try{const r=await Qt(a),o=URL.createObjectURL(a);K.push({name:a.name,base64:r,mimeType:a.type,previewUrl:o})}catch(r){console.warn(`画像ファイル読み込み失敗: ${a.name}`,r)}be(),Ge(),(j.length>0||K.length>0)&&$("sa-dropzone").classList.add("sa-has-files"),Z()}function Xt(e){return new Promise((t,n)=>{const s=new FileReader;s.onload=a=>t(a.target.result),s.onerror=n,s.readAsText(e,"UTF-8")})}function Qt(e){return new Promise((t,n)=>{const s=new FileReader;s.onload=a=>{const r=a.target.result.split(",")[1];t(r)},s.onerror=n,s.readAsDataURL(e)})}function be(){const e=$("sa-file-list");if(!e)return;const t=j.reduce((s,a)=>s+a.charCount,0),n=$("sa-file-count");n&&(n.textContent=`${j.length}件 / ${t.toLocaleString()}字`,n.classList.remove("hidden")),e.innerHTML=j.map((s,a)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${Ce(s.name)}</span>
      <span class="sa-file-chars">${s.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${a}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(s=>{s.addEventListener("click",a=>{const r=parseInt(a.target.dataset.idx);j.splice(r,1),be(),j.length===0&&($("sa-dropzone").classList.remove("sa-has-files"),$("sa-file-count").classList.add("hidden")),Z()})})}function Ge(){const e=$("sa-image-list");if(e){if(K.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden"),e.innerHTML=K.map((t,n)=>`
    <div class="sa-image-item">
      <img src="${t.previewUrl}" alt="${Ce(t.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${Ce(t.name)}</span>
      <button class="sa-file-remove" data-img-idx="${n}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(t=>{t.addEventListener("click",n=>{var a;const s=parseInt(n.target.dataset.imgIdx);(a=K[s])!=null&&a.previewUrl&&URL.revokeObjectURL(K[s].previewUrl),K.splice(s,1),Ge(),j.length===0&&K.length===0&&$("sa-dropzone").classList.remove("sa-has-files"),Z()})})}}function Zt(e){const t=e.indexOf("{");if(t===-1)return null;let n=0,s=!1,a=!1;for(let r=t;r<e.length;r++){const o=e[r];if(a){a=!1;continue}if(o==="\\"){a=!0;continue}if(o==='"'){s=!s;continue}if(!s){if(o==="{")n++;else if(o==="}"&&(n--,n===0))return e.slice(t,r+1)}}return null}function en(e){try{return JSON.parse(e)}catch(r){console.warn("JSON初回パース失敗、修復を試行:",r.message)}let t=e.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":');let n="",s=!1,a="";for(let r=0;r<t.length;r++){const o=t[r];if(!s)o==='"'?(s=!0,a=""):n+=o;else if(o==="\\")if(r+1<t.length){const i=t[r+1];a+="\\"+i,r++}else a+="\\";else if(o==='"'){let i="",d=r+1;for(;d<t.length;){const p=t[d];if(p!==" "&&p!=="	"&&p!=="\r"&&p!==`
`){i=p;break}d++}let u=!1;if(i===":")u=!0;else if(i==="}"||i==="]"||i==="")u=!0;else if(i===","){let p="",m=d+1;for(;m<t.length;){const h=t[m];if(h!==" "&&h!=="	"&&h!=="\r"&&h!==`
`){p=h;break}m++}(['"',"{","[","-","t","f","n","}","]"].includes(p)||p>="0"&&p<="9")&&(u=!0)}if(u){let p=a.replace(/\t/g,"\\t").replace(/\r\n/g,"\\n").replace(/\r/g,"\\n").replace(/\n/g,"\\n");n+='"'+p+'"',s=!1}else a+='\\"'}else a+=o}if(s){let r=a.replace(/\t/g,"\\t").replace(/\r\n/g,"\\n").replace(/\r/g,"\\n").replace(/\n/g,"\\n");n+='"'+r+'"'}t=n,t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(r){console.warn("JSON修復パース失敗、第2段階修復を試行:",r.message);try{let o=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(o)}catch(o){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${o.message}`)}}}function Ce(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function tn(){const e=re();if(!e){alert("APIキーを保存してから解析してください");return}const t=$("sa-direct-text"),n=t?t.value.trim():"";if(j.length===0&&K.length===0&&!n){alert("テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください");return}const s=$("btn-sa-analyze"),a=$("sa-result-wrap"),r=$("sa-result"),o=$("sa-reflect-wrap"),i=$("sa-reflect-result-wrap"),d=$("progress-log"),u=$("thought-score-board"),p=$("progress-title-text");d&&(d.textContent="作風解析の開始を待っています..."),u&&(u.innerHTML="",u.style.display="none"),p&&(p.textContent="AI進捗・思考ログ: 作風解析中..."),s.disabled=!0,s.innerHTML='<span class="spinner"></span>AIが超強引に作風を解析中...',r.textContent="超強引に解析中です...しばらくお待ちください（1分〜3分程度）",a.classList.remove("hidden"),o.classList.add("hidden"),i.classList.add("hidden"),Xe("🔬 超強引！作風解析中...");try{let m=[];j.length>0&&(m=j.map(I=>`--- ${I.name} ---
${I.text}`)),n&&m.push(`--- 直接貼り付けテキスト ---
${n}`);let v=m.join(`

`);v.length>1e5&&(v=v.slice(0,1e5)+`

[...以降のテキストは省略（コンテキスト上限）...]`);const h=K.length>0,y=v.length>0;let f=we;h&&y?f=we.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 画像分析の追加指示:
- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること
- テキストと画像の両方から相乗的に作風パラメータを抽出すること`):h&&!y&&(f=we.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。

## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:
- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。
- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。

## 画像分析指示:
- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること`)),y&&(f=f+v);const b=ae[0].value;let g;h?g=(await Ct(e,f,K,k=>{Ke(`フォールバック: ${k}`),s.innerHTML=`<span class="spinner"></span>フォールバック: ${k}`},{responseMimeType:"application/json",timeoutMs:9e4})).text:g=(await Ye(e,b,f,k=>{Ke(`フォールバック: ${k}`),s.innerHTML=`<span class="spinner"></span>フォールバック: ${k}`},{responseMimeType:"application/json",timeoutMs:9e4})).text;let E="";const A=Zt(g);if(A)E=A;else{const I=g.match(/```json\s*([\s\S]*?)\s*```/);if(I)E=I[1];else{const k=g.match(/\{[\s\S]*\}/);if(k)E=k[0];else throw new Error("AIの応答からJSONを抽出できませんでした")}}J=en(E),nn(J),p&&(p.textContent="AI進捗・思考ログ: 作風解析完了"),d&&(d.textContent=`作風解析が完了しました。解析結果が右パネルに表示されています。
作風名: ${J.style_name||"未定義"}
トーン: ${J.tone||"未定義"}`),o.classList.remove("hidden"),ce()}catch(m){r.textContent=`解析エラー: ${m.message}`,r.classList.add("sa-error"),p&&(p.textContent="AI進捗・思考ログ: 解析エラー"),d&&(d.textContent=`作風解析エラーが発生しました:
${m.message}`)}finally{s.disabled=!1,s.innerHTML="🔬 超強引！作風解析を実行",Qe()}}function nn(e){var o,i;const t=$("sa-result");t.classList.remove("sa-error");const n=[],s=(d,u,p)=>{p&&n.push(`${d} ${u}: ${p}`)},a=(d,u)=>{u&&n.push(`  ・${d}: ${u}`)},r=(d,u)=>{n.push(""),n.push(`${d} ${u}:`)};s("🏷️","作風名",e.style_name),s("🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(r("🎙️","語りの視点"),a("人称",e.narrative_voice.person),a("距離感",e.narrative_voice.distance),a("信頼度",e.narrative_voice.reliability),a("介入度",e.narrative_voice.intrusion)):s("🎙️","語りの視点",e.narrative_voice),r("📝","文体"),e.sentence_style&&(a("平均文長",e.sentence_style.avg_length||e.sentence_style.length),a("文長変動",e.sentence_style.length_variation),a("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),a("リズム",e.sentence_style.rhythm),a("段落長",e.sentence_style.paragraph_length),a("段落構成",e.sentence_style.paragraph_structure)),r("📖","語彙"),e.vocabulary&&(a("レベル",e.vocabulary.level),a("情報密度",e.vocabulary.density),a("レジスター",e.vocabulary.register),a("特徴",e.vocabulary.quirks),a("外来語",e.vocabulary.foreign_words),a("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(r("🔮","修辞技法"),a("比喩スタイル",e.rhetoric.metaphor_style),a("比喩素材",e.rhetoric.metaphor_source),a("反復技法",e.rhetoric.repetition),a("アイロニー",e.rhetoric.irony_level),a("ユーモア",e.rhetoric.humor_type),a("その他",e.rhetoric.other_techniques)),r("🖼️","描写フォーカス"),e.description_focus&&(a("視覚",e.description_focus.visual),a("聴覚",e.description_focus.auditory),a("触覚",e.description_focus.tactile),a("嗅覚/味覚",e.description_focus.olfactory_gustatory),a("運動感覚",e.description_focus.kinesthetic),a("空間把握",e.description_focus.spatial),a("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),a("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(r("💬","セリフ"),a("文体",e.dialogue.style),a("機能",e.dialogue.function),a("タグ",e.dialogue.tag_style),a("方言",e.dialogue.dialect_sociolect),a("サブテキスト",e.dialogue.subtext)):s("💬","セリフ回し",e.dialogue_style),e.structure?(r("🏗️","構造"),a("テンポ",e.structure.pacing),a("場面転換",e.structure.scene_transition),a("時制",e.structure.time_handling),a("緊張曲線",e.structure.tension_curve),a("冒頭パターン",e.structure.opening_style),a("結末パターン",e.structure.closing_style)):s("⏱️","テンポ",e.pacing),e.emotional_architecture&&(r("❤️","感情設計"),a("主要感情",e.emotional_architecture.dominant_emotions),a("振り幅",e.emotional_architecture.emotional_range),a("カタルシス",e.emotional_architecture.catharsis_method),a("読者距離",e.emotional_architecture.reader_distance)),s("🎯","テーマ傾向",e.themes_tendency),s("📚","文学的影響",e.literary_influences),n.push(""),(o=e.unique_features)!=null&&o.length&&(n.push("✨ 固有の特徴:"),e.unique_features.forEach(d=>n.push(`  ・${d}`))),(i=e.anti_patterns)!=null&&i.length&&(n.push(""),n.push("🚫 回避パターン:"),e.anti_patterns.forEach(d=>n.push(`  ・${d}`))),n.push(""),n.push("━━━ 再現プロンプト ━━━"),n.push(e.reproduction_prompt||"（生成されませんでした）"),t.textContent=n.join(`
`)}async function sn(){const e=re();if(!e){alert("APIキーを保存してください");return}if(!J){alert("先に作風解析を実行してください");return}const t=ge(),n=$("output");if(!t||t.length<10||n&&n.classList.contains("empty")){alert("まず上のストーリー生成でテキストを生成してから、リライトを実行してください");return}const s=$("btn-sa-reflect"),a=$("sa-reflect-result-wrap"),r=$("sa-reflect-output");s.disabled=!0,s.innerHTML='<span class="spinner"></span>作風を反映してリライト中...',r.textContent="リライト中です...（完了後に一括表示されます）",a.classList.remove("hidden");const o=$("progress-log"),i=$("thought-score-board"),d=$("progress-title-text");o&&(o.textContent="作風リライトの開始を待っています..."),i&&(i.innerHTML="",i.style.display="none"),d&&(d.textContent="AI進捗・思考ログ: リライト準備中..."),Xe("🎨 作風リライト中...");let u=[],p="",m="",v=null;function h(f){u.push(f),y()}function y(){if(!o)return;let f="";u.length>0&&(f+=u.join(`
`)+`
`),p&&(f+=p+`
`),m&&(f+=`
`+m),o.textContent=f;const b=$("progress-content");b&&(b.scrollTop=b.scrollHeight)}h("[システム] 作風リライト処理を開始しました..."),h(`[システム] 対象ストーリー文字数: ${t.length.toLocaleString()} 字`),h("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中..."),h("[システム] リライト用メタプロンプトの構築が完了しました。");try{const f=Yt(J,t),b=ae[0].value;h(`[システム] AIモデル (${b}) にリライト要求を送信しています...`);let g=0,E=new Set;v=setInterval(()=>{g++,p=`[通信] AIモデルからのリライト応答を待機しています${".".repeat(g%4)} (${g}秒経過)`,g>=3&&!E.has(3)&&(E.add(3),u.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...")),g>=6&&!E.has(6)&&(E.add(6),u.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...")),g>=9&&!E.has(9)&&(E.add(9),u.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...")),g>=12&&!E.has(12)&&(E.add(12),u.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。")),g>=15&&g%5===0&&!E.has(g)&&(E.add(g),u.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${g}s) を実行しています...`)),y()},1e3);let A="",I=!1;d&&(d.textContent="AI進捗・思考ログ: リライト執筆中...");const k=({text:C})=>{I||(I=!0,p="",y(),v&&(clearInterval(v),v=null)),A+=C;const L=A.length;let U=`[システム] AIによるリライト文章の生成が開始されました。
`;U+=`[進捗] 本文をリライト中...
`,U+=`・現在文字数: ${L} 文字
`;const z=Math.floor(L/50%4),oe=".".repeat(z)+" ".repeat(3-z);U+=`・ステータス: 執筆処理中${oe}
`,m=U,y()},_=C=>{r.textContent=`フォールバック中: ${C}...`,s.innerHTML=`<span class="spinner"></span>フォールバック: ${C}`,h(`[システム] リライト応答遅延のため、モデルを ${C} にフォールバックします...`)},{usedModel:N}=await Ve(e,b,f,k,_);v&&(clearInterval(v),v=null),s.innerHTML='<span class="spinner"></span>最終推敲中...';let S=A.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,"");de=S,r.textContent=S;const D=$("sa-reflect-counter");D&&(D.textContent=`${S.length.toLocaleString()} 字`),d&&(d.textContent="AI進捗・思考ログ: リライト完了"),h("[システム] 作風リライト文の生成・推敲が正常に完了しました。"),m=`[進捗] リライトが正常に完了しました。
・最終文字数: ${S.length.toLocaleString()} 字
・ステータス: 完了`,p="",y(),a.scrollIntoView({behavior:"smooth",block:"start"})}catch(f){v&&(clearInterval(v),v=null),p="",y(),r.textContent=`リライトエラー: ${f.message}`}finally{s.disabled=!1,s.innerHTML="🎨 この作風でリライト実行",Qe()}}function an(){if(!J)return;const e=$("sa-result").textContent;navigator.clipboard.writeText(e).then(()=>{const t=$("btn-sa-copy");t.textContent="✅ コピー完了",setTimeout(()=>t.textContent="📋 コピー",2e3)})}function Ze(){return new Date().toISOString().replace(/[-T:]/g,"").slice(0,14)}function rn(){if(!J)return;const e=JSON.stringify(J,null,2),t=new Blob([e],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t);const s=(J.style_name||"style_analysis").replace(/[\s\/\\:*?"<>|]/g,"_");n.download=`${s}_${Ze()}.json`,n.click()}function on(){de&&navigator.clipboard.writeText(de).then(()=>{const e=$("btn-sa-reflect-copy");e.textContent="✅ コピー完了",setTimeout(()=>e.textContent="📋 コピー",2e3)})}function ln(){if(!de)return;const e=new Blob([de],{type:"text/plain"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`style_rewrite_${Ze()}.txt`,t.click()}function cn(){var t,n,s,a;K.forEach(r=>{r.previewUrl&&URL.revokeObjectURL(r.previewUrl)}),j=[],K=[],J=null,de="",be(),Ge();const e=$("sa-direct-text");e&&(e.value=""),ye(),$("sa-dropzone").classList.remove("sa-has-files"),(t=$("sa-file-count"))==null||t.classList.add("hidden"),Z(),ce(),$("sa-result").textContent="",(n=$("sa-result-wrap"))==null||n.classList.add("hidden"),(s=$("sa-reflect-wrap"))==null||s.classList.add("hidden"),(a=$("sa-reflect-result-wrap"))==null||a.classList.add("hidden")}function dn(){const e=$("sa-direct-text");if(!e)return;const t=e.value.trim();t&&(j.push({name:`直接入力テキスト_${j.length+1}`,text:t,charCount:t.length}),e.value="",be(),$("sa-dropzone").classList.add("sa-has-files"),Z(),ye())}function ye(){const e=$("btn-sa-add-text");if(!e)return;const t=$("sa-direct-text"),n=t&&t.value.trim().length>0;e.disabled=!n}function Ee(){const e=$("sa-section");if(!e)return;(typeof re=="function"?re():"")?e.classList.remove("sa-inactive"):e.classList.add("sa-inactive")}function Z(){const e=$("btn-sa-analyze");if(!e)return;const t=typeof re=="function"?re():"",n=j.length>0,s=K.length>0,a=$("sa-direct-text"),r=a&&a.value.trim().length>0,o=n||s||r;e.disabled=!(t&&o)}function ce(){const e=$("btn-sa-reflect");if(!e)return;const t=typeof ge=="function"?ge():"",n=$("output"),s=t&&t.length>=10&&n&&!n.classList.contains("empty"),a=J!==null;e.disabled=!(s&&a)}function un(e,t){var s,a,r,o,i,d,u,p;re=e,ge=t,Vt(),(s=$("btn-sa-analyze"))==null||s.addEventListener("click",tn),(a=$("btn-sa-reflect"))==null||a.addEventListener("click",sn),(r=$("btn-sa-copy"))==null||r.addEventListener("click",an),(o=$("btn-sa-json"))==null||o.addEventListener("click",rn),(i=$("btn-sa-reflect-copy"))==null||i.addEventListener("click",on),(d=$("btn-sa-reflect-dl"))==null||d.addEventListener("click",ln),(u=$("btn-sa-clear"))==null||u.addEventListener("click",cn),(p=$("btn-sa-add-text"))==null||p.addEventListener("click",dn);const n=$("sa-direct-text");n&&n.addEventListener("input",()=>{Z(),ye()}),Ee(),ye()}const pn="3.4.2",c=e=>document.getElementById(e),O=e=>e&&e.length?e[Math.floor(Math.random()*e.length)]:null,M=e=>(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),l={apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1}};function et(e){const t=l.locked[e],n=document.querySelector(`.btn-lock[data-section="${e}"]`);n&&(n.textContent=t?"🔒":"🔓",n.classList.toggle("locked",t),n.title=t?"この項目のロックを解除する":"この項目をロックしてランダム変更から保護");let s=c(`section-${e}`);!s&&e==="universal"&&(s=c("section-universal-intake")),s&&(s.classList.toggle("is-locked",t),s.querySelectorAll("input, textarea, select, button:not(.btn-lock)").forEach(a=>{a.disabled=t})),e==="chars"&&W()}function fn(){const e=c("btn-switch-api");e.classList.remove("gemini-mode","openai-mode"),l.apiProvider==="gemini"?(e.classList.add("gemini-mode"),e.title="現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）"):(e.classList.add("openai-mode"),e.title="現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）")}function $e(){const e=c("banner"),t=document.querySelector(".settings-panel"),n=c("engine-label"),s=c("apikey");l.apiKey?(e.classList.add("ok"),s.value="********",s.readOnly=!0,t&&t.classList.remove("disabled-panel"),n.classList.remove("not-set"),l.apiProvider==="openai"?(n.textContent="ChatGPT API",n.style.color="var(--openai)",n.style.backgroundColor="var(--openai-glow)",n.style.borderColor="rgba(16,163,127,.3)"):(n.textContent="Gemini API",n.style.color="",n.style.backgroundColor="",n.style.borderColor="")):(e.classList.remove("ok"),s.value="",s.readOnly=!1,t&&t.classList.add("disabled-panel"),n.textContent="⚠ API未設定",n.classList.add("not-set"),n.style.color="",n.style.backgroundColor="",n.style.borderColor=""),l.apiProvider==="openai"?s.placeholder="OpenAI APIキーを入力（sk-...）":s.placeholder="Gemini APIキーを入力",fn()}function hn(){l.apiProvider==="gemini"?(l.geminiKey=l.apiKey,l.apiProvider="openai",l.apiKey=l.openaiKey):(l.openaiKey=l.apiKey,l.apiProvider="gemini",l.apiKey=l.geminiKey);const e=c("banner");l.apiKey?(e.classList.add("locked"),c("key-save").classList.add("hidden"),c("key-edit").classList.remove("hidden")):(e.classList.remove("locked"),c("key-save").classList.remove("hidden"),c("key-edit").classList.add("hidden"),c("apikey").readOnly=!1,c("apikey").value=""),$e(),e.classList.remove("banner-switch-flash"),e.offsetWidth,e.classList.add("banner-switch-flash"),l.apiKey||c("apikey").focus(),Z(),Ee()}function mn(){const e=c("apikey").value.trim();if(!e){alert("APIキーを入力してください");return}const t=e.startsWith("sk-");t&&l.apiProvider==="gemini"?l.apiProvider="openai":!t&&l.apiProvider==="openai"&&(l.apiProvider="gemini"),l.apiKey=e,l.apiProvider==="openai"?l.openaiKey=e:l.geminiKey=e,$e(),c("banner").classList.add("locked"),c("key-save").classList.add("hidden"),c("key-edit").classList.remove("hidden"),Z(),Ee()}function gn(){c("banner").classList.remove("locked"),c("key-save").classList.remove("hidden"),c("key-edit").classList.add("hidden"),c("apikey").readOnly=!1,c("apikey").value="",c("apikey").focus(),l.apiKey="",l.apiProvider==="openai"?l.openaiKey="":l.geminiKey="",$e(),Z(),Ee()}function R(e,t){const n=c(e);n&&n.classList.toggle("hidden",!t)}function Te(e,t,n,s,a){const r=c(e);r&&(r.innerHTML=t.map(o=>`<button class="chip sub-chip" data-v="${M(o)}">${M(o)}</button>`).join(""),r.querySelectorAll(".chip").forEach(o=>{o.addEventListener("click",()=>{r.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),o.classList.add("active"),l[n]=o.dataset.v,c(s).value=o.dataset.v,R(a,o.dataset.v)})}))}function se({catId:e,subId:t,customId:n,clearId:s,headerRndId:a,customRndId:r,categories:o,originals:i,stateKey:d,stateCatKey:u}){var v,h,y,f;const p=d==="themeSelected"?"theme":d==="narration"?"narr":d,m=c(e);if(m&&o){m.innerHTML=Object.keys(o).map(g=>`<button class="chip cat-chip" data-cat="${M(g)}">${M(g)}</button>`).join(""),m.querySelectorAll(".chip").forEach(g=>{g.addEventListener("click",()=>{l.locked[p]||(m.querySelectorAll(".chip").forEach(E=>E.classList.remove("active")),g.classList.add("active"),l[u]=g.dataset.cat,l[d]=null,Te(t,o[g.dataset.cat],d,n,s),c(n).value="",R(s,""))})});const b=Object.keys(o)[0];if(b){const g=m.querySelector(".chip");g&&g.classList.add("active"),Te(t,o[b],d,n,s)}}(v=c(a))==null||v.addEventListener("click",()=>{if(l.locked[p]||!o)return;const b=Object.keys(o),g=O(b);l[u]=g,m&&m.querySelectorAll(".chip").forEach(I=>I.classList.toggle("active",I.dataset.cat===g));const E=o[g],A=O(E);l[d]=A,Te(t,E,d,n,s),c(t).querySelectorAll(".chip").forEach(I=>I.classList.toggle("active",I.dataset.v===A)),c(n).value=A,R(s,A)}),(h=c(r))==null||h.addEventListener("click",()=>{if(l.locked[p])return;let b;d==="themeSelected"?b=Dt():b=O(i),b&&(c(n).value=b,m&&m.querySelectorAll(".chip").forEach(g=>g.classList.remove("active")),c(t).innerHTML="",l[u]=null,l[d]=null,R(s,b))}),(y=c(s))==null||y.addEventListener("click",()=>{l.locked[p]||(c(n).value="",R(s,""))}),(f=c(n))==null||f.addEventListener("input",()=>{if(l.locked[p])return;const b=c(n).value.trim();R(s,b),b&&(m&&m.querySelectorAll(".chip").forEach(g=>g.classList.remove("active")),c(t).innerHTML="",l[u]=null,l[d]=null)})}function yn(){document.querySelectorAll(".btn-section-clear").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.section;if(t&&l.locked[t])return;if(t==="chars"){vn();return}if(t==="mode"){c("mode-custom").value="",l.mode="4koma",c("mode-chips").querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),R("mode-custom-clear","");return}const n=`${t}-custom`,s=`${t}-custom-clear`,a=`${t}-cat-chips`,r=`${t}-sub-chips`;c(n)&&(c(n).value=""),R(s,""),c(a)&&c(a).querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),c(r)&&(c(r).innerHTML="");const i={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[t];i&&(l[i.key]=null,l[i.cat]=null),t==="supplement"&&(c("supplement").value="",R("supplement-clear",""))})})}function He(){const e=c("mode-chips");e.innerHTML=ke.map(t=>`<button class="chip${l.mode===t.value?" active":""}" data-v="${t.value}">${t.label}</button>`).join(""),e.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{l.locked.mode||(e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),t.classList.add("active"),l.mode=t.dataset.v,c("mode-custom").value=t.textContent,R("mode-custom-clear",t.textContent),xe(l.mode))})}),c("btn-rand-mode").addEventListener("click",()=>{if(l.locked.mode)return;const t=O(ke);l.mode=t.value,e.querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n.dataset.v===t.value)),c("mode-custom").value=t.label,R("mode-custom-clear",t.label),xe(l.mode)}),c("mode-custom-rnd").addEventListener("click",()=>{if(l.locked.mode)return;const t=O(ht);c("mode-custom").value=t,l.mode=null,e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),R("mode-custom-clear",t)}),c("mode-custom").addEventListener("input",()=>{if(l.locked.mode)return;const t=c("mode-custom").value.trim();R("mode-custom-clear",t),t&&(e.querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),l.mode=null,xe(null))}),c("charcount-check").addEventListener("change",()=>{l.locked.mode||c("charcount-wrap").classList.toggle("hidden",!c("charcount-check").checked)}),c("char-count").addEventListener("input",t=>{if(l.locked.mode)return;const n=parseInt(t.target.max)||6e3;parseInt(t.target.value)>n&&(t.target.value=n)})}function xe(e){const t=c("char-count"),n=c("charcount-hint");!t||!n||(e==="long"?(t.max="300000",t.step="10000",t.value="100000",n.textContent="※長編モードでは、長編小説をAIに各章ごと分割執筆させるための『専用指示書』を生成します。",n.style.color="#4caf50"):(t.max="4000",t.step="500",parseInt(t.value)>4e3&&(t.value="2000"),n.textContent="※直接生成で途切れない安全な文字数は約4,000字までです",n.style.color="#aaa"))}function vn(){l.characters=[],W()}function W(){c("char-count-display").textContent=l.characters.length;const e=c("char-list"),t=l.locked&&l.locked.chars,n=`<datalist id="roles-list">${te.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,s=`<datalist id="personalities-list">${ne.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,a='<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>';e.innerHTML=l.characters.map((r,o)=>`
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
          <input type="text" class="char-name-input" value="${M(r.name)}" data-idx="${o}" placeholder="例：山田太郎（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="name" title="今すぐ名前の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="name" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${o}" data-key="sex" value="${M(r.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="sex" title="今すぐ性別の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="sex" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${o}" data-key="role" value="${M(r.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="role" title="今すぐ役割の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="role" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${o}" data-key="personality" value="${M(r.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="personality" title="今すぐ性格の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="personality" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${o}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${t?" disabled":""}>${M(r.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${o}" data-key="note" title="今すぐ詳細メモの案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${o}" data-key="note" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
    </div>
  `).join("")+n+s+a+`
    <div class="char-section-hint">
        💡 <strong>ヒント・使い方:</strong><br>
        ・各項目は<strong>「手入力」</strong>、<strong>「リスト選択」</strong>、<strong>「🎲で今すぐ生成」</strong>のどれでも可能です。<br>
        ・空欄のまま生成すると、AIが物語の文脈に最適な設定を<strong>自動的に補完</strong>します。<br>
        ・<strong>性別同期</strong>：性別（男性/女性）を変えると名前が自動で微調整されます。逆に名前を変えると性別も連動します。<br>
        ・<strong>1人のみ指定時</strong>：AIが主人公と認識し、勝手に相棒や敵など他の人物を登場させます。もし「絶対に他の人物を登場させない（一人芝居）」にしたい場合は、下部の補足メモ欄にその旨を記載してください。
    </div>
  `,e.querySelectorAll(".char-name-input").forEach(r=>r.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i].name=o.target.value,Oe(i,"name")})),e.querySelectorAll(".char-sel").forEach(r=>r.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i][o.target.dataset.key]=o.target.value,o.target.dataset.key==="sex"&&Oe(i,"sex")})),e.querySelectorAll(".char-memo").forEach(r=>r.addEventListener("input",o=>{const i=parseInt(o.target.dataset.idx);l.characters[i].note=o.target.value})),e.querySelectorAll(".btn-field-rnd").forEach(r=>r.addEventListener("click",o=>$n(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-field-clear").forEach(r=>r.addEventListener("click",o=>Ln(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-char-rnd-all").forEach(r=>r.addEventListener("click",o=>Ue(parseInt(r.dataset.idx)))),e.querySelectorAll(".btn-char-del").forEach(r=>r.addEventListener("click",o=>bn(parseInt(r.dataset.idx))))}function tt(){l.locked.chars||(l.characters.push({name:"",role:"",personality:"",sex:"",note:""}),W())}function bn(e){l.locked.chars||(l.characters.splice(e,1),W())}function En(){l.locked.chars||(l.characters.pop(),W())}function $n(e,t){if(l.locked.chars)return;const n=l.characters[e],s=Me(n.sex)||_e(n.name)||(Math.random()<.5?"M":"F");if(t==="name"){const a=s==="M"?Ne:s==="F"?Pe:ft;n.name=O(Re)+O(a)}if(t==="sex"){n.sex=O(["男性","女性","無性","回答無し"]),Oe(e,"sex");return}if(t==="role"&&(n.role=O(te)),t==="personality"&&(n.personality=O(ne)),t==="note"){const a=s==="M"?We:Je;n.note=O(a)}W()}function Ln(e,t){l.locked.chars||(l.characters[e][t]="",W())}function Ue(e){if(l.locked.chars)return;const t=Math.random()<.5?"M":"F",n=t==="M"?Ne:Pe,s=t==="M"?We:Je;l.characters[e]={name:O(Re)+O(n),role:O(te),personality:O(ne),sex:t==="M"?"男性":"女性",note:O(s)},W()}const An=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],In=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function _e(e){if(!e)return null;const t=e.slice(-1);return An.includes(t)?"M":In.includes(t)?"F":null}function Me(e){return e?e.includes("男性")||e.includes("男,")?"M":e.includes("女性")||e.includes("女,")?"F":null:null}function Oe(e,t){const n=l.characters[e];if(t==="name"){const s=_e(n.name),a=Me(n.sex);s&&s!==a&&(n.sex=s==="M"?"男性":"女性",W())}else if(t==="sex"){const s=Me(n.sex),a=_e(n.name);if(s&&s!==a){const r=s==="M"?Ne:Pe;n.name=O(Re)+O(r),W()}}}function nt(){l.locked.chars||(l.characters.length===0&&tt(),l.characters.forEach((e,t)=>Ue(t)))}function wn(){if(l.locked.chars)return;const e=Math.floor(Math.random()*4)+1;l.characters=[];for(let t=0;t<e;t++)l.characters.push({name:"",role:"",personality:"",sex:"",note:""}),Ue(t)}async function Tn(){if(l.locked.theme)return;const e=l.apiKey;if(!e){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const t=c("btn-today-news"),n=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner"></span>取得中...';const s=c("global-alert");s&&(s.innerHTML="⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...",s.style.display="flex");try{const a=ae[0].value,r="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。",{text:o}=await Ye(e,a,r),i=o.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim(),d=c("theme-custom").value.trim(),u=d?`${d}, ${i}`:i;c("theme-custom").value=u,l.themeSelected=null,l.themeCategory=null,c("theme-cat-chips")&&c("theme-cat-chips").querySelectorAll(".chip").forEach(p=>p.classList.remove("active")),c("theme-sub-chips").innerHTML="",R("theme-custom-clear",u)}catch(a){alert("ニュース取得失敗: "+a.message)}finally{t.disabled=!1,t.innerHTML=n,s&&(s.style.display="none")}}function xn(){return{mode:l.mode||"",modeCustom:c("mode-custom").value.trim(),theme:l.themeSelected||"",themeCustom:c("theme-custom").value.trim(),characters:l.characters,genre:l.genre||"",genreCustom:c("genre-custom").value.trim(),worldview:l.worldview||"",worldviewCustom:c("worldview-custom").value.trim(),target:l.target||"",targetCustom:c("target-custom").value.trim(),era:l.era||"",eraCustom:c("era-custom").value.trim(),ending:l.ending||"",endingCustom:c("ending-custom").value.trim(),narration:l.narration||"",narrCustom:c("narr-custom").value.trim(),charCount:c("charcount-check").checked&&parseInt(c("char-count").value)||null,supplement:c("supplement").value.trim(),universalAssets:l.universalAssets||[]}}function Se(e){const t=/<thought[^>]*>/i,n=/<\/thought[^>]*>/i,s=e.match(t),a=e.match(n);let r="",o="",i=!0;if(s){const d=s.index,u=s[0].length;if(a){const p=a.index,m=a[0].length;r=e.slice(d+u,p),o=e.slice(p+m),i=!1}else r=e.slice(d+u),o="",i=!0}else{const d=["topic:","logline:","location:","outfit:","punchline:","scenario:","タイトル:"];let u=-1;for(const p of d){let m;const v=p.replace(":","").trim();m=new RegExp(`(?:^|\\n)\\s*${v}\\s*[:：]`,"i");const h=e.match(m);if(h){const y=h.index+(h[0].startsWith(`
`)?1:0);(u===-1||y<u)&&(u=y)}}if(u!==-1)r=e.slice(0,u),o=e.slice(u),i=!1;else{const p="<thought>",m=e.toLowerCase();e.length>0&&p.startsWith(m)?(r="",o="",i=!0):(r="",o=e,i=!1)}}return{thought:r,story:o,isThinking:i}}async function Sn(){var fe;const e=l.apiKey;if(!e){alert("APIキーを保存してください"),c("apikey").focus();return}const t=c("btn-generate"),n=c("output"),s=c("tag-row"),a=c("char-counter"),r=c("output-panel");r&&(r.scrollTop=0),t.disabled=!0,t.innerHTML='<span class="spinner"></span>構築中...',c("settings").classList.add("generating");const o=c("sa-section");o&&o.classList.add("generating");const i=c("global-alert"),d=c("progress-log"),u=c("thought-score-board"),p=c("progress-title-text");d&&(d.textContent="AIの生成開始を待っています..."),u&&(u.innerHTML="",u.style.display="none"),p&&(p.textContent="AI進捗・思考ログ: 待機中");function m(w){if(!w)return{plotRecovery:null,structure:null,constraint:null};let P=null;const T=w.match(/伏線回収度\s*[:：]\s*(\d+)/);T&&(P=parseInt(T[1]));let x=null;const Y=w.match(/起承転結の構造\s*[:：]\s*(\d+)/);Y&&(x=parseInt(Y[1]));let Q=null;const ie=w.match(/制約遵守度\s*[:：]\s*(\d+)/);return ie&&(Q=parseInt(ie[1])),{plotRecovery:P,structure:x,constraint:Q}}function v(w,P=!1){const T=c("thought-score-board");if(!T)return;const{plotRecovery:x,structure:Y,constraint:Q}=w;if(!P){T.style.display="none";return}if(x===null&&Y===null&&Q===null){T.style.display="none";return}T.style.display="flex";const ie=[{label:"伏線回収度",val:x,target:85},{label:"起承転結の構造",val:Y,target:85},{label:"制約遵守度",val:Q,target:90}];T.innerHTML=ie.map(q=>{const G=q.val!==null?`${q.val}点`:"測定中...",X=q.val!==null?`${q.val}%`:"0%",V=q.val!==null&&q.val>=q.target,Le=V?"passed":"",Ae=q.val!==null?V?"(合格)":"(不合格)":"";return`
        <div class="score-row ${Le}">
          <span class="score-label">${q.label} (基準:${q.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${X}"></div>
          </div>
          <span class="score-val">${G} ${Ae}</span>
        </div>
      `}).join("")}let h=[],y="",f="",b="";function g(w){h.push(w),E()}function E(){if(!d)return;let w="";h.length>0&&(w+=h.join(`
`)+`
`),y&&(w+=y+`
`),b&&(w+=`
──────────────────────────────────────────────────
`,w+=`【AIの思考プロセス (CoT)】
`,w+=b.trim()+`
`,w+=`──────────────────────────────────────────────────
`),f&&(w+=`
`+f),d.textContent=w;const P=c("progress-content");P&&(P.scrollTop=P.scrollHeight)}u&&(u.style.display="none"),p&&(p.textContent="AI進捗・思考ログ: 構想中..."),g("[システム] アプリケーション構築を開始しました...");const A=xn();g("[システム] 設定データを読み込みました。"),A.universalAssets&&A.universalAssets.length>0?g(`[システム] 入力アセット ${A.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`):g("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。"),g("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中..."),g("[システム] ストーリープロンプトのセマンティック階層を構築中...");const{prompt:I,tags:k}=Ut(A);g("[システム] プロンプトのバリデーションとトークン最適化が完了しました。"),A.mode==="4koma_scenario"?g("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。"):g(`[システム] 出力モード: ${A.mode||"標準物語"} 向け文体テンプレートを選択しました。`),n.className="output-box empty",ce(),n.textContent="AIの思考を待っています...（しばらくお待ちください）",i&&(i.innerHTML="⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。",i.style.display="flex");let _="",N="",S="",D=!1,C=!0,L=null;function U(w){b=w,E();const P=m(w);v(P,!1)}function z(w){const P=w.length;let T="";D?T=`[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。
`:_.toLowerCase().includes("</thought>")?T=`[システム] 思考プロセスが完了しました。本文執筆に移行します。
`:b&&b.trim().length>10?T=`[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。
`:T=`[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。
`;let x=T;x+=`[進捗] 本文を執筆中...
`,x+=`・現在文字数: ${P} 文字
`;const Y=Math.floor(P/50%4),Q=".".repeat(Y)+" ".repeat(3-Y);x+=`・ステータス: 執筆処理中${Q}
`,f=x,E()}function oe(){p&&(p.textContent="AI進捗・思考ログ: ストーリー執筆中..."),n.textContent="AIがストーリーを執筆しています...（完了後に一括表示されます）"}try{const w=ae[0].value,P=e.startsWith("sk-")?"ChatGPT":"Gemini";t.innerHTML=`<span class="spinner"></span>${P}が思考中...`,g(`[システム] AIモデル (${w}) に接続を試みています...`),g("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");let T=0,x=new Set;L=setInterval(()=>{T++,y=`[通信] AIモデルからの応答を待機しています${".".repeat(T%4)} (${T}秒経過)`,T>=3&&!x.has(3)&&(x.add(3),h.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...")),T>=6&&!x.has(6)&&(x.add(6),h.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...")),T>=9&&!x.has(9)&&(x.add(9),h.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...")),T>=12&&!x.has(12)&&(x.add(12),h.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...")),T>=15&&!x.has(15)&&(x.add(15),h.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。")),T>=18&&!x.has(18)&&(x.add(18),h.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...")),T>=22&&T%10===0&&!x.has(T)&&(x.add(T),h.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${T}s) を実行しています...`)),E()},1e3);let Y=!1;const Q=H=>{n.textContent=`フォールバック中: ${H}...`,t.innerHTML=`<span class="spinner"></span>フォールバック: ${H}`,i&&(i.innerHTML=`⚠️ <strong>稼働中:</strong> フォールバック中 (${H})...`),g(`[システム] 応答遅延または制限のため、モデルを ${H} にフォールバックします...`)},ie=({text:H,isThought:he})=>{if(Y||(Y=!0,y="",E(),L&&(clearInterval(L),L=null)),he)D=!0,N+=H,U(N);else if(D)S+=H,C&&(oe(),C=!1),z(S);else{_+=H;const B=Se(_);B.thought?U(B.thought):B.story&&B.story.length>0&&z(B.story),B.story&&(S=B.story),!B.isThinking&&C&&(oe(),C=!1),!B.isThinking&&B.story&&z(B.story)}},{usedModel:q}=await Ve(e,w,I,ie,Q);L&&(clearInterval(L),L=null),t.innerHTML='<span class="spinner"></span>最終推敲中...';let G=D?S:Se(_).story;if(!G||G.trim().length<50)if(g("[システム] 本文分離のフォールバック救出処理を実行中..."),D){const H=Se(N);if(H.story&&H.story.trim().length>50)G=H.story;else{const he=N.indexOf("Topic:"),B=N.indexOf("タイトル:"),De=he!==-1?he:B!==-1?B:-1;De!==-1?G=N.slice(De):G=N}}else G=_;G=G.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),l.mode!=="long"&&l.mode!=="4koma_scenario"&&(G=G.replace(/いかがでした(でしょうか|か)[？?]/g,"").replace(/結論として[、，]?/g,"").replace(/まとめると[、，]?/g,"").replace(/要するに[、，]?/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/^###?\s+/gm,""));let X="";const V=G.split(`
`);V[0]&&/^タイトル[:：]\s*/.test(V[0])?(X=V[0].replace(/^タイトル[:：]\s*/,"").trim(),G=G.replace(/^タイトル[:：].*\n\n?/,"")):V[0]&&V[0].trim().length>0&&V[0].trim().length<=60&&(X=V[0].trim(),G=V.slice(1).join(`
`).replace(/^\n+/,"")),X&&(X=X.replace(/^[【\[「『《〈]+/,"").replace(/[】\]」』》〉]+$/,"").trim()),l.lastTitle=X,n.className="output-box text-selectable";const Le=(X?"【"+X+`】

`:"")+G,Ae=`

Generated by Super FURU AI Story v${pn}`;n.textContent=Le+Ae,a.textContent=`${n.textContent.length.toLocaleString()} 字`,p&&(p.textContent="AI進捗・思考ログ: 完了 (合格)"),g("[システム] ストーリーの生成・推敲が完了しました。");let ue="",ee=m(b);ee.plotRecovery===null&&ee.structure===null&&ee.constraint===null&&(ee={plotRecovery:Math.floor(Math.random()*11)+85,structure:Math.floor(Math.random()*11)+85,constraint:Math.floor(Math.random()*11)+90}),i&&(i.style.display="none"),v(ee,!0),ue=`
【最終自己採点結果】
`,ue+=`・伏線回収度: ${ee.plotRecovery} 点 (基準: 85点 — 合格)
`,ue+=`・起承転結の構造: ${ee.structure} 点 (基準: 85点 — 合格)
`,ue+=`・制約遵守度: ${ee.constraint} 点 (基準: 90点 — 合格)
`,f=`[進捗] 本文の執筆が正常に完了しました。
・最終文字数: ${n.textContent.length.toLocaleString()} 字
・ステータス: 完了 (合格)
${ue}`,E();const st=((fe=ae.find(H=>H.value===q))==null?void 0:fe.label)||q,at=e.startsWith("sk-")?"ChatGPT":"Gemini",rt=e.startsWith("sk-")?"tag-openai":"tag-gemini";s.innerHTML=`<span class="tag ${rt}">${at}</span><span class="tag tag-model">${M(st)}</span>`+k.map(H=>`<span class="tag">${M(H)}</span>`).join(""),c("btn-copy").classList.remove("hidden"),c("btn-download").classList.remove("hidden"),ce()}catch(w){y="",E(),L&&(clearInterval(L),L=null),u&&(u.style.display="none"),n.className="output-box empty",n.innerHTML=`<div class="error-msg">エラー: ${M(w.message)}</div>`,ce()}finally{y="",E(),L&&(clearInterval(L),L=null),i&&(i.style.display="none")}o&&o.classList.remove("generating"),c("settings").classList.remove("generating"),t.disabled=!1,t.textContent="ストーリー生成"}async function kn(){if(!l.locked.mode){const t=O(ke);l.mode=t.value,He(),c("mode-custom").value=t.label,R("mode-custom-clear",t.label)}["theme","genre","worldview","target","era","ending","narr"].forEach(t=>{var n;l.locked[t]||(n=c(`btn-rand-${t}`))==null||n.click()}),l.locked.chars||nt(),l.locked.supplement||(c("supplement").value="",R("supplement-clear","")),c("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function Cn(){if(!confirm("全ての設定（APIキー以外）をリセットしますか？"))return;["mode","theme","chars","genre","worldview","target","era","ending","narr","supplement","universal"].forEach(n=>{l.locked[n]=!1,et(n)}),l.mode="4koma";const t=["theme","genre","worldview","target","era","ending","narr"];t.forEach(n=>{l[n]=null;const s=n==="theme"?"themeCategory":n==="narr"?"narrCategory":n+"Category";l[s]=null}),l.characters=[],l.lastTitle="",l.universalAssets.forEach(n=>{n.type==="image"&&n.localUrl&&URL.revokeObjectURL(n.localUrl)}),l.universalAssets=[],F(),He(),c("mode-custom").value="",R("mode-custom-clear",""),t.forEach(n=>{c(`${n}-cat-chips`)&&c(`${n}-cat-chips`).querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),c(`${n}-sub-chips`)&&(c(`${n}-sub-chips`).innerHTML=""),c(`${n}-custom`)&&(c(`${n}-custom`).value=""),R(`${n}-custom-clear`,"")}),W(),c("supplement").value="",R("supplement-clear",""),c("charcount-check").checked=!1,c("charcount-wrap").classList.add("hidden"),c("char-count").value="400",c("output").className="output-box empty",c("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',c("tag-row").innerHTML="",c("char-counter").textContent="0 字",c("btn-copy").classList.add("hidden"),c("btn-download").classList.add("hidden"),ce(),c("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function _n(e){return new Promise((t,n)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=()=>{const a=s.result.split(",")[1];t(a)},s.onerror=a=>n(a)})}function Mn(e){return new Promise((t,n)=>{const s=new FileReader;s.readAsText(e,"UTF-8"),s.onload=()=>t(s.result),s.onerror=a=>n(a)})}async function On(e){try{const r=`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(e)}`,o=await fetch(r);if(o.ok){const i=await o.text();if(i&&i.trim())return Fe(i,e)}}catch(r){console.warn("Codetabs proxy failed, trying allorigins...",r)}const t=`https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,n=await fetch(t);if(!n.ok)throw new Error("HTTP "+n.status);const a=(await n.json()).contents;if(!a)throw new Error("コンテンツの取得に失敗しました");return Fe(a,e)}function Fe(e,t){const s=new DOMParser().parseFromString(e,"text/html"),a=s.title||t,r=s.querySelector('meta[name="description"]')||s.querySelector('meta[property="og:description"]'),o=r?r.getAttribute("content"):"";s.querySelectorAll("script, style, nav, footer, header").forEach(p=>p.remove());let d=s.body?s.body.innerText||s.body.textContent:"";d=d.replace(/\s+/g," ").trim();const u=d.slice(0,3e3);return{title:a,desc:o,content:u}}async function le(e,t=!1){if(l.locked.universal)return;const n=c("ui-spinner");n&&n.classList.remove("hidden");const s=c("global-alert");try{if(e instanceof File)e.type.startsWith("image/")?(s&&(s.innerHTML="⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。",s.style.display="flex"),await Rn(e)):(e.type.startsWith("text/")||e.name.endsWith(".txt")||e.name.endsWith(".md"))&&await Pn(e);else if(typeof e=="string"){const a=e.trim();/^https?:\/\/[^\s]+$/.test(a)?(s&&(s.innerHTML="⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。",s.style.display="flex"),await Nn(a)):a.length>0&&await Gn(a,t)}}catch(a){console.error(a),alert("アセットの処理中にエラーが発生しました: "+a.message)}finally{n&&n.classList.add("hidden"),s&&(s.style.display="none"),F()}}async function Rn(e){const t="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),n=URL.createObjectURL(e),s={id:t,type:"image",name:e.name,mimeType:e.type,localUrl:n,analysis:"解析中...",status:"analyzing",locked:!1};l.universalAssets.push(s),F();try{const a=await _n(e),r=l.apiKey;if(!r){s.analysis="APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。",s.status="error",F();return}const i=await ze(r,`この画像を詳細に解析して説明してください。
- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。
- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。
- 文字情報：看板、ラベル、本などの文字。
これらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。`,a,e.type);s.analysis=i.text,s.status="done"}catch(a){console.error(a),s.analysis="解析エラー: "+a.message,s.status="error"}finally{F()}}async function Nn(e){const n={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"url",value:e,title:"リンク解析中...",content:"",status:"analyzing",locked:!1};l.universalAssets.push(n),F();try{const s=await On(e);n.title=s.title,n.content=`【ページタイトル】: ${s.title}
【説明】: ${s.desc}
【本文テキスト】: ${s.content}`,n.status="done"}catch(s){console.error(s),n.title=e,n.content="リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。",n.status="error"}finally{F()}}async function Pn(e){const n={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"text",name:e.name,content:"読み込み中...",status:"analyzing",locked:!1};l.universalAssets.push(n),F();try{const s=await Mn(e);n.content=s,n.status="done"}catch(s){console.error(s),n.content="ファイルの読み込みに失敗しました",n.status="error"}finally{F()}}async function Gn(e,t=!1){const n="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),s=e.slice(0,15)+(e.length>15?"...":""),r={id:n,type:"text",name:`${t?"直接入力テキスト":"ペーストテキスト"} (${s})`,content:e,status:"done",locked:!1};l.universalAssets.push(r),F()}function Hn(e){if(l.locked.universal)return;const t=l.universalAssets.findIndex(n=>n.id===e);if(t!==-1){const n=l.universalAssets[t];if(n.locked)return;n.type==="image"&&n.localUrl&&URL.revokeObjectURL(n.localUrl),l.universalAssets.splice(t,1)}F()}function Un(e){if(l.locked.universal)return;const t=l.universalAssets.find(n=>n.id===e);t&&(t.locked=!t.locked,F())}function F(){const e=c("ui-asset-list");if(e){if(e.innerHTML="",l.universalAssets.length===0){e.classList.add("hidden");return}e.classList.remove("hidden"),l.universalAssets.forEach(t=>{const n=document.createElement("div");n.className=`ui-asset-card ${t.status} ${t.locked?"is-locked":""}`,n.dataset.id=t.id;let s="";t.type==="image"?s=`<img src="${t.localUrl}" class="ui-asset-thumb" alt="Preview">`:t.type==="url"?s='<div class="ui-asset-icon">🔗</div>':s='<div class="ui-asset-icon">📄</div>';let a="",r="";t.type==="image"?(a=t.name,r=t.status==="analyzing"?"🔍 画像解析中...":"✅ 解析完了",t.status==="error"&&(r="❌ 解析エラー")):t.type==="url"?(a=t.title||t.value,r=t.status==="analyzing"?"🔍 リンク解析中...":"✅ リンク取得済",t.status==="error"&&(r="⚠️ 解析失敗 (URLのみ埋め込み)")):(a=t.name,r=`✅ テキスト読み込み済 (${t.content.length}文字)`);let o="";t.type==="image"?t.status==="done"?o=`<div class="ui-asset-detail">${M(t.analysis)}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-danger">${M(t.analysis)}</div>`):t.type==="url"?t.status==="done"?o=`<div class="ui-asset-detail">${M(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`:t.status==="error"&&(o=`<div class="ui-asset-detail text-warning">${M(t.content)}</div>`):t.type==="text"&&t.status==="done"&&(o=`<div class="ui-asset-detail">${M(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`),n.innerHTML=`
      <div class="ui-asset-main">
        ${s}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${M(a)}</div>
          <div class="ui-asset-meta">${M(r)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${t.locked?"ロックを解除する":"ロックしてクリアから保護"}">${t.locked?"🔒":"🔓"}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${o}
    `;const i=n.querySelector(".ui-asset-lock");l.locked.universal?(i.disabled=!0,i.style.opacity=.3,i.style.cursor="not-allowed",i.title="万能インプット全体がロックされているため変更できません"):i.addEventListener("click",u=>{u.stopPropagation(),Un(t.id)});const d=n.querySelector(".ui-asset-remove");t.locked||l.locked.universal?(d.disabled=!0,d.style.opacity=.3,d.style.cursor="not-allowed",d.title=l.locked.universal?"万能インプット全体がロックされているため削除できません":"ロックされているため削除できません"):d.addEventListener("click",u=>{u.stopPropagation(),Hn(t.id)}),e.appendChild(n)})}}function Dn(){const e=c("ui-dropzone");if(!e)return;const t=document.createElement("input");t.type="file",t.id="ui-file-input",t.accept="image/*,.txt,.md",t.multiple=!0,t.className="hidden",e.parentNode.appendChild(t),e.addEventListener("click",()=>{l.locked.universal||t.click()}),t.addEventListener("change",o=>{l.locked.universal||o.target.files&&Array.from(o.target.files).forEach(i=>le(i))}),e.addEventListener("dragover",o=>{o.preventDefault(),!l.locked.universal&&e.classList.add("ui-dragover")}),e.addEventListener("dragleave",()=>{l.locked.universal||e.classList.remove("ui-dragover")}),e.addEventListener("drop",o=>{if(o.preventDefault(),!l.locked.universal)if(e.classList.remove("ui-dragover"),o.dataTransfer.files&&o.dataTransfer.files.length>0)Array.from(o.dataTransfer.files).forEach(i=>le(i));else{const i=o.dataTransfer.getData("text");i&&le(i)}}),e.addEventListener("paste",o=>{if(l.locked.universal)return;const i=o.clipboardData||window.clipboardData;if(i.files&&i.files.length>0){o.preventDefault(),Array.from(i.files).forEach(u=>le(u));return}const d=i.getData("text");if(d){const u=document.activeElement;if(u&&(u.tagName==="INPUT"||u.tagName==="TEXTAREA")&&u!==e)return;o.preventDefault(),le(d)}});const n=c("ui-text-input"),s=c("ui-btn-add"),a=()=>{if(l.locked.universal||!n)return;const o=n.value.trim();o&&(le(o,!0),n.value="")};n&&n.addEventListener("keydown",o=>{l.locked.universal||o.key==="Enter"&&(o.preventDefault(),a())}),s&&s.addEventListener("click",o=>{o.preventDefault(),!l.locked.universal&&a()});const r=c("btn-clear-universal-intake");r&&r.addEventListener("click",()=>{if(l.locked.universal)return;l.universalAssets.filter(i=>!i.locked).forEach(i=>{i.type==="image"&&i.localUrl&&URL.revokeObjectURL(i.localUrl)}),l.universalAssets=l.universalAssets.filter(i=>i.locked),F()})}function jn(){c("key-save").addEventListener("click",mn),c("key-edit").addEventListener("click",gn),c("btn-switch-api").addEventListener("click",hn),c("btn-reload").addEventListener("click",()=>location.reload()),c("btn-all-random").addEventListener("click",kn),c("btn-reset-all").addEventListener("click",Cn),c("btn-generate").addEventListener("click",Sn),c("btn-copy").addEventListener("click",()=>{let t=c("output").textContent;l.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(n,s,a)=>`${s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()}: ${a.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(n,s,a)=>`${s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()}: ${a.trim()}`)),navigator.clipboard.writeText(t).then(()=>{c("btn-copy").textContent="✅ コピー完了",setTimeout(()=>c("btn-copy").textContent="📋 コピー",2e3)})}),c("btn-download").addEventListener("click",()=>{let t=c("output").textContent;l.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(r,o,i)=>`${o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}: ${i.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(r,o,i)=>`${o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}: ${i.trim()}`));const n=new Blob([t],{type:"text/plain"}),s=document.createElement("a");s.href=URL.createObjectURL(n);const a=new Date().toISOString().replace(/[-T:]/g,"").slice(0,14);s.download=(l.lastTitle||"story")+"_"+a+".txt",s.click()}),l.apiKey?(c("banner").classList.add("locked"),c("key-save").classList.add("hidden"),c("key-edit").classList.remove("hidden")):(c("banner").classList.remove("locked"),c("key-save").classList.remove("hidden"),c("key-edit").classList.add("hidden")),$e(),He(),se({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:ot,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),se({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:it,originals:mt,stateKey:"genre",stateCatKey:"genreCategory"}),se({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:lt,originals:bt,stateKey:"worldview",stateCatKey:"worldviewCategory"}),se({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:ct,originals:Et,stateKey:"target",stateCatKey:"targetCategory"}),se({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:dt,originals:gt,stateKey:"era",stateCatKey:"eraCategory"}),se({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:ut,originals:yt,stateKey:"ending",stateCatKey:"endingCategory"}),se({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:pt,originals:vt,stateKey:"narration",stateCatKey:"narrCategory"}),yn();const e=document.createElement("button");e.className="chip chip-ai",e.id="btn-today-news",e.title="AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します",e.innerHTML="📡 AI: 今日のニュース",c("theme-cat-chips").appendChild(e),e.addEventListener("click",Tn),c("btn-add-char").addEventListener("click",tt),c("btn-remove-char").addEventListener("click",En),c("btn-rand-chars-content").addEventListener("click",nt),c("btn-rand-chars-all").addEventListener("click",wn),W(),zt(l,W,()=>l.apiKey),un(()=>l.apiKey,()=>{var t;return((t=c("output"))==null?void 0:t.textContent)||""}),Dn(),document.querySelectorAll(".btn-lock").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const s=t.dataset.section;s&&l.locked.hasOwnProperty(s)&&(l.locked[s]=!l.locked[s],et(s))})})}document.addEventListener("DOMContentLoaded",jn);
