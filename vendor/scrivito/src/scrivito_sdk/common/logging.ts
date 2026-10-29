// @rewire

let consoleLoggingIsDisabled = false;

type LogType = 'error' | 'info';

export function logError(...args: unknown[]): void {
  return log('error', ...args);
}

export function logInfo(...args: unknown[]): void {
  return log('info', ...args);
}

function log(type: LogType, ...args: unknown[]): void {
  if (!consoleLoggingIsDisabled) {
    // eslint-disable-next-line no-console
    console[type](...args);
  }
}

// For test purpose only
export function disableConsoleLogging(): void {
  consoleLoggingIsDisabled = true;
}
