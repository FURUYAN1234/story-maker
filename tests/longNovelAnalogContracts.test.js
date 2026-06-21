import assert from 'node:assert/strict';

import {
  buildAlwaysOnAxisEscapeLock,
  buildAnalogCarrierLedgerContract,
  buildBioDeviceCultHardGuard,
  buildCampaignPriceCauseBan,
  buildCardboardHiddenPaperRouteBan,
  buildChapterBoundaryAntiReplay,
  buildChapterCarrierRotationContract,
  buildChapterDesignLedgerContract,
  buildContinuationExpansionLock,
  buildContinuationStallBan,
  buildCreativeElasticity,
  buildDailyComedyChapterLedger,
  buildDailyComedyInternalInstruction,
  buildDomesticComedyToneGuard,
  buildEvidenceHandoffStateLock,
  buildFalseRoutePurgeContract,
  buildFirstDraftAntiTemplateCarrierLock,
  buildFinalChapterStateLock,
  buildFinalCoreAfterglowGuard,
  buildFinalForceCloseElasticity,
  buildGlobalAnalogMysteryContract,
  buildGenreNativeDriveContract,
  buildHardGatesAndEffortGoals,
  buildHiddenBoxLegendPrizeClosure,
  buildLateStageEscapeRouteLock,
  buildLateStageTemplateRecovery,
  buildLocalComedyAllowedLedgerRealignment,
  buildLocalScaleCategoryGuard,
  buildLocalComedyChapterBeatPlan,
  buildLocalComedyEntertainmentSpine,
  buildLocalComedyFreshSceneContract,
  buildLocalComedyStoreWorkMeansLedger,
  buildLocalComedySurfaceLedger,
  buildMidStoryDigitalLabCoreGuard,
  buildLongNovelProseQualityContract,
  buildMidStoryCanonStateLock,
  buildNovelAiSmellRemoval,
  buildOpenAiFirstChapterProseKickoff,
  buildOpenAiInitialLongPlanProseOverride,
  buildOpeningReplaySecretShelfBan,
  buildPastPromoPaperBundleBan,
  buildPhysicalEvidenceClarification,
  buildPlainRegisterWordingLock,
  buildPosRegisterDataFallbackGuard,
  buildProjectAiEscapeGuard,
  buildResearchExperimentTemplateBan,
  buildRepairLengthPreservationContract,
  buildSelectedAxisAdherenceGuard,
  buildSelectedGenreDriveContract,
  buildSelectedGenreForeshadowPayoffEngine,
  buildSelectedGenreIntensificationContract,
  buildSelectedGenrePurificationContract,
  buildShoppingStreetAnchorContract,
  buildStampCardEngineBan,
  buildStoreOperationMistakeLock,
  buildStorySpecificAllowedMeansLedger,
  buildTemplateInvasionPrevention,
  buildUnselectedMemoryTemplateGuard,
} from '../src/longNovelAnalogContracts.js';

const enabled = buildGlobalAnalogMysteryContract({
  settings: { mode: 'long' },
  mode: 'long',
  isAnalogTarget: () => true,
});

assert.match(enabled, /GLOBAL ANALOG MYSTERY CONTRACT/);
assert.match(enabled, /human\/physical evidence/);
assert.match(enabled, /handwritten letters/);
assert.match(enabled, /police record/);
assert.match(enabled, /memory manipulation/);
assert.match(enabled, /Do not output this contract/);

const ledger = buildAnalogCarrierLedgerContract({
  chapterNum: 2,
  carrier: 'old photograph',
  functionalRule: 'someone lies about it',
  isRepair: true,
  isLateChapter: true,
});

assert.match(ledger, /ANALOG CARRIER LEDGER/);
assert.match(ledger, /chapter 2/);
assert.match(ledger, /old photograph/);
assert.match(ledger, /someone lies about it/);
assert.match(ledger, /repair\/regeneration/);
assert.match(ledger, /Late chapters/);

assert.equal(
  buildGlobalAnalogMysteryContract({
    settings: { mode: 'short' },
    mode: 'standard',
    isAnalogTarget: () => false,
  }),
  '',
);

const purge = buildFalseRoutePurgeContract({
  carrier: 'old photograph',
  functionalRule: 'someone lies about the photo',
  isLateChapter: true,
  isFinalChapter: true,
});

assert.match(purge, /FALSE-ROUTE PURGE/);
assert.match(purge, /old photograph/);
assert.match(purge, /someone lies about the photo/);
assert.match(purge, /Mid\/late chapters/);
assert.match(purge, /Final force-close/);

const researchBan = buildResearchExperimentTemplateBan();

assert.match(researchBan, /RESEARCH\/EXPERIMENT TEMPLATE BAN/);
assert.match(researchBan, /chemical\/smell proof/);
assert.match(researchBan, /forged consent/);
assert.match(researchBan, /paper complaint/);

const handoffLock = buildEvidenceHandoffStateLock({ isRepeatedHandoff: true });

assert.match(handoffLock, /EVIDENCE HANDOFF STATE LOCK/);
assert.match(handoffLock, /only canon for physical evidence/);
assert.match(handoffLock, /previous draft repeated/);

const lateLock = buildLateStageEscapeRouteLock({ isFinalChapter: true });

assert.match(lateLock, /LATE-STAGE ESCAPE-ROUTE LOCK/);
assert.match(lateLock, /latest SAVED chapter only/);
assert.match(lateLock, /human choice closes the story/);

const axisLock = buildAlwaysOnAxisEscapeLock({
  selectedAxes: 'daily mystery',
  chapterNum: 8,
  totalChapters: 10,
  fromLateStage: true,
  hasRejectedRoute: true,
  isLateStage: true,
  isFinalChapter: true,
});

assert.match(axisLock, /ALWAYS-ON AXIS ESCAPE LOCK/);
assert.match(axisLock, /daily mystery/);
assert.match(axisLock, /From chapter 8 of 10 onward/);
assert.match(axisLock, /previous rejected route is non-canon/);
assert.match(axisLock, /Final chapter may force/);

const projectGuard = buildProjectAiEscapeGuard({
  selectedAxes: 'local comedy',
  chapterNum: 3,
  hadForbiddenRoute: true,
});

assert.match(projectGuard, /PROJECT-NAME \/ AI-WEAPON ESCAPE GUARD/);
assert.match(projectGuard, /local comedy/);
assert.match(projectGuard, /before drafting chapter 3/);
assert.match(projectGuard, /previous draft used a forbidden project\/AI route/);

const axisAdherence = buildSelectedAxisAdherenceGuard({
  selectedAxes: 'convenience store comedy',
  chapterNum: 4,
  requiredAnchors: ['register', 'receipt'],
  isStrongRetry: true,
});

assert.match(axisAdherence, /SELECTED-AXIS ADHERENCE GUARD/);
assert.match(axisAdherence, /convenience store comedy/);
assert.match(axisAdherence, /chapter 4: register; receipt/);
assert.match(axisAdherence, /Strong retry/);

const posGuard = buildPosRegisterDataFallbackGuard({
  selectedAxes: 'convenience store',
  chapterNum: 5,
  isStrongRetry: true,
});

assert.match(posGuard, /POS \/ REGISTER DATA FALLBACK GUARD/);
assert.match(posGuard, /convenience store/);
assert.match(posGuard, /ending for chapter 5/);
assert.match(posGuard, /register-data\/POS-screen/);

const memoryGuard = buildUnselectedMemoryTemplateGuard({
  selectedAxes: 'store comedy',
  chapterNum: 6,
  isStrongRetry: true,
});

assert.match(memoryGuard, /UNSELECTED MEMORY-TEMPLATE GUARD/);
assert.match(memoryGuard, /store comedy/);
assert.match(memoryGuard, /ending for chapter 6/);
assert.match(memoryGuard, /delete the memory-loss premise/);

const meansLedger = buildStorySpecificAllowedMeansLedger({
  chapterNum: 7,
  selectedAxes: 'store comedy',
  allowedMeans: ['receipt', 'staff lie'],
  forbiddenMeans: ['USB/data', 'amnesia'],
  isStrongRetry: true,
});

assert.match(meansLedger, /STORY-SPECIFIC ALLOWED MEANS LEDGER/);
assert.match(meansLedger, /before chapter 7/);
assert.match(meansLedger, /receipt, staff lie/);
assert.match(meansLedger, /USB\/data \/ amnesia/);
assert.match(meansLedger, /discard the previous failed route/);

const localMeans = buildLocalComedyStoreWorkMeansLedger({
  chapterNum: 8,
  selectedAxes: 'local comedy',
  allowedMeans: ['receipt', 'cash mismatch'],
  forbiddenMeans: ['treasure hunt'],
  isStrongRetry: true,
});

assert.match(localMeans, /LOCAL COMEDY STORE-WORK MEANS LEDGER/);
assert.match(localMeans, /before chapter 8/);
assert.match(localMeans, /receipt, cash mismatch/);
assert.match(localMeans, /treasure hunt/);
assert.match(localMeans, /store-work mistake/);

const beatPlan = buildLocalComedyChapterBeatPlan({
  chapterNum: 9,
  beats: ['receipt mismatch', 'awkward apology'],
  isRetry: true,
});

assert.match(beatPlan, /LOCAL COMEDY CHAPTER BEAT PLAN/);
assert.match(beatPlan, /Chapter 9/);
assert.match(beatPlan, /receipt mismatch \/ awkward apology/);
assert.match(beatPlan, /hidden-box\/secret-message/);

const openAiKickoff = buildOpenAiFirstChapterProseKickoff({ isRetry: true });

assert.match(openAiKickoff, /OPENAI FIRST-CHAPTER PROSE KICKOFF/);
assert.match(openAiKickoff, /chapter prose only/);
assert.match(openAiKickoff, /商店街, コンビニ/);
assert.match(openAiKickoff, /5,200 Japanese characters/);
assert.match(openAiKickoff, /Retry from zero/);

const surfaceLedger = buildLocalComedySurfaceLedger({
  forbiddenTerms: ['USB', 'Project', '研究施設'],
});

assert.match(surfaceLedger, /LOCAL COMEDY SURFACE LEDGER/);
assert.match(surfaceLedger, /USB, Project, 研究施設/);
assert.match(surfaceLedger, /mundane store-work language/);

const longPlanOverride = buildOpenAiInitialLongPlanProseOverride({ isRetry: true });

assert.match(longPlanOverride, /OPENAI INITIAL LONG-PLAN PROSE OVERRIDE/);
assert.match(longPlanOverride, /chapter-1 prose/);
assert.match(longPlanOverride, /タイトル, ログライン, 全構成/);
assert.match(longPlanOverride, /6,500 Japanese characters/);
assert.match(longPlanOverride, /non-canon and must not be continued/);

const entertainmentSpine = buildLocalComedyEntertainmentSpine({
  chapterNum: 10,
  laughBeats: ['receipt gag', 'awkward apology', 'customer interruption'],
  isLate: true,
  isFinal: true,
  isRetry: true,
});

assert.match(entertainmentSpine, /LOCAL COMEDY ENTERTAINMENT SPINE/);
assert.match(entertainmentSpine, /chapter 10: receipt gag \/ awkward apology \/ customer interruption/);
assert.match(entertainmentSpine, /Late chapters must not reopen/);
assert.match(entertainmentSpine, /Final chapter must end on funny human action/);
assert.match(entertainmentSpine, /Retry from zero/);

const finalElasticity = buildFinalForceCloseElasticity({ mode: 'long' });

assert.match(finalElasticity, /Final force-close elasticity/);
assert.match(finalElasticity, /the final chapter/);
assert.match(finalElasticity, /literary judgment only/);

const lateRecovery = buildLateStageTemplateRecovery({
  selectedAxes: 'local mystery',
  mode: 'long',
  isDigitalAllowed: false,
});

assert.match(lateRecovery, /Late-stage template recovery/);
assert.match(lateRecovery, /local mystery/);
assert.match(lateRecovery, /late chapters and the final chapter/);
assert.match(lateRecovery, /Digital tools are not selected/);

const aiSmell = buildNovelAiSmellRemoval({
  selectedMode: 'novel',
  mode: 'long',
});

assert.match(aiSmell, /Novel AI-smell removal/);
assert.match(aiSmell, /preserve the selected mode and genre: novel/);
assert.match(aiSmell, /each chapter/);

const hardGates = buildHardGatesAndEffortGoals({ mode: 'long' });

assert.match(hardGates, /Hard gates and effort goals/);
assert.match(hardGates, /Hard rules/);
assert.match(hardGates, /each chapter may keep/);

const domesticTone = buildDomesticComedyToneGuard({
  selectedAxes: 'domestic comedy',
});

assert.match(domesticTone, /Domestic comedy tone guard/);
assert.match(domesticTone, /domestic comedy/);
assert.match(domesticTone, /thriller language/);

const midStoryDigital = buildMidStoryDigitalLabCoreGuard({
  selectedAxes: 'analog mystery',
  isDigitalAllowed: false,
});

assert.match(midStoryDigital, /Mid-story digital\/lab core guard/);
assert.match(midStoryDigital, /analog mystery/);
assert.match(midStoryDigital, /not selected\. USB/);

const templateInvasion = buildTemplateInvasionPrevention({
  selectedAxes: 'school mystery',
  isDigitalAllowed: false,
  isChuniAllowed: false,
  isIsekaiAllowed: false,
  isWorldScaleAllowed: false,
  mode: 'long',
});

assert.match(templateInvasion, /Template invasion prevention/);
assert.match(templateInvasion, /school mystery/);
assert.match(templateInvasion, /multi-axis randomization/);
assert.match(templateInvasion, /each chapter and the completed novel/);
assert.match(templateInvasion, /Do not output this checklist/);

const afterglowGuard = buildFinalCoreAfterglowGuard({
  selectedAxes: 'analog noir',
  mode: 'long',
  isDigitalAllowed: false,
});

assert.match(afterglowGuard, /Final-core and afterglow guard/);
assert.match(afterglowGuard, /analog noir/);
assert.match(afterglowGuard, /completed long novel/);
assert.match(afterglowGuard, /black file/);

const antiReplay = buildChapterBoundaryAntiReplay({
  selectedAxes: 'local comedy',
});

assert.match(antiReplay, /Chapter boundary anti-replay/);
assert.match(antiReplay, /local comedy/);
assert.match(antiReplay, /Saved previous chapters are canon references only/);
assert.match(antiReplay, /first 900 characters/);

const localScaleGuard = buildLocalScaleCategoryGuard({
  selectedAxes: 'shopping street comedy',
  isLocalFolkloreAllowed: false,
  isMundaneLocal: true,
  isComedy: true,
  mode: 'long',
});

assert.match(localScaleGuard, /Local-scale category guard/);
assert.match(localScaleGuard, /shopping street comedy/);
assert.match(localScaleGuard, /Mundane\/local axis pressure: selected/);
assert.match(localScaleGuard, /Comedy pressure: selected/);

const elasticity = buildCreativeElasticity({
  selectedAxes: 'slice-of-life mystery',
  mode: 'long',
});

assert.match(elasticity, /Creative elasticity/);
assert.match(elasticity, /slice-of-life mystery/);
assert.match(elasticity, /each chapter and the completed long novel/);
assert.match(elasticity, /Do not use sequel-bait/);

const bioCult = buildBioDeviceCultHardGuard({
  selectedAxes: 'analog drama',
  isDigitalAllowed: false,
  isFolkloreAllowed: false,
  mode: 'long',
});

assert.match(bioCult, /Bio-device\/cult hard guard/);
assert.match(bioCult, /analog drama/);
assert.match(bioCult, /not selected\. Do not turn the mystery/);
assert.match(bioCult, /not selected\. Do not use ikenie/);

const firstDraftCarrier = buildFirstDraftAntiTemplateCarrierLock({
  selectedAxes: 'local drama',
  isDigitalAllowed: false,
  isFolkloreCultAllowed: false,
  isGrandScaleAllowed: false,
});

assert.match(firstDraftCarrier, /First-draft anti-template carrier lock/);
assert.match(firstDraftCarrier, /local drama/);
assert.match(firstDraftCarrier, /proof carrier and payoff carrier/);
assert.match(firstDraftCarrier, /must not use phone apps/);
assert.match(firstDraftCarrier, /Do not output this lock/);

const physicalEvidence = buildPhysicalEvidenceClarification();

assert.match(physicalEvidence, /Physical evidence clarification/);
assert.match(physicalEvidence, /Paper files, locked folders/);
assert.match(physicalEvidence, /digital\/lab engine/);
assert.match(physicalEvidence, /paper file or pendant/);

const genreDrive = buildSelectedGenreDriveContract({
  chapterNum: 3,
  genreLabel: 'コメディ',
  genreDrive: '会話のズレで引っ張る。',
  isRetry: true,
});

assert.match(genreDrive, /v4\.7\.7 選択ジャンル牽引契約/);
assert.match(genreDrive, /現在の選択ジャンル: コメディ/);
assert.match(genreDrive, /第3章/);
assert.match(genreDrive, /会話のズレで引っ張る。/);
assert.match(genreDrive, /直前に失敗したルートは非正史/);

const storeMistake = buildStoreOperationMistakeLock({
  chapterNum: 4,
  isRetry: true,
});

assert.match(storeMistake, /v4\.7\.7 店内運用ミス固定/);
assert.match(storeMistake, /第4章/);
assert.match(storeMistake, /棚札の貼り間違い/);
assert.match(storeMistake, /直前に出た木箱/);

const shoppingAnchor = buildShoppingStreetAnchorContract({ isRetry: true });

assert.match(shoppingAnchor, /v4\.7\.7 商店街アンカー/);
assert.match(shoppingAnchor, /商店街の可視アンカー/);
assert.match(shoppingAnchor, /POSログや売上データ/);
assert.match(shoppingAnchor, /レジ画面やスキャン結果/);

const carrierRotation = buildChapterCarrierRotationContract({
  chapterNum: 5,
  carriers: ['紙レシート', '客の証言'],
  isRetry: true,
});

assert.match(carrierRotation, /v4\.7\.7 章別キャリアローテーション/);
assert.match(carrierRotation, /第5章/);
assert.match(carrierRotation, /紙レシート \/ 客の証言/);
assert.match(carrierRotation, /スタンプ\/カード\/キャンペーン中心ルート/);

const genreIntense = buildSelectedGenreIntensificationContract({
  chapterNum: 6,
  genreLabel: 'ミステリー',
  genreDrive: '公平な手がかりで引っ張る。',
  negativeCondition: '未提示の秘密装置を使わない。',
  isRetry: true,
});

assert.match(genreIntense, /v4\.7\.8 選択ジャンル極振り契約/);
assert.match(genreIntense, /現在の選択ジャンル: ミステリー/);
assert.match(genreIntense, /第6章の牽引方法/);
assert.match(genreIntense, /未提示の秘密装置を使わない。/);
assert.match(genreIntense, /失敗した章の冒頭/);

const freshScene = buildLocalComedyFreshSceneContract({
  chapterNum: 7,
  carriers: ['棚札', '納品書'],
  isRetry: true,
});

assert.match(freshScene, /v4\.7\.8 ローカルコメディ新場面契約/);
assert.match(freshScene, /第7章の中心キャリア/);
assert.match(freshScene, /棚札 \/ 納品書/);
assert.match(freshScene, /古いキャンペーンカード/);

const hiddenBoxClosure = buildHiddenBoxLegendPrizeClosure({
  chapterNum: 8,
  isRetry: true,
});

assert.match(hiddenBoxClosure, /v4\.7\.9 隠し箱・伝説景品ルート閉鎖/);
assert.match(hiddenBoxClosure, /木箱、木の箱/);
assert.match(hiddenBoxClosure, /第8章以降/);
assert.match(hiddenBoxClosure, /スタンプの迷宮を完全に捨てる/);

const registerWording = buildPlainRegisterWordingLock({ isRetry: true });

assert.match(registerWording, /v4\.8\.0 通常レジ表現固定/);
assert.match(registerWording, /POSログ、POSデータ/);
assert.match(registerWording, /`POS` 表記を使わず/);

const stampBan = buildStampCardEngineBan({
  chapterNum: 9,
  carriers: ['棚札価格違い', '紙レシート'],
  isRetry: true,
});

assert.match(stampBan, /v4\.8\.1 スタンプ\/カード主エンジン禁止/);
assert.match(stampBan, /第9章の中心キャリア/);
assert.match(stampBan, /棚札価格違い \/ 紙レシート/);
assert.match(stampBan, /完全に捨て/);

const repairLength = buildRepairLengthPreservationContract({
  chapterNum: 2,
  isRetry: true,
});

assert.match(repairLength, /v4\.8\.2 修正時の本文量維持/);
assert.match(repairLength, /第2章を修正する時/);
assert.match(repairLength, /五千二百字相当/);
assert.match(repairLength, /短文停止を避ける/);

const allowedLedger = buildLocalComedyAllowedLedgerRealignment({
  chapterNum: 3,
  allowedCarriers: ['棚札価格違い', '紙レシート'],
  isRetry: true,
});

assert.match(allowedLedger, /v4\.8\.5 ローカルコメディ許可台帳再整合/);
assert.match(allowedLedger, /第3章の謎・証拠・解決/);
assert.match(allowedLedger, /棚札価格違い \/ 紙レシート/);
assert.match(allowedLedger, /別名で再利用しない/);

const cardboardBan = buildCardboardHiddenPaperRouteBan({
  chapterNum: 4,
  isRetry: true,
});

assert.match(cardboardBan, /v4\.8\.5 段ボール隠し紙ルート禁止/);
assert.match(cardboardBan, /第4章で段ボール/);
assert.match(cardboardBan, /箱の裏・箱の中/);

const continuationLock = buildContinuationExpansionLock({
  chapterNum: 5,
  isRetry: true,
});

assert.match(continuationLock, /v4\.8\.5 継続本文増量固定/);
assert.match(continuationLock, /第5章の続きを書く時/);
assert.match(continuationLock, /最低二千字相当/);

const genrePurify = buildSelectedGenrePurificationContract({
  chapterNum: 6,
  isRetry: true,
});

assert.match(genrePurify, /v4\.8\.6 選択ジャンル純化/);
assert.match(genrePurify, /選択ジャンルそのものを極める/);
assert.match(genrePurify, /第6章では/);

const promoBundle = buildPastPromoPaperBundleBan({
  chapterNum: 7,
  isRetry: true,
});

assert.match(promoBundle, /v4\.8\.6 過去販促紙束ルート禁止/);
assert.match(promoBundle, /第7章では/);
assert.match(promoBundle, /古い販促紙束/);

const secretShelf = buildOpeningReplaySecretShelfBan({
  chapterNum: 8,
  isRetry: true,
});

assert.match(secretShelf, /v4\.8\.8 章頭再演・秘密棚ルート事前禁止/);
assert.match(secretShelf, /第8章は/);
assert.match(secretShelf, /秘密棚\/謎紙\/景品\/密輸\/暗号/);

const nativeDrive = buildGenreNativeDriveContract({
  chapterNum: 9,
  genreLabel: 'サスペンス',
  primaryDrive: '緊迫を章末まで保つ。',
  isRetry: true,
});

assert.match(nativeDrive, /v4\.8\.9 選択ジャンル本来の牽引力/);
assert.match(nativeDrive, /現在の選択ジャンル: サスペンス/);
assert.match(nativeDrive, /第9章の主推進力/);
assert.match(nativeDrive, /名前だけ変えて再利用せず/);

const campaignPrice = buildCampaignPriceCauseBan({
  chapterNum: 10,
  isRetry: true,
});

assert.match(campaignPrice, /v4\.8\.9 キャンペーン価格・販促価格原因化禁止/);
assert.match(campaignPrice, /第10章では/);
assert.match(campaignPrice, /期間限定価格を非正史/);

const continuationStall = buildContinuationStallBan({
  chapterNum: 11,
  isRetry: true,
});

assert.match(continuationStall, /v4\.8\.9 継続停滞禁止/);
assert.match(continuationStall, /第11章の継続応答/);
assert.match(continuationStall, /別の現在進行の店内行動/);

const payoffEngine = buildSelectedGenreForeshadowPayoffEngine({
  chapterNum: 12,
  genreLabel: 'コメディ',
  engine: '勘違いを駆動装置にする。',
  payoff: '小さなオチで回収する。',
  isLocalComedy: true,
  isRetry: true,
});

assert.match(payoffEngine, /v4\.9\.0 選択ジャンル・フリ回収エンジン/);
assert.match(payoffEngine, /第12章は/);
assert.match(payoffEngine, /勘違いを駆動装置にする。/);
assert.match(payoffEngine, /ローカルコメディでは/);
assert.match(payoffEngine, /直前の失敗ルートを非正史/);

const chapterLedger = buildChapterDesignLedgerContract({
  genreLabel: 'ミステリー',
  selectedAxes: '商店街 / 紙レシート',
  totalChapters: 10,
  genreBeats: ['問い', '証拠', '回収'],
  chapterPlanRule: '- 章末状態を先に決める。',
  previousCanonState: '前章末: 棚札を確認した。',
  isRetry: true,
});

assert.match(chapterLedger, /v4\.9\.3 章設計台帳/);
assert.match(chapterLedger, /選択ジャンル: ミステリー/);
assert.match(chapterLedger, /商店街 \/ 紙レシート/);
assert.match(chapterLedger, /問い → 証拠 → 回収/);
assert.match(chapterLedger, /前章末: 棚札を確認した。/);

const dailyComedyInstruction = buildDailyComedyInternalInstruction({
  chapterNum: 1,
  laughBeats: ['棚札ミス', '客の割り込み'],
  isLate: true,
  isFinal: true,
  isRetry: true,
  includeOpeningShoppingStreetAnchor: true,
  forbidTeaserEnding: true,
});

assert.match(dailyComedyInstruction, /v4\.7\.3 日常コメディ内部指示/);
assert.match(dailyComedyInstruction, /第1章の冒頭千二百字以内/);
assert.match(dailyComedyInstruction, /棚札ミス \/ 客の割り込み/);
assert.match(dailyComedyInstruction, /封筒・借金・返済/);
assert.match(dailyComedyInstruction, /どうなるのか/);

const dailyComedyLedger = buildDailyComedyChapterLedger({
  chapterNum: 2,
  beats: ['レジ', '紙レシート'],
  isRetry: true,
});

assert.match(dailyComedyLedger, /日常コメディ章別台帳/);
assert.match(dailyComedyLedger, /第2章は/);
assert.match(dailyComedyLedger, /レジ \/ 紙レシート/);
assert.match(dailyComedyLedger, /秘密・箱・暗号・密輸/);

const firstChapterProse = buildLongNovelProseQualityContract();

assert.match(firstChapterProse, /LONG-NOVEL PROSE QUALITY CONTRACT/);
assert.match(firstChapterProse, /Write complete dramatic scenes/);
assert.match(firstChapterProse, /Every 1200-1800 Japanese characters/);
assert.match(firstChapterProse, /best scene alter the next chapter/);

const continuedChapterProse = buildLongNovelProseQualityContract({
  inheritsPreviousCost: true,
});

assert.match(continuedChapterProse, /inherit the previous chapter's cost/);
assert.doesNotMatch(continuedChapterProse, /best scene alter/);

const finalChapterState = buildFinalChapterStateLock();

assert.match(finalChapterState, /FINAL CHAPTER STATE LOCK/);
assert.match(finalChapterState, /immediately previous chapter as already finished fact/);
assert.match(finalChapterState, /final choice, emotional settlement/);

const midStoryState = buildMidStoryCanonStateLock();

assert.match(midStoryState, /MID-STORY CANON STATE LOCK/);
assert.match(midStoryState, /failed retry drafts and old outline beats are not canon/);
assert.match(midStoryState, /never a successful total shutdown/);

assert.equal(
  buildGlobalAnalogMysteryContract({
    settings: {},
    mode: 'long',
    isAnalogTarget: () => {
      throw new Error('bad legacy target predicate');
    },
  }),
  '',
);
