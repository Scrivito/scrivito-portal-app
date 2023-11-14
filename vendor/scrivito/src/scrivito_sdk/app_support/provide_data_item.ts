import {
  DataItem,
  ExternalDataItemConnection,
  assertValidDataIdentifier,
  provideExternalDataItem,
} from 'scrivito_sdk/data_integration';
import { checkProvideDataItem } from 'scrivito_sdk/realm';

/** @public */
export function provideDataItem(
  name: string,
  get: ExternalDataItemConnection['get'],
  ...excessArgs: never[]
): DataItem;

/** @public */
export function provideDataItem(
  name: string,
  connection: ExternalDataItemConnection,
  ...excessArgs: never[]
): DataItem;

export function provideDataItem(
  name: string,
  connectionOrGet:
    | ExternalDataItemConnection['get']
    | ExternalDataItemConnection,
  ...excessArgs: never[]
): DataItem {
  if (typeof connectionOrGet === 'function') {
    return provideDataItem(name, { get: connectionOrGet }, ...excessArgs);
  }

  checkProvideDataItem(name, connectionOrGet, ...excessArgs);
  assertValidDataIdentifier(name);

  return provideExternalDataItem(name, connectionOrGet);
}
