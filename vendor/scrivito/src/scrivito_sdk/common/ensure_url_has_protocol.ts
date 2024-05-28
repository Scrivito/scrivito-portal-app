import * as URI from 'urijs';

export function ensureUrlHasProtocol(url: string): string {
  let uri: URI;

  try {
    uri = URI(url);
  } catch {
    return url;
  }

  if (!uri.protocol() && url.match(/^[^/@]+@[^/@]+$/)) {
    return `mailto:${url}`;
  }

  if (!(uri.protocol() || url.startsWith('/')) && url.includes('.')) {
    const hostname = getHostname(url);

    if (hostname && !hostname.includes('_')) {
      return `https://${url}`;
    }
  }

  return url;
}

function getHostname(urlString: string) {
  let url: URL;

  try {
    url = new URL(`https://${urlString}`);
  } catch {
    return;
  }

  return url.hostname;
}
