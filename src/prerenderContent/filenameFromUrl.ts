export function filenameFromUrl(url: string): string {
  const { pathname } = new URL(url)
  if (pathname === '/') return '/index.html'

  return `${pathname}/index.html`
}
