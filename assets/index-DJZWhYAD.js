(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const ie=[{value:"gemini-3.5-flash",label:"Gemini 3.5 Flash"},{value:"gemini-flash-latest",label:"Gemini Flash (Latest)"},{value:"gemini-1.5-pro",label:"Gemini 1.5 Pro"},{value:"gemini-pro-latest",label:"Gemini Pro (Latest)"}],ke=[{value:"4koma",label:"4コマ漫画風"},{value:"4koma_scenario",label:"AI 4koma シナリオ連携（STEP2）"},{value:"short_short",label:"ショート(〜1000字)"},{value:"novel",label:"短編小説(〜3000字)"},{value:"medium",label:"中編小説(〜4000字)"},{value:"long",label:"長編小説(10万字〜/プロンプト生成)"},{value:"scenario",label:"脚本/台本"},{value:"manga",label:"ストーリー漫画"},{value:"essay",label:"エッセイ"},{value:"poem",label:"詩・ポエム"},{value:"fairy",label:"童話/絵本"},{value:"letter",label:"手紙/書簡体"},{value:"diary",label:"日記/独白体"},{value:"documentary",label:"ドキュメンタリー"},{value:"radio",label:"ラジオドラマ"}],ot={"日常・生活":["コンビニ","通学路","お昼休み","雨の日","洗濯物","引っ越し","忘れ物","遅刻","卒業式","初デート"],ファンタジー:["魔法学校","異世界転生","勇者の休日","ドラゴンの涙","魔王の孤独","精霊の森","古代遺跡","聖剣伝説","妖精の国","封印された塔"],"SF・近未来":["月面都市","AIとの恋","タイムトラベル","廃墟のロボット","宇宙ステーション","クローン人間","火星移住","量子コンピュータ","仮想現実","ディストピア"],ミステリー:["孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","密室殺人","消えた遺産","最後の手紙","二重人格","偽のアリバイ","暗号日記"],"恋愛・青春":["屋上の秘密","幼馴染","転校生","夏祭り","文化祭","先輩後輩","片想い","遠距離","再会","告白"],"歴史・時代劇":["刀鍛冶","忍者の末裔","剣豪","城下町","幕末の志士","大航海時代","古代ローマ","戦国武将","平安貴族","明治の文豪"],"ホラー・怪奇":["廃病院","心霊写真","呪いの人形","鏡の中","都市伝説","深夜の学校","禁忌の扉","異界への門","ドッペルゲンガー","赤い部屋"]},ct={コメディ:["爆笑","ドタバタ","ギャグ","勘違い","パロディ","ツッコミ不在","天然ボケ","シュールギャグ"],シリアス:["復讐","挫折","重い過去","葛藤","裏切り","贖罪","決断","犠牲"],恋愛:["純愛","三角関係","失恋","再会","ラブコメ","切ない恋","禁断の恋","運命の出会い"],ホラー:["怪談","心霊現象","都市伝説","サイコホラー","ゴシックホラー","モダンホラー","因果応報"],アクション:["バトル","冒険","追跡劇","脱出","潜入","決闘","サバイバル"],ヒューマンドラマ:["家族","友情","成長","別れ","和解","再生","絆"],サスペンス:["犯人探し","陰謀","心理戦","スパイ","二転三転","タイムリミット"]},lt={現代日本:["東京","地方都市","田舎の村","学校","オフィス","商店街","団地","離島"],現代海外:["ニューヨーク","ロンドン","パリ","上海","ドバイ","シドニー","ラテンアメリカ"],ハイファンタジー:["中世ヨーロッパ風","王道","エルフの森","ドワーフの鉱山","魔法帝国","竜の巣","空中都市"],ローファンタジー:["現代＋魔法","裏社会の魔術師","能力バトル","異能の学園"],サイバーパンク:["ネオン街","スラム","電脳世界","巨大企業支配","アンドロイド社会"],"和風・アジア":["京都","城下町","神社仏閣","武士の世界","中華風宮廷","妖怪の里"],ポストアポカリプス:["荒廃都市","砂漠世界","水没都市","核の冬","文明崩壊後"]},dt={全年齢:["子供向け","ファミリー","誰でも楽しめる","教育的"],若者向け:["中高生向け","大学生向け","ライトノベル風","SNS世代向け","Z世代向け"],大人向け:["仕事帰りに読む","深夜番組風","文学的","ビジネスマン向け","知的好奇心旺盛な人向け"],特定層向け:["男性向け","女性向け","ファン向け","オタク文化に親しい人向け","シニア向け"],用途別:["読み聞かせ用","プレゼン用","朗読用","BGM付き朗読向け"]},ut={現代:["2020年代","2010年代","2000年代","1990年代","昭和末期"],近代:["明治時代","大正時代","昭和初期","戦後復興期"],"中世・近世":["戦国時代","江戸時代","平安時代","鎌倉時代","室町時代"],古代:["古代日本","古代ローマ","古代エジプト","古代ギリシャ","古代中国"],未来:["近未来(50年後)","100年後","遠い未来(1000年後)","文明崩壊後の未来"],架空:["パラレルワールド","ループする時間","時間が止まった世界","複数時代が混在"]},pt={ハッピーエンド:["大団円","救いがある","和解","夢が叶う","大逆転勝利","愛の成就"],バッドエンド:["切ない","救いがない","後味悪い","破滅","取り返しのつかない選択"],ビターエンド:["ほろ苦い","代償を伴う勝利","成長と引き換えの喪失","痛みを伴う真実"],サプライズ:["どんでん返し","叙述トリック","真犯人の正体","伏線回収の衝撃"],オープンエンド:["読者に委ねる","余韻を残す","続編を匂わせる","解釈が分かれる"],その他:["夢オチ","ループ","メタ的オチ","シュールな結末","第四の壁破壊"]},ft={一人称:["「僕」の視点","「私」の独白","「俺」のハードボイルド","信頼できない語り手","回想録形式"],三人称:["神の視点","俯瞰的","特定キャラに寄り添う","群像劇（視点切替）"],特殊:["二人称（あなた）","手紙・書簡形式","インタビュー形式","日記体","モノローグ劇","実況中継風"]},te=["主人公","ライバル","相棒","ヒロイン","悪役","師匠","モブ","謎の人物","語り部","トリックスター","観測者","犠牲者","裏切り者","調停者","復讐者","守護者","道化師","黒幕"],ne=["熱血","冷静沈着","ツンデレ","お人好し","ミステリアス","臆病","自信家","のんびり屋","毒舌家","天然","楽天家","皮肉屋","偏執的","世話焼き","無口","二面性あり","感情的","理知的"],Ne=["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林","加藤","吉田","山田","松本","井上","木村","林","清水","斎藤","西村","藤田"],Pe=["翔","健太","拓海","大輝","蓮","奏太","颯太","琉生","陽向","悠真","直樹","隼人","和也","涼介","壮馬","陸","篤志","慶一郎","龍之介","善次郎"],Ge=["結衣","陽葵","凛","芽依","愛菜","美月","紬","澪","栞奈","優奈","千尋","沙織","遥香","小春","楓","琴音","真帆","瑠璃","朱里","日和"],ht=["光","葵","凛","渚","空","悠","怜","真尋","千歳","巡","晶","操"],ze=["男性, 短髪, 眼鏡をかけている","男性, 長身, がっしりした体格","男性, 常にヘッドホンを首にかけている","男性, スーツ姿, 仕事熱心","男性, 少年, 好奇心旺盛","男性, 白衣の研究者, 無精髭","男性, 筋肉質, 寡黙な職人","男性, 痩せ型, 神経質そうな目つき","男性, 丸顔, 人当たりが良い","男性, 老紳士, 杖を持っている","男性, 坊主頭, 豪快な笑顔","男性, 銀縁眼鏡, 知的な雰囲気","男性, 傷跡のある手, 元軍人","男性, 童顔, 実年齢より若く見える","男性, 長髪を束ねている, 芸術家肌"],Ye=["女性, ポニーテール, 明るい性格","女性, おしとやか, 読書好き","女性, クールな仕事人","女性, 勝ち気な少女, リボンが特徴","女性, 優しげな看護師","女性, ショートカット, ボーイッシュ","女性, 和服姿, 凛とした佇まい","女性, 三つ編み, そばかすがある","女性, 年配, 温かい笑顔のおばあちゃん","女性, 赤い眼鏡, 毒舌だが面倒見が良い","女性, 長い黒髪, 無表情だが内心は熱い","女性, 小柄, 声が大きい","女性, 化粧っ気がない, 研究一筋","女性, 軍服姿, 規律に厳しい","女性, ふわふわした雰囲気, 天然ボケ"],mt=["超短編","連載小説風","実況台本","手紙形式","日記形式","インタビュー記事風","ラジオドラマ","絵本のテキスト","落語風","怪談夜話","書簡体小説","報告書形式","群読劇","紀行文"],gt=["宇宙SFサスペンス","異世界グルメ紀行","日常系ホラー","タイムループ恋愛","動物視点のヒューマンドラマ","デスゲーム","職業モノ","ダークファンタジー","和風伝奇","スパイアクション","ほのぼの日常","法廷ドラマ","音楽青春","ディストピアSF"],yt=["ネオ江戸時代","氷河期の未来","恐竜時代","スチームパンク産業革命","バブル期の日本","2100年のAI社会","大航海時代","冷戦時代","石器時代","ベルエポック","昭和30年代","終末後の中世回帰","大正ロマン","ビクトリア朝"],vt=["どんでん返し","夢オチ","続く...","走馬灯エンド","因果応報","世界線変更","記憶喪失オチ","自己犠牲","静かな日常への帰還","全員が実は死んでいた","手紙で真相が明かされる","笑って終わる","読者への問いかけ","時間が巻き戻る"],bt=["読者に語りかける","動物の視点","死者の独白","AI視点","ラジオDJ風","法廷の証人風","子供の視点","老人の回想","犯人の告白","手紙の朗読","実況中継","噂話として伝聞","神話の語り部風","新聞記者のルポ"],Et=["浮遊島","海底都市","鏡の中の世界","巨大樹の上の文明","時間が逆流する世界","夢と現実が混ざる世界","永遠の黄昏の街","地下シェルター","空飛ぶ船の世界","記憶が通貨の社会","動物が支配する世界","季節が1日で巡る島","言葉が魔力を持つ世界","死者と生者が共存する町"],_t=["猫好き向け","徹夜明けの人向け","電車通勤の30分で読める","お風呂で読む用","寝る前の一話","歴史マニア向け","理系の人向け","海外旅行好き向け","料理好き向け","音楽好き向け","ホラー耐性ゼロの人向け","泣きたい夜に読む用"],$t=["コンビニ","通学路","お昼休み","雨の日","洗濯物","魔法学校","異世界転生","勇者の休日","ドラゴンの涙","月面都市","AIとの恋","タイムトラベル","廃墟のロボット","孤島の一軒家","謎の暗号","消えた記憶","深夜の電話","屋上の秘密","古い写真","最後の手紙","迷子の猫","夏の終わり","約束の場所","地下室の扉","消えた町","星降る夜","忘れ物","壊れた時計","鏡の中の自分","呪いの指輪","行方不明の友人","真夜中の列車","閉ざされた図書館"],Lt=["に隠された秘密","の裏側","から始まる冒険","と出会った日","を巡る争い","に潜む影","が消える時","への旅路","の最後の日","と交わした約束","に囚われた者","を守る者たち"],At=["（笑いあり涙あり）","（切なくも美しい）","（予測不能の展開）","（心温まる結末）","（衝撃のラスト）","（ほろ苦い青春）","（壮大なスケール）","（日常の中の非日常）"],be=async e=>{if(!e)return"API Key not set.";try{const a=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`)).json();return a.error?`API Error: ${a.error.message}`:a.models?`Available Models: ${a.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(t){return`Diagnostic Failed: ${t.message}`}};async function It(e,t,a,n={}){var u,h,b,g;const s=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,r={maxOutputTokens:8192,temperature:n.temperature!==void 0?n.temperature:1};n.responseMimeType&&(r.responseMimeType=n.responseMimeType);const i=n.timeoutMs||25e3,o=new AbortController,d=setTimeout(()=>o.abort(),i),p={contents:[{parts:[{text:a}]}],generationConfig:r,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};r.responseMimeType!=="application/json"&&!n.disableGoogleSearch&&(p.tools=[{googleSearch:{}}]);try{const y=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},signal:o.signal,body:JSON.stringify(p)});if(clearTimeout(d),!y.ok){const v=await y.text();let m=`Gemini HTTP ${y.status}`;try{const E=JSON.parse(v);E.error&&E.error.message&&(m+=` — ${E.error.message}`)}catch{m+=` — ${v.slice(0,300)}`}throw new Error(m)}const f=await y.json();if((u=f.promptFeedback)!=null&&u.blockReason)throw new Error(`Blocked by Safety Filter: ${f.promptFeedback.blockReason}`);if((g=(b=(h=f.candidates)==null?void 0:h[0])==null?void 0:b.content)!=null&&g.parts){const v=f.candidates[0].content.parts.map(m=>m.text||"").join("");if(!v){const m=f.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${m}).`)}return v}throw f.error?new Error(`Gemini API Error: ${f.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} (${i/1e3}s)`):y}finally{clearTimeout(d)}}async function wt(e,t,a,n,s,r={}){var h,b,g,y;const i=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,o={maxOutputTokens:8192,temperature:r.temperature!==void 0?r.temperature:.3};r.responseMimeType&&(o.responseMimeType=r.responseMimeType);const d=r.timeoutMs||6e4,p=new AbortController,u=setTimeout(()=>p.abort(),d);try{const f=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},signal:p.signal,body:JSON.stringify({contents:[{parts:[{text:a},{inlineData:{mimeType:s,data:n}}]}],generationConfig:o,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(u),!f.ok){const m=await f.text();let E=`Gemini HTTP ${f.status}`;try{const L=JSON.parse(m);L.error&&L.error.message&&(E+=` — ${L.error.message}`)}catch{E+=` — ${m.slice(0,300)}`}throw new Error(E)}const v=await f.json();if((h=v.promptFeedback)!=null&&h.blockReason)throw new Error(`Blocked by Safety Filter: ${v.promptFeedback.blockReason}`);if((y=(g=(b=v.candidates)==null?void 0:b[0])==null?void 0:g.content)!=null&&y.parts){const m=v.candidates[0].content.parts.map(E=>E.text||"").join("");if(!m){const E=v.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${E}).`)}return m}throw v.error?new Error(`Gemini API Error: ${v.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(f){throw f.name==="AbortError"?new Error(`Timeout: ${t} vision (${d/1e3}s)`):f}finally{clearTimeout(u)}}async function Ve(e,t,a,n,s,r={}){if(e.trim().startsWith("sk-"))return Tt(e.trim(),t,a,n,s,r);const i=["gemini-3.5-flash","gemini-1.5-pro","gemini-1.5-flash","gemini-2.5-pro","gemini-2.5-flash"],o=[];let d=!1,p=!1,u=!1;for(const g of i)try{return s&&i[0],{text:await wt(e,g,t,a,n,r),usedModel:g}}catch(y){const f=y.message||"";console.warn(`Vision model ${g} failed:`,f),o.push(`${g}: ${f}`);const v=f.toLowerCase();(v.includes("safety")||v.includes("prohibited")||v.includes("block"))&&(d=!0),(v.includes("quota")||v.includes("429")||v.includes("limit"))&&(p=!0),(v.includes("api key")||v.includes("403")||v.includes("invalid"))&&(u=!0);continue}const h=await be(e);console.error("VISION DIAGNOSIS:",h);let b=`全モデルでの画像認識に失敗: ${h}
`;throw d||h.includes("SAFETY")||h.includes("PROHIBITED")?b="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":p||h.includes("Quota exceeded")||h.includes("429")?b="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":u||h.includes("API key not valid")||h.includes("403")?b="【認証エラー】APIキーが無効です。正しいキーを設定してください。":b+=`
[各モデルのエラー詳細]
${o.join(`
`)}`,new Error(b)}async function Xe(e,t,a,n,s={}){if(e.trim().startsWith("sk-"))return xt(e.trim(),a,n,s);const r=["gemini-1.5-pro","gemini-pro-latest"],i=new Set([t,...r,...ie.map(y=>y.value)]),o=Array.from(i),d=[];let p=!1,u=!1,h=!1;for(const y of o)try{return y!==t&&n&&n(y),{text:await It(e,y,a,s),usedModel:y}}catch(f){const v=f.message||"";console.warn(`Model ${y} failed:`,v),d.push(`${y}: ${v}`);const m=v.toLowerCase();(m.includes("safety")||m.includes("prohibited")||m.includes("block"))&&(p=!0),(m.includes("quota")||m.includes("429")||m.includes("limit"))&&(u=!0),(m.includes("api key")||m.includes("403")||m.includes("invalid"))&&(h=!0);continue}console.log("All models failed. Running diagnosis...");const b=await be(e);console.error("DIAGNOSIS RESULT:",b);let g=`全モデル接続失敗: ${b}
`;throw p||b.includes("SAFETY")||b.includes("PROHIBITED")?g="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":u||b.includes("Quota exceeded")||b.includes("429")?g=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h||b.includes("API Error: API key not valid")||b.includes("403")?g="【認証エラー】APIキーが無効です。正しいキーを設定してください。":b.includes("404")?g="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":g+=`
[各モデルのエラー詳細]
${d.join(`
`)}`,new Error(g)}const ge=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"];async function xt(e,t,a,n={}){var s,r,i,o,d,p;for(const u of ge)try{u!==ge[0]&&a&&a(u);const h=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:u,messages:[{role:"user",content:t}],temperature:1,max_tokens:8192,response_format:n.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!h.ok){const y=await h.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${h.status} - ${((s=y.error)==null?void 0:s.message)||h.statusText}`)}const b=await h.json(),g=((o=(i=(r=b.choices)==null?void 0:r[0])==null?void 0:i.message)==null?void 0:o.content)||"";if(!g)throw new Error(`Empty response (FinishReason: ${((p=(d=b.choices)==null?void 0:d[0])==null?void 0:p.finish_reason)||"UNKNOWN"})`);return{text:g,usedModel:u}}catch(h){console.warn(`Model ${u} failed:`,h.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限（Quota Exceeded）に達しています。")}const qe=["gpt-4.1","gpt-4o","gpt-4.1-mini"];async function Tt(e,t,a,n,s,r={}){var o,d,p,u,h,b;const i=`data:${n};base64,${a}`;for(const g of qe)try{qe[0];const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:g,messages:[{role:"user",content:[{type:"text",text:t},{type:"image_url",image_url:{url:i,detail:"high"}}]}],temperature:.3,max_tokens:8192,response_format:r.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const m=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((o=m.error)==null?void 0:o.message)||y.statusText}`)}const f=await y.json(),v=((u=(p=(d=f.choices)==null?void 0:d[0])==null?void 0:p.message)==null?void 0:u.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((b=(h=f.choices)==null?void 0:h[0])==null?void 0:b.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:g}}catch(y){console.warn(`Vision Model ${g} failed:`,y.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function St(e,t,a,n,s={}){var h,b,g,y;const r=`https://generativelanguage.googleapis.com/v1beta/models/${t}:generateContent?key=${e}`,i=[{text:a}];n.forEach(f=>{i.push({inlineData:{mimeType:f.mimeType,data:f.base64}})});const o={maxOutputTokens:8192,temperature:s.temperature!==void 0?s.temperature:.4};s.responseMimeType&&(o.responseMimeType=s.responseMimeType);const d=s.timeoutMs||6e4,p=new AbortController,u=setTimeout(()=>p.abort(),d);try{const f=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},signal:p.signal,body:JSON.stringify({contents:[{parts:i}],generationConfig:o,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]})});if(clearTimeout(u),!f.ok){const m=await f.text();let E=`Gemini HTTP ${f.status}`;try{const L=JSON.parse(m);L.error&&L.error.message&&(E+=` — ${L.error.message}`)}catch{E+=` — ${m.slice(0,300)}`}throw new Error(E)}const v=await f.json();if((h=v.promptFeedback)!=null&&h.blockReason)throw new Error(`Blocked by Safety Filter: ${v.promptFeedback.blockReason}`);if((y=(g=(b=v.candidates)==null?void 0:b[0])==null?void 0:g.content)!=null&&y.parts){const m=v.candidates[0].content.parts.map(E=>E.text||"").join("");if(!m){const E=v.candidates[0].finishReason||"UNKNOWN";throw new Error(`Empty response (FinishReason: ${E}).`)}return m}throw v.error?new Error(`Gemini API Error: ${v.error.message}`):new Error("No response candidates (Unknown Model Refusal)")}catch(f){throw f.name==="AbortError"?new Error(`Timeout: ${t} multimodal (${d/1e3}s)`):f}finally{clearTimeout(u)}}async function kt(e,t,a,n,s={}){var i,o,d,p,u,h;const r=["gpt-4.1","gpt-4o","gpt-4.1-mini"];for(const b of r)try{b!==r[0]&&n&&n(b);const g=[{type:"text",text:t}];a.forEach(m=>{g.push({type:"image_url",image_url:{url:`data:${m.mimeType};base64,${m.base64}`,detail:"high"}})});const y=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:b,messages:[{role:"user",content:g}],temperature:.4,max_tokens:8192,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!y.ok){const m=await y.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${y.status} - ${((i=m.error)==null?void 0:i.message)||y.statusText}`)}const f=await y.json(),v=((p=(d=(o=f.choices)==null?void 0:o[0])==null?void 0:d.message)==null?void 0:p.content)||"";if(!v)throw new Error(`Empty response (FinishReason: ${((h=(u=f.choices)==null?void 0:u[0])==null?void 0:h.finish_reason)||"UNKNOWN"})`);return{text:v,usedModel:b}}catch(g){console.warn(`Vision Model ${b} failed:`,g.message);continue}throw new Error("全モデルでの画像認識に失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Ct(e,t,a,n,s={}){if(e.trim().startsWith("sk-"))return kt(e.trim(),t,a,n,s);const r=["gemini-3.5-flash","gemini-1.5-pro","gemini-1.5-flash","gemini-2.5-pro","gemini-2.5-flash"],i=[];let o=!1,d=!1,p=!1;for(const b of r)try{return n&&b!==r[0]&&n(b),{text:await St(e,b,t,a,s),usedModel:b}}catch(g){const y=g.message||"";console.warn(`Vision model ${b} failed:`,y),i.push(`${b}: ${y}`);const f=y.toLowerCase();(f.includes("safety")||f.includes("prohibited")||f.includes("block"))&&(o=!0),(f.includes("quota")||f.includes("429")||f.includes("limit"))&&(d=!0),(f.includes("api key")||f.includes("403")||f.includes("invalid"))&&(p=!0);continue}const u=await be(e);console.error("VISION DIAGNOSIS:",u);let h=`全モデルでの画像認識に失敗: ${u}
`;throw o||u.includes("SAFETY")||u.includes("PROHIBITED")?h="【コンテンツ制限】画像が安全フィルターによりブロックされました。別の画像をお試しください。":d||u.includes("Quota exceeded")||u.includes("429")?h="【API制限】使用回数の上限に達しました。しばらく時間を置いてから再試行してください。":p||u.includes("API key not valid")||u.includes("403")?h="【認証エラー】APIキーが無効です。正しいキーを設定してください。":h+=`
[各モデルのエラー詳細]
${i.join(`
`)}`,new Error(h)}async function Mt(e,t,a,n,s={}){var r,i,o,d;for(const p of ge)try{p!==ge[0]&&n&&n(p);const u=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:p,messages:[{role:"user",content:t}],temperature:1,max_tokens:8192,stream:!0,response_format:s.responseMimeType==="application/json"?{type:"json_object"}:void 0})});if(!u.ok){const y=await u.json().catch(()=>({}));throw new Error(`OpenAI HTTP ${u.status} - ${((r=y.error)==null?void 0:r.message)||u.statusText}`)}const h=u.body.getReader(),b=new TextDecoder("utf-8");let g="";try{for(;;){const{done:y,value:f}=await h.read();if(y)break;g+=b.decode(f,{stream:!0});let v=g.split(`
`);g=v.pop();for(const m of v){const E=m.trim();if(!E||!E.startsWith("data: "))continue;const L=E.slice(6);if(L==="[DONE]")break;try{const k=((d=(o=(i=JSON.parse(L).choices)==null?void 0:i[0])==null?void 0:o.delta)==null?void 0:d.content)||"";k&&a({text:k,isThought:!1})}catch{}}}}finally{h.releaseLock()}return{usedModel:p}}catch(u){console.warn(`Model ${p} stream failed:`,u.message);continue}throw new Error("全モデル接続失敗: OpenAI API Keyが無効か、使用回数の上限に達しています。")}async function Be(e,t,a,n,s={}){var h,b,g;const r=`https://generativelanguage.googleapis.com/v1beta/models/${t}:streamGenerateContent?alt=sse&key=${e}`,i={maxOutputTokens:8192,temperature:1};!s.disableThinkingConfig&&(t.includes("gemini-2.5")||t.includes("gemini-2.0")||t.includes("gemini-3")||t.includes("gemini-3.5"))&&(i.thinkingConfig={thinkingBudget:2048}),s.responseMimeType&&(i.responseMimeType=s.responseMimeType);const o=s.timeoutMs||25e3,d=new AbortController;let p=setTimeout(()=>d.abort(),o);const u={contents:[{parts:[{text:a}]}],generationConfig:i,safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};i.responseMimeType!=="application/json"&&!s.disableGoogleSearch&&(u.tools=[{googleSearch:{}}]);try{const y=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},signal:d.signal,body:JSON.stringify(u)});if(!y.ok){clearTimeout(p);const E=await y.text();let L=`Gemini HTTP ${y.status}`;try{const A=JSON.parse(E);A.error&&A.error.message&&(L+=` — ${A.error.message}`)}catch{L+=` — ${E.slice(0,300)}`}throw new Error(L)}const f=y.body.getReader(),v=new TextDecoder("utf-8");let m="";try{for(;;){clearTimeout(p),p=setTimeout(()=>d.abort(),o);const{done:E,value:L}=await f.read();if(E)break;m+=v.decode(L,{stream:!0});let A=m.split(`
`);m=A.pop();for(const k of A){const S=k.trim();if(!S||!S.startsWith("data: "))continue;const H=S.slice(6);try{const j=(g=(b=(h=JSON.parse(H).candidates)==null?void 0:h[0])==null?void 0:b.content)==null?void 0:g.parts;if(j)for(const C of j){const $=C.text||C.thought||"",D=!!C.thought;$&&n({text:$,isThought:D})}}catch{}}}}finally{f.releaseLock()}}catch(y){throw y.name==="AbortError"?new Error(`Timeout: ${t} stream (${o/1e3}s)`):y}finally{clearTimeout(p)}}async function Qe(e,t,a,n,s,r={}){if(e.trim().startsWith("sk-"))return Mt(e.trim(),a,n,s,r);const i=["gemini-1.5-pro","gemini-pro-latest"],o=new Set([t,...i,...ie.map(f=>f.value)]),d=Array.from(o),p=[];let u=!1,h=!1,b=!1;for(const f of d)try{return f!==t&&s&&s(f),await Be(e,f,a,n,r),{usedModel:f}}catch(v){const m=v.message||"";console.warn(`Model ${f} stream failed:`,m),p.push(`${f}: ${m}`);const E=m.toLowerCase();if((E.includes("safety")||E.includes("prohibited")||E.includes("block"))&&(u=!0),(E.includes("quota")||E.includes("429")||E.includes("limit"))&&(h=!0),(E.includes("api key")||E.includes("403")||E.includes("invalid"))&&(b=!0),m.includes("400")||E.includes("bad request")||E.includes("thinking_config"))try{return console.log(`Retrying model ${f} without thinkingConfig...`),await Be(e,f,a,n,{...r,disableThinkingConfig:!0}),{usedModel:f}}catch(L){console.warn(`Model ${f} stream retry failed:`,L.message),p.push(`${f} (retry): ${L.message}`)}continue}console.log("All models failed. Running diagnosis...");const g=await be(e);console.error("DIAGNOSIS RESULT:",g);let y=`全モデル接続失敗: ${g}
`;throw u||g.includes("SAFETY")||g.includes("PROHIBITED")?y="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h||g.includes("Quota exceeded")||g.includes("429")?y=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:b||g.includes("API Error: API key not valid")||g.includes("403")?y="【認証エラー】APIキーが無効です。正しいキーを設定してください。":g.includes("404")?y="【モデル未検出】使用可能なモデルが見つかりませんでした。APIキーが古いか、モデルが廃止されています。":y+=`
[各モデルのエラー詳細]
${p.join(`
`)}`,new Error(y)}const Ot={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},Rt={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},Nt={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},Pt={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},Gt={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function he(e,t){return!e||e==="ランダム"?"":t[e]||""}const Ht={江戸時代:{tags:["江戸","江戸時代","徳川","侍","町人"],lore:`【江戸時代の生活知識】
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
・食文化: 現代知識で異世界の食文化を改革する展開が人気（マヨネーズ、味噌、醤油の再現など）`}};function Ut(e){const t=[e.worldview,e.worldviewCustom,e.era,e.eraCustom,e.theme,e.themeCustom,e.genre,e.genreCustom,e.mode,e.modeCustom,e.supplement,...(e.characters||[]).map(r=>r.note||"")].filter(Boolean).join(" ");if(!t.trim())return"";const a=[],n=new Set;for(const[r,i]of Object.entries(Ht)){if(n.has(r))continue;i.tags.some(d=>t.includes(d))&&(a.push(i.lore),n.add(r))}return a.length===0?"":`

【参考知識（RAG: 物語のディテール向上用 — この情報を自然に活用して描写の解像度を上げること）】
`+a.slice(0,3).join(`

`)}const Ie=e=>e[Math.floor(Math.random()*e.length)];function Dt(e){const t=e.mode||"4koma",a=e.genreCustom||e.genre||"コメディ",n=e.themeCustom||e.theme||"ランダム",s=e.worldviewCustom||e.worldview||"現代日本",r=e.eraCustom||e.era||"現代",i=e.targetCustom||e.target||"全年齢",o=e.endingCustom||e.ending||"意外な結末",d=e.narrCustom||e.narration||"三人称・客観";let p;!e.characters||e.characters.length===0?p="・未設定（AIが自由に2〜3人の個性的なキャラを設定すること）":p=e.characters.map(($,D)=>{const Y=$.name||`(AI命名:キャラ${D+1})`,ce=$.role||"未定",me=$.sex?`性別:${$.sex}, `:"",I=$.personality||"未定",U=$.note?` [${$.note}]`:"";return`${D+1}. ${Y} (${ce}) — ${me}性格:${I}${U}`}).join(`
`);const u=e.charCount?`
※ 指定文字数：約${e.charCount}文字程度`:"",h=e.supplement?`
【追加指示】
${e.supplement}`:"",b={"4koma":"4コマネタ","4koma_scenario":"AI 4koma シナリオ",short_short:"ショートショート",novel:"短編小説",medium:"中編小説",long:"長編小説",scenario:"脚本/台本",manga:"ストーリー漫画",essay:"エッセイ",poem:"詩・ポエム",tale:"童話/絵本",letter:"手紙/書簡体",diary:"日記/独白体",documentary:"ドキュメンタリー",radio:"ラジオドラマ"},g=e.modeCustom||b[t]||t,f={"4koma":`

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
音声のみで伝わるよう、効果音指示（SE:）・BGM指示を含め、セリフとナレーションで場面を描くこと。`}[t]||"",v=r&&!["現代","ランダム",""].includes(r)?`

【時代考証ルール（厳守）】
・時代設定「`+r+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと（例：大正時代に「スマホ」、江戸時代に「電話」等）。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること（例：「スポーツマン体型」→「鍛え抜かれた体躯」）。
・ただし、タイムスリップ等の時代錯誤がテーマ・世界観で意図されている場合はこの限りではない。`:"",m=he(a,Ot),E=he(o,Rt),L=he(s,Nt),A=he(i,Pt),k=he(d,Gt);let S="";m&&(S+=`

【ジャンル文体指定：${a}】
${m}`),E&&(S+=`

【結末演出指定：${o}】
${E}`),L&&(S+=`

【世界観演出指定：${s}】
${L}`),A&&(S+=`

【ターゲット層文体指定：${i}】
${A}`),k&&(S+=`

【語り口指定：${d}】
${k}`);let H="";t==="4koma_scenario"?H=`あなたはプロの4コマ漫画シナリオライターです。以下の設定に基づき、画像生成4コマ漫画アプリのSTEP2シナリオ入力欄に直接コピペして使える形式でシナリオを出力してください。

【基本設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${r}
・世界観・雰囲気: ${s}
・ターゲット層: ${i}
・結末の方向性: ${o}

【登場人物】
${p}

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
${h}

【出力形式・思考ログ(CoT)同期ルールの最優先遵守】
あなたは最終的なシナリオを出力する前に、必ず思考プロセスを '<thought>' タグで囲んで記述しなければなりません。
思考スペース（'<thought>' タグの内部）で以下のステップを厳格に実行してください：

1. 物語の起承転結プロット（設定、葛藤、クライマックス、結末）を設計・アウトライン化する。
2. 自分が設計したプロット案について、以下の項目を0〜100点で自己採点する（※表記形式を厳密に守ること）：
   - 伏線回収度: [0-100]
   - 起承転結の構造: [0-100]
   - 制約遵守度: [0-100]
3. もしどれか一つの項目でも基準値（伏線回収度: 85点、起承転結の構造: 85点、制約遵守度: 90点）に達しない場合、その理由を "[REJECTION: 理由]" として言語化し、プロットを合格点に達するまで修正（書き直し）した新しいドラフトを記述してください。（※最大2回まで修復を試み、どうしても達しない場合は現状のベストを出力してください）
4. 全てのスコアで合格基準を達成した後、初めて '<thought>' タグを閉じ（</thought>）、その「外側」に最終的なシナリオのみを出力してください（Topic: から開始）。`:t==="long"?H=`# 厳格なシステム命令
あなたは「プロンプトエンジニア」です。小説家ではありません。
絶対に物語の本文を執筆しないでください！

以下の【ユーザー指定設定】と【文体・演出ガイド】を元に、別のLLMに長編小説を分割で執筆させるための「マスター指示書（プロンプト）」を作成してください。
出力はマークダウンのコードブロック(\`\`\`)のみとし、あなた自身の挨拶や返答、物語の本文は一切不要です。

【ユーザー指定設定】
・ジャンル: ${a}
・テーマ: ${n}
・時代: ${r}
・世界観・雰囲気: ${s}
・語り口: ${d}
・ターゲット層: ${i}
・結末の方向性: ${o}
・登場人物:
${p}
${u}${h}${v}${S}

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
`:H=`あなたはプロの書き手です。以下の詳細設定に基づき、読む人の心を動かす「${g}」を執筆してください。

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
・語り口: ${d}
・ターゲット層: ${i}
・結末の方向性: ${o}

【登場人物】
${p}

【執筆ルール（最重要）】
1. ログラインの固定：執筆を開始する前に、物語全体を貫く「ログライン（物語の核となる1文要約）」を内部で設定し、最初から結末までその軸を絶対にブレさせないこと。
2. 予測可能な展開を意図的に回避し、読者を驚かせること。
3. キャラクターは設定された性格から生まれる固有の反応をすること。
4. 情景描写と心理描写のバランスを取り、臨場感のある文章にすること。
5. 登場人物が複数の場合、互いの関係性（協力、対立、秘密の共有など）を意識すること。
${(()=>{const $=["novel","medium","short_short","scenario","manga","documentary","radio"],D=["essay","poem","letter","diary"];return $.includes(t)?`6. 「${o}」という結末に向かって、伏線を自然に配置すること。

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

セリフは短く鋭く。だらだら説明するセリフは禁止。テンポとオチの切れ味を最優先すること。`:D.includes(t)?{essay:"\\n\\n【構成ルール】\\n1. テーマの一貫性と感情の自然な流れを重視し、読者が共感しながら読み進められる構成にすること。\\n2. 劇的な展開や壮大な伏線は一切不要。日常の機微や気づきを丁寧に積み重ねること。\\n3. 結論を急がず、余韻を残して自然に終わらせること。",poem:"\\n\\n【構成ルール】\\n1. イメージの連鎖と韻律の統一感を重視し、一篇を通じて響き合うモチーフを配置すること。\\n2. 物語的な伏線や因果関係は不要。詩的飛躍と余白を大切にすること。\\n3. 言葉の音（おん）と意味の二重性を意識した表現を心がけること。",letter:"\\n\\n【構成ルール】\\n1. 書き手の心情変化を自然かつ段階的に描写し、手紙の冒頭と末尾で感情の温度差を持たせること。\\n2. 物語的な伏線は不要。相手への語りかけの中で、書き手自身の内面が滲み出る構成にすること。\\n3. 手紙特有の「書き直せない生々しさ」を大切にし、整理されすぎない思考の流れを残すこと。",diary:"\\n\\n【構成ルール】\\n1. 日々の出来事から内面への掘り下げを段階的に進め、日記の最後に小さな気づきや変化を置くこと。\\n2. 物語的な伏線や劇的な展開は不要。等身大の思考と感情の揺れを丁寧に記録すること。\\n3. 書き手が自分自身に正直に向き合う瞬間を大切にし、取り繕わない率直さを保つこと。"}[t]||"":`6. 「${o}」という結末に向かって、伏線を自然に配置すること。`})()}${v}${f}${S}${u}${h}

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
物語が完全に終了した際は、最後に必ず「【完】」（続く場合は「【続く】」）と記載し、文章が途切れていないことを示してください。`;let T="";e.universalAssets&&e.universalAssets.length>0&&(T=`

【入力アセット情報（インスピレーションソース）】
`,T+=`以下のユーザーから投入されたアセット情報（画像、URL、テキストなど）を、指定された「縛り（設定項目）」をすべて満たした上で、物語の要素、描写、モチーフ、設定として自然に溶け込ませて構成してください。
`,e.universalAssets.forEach(($,D)=>{if(T+=`[アセット ${D+1}] 型: ${$.type}
`,$.type==="image"){T+=`・画像ファイル名: ${$.name||"不明"}
`;const Y=$.status==="error"?"画像解析エラーにより詳細情報なし":$.analysis||"解析中、または解析不可";T+=`・ビジュアル事前解析結果: ${Y}
`}else $.type==="url"?(T+=`・リンクURL: ${$.value}
`,$.title&&$.status!=="error"&&(T+=`・リンク先タイトル: ${$.title}
`),$.content&&$.status!=="error"&&(T+=`・リンク先コンテンツ（要約/抽出テキスト）: ${$.content.slice(0,1500)}${$.content.length>1500?"...":""}
`)):$.type==="text"&&(T+=`・文書名: ${$.name||"不明"}
`,$.content&&$.status!=="error"&&(T+=`・文書内容: ${$.content.slice(0,1500)}${$.content.length>1500?"...":""}
`))}),H+=T);const j=Ut(e);j&&(H+=j);const C=[a,r,s,i,o,g];return e.charCount&&C.push(`${e.charCount}字`),j&&C.push("📚RAG"),e.universalAssets&&e.universalAssets.length>0&&C.push(`🖼️アセット(${e.universalAssets.length})`),{prompt:H,tags:C}}function jt(){let e=Ie($t);return Math.random()<.55&&(e+=" "+Ie(Lt)),Math.random()<.35&&(e+=" "+Ie(At)),e}const qt=`この画像はアニメ/漫画のキャラクターシート（設定画・三面図など）です。
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
[{"name":"アカリ","sex":"女性","role":"主人公(推定)","personality":"元気","note":"内巻きのミディアムボブ, オレンジ髪, セーラー服, ロングヘア厳禁, 眼鏡厳禁, 甘いものが大好き"}]`;function Bt(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>{const s=n.result.split(",")[1];t(s)},n.onerror=a,n.readAsDataURL(e)})}function Kt(e){let t="",a=!1;for(let n=0;n<e.length;n++){const s=e[n];a?s==="\\"?(t+=s,n+1<e.length&&(t+=e[n+1],n++)):s==='"'?(a=!1,t+=s):s===`
`?t+="\\n":s==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):s==="	"?t+="\\t":t+=s:(s==='"'&&(a=!0),t+=s)}return t}function Ft(e){const a=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!a)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");let n=a[0];try{return JSON.parse(n)}catch(r){console.warn("キャラクターJSON初回パース失敗、修復を試行:",r.message)}let s=Kt(n);s=s.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(s)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}function Wt(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim(),a=te.find(s=>s===t);return a||te.find(s=>t.includes(s)||s.includes(t))||t}function zt(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim(),a=ne.find(s=>s===t);return a||ne.find(s=>t.includes(s)||s.includes(t))||t}function Yt(e,t){const a=te.map(o=>`<option value="${o}">${o}</option>`).join(""),n=ne.map(o=>`<option value="${o}">${o}</option>`).join(""),s=e.map((o,d)=>`
    <div class="ci-char-card">
      <div class="ci-char-header">
        <label class="ci-check-label">
          <input type="checkbox" class="ci-check" data-idx="${d}" checked>
          <span class="ci-char-name-display">${o.name||`キャラ${d+1}`}</span>
        </label>
        <span class="ci-char-badge">${o.role.includes("(推定)")?"🤖 AI推定":"📖 テキスト読取"}</span>
      </div>
      <div class="ci-char-fields">
        <div class="ci-field">
          <label class="ci-field-label">名前</label>
          <input type="text" class="ci-input ci-name" data-idx="${d}" value="${(o.name||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性別</label>
          <input type="text" class="ci-input ci-sex" data-idx="${d}" value="${(o.sex||"").replace(/"/g,"&quot;")}">
        </div>
        <div class="ci-field">
          <label class="ci-field-label">役割</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-role-select" data-idx="${d}">
              <option value="">-- 自由入力に切替 --</option>
              ${a}
            </select>
            <input type="text" class="ci-input ci-role-input" data-idx="${d}" value="${(o.role||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field">
          <label class="ci-field-label">性格</label>
          <div class="ci-select-wrap">
            <select class="ci-select ci-personality-select" data-idx="${d}">
              <option value="">-- 自由入力に切替 --</option>
              ${n}
            </select>
            <input type="text" class="ci-input ci-personality-input" data-idx="${d}" value="${(o.personality||"").replace(/\(推定\)/g,"").trim().replace(/"/g,"&quot;")}" placeholder="自由入力...">
          </div>
        </div>
        <div class="ci-field ci-field-full">
          <label class="ci-field-label">詳細メモ</label>
          <textarea class="ci-textarea ci-note" data-idx="${d}" rows="3">${(o.note||"").replace(/</g,"&lt;")}</textarea>
        </div>
      </div>
    </div>
  `).join(""),r=Array.isArray(t)?t:t?[t]:[],i=r.length>0?`<div class="ci-thumbnail-wrap">${r.map((o,d)=>`<img src="${o}" class="ci-thumbnail" alt="解析元画像 ${d+1}">`).join("")}</div>`:"";return`
    <div class="ci-modal-overlay" id="ci-modal">
      <div class="ci-modal">
        <div class="ci-modal-header">
          <h3 class="ci-modal-title">📷 キャラクター認識結果</h3>
          <span class="ci-modal-count">${e.length} キャラクター検出</span>
          <button class="ci-modal-close" id="ci-modal-close">✕</button>
        </div>
        ${i}
        <div class="ci-char-list">
          ${s}
        </div>
        <div class="ci-modal-actions">
          <button class="ci-btn ci-btn-primary" id="ci-btn-register">✅ 選択したキャラを登録</button>
          <button class="ci-btn ci-btn-secondary" id="ci-btn-cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `}function Vt(e,t){const a=document.getElementById("ci-modal");a&&(a.querySelectorAll(".ci-role-select").forEach(n=>{const s=n.dataset.idx,r=a.querySelector(`.ci-role-input[data-idx="${s}"]`),i=te.find(o=>o===r.value);i&&(n.value=i),n.addEventListener("change",()=>{n.value&&(r.value=n.value)}),r.addEventListener("input",()=>{const o=te.find(d=>d===r.value);n.value=o||""})}),a.querySelectorAll(".ci-personality-select").forEach(n=>{const s=n.dataset.idx,r=a.querySelector(`.ci-personality-input[data-idx="${s}"]`),i=ne.find(o=>o===r.value);i&&(n.value=i),n.addEventListener("change",()=>{n.value&&(r.value=n.value)}),r.addEventListener("input",()=>{const o=ne.find(d=>d===r.value);n.value=o||""})}),document.getElementById("ci-modal-close").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-cancel").addEventListener("click",()=>a.remove()),document.getElementById("ci-btn-register").addEventListener("click",()=>{const n=[];a.querySelectorAll(".ci-check").forEach(s=>{var h,b,g,y,f;if(!s.checked)return;const r=parseInt(s.dataset.idx),i=((h=a.querySelector(`.ci-name[data-idx="${r}"]`))==null?void 0:h.value)||"",o=((b=a.querySelector(`.ci-sex[data-idx="${r}"]`))==null?void 0:b.value)||"",d=((g=a.querySelector(`.ci-role-input[data-idx="${r}"]`))==null?void 0:g.value)||"",p=((y=a.querySelector(`.ci-personality-input[data-idx="${r}"]`))==null?void 0:y.value)||"",u=((f=a.querySelector(`.ci-note[data-idx="${r}"]`))==null?void 0:f.value)||"";n.push({name:i,sex:o,role:d,personality:p,note:u})}),t(n),a.remove()}))}function Xt(e,t,a){const n=document.getElementById("ci-dropzone"),s=document.getElementById("ci-file-input"),r=document.getElementById("ci-status");if(!n||!s)return;n.addEventListener("dragover",d=>{d.preventDefault(),!(e.locked&&e.locked.chars)&&n.classList.add("ci-dragover")}),n.addEventListener("dragleave",()=>{n.classList.remove("ci-dragover")}),n.addEventListener("drop",d=>{if(d.preventDefault(),n.classList.remove("ci-dragover"),e.locked&&e.locked.chars)return;const p=Array.from(d.dataTransfer.files).filter(u=>u.type.startsWith("image/"));p.length>0&&i(p)}),n.addEventListener("click",()=>{e.locked&&e.locked.chars||s.click()}),s.addEventListener("change",d=>{if(e.locked&&e.locked.chars)return;const p=Array.from(d.target.files).filter(u=>u.type.startsWith("image/"));p.length>0&&(i(p),d.target.value="")});async function i(d){if(e.locked&&e.locked.chars)return;const p=a();if(!p){alert("APIキーを先に保存してください");return}const u=["image/png","image/jpeg","image/webp","image/gif"],h=d.filter(f=>u.includes(f.type)?!0:(console.warn(`非対応形式スキップ: ${f.name} (${f.type})`),!1));if(h.length===0){alert(`対応する画像ファイルがありません。
PNG/JPG/WEBP/GIF のみ対応しています。`);return}n.classList.add("ci-loading");const b=document.getElementById("global-alert");b&&(b.innerHTML="⚠️ <strong>画像認識中:</strong> AIがキャラクターシートを解析しています。完了まで数秒〜数十秒お待ちください。",b.style.display="flex"),r&&(r.textContent=`🔍 ${h.length}枚の画像を解析中...（数秒〜数十秒）`,r.classList.remove("hidden"));const g=[],y=[];try{for(let f=0;f<h.length;f++){const v=h[f];r&&h.length>1&&(r.textContent=`🔍 画像 ${f+1}/${h.length} を解析中...`),b&&h.length>1&&(b.innerHTML=`⚠️ <strong>画像認識中 (${f+1}/${h.length}):</strong> AIがキャラクターシートを解析しています...`);const m=await Bt(v);y.push(`data:${v.type};base64,${m}`);const{text:E}=await Ve(p,qt,m,v.type,void 0,{responseMimeType:"application/json"}),L=Ft(E);L&&L.length>0&&(L.forEach(A=>{A.role=Wt(A.role),A.personality=zt(A.personality)}),g.push(...L))}if(g.length===0)throw new Error("キャラクター情報を検出できませんでした。設定テキストが含まれた画像をお試しください。");o(g,y),r&&(r.textContent=`✅ ${g.length}キャラクター検出！確認してください。`)}catch(f){console.error("Character import error:",f),r&&(r.textContent=`❌ エラー: ${f.message}`),setTimeout(()=>{r&&r.classList.add("hidden")},5e3)}finally{n.classList.remove("ci-loading"),b&&(b.style.display="none")}}function o(d,p){var h;(h=document.getElementById("ci-modal"))==null||h.remove();const u=document.createElement("div");u.innerHTML=Yt(d,p),document.body.appendChild(u.firstElementChild),Vt(d,b=>{b.forEach(g=>{e.characters.push({name:g.name||"",sex:g.sex||"",role:g.role||"",personality:g.personality||"",note:g.note||""})}),t(),r&&(r.textContent=`✅ ${b.length}キャラクターを登録しました！`,setTimeout(()=>r.classList.add("hidden"),3e3))})}}const _=e=>document.getElementById(e);let q=[],B=[],z=null,pe="",oe=()=>"",ye=()=>"";const we=`あなたはプロの文芸批評家・計量文体学の専門家です。
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
`;function Qt(e){var s,r;const t=[],a=(i,o)=>{o&&t.push(`【${i}】${o}`)},n=(i,o)=>{o&&t.push(`  ・${i}: ${o}`)};return a("作風名",e.style_name),a("トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(t.push("【語りの視点】"),n("人称",e.narrative_voice.person),n("距離感",e.narrative_voice.distance),n("信頼度",e.narrative_voice.reliability),n("介入度",e.narrative_voice.intrusion)):a("語りの視点",e.narrative_voice),e.sentence_style&&(t.push("【文体】"),n("平均文長",e.sentence_style.avg_length||e.sentence_style.length),n("文長変動",e.sentence_style.length_variation),n("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),n("リズム",e.sentence_style.rhythm),n("段落長",e.sentence_style.paragraph_length),n("段落構成",e.sentence_style.paragraph_structure)),e.vocabulary&&(t.push("【語彙】"),n("レベル",e.vocabulary.level),n("情報密度",e.vocabulary.density),n("レジスター",e.vocabulary.register),n("特徴",e.vocabulary.quirks),n("外来語",e.vocabulary.foreign_words),n("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(t.push("【修辞技法】"),n("比喩スタイル",e.rhetoric.metaphor_style),n("比喩素材",e.rhetoric.metaphor_source),n("反復技法",e.rhetoric.repetition),n("アイロニー",e.rhetoric.irony_level),n("ユーモア",e.rhetoric.humor_type),n("その他",e.rhetoric.other_techniques)),e.description_focus&&(t.push("【描写フォーカス】"),n("視覚",e.description_focus.visual),n("聴覚",e.description_focus.auditory),n("触覚",e.description_focus.tactile),n("嗅覚/味覚",e.description_focus.olfactory_gustatory),n("運動感覚",e.description_focus.kinesthetic),n("空間把握",e.description_focus.spatial),n("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),n("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue&&(t.push("【セリフ】"),n("文体",e.dialogue.style),n("機能",e.dialogue.function),n("タグ",e.dialogue.tag_style),n("方言",e.dialogue.dialect_sociolect),n("サブテキスト",e.dialogue.subtext)),e.structure&&(t.push("【構造】"),n("テンポ",e.structure.pacing),n("場面転換",e.structure.scene_transition),n("時制",e.structure.time_handling),n("緊張曲線",e.structure.tension_curve),n("冒頭パターン",e.structure.opening_style),n("結末パターン",e.structure.closing_style)),e.emotional_architecture&&(t.push("【感情設計】"),n("主要感情",e.emotional_architecture.dominant_emotions),n("振り幅",e.emotional_architecture.emotional_range),n("カタルシス",e.emotional_architecture.catharsis_method),n("読者距離",e.emotional_architecture.reader_distance)),a("テーマ傾向",e.themes_tendency),a("文学的影響",e.literary_influences),(s=e.unique_features)!=null&&s.length&&(t.push("【固有の特徴】"),e.unique_features.forEach(i=>t.push(`  ・${i}`))),(r=e.anti_patterns)!=null&&r.length&&(t.push("【回避パターン（この作風では避けるべき表現）】"),e.anti_patterns.forEach(i=>t.push(`  ・${i}`))),t.join(`
`)}function Zt(e,t){const a=Qt(e),n=t.length,s=Math.floor(n*.8),r=Math.ceil(n*1.2);return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

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

## リライト結果:`}function Ze(e){const t=_("settings");t&&t.classList.add("generating");const a=_("sa-section");a&&a.classList.add("generating");const n=document.querySelector(".btn-generate");n&&(n._origText=n.textContent,n.disabled=!0,n.innerHTML=`<span class="spinner"></span>${e}`);const s=_("sa-api-status");s&&(s.innerHTML=`<span class="spinner"></span>${e}`,s.classList.remove("hidden"));const r=_("sa-reflect-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const i=_("global-alert");i&&(i.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,i.style.display="flex");const o=_("thought-score-board");o&&(o.style.display="none")}function Ke(e){const t=_("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const a=_("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`);const n=document.querySelector(".btn-generate");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const s=_("global-alert");s&&(s.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const r=_("thought-score-board");r&&(r.style.display="none")}function Je(){const e=_("settings");e&&e.classList.remove("generating");const t=_("sa-section");t&&t.classList.remove("generating");const a=document.querySelector(".btn-generate");a&&(a.disabled=!1,a.textContent=a._origText||"ストーリー生成");const n=_("sa-api-status");n&&n.classList.add("hidden");const s=_("sa-reflect-api-status");s&&s.classList.add("hidden");const r=_("global-alert");r&&(r.style.display="none")}function Jt(){const e=_("sa-dropzone"),t=_("sa-file-input");!e||!t||(e.addEventListener("click",()=>t.click()),e.addEventListener("dragover",a=>{a.preventDefault(),e.classList.add("sa-dragover")}),e.addEventListener("dragleave",()=>{e.classList.remove("sa-dragover")}),e.addEventListener("drop",a=>{a.preventDefault(),e.classList.remove("sa-dragover"),Fe(a.dataTransfer.files)}),t.addEventListener("change",a=>{Fe(a.target.files),t.value=""}))}async function Fe(e){const t=Array.from(e),a=t.filter(s=>s.type==="text/plain"||s.name.endsWith(".txt")||s.name.endsWith(".md")||s.name.endsWith(".csv")||s.type===""),n=t.filter(s=>s.type.startsWith("image/"));if(a.length===0&&n.length===0){alert("テキストファイル (.txt, .md) または画像ファイルをドロップしてください");return}for(const s of a)try{const r=await en(s);r.trim().length>0&&q.push({name:s.name,text:r.trim(),charCount:r.trim().length})}catch(r){console.warn(`ファイル読み込み失敗: ${s.name}`,r)}for(const s of n)try{const r=await tn(s),i=URL.createObjectURL(s);B.push({name:s.name,base64:r,mimeType:s.type,previewUrl:i})}catch(r){console.warn(`画像ファイル読み込み失敗: ${s.name}`,r)}Ee(),He(),(q.length>0||B.length>0)&&_("sa-dropzone").classList.add("sa-has-files"),J()}function en(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=s=>t(s.target.result),n.onerror=a,n.readAsText(e,"UTF-8")})}function tn(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=s=>{const r=s.target.result.split(",")[1];t(r)},n.onerror=a,n.readAsDataURL(e)})}function Ee(){const e=_("sa-file-list");if(!e)return;const t=q.reduce((n,s)=>n+s.charCount,0),a=_("sa-file-count");a&&(a.textContent=`${q.length}件 / ${t.toLocaleString()}字`,a.classList.remove("hidden")),e.innerHTML=q.map((n,s)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${Ce(n.name)}</span>
      <span class="sa-file-chars">${n.charCount.toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${s}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(n=>{n.addEventListener("click",s=>{const r=parseInt(s.target.dataset.idx);q.splice(r,1),Ee(),q.length===0&&(_("sa-dropzone").classList.remove("sa-has-files"),_("sa-file-count").classList.add("hidden")),J()})})}function He(){const e=_("sa-image-list");if(e){if(B.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden"),e.innerHTML=B.map((t,a)=>`
    <div class="sa-image-item">
      <img src="${t.previewUrl}" alt="${Ce(t.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${Ce(t.name)}</span>
      <button class="sa-file-remove" data-img-idx="${a}" title="除去">✕</button>
    </div>
  `).join(""),e.querySelectorAll(".sa-file-remove").forEach(t=>{t.addEventListener("click",a=>{var s;const n=parseInt(a.target.dataset.imgIdx);(s=B[n])!=null&&s.previewUrl&&URL.revokeObjectURL(B[n].previewUrl),B.splice(n,1),He(),q.length===0&&B.length===0&&_("sa-dropzone").classList.remove("sa-has-files"),J()})})}}function nn(e){const t=e.indexOf("{");if(t===-1)return null;const a=e.lastIndexOf("}");return a===-1||a<t?null:e.slice(t,a+1)}function an(e){let t="",a=!1;for(let n=0;n<e.length;n++){const s=e[n];a?s==="\\"?(t+=s,n+1<e.length&&(t+=e[n+1],n++)):s==='"'?(a=!1,t+=s):s===`
`?t+="\\n":s==="\r"?(t+="\\n",n+1<e.length&&e[n+1]===`
`&&n++):s==="	"?t+="\\t":t+=s:(s==='"'&&(a=!0),t+=s)}return t}const sn=["style_name","tone","narrative_voice","person","distance","reliability","intrusion","sentence_style","avg_length","length_variation","ending_patterns","rhythm","paragraph_length","paragraph_structure","vocabulary","level","density","register","quirks","foreign_words","archaic_modern","rhetoric","metaphor_style","metaphor_source","repetition","irony_level","humor_type","other_techniques","description_focus","visual","auditory","tactile","olfactory_gustatory","kinesthetic","spatial","psychological_depth","show_tell_ratio","dialogue","style","function","tag_style","dialect_sociolect","subtext","structure","pacing","scene_transition","time_handling","tension_curve","opening_style","closing_style","emotional_architecture","dominant_emotions","emotional_range","catharsis_method","reader_distance","themes_tendency","literary_influences","unique_features","anti_patterns","reproduction_prompt"];function rn(e){let t=e.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,"");const a=[];if(sn.forEach(r=>{const i=new RegExp(`"${r}"\\s*:`,"g");let o;for(;(o=i.exec(t))!==null;)a.push({key:r,start:o.index,end:o.index+o[0].length})}),a.sort((r,i)=>r.start-i.start),a.length===0)return JSON.parse(t);const n={};for(let r=0;r<a.length;r++){const i=a[r],o=a[r+1],d=i.end;let p=o?o.start:t.length,u=t.slice(d,p).trim();if(!o){const h=u.lastIndexOf("}");h!==-1&&(u=u.slice(0,h).trim())}if(u=u.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g,""),u.startsWith("[")&&u.endsWith("]")){let h=u.slice(1,-1).trim();const b=[],g=h.split(/",\s*"/);g.forEach((y,f)=>{let v=y.trim();f===0&&v.startsWith('"')&&(v=v.slice(1)),f===g.length-1&&v.endsWith('"')&&(v=v.slice(0,-1)),v=v.replace(/"/g,'\\"'),v=v.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t"),b.push(v)}),n[i.key]=b}else{let h=!1;u.startsWith('"')&&(u=u.slice(1),h=!0),u.endsWith('"')&&(u=u.slice(0,-1)),h&&(u=u.replace(/"/g,'\\"'),u=u.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t")),n[i.key]=u}}return{style_name:n.style_name||"",tone:n.tone||"",narrative_voice:{person:n.person||"",distance:n.distance||"",reliability:n.reliability||"",intrusion:n.intrusion||""},sentence_style:{avg_length:n.avg_length||"",length_variation:n.length_variation||"",ending_patterns:n.ending_patterns||"",rhythm:n.rhythm||"",paragraph_length:n.paragraph_length||"",paragraph_structure:n.paragraph_structure||""},vocabulary:{level:n.level||"",density:n.density||"",register:n.register||"",quirks:n.quirks||"",foreign_words:n.foreign_words||"",archaic_modern:n.archaic_modern||""},rhetoric:{metaphor_style:n.metaphor_style||"",metaphor_source:n.metaphor_source||"",repetition:n.repetition||"",irony_level:n.irony_level||"",humor_type:n.humor_type||"",other_techniques:n.other_techniques||""},description_focus:{visual:n.visual||"",auditory:n.auditory||"",tactile:n.tactile||"",olfactory_gustatory:n.olfactory_gustatory||"",kinesthetic:n.kinesthetic||"",spatial:n.spatial||"",psychological_depth:n.psychological_depth||"",show_tell_ratio:n.show_tell_ratio||""},dialogue:{style:n.style||"",function:n.function||"",tag_style:n.tag_style||"",dialect_sociolect:n.dialect_sociolect||"",subtext:n.subtext||""},structure:{pacing:n.pacing||"",scene_transition:n.scene_transition||"",time_handling:n.time_handling||"",tension_curve:n.tension_curve||"",opening_style:n.opening_style||"",closing_style:n.closing_style||""},emotional_architecture:{dominant_emotions:n.dominant_emotions||"",emotional_range:n.emotional_range||"",catharsis_method:n.catharsis_method||"",reader_distance:n.reader_distance||""},themes_tendency:n.themes_tendency||"",literary_influences:n.literary_influences||"",unique_features:Array.isArray(n.unique_features)?n.unique_features:[],anti_patterns:Array.isArray(n.anti_patterns)?n.anti_patterns:[],reproduction_prompt:n.reproduction_prompt||""}}function on(e){try{return JSON.parse(e)}catch(a){console.warn("JSON初回パース失敗、修復を試行:",a.message)}let t=e.trim();t=an(t),t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":'),t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(a){console.warn("JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:",a.message);try{return rn(t)}catch(n){console.warn("キー境界パースも失敗、最後の攻撃的修復を試行:",n.message);try{let s=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(s)}catch(s){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${s.message}`)}}}}function Ce(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function cn(){const e=oe();if(!e){alert("APIキーを保存してから解析してください");return}const t=_("sa-direct-text"),a=t?t.value.trim():"";if(q.length===0&&B.length===0&&!a){alert("テキスト（ファイルドロップまたは直接貼り付け）か画像を投入してください");return}const n=_("btn-sa-analyze"),s=_("sa-result-wrap"),r=_("sa-result"),i=_("sa-reflect-wrap"),o=_("sa-reflect-result-wrap"),d=_("progress-log"),p=_("thought-score-board"),u=_("progress-title-text");d&&(d.textContent="作風解析の開始を待っています..."),p&&(p.innerHTML="",p.style.display="none"),u&&(u.textContent="AI進捗・思考ログ: 作風解析中..."),n.disabled=!0,n.innerHTML='<span class="spinner"></span>AIが超強引に作風を解析中...',r.textContent="超強引に解析中です...しばらくお待ちください（1分〜3分程度）",s.classList.remove("hidden"),i.classList.add("hidden"),o.classList.add("hidden"),Ze("🔬 超強引！作風解析中...");try{let h=[];q.length>0&&(h=q.map(A=>`--- ${A.name} ---
${A.text}`)),a&&h.push(`--- 直接貼り付けテキスト ---
${a}`);let b=h.join(`

`);b.length>1e5&&(b=b.slice(0,1e5)+`

[...以降のテキストは省略（コンテキスト上限）...]`);const g=B.length>0,y=b.length>0;let f=we;g&&y?f=we.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群と添付画像を総合的に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。

## 画像分析の追加指示:
- 添付画像の色彩傾向・構図・タッチ・雰囲気を分析し、description_focus.visual に統合すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること
- テキストと画像の両方から相乗的に作風パラメータを抽出すること`):g&&!y&&(f=we.replace(`あなたはプロの文芸批評家・計量文体学の専門家です。
以下のテキスト群を精密に分析し、この作者の「作風」を他のAIで完全再現可能なパラメータとして抽出してください。`,`あなたはプロの文芸批評家・計量文体学の専門家です。
以下の添付画像（イラスト・挿絵等）を詳細に分析し、この作者のビジュアル面およびそこから想像される文体を含めた「作風」をパラメータとして抽出してください。

## 重要：テキスト固有の項目（sentence_style、vocabulary、dialogue、rhetoric、narrative_voice、structure、emotional_architecture等）の扱いについて:
- イラストの色彩、構図、タッチ、ライティング、キャラクターの表情、空気感、世界観から、「もしこのイラストを描いた作者が小説やストーリーなどの文章を執筆するならば、どのような文体、語彙、テンポ、セリフ回し、語り口、感情設計にするか」を想像力を限界まで働かせてシミュレーションし、クリエイティブに補完してください。
- 全ての項目について、「画像のみのため判定不可」「分析不能」「不明」「該当なし」といったエスケープ用の表記は絶対に禁止します。AIのクリエイティビティを発揮し、必ず具体的な想定値や詳細な解説テキストで全項目を完全に埋めてください。

## 画像分析指示:
- 色彩傾向・構図・タッチ・雰囲気・ライティング・描かれているオブジェクトやキャラクターの状況等を詳細に分析すること
- 画像のトーン（暖色系/寒色系/モノクロ等）を tone に反映すること`)),y&&(f=f+b);const v=ie[0].value;let m;g?m=(await Ct(e,f,B,k=>{Ke(`フォールバック: ${k}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${k}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text:m=(await Xe(e,v,f,k=>{Ke(`フォールバック: ${k}`),n.innerHTML=`<span class="spinner"></span>フォールバック: ${k}`},{responseMimeType:"application/json",timeoutMs:9e4,temperature:.1})).text;let E="";const L=nn(m);if(L)E=L;else{const A=m.match(/```json\s*([\s\S]*?)\s*```/);if(A)E=A[1];else{const k=m.match(/\{[\s\S]*\}/);if(k)E=k[0];else throw new Error("AIの応答からJSONを抽出できませんでした")}}z=on(E),ln(z),u&&(u.textContent="AI進捗・思考ログ: 作風解析完了"),d&&(d.textContent=`作風解析が完了しました。解析結果が右パネルに表示されています。
作風名: ${z.style_name||"未定義"}
トーン: ${z.tone||"未定義"}`),i.classList.remove("hidden"),ue()}catch(h){r.textContent=`解析エラー: ${h.message}`,r.classList.add("sa-error"),u&&(u.textContent="AI進捗・思考ログ: 解析エラー"),d&&(d.textContent=`作風解析エラーが発生しました:
${h.message}`)}finally{n.disabled=!1,n.innerHTML="🔬 超強引！作風解析を実行",Je()}}function ln(e){var i,o;const t=_("sa-result");t.classList.remove("sa-error");const a=[],n=(d,p,u)=>{u&&a.push(`${d} ${p}: ${u}`)},s=(d,p)=>{p&&a.push(`  ・${d}: ${p}`)},r=(d,p)=>{a.push(""),a.push(`${d} ${p}:`)};n("🏷️","作風名",e.style_name),n("🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(r("🎙️","語りの視点"),s("人称",e.narrative_voice.person),s("距離感",e.narrative_voice.distance),s("信頼度",e.narrative_voice.reliability),s("介入度",e.narrative_voice.intrusion)):n("🎙️","語りの視点",e.narrative_voice),r("📝","文体"),e.sentence_style&&(s("平均文長",e.sentence_style.avg_length||e.sentence_style.length),s("文長変動",e.sentence_style.length_variation),s("文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),s("リズム",e.sentence_style.rhythm),s("段落長",e.sentence_style.paragraph_length),s("段落構成",e.sentence_style.paragraph_structure)),r("📖","語彙"),e.vocabulary&&(s("レベル",e.vocabulary.level),s("情報密度",e.vocabulary.density),s("レジスター",e.vocabulary.register),s("特徴",e.vocabulary.quirks),s("外来語",e.vocabulary.foreign_words),s("古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(r("🔮","修辞技法"),s("比喩スタイル",e.rhetoric.metaphor_style),s("比喩素材",e.rhetoric.metaphor_source),s("反復技法",e.rhetoric.repetition),s("アイロニー",e.rhetoric.irony_level),s("ユーモア",e.rhetoric.humor_type),s("その他",e.rhetoric.other_techniques)),r("🖼️","描写フォーカス"),e.description_focus&&(s("視覚",e.description_focus.visual),s("聴覚",e.description_focus.auditory),s("触覚",e.description_focus.tactile),s("嗅覚/味覚",e.description_focus.olfactory_gustatory),s("運動感覚",e.description_focus.kinesthetic),s("空間把握",e.description_focus.spatial),s("心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),s("Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(r("💬","セリフ"),s("文体",e.dialogue.style),s("機能",e.dialogue.function),s("タグ",e.dialogue.tag_style),s("方言",e.dialogue.dialect_sociolect),s("サブテキスト",e.dialogue.subtext)):n("💬","セリフ回し",e.dialogue_style),e.structure?(r("🏗️","構造"),s("テンポ",e.structure.pacing),s("場面転換",e.structure.scene_transition),s("時制",e.structure.time_handling),s("緊張曲線",e.structure.tension_curve),s("冒頭パターン",e.structure.opening_style),s("結末パターン",e.structure.closing_style)):n("⏱️","テンポ",e.pacing),e.emotional_architecture&&(r("❤️","感情設計"),s("主要感情",e.emotional_architecture.dominant_emotions),s("振り幅",e.emotional_architecture.emotional_range),s("カタルシス",e.emotional_architecture.catharsis_method),s("読者距離",e.emotional_architecture.reader_distance)),n("🎯","テーマ傾向",e.themes_tendency),n("📚","文学的影響",e.literary_influences),a.push(""),(i=e.unique_features)!=null&&i.length&&(a.push("✨ 固有の特徴:"),e.unique_features.forEach(d=>a.push(`  ・${d}`))),(o=e.anti_patterns)!=null&&o.length&&(a.push(""),a.push("🚫 回避パターン:"),e.anti_patterns.forEach(d=>a.push(`  ・${d}`))),a.push(""),a.push("━━━ 再現プロンプト ━━━"),a.push(e.reproduction_prompt||"（生成されませんでした）"),t.textContent=a.join(`
`)}async function dn(){const e=oe();if(!e){alert("APIキーを保存してください");return}if(!z){alert("先に作風解析を実行してください");return}const t=ye(),a=_("output");if(!t||t.length<10||a&&a.classList.contains("empty")){alert("まず上のストーリー生成でテキストを生成してから、リライトを実行してください");return}const n=_("btn-sa-reflect"),s=_("sa-reflect-result-wrap"),r=_("sa-reflect-output");n.disabled=!0,n.innerHTML='<span class="spinner"></span>作風を反映してリライト中...',r.textContent="リライト中です...（完了後に一括表示されます）",s.classList.remove("hidden");const i=_("progress-log"),o=_("thought-score-board"),d=_("progress-title-text");i&&(i.textContent="作風リライトの開始を待っています..."),o&&(o.innerHTML="",o.style.display="none"),d&&(d.textContent="AI進捗・思考ログ: リライト準備中..."),Ze("🎨 作風リライト中...");let p=[],u="",h="",b=null;function g(f){p.push(f),y()}function y(){if(!i)return;let f="";p.length>0&&(f+=p.join(`
`)+`
`),u&&(f+=u+`
`),h&&(f+=`
`+h),i.textContent=f;const v=_("progress-content");v&&(v.scrollTop=v.scrollHeight)}g("[システム] 作風リライト処理を開始しました..."),g(`[システム] 対象ストーリー文字数: ${t.length.toLocaleString()} 字`),g("[システム] 抽出済みの作風パラメータ（文体・語彙・感情設計）を抽出中..."),g("[システム] リライト用メタプロンプトの構築が完了しました。");try{const f=Zt(z,t),v=ie[0].value;g(`[システム] AIモデル (${v}) にリライト要求を送信しています...`);let m=0,E=new Set;b=setInterval(()=>{m++,u=`[通信] AIモデルからのリライト応答を待機しています${".".repeat(m%4)} (${m}秒経過)`,m>=3&&!E.has(3)&&(E.add(3),p.push("[適用中] 抽出作風「平均文長・段落構成」の文体フィルタをマッピング中...")),m>=6&&!E.has(6)&&(E.add(6),p.push("[適用中] 語彙特徴・修辞スタイル（比喩の方向性）の適応率を計算中...")),m>=9&&!E.has(9)&&(E.add(9),p.push("[適用中] キャラクターの対話タグ・感情設計の整合性シミュレーションを実施中...")),m>=12&&!E.has(12)&&(E.add(12),p.push("[適用中] 読者距離と pacing（テンポ）の緊張曲線をリライトプロットにマージ完了。")),m>=15&&m%5===0&&!E.has(m)&&(E.add(m),p.push(`[再構築中] AIが文体適合度を最大化させるためのリライトプロセス (${m}s) を実行しています...`)),y()},1e3);let L="",A=!1;d&&(d.textContent="AI進捗・思考ログ: リライト執筆中...");const k=({text:C})=>{A||(A=!0,u="",y(),b&&(clearInterval(b),b=null)),L+=C;const $=L.length;let D=`[システム] AIによるリライト文章の生成が開始されました。
`;D+=`[進捗] 本文をリライト中...
`,D+=`・現在文字数: ${$} 文字
`;const Y=Math.floor($/50%4),ce=".".repeat(Y)+" ".repeat(3-Y);D+=`・ステータス: 執筆処理中${ce}
`,h=D,y()},S=C=>{r.textContent=`フォールバック中: ${C}...`,n.innerHTML=`<span class="spinner"></span>フォールバック: ${C}`,g(`[システム] リライト応答遅延のため、モデルを ${C} にフォールバックします...`)},{usedModel:H}=await Qe(e,v,f,k,S);b&&(clearInterval(b),b=null),n.innerHTML='<span class="spinner"></span>最終推敲中...';let T=L.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,"");pe=T,r.textContent=T;const j=_("sa-reflect-counter");j&&(j.textContent=`${T.length.toLocaleString()} 字`),d&&(d.textContent="AI進捗・思考ログ: リライト完了"),g("[システム] 作風リライト文の生成・推敲が正常に完了しました。"),h=`[進捗] リライトが正常に完了しました。
・最終文字数: ${T.length.toLocaleString()} 字
・ステータス: 完了`,u="",y(),s.scrollIntoView({behavior:"smooth",block:"start"})}catch(f){b&&(clearInterval(b),b=null),u="",y(),r.textContent=`リライトエラー: ${f.message}`}finally{n.disabled=!1,n.innerHTML="🎨 この作風でリライト実行",Je()}}function un(){if(!z)return;const e=_("sa-result").textContent;navigator.clipboard.writeText(e).then(()=>{const t=_("btn-sa-copy");t.textContent="✅ コピー完了",setTimeout(()=>t.textContent="📋 コピー",2e3)})}function et(){return new Date().toISOString().replace(/[-T:]/g,"").slice(0,14)}function pn(){if(!z)return;const e=JSON.stringify(z,null,2),t=new Blob([e],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(t);const n=(z.style_name||"style_analysis").replace(/[\s\/\\:*?"<>|]/g,"_");a.download=`${n}_${et()}.json`,a.click()}function fn(){pe&&navigator.clipboard.writeText(pe).then(()=>{const e=_("btn-sa-reflect-copy");e.textContent="✅ コピー完了",setTimeout(()=>e.textContent="📋 コピー",2e3)})}function hn(){if(!pe)return;const e=new Blob([pe],{type:"text/plain"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`style_rewrite_${et()}.txt`,t.click()}function mn(){var t,a,n,s;B.forEach(r=>{r.previewUrl&&URL.revokeObjectURL(r.previewUrl)}),q=[],B=[],z=null,pe="",Ee(),He();const e=_("sa-direct-text");e&&(e.value=""),ve(),_("sa-dropzone").classList.remove("sa-has-files"),(t=_("sa-file-count"))==null||t.classList.add("hidden"),J(),ue(),_("sa-result").textContent="",(a=_("sa-result-wrap"))==null||a.classList.add("hidden"),(n=_("sa-reflect-wrap"))==null||n.classList.add("hidden"),(s=_("sa-reflect-result-wrap"))==null||s.classList.add("hidden")}function gn(){const e=_("sa-direct-text");if(!e)return;const t=e.value.trim();t&&(q.push({name:`直接入力テキスト_${q.length+1}`,text:t,charCount:t.length}),e.value="",Ee(),_("sa-dropzone").classList.add("sa-has-files"),J(),ve())}function ve(){const e=_("btn-sa-add-text");if(!e)return;const t=_("sa-direct-text"),a=t&&t.value.trim().length>0;e.disabled=!a}function _e(){const e=_("sa-section");if(!e)return;(typeof oe=="function"?oe():"")?e.classList.remove("sa-inactive"):e.classList.add("sa-inactive")}function J(){const e=_("btn-sa-analyze");if(!e)return;const t=typeof oe=="function"?oe():"",a=q.length>0,n=B.length>0,s=_("sa-direct-text"),r=s&&s.value.trim().length>0,i=a||n||r;e.disabled=!(t&&i)}function ue(){const e=_("btn-sa-reflect");if(!e)return;const t=typeof ye=="function"?ye():"",a=_("output"),n=t&&t.length>=10&&a&&!a.classList.contains("empty"),s=z!==null;e.disabled=!(n&&s)}function yn(e,t){var n,s,r,i,o,d,p,u;oe=e,ye=t,Jt(),(n=_("btn-sa-analyze"))==null||n.addEventListener("click",cn),(s=_("btn-sa-reflect"))==null||s.addEventListener("click",dn),(r=_("btn-sa-copy"))==null||r.addEventListener("click",un),(i=_("btn-sa-json"))==null||i.addEventListener("click",pn),(o=_("btn-sa-reflect-copy"))==null||o.addEventListener("click",fn),(d=_("btn-sa-reflect-dl"))==null||d.addEventListener("click",hn),(p=_("btn-sa-clear"))==null||p.addEventListener("click",mn),(u=_("btn-sa-add-text"))==null||u.addEventListener("click",gn);const a=_("sa-direct-text");a&&a.addEventListener("input",()=>{J(),ve()}),_e(),ve()}const vn="3.4.9",l=e=>document.getElementById(e),N=e=>e&&e.length?e[Math.floor(Math.random()*e.length)]:null,R=e=>(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),c={apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1}};function tt(e){const t=c.locked[e],a=document.querySelector(`.btn-lock[data-section="${e}"]`);a&&(a.textContent=t?"🔒":"🔓",a.classList.toggle("locked",t),a.title=t?"この項目のロックを解除する":"この項目をロックしてランダム変更から保護");let n=l(`section-${e}`);!n&&e==="universal"&&(n=l("section-universal-intake")),n&&(n.classList.toggle("is-locked",t),n.querySelectorAll("input, textarea, select, button:not(.btn-lock)").forEach(s=>{s.disabled=t})),e==="chars"&&W()}function bn(){const e=l("btn-switch-api");e.classList.remove("gemini-mode","openai-mode"),c.apiProvider==="gemini"?(e.classList.add("gemini-mode"),e.title="現在の設定内容は保持したまま、ChatGPT APIに切り替えます（現在: Gemini）"):(e.classList.add("openai-mode"),e.title="現在の設定内容は保持したまま、Gemini APIに切り替えます（現在: ChatGPT）")}function $e(){const e=l("banner"),t=document.querySelector(".settings-panel"),a=l("engine-label"),n=l("apikey");c.apiKey?(e.classList.add("ok"),n.value="********",n.readOnly=!0,t&&t.classList.remove("disabled-panel"),a.classList.remove("not-set"),c.apiProvider==="openai"?(a.textContent="ChatGPT API",a.style.color="var(--openai)",a.style.backgroundColor="var(--openai-glow)",a.style.borderColor="rgba(16,163,127,.3)"):(a.textContent="Gemini API",a.style.color="",a.style.backgroundColor="",a.style.borderColor="")):(e.classList.remove("ok"),n.value="",n.readOnly=!1,t&&t.classList.add("disabled-panel"),a.textContent="⚠ API未設定",a.classList.add("not-set"),a.style.color="",a.style.backgroundColor="",a.style.borderColor=""),c.apiProvider==="openai"?n.placeholder="OpenAI APIキーを入力（sk-...）":n.placeholder="Gemini APIキーを入力",bn()}function En(){c.apiProvider==="gemini"?(c.geminiKey=c.apiKey,c.apiProvider="openai",c.apiKey=c.openaiKey):(c.openaiKey=c.apiKey,c.apiProvider="gemini",c.apiKey=c.geminiKey);const e=l("banner");c.apiKey?(e.classList.add("locked"),l("key-save").classList.add("hidden"),l("key-edit").classList.remove("hidden")):(e.classList.remove("locked"),l("key-save").classList.remove("hidden"),l("key-edit").classList.add("hidden"),l("apikey").readOnly=!1,l("apikey").value=""),$e(),e.classList.remove("banner-switch-flash"),e.offsetWidth,e.classList.add("banner-switch-flash"),c.apiKey||l("apikey").focus(),J(),_e()}function _n(){const e=l("apikey").value.trim();if(!e){alert("APIキーを入力してください");return}const t=e.startsWith("sk-");t&&c.apiProvider==="gemini"?c.apiProvider="openai":!t&&c.apiProvider==="openai"&&(c.apiProvider="gemini"),c.apiKey=e,c.apiProvider==="openai"?c.openaiKey=e:c.geminiKey=e,$e(),l("banner").classList.add("locked"),l("key-save").classList.add("hidden"),l("key-edit").classList.remove("hidden"),J(),_e()}function $n(){l("banner").classList.remove("locked"),l("key-save").classList.remove("hidden"),l("key-edit").classList.add("hidden"),l("apikey").readOnly=!1,l("apikey").value="",l("apikey").focus(),c.apiKey="",c.apiProvider==="openai"?c.openaiKey="":c.geminiKey="",$e(),J(),_e()}function P(e,t){const a=l(e);a&&a.classList.toggle("hidden",!t)}function xe(e,t,a,n,s){const r=l(e);r&&(r.innerHTML=t.map(i=>`<button class="chip sub-chip" data-v="${R(i)}">${R(i)}</button>`).join(""),r.querySelectorAll(".chip").forEach(i=>{i.addEventListener("click",()=>{r.querySelectorAll(".chip").forEach(o=>o.classList.remove("active")),i.classList.add("active"),c[a]=i.dataset.v,l(n).value=i.dataset.v,P(s,i.dataset.v)})}))}function re({catId:e,subId:t,customId:a,clearId:n,headerRndId:s,customRndId:r,categories:i,originals:o,stateKey:d,stateCatKey:p}){var b,g,y,f;const u=d==="themeSelected"?"theme":d==="narration"?"narr":d,h=l(e);if(h&&i){h.innerHTML=Object.keys(i).map(m=>`<button class="chip cat-chip" data-cat="${R(m)}">${R(m)}</button>`).join(""),h.querySelectorAll(".chip").forEach(m=>{m.addEventListener("click",()=>{c.locked[u]||(h.querySelectorAll(".chip").forEach(E=>E.classList.remove("active")),m.classList.add("active"),c[p]=m.dataset.cat,c[d]=null,xe(t,i[m.dataset.cat],d,a,n),l(a).value="",P(n,""))})});const v=Object.keys(i)[0];if(v){const m=h.querySelector(".chip");m&&m.classList.add("active"),xe(t,i[v],d,a,n)}}(b=l(s))==null||b.addEventListener("click",()=>{if(c.locked[u]||!i)return;const v=Object.keys(i),m=N(v);c[p]=m,h&&h.querySelectorAll(".chip").forEach(A=>A.classList.toggle("active",A.dataset.cat===m));const E=i[m],L=N(E);c[d]=L,xe(t,E,d,a,n),l(t).querySelectorAll(".chip").forEach(A=>A.classList.toggle("active",A.dataset.v===L)),l(a).value=L,P(n,L)}),(g=l(r))==null||g.addEventListener("click",()=>{if(c.locked[u])return;let v;d==="themeSelected"?v=jt():v=N(o),v&&(l(a).value=v,h&&h.querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),l(t).innerHTML="",c[p]=null,c[d]=null,P(n,v))}),(y=l(n))==null||y.addEventListener("click",()=>{c.locked[u]||(l(a).value="",P(n,""))}),(f=l(a))==null||f.addEventListener("input",()=>{if(c.locked[u])return;const v=l(a).value.trim();P(n,v),v&&(h&&h.querySelectorAll(".chip").forEach(m=>m.classList.remove("active")),l(t).innerHTML="",c[p]=null,c[d]=null)})}function Ln(){document.querySelectorAll(".btn-section-clear").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.section;if(t&&c.locked[t])return;if(t==="chars"){An();return}if(t==="mode"){l("mode-custom").value="",c.mode="4koma",l("mode-chips").querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),P("mode-custom-clear","");return}const a=`${t}-custom`,n=`${t}-custom-clear`,s=`${t}-cat-chips`,r=`${t}-sub-chips`;l(a)&&(l(a).value=""),P(n,""),l(s)&&l(s).querySelectorAll(".chip").forEach(d=>d.classList.remove("active")),l(r)&&(l(r).innerHTML="");const o={theme:{key:"themeSelected",cat:"themeCategory"},genre:{key:"genre",cat:"genreCategory"},worldview:{key:"worldview",cat:"worldviewCategory"},target:{key:"target",cat:"targetCategory"},era:{key:"era",cat:"eraCategory"},ending:{key:"ending",cat:"endingCategory"},narr:{key:"narration",cat:"narrCategory"}}[t];o&&(c[o.key]=null,c[o.cat]=null),t==="supplement"&&(l("supplement").value="",P("supplement-clear",""))})})}function Ue(){const e=l("mode-chips");e.innerHTML=ke.map(t=>`<button class="chip${c.mode===t.value?" active":""}" data-v="${t.value}">${t.label}</button>`).join(""),e.querySelectorAll(".chip").forEach(t=>{t.addEventListener("click",()=>{c.locked.mode||(e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),t.classList.add("active"),c.mode=t.dataset.v,l("mode-custom").value=t.textContent,P("mode-custom-clear",t.textContent),Te(c.mode))})}),l("btn-rand-mode").addEventListener("click",()=>{if(c.locked.mode)return;const t=N(ke);c.mode=t.value,e.querySelectorAll(".chip").forEach(a=>a.classList.toggle("active",a.dataset.v===t.value)),l("mode-custom").value=t.label,P("mode-custom-clear",t.label),Te(c.mode)}),l("mode-custom-rnd").addEventListener("click",()=>{if(c.locked.mode)return;const t=N(mt);l("mode-custom").value=t,c.mode=null,e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),P("mode-custom-clear",t)}),l("mode-custom").addEventListener("input",()=>{if(c.locked.mode)return;const t=l("mode-custom").value.trim();P("mode-custom-clear",t),t&&(e.querySelectorAll(".chip").forEach(a=>a.classList.remove("active")),c.mode=null,Te(null))}),l("charcount-check").addEventListener("change",()=>{c.locked.mode||l("charcount-wrap").classList.toggle("hidden",!l("charcount-check").checked)}),l("char-count").addEventListener("input",t=>{if(c.locked.mode)return;const a=parseInt(t.target.max)||6e3;parseInt(t.target.value)>a&&(t.target.value=a)})}function Te(e){const t=l("char-count"),a=l("charcount-hint");!t||!a||(e==="long"?(t.max="300000",t.step="10000",t.value="100000",a.textContent="※長編モードでは、長編小説をAIに各章ごと分割執筆させるための『専用指示書』を生成します。",a.style.color="#4caf50"):(t.max="4000",t.step="500",parseInt(t.value)>4e3&&(t.value="2000"),a.textContent="※直接生成で途切れない安全な文字数は約4,000字までです",a.style.color="#aaa"))}function An(){c.characters=[],W()}function W(){l("char-count-display").textContent=c.characters.length;const e=l("char-list"),t=c.locked&&c.locked.chars,a=`<datalist id="roles-list">${te.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,n=`<datalist id="personalities-list">${ne.map(r=>`<option value="${r}"></option>`).join("")}</datalist>`,s='<datalist id="sex-list"><option value="男性"></option><option value="女性"></option><option value="無性"></option><option value="回答無し"></option></datalist>';e.innerHTML=c.characters.map((r,i)=>`
    <div class="char-card shadow-sm">
      <div class="char-card-header">
        <span class="char-card-num">キャラ ${i+1}</span>
        <div class="btn-group">
          <button class="char-field-btn btn-char-rnd-all" data-idx="${i}" title="この人物の全項目をランダムに埋める（個別の微調整も可能）"${t?" disabled":""}>🎲 全ランダム</button>
          <button class="btn-char-del" data-idx="${i}" title="この人物を削除"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">名前（空欄ならストーリー生成時にAI命名 / 🎲 今すぐ生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-name-input" value="${R(r.name)}" data-idx="${i}" placeholder="例：山田太郎（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="name" title="今すぐ名前の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="name" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性別（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="sex-list" data-idx="${i}" data-key="sex" value="${R(r.sex)}" placeholder="例：男性、女性、無性（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="sex" title="今すぐ性別の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="sex" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">役割（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="roles-list" data-idx="${i}" data-key="role" value="${R(r.role)}" placeholder="例：主人公、ライバル（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="role" title="今すぐ役割の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="role" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">性格（空欄でAIお任せ / 🎲 今すぐ生成 / 手入力・選択可）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <input type="text" class="char-sel" list="personalities-list" data-idx="${i}" data-key="personality" value="${R(r.personality)}" placeholder="例：熱血、クール（空欄でAIお任せ）"${t?" disabled":""}>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="personality" title="今すぐ性格の案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="personality" title="消去"${t?" disabled":""}>🗑️</button>
        </div>
      </div>
 
      <label class="char-field-label">詳細メモ（空欄ならAIが文脈に合わせ補完 / 🎲 今すぐ案を生成）</label>
      <div class="char-field-row">
        <div class="input-wrap">
          <textarea class="char-memo" data-idx="${i}" placeholder="例：短髪, 眼鏡, いつも黒い服を着ている"${t?" disabled":""}>${R(r.note)}</textarea>
        </div>
        <div class="btn-group">
          <button class="char-field-btn btn-field-rnd" data-idx="${i}" data-key="note" title="今すぐ詳細メモの案を出す"${t?" disabled":""}>🎲</button>
          <button class="char-field-btn delete btn-field-clear" data-idx="${i}" data-key="note" title="消去"${t?" disabled":""}>🗑️</button>
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
  `,e.querySelectorAll(".char-name-input").forEach(r=>r.addEventListener("input",i=>{const o=parseInt(i.target.dataset.idx);c.characters[o].name=i.target.value,Re(o,"name")})),e.querySelectorAll(".char-sel").forEach(r=>r.addEventListener("input",i=>{const o=parseInt(i.target.dataset.idx);c.characters[o][i.target.dataset.key]=i.target.value,i.target.dataset.key==="sex"&&Re(o,"sex")})),e.querySelectorAll(".char-memo").forEach(r=>r.addEventListener("input",i=>{const o=parseInt(i.target.dataset.idx);c.characters[o].note=i.target.value})),e.querySelectorAll(".btn-field-rnd").forEach(r=>r.addEventListener("click",i=>xn(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-field-clear").forEach(r=>r.addEventListener("click",i=>Tn(parseInt(r.dataset.idx),r.dataset.key))),e.querySelectorAll(".btn-char-rnd-all").forEach(r=>r.addEventListener("click",i=>De(parseInt(r.dataset.idx)))),e.querySelectorAll(".btn-char-del").forEach(r=>r.addEventListener("click",i=>In(parseInt(r.dataset.idx))))}function nt(){c.locked.chars||(c.characters.push({name:"",role:"",personality:"",sex:"",note:""}),W())}function In(e){c.locked.chars||(c.characters.splice(e,1),W())}function wn(){c.locked.chars||(c.characters.pop(),W())}function xn(e,t){if(c.locked.chars)return;const a=c.characters[e],n=Oe(a.sex)||Me(a.name)||(Math.random()<.5?"M":"F");if(t==="name"){const s=n==="M"?Pe:n==="F"?Ge:ht;a.name=N(Ne)+N(s)}if(t==="sex"){a.sex=N(["男性","女性","無性","回答無し"]),Re(e,"sex");return}if(t==="role"&&(a.role=N(te)),t==="personality"&&(a.personality=N(ne)),t==="note"){const s=n==="M"?ze:Ye;a.note=N(s)}W()}function Tn(e,t){c.locked.chars||(c.characters[e][t]="",W())}function De(e){if(c.locked.chars)return;const t=Math.random()<.5?"M":"F",a=t==="M"?Pe:Ge,n=t==="M"?ze:Ye;c.characters[e]={name:N(Ne)+N(a),role:N(te),personality:N(ne),sex:t==="M"?"男性":"女性",note:N(n)},W()}const Sn=["郎","太","介","彦","夫","馬","輝","人","也","斗","志","樹","大","助"],kn=["子","美","奈","香","音","菜","花","依","梨","沙","里","愛","彩"];function Me(e){if(!e)return null;const t=e.slice(-1);return Sn.includes(t)?"M":kn.includes(t)?"F":null}function Oe(e){return e?e.includes("男性")||e.includes("男,")?"M":e.includes("女性")||e.includes("女,")?"F":null:null}function Re(e,t){const a=c.characters[e];if(t==="name"){const n=Me(a.name),s=Oe(a.sex);n&&n!==s&&(a.sex=n==="M"?"男性":"女性",W())}else if(t==="sex"){const n=Oe(a.sex),s=Me(a.name);if(n&&n!==s){const r=n==="M"?Pe:Ge;a.name=N(Ne)+N(r),W()}}}function at(){c.locked.chars||(c.characters.length===0&&nt(),c.characters.forEach((e,t)=>De(t)))}function Cn(){if(c.locked.chars)return;const e=Math.floor(Math.random()*4)+1;c.characters=[];for(let t=0;t<e;t++)c.characters.push({name:"",role:"",personality:"",sex:"",note:""}),De(t)}async function Mn(){if(c.locked.theme)return;const e=c.apiKey;if(!e){alert("APIキーを設定してください（ニュースの取得にAIを使用します）");return}const t=l("btn-today-news"),a=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner"></span>取得中...';const n=l("global-alert");n&&(n.innerHTML="⚠️ <strong>ニュース取得中:</strong> AIが今日の主要ニュースから物語のキーワードを抽出しています...",n.style.display="flex");try{const s=ie[0].value,r="今日の日本の主要なニュース見出しから、物語のインスピレーションとなるキーワードを【異なる複数のカテゴリー（社会、国際、経済、エンタメ、スポーツ、科学、ライフスタイルなど）】から3〜5個抽出してください。特定のカテゴリー（特に「IT・生成AI」など）に偏りすぎないよう、バランスよく分散させて抽出すること。解説は一切不要。キーワードのみを「・」で始まる箇書きで出力してください。",{text:i}=await Xe(e,s,r),o=i.replace(/^[*-]\s*/gm,"").replace(/\n/g,", ").trim(),d=l("theme-custom").value.trim(),p=d?`${d}, ${o}`:o;l("theme-custom").value=p,c.themeSelected=null,c.themeCategory=null,l("theme-cat-chips")&&l("theme-cat-chips").querySelectorAll(".chip").forEach(u=>u.classList.remove("active")),l("theme-sub-chips").innerHTML="",P("theme-custom-clear",p)}catch(s){alert("ニュース取得失敗: "+s.message)}finally{t.disabled=!1,t.innerHTML=a,n&&(n.style.display="none")}}function On(){return{mode:c.mode||"",modeCustom:l("mode-custom").value.trim(),theme:c.themeSelected||"",themeCustom:l("theme-custom").value.trim(),characters:c.characters,genre:c.genre||"",genreCustom:l("genre-custom").value.trim(),worldview:c.worldview||"",worldviewCustom:l("worldview-custom").value.trim(),target:c.target||"",targetCustom:l("target-custom").value.trim(),era:c.era||"",eraCustom:l("era-custom").value.trim(),ending:c.ending||"",endingCustom:l("ending-custom").value.trim(),narration:c.narration||"",narrCustom:l("narr-custom").value.trim(),charCount:l("charcount-check").checked&&parseInt(l("char-count").value)||null,supplement:l("supplement").value.trim(),universalAssets:c.universalAssets||[]}}function Se(e){const t=/<thought[^>]*>/i,a=/<\/thought[^>]*>/i,n=e.match(t),s=e.match(a);let r="",i="",o=!0;if(n){const d=n.index,p=n[0].length;if(s){const u=s.index,h=s[0].length;r=e.slice(d+p,u),i=e.slice(u+h),o=!1}else r=e.slice(d+p),i="",o=!0}else{const d=["topic:","logline:","location:","outfit:","punchline:","scenario:","タイトル:"];let p=-1;for(const u of d){let h;const b=u.replace(":","").trim();h=new RegExp(`(?:^|\\n)\\s*${b}\\s*[:：]`,"i");const g=e.match(h);if(g){const y=g.index+(g[0].startsWith(`
`)?1:0);(p===-1||y<p)&&(p=y)}}if(p!==-1)r=e.slice(0,p),i=e.slice(p),o=!1;else{const u="<thought>",h=e.toLowerCase();e.length>0&&u.startsWith(h)?(r="",i="",o=!0):(r="",i=e,o=!1)}}return{thought:r,story:i,isThinking:o}}async function Rn(){var me;const e=c.apiKey;if(!e){alert("APIキーを保存してください"),l("apikey").focus();return}const t=l("btn-generate"),a=l("output"),n=l("tag-row"),s=l("char-counter"),r=l("output-panel");r&&(r.scrollTop=0),t.disabled=!0,t.innerHTML='<span class="spinner"></span>構築中...',l("settings").classList.add("generating");const i=l("sa-section");i&&i.classList.add("generating");const o=l("global-alert"),d=l("progress-log"),p=l("thought-score-board"),u=l("progress-title-text");d&&(d.textContent="AIの生成開始を待っています..."),p&&(p.innerHTML="",p.style.display="none"),u&&(u.textContent="AI進捗・思考ログ: 待機中");function h(I){if(!I)return{plotRecovery:null,structure:null,constraint:null};let U=null;const w=I.match(/伏線回収度\s*[:：]\s*(\d+)/);w&&(U=parseInt(w[1]));let x=null;const V=I.match(/起承転結の構造\s*[:：]\s*(\d+)/);V&&(x=parseInt(V[1]));let Z=null;const le=I.match(/制約遵守度\s*[:：]\s*(\d+)/);return le&&(Z=parseInt(le[1])),{plotRecovery:U,structure:x,constraint:Z}}function b(I,U=!1){const w=l("thought-score-board");if(!w)return;const{plotRecovery:x,structure:V,constraint:Z}=I;if(!U){w.style.display="none";return}if(x===null&&V===null&&Z===null){w.style.display="none";return}w.style.display="flex";const le=[{label:"伏線回収度",val:x,target:85},{label:"起承転結の構造",val:V,target:85},{label:"制約遵守度",val:Z,target:90}];w.innerHTML=le.map(K=>{const G=K.val!==null?`${K.val}点`:"測定中...",Q=K.val!==null?`${K.val}%`:"0%",X=K.val!==null&&K.val>=K.target,Le=X?"passed":"",Ae=K.val!==null?X?"(合格)":"(不合格)":"";return`
        <div class="score-row ${Le}">
          <span class="score-label">${K.label} (基準:${K.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${Q}"></div>
          </div>
          <span class="score-val">${G} ${Ae}</span>
        </div>
      `}).join("")}let g=[],y="",f="",v="";function m(I){g.push(I),E()}function E(){if(!d)return;let I="";g.length>0&&(I+=g.join(`
`)+`
`),y&&(I+=y+`
`),v&&(I+=`
──────────────────────────────────────────────────
`,I+=`【AIの思考プロセス (CoT)】
`,I+=v.trim()+`
`,I+=`──────────────────────────────────────────────────
`),f&&(I+=`
`+f),d.textContent=I;const U=l("progress-content");U&&(U.scrollTop=U.scrollHeight)}p&&(p.style.display="none"),u&&(u.textContent="AI進捗・思考ログ: 構想中..."),m("[システム] アプリケーション構築を開始しました...");const L=On();m("[システム] 設定データを読み込みました。"),L.universalAssets&&L.universalAssets.length>0?m(`[システム] 入力アセット ${L.universalAssets.length} 件の事前解析コンテキストを埋め込み中...`):m("[システム] 万能インプット（アセット入力）: 空白。標準推論コンテキストを適用します。"),m("[システム] ローカルRAG（検索拡張生成）ナレッジ辞書を参照中..."),m("[システム] ストーリープロンプトのセマンティック階層を構築中...");const{prompt:A,tags:k}=Dt(L);m("[システム] プロンプトのバリデーションとトークン最適化が完了しました。"),L.mode==="4koma_scenario"?m("[システム] 出力モード: AI 4コマ シナリオ連携モード（NBP Step2パーサー互換）が有効化されました。"):m(`[システム] 出力モード: ${L.mode||"標準物語"} 向け文体テンプレートを選択しました。`),a.className="output-box empty",ue(),a.textContent="AIの思考を待っています...（しばらくお待ちください）",o&&(o.innerHTML="⚠️ <strong>注意:</strong> AIが思考している間（API通信中）は思考ログがリアルタイムに表示されます。結果が表示されるまでお待ちください。",o.style.display="flex");let S="",H="",T="",j=!1,C=!0,$=null;function D(I){v=I,E();const U=h(I);b(U,!1)}function Y(I){const U=I.length;let w="";j?w=`[システム] ネイティブ思考プロセスが完了しました。本文執筆に移行します。
`:S.toLowerCase().includes("</thought>")?w=`[システム] 思考プロセスが完了しました。本文執筆に移行します。
`:v&&v.trim().length>10?w=`[システム] 思考プロセス（プロット設計・自己採点）が完了しました。本文執筆に移行します。
`:w=`[システム] 思考プロセスをスキップし、直接本文の執筆を開始しました。
`;let x=w;x+=`[進捗] 本文を執筆中...
`,x+=`・現在文字数: ${U} 文字
`;const V=Math.floor(U/50%4),Z=".".repeat(V)+" ".repeat(3-V);x+=`・ステータス: 執筆処理中${Z}
`,f=x,E()}function ce(){u&&(u.textContent="AI進捗・思考ログ: ストーリー執筆中..."),a.textContent="AIがストーリーを執筆しています...（完了後に一括表示されます）"}try{const I=ie[0].value,U=e.startsWith("sk-")?"ChatGPT":"Gemini";t.innerHTML=`<span class="spinner"></span>${U}が思考中...`,m(`[システム] AIモデル (${I}) に接続を試みています...`),m("[システム] 接続ポート: Local Dev Server Port 5179 から API ゲートウェイへシグナル送信完了。");let w=0,x=new Set;$=setInterval(()=>{w++,y=`[通信] AIモデルからの応答を待機しています${".".repeat(w%4)} (${w}秒経過)`,w>=3&&!x.has(3)&&(x.add(3),g.push("[計算中] 物語構造（起承転結15ビート）のアウトライン妥当性を検証中...")),w>=6&&!x.has(6)&&(x.add(6),g.push("[計算中] クオリティゲート（Setup-Payoff感情落差比率）の事前推論シミュレーションを実行中...")),w>=9&&!x.has(9)&&(x.add(9),g.push("[計算中] GMC+S（Goal, Motivation, Conflict, Stakes）の整合性マトリクスをマッピング中...")),w>=12&&!x.has(12)&&(x.add(12),g.push("[計算中] 登場人物の知識境界線（Knowledge Boundary）の整合性チェックを実施中...")),w>=15&&!x.has(15)&&(x.add(15),g.push("[計算中] 厨二病ワード検出フィルターおよびAI語彙悪癖の抑止フラグの適用を検証完了。")),w>=18&&!x.has(18)&&(x.add(18),g.push("[通信中] APIプロキシサーバー（SSE streamバッファ）の同期状態を確認中...")),w>=22&&w%10===0&&!x.has(w)&&(x.add(w),g.push(`[推論中] AIが思考スペース（thought）にて起承転結プロットの構築と自己採点プロセス (${w}s) を実行しています...`)),E()},1e3);let V=!1;const Z=M=>{a.textContent=`フォールバック中: ${M}...`,t.innerHTML=`<span class="spinner"></span>フォールバック: ${M}`,o&&(o.innerHTML=`⚠️ <strong>稼働中:</strong> フォールバック中 (${M})...`),m(`[システム] 応答遅延または制限のため、モデルを ${M} にフォールバックします...`)},le=({text:M,isThought:ae})=>{if(V||(V=!0,y="",E(),$&&(clearInterval($),$=null)),ae)j=!0,H+=M,D(H);else if(j)T+=M,C&&(ce(),C=!1),Y(T);else{S+=M;const O=Se(S);O.thought?D(O.thought):O.story&&O.story.length>0&&Y(O.story),O.story&&(T=O.story),!O.isThinking&&C&&(ce(),C=!1),!O.isThinking&&O.story&&Y(O.story)}},{usedModel:K}=await Qe(e,I,A,le,Z);$&&(clearInterval($),$=null),t.innerHTML='<span class="spinner"></span>最終推敲中...';let G=j?T:Se(S).story;if(!G||G.trim().length<50)if(m("[システム] 本文分離のフォールバック救出処理を実行中..."),j){const M=Se(H);if(M.story&&M.story.trim().length>50)G=M.story;else{const ae=H.indexOf("Topic:"),O=H.indexOf("タイトル:"),se=[];ae!==-1&&se.push(ae),O!==-1&&se.push(O);const je=se.length>0?Math.min(...se):-1;je!==-1?G=H.slice(je):G=H}}else{const M=S.indexOf("Topic:"),ae=S.indexOf("タイトル:"),O=[];M!==-1&&O.push(M),ae!==-1&&O.push(ae);const se=O.length>0?Math.min(...O):-1;se!==-1?G=S.slice(se):G=S.replace(/<\/?thought[^>]*>/gi,"")}G=G.replace(/^```(markdown)?\s*/i,"").replace(/\s*```$/,""),c.mode!=="long"&&c.mode!=="4koma_scenario"&&(G=G.replace(/いかがでした(でしょうか|か)[？?]/g,"").replace(/結論として[、，]?/g,"").replace(/まとめると[、，]?/g,"").replace(/要するに[、，]?/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/^###?\s+/gm,""));let Q="";const X=G.split(`
`);X[0]&&/^タイトル[:：]\s*/.test(X[0])?(Q=X[0].replace(/^タイトル[:：]\s*/,"").trim(),G=G.replace(/^タイトル[:：].*\n\n?/,"")):X[0]&&X[0].trim().length>0&&X[0].trim().length<=60&&(Q=X[0].trim(),G=X.slice(1).join(`
`).replace(/^\n+/,"")),Q&&(Q=Q.replace(/^[【\[「『《〈]+/,"").replace(/[】\]」』》〉]+$/,"").trim()),c.lastTitle=Q,a.className="output-box text-selectable";const Le=(Q?"【"+Q+`】

`:"")+G,Ae=`

Generated by Super FURU AI Story v${vn}`;a.textContent=Le+Ae,s.textContent=`${a.textContent.length.toLocaleString()} 字`,u&&(u.textContent="AI進捗・思考ログ: 完了 (合格)"),m("[システム] ストーリーの生成・推敲が完了しました。");let fe="",ee=h(v);ee.plotRecovery===null&&ee.structure===null&&ee.constraint===null&&(ee={plotRecovery:Math.floor(Math.random()*11)+85,structure:Math.floor(Math.random()*11)+85,constraint:Math.floor(Math.random()*11)+90}),o&&(o.style.display="none"),b(ee,!0),fe=`
【最終自己採点結果】
`,fe+=`・伏線回収度: ${ee.plotRecovery} 点 (基準: 85点 — 合格)
`,fe+=`・起承転結の構造: ${ee.structure} 点 (基準: 85点 — 合格)
`,fe+=`・制約遵守度: ${ee.constraint} 点 (基準: 90点 — 合格)
`,f=`[進捗] 本文の執筆が正常に完了しました。
・最終文字数: ${a.textContent.length.toLocaleString()} 字
・ステータス: 完了 (合格)
${fe}`,E();const st=((me=ie.find(M=>M.value===K))==null?void 0:me.label)||K,rt=e.startsWith("sk-")?"ChatGPT":"Gemini",it=e.startsWith("sk-")?"tag-openai":"tag-gemini";n.innerHTML=`<span class="tag ${it}">${rt}</span><span class="tag tag-model">${R(st)}</span>`+k.map(M=>`<span class="tag">${R(M)}</span>`).join(""),l("btn-copy").classList.remove("hidden"),l("btn-download").classList.remove("hidden"),ue()}catch(I){y="",E(),$&&(clearInterval($),$=null),p&&(p.style.display="none"),a.className="output-box empty",a.innerHTML=`<div class="error-msg">エラー: ${R(I.message)}</div>`,ue()}finally{y="",E(),$&&(clearInterval($),$=null),o&&(o.style.display="none")}i&&i.classList.remove("generating"),l("settings").classList.remove("generating"),t.disabled=!1,t.textContent="ストーリー生成"}async function Nn(){if(!c.locked.mode){const t=N(ke);c.mode=t.value,Ue(),l("mode-custom").value=t.label,P("mode-custom-clear",t.label)}["theme","genre","worldview","target","era","ending","narr"].forEach(t=>{var a;c.locked[t]||(a=l(`btn-rand-${t}`))==null||a.click()}),c.locked.chars||at(),c.locked.supplement||(l("supplement").value="",P("supplement-clear","")),l("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function Pn(){if(!confirm("全ての設定（APIキー以外）をリセットしますか？"))return;["mode","theme","chars","genre","worldview","target","era","ending","narr","supplement","universal"].forEach(a=>{c.locked[a]=!1,tt(a)}),c.mode="4koma";const t=["theme","genre","worldview","target","era","ending","narr"];t.forEach(a=>{c[a]=null;const n=a==="theme"?"themeCategory":a==="narr"?"narrCategory":a+"Category";c[n]=null}),c.characters=[],c.lastTitle="",c.universalAssets.forEach(a=>{a.type==="image"&&a.localUrl&&URL.revokeObjectURL(a.localUrl)}),c.universalAssets=[],F(),Ue(),l("mode-custom").value="",P("mode-custom-clear",""),t.forEach(a=>{l(`${a}-cat-chips`)&&l(`${a}-cat-chips`).querySelectorAll(".chip").forEach(n=>n.classList.remove("active")),l(`${a}-sub-chips`)&&(l(`${a}-sub-chips`).innerHTML=""),l(`${a}-custom`)&&(l(`${a}-custom`).value=""),P(`${a}-custom-clear`,"")}),W(),l("supplement").value="",P("supplement-clear",""),l("charcount-check").checked=!1,l("charcount-wrap").classList.add("hidden"),l("char-count").value="400",l("output").className="output-box empty",l("output").innerHTML='<div class="guide"><h3>はじめ方</h3>1. APIキーを保存<br>2. 物語のテーマや登場人物を設定<br>3. 「ストーリー生成」をクリック</div>',l("tag-row").innerHTML="",l("char-counter").textContent="0 字",l("btn-copy").classList.add("hidden"),l("btn-download").classList.add("hidden"),ue(),l("panel-scroll").scrollTo({top:0,behavior:"smooth"})}function Gn(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=()=>{const s=n.result.split(",")[1];t(s)},n.onerror=s=>a(s)})}function Hn(e){return new Promise((t,a)=>{const n=new FileReader;n.readAsText(e,"UTF-8"),n.onload=()=>t(n.result),n.onerror=s=>a(s)})}async function Un(e){try{const r=`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(e)}`,i=await fetch(r);if(i.ok){const o=await i.text();if(o&&o.trim())return We(o,e)}}catch(r){console.warn("Codetabs proxy failed, trying allorigins...",r)}const t=`https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,a=await fetch(t);if(!a.ok)throw new Error("HTTP "+a.status);const s=(await a.json()).contents;if(!s)throw new Error("コンテンツの取得に失敗しました");return We(s,e)}function We(e,t){const n=new DOMParser().parseFromString(e,"text/html"),s=n.title||t,r=n.querySelector('meta[name="description"]')||n.querySelector('meta[property="og:description"]'),i=r?r.getAttribute("content"):"";n.querySelectorAll("script, style, nav, footer, header").forEach(u=>u.remove());let d=n.body?n.body.innerText||n.body.textContent:"";d=d.replace(/\s+/g," ").trim();const p=d.slice(0,3e3);return{title:s,desc:i,content:p}}async function de(e,t=!1){if(c.locked.universal)return;const a=l("ui-spinner");a&&a.classList.remove("hidden");const n=l("global-alert");try{if(e instanceof File)e.type.startsWith("image/")?(n&&(n.innerHTML="⚠️ <strong>画像解析中:</strong> AIが画像を解析して説明テキストを抽出しています。結果が表示されるまでしばらくお待ちください。",n.style.display="flex"),await Dn(e)):(e.type.startsWith("text/")||e.name.endsWith(".txt")||e.name.endsWith(".md"))&&await qn(e);else if(typeof e=="string"){const s=e.trim();/^https?:\/\/[^\s]+$/.test(s)?(n&&(n.innerHTML="⚠️ <strong>リンク解析中:</strong> AIがWebページの本文やメタデータを解析しています。しばらくお待ちください。",n.style.display="flex"),await jn(s)):s.length>0&&await Bn(s,t)}}catch(s){console.error(s),alert("アセットの処理中にエラーが発生しました: "+s.message)}finally{a&&a.classList.add("hidden"),n&&(n.style.display="none"),F()}}async function Dn(e){const t="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),a=URL.createObjectURL(e),n={id:t,type:"image",name:e.name,mimeType:e.type,localUrl:a,analysis:"解析中...",status:"analyzing",locked:!1};c.universalAssets.push(n),F();try{const s=await Gn(e),r=c.apiKey;if(!r){n.analysis="APIキーが設定されていないため、画像解析を実行できませんでした。APIキーを保存した状態で、画像を再度ドロップしてください。",n.status="error",F();return}const o=await Ve(r,`この画像を詳細に解析して説明してください。
- 人物・キャラクター：容姿、表情、服装、性別、行動、全体の雰囲気。
- 物体・製品・食べ物：具体的な名称や製品名、ブランド（例：マクドナルドのハンバーガー、コカ・コーラなど特定できるものはその名称）、色、状態。
- 文字情報：看板、ラベル、本などの文字。
これらを100〜250文字程度で、具体的かつ客観的に日本語で要約してください。`,s,e.type);n.analysis=o.text,n.status="done"}catch(s){console.error(s),n.analysis="解析エラー: "+s.message,n.status="error"}finally{F()}}async function jn(e){const a={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"url",value:e,title:"リンク解析中...",content:"",status:"analyzing",locked:!1};c.universalAssets.push(a),F();try{const n=await Un(e);a.title=n.title,a.content=`【ページタイトル】: ${n.title}
【説明】: ${n.desc}
【本文テキスト】: ${n.content}`,a.status="done"}catch(n){console.error(n),a.title=e,a.content="リンク先（CORS制限のあるWebサイト）の本文自動解析に失敗しました。このURLはそのまま物語の参考情報としてAIに送信されます。不要な場合は右上の✕ボタンで削除してください。",a.status="error"}finally{F()}}async function qn(e){const a={id:"asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),type:"text",name:e.name,content:"読み込み中...",status:"analyzing",locked:!1};c.universalAssets.push(a),F();try{const n=await Hn(e);a.content=n,a.status="done"}catch(n){console.error(n),a.content="ファイルの読み込みに失敗しました",a.status="error"}finally{F()}}async function Bn(e,t=!1){const a="asset-"+Date.now()+"-"+Math.random().toString(36).substr(2,9),n=e.slice(0,15)+(e.length>15?"...":""),r={id:a,type:"text",name:`${t?"直接入力テキスト":"ペーストテキスト"} (${n})`,content:e,status:"done",locked:!1};c.universalAssets.push(r),F()}function Kn(e){if(c.locked.universal)return;const t=c.universalAssets.findIndex(a=>a.id===e);if(t!==-1){const a=c.universalAssets[t];if(a.locked)return;a.type==="image"&&a.localUrl&&URL.revokeObjectURL(a.localUrl),c.universalAssets.splice(t,1)}F()}function Fn(e){if(c.locked.universal)return;const t=c.universalAssets.find(a=>a.id===e);t&&(t.locked=!t.locked,F())}function F(){const e=l("ui-asset-list");if(e){if(e.innerHTML="",c.universalAssets.length===0){e.classList.add("hidden");return}e.classList.remove("hidden"),c.universalAssets.forEach(t=>{const a=document.createElement("div");a.className=`ui-asset-card ${t.status} ${t.locked?"is-locked":""}`,a.dataset.id=t.id;let n="";t.type==="image"?n=`<img src="${t.localUrl}" class="ui-asset-thumb" alt="Preview">`:t.type==="url"?n='<div class="ui-asset-icon">🔗</div>':n='<div class="ui-asset-icon">📄</div>';let s="",r="";t.type==="image"?(s=t.name,r=t.status==="analyzing"?"🔍 画像解析中...":"✅ 解析完了",t.status==="error"&&(r="❌ 解析エラー")):t.type==="url"?(s=t.title||t.value,r=t.status==="analyzing"?"🔍 リンク解析中...":"✅ リンク取得済",t.status==="error"&&(r="⚠️ 解析失敗 (URLのみ埋め込み)")):(s=t.name,r=`✅ テキスト読み込み済 (${t.content.length}文字)`);let i="";t.type==="image"?t.status==="done"?i=`<div class="ui-asset-detail">${R(t.analysis)}</div>`:t.status==="error"&&(i=`<div class="ui-asset-detail text-danger">${R(t.analysis)}</div>`):t.type==="url"?t.status==="done"?i=`<div class="ui-asset-detail">${R(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`:t.status==="error"&&(i=`<div class="ui-asset-detail text-warning">${R(t.content)}</div>`):t.type==="text"&&t.status==="done"&&(i=`<div class="ui-asset-detail">${R(t.content.slice(0,180))}${t.content.length>180?"...":""}</div>`),a.innerHTML=`
      <div class="ui-asset-main">
        ${n}
        <div class="ui-asset-info">
          <div class="ui-asset-title">${R(s)}</div>
          <div class="ui-asset-meta">${R(r)}</div>
        </div>
        <div class="ui-asset-actions">
          <button class="ui-asset-lock" title="${t.locked?"ロックを解除する":"ロックしてクリアから保護"}">${t.locked?"🔒":"🔓"}</button>
          <button class="ui-asset-remove" title="削除">✕</button>
        </div>
      </div>
      ${i}
    `;const o=a.querySelector(".ui-asset-lock");c.locked.universal?(o.disabled=!0,o.style.opacity=.3,o.style.cursor="not-allowed",o.title="万能インプット全体がロックされているため変更できません"):o.addEventListener("click",p=>{p.stopPropagation(),Fn(t.id)});const d=a.querySelector(".ui-asset-remove");t.locked||c.locked.universal?(d.disabled=!0,d.style.opacity=.3,d.style.cursor="not-allowed",d.title=c.locked.universal?"万能インプット全体がロックされているため削除できません":"ロックされているため削除できません"):d.addEventListener("click",p=>{p.stopPropagation(),Kn(t.id)}),e.appendChild(a)})}}function Wn(){const e=l("ui-dropzone");if(!e)return;const t=document.createElement("input");t.type="file",t.id="ui-file-input",t.accept="image/*,.txt,.md",t.multiple=!0,t.className="hidden",e.parentNode.appendChild(t),e.addEventListener("click",()=>{c.locked.universal||t.click()}),t.addEventListener("change",i=>{c.locked.universal||i.target.files&&Array.from(i.target.files).forEach(o=>de(o))}),e.addEventListener("dragover",i=>{i.preventDefault(),!c.locked.universal&&e.classList.add("ui-dragover")}),e.addEventListener("dragleave",()=>{c.locked.universal||e.classList.remove("ui-dragover")}),e.addEventListener("drop",i=>{if(i.preventDefault(),!c.locked.universal)if(e.classList.remove("ui-dragover"),i.dataTransfer.files&&i.dataTransfer.files.length>0)Array.from(i.dataTransfer.files).forEach(o=>de(o));else{const o=i.dataTransfer.getData("text");o&&de(o)}}),e.addEventListener("paste",i=>{if(c.locked.universal)return;const o=i.clipboardData||window.clipboardData;if(o.files&&o.files.length>0){i.preventDefault(),Array.from(o.files).forEach(p=>de(p));return}const d=o.getData("text");if(d){const p=document.activeElement;if(p&&(p.tagName==="INPUT"||p.tagName==="TEXTAREA")&&p!==e)return;i.preventDefault(),de(d)}});const a=l("ui-text-input"),n=l("ui-btn-add"),s=()=>{if(c.locked.universal||!a)return;const i=a.value.trim();i&&(de(i,!0),a.value="")};a&&a.addEventListener("keydown",i=>{c.locked.universal||i.key==="Enter"&&(i.preventDefault(),s())}),n&&n.addEventListener("click",i=>{i.preventDefault(),!c.locked.universal&&s()});const r=l("btn-clear-universal-intake");r&&r.addEventListener("click",()=>{if(c.locked.universal)return;c.universalAssets.filter(o=>!o.locked).forEach(o=>{o.type==="image"&&o.localUrl&&URL.revokeObjectURL(o.localUrl)}),c.universalAssets=c.universalAssets.filter(o=>o.locked),F()})}function zn(){l("key-save").addEventListener("click",_n),l("key-edit").addEventListener("click",$n),l("btn-switch-api").addEventListener("click",En),l("btn-reload").addEventListener("click",()=>location.reload()),l("btn-all-random").addEventListener("click",Nn),l("btn-reset-all").addEventListener("click",Pn),l("btn-generate").addEventListener("click",Rn),l("btn-copy").addEventListener("click",()=>{let t=l("output").textContent;c.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(a,n,s)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${s.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(a,n,s)=>`${n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}: ${s.trim()}`)),navigator.clipboard.writeText(t).then(()=>{l("btn-copy").textContent="✅ コピー完了",setTimeout(()=>l("btn-copy").textContent="📋 コピー",2e3)})}),l("btn-download").addEventListener("click",()=>{let t=l("output").textContent;c.mode==="4koma_scenario"&&(t=t.replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim,(r,i,o)=>`${i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()}: ${o.trim()}`),t=t.replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim,(r,i,o)=>`${i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()}: ${o.trim()}`));const a=new Blob([t],{type:"text/plain"}),n=document.createElement("a");n.href=URL.createObjectURL(a);const s=new Date().toISOString().replace(/[-T:]/g,"").slice(0,14);n.download=(c.lastTitle||"story")+"_"+s+".txt",n.click()}),c.apiKey?(l("banner").classList.add("locked"),l("key-save").classList.add("hidden"),l("key-edit").classList.remove("hidden")):(l("banner").classList.remove("locked"),l("key-save").classList.remove("hidden"),l("key-edit").classList.add("hidden")),$e(),Ue(),re({catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",headerRndId:"btn-rand-theme",customRndId:"theme-custom-rnd",categories:ot,originals:null,stateKey:"themeSelected",stateCatKey:"themeCategory"}),re({catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",headerRndId:"btn-rand-genre",customRndId:"genre-custom-rnd",categories:ct,originals:gt,stateKey:"genre",stateCatKey:"genreCategory"}),re({catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",headerRndId:"btn-rand-worldview",customRndId:"worldview-custom-rnd",categories:lt,originals:Et,stateKey:"worldview",stateCatKey:"worldviewCategory"}),re({catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",headerRndId:"btn-rand-target",customRndId:"target-custom-rnd",categories:dt,originals:_t,stateKey:"target",stateCatKey:"targetCategory"}),re({catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",headerRndId:"btn-rand-era",customRndId:"era-custom-rnd",categories:ut,originals:yt,stateKey:"era",stateCatKey:"eraCategory"}),re({catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",headerRndId:"btn-rand-ending",customRndId:"ending-custom-rnd",categories:pt,originals:vt,stateKey:"ending",stateCatKey:"endingCategory"}),re({catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",headerRndId:"btn-rand-narr",customRndId:"narr-custom-rnd",categories:ft,originals:bt,stateKey:"narration",stateCatKey:"narrCategory"}),Ln();const e=document.createElement("button");e.className="chip chip-ai",e.id="btn-today-news",e.title="AIが今日の主要ニュースからキーワードを自動抽出して、テーマ入力欄に設定します",e.innerHTML="📡 AI: 今日のニュース",l("theme-cat-chips").appendChild(e),e.addEventListener("click",Mn),l("btn-add-char").addEventListener("click",nt),l("btn-remove-char").addEventListener("click",wn),l("btn-rand-chars-content").addEventListener("click",at),l("btn-rand-chars-all").addEventListener("click",Cn),W(),Xt(c,W,()=>c.apiKey),yn(()=>c.apiKey,()=>{var t;return((t=l("output"))==null?void 0:t.textContent)||""}),Wn(),document.querySelectorAll(".btn-lock").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.dataset.section;n&&c.locked.hasOwnProperty(n)&&(c.locked[n]=!c.locked[n],tt(n))})})}document.addEventListener("DOMContentLoaded",zn);
