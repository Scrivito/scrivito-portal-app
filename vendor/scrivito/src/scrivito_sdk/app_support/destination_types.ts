import { QueryParameters, buildQueryString } from 'scrivito_sdk/common';

export interface RemoteDestination {
  type: 'remote';
  url: string;
}

export interface LocalDestination {
  type: 'local';
  resource: string;
}

export interface CrossSiteDestination {
  type: 'crossSite';
  url: string;
}

export interface DestinationUnavailable {
  type: 'unavailable';
  fallbackUrl: string;
  objId: string;
}

export interface GenerateDestinationUnavailableParams {
  objId: string;
  query?: QueryParameters | string;
  hash?: string | null;
}

export function generateDestinationUnavailable(
  params: GenerateDestinationUnavailableParams
): DestinationUnavailable {
  return {
    type: 'unavailable',
    fallbackUrl: getDestinationUnavailableFallbackUrl(params),
    objId: params.objId,
  };
}

export interface RecognizedDestinationUnavailable {
  objId: string;
  query?: string;
  hash?: string;
}

export function recognizeDestinationUnavailable(
  fallbackUri: string
): RecognizedDestinationUnavailable | null {
  const fallbackUrl = new URL(fallbackUri, 'http://example.com');
  if (fallbackUrl.pathname !== '/') return null;

  const fallbackHash = fallbackUrl.hash;

  if (fallbackHash.indexOf('#SCRIVITO_UNAVAILABLE_') === 0) {
    const encodedParams = fallbackHash.substr('#SCRIVITO_UNAVAILABLE_'.length);
    const paramsUrl = new URL(encodedParams, 'http://example.com');

    const objId = paramsUrl.pathname.substring(1);
    const params: RecognizedDestinationUnavailable = { objId };

    if (paramsUrl.search) params.query = paramsUrl.search.substring(1);
    if (paramsUrl.hash) params.hash = paramsUrl.hash;

    return params;
  }

  return null;
}

function getDestinationUnavailableFallbackUrl({
  hash,
  objId,
  query,
}: GenerateDestinationUnavailableParams): string {
  const search = query
    ? `?${typeof query === 'string' ? query : buildQueryString(query)}`
    : '';

  return `#SCRIVITO_UNAVAILABLE_${objId}${search}${hash || ''}`;
}
