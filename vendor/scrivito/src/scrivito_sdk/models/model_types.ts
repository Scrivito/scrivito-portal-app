import { tcomb } from 'scrivito_sdk/common';
import { BasicLink } from 'scrivito_sdk/models/basic_link';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { BasicObjSearch } from 'scrivito_sdk/models/basic_obj_search';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';
import { Binary } from 'scrivito_sdk/models/binary';

export const ObjType = tcomb.irreducible('Obj', (maybeObj: unknown) =>
  isWrapping(maybeObj, BasicObj)
);

export const WidgetType = tcomb.irreducible('Widget', (maybeWidget: unknown) =>
  isWrapping(maybeWidget, BasicWidget)
);

export const LinkType = tcomb.irreducible('Link', (maybeLink: unknown) =>
  isWrapping(maybeLink, BasicLink)
);

export const ObjSearchType = tcomb.irreducible(
  'ObjSearch',
  (maybeSearch: unknown) => isWrapping(maybeSearch, BasicObjSearch)
);

export const BinaryType = tcomb.irreducible(
  'Binary',
  (maybeBinary: unknown) => maybeBinary instanceof Binary
);

function isWrapping<BasicClass>(
  maybeWrapped: unknown,
  basicClass: new (...args: unknown[]) => BasicClass
): boolean {
  if (!maybeWrapped) {
    return false;
  }
  return (
    (maybeWrapped as { _scrivitoPrivateContent: BasicClass })
      ._scrivitoPrivateContent instanceof basicClass
  );
}
