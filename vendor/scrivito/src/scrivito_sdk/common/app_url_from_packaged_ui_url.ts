/**
 * Return an app URL, if the original uiUrl references a packaged UI URL.
 * Otherwise return null.
 * */
export function appUrlFromPackagedUiUrl(uiUrl: string): string | null {
  const url = new URL(uiUrl);

  const pathname = url.pathname.replace(/^(\/scrivito(?=\/|$))+/i, '');

  if (pathname === url.pathname) return null;

  url.pathname = pathname;
  return url.href;
}
