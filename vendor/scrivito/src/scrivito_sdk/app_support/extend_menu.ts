import { updateMenuExtensions } from 'scrivito_sdk/app_support/menu';
import {
  MenuCallback,
  registerMenuCallback,
} from 'scrivito_sdk/app_support/menu/menu_registry';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';

/** @public */
export function extendMenu(menuCallback: MenuCallback): void;

/** @internal */
export function extendMenu(
  menuCallback: MenuCallback,
  ...excessArgs: never[]
): void {
  checkExtendMenuArguments(menuCallback, ...excessArgs);
  if (!uiAdapter) return;

  registerMenuCallback(menuCallback);
  updateMenuExtensions();
}

const checkExtendMenuArguments = checkArgumentsFor(
  'extendMenu',
  [['menuCallback', t.Function]],
  {
    docPermalink: 'js-sdk/extendMenu',
  }
);
