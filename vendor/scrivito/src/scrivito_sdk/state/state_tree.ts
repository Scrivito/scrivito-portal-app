import { InternalError } from 'scrivito_sdk/common';
import { conservativeUpdate } from 'scrivito_sdk/state/conservative_update';
import { failIfFrozen } from 'scrivito_sdk/state/frozen';
import { notifySubscribers } from 'scrivito_sdk/state/subscribers';
import { recordDetector } from 'scrivito_sdk/state/track_state_access';

/** Get the key type for a subState.
 *
 * Since `undefined` and `null` are automatically handled by subState,
 * they can be ignored for the key type.
 * (otherwise TS infers: `keyof null` is `never`)
 */
type SubKey<StateType> = keyof NonNullable<StateType> & string;

/** Get the type of a subState.
 *
 * When using subState, `undefined` and `null` are automatically handled:
 * -> a parent state of null or undefined automatically leads to the value undefined for the child.
 * -> get and set always use 'T | undefined', therefore:
 *     StateContainer<T> is equivalent to StateContainer<T | undefined>
 *     and StateContainer<NotUndefined<T>>
 */
type SubType<StateType, Key extends SubKey<StateType>> = NotUndefined<
  NonNullable<StateType>[Key]
>;

type NotUndefined<T> = Exclude<T, undefined>;

export interface StateReader<StateType> {
  id(): string;
  get(): StateType | undefined;
  subState<Key extends SubKey<StateType>>(
    key: Key
  ): StateReader<SubType<StateType, Key>>;
}

export interface StateContainer<StateType> extends StateReader<StateType> {
  set(newState: StateType | undefined): void;
  clear(): void;

  reader(): StateReader<StateType>;

  subState<Key extends SubKey<StateType>>(
    key: Key
  ): StateContainer<SubType<StateType, Key>>;
}

// abstract interface for managing state
abstract class AbstractStateStore<StateType>
  implements StateContainer<StateType>
{
  // return current state
  get() {
    const valueWhenAccessed = this.untrackedGet();

    recordDetector(() => valueWhenAccessed !== this.untrackedGet());

    return valueWhenAccessed;
  }

  abstract untrackedGet(): StateType | undefined;

  set(newState: StateType | undefined): void {
    const currentState = this.untrackedGet();

    const updatedState = conservativeUpdate(currentState, newState);

    if (updatedState === currentState) {
      return;
    }

    this.uncheckedSet(updatedState);
  }

  abstract uncheckedSet(newState: StateType | undefined): void;

  // get a string that uniquely identifies this state
  abstract id(): string;

  // reset the state back to undefined
  clear() {
    this.set(undefined);
  }

  // this method may only be called when StateType is fully partial,
  // i.e. all properties defined by StateType are optional.
  subState<Key extends SubKey<StateType>>(
    key: Key
  ): StateContainer<SubType<StateType, Key>> {
    return new StateTreeNode(this, key);
  }

  reader(): StateReader<StateType> {
    // identical implementation, different type
    return this;
  }

  // this method may only be called when StateType is fully partial,
  // i.e. all properties defined by StateType are optional (= may be undefined).
  setSubState<K extends SubKey<StateType>>(
    key: K,
    newSubState: SubType<StateType, K> | undefined
  ) {
    const priorState = this.untrackedGet();

    if (priorState === undefined) {
      const newState = { [key]: newSubState };
      // Since StateType is fully partial, newState is a valid StateType.
      // No way to tell TypeScript this, though.
      this.uncheckedSet(newState as unknown as StateType);

      return;
    }

    if (priorState === null) {
      // if StateType includes null, then it is not fully partial
      // and this methods should not be used!
      throw new InternalError();
    }

    if (newSubState === undefined) {
      const priorKeys = Object.keys(priorState);
      if (priorKeys.length === 1 && priorKeys[0] === key) {
        // remove empty objects, avoid memory leak
        this.uncheckedSet(undefined);
        return;
      }
    }

    performAsStateChange(() => {
      if (newSubState === undefined) {
        // remove undefined keys, avoid memory leak
        delete priorState[key];
      } else {
        // Since StateType is fully partial, this is true:
        // (SubType<StateType, K> | undefined) == SubType<StateType, K>
        priorState[key] = newSubState as SubType<StateType, K>;
      }
    });
  }

  getSubState<K extends SubKey<StateType>>(
    key: K
  ): SubType<StateType, K> | undefined {
    const state = this.untrackedGet();

    if (state !== undefined && state !== null) {
      // we know that state is neither null or undefined
      const nonNullState = state as NonNullable<typeof state>;
      const subState = nonNullState[key];

      // if T includes undefined, it is equal to (NotUndefined<T> | undefined)
      // if T does not include undefined, it is equal to NotUndefined<T>
      return subState as NotUndefined<typeof subState> | undefined;
    }
  }
}

// a state tree, which can be used to store state.
// this is the root of the tree, which keeps the state of the entire tree.
export class StateTree<TreeType> extends AbstractStateStore<TreeType> {
  private state?: TreeType;

  constructor() {
    super();
  }

  untrackedGet() {
    return this.state;
  }

  uncheckedSet(newState: TreeType) {
    performAsStateChange(() => {
      this.state = newState;
    });
  }

  id() {
    return '';
  }
}

function performAsStateChange(actualChange: () => void): void {
  failIfFrozen('Changing state');

  actualChange();

  notifySubscribers();
}

// a node of a state tree.
// does not actually keep state, but provides
// access scoped to a subtree of a StateTree.
class StateTreeNode<
  ParentType,
  Key extends SubKey<ParentType>
> extends AbstractStateStore<SubType<ParentType, Key>> {
  private parentState: AbstractStateStore<ParentType>;
  private key: Key;
  private cachedId?: string;

  constructor(parentState: AbstractStateStore<ParentType>, key: Key) {
    super();

    this.parentState = parentState;
    this.key = key;
  }

  untrackedGet(): SubType<ParentType, Key> | undefined {
    return this.parentState.getSubState(this.key);
  }

  uncheckedSet(newState: SubType<ParentType, Key> | undefined) {
    this.parentState.setSubState(this.key, newState);
  }

  id(): string {
    if (this.cachedId === undefined) {
      // first convert backslash to double-backslash
      // then convert slash to backslash-slash
      const escapedKey = this.key.replace(/\\/g, '\\\\').replace(/\//g, '\\/');

      this.cachedId = `${this.parentState.id()}/${escapedKey}`;
    }

    return this.cachedId;
  }
}
