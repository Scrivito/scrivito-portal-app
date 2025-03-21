import { ObjSpaceId } from 'scrivito_sdk/client';
import { InternalError, onReset } from 'scrivito_sdk/common';
import { ObjReplication } from 'scrivito_sdk/data/obj_replication';
import { ReplicationCache } from 'scrivito_sdk/data/replication_cache';

type WriteCallback = (p: Promise<void>) => void;

class ObjReplicationPool {
  private replicationCache: ReplicationCache<ObjReplication>;
  private writeCallbacks: {
    [key: string]: WriteCallback;
  };

  private subscriptionToken: number;

  constructor() {
    this.replicationCache = new ReplicationCache(() => {
      // forgot to set a strategy?
      throw new InternalError();
    });

    this.writeCallbacks = {};
    this.subscriptionToken = 0;
  }

  setReplicationStrategy(Strategy: ObjReplicationStrategy) {
    this.replicationCache = new ReplicationCache(
      (objSpaceId, objId) => new Strategy(objSpaceId, objId)
    );
  }

  get(objSpaceId: ObjSpaceId, objId: string): ObjReplication {
    return this.replicationCache.get(objSpaceId, objId);
  }

  subscribeWrites(callback: WriteCallback): number {
    this.subscriptionToken += 1;
    this.writeCallbacks[this.subscriptionToken] = callback;

    return this.subscriptionToken;
  }

  unsubscribeWrites(token: number): void {
    delete this.writeCallbacks[token];
  }

  writeStarted(promise: Promise<void>): void {
    Object.keys(this.writeCallbacks).forEach((key) => {
      const callback = this.writeCallbacks[key];

      callback(promise);
    });
  }

  // For test purpose only.
  clearWriteCallbacks(): void {
    this.writeCallbacks = {};
  }

  // For test purpose only.
  clearCache(): void {
    this.replicationCache.clear();
  }
}

export const objReplicationPool = new ObjReplicationPool();

/* An ObjReplicationStrategy can be any class that has a specific constructor
 * and implements the ObjReplication interface.
 */
type ObjReplicationStrategy = new (
  objSpaceId: ObjSpaceId,
  objId: string
) => ObjReplication;

export function useReplicationStrategy(Strategy: ObjReplicationStrategy) {
  objReplicationPool.setReplicationStrategy(Strategy);
}

onReset(() => {
  objReplicationPool.clearCache();
  objReplicationPool.clearWriteCallbacks();
});
