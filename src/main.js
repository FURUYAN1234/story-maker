// Story Maker runtime entrypoint.
// Keep side-effect modules in this order:
// 1. qualityBoost augments generation contracts before legacy UI boot.
// 2. legacyMain owns the existing UI and generation flow.
// 3. publicRuntime seals public-only behavior after the UI is present.

import './qualityBoost.js';
import './legacyMain.js';
import './publicRuntime.js';
