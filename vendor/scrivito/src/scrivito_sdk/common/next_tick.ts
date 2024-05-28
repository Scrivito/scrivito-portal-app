// @rewire

import { setTimeout } from 'scrivito_sdk/common';

type DelayedFunction = () => void;

let nextTickScheduler = setTimeoutScheduler;

export function nextTick(delayedFunction: DelayedFunction): void {
  nextTickScheduler(delayedFunction);
}

function setTimeoutScheduler(fn: DelayedFunction) {
  setTimeout(fn, 0);
}

export function throwNextTick(error: unknown) {
  nextTick(() => {
    throw error;
  });
}

export function setNextTickScheduler(
  scheduler: (fn: DelayedFunction) => void
): void {
  nextTickScheduler = scheduler;
}
