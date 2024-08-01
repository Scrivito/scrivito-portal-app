import { createRestApiClient, ArgumentError } from 'scrivito'
import { DataConnection } from './types'

type IndexCallback = NonNullable<DataConnection['index']>
type IndexParams = Parameters<IndexCallback>[0]

type ApiClient = ReturnType<typeof createRestApiClient>
type FetchOptions = NonNullable<Parameters<ApiClient['get']>[1]>
type FetchParams = NonNullable<FetchOptions['params']>

type FilterValue = string | number | boolean | null

interface FilterSpec {
  operator:
    | 'equals'
    | 'notEquals'
    | 'isGreaterThan'
    | 'isLessThan'
    | 'isGreaterThanOrEquals'
    | 'isLessThanOrEquals'
  opCode: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte'
  value: FilterValue
}

interface AndFilterSpec {
  operator: 'and'
  value: FilterSpec[]
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

function toClientFilterParam(
  filters: Record<string, FilterSpec | AndFilterSpec>,
) {
  const params: Record<string, string> = {}

  Object.entries(filters).forEach(([name, filter]) => {
    let filterCollection: FilterSpec[]

    if (filter.operator === 'and') {
      assertNoConflicts(filter.value)
      filterCollection = filter.value
    } else {
      filterCollection = [filter]
    }

    filterCollection.forEach((currentFilter) => {
      const { opCode, value } = currentFilter
      const key = opCode === 'eq' ? name : [name, opCode].join('.')
      params[key] = serializeFilterValue(value)
    })
  })

  return params
}

function serializeFilterValue(value: FilterValue): string {
  if (typeof value === 'string') return value
  if (value === null) return ''
  return JSON.stringify(value)
}

function assertNoConflicts(specs: FilterSpec[]) {
  if (specs.length < 2) return

  if (
    specs.some((outerSpec, index) =>
      specs
        .slice(index + 1)
        .some(
          (innerSpec) =>
            innerSpec.operator === outerSpec.operator &&
            innerSpec.value !== outerSpec.value,
        ),
    )
  ) {
    throw new ArgumentError(
      `Multiple filters on the same attribute with the same operator but different values are currently not supported: ${JSON.stringify(
        specs,
      )}`,
    )
  }
}
