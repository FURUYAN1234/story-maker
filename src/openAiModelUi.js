import {
  DEFAULT_OPENAI_MODEL_ID,
  OPENAI_MODEL_OPTIONS,
  OPENAI_MODEL_PRICE_SNAPSHOT_DATE,
  formatOpenAIModelPrice,
  getOpenAIModelOption,
  getSelectedOpenAIModelId,
  setSelectedOpenAIModelId,
} from './openAiModelCatalog.js';

function isOpenAIProviderLabel(value) {
  return /(?:chatgpt|openai)/i.test(String(value || ''));
}

function isOpenAIProviderState(label, switchClass = '', switchTitle = '') {
  return isOpenAIProviderLabel(label)
    || /(?:^|\s)openai-mode(?:\s|$)/i.test(String(switchClass))
    || /現在:\s*(?:chatgpt|openai)/i.test(String(switchTitle));
}

function buildOpenAIModelSelectorMarkup() {
  const selected = getOpenAIModelOption(DEFAULT_OPENAI_MODEL_ID);
  const options = OPENAI_MODEL_OPTIONS.map(model => (
    `<option value="${model.id}">${model.label}（${model.description}）</option>`
  )).join('');

  return `
    <section class="openai-model-card" id="openai-model-card" aria-labelledby="openai-model-label" hidden>
      <div class="openai-model-control">
        <label id="openai-model-label" for="openai-model-select">🧠 OpenAI思考モデル</label>
        <select id="openai-model-select" aria-describedby="openai-model-description openai-model-price openai-model-caveat">${options}</select>
      </div>
      <div class="openai-model-details">
        <div id="openai-model-description" class="openai-model-description">${selected.description}</div>
        <div id="openai-model-price" class="openai-model-price">${formatOpenAIModelPrice(selected)} <span>（${OPENAI_MODEL_PRICE_SNAPSHOT_DATE}時点）</span></div>
        <div id="openai-model-caveat" class="openai-model-caveat">標準・短文コンテキストの目安。キャッシュ、長文コンテキスト、Fast・地域処理、ツール、税は別料金です。</div>
        <div class="openai-model-route-status" aria-live="polite">
          <span>選択 <b data-model-status="selected">${selected.label}</b></span>
          <span>試行 <b data-model-status="attempted">—</b></span>
          <span>採用 <b data-model-status="adopted">—</b></span>
        </div>
      </div>
    </section>`;
}

function installOpenAIModelSelector(runtime = globalThis) {
  const documentRef = runtime?.document;
  if (!documentRef || documentRef.getElementById('openai-model-card')) return;
  const bannerRow = documentRef.querySelector('.banner-row');
  if (!bannerRow) return;

  bannerRow.insertAdjacentHTML('afterend', buildOpenAIModelSelectorMarkup());
  const card = documentRef.getElementById('openai-model-card');
  const select = documentRef.getElementById('openai-model-select');
  const engineLabel = documentRef.getElementById('engine-label');
  const switchButton = documentRef.getElementById('btn-switch-api');
  const description = documentRef.getElementById('openai-model-description');
  const price = documentRef.getElementById('openai-model-price');
  const selectedStatus = card.querySelector('[data-model-status="selected"]');
  const attemptedStatus = card.querySelector('[data-model-status="attempted"]');
  const adoptedStatus = card.querySelector('[data-model-status="adopted"]');

  function renderSelection(modelId) {
    const model = getOpenAIModelOption(modelId);
    select.value = model.id;
    description.textContent = model.description;
    price.textContent = `${formatOpenAIModelPrice(model)} （${OPENAI_MODEL_PRICE_SNAPSHOT_DATE}時点）`;
    selectedStatus.textContent = model.label;
    attemptedStatus.textContent = '—';
    adoptedStatus.textContent = '—';
  }

  function renderVisibility() {
    card.hidden = !isOpenAIProviderState(
      engineLabel?.textContent,
      switchButton?.className,
      switchButton?.title
    );
  }

  function renderDisabledState() {
    const busy = Boolean(
      documentRef.querySelector('#settings.generating, .settings-panel.generating, #longify-beta.is-busy, #sa-section.generating')
    );
    select.disabled = busy;
    card.classList.toggle('is-busy', busy);
  }

  select.addEventListener('change', () => {
    renderSelection(setSelectedOpenAIModelId(select.value));
  });

  runtime.addEventListener?.('story-maker:openai-model-route', event => {
    const model = getOpenAIModelOption(event?.detail?.modelId);
    if (event?.detail?.phase === 'trying') attemptedStatus.textContent = model.label;
    if (event?.detail?.phase === 'adopted') adoptedStatus.textContent = model.label;
  });

  const observer = new MutationObserver(() => {
    renderVisibility();
    renderDisabledState();
  });
  if (engineLabel) observer.observe(engineLabel, { childList: true, subtree: true, characterData: true });
  if (switchButton) observer.observe(switchButton, { attributes: true, attributeFilter: ['class', 'title'] });
  for (const element of documentRef.querySelectorAll('#settings, .settings-panel, #longify-beta, #sa-section')) {
    observer.observe(element, { attributes: true, attributeFilter: ['class'] });
  }

  setSelectedOpenAIModelId(DEFAULT_OPENAI_MODEL_ID);
  renderSelection(getSelectedOpenAIModelId());
  renderVisibility();
  renderDisabledState();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => installOpenAIModelSelector(globalThis), { once: true });
  } else {
    installOpenAIModelSelector(globalThis);
  }
}

export {
  buildOpenAIModelSelectorMarkup,
  installOpenAIModelSelector,
  isOpenAIProviderLabel,
  isOpenAIProviderState,
};
