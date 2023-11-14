import isObject from 'lodash-es/isObject';

import { ArgumentError } from 'scrivito_sdk/common';
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
}

/** @public */
export abstract class DataScope {
  /** @beta */
  abstract dataClass(): DataClass | null;
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
  isEmpty(): boolean {
    return this.transform({ limit: 1 }).take().length === 0;
  }

  /** @public */
  containsData(): boolean {
    return !this.isEmpty();
  }

  /** @internal */
  abstract toPojo(): DataScopePojo;
}

/** @public */
export type DataItemAttributes = Record<string, unknown>;

/** @public */
export type DataItemFilters = Record<string, string>;

/** @public */
export interface DataScopeParams {
  filters?: DataItemFilters;
  search?: string;
  order?: OrderSpec;
  limit?: number;
}

export const DEFAULT_LIMIT = 20;

/** @public */
export type OrderSpec = Array<[string, 'asc' | 'desc']>;

export type DataScopePojo = PresentDataScopePojo | EmptyDataScopePojo;
export type PresentDataScopePojo = { _class: string } & DataScopeParams;
export type EmptyDataScopePojo = { _class: null };

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
  abstract obj(): Obj | undefined;
  /** @public */
  abstract get(attributeName: string): unknown;
  /** @public */
  abstract update(attributes: DataItemAttributes): Promise<void>;
  /** @public */
  abstract delete(): Promise<void>;
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
  filters: DataItemFilters
): void {
  Object.keys(attributes).forEach((attributeName) => {
    if (filters.hasOwnProperty(attributeName)) {
      const attributeValue = attributes[attributeName];
      const filterValue = filters[attributeName];

      if (attributeValue !== filterValue) {
        throw new ArgumentError(
          `Tried to create ${attributeName}: ${String(
            attributeValue
          )} in a context of ${attributeName}: ${filterValue}`
        );
      }
    }
  });
}

export function combineFilters(
  currFilters: DataItemFilters | undefined,
  nextFilters: DataItemFilters | undefined
): DataItemFilters | undefined {
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
