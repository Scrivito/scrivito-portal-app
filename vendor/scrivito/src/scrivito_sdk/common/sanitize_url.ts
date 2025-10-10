export function sanitizeUrl(rawUrl: string): string {
  const url = rawUrl.trim();

  if (URL.canParse(url)) return url;

  if (url.match(/^[^/@]+@[^/@]+$/)) {
    const mailto = `mailto:${url}`;
    if (URL.canParse(mailto)) return mailto;
  }

  if (url.startsWith('/') || url.match(/^\w+:/)) return url;

  if (url.includes('.')) {
    const httpsUrl = `https://${url}`;
    if (URL.canParse(httpsUrl)) {
      const { hostname } = new URL(httpsUrl);
      if (hostname && !hostname.includes('_')) return httpsUrl;
    }
  }

  return url;
}
