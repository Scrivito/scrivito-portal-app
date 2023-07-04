import { StateContainer } from 'scrivito_sdk/state';
import { StateTree } from 'scrivito_sdk/state/state_tree';
import { resetSubscribers } from 'scrivito_sdk/state/subscribers';

// this type described the shape of the global state tree, i.e. what's stored inside it
export interface GlobalState {
  // empty placeholder - this type is augmented by individual modules
}

const stateTree = new StateTree<GlobalState>();

export const globalState: StateContainer<GlobalState> = stateTree;

// for test purposes only
export function resetGlobalState(): void {
  resetSubscribers();
  stateTree.clear();
}
