import isEmpty from 'lodash-es/isEmpty';
import mapValues from 'lodash-es/mapValues';

import { ClientError } from 'scrivito_sdk/client';
import {
  ArgumentError,
  extractFromIterator,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import {
  deserializeDataAttribute,
  serializeDataAttribute,
} from 'scrivito_sdk/data_integration/data_attribute';
import {
  DEFAULT_LIMIT,
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeError,
  DataScopeParams,
  PresentDataScopePojo,
  assertNoAttributeFilterConflicts,
  assertValidDataItemAttributes,
  combineFilters,
  combineSearches,
  itemIdFromFilters,
} from 'scrivito_sdk/data_integration/data_class';
import {
  ExternalData,
  getExternalData,
  setExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import {
  assertValidResultItem,
  autocorrectResultItemId,
  getExternalDataConnection,
  getExternalDataConnectionNames,
} from 'scrivito_sdk/data_integration/external_data_connection';
import {
  DataConnectionError,
  countExternalData,
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

  getUnchecked(id: string): ExternalDataItem {
    return new ExternalDataItem(this, id);
  }

  /** @internal */
  forAttribute(attributeName: string): DataScope {
    return new ExternalDataScope(this, attributeName);
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
    private readonly _attributeName?: string,
    private readonly _params: DataScopeParams = {}
  ) {
    super();
  }

  dataClass(): DataClass {
    return this._dataClass;
  }

  dataClassName(): string {
    return this._dataClass.name();
  }

  async create(attributes: DataItemAttributes): Promise<DataItem> {
    this.assertNoIdFilter();
    assertValidDataItemAttributes(attributes);

    const { filters } = this._params;
    if (filters) {
      assertNoAttributeFilterConflicts(attributes, filters);
    }

    const dataClassName = this.dataClassName();
    const serializedAttributes = await serializeAttributes(
      dataClassName,
      attributes
    );
    const dataForCallback = { ...serializedAttributes, ...filters };

    const createCallback = this.getCreateCallback();
    const resultItem = await createCallback(dataForCallback);
    assertValidResultItem(resultItem);

    const { _id: id, ...dataFromCallback } =
      autocorrectResultItemId(resultItem);

    setExternalData(
      dataClassName,
      id,
      (!isEmpty(dataFromCallback) && dataFromCallback) || dataForCallback
    );

    notifyExternalDataWrite(dataClassName);

    return new ExternalDataItem(this._dataClass, id);
  }

  get(id: string): DataItem | null {
    const { filters, search } = this._params;
    if (!search && !filters) return this._dataClass.get(id);

    const idFromFilters = this.itemIdFromFilters();
    if (idFromFilters && this.hasSingleFilter()) {
      return idFromFilters === id ? this._dataClass.get(id) : null;
    }

    return this.transform({ filters: { _id: id }, limit: 1 }).take()[0] || null;
  }

  dataItem(): DataItem | null {
    const id = this.itemIdFromFilters();
    return id ? this.get(id) : null;
  }

  isDataItem(): boolean {
    return !!this.itemIdFromFilters();
  }

  attributeName(): string | null {
    return this._attributeName || null;
  }

  take(): DataItem[] {
    const id = this.itemIdFromFilters();
    if (id && this.hasSingleFilter()) {
      const item = this.get(id);
      return item ? [item] : [];
    }

    try {
      return this.takeUnsafe();
    } catch (error) {
      if (isCommunicationError(error)) return [];
      throw error;
    }
  }

  transform({ filters, search, order, limit }: DataScopeParams): DataScope {
    return new ExternalDataScope(this._dataClass, this._attributeName, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit ?? this._params.limit,
    });
  }

  objSearch(): undefined {
    return;
  }

  getError(): DataScopeError | undefined {
    try {
      this.takeUnsafe();
    } catch (error) {
      if (isCommunicationError(error)) return new DataScopeError(error.message);
    }
  }

  count(): number | null {
    const { filters, search } = this._params;
    return countExternalData(this.dataClassName(), filters, search);
  }

  limit(): number | undefined {
    return this._params.limit;
  }

  /** @internal */
  toPojo(): PresentDataScopePojo {
    return {
      _class: this.dataClassName(),
      _attribute: this._attributeName,
      ...this._params,
    };
  }

  private takeUnsafe() {
    return extractFromIterator(
      this.getIterator(),
      this._params.limit ?? DEFAULT_LIMIT
    );
  }

  private getCreateCallback() {
    const className = this.dataClassName();
    const createCallback = getConnection(className).create;

    if (!createCallback) {
      throw new ArgumentError(
        `No create callback defined for data class "${className}"`
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

  private itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
  }

  private hasSingleFilter() {
    const { filters, search } = this._params;
    return filters && Object.keys(filters).length === 1 && !search;
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

  dataClassName(): string {
    return this._dataClass.name();
  }

  obj(): undefined {
    return;
  }

  get(attributeName: string): unknown {
    const externalData = this.getExternalData();
    if (!externalData) return null;

    return deserializeDataAttribute(
      this.dataClassName(),
      attributeName,
      externalData[attributeName]
    );
  }

  async update(attributes: DataItemAttributes): Promise<void> {
    assertValidDataItemAttributes(attributes);

    const externalData = await load(() => this.getExternalData());
    if (!externalData) {
      throw new ArgumentError(`Missing data with ID ${this._dataId}`);
    }

    const dataClassName = this.dataClassName();
    const serializedAttributes = await serializeAttributes(
      dataClassName,
      attributes
    );

    const updateCallback = this.getUpdateCallback();
    const response = await updateCallback(this._dataId, serializedAttributes);

    setExternalData(dataClassName, this._dataId, {
      ...externalData,
      ...serializedAttributes,
      ...(response || {}),
    });

    this.notifyWrite();
  }

  async delete(): Promise<void> {
    const deleteCallback = this.getDeleteCallback();
    await deleteCallback(this._dataId);

    setExternalData(this.dataClassName(), this._dataId, null);

    this.notifyWrite();
  }

  /** @internal */
  getExternalData(): ExternalData | null | undefined {
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

async function serializeAttributes(
  dataClassName: string,
  attributes: DataItemAttributes
) {
  return load(() =>
    mapValues(attributes, (value, attributeName) =>
      serializeDataAttribute(dataClassName, attributeName, value)
    )
  );
}

function isCommunicationError(
  error: unknown
): error is ClientError | DataConnectionError {
  return error instanceof ClientError || error instanceof DataConnectionError;
}
