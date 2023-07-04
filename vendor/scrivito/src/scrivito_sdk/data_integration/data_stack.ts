import {
  DataItemPojo,
  DataScopePojo,
} from 'scrivito_sdk/data_integration/data_class';

export type DataStack = Array<DataStackElement>;
export type DataStackElement = DataItemPojo | DataScopePojo;

export function isDataItemPojo(
  element: DataStackElement
): element is DataItemPojo {
  return !!(element as DataItemPojo)._id;
}

export function isDataScopePojo(
  element: DataStackElement
): element is DataScopePojo {
  return !isDataItemPojo(element);
}
