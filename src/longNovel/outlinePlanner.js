import { createSeedBible } from './storyBible.js';

export const LONG_NOVEL_STAGES = {
  m1: {
    id: 'm1',
    label: 'M1 3-scene dry-run',
    chapters: 1,
    scenesPerChapter: 3,
    targetChars: [1100, 1800],
    maxTokens: 4096,
    timeoutMs: 180000,
    editorialPass: false,
    manuscriptEditorialPass: false,
  },
  m2: {
    id: 'm2',
    label: 'M2 chapter-1 full run',
    chapters: 1,
    scenesPerChapter: 6,
    targetChars: [1100, 1800],
    maxTokens: 4096,
    timeoutMs: 180000,
    editorialPass: false,
    manuscriptEditorialPass: false,
  },
  m3: {
    id: 'm3',
    label: 'M3 three-chapter run',
    chapters: 3,
    scenesPerChapter: 4,
    targetChars: [1000, 1700],
    maxTokens: 4096,
    timeoutMs: 210000,
    editorialPass: true,
    manuscriptEditorialPass: true,
  },
  m4: {
    id: 'm4',
    label: 'M4 ten-chapter completion run',
    chapters: 10,
    scenesPerChapter: 5,
    targetChars: [1800, 2500],
    maxTokens: 8192,
    timeoutMs: 360000,
    editorialPass: true,
    manuscriptEditorialPass: true,
  },
};

const PLACE_ROTATION = ['P1', 'P2', 'P3'];
const CAST_ROTATION = [
  ['C1', 'C2'],
  ['C1', 'C2', 'C3'],
  ['C1', 'C3'],
  ['C1', 'C2', 'C3'],
];

const SINGLE_CHAPTER_ROLE = {
  goal: '壊れた約束の理由を一晩で確かめ、説明ではなく選択で関係修復の最初の行動まで進める。',
  desire: '主人公は傷ついた約束を見なかったことにして、今の静けさを守りたい。',
  misconception: '誰か一人を責めれば痛みは片づくと思い込んでいる。',
  discovery: '約束が壊れた理由は悪意ではなく、言えなかった事情の重なりにある。',
  cost: '主人公は自分も沈黙で相手を追い詰めたことを認める。',
  relationshipShift: '責め合う二人から、まだ不器用でも同じ紙を見る二人へ変わる。',
  showcase: '小さな物の位置と短い会話だけで、謝罪以前のためらいを読ませる。',
  irreversibleChange: '最後に主人公が相手へ具体的な一歩を差し出す。',
  nextQuestion: 'この関係を壊した言葉を、今度は誰が引き受けるのか。',
  avoidEmotion: 'ただ悲しい、ただ懐かしいだけで止めない。',
  newInformation: '約束が壊れた直接の理由が、双方の沈黙の積み重ねだったこと。',
  irreversibleAction: '主人公が封筒を開け、中の手紙を相手に読ませる。',
  relationshipDelta: '互いを避けていた二人が、同じ物証の前に並んで座る。',
  objectStateChange: '封じられていた封筒が開封され、中身が共有物になる。',
  sceneVenueShift: '密室の会話から、廊下や窓際へ移動し空気を変える。',
  readerHook: '開封された手紙に書かれていた名前は、二人の知らない第三者だった。',
};

const CHAPTER_ROLE_TEMPLATES = [
  {
    goal: '約束の傷跡を見つけ、まだ誰も本当の理由を言えていないことを読者に渡す。',
    desire: '主人公は古い約束を忘れたふりで済ませたい。',
    misconception: '黙っていれば相手を傷つけずに済むと思っている。',
    discovery: '沈黙そのものが、すでに関係を変えていたと分かる。',
    cost: '主人公は最初の問いを口にして、平穏な距離を失う。',
    relationshipShift: '気まずい他人同士から、同じ問題の前に立つ二人へ変わる。',
    showcase: '冒頭の物証を、説明でなく手つきと視線で読者に覚えさせる。',
    irreversibleChange: '主人公が物証をしまわず、相手に見える位置へ置く。',
    nextQuestion: '誰が何を言わなかったのか。',
    avoidEmotion: '懐かしさだけで章を終えない。',
    newInformation: '古い約束の存在と、それが壊れたまま放置されていた事実。',
    irreversibleAction: '主人公がノートを開き、見なかったふりができない位置に置く。',
    relationshipDelta: '無関心な距離から、問題を共有する最初の接点が生まれる。',
    objectStateChange: '隠されていたノートが開かれ、物証として机上に現れる。',
    sceneVenueShift: '普段の場所で始まり、物証の発見場所へ移動する。',
    readerHook: '開いたノートの最終行に、主人公の知らない筆跡がある。',
  },
  {
    goal: '相手を責めるだけでは説明できない矛盾を増やし、最初の誤解を揺らす。',
    desire: '主人公は相手が悪かったと確定させて楽になりたい。',
    misconception: '謝らない相手は何も感じていないと思っている。',
    discovery: '相手も別の物証を抱えており、同じ約束に縛られている。',
    cost: '主人公は責める言葉を途中で飲み込み、自分の弱さを見られる。',
    relationshipShift: '対立から、互いに言い損ねたことを警戒し合う距離へ進む。',
    showcase: '会話の言い直しで、人物の自尊心と未練を同時に出す。',
    irreversibleChange: '相手が主人公の知らない事実を一つだけ置いて去る。',
    nextQuestion: 'その事実は誰を守るために隠されたのか。',
    avoidEmotion: '怒りの反復だけで引っ張らない。',
    newInformation: '相手が別の物証を持っており、主人公だけが被害者ではないこと。',
    irreversibleAction: '主人公が責める言葉を途中で止め、弱さを相手に見せる。',
    relationshipDelta: '一方的に責める構図が崩れ、互いに隠し事がある対等な距離へ。',
    objectStateChange: '相手が持っていた物証が初めて主人公の視界に入る。',
    sceneVenueShift: '対峙する室内から、一方が退出し別の空間で考える。',
    readerHook: '相手が残した事実が、主人公の記憶と矛盾している。',
  },
  {
    goal: '第三者の視点で、約束の破綻が善悪二択ではないことを示す。',
    desire: '主人公は証人から都合のよい答えだけを聞きたい。',
    misconception: '目撃者なら真相をすべて知っていると思い込んでいる。',
    discovery: '証人にも見えていない部分があり、記憶は欠けたまま残っている。',
    cost: '主人公は自分の記憶の穴を認め、相手を裁く根拠を失う。',
    relationshipShift: '主人公と証人の間に、共犯に近い後ろめたさが生まれる。',
    showcase: '証言の間に入る沈黙で、語られなかった場面を想像させる。',
    irreversibleChange: '主人公が証人の保留を受け入れ、調べる方向を変える。',
    nextQuestion: '欠けている記憶は何を隠しているのか。',
    avoidEmotion: '証言を情報説明だけにしない。',
    newInformation: '証人の記憶にも欠落があり、約束の破綻は一方の責任ではないこと。',
    irreversibleAction: '主人公が裁く根拠を手放し、調査の方向を変える。',
    relationshipDelta: '主人公と証人の間に、沈黙を共有する共犯関係が生まれる。',
    objectStateChange: '証人が持っていた古い写真や資料の一部が主人公に渡る。',
    sceneVenueShift: '証人の生活圏に出向き、主人公の日常と異なる場所で対話する。',
    readerHook: '証人の記憶の欠落は、意図的に消された可能性がある。',
  },
  {
    goal: '主人公自身が約束を壊した側でもあったと読者に気づかせる。',
    desire: '主人公は自分だけが置き去りにされたと思っていたい。',
    misconception: '傷ついた側でいれば、選び直す責任から逃げられる。',
    discovery: '主人公の小さな逃避が、相手の沈黙を決定的にした。',
    cost: '主人公は被害者でいる安全な立場を失う。',
    relationshipShift: '相手を問い詰める関係から、自分も問われる関係へ反転する。',
    showcase: '同じ物を見た時の反応を章頭と章末で変える。',
    irreversibleChange: '主人公が初めて自分の非を具体的な言葉で認める。',
    nextQuestion: '謝罪は何を取り戻せず、何を始められるのか。',
    avoidEmotion: '自己嫌悪だけで止めない。',
    newInformation: '主人公自身の逃避が、相手の沈黙を決定づけた直接の原因だったこと。',
    irreversibleAction: '主人公が自分の非を具体的な言葉にして口に出す。',
    relationshipDelta: '被害者対加害者の構図が崩れ、双方が問い直される対等な位置へ。',
    objectStateChange: '同じ物を見たときの主人公の反応が章頭と章末で逆転する。',
    sceneVenueShift: '主人公が自分の居場所から出て、相手の場所に足を運ぶ。',
    readerHook: '非を認めた主人公に対し、相手がまだ別の隠し事を持っている。',
  },
  {
    goal: '中盤の選択で、真相追跡を後戻りできない行動へ変える。',
    desire: '主人公は関係を壊さない範囲で真相だけ知りたい。',
    misconception: '痛みを出さずに正しい答えへ近づけると思っている。',
    discovery: '核心へ進むには、誰かの守ってきた沈黙を破る必要がある。',
    cost: '主人公は一時的に相手の信頼を失う。',
    relationshipShift: '協力しかけた二人が、真実の扱い方で割れる。',
    showcase: '章の中心に、言葉でなく行動の選択を置く。',
    irreversibleChange: '主人公が隠されたものへ手を伸ばし、後で取り消せない証拠を得る。',
    nextQuestion: '真実を得た主人公は、誰を傷つけずにいられるのか。',
    avoidEmotion: '迷っているだけの停滞にしない。',
    newInformation: '隠された証拠の中身が、予想とまったく異なる事実を示す。',
    irreversibleAction: '主人公が相手の守ってきた沈黙を破り、証拠を手に取る。',
    relationshipDelta: '協力関係にひびが入り、真実の扱い方で立場が分かれる。',
    objectStateChange: '封じられていた証拠が開封・破壊され、元に戻せなくなる。',
    sceneVenueShift: '証拠が保管されていた場所へ移動し、日常空間を離れる。',
    readerHook: '得た証拠が主人公自身の過去の行動と繋がっている。',
  },
  {
    goal: '一度近づいた関係を、都合のよい和解ではなく新しい衝突に進める。',
    desire: '主人公は手に入れた真相で、すぐに関係を直したい。',
    misconception: '理由を説明すれば感情も追いつくと思っている。',
    discovery: '正しさは謝罪の代わりにならず、相手の痛みは別の場所にある。',
    cost: '主人公は正しい説明をしても受け取ってもらえない。',
    relationshipShift: '理解し合えそうな距離から、より深い不信へ一度落ちる。',
    showcase: '会話の温度差で、説明の敗北を見せる。',
    irreversibleChange: '相手が主人公に一つだけ条件を突きつける。',
    nextQuestion: '主人公はその条件を飲むのか、自分の答えを選ぶのか。',
    avoidEmotion: '和解したふりで章を閉じない。',
    newInformation: '相手の痛みが主人公の想定とは別の出来事に根ざしていること。',
    irreversibleAction: '主人公が説明を試みて拒絶され、正しさの武器を失う。',
    relationshipDelta: '和解に近づいた距離から、より深い不信へ一段落ちる。',
    objectStateChange: '共有しかけた物が相手に突き返される、または壊される。',
    sceneVenueShift: '和解を試みた場所から追い出され、別の空間で条件を突きつけられる。',
    readerHook: '相手の条件が、主人公のもっとも手放したくないものを要求している。',
  },
  {
    goal: '隠されていた理由を明かし、同時にそれだけでは救われない構造を出す。',
    desire: '主人公は最後の事情を聞けば納得できると思っている。',
    misconception: '真相は一つの答えとして現れるはずだと思っている。',
    discovery: '真相は複数の小さな選択の積み重ねで、誰も完全には正しくない。',
    cost: '主人公は相手を許すだけでは自分が変われないと知る。',
    relationshipShift: '秘密を持つ側と暴く側から、同じ失敗を見ている二人へ変わる。',
    showcase: '伏線の小物を戻し、別の意味を持たせる。',
    irreversibleChange: '主人公が一番聞きたくなかった事実を受け取る。',
    nextQuestion: '知ったあと、主人公は何を選ぶのか。',
    avoidEmotion: '種明かしだけで満足しない。',
    newInformation: '真相が一つの原因ではなく、複数の小さな選択の積み重ねだったこと。',
    irreversibleAction: '主人公が一番避けてきた事実を正面から受け取る。',
    relationshipDelta: '秘密の非対称が解消され、同じ失敗を見つめる対等な立場へ。',
    objectStateChange: '伏線として置かれた小物が回収され、当初とは別の意味を持つ。',
    sceneVenueShift: '真相が明かされる場所は、約束が結ばれた原点に近い場所。',
    readerHook: '真相を知っても主人公の内側は変わらず、変わるための行動がまだ残っている。',
  },
  {
    goal: '主人公の価値観を試し、失わずに済ませたいものを一つ失わせる。',
    desire: '主人公は関係も自尊心も両方守りたい。',
    misconception: 'どちらも手放さずに大人の解決ができると思っている。',
    discovery: '守ってきた自己像が、相手には逃避として届いていた。',
    cost: '主人公は自分の正しさを手放す。',
    relationshipShift: '互いに傷を見せるだけの関係から、選択を迫り合う関係へ進む。',
    showcase: '選ばなかった言葉を読者に感じさせる余白を作る。',
    irreversibleChange: '主人公が相手の前で、これまで避けていた言葉を言う。',
    nextQuestion: '代償を払ったあと、まだ残る約束は何か。',
    avoidEmotion: '泣く、黙る、立ち去るだけで終えない。',
    newInformation: '主人公の正しさが、相手から見れば逃避に映っていたこと。',
    irreversibleAction: '主人公が避けてきた言葉を相手に直接言い、自己像を崩す。',
    relationshipDelta: '傷を見せ合うだけの段階から、互いに選択を迫り合う段階へ。',
    objectStateChange: '主人公が大事に持っていた物を手放すか、形を変える。',
    sceneVenueShift: '自分の領域で相手と対峙し、逃げ場のない空間を選ぶ。',
    readerHook: '代償を払った直後に、残っていた別の約束が浮上する。',
  },
  {
    goal: '終盤の前に、伏線を回収しながら主人公の最終選択を具体化する。',
    desire: '主人公は最後に失敗しないため、もう一度だけ確証が欲しい。',
    misconception: '完全に理解してからでなければ選べないと思っている。',
    discovery: '足りないまま選ぶことが、この物語で必要な成熟だと分かる。',
    cost: '主人公は完璧な説明を諦める。',
    relationshipShift: '相手を納得させる関係から、同じ不完全さを抱えて並ぶ関係へ近づく。',
    showcase: 'これまでの物証を、説明でなく場面内の配置として再登場させる。',
    irreversibleChange: '主人公が最終章で取る行動を自分で決める。',
    nextQuestion: '主人公はその選択を、誰のためではなく自分の責任としてできるのか。',
    avoidEmotion: '準備だけで章を終えない。',
    newInformation: '伏線の回収により、最終選択の具体的な条件が判明する。',
    irreversibleAction: '主人公が最終章での行動方針を宣言し、後戻りできなくする。',
    relationshipDelta: '説得する関係から、不完全さを共有して並走する関係へ。',
    objectStateChange: '物証が場面内で再配置され、当初の配置とは異なる意味を持つ。',
    sceneVenueShift: '物語の起点に近い場所へ戻り、変化した視点で同じ空間を見る。',
    readerHook: '最終選択の準備が整ったが、選択の結果は読者にまだ見えない。',
  },
  {
    goal: '未解決だった約束を、説明ではなく主人公の選択と行動で回収する。',
    desire: '主人公はもう一度だけ昔の関係に戻りたい。',
    misconception: '取り戻すことが救いだと思っている。',
    discovery: '戻るのではなく、壊れた形を引き受けて次の形を選ぶしかない。',
    cost: '主人公は昔の約束そのものを手放す。',
    relationshipShift: '過去に縛られた二人から、新しい約束を結ぶかどうかを選べる二人へ変わる。',
    showcase: '最後の一文を、抽象的な希望ではなく具体物と動作で閉じる。',
    irreversibleChange: '主人公が相手の返事を待たず、自分の責任で小さな行動を完了する。',
    nextQuestion: '物語の外で続く関係の余韻を残す。',
    avoidEmotion: '希望、再出発、未来などの語でまとめない。',
    newInformation: '壊れた約束を元に戻す方法はなく、次の形を選ぶ以外の道がないこと。',
    irreversibleAction: '主人公が相手の返事を待たず、自分の責任で具体的な行動を完了する。',
    relationshipDelta: '過去の約束に縛られた関係から、新しい約束を結ぶか否かを選べる関係へ。',
    objectStateChange: '物語を通じて意味が変わった小物が、最終的な位置に置かれる。',
    sceneVenueShift: '物語の最終場面は、冒頭とは異なる場所か、同じ場所の異なる時間帯。',
    readerHook: '物語が閉じた後も、二人の関係がどう続くかの余韻を残す。',
  },
];

export function stageConfig(stageOrOptions = 'm1') {
  const stageId = typeof stageOrOptions === 'string'
    ? stageOrOptions
    : stageOrOptions.stage || stageOrOptions.stageId || 'm1';
  return LONG_NOVEL_STAGES[stageId] || LONG_NOVEL_STAGES.m1;
}

export function createLongNovelPlan(options = {}) {
  const baseStage = stageConfig(options);
  const stage = {
    ...baseStage,
    chapters: clampInt(options.chapters, baseStage.chapters, 1, 12),
    scenesPerChapter: clampInt(options.scenesPerChapter, baseStage.scenesPerChapter, 1, 8),
    targetChars: options.targetChars || baseStage.targetChars,
    editorialPass: options.editorialPass ?? baseStage.editorialPass,
    manuscriptEditorialPass: options.manuscriptEditorialPass ?? baseStage.manuscriptEditorialPass,
  };
  const bible = createSeedBible({
    premise: options.premiseText,
    runId: options.runId,
  });
  const title = options.title || 'まだ明けない部屋';
  const outline = {
    stage,
    title,
    logline: bible.premise.logline,
    chapters: Array.from({ length: stage.chapters }, (_, index) => buildChapter(index + 1, stage)),
  };
  return { bible, outline };
}

export function createDryRunPlan(options = {}) {
  return createLongNovelPlan({ stage: 'm1', ...options });
}

function buildChapter(chapterNumber, stage) {
  const role = chapterRoleFor(chapterNumber, stage.chapters);
  return {
    num: chapterNumber,
    isFinal: chapterNumber === stage.chapters,
    goal: role.goal,
    role,
    scenes: Array.from(
      { length: stage.scenesPerChapter },
      (_, index) => buildScene(chapterNumber, index + 1, stage, role)
    ),
  };
}

function buildScene(chapterNumber, sceneNumber, stage, chapterRole) {
  const id = `C${String(chapterNumber).padStart(2, '0')}S${String(sceneNumber).padStart(2, '0')}`;
  const place = PLACE_ROTATION[(chapterNumber + sceneNumber - 2) % PLACE_ROTATION.length];
  const cast = CAST_ROTATION[(chapterNumber + sceneNumber - 2) % CAST_ROTATION.length];
  const phase = phaseForScene(sceneNumber, stage.scenesPerChapter);
  const sceneRole = sceneRoleFor(phase, chapterRole, sceneNumber, stage.scenesPerChapter);
  return {
    id,
    chapter: chapterNumber,
    stageId: stage.id,
    pov: 'C1',
    cast,
    place,
    time: timeFor(chapterNumber, sceneNumber),
    phase,
    isChapterFinal: sceneNumber === stage.scenesPerChapter,
    isFinalChapter: chapterNumber === stage.chapters,
    isFinalScene: chapterNumber === stage.chapters && sceneNumber === stage.scenesPerChapter,
    chapterRole,
    sceneRole,
    beats: beatsFor({ chapterNumber, sceneNumber, totalChapters: stage.chapters, phase, chapterRole, sceneRole }),
    entryState: entryStateFor({ chapterNumber, sceneNumber, totalChapters: stage.chapters, phase, chapterRole }),
    exitState: exitStateFor({ chapterNumber, sceneNumber, totalChapters: stage.chapters, phase, chapterRole }),
    targetChars: stage.targetChars,
  };
}

function chapterRoleFor(chapterNumber, totalChapters) {
  if (totalChapters === 1) return { ...SINGLE_CHAPTER_ROLE, chapterNumber, totalChapters };
  const index = Math.round(((chapterNumber - 1) / Math.max(1, totalChapters - 1)) * (CHAPTER_ROLE_TEMPLATES.length - 1));
  return {
    ...CHAPTER_ROLE_TEMPLATES[index],
    chapterNumber,
    totalChapters,
  };
}

function sceneRoleFor(phase, chapterRole, sceneNumber, scenesPerChapter) {
  if (phase === 'entry') {
    return `章の欲望を具体物と会話で立ち上げる。主人公の欲望「${chapterRole.desire}」を説明せずに見せる。`;
  }
  if (phase === 'search') {
    return `誤解を一度働かせる。主人公の誤解「${chapterRole.misconception}」が場面で小さく失敗する。`;
  }
  if (phase === 'pressure') {
    return `発見と代償を同じ場面で起こす。発見「${chapterRole.discovery}」の代わりに「${chapterRole.cost}」を支払わせる。`;
  }
  const finalScene = sceneNumber === scenesPerChapter;
  return finalScene
    ? `章末の不可逆変化を起こす。「${chapterRole.relationshipShift}」へ関係を進め、次章の問いを残す。`
    : `関係の位置を一段ずらす。章末で使う選択の前に、逃げ道を一つ消す。`;
}

function phaseForScene(sceneNumber, scenesPerChapter) {
  if (sceneNumber === 1) return 'entry';
  if (sceneNumber === scenesPerChapter) return 'turn';
  if (sceneNumber >= Math.ceil(scenesPerChapter * 0.65)) return 'pressure';
  return 'search';
}

function beatsFor({ chapterNumber, sceneNumber, totalChapters, phase, chapterRole, sceneRole }) {
  const finalChapter = chapterNumber === totalChapters;
  const common = {
    entry: [
      '章の中心欲望を、人物の説明ではなく手の動き・視線・物の置き方で示す。',
      '前章までの感情をなぞらず、今章で一段進む不安を置く。',
      '会話は短く、言い直しや飲み込んだ言葉で人物の癖を出す。',
    ],
    search: [
      '主人公の誤解が一度もっともらしく見える状況を作る。',
      'その誤解を、人物の反応か物証の扱いで少しだけ崩す。',
      '読者が先を読みたくなる未解決の違和感を残す。',
    ],
    pressure: [
      '発見を情報として説明せず、代償を伴う行動として出す。',
      '関係の距離が章頭と違うことを、立ち位置や声量で見せる。',
      '同じ小物・同じ感情・同じ沈黙の反復を避ける。',
    ],
    turn: [
      '章の発見、代償、関係変化を一つの選択にまとめる。',
      '次章へ持ち越す問いを残しつつ、この章の見せ場は必ず成立させる。',
      '最後は抽象語ではなく、会話・動作・物の変化で閉じる。',
    ],
  };
  if (finalChapter && phase === 'turn') {
    return [
      '主人公が誰かを説得するのではなく、自分が引き受けるものを選ぶ。',
      '未回収の物証を場面内で戻し、別の意味に変える。',
      '最後は希望や未来という語ではなく、具体的な動作と物の位置で終える。',
    ];
  }
  return [
    ...common[phase],
    sceneRole,
    `章${chapterNumber}の見せ場「${chapterRole.showcase}」に向けて、同じ感情を一段先へ進める。`,
  ];
}

function entryStateFor({ chapterNumber, sceneNumber, totalChapters, phase, chapterRole }) {
  if (chapterNumber === 1 && sceneNumber === 1) {
    return `主人公はまだ問題を見ないで済ませたい。章の欲望: ${chapterRole.desire}`;
  }
  if (chapterNumber === totalChapters && phase === 'turn') {
    return '主人公はもう説明だけでは逃げられないと知っている。';
  }
  if (phase === 'entry') return `前章の変化を受け、主人公は新しい欲望「${chapterRole.desire}」で動き始める。`;
  if (phase === 'search') return `主人公は誤解「${chapterRole.misconception}」をまだ手放せない。`;
  if (phase === 'pressure') return `発見「${chapterRole.discovery}」が近づき、代償が避けられなくなっている。`;
  return `章の問いに対する答えが近づき、関係は元の位置に戻れなくなっている。`;
}

function exitStateFor({ chapterNumber, totalChapters, phase, chapterRole }) {
  if (chapterNumber === totalChapters && phase === 'turn') {
    return `主人公は「${chapterRole.irreversibleChange}」を実行し、過去に戻るのではなく次の形を選ぶ。`;
  }
  if (phase === 'entry') return `章の欲望が無視できない形になり、誤解「${chapterRole.misconception}」が動き出す。`;
  if (phase === 'search') return `発見「${chapterRole.discovery}」の輪郭が見え、主人公の解釈が揺らぐ。`;
  if (phase === 'pressure') return `代償「${chapterRole.cost}」が発生し、関係変化の入口に立つ。`;
  return `章の関係変化「${chapterRole.relationshipShift}」が成立し、問い「${chapterRole.nextQuestion}」を次へ渡す。`;
}

function timeFor(chapterNumber, sceneNumber) {
  const times = ['夕方', '深夜', '夜明け前', '朝の気配'];
  return times[(chapterNumber + sceneNumber - 2) % times.length];
}

function clampInt(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}
