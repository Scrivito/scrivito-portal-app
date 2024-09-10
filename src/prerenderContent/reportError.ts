export function reportError(message?: string, ...args: unknown[]): void {
  // Report to your external error tracker here, like Honeybadger or Rollbar.
  console.error(`  ❌ [reportError] ${message}`, ...args)
}
