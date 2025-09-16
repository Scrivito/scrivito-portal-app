import isEmpty from 'lodash-es/isEmpty';
import {
  ObjJson,
  ObjSpaceId,
  cmsRestApi,
  getWorkspaceId,
  retrieveObj,
} from 'scrivito_sdk/client';
import {
  Deferred,
  InternalError,
  nextTick,
  throttle,
} from 'scrivito_sdk/common';
import { isObjReplicationDisabled } from 'scrivito_sdk/data/disable_obj_replication';
import { setObjData } from 'scrivito_sdk/data/obj_data_store';
import {
  ObjJsonPatch,
  diffObjJson,
  threeWayMergeObjs,
} from 'scrivito_sdk/data/obj_patch';
import { ObjReplication } from 'scrivito_sdk/data/obj_replication';
import { objReplicationPool } from 'scrivito_sdk/data/obj_replication_pool';
import { addBatchUpdate } from 'scrivito_sdk/state';

export class ObjBackendReplication implements ObjReplication {
  private replicationActive: boolean;
  private scheduledReplication: boolean;
  private currentRequestDeferred?: Deferred<void>;
  private nextRequestDeferred?: Deferred<void>;
  private performThrottledReplication: () => void;

  private localState?: ObjJson;
  private backendState?: ObjJson;
  private bufferedBackendState?: ObjJson;

  constructor(
    private readonly objSpaceId: ObjSpaceId,
    private readonly objId: string
  ) {
    this.replicationActive = false;
    this.scheduledReplication = false;
    this.performThrottledReplication = throttle(
      () => this.performReplication(),
      1000
    );
  }

  async start() {
    const data = await retrieveObj(this.objSpaceId, this.objId, 'full');
    addBatchUpdate(() => {
      this.notifyBackendState(data);
    });
  }

  notifyLocalState(localState: ObjJson) {
    if (isObjReplicationDisabled()) return;

    if (isEqualState(this.localState, localState)) return;

    this.localState = localState;
    this.startReplication();
  }

  notifyBackendState(notifiedBackendState: ObjJson) {
    if (!this.localState) {
      // if we don't have a local state yet, we accept any backend state as-is
      this.backendState = notifiedBackendState;
      this.updateLocalState(notifiedBackendState);
      return;
    }

    const newestKnownBackendState =
      this.bufferedBackendState || this.backendState;
    if (
      newestKnownBackendState &&
      compareStates(newestKnownBackendState, notifiedBackendState) > 0
    ) {
      // The notified state is older than the one we know, so we ignore it.
      return;
    }

    if (this.replicationActive) {
      // during replication, the algorithm can't integrate new backend states
      // buffer the new state. it will be applied when the replication finishes
      this.bufferedBackendState = notifiedBackendState;
      return;
    }

    this.updateLocalState(
      threeWayMergeObjs(
        notifiedBackendState,
        this.localState,
        this.backendState
      )
    );
    this.backendState = notifiedBackendState;
  }

  async finishSaving(): Promise<void> {
    let finishSavingPromise;

    if (this.nextRequestDeferred) {
      finishSavingPromise = this.nextRequestDeferred.promise;
    } else if (this.currentRequestDeferred) {
      finishSavingPromise = this.currentRequestDeferred.promise;
    } else {
      return;
    }

    return finishSavingPromise;
  }

  finishReplicating(): never {
    // this method is intended for stream replication
    // should never be called for instances of this class
    throw new InternalError();
  }

  replicationMessageStream(): never {
    // this method is intended for stream replication
    // should never be called for instances of this class
    throw new InternalError();
  }

  // For test purposes
  getLocalState() {
    return this.localState;
  }

  // For test purposes
  getBackendState() {
    return this.backendState;
  }

  private startReplication() {
    if (!isEqualState(this.backendState, this.getLocalObjJson())) {
      if (!this.replicationActive) {
        if (!this.scheduledReplication) {
          this.scheduledReplication = true;
          this.initDeferredForRequest();

          objReplicationPool.writeStarted(this.currentRequestDeferred!.promise);
          nextTick(() => this.performThrottledReplication());
        }
      } else if (!this.nextRequestDeferred) {
        this.nextRequestDeferred = new Deferred();
      }
    } else if (this.nextRequestDeferred) {
      this.nextRequestDeferred.resolve();
      this.nextRequestDeferred = undefined;
    }
  }

  private async performReplication() {
    const localState = this.getLocalObjJson();

    this.scheduledReplication = false;
    this.replicationActive = true;

    try {
      const backendState = await this.replicateLocalStateToBackend(localState);
      this.handleBackendUpdate(localState, backendState);
      this.currentRequestDeferred!.resolve();
      this.currentRequestDeferred = undefined;
      this.replicationActive = false;

      this.startReplication();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      this.currentRequestDeferred!.reject(error);
      this.currentRequestDeferred = undefined;
      this.replicationActive = false;
    }
  }

  private async replicateLocalStateToBackend(
    localState: ObjJson
  ): Promise<ObjJson> {
    const patch = diffObjJson(this.backendState, localState);

    return isEmpty(patch)
      ? // bang:
        // given the localState is not blank, the diff may be empty only if the
        // backendState is similar (equal?) to the localState, i.e. not blank
        Promise.resolve(this.backendState!)
      : this.replicatePatchToBackend(patch);
  }

  private replicatePatchToBackend(patch: ObjJsonPatch): Promise<ObjJson> {
    const id = getWorkspaceId(this.objSpaceId);
    if (id === 'published') throw new InternalError();

    return cmsRestApi.put(`workspaces/${id}/objs/${this.objId}`, {
      obj: patch,
    }) as Promise<ObjJson>;
  }

  private initDeferredForRequest() {
    if (this.nextRequestDeferred) {
      const currentDeferred = this.nextRequestDeferred;
      this.nextRequestDeferred = undefined;
      this.currentRequestDeferred = currentDeferred;
    } else {
      this.currentRequestDeferred = new Deferred();
    }
  }

  private handleBackendUpdate(replicatedState: ObjJson, backendState: ObjJson) {
    this.backendState = newerState(backendState, this.bufferedBackendState);
    this.bufferedBackendState = undefined;

    this.updateLocalState(
      threeWayMergeObjs(
        this.getLocalObjJson(),
        this.backendState,
        replicatedState
      )
    );
  }

  private updateLocalState(newLocalState: ObjJson) {
    this.localState = newLocalState;
    setObjData(this.objSpaceId, this.objId, newLocalState);
  }

  private getLocalObjJson(): ObjJson {
    if (this.localState === undefined) {
      throw new InternalError();
    }

    return this.localState;
  }

  // For test purpose only.
  isRequestInFlight() {
    return this.replicationActive;
  }
}

function isEqualState(stateA: ObjJson | undefined, stateB: ObjJson) {
  return isEmpty(diffObjJson(stateA, stateB));
}

function newerState(stateA: ObjJson, stateB: ObjJson | undefined) {
  if (!stateB) return stateA;

  if (compareStates(stateA, stateB) > 0) return stateA;

  return stateB;
}

function compareStates(stateA: ObjJson, stateB: ObjJson) {
  return strCompare(stateA._version, stateB._version);
}

function strCompare(str1?: string, str2?: string) {
  if (str1 !== undefined && str2 !== undefined) {
    if (str1 > str2) return 1;

    if (str2 > str1) return -1;
  }

  return 0;
}
