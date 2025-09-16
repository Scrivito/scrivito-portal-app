import { ObjJson } from 'scrivito_sdk/client';
import { Streamable } from 'scrivito_sdk/common';
import { ObjReplicationMessage } from 'scrivito_sdk/data';

export interface ObjReplication {
  start(): void;
  notifyLocalState(localState: ObjJson): void;
  notifyBackendState(newBackendState: ObjJson): void;
  finishSaving(): Promise<void>;
  finishReplicating(): Promise<void>;
  replicationMessageStream(): Streamable<ObjReplicationMessage>;
}
