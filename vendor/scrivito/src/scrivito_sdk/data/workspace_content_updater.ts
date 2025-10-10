import {
  ObjJson,
  WorkspaceObjSpaceId,
  getWorkspaceChanges,
  isUnavailableObjJson,
} from 'scrivito_sdk/client';
import { InternalError, promiseAndFinally } from 'scrivito_sdk/common';
import { objReplicationPool } from 'scrivito_sdk/data';
import { invalidateAllLoadedObjsIn } from 'scrivito_sdk/data/obj_data';
import { StateContainer } from 'scrivito_sdk/state';

export class WorkspaceContentUpdater {
  private initialization: Promise<void> | undefined;
  private updating?: Promise<void>;

  constructor(
    private readonly objSpace: WorkspaceObjSpaceId,
    private readonly contentState: StateContainer<string>
  ) {}

  setContentStateIdOrThrowIfTracking(contentStateId: string): void {
    if (this.initialization) {
      // Cannot (re)set content state id after trackContentStateId
      throw new InternalError();
    }
    this.setContentStateId(contentStateId);
  }

  trackContentStateId(): Promise<void> {
    if (!this.initialization) {
      this.initialization = this.initializeContentStateId();
    }

    return this.initialization;
  }

  async updateContent(): Promise<void> {
    if (this.updating) return this.updating;

    const from = this.getContentStateId();
    if (!from) return;

    this.updating = promiseAndFinally(
      (async () => {
        const { to, current, objs } = await getWorkspaceChanges(
          this.objSpace,
          from
        );
        if (objs === '*' || (to && to !== current)) {
          // the backend was unable to send the complete list of changes
          // (for whatever reason)
          invalidateAllLoadedObjsIn(this.objSpace);
        } else if (Array.isArray(objs)) {
          this.applyChanges(objs);
        }

        this.setContentStateId(current);
      })(),
      () => {
        this.updating = undefined;
      }
    );

    return this.updating;
  }

  private applyChanges(objs: ObjJson[]): void {
    objs.forEach((json) => {
      const objId = isUnavailableObjJson(json) ? json._deleted : json._id;
      const objReplication = objReplicationPool.get(this.objSpace, objId);
      objReplication.notifyBackendState(json);
    });
  }

  private async initializeContentStateId(): Promise<void> {
    if (this.getContentStateId()) return;

    const response = await getWorkspaceChanges(this.objSpace);
    this.setContentStateId(response.current);
  }

  private getContentStateId() {
    return this.contentState.get();
  }

  private setContentStateId(value: string) {
    this.contentState.set(value);
  }
}
