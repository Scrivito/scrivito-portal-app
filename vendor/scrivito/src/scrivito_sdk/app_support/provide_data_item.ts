import {
  DataItem,
  ExternalDataItemReadCallback,
  assertValidDataIdentifier,
  provideExternalDataItem,
} from 'scrivito_sdk/data_integration';
import { checkProvideDataItem } from 'scrivito_sdk/realm';

/** @public */
export function provideDataItem(
  name: string,
  read: ExternalDataItemReadCallback,
  ...excessArgs: never[]
): DataItem {
  checkProvideDataItem(name, read, ...excessArgs);
  assertValidDataIdentifier(name);

  return provideExternalDataItem(name, read);
}
