export const onRequest: PagesFunction = async function onRequest({ request }) {
  const pathPrefix = '/pisa-api/e65cc230584e1891af58692a44ff5482'
  const target = 'https://web087.crm.pisasales.de/portal'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
