import { provideDataClass } from 'scrivito'
import { pseudoRandom32CharHex } from './pseudoRandom32CharHex'
import { isObject } from 'lodash-es'

export function provideLocalStorageDataClass(className: string) {
  const localStorageKey = `localDataClass-${className}`

  return provideDataClass(className, {
    connection: {
      async index(params): Promise<{ results: string[] }> {
        const record = restoreRecord()
        const items = Object.entries(record)

        const filters = params.filters()
        const filteredItems =
          Object.keys(filters).length === 0
            ? items
            : items.filter(
                ([_id, item]) =>
                  isStringObject(item) &&
                  Object.entries(filters).every(
                    ([filterAttribute, filterValue]) =>
                      item[filterAttribute] === filterValue,
                  ),
              )

        if (params.search()) throw new Error('search not implemented!')
        const sortedItems = sortItems(filteredItems, params.order())

        return { results: sortedItems.map(([id, _item]) => id) }
      },

      async get(id: string): Promise<unknown | null> {
        const record = restoreRecord()

        return id in record ? record[id] : null
      },

      async create(data: unknown): Promise<{ _id: string }> {
        const record = restoreRecord()

        const _id = pseudoRandom32CharHex()
        record[_id] = data

        persistRecord(record)
        return { _id }
      },

      async update(id: string, data: unknown): Promise<void> {
        const record = restoreRecord()
        record[id] = data

        persistRecord(record)
      },

      async delete(id: string): Promise<void> {
        const record = restoreRecord()
        delete record[id]
        persistRecord(record)
      },
    },
  })

  function restoreRecord(): Record<string, unknown> {
    let item: string | null | undefined
    try {
      item = localStorage.getItem(localStorageKey)
    } catch {
      return {}
    }

    if (!item) return {}

    try {
      const parsed = JSON.parse(item)
      if (!isStringObject(parsed)) return {}

      return parsed
    } catch (e) {
      return {}
    }
  }

  function persistRecord(record: Record<string, unknown>): void {
    localStorage.setItem(localStorageKey, JSON.stringify(record))
  }
}

function isStringObject(item: unknown): item is Record<string, unknown> {
  if (!item) return false
  if (!isObject(item)) return false
  return Object.keys(item).every((key) => typeof key === 'string')
}

function sortItems(
  items: [string, unknown][],
  order: Array<[string, 'asc' | 'desc']>,
): [string, unknown][] {
  if (order.length === 0) return items

  return [...items].sort((a, b) => {
    const itemA = a[1]
    const itemB = b[1]
    if (!isObject(itemA) || !isObject(itemB)) return 0

    for (const [attr, ascOrDesc] of order) {
      const valueA = (itemA as Record<string, unknown>)[attr]
      const valueB = (itemB as Record<string, unknown>)[attr]

      const comparison =
        typeof valueA === 'string' && typeof valueB === 'string'
          ? valueA.localeCompare(valueB)
          : typeof valueA === 'number' && typeof valueB === 'number'
            ? valueA - valueB
            : 0

      if (comparison === 0) continue
      return ascOrDesc === 'asc' ? comparison : -comparison
    }

    return 0
  })
}
