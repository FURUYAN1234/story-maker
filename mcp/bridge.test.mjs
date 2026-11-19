import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import * as z from 'zod/v4';
import { createBridge } from './bridge.mjs';

test('pair exact build, isolate browser sessions, and persist one execution for each request', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'furu-mcp-'));
  const identity = { app: 'connection-test', version: '1.2.3', contract: 1, source: 'production-build' };
  const output = z.object({ scenario: z.string() }).strict();
  let bridge;
  let listener;
  try {
    bridge = await createBridge({ identity, operation: 'example', output, directory });
    const options = { identity, operation: 'example', output, directory };
    await assert.rejects(createBridge(options), { code: 'WORKSPACE_BUSY' });
    let middleware;
    listener = http.createServer((req, res) => middleware(req, res, () => res.end()));
    listener.listen(0, '127.0.0.1');
    await once(listener, 'listening');
    bridge.plugin.configurePreviewServer({ config: { base: '/app/' }, httpServer: listener, middlewares: { use(fn) { middleware = fn; } } });
    const url = 'http://127.0.0.1:' + listener.address().port + '/app/';
    async function post(route, token, body, origin) {
      const res = await fetch(url + '__furu_mcp__/' + route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token, ...(origin ? { Origin: origin } : {}) },
        body: JSON.stringify(body),
      });
      return { status: res.status, body: await res.json() };
    }
    const pairing = link => new URLSearchParams(new URL(link.url).hash.slice(1)).get('mcp');
    const ticket = pairing(await bridge.connection(url));
    assert.equal((await post('connect', ticket, identity, 'https://example.test')).status, 403);
    const mismatch = await post('connect', ticket, { ...identity, source: 'old-build' });
    assert.equal(mismatch.body.code, 'BUILD_MISMATCH');
    const first = await post('connect', ticket, identity);
    assert.equal(first.status, 200);
    const token = first.body.token;
    assert.equal((await post('connect', ticket, identity)).status, 401);
    assert.equal((await bridge.status()).connected, true);

    const input = { brief: 'A letter in the city library' };
    const job = await bridge.submit('request-1', input);
    assert.equal((await bridge.submit('request-1', input)).id, job.id);
    await assert.rejects(bridge.submit('request-1', { brief: 'Different' }), { code: 'REQUEST_CONFLICT' });
    await assert.rejects(bridge.connection(url, true), { code: 'APP_BUSY' });
    await assert.rejects(bridge.submit('request-2', input), { code: 'APP_BUSY' });
    const dispatched = await post('poll', token, { busy: false, accepting: true });
    assert.equal(dispatched.body.job.id, job.id);
    assert.deepEqual((await post('poll', token, { busy: false, accepting: true })).body, {});
    const accepted = await post('result', token, { id: job.id, state: 'succeeded', result: { scenario: 'Validated' } });
    assert.equal(accepted.status, 200);
    const result = (await bridge.get(job.id)).result;
    assert.equal(JSON.parse(await readFile(result.manifestPath, 'utf8')).scenario, 'Validated');

    const replacing = pairing(await bridge.connection(url, true));
    const second = (await post('connect', replacing, identity)).body.token;
    assert.equal((await post('poll', token, {})).status, 401);
    const cancel = await bridge.submit('request-2', input);
    await post('poll', second, { busy: false, accepting: true });
    assert.equal((await bridge.cancel(cancel.id)).state, 'cancelling');
    assert.equal((await post('poll', second, { busy: true })).body.cancel, cancel.id);
    await post('result', second, { id: cancel.id, state: 'cancelled' });
    assert.equal((await bridge.get(cancel.id)).state, 'cancelled');

    const lost = await bridge.submit('request-3', input);
    await post('poll', second, { busy: false, accepting: true });
    await post('disconnect', second, {});
    assert.equal((await bridge.get(lost.id)).state, 'unknown');
    await bridge.close();
    bridge = await createBridge(options);
    assert.equal((await bridge.submit('request-3', input)).state, 'unknown');
    assert.equal((await bridge.get(job.id)).state, 'succeeded');
  } finally {
    await bridge?.close();
    if (listener) await new Promise(resolve => listener.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});
