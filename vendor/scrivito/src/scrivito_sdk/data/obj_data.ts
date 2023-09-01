import { ObjSpaceId, isExistentObjJson } from 'scrivito_sdk/client';
import {
  ExistentObjJson,
  ObjJson,
  WidgetJson,
  WidgetPoolJson,
  retrieveObj,
} from 'scrivito_sdk/client';
import { equals, isPresent, isSystemAttribute } from 'scrivito_sdk/common';
import { InternalError, never } from 'scrivito_sdk/common';
import { ObjJsonPatch, patchObjJson } from 'scrivito_sdk/data/obj_patch';
import { objReplicationPool } from 'scrivito_sdk/data/obj_replication_pool';
import { failIfPerformanceConstraint } from 'scrivito_sdk/data/performance_constraint';
import { LoadableCollection, LoadableData, load } from 'scrivito_sdk/loadable';
import { StateReader, failIfFrozen } from 'scrivito_sdk/state';

type CollectionKey = [ObjSpaceId, string];

// for test purposes only
export function clearObjDataCache(): void {
  baseCollection.clear();
  widgetCollection.clear();
}

// for test purposes only
export function dangerouslyGetRawObjJsons(): ObjJson[] {
  return baseCollection.dangerouslyGetRawValues();
}

let configuredForLazyWidgets = false;

export function configureForLazyWidgets(lazy: boolean): void {
  configuredForLazyWidgets = lazy;
}

let objChangeNotification: undefined | (() => void);

// for test purposes
export function setupObjChangeNotification(fn: () => void): void {
  objChangeNotification = fn;
}

type WidgetObjJson = Partial<ExistentObjJson>;

const widgetCollection = new LoadableCollection({
  recordedAs: 'widgetdata',
  loadElement: ([objSpaceId, objId]: CollectionKey) => ({
    loader: () => {
      objReplicationPool.get(objSpaceId, objId).start();

      // the data is actually 'pushed in' via the replication (see above)
      return never<WidgetObjJson>();
    },
  }),
});

const baseCollection = new LoadableCollection({
  recordedAs: 'baseobj',
  loadElement: ([objSpaceId, objId]: CollectionKey) => ({
    loader: async () => {
      if (!configuredForLazyWidgets) {
        await load(() => widgetCollection.get([objSpaceId, objId]).get());

        // the data is actually 'pushed in' via widgetCollection (see above)
        return never<ObjJson>();
      }

      return retrieveObj(objSpaceId, objId, 'widgetless');
    },
  }),
});

export class ObjData {
  private readonly widgetData: LoadableData<WidgetObjJson>;
  private readonly baseData: LoadableData<ObjJson>;

  private lastJoin?: {
    baseObjJson: ExistentObjJson;
    widgetObjJson: WidgetObjJson;
    joined: ExistentObjJson;
  };

  constructor(
    private readonly _objSpaceId: ObjSpaceId,
    private readonly _id: string
  ) {
    this.baseData = baseCollection.get([_objSpaceId, _id]);
    this.widgetData = widgetCollection.get([_objSpaceId, _id]);
  }

  id(): string {
    return this._id;
  }

  get(): ObjJson | undefined {
    failIfPerformanceConstraint(
      'for performance reasons, avoid this method when rendering'
    );

    const widgetObjJson = this.widgetData.get();

    // don't access baseData before widgetData is loaded
    // this ensures that we don't trigger retrieving widgetless data here
    // (which would be wasteful since we need full data anyway)
    if (!widgetObjJson) return;

    const baseObjJson = this.baseData.get();
    if (!baseObjJson) return;

    if (!isExistentObjJson(baseObjJson)) return baseObjJson;

    return this.joinDataWithCaching(baseObjJson, widgetObjJson);
  }

  getWidgetPoolWithBadPerformance(): WidgetPoolJson | undefined {
    return (
      getSubReader(
        '_widget_pool',
        this.widgetData
      ) as StateReader<WidgetPoolJson>
    ).get();
  }

  getWidget(id: string): WidgetJson | undefined {
    failIfPerformanceConstraint(
      'for performance reasons, avoid this method when rendering'
    );

    return getWidgetState(id, this.widgetData).get();
  }

  getWidgetWithBadPerformance(widgetId: string): WidgetJson | undefined {
    return getWidgetState(widgetId, this.widgetData).get();
  }

  /** Get a top-level attribute from the Obj.
   *
   * If you are sure that no widgets are involved (key is not a widget or a widgetlist attribute),
   * you could use getAttributeWithoutWidgetData instead, which is faster.
   */
  getAttribute<Key extends keyof ObjJson & string>(key: Key): ObjJson[Key] {
    if (isSystemAttribute(key)) return this.getAttributeWithoutWidgetData(key);

    if (!this.ensureAvailable()) return;

    const valueFromBase = getSubReader(key, this.baseData).get();

    return valueFromBase !== undefined
      ? valueFromBase
      : getSubReader(key, this.widgetData).get();
  }

  /** Get a top-level attribute from the Obj, which is not a widget or a widgetlist */
  getAttributeWithoutWidgetData<Key extends keyof ObjJson & string>(
    key: Key
  ): ObjJson[Key] {
    if (key === '_widget_pool') {
      // _widget_pool is not an attribute, use getWidget or getWidgetAttribute
      throw new InternalError();
    }

    return getSubReader(key, this.baseData).get();
  }

  getAttributeWithWidgetData<Key extends keyof ObjJson & string>(
    key: Key
  ): ObjJson[Key] {
    return getSubReader(key, this.widgetData).get();
  }

  getWidgetAttribute<Key extends keyof WidgetJson & string>(
    id: string,
    key: Key
  ): WidgetJson[Key] {
    return getWidgetState(id, this.widgetData).subState(key).get();
  }

  getIfExistent(): ExistentObjJson | undefined {
    if (this.isUnavailable()) return;

    return this.get() as ExistentObjJson;
  }

  isForbidden(): boolean {
    return !!this.getAttributeWithoutWidgetData('_forbidden');
  }

  isUnavailable(): boolean {
    return !!this.getAttributeWithoutWidgetData('_deleted');
  }

  // for test purposes only
  setBaseData(newState: ObjJson): void {
    this.baseData.set(newState);
  }

  set(newState: ObjJson): void {
    failIfFrozen('Changing CMS content');

    const [baseObjJson, widgetJson] = divideData(newState);

    this.baseData.set(baseObjJson);
    this.widgetData.set(widgetJson);

    this._replication().notifyLocalState(newState);

    if (objChangeNotification) objChangeNotification();
  }

  ensureAvailable(): boolean {
    return (
      this.baseData.ensureAvailable() &&
      (configuredForLazyWidgets || this.widgetData.ensureAvailable())
    );
  }

  // for test purposes only
  isAvailable(): boolean {
    return this.baseData.isAvailable();
  }

  update(objPatch: ObjJsonPatch): void {
    // Bang:
    // - If called, the objData to update belongs to an instantiated obj, therefore has been loaded
    // - The data loaded is not a Nullable, therefore `!` removes only the `undefined` introduced
    //   by LoadableData#get
    const newState = patchObjJson(this.get()!, objPatch);

    this.set(newState);
  }

  finishSaving(): Promise<void> {
    return this._replication().finishSaving();
  }

  objSpaceId(): ObjSpaceId {
    return this._objSpaceId;
  }

  equals(other: unknown): boolean {
    if (!(other instanceof ObjData)) return false;
    return (
      this._id === other._id && equals(this._objSpaceId, other._objSpaceId)
    );
  }

  widgetExists(widgetId: string): boolean {
    // Determine whether a widget exists without loading its actual data
    return !!this.getWidgetAttribute(widgetId, '_obj_class');
  }

  /** for test purposes only */
  isBeingLoaded(): boolean {
    return (
      this.baseData.numSubscribers() + this.widgetData.numSubscribers() > 0
    );
  }

  /** for test purposes only */
  unload(): void {
    this.baseData.reset();
    this.widgetData.reset();
  }

  /** join base Obj and widget data (the opposite of divideData).
   * uses a cache to ensure that each instance of ObjData reuses a returned object, if nothing changed.
   */
  private joinDataWithCaching(
    baseObjJson: ExistentObjJson,
    widgetObjJson: WidgetObjJson
  ) {
    const lastJoin = this.lastJoin;
    if (
      lastJoin &&
      lastJoin.baseObjJson === baseObjJson &&
      lastJoin.widgetObjJson === widgetObjJson
    ) {
      return lastJoin.joined;
    }

    const joined = { ...baseObjJson, ...widgetObjJson };
    this.lastJoin = { baseObjJson, widgetObjJson, joined };

    return joined;
  }

  private _replication() {
    return objReplicationPool.get(this._objSpaceId, this._id);
  }
}

function getWidgetState(
  id: string,
  loadableData: LoadableData<WidgetObjJson>
): StateReader<WidgetJson> {
  const widgetPoolState = getSubReader(
    '_widget_pool',
    loadableData
  ) as StateReader<WidgetPoolJson>;

  return widgetPoolState.subState(id);
}

function getSubReader<Key extends keyof ObjJson & string>(
  key: Key,
  loadableData: LoadableData<Partial<ObjJson>>
): StateReader<Exclude<ObjJson[Key], undefined>> {
  return loadableData.reader().subState(key);
}

export function invalidateAllLoadedObjsIn(objSpaceId: ObjSpaceId) {
  const reRetrieved: Record<string, true | undefined> = {};

  const fullIds = idsFromCollection(widgetCollection);
  const widgetlessIds = idsFromCollection(baseCollection);

  fullIds.forEach((objId) => {
    if (reRetrieved[objId]) return;
    reRetrieved[objId] = true;

    objReplicationPool.get(objSpaceId, objId).start();
  });

  widgetlessIds.forEach(async (objId) => {
    if (reRetrieved[objId]) return;
    reRetrieved[objId] = true;

    baseCollection
      .get([objSpaceId, objId])
      .set(await retrieveObj(objSpaceId, objId, 'widgetless'));
  });
}

function idsFromCollection(
  collection: LoadableCollection<Partial<ObjJson>, unknown>
) {
  return collection
    .dangerouslyGetRawValues()
    .map((objJson) => objJson._id)
    .filter(isPresent);
}

function divideData(data: ObjJson): [ObjJson, WidgetObjJson] {
  const baseObjJson: Partial<ObjJson> = {};
  const widgetObjJson: WidgetObjJson = {
    // this ensures that idsFromCollection works
    _id: data._id,
  };

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const targetData = isWidgetKey(key, value) ? widgetObjJson : baseObjJson;

    targetData[key] = value;
  });

  // all required keys added to baseObjJson, therefore no longer Partial<ObjJson>
  return [baseObjJson as ObjJson, widgetObjJson];
}

function isWidgetKey<Key extends keyof ObjJson & string>(
  key: Key,
  value: ObjJson[Key]
): boolean {
  return (
    key === '_widget_pool' ||
    (!isSystemAttribute(key) &&
      Array.isArray(value) &&
      (value[0] === 'widget' || value[0] === 'widgetlist'))
  );
}
