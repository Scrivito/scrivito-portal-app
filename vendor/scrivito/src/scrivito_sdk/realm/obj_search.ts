import { ArgumentError, throwInvalidArgumentsError } from 'scrivito_sdk/common';
import { FacetQueryOptions, SuggestOptions } from 'scrivito_sdk/data';
import {
  BasicObjSearch,
  FULL_TEXT_OPERATORS,
  FieldBoost,
  FullTextSearchOperator,
  SearchField,
  SearchOperator,
} from 'scrivito_sdk/models';
import { OrderAttributes } from 'scrivito_sdk/models/basic_obj_search';
import { AttributeDefinitions, Obj } from 'scrivito_sdk/realm';
import { ObjFacetValue } from 'scrivito_sdk/realm/obj_facet_value';
import { areStrictSearchOperatorsEnabled } from 'scrivito_sdk/realm/strict_search_operators';
import {
  unwrapAppClass,
  wrapInAppClass,
} from 'scrivito_sdk/realm/wrap_in_app_class';

export type SearchValue = SingleSearchValue | SingleSearchValue[];
type SingleSearchValue = BackendSingleSearchValue | Date | Obj;
type BackendSingleSearchValue = string | number | boolean | null;

/** @public */
export class ObjSearch<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions
> {
  /** @internal */
  readonly _scrivitoPrivateContent: BasicObjSearch;

  /** @internal */
  constructor(basicSearch: BasicObjSearch) {
    this._scrivitoPrivateContent = basicSearch;
  }

  and(
    field: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): this;

  /** @internal */
  and(searchToExtendBy: ObjSearch): this;

  /** @internal */
  and(
    fieldOrSearchToExtendBy: SearchField | ObjSearch,
    operator?: SearchOperator,
    value?: SearchValue,
    boost?: FieldBoost
  ): this {
    if (fieldOrSearchToExtendBy instanceof ObjSearch) {
      const search = fieldOrSearchToExtendBy;
      this._scrivitoPrivateContent.and(search._scrivitoPrivateContent);
    } else {
      if (operator === undefined) {
        throw new ArgumentError('Missing operator to search with');
      }
      if (value === undefined) {
        throw new ArgumentError(
          'Missing value to search (specify "null" for missing)'
        );
      }

      if (areStrictSearchOperatorsEnabled()) {
        checkNonFullTextSearchOperator(
          'objSearch.and',
          operator,
          'js-sdk/ObjSearch-and'
        );
      }

      const field = fieldOrSearchToExtendBy;
      const unwrappedValue = unwrapAppClassValue(value);
      this._scrivitoPrivateContent.and(field, operator, unwrappedValue, boost);
    }
    return this;
  }

  andFullTextOf(
    field: SearchField,
    operator: FullTextSearchOperator,
    value: SearchValue,
    boost?: FieldBoost
  ): this {
    checkFullTextSearchOperator(
      'objSearch.andFullTextOf',
      operator,
      'js-sdk/ObjSearch-andFullTextOf'
    );

    const unwrappedValue = unwrapAppClassValue(value);
    this._scrivitoPrivateContent.and(field, operator, unwrappedValue, boost);

    return this;
  }

  andNot(
    field: SearchField,
    operator: SearchOperator,
    value: SearchValue
  ): this {
    const unwrappedValue = unwrapAppClassValue(value);
    this._scrivitoPrivateContent.andNot(field, operator, unwrappedValue);
    return this;
  }

  andIsChildOf(obj: Obj): this {
    this._scrivitoPrivateContent.andIsChildOf(unwrapAppClass(obj));
    return this;
  }

  andIsInsideSubtreeOf(obj: Obj): this {
    this._scrivitoPrivateContent.andIsInsideSubtreeOf(unwrapAppClass(obj));
    return this;
  }

  boost(
    field: SearchField,
    operator: SearchOperator,
    value: SearchValue,
    factor: number
  ): this {
    this._scrivitoPrivateContent.boost(
      field,
      operator,
      unwrapAppClassValue(value),
      factor
    );

    return this;
  }

  facet(attribute: string, options?: FacetQueryOptions): ObjFacetValue[] {
    const basicFacets = this._scrivitoPrivateContent.facet(attribute, options);
    return basicFacets.map((facetValue) => new ObjFacetValue(facetValue));
  }

  suggest(prefix: string, options?: SuggestOptions): string[] {
    return this._scrivitoPrivateContent.suggest(prefix, options);
  }

  first(): Obj<AttrDefs> | null {
    const basicObj = this._scrivitoPrivateContent.first();

    if (!basicObj) return null;

    return wrapInAppClass<AttrDefs>(basicObj);
  }

  take(count?: number): Obj<AttrDefs>[];

  /** @internal */
  take(count?: number): Obj<AttrDefs>[] {
    const basicObjs =
      count === undefined
        ? this._scrivitoPrivateContent.dangerouslyUnboundedTake()
        : this._scrivitoPrivateContent.take(count);
    return basicObjs.map((obj) => wrapInAppClass<AttrDefs>(obj));
  }

  toArray(): Obj<AttrDefs>[] {
    const basicObjs = this._scrivitoPrivateContent.dangerouslyUnboundedTake();
    return basicObjs.map((obj) => wrapInAppClass<AttrDefs>(obj));
  }

  offset(offset: number): this {
    this._scrivitoPrivateContent.offset(offset);
    return this;
  }

  order(attribute: string, direction?: 'asc' | 'desc'): this;
  order(attributes: OrderAttributes): this;

  /** @internal */
  order(
    attributeOrAttributes: string | OrderAttributes,
    direction?: 'asc' | 'desc'
  ): this {
    if (Array.isArray(attributeOrAttributes)) {
      if (direction !== undefined) {
        throw new ArgumentError(
          'Direction can not be set independent of attributes.'
        );
      }
      this._scrivitoPrivateContent.order(attributeOrAttributes);
      return this;
    }

    this._scrivitoPrivateContent.order(attributeOrAttributes, direction);
    return this;
  }

  count(): number {
    return this._scrivitoPrivateContent.count();
  }
}

// check if the environment supports ES6 iterables
// (either native or through some kind of polyfill)
// if yes, make ObjSearch an ES6 iterable.
if (typeof Symbol === 'function') {
  const iteratorSymbol = Symbol.iterator;
  if (iteratorSymbol) {
    // type 'ObjSearch' has no index signature
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proto = ObjSearch.prototype as any;
    // public API
    proto[iteratorSymbol] = function iterator() {
      const basicObjsIterator = this._scrivitoPrivateContent.iterator();

      return {
        next() {
          const iteratorResult = basicObjsIterator.next();
          if (iteratorResult.done) {
            return { done: iteratorResult.done };
          }

          return {
            done: iteratorResult.done,
            value: wrapInAppClass(iteratorResult.value),
          };
        },
      };
    };
  }
}

// A direct call to `unwrapAppClass` is unable to infer a correct return value type for input `Obj[]`
function unwrapAppClassValue(value: SearchValue) {
  if (Array.isArray(value)) return value.map((v) => unwrapAppClass(v));

  return unwrapAppClass(value);
}

export function checkNonFullTextSearchOperator(
  functionName: string,
  operator: SearchOperator,
  docPermalink: string
) {
  if (FULL_TEXT_OPERATORS.indexOf(operator as FullTextSearchOperator) !== -1) {
    throwInvalidArgumentsError(
      functionName,
      `operator '${operator}' must be a search operator except: ${FULL_TEXT_OPERATORS.join(
        ', '
      )}`,
      { docPermalink }
    );
  }
}

export function checkFullTextSearchOperator(
  functionName: string,
  operator: SearchOperator,
  docPermalink: string
) {
  if (FULL_TEXT_OPERATORS.indexOf(operator as FullTextSearchOperator) === -1) {
    throwInvalidArgumentsError(
      functionName,
      `operator '${operator}' must be a full text search operator: ${FULL_TEXT_OPERATORS.join(
        ', '
      )}`,
      { docPermalink }
    );
  }
}
