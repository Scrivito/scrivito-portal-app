// @rewire
import {
  MissingWorkspaceError,
  cmsRestApi,
} from 'scrivito_sdk/client/cms_rest_api';
import { ExistentObjJson, OrderByItem } from 'scrivito_sdk/client/obj_json';

export interface QueryResponse {
  results: string[];
  total: number;

  continuation?: string;
  objs?: ExistentObjJson[];
}

export interface Query {
  field: string | string[];
  operator: BackendSearchOperator;
  value: SingleBackendSearchValue | SingleBackendSearchValue[];
  negate?: true;
  boost?: FieldBoost;
}

export type SingleBackendSearchValue = string | number | boolean | null;

export interface FieldBoost {
  [key: string]: number;
}

type BoostCondition = Pick<Query, 'field' | 'operator' | 'value'>;
export interface BackendValueBoost {
  condition: BoostCondition[];
  factor: number;
}

export type BackendSearchOperator =
  | 'contains'
  | 'contains_prefix'
  | 'equals'
  | 'starts_with'
  | 'is_greater_than'
  | 'is_less_than'
  | 'links_to'
  | 'refers_to'
  | 'matches';

export interface BackendQueryRetrievalParams {
  query: Query[];
  size: number;

  boost?: BackendValueBoost[];
  offset?: number;
  order_by?: OrderByItem[];
  options: {
    site_aware: true;
    include_deleted?: true;
    include_editing_assets?: true;
  };
  continuation?: string;
  include_objs?: boolean;
}

interface BackendQueryResponse {
  results: Array<{ id: string }>;
  total: number;

  continuation?: string;
  objs?: ExistentObjJson[];
}

export async function retrieveObjQuery(
  workspaceId: string,
  params: BackendQueryRetrievalParams
): Promise<QueryResponse> {
  try {
    const { results, total, continuation, objs } = (await cmsRestApi.get(
      `workspaces/${workspaceId}/objs/search`,
      params
    )) as BackendQueryResponse;

    return {
      results: results.map((result) => result.id),
      continuation,
      total,
      objs,
    };
  } catch (error) {
    if (error instanceof MissingWorkspaceError) {
      return { results: [], total: 0 };
    }

    throw error;
  }
}
