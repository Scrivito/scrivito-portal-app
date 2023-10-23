export const onRequest: PagesFunction = async function onRequest({ request }) {
  // TODO: 🛑🚧🛑 Remove the following Error,
  // once folder name, `const pathPrefix` (both currently `/example-proxy') and `const target`
  // are adjusted to your needs.
  throw new Error(
    'Incomplete example-proxy configuration! See `functions/example-proxy/[[catchall]].ts` for details.',
  )

  const pathPrefix = '/example-proxy'
  const target = 'https://myservice.example.com/api'

  const actualRequestUrl = request.url.replace(
    `${new URL(request.url).origin}${pathPrefix}`,
    target,
  )
  return fetch(actualRequestUrl, new Request(request))
}
