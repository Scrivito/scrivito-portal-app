import { basicObjToDataContext } from 'scrivito_sdk/data_integration/basic_obj_to_data_context';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { DataContext } from 'scrivito_sdk/data_integration/data_context';
import { getExternalData } from 'scrivito_sdk/data_integration/external_data';
import { ExternalDataItem } from 'scrivito_sdk/data_integration/external_data_class';
import { externalDataToDataContext } from 'scrivito_sdk/data_integration/external_data_to_data_context';
import { ObjDataItem } from 'scrivito_sdk/data_integration/obj_data_class';
import { BasicObj } from 'scrivito_sdk/models';
import { unwrapAppClass } from 'scrivito_sdk/realm';

export function toDataContext(
  maybeDataContext: DataContext | DataItem | BasicObj
): DataContext {
  if (maybeDataContext instanceof DataItem) {
    return dataItemToDataContext(maybeDataContext);
  }

  if (maybeDataContext instanceof BasicObj) {
    return basicObjToDataContext(maybeDataContext);
  }

  return maybeDataContext;
}

function dataItemToDataContext(dataItem: DataItem): DataContext {
  if (dataItem instanceof ObjDataItem) {
    return objDataItemToDataContext(dataItem);
  }

  // assumption: DataItem can only be either ObjDataItem or ExternalDataItem
  return externalDataItemToDataContext(dataItem as ExternalDataItem);
}

function objDataItemToDataContext(dataItem: ObjDataItem) {
  return basicObjToDataContext(unwrapAppClass(dataItem.obj()));
}

function externalDataItemToDataContext(dataItem: ExternalDataItem) {
  const _class = dataItem.dataClass().name();
  const _id = dataItem.id();
  const externalData = getExternalData(_class, _id);

  return externalData
    ? externalDataToDataContext(externalData, _class, _id)
    : { _class, _id };
}
