import { buildStoryExportFileName, downloadBlobWithFileName } from './fileIoHelpers.js';
import {
  buildGenerationSettingsExport,
  parseGenerationSettingsExport,
} from './settingsSnapshotHelpers.js';

const AXIS_CONFIGS = [
  { key: 'theme', categoryId: 'theme-cat-chips', detailId: 'theme-sub-chips', customId: 'theme-custom' },
  { key: 'genre', categoryId: 'genre-cat-chips', detailId: 'genre-sub-chips', customId: 'genre-custom' },
  { key: 'worldview', categoryId: 'worldview-cat-chips', detailId: 'worldview-sub-chips', customId: 'worldview-custom' },
  { key: 'target', categoryId: 'target-cat-chips', detailId: 'target-sub-chips', customId: 'target-custom' },
  { key: 'era', categoryId: 'era-cat-chips', detailId: 'era-sub-chips', customId: 'era-custom' },
  { key: 'ending', categoryId: 'ending-cat-chips', detailId: 'ending-sub-chips', customId: 'ending-custom' },
  { key: 'narr', categoryId: 'narr-cat-chips', detailId: 'narr-sub-chips', customId: 'narr-custom' },
];

const LOCK_SECTIONS = [
  'mode',
  'theme',
  'chars',
  'genre',
  'worldview',
  'target',
  'era',
  'ending',
  'narr',
  'supplement',
  'universal',
];

function byId(id) {
  return document.getElementById(id);
}

function normalizeText(value) {
  return String(value || '').trim();
}

function dispatchInput(element) {
  if (!element) return;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

function fireClick(element) {
  element?.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  }));
}

function findByDataset(selector, key, value) {
  return [...document.querySelectorAll(selector)]
    .find(element => String(element.dataset?.[key] || '') === String(value || ''));
}

function getActiveModeValue() {
  return normalizeText(document.querySelector('#mode-chips button.active')?.dataset?.v);
}

function getVersionText() {
  return normalizeText(document.querySelector('.app-version, .title-version')?.textContent)
    || normalizeText(document.body?.textContent?.match(/v\d+\.\d+\.\d+/)?.[0]);
}

function getAxisState(config) {
  const category = normalizeText(document.querySelector(`#${config.categoryId} .chip.active`)?.dataset?.cat);
  const value = normalizeText(document.querySelector(`#${config.detailId} .chip.active`)?.dataset?.v);
  const customValue = normalizeText(byId(config.customId)?.value);
  const source = value
    ? 'selectedDetail'
    : customValue
      ? 'manual'
      : category
        ? 'selectedCategory'
        : '';
  return { category, value, customValue, source };
}

function collectCharacters() {
  return [...document.querySelectorAll('#char-list .char-card')].map(card => {
    const selectValue = key => normalizeText(card.querySelector(`.char-sel[data-key="${key}"]`)?.value);
    return {
      name: normalizeText(card.querySelector('.char-name-input')?.value),
      sex: selectValue('sex'),
      role: selectValue('role'),
      personality: selectValue('personality'),
      note: normalizeText(card.querySelector('.char-memo')?.value),
    };
  }).filter(character => (
    character.name
    || character.sex
    || character.role
    || character.personality
    || character.note
  ));
}

function collectUniversalAssets() {
  return [...document.querySelectorAll('#ui-asset-list .ui-asset-card')].map((card, index) => ({
    type: 'text',
    name: normalizeText(card.querySelector('.ui-asset-title')?.textContent) || `Asset ${index + 1}`,
    content: normalizeText(card.querySelector('.ui-asset-detail')?.textContent),
    locked: card.classList.contains('is-locked'),
  })).filter(asset => asset.name || asset.content);
}

function collectLockedSections() {
  return Object.fromEntries(LOCK_SECTIONS.map(section => {
    const sectionEl = byId(`section-${section}`) || (section === 'universal' ? byId('section-universal-intake') : null);
    return [section, Boolean(sectionEl?.classList.contains('is-locked'))];
  }));
}

function buildCurrentSettingsExport() {
  const axesDetailed = Object.fromEntries(AXIS_CONFIGS.map(config => [config.key, getAxisState(config)]));
  const state = {
    mode: getActiveModeValue(),
    modeSource: 'screen',
    characters: collectCharacters(),
    locked: collectLockedSections(),
    universalAssets: collectUniversalAssets(),
  };
  return buildGenerationSettingsExport(state, {
    version: getVersionText(),
    modeCustom: normalizeText(byId('mode-custom')?.value),
    supplement: normalizeText(byId('supplement')?.value),
    axesDetailed,
  });
}

function exportGenerationSettings() {
  const payload = buildCurrentSettingsExport();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  downloadBlobWithFileName(blob, buildStoryExportFileName('GenerationSettings', 'json'));
}

function unlockAllSectionsForImport() {
  for (const section of LOCK_SECTIONS) {
    const sectionEl = byId(`section-${section}`) || (section === 'universal' ? byId('section-universal-intake') : null);
    if (!sectionEl?.classList.contains('is-locked')) continue;
    fireClick(document.querySelector(`.btn-lock[data-section="${section}"]`));
  }
}

function restoreLocks(locked = {}) {
  for (const section of LOCK_SECTIONS) {
    const shouldLock = Boolean(locked[section]);
    const sectionEl = byId(`section-${section}`) || (section === 'universal' ? byId('section-universal-intake') : null);
    const isLocked = Boolean(sectionEl?.classList.contains('is-locked'));
    if (shouldLock !== isLocked) {
      fireClick(document.querySelector(`.btn-lock[data-section="${section}"]`));
    }
  }
}

function clearSection(section) {
  const button = document.querySelector(`.btn-section-clear[data-section="${section}"]`);
  fireClick(button);
}

function applyMode(settings) {
  const mode = normalizeText(settings.mode);
  const modeButton = mode ? findByDataset('#mode-chips button[data-v]', 'v', mode) : null;
  if (mode) {
    fireClick(modeButton);
  }
  const input = byId('mode-custom');
  if (input) {
    const custom = normalizeText(settings.modeCustom);
    input.value = custom;
    if (!modeButton || settings.modeSource === 'manual') {
      dispatchInput(input);
    }
  }
}

function applyAxis(config, axis = {}) {
  clearSection(config.key);
  if (axis.category) {
    fireClick(findByDataset(`#${config.categoryId} .chip`, 'cat', axis.category));
  }
  if (axis.value) {
    fireClick(findByDataset(`#${config.detailId} .chip`, 'v', axis.value));
  }
  const custom = normalizeText(axis.customValue);
  if (custom) {
    const input = byId(config.customId);
    if (input) {
      input.value = custom;
      if (axis.source === 'manual' || (!axis.category && !axis.value)) {
        dispatchInput(input);
      }
    }
  }
}

function applyCharacters(characters = []) {
  clearSection('chars');
  document.dispatchEvent(new CustomEvent('story-maker:apply-imported-characters', {
    detail: { characters },
  }));
}

function applySupplement(value) {
  const input = byId('supplement');
  if (!input) return;
  input.value = normalizeText(value);
  dispatchInput(input);
}

function clearUniversalAssets() {
  fireClick(byId('btn-clear-universal-intake'));
}

function assetToText(asset) {
  return [
    asset.name || asset.title || asset.value || 'Imported asset',
    asset.content || asset.analysis || asset.value || '',
  ].filter(Boolean).join('\n\n');
}

async function applyUniversalAssets(assets = []) {
  clearUniversalAssets();
  const input = byId('ui-text-input');
  const addButton = byId('ui-btn-add');
  if (!input || !addButton) return;
  for (const asset of assets) {
    const text = assetToText(asset);
    if (!text) continue;
    input.value = text;
    dispatchInput(input);
    fireClick(addButton);
    await new Promise(resolve => setTimeout(resolve, 20));
  }
}

async function applyGenerationSettings(payload) {
  const settings = payload.settings || {};
  if (byId('settings')?.classList.contains('generating')) {
    alert('Generation is running. Import after it finishes.');
    return;
  }
  unlockAllSectionsForImport();
  applyMode(settings);
  for (const config of AXIS_CONFIGS) {
    applyAxis(config, settings.axes?.[config.key] || {});
  }
  applyCharacters(settings.characters || []);
  applySupplement(settings.supplement || '');
  await applyUniversalAssets(settings.universalAssets || []);
  restoreLocks(settings.locked || {});
  window.dispatchEvent(new CustomEvent('story-maker:settings-imported'));
  alert('Generation settings imported.');
}

function importGenerationSettingsFromFile(file) {
  if (!file) return;
  file.text()
    .then(text => applyGenerationSettings(parseGenerationSettingsExport(text)))
    .catch(error => {
      console.error(error);
      alert(`Generation settings import failed: ${error.message || error}`);
    });
}

function sanitize4KomaScenarioText(text) {
  return String(text || '')
    .replace(/^【?(Topic|Logline|Location|Outfit|Punchline|Scenario):?\s*(.*?)】?$/gim, (_, key, value) => (
      `${key.charAt(0).toUpperCase()}${key.slice(1).toLowerCase()}: ${value.trim()}`
    ))
    .replace(/^\*\*?(Topic|Logline|Location|Outfit|Punchline|Scenario):\*\*?\s*(.*?)$/gim, (_, key, value) => (
      `${key.charAt(0).toUpperCase()}${key.slice(1).toLowerCase()}: ${value.trim()}`
    ));
}

function installOutputTxtSaveNameOverride() {
  const button = byId('btn-download');
  if (!button) return;
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const mode = getActiveModeValue();
    let text = byId('output')?.textContent || '';
    if (mode === '4koma_scenario') {
      text = sanitize4KomaScenarioText(text);
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    downloadBlobWithFileName(blob, buildStoryExportFileName('Output', 'txt'));
  }, true);
}

function installGenerationSettingsIo() {
  byId('btn-settings-export')?.addEventListener('click', exportGenerationSettings);
  byId('btn-settings-import')?.addEventListener('click', () => byId('settings-import-file')?.click());
  byId('settings-import-file')?.addEventListener('change', event => {
    const file = event.target?.files?.[0];
    importGenerationSettingsFromFile(file);
    event.target.value = '';
  });
  installOutputTxtSaveNameOverride();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installGenerationSettingsIo);
} else {
  installGenerationSettingsIo();
}
