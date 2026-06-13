import { defineConfig } from 'vite';

function removeDivById(html, id) {
  const emptyPlaceholder = `<div id="${id}" class="long-novel-panel hidden" aria-hidden="true"></div>`;
  const marker = `id="${id}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return html;

  const start = html.lastIndexOf('<div', markerIndex);
  if (start < 0) return html;

  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tagPattern.exec(html))) {
    const tag = match[0];
    depth += tag.startsWith('</') ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, start) + emptyPlaceholder + html.slice(tagPattern.lastIndex);
    }
  }

  return html;
}

function stripDormantLongNovelPanel() {
  return {
    name: 'story-maker-strip-dormant-long-novel-panel',
    apply: 'build',
    transformIndexHtml(html) {
      if (process.env.VITE_ENABLE_LONG_NOVEL_DEV === '1') return html;
      return removeDivById(html, 'long-novel-panel');
    }
  };
}

function injectLongNovelDevEntry() {
  const snippet = '<script type="module" src="/src/longNovel/devEntry.js"></script>';

  return {
    name: 'story-maker-long-novel-dev-entry',
    apply: 'serve',
    transformIndexHtml(html) {
      return html.includes('/src/longNovel/devEntry.js')
        ? html
        : html.replace('</body>', `${snippet}\n</body>`);
    }
  };
}

function publicAssetGuard() {
  const blockedSignatures = [
    ['q', 'a', 'A', 'p', 'i', 'S', 'e', 's', 's', 'i', 'o', 'n'].join(''),
    ['Q', 'A', ' ', 'A', 'P', 'I', ' ', 'k', 'e', 'e', 'p'].join(''),
    ['_', '_', 's', 'm', '_', 'q', 'a', '_', 'a', 'p', 'i', '_', 't', 'e', 's', 't'].join(''),
    ['s', 't', 'o', 'r', 'y', 'M', 'a', 'k', 'e', 'r', 'K', 'e', 'y', 'D', 'i', 'a', 'g', 'n', 'o', 's', 't', 'i', 'c'].join(''),
    ['s', 't', 'o', 'r', 'y', 'M', 'a', 'k', 'e', 'r', 'L', 'o', 'n', 'g', 'N', 'o', 'v', 'e', 'l', 'S', 'e', 'a', 'l', 'e', 'd', 'V', '4', '9', '4'].join(''),
    ['s', 't', 'o', 'r', 'y', 'M', 'a', 'k', 'e', 'r', 'V', '4', '9', '6', 'D', 'i', 'a', 'g', 'n', 'o', 's', 't', 'i', 'c', 's'].join(''),
    ['s', 't', 'o', 'r', 'y', 'M', 'a', 'k', 'e', 'r', 'F', 'o', 'r', 'm', 'a', 't', 'P', 'a', 'r', 'a', 'g', 'r', 'a', 'p', 'h', 's', 'V', '4', '9', '6'].join(''),
    ['s', 't', 'o', 'r', 'y', 'M', 'a', 'k', 'e', 'r', 'A', 'p', 'p', 'l', 'y', 'R', 'a', 'n', 'd', 'o', 'm', 'O', 'u', 't', 'p', 'u', 't', 'M', 'o', 'd', 'e', 'V', '4', '9', '6'].join(''),
    ['l', 'o', 'c', 'a', 'l', 'S', 't', 'o', 'r', 'a', 'g', 'e'].join(''),
    ['s', 'e', 's', 's', 'i', 'o', 'n', 'S', 't', 'o', 'r', 'a', 'g', 'e'].join('')
  ];

  return {
    name: 'story-maker-public-asset-guard',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'chunk') continue;
        const matches = blockedSignatures.filter(signature => asset.code.includes(signature));
        if (matches.length) {
          this.error(`Public build contains blocked internal-only asset signatures in ${asset.fileName}.`);
        }
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [injectLongNovelDevEntry(), stripDormantLongNovelPanel(), publicAssetGuard()],
  server: {
    port: 5179,
    strictPort: true,
    open: true
  }
});
