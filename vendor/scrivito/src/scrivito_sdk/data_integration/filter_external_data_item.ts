import { isRelationalOpCode } from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import {
  AndFilterSpec,
  DataConnectionFilters,
  FilterSpec,
  isAndFilterSpec,
} from 'scrivito_sdk/data_integration/index_params';
import { SINGLETON_DATA_ID } from 'scrivito_sdk/data_integration/provide_external_data_item';
import { load } from 'scrivito_sdk/loadable';

export async function filterExternalDataItem(
  dataItem: DataItem,
  filters: DataConnectionFilters
) {
  const doesMatch = await load(() =>
    Object.entries(filters).every(([name, filter]) => {
      if (!filter) return false;

      return name === '_id' || valueMatchesFilter(dataItem.get(name), filter);
    })
  );

  return { results: doesMatch ? [SINGLETON_DATA_ID] : [] };
}

function valueMatchesFilter(
  itemValue: unknown,
  filter: FilterSpec | AndFilterSpec
): boolean {
  if (isAndFilterSpec(filter)) {
    return filter.value.every((spec) => valueMatchesFilter(itemValue, spec));
  }

  const { value: filterValue, opCode } = filter;

  if (Array.isArray(itemValue)) {
    if (opCode === 'neq') {
      return itemValue.every((element) => valueMatchesFilter(element, filter));
    }

    return itemValue.some((element) => valueMatchesFilter(element, filter));
  }

  if (isRelationalOpCode(opCode)) {
    assertStringOrNumber(itemValue);
    assertStringOrNumber(filterValue);

    return RELATIONAL_OPERATOR_COMPARATORS[opCode](itemValue, filterValue);
  }

  const areEqual = filterValue === itemValue;
  return opCode === 'neq' ? !areEqual : areEqual;
}

type ComparisonType = string | number;

const RELATIONAL_OPERATOR_COMPARATORS = {
  gt: (a: ComparisonType, b: ComparisonType) => a > b,
  lt: (a: ComparisonType, b: ComparisonType) => a < b,
  gte: (a: ComparisonType, b: ComparisonType) => a >= b,
  lte: (a: ComparisonType, b: ComparisonType) => a <= b,
};

function assertStringOrNumber(arg: unknown): asserts arg is ComparisonType {
  if (typeof arg === 'string' || typeof arg === 'number') return;

  throw new ArgumentError(`Must be a string or number, but got ${String(arg)}`);
}
