import assert from 'node:assert/strict';
import { MODE_LABELS, PUBLIC_MODE_VALUES } from '../src/modeContracts.js';
import {
  STANDARD_TYPEWRITER_CURSOR_CLASS,
  getStandardTypewriterText,
  installStandardTypewriterCursor,
  renderStandardTypewriterOutput,
  shouldShowStandardTypewriterCursor,
} from '../src/standardTypewriterRenderer.js';

function createFakeElement() {
  const element = {
    children: [],
    childNodes: [],
    classList: {
      values: new Set(),
      contains(value) {
        return this.values.has(value);
      },
      add(value) {
        this.values.add(value);
      },
    },
    dataset: {},
    style: {},
    offsetHeight: 20,
    offsetTop: 0,
    replaceCount: 0,
    scrollHeight: 0,
    scrollTop: 0,
    textContent: '',
    ownerDocument: {
      getElementById() {
        return null;
      },
      createTextNode(value) {
        return { nodeType: 3, textContent: String(value) };
      },
      createElement(tagName) {
        return {
          tagName: String(tagName).toUpperCase(),
          className: '',
          textContent: '',
          attributes: {},
          setAttribute(name, value) {
            this.attributes[name] = String(value);
          },
          remove() {},
        };
      },
    },
    querySelector(selector) {
      if (selector !== `.${STANDARD_TYPEWRITER_CURSOR_CLASS}`) return null;
      return this.children.find(node => node.className === STANDARD_TYPEWRITER_CURSOR_CLASS) || null;
    },
    querySelectorAll(selector) {
      if (selector !== `.${STANDARD_TYPEWRITER_CURSOR_CLASS}`) return [];
      return this.children.filter(node => node.className === STANDARD_TYPEWRITER_CURSOR_CLASS);
    },
    replaceChildren(...nodes) {
      this.replaceCount += 1;
      this.children = nodes;
      this.childNodes = nodes;
      this.textContent = nodes.map(node => node.textContent || '').join('');
      this.scrollHeight = this.textContent.length;
    },
  };
  return element;
}

const output = createFakeElement();
const rendered = renderStandardTypewriterOutput(output, '一行目\n二行目', { showCursor: true });

assert.deepEqual(rendered, { text: '一行目\n二行目', cursor: true });
assert.equal(output.textContent, '一行目\n二行目');
assert.equal(output.children.length, 2);
assert.equal(output.children[1].className, STANDARD_TYPEWRITER_CURSOR_CLASS);
assert.equal(output.children[1].attributes['aria-hidden'], 'true');
assert.equal(output.dataset.standardTypewriterRendering, 'true');
assert.equal(getStandardTypewriterText(output), '一行目\n二行目');

renderStandardTypewriterOutput(output, '完成本文', { showCursor: false });
assert.equal(output.textContent, '完成本文');
assert.equal(output.children.length, 1);
assert.equal(output.dataset.standardTypewriterRendering, undefined);

const fallbackOutput = { textContent: '', dataset: {} };
renderStandardTypewriterOutput(fallbackOutput, 'fallback', { showCursor: true });
assert.equal(fallbackOutput.textContent, 'fallback');
assert.equal(fallbackOutput.dataset.standardTypewriterRendering, undefined);

const generateButton = { disabled: true };
const longNovelPanel = createFakeElement();
const standardOutput = createFakeElement();
standardOutput.classList.add('output-box');
standardOutput.textContent = 'ライブ表示中の本文';

assert.equal(shouldShowStandardTypewriterCursor({
  outputEl: standardOutput,
  generateButton,
  longNovelPanel,
  text: standardOutput.textContent,
}), true);

standardOutput.dataset.longifyRendering = 'true';
assert.equal(shouldShowStandardTypewriterCursor({
  outputEl: standardOutput,
  generateButton,
  longNovelPanel,
  text: standardOutput.textContent,
}), false);
delete standardOutput.dataset.longifyRendering;

const installOutput = createFakeElement();
installOutput.textContent = 'ショート本文の末尾';
const handle = installStandardTypewriterCursor({
  outputEl: installOutput,
  outputPanel: createFakeElement(),
  generateButton,
  longNovelPanel,
  observerFactory: null,
  scheduleFrame: callback => callback(),
});

assert.equal(handle.installed, true);
assert.equal(installOutput.textContent, 'ショート本文の末尾');
assert.equal(installOutput.children.length, 2);
assert.equal(installOutput.children[1].className, STANDARD_TYPEWRITER_CURSOR_CLASS);
const renderedReplaceCount = installOutput.replaceCount;
handle.sync();
assert.equal(
  installOutput.replaceCount,
  renderedReplaceCount,
  'already-rendered standard cursor does not redraw itself',
);

assert.equal(PUBLIC_MODE_VALUES.length, 15);
for (const mode of PUBLIC_MODE_VALUES) {
  const modeOutput = createFakeElement();
  modeOutput.classList.add('output-box');
  modeOutput.textContent = `${mode}: ${MODE_LABELS[mode]} live text`;
  const modeHandle = installStandardTypewriterCursor({
    outputEl: modeOutput,
    outputPanel: createFakeElement(),
    generateButton,
    longNovelPanel,
    observerFactory: null,
    scheduleFrame: callback => callback(),
  });

  assert.equal(modeHandle.installed, true, `${mode} installs typewriter cursor`);
  assert.equal(modeOutput.querySelectorAll(`.${STANDARD_TYPEWRITER_CURSOR_CLASS}`).length, 1, `${mode} has one cursor`);
  assert.equal(getStandardTypewriterText(modeOutput), `${mode}: ${MODE_LABELS[mode]} live text`, `${mode} keeps text clean`);
}

console.log('standardTypewriterRenderer tests passed');
