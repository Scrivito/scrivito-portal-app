import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { isWrappingBasicObj } from 'scrivito_sdk/models';
import { Obj } from 'scrivito_sdk/realm';

/** @public */
export function isOnCurrentPath(page: Obj): boolean {
  assertNotUsingInMemoryTenant('Scrivito.isOnCurrentPath');
  checkIsOnCurrentPath(page);

  const currentPath = currentPage()?.path();
  const path = page.path();

  if (!currentPath || !path || !currentPath.startsWith(path)) return false;
  if (currentPath === path || path === '/') return true;

  return currentPath.charAt(path.length) === '/';
}

function checkIsOnCurrentPath(page: Obj) {
  if (!isWrappingBasicObj(page)) {
    throwInvalidArgumentsError(
      'isOnCurrentPath',
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: 'js-sdk/isOnCurrentPath' }
    );
  }
}
