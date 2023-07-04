import { MenuBuilder } from 'scrivito_sdk/ui_interface';

export type MenuCallback = (menu: MenuBuilder) => void;

let menuCallbacks: MenuCallback[] = [];

export function registerMenuCallback(menuCallback: MenuCallback): void {
  menuCallbacks.push(menuCallback);
}

export function getMenuCallbacks(): MenuCallback[] {
  return menuCallbacks;
}

// For test purpose only.
export function resetMenuRegistry(): void {
  menuCallbacks = [];
}
