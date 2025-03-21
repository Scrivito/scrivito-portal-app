import * as URI from 'urijs';

import { QueryParameters } from 'scrivito_sdk/common';

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
  fallbackUri: URI
): RecognizedDestinationUnavailable | null {
  if (fallbackUri.path() !== '') return null;

  const fallbackHash = fallbackUri.hash();

  if (fallbackHash.indexOf('#SCRIVITO_UNAVAILABLE_') === 0) {
    const encodedParams = fallbackHash.substr('#SCRIVITO_UNAVAILABLE_'.length);
    const paramsUri = new URI(encodedParams);

    const objId = paramsUri.path();
    const params: RecognizedDestinationUnavailable = { objId };

    if (paramsUri.query()) params.query = paramsUri.query();
    if (paramsUri.hash()) params.hash = paramsUri.hash();

    return params;
  }

  return null;
}

function getDestinationUnavailableFallbackUrl(
  params: GenerateDestinationUnavailableParams
): string {
  const paramsUri = new URI('').path(params.objId);

  if (params.query) paramsUri.query(params.query);
  if (params.hash) paramsUri.hash(params.hash);

  const encodedParams = paramsUri.toString();
  const fallbackUri = new URI('').hash(`SCRIVITO_UNAVAILABLE_${encodedParams}`);

  return fallbackUri.toString();
}
