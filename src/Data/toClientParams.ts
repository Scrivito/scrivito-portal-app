import { provideDataClass } from 'scrivito'

type DataConnection = Parameters<typeof provideDataClass>[1]['connection']
type IndexCallback = NonNullable<DataConnection['index']>
type IndexParams = Parameters<IndexCallback>[0]

interface OperatorSpec {
  operator: 'equals' | 'notEquals'
  opCode: 'eq' | 'neq'
  value: string
}

export function toClientParams(params: IndexParams) {
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
    _search: params.search() || undefined,
    _count: params.includeCount() ? 'true' : undefined,
  }
}

function toClientFilterParam(filters: Record<string, OperatorSpec>) {
  const params: Record<string, string> = {}

  Object.keys(filters).forEach((name) => {
    const { opCode, value } = filters[name] as OperatorSpec
    const key = opCode === 'eq' ? name : [name, opCode].join('.')
    params[key] = value
  })

  return params
}
