import { getDataClassOrThrow } from 'scrivito_sdk/data_integration';
import {
  DataItem,
  DataItemPojo,
  DataScope,
  DataScopeError,
  DataScopePojo,
  EmptyDataScopePojo,
  PresentDataScopePojo,
} from 'scrivito_sdk/data_integration/data_class';
import { EmptyDataScope } from 'scrivito_sdk/data_integration/empty_data_scope';

export type DataStack = Array<DataStackElement>;
export type DataStackElement = DataItemPojo | DataScopePojo;

export function isDataItemPojo(
  element: DataStackElement
): element is DataItemPojo {
  return !!(element as DataItemPojo)._id;
}

export function isSingleItemElement(
  element: DataStackElement
): element is DataItemPojo | PresentDataScopePojo {
  return isDataItemPojo(element) || isSingleItemDataScopePojo(element);
}

export function isMultiItemDataScopePojo(
  element: DataStackElement
): element is PresentDataScopePojo {
  return isPresentDataScopePojo(element) && !element?.filters?._id;
}

function isSingleItemDataScopePojo(
  element: DataStackElement
): element is PresentDataScopePojo {
  return isPresentDataScopePojo(element) && !!element?.filters?._id;
}

function isPresentDataScopePojo(
  element: DataStackElement
): element is PresentDataScopePojo {
  return isDataScopePojo(element) && !isEmptyDataScopePojo(element);
}

function isEmptyDataScopePojo(pojo: DataScopePojo): pojo is EmptyDataScopePojo {
  return 'isEmpty' in pojo && pojo.isEmpty === true;
}

function isDataScopePojo(element: DataStackElement): element is DataScopePojo {
  return !isDataItemPojo(element);
}

export function deserializeDataStackElement(
  element: DataStackElement
): DataScope | DataItem | undefined {
  return isDataItemPojo(element)
    ? deserializeDataItem(element)
    : deserializeDataScope(element);
}

export function findItemInDataStack(
  dataClassName: string,
  dataStack: DataStack
): DataItemPojo | undefined {
  const itemElements = dataStack.filter(isDataItemPojo);
  return itemElements.find((element) => element._class === dataClassName);
}

export function findScopeInDataStack(
  dataClassName: string,
  dataStack: DataStack
): DataScopePojo | undefined {
  const element = dataStack.find((el) => el._class === dataClassName);
  if (element && isDataScopePojo(element)) return element;
}

export function deserializeDataScope({
  _class: dataClassName,
  ...dataScopeParams
}: DataScopePojo): DataScope | undefined {
  if (dataClassName) {
    const dataClass = getDataClassOrThrow(dataClassName);

    if ('isEmpty' in dataScopeParams) {
      const error = dataScopeParams._error
        ? new DataScopeError(dataScopeParams._error)
        : undefined;

      return new EmptyDataScope({
        dataClass,
        error,
        isDataItem: dataScopeParams.isDataItem,
      });
    }

    const attributeName =
      ('_attribute' in dataScopeParams && dataScopeParams._attribute) ||
      undefined;

    return dataClass.all().transform({ ...dataScopeParams, attributeName });
  }
}

export function deserializeDataItem({
  _class: dataClass,
  _id: dataId,
}: DataItemPojo): DataItem | undefined {
  return getDataClassOrThrow(dataClass).get(dataId) || undefined;
}
