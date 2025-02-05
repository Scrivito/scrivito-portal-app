import { ApiClient, FilterValue } from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import { OrderSpec } from 'scrivito_sdk/data_integration/data_class';
import { UncheckedDataConnection } from 'scrivito_sdk/data_integration/external_data_connection';
import {
  DataConnectionFilters,
  DataConnectionIndexParams,
  FilterSpec,
} from 'scrivito_sdk/data_integration/index_params';

export function createRestApiConnectionForClass(
  apiClient: ApiClient
): UncheckedDataConnection {
  return {
    create: async (data) => apiClient.fetch('', { method: 'post', data }),
    index: async (params) =>
      apiClient.fetch('', { params: toClientParams(params) }),
    get: async (id) => apiClient.fetch(id),
    update: async (id, data) => apiClient.fetch(id, { method: 'patch', data }),
    delete: (id) => apiClient.fetch(id, { method: 'delete' }),
  };
}

function toClientParams(params: DataConnectionIndexParams) {
  return {
    ...toClientFilterParam(params.filters()),
    _continuation: params.continuation(),
    _order: toClientOrderParam(params.order()),
    _limit: params.limit().toString(),
    _search: params.search() || undefined,
    _count: params.includeCount()
      ? params.includeCount().toString()
      : undefined,
  };
}

interface ClientFilterParams {
  [name: string]: string;
}

function toClientFilterParam(
  filters: DataConnectionFilters
): ClientFilterParams {
  const params: ClientFilterParams = {};

  Object.keys(filters).forEach((name) => {
    const filter = filters[name];
    let filterCollection: FilterSpec[];

    if (filter.operator === 'and') {
      assertNoConflicts(filter.value);
      filterCollection = filter.value;
    } else {
      filterCollection = [filter];
    }

    filterCollection.forEach((currentFilter) => {
      const { opCode, value } = currentFilter;
      const key = opCode === 'eq' ? name : [name, opCode].join('.');
      params[key] = serializeFilterValue(value);
    });
  });

  return params;
}

function toClientOrderParam(orderSpec: OrderSpec) {
  if (orderSpec.length) {
    return orderSpec.map((order) => order.join('.')).join(',');
  }
}

function serializeFilterValue(value: FilterValue): string {
  if (typeof value === 'string') return value;
  if (value === null) return '';
  return JSON.stringify(value);
}

function assertNoConflicts(specs: FilterSpec[]) {
  if (specs.length < 2) return;

  if (
    specs.some((outerSpec, index) =>
      specs
        .slice(index + 1)
        .some(
          (innerSpec) =>
            innerSpec.operator === outerSpec.operator &&
            innerSpec.value !== outerSpec.value
        )
    )
  ) {
    throw new ArgumentError(
      `Multiple filters on the same attribute with the same operator but different values are currently not supported: ${JSON.stringify(
        specs
      )}`
    );
  }
}
