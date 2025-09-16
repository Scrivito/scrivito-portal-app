import { InternalError, computeCacheKey, isPresent } from 'scrivito_sdk/common';
import {
  LoadableData,
  LoadableState,
  createLoadableData,
} from 'scrivito_sdk/loadable';
import { LoaderProcessParams } from 'scrivito_sdk/loadable/create_loader_process';
import { isAvailableState } from 'scrivito_sdk/loadable/loadable_state';
import { OfflineStore } from 'scrivito_sdk/loadable/offline_store';
import { StateContainer, createStateContainer } from 'scrivito_sdk/state';

interface LoadableCollectionState<LoadableType> {
  [index: string]: LoadableState<LoadableType>;
}

type LoadElementCallback<LoadableType, KeyType, LoaderHintType> = (
  key: KeyType,
  hint?: LoaderHintType
) => LoaderProcessParams<LoadableType>;

export type LoadableCollection<
  LoadableType,
  KeyType = string,
  LoaderHintType = undefined
> = InstanceType<
  typeof LoadableCollectionImpl<LoadableType, KeyType, LoaderHintType>
>;

export function createLoadableCollection<
  LoadableType,
  KeyType = string,
  LoaderHintType = undefined
>(params: {
  name?: string;
  loadElement: LoadElementCallback<LoadableType, KeyType, LoaderHintType>;
}): LoadableCollection<LoadableType, KeyType, LoaderHintType> {
  return new LoadableCollectionImpl(params);
}

/** a collection of LoadableData, indexed by key */
class LoadableCollectionImpl<
  LoadableType,
  KeyType = string,
  LoaderHintType = undefined
> {
  private state: StateContainer<LoadableCollectionState<LoadableType>>;
  private name?: string;
  private loadElement: LoadElementCallback<
    LoadableType,
    KeyType,
    LoaderHintType
  >;

  private readonly offlineStore?: OfflineStore<KeyType, LoadableType>;

  constructor({
    name,
    loadElement,
  }: {
    name?: string;
    loadElement: LoadElementCallback<LoadableType, KeyType, LoaderHintType>;
  }) {
    this.name = name;
    this.state = createStateContainer();
    this.loadElement = loadElement;
    if (name) {
      register(name, this);
      this.offlineStore = new OfflineStore<KeyType, LoadableType>(name);
    }
  }

  /** get a LoadableData instance from this collection */
  get(key: KeyType, loaderHint?: LoaderHintType): LoadableData<LoadableType> {
    const stringifiedKey = stringifyKey(key);

    const params = this.loadElement(key, loaderHint);

    const paramsWithOfflineEntry = params.loader
      ? { ...params, offlineEntry: this.offlineStore?.getEntry(key) }
      : params;

    const data = createLoadableData({
      ...paramsWithOfflineEntry,

      state: this.state.subState(stringifiedKey),
      affiliation: this.name ? { collectionName: this.name, key } : undefined,
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

  async findValuesInOfflineStore(
    selector: (data: LoadableType, key: KeyType) => boolean
  ): Promise<Array<[LoadableType, KeyType]>> {
    if (!this.offlineStore) throw new InternalError();

    return this.offlineStore.findValues(selector);
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
