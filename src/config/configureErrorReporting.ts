export async function configureErrorReporting() {
  if (!import.meta.env.HONEYBADGER_API_KEY) return

  const { default: Honeybadger } = await import('@honeybadger-io/js')

  Honeybadger.configure({
    apiKey: import.meta.env.HONEYBADGER_API_KEY,
    revision: import.meta.env.HONEYBADGER_REVISION,
  })
}
