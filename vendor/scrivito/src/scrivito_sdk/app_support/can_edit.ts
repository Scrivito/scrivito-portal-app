import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { loadWithDefault } from 'scrivito_sdk/loadable';
import { currentWorkspaceId, isWrappingBasicObj } from 'scrivito_sdk/models';
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

function checkCanEditArguments(obj: Obj) {
  if (!isWrappingBasicObj(obj)) {
    throwInvalidArgumentsError(
      'canEdit',
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: 'js-sdk/canEdit' }
    );
  }
}
