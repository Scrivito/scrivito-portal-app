export function promiseAndFinally<T>(
  promise: Promise<T>,
  handler: () => void
): Promise<T> {
  return promise.then(
    (value) => {
      handler();

      return value;
    },
    (error) => {
      handler();

      throw error;
    }
  );
}
