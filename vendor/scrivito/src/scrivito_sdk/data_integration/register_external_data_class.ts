import { UncheckedDataConnection } from 'scrivito_sdk/data_integration';
import {
  LazyAsyncDataClassSchema,
  registerDataClassSchema,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { configureExternalDataClass } from 'scrivito_sdk/data_integration/external_data_class_config';
import { setExternalDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import {
  LazyAsync,
  mapLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';

interface DataClassParams {
  connection: LazyAsync<Partial<UncheckedDataConnection>>;
  schema: LazyAsyncDataClassSchema;
  refetchOnWindowFocus?: false;
  skipOfflineHandling?: boolean;
}

export function registerExternalDataClass(
  name: string,
  params: LazyAsync<DataClassParams>,
): void {
  setExternalDataConnection(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.connection),
  );

  configureExternalDataClass(name, {
    refetchOnWindowFocus: mapLazyAsync(
      params,
      (eagerParams) => eagerParams.refetchOnWindowFocus,
    ),
    skipOfflineHandling: mapLazyAsync(
      params,
      (eagerParams) => eagerParams.skipOfflineHandling,
    ),
  });

  registerDataClassSchema(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.schema),
  );
}
