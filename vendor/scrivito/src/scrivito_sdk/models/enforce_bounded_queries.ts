import { onReset } from 'scrivito_sdk/common';

let boundedQueriesEnforced = false;

export function enforceBoundedQueries(): void {
  boundedQueriesEnforced = true;
}

export function areBoundedQueriesEnforced(): boolean {
  return boundedQueriesEnforced;
}

onReset(() => {
  boundedQueriesEnforced = false;
});
