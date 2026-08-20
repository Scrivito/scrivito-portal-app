import { onReset } from 'scrivito_sdk/common';

let handlers: Array<() => void> = [];

export function observeWindowFocus(): void {
  window.addEventListener('focus', triggerWindowFocus);
}

export function subscribeWindowFocus(handler: () => void): void {
  handlers.push(handler);
}

// For test purpose only.
export function triggerWindowFocus(): void {
  Object.values(handlers).forEach((handler) => handler());
}

onReset(() => (handlers = []));
