import { ObjSpaceId } from 'scrivito_sdk/client';
import {
  BackendMetadataResponse,
  retrieveBinaryMetadata,
} from 'scrivito_sdk/client/binary_metadata_retrieval';

import { BinaryRetrievalOptions } from 'scrivito_sdk/client/binary_retrieval_options';
import {
  BackendBinaryData,
  retrieveBinaryUrls,
} from 'scrivito_sdk/client/binary_urls_retrieval';
import {
  BackendFacetQueryResponse,
  BackendFacetRequestParams,
  retrieveFacetQuery,
} from 'scrivito_sdk/client/facet_query_retrieval';
import {
  ObjFieldDiffs,
  retrieveObjFieldDiffs,
} from 'scrivito_sdk/client/obj_field_diffs_retrieval';
import {
  BackendQueryRetrievalParams,
  QueryResponse,
  retrieveObjQuery,
} from 'scrivito_sdk/client/obj_query_retrieval';

import {
  BackendSuggestParams,
  BackendSuggestResponse,
  retrieveSuggest,
} from 'scrivito_sdk/client/suggest_retrieval';

import { TransformationDefinition } from 'scrivito_sdk/models';

export interface CmsRetrieval {
  retrieveObjQuery(
    workspaceId: string,
    params: BackendQueryRetrievalParams
  ): Promise<QueryResponse>;

  retrieveFacetQuery(
    workspaceId: string,
    params: BackendFacetRequestParams
  ): Promise<BackendFacetQueryResponse>;

  retrieveSuggest(
    workspaceId: string,
    params: BackendSuggestParams
  ): Promise<BackendSuggestResponse>;

  retrieveBinaryMetadata(
    binaryId: string,
    options?: BinaryRetrievalOptions
  ): Promise<BackendMetadataResponse>;

  retrieveBinaryUrls(
    binaryId: string,
    transformation?: TransformationDefinition,
    options?: BinaryRetrievalOptions
  ): Promise<BackendBinaryData>;

  retrieveObjFieldDiffs(
    from: ObjSpaceId,
    to: ObjSpaceId,
    objId: string
  ): Promise<ObjFieldDiffs>;
}

export let cmsRetrieval: CmsRetrieval = {
  retrieveObjQuery(
    workspaceId: string,
    params: BackendQueryRetrievalParams
  ): Promise<QueryResponse> {
    return retrieveObjQuery(workspaceId, params);
  },

  retrieveFacetQuery(
    workspaceId: string,
    params: BackendFacetRequestParams
  ): Promise<BackendFacetQueryResponse> {
    return retrieveFacetQuery(workspaceId, params);
  },

  retrieveSuggest(
    workspaceId: string,
    params: BackendSuggestParams
  ): Promise<BackendSuggestResponse> {
    return retrieveSuggest(workspaceId, params);
  },

  retrieveBinaryMetadata(
    binaryId: string,
    options?: BinaryRetrievalOptions
  ): Promise<BackendMetadataResponse> {
    return retrieveBinaryMetadata(binaryId, options);
  },

  retrieveBinaryUrls(
    binaryId: string,
    transformation?: TransformationDefinition,
    options?: BinaryRetrievalOptions
  ): Promise<BackendBinaryData> {
    return retrieveBinaryUrls(binaryId, transformation, options);
  },

  retrieveObjFieldDiffs(
    from: ObjSpaceId,
    to: ObjSpaceId,
    objId: string
  ): Promise<ObjFieldDiffs> {
    return retrieveObjFieldDiffs(from, to, objId);
  },
};

export function replaceCmsRetrieval(newCmsRetrieval: CmsRetrieval) {
  cmsRetrieval = newCmsRetrieval;
}
