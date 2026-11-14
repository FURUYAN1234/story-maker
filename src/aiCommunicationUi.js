import { beginAiCommunication, getAiCommunicationState, stopAiCommunication, subscribeAiCommunication } from './aiCommunication.js';

// This control lives outside settings/analysis regions disabled by their owners.
// Those owners keep responsibility for restoring their own controls in finally.
export function installAiCommunicationUi(doc = globalThis.document) {
  const button = doc?.getElementById?.('btn-ai-disconnect');
  const status = doc?.getElementById?.('ai-disconnect-status');
  if (!button) return () => {};
  const render = ({active, stopped}) => {
    button.disabled = active === 0 || stopped;
    button.textContent = stopped ? '⏹ 緊急停止済み（AI通信を中断）' : '⏹ 緊急停止（AI通信を切断）';
    if (status) status.textContent = stopped
      ? '通信と後続の自動処理を中断しました。再実行は各実行ボタンから行えます。'
      : active ? 'AI通信中：思考待ち・受信中でも中断できます。' : '';
  };
  const stop = () => {
    // Stop longify's own workflow/auto-chain as well as its current request.
    const longifyStop = doc.getElementById('btn-longify-stop');
    if (longifyStop && !longifyStop.disabled) longifyStop.click();
    stopAiCommunication();
  };
  const restart = event => {
    if (['drop','paste'].includes(event.type)) {
      const input = event.target?.closest?.('#ci-dropzone, #ui-dropzone, #output, #output-panel');
      if (input && !input.closest?.('.generating') && !getAiCommunicationState().active) beginAiCommunication();
      return;
    }
    const control = event.target?.closest?.('button, input[type="file"]');
    if (!control || control.disabled || getAiCommunicationState().active) return;
    if (/^(btn-generate|btn-sa-analyze|btn-sa-reflect|btn-today-news|btn-longify-beta|nano-retry-characters|key-save|ci-file-input|ui-file-input|sa-file-input|output-import-file|btn-output-paste)$/.test(control.id)) {
      beginAiCommunication();
    }
  };
  button.addEventListener('click', stop);
  doc.addEventListener('click', restart, true);
  doc.addEventListener('change', restart, true);
  doc.addEventListener('drop', restart, true);
  doc.addEventListener('paste', restart, true);
  const unsubscribe = subscribeAiCommunication(render);
  render(getAiCommunicationState());
  return () => { unsubscribe(); button.removeEventListener('click',stop); for (const type of ['click','change','drop','paste']) doc.removeEventListener(type,restart,true); };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => installAiCommunicationUi(), {once:true});
  else installAiCommunicationUi();
}
