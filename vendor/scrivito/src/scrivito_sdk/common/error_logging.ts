// @rewire

let consoleErrorIsDisabled = false;

export function logError(...args: unknown[]): void {
  if (!consoleErrorIsDisabled) {
    console.error(...args);
  }
}

// For test purpose only
export function disableConsoleError(): void {
  consoleErrorIsDisabled = true;
}
