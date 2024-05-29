// @rewire

let consoleErrorIsDisabled = false;

export function logError(...args: unknown[]): void {
  if (!consoleErrorIsDisabled) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

// For test purpose only
export function disableConsoleError(): void {
  consoleErrorIsDisabled = true;
}
