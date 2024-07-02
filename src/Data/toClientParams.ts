import { provideDataClass, createRestApiClient } from 'scrivito'

type DataConnection = Parameters<typeof provideDataClass>[1]['connection']
type IndexCallback = NonNullable<DataConnection['index']>
type IndexParams = Parameters<IndexCallback>[0]

type ApiClient = ReturnType<typeof createRestApiClient>
type FetchOptions = NonNullable<Parameters<ApiClient['get']>[1]>
type FetchParams = NonNullable<FetchOptions['params']>

interface OperatorSpec {
  operator: 'equals' | 'notEquals'
  opCode: 'eq' | 'neq'
  value: string
}

export function toClientParams(params: IndexParams): FetchParams {
  return {
    ...toClientFilterParam(params.filters()),
    _continuation: params.continuation(),
    _order: params.order().length
      ? params
          .order()
          .map((o) => o.join('.'))
          .join(',')
      : undefined,
    _limit: params.limit().toString(),
    _search: params.search(),
    _count: params.includeCount() ? 'true' : undefined,
  }
}

function toClientFilterParam(filters: Record<string, OperatorSpec>) {
  const params: Record<string, string> = {}

  Object.entries(filters).forEach(([name, { opCode, value }]) => {
    const key = opCode === 'eq' ? name : [name, opCode].join('.')
    params[key] = value
  })

  return params
}
