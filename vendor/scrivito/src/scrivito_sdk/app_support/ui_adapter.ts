import {
  UiAdapterInterface,
  uiAdapterDescription,
} from 'scrivito_sdk/app_support/ui_adapter_interface';
import { AdapterClient } from 'scrivito_sdk/bridge';

export type UiAdapterClient = AdapterClient<
  UiAdapterInterface,
  typeof uiAdapterDescription
>;

export let uiAdapter: UiAdapterClient | undefined;

// For test purpose only.
// => allow undefined
export function setUiAdapter(newUiAdapter: UiAdapterClient | undefined): void {
  uiAdapter = newUiAdapter;
}
