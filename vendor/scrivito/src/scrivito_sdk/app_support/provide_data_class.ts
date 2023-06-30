import {
  DataClass,
  DataConnection,
  ExternalDataClass,
  assertValidDataIdentifier,
  setExternalDataConnection,
} from 'scrivito_sdk/data_integration';
import { checkProvideDataClass } from 'scrivito_sdk/realm';

/** @public */
export function provideDataClass(
  name: string,
  dataClass: { connection: DataConnection }
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  dataClass: { connection: DataConnection },
  ...excessArgs: never[]
): DataClass {
  checkProvideDataClass(name, dataClass, ...excessArgs);
  assertValidDataIdentifier(name);

  setExternalDataConnection(name, dataClass.connection);

  return new ExternalDataClass(name);
}
