export const onRequest: PagesFunction = async function onRequest({ request }) {
  const proxyLocationPrefix = `${new URL(request.url).origin}/auth`

  const actualRequestUrl = request.url.replace(
    proxyLocationPrefix,
    'https://api.justrelate.com/iam/auth',
  )
  request.headers.set('X-JR-Auth-Location', proxyLocationPrefix)

  return fetch(actualRequestUrl, new Request(request))
}
