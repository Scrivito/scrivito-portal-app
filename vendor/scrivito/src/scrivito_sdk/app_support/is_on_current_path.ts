import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { checkArgumentsFor } from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { ObjType } from 'scrivito_sdk/models';
import { Obj } from 'scrivito_sdk/realm';

/** @public */
export function isOnCurrentPath(page: Obj): boolean {
  assertNotUsingInMemoryTenant('Scrivito.isOnCurrentPath');

  checkArgumentsFor('isOnCurrentPath', [['page', ObjType]], {
    docPermalink: 'js-sdk/isOnCurrentPath',
  })(page);

  const currentPath = currentPage()?.path();
  const path = page.path();

  if (!currentPath || !path || !currentPath.startsWith(path)) return false;
  if (currentPath === path || path === '/') return true;

  return currentPath.charAt(path.length) === '/';
}
