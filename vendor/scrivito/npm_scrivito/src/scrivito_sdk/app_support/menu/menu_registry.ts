import { onReset } from 'scrivito_sdk/common';
import { MenuBuilder } from 'scrivito_sdk/ui_interface';

export type MenuCallback = (menu: MenuBuilder) => void;

let menuCallbacks: MenuCallback[] = [];

export function registerMenuCallback(menuCallback: MenuCallback): void {
  menuCallbacks.push(menuCallback);
}

export function getMenuCallbacks(): MenuCallback[] {
  return menuCallbacks;
}

onReset(() => (menuCallbacks = []));
