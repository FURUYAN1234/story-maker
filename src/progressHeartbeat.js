function toNonNegativeSeconds(value) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return 0;
  return Math.floor(seconds);
}

function msToSeconds(value) {
  return toNonNegativeSeconds(Number(value) / 1000);
}

export function formatHeartbeatSeconds(value) {
  const total = toNonNegativeSeconds(value);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) {
    return `${hours}時間${String(minutes).padStart(2, '0')}分${String(seconds).padStart(2, '0')}秒`;
  }
  if (minutes > 0) {
    return `${minutes}分${String(seconds).padStart(2, '0')}秒`;
  }
  return `${seconds}秒`;
}

export function buildProgressHeartbeatText({
  label = '受信待機中',
  elapsedSeconds = 0,
  idleSeconds = 0,
  receivedChars = null,
  phase = '',
} = {}) {
  const parts = [
    `${label} ${formatHeartbeatSeconds(elapsedSeconds)}`,
    `最終受信 ${formatHeartbeatSeconds(idleSeconds)}前`,
  ];
  const chars = Number(receivedChars);
  if (Number.isFinite(chars) && chars >= 0) {
    parts.push(`${Math.floor(chars).toLocaleString('ja-JP')}字`);
  }
  const phaseText = String(phase || '').trim();
  if (phaseText) parts.push(phaseText);
  return parts.join(' / ');
}

export function createProgressHeartbeat({
  intervalMs = 1000,
  now = () => Date.now(),
  onTick = null,
} = {}) {
  let timer = null;
  let startedAt = 0;
  let lastSignalAt = 0;
  let state = {};

  function snapshot() {
    if (!startedAt) return null;
    const current = Number(now());
    return {
      ...state,
      elapsedMs: Math.max(0, current - startedAt),
      idleMs: Math.max(0, current - lastSignalAt),
      elapsedSeconds: msToSeconds(current - startedAt),
      idleSeconds: msToSeconds(current - lastSignalAt),
    };
  }

  function emit() {
    const current = snapshot();
    if (current && typeof onTick === 'function') onTick(current);
    return current;
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    startedAt = 0;
    lastSignalAt = 0;
    state = {};
  }

  function start(initialState = {}) {
    stop();
    const current = Number(now());
    startedAt = current;
    lastSignalAt = current;
    state = { ...initialState };
    emit();
    timer = setInterval(emit, Math.max(250, Number(intervalMs) || 1000));
    return api;
  }

  function signal(update = {}) {
    if (!startedAt) return null;
    lastSignalAt = Number(now());
    state = { ...state, ...update };
    return emit();
  }

  function update(updateState = {}) {
    if (!startedAt) return null;
    state = { ...state, ...updateState };
    return emit();
  }

  function isActive() {
    return Boolean(startedAt);
  }

  const api = {
    isActive,
    signal,
    snapshot,
    start,
    stop,
    update,
  };
  return api;
}
