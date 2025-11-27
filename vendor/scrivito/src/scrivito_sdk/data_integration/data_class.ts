import isEqual from 'lodash-es/isEqual';
import mapValues from 'lodash-es/mapValues';

import { FilterValue } from 'scrivito_sdk/client';
import { ArgumentError, ScrivitoError, isObject } from 'scrivito_sdk/common';
import {
  NormalizedDataAttributeDefinition,
  NormalizedDataAttributeDefinitions,
  getDataClassTitle,
  getNormalizedDataAttributeDefinitions,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { isValidDataIdentifier } from 'scrivito_sdk/models';
import type { Obj, ObjSearch } from 'scrivito_sdk/realm';

/** @public */
export abstract class DataClass {
  /** @public */
  abstract create(attributes: DataItemAttributes): Promise<DataItem>;
  /** @public */
  abstract all(): DataScope;
  /** @public */
  abstract get(id: string): DataItem | null;

  /** @beta */
  abstract getUnchecked(id: string): DataItem;

  /** @public */
  abstract name(): string;

  /** @public */
  attributeDefinitions(): NormalizedDataAttributeDefinitions {
    return getNormalizedDataAttributeDefinitions(this.name());
  }

  /** @internal */
  title(): string | undefined {
    return getDataClassTitle(this.name());
  }

  /** @internal */
  forAttribute(attributeName: string): DataScope {
    return this.all().transform({ attributeName });
  }
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
  abstract limit(): number | undefined;

  /** @internal */
  abstract toPojo(): DataScopePojo;

  /** @internal */
  normalizeFilters(
    filters?: DataScopeFilters
  ): NormalizedDataScopeFilters | undefined {
    if (!filters) return;

    return mapValues(filters, (valueOrSpec, attributeName) => {
      if (isAndOperatorSpec(valueOrSpec)) return valueOrSpec;

      const isOpSpec = isOperatorSpec(valueOrSpec);
      const actualValue = isOpSpec ? valueOrSpec.value : valueOrSpec;
      let serializedValue = actualValue;

      if (actualValue instanceof Date) {
        serializedValue = actualValue.toISOString();
      }

      if (actualValue instanceof DataItem) {
        serializedValue = actualValue.id();
      }

      if (
        serializedValue === null ||
        typeof serializedValue === 'string' ||
        typeof serializedValue === 'number' ||
        typeof serializedValue === 'boolean'
      ) {
        const operator = isOpSpec ? valueOrSpec.operator : 'equals';
        return { operator, value: serializedValue };
      }

      throw new ArgumentError(
        `Invalid filter value for "${attributeName}": ${JSON.stringify(
          valueOrSpec
        )}`
      );
    });
  }

  protected attributesFromFilters(filters?: NormalizedDataScopeFilters) {
    if (!filters) return;

    const initialAttributes: Record<string, unknown> = {};

    return Object.keys(filters).reduce((attributes, name) => {
      const filter = filters[name];
      const specs = isOperatorSpec(filter) ? [filter] : filter.value;

      specs.forEach((spec) => {
        if (spec.operator === 'equals') attributes[name] = spec.value;
      });

      return attributes;
    }, initialAttributes);
  }
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

  /** @internal */
  attributeDefinition(): NormalizedDataAttributeDefinition | null {
    return this.dataClass().attributeDefinitions()[this._attributeName] || null;
  }
}

/** @public */
export type DataItemAttributes = Record<string, unknown>;

export type NormalizedDataScopeFilters = Record<
  string,
  OperatorSpec | AndOperatorSpec
>;

/** @public */
export type DataScopeFilters = Record<
  string,
  DataScopeFilterValue | DataScopeOperatorSpec | AndOperatorSpec
>;

type DataScopeFilterValue = FilterValue | Date | DataItem;

export interface NormalizedDataScopeParams extends DataScopeParams {
  filters?: NormalizedDataScopeFilters;
}

/** @public */
export interface DataScopeParams {
  filters?: DataScopeFilters;
  search?: string;
  order?: OrderSpec;
  limit?: number;
  attributeName?: string;
}

export type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'isGreaterThan'
  | 'isLessThan'
  | 'isGreaterThanOrEquals'
  | 'isLessThanOrEquals';

export const DEFAULT_LIMIT = 20;

export interface AndOperatorSpec {
  operator: 'and';
  value: OperatorSpec[];
}

/** @public */
export interface OperatorSpec extends DataScopeOperatorSpec {
  value: FilterValue;
}

interface DataScopeOperatorSpec {
  operator: FilterOperator;
  value: DataScopeFilterValue;
}

/** @public */
export type OrderSpec = Array<[string, 'asc' | 'desc']>;

export type DataScopePojo = PresentDataScopePojo | EmptyDataScopePojo;

export type PresentDataScopePojo = {
  _class: string;
  _attribute?: string;
} & NormalizedDataScopeParams;

export type EmptyDataScopePojo = {
  _class: null | string;
  _error?: string;
  isEmpty: true;
  isDataItem: boolean;
};

export interface DataItemPojo {
  _id: string;
  _class: string;
  isBackground?: true;
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
  attributeDefinitions(): NormalizedDataAttributeDefinitions {
    return this.dataClass().attributeDefinitions();
  }

  /** @internal */
  title(): string | undefined {
    return this.dataClass().title();
  }

  /** @internal */
  getRaw(_attributeName: string): unknown {
    return;
  }

  /** @internal */
  getLocalized(attributeName: string): unknown {
    return this.get(attributeName);
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

  if (!Object.keys(attributes as object).every(isValidDataIdentifier)) {
    throw new ArgumentError(
      'Keys of data item attributes must be valid data identifiers'
    );
  }
}

export function combineFilters(
  currFilters: NormalizedDataScopeFilters | undefined,
  nextFilters: NormalizedDataScopeFilters | undefined
): NormalizedDataScopeFilters | undefined {
  if (!currFilters) return nextFilters;
  if (!nextFilters) return currFilters;

  let combinedFilters = { ...currFilters };

  Object.keys(nextFilters).forEach((attributeName) => {
    if (
      attributeName in combinedFilters &&
      !isEqual(combinedFilters[attributeName], nextFilters[attributeName])
    ) {
      const currentFilter = combinedFilters[attributeName];
      const nextFilter = nextFilters[attributeName];

      combinedFilters = {
        ...combinedFilters,
        [attributeName]: {
          operator: 'and',
          value: [
            ...(isOperatorSpec(currentFilter)
              ? [currentFilter]
              : currentFilter.value),
            ...(isOperatorSpec(nextFilter) ? [nextFilter] : nextFilter.value),
          ],
        },
      };

      return;
    }

    combinedFilters[attributeName] = nextFilters[attributeName];
  });

  return combinedFilters;
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
  return { _class, filters: { _id: { operator: 'equals', value: _id } } };
}

export function scopePojoToItemPojo({
  _class,
  filters,
}: PresentDataScopePojo): DataItemPojo | undefined {
  const id = itemIdFromFilters(filters);
  if (id) return { _class, _id: id };
}

export function itemIdFromFilters(
  filters: NormalizedDataScopeFilters | undefined
): string | undefined {
  const id = filters?._id?.value;
  if (typeof id === 'string') return id;
}

export function isFilterOperator(
  operator: unknown
): operator is FilterOperator {
  return (
    typeof operator === 'string' &&
    [
      'equals',
      'notEquals',
      'isGreaterThan',
      'isLessThan',
      'isGreaterThanOrEquals',
      'isLessThanOrEquals',
    ].includes(operator)
  );
}

export function isOperatorSpec(spec: unknown): spec is OperatorSpec {
  return (
    isObject(spec) &&
    'operator' in spec &&
    isFilterOperator(spec.operator) &&
    'value' in spec &&
    (spec.value === null ||
      ['string', 'number', 'boolean'].includes(typeof spec.value))
  );
}

function isAndOperatorSpec(spec: unknown): spec is AndOperatorSpec {
  return (
    isObject(spec) &&
    'operator' in spec &&
    spec.operator === 'and' &&
    'value' in spec &&
    Array.isArray(spec.value) &&
    spec.value.every(isOperatorSpec)
  );
}
