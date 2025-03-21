import { UncheckedDataConnection } from 'scrivito_sdk/data_integration';
import {
  LazyAsyncDataClassSchema,
  registerDataClassSchema,
} from 'scrivito_sdk/data_integration/data_class_schema';
import { setExternalDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import { mapLazyAsync } from 'scrivito_sdk/data_integration/lazy_async';

interface DataClassParams {
  connection: Promise<Partial<UncheckedDataConnection>>;
  schema: LazyAsyncDataClassSchema;
}

export function registerExternalDataClass(
  name: string,
  params: Promise<DataClassParams>
): void {
  setExternalDataConnection(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.connection)()
  );
  registerDataClassSchema(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.schema)
  );
}
