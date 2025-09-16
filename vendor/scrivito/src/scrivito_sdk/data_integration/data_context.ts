import * as URI from 'urijs';

import { ViaRef } from 'scrivito_sdk/client';
import {
  ArgumentError,
  QueryParameters,
  parameterizeDataClass,
  throwNextTick,
} from 'scrivito_sdk/common';
import {
  getDataClass,
  getDataClassOrThrow,
} from 'scrivito_sdk/data_integration';
import { basicObjToDataContext } from 'scrivito_sdk/data_integration/basic_obj_to_data_context';
import {
  DataItem,
  DataItemPojo,
  DataScopePojo,
  itemPojoToScopePojo,
} from 'scrivito_sdk/data_integration/data_class';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataStack,
  findItemInDataStack,
  findScopeInDataStack,
} from 'scrivito_sdk/data_integration/data_stack';
import { ExternalDataItem } from 'scrivito_sdk/data_integration/external_data_class';
import {
  findItemInGlobalData,
  findScopeInGlobalData,
} from 'scrivito_sdk/data_integration/global_data';
import { ObjDataItem } from 'scrivito_sdk/data_integration/obj_data_class';
import { loadWithDefault } from 'scrivito_sdk/loadable';
import {
  BasicLink,
  BasicObj,
  DataIdentifier,
  isValidDataIdentifier,
} from 'scrivito_sdk/models';

export type DataContext = Record<DataIdentifier, DataContextValue>;
export type DataContextValue = string;

export type DataContextCallback = (
  identifier: DataIdentifier
) => DataContextValue | undefined;

function isValidDataContextValue(
  maybeValue: unknown
): maybeValue is DataContextValue | undefined {
  return typeof maybeValue === 'string' || maybeValue === undefined;
}

export function getDataContextQuery(
  objOrLink: BasicObj | BasicLink,
  dataStack: DataStack,
  query?: string
): string | undefined {
  const parameters = getDataContextParameters(objOrLink, dataStack);

  if (parameters) {
    return URI.buildQuery(
      query ? Object.assign(parameters, URI.parseQuery(query)) : parameters
    );
  }

  return query;
}

interface DataContextParameters {
  [parameterName: string]: string;
}

export function getDataContextParameters(
  objOrLink: BasicObj | BasicLink,
  dataStack: DataStack
): DataContextParameters | undefined {
  if (dataStack.length === 0) return;

  const target = getObj(objOrLink);
  if (!target) return;

  let params: DataContextParameters = {};

  [target, ...target.ancestors()].forEach((obj) => {
    const dataParam = obj?.dataParam();
    if (!dataParam) return;

    const [dataClass] = dataParam;
    if (!dataClass) return;

    const itemElement = findItemInDataStack(dataClass, dataStack);

    params = {
      ...params,
      ...dataContextParamsForElement(itemElement, dataClass),
    };
  });

  if (Object.keys(params).length > 0) return params;
}

function dataContextParamsForElement(
  stackElement: DataItemPojo | undefined,
  dataClass: string
): DataContextParameters | undefined {
  if (stackElement && stackElement._class === dataClass) {
    return {
      [parameterizeDataClass(dataClass)]: stackElement._id,
    };
  }
}

export function findItemElementInDataStackAndGlobalData(
  dataClassName: string,
  dataStack: DataStack
): DataItemPojo | undefined {
  return (
    findItemInDataStack(dataClassName, dataStack) ||
    findItemInGlobalData(dataClassName)
  );
}

export function findScopeElementInDataStackAndGlobalData(
  dataClassName: string,
  dataStack: DataStack,
  viaRef: ViaRef
): DataScopePojo | undefined {
  if (viaRef === 'multi') {
    const scopePojo = findScopeInDataStack(dataClassName, dataStack);
    if (scopePojo) return scopePojo;
  }

  const itemPojo = findItemInDataStack(dataClassName, dataStack);
  if (itemPojo) return itemPojoToScopePojo(itemPojo);

  return findScopeInGlobalData(dataClassName);
}

export function dataContextFromQueryParams(
  obj: BasicObj,
  params: QueryParameters
): DataContext | 'loading' | 'unavailable' | undefined {
  const dataParam = obj.dataParam();
  if (!dataParam) return;

  const [dataClassName] = dataParam;
  if (!dataClassName) return;

  const dataId = getDataId(dataClassName, params);
  if (!isValidDataId(dataId)) return 'unavailable';

  const dataClass = getDataClass(dataClassName);
  if (!dataClass) return;

  const dataItem = loadWithDefault('loading', () => dataClass.get(dataId));

  if (dataItem === 'loading') return 'loading';
  if (!dataItem) return 'unavailable';

  return dataItemToDataContext(dataItem);
}

export function dataItemToDataContext(dataItem: DataItem): DataContext {
  if (dataItem instanceof ObjDataItem) {
    return objDataItemToDataContext(dataItem);
  }

  // assumption: DataItem can only be either ObjDataItem or ExternalDataItem
  return externalDataItemToDataContext(dataItem as ExternalDataItem);
}

function objDataItemToDataContext(dataItem: ObjDataItem) {
  const basiObj = dataItem.getBasicObj();
  return basiObj ? basicObjToDataContext(basiObj) : {};
}

function externalDataItemToDataContext(dataItem: ExternalDataItem) {
  return {
    _class: dataItem.dataClassName(),
    _id: dataItem.id(),
    ...dataItem.getCustomAttributes(),
  };
}

function getDataId(dataClassName: string, params: QueryParameters) {
  return (
    getDataIdFromParams(dataClassName, params) ||
    getDataIdOfFirstDataItem(dataClassName)
  );
}

function getDataIdFromParams(dataClassName: string, params: QueryParameters) {
  const dataId = params[parameterizeDataClass(dataClassName)];
  if (typeof dataId === 'string' && dataId.length > 0) return dataId;
}

function getDataIdOfFirstDataItem(dataClassName: string) {
  const [firstDataItem] = getDataClassOrThrow(dataClassName)
    .all()
    .transform({ limit: 1 })
    .take();

  if (firstDataItem) return firstDataItem.id();
}

function getObj(objOrLink: BasicObj | BasicLink) {
  if (objOrLink instanceof BasicObj) return objOrLink;

  if (objOrLink.isInternal()) {
    const obj = objOrLink.obj();
    if (obj instanceof BasicObj) return obj;
  }
}

export function getDataContextValue(
  identifier: DataIdentifier,
  context: DataContext
): DataContextValue | undefined {
  if (!isValidDataIdentifier(identifier)) return undefined;

  const value = context[identifier];
  if (isValidDataContextValue(value)) return value;

  throwNextTick(
    new ArgumentError(
      `Expected a data context value to be a string or undefined, but got ${value}`
    )
  );
}
