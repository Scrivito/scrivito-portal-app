import { ObjSpaceId } from 'scrivito_sdk/client';
import { InternalError, onReset } from 'scrivito_sdk/common';
import { ObjReplication } from 'scrivito_sdk/data/obj_replication';
import { ReplicationCache } from 'scrivito_sdk/data/replication_cache';

class ObjReplicationPool {
  private replicationCache: ReplicationCache<ObjReplication>;

  constructor() {
    this.replicationCache = new ReplicationCache(() => {
      // forgot to set a strategy?
      throw new InternalError();
    });
  }

  setReplicationStrategy(Strategy: ObjReplicationStrategy) {
    this.replicationCache = new ReplicationCache(
      (objSpaceId, objId) => new Strategy(objSpaceId, objId),
    );
  }

  get(objSpaceId: ObjSpaceId, objId: string): ObjReplication {
    return this.replicationCache.get(objSpaceId, objId);
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
  objId: string,
) => ObjReplication;

export function useReplicationStrategy(Strategy: ObjReplicationStrategy) {
  objReplicationPool.setReplicationStrategy(Strategy);
}

onReset(() => {
  objReplicationPool.clearCache();
});
