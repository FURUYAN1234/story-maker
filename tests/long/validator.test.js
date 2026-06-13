import assert from 'node:assert/strict';
import { assembleManuscript, evaluateLongNovelDraft, manuscriptFooter } from '../../src/longNovel/assembler.js';
import { runLongNovelDryRun } from '../../src/longNovel/engine.js';
import { validateSceneDraft } from '../../src/longNovel/localValidator.js';
import { buildFinalChapterPolishRepairPrompt } from '../../src/longNovel/manuscriptEditorial.js';
import { createLongNovelPlan } from '../../src/longNovel/outlinePlanner.js';
import { createRunLog } from '../../src/longNovel/runLog.js';

const allowedNames = ['佐藤澪', '澪', '田中隼人', '隼人', '山本灯', '灯'];

function makeSceneText(marker = '一', includeWitness = true) {
  const witnessLine = includeWitness
    ? '山本灯は棚の前で息を整え、見ていたことを一度に言わず、折れた鉛筆を机の端へ置いた。'
    : '田中隼人は棚の前で息を整え、まだ言えないことを隠すように、白い封筒を指で押さえた。';
  const paragraphs = [
    `佐藤澪は古いノートを開いた。${marker}枚目の紙だけが少し湿っていて、指先に残る冷たさが、思っていたよりも長く胸に居座った。`,
    '「まだ、怖がってるのか」田中隼人の声は低かった。責める形をしていないのに、澪はすぐに返事を作れなかった。',
    witnessLine,
    '澪はノートを閉じかけて、やめた。逃げるためではなく、読み落とした行をもう一度たしかめるためだった。',
    '白い封筒の角は、何度も開け閉めされたように柔らかくなっていた。誰かが雑に扱ったのではなく、迷って戻した跡だった。',
    '「隼人だけが破ったんじゃない」灯が言った。言葉は短かったが、机の上の灯りが一瞬だけ揺れた。',
    '澪は視線を上げた。隼人は言い返さず、封筒から手を離した。その沈黙が、返事よりもはっきりしていた。',
    'ノートの余白に残った薄い線を、澪は爪でなぞった。紙は破れなかった。ただ、指の腹に鉛筆の粉が少し移った。',
    '「今さらでも、読む」澪が言うと、隼人はうなずかなかった。けれど椅子を一つ、澪の方へ静かに寄せた。',
    '廊下の奥で空調が止まり、共同作業室の音が急に近くなった。三人の間に残った沈黙は、さっきより狭かった。',
    '澪は白い封筒を机の中央に戻した。誰のものでもない位置に置かれた紙だけが、灯りの下で少しだけ明るく見えた。',
  ];
  const extras = Array.from({ length: 40 }, (_, index) => {
    const step = index + 1;
    return `澪は${step}度目の確認として、紙端に残った小さな線を指でなぞった。隼人は急がせずに待ち、灯は窓の方へ顔を向け、言葉を選び直していた。誰かを責めるための間ではなく、次の一文を壊さないための間だった。`;
  });
  return [...paragraphs, ...extras].join('\n\n');
}

const longValidText = makeSceneText('一');

{
  const clicheEnding = [
    '彼は紙を机に置いた。まだ言い切れないことがあったが、指先は逃げずに白い端を押さえていた。',
    '沈黙のあとで、扉の向こうから小さな足音が返ってきた。',
    '少なくともこの瞬間、選択で終わった。それは自分にできることだった。言葉にできない余韻だけが残り、関係は未来へ向けて静かに変わり始めていた。もう誰かの返事を待つ必要もなかった。これから始まる新しい朝だった。',
  ].join('\n\n');
  const validation = validateSceneDraft(clicheEnding, { minChars: 40, allowedNames, validationPosition: 'final_polish_last' });
  assert.equal(validation.ok, false);
  assert.equal(validation.issues.some(issue => issue.code === 'cliche_closure_ending'), true);
}

function makeProviderText(prompt, marker = String(Math.random()).slice(2, 6)) {
  const includeWitness = prompt.includes('山本灯');
  if (prompt.includes('章単位') || prompt.includes('対象章')) {
    const additions = Array.from({ length: 30 }, (_, index) => {
      const step = index + 1;
      return `章編集${marker}-${step}として、澪は欲しかった答えをすぐに選ばず、白い封筒を机の中央から少しだけ隼人の方へ押した。誤解していた間の意味が変わり、灯は折れた鉛筆を拾い直した。澪は失うものを一つ認め、関係の距離を前より半歩だけ近くした。`;
    });
    return [
      makeSceneText(`${marker}A`, includeWitness),
      ...additions,
    ].join('\n\n');
  }
  return makeSceneText(marker, includeWitness);
}

{
  const result = validateSceneDraft(longValidText, { minChars: 500, allowedNames });
  assert.equal(result.ok, true);
  assert.equal(result.fatal, false);
}

{
  const result = validateSceneDraft('シーン1: これは本文ではありません。', { minChars: 200, allowedNames });
  assert.equal(result.ok, false);
  assert.equal(result.issues.some(issue => issue.code === 'meta_leak'), true);
}

{
  const labeledDraft = [
    '絵/状況: 澪が机の前に立ち、封筒とノートを見下ろしている。',
    'セリフ: 「これ、まだここに残ってたんだね」',
    longValidText,
  ].join('\n\n');
  const result = validateSceneDraft(labeledDraft, { minChars: 500, allowedNames });
  assert.equal(result.ok, false);
  assert.equal(result.issues.some(issue => issue.code === 'format_label_leak'), true);
}

{
  const result = validateSceneDraft('佐藤澪は鈴木花子に封筒を渡した。'.repeat(80), { minChars: 500, allowedNames });
  assert.equal(result.ok, false);
  assert.equal(result.issues.some(issue => issue.code === 'off_bible_name'), true);
}

{
  const log = createRunLog('ln-test');
  log.accept('C01S01', 1, { charCount: 1200 });
  log.reject('C01S02', 1, { reasons: ['meta_leak'] });
  assert.deepEqual(log.summary(), { runId: 'ln-test', accepted: 1, rejected: 1, paused: false, total: 2 });
}

{
  const { outline } = createLongNovelPlan({ stage: 'm4' });
  assert.equal(outline.chapters.length, 10);
  assert.equal(outline.chapters.flatMap(chapter => chapter.scenes).length, 50);
  assert.equal(outline.chapters[0].scenes[0].id, 'C01S01');
  assert.equal(outline.chapters[9].scenes[4].id, 'C10S05');
  assert.equal(typeof outline.chapters[0].role.desire, 'string');
  assert.equal(typeof outline.chapters[0].role.misconception, 'string');
  assert.equal(typeof outline.chapters[0].role.discovery, 'string');
  assert.equal(typeof outline.chapters[0].role.cost, 'string');
  assert.equal(typeof outline.chapters[0].role.relationshipShift, 'string');
  assert.equal(outline.chapters[0].scenes[0].chapterRole.desire, outline.chapters[0].role.desire);
  // 新フィールドの存在検証
  assert.equal(typeof outline.chapters[0].role.newInformation, 'string');
  assert.equal(typeof outline.chapters[0].role.irreversibleAction, 'string');
  assert.equal(typeof outline.chapters[0].role.relationshipDelta, 'string');
  assert.equal(typeof outline.chapters[0].role.objectStateChange, 'string');
  assert.equal(typeof outline.chapters[0].role.sceneVenueShift, 'string');
  assert.equal(typeof outline.chapters[0].role.readerHook, 'string');
  // 全章に新フィールドが存在すること
  for (const chapter of outline.chapters) {
    assert.ok(chapter.role.newInformation, `chapter ${chapter.num} missing newInformation`);
    assert.ok(chapter.role.irreversibleAction, `chapter ${chapter.num} missing irreversibleAction`);
    assert.ok(chapter.role.readerHook, `chapter ${chapter.num} missing readerHook`);
  }
}

{
  const { bible, outline } = createLongNovelPlan({ stage: 'm4' });
  const chapter = outline.chapters[0];
  const prompt = buildFinalChapterPolishRepairPrompt({
    draft: makeSceneText('repair-target'),
    issues: [{ code: 'final_polish_length_short', message: 'too short' }],
    state: { bible, outline },
    chapter,
    chapterDraft: { chapter: 1, body: makeSceneText('repair-target') },
    editorialPlan: 'Repetition Compression: keep only useful echoes. Chapter Showcase Upgrades: keep the strongest visible choice.',
    priorPrompt: 'previous prompt',
  });
  assert.match(prompt, /Strict final-polish minimum: 4060 Japanese characters/);
  assert.match(prompt, /Current failed draft length:/);
  assert.match(prompt, /Accepted chapter body to preserve and repair from:/);
}

{
  const result = await runLongNovelDryRun({
    provider: 'gemini',
    stage: 'm2',
    apiKey: 'test-gemini-key-with-enough-length',
    providerCall: async ({ prompt }) => {
      if (prompt.includes('WHOLE_MANUSCRIPT_EDITOR') && prompt.includes('PLAN REQUEST')) {
        return {
          text: [
            'Repetition Compression: remove duplicated silence and repeated self-blame while preserving one concrete hesitation per chapter.',
            'Chapter Showcase Upgrades: every chapter needs one visible action, object movement, or conversation that can only belong to that chapter.',
            'Foreshadowing Setup and Payoff: keep the old notebook, pencil, document edge, witness placement, and delayed statement moving toward later choices.',
            'Protagonist Choice Clarity: each chapter must end with the protagonist doing or refusing something specific instead of thinking generally.',
            'Emotional Progression by Chapter: fear moves to suspicion, suspicion to discovery, discovery to cost, cost to relationship change, and final acceptance to action.',
          ].join('\n'),
          usedModel: 'fake-model',
        };
      }
      if (prompt.includes('WHOLE_MANUSCRIPT_EDITOR') && prompt.includes('CHAPTER POLISH')) {
        return {
          text: makeSceneText('final-polish', prompt.includes('螻ｱ譛ｬ轣ｯ')),
          usedModel: 'fake-model',
        };
      }
      return {
        text: makeProviderText(prompt),
        usedModel: 'fake-model',
      };
    },
  });
  assert.equal(result.evaluation.ok, true);
  assert.equal(result.evaluation.sceneCount, 6);
  assert.equal(result.evaluation.chapterCount, 1);
  assert.equal(result.manuscript.endsWith(manuscriptFooter()), true);
}

{
  const result = await runLongNovelDryRun({
    provider: 'openai',
    stage: 'm4',
    apiKey: 'test-openai-key-with-enough-length',
    providerCall: async ({ prompt }) => {
      if (prompt.includes('WHOLE_MANUSCRIPT_EDITOR') && prompt.includes('PLAN REQUEST')) {
        return {
          text: [
            'Repetition Compression: remove duplicated silence and repeated self-blame while preserving one concrete hesitation per chapter.',
            'Chapter Showcase Upgrades: every chapter needs one visible action, object movement, or conversation that can only belong to that chapter.',
            'Foreshadowing Setup and Payoff: keep the old notebook, pencil, document edge, witness placement, and delayed statement moving toward later choices.',
            'Protagonist Choice Clarity: each chapter must end with the protagonist doing or refusing something specific instead of thinking generally.',
            'Emotional Progression by Chapter: fear moves to suspicion, suspicion to discovery, discovery to cost, cost to relationship change, and final acceptance to action.',
          ].join('\n'),
          usedModel: 'fake-model',
        };
      }
      if (prompt.includes('WHOLE_MANUSCRIPT_EDITOR') && prompt.includes('CHAPTER POLISH')) {
        return {
          text: makeProviderText(prompt, 'final-polish'),
          usedModel: 'fake-model',
        };
      }
      if (prompt.includes('Strict final-polish minimum')) {
        return {
          text: makeProviderText(prompt, 'repair'),
          usedModel: 'fake-model',
        };
      }
      return {
        text: makeProviderText(prompt),
        usedModel: 'fake-model',
      };
    },
  });
  assert.equal(result.evaluation.ok, true);
  assert.equal(result.evaluation.sceneCount, 50);
  assert.equal(result.evaluation.chapterCount, 10);
  assert.equal(result.evaluation.chapterEditCount, 10);
  assert.equal(result.evaluation.manuscriptEditCount, 10);
  assert.equal(result.evaluation.manuscriptEditorialCompleted, true);
  assert.equal(result.manuscript.includes('第1章'), true);
  assert.equal(result.manuscript.includes('第10章'), true);
  assert.equal(result.manuscript.endsWith(manuscriptFooter()), true);
}

{
  const fakeState = {
    outline: { chapters: [{ scenes: [{ targetChars: [500] }] }] },
    draftScenes: [{ scene: { id: 'C01S01', chapter: 1 }, body: longValidText, validation: { ok: true, issues: [] } }],
    canonScenes: [{ sceneId: 'C01S01', chapter: 1, body: longValidText }],
  };
  const manuscript = assembleManuscript(fakeState);
  const evaluation = evaluateLongNovelDraft(fakeState, { sceneCount: 1, chapterCount: 1 });
  assert.equal(manuscript.includes(manuscriptFooter()), true);
  assert.equal(evaluation.hasFooter, true);
}

console.log('long novel validator tests passed');

// F: evaluateLongNovelDraft の warnings 配列存在検証
{
  const { bible, outline } = createLongNovelPlan({ stage: 'm4' });
  const fakeChapterBody = Array.from({ length: 5 }, (_, i) => makeSceneText(`ch-s${i + 1}`)).join('\n\n');
  const fakeChapterDrafts = outline.chapters.map(ch => ({
    chapter: ch.num,
    body: fakeChapterBody,
    charCount: fakeChapterBody.length,
    validation: { ok: true, issues: [] },
  }));
  const fakeState = {
    bible,
    outline,
    chapterDrafts: fakeChapterDrafts,
    draftScenes: outline.chapters.flatMap(ch =>
      ch.scenes.map(s => ({ scene: s, body: makeSceneText(`s${s.id}`), validation: { ok: true, issues: [] } }))
    ),
    canonScenes: outline.chapters.flatMap(ch =>
      ch.scenes.map(s => ({ sceneId: s.id, chapter: ch.num, body: makeSceneText(`s${s.id}`) }))
    ),
    manuscriptEditorial: { completed: true, plan: 'test plan', validation: { ok: true }, chapterPolishes: fakeChapterDrafts },
  };
  const evaluation = evaluateLongNovelDraft(fakeState, { sceneCount: 50, chapterCount: 10 });
  assert.ok(Array.isArray(evaluation.warnings), 'warnings should be an array');
  // fakeデータでは全章が同じ構造なので、chapter_tail_similarity warning が出る可能性がある
  // warnings が存在すること自体を検証（fatalではないので ok は true のまま）
  if (evaluation.warnings.length > 0) {
    assert.ok(evaluation.ok, 'warnings should not affect ok status');
    for (const w of evaluation.warnings) {
      assert.ok(w.code, 'each warning should have a code');
      assert.ok(w.message, 'each warning should have a message');
    }
  }
  console.log(`  warnings count: ${evaluation.warnings.length}`);
}

// sceneContract の roleLines に新フィールドが出力されることの検証
import { buildSceneContract } from '../../src/longNovel/sceneContract.js';
import { createSeedBible } from '../../src/longNovel/storyBible.js';
{
  const { outline, bible } = createLongNovelPlan({ stage: 'm4' });
  const scene = outline.chapters[0].scenes[0];
  const contract = buildSceneContract({ scene, bible, previousScenes: [], attempt: 1, provider: 'gemini' });
  assert.ok(contract.includes('新情報:'), 'sceneContract should include newInformation line');
  assert.ok(contract.includes('不可逆行動:'), 'sceneContract should include irreversibleAction line');
  assert.ok(contract.includes('関係の前後差:'), 'sceneContract should include relationshipDelta line');
  assert.ok(contract.includes('小物状態変化:'), 'sceneContract should include objectStateChange line');
  assert.ok(contract.includes('場所移動圧:'), 'sceneContract should include sceneVenueShift line');
  assert.ok(contract.includes('次章を読む理由:'), 'sceneContract should include readerHook line');
}

console.log('all new quality field tests passed');
