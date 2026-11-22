import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { generateMangaBook, mangaBookFixedCounts, mangaPagePreview } from '../src/mangaBook.js';
import { input, output } from '../mcp/app.mjs';
import { scenarioFixture } from '../scripts/fixtures/nanoScenarioFixture.mjs';

const plan = (...counts) => JSON.stringify({ title: '返却の順番', summary: '札を直して列を作り直す。', pages: counts.map((panelCount, index) => ({ panelCount, beat: `${index + 1}ページ目の展開` })) });

test('the page preview starts with the panels without exposing layout data', () => {
  const scenario = scenarioFixture({ count: 5 }).replace(/\n/g, '\r\n');
  const panels = mangaPagePreview(scenario);
  assert.deepEqual(panels.map(panel => panel.title), ['1コマ目', '2コマ目', '3コマ目', '4コマ目', '5コマ目']);
  assert.match(panels[0].body, /^状況：係員/);
  assert.match(panels[0].body, /係員「こちらへどうぞ。」/);
  assert.match(panels.at(-1).body, /セリフなし/);
  assert.doesNotMatch(panels.map(panel => panel.body).join('\n'), /PageComposition|BalloonLayout|EMOTION|Camera|カメラ：|\r/);
  assert.deepEqual(mangaPagePreview('コマ見出しなし'), []);
  assert.match(scenario, /PageComposition:.*\r\n/);
  assert.match(scenario, /BalloonLayout: \[\{/);
});

test('book mode isolates intermediate output and copies the complete unmodified script', async () => {
  const server = await createServer({ configFile: false, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, watch: null } });
  const savedDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const savedNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    const { installMangaBookPanel } = await server.ssrLoadModule('/src/mangaBookPanel.js');
    const element = () => {
      const children = [];
      const classes = new Set();
      const handlers = new Map();
      return {
        children, textContent: '',
        classList: {
          add: value => classes.add(value),
          remove: value => classes.delete(value),
          contains: value => classes.has(value),
          toggle(value, on) { if (on) classes.add(value); else classes.delete(value); },
        },
        append: (...nodes) => children.push(...nodes),
        replaceChildren: (...nodes) => children.splice(0, children.length, ...nodes),
        addEventListener: (type, listener) => handlers.set(type, listener),
        click: event => handlers.get('click')?.(event),
        focus() {},
      };
    };
    const elements = new Map();
    const get = id => {
      if (!elements.has(id)) elements.set(id, element());
      return elements.get(id);
    };
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { getElementById: get, createElement: element } });
    let copied;
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { async writeText(value) { copied = value; } } } });
    get('output').textContent = '通常画面の原稿';
    get('btn-output-clear').addEventListener('click', () => { get('output').textContent = 'はじめ方'; });
    const scenario = scenarioFixture({ count: 5 });
    const panel = installMangaBookPanel({
      stop() {},
      async generate(_request, onProgress) {
        assert.equal(get('output-panel').classList.contains('manga-book-view'), true);
        get('output').textContent = scenario;
        get('btn-generate').click({ isTrusted: false });
        assert.equal(get('output-panel').classList.contains('manga-book-view'), true, 'internal generation must not show its draft');
        const page = { pageNumber: 1, panelCount: 5, scenario };
        onProgress({ stage: 'complete-page', page });
        return { book: { title: '返却の順番', summary: '試験用', pages: [page] }, characters: '' };
      },
    });
    await panel.run({});
    const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
    assert.match(css, /\.output-panel\.manga-book-view[^\n]*#output(?:,|\))[^\n]*display:none/);
    assert.equal(get('output-panel').classList.contains('manga-book-view'), true);
    const entry = get('manga-book-pages').children[0];
    const [, copy, ...sections] = entry.children;
    const raw = sections.pop();
    assert.equal(raw.className, 'manga-book-raw hidden');
    assert.equal(sections.length, 5);
    assert.doesNotMatch(sections.map(node => node.children[1].textContent).join('\n'), /PageComposition|BalloonLayout|\[Camera/);
    await copy.click();
    assert.equal(copied, scenario);
    get('manga-book-return').click();
    assert.equal(get('output-panel').classList.contains('manga-book-view'), false);
    assert.equal(get('output').textContent, 'はじめ方');
  } finally {
    if (savedDocument) Object.defineProperty(globalThis, 'document', savedDocument); else delete globalThis.document;
    if (savedNavigator) Object.defineProperty(globalThis, 'navigator', savedNavigator); else delete globalThis.navigator;
    await server.close();
  }
});

test('a fixed book sends the shared cast and preceding script to page two', async () => {
  const pageBriefs = [];
  const events = [];
  const request = input.parse({ brief: '受け付けの実例。この応答で前後2ページを一度に出力する。', book: { mode: 'fixed', pagePanelCounts: [4, 6] } });
  const result = await generateMangaBook({ brief: request.brief, ...request.book }, {
    signal: new AbortController().signal,
    planBook: async prompt => {
      assert.match(prompt, /厳密に2ページ/);
      assert.match(prompt, /受け付けの実例/);
      return plan(4, 6);
    },
    generatePage: async brief => {
      pageBriefs.push(brief);
      const first = pageBriefs.length === 1;
      return { scenario: scenarioFixture({ count: first ? 4 : 6 }), characters: `## 1. 係員\n${first ? '緑の作業着' : '別の作業着'}` };
    },
    onProgress: event => events.push(event.stage),
  });
  assert.equal(output.safeParse(result).success, true);
  assert.deepEqual(result.book.pages.map(page => [page.pageNumber, page.panelCount]), [[1, 4], [2, 6]]);
  assert.ok(pageBriefs.every(brief => !brief.includes('前後2ページを一度に出力する')));
  assert.ok(pageBriefs.every(brief => brief.includes('Scenario: は1つだけ')));
  assert.match(pageBriefs[1], /直前ページの最後のコマ/);
  assert.doesNotMatch(pageBriefs[1], /\[[1-4]コマ目\]/);
  assert.match(pageBriefs[1], /返却札/);
  assert.match(pageBriefs[1], /緑の作業着/);
  assert.equal(result.characters, '## 1. 係員\n緑の作業着');
  assert.deepEqual(events, ['plan', 'page', 'complete-page', 'page', 'complete-page']);
});

test('auto uses the planned length and fixed mode rejects a changed plan before drafting', async () => {
  let draftCalls = 0;
  const options = {
    signal: new AbortController().signal,
    planBook: async () => plan(4, 4, 4),
    generatePage: async () => {
      draftCalls++;
      return { scenario: scenarioFixture() };
    },
  };
  await assert.rejects(generateMangaBook({ brief: '題材', mode: 'fixed', pagePanelCounts: [4, 4] }, options), /指定と一致しません/);
  assert.equal(draftCalls, 0);
  const auto = await generateMangaBook({ brief: '題材', mode: 'auto' }, options);
  assert.equal(auto.book.pages.length, 3);
  assert.equal(draftCalls, 3);
  assert.deepEqual(mangaBookFixedCounts('4、 8'), [4, 8]);
  assert.throws(() => mangaBookFixedCounts('4, 9'), /4〜8コマ/);
  assert.equal(input.safeParse({ brief: '従来の1ページ' }).success, true);
  assert.equal(input.safeParse({ brief: '題材', book: { mode: 'fixed', pagePanelCounts: [4] } }).success, false);
});

test('wrong page format fails and cancellation prevents launching the following page', async () => {
  const params = { brief: '題材', mode: 'fixed', pagePanelCounts: [4, 4] };
  await assert.rejects(generateMangaBook(params, {
    signal: new AbortController().signal,
    planBook: async () => plan(4, 4),
    generatePage: async () => ({ scenario: scenarioFixture({ count: 5 }) }),
  }), /本文1P.*一致しません/);

  const controller = new AbortController();
  let draftCalls = 0;
  await assert.rejects(generateMangaBook(params, {
    signal: controller.signal,
    planBook: async () => plan(4, 4),
    generatePage: async () => {
      draftCalls++;
      return { scenario: scenarioFixture() };
    },
    onProgress: event => { if (event.stage === 'complete-page') controller.abort(); },
  }), { name: 'AbortError' });
  assert.equal(draftCalls, 1);
});
