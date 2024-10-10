import { provideDataClass } from 'scrivito'
import { pseudoRandom32CharHex } from '../utils/pseudoRandom32CharHex'
import { orderBy } from 'lodash-es'
import { ensureString } from '../utils/ensureString'
import { DataClassAttributes } from './types'
import { scrivitoTenantId } from '../config/scrivitoTenants'

interface DataItem {
  _id: string
  [key: string]: unknown
}

export function provideLocalStorageDataClass(
  className: string,
  {
    initialContent,
    prepareData,
    postProcessData,
    attributes,
  }: {
    initialContent?: DataItem[]
    prepareData?: (
      data: Record<string, unknown>,
    ) => Promise<Record<string, unknown>>
    postProcessData?: (data: DataItem) => Promise<DataItem>
    attributes?: DataClassAttributes
  } = {},
) {
  const recordKey = `localDataClass-${scrivitoTenantId()}-${className}`

  if (initialContent) initializeContent(initialContent)

  return provideDataClass(className, {
    attributes,
    connection: {
      async index(params): Promise<{
        results: DataItem[]
        count?: number
        continuation?: string
      }> {
        const record = restoreRecord()
        const rawItems = Object.values(record)
        const items = postProcessData
          ? await Promise.all(rawItems.map((item) => postProcessData(item)))
          : rawItems

        const filters = params.filters()
        const filteredItems =
          Object.keys(filters).length === 0
            ? items
            : items.filter((item) =>
                Object.entries(filters).every(([filterAttribute, filter]) => {
                  const itemValue = item[filterAttribute]
                  const subFilters =
                    filter.operator === 'and' ? filter.value : [filter]

                  return subFilters.every(({ value: filterValue, opCode }) =>
                    compare({ itemValue, filterValue, opCode }),
                  )
                }),
              )

        const search = params.search().toLowerCase()
        const matchingItems = filteredItems.filter((item) =>
          Object.values(item)
            .map(ensureString)
            .some((value) => value.toLowerCase().includes(search)),
        )

        const orderedItems = orderItems(matchingItems, params.order())

        const offset =
          params.continuation() === undefined
            ? 0
            : Number(params.continuation())
        const newOffset = offset + 10

        const results = orderedItems.slice(offset, newOffset)
        const continuation =
          newOffset < orderedItems.length ? newOffset.toString() : undefined

        return { results, continuation, count: orderedItems.length }
      },

      async get(id: string): Promise<DataItem | null> {
        const rawItem = restoreRecord()[id]
        if (!rawItem) return null

        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async create(data: Record<string, unknown>): Promise<{ _id: string }> {
        const record = restoreRecord()

        const _id = pseudoRandom32CharHex()
        const newData = prepareData ? await prepareData(data) : data
        const storedData: DataItem = { ...newData, _id }
        record[_id] = storedData

        persistRecord(record)
        const rawItem = { ...newData, _id }
        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async update(
        id: string,
        data: Record<string, unknown>,
      ): Promise<unknown> {
        const record = restoreRecord()
        const newData = prepareData ? await prepareData(data) : data
        const storedData: DataItem = { ...newData, _id: id }
        record[id] = storedData

        persistRecord(record)
        const rawItem = { ...newData, _id: id }
        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async delete(id: string): Promise<void> {
        const record = restoreRecord()
        delete record[id]
        persistRecord(record)
      },
    },
  })

  async function initializeContent(initialContent: DataItem[]) {
    if (typeof localStorage === 'undefined') return

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
      console.error('An error occurred during initializing', e)
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
    } catch {
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
  if (typeof item !== 'object') return false
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
    if (
      !(
        (typeof itemValue === 'number' || typeof itemValue === 'string') &&
        (typeof filterValue === 'number' || typeof filterValue === 'string')
      )
    ) {
      throw new Error(
        `Invalid comparison: ${itemValue} and ${filterValue} must be numbers or strings.`,
      )
    }

    return comparators[opCode](itemValue, filterValue)
  }

  const eq =
    itemValue === filterValue ||
    (filterValue === 'null' && itemValue === null) ||
    (filterValue === 'true' && itemValue === true) ||
    (filterValue === 'false' && itemValue === false)

  return opCode === 'neq' ? !eq : eq
}
