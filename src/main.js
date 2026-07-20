// Story Maker runtime entrypoint.
// Keep side-effect modules in this order:
// 1. modulePreloadPolyfill owns the former repeated Vite preload boilerplate.
// 2. qualityBoost augments generation contracts before legacy UI boot.
// 3. legacyMain owns the existing UI and generation flow.
// 4. publicRuntime seals public-only behavior after the UI is present.
// 5. generationSettingsIo owns settings import/export and unified save names.

import './modulePreloadPolyfill.js';
import './privacyGuards.js';
import './qualityBoost.js';
import './legacyMain.js';
import './directLong10000Runtime.js';
import './publicRuntime.js';
import './generationSettingsIo.js';
