import {
  getExternalDataClassNames,
  shouldRefetchOnWindowFocus,
} from 'scrivito_sdk/data_integration/external_data_class_config';
import { notifyExternalDataWrite } from 'scrivito_sdk/data_integration/external_data_query';

export async function invalidateExternalData(): Promise<void> {
  for (const dataClassName of getExternalDataClassNames()) {
    if (await shouldRefetchOnWindowFocus(dataClassName)) {
      notifyExternalDataWrite(dataClassName);
    }
  }
}
