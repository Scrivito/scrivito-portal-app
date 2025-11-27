import { ObjJson, ObjSpaceId } from 'scrivito_sdk/client';
import { InternalError, Streamable } from 'scrivito_sdk/common';
import { ObjReplicationMessage } from 'scrivito_sdk/data';

import { ObjReplication } from 'scrivito_sdk/data/obj_replication';
import { createObjReplicationProcess } from 'scrivito_sdk/data/obj_replication_process';
import { ReplicationProcess } from 'scrivito_sdk/replication';

let objReplicationEndpoint: ObjStreamReplicationEndpoint | undefined;

export interface ObjStreamReplicationEndpoint {
  objReplicationMessageStream(
    objSpaceId: ObjSpaceId,
    objId: string
  ): Streamable<ObjReplicationMessage>;

  finishSavingObj(objSpaceId: ObjSpaceId, objId: string): Promise<void>;
}

/** set the remote endpoint for stream replication
 * (usually, the UiAdapter is used as the endpoint)
 */
export function setObjStreamReplicationEndpoint(
  endpoint: ObjStreamReplicationEndpoint
) {
  objReplicationEndpoint = endpoint;
}

export class ObjStreamReplication implements ObjReplication {
  private replicationProcess: ReplicationProcess<ObjJson | undefined>;
  private runningEnsured = false;

  constructor(
    private readonly objSpaceId: ObjSpaceId,
    private readonly objId: string
  ) {
    this.replicationProcess = createObjReplicationProcess(
      objSpaceId,
      objId,
      getEndpoint().objReplicationMessageStream(objSpaceId, objId),
      'consumer'
    );
  }

  /** for test purposes only */
  processSubscriberCount() {
    return this.replicationProcess.subscriberCount();
  }

  notifyLocalState() {
    // the replication process monitors local state changes on its own,
    // once it is up and running.
    this.ensureRunning();
  }

  notifyBackendState(_data: ObjJson) {
    // not concerned with the backend (this class replicates to the UI)
  }

  finishReplicating() {
    return this.replicationProcess.finishReplicating();
  }

  async finishSaving() {
    await this.finishReplicating();
    return getEndpoint().finishSavingObj(this.objSpaceId, this.objId);
  }

  replicationMessageStream() {
    return this.replicationProcess.replicationMessages();
  }

  start() {
    this.ensureRunning();
  }

  private ensureRunning() {
    if (this.runningEnsured) return;

    // this ensures that the replication runs and keeps on running,
    // independent of whether anyone else subscribes the replicationMessages.
    // note: an ObjReplication is never stopped, so no need for unsubscribe
    this.replicationProcess.replicationMessages().subscribe(() => 0);

    this.runningEnsured = true;
  }
}

function getEndpoint() {
  if (!objReplicationEndpoint) {
    // setObjStreamReplicationEndpoint needs to be called first
    throw new InternalError();
  }

  return objReplicationEndpoint;
}
