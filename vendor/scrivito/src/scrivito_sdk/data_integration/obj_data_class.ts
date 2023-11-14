import { ArgumentError } from 'scrivito_sdk/common';
import {
  DEFAULT_LIMIT,
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeParams,
  PresentDataScopePojo,
  assertNoAttributeFilterConflicts,
  combineFilters,
  combineSearches,
} from 'scrivito_sdk/data_integration/data_class';
import {
  BasicObj,
  BasicObjAttributes,
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
}

function getDataObj(dataClass: DataClass, dataId: string): BasicObj | null {
  return getObjFrom(objClassScope(dataClass).and(excludeDeletedObjs), dataId);
}

export class ObjDataScope extends DataScope {
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

  transform({ filters, search, order, limit }: DataScopeParams): DataScope {
    return new ObjDataScope(this._dataClass, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit ?? this._params.limit,
    });
  }

  objSearch(): ObjSearch {
    return new ObjSearch(this.getSearch());
  }

  /** @internal */
  toPojo(): PresentDataScopePojo {
    return {
      _class: this._dataClass.name(),
      ...this._params,
    };
  }

  private getSearch() {
    let initialSearch = this.objClassScope().and(excludeDeletedObjs).search();

    const { filters, search, order: givenOrder } = this._params;

    if (search) {
      initialSearch = initialSearch.and('*', 'matches', search);
    }

    if (givenOrder) {
      const order = givenOrder.filter(([attributeName]) => !!attributeName);
      if (order.length) initialSearch = initialSearch.order(order);
    }

    if (!filters) return initialSearch;

    return Object.keys(filters).reduce(
      (finalSearch, attributeName) =>
        attributeName
          ? finalSearch.and(attributeName, 'equals', filters[attributeName])
          : finalSearch,
      initialSearch
    );
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

    const [attributeType] = typeInfo;

    if (SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      return obj.get(attributeName, typeInfo);
    }

    if (attributeType === 'reference') {
      const reference = obj.get(attributeName, 'reference');
      if (reference) return reference.id();
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

  private dataClassName() {
    return this._dataClass.name();
  }
}

function getAttributeTypeInfo(dataClassName: string, attributeName: string) {
  return getSchema(dataClassName).attribute(attributeName);
}

export function isObjDataClassProvided(dataClassName: string): boolean {
  return !!getClass(dataClassName);
}

function getSchema(dataClassName: string) {
  const objClass = getClass(dataClassName);

  if (!objClass) {
    throw new ArgumentError(`Class ${dataClassName} does not exist`);
  }

  const schema = Schema.forClass(objClass);

  if (!schema) {
    throw new ArgumentError(`Class ${dataClassName} has no schema`);
  }

  return schema;
}

function objClassScope(dataClass: DataClass) {
  return objSpaceScope(currentObjSpaceId()).and(
    restrictToObjClass(dataClass.name())
  );
}

function prepareAttributes(
  attributes: DataItemAttributes,
  dataClassName: string
) {
  const preparedAttributes: BasicObjAttributes = {};

  Object.keys(attributes).forEach((attributeName) => {
    const typeInfo = getAttributeTypeInfo(dataClassName, attributeName);

    if (!typeInfo) {
      throw new ArgumentError(
        `Attribute ${attributeName} of class ${dataClassName} does not exist`
      );
    }

    const [attributeType] = typeInfo;

    if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      throw new ArgumentError(
        `Attribute ${attributeName} of class ${dataClassName} has unsupported type ${attributeType}`
      );
    }

    preparedAttributes[attributeName] = [attributes[attributeName], typeInfo];
  });

  return preparedAttributes;
}
