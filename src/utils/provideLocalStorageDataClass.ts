import { provideDataClass } from 'scrivito'
import { pseudoRandom32CharHex } from './pseudoRandom32CharHex'
import { isObject, orderBy } from 'lodash-es'

interface DataItem {
  _id: string
  [key: string]: unknown
}

export function provideLocalStorageDataClass(
  className: string,
  { initialContent }: { initialContent?: DataItem[] } = {},
) {
  const recordKey = `localDataClass-${className}`

  if (initialContent) initializeContent(initialContent)

  return provideDataClass(className, {
    connection: {
      async index(params): Promise<{ results: DataItem[] }> {
        const record = restoreRecord()
        const items = Object.values(record)

        const filters = params.filters()
        const filteredItems =
          Object.keys(filters).length === 0
            ? items
            : items.filter((item) =>
                Object.entries(filters).every(
                  ([filterAttribute, filterValue]) =>
                    item[filterAttribute] === filterValue,
                ),
              )

        if (params.search()) throw new Error('search not implemented!')
        const orderedItems = orderItems(filteredItems, params.order())

        return { results: orderedItems }
      },

      async get(id: string): Promise<DataItem | null> {
        const record = restoreRecord()

        return id in record ? record[id] : null
      },

      async create(data: Record<string, unknown>): Promise<{ _id: string }> {
        const record = restoreRecord()

        const _id = pseudoRandom32CharHex()
        const storedData: DataItem = { ...data, _id }
        record[_id] = storedData

        persistRecord(record)
        return { _id }
      },

      async update(id: string, data: Record<string, unknown>): Promise<void> {
        const record = restoreRecord()
        const storedData: DataItem = { ...data, _id: id }
        record[id] = storedData

        persistRecord(record)
      },

      async delete(id: string): Promise<void> {
        const record = restoreRecord()
        delete record[id]
        persistRecord(record)
      },
    },
  })

  async function initializeContent(initialContent: DataItem[]) {
    const initializedKey = `${recordKey}-initialized-with`
    const initializedValue = JSON.stringify(initialContent)

    try {
      if (localStorage.getItem(initializedKey) !== initializedValue) {
        const initialRecord: Record<string, DataItem> = {}
        initialContent.forEach((item) => {
          const id = item._id

          if (Object.keys(initialRecord).includes(id)) {
            throw new Error(`Duplicate _id ${id} in initialContent!`)
          }

          initialRecord[id] = item
        })
        persistRecord(initialRecord)
        localStorage.setItem(initializedKey, initializedValue)
      }
    } catch (e) {
      console.log('An error occurred during initializing', e)
    }
  }

  function restoreRecord(): Record<string, DataItem> {
    let item: string | null | undefined
    try {
      item = localStorage.getItem(recordKey)
    } catch {
      return {}
    }

    if (!item) return {}

    try {
      const parsed = JSON.parse(item)
      if (!isDataItemRecord(parsed)) return {}

      return parsed
    } catch (e) {
      return {}
    }
  }

  function persistRecord(record: Record<string, DataItem>): void {
    localStorage.setItem(recordKey, JSON.stringify(record))
  }
}

function isDataItemRecord(input: unknown): input is Record<string, DataItem> {
  if (!input) return false
  if (typeof input !== 'object') return false
  return Object.values(input).every((item) => isDataItem(item))
}

function isDataItem(item: unknown): item is DataItem {
  if (!item) return false
  if (!isObject(item)) return false
  return typeof (item as DataItem)._id === 'string'
}

function orderItems(
  items: DataItem[],
  order: Array<[string, 'asc' | 'desc']>,
): DataItem[] {
  if (order.length === 0) return items

  return orderBy(
    items,
    order.map(([attr]) => attr),
    order.map(([_, ascOrDesc]) => ascOrDesc),
  )
}
