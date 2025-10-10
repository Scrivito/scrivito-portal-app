import { isObject } from 'scrivito_sdk/common';

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

export interface ObjSystemAttributeJson extends ObjReplicationJson {
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
  _version?: string;
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

export type DataLocatorJson = DefinitionDataLocator | ReferenceDataLocator;

export interface DefinitionDataLocator extends DataLocatorBase {
  via_ref?: never;
}

export interface ReferenceDataLocator extends DataLocatorBase {
  via_ref: ViaRef;
}

interface DataLocatorBase {
  class: string;
  field?: string;
  query?: DataLocatorQuery;
  order_by?: OrderByItem[];
  size?: number;
}

export type ViaRef = 'single' | 'multi';

export type DataLocatorQuery = DataLocatorFilter[];

export type DataLocatorFilter =
  | DataLocatorOperatorFilter
  | DataLocatorValueFilter
  | DataLocatorValueViaFilter;

type NeqOpCode = 'neq';
export type EqOpCode = 'eq';
type RelationalOpCode = 'gt' | 'lt' | 'gte' | 'lte';
export type OpCode = NeqOpCode | EqOpCode | RelationalOpCode;
type OperatorFilterOpCode = Exclude<OpCode, EqOpCode>;

export const DEFAULT_OP_CODES: (EqOpCode | NeqOpCode)[] = ['eq', 'neq'];

export const RELATIONAL_OPERATOR_FILTER_OP_CODES: RelationalOpCode[] = [
  'gt',
  'lt',
  'gte',
  'lte',
];

export const OP_CODES: OpCode[] = [
  ...DEFAULT_OP_CODES,
  ...RELATIONAL_OPERATOR_FILTER_OP_CODES,
];

const OPERATOR_FILTER_OP_CODES: OperatorFilterOpCode[] = [
  'neq',
  ...RELATIONAL_OPERATOR_FILTER_OP_CODES,
];

export interface DataLocatorOperatorFilter {
  field: string;
  operator: OperatorFilterOpCode;
  value: FilterValue;
}

export type DataLocatorOperatorOrValueFilter =
  | DataLocatorOperatorFilter
  | DataLocatorValueFilter;

export function isDataLocatorOperatorFilter(
  filter: unknown
): filter is DataLocatorOperatorFilter {
  return (
    isObject(filter) &&
    'field' in filter &&
    typeof filter.field === 'string' &&
    'operator' in filter &&
    isDataLocatorOperatorCode(filter.operator) &&
    'value' in filter &&
    isFilterValue(filter.value)
  );
}

export function isDataLocatorOperatorCode(
  opCode: unknown
): opCode is OperatorFilterOpCode {
  return (
    typeof opCode === 'string' &&
    OPERATOR_FILTER_OP_CODES.includes(opCode as OperatorFilterOpCode)
  );
}

export function isRelationalOpCode(opCode: OpCode): opCode is RelationalOpCode {
  return RELATIONAL_OPERATOR_FILTER_OP_CODES.includes(
    opCode as RelationalOpCode
  );
}

export type FilterValue = string | number | boolean | null;

function isFilterValue(value: unknown): value is FilterValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  );
}

export interface DataLocatorValueFilter {
  field: string;
  value: FilterValue;
}

export function isDataLocatorValueFilter(
  filter: unknown
): filter is DataLocatorValueFilter {
  const { value, field } = filter as DataLocatorValueFilter;

  return (
    isObject(filter) &&
    typeof field === 'string' &&
    !(filter as DataLocatorOperatorFilter).operator &&
    isFilterValue(value)
  );
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
