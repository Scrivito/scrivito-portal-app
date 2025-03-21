import {
  AsyncTaskTracker,
  Deferred,
  computeCacheKey,
  getScrivitoVersion,
  registerAsyncTask,
} from 'scrivito_sdk/common';

const writeTracker = new AsyncTaskTracker();

export class OfflineStore<KeyType, ValueType> {
  constructor(private storeName: string) {}

  getEntry(key: KeyType): StoreEntry<ValueType> {
    return new StoreEntry(this.storeName, key);
  }

  /** find values in the cache that satisfy the given selector */
  async findValues(
    selector: (data: ValueType, key: KeyType) => boolean
  ): Promise<Array<[ValueType, KeyType]>> {
    const cache = await cacheFor(this.storeName);
    const cacheKeys = await cache.keys();

    const results = await Promise.all(
      cacheKeys.map(async (cacheKey) => {
        const response = await cache.match(cacheKey);
        if (!response) return;

        // the SDK trusts the store to have data in the correct format
        // since the SDK also writes the data and the store is not reused
        // after updating to a new SDK version.
        const wrappedData = (await response.json()) as [ValueType, KeyType];
        const [data, key] = wrappedData;

        if (selector(data, key)) return wrappedData;
      })
    );

    return results.filter(isNotUndefined);
  }
}

function isNotUndefined<T>(data: T | undefined): data is T {
  return data !== undefined;
}

export class StoreEntry<ValueType> {
  constructor(private storeName: string, private key: unknown) {}

  async read(): Promise<ValueType | undefined> {
    // makes 'reading still in progress' visible to flushPromises
    return registerAsyncTask(async () => {
      const cache = await this.fetchCache();
      const response = await cache.match(this.offlineCacheKey());

      if (response) {
        const wrappedData = await response.json();
        return wrappedData[0];
      }
    });
  }

  async write(data: ValueType) {
    await writeTracker.registerTask(async () => {
      if (writingBeingPaused) await writingBeingPaused.promise;

      // makes 'writing still in progress' visible to flushPromises
      await registerAsyncTask(async () => {
        const cache = await this.fetchCache();

        await cache.put(
          this.offlineCacheKey(),
          new Response(JSON.stringify([data, this.key]), {
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });
  }

  async delete() {
    // makes 'delete still in progress' visible to flushPromises
    await registerAsyncTask(async () => {
      const cache = await this.fetchCache();

      await cache.delete(this.offlineCacheKey());
    });
  }

  /** a string that can help a developer identify this entry */
  debugIdentifier(): string {
    return JSON.stringify({ [this.storeName]: this.key });
  }

  private fetchCache() {
    return cacheFor(this.storeName);
  }

  private offlineCacheKey() {
    return `/_scrivito-offline/${computeCacheKey(this.key)}`;
  }
}

const CACHE_PREFIX = 'scrivito-offline';

function cacheFor(collectionId: string) {
  // don't use stores from other SDK versions
  // (since the data format might have changed)
  return caches.open(`${CACHE_PREFIX}-${getScrivitoVersion()}-${collectionId}`);
}

export async function deleteOfflineStoreCaches() {
  const scrivitoCacheNames = await getAllScrivitoCacheNames();

  await Promise.all(
    scrivitoCacheNames.map((cacheName) => caches.delete(cacheName))
  );
}

export async function waitUntilWritingFinished(): Promise<void> {
  return writeTracker.waitForRegisteredTasks();
}

/** for test purposes only */
export async function countOfflineStoreEntries(): Promise<number> {
  const scrivitoCaches = await openAllScrivitoCaches();

  const cacheSizes = await Promise.all(
    scrivitoCaches.map(async (cache) => (await cache.keys()).length)
  );

  return cacheSizes.reduce((sum, size) => sum + size, 0);
}

async function openAllScrivitoCaches() {
  const scrivitoCacheNames = await getAllScrivitoCacheNames();

  return Promise.all(
    scrivitoCacheNames.map((cacheName) => caches.open(cacheName))
  );
}

async function getAllScrivitoCacheNames() {
  const cacheNames = await caches.keys();

  return cacheNames.filter((name) => name.startsWith(CACHE_PREFIX));
}

let writingBeingPaused: Deferred | undefined;

/** for test purposes only */
export function pauseAllWriting(): void {
  if (!writingBeingPaused) writingBeingPaused = new Deferred();
}

/** for test purposes only */
export function resumeAllWriting(): void {
  writingBeingPaused?.resolve();
  writingBeingPaused = undefined;
}
