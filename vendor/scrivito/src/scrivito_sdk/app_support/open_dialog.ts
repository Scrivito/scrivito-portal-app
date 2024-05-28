import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';

/** @public */
export function openDialog(name: string): void;

/** @internal */
export function openDialog(name: string, ...excessArgs: never[]): void {
  checkOpenDialogArguments(name, ...excessArgs);

  if (uiAdapter) {
    uiAdapter.openCustomDialog(name);
  }
}

const checkOpenDialogArguments = checkArgumentsFor(
  'openDialog',
  [['name', t.String]],
  {
    docPermalink: 'js-sdk/openDialog',
  }
);
