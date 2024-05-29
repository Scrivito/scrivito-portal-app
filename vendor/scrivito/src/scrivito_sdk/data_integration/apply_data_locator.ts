import {
  DataLocatorFilter,
  DataLocatorOperatorFilter,
  DataLocatorValueFilter,
  DataLocatorValueViaFilter,
  ViaRef,
  isDataLocatorOperatorFilter,
} from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import {
  DataItem,
  DataScope,
  DataScopeError,
} from 'scrivito_sdk/data_integration/data_class';
import {
  findItemElementInDataStackAndGlobalData,
  findScopeElementInDataStackAndGlobalData,
} from 'scrivito_sdk/data_integration/data_context';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataStack,
  deserializeDataStackElement,
} from 'scrivito_sdk/data_integration/data_stack';
import { EmptyDataScope } from 'scrivito_sdk/data_integration/empty_data_scope';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';
import { DataLocator, isDataLocatorValueViaFilter } from 'scrivito_sdk/models';

export function applyDataLocator(
  dataStack: DataStack,
  dataLocator: DataLocator | null | undefined
): DataScope {
  if (!dataLocator) return new EmptyDataScope();

  const className = dataLocator.class();
  if (className === null) return new EmptyDataScope();

  try {
    const viaRef = dataLocator.viaRef();

    return viaRef
      ? findMatchingDataScopeOrThrow(
          className,
          dataStack,
          viaRef,
          dataLocator.field()
        )
      : applyDataLocatorDefinition(className, dataStack, dataLocator);
  } catch (error) {
    if (error instanceof ArgumentError) {
      return new EmptyDataScope({ error: new DataScopeError(error.message) });
    }

    throw error;
  }
}

function applyDataLocatorDefinition(
  className: string,
  dataStack: DataStack,
  dataLocator: DataLocator
): DataScope {
  const field = dataLocator.field();
  const dataClass = getDataClassOrThrow(className);
  let dataScope = field ? dataClass.forAttribute(field) : dataClass.all();

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
  dataStack: DataStack
) {
  if (isDataLocatorOperatorFilter(filter)) {
    return applyOperatorFilter(scope, filter);
  }

  if (isDataLocatorValueViaFilter(filter)) {
    return applyValueViaFilter(scope, filter, dataStack);
  }

  return applyValueFilter(scope, filter);
}

function applyOperatorFilter(
  scope: DataScope,
  { field, operator, value }: DataLocatorOperatorFilter
) {
  return scope.transform({
    filters: {
      [field]: {
        operator: operator === 'neq' ? 'notEquals' : 'equals',
        value,
      },
    },
  });
}

function applyValueFilter(
  scope: DataScope,
  { field, value }: DataLocatorValueFilter
) {
  return scope.transform({ filters: { [field]: value } });
}

function applyValueViaFilter(
  scope: DataScope,
  {
    field,
    value_via: { class: viaClass, field: viaField },
  }: DataLocatorValueViaFilter,
  dataStack: DataStack
) {
  const viaDataItem = findMatchingDataItemOrThrow(viaClass, dataStack);

  if (viaField === '_id') {
    return applyValueFilter(scope, { field, value: viaDataItem.id() });
  }

  if (field === '_id') {
    const value = viaDataItem.get(viaField);
    const dataClass = scope.dataClass() ?? undefined;

    if (value === null) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true,
      });
    }

    if (!isValidDataId(value)) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true,
        error: new ArgumentError(
          `${JSON.stringify(value)} is not a valid data ID`
        ),
      });
    }

    return applyValueFilter(scope, { field, value });
  }

  throw new ArgumentError('Irregular relationship');
}

function findMatchingDataItemOrThrow(viaClass: string, dataStack: DataStack) {
  const element = findItemElementInDataStackAndGlobalData(viaClass, dataStack);
  if (!element) throw new ArgumentError(`No ${viaClass} item found`);

  const item = deserializeDataStackElement(element);
  if (item instanceof DataItem) return item;

  throw new ArgumentError(`No ${viaClass} item with ID ${element._id} found`);
}

function findMatchingDataScopeOrThrow(
  className: string,
  dataStack: DataStack,
  viaRef: ViaRef,
  attributeName: string | undefined
): DataScope {
  const element = findScopeElementInDataStackAndGlobalData(
    className,
    dataStack,
    viaRef
  );

  if (!element) throw new ArgumentError(`No ${className} scope found`);

  const scope = deserializeDataStackElement(element, attributeName);
  if (scope instanceof DataScope) return scope;

  throw new ArgumentError(`No ${className} scope found`);
}
