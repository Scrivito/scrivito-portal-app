import mapValues from 'lodash-es/mapValues';

import { ClientError } from 'scrivito_sdk/client';
import {
  ArgumentError,
  InternalError,
  extractFromIterator,
  transformContinueIterable,
} from 'scrivito_sdk/common';
import {
  deserializeDataAttribute,
  serializeDataAttribute,
} from 'scrivito_sdk/data_integration/attribute_serialization_and_deserialization';
import {
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeError,
  DataScopeParams,
  NormalizedDataScopeParams,
  PresentDataScopePojo,
  assertValidDataItemAttributes,
  combineFilters,
  combineSearches,
  itemIdFromFilters,
} from 'scrivito_sdk/data_integration/data_class';
import {
  DataAttributeDefinitions,
  getDataAttributeDefinitions,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { DataConnectionError } from 'scrivito_sdk/data_integration/data_connection_error';
import {
  getExternalData,
  setExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import {
  ExternalCustomAttributes,
  NormalExternalData,
  createViaDataConnection,
  deleteViaDataConnection,
  getExternalDataConnectionNames,
  hasExternalDataConnection,
  updateViaDataConnection,
} from 'scrivito_sdk/data_integration/external_data_connection';
import {
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
      ? ExternalDataItem.build(this, id)
      : null;
  }

  getUnchecked(id: string): ExternalDataItem {
    return ExternalDataItem.buildUnchecked(this, id);
  }
}

export function isExternalDataClassProvided(name: string): boolean {
  return hasExternalDataConnection(name);
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
    private readonly _params: NormalizedDataScopeParams = {}
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
    const dataClassName = this.dataClassName();
    const dataAttributeDefinitions = await loadAttributesOrThrow(dataClassName);

    const serializedAttributes = serializeAttributes(
      dataClassName,
      attributes,
      dataAttributeDefinitions
    );

    const dataForCallback = {
      ...serializedAttributes,
      ...this.attributesFromFilters(filters),
    };

    const data = await createViaDataConnection(dataClassName, dataForCallback);

    const id = data.systemData._id;
    setExternalData(dataClassName, id, data);

    notifyExternalDataWrite(dataClassName);

    return ExternalDataItem.buildWithLoadedAttributes(
      this._dataClass,
      id,
      dataAttributeDefinitions
    );
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
    const attributes = getDataAttributeDefinitions(this.dataClassName());
    if (!attributes) return [];

    const id = this.itemIdFromFilters();
    if (id && this.hasSingleFilter()) {
      if (this.limit() === 0) return [];

      const item = this.get(id);
      return item ? [item] : [];
    }

    return handleCommunicationError(() => this.takeUnsafe(attributes));
  }

  transform({
    filters,
    search,
    order,
    limit,
    attributeName,
  }: DataScopeParams): DataScope {
    return new ExternalDataScope(
      this._dataClass,
      attributeName || this._attributeName,
      {
        filters: combineFilters(
          this._params.filters,
          this.normalizeFilters(filters)
        ),
        search: combineSearches(this._params.search, search),
        order: order || this._params.order,
        limit: limit ?? this._params.limit,
      }
    );
  }

  objSearch(): undefined {
    return;
  }

  count(): number | null {
    const { filters, search } = this._params;
    const dataClassName = this.dataClassName();
    const attributes = getDataAttributeDefinitions(dataClassName);
    if (!attributes) return null;

    return handleCommunicationError(() =>
      countExternalData(dataClassName, filters, search, attributes)
    );
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

  private takeUnsafe(attributes: DataAttributeDefinitions) {
    return extractFromIterator(
      this.getIterator(attributes),
      this._params.limit
    );
  }

  private getIterator(attributes: DataAttributeDefinitions) {
    return transformContinueIterable(
      getExternalDataQuery(this.toPojo(), attributes),
      (iterator) =>
        iterator.map((dataId) =>
          ExternalDataItem.buildWithLoadedAttributes(
            this._dataClass,
            dataId,
            attributes
          )
        )
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
  /** Returns an item if its schema is loaded. Returns null otherwise. */
  /** Triggers schema loading, thus requires a loading context. */
  static build(dataClass: DataClass, dataId: string): ExternalDataItem | null {
    const attributes = getDataAttributeDefinitions(dataClass.name());
    return attributes ? new ExternalDataItem(dataClass, dataId) : null;
  }

  /** Returns an item for an already loaded schema */
  static buildWithLoadedAttributes(
    dataClass: DataClass,
    dataId: string,
    attributes: DataAttributeDefinitions
  ): ExternalDataItem {
    if (!attributes) throw new InternalError();
    return new ExternalDataItem(dataClass, dataId);
  }

  /** Only for DataClass#getUnchecked */
  static buildUnchecked(
    dataClass: DataClass,
    dataId: string
  ): ExternalDataItem {
    return new ExternalDataItem(dataClass, dataId);
  }

  private constructor(
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

    const dataClassName = this.dataClassName();
    const attributes = getDataAttributeDefinitions(dataClassName);

    const { customData } = externalData;

    return attributes
      ? deserializeDataAttribute({
          dataClassName,
          attributeName,
          value: customData[attributeName],
          attributes,
        })
      : null;
  }

  /** @internal */
  getRaw(attributeName: string): unknown {
    return this.getExternalData()?.customData[attributeName];
  }

  /** @internal */
  /** In contrast to `#get` supports both system and custom attributes */
  getLocalized(attributeName: string): unknown {
    const attributeValue = this.getSystemOrCustom(attributeName);
    if (typeof attributeValue !== 'string') return attributeValue;

    const attributeDefinition = this.attributeDefinitions()[attributeName];
    if (!attributeDefinition) return attributeValue;

    const [attributeType, attributeConfig] = attributeDefinition;
    if (attributeType === 'enum') {
      const valueConfig = attributeConfig.values.find(
        (config) => config.value === attributeValue
      );

      if (!valueConfig) throw new InternalError();

      const { title } = valueConfig;

      return typeof title === 'string' ? title : attributeValue;
    }

    return attributeValue;
  }

  async update(attributes: DataItemAttributes): Promise<void> {
    assertValidDataItemAttributes(attributes);

    const externalData = await load(() => this.getExternalData());
    if (!externalData) {
      throw new ArgumentError(`Missing data with ID ${this._dataId}`);
    }

    const dataClassName = this.dataClassName();
    const dataAttributeDefinitions = await loadAttributesOrThrow(dataClassName);

    const serializedAttributes = serializeAttributes(
      dataClassName,
      attributes,
      dataAttributeDefinitions
    );

    const updatedData = await updateViaDataConnection(
      this.dataClassName(),
      this._dataId,
      serializedAttributes
    );

    setExternalData(dataClassName, this._dataId, {
      systemData: externalData.systemData,
      customData: {
        ...externalData.customData,
        ...updatedData,
      },
    });

    this.notifyWrite();
  }

  async delete(): Promise<void> {
    await deleteViaDataConnection(this.dataClassName(), this._dataId);

    setExternalData(this.dataClassName(), this._dataId, null);

    this.notifyWrite();
  }

  /** @internal */
  getCustomAttributes(): ExternalCustomAttributes {
    return this.getExternalData()?.customData ?? {};
  }

  private getExternalData(): NormalExternalData | null | undefined {
    return getExternalData(this.dataClassName(), this._dataId);
  }

  private getSystemOrCustom(attributeName: string) {
    if (attributeName === '_id') return this.id();
    return this.get(attributeName);
  }

  private notifyWrite() {
    notifyExternalDataWrite(this.dataClassName());
  }
}

function serializeAttributes(
  dataClassName: string,
  attributes: DataItemAttributes,
  dataAttributeDefinitions: DataAttributeDefinitions
) {
  return mapValues(attributes, (value, attributeName) =>
    serializeDataAttribute({
      dataClassName,
      attributeName,
      value,
      attributes: dataAttributeDefinitions,
    })
  );
}

function isCommunicationError(
  error: unknown
): error is ClientError | DataConnectionError {
  return error instanceof ClientError || error instanceof DataConnectionError;
}

function handleCommunicationError<T>(request: () => T) {
  try {
    return request();
  } catch (error) {
    if (isCommunicationError(error)) throw new DataScopeError(error.message);
    throw error;
  }
}

async function loadAttributesOrThrow(dataClassName: string) {
  const attributes = await load(() =>
    getDataAttributeDefinitions(dataClassName)
  );

  // A schema must be stored first
  if (!attributes) throw new InternalError();
  return attributes;
}
