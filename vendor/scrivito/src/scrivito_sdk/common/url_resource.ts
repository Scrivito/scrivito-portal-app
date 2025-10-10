export function urlResource(url: {
  pathname: string;
  search: string;
  hash: string;
}): string {
  return `${url.pathname}${url.search}${url.hash}`;
}
