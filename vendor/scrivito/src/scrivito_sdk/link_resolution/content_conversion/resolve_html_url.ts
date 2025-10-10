// @rewire
import escape from 'lodash-es/escape';
import unescape from 'lodash-es/unescape';

import { resolveUrl } from 'scrivito_sdk/link_resolution/resolve_url';

export function resolveHtmlUrl(encodedUrl: string): string | null {
  const url = unescape(encodedUrl);
  const internalUrl = resolveUrl(url);

  if (!internalUrl) return null;

  const { fragment, obj_id, query } = internalUrl;

  const search = query ? `?${query}` : '';
  const hash = fragment ? `#${fragment}` : '';

  return escape(`objid:${obj_id}${search}${hash}`);
}
