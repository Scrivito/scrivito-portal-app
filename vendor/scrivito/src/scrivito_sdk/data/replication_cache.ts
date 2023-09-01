import { ObjSpaceId } from 'scrivito_sdk/client';

export class ReplicationCache<T> {
  private cache: CmsWideReplicationCache<T> = {};

  constructor(
    private readonly factory: (objSpaceId: ObjSpaceId, objId: string) => T
  ) {}

  get(objSpaceId: ObjSpaceId, objId: string): T {
    const workspaceCache = this.getObjSpaceCache(objSpaceId);

    const objEntry = workspaceCache[objId];
    if (objEntry) return objEntry;

    const newEntry = this.factory(objSpaceId, objId);
    workspaceCache[objId] = newEntry;
    return newEntry;
  }

  clear() {
    this.cache = {};
  }

  private getObjSpaceCache(
    objSpaceId: ObjSpaceId
  ): ObjSpaceReplicationCache<T> {
    const cacheKey = objSpaceId.join(':');
    const existingCache = this.cache[cacheKey];
    if (existingCache) return existingCache;

    const newCache = {};
    this.cache[cacheKey] = newCache;

    return newCache;
  }
}

interface CmsWideReplicationCache<T> {
  [cacheKey: string]: ObjSpaceReplicationCache<T> | undefined;
}

interface ObjSpaceReplicationCache<T> {
  [objId: string]: T | undefined;
}
