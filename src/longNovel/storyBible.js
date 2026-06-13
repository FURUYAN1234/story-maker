export function createSeedBible(seed = {}) {
  const premise = seed.premise || seed.premiseText || '小さな約束の痕跡を見つけた主人公が、壊れかけた関係を一晩だけ踏みとどまって修復しようとする物語。';
  return {
    schemaVersion: 1,
    runId: seed.runId || '',
    premise: {
      logline: premise,
      tone: seed.tone || '静かな緊張、生活の手触り、言い切れない後悔、最後は小さな行動で余韻を残す',
    },
    characters: [
      { id: 'C1', canonName: seed.protagonist || '佐藤澪', aliases: ['澪'], role: 'protagonist', status: 'alive', sourceScene: 'seed' },
      { id: 'C2', canonName: seed.partner || '田中隼人', aliases: ['隼人'], role: 'counterpart', status: 'alive', sourceScene: 'seed' },
      { id: 'C3', canonName: seed.witness || '山本灯', aliases: ['灯'], role: 'witness', status: 'alive', sourceScene: 'seed' },
    ],
    places: [
      { id: 'P1', name: seed.place || '共同作業室', sourceScene: 'seed' },
      { id: 'P2', name: seed.secondPlace || '夜明け前の廊下', sourceScene: 'seed' },
      { id: 'P3', name: seed.thirdPlace || '小さな資料室', sourceScene: 'seed' },
    ],
    items: [
      { id: 'I1', name: seed.item || '古いノート', holder: 'C1', sourceScene: 'seed' },
      { id: 'I2', name: seed.token || '白い封筒', holder: 'C2', sourceScene: 'seed' },
      { id: 'I3', name: seed.trace || '折れた鉛筆', holder: 'C3', sourceScene: 'seed' },
    ],
    facts: [
      { id: 'F1', text: '三人は以前、共同作業室で同じ約束を交わしている。', kind: 'promise', sourceScene: 'seed' },
      { id: 'F2', text: '約束が破れた理由は、誰か一人の悪意ではなく、言えなかった事情の重なりにある。', kind: 'premise', sourceScene: 'seed' },
    ],
    openThreads: [
      { id: 'T1', setup: 'seed', text: '白い封筒がなぜ隼人の手元に残っていたのか。', dueBy: 'C01S03', status: 'open' },
      { id: 'T2', setup: 'seed', text: '澪が本当に選び直すものは、成功ではなく関係の引き受けである。', dueBy: 'final', status: 'open' },
    ],
  };
}

export function allowedNamesForScene(bible, scene = {}) {
  const names = [];
  for (const character of bible.characters || []) {
    names.push(character.canonName, ...(character.aliases || []));
  }
  return names.filter(Boolean);
}

export function projectBibleForScene(bible, scene = {}) {
  const cast = new Set(scene.cast || []);
  return {
    premise: bible.premise,
    characters: (bible.characters || []).filter(character => !cast.size || cast.has(character.id)),
    places: (bible.places || []).filter(place => !scene.place || place.id === scene.place),
    items: bible.items || [],
    facts: bible.facts || [],
    openThreads: bible.openThreads || [],
  };
}

export function appendSceneFact(bible, sceneId, text, kind = 'scene_outcome') {
  const next = structuredCloneSafe(bible);
  const id = `F${String((next.facts || []).length + 1).padStart(3, '0')}`;
  next.facts = [...(next.facts || []), { id, text, kind, sourceScene: sceneId }];
  return next;
}

function structuredCloneSafe(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}
