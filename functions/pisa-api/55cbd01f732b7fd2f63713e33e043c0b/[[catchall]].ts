export const onRequest: PagesFunction = async function onRequest({ request }) {
  const pathPrefix = '/pisa-api/55cbd01f732b7fd2f63713e33e043c0b'
  const target = 'https://web085.crm.pisasales.de/portal'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
