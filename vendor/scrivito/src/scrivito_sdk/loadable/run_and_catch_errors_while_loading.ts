import { runAndCatchException } from 'scrivito_sdk/common';
import { capture } from './load_handler';

export type RunResult<T> = SuccessfulRun<T> | FailedRun;

interface SuccessfulRun<T> {
  success: true;
  allDataLoaded: boolean;
  result: T;
}

interface FailedRun {
  success: false;
  allDataLoaded: false;
  result?: undefined;
}

export function runAndCatchErrorsWhileLoading<T>(
  loadableFunction: () => T
): RunResult<T> {
  const captured = capture(() => runAndCatchException(loadableFunction));

  captured.forwardToCurrent();

  const outcome = captured.result;
  const allDataLoaded = captured.isAllDataLoaded();

  if (!outcome.errorThrown) {
    return {
      success: true,
      result: outcome.result,
      allDataLoaded,
    };
  }

  if (!allDataLoaded) {
    return {
      success: false,
      allDataLoaded: false,
    };
  }

  throw outcome.error;
}
