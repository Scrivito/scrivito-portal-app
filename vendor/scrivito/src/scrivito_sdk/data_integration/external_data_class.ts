import { isEmpty } from 'underscore';

import {
  ArgumentError,
  extractFromIterator,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import {
  DEFAULT_LIMIT,
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeParams,
  PresentDataScopePojo,
  assertNoAttributeFilterConflicts,
  assertValidDataItemAttributes,
  combineFilters,
  combineSearches,
} from 'scrivito_sdk/data_integration/data_class';
import {
  getExternalData,
  setExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import {
  assertValidResultItem,
  getExternalDataConnection,
  getExternalDataConnectionNames,
} from 'scrivito_sdk/data_integration/external_data_connection';
import {
  getExternalDataQuery,
  notifyExternalDataWrite,
} from 'scrivito_sdk/data_integration/external_data_query';
import { load } from 'scrivito_sdk/loadable';

/** @beta */
export class ExternalDataClass extends DataClass {
  constructor(private readonly _name: string) {
    super();
  }

  name(): string {
    return this._name;
  }

  async create(attributes: DataItemAttributes): Promise<DataItem> {
    return this.all().create(attributes);
  }

  all(): DataScope {
    return new ExternalDataScope(this);
  }

  get(id: string): DataItem | null {
    return getExternalData(this._name, id)
      ? new ExternalDataItem(this, id)
      : null;
  }

  getUnchecked(id: string): DataItem {
    return new ExternalDataItem(this, id);
  }
}

export function isExternalDataClassProvided(name: string): boolean {
  return !!getExternalDataConnection(name);
}

export function allExternalDataClasses(): ExternalDataClass[] {
  return getExternalDataConnectionNames().map(
    (name) => new ExternalDataClass(name)
  );
}

/** @beta */
export class ExternalDataScope extends DataScope {
  constructor(
    private readonly _dataClass: DataClass,
    private readonly _params: DataScopeParams = {}
  ) {
    super();
  }

  dataClass(): DataClass {
    return this._dataClass;
  }

  async create(attributes: DataItemAttributes): Promise<DataItem> {
    this.assertNoIdFilter();
    assertValidDataItemAttributes(attributes);

    const { filters } = this._params;
    if (filters) {
      assertNoAttributeFilterConflicts(attributes, filters);
    }

    const createCallback = this.getCreateCallback();
    const dataForCallback = { ...attributes, ...filters };
    const result = await createCallback(dataForCallback);
    assertValidResultItem(result);

    const dataClassName = this.dataClassName();
    const { _id: id, ...dataFromCallback } = result;

    setExternalData(
      dataClassName,
      id,
      (!isEmpty(dataFromCallback) && dataFromCallback) || dataForCallback
    );

    notifyExternalDataWrite(dataClassName);

    return new ExternalDataItem(this._dataClass, id);
  }

  get(id: string): DataItem | null {
    const dataItem = this._dataClass.get(id);
    if (!dataItem) return null;

    const { filters } = this._params;
    if (!filters) return dataItem;

    const hasConflict = Object.keys(filters).some((attributeName) => {
      const dataItemValue = dataItem.get(attributeName);
      const filterValue = filters[attributeName];

      return dataItemValue !== filterValue;
    });

    return hasConflict ? null : dataItem;
  }

  take(): DataItem[] {
    return extractFromIterator(
      this.getIterator(),
      this._params.limit ?? DEFAULT_LIMIT
    );
  }

  transform({ filters, search, order, limit }: DataScopeParams): DataScope {
    return new ExternalDataScope(this._dataClass, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit ?? this._params.limit,
    });
  }

  objSearch(): undefined {
    return;
  }

  /** @internal */
  toPojo(): PresentDataScopePojo {
    return {
      dataClass: this.dataClassName(),
      ...this._params,
    };
  }

  private dataClassName() {
    return this._dataClass.name();
  }

  private getCreateCallback() {
    const dataClassName = this.dataClassName();
    const createCallback = getConnection(dataClassName).create;

    if (!createCallback) {
      throw new ArgumentError(
        `No create callback defined for data class "${dataClassName}"`
      );
    }

    return createCallback;
  }

  private getIterator() {
    return transformContinueIterable(
      getExternalDataQuery(this.toPojo()),
      (iterator) =>
        iterator.map((dataId) => new ExternalDataItem(this._dataClass, dataId))
    ).iterator();
  }

  private assertNoIdFilter() {
    const { filters } = this._params;

    if (filters && Object.keys(filters).includes('_id')) {
      throw new ArgumentError(
        `Cannot create a ${this.dataClassName()} from a scope that includes "_id" in its filters`
      );
    }
  }
}

/** @beta */
export class ExternalDataItem extends DataItem {
  constructor(
    private readonly _dataClass: DataClass,
    private readonly _dataId: string
  ) {
    super();
  }

  id(): string {
    return this._dataId;
  }

  dataClass(): DataClass {
    return this._dataClass;
  }

  obj(): undefined {
    return;
  }

  get(attributeName: string): unknown {
    const externalData = this.getExternalData();

    return externalData?.hasOwnProperty(attributeName)
      ? externalData[attributeName]
      : null;
  }

  async update(attributes: DataItemAttributes): Promise<void> {
    assertValidDataItemAttributes(attributes);

    const externalData = await load(() => this.getExternalData());
    if (!externalData) {
      throw new ArgumentError(`Missing data with ID ${this._dataId}`);
    }

    const updateCallback = this.getUpdateCallback();
    await updateCallback(this._dataId, attributes);

    setExternalData(this._dataClass.name(), this._dataId, {
      ...externalData,
      ...attributes,
    });

    this.notifyWrite();
  }

  async destroy(): Promise<void> {
    const deleteCallback = this.getDeleteCallback();
    await deleteCallback(this._dataId);

    setExternalData(this.dataClassName(), this._dataId, null);

    this.notifyWrite();
  }

  private getExternalData() {
    return getExternalData(this.dataClassName(), this._dataId);
  }

  private getUpdateCallback() {
    const updateCallback = this.getConnection().update;

    if (!updateCallback) {
      throw new ArgumentError(
        `No update callback defined for data class "${this.dataClassName()}"`
      );
    }

    return updateCallback;
  }

  private getDeleteCallback() {
    const deleteCallback = this.getConnection().delete;

    if (!deleteCallback) {
      throw new ArgumentError(
        `No delete callback defined for data class "${this.dataClassName()}"`
      );
    }

    return deleteCallback;
  }

  private getConnection() {
    return getConnection(this.dataClassName());
  }

  private dataClassName() {
    return this._dataClass.name();
  }

  private notifyWrite() {
    notifyExternalDataWrite(this.dataClassName());
  }
}

function getConnection(dataClassName: string) {
  const connection = getExternalDataConnection(dataClassName);

  if (!connection) {
    throw new ArgumentError(
      `No connection provided for data class "${dataClassName}"`
    );
  }

  return connection;
}
