// Runtime compatibility shim for browsers without rel="modulepreload" support.
// Kept outside legacyMain so the legacy core does not carry repeated Vite boilerplate.

function getFetchOptions(link) {
  const options = {};
  if (link.integrity) options.integrity = link.integrity;
  if (link.referrerPolicy) options.referrerPolicy = link.referrerPolicy;
  if (link.crossOrigin === 'use-credentials') {
    options.credentials = 'include';
  } else if (link.crossOrigin === 'anonymous') {
    options.credentials = 'omit';
  } else {
    options.credentials = 'same-origin';
  }
  return options;
}

function preload(link) {
  if (link.ep) return;
  link.ep = true;
  fetch(link.href, getFetchOptions(link));
}

export function installModulePreloadPolyfill() {
  const relList = document.createElement('link').relList;
  if (relList && relList.supports && relList.supports('modulepreload')) return;

  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    preload(link);
  }

  new MutationObserver(records => {
    for (const record of records) {
      if (record.type !== 'childList') continue;
      for (const node of record.addedNodes) {
        if (node.tagName === 'LINK' && node.rel === 'modulepreload') preload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
}

installModulePreloadPolyfill();
