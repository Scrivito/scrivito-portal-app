import { ArgumentError, parseUrl } from 'scrivito_sdk/common';

export function parseUrlOrThrow(url: string): URL {
  const parsed = parseUrl(url);
  if (parsed === null) throw new ArgumentError(`Invalid URL: "${url}"`);

  return parsed;
}
