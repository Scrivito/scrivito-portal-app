import { isEmpty } from 'underscore';

import {
  BackendFacetQueryResponse,
  BackendFacetRequestParams,
  BackendRequestFacet,
  ObjSpaceId,
  cmsRetrieval,
  getWorkspaceId,
  isEmptySpaceId,
  isWorkspaceObjSpaceId,
} from 'scrivito_sdk/client';
import { QueryParams, getContentStateId } from 'scrivito_sdk/data';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data/in_memory_tenant';
import {
  LoadableCollection,
  LoadableData,
  loadableWithDefault,
} from 'scrivito_sdk/loadable';

const loadableCollection = new LoadableCollection<
  BackendFacetQueryResponse,
  [ObjSpaceId, BackendRequestFacet, Query]
>({
  recordedAs: 'facetquery',
  loadElement: ([objSpaceId, facet, query]) => ({
    loader: () =>
      cmsRetrieval.retrieveFacetQuery(
        getWorkspaceId(objSpaceId),
        buildRequestParams(facet, query)
      ),
    invalidation: () =>
      loadableWithDefault(undefined, () => getContentStateId(objSpaceId)) || '',
  }),
});

export interface FacetValueData {
  name: string;
  count: number;
  includedObjIds: string[];
}

export interface FacetQueryOptions {
  limit?: number;
  includeObjs?: number;
}

const EMPTY_RESULT: BackendFacetQueryResponse = { facets: [[]] };

type Query = QueryParams['query'];

export class FacetQuery {
  private loadableData?: LoadableData<BackendFacetQueryResponse>;

  constructor(
    objSpaceId: ObjSpaceId,
    attribute: string,
    options: FacetQueryOptions,
    query: Query
  ) {
    if (!isEmptySpaceId(objSpaceId)) {
      this.loadableData = getData(objSpaceId, attribute, options, query);
    }
  }

  result(): FacetValueData[] {
    assertNotUsingInMemoryTenant('Search API');

    const response = this.loadableData ? this.loadableData.get() : EMPTY_RESULT;

    if (!response) return [];

    return response.facets[0].map((facet) => {
      const name = facet.value;
      const count = facet.total;
      const includedObjIds = facet.results.map((result) => result.id);

      return { name, count, includedObjIds };
    });
  }
}

// For test purpose only.
export function storeFacetQuery(
  objSpaceId: ObjSpaceId,
  attribute: string,
  options: FacetQueryOptions,
  query: QueryParams['query'],
  response: BackendFacetQueryResponse
): void {
  if (!isWorkspaceObjSpaceId(objSpaceId)) {
    throw new Error(
      `Cannot store facet data for space id ${JSON.stringify(objSpaceId)}`
    );
  }
  getData(objSpaceId, attribute, options, query).set(response);
}

function getData(
  objSpaceId: ObjSpaceId,
  attribute: string,
  options: FacetQueryOptions,
  query: Query
) {
  const facet = {
    attribute,
    include_objs: options.includeObjs || 0,
    limit: options.limit || 10,
  };

  return loadableCollection.get([objSpaceId, facet, query || []]);
}

function buildRequestParams(facet: BackendRequestFacet, query?: Query) {
  const params: BackendFacetRequestParams = {
    facets: [facet],
    options: { site_aware: true },
    size: 0,
  };

  if (!isEmpty(query)) {
    params.query = query;
  }

  return params;
}
