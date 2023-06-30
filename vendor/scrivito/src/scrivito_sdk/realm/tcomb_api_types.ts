import { tcomb } from 'scrivito_sdk/common';
import { isAppClass } from 'scrivito_sdk/realm/schema';

export const ObjClassType = tcomb.refinement(
  tcomb.Function,
  isAppClass,
  'ObjClass'
);

export const WidgetClassType = tcomb.refinement(
  tcomb.Function,
  isAppClass,
  'WidgetClass'
);
