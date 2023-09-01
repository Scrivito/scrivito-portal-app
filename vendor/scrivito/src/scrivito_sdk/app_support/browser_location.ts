// @rewire
import { createBrowserHistory } from 'history';
import type { Action, History as HistoryV4, UnregisterCallback } from 'history';
import type { History as HistoryV5 } from 'history-5';
import * as URI from 'urijs';
import { ArgumentError, docUrl } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';

export interface HistoryState {
  historyChangesCount: number;
  location: string;
  isRevisit: boolean;
}

let history: HistoryV4 | HistoryV5 | undefined;
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

  if (historyToUse === history) {
    return;
  }

  const isFirstHistory = !history;
  listenToHistory(historyToUse);
  history = historyToUse;
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
  const location = getHistory().location;
  return `${location.pathname}${location.search}${location.hash}`;
}

export function getHistoryChangesCount(): number {
  return historyChangesCountState.get() || 0;
}

export function push(resource: string): void {
  const uri = new URI(resource);
  getHistory().push({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash(),
  });
}

export function replace(resource: string): void {
  const uri = new URI(resource);
  getHistory().replace({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash(),
  });
}

export function isCurrentHistoryState(historyState: HistoryState): boolean {
  return historyState.historyChangesCount === getHistoryChangesCount();
}

// For test purpose only.
export function reset(): void {
  history = undefined;
  lastAction = undefined;
  unlistenToHistory = undefined;
  historyChangesCountState.clear();
}

// export for test purpose only
export function createInitialHistory(): HistoryV4 | HistoryV5 {
  return createBrowserHistory();
}

function ensureHistory(): void {
  if (!history) {
    useHistory(createInitialHistory());
  }
}

function getHistory(): HistoryV4 | HistoryV5 {
  ensureHistory();
  return history!;
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
