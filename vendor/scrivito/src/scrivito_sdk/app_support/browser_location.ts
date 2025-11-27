// @rewire
import type { History as HistoryV5 } from 'history';
import {
  Action,
  History as HistoryV4,
  UnregisterCallback,
  createBrowserHistory,
} from 'history-4';

import {
  ArgumentError,
  docUrl,
  onReset,
  urlResource,
} from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';

export interface HistoryState {
  historyChangesCount: number;
  location: string;
  isRevisit: boolean;
}

let currentHistory: HistoryV4 | HistoryV5 | undefined;
let unlistenToHistory: UnregisterCallback | undefined;
let lastAction: undefined | Action;

/** @public */
export function useHistory(historyToUse: HistoryV4): void;

/** @internal */
export function useHistory(historyToUse: HistoryV4 | HistoryV5): void;

/** @internal */
export function useHistory(historyToUse: HistoryV4 | HistoryV5): void {
  if (historyToUse.createHref({ pathname: '/' }) !== '/') {
    throw new ArgumentError(
      'Expected a history without a preconfigured basename.' +
        ` For further details, see: ${docUrl('js-sdk/useHistory')}`
    );
  }

  if (historyToUse === currentHistory) {
    return;
  }

  const isFirstHistory = !currentHistory;
  listenToHistory(historyToUse);
  currentHistory = historyToUse;
  if (!isFirstHistory) {
    historyHasChanged();
  }
}

export function getHistoryState(): HistoryState {
  return {
    historyChangesCount: getHistoryChangesCount(),
    location: get(),
    isRevisit: lastAction === 'POP',
  };
}

export function get(): string {
  return urlResource(getHistory().location);
}

export function getHistoryChangesCount(): number {
  return historyChangesCountState.get() || 0;
}

export function push(resource: string): void {
  getHistory().push(toLocation(resource));
}

export function replace(resource: string): void {
  getHistory().replace(toLocation(resource));
}

function toLocation(resource: string) {
  const url = new URL(get(), 'http://example.com');
  const { pathname, search, hash } = new URL(resource, url);
  return { pathname, search, hash };
}

export function isCurrentHistoryState(historyState: HistoryState): boolean {
  return historyState.historyChangesCount === getHistoryChangesCount();
}

// For test purpose only.
export function reset(): void {
  currentHistory = undefined;
  lastAction = undefined;
  unlistenToHistory = undefined;
  historyChangesCountState.clear();
}

// export for test purpose only
export function createInitialHistory(): HistoryV4 | HistoryV5 {
  return createBrowserHistory();
}

function ensureHistory(): void {
  if (!currentHistory) {
    useHistory(createInitialHistory());
  }
}

function getHistory(): HistoryV4 | HistoryV5 {
  ensureHistory();
  return currentHistory!;
}

function listenToHistory(historyToListen: HistoryV4 | HistoryV5): void {
  if (unlistenToHistory) {
    unlistenToHistory();
  }
  if (isHistoryV4(historyToListen)) {
    unlistenToHistory = historyToListen.listen((_location, action) => {
      historyHasChanged(action);
    });
  } else {
    unlistenToHistory = historyToListen.listen(({ action }) => {
      historyHasChanged(action);
    });
  }
}

function historyHasChanged(action?: Action) {
  lastAction = action;
  historyChangesCountState.set(getHistoryChangesCount() + 1);
}

const historyChangesCountState = createStateContainer<number>();

function isHistoryV4(
  historyToCheck: HistoryV4 | HistoryV5
): historyToCheck is HistoryV4 {
  return historyToCheck.hasOwnProperty('length');
}

onReset(reset);
