export const onRequest: PagesFunction = async function onRequest({ request }) {
  return fetch(
    request.url.replace(
      new URL(request.url).origin,
      'https://customer.etracker.com',
    ),
    new Request(request),
  )
}
