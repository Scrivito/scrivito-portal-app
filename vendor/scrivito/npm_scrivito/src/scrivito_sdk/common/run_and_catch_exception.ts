type Outcome<T> = ErrorOutcome | SuccessOutcome<T>;

interface ErrorOutcome {
  errorThrown: true;
  error: unknown;
}

interface SuccessOutcome<T> {
  errorThrown: false;
  result: T;
}

export function runAndCatchException<T>(fn: () => T): Outcome<T> {
  try {
    return {
      errorThrown: false,
      result: fn(),
    };
  } catch (error) {
    return { errorThrown: true, error };
  }
}
