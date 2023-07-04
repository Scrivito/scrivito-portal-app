// @rewire
import * as URI from 'urijs';
import {
  getCurrentPageData,
  getCurrentRoute,
} from 'scrivito_sdk/app_support/current_page_data';
import {
  ContextContainer,
  QueryParameters,
  ScrivitoError,
  checkArgumentsFor,
} from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { ObjType } from 'scrivito_sdk/models';
import { Obj, wrapInAppClass } from 'scrivito_sdk/realm';

/** @public */
export function currentPage(): Obj | null {
  assertNotUsingInMemoryTenant('Scrivito.currentPage');

  const page = getCurrentPageData()?.currentPage;
  return page ? wrapInAppClass(page) : null;
}

/** @public */
export function isCurrentPage(page: Obj): boolean {
  assertNotUsingInMemoryTenant('Scrivito.isCurrentPage');

  checkArgumentsFor('isCurrentPage', [['page', ObjType]], {
    docPermalink: 'js-sdk/isCurrentPage',
  })(page);

  return currentPage()?.id() === page.id();
}

/** @public */
export function currentPageParams(): QueryParameters {
  assertNotUsingInMemoryTenant('Scrivito.currentPageParams');

  return URI.parseQuery(getCurrentRoute()?.query || '');
}

const currentSiteContext = new ContextContainer<string>();
const forbiddenSiteContext = new ContextContainer<string>();

/** @public */
export function currentSiteId(): string | null {
  const errorMessage = forbiddenSiteContext.current();
  if (errorMessage) throw new ScrivitoError(errorMessage);

  return (
    currentSiteContext.current() ?? getCurrentRoute()?.siteData?.siteId ?? null
  );
}

export function withDefaultSiteContext<T>(fn: () => T): T {
  return currentSiteContext.runWith('default', fn);
}

export function withForbiddenSiteContext<T>(message: string, fn: () => T): T {
  return forbiddenSiteContext.runWith(message, fn);
}
