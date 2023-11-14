import { loadContentDump } from 'scrivito_sdk/app_support/content_dump';
import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { isVisitorAuthenticationEnabled } from 'scrivito_sdk/app_support/visitor_authentication';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';

/**
 * tries to pre-warm the CMS cache using a preloadDump.
 * @public
 */
export async function preload(
  preloadDump: string
): Promise<{ dumpLoaded: boolean }>;

/** @internal */
export async function preload(
  preloadDump: string,
  ...excessArgs: never[]
): Promise<{ dumpLoaded: boolean }> {
  checkPreload(preloadDump, ...excessArgs);

  let dumpLoaded = false;
  if (isVisitorAuthenticationEnabled()) return { dumpLoaded };

  if (!uiAdapter) {
    loadContentDump(preloadDump);
    dumpLoaded = true;
  }

  await preloadCurrentPage();

  return { dumpLoaded };
}

function preloadCurrentPage() {
  return load(() => {
    currentPage();
  });
}

const checkPreload = checkArgumentsFor('preload', [['preloadDump', t.String]], {
  docPermalink: 'js-sdk/preload',
});
