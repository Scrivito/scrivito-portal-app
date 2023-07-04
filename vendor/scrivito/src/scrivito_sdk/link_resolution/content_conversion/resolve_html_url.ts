// @rewire
import { escape, unescape } from 'underscore';
import * as URI from 'urijs';

import { resolveUrl } from 'scrivito_sdk/link_resolution/resolve_url';

export function resolveHtmlUrl(encodedUrl: string): string | null {
  const url = unescape(encodedUrl);
  const internalUrl = resolveUrl(url);

  if (!internalUrl) return null;

  const newUrl = new URI(`objid:${internalUrl.obj_id}`);
  if (internalUrl.fragment) {
    newUrl.fragment(internalUrl.fragment);
  }
  if (internalUrl.query) {
    newUrl.query(internalUrl.query);
  }

  return escape(newUrl.href());
}
