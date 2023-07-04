import {
  BackendSuggestParams,
  BackendSuggestResponse,
  ObjSpaceId,
  cmsRetrieval,
  getWorkspaceId,
  isWorkspaceObjSpaceId,
} from 'scrivito_sdk/client';
import {
  QueryParams,
  assertNotUsingInMemoryTenant,
  getContentStateId,
} from 'scrivito_sdk/data';
import {
  LoadableCollection,
  LoadableData,
  loadableWithDefault,
} from 'scrivito_sdk/loadable';

export interface SuggestOptions {
  attributes?: string[];
  limit?: number;
}

type CollectionKey = [ObjSpaceId, BackendSuggestParams];

const loadableCollection = new LoadableCollection({
  recordedAs: 'suggest',
  loadElement: ([objSpaceId, params]: CollectionKey) => ({
    loader: () =>
      cmsRetrieval.retrieveSuggest(getWorkspaceId(objSpaceId), params),
    invalidation: () =>
      loadableWithDefault('', () => getContentStateId(objSpaceId)),
  }),
});

export function suggest(
  objSpaceId: ObjSpaceId,
  prefix: string,
  options: SuggestOptions,
  fromSearch?: Partial<QueryParams>
): string[] {
  assertNotUsingInMemoryTenant('Search API');

  const results: string[] = [];
  if (!isWorkspaceObjSpaceId(objSpaceId)) return results;

  const loadableData = getLoadable(objSpaceId, prefix, options, fromSearch);
  return loadableData.getWithDefault({ results }).results;
}

// For test purpose only
export function storeSuggest(
  objSpaceId: ObjSpaceId,
  prefix: string,
  options: SuggestOptions,
  fromSearch: Partial<QueryParams> | undefined,
  response: BackendSuggestResponse
): void {
  getLoadable(objSpaceId, prefix, options, fromSearch).set(response);
}

function getLoadable(
  objSpaceId: ObjSpaceId,
  prefix: string,
  { attributes, limit }: SuggestOptions,
  fromSearch?: Partial<QueryParams>
): LoadableData<BackendSuggestResponse> {
  const backendParams: BackendSuggestParams = {
    prefix,
    options: { site_aware: true },
  };
  if (fromSearch) backendParams.from_search = fromSearch;
  if (attributes) backendParams.fields = attributes;
  if (typeof limit === 'number') backendParams.limit = limit;

  return loadableCollection.get([objSpaceId, backendParams]);
}
