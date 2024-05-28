import {
  DataItem,
  ExternalDataItemConnection,
  assertValidDataIdentifier,
  provideExternalDataItem,
} from 'scrivito_sdk/data_integration';

/** @public */
export function provideDataItem(
  name: string,
  get: ExternalDataItemConnection['get']
): DataItem;

/** @public */
export function provideDataItem(
  name: string,
  connection: ExternalDataItemConnection
): DataItem;

export function provideDataItem(
  name: string,
  connectionOrGet:
    | ExternalDataItemConnection['get']
    | ExternalDataItemConnection
): DataItem {
  if (typeof connectionOrGet === 'function') {
    return provideDataItem(name, { get: connectionOrGet });
  }

  assertValidDataIdentifier(name);

  return provideExternalDataItem(name, connectionOrGet);
}
