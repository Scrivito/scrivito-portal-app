import isObject from 'lodash-es/isObject';

import {
  ArgumentError,
  ScrivitoError,
  assumePresence,
} from 'scrivito_sdk/common';
import {
  NormalizedDataClassSchema,
  getNormalizedDataClassSchema,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { isValidDataIdentifier } from 'scrivito_sdk/data_integration/data_identifier';
import type { Obj, ObjSearch } from 'scrivito_sdk/realm';

/** @public */
export abstract class DataClass {
  /** @beta */
  abstract create(attributes: DataItemAttributes): Promise<DataItem>;
  /** @beta */
  abstract all(): DataScope;
  /** @beta */
  abstract get(id: string): DataItem | null;
  /** @beta */
  abstract getUnchecked(id: string): DataItem;

  /** @public */
  abstract name(): string;

  /** @public */
  attributeDefinitions(): NormalizedDataClassSchema {
    return getNormalizedDataClassSchema(this.name());
  }

  /** @internal */
  abstract forAttribute(attributeName: string): DataScope;
}

/** @public */
export abstract class DataScope {
  /** @public */
  abstract dataClass(): DataClass | null;
  /** @public */
  abstract dataClassName(): string | null;
  /** @beta */
  abstract get(id: string): DataItem | null;

  /** @public */
  abstract create(attributes: DataItemAttributes): Promise<DataItem>;
  /** @public */
  abstract take(): DataItem[];
  /** @public */
  abstract transform(params: DataScopeParams): DataScope;
  /** @public */
  abstract objSearch(): ObjSearch | undefined;
  /** @public */
  abstract count(): number | null;

  /** @public */
  abstract isDataItem(): boolean;
  /** @public */
  abstract dataItem(): DataItem | null;

  /** @public */
  abstract attributeName(): string | null;

  /** @public */
  dataItemAttribute(): DataItemAttribute | null {
    const attributeName = this.attributeName();
    if (!attributeName) return null;

    const dataItem = this.dataItem();
    if (!dataItem) return null;

    return new DataItemAttribute(dataItem, attributeName);
  }

  /** @public */
  isEmpty(): boolean {
    return this.transform({ limit: 1 }).take().length === 0;
  }

  /** @public */
  containsData(): boolean {
    return !this.isEmpty();
  }

  /** @public */
  getError(): DataScopeError | undefined {
    return;
  }

  /** @public */
  abstract limit(): number | undefined;

  /** @internal */
  abstract toPojo(): DataScopePojo;
}

export class DataItemAttribute {
  constructor(
    private readonly _dataItem: DataItem,
    private readonly _attributeName: string
  ) {}

  dataClass(): DataClass {
    return this._dataItem.dataClass();
  }

  dataClassName(): string {
    return this._dataItem.dataClassName();
  }

  dataItem(): DataItem {
    return this._dataItem;
  }

  attributeName(): string {
    return this._attributeName;
  }

  get(): unknown {
    return this._dataItem.get(this._attributeName);
  }

  async update(value: unknown): Promise<void> {
    return this._dataItem.update({ [this._attributeName]: value });
  }
}

/** @public */
export type DataItemAttributes = Record<string, unknown>;

/** @public */
export type DataScopeFilters = Record<string, string | OperatorSpec>;

/** @public */
export interface DataScopeParams {
  filters?: DataScopeFilters;
  search?: string;
  order?: OrderSpec;
  limit?: number;
}

export type FilterOperator = 'equals' | 'notEquals';

export const DEFAULT_LIMIT = 20;

/** @public */
export interface OperatorSpec {
  operator: FilterOperator;
  value: string;
}

/** @public */
export type OrderSpec = Array<[string, 'asc' | 'desc']>;

export type DataScopePojo = PresentDataScopePojo | EmptyDataScopePojo;

export type PresentDataScopePojo = {
  _class: string;
  _attribute?: string;
} & DataScopeParams;

export type EmptyDataScopePojo = {
  _class: null | string;
  _error?: string;
  isEmpty: true;
  isDataItem: boolean;
};

export interface DataItemPojo {
  _id: string;
  _class: string;
}

/** @public */
export abstract class DataItem {
  /** @public */
  abstract id(): string;
  /** @public */
  abstract dataClass(): DataClass;
  /** @public */
  abstract dataClassName(): string;
  /** @public */
  abstract obj(): Obj | undefined;
  /** @public */
  abstract get(attributeName: string): unknown;
  /** @public */
  abstract update(attributes: DataItemAttributes): Promise<void>;
  /** @public */
  abstract delete(): Promise<void>;

  /** @public */
  attributeDefinitions(): NormalizedDataClassSchema {
    return assumePresence(this.dataClass()).attributeDefinitions();
  }
}

/** @public */
export class DataScopeError extends ScrivitoError {
  /** @internal */
  constructor(readonly message: string) {
    super(message);
  }
}

export function assertValidDataItemAttributes(
  attributes: unknown
): asserts attributes is DataItemAttributes {
  if (!isObject(attributes)) {
    throw new ArgumentError('Data item attributes must be an object');
  }

  if (!Object.keys(attributes as Object).every(isValidDataIdentifier)) {
    throw new ArgumentError(
      'Keys of data item attributes must be valid data identifiers'
    );
  }
}

export function assertNoAttributeFilterConflicts(
  attributes: DataItemAttributes,
  filters: DataScopeFilters
): void {
  Object.keys(attributes).forEach((attributeName) => {
    if (filters.hasOwnProperty(attributeName)) {
      const attributeValue = attributes[attributeName];
      const filterValue = filters[attributeName];

      if (attributeValue !== filterValue) {
        throw new ArgumentError(
          `Tried to create ${attributeName}: ${String(
            attributeValue
          )} in a context of ${attributeName}: ${JSON.stringify(filterValue)}`
        );
      }
    }
  });
}

export function combineFilters(
  currFilters: DataScopeFilters | undefined,
  nextFilters: DataScopeFilters | undefined
): DataScopeFilters | undefined {
  if (!currFilters) return nextFilters;

  if (nextFilters) {
    assertNoAttributeFilterConflicts(nextFilters, currFilters);
  }

  return { ...currFilters, ...nextFilters };
}

export function combineSearches(
  currSearch: string | undefined,
  nextSearch: string | undefined
): string | undefined {
  return currSearch && nextSearch
    ? `${currSearch} ${nextSearch}`
    : currSearch || nextSearch;
}

export function itemPojoToScopePojo({
  _class,
  _id,
}: DataItemPojo): DataScopePojo {
  return { _class, filters: { _id } };
}

export function itemIdFromFilters(
  filters: DataScopeFilters | undefined
): string | undefined {
  const id = filters?._id;
  if (typeof id === 'string') return id;
}
