import { ContextContainer } from 'scrivito_sdk/common';

const isLoadingDisabled = new ContextContainer<boolean>();

export function disableExternalDataLoading<T>(fn: () => T): T {
  return isLoadingDisabled.runWith(true, fn);
}

export function isExternalDataLoadingDisabled(): boolean {
  return isLoadingDisabled.current() || false;
}
