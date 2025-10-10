import { onReset } from 'scrivito_sdk/common';
import { StateContainer } from 'scrivito_sdk/state';
import { StateTree } from 'scrivito_sdk/state/state_tree';
import { resetSubscribers } from 'scrivito_sdk/state/subscribers';

// this type described the shape of the global state tree, i.e. what's stored inside it
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export interface GlobalState extends Object {
  // empty placeholder - this type is augmented by individual modules
  // This placeholder ensures the interface is not empty to satisfy ESLint
  [key: string]: unknown;
}

const stateTree = new StateTree<GlobalState>();

export const globalState: StateContainer<GlobalState> = stateTree;

// for test purposes only
export function resetGlobalState(): void {
  resetSubscribers();
  stateTree.clear();
}

onReset(resetGlobalState);
