// @rewire
import {
  MissingWorkspaceError,
  cmsRestApi,
} from 'scrivito_sdk/client/cms_rest_api';
import { ObjJson, buildNonexistentObjJson } from 'scrivito_sdk/client/obj_json';
import { ObjSpaceId, isEmptySpaceId } from 'scrivito_sdk/client/obj_space_id';
import {
  BatchRetrieval,
  assumePresence,
  computeCacheKey,
} from 'scrivito_sdk/common';

// export for test purposes
export interface ObjMgetJson {
  results: Array<ObjJson | null>;
}

type ObjFormat = 'widgetless' | 'full';

type ObjBatchRetrieval = BatchRetrieval<[string, ObjFormat], ObjJson>;

interface BatchRetrievals {
  [workspaceId: string]: ObjBatchRetrieval | undefined;
}

let batchRetrievals: BatchRetrievals = {};

export async function retrieveObj(
  objSpaceId: ObjSpaceId,
  id: string,
  format: ObjFormat
): Promise<ObjJson> {
  if (isEmptySpaceId(objSpaceId)) return buildNonexistentObjJson(id);

  try {
    return await getBatchRetrieval(objSpaceId).retrieve([id, format]);
  } catch (error) {
    if (error instanceof MissingWorkspaceError) {
      return buildNonexistentObjJson(id);
    }

    throw error;
  }
}

function getBatchRetrieval(objSpaceId: ObjSpaceId): ObjBatchRetrieval {
  const cacheKey = computeCacheKey(objSpaceId);
  let batchRetrieval = batchRetrievals[cacheKey];

  if (!batchRetrieval) {
    batchRetrieval = buildBatchRetrieval(objSpaceId);
    batchRetrievals[cacheKey] = batchRetrieval;
  }

  return batchRetrieval;
}

function buildBatchRetrieval(objSpaceId: ObjSpaceId): ObjBatchRetrieval {
  const [spaceType, spaceId] = objSpaceId;
  const endpoint = `${spaceType}s/${assumePresence(spaceId)}/objs/mget`;
  const includeDeleted = spaceType === 'workspace' || undefined;
  return new BatchRetrieval(
    async (keys) => {
      const response = (await cmsRestApi.get(endpoint, {
        ids: keys.map(([id, format]) => (format === 'full' ? id : [id])),
        include_deleted: includeDeleted,
      })) as ObjMgetJson;

      return response.results.map(
        (result, index) => result || buildNonexistentObjJson(keys[index][0])
      );
    },

    // Question: Why the magic batchSize: 17?
    // Answer: Retrieval of up to 100 Objs is a common use-case (see ObjSearch)
    // With a batchSize of 17, this leads to 6 concurrent requests, which is
    // the concurrent request limit in many browsers for HTTP/1.
    // This ensures maximum parallel loading.
    { batchSize: 17 }
  );
}

export function reset() {
  batchRetrievals = {};
}
