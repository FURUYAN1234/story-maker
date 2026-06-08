import { defineConfig } from 'vite';

function stripStoryMakerPublicQa() {
  const replacements = [
    {
      label: 'v1 qa api session helper',
      pattern: /const jo="story-maker\.qaApiSession\.v1";[\s\S]*?document\.addEventListener\("DOMContentLoaded",oa\);/,
      replacement: 'document.addEventListener("DOMContentLoaded",oa);'
    },
    {
      label: 'v2 qa localStorage helper',
      pattern: /const da="story-maker\.qaApiSession\.v2";[\s\S]*?function Dh\(/,
      replacement: 'function Dh('
    },
    {
      label: 'qa restore wrapper',
      pattern: /function ze\(\)[\s\S]*?const ts=typeof tt=="function"\?tt:null;ts&&\(tt=function\(\)\{ts\(\),ze\(\)&&\(s\.apiKey\|\|s\.geminiKey\|\|s\.openaiKey\)&&\(s\.qaApiSessionEnabled=!0,je\(\),ue\(\)\)\}\);/,
      replacement: ''
    },
    {
      label: 'qa unload persistence wrapper',
      pattern: /function et\(\)[\s\S]*?typeof window<"u"&&\(window\.addEventListener\("pagehide",et\),window\.addEventListener\("beforeunload",et\),document\.addEventListener\("visibilitychange",\(\)=>\{document\.visibilityState==="hidden"&&et\(\)\}\)\);/,
      replacement: ''
    },
    {
      label: 'qa auto restore wrapper',
      pattern: /function Xh\(\)[\s\S]*?const \$s=typeof ue=="function"\?ue:null;\$s&&\(ue=function\(\)\{\$s\(\);const e=h\("qa-api-session-keep"\),t=h\("qa-api-session-clear"\),n=h\("qa-api-session-status"\);Xt\(\)&&\(e&&\(e\.checked=!!s\.qaApiSessionEnabled\),t&&\(t\.disabled=!yd\(\)\),n&&\(n\.textContent=s\.qaApiSessionEnabled\?s\.apiKey\?"QA keep AUTO ON: saved keys restore after browser restart, even if the local QA URL is reopened without the flag":"QA keep AUTO ON: save Gemini\/OpenAI once to restore":"QA keep ready: key save will turn it on automatically"\)\)\}\);/,
      replacement: ''
    },
    {
      label: 'key diagnostic global',
      pattern: /typeof window<"u"&&\(window\.storyMakerKeyDiagnostic=\(\)=>Du\(s\.apiKey,s\.apiProvider\)\);/,
      replacement: ''
    },
    {
      label: 'long-novel seal diagnostic global',
      pattern: /typeof window<"u"&&\(window\.storyMakerLongNovelSealedV494=\(\)=>\(\{[\s\S]*?\}\)\);document\.readyState/,
      replacement: 'document.readyState'
    },
    {
      label: 'v4.9.6 diagnostic global',
      pattern: /typeof window < "u" && \(window\.storyMakerV496Diagnostics = \(\) => \(\{[\s\S]*?\}\)\);\s*/,
      replacement: ''
    },
    {
      label: 'v4.9.6 paragraph helper global',
      pattern: /typeof window < "u" && \(window\.storyMakerFormatParagraphsV496 = \(e, t="medium"\) => smFormatParagraphsV496\(e, \{ mode: t \}\)\);\s*/,
      replacement: ''
    },
    {
      label: 'v4.9.6 random-mode helper global',
      pattern: /typeof window < "u" && \(window\.storyMakerApplyRandomOutputModeV496 = smApplyRandomOutputModeV496\);\s*/,
      replacement: ''
    }
  ];

  const forbiddenPublicChunkPatterns = [
    /qaApiSession/,
    /QA API keep/,
    /__sm_qa_api_test/,
    /storyMakerKeyDiagnostic/,
    /storyMakerLongNovelSealedV494/,
    /storyMakerV496Diagnostics/,
    /storyMakerFormatParagraphsV496/,
    /storyMakerApplyRandomOutputModeV496/,
    /\blocalStorage\b/,
    /\bsessionStorage\b/
  ];

  return {
    name: 'strip-story-maker-public-qa',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!id.replace(/\\/g, '/').endsWith('/src/main.js')) return null;
      let output = code;
      for (const item of replacements) {
        const next = output.replace(item.pattern, item.replacement);
        if (next === output) {
          this.warn(`public QA strip pattern did not match: ${item.label}`);
        }
        output = next;
      }
      return { code: output, map: null };
    },
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'chunk') continue;
        const matches = forbiddenPublicChunkPatterns
          .filter(pattern => pattern.test(asset.code))
          .map(pattern => pattern.source);
        if (matches.length) {
          this.error(`Public build still contains development/API-persistence code in ${asset.fileName}: ${matches.join(', ')}`);
        }
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [stripStoryMakerPublicQa()],
  server: {
    port: 5179,
    strictPort: true,
    open: true
  }
});
