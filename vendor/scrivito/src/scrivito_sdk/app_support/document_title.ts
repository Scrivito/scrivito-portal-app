import { createStateContainer } from 'scrivito_sdk/state';

const state = createStateContainer<string>();

export function observeDocumentTitle(): () => void {
  const observer = new MutationObserver(documentTitleChanged);

  observer.observe(document.head, {
    attributes: true,
    attributeFilter: ['title'],
    characterData: true,
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}

export function getDocumentTitle(): string {
  return state.get() || '';
}

function documentTitleChanged(): void {
  state.set(document.title);
}
