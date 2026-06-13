import { countChars, validateSceneDraft } from './localValidator.js';
import { STORY_MAKER_FOOTER } from '../version.js';

const FOOTER = STORY_MAKER_FOOTER;

export function assembleManuscript(state) {
  const chapterDrafts = sortedChapterDrafts(state);
  const scenes = state.canonScenes || [];
  const body = chapterDrafts.length
    ? chapterDrafts.map(formatChapterDraft).join('\n\n')
    : scenes.map(scene => scene.body.trim()).join('\n\n');
  return `${body}\n\n${FOOTER}`.trim();
}

export function evaluateLongNovelDraft(state, expected = {}) {
  const body = assembleManuscript(state);
  const sceneValidations = (state.draftScenes || []).map(({ scene, body: sceneBody, validation }) => ({
    sceneId: scene.id,
    chapter: scene.chapter || 1,
    ok: validation?.ok ?? validateSceneDraft(sceneBody, scene.validationContext).ok,
    charCount: countChars(sceneBody),
    issues: validation?.issues || [],
  }));
  const chapterDrafts = sortedChapterDrafts(state);
  const chapterDraftValidations = chapterDrafts.map(chapter => ({
    chapter: chapter.chapter,
    ok: chapter.validation?.ok !== false,
    charCount: chapter.charCount || countChars(chapter.body),
    issues: chapter.validation?.issues || [],
  }));
  const expectedSceneCount = expected.sceneCount || expected.expectedSceneCount || countExpectedScenes(state);
  const expectedChapterCount = expected.chapterCount || expected.expectedChapterCount || countExpectedChapters(state);
  const editorialRequired = Boolean(state.outline?.stage?.editorialPass);
  const manuscriptEditorialRequired = Boolean(state.outline?.stage?.manuscriptEditorialPass);
  const manuscriptEditorial = state.manuscriptEditorial || {};
  const manuscriptEditCount = (manuscriptEditorial.chapterPolishes || []).length;
  const manuscriptPlanOk = manuscriptEditorial.validation?.ok !== false && Boolean(manuscriptEditorial.plan);
  const minTotalChars = expected.minTotalChars || minimumTotalCharsForState(state);
  const completedChapters = new Set(sceneValidations.map(item => item.chapter).filter(Boolean)).size;
  const totalChars = countChars(body);
  const fatalCount = [
    ...sceneValidations.flatMap(v => v.issues),
    ...chapterDraftValidations.flatMap(v => v.issues),
  ].filter(issue => issue.severity === 'fatal').length;
  const footerCount = countMatches(body, /Created\s+By\s+AI\s+Story\s+Maker\s+V[\d.]+/g);
  const dialogueCount = countMatches(body, /「[^」]{2,}」/g);
  const textureSignals = countMatches(body, /(手|指|目|肩|息|声|足|背中|視線|ノート|紙|鉛筆|机|封筒|灯り|窓|鍵|写真)/g);

  // 品質warning指標（fatalではなく警告のみ。完走率に影響しない）
  const warnings = [];
  if (chapterDrafts.length >= 3) {
    // 章末の物理イメージ類似検出
    const tailObjects = ['封筒', 'ノート', '鉛筆', '机'];
    const chapterTails = chapterDrafts.map(ch => String(ch.body || '').slice(-120));
    const tailObjectCounts = tailObjects.map(obj => ({
      object: obj,
      count: chapterTails.filter(tail => tail.includes(obj)).length,
    }));
    const overusedTails = tailObjectCounts.filter(item => item.count >= Math.ceil(chapterDrafts.length * 0.6));
    if (overusedTails.length > 0) {
      warnings.push({
        code: 'chapter_tail_similarity',
        message: `章末の物理イメージが偏っています: ${overusedTails.map(item => `${item.object}(${item.count}/${chapterDrafts.length}章)`).join(', ')}`,
        details: overusedTails,
      });
    }

    // 同一小物過密検出
    const objectDensityTargets = ['封筒', 'ノート', '鉛筆', '机', '紙', '鍵', '写真'];
    for (const obj of objectDensityTargets) {
      const totalHits = countMatches(body, new RegExp(obj, 'g'));
      if (totalHits > chapterDrafts.length * 8) {
        warnings.push({
          code: 'object_over_density',
          message: `「${obj}」が全体で${totalHits}回出現し、過密です。`,
          object: obj,
          count: totalHits,
        });
      }
    }

    // 受動・停滞表現の過密検出
    const passiveHits = countMatches(body, /(分からない|分からなかった|黙った|黙り|気まず|沈黙)/g);
    if (passiveHits > chapterDrafts.length * 6) {
      warnings.push({
        code: 'passive_over_density',
        message: `受動・停滞表現が${passiveHits}回出現し、過密です。`,
        count: passiveHits,
      });
    }

    // 章ごとの行動シグナル弱さ検出
    const actionPattern = /(選んだ|選ぶ|選び|決めた|決める|拒んだ|拒む|渡した|渡す|破った|破る|捨てた|捨てる|告げた|告げる|受け取った|受け取る)/g;
    const weakActionChapters = chapterDrafts.filter(ch => {
      const hits = countMatches(String(ch.body || ''), actionPattern);
      return hits < 2;
    });
    if (weakActionChapters.length >= Math.ceil(chapterDrafts.length * 0.4)) {
      warnings.push({
        code: 'action_signal_weak',
        message: `${weakActionChapters.length}/${chapterDrafts.length}章で行動シグナルが弱いです。`,
        weakChapters: weakActionChapters.map(ch => ch.chapter),
      });
    }
  }

  return {
    ok: fatalCount === 0
      && sceneValidations.length >= expectedSceneCount
      && completedChapters >= expectedChapterCount
      && (!editorialRequired || chapterDrafts.length >= expectedChapterCount)
      && (!manuscriptEditorialRequired || (manuscriptEditorial.completed && manuscriptPlanOk && manuscriptEditCount >= expectedChapterCount))
      && totalChars >= minTotalChars
      && footerCount === 1,
    totalChars,
    sceneCount: sceneValidations.length,
    expectedSceneCount,
    chapterCount: completedChapters,
    expectedChapterCount,
    fatalCount,
    dialogueCount,
    textureSignals,
    hasFooter: body.endsWith(FOOTER),
    footerCount,
    minTotalChars,
    editorialRequired,
    manuscriptEditorialRequired,
    chapterEditCount: chapterDrafts.length,
    manuscriptEditCount,
    manuscriptEditorialCompleted: Boolean(manuscriptEditorial.completed),
    manuscriptPlanOk,
    chapterDraftValidations,
    sceneValidations,
    warnings,
  };
}

export function manuscriptFooter() {
  return FOOTER;
}

function countExpectedScenes(state) {
  return (state.outline?.chapters || []).reduce((total, chapter) => total + (chapter.scenes || []).length, 0);
}

function countExpectedChapters(state) {
  return (state.outline?.chapters || []).length || 1;
}

function sumSceneMinimums(state) {
  return (state.outline?.chapters || [])
    .flatMap(chapter => chapter.scenes || [])
    .reduce((total, scene) => total + (scene.targetChars?.[0] || 0), 0);
}

function minimumTotalCharsForState(state) {
  const editorialRequired = Boolean(state.outline?.stage?.editorialPass || state.outline?.stage?.manuscriptEditorialPass);
  if (!editorialRequired) return Math.max(3000, Math.floor(sumSceneMinimums(state) * 0.85));
  const chapterMinimums = (state.outline?.chapters || []).reduce((total, chapter) => {
    const sceneMinimum = (chapter.scenes || [])
      .reduce((chapterTotal, scene) => chapterTotal + (scene.targetChars?.[0] || 0), 0);
    return total + Math.max(900, Math.floor(sceneMinimum * 0.48));
  }, 0);
  return Math.max(3000, chapterMinimums);
}

function sortedChapterDrafts(state) {
  return [...(state.chapterDrafts || [])].sort((a, b) => a.chapter - b.chapter);
}

function formatChapterDraft(chapter) {
  const body = String(chapter.body || '').trim();
  const number = Number(chapter.chapter || 1);
  const heading = Number.isFinite(number) ? `第${number}章` : '第1章';
  if (body.startsWith(heading)) return body;
  return `${heading}\n\n${body}`;
}

function countMatches(text, pattern) {
  return [...String(text || '').matchAll(pattern)].length;
}
