import { EMPTY_SPACE, isEmptySpaceId } from 'scrivito_sdk/client';
import { ArgumentError, isSystemAttribute } from 'scrivito_sdk/common';
import {
  AndOperatorSpec,
  DEFAULT_LIMIT,
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeParams,
  NormalizedDataScopeParams,
  OperatorSpec,
  PresentDataScopePojo,
  combineFilters,
  combineSearches,
  itemIdFromFilters,
} from 'scrivito_sdk/data_integration/data_class';
import {
  NormalizedDataAttributeDefinition,
  NormalizedDataAttributeDefinitions,
} from 'scrivito_sdk/data_integration/data_class_schema';
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
  NormalizedAttributeDefinition,
  Obj,
  ObjSearch,
  Schema,
  getRealmClass,
  unwrapAppClass,
  wrapInAppClass,
} from 'scrivito_sdk/realm';

const TYPES_WITH_SCHEMA_SUPPORT = [
  'boolean',
  'enum',
  'float',
  'integer',
  'string',
  'reference',
];

const TYPES_WITH_GARBAGE_IN_GARBAGE_OUT_SUPPORT = ['multienum', 'stringlist'];

const SUPPORTED_ATTRIBUTE_TYPES = [
  ...TYPES_WITH_SCHEMA_SUPPORT,
  ...TYPES_WITH_GARBAGE_IN_GARBAGE_OUT_SUPPORT,
];

// Exported for test purpose only
export const SUBPAGES_CHILD_ORDER_LIMIT = 200;

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

  attributeDefinitions(): NormalizedDataAttributeDefinitions {
    return attributeDefinitions(this._name);
  }
}

function getDataObj(dataClass: DataClass, dataId: string): BasicObj | null {
  return getObjFrom(objClassScope(dataClass).and(excludeDeletedObjs), dataId);
}

export class ObjDataScope extends DataScope {
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
    if (this.isBuiltInClass()) {
      throw new ArgumentError(
        'Cannot create data items using the built-in Obj class'
      );
    }

    const obj = createObjIn(
      this.objClassScope(),
      prepareAttributes(
        { ...attributes, ...this.attributesFromFilters(this._params.filters) },
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
    const search = this.getSearch();
    const parentObj = this.parentObj();
    const limit = this._params.limit ?? DEFAULT_LIMIT;

    let objs: BasicObj[];

    if (
      !this._params.search &&
      !this._params.order &&
      parentObj?.hasChildOrder()
    ) {
      objs = parentObj
        .sortByChildOrder(
          search.take(Math.max(limit, SUBPAGES_CHILD_ORDER_LIMIT))
        )
        .slice(0, limit);
    } else {
      objs = search.take(limit);
    }

    return objs.map((obj) => this.wrapInDataItem(obj));
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

  transform({
    filters,
    search,
    order,
    limit,
    attributeName,
  }: DataScopeParams): DataScope {
    return new ObjDataScope(
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

  limit(): number | undefined {
    return this._params.limit;
  }

  objSearch(): ObjSearch | undefined {
    const search = this.getSearch();

    if (!isEmptySpaceId(search.objSpaceId())) {
      return new ObjSearch(search);
    }
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
    let initialSearch = this.getInitialSearch();

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

  private getInitialSearch() {
    return (this.isBuiltInClass() ? currentObjScope() : this.objClassScope())
      .and(excludeDeletedObjs)
      .search();
  }

  private isBuiltInClass() {
    return isBuiltInClass(this.dataClassName());
  }

  private applyFilter(
    search: BasicObjSearch,
    attributeName: string,
    operatorSpec: OperatorSpec | AndOperatorSpec
  ): BasicObjSearch {
    const { operator, value } = operatorSpec;

    if (operator === 'and') {
      return value.reduce(
        (currentSearch, spec) =>
          this.applyFilter(currentSearch, attributeName, spec),
        search
      );
    }

    if (operator === 'equals') {
      if (attributeName === '_obj_parent_id') {
        return this.applySubpagesFilter(search);
      }

      return search.and(attributeName, 'equals', value);
    }

    if (operator === 'notEquals') {
      return search.andNot(attributeName, 'equals', value);
    }

    if (operator === 'isGreaterThan') {
      return search.and(attributeName, 'isGreaterThan', value);
    }

    if (operator === 'isLessThan') {
      return search.and(attributeName, 'isLessThan', value);
    }

    if (operator === 'isGreaterThanOrEquals') {
      return search.andNot(attributeName, 'isLessThan', value);
    }

    if (operator === 'isLessThanOrEquals') {
      return search.andNot(attributeName, 'isGreaterThan', value);
    }

    throw new ArgumentError(`Unknown filter operator "${operator}"`);
  }

  private applySubpagesFilter(search: BasicObjSearch) {
    const parentObj = this.parentObj();
    const siteId = parentObj?.siteId();
    const parentPath = parentObj?.path();

    if (!siteId || !parentPath) {
      return objSpaceScope(EMPTY_SPACE).search();
    }

    return search
      .and('_siteId', 'equals', siteId)
      .and('_parentPath', 'equals', parentPath);
  }

  private objClassScope() {
    return objClassScope(this._dataClass);
  }

  private wrapInDataItem(obj: BasicObj) {
    const item = new ObjDataItem(this._dataClass, obj.id());
    item.setBasicObj(obj);

    return item;
  }

  private itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
  }

  private parentObj() {
    const parentId = this._params.filters?._obj_parent_id?.value;

    if (typeof parentId === 'string') {
      return getObjFrom(currentObjScope().and(excludeDeletedObjs), parentId);
    }
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
    return wrapInAppClass(this.getOrThrow());
  }

  /** @internal */
  getBasicObj(): BasicObj | null {
    if (this._obj === undefined) {
      this._obj = getDataObj(this._dataClass, this._dataId);
    }

    return this._obj;
  }

  /** @internal */
  setBasicObj(obj: BasicObj): void {
    this._obj = obj;
  }

  get(attributeName: string): unknown {
    const obj = this.getBasicObj();
    if (!obj) return null;

    const typeInfo = getAttributeTypeInfo(obj.objClass(), attributeName);
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
    const obj = this.getOrThrow();
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

  private getOrThrow() {
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
  return !!getRealmClass(className);
}

function getSchema(className: string) {
  const objClass = getRealmClass(className);

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
  const dataScope = currentObjScope();
  const dataClassName = dataClass.name();

  return dataClassName === 'Obj'
    ? dataScope
    : dataScope.and(restrictToObjClass(dataClassName));
}

function prepareAttributes(attributes: DataItemAttributes, className: string) {
  const preparedAttributes: BasicObjAttributes = {};

  Object.keys(attributes).forEach((attributeName) => {
    const attributeValue = attributes[attributeName];

    if (isSystemAttribute(attributeName)) {
      preparedAttributes[attributeName] = attributeValue;
    } else {
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

      preparedAttributes[attributeName] = [
        attributeType === 'reference'
          ? prepareReferenceValue(attributeValue, attributeConfig)
          : attributeValue,
        typeInfo,
      ];
    }
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

function attributeDefinitions(dataClassName: string) {
  if (isBuiltInClass(dataClassName)) return {};

  const attributes: NormalizedDataAttributeDefinitions = {};
  const normalizedAttributes = getSchema(dataClassName).normalizedAttributes();

  Object.keys(normalizedAttributes).forEach((attributeName) => {
    const dataAttributeDefinition = toDataAttributeDefinition(
      normalizedAttributes[attributeName]
    );

    if (dataAttributeDefinition) {
      attributes[attributeName] = dataAttributeDefinition;
    }
  });

  return attributes;
}

function toDataAttributeDefinition([
  cmsType,
  cmsTypeInfo,
]: NormalizedAttributeDefinition): NormalizedDataAttributeDefinition | null {
  if (cmsType === 'boolean' || cmsType === 'string') {
    return [cmsType, {}];
  }

  if (cmsType === 'float' || cmsType === 'integer') {
    return ['number', {}];
  }

  if (cmsType === 'enum') {
    return [
      'enum',
      {
        values: [
          ...cmsTypeInfo.values.map((value) => ({ value, title: value })),
        ],
      },
    ];
  }

  if (cmsType === 'reference') {
    const { only } = cmsTypeInfo;

    if (typeof only === 'string') {
      return ['reference', { to: only }];
    }

    if (Array.isArray(only) && only.length === 1) {
      return ['reference', { to: only[0] }];
    }
  }

  return null;
}

function currentObjScope() {
  return objSpaceScope(currentObjSpaceId());
}

function isBuiltInClass(dataClassName: string) {
  return dataClassName === 'Obj';
}
