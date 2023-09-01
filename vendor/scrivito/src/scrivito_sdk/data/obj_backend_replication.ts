import isEmpty from 'lodash-es/isEmpty';

import { ObjSpaceId, getWorkspaceId } from 'scrivito_sdk/client';
import {
  ObjJson,
  cmsRestApi,
  isUnavailableObjJson,
  retrieveObj,
} from 'scrivito_sdk/client';
import {
  Deferred,
  InternalError,
  ScrivitoPromise,
  nextTick,
  throttle,
} from 'scrivito_sdk/common';
import { isObjReplicationDisabled } from 'scrivito_sdk/data/disable_obj_replication';
import { setObjData } from 'scrivito_sdk/data/obj_data_store';
import {
  ObjJsonPatch,
  diffObjJson,
  patchObjJson,
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

  start() {
    retrieveObj(this.objSpaceId, this.objId, 'full').then((data) => {
      addBatchUpdate(() => {
        this.notifyBackendState(data);
      });
    });
  }

  notifyLocalState(localState: ObjJson) {
    if (isObjReplicationDisabled()) return;

    if (isEqualState(this.localState, localState)) return;

    this.localState = localState;
    this.startReplication();
  }

  notifyBackendState(newBackendState: ObjJson) {
    if (!this.localState) {
      this.backendState = newBackendState;
      this.updateLocalState(newBackendState);
      return;
    }

    const newestKnownBackendState =
      this.bufferedBackendState || this.backendState;
    if (
      !newestKnownBackendState ||
      compareStates(newBackendState, newestKnownBackendState) > 0
    ) {
      if (this.replicationActive) {
        this.bufferedBackendState = newBackendState;
      } else {
        if (isUnavailableObjJson(newBackendState)) {
          this.updateLocalState(newBackendState);
        } else {
          this.updateLocalState(
            patchObjJson(
              this.localState,
              diffObjJson(this.backendState, newBackendState)
            )
          );
        }
        this.backendState = newBackendState;
      }
    }
  }

  finishSaving(): Promise<void> {
    let finishSavingPromise;

    if (this.nextRequestDeferred) {
      finishSavingPromise = this.nextRequestDeferred.promise;
    } else if (this.currentRequestDeferred) {
      finishSavingPromise = this.currentRequestDeferred.promise;
    } else {
      return ScrivitoPromise.resolve();
    }

    return finishSavingPromise.catch(() => ScrivitoPromise.reject());
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

  private performReplication() {
    const localState = this.getLocalObjJson();

    this.scheduledReplication = false;
    this.replicationActive = true;

    this.replicateLocalStateToBackend(localState).then(
      (backendState) => {
        this.handleBackendUpdate(localState, backendState);
        this.currentRequestDeferred!.resolve();
        this.currentRequestDeferred = undefined;
        this.replicationActive = false;

        this.startReplication();
      },
      (error) => {
        this.currentRequestDeferred!.reject(error);
        this.currentRequestDeferred = undefined;
        this.replicationActive = false;
      }
    );
  }

  private replicateLocalStateToBackend(localState: ObjJson): Promise<ObjJson> {
    const patch = diffObjJson(this.backendState, localState);

    return isEmpty(patch)
      ? // bang:
        // given the localState is not blank, the diff may be empty only if the
        // backendState is similar (equal?) to the localState, i.e. not blank
        ScrivitoPromise.resolve(this.backendState!)
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
      patchObjJson(
        this.backendState,
        diffObjJson(replicatedState, this.getLocalObjJson())
      )
    );
  }

  private updateLocalState(localState: ObjJson) {
    this.localState = localState;
    setObjData(this.objSpaceId, this.objId, localState);
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
