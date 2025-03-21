/** a Scheduler accepts a function,
 * and schedules the function to run at some later point in time.
 */
type Scheduler = (fn: () => void) => void;

/** Generate a function that collects its invocations,
 * and schedules a function to processes them later.
 *
 * This can be used to build throtteling, debouncing or buffering logic.
 *
 * On the first invocation, the function is scheduled. Calls are collected
 * until the function runs. The function is run _once_ for all collected calls.
 *
 * Afterwards, the first call schedules the next function run.
 */
export function collectAndSchedule<Args extends unknown[]>(
  scheduler: Scheduler,
  fn: (...args: Args) => void
): (...args: Args) => void {
  let isScheduled = false;
  let lastArgs: Args | undefined;

  return (...args: Args) => {
    lastArgs = args;
    if (isScheduled) return;

    scheduler(() => {
      isScheduled = false;

      // ensure that lastArgs are forgotten quickly, to allow garbage collection
      const argsToProcess = lastArgs!;
      lastArgs = undefined;

      fn(...argsToProcess);
    });

    isScheduled = true;
  };
}

/** Generate a function that collects the value passed to it in a list,
 * and schedules a function to process the collected values later.
 *
 * This can be used to build queueing or batch processing logic.
 *
 * On the first invocation, the function is scheduled. Calls are collected
 * until the function runs. Afterwards, the first call schedules the next function run.
 *
 * The function receives a list with all invocation parameters, in order.
 * The function should return a list of all items that have not been processed yet.
 */
export function collectInListAndSchedule<T>(
  scheduler: Scheduler,
  fn: (list: T[]) => T[]
): (value: T) => void {
  let list: T[] = [];
  let isScheduled = false;

  return (value) => {
    list.push(value);
    schedule();
  };

  function schedule() {
    if (isScheduled) return;
    isScheduled = true;

    scheduler(() => {
      try {
        runFunction();
      } finally {
        isScheduled = false;
        if (list.length > 0) schedule();
      }
    });
  }

  function runFunction() {
    const remainder: T[] = [];
    try {
      while (list.length > 0) {
        const listToProcess = list;
        list = [];
        fn(listToProcess).forEach((value) => remainder.push(value));
      }
    } finally {
      list.forEach((value) => remainder.push(value));
      list = remainder;
    }
  }
}
