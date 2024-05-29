import { basicNavigateTo } from 'scrivito_sdk/app_support/basic_navigate_to';
import {
  HistoryState,
  getHistoryState,
} from 'scrivito_sdk/app_support/browser_location';
import { redirectToUrl } from 'scrivito_sdk/app_support/change_location';
import { currentAppSpace } from 'scrivito_sdk/app_support/current_app_space';
import { SiteData } from 'scrivito_sdk/app_support/current_page_data';
import {
  Route,
  isDestinationUnavailableRecognized,
  recognize,
} from 'scrivito_sdk/app_support/routing';
import { InternalError, onReset } from 'scrivito_sdk/common';
import {
  LoadableData,
  LoadableState,
  loadAndObserve,
  loadableWithDefault,
} from 'scrivito_sdk/loadable';
import { getObjFrom, restrictToSiteAndGlobal } from 'scrivito_sdk/models';
import { isBinaryBasicObj } from 'scrivito_sdk/realm';
import { createStateContainer } from 'scrivito_sdk/state';

export interface NavigationState {
  historyState: HistoryState;
  locationRoute: Route;
}

export function getCurrentNavigationState(): NavigationState | undefined {
  return loadableNavigationState.get();
}

let forceNotResponsible = false;

export function forceNavigationStateNotResponsible() {
  forceNotResponsible = true;
  loadableNavigationState.reset();
}

function calculateNavigationState(): NavigationState | string {
  if (forceNotResponsible) {
    return {
      historyState: getHistoryState(),
      locationRoute: { sitePath: null },
    };
  }

  const historyState = getHistoryState();
  const locationRoute = recognizeLocation(historyState.location);

  if (typeof locationRoute === 'string') return locationRoute;

  return {
    historyState,
    locationRoute,
  };
}

function handleRedirectToBinary(
  maybeBinaryUrl: NavigationState | string
): maybeBinaryUrl is NavigationState {
  if (typeof maybeBinaryUrl === 'string') {
    redirectToUrl(maybeBinaryUrl);

    return false;
  }

  return true;
}

function recognizeLocation(location: string) {
  const route = recognize(location);

  if (isDestinationUnavailableRecognized(route)) {
    // the browser location can never be DestinationUnavailable
    throw new InternalError();
  }

  if (!route.objId) return route;

  const obj = getObjFrom(
    currentAppSpace().and(restrictToSiteAndGlobal(route.siteData.siteId)),
    route.objId
  );

  if (!obj) return { ...route, objId: undefined };

  if (isBinaryBasicObj(obj)) {
    return obj.get('blob', ['binary'])?.url() ?? { ...route, objId: undefined };
  }

  return route;
}

const navigationState = createStateContainer<LoadableState<NavigationState>>();

const loadableNavigationState = new LoadableData({
  state: navigationState,
  stream: loadAndObserve(calculateNavigationState)
    .filter(handleRedirectToBinary)
    .filter(handleMovedCurrentPage),
});

let lastNavigationState: NavigationState | undefined;

function handleMovedCurrentPage(newState: NavigationState) {
  const movedCurrentPage = loadableWithDefault(
    null,
    () =>
      lastNavigationState &&
      detectMovedCurrentPage(lastNavigationState, newState)
  );

  if (movedCurrentPage) {
    // the current page moved to a different URL
    // (e.g. because the permalink was edited in the UI),
    // try to heal the situation by navigating to the Objs new URL.
    basicNavigateTo({ objId: movedCurrentPage.id() });

    return false;
  }

  lastNavigationState = newState;

  return true;
}

function detectMovedCurrentPage(
  oldState: NavigationState,
  newState: NavigationState
) {
  return (
    // if the browser URL is unchanged
    newState.historyState.location === oldState.historyState.location &&
    // and was previously recognized as a page
    oldState.locationRoute.objId &&
    // but now suddenly turns into "404"
    !newState.locationRoute.objId &&
    // then consider the page to have "moved" (assuming it still exists)
    getObjFrom(currentAppSpace(), oldState.locationRoute.objId)
  );
}

// For test purposes only
export function setRecognizedSiteId({
  siteData,
  historyChangesCount,
}: {
  siteData: SiteData;
  historyChangesCount: number;
}): void {
  const historyState = {
    historyChangesCount,
    isRevisit: false,
    location: '',
  };
  const meta =
    historyChangesCount === -1
      ? {}
      : {
          version: historyChangesCount,
        };

  navigationState.set({
    meta,
    value: {
      historyState,
      locationRoute: {
        siteData,
        sitePath: null,
      },
    },
  });
}

// For test purposes only
export function resetRecognizedSiteId(): void {
  navigationState.clear();
}

onReset(() => {
  forceNotResponsible = false;
  resetRecognizedSiteId();
});
