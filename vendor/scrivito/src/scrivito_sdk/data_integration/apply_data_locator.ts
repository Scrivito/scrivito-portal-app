import {
  DataLocatorFilter,
  DataLocatorValueFilter,
  DataLocatorValueVia,
  DataLocatorValueViaFilter,
} from 'scrivito_sdk/client';
import { DataScope } from 'scrivito_sdk/data_integration/data_class';
import { findMatchingItemElement } from 'scrivito_sdk/data_integration/data_context';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataLocator,
  isDataLocatorValueFilter,
} from 'scrivito_sdk/data_integration/data_locator';
import { DataLocatorError } from 'scrivito_sdk/data_integration/data_locator_error';
import { DataStack } from 'scrivito_sdk/data_integration/data_stack';
import { dataItemFromPojo } from 'scrivito_sdk/data_integration/deserialization';
import { EmptyDataScope } from 'scrivito_sdk/data_integration/empty_data_scope';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';

export function applyDataLocator(
  dataStack: DataStack | undefined,
  dataLocator: DataLocator | null | undefined
): DataScope {
  if (!dataLocator) return new EmptyDataScope();

  const className = dataLocator.class();
  if (className === null) return new EmptyDataScope();

  let dataScope = getDataClassOrThrow(className).all();

  const query = dataLocator.query();

  if (query) {
    dataScope = query.reduce(
      (scope, filter) => applyFilter(scope, filter, dataStack),
      dataScope
    );
  }

  const orderBy = dataLocator.orderBy();

  if (orderBy) {
    dataScope = dataScope.transform({ order: orderBy });
  }

  const size = dataLocator.size();

  if (size !== undefined) {
    dataScope = dataScope.transform({ limit: size });
  }

  return dataScope;
}

function applyFilter(
  scope: DataScope,
  filter: DataLocatorFilter,
  dataStack: DataStack | undefined
) {
  return isDataLocatorValueFilter(filter)
    ? applyValueFilter(scope, filter)
    : applyValueViaFilter(scope, filter, dataStack);
}

function applyValueFilter(
  scope: DataScope,
  { field, value }: DataLocatorValueFilter
) {
  return scope.transform({ filters: { [field]: value } });
}

function applyValueViaFilter(
  scope: DataScope,
  { field, value_via: valueVia }: DataLocatorValueViaFilter,
  dataStack: DataStack | undefined
) {
  const value = resolveValueVia(valueVia, dataStack);

  if (field === '_id' && !isValidDataId(value)) {
    throw new DataLocatorError(`${value} is not a valid data ID`);
  }

  return applyValueFilter(scope, { field, value });
}

function resolveValueVia(
  { class: viaClass, field: viaField }: DataLocatorValueVia,
  dataStack: DataStack | undefined
) {
  const dataItem = findMatchingDataItemOrThrow(viaClass, dataStack);
  if (viaField === '_id') return dataItem.id();

  const value = dataItem.get(viaField);

  if (typeof value !== 'string') {
    throw new DataLocatorError(
      `Attribute ${viaField} of ${viaClass} must be a string`
    );
  }

  return value;
}

function findMatchingDataItemOrThrow(
  viaClass: string,
  dataStack: DataStack | undefined
) {
  const itemElement = findMatchingItemElementOrThrow(viaClass, dataStack);
  const dataItem = dataItemFromPojo(itemElement);

  if (!dataItem) {
    throw new DataLocatorError(
      `No ${viaClass} item with ID ${itemElement._id} found`
    );
  }

  return dataItem;
}

function findMatchingItemElementOrThrow(
  dataClass: string,
  dataStack: DataStack | undefined
) {
  if (!dataStack) {
    throw new DataLocatorError(`No ${dataClass} found`);
  }

  const itemElement = findMatchingItemElement(dataClass, dataStack);

  if (!itemElement) {
    throw new DataLocatorError(`No ${dataClass} item found`);
  }

  return itemElement;
}
