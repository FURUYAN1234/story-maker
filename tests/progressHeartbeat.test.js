import assert from 'node:assert/strict';
import {
  buildProgressHeartbeatText,
  createProgressHeartbeat,
  formatHeartbeatSeconds,
} from '../src/progressHeartbeat.js';

assert.equal(formatHeartbeatSeconds(0), '0秒');
assert.equal(formatHeartbeatSeconds(8.9), '8秒');
assert.equal(formatHeartbeatSeconds(65), '1分05秒');
assert.equal(formatHeartbeatSeconds(3661), '1時間01分01秒');
assert.equal(formatHeartbeatSeconds(-10), '0秒');

assert.equal(
  buildProgressHeartbeatText({
    label: '受信中',
    elapsedSeconds: 75,
    idleSeconds: 12,
    receivedChars: 12345,
    phase: '第2章を生成中',
  }),
  '受信中 1分15秒 / 最終受信 12秒前 / 12,345字 / 第2章を生成中',
);

let currentTime = 1000;
const ticks = [];
const heartbeat = createProgressHeartbeat({
  intervalMs: 60_000,
  now: () => currentTime,
  onTick: tick => ticks.push(tick),
});

heartbeat.start({ phase: 'API応答待機中', receivedChars: 0 });
assert.equal(ticks.at(-1).elapsedSeconds, 0);
assert.equal(ticks.at(-1).idleSeconds, 0);

currentTime += 6500;
heartbeat.update({ phase: '本文受信待機中' });
assert.equal(ticks.at(-1).elapsedSeconds, 6);
assert.equal(ticks.at(-1).idleSeconds, 6);
assert.equal(ticks.at(-1).phase, '本文受信待機中');

currentTime += 2500;
heartbeat.signal({ phase: '本文受信中', receivedChars: 42 });
assert.equal(ticks.at(-1).elapsedSeconds, 9);
assert.equal(ticks.at(-1).idleSeconds, 0);
assert.equal(ticks.at(-1).receivedChars, 42);

heartbeat.stop();
assert.equal(heartbeat.isActive(), false);

console.log('progressHeartbeat tests passed');
