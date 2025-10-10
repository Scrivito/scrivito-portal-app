import { UncheckedDataConnection } from 'scrivito_sdk/data_integration';
import {
  LazyAsyncDataClassSchema,
  registerDataClassSchema,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { setExternalDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import { configureExternalDataInvalidation } from 'scrivito_sdk/data_integration/external_data_invalidation';
import {
  LazyAsync,
  mapLazyAsync,
} from 'scrivito_sdk/data_integration/lazy_async';

interface DataClassParams {
  connection: LazyAsync<Partial<UncheckedDataConnection>>;
  schema: LazyAsyncDataClassSchema;
  refetchOnWindowFocus?: false;
}

export function registerExternalDataClass(
  name: string,
  params: LazyAsync<DataClassParams>
): void {
  setExternalDataConnection(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.connection)
  );

  configureExternalDataInvalidation(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.refetchOnWindowFocus)
  );

  registerDataClassSchema(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.schema)
  );
}
