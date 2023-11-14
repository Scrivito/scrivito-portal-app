import {
  ObjJson,
  getWorkspaceChanges,
  isUnavailableObjJson,
} from 'scrivito_sdk/client';
import {
  InternalError,
  ScrivitoPromise,
  promiseAndFinally,
} from 'scrivito_sdk/common';
import { objReplicationPool } from 'scrivito_sdk/data';
import { invalidateAllLoadedObjsIn } from 'scrivito_sdk/data/obj_data';
import { StateContainer } from 'scrivito_sdk/state';

export class WorkspaceContentUpdater {
  private initialization: Promise<void> | undefined;
  private updating?: Promise<void>;

  constructor(
    private readonly workspaceId: string,
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

  updateContent(): Promise<void> {
    if (this.updating) return this.updating;

    const from = this.getContentStateId();

    if (!from) return ScrivitoPromise.resolve();

    this.updating = promiseAndFinally(
      getWorkspaceChanges(this.workspaceId, from).then(
        ({ to, current, objs }) => {
          if (objs === '*' || (to && to !== current)) {
            // the backend was unable to send the complete list of changes
            // (for whatever reason)
            invalidateAllLoadedObjsIn(['workspace', this.workspaceId]);
          } else if (Array.isArray(objs)) {
            this.applyChanges(objs);
          }

          this.setContentStateId(current);
        }
      ),
      () => {
        this.updating = undefined;
      }
    );

    return this.updating;
  }

  private applyChanges(objs: ObjJson[]): void {
    objs.forEach((json) => {
      const objId = isUnavailableObjJson(json) ? json._deleted : json._id;
      const objReplication = objReplicationPool.get(
        ['workspace', this.workspaceId],
        objId
      );
      objReplication.notifyBackendState(json);
    });
  }

  private initializeContentStateId(): Promise<void> {
    if (this.getContentStateId()) return ScrivitoPromise.resolve();

    return getWorkspaceChanges(this.workspaceId).then((response) => {
      this.setContentStateId(response.current);
    });
  }

  private getContentStateId() {
    return this.contentState.get();
  }

  private setContentStateId(value: string) {
    this.contentState.set(value);
  }
}
