export function getLocalComedyAllowedMeans() {
  return [
    'paper receipt',
    'handwritten shift note',
    'cash-count slip',
    'stock discrepancy',
    'paper delivery invoice',
    'shelf label',
    'shelf-label correction slip',
    'customer complaint slip',
    'physical package',
    'cardboard box',
    'product wrapper',
    'packaging label',
    'store-work misunderstanding',
    'mistaken assumption',
    'badly timed joke',
    'embarrassing practical mistake',
    'awkward apology',
    'customer testimony',
    'shopkeeper testimony',
    'neighborhood gossip',
    'town association note',
    'face-to-face lie',
    'awkward confession',
    'staff refusal',
    'practical loss',
    'small refund',
    'unpaid debt',
    'betrayal',
  ];
}

export function getChapterCarrierRotationCarriers(chapterNum = 1) {
  const carriers = [
    ['手書き棚札の訂正ミス', '紙レシート', '客の証言'],
    ['棚札価格違い', '現金差異', '近所の店主の一言'],
    ['紙の納品書', '包装/段ボール取り違え', '商品棚の実物確認'],
    ['苦情票', 'シフトメモ', '店員の言い訳'],
    ['レシート控え', '棚札の貼り替え忘れ', '常連客の記憶'],
    ['現金確認票', '包装ラベル', '気まずい謝罪'],
    ['紙の発注書', '商品パッケージ', '商店会掲示'],
    ['客の証言', '小さな返金', 'スタッフの告白'],
    ['シフトメモ', '紙レシート', '店長の謝罪'],
    ['最終レシート照合', '対面の告白', '小さな弁償'],
    ['商店街の掲示', '棚札/包装の後始末', '明るい謝罪'],
  ];
  return carriers[(Math.max(1, Number(chapterNum) || 1) - 1) % carriers.length];
}

export function hasDigitalEvidenceRoute(value) {
  return /(?:\bPOS\b|ＰＯＳ|POSログ|posログ|売上データ|販売データ|レジデータ|レジログ|レジのログ|レジ記録|レジ履歴|会計履歴|端末データ|データ分析|分析結果|サーバー|システムログ|アプリ|画面記録|防犯カメラ|監視カメラ|スキャン履歴|商品マスタ|バーコードデータ|電子記録|デジタル証拠)/i.test(String(value || ''));
}

export function hasRegisterSurface(value) {
  return /(?:レジ|会計|スキャン|レシート|棚札|現金|釣り銭|インク|カートリッジ|プリンター|スタンプ台|スタンプカード|商品を通す|値段を確認)/.test(String(value || ''));
}

export function filterStoreOperationDigitalFallbackIssues(issues, text) {
  if (!Array.isArray(issues)) return issues;
  const hasDigital = hasDigitalEvidenceRoute(text);
  const hasRegister = hasRegisterSurface(text);
  return issues
    .map((issue) => String(issue || '').split(/\s+\/\s+/).filter((part) => !((
      /v4\.5\.9 POS data fallback/i.test(part)
      || /v4\.6\.1 story-means ledger/i.test(part) && /kinds:digitalLab/i.test(part)
    ) && hasRegister && !hasDigital)).join(' / '))
    .filter(Boolean);
}

export function hasLocalStoreSurface(value) {
  return /(?:レジ|会計|棚札|値札|紙レシート|レシート|現金|返金|釣り銭|納品書|包装|段ボール|苦情票|シフトメモ|手書き|貼り紙|商品棚|商品|客|店長|店主|商店街|常連|謝罪|発注書|包装ラベル|商品パッケージ|店内|レジ列|コンビニ|証言|後始末)/.test(String(value || ''));
}

export function hasCultFacilityRoute(value) {
  return /(?:宗教団体|教団|信者|教祖|カルト|洗脳|浄化|儀式|祭壇|聖域|供物|生贄|贄|祠|呪い|地下施設|隔離施設|cult|religion|brainwash|ritual|sacrifice|underground facility)/i.test(String(value || ''));
}

export function hasPromoSecretTemplatePayoff(value) {
  const text = String(value || '');
  return /(?:キャンペーン|販促|値引|割引|期間限定|限定商品|限定スイーツ|限定ジュース|幻の|伝説の|秘密在庫|秘密棚|謎の棚|秘密の取引|密輸|暗号|過去のイベント|去年の|店の歴史|メーカー都合|商品開発|USB|POSログ|データ分析|研究施設|実験施設|巨大な陰謀|秘密計画).{0,120}(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱)|(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱).{0,120}(?:キャンペーン|販促|値引|割引|期間限定|限定商品|限定スイーツ|限定ジュース|幻の|伝説の|秘密在庫|秘密棚|謎の棚|秘密の取引|密輸|暗号|過去のイベント|去年の|店の歴史|メーカー都合|商品開発|USB|POSログ|データ分析|研究施設|実験施設|巨大な陰謀|秘密計画)/.test(text)
    || hasCultFacilityRoute(text);
}

export function filterLocalComedyCultCompletionIssues(issues, text, { isLocalComedy = false } = {}) {
  if (!Array.isArray(issues) || !issues.length) return issues;
  const hasStoreSurface = hasLocalStoreSurface(text);
  const hasCultRoute = hasCultFacilityRoute(text);
  const hasPromoPayoff = hasPromoSecretTemplatePayoff(text);
  return issues
    .map((issue) => String(issue || '').split(/\s+\/\s+/).filter((part) => (isLocalComedy ? !(
      hasStoreSurface && !hasCultRoute && /v4\.6\.1 story-means ledger:.*kinds:[^)]*cultFacility/.test(part)
      || hasStoreSurface && !hasPromoPayoff && /v4\.9\.0 完成救済/.test(part)
    ) : true)).join(' / '))
    .filter(Boolean);
}

export function hasDigitalPayoffRoute(value) {
  const text = String(value || '');
  return /(?:USB|POSログ|POSデータ|売上データ|販売データ|レジデータ|端末データ|データ分析|分析結果|システムログ|サーバー|電子記録|スキャン履歴|商品マスタ|バーコードデータ|防犯カメラ|監視カメラ|映像解析|画像解析|アプリ|スマホ|スマートフォン|端末|システム|研究施設|実験施設|研究室|実験室|記憶装置|記憶操作|秘密計画|AI兵器|人工知能).{0,120}(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱)|(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱).{0,120}(?:USB|POSログ|POSデータ|売上データ|販売データ|レジデータ|端末データ|データ分析|分析結果|システムログ|サーバー|電子記録|スキャン履歴|商品マスタ|バーコードデータ|防犯カメラ|監視カメラ|映像解析|画像解析|アプリ|スマホ|スマートフォン|端末|システム|研究施設|実験施設|研究室|実験室|記憶装置|記憶操作|秘密計画|AI兵器|人工知能)/i.test(text);
}

export function filterLocalComedyDigitalCompletionIssues(issues, text, { isLocalComedy = false } = {}) {
  if (!Array.isArray(issues) || !issues.length) return issues;
  const hasStoreSurface = hasLocalStoreSurface(text);
  const hasDigitalPayoff = hasDigitalPayoffRoute(text);
  return issues
    .map((issue) => String(issue || '').split(/\s+\/\s+/).filter((part) => !(
      isLocalComedy
      && hasStoreSurface
      && !hasDigitalPayoff
      && (
        /v4\.6\.1 story-means ledger:.*kinds:[^)]*digitalLab/.test(part)
        || /v4\.5\.9 POS data fallback/.test(part)
      )
    )).join(' / '))
    .filter(Boolean);
}
