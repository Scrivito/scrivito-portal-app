import * as BrowserLocation from 'scrivito_sdk/app_support/browser_location';
import {
  PageDataWithPage,
  getCurrentPageData,
} from 'scrivito_sdk/app_support/current_page_data';
import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { generateLocalPath } from 'scrivito_sdk/app_support/routing';
import { isPresent, urlResource } from 'scrivito_sdk/common';
import { capture, load } from 'scrivito_sdk/loadable';
import { observe } from 'scrivito_sdk/state';

export function init() {
  let lastState: NavigationState | undefined;

  observe(() => capture(getCurrentPageData).result)
    .filter(isPresent)
    .filter((pageData) => {
      if (!pageData.currentPage) return false;

      const currentState = pageData.navigationState;

      const isDifferent =
        lastState === undefined ||
        lastState.locationRoute.objId !== currentState.locationRoute.objId ||
        lastState.historyState.location !== currentState.historyState.location;

      lastState = currentState;

      return isDifferent;
    })
    .subscribe(switchToCanonicalUrl);
}

async function switchToCanonicalUrl(pageData: PageDataWithPage): Promise<void> {
  const location = pageData.navigationState.historyState.location;

  const canonicalPath = await load(() => {
    if (BrowserLocation.get() !== location) return;

    return generateLocalPath(pageData.currentPage);
  });

  if (!canonicalPath) return;
  if (BrowserLocation.get() !== location) return;

  const locationUrl = new URL(location, 'http://example.com');
  if (canonicalPath === locationUrl.pathname) return;

  locationUrl.pathname = canonicalPath;

  BrowserLocation.replace(urlResource(locationUrl));
}
