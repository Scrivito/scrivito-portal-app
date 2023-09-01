// @rewire
let consoleErrorIsDisabled = false;

export function logError(...args: unknown[]): void {
  if (window && window.console && !consoleErrorIsDisabled) {
    window.console.error(...args);
  }
}

export function disableConsoleError(): void {
  consoleErrorIsDisabled = true;
}
