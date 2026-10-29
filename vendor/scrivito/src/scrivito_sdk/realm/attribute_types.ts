import { AttributeDefinitions } from 'scrivito_sdk/realm/schema';
import { AttributeValueOf } from 'scrivito_sdk/realm/wrap_in_app_class';

export type AttrDict<AttrDefs extends AttributeDefinitions> = {
  [AttrName in keyof AttrDefs]?: AttributeValueOf<AttrDefs, AttrName>;
};
