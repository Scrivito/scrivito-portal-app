import {
  DataItemFilters,
  DataScopeParams,
  OrderSpec,
} from 'scrivito_sdk/data_integration/data_class';

/** @public */
export class IndexParams {
  constructor(
    private readonly _continuation: string | undefined,
    private readonly _params: DataScopeParams
  ) {}

  continuation(): string | undefined {
    return this._continuation;
  }

  filters(): DataItemFilters {
    return Object.entries(this._params.filters || {}).reduce(
      (nextFilters, [attributeName, attributeValue]) =>
        attributeName
          ? { ...nextFilters, [attributeName]: attributeValue }
          : nextFilters,
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
}
