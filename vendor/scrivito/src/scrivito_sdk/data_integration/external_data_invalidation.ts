import { onReset } from 'scrivito_sdk/common';
import { notifyExternalDataWrite } from 'scrivito_sdk/data_integration/external_data_query';
import {
  LazyAsync,
  normalizeLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';

let config: {
  [dataClassName: string]: () => Promise<false | undefined>;
} = {};

export async function configureExternalDataInvalidation(
  dataClassName: string,
  refetchOnWindowFocus: LazyAsync<false | undefined>
): Promise<void> {
  config[dataClassName] = normalizeLazyAsync(refetchOnWindowFocus);
}

export async function invalidateExternalData(): Promise<void> {
  for (const dataClassName of Object.keys(config)) {
    if ((await config[dataClassName]()) ?? true) {
      notifyExternalDataWrite(dataClassName);
    }
  }
}

onReset(() => (config = {}));
