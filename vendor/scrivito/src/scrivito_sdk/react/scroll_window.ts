import { isCurrentHistoryState } from 'scrivito_sdk/app_support/browser_location';
import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import {
  isNotResponsibleRoute,
  isObjNotFoundRoute,
} from 'scrivito_sdk/app_support/routing';
import { onReset, scrollTo } from 'scrivito_sdk/common';

let previousNavigationState: NavigationState | undefined;

export function notifyScrollWindow(navigationState: NavigationState) {
  if (!isCurrentHistoryState(navigationState.historyState)) return;

  if (shouldScroll(navigationState)) scrollTo(0, 0);
  previousNavigationState = navigationState;
}

function shouldScroll(currentNavigationState: NavigationState): boolean {
  if (currentNavigationState.historyState.historyChangesCount === 0) {
    return false;
  }

  if (currentNavigationState.historyState.isRevisit) return false;

  const hasFragment =
    currentNavigationState.historyState.location.indexOf('#') !== -1;

  if (hasFragment) return false;

  const route = currentNavigationState.locationRoute;
  if (isObjNotFoundRoute(route)) return true;
  if (isNotResponsibleRoute(route)) return false;

  return (
    currentNavigationState.historyState.historyChangesCount !==
    previousNavigationState?.historyState.historyChangesCount
  );
}

onReset(() => (previousNavigationState = undefined));
