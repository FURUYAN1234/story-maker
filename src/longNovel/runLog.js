export function createRunLog(runId = createRunId()) {
  const entries = [];

  const record = event => {
    const entry = {
      ts: new Date().toISOString(),
      runId,
      ...event,
    };
    entries.push(entry);
    return entry;
  };

  return {
    runId,
    entries,
    record,
    accept(sceneId, attempt, details = {}) {
      return record({ sceneId, attempt, verdict: 'accept', ...details });
    },
    reject(sceneId, attempt, details = {}) {
      return record({ sceneId, attempt, verdict: 'reject', ...details });
    },
    pause(details = {}) {
      return record({ verdict: 'paused', ...details });
    },
    summary() {
      const accepted = entries.filter(entry => entry.verdict === 'accept').length;
      const rejected = entries.filter(entry => entry.verdict === 'reject').length;
      const paused = entries.some(entry => entry.verdict === 'paused');
      return {
        runId,
        accepted,
        rejected,
        paused,
        total: entries.length,
      };
    },
    toJSON() {
      return {
        runId,
        entries: entries.map(entry => ({ ...entry })),
        summary: this.summary(),
      };
    },
  };
}

export function createRunId(now = new Date()) {
  const stamp = now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `ln-${stamp}-${suffix}`;
}
