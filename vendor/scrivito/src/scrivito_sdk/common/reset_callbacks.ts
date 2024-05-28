const resetCallbacks: Array<() => void> = [];

/** for test purposes */
export function onReset(callback: () => void): void {
  // enable code removal in production build
  if (process.env.NODE_ENV !== 'development') return;

  resetCallbacks.push(callback);
}

/** for test purposes */
export function runResetCallbacks(): void {
  resetCallbacks.forEach((callback) => callback());
}
