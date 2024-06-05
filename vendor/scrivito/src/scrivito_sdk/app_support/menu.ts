import { createStateContainer } from 'scrivito_sdk/state';
import { MenuBuilder, MenuPatch } from 'scrivito_sdk/ui_interface';

import { MenuHandlerBuilder } from './menu/menu_handler_builder';
import { MenuPatchBuilder } from './menu/menu_patch_builder';
import { getMenuCallbacks } from './menu/menu_registry';

const counterState = createStateContainer<number>();

export function getMenuPatch(): MenuPatch {
  // Make `getMenuPatch`'s state depend on the counter
  getCounter();

  const builder = new MenuPatchBuilder();
  evaluateCallbacks(builder);

  return builder.getPatch();
}

export function getMenuHandler(id: string): (() => void) | undefined {
  const builder = new MenuHandlerBuilder(id);
  evaluateCallbacks(builder);

  return builder.getHandler();
}

/** @public */
export function updateMenuExtensions(): void {
  counterState.set((getCounter() || 0) + 1);
}

function evaluateCallbacks(builder: MenuBuilder) {
  getMenuCallbacks().forEach((menuCallback) =>
    menuCallback.call(null, builder)
  );
}

function getCounter() {
  return counterState.get();
}
