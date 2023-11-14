/** Failsafe wrapper for `localStorage` */

export function getFromLocalStorage(key: string): string | null {
  try {
    // eslint-disable-next-line no-restricted-globals
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setInLocalStorage(key: string, value: string): void {
  try {
    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem(key, value);
  } catch {
    // NOOP
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    // eslint-disable-next-line no-restricted-globals
    localStorage.removeItem(key);
  } catch {
    // NOOP
  }
}

export function clearLocalStorage(): void {
  try {
    // eslint-disable-next-line no-restricted-globals
    localStorage.clear();
  } catch {
    // NOOP
  }
}
