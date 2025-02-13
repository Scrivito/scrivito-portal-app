import { DataConnectionFilters, DataConnectionResultItem } from 'scrivito'

export function filterDataItems(
  filters: DataConnectionFilters,
  items: DataConnectionResultItem[],
): DataConnectionResultItem[] {
  return items.filter((item) =>
    Object.entries(filters).every(([filterAttribute, filter]) => {
      const itemValue = item[filterAttribute]
      const subFilters = filter.operator === 'and' ? filter.value : [filter]

      return subFilters.every(({ value: filterValue, opCode }) =>
        compare({ itemValue, filterValue, opCode }),
      )
    }),
  )
}

const comparators = {
  gt: (a: string | number, b: string | number) => a > b,
  lt: (a: string | number, b: string | number) => a < b,
  gte: (a: string | number, b: string | number) => a >= b,
  lte: (a: string | number, b: string | number) => a <= b,
}

function compare({
  itemValue,
  filterValue,
  opCode,
}: {
  itemValue: unknown
  filterValue: string | number | boolean | null
  opCode: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte'
}): boolean {
  if (opCode !== 'eq' && opCode !== 'neq') {
    if (filterValue === null) return false

    if (
      !(
        (typeof itemValue === 'number' || typeof itemValue === 'string') &&
        (typeof filterValue === 'number' || typeof filterValue === 'string')
      )
    ) {
      throw new Error(
        `Invalid comparison: ${JSON.stringify(itemValue)} and ${JSON.stringify(filterValue)} must be numbers or strings.`,
      )
    }

    return comparators[opCode](itemValue, filterValue)
  }

  const eq =
    itemValue === filterValue ||
    (filterValue === null && itemValue === undefined) ||
    (filterValue === 'null' && itemValue === null) ||
    (filterValue === 'null' && itemValue === undefined) ||
    (filterValue === 'true' && itemValue === true) ||
    (filterValue === 'false' && itemValue === false)

  return opCode === 'neq' ? !eq : eq
}
