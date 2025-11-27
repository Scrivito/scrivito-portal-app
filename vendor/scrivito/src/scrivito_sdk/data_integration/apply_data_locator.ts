import {
  DataLocatorFilter,
  DataLocatorOperatorFilter,
  DataLocatorValueFilter,
  DataLocatorValueViaFilter,
  ViaRef,
  isDataLocatorOperatorFilter,
} from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration';
import {
  DataItem,
  DataScope,
  DataScopeError,
  isFilterOperator,
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
import { operatorToOpCode } from 'scrivito_sdk/data_integration/index_params';
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

    const sourceDataScope = viaRef
      ? findMatchingDataScopeOrThrow(className, dataStack, viaRef)
      : getDataClassOrThrow(className).all();

    return applyDataLocatorDefinition(sourceDataScope, dataStack, dataLocator);
  } catch (error) {
    if (error instanceof ArgumentError) {
      return new EmptyDataScope({ error: new DataScopeError(error.message) });
    }

    throw error;
  }
}

function applyDataLocatorDefinition(
  sourceDataScope: DataScope,
  dataStack: DataStack,
  dataLocator: DataLocator
): DataScope {
  let dataScope = sourceDataScope;
  const attributeName = dataLocator.field();

  if (attributeName) {
    dataScope = dataScope.transform({ attributeName });
  }

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
  const [fullOperator] =
    Object.entries(operatorToOpCode).find(([_, val]) => val === operator) || [];

  return scope.transform({
    filters: {
      [field]: {
        operator: isFilterOperator(fullOperator) ? fullOperator : 'equals',
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

  if (viaField === '_obj_parent_id') {
    const parentObj = viaDataItem.obj()?.parent();

    if (parentObj) {
      return applyValueFilter(scope, { field: '_id', value: parentObj.id() });
    }

    return new EmptyDataScope();
  }

  if (viaField === '_id') {
    return applyValueFilter(scope, { field, value: viaDataItem.id() });
  }

  if (field === '_id') {
    const value = viaDataItem.getRaw(viaField);
    const dataClass = scope.dataClass() ?? undefined;

    if (value === undefined || value === null) {
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
  viaRef: ViaRef
): DataScope {
  const element = findScopeElementInDataStackAndGlobalData(
    className,
    dataStack,
    viaRef
  );

  if (!element) throw new ArgumentError(`No ${className} scope found`);

  const scope = deserializeDataStackElement(element);
  if (scope instanceof DataScope) return scope;

  throw new ArgumentError(`No ${className} scope found`);
}
