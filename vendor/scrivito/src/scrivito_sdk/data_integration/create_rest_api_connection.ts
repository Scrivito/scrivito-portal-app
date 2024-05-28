import isObject from 'lodash-es/isObject';

import { ApiClient, createRestApiClient } from 'scrivito_sdk/client';
import { ArgumentError } from 'scrivito_sdk/common';
import { OrderSpec } from 'scrivito_sdk/data_integration/data_class';
import {
  DataConnection,
  IndexResult,
  ResultItem,
  assertValidIndexResultWithUnknownEntries,
} from 'scrivito_sdk/data_integration/external_data_connection';
import {
  IndexParams,
  IndexParamsFilters,
} from 'scrivito_sdk/data_integration/index_params';

export function createRestApiConnection(
  restApi: string | ApiClient
): DataConnection {
  const apiClient =
    restApi instanceof ApiClient ? restApi : createRestApiClient(restApi);

  return {
    create: async (data) => {
      const response = await apiClient.fetch('/', {
        method: 'post',
        data,
      });

      assertResultDoesNotContainObjectValues(response);

      return response as ResultItem;
    },

    index: async (params) => {
      const response = await apiClient.fetch('/', {
        params: toClientParams(params),
      });

      assertIndexResponseResultsDoNotContainObjectValues(response);

      return response;
    },

    get: async (id) => {
      const response = await apiClient.fetch(id);
      if (response !== null) assertResultDoesNotContainObjectValues(response);
      return response;
    },

    update: async (id, data) => {
      const response = await apiClient.fetch(id, {
        method: 'patch',
        data,
      });

      assertResultDoesNotContainObjectValues(response);

      return response;
    },

    delete: (id) => apiClient.fetch(id, { method: 'delete' }),
  };
}

function assertResultDoesNotContainObjectValues(result: unknown) {
  if (!isObject(result)) {
    throw new ArgumentError('A result must be an object');
  }

  Object.entries(result).forEach(([key, value]) => {
    if (
      !isSimpleValue(value) &&
      ((Array.isArray(value) && !value.every(isSimpleValue)) ||
        !Array.isArray(value))
    ) {
      throw new ArgumentError(
        `Result values can only be of type string, number, boolean or array of these types. Invalid property: ${key}`
      );
    }
  });
}

function assertIndexResponseResultsDoNotContainObjectValues(
  response: unknown
): asserts response is IndexResult {
  assertValidIndexResultWithUnknownEntries(response);

  response.results.forEach((result) => {
    if (typeof result === 'number' || typeof result === 'string') return;
    assertResultDoesNotContainObjectValues(result);
  });
}

type SimpleValue = string | number | boolean | null | undefined;

function isSimpleValue(value: unknown): value is SimpleValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  );
}

function toClientParams(params: IndexParams) {
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

function toClientFilterParam(filters: IndexParamsFilters): ClientFilterParams {
  const params: ClientFilterParams = {};

  Object.keys(filters).forEach((name) => {
    const { opCode, value } = filters[name];
    const key = opCode === 'eq' ? name : [name, opCode].join('.');
    params[key] = value;
  });

  return params;
}

function toClientOrderParam(orderSpec: OrderSpec) {
  if (orderSpec.length) {
    return orderSpec.map((order) => order.join('.')).join(',');
  }
}
