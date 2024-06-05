import { ArgumentError } from 'scrivito_sdk/common';
import {
  DEFAULT_LIMIT,
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeFilters,
  DataScopeParams,
  OperatorSpec,
  PresentDataScopePojo,
  assertNoAttributeFilterConflicts,
  combineFilters,
  combineSearches,
  itemIdFromFilters,
} from 'scrivito_sdk/data_integration/data_class';
import { getObjDataClass } from 'scrivito_sdk/data_integration/get_data_class';
import {
  BasicObj,
  BasicObjAttributes,
  BasicObjSearch,
  createObjIn,
  currentObjSpaceId,
  excludeDeletedObjs,
  getObjFrom,
  objSpaceScope,
  restrictToObjClass,
} from 'scrivito_sdk/models';
import {
  Obj,
  ObjSearch,
  Schema,
  getClass,
  unwrapAppClass,
  wrapInAppClass,
} from 'scrivito_sdk/realm';

const SUPPORTED_ATTRIBUTE_TYPES = [
  'boolean',
  'enum',
  'float',
  'integer',
  'multienum',
  'string',
  'stringlist',
  'reference',
];

export class ObjDataClass extends DataClass {
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
    return new ObjDataScope(this);
  }

  get(id: string): DataItem | null {
    const obj = getDataObj(this, id);
    return obj ? new ObjDataItem(this, id) : null;
  }

  getUnchecked(id: string): DataItem {
    return new ObjDataItem(this, id);
  }

  /** @internal */
  forAttribute(attributeName: string): DataScope {
    return new ObjDataScope(this, attributeName);
  }
}

function getDataObj(dataClass: DataClass, dataId: string): BasicObj | null {
  return getObjFrom(objClassScope(dataClass).and(excludeDeletedObjs), dataId);
}

export class ObjDataScope extends DataScope {
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
    this.assertNoConflictsWithFilters(attributes);

    const obj = createObjIn(
      this.objClassScope(),
      prepareAttributes(
        { ...attributes, ...this._params.filters },
        this._dataClass.name()
      )
    );

    // Important: Wait for saving to finish
    await obj.finishSaving();

    return this.wrapInDataItem(obj);
  }

  get(id: string): DataItem | null {
    const [obj] = this.getSearch().and('_id', 'equals', id).take(1);
    if (!obj) return null;

    return this.wrapInDataItem(obj);
  }

  take(): DataItem[] {
    return this.getSearch()
      .take(this._params.limit ?? DEFAULT_LIMIT)
      .map((obj) => this.wrapInDataItem(obj));
  }

  dataItem(): DataItem | null {
    const id = this.itemIdFromFilters();
    if (id) return this._dataClass.get(id);

    return null;
  }

  isDataItem(): boolean {
    return !!this.itemIdFromFilters();
  }

  attributeName(): string | null {
    return this._attributeName || null;
  }

  count(): number {
    return this.getSearch().count();
  }

  transform({ filters, search, order, limit }: DataScopeParams): DataScope {
    return new ObjDataScope(this._dataClass, this._attributeName, {
      filters: combineFilters(
        this._params.filters,
        this.normalizeFilters(filters)
      ),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit ?? this._params.limit,
    });
  }

  limit(): number | undefined {
    return this._params.limit;
  }

  private normalizeFilters(
    convenienceFilters?: DataScopeFilters
  ): DataScopeFilters | undefined {
    if (!convenienceFilters) return;

    const filters: DataScopeFilters = {};

    Object.keys(convenienceFilters).forEach((name) => {
      const valueOrSpec = convenienceFilters[name];

      if (typeof valueOrSpec === 'string') {
        return (filters[name] = valueOrSpec);
      }

      const { operator, value } = valueOrSpec;

      if (operator === 'equals') {
        return (filters[name] = value);
      }

      if (operator === 'notEquals') {
        return (filters[name] = { operator, value });
      }

      throw new ArgumentError(`Unknown filter operator "${operator}"`);
    });

    return filters;
  }

  objSearch(): ObjSearch {
    return new ObjSearch(this.getSearch());
  }

  /** @internal */
  toPojo(): PresentDataScopePojo {
    return {
      _class: this.dataClassName(),
      _attribute: this._attributeName,
      ...this._params,
    };
  }

  private getSearch() {
    let initialSearch = this.objClassScope().and(excludeDeletedObjs).search();

    const { filters, search: searchTerm, order: givenOrder } = this._params;

    if (searchTerm) {
      initialSearch = initialSearch.and('*', 'matches', searchTerm);
    }

    if (givenOrder) {
      const order = givenOrder.filter(([attributeName]) => !!attributeName);
      if (order.length) initialSearch = initialSearch.order(order);
    }

    if (!filters) return initialSearch;

    return Object.keys(filters)
      .filter((name) => !!name)
      .reduce(
        (search, name) => this.applyFilter(search, name, filters[name]),
        initialSearch
      );
  }

  private applyFilter(
    search: BasicObjSearch,
    name: string,
    valueOrSpec: string | OperatorSpec
  ): BasicObjSearch {
    if (typeof valueOrSpec === 'string') {
      return this.applyFilter(search, name, {
        operator: 'equals',
        value: valueOrSpec,
      });
    }

    const { operator, value } = valueOrSpec;

    if (operator === 'equals') {
      return search.and(name, 'equals', value);
    }

    if (operator === 'notEquals') {
      return search.andNot(name, 'equals', value);
    }

    throw new ArgumentError(`Unknown filter operator "${operator}"`);
  }

  private objClassScope() {
    return objClassScope(this._dataClass);
  }

  private wrapInDataItem(obj: BasicObj) {
    return new ObjDataItem(this._dataClass, obj.id());
  }

  private assertNoConflictsWithFilters(attributes: DataItemAttributes) {
    const { filters } = this._params;

    if (filters) {
      assertNoAttributeFilterConflicts(attributes, filters);
    }
  }

  private itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
  }
}

export class ObjDataItem extends DataItem {
  private _obj: BasicObj | null | undefined;

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

  obj(): Obj {
    return wrapInAppClass(this.getExistingObj());
  }

  /** @internal */
  getBasicObj(): BasicObj | null {
    if (this._obj === undefined) {
      this._obj = getDataObj(this._dataClass, this._dataId);
    }

    return this._obj;
  }

  get(attributeName: string): unknown {
    const obj = this.getBasicObj();
    if (!obj) return null;

    const typeInfo = getAttributeTypeInfo(this.dataClassName(), attributeName);
    if (!typeInfo) return null;

    const [attributeType, attributeConfig] = typeInfo;

    if (SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      return attributeType === 'reference'
        ? getReference(obj, attributeName, attributeConfig)
        : obj.get(attributeName, typeInfo);
    }

    return null;
  }

  update(attributes: DataItemAttributes): Promise<void> {
    const obj = this.getExistingObj();
    obj.update(prepareAttributes(attributes, this.dataClassName()));

    return obj.finishSaving();
  }

  async delete(): Promise<void> {
    const obj = this.getBasicObj();

    if (obj) {
      obj.delete();
      return obj.finishSaving();
    }
  }

  private getExistingObj() {
    const obj = this.getBasicObj();

    if (!obj) {
      throw new ArgumentError(`Missing obj with ID ${this._dataId}`);
    }

    return obj;
  }
}

function getAttributeTypeInfo(className: string, attributeName: string) {
  return getSchema(className).attribute(attributeName);
}

export function isObjDataClassProvided(className: string): boolean {
  return !!getClass(className);
}

function getSchema(className: string) {
  const objClass = getClass(className);

  if (!objClass) {
    throw new ArgumentError(`Class ${className} does not exist`);
  }

  const schema = Schema.forClass(objClass);

  if (!schema) {
    throw new ArgumentError(`Class ${className} has no schema`);
  }

  return schema;
}

function objClassScope(dataClass: DataClass) {
  return objSpaceScope(currentObjSpaceId()).and(
    restrictToObjClass(dataClass.name())
  );
}

function prepareAttributes(attributes: DataItemAttributes, className: string) {
  const preparedAttributes: BasicObjAttributes = {};

  Object.keys(attributes).forEach((attributeName) => {
    const typeInfo = getAttributeTypeInfo(className, attributeName);

    if (!typeInfo) {
      throw new ArgumentError(
        `Attribute ${attributeName} of class ${className} does not exist`
      );
    }

    const [attributeType, attributeConfig] = typeInfo;

    if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      throw new ArgumentError(
        `Attribute ${attributeName} of class ${className} has unsupported type ${attributeType}`
      );
    }

    const attributeValue = attributes[attributeName];

    preparedAttributes[attributeName] = [
      attributeType === 'reference'
        ? prepareReferenceValue(attributeValue, attributeConfig)
        : attributeValue,
      typeInfo,
    ];
  });

  return preparedAttributes;
}

function getReference(
  obj: BasicObj,
  attributeName: string,
  attributeConfig?: { validClasses: readonly string[] }
) {
  if (!attributeConfig) return null;

  const referenceObj = obj.get(attributeName, 'reference');
  if (!(referenceObj instanceof BasicObj)) return null;

  const referenceObjClass = referenceObj.objClass();
  if (referenceObjClass !== getValidReferenceClass(attributeConfig)) {
    return null;
  }

  const dataClass = getObjDataClass(referenceObjClass);
  if (!dataClass) return null;

  return dataClass.get(referenceObj.id());
}

function prepareReferenceValue(
  attributeValue: unknown,
  attributeConfig?: { validClasses: readonly string[] }
) {
  return attributeValue instanceof DataItem &&
    attributeValue.dataClassName() === getValidReferenceClass(attributeConfig)
    ? unwrapAppClass(attributeValue.obj())
    : null;
}

function getValidReferenceClass(attributeConfig?: {
  validClasses: readonly string[];
}) {
  if (attributeConfig) {
    const { validClasses } = attributeConfig;
    if (validClasses.length === 1) return validClasses[0];
  }
}
