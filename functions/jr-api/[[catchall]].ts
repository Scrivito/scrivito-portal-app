export const onRequest: PagesFunction = async function onRequest({ request }) {
  const proxyLocationPrefix = `${new URL(request.url).origin}/jr-api`

  const actualRequestUrl = request.url.replace(
    proxyLocationPrefix,
    'https://api.justrelate.com',
  )
  request.headers.set('X-JR-API-Location', proxyLocationPrefix)

  return fetch(actualRequestUrl, new Request(request))
}
