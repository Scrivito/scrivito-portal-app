import { CmsAttributeType } from 'scrivito_sdk/models/basic_attribute_types';

export type AttributeTypeWithMandatoryConfig = 'enum' | 'multienum';

interface TypeConfigMapping {
  enum: { values: readonly string[] };
  multienum: { values: readonly string[] };
  reference: { validClasses: readonly string[] };
  referencelist: { validClasses: readonly string[] };
  widget: { validClasses: readonly string[] };
  widgetlist:
    | { validClasses: readonly string[]; maximum?: number }
    | { validClasses?: readonly string[]; maximum: number };
}

interface NormalizedTypeConfigMapping {
  enum: { values: readonly string[] };
  multienum: { values: readonly string[] };
  reference: { only?: readonly string[] };
  referencelist: { only?: readonly string[] };
  widget: { only?: readonly string[] };
  widgetlist: { only?: readonly string[]; maximum?: number };
}

export type BasicTypeInfo<Type extends CmsAttributeType> =
  Type extends keyof TypeConfigMapping ? BasicTypeInfoWithConfig<Type> : [Type];

export type NormalizedTypeInfo<Type extends CmsAttributeType> =
  Type extends keyof NormalizedTypeConfigMapping
    ? [Type, NormalizedTypeConfigMapping[Type]]
    : [Type, object];

type BasicTypeInfoWithConfig<Type extends keyof TypeConfigMapping> =
  Type extends AttributeTypeWithMandatoryConfig
    ? [Type, TypeConfigMapping[Type]]
    : [Type, TypeConfigMapping[Type]] | [Type];

export type TypeInfo<Type extends CmsAttributeType> =
  | BasicTypeInfo<Type>
  | Exclude<Type, AttributeTypeWithMandatoryConfig>;
