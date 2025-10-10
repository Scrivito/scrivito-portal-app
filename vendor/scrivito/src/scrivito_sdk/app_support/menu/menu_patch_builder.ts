import { absoluteUrl } from 'scrivito_sdk/app_support/absolute_url';
import {
  CustomMenuItem,
  MenuBuilder,
  MenuItem,
  MenuPatch,
  MenuPatchItem,
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
    const { description, group, position, title } = customMenuItem;
    const item: MenuPatchItem = {};
    if (description !== undefined) item.description = description;
    if (group !== undefined) item.group = group;
    if (position) item.position = position;
    if (title !== undefined) item.title = title;
    if ('enabled' in customMenuItem) item.enabled = !!customMenuItem.enabled;

    this.patch.items[customMenuItem.id] = {
      ...item,
      ...iconPatch(customMenuItem.icon),
    };
  }

  modify(menuItem: MenuItem): void {
    const { group, position, title } = menuItem;
    const item: MenuPatchItem = {};
    if (group !== undefined) item.group = group;
    if (position) item.position = position;
    if (title !== undefined) item.title = title;

    this.patch.modifyItems[menuItem.id] = {
      ...this.patch.modifyItems[menuItem.id],
      ...item,
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
