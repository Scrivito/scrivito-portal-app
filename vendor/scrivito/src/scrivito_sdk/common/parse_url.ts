export function parseUrl(url: string): URL | null {
  return URL.canParse(url) ? new URL(url) : null;
}
