import {
  DataClass,
  ExternalDataClass,
  ReadOnlyDataConnection,
  ReadWriteDataConnection,
  assertValidDataIdentifier,
  setExternalDataConnection,
} from 'scrivito_sdk/data_integration';
import { checkProvideDataClass } from 'scrivito_sdk/realm';

/** @public */
export function provideDataClass(
  name: string,
  dataClass: { connection: ReadOnlyDataConnection }
): DataClass;

/** @beta */
export function provideDataClass(
  name: string,
  dataClass: { connection: ReadWriteDataConnection }
): DataClass;

/** @internal */
export function provideDataClass(
  name: string,
  dataClass: { connection: ReadOnlyDataConnection | ReadWriteDataConnection },
  ...excessArgs: never[]
): DataClass {
  checkProvideDataClass(name, dataClass, ...excessArgs);
  assertValidDataIdentifier(name);

  setExternalDataConnection(name, dataClass.connection);

  return new ExternalDataClass(name);
}
