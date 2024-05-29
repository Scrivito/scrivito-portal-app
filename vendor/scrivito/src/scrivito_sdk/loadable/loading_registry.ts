import { onReset } from 'scrivito_sdk/common';

export interface LoaderProcess {
  notifyDataRequired(): void;
  notifyDataNoLongerRequired(): void;
  notifyDataWasSet(): void;

  setTidyCallback(tidyCallback: () => void): void;
}

interface ProcessIndex {
  [index: string]: LoaderProcess | undefined;
}

let processIndex: ProcessIndex = {};

interface LoadingSubscriptions {
  [index: string]: number | undefined;
}

let loadingSubscriptions: LoadingSubscriptions = {};

// for test purposes
export function subscriberCountForLoading(dataId: string): number {
  return loadingSubscriptions[dataId] || 0;
}

// for test purposes
export function processIndexSize(): number {
  return Object.keys(processIndex).length;
}

export function subscribeLoading(
  dataId: string,
  processFactory: () => LoaderProcess
): () => void {
  let subscriptionActive = true;
  changeSubscriptionsFor(dataId, 1);

  const processToUse = getOrCreateProcessFor(dataId, processFactory);
  processToUse.notifyDataRequired();

  return () => {
    if (!subscriptionActive) {
      return;
    }

    subscriptionActive = false;
    const numSubscriptions = changeSubscriptionsFor(dataId, -1);

    if (numSubscriptions < 1) {
      processToUse.notifyDataNoLongerRequired();
    }
  };
}

function getOrCreateProcessFor(
  dataId: string,
  processFactory: () => LoaderProcess
) {
  const existingProcess = processIndex[dataId];
  if (existingProcess) return existingProcess;

  const newProcess = processFactory();
  processIndex[dataId] = newProcess;
  newProcess.setTidyCallback(() => {
    if (processIndex[dataId] !== newProcess) return;

    delete processIndex[dataId];
  });

  return newProcess;
}

function changeSubscriptionsFor(dataId: string, amount: number) {
  const oldNumber = loadingSubscriptions[dataId] || 0;

  const newNumber = oldNumber + amount;
  loadingSubscriptions[dataId] = newNumber;

  return newNumber;
}

export function notifyDataWasSet(dataId: string) {
  const process = processIndex[dataId];

  if (process) {
    process.notifyDataWasSet();
  }
}

onReset(() => {
  processIndex = {};
  loadingSubscriptions = {};
});
