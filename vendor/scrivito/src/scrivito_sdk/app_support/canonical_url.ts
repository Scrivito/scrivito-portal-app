import * as URI from 'urijs';

import * as BrowserLocation from 'scrivito_sdk/app_support/browser_location';
import {
  PageDataWithPage,
  getCurrentPageData,
} from 'scrivito_sdk/app_support/current_page_data';
import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { generateLocalPath } from 'scrivito_sdk/app_support/routing';
import { isPresent } from 'scrivito_sdk/common';
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

function switchToCanonicalUrl(pageData: PageDataWithPage): void {
  const location = pageData.navigationState.historyState.location;

  load(() => {
    if (BrowserLocation.get() !== location) return;

    return generateLocalPath(pageData.currentPage);
  }).then((canonicalPath) => {
    if (!canonicalPath) return;
    if (BrowserLocation.get() !== location) return;

    const locationUri = new URI(location);
    if (canonicalPath === locationUri.path()) return;

    BrowserLocation.replace(locationUri.path(canonicalPath).toString());
  });
}
