// Version footer helpers shared by the legacy runtime.
// Short aliases preserve existing legacyMain call sites during the split.

import { STORY_MAKER_FOOTER } from './version.js';

const GENERATED_FOOTER_PATTERN = /\n*\s*(?:Generated|Created)\s+(?:by\s+Super\s+FURU\s+AI\s+Story\s+v|By\s+AI\s+Story\s+Maker\s+V)[0-9]+(?:\.[0-9]+)*\.?\s*$/i;

export function footerText() {
  return STORY_MAKER_FOOTER;
}

export function stripGeneratedFooter(value) {
  return String(value || '').replace(GENERATED_FOOTER_PATTERN, '').trimEnd();
}

export function withStoryMakerFooter(value) {
  return `${stripGeneratedFooter(value).trimEnd()}\n\n${footerText()}`.trim();
}

export { footerText as zf, stripGeneratedFooter as jt, withStoryMakerFooter as Lr };
