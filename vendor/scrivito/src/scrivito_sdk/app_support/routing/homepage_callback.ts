import { withDefaultSiteContext } from 'scrivito_sdk/app_support/current_page';
import { BasicObj } from 'scrivito_sdk/models';

type HomepageCallback = () => BasicObj | null;

let homepageCallback: HomepageCallback | undefined;

export function setHomepageCallback(callback?: HomepageCallback): void {
  homepageCallback = callback;
}

export function homepageFromCallback(): BasicObj | null {
  if (!homepageCallback) return null;

  // Because the (real) callback accesses the realm, and the realm requires a
  // site id to return any obj, a (reasonable) site id is forced.
  // Otherwise this would result in a circular call.
  return withDefaultSiteContext(homepageCallback);
}
