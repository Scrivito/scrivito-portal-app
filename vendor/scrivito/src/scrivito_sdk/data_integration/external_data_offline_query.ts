import { FilterValue } from 'scrivito_sdk/client';
import { DataConnectionError } from 'scrivito_sdk/data_integration';
import {
  NormalizedDataScopeFilters,
  OperatorSpec,
  OrderSpec,
} from 'scrivito_sdk/data_integration/data_class';
import {
  CollectionData,
  CollectionKey,
  findInExternalDataOfflineStore,
} from 'scrivito_sdk/data_integration/external_data';
import { NormalExternalData } from 'scrivito_sdk/data_integration/external_data_connection';

export async function queryExternalDataOfflineStore([
  wantedDataClass,
  filters,
  search,
  order,
  _count,
]: [
  string,
  NormalizedDataScopeFilters | undefined,
  string | undefined,
  OrderSpec | undefined,
  boolean | undefined
]): Promise<{ results: string[]; count: number }> {
  const collection = await findInExternalDataOfflineStore(
    (data, [dataClass, id]) => {
      if (data === null) return false;
      if (dataClass !== wantedDataClass) return false;

      return isMatchForFilters(id, data, filters);
    }
  );

  const results = withOrder(withSearch(collection, search), order).map(
    ([_data, [_class, id]]) => id
  );

  return { results, count: results.length };
}

function withOrder(
  collection: Array<[CollectionData, CollectionKey]>,
  order: OrderSpec | undefined
) {
  if (order === undefined || order.length === 0) return collection;

  return collection.sort((resultA, resultB) =>
    compareDataForSorting(order, resultA, resultB)
  );
}

function withSearch(
  collection: Array<[CollectionData, CollectionKey]>,
  searchTerm: string | undefined
) {
  if (!searchTerm) return collection;

  const searchTerms = searchTerm.trim().split(' ');

  return collection.filter(([data]) => {
    if (data) {
      return searchTerms.every((term) =>
        Object.values(data.customData).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  });
}

function isMatchForFilters(
  id: string,
  data: NormalExternalData,
  filters: NormalizedDataScopeFilters | undefined
): boolean {
  if (!filters) return true;

  return Object.keys(filters).every((attribute) => {
    const filter = filters[attribute];

    if (filter.operator === 'and') {
      return filter.value.every((operatorSpec) =>
        isMatchForFilters(id, data, { [attribute]: operatorSpec })
      );
    }

    return filterMatchesValue(filter, attributeValue(id, data, attribute));
  });
}

function filterMatchesValue(filter: OperatorSpec, dataValue: unknown) {
  switch (filter.operator) {
    case 'equals':
      return dataValue === filter.value;

    case 'notEquals':
      return dataValue !== filter.value;

    case 'isGreaterThan':
      return isGreaterIfComparable(dataValue, filter.value) === true;

    case 'isGreaterThanOrEquals':
      return (
        dataValue === filter.value ||
        isGreaterIfComparable(dataValue, filter.value) === true
      );

    case 'isLessThan':
      return (
        dataValue !== filter.value &&
        isGreaterIfComparable(dataValue, filter.value) === false
      );

    case 'isLessThanOrEquals':
      return isGreaterIfComparable(dataValue, filter.value) === false;

    default:
      throwUnhandledOperator(filter.operator);
  }
}

// the 'operator' argument is typed as 'never' to indicate that this function should never be called.
// This makes TS warn us, if we add any new operators without also adding code for them here.
function throwUnhandledOperator(operator: never) {
  throwNotSupported(`operator ${operator}`);
}

/** does a 'greater than' comparison, if the two values are comparable
 *
 * returns:
 * - true, if comparable and greater
 * - false, if comparable and smaller or equal
 * - undefined, if not comparable
 */
function isGreaterIfComparable(dataValue: unknown, filterValue: FilterValue) {
  if (typeof filterValue === 'number' && typeof dataValue === 'number') {
    return dataValue > filterValue;
  }

  if (typeof filterValue === 'string' && typeof dataValue === 'string') {
    return dataValue > filterValue;
  }

  return undefined;
}

function compareDataForSorting(
  [[attribute, direction], ...remainingOrder]: OrderSpec,
  [dataA, [classA, idA]]: [NormalExternalData | null, [string, string]],
  [dataB, [classB, idB]]: [NormalExternalData | null, [string, string]]
) {
  const result = compareValuesForSorting(
    attributeValue(idA, dataA, attribute),
    attributeValue(idB, dataB, attribute)
  );

  if (result === 0 && remainingOrder.length > 0) {
    return compareDataForSorting(
      remainingOrder,
      [dataA, [classA, idA]],
      [dataB, [classB, idB]]
    );
  }

  const multiplier = direction === 'asc' ? 1 : -1;

  return multiplier * result;
}

/** compare two values for the purpose of sorting
 *
 * returns
 * - negative, if A is smaller than B
 * - zero, if A is equal to B
 * - positive, if A is greater than B
 */
function compareValuesForSorting(valueA: unknown, valueB: unknown): number {
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    // sort numbers in natural order
    return valueA - valueB;
  }

  if (typeof valueA === 'string' && typeof valueB === 'string') {
    // sort strings lexicographically
    return valueB === valueA ? 0 : valueA > valueB ? 1 : -1;
  }

  // sort numbers to the beginning
  if (typeof valueA === 'number') return -1;
  if (typeof valueB === 'number') return 1;

  // sort strings to the end
  if (typeof valueA === 'string') return 1;
  if (typeof valueB === 'string') return -1;

  // sort all other types (null, boolean, object, array) in the middle,
  // in no particular order.
  return 0;
}

function attributeValue(
  id: string,
  data: NormalExternalData | null,
  attribute: string
) {
  if (!data) return null;

  const rawValue = attribute === '_id' ? id : data.customData[attribute];

  // make sure that "equals null" also matches when the attribute is missing
  return rawValue === undefined ? null : rawValue;
}

function throwNotSupported(description: string): never {
  throw new DataConnectionError(`Not supported: ${description}`);
}
