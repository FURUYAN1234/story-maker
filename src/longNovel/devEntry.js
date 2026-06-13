import { installLongNovelDevPanel } from './devPanel.js';

const params = new URLSearchParams(location.search);
const isLocal = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);

if (isLocal && params.has('longdev')) {
  const install = () => {
    document.documentElement.dataset.longNovelDev = 'active';
    installLongNovelDevPanel();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
}
