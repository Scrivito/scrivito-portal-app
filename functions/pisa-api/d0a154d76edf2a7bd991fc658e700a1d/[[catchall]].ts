export const onRequest: PagesFunction = async function onRequest({ request }) {
  const pathPrefix = '/pisa-api/d0a154d76edf2a7bd991fc658e700a1d'
  const target = 'https://web102.crm.pisasales.de/portal'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
