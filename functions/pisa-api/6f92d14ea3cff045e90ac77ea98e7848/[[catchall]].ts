export const onRequest: PagesFunction = async function onRequest({ request }) {
  const pathPrefix = '/pisa-api/6f92d14ea3cff045e90ac77ea98e7848'
  const target = 'https://web082.crm.pisasales.de/portal'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
