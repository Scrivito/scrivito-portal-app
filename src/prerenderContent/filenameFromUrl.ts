const preferExtension = process.env.NETLIFY === 'true'

export function filenameFromUrl(url: string): string {
  const { pathname } = new URL(url)
  if (pathname === '/') return '/index.html'

  return preferExtension ? `${pathname}.html` : `${pathname}/index.html`
}
