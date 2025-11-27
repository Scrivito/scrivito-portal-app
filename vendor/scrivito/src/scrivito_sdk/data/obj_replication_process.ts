import { ObjJson, ObjSpaceId } from 'scrivito_sdk/client';
import { Streamable } from 'scrivito_sdk/common';

import { objDataFor } from 'scrivito_sdk/data/obj_data_store';
import { threeWayMergeObjs } from 'scrivito_sdk/data/obj_patch';
import { loadAndObserve, loadableWithDefault } from 'scrivito_sdk/loadable';
import {
  LocalStateForReplication,
  ReplicationMessage,
  ReplicationProcess,
} from 'scrivito_sdk/replication';
import { addBatchUpdate } from 'scrivito_sdk/state';

export type ObjReplicationMessage = ReplicationMessage<ObjJson | undefined>;

/** When two agents are connected, the 'source' is the agent which is closer
 * to the backend, i.e. a 'source' sits between the 'consumer' and the backend.
 * In consequence: The UI is the 'source', the SDK is the 'consumer'
 *
 * This is used to determine which side's agent makes 'the first move'.
 *
 * It is also used to choose a merge strategy according to the role.
 * This ensures that if changes originating at the backend conflict with changes
 * originating at the application, the application wins.
 * That makes sense, since the backend contains general-purpose logic,
 * while the application contains logic that has been custom tailored.
 */
type ReplicationRole = 'source' | 'consumer';

/** Create a ReplicationProcess, wired up to the given local Obj and
 * the given stream of incoming replication messages from remote.
 */
export function createObjReplicationProcess(
  objSpaceId: ObjSpaceId,
  objId: string,
  incomingMessages: Streamable<ObjReplicationMessage>,
  role: ReplicationRole
): ReplicationProcess<ObjJson | undefined> {
  const batchedMessages = new Streamable<ObjReplicationMessage>((subscriber) =>
    incomingMessages.subscribe((message) =>
      addBatchUpdate(() => subscriber.next(message))
    )
  );

  return new ReplicationProcess(
    localStateForObj(objSpaceId, objId),
    batchedMessages,
    mergeStrategyForRole(role),
    role === 'source'
  );
}

function mergeStrategyForRole(role: ReplicationRole) {
  // the consumer is always right :-)
  return role === 'consumer'
    ? assertiveThreeWayMergeObjs
    : humbleThreeWayMergeObjs;
}

function localStateForObj(
  objSpaceId: ObjSpaceId,
  objId: string
): LocalStateForReplication<ObjJson | undefined> {
  const objData = objDataFor(objSpaceId, objId);

  return {
    get: () => loadableWithDefault(undefined, () => objData.get()),
    set: (value) => {
      if (value !== undefined) objData.set(value);
    },
    changes: loadAndObserve(() => objData.get()).map(() => {
      // convert to Streamable<void>
    }),
  };
}

function assertiveThreeWayMergeObjs(
  myVersion: ObjJson | undefined,
  otherVersion: ObjJson | undefined,
  baseVersion: ObjJson | undefined
): ObjJson | undefined {
  return threeWayMergeObjs(myVersion, otherVersion, baseVersion);
}

/** similar to assertiveThreeWayMergeObjs, but in case of conflict, other version wins. */
function humbleThreeWayMergeObjs(
  myVersion: ObjJson | undefined,
  otherVersion: ObjJson | undefined,
  baseVersion: ObjJson | undefined
): ObjJson | undefined {
  return threeWayMergeObjs(otherVersion, myVersion, baseVersion);
}
