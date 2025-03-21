import * as URI from 'urijs';
import { currentHref } from 'scrivito_sdk/common';

export function absoluteUrl(url: string): string {
  const uri = URI(url);
  if (uri.normalizeProtocol().protocol() === 'data') return url;
  return uri.absoluteTo(currentHref()).toString();
}
