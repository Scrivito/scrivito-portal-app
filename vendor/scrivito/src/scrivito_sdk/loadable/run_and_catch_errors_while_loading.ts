import { runAndCatchException } from 'scrivito_sdk/common';
import { capture } from './load_handler';

export type RunResult<T> = SuccessfulRun<T> | FailedRun;

interface SuccessfulRun<T> {
  success: true;
  allDataLoaded: boolean;
  allDataUpToDate: boolean;
  result: T;
}

interface FailedRun {
  success: false;
  allDataLoaded: false;
  allDataUpToDate: boolean;
  result?: undefined;
}

export function runAndCatchErrorsWhileLoading<T>(
  loadableFunction: () => T
): RunResult<T> {
  const captured = capture(() => runAndCatchException(loadableFunction));

  captured.forwardToCurrent();

  const outcome = captured.result;
  const allDataLoaded = captured.isAllDataLoaded();
  const allDataUpToDate = captured.isAllDataUpToDate();

  if (!outcome.errorThrown) {
    return {
      success: true,
      result: outcome.result,
      allDataLoaded,
      allDataUpToDate,
    };
  }

  if (!allDataLoaded) {
    return {
      success: false,
      allDataLoaded: false,
      allDataUpToDate,
    };
  }

  throw outcome.error;
}
