export const onRequest: PagesFunction = async function onRequest({ request }) {
  return fetch(
    request.url.replace(
      new URL(request.url).origin,
      'https://code.etracker.com',
    ),
    new Request(request),
  )
}
