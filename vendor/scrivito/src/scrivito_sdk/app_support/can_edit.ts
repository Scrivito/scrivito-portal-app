import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { checkArgumentsFor } from 'scrivito_sdk/common';
import { loadWithDefault } from 'scrivito_sdk/loadable';
import { ObjType, currentWorkspaceId } from 'scrivito_sdk/models';
import { unwrapAppClass } from 'scrivito_sdk/realm';
import { Obj } from 'scrivito_sdk/realm/obj';

/** @public */
export function canEdit(obj: Obj): boolean {
  checkCanEditArguments(obj);
  return canEditObjWithId(unwrapAppClass(obj).id());
}

export function canEditObjWithId(objId: string): boolean {
  const ui = uiAdapter;
  if (!ui) return false;

  return (
    loadWithDefault(false, () => ui.canEdit(currentWorkspaceId(), objId)) ||
    false
  );
}

const checkCanEditArguments = checkArgumentsFor('canEdit', [['obj', ObjType]], {
  docPermalink: 'js-sdk/canEdit',
});
