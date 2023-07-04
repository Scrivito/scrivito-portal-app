import { mapObject, pick, unique } from 'underscore';

import { absoluteUrl } from 'scrivito_sdk/app_support/absolute_url';
import { checkArgumentsFor, tcomb as t } from 'scrivito_sdk/common';
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

  insert(customMenuItem: CustomMenuItem, ...excessArgs: never[]): void {
    checkMenuInsertArguments(customMenuItem, ...excessArgs);

    this.patch.insertIds = unique([...this.patch.insertIds, customMenuItem.id]);
    this.patch.items[customMenuItem.id] = {
      ...pick(customMenuItem, 'description', 'group', 'position', 'title'),
      ...mapObject(pick(customMenuItem, 'enabled'), (v?: boolean) => !!v),
      ...iconPatch(customMenuItem.icon),
    };
  }

  modify(menuItem: MenuItem, ...excessArgs: never[]): void {
    checkMenuModifyArguments(menuItem, ...excessArgs);

    this.patch.modifyItems[menuItem.id] = {
      ...this.patch.modifyItems[menuItem.id],
      ...pick(menuItem, 'group', 'position', 'title'),
      ...iconPatch(menuItem.icon),
    };
  }

  remove(id: string, ...excessArgs: never[]): void {
    checkMenuRemoveArguments(id, ...excessArgs);
    this.patch.removeIds.push(id);
  }

  getPatch(): MenuPatch {
    return this.patch;
  }
}

const PositionType = t.interface({
  after: t.maybe(t.String),
  before: t.maybe(t.String),
});

const checkMenuInsertArguments = checkArgumentsFor(
  'menu.insert',
  [
    [
      'options',
      t.interface({
        id: t.String,
        description: t.maybe(t.String),
        enabled: t.maybe(t.Boolean),
        group: t.maybe(t.String),
        icon: t.maybe(t.String),
        onClick: t.maybe(t.Function),
        position: t.maybe(PositionType),
        title: t.maybe(t.String),
      }),
    ],
  ],
  {
    docPermalink: 'js-sdk/extendMenu',
  }
);

const checkMenuModifyArguments = checkArgumentsFor(
  'menu.modify',
  [
    [
      'options',
      t.interface({
        id: t.String,
        group: t.maybe(t.String),
        icon: t.maybe(t.String),
        position: t.maybe(PositionType),
        title: t.maybe(t.String),
      }),
    ],
  ],
  {
    docPermalink: 'js-sdk/extendMenu',
  }
);

const checkMenuRemoveArguments = checkArgumentsFor(
  'menu.remove',
  [['id', t.String]],
  {
    docPermalink: 'js-sdk/extendMenu',
  }
);

function iconPatch(icon?: string) {
  return icon ? { icon: absoluteUrl(icon) } : {};
}
