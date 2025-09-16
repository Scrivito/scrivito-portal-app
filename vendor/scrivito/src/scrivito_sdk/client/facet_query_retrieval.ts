import {
  MissingWorkspaceError,
  cmsRestApi,
} from 'scrivito_sdk/client/cms_rest_api';
import { ObjSearchParams } from 'scrivito_sdk/models';

export interface BackendFacetRequestParams {
  facets: [BackendRequestFacet];
  options: { site_aware: true };
  size: number;
  query?: Query;
}

export interface BackendRequestFacet {
  attribute: string;
  limit: number;
  include_objs: boolean | number;
}

type Query = ObjSearchParams['query'];

interface BackendResponseFacet {
  value: string;
  total: number;
  results: Array<{ id: string }>;
}

export interface BackendFacetQueryResponse {
  facets: [BackendResponseFacet[]];
}

export async function retrieveFacetQuery(
  workspaceId: string,
  params: BackendFacetRequestParams
): Promise<BackendFacetQueryResponse> {
  try {
    return (await cmsRestApi.get(
      `workspaces/${workspaceId}/objs/search`,
      params
    )) as BackendFacetQueryResponse;
  } catch (error) {
    if (error instanceof MissingWorkspaceError) return { facets: [[]] };
    throw error;
  }
}
