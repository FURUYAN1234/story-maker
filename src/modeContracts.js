// Story Maker v4.9.9 public-mode contracts.
// Keep mode names, final prompt contracts, and public-mode detection outside main.js.

export const QUALITY_MARKER = '[SMK_PUBLIC_MODE_QUALITY_BOOST_V499]';

export const PUBLIC_MODES = [
  { value: '4koma', label: '4コマ漫画風' },
  { value: '4koma_scenario', label: 'AI 4koma シナリオ連携' },
  { value: 'short_short', label: 'ショートショート' },
  { value: 'novel', label: '短編小説' },
  { value: 'medium', label: '中編小説' },
  { value: 'scenario', label: '脚本/台本' },
  { value: 'manga', label: 'ストーリー漫画' },
  { value: 'essay', label: 'エッセイ' },
  { value: 'poem', label: '詩・ポエム' },
  { value: 'fairy', label: '童話/絵本' },
  { value: 'letter', label: '手紙/書簡体' },
  { value: 'diary', label: '日記/独白体' },
  { value: 'documentary', label: 'ドキュメンタリー' },
  { value: 'radio', label: 'ラジオドラマ' },
];

export const PUBLIC_MODE_VALUES = PUBLIC_MODES.map(mode => mode.value);
export const MODE_LABELS = Object.fromEntries(PUBLIC_MODES.map(mode => [mode.value, mode.label]));

const SKIP_PATTERNS = [
  /JSONだけ|JSON only/i,
  /作風解析|style analysis/i,
  /画像を解析|character sheet|キャラクターシート/i,
  /キーワードのみ|今日の日本の主要なニュース/i,
  /長編小説の全体台帳|章単位で生成|全章台帳|blockBeats|allowedCharacters/i,
];

const MODE_PATTERNS = [
  ['4koma_scenario', /4koma_scenario|シナリオ連携|STEP2/i],
  ['4koma', /4コマ|四コマ|4koma/i],
  ['short_short', /ショートショート|ショート|掌編|short_short/i],
  ['medium', /中編小説|中編|medium/i],
  ['novel', /短編小説|短編|novel/i],
  ['scenario', /脚本|台本|scenario/i],
  ['manga', /ストーリー漫画|漫画|manga/i],
  ['essay', /エッセイ|essay/i],
  ['poem', /詩・ポエム|ポエム|詩|poem/i],
  ['fairy', /童話|絵本|fairy/i],
  ['letter', /手紙|書簡|letter/i],
  ['diary', /日記|独白|diary/i],
  ['documentary', /ドキュメンタリー|documentary/i],
  ['radio', /ラジオドラマ|ラジオ|radio/i],
];

const MODE_QUALITY_RULES = {
  '4koma': [
    '4コマは「状況、ズレ、反転、オチ」のリズムを必ず作る。',
    '各コマに、絵で見える動作、短いセリフ、読者が笑うためのズレを入れる。',
  ],
  '4koma_scenario': [
    'Topic、Logline、Location、Outfit、Punchline、Scenarioは制作に使える具体語で書く。',
    '4コマ部分は、感情、表情、カメラ、セリフ、オチの役割を分ける。',
  ],
  short_short: [
    '短い出来事に絞り、最後の一文で意味を反転、回収、または少しだけ苦くする。',
    '説明で畳まず、具体物、沈黙、言い間違い、小さな行動で余韻を作る。',
    '最低600字を目安に、導入、揺れ、反転、余韻までを省略せず書く。あらすじだけで終えない。',
  ],
  novel: [
    '主人公の欲望、障害、選択、代償、関係変化を一つの場面連鎖で完結させる。',
    '伏線は小物、発言、行動として前半に置き、終盤で感情を変えて回収する。',
    '最低2600字を目安に書く。2200字未満で終えた出力は失敗扱い。三つ以上の段落で場面を進め、結末を書く前に会話、行動、身体感覚、後始末、関係変化を厚くする。',
  ],
  medium: [
    '第1節で欲望と違和感、第2節で誤解または障害、第3節で選択と代償を描く。',
    '三節すべてで主人公の目的を連続させ、最後に場所、関係、小物の状態を変える。',
    '最低2600字を目安に、三節構成のそれぞれへ具体的な行動、会話、後始末を置く。',
  ],
  scenario: [
    'ト書きで行動、セリフで衝突、沈黙で本音を出す。説明ナレーションで解決しない。',
    '人物ごとの言い癖、言い淀み、隠している目的をセリフに混ぜる。',
    '最低1200字を目安に、場面、人物、ト書き、会話の往復、終盤の変化を揃える。',
  ],
  manga: [
    'ページごとに視線誘導、画面の変化、引きのコマを設計する。',
    '絵、セリフ、演出を分離し、聞いた説明文をコマ内に詰め込まない。',
    '最低1000字を目安に、複数ページまたは十分なコマ数で、絵として追える変化を置く。',
  ],
  essay: [
    'エッセイは小説ではない。架空人物を主人公にした場面進行、会話劇、事件解決、【完】型の終幕は禁止。',
    '必ず「主張:」「観察:」「考察:」「結論:」の4ブロックをこの順で置く。',
    'タイトル、架空固有名詞、人物名、会話文、オチのある一回限りの出来事は禁止。固有名詞が必要な場合も、入力で明示された語だけを使う。',
    '観察は、架空の事件ではなく、筆者が複数回見かけたり考えたりした生活上・社会上・感情上の傾向として書く。',
    '筆者の視点で、具体的な観察、個人的な違和感、反対側の見方を入れる。',
    'きれいな正論だけで終えず、最後に読者の認識が少しずれる一文を置く。',
    '本文末に「【完】」「Generated」「完結」などの物語終幕ラベルを出さない。',
  ],
  poem: [
    '抽象語だけで埋めず、触れる物、匂い、音、身体感覚を少なくとも三つ入れる。',
    '最後の二行で前半のイメージを反転または回収し、解説文を付けない。',
  ],
  fairy: [
    '願い、失敗、助け、学びをやさしい行動で描き、説教を強くしすぎない。',
    '最後は説明ではなく、子どもにも見える小さな変化で閉じる。',
  ],
  letter: [
    '相手との関係が文中で変化するように、言えなかったこと、ためらい、結びの温度差を入れる。',
    '形式を守りつつ、実際の手紙らしい余計な一言や書き直せない生々しさを残す。',
  ],
  diary: [
    '出来事の要約ではなく、書き手の自己欺瞞、気づき、書きながら変わる本音を出す。',
    '一人称の声を保ち、最後は明日の予定ではなく今日の感情のズレで閉じる。',
  ],
  documentary: [
    'ナレーション、証言、記録映像の情報量をずらし、読者が自分で真相へ近づく構造にする。',
    '結論を断定しすぎず、最後に一つ残る問いや映像的余韻を置く。',
  ],
  radio: [
    '音だけで場所、動作、距離、感情が分かるよう、BGM、SE、沈黙を物語の駆動力にする。',
    '地の文の説明に逃げず、セリフの食い違いと音の変化で転換を作る。',
  ],
};

const MODE_LENGTH_RULES = {
  short_short: '最優先の字数条件: 本文は600〜1200字。短い要約ではなく、導入、揺れ、反転、余韻を本文として書く。',
  novel: '最優先の字数条件: 本文は3000〜4200字。2200字未満で止めることは禁止。不足する場合は会話、行動、後始末、身体感覚、関係変化で場面を厚くする。',
  medium: '最優先の字数条件: 本文は2800〜4300字。三節それぞれに場面、会話、行動、後始末を入れる。',
  scenario: '最優先の字数条件: 本文は1200字以上。場面、ト書き、セリフの往復、沈黙、終盤の変化を省略しない。',
  manga: '最優先の字数条件: 本文は1000字以上。複数ページまたは十分なコマ数で、絵として追える変化を置く。',
};

export function isLongModeText(text) {
  return /\blong\b|long[-_\s]*novel|長編/i.test(String(text || ''));
}

export function detectModeFromText(text) {
  const source = String(text || '');
  for (const [mode, pattern] of MODE_PATTERNS) {
    if (pattern.test(source)) return mode;
  }
  return '';
}

export function shouldBoostStoryPrompt(text) {
  const source = String(text || '');
  if (!source || source.includes(QUALITY_MARKER)) return false;
  if (shouldSkipQualityPrompt(source)) return false;
  if (isLongModeText(source)) return false;
  if (!detectModeFromText(source)) return false;
  return /出力モード|出力形式|本文|物語|作品|ストーリー|生成|書いて/i.test(source);
}

export function shouldSkipQualityPrompt(text) {
  const source = String(text || '');
  return SKIP_PATTERNS.some(pattern => pattern.test(source));
}

export function buildQualityContract(mode) {
  const label = MODE_LABELS[mode] || '公開出力モード';
  return [
    '',
    QUALITY_MARKER,
    'この品質契約は本文へ出力しない。',
    `目的: 「${label}」として、AIが整えただけの文章ではなく、人が書いたような癖、迷い、手触り、余白のある完成稿にする。`,
    '',
    '共通品質:',
    '- 人物や語り手は正論だけを言わない。言い間違い、言い淀み、嫉妬、照れ、見栄、疲れ、未練、計算されていない一言を最低一つ入れる。',
    '- 誰かが少し損をする、片付けが残る、謝りきれない、汚れ、忘れ物、待ち時間、沈黙など、生活の摩擦を一つ残す。',
    '- 感情名を説明する前に、手つき、視線、呼吸、匂い、音、紙や布や床などの物理ディテールで読者に分からせる。',
    '- AI的な均一さを避ける。全員が賢く優しく説明し合う展開、都合よく納得する和解、明朗な希望だけの結末は禁止。',
    '- 主人公または語り手が最後に何を選ぶ話なのかを一文で固定し、本文全体をその選択へ向ける。',
    '- 欲望、障害、誤解または反転、代償、関係変化を最低一つずつ本文に入れる。',
    '- 選択された軸にない大事件、特殊施設、超常設定、技術装置、陰謀、覚醒、儀式、異世界化などのテンプレートを勝手な原因や解決にしない。',
    '- 入力にない固定舞台、固定職業、固定店名、固定人物名、固定商品、固定証拠品を品質向上の例として勝手に足さない。具体化は必ず選択済みの項目、添付資料、ユーザー入力から行う。',
    '- 抽象語の連続ではなく、具体物、場所、身体感覚、会話、失敗、気まずさ、沈黙で進める。',
    '- 伏線は説明ではなく、小物、発言、行動、匂い、音、視線として前半に置き、終盤で意味を変える。',
    '- 最後は「希望」「未来」「真実」「静かな光」だけで丸めず、具体的な後始末、肌寒さ、失言、喪失、実感、まだ言えない本音を一つ残す。',
    '- 形式ラベル、内部指示、自己評価、チェックリスト、英語メタ説明、プロンプト断片を本文に出さない。',
    ...(MODE_QUALITY_RULES[mode] || []),
    ...(MODE_LENGTH_RULES[mode] ? [MODE_LENGTH_RULES[mode]] : []),
    '出力直前セルフチェック: 形式が合っているか。選択軸から逸れていないか。最後の一文が前半を回収しているか。チェック結果は出力しない。',
  ].join('\n');
}
