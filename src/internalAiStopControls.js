// Keep inline controller buttons available to existing programmatic stop handlers.
// The upper-right emergency control is the only visible stop action.
export function setInternalAiStopState(button, running) {
  if (!button) return;
  button.hidden = true;
  button.classList.add('hidden');
  button.disabled = !running;
}
