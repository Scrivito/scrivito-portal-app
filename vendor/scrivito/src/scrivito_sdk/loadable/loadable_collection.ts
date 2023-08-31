import { InternalError, computeCacheKey, isPresent } from 'scrivito_sdk/common';
import { LoadableData, LoadableState } from 'scrivito_sdk/loadable';
import { LoaderProcessOptions } from 'scrivito_sdk/loadable/create_loader_process';
import { isAvailableState } from 'scrivito_sdk/loadable/loadable_state';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

interface LoadableCollectionState<LoadableType> {
  [index: string]: LoadableState<LoadableType>;
}

type LoadElementCallback<LoadableType, KeyType, LoaderHintType> = (
  key: KeyType,
  hint?: LoaderHintType
) => LoaderProcessOptions<LoadableType>;

/** a collection of LoadableData, indexed by key */
export class LoadableCollection<
  LoadableType,
  KeyType = string,
  LoaderHintType = undefined
> {
  private state: StateContainer<LoadableCollectionState<LoadableType>>;
  private recordedAs?: string;
  private loadElement: LoadElementCallback<
    LoadableType,
    KeyType,
    LoaderHintType
  >;

  constructor({
    recordedAs,
    loadElement,
  }: {
    recordedAs?: string;
    loadElement: LoadElementCallback<LoadableType, KeyType, LoaderHintType>;
  }) {
    this.recordedAs = recordedAs;
    this.state = createStateContainer();
    this.loadElement = loadElement;

    if (recordedAs) register(recordedAs, this);
  }

  /** get a LoadableData instance from this collection */
  get(key: KeyType, loaderHint?: LoaderHintType): LoadableData<LoadableType> {
    const stringifiedKey = stringifyKey(key);

    const loaderOptions = this.loadElement(key, loaderHint);

    const data = new LoadableData({
      ...loaderOptions,
      state: this.state.subState(stringifiedKey),
      affiliation: this.recordedAs
        ? { collectionName: this.recordedAs, key }
        : undefined,
    });

    return data;
  }

  clear(): void {
    this.state.clear();
  }

  /** this method is "dangerous" - it can be very, very bad for performance
   * use with care, and only if you know precisely what you are doing.
   *
   * it returns all current loaded data inside the collection,
   * but does not trigger any loading.
   */
  dangerouslyGetRawValues(): LoadableType[] {
    const currentState = this.state.get();
    if (!currentState) return [];

    return Object.keys(currentState)
      .map((key) => currentState[key])
      .filter(isPresent)
      .filter(isAvailableState)
      .map((state) => state.value);
  }
}

function stringifyKey(key: unknown): string {
  if (typeof key === 'string') {
    return key;
  }

  return computeCacheKey(key);
}

type UnknownCollection = LoadableCollection<unknown, unknown, unknown>;

const namedCollections: { [name: string]: UnknownCollection | undefined } = {};

function register(name: string, collection: UnknownCollection) {
  if (namedCollections[name]) {
    // collection name registered twice
    throw new InternalError();
  }

  namedCollections[name] = collection;
}

export function getCollection(name: string): UnknownCollection {
  const found = namedCollections[name];

  if (!found) throw new InternalError();

  return found;
}
