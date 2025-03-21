import * as URI from 'urijs';

/**
 * Return an app URL, if the original uiUrl references a packaged UI URL.
 * Otherwise return null.
 * */
export function appUrlFromPackagedUiUrl(uiUrl: string): string | null {
  const uri = new URI(uiUrl);
  let segment = uri.segment(0);
  if (!isScrivitoSegment(segment)) return null;

  while (isScrivitoSegment(segment)) {
    uri.segment(0, '');
    segment = uri.segment(0);
  }

  return uri.toString();
}

function isScrivitoSegment(segment?: string): boolean {
  return segment?.toLowerCase() === 'scrivito';
}
