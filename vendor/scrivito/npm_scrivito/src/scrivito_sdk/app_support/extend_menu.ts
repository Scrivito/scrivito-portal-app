import { updateMenuExtensions } from 'scrivito_sdk/app_support/menu';
import {
  MenuCallback,
  registerMenuCallback,
} from 'scrivito_sdk/app_support/menu/menu_registry';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';

/** @public */
export function extendMenu(menuCallback: MenuCallback): void;

/** @internal */
export function extendMenu(menuCallback: MenuCallback): void {
  if (!uiAdapter) return;

  registerMenuCallback(menuCallback);
  updateMenuExtensions();
}
