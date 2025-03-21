import { BinaryRetrievalOptions } from 'scrivito_sdk/client/binary_retrieval_options';
import { cmsRestApi } from 'scrivito_sdk/client/cms_rest_api';
import { asBackendObjSpaceId } from 'scrivito_sdk/client/obj_space_id';

export interface BackendMetadataResponse {
  meta_data: unknown;
}

interface BinaryMetadataRequestParams {
  access_via?: string;
}

export function retrieveBinaryMetadata(
  binaryId: string,
  options?: BinaryRetrievalOptions
): Promise<BackendMetadataResponse> {
  const requestParams: BinaryMetadataRequestParams = {};

  if (options?.accessVia) {
    requestParams.access_via = asBackendObjSpaceId(options.accessVia);
  }

  return cmsRestApi.get(
    `blobs/${encodeURIComponent(binaryId || '')}/meta_data`,
    requestParams
  ) as Promise<BackendMetadataResponse>;
}
