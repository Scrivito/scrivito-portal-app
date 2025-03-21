import { BinaryRetrievalOptions } from 'scrivito_sdk/client/binary_retrieval_options';
import { cmsRestApi } from 'scrivito_sdk/client/cms_rest_api';
import { asBackendObjSpaceId } from 'scrivito_sdk/client/obj_space_id';
import { BatchRetrieval } from 'scrivito_sdk/common';
import { TransformationDefinition } from 'scrivito_sdk/models';

export type BackendBinaryData =
  | PublicBackendBinaryData
  | PrivateBackendBinaryData;

interface PublicBackendBinaryData {
  public_access: {
    get: {
      url: string;
    };
  };

  private_access?: {
    get: {
      url: string;
    };
  };
}

interface PrivateBackendBinaryData {
  public_access: {
    get: {
      url: string;
    };
  };

  private_access: {
    get: {
      url: string;
    };
  };
}

interface BinaryRequest {
  id: string;
  transformation?: TransformationDefinition;
  access_via?: string;
}

const batchRetrieval = new BatchRetrieval<BinaryRequest, BackendBinaryData>(
  (blobs) =>
    cmsRestApi
      .get('blobs/mget', { blobs })
      .then(({ results }: { results: Array<unknown> }) =>
        results.map((result) => result as unknown as BackendBinaryData)
      )
);

export function retrieveBinaryUrls(
  binaryId: string,
  transformation?: TransformationDefinition,
  options?: BinaryRetrievalOptions
): Promise<BackendBinaryData> {
  const blob: BinaryRequest = { id: binaryId };

  if (transformation) {
    blob.transformation = transformation;
  }

  if (options?.accessVia) {
    blob.access_via = asBackendObjSpaceId(options.accessVia);
  }

  return batchRetrieval.retrieve(blob);
}
