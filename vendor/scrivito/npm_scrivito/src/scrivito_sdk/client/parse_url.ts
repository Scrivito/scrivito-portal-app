import { ArgumentError } from 'scrivito_sdk/common';

export function parseUrl(url: string): URL {
  const parsed = URL.parse(url);
  if (parsed === null) throw new ArgumentError(`Invalid URL: "${url}"`);

  return parsed;
}
