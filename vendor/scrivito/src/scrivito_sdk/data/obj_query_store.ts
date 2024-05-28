// @rewire
import {
  BackendQueryRetrievalParams,
  BackendValueBoost,
  ObjSpaceId,
  OrderByItem,
  Query,
  cmsRetrieval,
  getWorkspaceId,
  isEmptySpaceId,
} from 'scrivito_sdk/client';
import {
  EmptyContinueIterable,
  isPresent,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import {
  DataQuery,
  ObjData,
  getContentStateId,
  getObjData,
} from 'scrivito_sdk/data';
import { IdBatchCollection } from 'scrivito_sdk/data/id_batch';
import { IdBatchQuery } from 'scrivito_sdk/data/id_batch_query';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data/in_memory_tenant';
import { preloadObjData } from 'scrivito_sdk/data/obj_data_store';
import { objReplicationPool } from 'scrivito_sdk/data/obj_replication_pool';
import { loadableWithDefault } from 'scrivito_sdk/loadable';
import { addBatchUpdate } from 'scrivito_sdk/state';

export interface QueryParams {
  query: Query[];
  boost?: BackendValueBoost[];
  offset?: number;
  orderBy?: OrderByItem[];
  includeDeleted?: true;
  includeEditingAssets?: true;
}

let includeObjs = true;

const batchCollection = new IdBatchCollection({
  recordedAs: 'objquery',

  loadBatch,

  invalidation: ([objSpaceId]: [ObjSpaceId, QueryParams]) =>
    loadableWithDefault(undefined, () => getContentStateId(objSpaceId)) || '',
});

// For test purposes only
export function resetIncludeObjs() {
  includeObjs = true;
}

export const clearFakeObjIdQuery =
  batchCollection.clearFakeQuery.bind(batchCollection);
export const setupFakeObjIdQuery =
  batchCollection.setupFakeQuery.bind(batchCollection);
export const usesFakeObjIdQuery =
  batchCollection.usesFakeQuery.bind(batchCollection);
export const storeObjIdQueryBatch =
  batchCollection.storeBatch.bind(batchCollection);

export function getObjQueryCount(
  objSpaceId: ObjSpaceId,
  params: QueryParams
): number {
  if (isEmptySpaceId(objSpaceId)) return 0;

  return batchCollection.getQueryCount([objSpaceId, params]) ?? 0;
}

export function getObjQuery(
  objSpaceId: ObjSpaceId,
  params: QueryParams,
  batchSize: number
): DataQuery<ObjData> {
  assertNotUsingInMemoryTenant('Search API');

  if (isEmptySpaceId(objSpaceId)) return new EmptyContinueIterable();

  const idQuery = new IdBatchQuery((batchNumber) =>
    batchCollection.getBatch([objSpaceId, params], batchSize, batchNumber)
  );

  return transformContinueIterable(idQuery, (iterator) =>
    iterator
      .map((id) => getObjData(objSpaceId, id))
      .takeWhile(isPresent)
      .filter((objData) => !objData.isUnavailable())
  );
}

function loadBatch(
  [objSpaceId, params]: [ObjSpaceId, QueryParams],
  continuation: string | undefined,
  size: number
) {
  const {
    query,
    boost,
    offset,
    orderBy,
    includeDeleted,
    includeEditingAssets,
  } = params;
  const requestParams: BackendQueryRetrievalParams = {
    query,
    options: { site_aware: true },
    size,
    continuation,
    include_objs: includeObjs,
    boost,
    offset,
    order_by: orderBy,
  };
  if (includeDeleted) requestParams.options.include_deleted = true;
  if (includeEditingAssets) {
    requestParams.options.include_editing_assets = true;
  }

  const workspaceId = getWorkspaceId(objSpaceId);
  return cmsRetrieval
    .retrieveObjQuery(workspaceId, requestParams)
    .then((response) => {
      // including Objs only makes sense for the first request(s), since
      // afterwards many Objs will already be cached locally.
      includeObjs = false;

      const includedObjs = response.objs;
      addBatchUpdate(() => {
        if (includedObjs) {
          includedObjs.forEach((objJson) => {
            objReplicationPool
              .get(objSpaceId, objJson._id)
              .notifyBackendState(objJson);
          });
        }

        response.results.forEach((id) => preloadObjData(objSpaceId, id));
      });

      return {
        results: response.results,
        total: response.total,
        continuation: response.continuation,
      };
    });
}
