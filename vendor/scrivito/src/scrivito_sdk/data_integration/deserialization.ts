import {
  DataItem,
  DataItemPojo,
  DataScope,
  DataScopePojo,
} from 'scrivito_sdk/data_integration/data_class';
import { EmptyDataScope } from 'scrivito_sdk/data_integration/empty_data_scope';
import { getDataClassOrThrow } from 'scrivito_sdk/data_integration/get_data_class';

export function dataScopeFromPojo({
  dataClass,
  ...dataScopeParams
}: DataScopePojo): DataScope {
  return dataClass
    ? getDataClassOrThrow(dataClass).all().transform(dataScopeParams)
    : new EmptyDataScope();
}

export function dataItemFromPojo({
  _class: dataClass,
  _id: dataId,
}: DataItemPojo): DataItem | undefined {
  return getDataClassOrThrow(dataClass).get(dataId) || undefined;
}
