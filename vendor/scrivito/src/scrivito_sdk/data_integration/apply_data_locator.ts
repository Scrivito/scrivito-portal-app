import {
  DataLocatorFilter,
  DataLocatorValueFilter,
  DataLocatorValueVia,
  DataLocatorValueViaFilter,
} from 'scrivito_sdk/client';
import { DataScope } from 'scrivito_sdk/data_integration/data_class';
import {
  findItemInDataStackAndGlobalData,
  findScopeInDataStackAndGlobalData,
} from 'scrivito_sdk/data_integration/data_context';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataLocator,
  isDataLocatorValueFilter,
} from 'scrivito_sdk/data_integration/data_locator';
import { DataLocatorError } from 'scrivito_sdk/data_integration/data_locator_error';
import {
  DataStack,
  isDataScopePojo,
} from 'scrivito_sdk/data_integration/data_stack';
import {
  dataItemFromPojo,
  dataScopeFromPojo,
} from 'scrivito_sdk/data_integration/deserialization';
import { EmptyDataScope } from 'scrivito_sdk/data_integration/empty_data_scope';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';

export function applyDataLocator(
  dataStack: DataStack | undefined,
  dataLocator: DataLocator | null | undefined
): DataScope {
  if (!dataLocator) return new EmptyDataScope();

  const className = dataLocator.class();
  if (className === null) return new EmptyDataScope();

  return dataLocator.viaRef()
    ? findMatchingDataScopeOrThrow(className, dataStack)
    : applyDataLocatorDefinition(className, dataStack, dataLocator);
}

function applyDataLocatorDefinition(
  className: string,
  dataStack: DataStack | undefined,
  dataLocator: DataLocator
): DataScope {
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

function findMatchingDataScopeOrThrow(
  className: string,
  dataStack: DataStack | undefined
): DataScope {
  const itemElement = findMatchingScopeElementOrThrow(className, dataStack);
  if (isDataScopePojo(itemElement)) return dataScopeFromPojo(itemElement);

  throw new DataLocatorError(`No ${className} scope found`);
}

function findMatchingItemElementOrThrow(
  dataClass: string,
  dataStack: DataStack | undefined
) {
  if (!dataStack) {
    throw new DataLocatorError(`No ${dataClass} found`);
  }

  const itemElement = findItemInDataStackAndGlobalData(dataClass, dataStack);

  if (!itemElement) {
    throw new DataLocatorError(`No ${dataClass} item found`);
  }

  return itemElement;
}

function findMatchingScopeElementOrThrow(
  dataClass: string,
  dataStack: DataStack | undefined
) {
  if (!dataStack) {
    throw new DataLocatorError(`No ${dataClass} found`);
  }

  const itemElement = findScopeInDataStackAndGlobalData(dataClass, dataStack);

  if (!itemElement) {
    throw new DataLocatorError(`No ${dataClass} scope found`);
  }

  return itemElement;
}
