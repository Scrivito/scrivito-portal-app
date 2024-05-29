import { OpCode } from 'scrivito_sdk/client';
import {
  DataScopeParams,
  FilterOperator,
  OrderSpec,
} from 'scrivito_sdk/data_integration/data_class';

interface Params extends DataScopeParams {
  limit: number;
  count: boolean;
}

export type IndexParamsFilters = Record<
  string,
  {
    operator: FilterOperator;
    opCode: OpCode;
    value: string;
  }
>;

/** @public */
export class IndexParams {
  constructor(
    private readonly _continuation: string | undefined,
    private readonly _params: Params
  ) {}

  continuation(): string | undefined {
    return this._continuation;
  }

  filters(): IndexParamsFilters {
    return Object.entries(this._params.filters || {}).reduce(
      (filters, [name, valueOrSpec]) => {
        if (!name) return filters;

        if (typeof valueOrSpec === 'string') {
          return {
            ...filters,
            [name]: {
              operator: 'equals',
              opCode: 'eq',
              value: valueOrSpec,
            },
          };
        }

        return {
          ...filters,
          [name]: {
            ...valueOrSpec,
            opCode: valueOrSpec.operator === 'notEquals' ? 'neq' : 'eq',
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
