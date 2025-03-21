import { currentAppSpace } from 'scrivito_sdk/app_support/current_app_space';
import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { Route, isObjNotFoundRoute } from 'scrivito_sdk/app_support/routing';
import { ContextContainer } from 'scrivito_sdk/common';
import { loadableWithDefault } from 'scrivito_sdk/loadable';
import { BasicObj, getObjFrom } from 'scrivito_sdk/models';

export type PageData = PageDataWithPage | PageDataWithoutPage;

interface PageDataWithoutPage {
  currentPage: undefined;
  navigationState: NavigationState;
}

export interface PageDataWithPage {
  currentPage: BasicObj;
  navigationState: NavigationState;
}

export interface SiteData {
  siteId: string;
  baseUrl: string;
}

type NavigationStateProvider = () => NavigationState | undefined;
let getCurrentNavigationState: NavigationStateProvider = () => undefined;

export function setNavigationStateProvider(provider: NavigationStateProvider) {
  getCurrentNavigationState = provider;
}

const navigationContext = new ContextContainer<NavigationState>();

export function getCurrentPageData(): PageData | undefined {
  return loadableWithDefault(undefined, () => {
    const navigationState =
      navigationContext.current() ?? getCurrentNavigationState();
    if (!navigationState) return undefined;

    const route = navigationState.locationRoute;
    if (route.objId) {
      const currentPage = getObjFrom(currentAppSpace(), route.objId);
      if (!currentPage) {
        // Not found (page disappeared meanwhile)
        return {
          navigationState: {
            ...navigationState,
            locationRoute: { ...route, objId: undefined },
          },
        };
      }

      return { navigationState, currentPage };
    }

    return { navigationState };
  });
}

export function getCurrentRoute(): Route | undefined {
  const navigationState =
    navigationContext.current() ??
    loadableWithDefault(undefined, getCurrentNavigationState);

  return navigationState?.locationRoute;
}

interface CurrentPageContext {
  page: BasicObj;
  sitePath: string;
  siteId: string;
  baseUrl: string;
}

export function withCurrentPageContext<T>(
  context: CurrentPageContext,
  fn: () => T
): T {
  return navigationContext.runWith(
    {
      locationRoute: {
        objId: context.page.id(),
        sitePath: context.sitePath,
        siteData: {
          siteId: context.siteId,
          baseUrl: context.baseUrl,
        },
      },
      historyState: {
        historyChangesCount: 0,
        location: `${context.baseUrl}${context.sitePath}`,
        isRevisit: false,
      },
    },
    fn
  );
}

export function getNotFoundErrorPageState(): NavigationState | undefined {
  if (navigationContext.current()) return;

  const navigationState = getCurrentPageData()?.navigationState;

  if (!navigationState) return;
  if (!isObjNotFoundRoute(navigationState.locationRoute)) return;

  return navigationState;
}
