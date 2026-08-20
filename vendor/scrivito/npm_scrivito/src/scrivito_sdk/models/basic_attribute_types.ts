import { BinaryJson } from 'scrivito_sdk/client';
import { BasicLink } from 'scrivito_sdk/models/basic_link';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';
import { Binary } from 'scrivito_sdk/models/binary';
import { DataLocator } from 'scrivito_sdk/models/data_locator';
import { ObjUnavailable } from 'scrivito_sdk/models/obj_unavailable';
import { TypeInfo } from 'scrivito_sdk/models/type_info';

export interface BasicAttributeMapping {
  binary: Binary | null;
  boolean: boolean;
  datalocator: DataLocator;
  date: Date | null;
  datetime: Date | null;
  enum: string | null;
  float: number | null;
  html: string;
  integer: number | null;
  link: BasicLink | null;
  linklist: BasicLink[];
  multienum: string[];
  reference: SingleReferenceValue | null;
  referencelist: SingleReferenceValue[];
  string: string;
  stringlist: string[];
  widget: BasicWidget | null;
  widgetlist: BasicWidget[];
}

type NonPlainType =
  | 'binary'
  | 'reference'
  | 'referencelist'
  | 'widget'
  | 'widgetlist';

export type PlainAttributeMapping = Omit<
  BasicAttributeMapping,
  NonPlainType
> & {
  binary: BinaryJson | null;
  reference: string | null;
  referencelist: string[];
  widget: string | null;
  widgetlist: string[];
};

// Note: This type definition is still too strict for some attribute types.
// If you miss an allowed value type (e.g. because your newly typescripted code
// requires it), check whether the `AttributeSerializer` supports it (and add it).
interface BasicAttributeMappingForUpdate {
  binary: BasicAttributeMapping['binary'];
  boolean: BasicAttributeMapping['boolean'];
  datalocator: BasicAttributeMapping['datalocator'];
  date: BasicAttributeMapping['date'];
  datetime: BasicAttributeMapping['datetime'];
  enum: BasicAttributeMapping['enum'];
  float: BasicAttributeMapping['float'];
  html: BasicAttributeMapping['html'];
  integer: BasicAttributeMapping['integer'];
  link: BasicAttributeMapping['link'];
  linklist: BasicAttributeMapping['linklist'];
  multienum: BasicAttributeMapping['multienum'];
  reference: BasicAttributeMapping['reference'];
  referencelist: BasicAttributeMapping['referencelist'];
  string: BasicAttributeMapping['string'] | null;
  stringlist: BasicAttributeMapping['stringlist'];
  widget: BasicAttributeMapping['widget'];
  widgetlist: BasicAttributeMapping['widgetlist'];
}

export type SingleReferenceValue = BasicObj | ObjUnavailable;

/** Helper type for marking string union items as internal */
type InternalCmsAttributeType = {
  /** @internal */
  widget: never;
};

export type CmsAttributeType =
  | 'binary'
  | 'boolean'
  | 'datalocator'
  | 'date'
  | 'datetime'
  | 'enum'
  | 'float'
  | 'html'
  | 'integer'
  | 'link'
  | 'linklist'
  | 'multienum'
  | 'reference'
  | 'referencelist'
  | 'string'
  | 'stringlist'
  | 'widgetlist'
  | keyof InternalCmsAttributeType;

export const CMS_ATTRIBUTE_TYPES: CmsAttributeType[] = [
  'binary',
  'boolean',
  'datalocator',
  'date',
  'datetime',
  'enum',
  'float',
  'html',
  'integer',
  'link',
  'linklist',
  'multienum',
  'reference',
  'referencelist',
  'string',
  'stringlist',
  'widget',
  'widgetlist',
];

// Content update related types section starts here
export type BasicAttributeValue<Type extends CmsAttributeType> =
  BasicAttributeMapping[Type];

export type PlainAttributeValue<Type extends CmsAttributeType> =
  PlainAttributeMapping[Type];

export type BasicAttributeValueForUpdate<Type extends CmsAttributeType> =
  BasicAttributeMappingForUpdate[Type];

export interface BasicAttributeDict extends SystemAttributeDict {
  [attributeName: string]:
    | BasicCustomAttributeDict[keyof BasicCustomAttributeDict]
    | SystemAttributeValue;
}

// this is known to be incomplete
interface SystemAttributeDict {
  _id: string | [string];
  _objClass: string | [string];

  _path: string | [string];
  _permalink: string | [string];

  _data_param: [string] | null;
}

export type SystemAttributeValue =
  SystemAttributeDict[keyof SystemAttributeDict];

interface BasicCustomAttributeDict {
  [attributeName: string]: AnyCustomAttributeValueAndTypeForUpdate;
}

type AnyCustomAttributeValueAndTypeForUpdate = {
  [Type in CmsAttributeType]: [BasicAttributeValue<Type>, TypeInfo<Type>];
}[CmsAttributeType];
