export function createSceneLedger() {
  const scenes = [];
  return {
    scenes,
    commit(entry) {
      if (!entry?.sceneId) throw new Error('sceneId is required');
      if (scenes.some(scene => scene.sceneId === entry.sceneId)) {
        throw new Error(`scene already committed: ${entry.sceneId}`);
      }
      scenes.push({
        committedAt: new Date().toISOString(),
        ...entry,
      });
      return scenes[scenes.length - 1];
    },
    tail(count = 2) {
      return scenes.slice(Math.max(0, scenes.length - count));
    },
    summaries() {
      return scenes.map(scene => ({
        sceneId: scene.sceneId,
        chapter: scene.chapter,
        charCount: scene.charCount,
        exitState: scene.exitState,
        provider: scene.provider,
      }));
    },
  };
}
