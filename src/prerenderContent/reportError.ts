export async function reportError(
  message: string,
  error?: unknown,
): Promise<void> {
  // Report to your external error tracker here, like Honeybadger or Rollbar.
  console.error(
    `  ❌ [reportError] ${message}`,
    error instanceof Object && 'message' in error ? error.message : '',
    error,
  )
}
