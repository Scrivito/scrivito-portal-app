export const onRequest: PagesFunction = async function onRequest({ request }) {
  const { origin, pathname, search } = new URL(request.url)

  request.headers.set('X-JR-API-Location', `${origin}/jr-api`)

  return fetch(
    `https://api.justrelate.com${pathname.replace(/^\/jr-api/, '')}${search}`,
    new Request(request),
  )
}
