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
import { observeWritingPromise } from 'scrivito_sdk/data/active_writes';
import { isObjReplicationDisabled } from 'scrivito_sdk/data/disable_obj_replication';
import { setObjData } from 'scrivito_sdk/data/obj_data_store';
import {
  ObjJsonPatch,
  diffObjJson,
  threeWayMergeObjs,
} from 'scrivito_sdk/data/obj_patch';
import { ObjReplication } from 'scrivito_sdk/data/obj_replication';
import { ObservedValue } from 'scrivito_sdk/data/observed_value';
import { getPublishedWriteHandler } from 'scrivito_sdk/data/published_write_handler';
import { ReactiveAny } from 'scrivito_sdk/data/reactive_any';
import { addBatchUpdate, createStateContainer } from 'scrivito_sdk/state';

const unreplicatedObjs = new ReactiveAny();

export function hasAnyPendingChanges(): boolean {
  return unreplicatedObjs.isAnyTrue();
}

type ErrorHandler = (error: Error) => void;
let replicationErrorHandler: ErrorHandler | undefined;

export function setReplicationErrorHandler(handler: ErrorHandler): void {
  replicationErrorHandler = handler;
}

export class ObjBackendReplication implements ObjReplication {
  private readonly replicationActiveState = createStateContainer<boolean>();
  private readonly replicationActive = new ObservedValue<boolean>(
    (_oldValue, newValue) => this.replicationActiveState.set(newValue),
  );

  private readonly isUnreplicatedState = createStateContainer<boolean>();
  private readonly isUnreplicated = new ObservedValue<boolean>(
    (oldValue, newValue) => {
      this.isUnreplicatedState.set(newValue);
      unreplicatedObjs.memberChanged(oldValue, newValue);
    },
  );

  private readonly localState: ObservedValue<ObjJson>;
  private readonly backendState: ObservedValue<ObjJson>;
  private scheduledReplication: boolean;
  private currentRequestDeferred?: Deferred<void>;
  private nextRequestDeferred?: Deferred<void>;
  private performThrottledReplication: () => void;

  private bufferedBackendState?: ObjJson;

  constructor(
    private readonly objSpaceId: ObjSpaceId,
    private readonly objId: string,
  ) {
    this.scheduledReplication = false;
    this.performThrottledReplication = throttle(
      () => this.performReplication(),
      1000,
    );

    const updateUnreplicated = () =>
      this.isUnreplicated.set(
        !isEqualState(this.backendState.get(), this.localState.get()),
      );

    this.localState = new ObservedValue(updateUnreplicated);
    this.backendState = new ObservedValue(updateUnreplicated);
  }

  async start() {
    const data = await retrieveObj(this.objSpaceId, this.objId, 'full');
    addBatchUpdate(() => {
      this.notifyBackendState(data);
    });
  }

  notifyLocalState(localState: ObjJson) {
    if (isObjReplicationDisabled()) return;

    if (isEqualState(this.localState.get(), localState)) return;

    this.localState.set(localState);

    if (this.shouldAutoReplicate()) this.startReplication();
  }

  notifyBackendState(notifiedBackendState: ObjJson) {
    if (!this.localState.get()) {
      // if we don't have a local state yet, we accept any backend state as-is
      this.backendState.set(notifiedBackendState);
      this.updateLocalState(notifiedBackendState);
      return;
    }

    const newestKnownBackendState =
      this.bufferedBackendState || this.backendState.get();
    if (
      newestKnownBackendState &&
      compareStates(newestKnownBackendState, notifiedBackendState) > 0
    ) {
      // The notified state is older than the one we know, so we ignore it.
      return;
    }

    if (this.replicationActive.get()) {
      // during replication, the algorithm can't integrate new backend states
      // buffer the new state. it will be applied when the replication finishes
      this.bufferedBackendState = notifiedBackendState;
      return;
    }

    this.updateLocalState(
      threeWayMergeObjs(
        notifiedBackendState,
        this.localState.get(),
        this.backendState.get(),
      ),
    );
    this.backendState.set(notifiedBackendState);
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

  async replicateNow(): Promise<void> {
    if (this.localState.get() === undefined) return;

    this.startReplication();

    return this.finishSaving();
  }

  discardPendingChanges(): void {
    if (this.replicationActive.get()) {
      throw new InternalError();
    }

    const backendState = this.backendState.get();
    if (backendState === undefined) return;
    if (isEqualState(this.localState.get(), backendState)) return;

    this.updateLocalState(backendState);
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

  getBackendState(): ObjJson | undefined {
    return this.backendState.get();
  }

  // For test purposes
  getLocalState() {
    return this.localState.get();
  }

  private updateLocalState(newLocalState: ObjJson) {
    this.localState.set(newLocalState);
    setObjData(this.objSpaceId, this.objId, newLocalState);
  }

  private shouldAutoReplicate(): boolean {
    return getWorkspaceId(this.objSpaceId) !== 'published';
  }

  private startReplication() {
    if (!isEqualState(this.backendState.get(), this.getLocalObjJson())) {
      if (!this.replicationActive.get()) {
        if (!this.scheduledReplication) {
          this.scheduledReplication = true;
          this.initDeferredForRequest();

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          observeWritingPromise(this.currentRequestDeferred!.promise);
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
    this.replicationActive.set(true);

    try {
      const backendState = await this.replicateLocalStateToBackend(localState);
      this.handleBackendUpdate(localState, backendState);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.currentRequestDeferred!.resolve();
      this.currentRequestDeferred = undefined;
      this.replicationActive.set(false);

      if (this.shouldAutoReplicate()) this.startReplication();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      replicationErrorHandler?.(error);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.currentRequestDeferred!.reject(error);
      this.currentRequestDeferred = undefined;
      this.replicationActive.set(false);
    }
  }

  private async replicateLocalStateToBackend(
    localState: ObjJson,
  ): Promise<ObjJson> {
    const patch = diffObjJson(this.backendState.get(), localState);

    return isEmpty(patch)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- given the localState is not blank, the diff may be empty only if the backendState is similar (equal?) to the localState, i.e. not blank
        Promise.resolve(this.backendState.get()!)
      : this.replicatePatchToBackend(patch);
  }

  private async replicatePatchToBackend(patch: ObjJsonPatch): Promise<ObjJson> {
    const workspaceId = getWorkspaceId(this.objSpaceId);

    if (workspaceId !== 'published') {
      return cmsRestApi.put(`workspaces/${workspaceId}/objs/${this.objId}`, {
        obj: patch,
      }) as Promise<ObjJson>;
    }

    const handler = getPublishedWriteHandler();
    if (!handler) {
      throw new InternalError(
        `Unexpected backend replication for workspace ${workspaceId}`,
      );
    }

    await handler(this.objId, patch);

    return retrieveObj(this.objSpaceId, this.objId, 'full');
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
    this.backendState.set(newerState(backendState, this.bufferedBackendState));
    this.bufferedBackendState = undefined;

    this.updateLocalState(
      threeWayMergeObjs(
        this.getLocalObjJson(),
        this.backendState.get(),
        replicatedState,
      ),
    );
  }

  private getLocalObjJson(): ObjJson {
    if (this.localState.get() === undefined) {
      throw new InternalError();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.localState.get()!;
  }

  hasPendingChanges(): boolean {
    return this.isUnreplicatedState.get() ?? false;
  }

  isReplicating(): boolean {
    return this.replicationActiveState.get() ?? false;
  }
}

function isEqualState(
  stateA: ObjJson | undefined,
  stateB: ObjJson | undefined,
) {
  return (
    stateA === stateB ||
    (!!stateA && !!stateB && isEmpty(diffObjJson(stateA, stateB)))
  );
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
