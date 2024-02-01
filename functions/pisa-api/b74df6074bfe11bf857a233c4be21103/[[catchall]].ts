export const onRequest: PagesFunction = async function onRequest({ request }) {
  const pathPrefix = '/pisa-api/b74df6074bfe11bf857a233c4be21103'
  const target = 'https://web100.crm.pisasales.de/portal'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
