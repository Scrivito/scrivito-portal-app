import { OpCode } from 'scrivito_sdk/client';
import {
  FilterOperator,
  NormalizedDataScopeParams,
  OperatorSpec,
  OrderSpec,
  isOperatorSpec,
} from 'scrivito_sdk/data_integration/data_class';

interface Params extends NormalizedDataScopeParams {
  limit: number;
  count: boolean;
}

export interface FilterSpec extends OperatorSpec {
  opCode: OpCode;
}

export interface AndFilterSpec {
  operator: 'and';
  value: FilterSpec[];
}

/** @public */
export type DataConnectionFilters = Record<string, FilterSpec | AndFilterSpec>;

/** @public */
export class DataConnectionIndexParams {
  constructor(
    private readonly _continuation: string | undefined,
    private readonly _params: Params
  ) {}

  continuation(): string | undefined {
    return this._continuation;
  }

  filters(): DataConnectionFilters {
    return Object.entries(this._params.filters || {}).reduce(
      (filters, [name, operatorSpec]) => {
        if (!name) return filters;

        return {
          ...filters,
          [name]: isOperatorSpec(operatorSpec)
            ? {
                ...operatorSpec,
                opCode: operatorToOpCode[operatorSpec.operator],
              }
            : {
                operator: 'and',
                value: operatorSpec.value.map((spec) => ({
                  ...spec,
                  opCode: operatorToOpCode[spec.operator],
                })),
              },
        };
      },
      {}
    );
  }

  search(): string {
    return this._params.search || '';
  }

  order(): OrderSpec {
    return (this._params.order || []).filter(
      ([attributeName]) => !!attributeName
    );
  }

  limit(): number {
    return this._params.limit;
  }

  includeCount(): boolean {
    return this._params.count;
  }
}

export const operatorToOpCode: Record<FilterOperator, OpCode> = {
  equals: 'eq',
  notEquals: 'neq',
  isGreaterThan: 'gt',
  isLessThan: 'lt',
  isGreaterThanOrEquals: 'gte',
  isLessThanOrEquals: 'lte',
};

export function isAndFilterSpec(
  spec: FilterSpec | AndFilterSpec
): spec is AndFilterSpec {
  return spec.operator === 'and';
}
