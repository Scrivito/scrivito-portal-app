export type ObjJson = ExistentObjJson | UnavailableObjJsonWithIndex;

/* This type exists only to access `ObjJson` values in a generic way.
 */
export interface UnavailableObjJsonWithIndex extends UnavailableObjJson {
  [index: string]: UnavailableObjJson[keyof UnavailableObjJson] | undefined;
}

/* This type describes any "not accessible" obj, either deleted or hidden.
 * Hidden Objs are "UI only" and returned for a read restricted ExistentObjJson.
 * An editor knows only that a hidden obj is present, but no details.
 */
export interface UnavailableObjJson extends ObjReplicationJson {
  _deleted: string;
  _forbidden?: true;

  _id?: undefined;
}

/* This type describes the raw, json-level data format,
 * used for Objs in the Scrivito backend Rest API.
 */
export interface ExistentObjJson extends ObjSystemAttributeJson {
  [index: string]:
    | AttributeJson
    | ObjSystemAttributeJson[keyof ObjSystemAttributeJson]
    | null
    | undefined;
}

export interface ObjSystemAttributeJson extends Partial<ObjReplicationJson> {
  _widget_pool?: WidgetPoolJson;

  _marked_deleted?: true;
  _deleted?: undefined;

  _id: string;
  _obj_class: string;
  _content_id?: string;

  _path?: string;
  _permalink?: string;
  _site_id?: string | null;
  _language?: string | null;

  _restriction?: [string] | null;

  _modification?: 'new' | 'edited' | 'deleted' | null;
  _conflicts?: boolean;

  _editing_asset?: boolean;
  _last_changed?: string;
  _last_changed_by?: string;
  _first_published_at?: string;
  _first_published_by?: string | null;
  _published_at?: string | null;
  _published_by?: string | null;
  _created_at?: string;
  _created_by?: string;

  _data_param?: [string] | null;
}

interface ObjReplicationJson {
  _version: string;
}

export interface WidgetPoolJson {
  [index: string]: WidgetJson | undefined;
}

export interface WidgetJson extends WidgetSystemAttributeJson {
  [key: string]:
    | AttributeJson
    | WidgetSystemAttributeJson[keyof WidgetSystemAttributeJson]
    | null
    | undefined;
}
interface WidgetSystemAttributeJson {
  _obj_class: string;
}

export type AttributeJson =
  CustomAttributeJsonMapping[keyof CustomAttributeJsonMapping];

export type CustomAttributeJsonMapping = {
  binary: ['binary', BinaryJson];
  boolean: ['boolean', boolean];
  datalocator: ['datalocator', DataLocatorJson | null];
  date: ['date', string];
  html: ['html', string];
  link: ['link', LinkJson];
  linklist: ['linklist', LinkJson[]];
  number: ['number', number];
  reference: ['reference', string];
  referencelist: ['referencelist', string[]];
  string: ['string', string];
  stringlist: ['stringlist', string[]];
  widget: ['widget', string];
  widgetlist: ['widgetlist', string[]];
};

export type HtmlAttributeJson = CustomAttributeJsonMapping['html'];
export type LinkAttributeJson = CustomAttributeJsonMapping['link'];
export type LinklistAttributeJson = CustomAttributeJsonMapping['linklist'];
export type ReferenceAttributeJson = CustomAttributeJsonMapping['reference'];
export type ReferencelistAttributeJson =
  CustomAttributeJsonMapping['referencelist'];
type WidgetAttributeJson = CustomAttributeJsonMapping['widget'];
type WidgetlistAttributeJson = CustomAttributeJsonMapping['widgetlist'];

export interface LinkJson {
  title: string | null;
  obj_id: string | null;
  query: string | null;
  fragment: string | null;
  rel?: string;
  target: string | null;
  url: string | null;
}

export interface BinaryJson {
  id: string;
}

export type OrderByItem = [string, OrderDirection];
export type OrderDirection = 'asc' | 'desc';

export type DataLocatorJson = DataLocatorDefinition | DataLocatorReference;

export interface DataLocatorDefinition {
  class: string;
  via_ref?: undefined;
  query?: DataLocatorQuery;
  order_by?: OrderByItem[];
  size?: number;
}

export interface DataLocatorReference {
  class: string;
  via_ref: true;
  query?: undefined;
  order_by?: undefined;
  size?: undefined;
}

export type DataLocatorQuery = DataLocatorFilter[];

export type DataLocatorFilter =
  | DataLocatorValueFilter
  | DataLocatorValueViaFilter;

export interface DataLocatorValueFilter {
  field: string;
  value: string;
}

export interface DataLocatorValueViaFilter {
  field: string;
  value_via: DataLocatorValueVia;
}

export interface DataLocatorValueVia {
  class: string;
  field: string;
}

export function buildNonexistentObjJson(
  id: string
): UnavailableObjJsonWithIndex {
  return { _deleted: id, _version: '' };
}

export function isExistentObjJson(data: ObjJson): data is ExistentObjJson {
  return !data._deleted;
}

export function isUnavailableObjJson(
  data: ObjJson | UnavailableObjJson
): data is UnavailableObjJson {
  return !!data._deleted;
}

export function isWidgetAttributeJson(
  attributeJson: AttributeJson
): attributeJson is WidgetAttributeJson {
  return attributeJson[0] === 'widget';
}

export function isWidgetlistAttributeJson(
  attributeJson: AttributeJson
): attributeJson is WidgetlistAttributeJson {
  return attributeJson[0] === 'widgetlist';
}
