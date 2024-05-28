import { generateContentDump } from 'scrivito_sdk/app_support/content_dump';
import { withCurrentPageContext } from 'scrivito_sdk/app_support/current_page_data';
import { ensureRoutingDataAvailable } from 'scrivito_sdk/app_support/routing';
import { usePrerenderScaling } from 'scrivito_sdk/app_support/scale_down_binary';
import { baseUrlForSite } from 'scrivito_sdk/app_support/site_mapping';
import { getWorkspaceId } from 'scrivito_sdk/client';
import {
  ArgumentError,
  ScrivitoError,
  checkArgumentsFor,
  tcomb as t,
} from 'scrivito_sdk/common';
import {
  assertNotUsingInMemoryTenant,
  getContentStateId,
  trackContentStateId,
} from 'scrivito_sdk/data';
import { disableExternalDataLoading } from 'scrivito_sdk/data_integration';
import { load, reportUsedData } from 'scrivito_sdk/loadable';
import { BasicObj, ObjType, currentObjSpaceId } from 'scrivito_sdk/models';
import { Obj, unwrapAppClass } from 'scrivito_sdk/realm';

export interface RenderResult<T> {
  result: T;
  preloadDump: string;
}

/** @public */
export function renderPage<T>(
  obj: Obj,
  render: () => T
): Promise<RenderResult<T>>;

/** @internal */
export function renderPage<T>(
  obj: Obj,
  render: () => T,
  ...excessArgs: never[]
): Promise<RenderResult<T>> {
  assertNotUsingInMemoryTenant('Scrivito.renderPage');
  checkRenderPage(obj, render, ...excessArgs);

  const objSpaceId = currentObjSpaceId();
  const page = unwrapAppClass(obj);
  const workspaceId = getWorkspaceId(objSpaceId);

  ensureSiteIsPresent(page, ArgumentError);

  return trackContentStateId(workspaceId).then(() => {
    const contentStateId = getContentStateId(objSpaceId);
    const siteId = ensureSiteIsPresent(page);

    return load(() =>
      reportUsedData(() =>
        disableExternalDataLoading(() => {
          const baseUrl = baseUrlForSite(siteId);
          if (!baseUrl) {
            throw new ScrivitoError(
              `The obj "${page.id()}" cannot be rendered because the baseUrlForSite callback did not return a URL for its site "${siteId}".`
            );
          }

          // ID is currently good enough.
          // no need for a vanity path with slug or permalink
          const sitePath = `/${page.id()}`;

          return withCurrentPageContext(
            { page, siteId, baseUrl, sitePath },
            () => {
              ensureRoutingDataAvailable(page);

              return usePrerenderScaling(render);
            }
          );
        })
      )
    ).then(({ result, usedData }) => {
      return {
        result,
        preloadDump: generateContentDump(usedData, contentStateId),
      };
    });
  });
}

function ensureSiteIsPresent(page: BasicObj, errorClass = ScrivitoError) {
  const siteId = page.siteId();
  if (siteId) return siteId;

  throw new errorClass(
    `The obj "${page.id()}" cannot be rendered because it does not have a site ID.`
  );
}

const checkRenderPage = checkArgumentsFor(
  'renderPage',
  [
    ['page', ObjType],
    ['render', t.Function],
  ],
  {
    docPermalink: 'js-sdk/renderPage',
  }
);
