function L(r){var t,e;const n=[],a=(o,l)=>{l&&n.push(`【${o}】${l}`)},s=(o,l)=>{l&&n.push(`  ・${o}: ${l}`)};return a("作風名",r.style_name),a("トーン",r.tone),typeof r.narrative_voice=="object"&&r.narrative_voice?(n.push("【語りの視点】"),s("人称",r.narrative_voice.person),s("距離感",r.narrative_voice.distance),s("信頼度",r.narrative_voice.reliability),s("介入度",r.narrative_voice.intrusion)):a("語りの視点",r.narrative_voice),r.sentence_style&&(n.push("【文体】"),s("平均文長",r.sentence_style.avg_length||r.sentence_style.length),s("文長変動",r.sentence_style.length_variation),s("文末パターン",r.sentence_style.ending_patterns||r.sentence_style.ending),s("リズム",r.sentence_style.rhythm),s("段落長",r.sentence_style.paragraph_length),s("段落構成",r.sentence_style.paragraph_structure)),r.vocabulary&&(n.push("【語彙】"),s("レベル",r.vocabulary.level),s("情報密度",r.vocabulary.density),s("レジスター",r.vocabulary.register),s("特徴",r.vocabulary.quirks),s("外来語",r.vocabulary.foreign_words),s("古語/現代語",r.vocabulary.archaic_modern)),r.rhetoric&&(n.push("【修辞技法】"),s("比喩スタイル",r.rhetoric.metaphor_style),s("比喩素材",r.rhetoric.metaphor_source),s("反復技法",r.rhetoric.repetition),s("アイロニー",r.rhetoric.irony_level),s("ユーモア",r.rhetoric.humor_type),s("その他",r.rhetoric.other_techniques)),r.description_focus&&(n.push("【描写フォーカス】"),s("視覚",r.description_focus.visual),s("聴覚",r.description_focus.auditory),s("触覚",r.description_focus.tactile),s("嗅覚/味覚",r.description_focus.olfactory_gustatory),s("運動感覚",r.description_focus.kinesthetic),s("空間把握",r.description_focus.spatial),s("心理描写",r.description_focus.psychological_depth||r.description_focus.psychological),s("Show:Tell",r.description_focus.show_tell_ratio)),r.dialogue&&(n.push("【セリフ】"),s("文体",r.dialogue.style),s("機能",r.dialogue.function),s("タグ",r.dialogue.tag_style),s("方言",r.dialogue.dialect_sociolect),s("サブテキスト",r.dialogue.subtext)),r.structure&&(n.push("【構造】"),s("テンポ",r.structure.pacing),s("場面転換",r.structure.scene_transition),s("時制",r.structure.time_handling),s("緊張曲線",r.structure.tension_curve),s("冒頭パターン",r.structure.opening_style),s("結末パターン",r.structure.closing_style)),r.emotional_architecture&&(n.push("【感情設計】"),s("主要感情",r.emotional_architecture.dominant_emotions),s("振り幅",r.emotional_architecture.emotional_range),s("カタルシス",r.emotional_architecture.catharsis_method),s("読者距離",r.emotional_architecture.reader_distance)),a("テーマ傾向",r.themes_tendency),a("文学的影響",r.literary_influences),(t=r.unique_features)!=null&&t.length&&(n.push("【固有の特徴】"),r.unique_features.forEach(o=>n.push(`  ・${o}`))),(e=r.anti_patterns)!=null&&e.length&&(n.push("【回避パターン（この作風では避けるべき表現）】"),r.anti_patterns.forEach(o=>n.push(`  ・${o}`))),n.join(`
`)}function N(r,t){const e=L(r),n=t.length,a=Math.floor(n*.8),s=Math.ceil(n*1.2);return`あなたはプロの小説家です。以下の「元のテキスト」を、指定された「作風パラメータ」のエッセンスを取り入れてリライトしてください。

## 最重要ルール（絶対遵守・違反厳禁）:
1. **物語の完全保持**: プロット（起承転結）、登場人物、セリフの内容、設定、事件の順序は一切変更しない。リライトとは「同じ物語を別の文体で語り直す」ことであり、物語の骨格を壊すことではない。
2. **文章として成立させる**: リライト結果は必ず「小説・物語」として完全に成立する連続した散文であること。単語の羅列、名詞だけの断片、箇条書き、詩のような体言止めの連続は絶対に禁止する。
3. **文字数の厳守**: 元のテキストは${n.toLocaleString()}字です。リライト結果は${a.toLocaleString()}字〜${s.toLocaleString()}字の範囲に収めること。この範囲を逸脱した場合は失敗とみなす。
4. **タイトル保持**: タイトルがあればそのまま維持する。
5. **出力制限**: リライト結果の本文のみを出力する。メタ解説、注釈、「以下はリライト結果です」等の前置きは一切付けない。
6. **物語の体裁の維持と自然な融合（ぶつ切りの解説挿入の禁止）**: 作風パラメータに「読者への問いかけ」「解説の挿入」「ツッコミ」等の指示がある場合、それらを小説のストーリーの中に唐突な「現実のPCやIT製品のブログ解説記事（例:『PCを処分する際、データをそのまま放置していませんか？』等）」としてそのままぶつ切りで挿入し、小説としての体裁を崩してはならない。作風（語り口、比喩のスタイル、ツッコミのトーン）は、必ず**小説内の事象（例: 電脳戦国世界での出来事や、登場人物の行動・運命）に引き寄せて、物語の一部として自然に溶け込ませて適用すること**。例えば、現実の製品名（EaseUS BitWiper等）やIT用語を比喩（例:「まるでSSDのウェアレベリングのように...」）や電脳世界の用語としてストーリー内に取り入れることは歓迎されるが、物語の文脈を無視して無関係な現実世界のブログ記事の地の文をそのまま挿入することは厳禁である。

## 作風パラメータの適用方針:
- 以下の作風パラメータは「方向性の指針」として参考にすること。極端な値があっても、それを100%忠実に再現しようとして物語を破壊してはならない。
- 例えば「体言止め40%」と記載されていても、全文を体言止めの名詞だけにしてはならない。あくまで「体言止めを多めに取り入れる」程度に留め、文章の流れと可読性を最優先する。
- 「Show:Tell比率 10:0」と記載されていても、最低限の説明文（Tell）は物語の理解に必要なため、完全排除はしない。
- 作風パラメータの各項目は「この方向性に寄せる」というガイドラインであり、物語の可読性・完成度を犠牲にしてまで厳密に従う必要はない。

## 作風パラメータ:
${e}

## 元のテキスト:
${t}

## リライト結果:`}function C(r){const t=r.indexOf("{");if(t===-1)return null;const e=r.lastIndexOf("}");return e===-1||e<t?null:r.slice(t,e+1)}function T(r){let t="",e=!1;for(let n=0;n<r.length;n++){const a=r[n];e?a==="\\"?(t+=a,n+1<r.length&&(t+=r[n+1],n++)):a==='"'?(e=!1,t+=a):a===`
`?t+="\\n":a==="\r"?(t+="\\n",n+1<r.length&&r[n+1]===`
`&&n++):a==="	"?t+="\\t":t+=a:(a==='"'&&(e=!0),t+=a)}return t}const x=["style_name","tone","narrative_voice","person","distance","reliability","intrusion","sentence_style","avg_length","length_variation","ending_patterns","rhythm","paragraph_length","paragraph_structure","vocabulary","level","density","register","quirks","foreign_words","archaic_modern","rhetoric","metaphor_style","metaphor_source","repetition","irony_level","humor_type","other_techniques","description_focus","visual","auditory","tactile","olfactory_gustatory","kinesthetic","spatial","psychological_depth","show_tell_ratio","dialogue","style","function","tag_style","dialect_sociolect","subtext","structure","pacing","scene_transition","time_handling","tension_curve","opening_style","closing_style","emotional_architecture","dominant_emotions","emotional_range","catharsis_method","reader_distance","themes_tendency","literary_influences","unique_features","anti_patterns","reproduction_prompt"];function q(r){let t=r.trim();t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,"");const e=[];if(x.forEach(a=>{const s=new RegExp(`"${a}"\\s*:`,"g");let o;for(;(o=s.exec(t))!==null;)e.push({key:a,start:o.index,end:o.index+o[0].length})}),e.sort((a,s)=>a.start-s.start),e.length===0)return JSON.parse(t);const n={};for(let a=0;a<e.length;a++){const s=e[a],o=e[a+1],l=s.end;let y=o?o.start:t.length,c=t.slice(l,y).trim();if(!o){const p=c.lastIndexOf("}");p!==-1&&(c=c.slice(0,p).trim())}if(c=c.replace(/^[,\s\r\n\t]+|[,\s\r\n\t]+$/g,""),c.startsWith("[")&&c.endsWith("]")){let p=c.slice(1,-1).trim();const f=[],v=p.split(/",\s*"/);v.forEach(($,m)=>{let _=$.trim();m===0&&_.startsWith('"')&&(_=_.slice(1)),m===v.length-1&&_.endsWith('"')&&(_=_.slice(0,-1)),_=_.replace(/"/g,'\\"'),_=_.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t"),f.push(_)}),n[s.key]=f}else{let p=!1;c.startsWith('"')&&(c=c.slice(1),p=!0),c.endsWith('"')&&(c=c.slice(0,-1)),p&&(c=c.replace(/"/g,'\\"'),c=c.replace(/\r?\n/g,"\\n").replace(/\t/g,"\\t")),n[s.key]=c}}return{style_name:n.style_name||"",tone:n.tone||"",narrative_voice:{person:n.person||"",distance:n.distance||"",reliability:n.reliability||"",intrusion:n.intrusion||""},sentence_style:{avg_length:n.avg_length||"",length_variation:n.length_variation||"",ending_patterns:n.ending_patterns||"",rhythm:n.rhythm||"",paragraph_length:n.paragraph_length||"",paragraph_structure:n.paragraph_structure||""},vocabulary:{level:n.level||"",density:n.density||"",register:n.register||"",quirks:n.quirks||"",foreign_words:n.foreign_words||"",archaic_modern:n.archaic_modern||""},rhetoric:{metaphor_style:n.metaphor_style||"",metaphor_source:n.metaphor_source||"",repetition:n.repetition||"",irony_level:n.irony_level||"",humor_type:n.humor_type||"",other_techniques:n.other_techniques||""},description_focus:{visual:n.visual||"",auditory:n.auditory||"",tactile:n.tactile||"",olfactory_gustatory:n.olfactory_gustatory||"",kinesthetic:n.kinesthetic||"",spatial:n.spatial||"",psychological_depth:n.psychological_depth||"",show_tell_ratio:n.show_tell_ratio||""},dialogue:{style:n.style||"",function:n.function||"",tag_style:n.tag_style||"",dialect_sociolect:n.dialect_sociolect||"",subtext:n.subtext||""},structure:{pacing:n.pacing||"",scene_transition:n.scene_transition||"",time_handling:n.time_handling||"",tension_curve:n.tension_curve||"",opening_style:n.opening_style||"",closing_style:n.closing_style||""},emotional_architecture:{dominant_emotions:n.dominant_emotions||"",emotional_range:n.emotional_range||"",catharsis_method:n.catharsis_method||"",reader_distance:n.reader_distance||""},themes_tendency:n.themes_tendency||"",literary_influences:n.literary_influences||"",unique_features:Array.isArray(n.unique_features)?n.unique_features:[],anti_patterns:Array.isArray(n.anti_patterns)?n.anti_patterns:[],reproduction_prompt:n.reproduction_prompt||""}}function D(r){try{return JSON.parse(r)}catch(e){console.warn("JSON初回パース失敗、修復を試行:",e.message)}let t=r.trim();t=T(t),t=t.replace(/\/\/[^\n]*/g,""),t=t.replace(/\/\*[\s\S]*?\*\//g,""),t=t.replace(/(\{|,)\s*'([^']+)'\s*:/g,'$1"$2":'),t=t.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(t)}catch(e){console.warn("JSON修復パース失敗、キー境界ベースの頑健なパースに移行します:",e.message);try{return q(t)}catch(n){console.warn("キー境界パースも失敗、最後の攻撃的修復を試行:",n.message);try{let a=t.replace(/\\(?!["\\/bfnrtu])/g,"\\\\");return JSON.parse(a)}catch(a){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${a.message}`)}}}}const E=8e4,w="🔬 超強引！作風解析を実行",I="⚠ 文字数超過 (OpenAI制限)",O="OpenAIモデルの入力上限を超える可能性が高いため実行できません。テキストを削るか、Geminiをご利用ください。";function b(r){return String(r||"").trim().length>0}function k(r,t=""){const e=Array.isArray(r)?r:[];return String(t||"").length+e.reduce((n,a)=>n+(a!=null&&a.content?String(a.content).length:0),0)}function J(r){return{disabled:!b(r)}}function j({apiKey:r,textFiles:t,imageFiles:e,directText:n,provider:a,openAiLimit:s=E}={}){const o=Array.isArray(t)&&t.length>0,l=Array.isArray(e)&&e.length>0,y=b(n),c=k(t,n);return a==="openai"&&c>s?{disabled:!0,text:I,title:O}:{disabled:!(r&&(o||l||y)),text:w,title:""}}function R({storyText:r,outputIsEmpty:t,hasAnalysis:e}={}){return{disabled:!(String(r||"").length>=10&&!t&&e)}}function A(r){return String(r??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Y(r,t=A){return(Array.isArray(r)?r:[]).map((e,n)=>`
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${t(e==null?void 0:e.name)}</span>
      <span class="sa-file-chars">${Number((e==null?void 0:e.charCount)||0).toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${n}" title="除去">✕</button>
    </div>
  `).join("")}function z(r,t=A){return(Array.isArray(r)?r:[]).map((e,n)=>`
    <div class="sa-image-item">
      <img src="${t(e==null?void 0:e.previewUrl)}" alt="${t(e==null?void 0:e.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${t(e==null?void 0:e.name)}</span>
      <button class="sa-file-remove" data-img-idx="${n}" title="除去">✕</button>
    </div>
  `).join("")}function H(r=[],t="",e=""){const n=Array.isArray(r)?r:[];let a="";return n.length>0&&(a+=`${n.join(`
`)}
`),t&&(a+=`${t}
`),e&&(a+=`
${e}`),a}const P=`あなたはプロの文芸批評家・計量文体学の専門家です。
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
`;function g(r,t,e,n){n&&r.push(`${t} ${e}: ${n}`)}function i(r,t,e){e&&r.push(`  ・${t}: ${e}`)}function h(r,t,e){r.push(""),r.push(`${t} ${e}:`)}function W(r){var n,a;const t=[],e=r;return g(t,"🏷️","作風名",e.style_name),g(t,"🎭","トーン",e.tone),typeof e.narrative_voice=="object"&&e.narrative_voice?(h(t,"🎙️","語りの視点"),i(t,"人称",e.narrative_voice.person),i(t,"距離感",e.narrative_voice.distance),i(t,"信頼度",e.narrative_voice.reliability),i(t,"介入度",e.narrative_voice.intrusion)):g(t,"🎙️","語りの視点",e.narrative_voice),h(t,"📝","文体"),e.sentence_style&&(i(t,"平均文長",e.sentence_style.avg_length||e.sentence_style.length),i(t,"文長変動",e.sentence_style.length_variation),i(t,"文末パターン",e.sentence_style.ending_patterns||e.sentence_style.ending),i(t,"リズム",e.sentence_style.rhythm),i(t,"段落長",e.sentence_style.paragraph_length),i(t,"段落構成",e.sentence_style.paragraph_structure)),h(t,"📖","語彙"),e.vocabulary&&(i(t,"レベル",e.vocabulary.level),i(t,"情報密度",e.vocabulary.density),i(t,"レジスター",e.vocabulary.register),i(t,"特徴",e.vocabulary.quirks),i(t,"外来語",e.vocabulary.foreign_words),i(t,"古語/現代語",e.vocabulary.archaic_modern)),e.rhetoric&&(h(t,"🔮","修辞技法"),i(t,"比喩スタイル",e.rhetoric.metaphor_style),i(t,"比喩素材",e.rhetoric.metaphor_source),i(t,"反復技法",e.rhetoric.repetition),i(t,"アイロニー",e.rhetoric.irony_level),i(t,"ユーモア",e.rhetoric.humor_type),i(t,"その他",e.rhetoric.other_techniques)),h(t,"🖼️","描写フォーカス"),e.description_focus&&(i(t,"視覚",e.description_focus.visual),i(t,"聴覚",e.description_focus.auditory),i(t,"触覚",e.description_focus.tactile),i(t,"嗅覚/味覚",e.description_focus.olfactory_gustatory),i(t,"運動感覚",e.description_focus.kinesthetic),i(t,"空間把握",e.description_focus.spatial),i(t,"心理描写",e.description_focus.psychological_depth||e.description_focus.psychological),i(t,"Show:Tell",e.description_focus.show_tell_ratio)),e.dialogue?(h(t,"💬","セリフ"),i(t,"文体",e.dialogue.style),i(t,"機能",e.dialogue.function),i(t,"タグ",e.dialogue.tag_style),i(t,"方言",e.dialogue.dialect_sociolect),i(t,"サブテキスト",e.dialogue.subtext)):g(t,"💬","セリフ回し",e.dialogue_style),e.structure?(h(t,"🏗️","構造"),i(t,"テンポ",e.structure.pacing),i(t,"場面転換",e.structure.scene_transition),i(t,"時制",e.structure.time_handling),i(t,"緊張曲線",e.structure.tension_curve),i(t,"冒頭パターン",e.structure.opening_style),i(t,"結末パターン",e.structure.closing_style)):g(t,"⏱️","テンポ",e.pacing),e.emotional_architecture&&(h(t,"❤️","感情設計"),i(t,"主要感情",e.emotional_architecture.dominant_emotions),i(t,"振り幅",e.emotional_architecture.emotional_range),i(t,"カタルシス",e.emotional_architecture.catharsis_method),i(t,"読者距離",e.emotional_architecture.reader_distance)),g(t,"🎯","テーマ傾向",e.themes_tendency),g(t,"📚","文学的影響",e.literary_influences),t.push(""),(n=e.unique_features)!=null&&n.length&&(t.push("✨ 固有の特徴:"),e.unique_features.forEach(s=>t.push(`  ・${s}`))),(a=e.anti_patterns)!=null&&a.length&&(t.push(""),t.push("🚫 回避パターン:"),e.anti_patterns.forEach(s=>t.push(`  ・${s}`))),t.push(""),t.push("━━━ 再現プロンプト ━━━"),t.push(e.reproduction_prompt||"（生成されませんでした）"),t.join(`
`)}function B(r,t=0){const e=String(r||"").trim();return e?{name:`直接入力テキスト_${t+1}`,text:e,charCount:e.length}:null}function M(r){return(Array.isArray(r)?r:[]).reduce((e,n)=>e+((n==null?void 0:n.charCount)||0),0)}function Z(r){const t=Array.isArray(r)?r:[];return`${t.length}件 / ${M(t).toLocaleString()}字`}const u=r=>document.getElementById(r),d="data-sa-generating-locked";function S(r,t){var e,n;r&&((e=r.setAttribute)==null||e.call(r,"aria-disabled",t?"true":"false"),(n=r.querySelectorAll)==null||n.call(r,"button, input, textarea, select").forEach(a=>{var o,l,y,c;if(t){(o=a.hasAttribute)!=null&&o.call(a,d)||(l=a.setAttribute)==null||l.call(a,d,a.disabled?"true":"false"),a.disabled=!0;return}const s=(y=a.getAttribute)==null?void 0:y.call(a,d);s!=null&&(a.disabled=s==="true",(c=a.removeAttribute)==null||c.call(a,d))}))}function G(r){const t=u("settings");t&&t.classList.add("generating");const e=u("sa-section");e&&(e.classList.add("generating"),S(e,!0));const n=document.querySelector(".btn-generate");n&&(n._origText=n.textContent,n.disabled=!0,n.innerHTML=`<span class="spinner"></span>${r}`);const a=u("sa-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${r}`,a.classList.remove("hidden"));const s=u("sa-reflect-api-status");s&&(s.innerHTML=`<span class="spinner"></span>${r}`,s.classList.remove("hidden"));const o=u("global-alert");o&&(o.innerHTML=`笞・・<strong>遞ｼ蜒堺ｸｭ:</strong> ${r}`,o.style.display="flex");const l=u("thought-score-board");l&&(l.style.display="none")}function U(r){const t=u("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${r}`);const e=u("sa-reflect-api-status");e&&(e.innerHTML=`<span class="spinner"></span>${r}`);const n=document.querySelector(".btn-generate");n&&(n.innerHTML=`<span class="spinner"></span>${r}`);const a=u("global-alert");a&&(a.innerHTML=`笞・・<strong>遞ｼ蜒堺ｸｭ:</strong> ${r}`);const s=u("thought-score-board");s&&(s.style.display="none")}function X(){const r=u("settings");r&&r.classList.remove("generating");const t=u("sa-section");t&&(t.classList.remove("generating"),S(t,!1));const e=document.querySelector(".btn-generate");e&&(e.disabled=!1,e.textContent=e._origText||"繧ｹ繝医・繝ｪ繝ｼ逕滓・");const n=u("sa-api-status");n&&n.classList.add("hidden");const a=u("sa-reflect-api-status");a&&a.classList.add("hidden");const s=u("global-alert");s&&(s.style.display="none")}export{N as A,C as M,X,G as Y,U as Z,B as a,J as b,P as c,R as d,H as e,W as f,j as g,Z as h,Y as i,z as j,D as y};
