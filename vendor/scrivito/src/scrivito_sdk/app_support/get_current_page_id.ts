// @rewire
import { getCurrentNavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { loadableWithDefault } from 'scrivito_sdk/loadable';

export function getCurrentPageId(): string | undefined {
  return loadableWithDefault(
    undefined,
    () => getCurrentNavigationState()?.locationRoute?.objId
  );
}
