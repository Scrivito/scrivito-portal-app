import { ContextContainer, InternalError, equals } from 'scrivito_sdk/common';
import { getContentStateId } from 'scrivito_sdk/data';
import { loadableWithDefault } from 'scrivito_sdk/loadable';
import { BasicObj, currentObjSpaceId } from 'scrivito_sdk/models';

interface Cache {
  [key: string]: string;
}

let cache: { [key: string]: Cache | undefined } = {};

let cacheContentStateId: string | undefined;
const cacheDisabled = new ContextContainer<boolean>();

export function cacheObjForPermalink(
  obj: BasicObj,
  permalink: string,
  siteId: string
): void {
  if (cacheDisabled.current()) return;
  // throws, because clearIfOutdated observes only the current obj space
  // i.e. the cache is not invalidated properly for any other obj space
  // To not cache "foreign" obj spaces would also be an option.
  if (!equals(obj.objSpaceId(), currentObjSpaceId())) {
    throw new InternalError();
  }
  if (!obj.siteId()) return;

  clearIfOutdated();

  if (!cache[siteId]) cache[siteId] = {};

  cache[siteId]![permalink] = obj.id();
}

export function objIdForPermalink(
  permalink: string,
  siteId: string
): string | undefined {
  if (cacheDisabled.current()) return;

  clearIfOutdated();

  return cache[siteId]?.[permalink];
}

export function withDisabledPermalinkCache<T>(fn: () => T): T {
  return cacheDisabled.runWith(true, fn);
}

// For test purpose only.
export function clearPermalinkCache(): void {
  cache = {};
  cacheContentStateId = undefined;
}

function clearIfOutdated(): void {
  const worldContentStateId =
    loadableWithDefault(undefined, () =>
      getContentStateId(currentObjSpaceId())
    ) || '';
  if (worldContentStateId !== cacheContentStateId) {
    cache = {};
    cacheContentStateId = worldContentStateId;
  }
}
