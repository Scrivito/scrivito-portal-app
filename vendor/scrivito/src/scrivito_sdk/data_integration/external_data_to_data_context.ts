import { DataContext } from 'scrivito_sdk/data_integration/data_context';
import { ExternalData } from 'scrivito_sdk/data_integration/external_data';

export function externalDataToDataContext(
  data: ExternalData,
  dataClassName: string,
  dataId: string
): DataContext {
  return {
    _class: dataClassName,
    _id: dataId,
    ...data,
  };
}
