import { getNanoScenarioIssue, getNanoScenarioPanelCount } from './nanoScenarioContract.js';
import { buildNanoFullCopy } from './nanoCharacterHandoff.js';

export const mangaBookPageLimit = 50;

export function mangaBookFixedCounts(value) {
  const counts = typeof value === 'string' ? value.split(/[,、，]/).map(part => Number(part.trim())) : value;
  if (!Array.isArray(counts) || counts.length < 2 || counts.length > mangaBookPageLimit || counts.some(count => !Number.isInteger(count) || count < 4 || count > 8)) {
    throw new Error('本文は2〜50ページ、1ページあたり4〜8コマで指定してください。');
  }
  return counts;
}

function readPlan(response, fixedCounts) {
  const text = String(response?.text ?? response).trim().replace(/^```(?:json)?\s*|\s*```$/gi, '');
  let plan;
  try { plan = JSON.parse(text); } catch { throw new Error('全体構成をJSONとして読み取れませんでした。'); }
  if (typeof plan?.title !== 'string' || !plan.title.trim() || typeof plan.summary !== 'string' || !plan.summary.trim() || !Array.isArray(plan.pages)) throw new Error('作品名、あらすじ、ページ別の構成が必要です。');
  const counts = mangaBookFixedCounts(plan.pages.map(page => page?.panelCount));
  if (fixedCounts && (counts.length !== fixedCounts.length || counts.some((count, i) => count !== fixedCounts[i]))) throw new Error('全体構成のページ数またはコマ数が指定と一致しません。');
  if (plan.pages.some(page => typeof page?.beat !== 'string' || !page.beat.trim())) throw new Error('展開が書かれていないページがあります。');
  return { title: plan.title.trim(), summary: plan.summary.trim(), pages: plan.pages };
}

function mergeProfiles(profiles, text) {
  const raw = String(text ?? '').trim();
  const headers = [...raw.matchAll(/^##\s+\d+[.．][^\S\n]*([^\n]+)$/gm)];
  headers.forEach((header, i) => {
    const name = header[1].trim();
    if (!profiles.has(name)) profiles.set(name, raw.slice(header.index + header[0].length, headers[i+1]?.index ?? raw.length).trim());
  });
}

const readProfiles = profiles => [...profiles].map(([name, text], i) => `## ${i + 1}. ${name}\n${text}`).join('\n\n');

function previousPageEnding(page) {
  const header = page.scenario.match(new RegExp(`^\\[${page.panelCount}コマ目\\][^\\S\\n]*$`, 'm'));
  return header ? page.scenario.slice(header.index + header[0].length).trim() : '';
}

export async function generateMangaBook({ brief, mode, pagePanelCounts }, { planBook, generatePage, signal, onProgress = () => {} }) {
  const source = String(brief ?? '').trim();
  if (!source) throw new Error('作品の題材や企画を入力してください。');
  const fixed = mode === 'fixed' ? mangaBookFixedCounts(pagePanelCounts) : null;
  if (!fixed && mode !== 'auto') throw new Error('ページ数の決め方を指定してください。');
  signal.throwIfAborted();
  onProgress({ stage: 'plan' });
  const instructions = fixed
    ? `本文は厳密に${fixed.length}ページ。ページ順のコマ数: ${fixed.join(', ')}。中心となる出来事を保ち、必要な圧縮はsummaryに記載。`
    : '固定ページ数に合わせず、元の企画を自然に描き切れる本文ページ数を選ぶ。各ページは4〜8コマ。本文2〜50ページ。';
  const plan = readPlan(await planBook([
    '漫画の作品全体を構成してください。扉は含めません。題材資料は下にあります。',
    instructions,
    '利用者が指定した制作条件、必須の事実、共通の人物の呼び名・外見・衣装、小道具、伏線と結末をsummaryにまとめる。各ページの開始状態、見せ場、次へ渡す状態、保持すべき台詞や小道具をbeatに書く。本文や台本を生成する指示はsummaryとbeatへ転載せず、構成情報だけを書く。',
    'JSONだけを返す。形式は {"title":"作品名","summary":"共通設定と筋","pages":[{"panelCount":4,"beat":"ページの役割と前後"}]}。',
    '--- 題材資料 ---', source,
  ].join('\n'), signal), fixed);
  const profiles = new Map();
  const pages = [];
  for (const [i, step] of plan.pages.entries()) {
    signal.throwIfAborted();
    const pageNumber = i + 1;
    onProgress({ stage: 'page', pageNumber, totalPages: plan.pages.length });
    const prev = pages.at(-1);
    const pageBrief = [
      `出力するのは『${plan.title}』の本文${pageNumber}Pに当たる1ページだけ。${step.panelCount}コマで、他のページを併記しない。Scenario: は1つだけ。Topicには作品名を使う。`,
      `このページで描く範囲: ${step.beat}`,
      plan.pages[i + 1] ? 'このページが着地したら出力を終える。次のページの展開や台詞を書かない。' : 'このページで作品を結ぶ。',
      `共通設定・作品の概要（整合の参照資料）: ${plan.summary}`,
      prev ? `直前ページの最後のコマ（参照専用）。読み始めの状態を引き継ぎ、ここを描き直さない。\n${previousPageEnding(prev)}` : '',
      profiles.size ? `確定した人物設定。氏名・外見・衣装を引き継ぐ。\n${readProfiles(profiles).slice(0, 6000)}` : '',
    ].filter(Boolean).join('\n\n');
    const result = await generatePage(pageBrief, signal);
    signal.throwIfAborted();
    const scenario = result.scenario;
    if (getNanoScenarioIssue(scenario) || getNanoScenarioPanelCount(scenario) !== step.panelCount) throw new Error(`本文${pageNumber}Pのコマ数またはSTEP2形式が指定と一致しません。`);
    mergeProfiles(profiles, result.characters);
    const page = { pageNumber, panelCount: step.panelCount, beat: step.beat, scenario };
    pages.push(page);
    onProgress({ stage: 'complete-page', page, totalPages: plan.pages.length });
  }
  const characters = readProfiles(profiles);
  const scenario = pages.map(page => `【本文${page.pageNumber}P】\n${page.scenario}`).join('\n\n');
  return { scenario, characters, mangaInput: buildNanoFullCopy(characters, scenario), book: { title: plan.title, summary: plan.summary, pages } };
}
