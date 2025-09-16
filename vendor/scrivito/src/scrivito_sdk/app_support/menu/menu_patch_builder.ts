import mapValues from 'lodash-es/mapValues';
import pick from 'lodash-es/pick';

import { absoluteUrl } from 'scrivito_sdk/app_support/absolute_url';
import {
  CustomMenuItem,
  MenuBuilder,
  MenuItem,
  MenuPatch,
} from 'scrivito_sdk/ui_interface';

export class MenuPatchBuilder implements MenuBuilder {
  private readonly patch: Required<MenuPatch>;

  constructor() {
    this.patch = {
      insertIds: [],
      removeIds: [],
      items: {},
      modifyItems: {},
    };
  }

  insert(customMenuItem: CustomMenuItem): void {
    this.patch.insertIds = Array.from(
      new Set(this.patch.insertIds).add(customMenuItem.id)
    );
    this.patch.items[customMenuItem.id] = {
      ...pick(customMenuItem, 'description', 'group', 'position', 'title'),
      ...mapValues(pick(customMenuItem, 'enabled'), (v?: boolean) => !!v),
      ...iconPatch(customMenuItem.icon),
    };
  }

  modify(menuItem: MenuItem): void {
    this.patch.modifyItems[menuItem.id] = {
      ...this.patch.modifyItems[menuItem.id],
      ...pick(menuItem, 'group', 'position', 'title'),
      ...iconPatch(menuItem.icon),
    };
  }

  remove(id: string): void {
    this.patch.removeIds.push(id);
  }

  getPatch(): MenuPatch {
    return this.patch;
  }
}

function iconPatch(icon?: string) {
  return icon ? { icon: absoluteUrl(icon) } : {};
}
