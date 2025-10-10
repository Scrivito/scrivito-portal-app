import { ContextContainer, ScrivitoError, docUrl } from 'scrivito_sdk/common';
import { LoadableData } from 'scrivito_sdk/loadable';

interface CaptureList {
  datas: LoadableData<unknown>[];
  incomplete: boolean;
  outdated: boolean;
}

const captureContextContainer = new ContextContainer<CaptureList>();
const currentCaptureList = () => captureContextContainer.current();

export function capture<T>(fn: () => T): CaptureReport<T> {
  const captureList = {
    datas: [],
    incomplete: false,
    outdated: false,
  };

  const result = captureContextContainer.runWith(captureList, fn);

  return new CaptureReport(captureList, result);
}

export function throwNoLoadingContext() {
  throw new ScrivitoError(
    'Content not yet loaded. ' +
      'Forgot to use Scrivito.load or Scrivito.connect? ' +
      `See ${docUrl('content-not-yet-loaded-error')}`
  );
}

export function isCurrentlyCapturing(): boolean {
  return currentCaptureList() !== undefined;
}

type LoadingState = 'outdated' | 'available' | 'incomplete';

export function notifyDataRequired(
  loadingState: LoadingState,
  data: LoadableData<unknown>
) {
  const captureList = currentCaptureList();
  if (captureList) {
    captureList.datas.push(data);

    if (loadingState === 'outdated') captureList.outdated = true;
    else if (loadingState === 'incomplete') captureList.incomplete = true;
  }
}

export class CaptureReport<T> {
  result: T;

  private captureList: CaptureList;

  outdated: boolean;
  incomplete: boolean;

  constructor(captureList: CaptureList, result: T) {
    this.captureList = captureList;
    this.outdated = captureList.outdated;
    this.incomplete = captureList.incomplete;
    this.result = result;
  }

  /** creates a new report, with any 'incomplete' data treated as 'outdated' instead. */
  treatIncompleteAsOutdated(): CaptureReport<T> {
    const newCaptureList = {
      datas: [...this.captureList.datas],
      incomplete: false,
      outdated: this.captureList.outdated || this.captureList.incomplete,
    };

    return new CaptureReport(newCaptureList, this.result);
  }

  forwardToCurrent() {
    const currentList = currentCaptureList();
    if (!currentList) {
      if (this.incomplete) {
        throwNoLoadingContext();
      }

      return;
    }

    extendList(currentList, this.captureList);
  }

  /** get the list of data that was accessed during this capture run.
   *
   * intended for debugging
   */
  getRequiredDatas() {
    return this.captureList.datas;
  }

  /** returns true iff no data is missing, doesn't care about outdated  */
  isAllDataLoaded() {
    return !this.incomplete;
  }

  /** returns true iff no data is missing or outdated */
  isAllDataUpToDate() {
    return !this.incomplete && !this.outdated;
  }

  /** subscribes to the loading of all data that was captured, using the provided subscription.
   * all subscribed data is loaded automatically, and reloaded when outdated.
   * the subscription is automatically updated to reflect the data captured in this report,
   * i.e. any data that is no longer present in the capture is unsubscribed.
   */
  subscribeLoading(subscriber: LoadingSubscriber) {
    const unsubscribes = this.captureList.datas.map((data) =>
      data.subscribeLoading()
    );

    subscriber.unsubscribe();
    subscriber.storeUnsubscribe(() => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    });
  }
}

/** keeps track of subscriptions to LoadableData */
export class LoadingSubscriber {
  private unsubscribeCallback?: () => void;

  /** used internally, do not call from outside 'loadable' */
  storeUnsubscribe(unsubscribe: () => void) {
    this.unsubscribeCallback = unsubscribe;
  }

  /** unsubscribe any previously subscribed data */
  unsubscribe() {
    if (this.unsubscribeCallback) {
      this.unsubscribeCallback();
    }
  }
}

function extendList(target: CaptureList, source: CaptureList) {
  source.datas.forEach((data) => target.datas.push(data));
  target.incomplete = target.incomplete || source.incomplete;
  target.outdated = target.outdated || source.outdated;
}
