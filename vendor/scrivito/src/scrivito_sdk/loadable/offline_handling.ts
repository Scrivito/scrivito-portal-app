import {
  ScrivitoError,
  collectAndSchedule,
  nextTick,
  onReset,
} from 'scrivito_sdk/common';
import { LoadableData } from 'scrivito_sdk/loadable';
import { ParamsWithLoader } from 'scrivito_sdk/loadable/create_loader_process';
import { StoreEntry } from 'scrivito_sdk/loadable/offline_store';

let isEnabled = false;

/** @beta */
export function enableOfflineStore() {
  isEnabled = true;
}

let isInOfflineMode: boolean | PromiseLike<boolean> = false;
export function setOfflineMode(mode: boolean | PromiseLike<boolean>) {
  isInOfflineMode = mode;
}

/** @beta */
export function isOfflineStoreEnabled(): boolean {
  return !!isEnabled;
}

onReset(() => {
  isInOfflineMode = false;
  isEnabled = false;
});

export function applyOfflineHandling<T>(
  loadable: LoadableData<T>,
  params: ParamsWithLoader<T>
): {
  loader: () => Promise<T>;
  onChange?: () => void;
} {
  const loader = params.loader;
  const offlineLoader = params.offlineLoader;

  if (offlineLoader) {
    return {
      loader: async () =>
        (await isInOfflineMode) ? offlineLoader() : loader(),
    };
  }

  const offlineEntry = params.offlineEntry;
  if (!offlineEntry) return { loader };

  return {
    loader: async () =>
      (await isInOfflineMode) ? loadFromEntry(offlineEntry) : loader(),
    onChange: collectAndSchedule(nextTick, async () => {
      if (isEnabled && !(await isInOfflineMode)) {
        storeIntoEntry(loadable, offlineEntry);
      }
    }),
  };
}

async function storeIntoEntry<T>(
  loadable: LoadableData<T>,
  offlineEntry: StoreEntry<T>
) {
  try {
    offlineEntry.write(loadable.getOrThrow());
  } catch {
    offlineEntry.delete();
  }
}

export class NotAvailableOfflineError extends ScrivitoError {}

async function loadFromEntry<T>(offlineEntry: StoreEntry<T>) {
  const data = await offlineEntry.read();
  if (data === undefined) {
    throw new NotAvailableOfflineError(
      `missing: ${offlineEntry.debugIdentifier()})}`
    );
  }
  return data;
}
