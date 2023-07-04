import * as URI from 'urijs';

import {
  ArgumentError,
  QueryParameters,
  throwNextTick,
  underscore,
} from 'scrivito_sdk/common';
import { basicObjToDataContext } from 'scrivito_sdk/data_integration/basic_obj_to_data_context';
import { DataItemPojo } from 'scrivito_sdk/data_integration/data_class';
import { isValidDataId } from 'scrivito_sdk/data_integration/data_id';
import {
  DataIdentifier,
  isValidDataIdentifier,
} from 'scrivito_sdk/data_integration/data_identifier';
import {
  DataStack,
  isDataItemPojo,
} from 'scrivito_sdk/data_integration/data_stack';
import {
  ExternalData,
  getExternalData,
} from 'scrivito_sdk/data_integration/external_data';
import { isExternalDataClassProvided } from 'scrivito_sdk/data_integration/external_data_class';
import { externalDataToDataContext } from 'scrivito_sdk/data_integration/external_data_to_data_context';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';
import { getDefaultItemIdForDataClass } from 'scrivito_sdk/data_integration/global_data';
import { isObjDataClassProvided } from 'scrivito_sdk/data_integration/obj_data_class';
import { loadWithDefault } from 'scrivito_sdk/loadable';
import {
  BasicLink,
  BasicObj,
  currentObjSpaceId,
  getObjFrom,
  objSpaceScope,
  restrictToObjClass,
} from 'scrivito_sdk/models';

export type DataContext = Record<DataIdentifier, DataContextValue>;
export type DataContextValue = string;

export type DataContextCallback = (
  identifier: DataIdentifier
) => DataContextValue | undefined;

export function isValidDataContextValue(
  maybeValue: unknown
): maybeValue is DataContextValue | undefined {
  return typeof maybeValue === 'string' || maybeValue === undefined;
}

export function isValidDataClassName(
  maybeDataClassName: unknown
): maybeDataClassName is DataContextValue {
  return (
    typeof maybeDataClassName === 'string' &&
    !!maybeDataClassName.match(/^[A-Z][a-zA-Z0-9]{0,49}$/)
  );
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
  const obj = getObj(objOrLink);
  if (!obj) return;

  const objDataClass = obj.dataClass();
  if (!objDataClass) return;

  const stackElement = findMatchingItemElement(objDataClass, dataStack);
  let params = dataContextParamsForElement(stackElement, objDataClass);

  if (dataStack.length > 0) {
    obj.ancestors().forEach((ancestor) => {
      const ancestorDataClass = ancestor?.dataClass();
      if (!ancestorDataClass) return;

      const ancestorItemElement = findMatchingItemElementInDataStack(
        ancestorDataClass,
        dataStack
      );

      params = {
        ...params,
        ...dataContextParamsForElement(ancestorItemElement, ancestorDataClass),
      };
    });
  }

  return params;
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

export function findMatchingItemElement(
  dataClassName: string,
  dataStack: DataStack
): DataItemPojo | undefined {
  return (
    findMatchingItemElementInDataStack(dataClassName, dataStack) ||
    findMatchingItemElementInGlobalData(dataClassName)
  );
}

function findMatchingItemElementInDataStack(
  dataClassName: string,
  dataStack: DataStack
) {
  const itemElements = dataStack.filter(isDataItemPojo);
  return itemElements.find((element) => element._class === dataClassName);
}

function findMatchingItemElementInGlobalData(dataClassName: string) {
  const defaultItemId = getDefaultItemIdForDataClass(dataClassName);

  if (defaultItemId) {
    return {
      _class: dataClassName,
      _id: defaultItemId,
    };
  }
}

export function dataContextFromQueryParams(
  obj: BasicObj,
  params: QueryParameters
): DataContext | 'loading' | 'unavailable' | undefined {
  const dataClassName = obj.dataClass();
  if (!dataClassName) return;

  const dataId = getDataId(dataClassName, params);
  if (!isValidDataId(dataId)) return 'unavailable';

  if (isExternalDataClassProvided(dataClassName)) {
    return getDataContextFromExternalData(dataClassName, dataId);
  }

  if (isObjDataClassProvided(dataClassName)) {
    return getDataContextFromObjData(dataClassName, dataId);
  }
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

function getDataContextFromExternalData(dataClassName: string, dataId: string) {
  return getDataContextFrom<ExternalData>(
    () => getExternalData(dataClassName, dataId),
    (externalData) =>
      externalDataToDataContext(externalData, dataClassName, dataId)
  );
}

function getDataContextFromObjData(objClassName: string, objId: string) {
  return getDataContextFrom<BasicObj>(
    () => getBasicObjFrom(objClassName, objId),
    basicObjToDataContext
  );
}

function getDataContextFrom<T>(
  load: () => T | null | undefined,
  map: (data: T) => DataContext | 'loading' | 'unavailable' | undefined
) {
  const data = loadWithDefault('loading', load);

  if (data === 'loading') return 'loading';
  if (!data) return 'unavailable';

  return map(data);
}

function getBasicObjFrom(objClassName: string, objId: string) {
  return getObjFrom(
    objSpaceScope(currentObjSpaceId()).and(restrictToObjClass(objClassName)),
    objId
  );
}

function parameterizeDataClass(dataClass: string): string {
  return `${underscore(dataClass)}_id`;
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
