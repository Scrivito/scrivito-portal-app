let registerHandler: typeof registerAsyncTask | undefined;

/** execute the given async function, and register it as a "flushable" task
 *
 * this makes the task visible to 'flushPromises', when running unit test.
 * outside of of unit tests, the given task is executed without side-effects.
 */
export async function registerAsyncTask<T>(task: () => Promise<T>): Promise<T> {
  return registerHandler ? registerHandler(task) : task();
}

// for test purposes only
export function setRegisterAsyncTaskHandler(
  handler: typeof registerAsyncTask
): void {
  registerHandler = handler;
}
