import { loadContentDump } from 'scrivito_sdk/app_support/content_dump';
import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { isUserLoggedIn } from 'scrivito_sdk/app_support/current_user';
import { isVisitorAuthenticationEnabled } from 'scrivito_sdk/app_support/visitor_authentication';
import { load } from 'scrivito_sdk/loadable';

/**
 * tries to pre-warm the CMS cache using a preloadDump.
 * @public
 */
export async function preload(
  preloadDump: string
): Promise<{ dumpLoaded: boolean }> {
  if (isVisitorAuthenticationEnabled()) return { dumpLoaded: false };

  const dumpLoaded = !isUserLoggedIn();
  if (dumpLoaded) loadContentDump(preloadDump);

  await load(currentPage);
  return { dumpLoaded };
}
