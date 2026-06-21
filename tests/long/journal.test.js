import assert from 'node:assert/strict';
import { runLongNovelDryRun } from '../../src/longNovel/engine.js';
import { createRunJournal, loadRunJournal, scrubJournal } from '../../src/longNovel/runJournal.js';

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem: key => store.get(key) || null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
  };
}

function validSceneText(marker) {
  return [
    `「まだ残っている」彼は紙を机に置いた。${marker}の端だけが少し曲がっていた。`,
    '相手は返事を急がなかった。手の影が机の上で止まり、声だけが遅れて落ちた。',
    '彼は頷いて、紙をもう一度だけ見た。そこで言葉を増やさず、端を指で押さえた。',
  ].join('\n\n');
}

const fakeOpenAiSecret = 'sk-' + '123456789012345678901234567890';
const fakeGeminiSecret = 'AIza' + '123456789012345678901234567890';
const fakeNestedOpenAiSecret = 'sk-' + 'abcdefabcdefabcdefabcdefabcdef';

{
  const storage = createMemoryStorage();
  const journal = createRunJournal({
    provider: 'gemini',
    stage: 'm1',
    premiseText: 'secret scrub test',
    options: { apiKey: fakeOpenAiSecret, geminiKey: fakeGeminiSecret },
    storage,
  });
  journal.recordScene('C01S01', validSceneText('scrub'), {
    provider: 'gemini',
    validation: { ok: true, fatal: false, repairRequired: false, issues: [], metrics: { charCount: 120 } },
    apiKey: fakeOpenAiSecret,
  });
  const raw = storage.getItem(journal.key);
  assert.ok(raw.includes('C01S01'));
  assert.equal(raw.includes('apiKey'), false);
  assert.equal(raw.includes(fakeOpenAiSecret), false);
  assert.equal(raw.includes(fakeGeminiSecret), false);

  const loaded = loadRunJournal('gemini', storage);
  assert.equal(loaded.getScene('C01S01').body.includes('scrub'), true);
}

{
  const storage = createMemoryStorage();
  const journal = createRunJournal({
    provider: 'gemini',
    stage: 'm3',
    premiseText: 'manuscript replay version test',
    storage,
  });
  journal.recordManuscriptPlan('current plan body', {
    provider: 'gemini',
    validation: { ok: true, fatal: false, repairRequired: false, issues: [], metrics: { charCount: 17 } },
  });
  journal.recordChapterPolish(1, validSceneText('polish'), {
    provider: 'gemini',
    validation: { ok: true, fatal: false, repairRequired: false, issues: [], metrics: { charCount: 120 } },
  });
  assert.equal(loadRunJournal('gemini', storage).getManuscriptPlan().body, 'current plan body');
  assert.equal(loadRunJournal('gemini', storage).getChapterPolish(1).body.includes('polish'), true);

  const raw = JSON.parse(storage.getItem(journal.key));
  delete raw.records.manuscriptPlan.manuscriptReplayVersion;
  delete raw.records.chapterPolishes['1'].manuscriptReplayVersion;
  storage.setItem(journal.key, JSON.stringify(raw));
  const loaded = loadRunJournal('gemini', storage);
  assert.equal(loaded.getManuscriptPlan(), null);
  assert.equal(loaded.getChapterPolish(1), null);
}

{
  const cleaned = scrubJournal({
    token: fakeOpenAiSecret,
    nested: { openaiKey: fakeNestedOpenAiSecret },
    text: 'keep me',
  });
  assert.equal(cleaned.token, undefined);
  assert.equal(cleaned.nested.openaiKey, undefined);
  assert.equal(cleaned.text, 'keep me');
}

{
  const storage = createMemoryStorage();
  const firstJournal = createRunJournal({
    provider: 'gemini',
    stage: 'm1',
    premiseText: 'resume test',
    options: { targetChars: [80, 120] },
    storage,
  });
  let firstCalls = 0;
  await assert.rejects(
    runLongNovelDryRun({
      provider: 'gemini',
      stage: 'm1',
      apiKey: 'test-gemini-key',
      targetChars: [80, 120],
      attemptLimit: 1,
      journal: firstJournal,
      providerCall: async () => {
        firstCalls++;
        if (firstCalls === 3) throw new Error('planned stop');
        return { text: validSceneText(`first-${firstCalls}`), usedModel: 'fake-model' };
      },
    }),
    /Long novel run paused/
  );
  assert.equal(firstCalls, 3);
  assert.equal(loadRunJournal('gemini', storage).toJSON().status, 'paused');
  assert.equal(Object.keys(loadRunJournal('gemini', storage).toJSON().records.scenes).length, 2);

  const secondJournal = createRunJournal({
    provider: 'gemini',
    stage: 'm1',
    premiseText: 'resume test',
    options: { targetChars: [80, 120] },
    storage,
  });
  let resumeCalls = 0;
  const result = await runLongNovelDryRun({
    provider: 'gemini',
    stage: 'm1',
    apiKey: 'test-gemini-key',
    targetChars: [80, 120],
    attemptLimit: 1,
    journal: secondJournal,
    providerCall: async () => {
      resumeCalls++;
      return { text: validSceneText(`resume-${resumeCalls}`), usedModel: 'fake-model' };
    },
  });
  assert.equal(resumeCalls, 1);
  assert.equal(result.evaluation.sceneCount, 3);
  assert.equal(loadRunJournal('gemini', storage).toJSON().status, 'done');
}

console.log('long novel journal tests passed');
