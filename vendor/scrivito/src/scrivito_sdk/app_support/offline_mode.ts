import {
  Configuration,
  getConfiguration,
} from 'scrivito_sdk/app_support/configure';
import { isRunningInBrowser } from 'scrivito_sdk/app_support/node_adapter';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import {
  ScrivitoError,
  getConfiguredTenant,
  onReset,
  reload,
} from 'scrivito_sdk/common';
import {
  deleteOfflineStoreCaches,
  isOfflineStoreEnabled,
  setOfflineMode,
  waitUntilWritingFinished,
} from 'scrivito_sdk/loadable';

let offlineMode: boolean | undefined;

export function initOfflineMode(): void {
  setOfflineMode(
    (async () => determineOfflineMode(await getConfiguration()))()
  );
}

/** @beta */
export function enterOfflineMode(): void {
  if (!isInOfflineMode()) {
    if (!isOfflineStoreEnabled()) {
      throw new ScrivitoError(
        'Offline store has not been enabled: Forgot to call Scrivito.enabledOfflineStore()?'
      );
    }

    window.localStorage.setItem(getOfflineModeStorageKey(), 'true');
    waitUntilWritingFinishedAndReload();
  }
}

async function waitUntilWritingFinishedAndReload() {
  await waitUntilWritingFinished();
  reload();
}

/** @beta */
export function leaveOfflineMode(): void {
  if (isInOfflineMode()) {
    window.localStorage.removeItem(getOfflineModeStorageKey());
    reload();
  }
}

/** @beta */
export function isInOfflineMode(): boolean {
  if (offlineMode === undefined) {
    throw new ScrivitoError(
      'Offline mode has not been allowed in the editing config'
    );
  }

  return offlineMode;
}

export function getOfflineMode(): boolean | undefined {
  return offlineMode;
}

/** @beta */
export async function deleteOfflineStore(): Promise<void> {
  if (isInOfflineMode()) {
    throw new ScrivitoError('Cannot delete the offline store in offline mode');
  }

  return deleteOfflineStoreCaches();
}

function determineOfflineMode(config: Configuration) {
  if (offlineMode === undefined) offlineMode = calculateOfflineMode(config);

  return offlineMode;
}

function calculateOfflineMode(config: Configuration) {
  if (!config.unstable?.allowOfflineMode) return false;
  if (!!uiAdapter || !isRunningInBrowser()) return false;

  return !!getOfflineModeFromStorage();
}

function getOfflineModeFromStorage() {
  return window.localStorage.getItem(getOfflineModeStorageKey());
}

function getOfflineModeStorageKey() {
  return `SCRIVITO.${getConfiguredTenant()}.OFFLINE_MODE`;
}

onReset(resetOfflineMode);

// For test purposes only
export function resetOfflineMode(): void {
  offlineMode = undefined;
}
