// @rewire
import {
  MissingWorkspaceError,
  cmsRestApi,
} from 'scrivito_sdk/client/cms_rest_api';
import { QueryParams } from 'scrivito_sdk/data';

export interface BackendSuggestParams {
  prefix: string;
  options: { site_aware: true };

  fields?: string[];
  limit?: number;
  from_search?: Partial<QueryParams>;
}

export interface BackendSuggestResponse {
  results: string[];
}

export async function retrieveSuggest(
  workspaceId: string,
  params: BackendSuggestParams
): Promise<BackendSuggestResponse> {
  try {
    const response = await cmsRestApi.put(
      `workspaces/${workspaceId}/objs/search/suggest`,
      params
    );
    return response as BackendSuggestResponse;
  } catch (error) {
    if (error instanceof MissingWorkspaceError) return { results: [] };
    throw error;
  }
}
