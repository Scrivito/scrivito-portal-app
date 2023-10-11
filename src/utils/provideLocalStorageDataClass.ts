import { provideDataClass } from 'scrivito'
import { pseudoRandom32CharHex } from '../Widgets/FormContainerWidget/utils/pseudoRandom32CharHex'
import { isObject } from 'lodash-es'

export function provideLocalStorageDataClass(className: string) {
  const localStorageKey = `localDataClass-${className}`

  return provideDataClass(className, {
    connection: {
      async index(params): Promise<{ results: string[] }> {
        const record = restoreRecord()
        const items = Object.entries(record)

        if (params.order().length > 0) throw new Error('order not implemented!')
        if (params.search()) throw new Error('search not implemented!')

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

        return { results: filteredItems.map(([id, _item]) => id) }
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
    const item = localStorage.getItem(localStorageKey)
    if (item === null) return {}

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
