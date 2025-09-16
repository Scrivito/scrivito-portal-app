import {
  Deferred,
  collectInListAndSchedule,
  nextTick,
} from 'scrivito_sdk/common';

type Mget<KEY_TYPE, RETURN_TYPE> = (keys: KEY_TYPE[]) => Promise<RETURN_TYPE[]>;

interface Item<KEY_TYPE, RETURN_TYPE> {
  key: KEY_TYPE;
  deferred: Deferred<RETURN_TYPE>;
}

export class BatchRetrieval<KEY_TYPE, RETURN_TYPE> {
  private mget: Mget<KEY_TYPE, RETURN_TYPE>;
  private batchSize: number;

  constructor(
    mget: Mget<KEY_TYPE, RETURN_TYPE>,
    { batchSize }: { batchSize?: number } = {}
  ) {
    this.mget = mget;
    this.batchSize = batchSize || 100;
  }

  retrieve(key: KEY_TYPE): Promise<RETURN_TYPE> {
    const deferred = new Deferred<RETURN_TYPE>();
    this.scheduleItem({ key, deferred });
    return deferred.promise;
  }

  private scheduleItem = collectInListAndSchedule<Item<KEY_TYPE, RETURN_TYPE>>(
    nextTick,
    (items: Item<KEY_TYPE, RETURN_TYPE>[]) => {
      const nextBatch = items.splice(0, this.batchSize);
      const keys = nextBatch.map((item) => item.key);

      (async () => {
        try {
          const results = await this.mget(keys);
          nextBatch.forEach(async ({ key, deferred }, index) => {
            if (index < results.length) {
              const result = results[index];
              deferred.resolve(result);
            } else {
              try {
                const result = await this.retrieve(key);
                deferred.resolve(result);
              } catch (error) {
                deferred.reject(error as Error);
              }
            }
          });
        } catch (error) {
          nextBatch.forEach((item) => item.deferred.reject(error as Error));
        }
      })();

      return items;
    }
  );
}
