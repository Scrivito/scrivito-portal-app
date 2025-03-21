import { ObjSpaceId } from 'scrivito_sdk/client';
import { InternalError, ScrivitoError } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';
import { BasicObj } from 'scrivito_sdk/models';
import { failIfFrozen } from 'scrivito_sdk/state';
import { getObjFrom } from './basic_scope_get_methods';
import {
  currentObjSpaceId,
  isCurrentWorkspacePublished,
} from './current_workspace_id';
import { objSpaceScope } from './obj_scope';

export interface CopyObjHandler {
  copyObj(params: {
    fromObjId: string;
    fromObjSpaceId: ObjSpaceId;
    toObjSpaceId: ObjSpaceId;
  }): Promise<string>;
}

let copyObjHandler: CopyObjHandler | undefined;

export function setCopyObjHandler(handler: CopyObjHandler | undefined): void {
  copyObjHandler = handler;
}

export async function copyObjViaHandler(fromObj: BasicObj): Promise<BasicObj> {
  if (isCurrentWorkspacePublished()) {
    throw new ScrivitoError('The published content cannot be modified.');
  }
  failIfFrozen('Changing CMS content');
  if (!copyObjHandler) throw new InternalError();

  const toObjSpaceId = currentObjSpaceId();

  const newObjId = await copyObjHandler.copyObj({
    fromObjId: fromObj.id(),
    fromObjSpaceId: fromObj.objSpaceId(),
    toObjSpaceId,
  });

  const newObj = await load(() =>
    getObjFrom(objSpaceScope(toObjSpaceId), newObjId)
  );
  if (!newObj) throw new InternalError();

  return newObj;
}
