// @rewire
import { InternalError } from 'scrivito_sdk/common';

export type ResolvedUrl = RecognizedUrl | null;

interface RecognizedUrl {
  obj_id: string;
  query?: string;
  fragment?: string;
}

export function resolveUrl(url: string): Readonly<ResolvedUrl> {
  if (!urlResolutionHandler) throw new InternalError();

  return urlResolutionHandler(url);
}

type UrlResolutionHandler = (url: string) => ResolvedUrl;

let urlResolutionHandler: UrlResolutionHandler | undefined;

export function setUrlResolutionHandler(handler: UrlResolutionHandler) {
  urlResolutionHandler = handler;
}
