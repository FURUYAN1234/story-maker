import assert from 'node:assert/strict';
import { validateSceneDraft } from '../../src/longNovel/localValidator.js';
import {
  findFormulaicEnding,
  findLexicalOveruse,
  findSpeakerPronounIssue,
} from '../../src/longNovel/literaryQualityGuards.js';
import { analyzeLongNovelQuality } from '../../src/longNovel/qualityAudit.js';
import { buildChapterAuditRepairDirectives } from '../../src/longNovel/engine.js';
import {
  buildFinalChapterEndingSurgeryPrompt,
  validateFinalPolishedChapterForState,
} from '../../src/longNovel/manuscriptEditorial.js';

const bible = {
  characters: [
    {
      id: 'C1',
      canonName: '佐藤澪',
      aliases: ['澪'],
      role: 'protagonist',
      allowedFirstPerson: ['私'],
      forbiddenFirstPerson: ['俺', '僕'],
    },
    {
      id: 'C2',
      canonName: '田中隼人',
      aliases: ['隼人'],
      role: 'counterpart',
      allowedFirstPerson: ['俺', '僕', '私'],
      forbiddenFirstPerson: [],
    },
  ],
};

{
  const draft = '澪は、言い直した。「中身があったのか、なかったのか、はっきりとは。ただ、俺が見た時には、何も入っていなかった」';
  const issue = findSpeakerPronounIssue(draft, bible);
  assert.equal(issue.character, '佐藤澪');
  assert.equal(issue.pronoun, '俺');

  const validation = validateSceneDraft(draft, { bible, allowedNames: ['佐藤澪', '澪', '田中隼人', '隼人'] });
  assert.equal(validation.ok, false);
  assert.equal(validation.issues.some(item => item.code === 'voice_pronoun_mismatch'), true);
}

{
  const lexicalDraft = Array.from({ length: 18 }, (_, index) =>
    `澪はゆっくり息を整え、視線を机に落とした。沈黙のあと、${index}番目の言葉だけを飲み込んだ。`
  ).join('\n\n');
  const overused = findLexicalOveruse(lexicalDraft, { minChars: 100 });
  assert.equal(overused.some(item => item.term === 'ゆっくり'), true);
  assert.equal(overused.some(item => item.term === '視線'), true);
}

{
  const formula = [
    '澪は封筒を机の上に置いた。',
    '隼人は何も言わず、視線だけを外した。',
    '静かな沈黙の中で、ドアがゆっくり閉まった。',
  ].join('\n');
  const issue = findFormulaicEnding(formula);
  assert.ok(issue);
  assert.ok(issue.tags.includes('silence'));
}

{
  const chapters = Array.from({ length: 5 }, (_, index) => ({
    chapter: index + 1,
    body: [
      `澪は第${index + 1}章の出来事を受け止め、隼人と短く言葉を交わした。`,
      '澪は封筒を机の上に置いた。',
      '隼人は何も言わず、視線だけを外した。',
      '静かな沈黙の中で、ドアがゆっくり閉まった。',
    ].join('\n\n'),
  }));
  const result = analyzeLongNovelQuality({ bible, chapterDrafts: chapters, manuscriptEditorial: { completed: true, chapterPolishes: chapters } }, { expectedChapterCount: 5 });
  assert.equal(result.ok, false);
  assert.equal(result.blockingWarnings.some(item => item.code === 'chapter_ending_tag_overused'), true);

  const directives = buildChapterAuditRepairDirectives({
    state: {
      bible,
      chapterDrafts: chapters,
      outline: {
        chapters: chapters.map(chapter => ({
          num: chapter.chapter,
          role: {
            discovery: `discovery-${chapter.chapter}`,
            cost: `cost-${chapter.chapter}`,
            relationshipShift: `shift-${chapter.chapter}`,
          },
        })),
      },
    },
    qualityAudit: result,
    auditPass: 1,
  });
  assert.equal(directives.size, 5);
  assert.match(directives.get(1), /Hard forbidden ending tags/);
  assert.match(directives.get(1), /Soft avoid ending tags/);
  assert.match(directives.get(1), /Required replacement final image/);
  assert.match(directives.get(1), /discovery-1/);
}

{
  const state = {
    bible,
    chapterDrafts: [],
  };
  const chapter = {
    num: 1,
    isFinal: false,
    targetChars: [80, 120],
    scenes: [],
  };
  const text = [
    '彼は机の上に鉛筆を置いた。',
    '相手は何も言わなかった。',
    '沈黙のなかでドアが閉まった。',
  ].join('\n\n');
  const directive = '- Hard forbidden ending tags for local validation: silence / door_or_exit. These are the tags that failed the manuscript audit.';
  const validation = validateFinalPolishedChapterForState(text, state, chapter, directive);
  assert.equal(validation.ok, false);
  assert.equal(validation.issues.some(item => item.code === 'chapter_ending_lane_violation'), true);
}

{
  const prompt = buildFinalChapterEndingSurgeryPrompt({
    draft: '本文本文本文。最後に沈黙して扉が閉まった。',
    issues: [
      { code: 'dialogue_ratio', message: 'not enough dialogue near the ending' },
      { code: 'chapter_ending_lane_violation', message: 'forbidden ending tag remains' },
    ],
    state: { bible, chapterDrafts: [] },
    chapter: {
      num: 1,
      targetChars: [80, 120],
      role: {
        desire: 'desire',
        misconception: 'misconception',
        discovery: 'discovery',
        cost: 'cost',
        relationshipShift: 'shift',
      },
    },
    chapterDraft: { chapter: 1, body: '本文本文本文。' },
    editorialPlan: 'editorial plan',
    chapterDirective: '- Hard forbidden ending tags for local validation: silence / door_or_exit. These are the tags that failed the manuscript audit.',
  });
  assert.match(prompt, /CHAPTER ENDING SURGERY/);
  assert.match(prompt, /Return the entire revised Japanese chapter body/);
  assert.match(prompt, /two to four short spoken lines/);
  assert.match(prompt, /Hard forbidden ending tags for local validation/);
}

console.log('long novel literary quality tests passed');
