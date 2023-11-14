import { ScrivitoPromise } from 'scrivito_sdk/common';

/** a Promise that never resolves or rejects.
 * Careful! Only use, if you know what you are doing!
 * You need to make sure that this promise will be "forgotten" eventually by your business logic.
 * Otherwise, you could cause a memory leak!
 */
export function never<T>(): Promise<T> {
  return new ScrivitoPromise(() => undefined);
}
