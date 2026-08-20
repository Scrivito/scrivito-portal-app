import {
  UiAdapterInterface,
  uiAdapterDescription,
} from 'scrivito_sdk/app_ui_protocol';
import { AdapterClient } from 'scrivito_sdk/bridge';
import { onReset } from 'scrivito_sdk/common';

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

onReset(() => setUiAdapter(undefined));
