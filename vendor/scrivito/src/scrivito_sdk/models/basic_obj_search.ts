import isDate from 'lodash-es/isDate';

import {
  BackendSearchOperator,
  BackendValueBoost,
  FieldBoost,
  ObjSpaceId,
  OrderByItem,
  Query,
  SingleBackendSearchValue,
} from 'scrivito_sdk/client';
import {
  ArgumentError,
  extractFromIterator,
  formatDateToString,
  isCamelCase,
  prettyPrint,
  transformContinueIterable,
  underscore,
} from 'scrivito_sdk/common';
import {
  DataQuery,
  DataQueryContinuation,
  FacetQuery,
  FacetQueryOptions,
  QueryParams,
  SuggestOptions,
  getObjQuery,
  getObjQueryCount,
  suggest,
} from 'scrivito_sdk/data';
import { objSpaceFor } from 'scrivito_sdk/models';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { BasicObjFacetValue } from 'scrivito_sdk/models/basic_obj_facet_value';

export type { FieldBoost } from 'scrivito_sdk/client';

export type BasicSearchValue =
  | SingleBasicSearchValue
  | SingleBasicSearchValue[];
type SingleBasicSearchValue = SingleBackendSearchValue | Date | BasicObj;

export type FullTextSearchOperator = 'contains' | 'containsPrefix' | 'matches';

export type SearchOperator =
  | FullTextSearchOperator
  | 'equals'
  | 'startsWith'
  | 'isGreaterThan'
  | 'isLessThan'
  | 'linksTo'
  | 'refersTo';

export type SearchField = string | string[];

export type ObjSearchParams = QueryParams & {
  batchSize?: number;
};

export const FULL_TEXT_OPERATORS: FullTextSearchOperator[] = [
  'contains',
  'containsPrefix',
  'matches',
];

export const OPERATORS: SearchOperator[] = [
  'contains',
  'containsPrefix',
  'matches',
  'equals',
  'startsWith',
  'isGreaterThan',
  'isLessThan',
  'linksTo',
  'refersTo',
];
const NEGATABLE_OPERATORS: SearchOperator[] = [
  'equals',
  'startsWith',
  'isGreaterThan',
  'isLessThan',
];
const BOOSTABLE_OPERATORS: SearchOperator[] = [
  'contains',
  'containsPrefix',
  'matches',
];

export type OrderAttributes = Array<
  string | [string] | [string, 'asc' | 'desc' | undefined]
>;

export class BasicObjSearch implements DataQuery<BasicObj> {
  private _query: Query[];
  private _boost: BackendValueBoost[];
  private _batchSize?: number;
  private _offset?: number;
  private _orderBy?: OrderByItem[];
  private _includeDeleted?: true;
  private _includeEditingAssets?: true;

  static fromParams(
    workspaceId: string,
    params: ObjSearchParams
  ): BasicObjSearch {
    return new BasicObjSearch(objSpaceFor(workspaceId), params);
  }

  constructor(
    private readonly _objSpaceId: ObjSpaceId,
    params?: ObjSearchParams
  ) {
    this._query = params ? [...params.query] : [];
    this._boost = params?.boost || [];
    this._batchSize = params?.batchSize;
    this._offset = params?.offset;
    this._orderBy = params?.orderBy;
    this._includeDeleted = params?.includeDeleted;
    this._includeEditingAssets = params?.includeEditingAssets;
  }

  and(searchToExtend: BasicObjSearch): this;
  and(
    field: SearchField,
    operator: SearchOperator,
    value: BasicSearchValue,
    boost?: FieldBoost
  ): this;

  and(
    attributeOrSearch: SearchField | BasicObjSearch,
    operator?: SearchOperator,
    value?: BasicSearchValue,
    boost?: FieldBoost
  ): this {
    if (attributeOrSearch instanceof BasicObjSearch) {
      this._query = [...this._query, ...attributeOrSearch._query];
    } else {
      if (operator === undefined) {
        throw new ArgumentError('Missing operator to search with');
      }
      if (value === undefined) {
        throw new ArgumentError(
          'Missing value to search (specify "null" for missing)'
        );
      }
      const field = attributeOrSearch;
      const subQuery = buildSubQuery(field, operator, value);

      if (boost) {
        assertBoostableOperator(operator);
        subQuery.boost = underscoreBoostAttributes(boost);
      }

      this._query.push(subQuery);
    }

    return this;
  }

  andNot(
    attribute: SearchField,
    operator: SearchOperator,
    value: BasicSearchValue
  ): this {
    const subQuery = buildSubQuery(attribute, operator, value);
    assertNegatableOperator(operator);

    subQuery.negate = true;
    this._query.push(subQuery);
    return this;
  }

  andIsChildOf(obj: BasicObj): this {
    const siteId = obj.siteId();
    const path = obj.path();

    return siteId && path
      ? this.onSite(siteId).and('_parentPath', 'equals', path)
      : this.and('_id', 'equals', null);
  }

  andIsInsideSubtreeOf(obj: BasicObj): this {
    const siteId = obj.siteId();
    const path = obj.path();

    return siteId && path
      ? this.onSite(siteId).and('_path', 'startsWith', path)
      : this.and('_id', 'equals', obj.id());
  }

  boost(
    field: SearchField,
    operator: SearchOperator,
    value: BasicSearchValue,
    factor: number
  ): this {
    const subQuery = buildSubQuery(field, operator, value);
    this._boost.push({ condition: [subQuery], factor });
    return this;
  }

  offset(offset: number): this {
    this._offset = offset || undefined;
    return this;
  }

  order(attribute: string, direction?: 'asc' | 'desc'): this;
  order(attributes: OrderAttributes): this;
  order(
    attributeOrAttributes: string | OrderAttributes,
    direction?: 'asc' | 'desc'
  ): this {
    const attributes: OrderAttributes = Array.isArray(attributeOrAttributes)
      ? attributeOrAttributes
      : [[attributeOrAttributes, direction]];
    this._orderBy = attributes.map((attr) => {
      if (Array.isArray(attr)) {
        const [innerAttr, innerDirection] = attr;
        return normalizeOrderByItem(innerAttr, innerDirection);
      }
      return normalizeOrderByItem(attr);
    });
    return this;
  }

  batchSize(batchSize: number): this {
    this._batchSize = batchSize;
    return this;
  }

  includeDeleted(): this {
    this._includeDeleted = true;
    return this;
  }

  excludeDeleted(): this {
    this._includeDeleted = undefined;
    return this;
  }

  includeEditingAssets(): this {
    this._includeEditingAssets = true;
    return this;
  }

  count(): number {
    return getObjQueryCount(this.objSpaceId(), this.queryParams()) || 0;
  }

  first(): BasicObj | null {
    return this.take(1)[0] || null;
  }

  take(count: number): BasicObj[] {
    return this.internalTake(count);
  }

  dangerouslyUnboundedTake(): BasicObj[] {
    return this.internalTake(undefined);
  }

  iterator() {
    return this.getObjDataQuery().iterator();
  }

  iteratorFromContinuation(continuation: DataQueryContinuation) {
    return this.getObjDataQuery().iteratorFromContinuation(continuation);
  }

  getObjDataQuery(): DataQuery<BasicObj> {
    const objDataQuery = getObjQuery(
      this.objSpaceId(),
      this.queryParams(),
      this.getBatchSize()
    );

    return transformContinueIterable(objDataQuery, (iterator) =>
      iterator.map((data) => new BasicObj(data))
    );
  }

  getBatchSize() {
    return this._batchSize || 100;
  }

  suggest(prefix: string, options?: SuggestOptions): string[] {
    const { attributes, limit } = { attributes: ['*'], limit: 5, ...options };

    return suggest(
      this.objSpaceId(),
      prefix,
      { attributes, limit },
      this.queryParams()
    );
  }

  facet(attribute: string, options?: FacetQueryOptions): BasicObjFacetValue[] {
    let facetOptions: FacetQueryOptions;
    if (options === undefined) {
      facetOptions = {};
    } else {
      facetOptions = assertValidFacetOptions(options);
    }
    const facetQuery = new FacetQuery(
      this.objSpaceId(),
      underscoreAttribute(attribute),
      facetOptions,
      this._query
    );
    return facetQuery
      .result()
      .map((facetData) => new BasicObjFacetValue(this.objSpaceId(), facetData));
  }

  objSpaceId(): ObjSpaceId {
    return this._objSpaceId;
  }

  params(): ObjSearchParams {
    return {
      ...this.queryParams(),
      batchSize: this._batchSize,
    };
  }

  queryParams(): QueryParams {
    const params: QueryParams = { query: this._query };
    if (this._boost !== undefined && this._boost.length) {
      params.boost = this._boost;
    }
    if (this._offset !== undefined) params.offset = this._offset;
    if (this._orderBy !== undefined) params.orderBy = this._orderBy;
    if (this._includeDeleted !== undefined) {
      params.includeDeleted = this._includeDeleted;
    }
    if (this._includeEditingAssets !== undefined) {
      params.includeEditingAssets = this._includeEditingAssets;
    }

    return params;
  }

  private internalTake(count?: number): BasicObj[] {
    const oldBatchSize = this._batchSize;
    try {
      this._batchSize = count === undefined ? 1000 : count;
      return extractFromIterator(this.iterator(), count);
    } finally {
      this._batchSize = oldBatchSize;
    }
  }

  private onSite(siteId: string) {
    return this.and('_siteId', 'equals', siteId);
  }
}

function buildSubQuery(
  fieldInput: SearchField,
  operatorInput: SearchOperator,
  valueInput: BasicSearchValue
): Query {
  const field = convertAttribute(fieldInput);
  const operator = convertOperator(operatorInput);
  const value = convertValue(valueInput, operator);

  return { field, operator, value };
}

function assertBoostableOperator(operator: SearchOperator) {
  if (!BOOSTABLE_OPERATORS.includes(operator)) {
    throw new ArgumentError(
      `Boosting operator "${operator}" is invalid. ${explainValidOperators(
        BOOSTABLE_OPERATORS
      )}`
    );
  }
}

function assertNegatableOperator(operator: SearchOperator) {
  if (!NEGATABLE_OPERATORS.includes(operator)) {
    throw new ArgumentError(
      `Negating operator "${operator}" is invalid. ${explainValidOperators(
        NEGATABLE_OPERATORS
      )}`
    );
  }
}

function convertValue(
  value: BasicSearchValue,
  operator: BackendSearchOperator
) {
  if (Array.isArray(value)) {
    return value.map((v) => convertSingleValue(v, operator));
  }

  return convertSingleValue(value, operator);
}

function convertSingleValue(
  value: SingleBasicSearchValue,
  operator: BackendSearchOperator
): SingleBackendSearchValue {
  if (isDate(value)) return convertDate(value, operator);

  if (value instanceof BasicObj) {
    return value.id();
  }
  return value;
}

function convertDate(value: Date, operator: BackendSearchOperator) {
  if (operator !== 'is_greater_than' && operator !== 'is_less_than') {
    return formatDateToString(value);
  }

  const roundedDate = roundToNearestMinute(value);
  const isInCurrentDateRange = Math.abs(Date.now() - value.getTime()) < 30_000;

  return formatDateToString(isInCurrentDateRange ? roundedDate : value);
}

function roundToNearestMinute(value: Date) {
  const oneMinuteInMs = 60_000;
  return new Date(Math.round(value.getTime() / oneMinuteInMs) * oneMinuteInMs);
}

function convertOperator(operator: SearchOperator): BackendSearchOperator {
  if (!OPERATORS.includes(operator)) {
    throw new ArgumentError(
      `Operator "${operator}" is invalid. ${explainValidOperators(OPERATORS)}`
    );
  }

  return underscore(operator) as BackendSearchOperator;
}

function explainValidOperators(operators: string[]): string {
  return `Valid operators are ${operators.join(', ')}.`;
}

function convertAttribute(attribute: string | string[]) {
  if (Array.isArray(attribute)) {
    return attribute.map((a) => underscoreAttribute(a));
  }

  return underscoreAttribute(attribute);
}

function underscoreBoostAttributes(boost: FieldBoost) {
  const boostWithUnderscoreAttributes: FieldBoost = {};
  Object.keys(boost).forEach((attributeName) => {
    const value = boost[attributeName];
    const underscoredAttributeName = underscoreAttribute(attributeName);
    boostWithUnderscoreAttributes[underscoredAttributeName] = value;
  });

  return boostWithUnderscoreAttributes;
}

function underscoreAttribute(attributeName: string) {
  if (!isCamelCase(attributeName)) {
    throw new ArgumentError(
      `Attribute name "${attributeName}" is not camel case.`
    );
  }

  return underscore(attributeName);
}

function normalizeOrderByItem(
  attribute: string,
  direction: 'asc' | 'desc' | undefined = 'asc'
): OrderByItem {
  const sortBy = underscoreAttribute(attribute);
  return [sortBy, direction];
}

const VALID_FACET_OPTIONS = ['limit', 'includeObjs'];

function assertValidFacetOptions(
  options: FacetQueryOptions
): FacetQueryOptions {
  const invalidOptions = Object.keys(options).filter(
    (key) => !VALID_FACET_OPTIONS.includes(key)
  );
  if (invalidOptions.length) {
    throw new ArgumentError(
      'Invalid facet options: ' +
        `${prettyPrint(
          invalidOptions
        )}. Valid options: ${VALID_FACET_OPTIONS.join()}`
    );
  }
  return options;
}
