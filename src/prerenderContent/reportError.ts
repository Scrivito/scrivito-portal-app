import Honeybadger from '@honeybadger-io/js'

export async function reportError(
  message: string,
  error?: unknown,
): Promise<void> {
  console.error(
    `  ❌ [reportError] ${message}`,
    error instanceof Object && 'message' in error ? error.message : '',
    error,
  )

  if (import.meta.env.HONEYBADGER_API_KEY) {
    Honeybadger.configure({
      apiKey: import.meta.env.HONEYBADGER_API_KEY,
      environment: import.meta.env.HONEYBADGER_ENVIRONMENT,
      revision: import.meta.env.HONEYBADGER_REVISION,
    })
    Honeybadger.setContext({ message })
    await Honeybadger.notifyAsync(error ?? new Error(message))
  }
}
