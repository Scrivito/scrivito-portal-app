import { currentOrigin } from 'scrivito_sdk/app_support/current_origin';
import { createStateContainer } from 'scrivito_sdk/state';

const extensionsUrl = createStateContainer<string>();

export function setExtensionsUrl(url: string | undefined): void {
  extensionsUrl.set(url);
}

export function getExtensionsUrl(): string | undefined {
  const url = extensionsUrl.get();
  if (url) return new URL(url, currentOrigin()).toString();
}
