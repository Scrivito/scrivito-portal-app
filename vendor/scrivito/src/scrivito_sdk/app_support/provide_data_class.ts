import type { ApiClient } from 'scrivito_sdk/client';
import {
  DataClass,
  DataClassAttributes,
  DataConnection,
  ExternalDataClass,
  assertValidDataIdentifier,
  createRestApiConnection,
  registerDataClassSchema,
  setExternalDataConnection,
} from 'scrivito_sdk/data_integration';

/** @public */
export function provideDataClass(
  name: string,
  params: { restApi: string | ApiClient; attributes?: DataClassAttributes }
): DataClass;

/** @public */
export function provideDataClass(
  name: string,
  params: { connection: DataConnection; attributes?: DataClassAttributes }
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  params:
    | { restApi: string | ApiClient; attributes?: DataClassAttributes }
    | { connection: DataConnection; attributes?: DataClassAttributes }
): DataClass {
  assertValidDataIdentifier(name);

  if ('restApi' in params) {
    return provideDataClass(name, {
      connection: createRestApiConnection(params.restApi),
      attributes: params.attributes,
    });
  }

  setExternalDataConnection(name, params.connection);

  if (params.attributes) registerDataClassSchema(name, params.attributes);

  return new ExternalDataClass(name);
}
