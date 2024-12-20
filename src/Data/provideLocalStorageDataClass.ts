import { provideDataClass } from 'scrivito'
import { pseudoRandom32CharHex } from '../utils/pseudoRandom32CharHex'
import { orderBy } from 'lodash-es'
import { ensureString } from '../utils/ensureString'
import { ReadonlyDataClassAttributes, ResultItem, ExternalData } from './types'
import { scrivitoTenantId } from '../config/scrivitoTenants'

interface RawDataItem {
  _id: string
  [key: string]: unknown
}

const recordKeys: Set<{ recordKey: string; className: string }> = new Set()

export function provideLocalStorageDataClass(
  className: string,
  {
    initialContent,
    prepareData,
    postProcessData,
    attributes,
  }: {
    initialContent?: RawDataItem[]
    prepareData?: (data: ExternalData) => Promise<ExternalData>
    postProcessData?: (data: ResultItem) => Promise<ResultItem>
    attributes?: ReadonlyDataClassAttributes
  } = {},
) {
  const recordKey = `localDataClass-${scrivitoTenantId()}-${className}`
  recordKeys.add({ className, recordKey })

  if (initialContent) initializeContent(initialContent)

  return provideDataClass(className, {
    attributes,
    connection: {
      async index(params) {
        const record = restoreRecord(recordKey)
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

      async get(id) {
        const rawItem = restoreRecord(recordKey)[id]
        if (!rawItem) return null

        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async create(data) {
        const record = restoreRecord(recordKey)

        const _id = pseudoRandom32CharHex()
        const newData = prepareData ? await prepareData(data) : data
        const storedData: RawDataItem = { ...newData, _id }
        record[_id] = storedData

        persistRecord(recordKey, record)
        const rawItem = { ...newData, _id }
        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async update(id, data) {
        const record = restoreRecord(recordKey)
        const newData = prepareData ? await prepareData(data) : data
        const storedData: RawDataItem = { ...newData, _id: id }
        record[id] = storedData

        persistRecord(recordKey, record)
        const rawItem = { ...newData, _id: id }
        return postProcessData ? postProcessData(rawItem) : rawItem
      },

      async delete(id) {
        const record = restoreRecord(recordKey)
        delete record[id]
        persistRecord(recordKey, record)
      },
    },
  })

  async function initializeContent(initialContent: RawDataItem[]) {
    if (typeof localStorage === 'undefined') return

    const initializedKey = `${recordKey}-initialized-with`
    const initializedValue = JSON.stringify(initialContent)

    try {
      if (localStorage.getItem(initializedKey) !== initializedValue) {
        const initialRecord: Record<string, RawDataItem> = {}
        initialContent.forEach((item) => {
          const id = item._id

          if (Object.keys(initialRecord).includes(id)) {
            throw new Error(`Duplicate _id ${id} in initialContent!`)
          }

          initialRecord[id] = item
        })
        persistRecord(recordKey, initialRecord)
        localStorage.setItem(initializedKey, initializedValue)
      }
    } catch (e) {
      console.error('An error occurred during initializing', e)
    }
  }
}

export function searchLocalStorageDataClasses(
  search: string,
  blackListEntities: string[] = [],
): Array<{ _id: string; entity: string; title: string }> {
  const results: Array<{ _id: string; entity: string; title: string }> = []

  const lowerCaseSearchTerm = search.toLowerCase()
  const matchesSearchTerm = (value: unknown) =>
    typeof value === 'string' &&
    value.toLowerCase().includes(lowerCaseSearchTerm)

  recordKeys.forEach(({ className: entity, recordKey }) => {
    if (blackListEntities.includes(entity)) return

    Object.entries(restoreRecord(recordKey)).forEach(([_id, item]) => {
      if (Object.values(item).some(matchesSearchTerm)) {
        results.push({
          _id,
          entity,
          title: ensureString(item.title) || ensureString(item.keyword),
        })
      }
    })
  })

  return results
}

function restoreRecord(recordKey: string): Record<string, RawDataItem> {
  let item: string | null | undefined
  try {
    item = localStorage.getItem(recordKey)
  } catch {
    return {}
  }

  if (!item) return {}

  try {
    const parsed = JSON.parse(item)
    if (!isRawDataItemRecord(parsed)) return {}

    return parsed
  } catch {
    return {}
  }
}

function persistRecord(
  recordKey: string,
  record: Record<string, RawDataItem>,
): void {
  localStorage.setItem(recordKey, JSON.stringify(record))
}

function isRawDataItemRecord(
  input: unknown,
): input is Record<string, RawDataItem> {
  if (!input) return false
  if (typeof input !== 'object') return false
  return Object.values(input).every((item) => isRawDataItem(item))
}

function isRawDataItem(item: unknown): item is RawDataItem {
  if (!item) return false
  if (typeof item !== 'object') return false
  return typeof (item as RawDataItem)._id === 'string'
}

function orderItems(
  items: ResultItem[],
  order: Array<[string, 'asc' | 'desc']>,
): ResultItem[] {
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
    (filterValue === null && itemValue === undefined) ||
    (filterValue === 'null' && itemValue === null) ||
    (filterValue === 'null' && itemValue === undefined) ||
    (filterValue === 'true' && itemValue === true) ||
    (filterValue === 'false' && itemValue === false)

  return opCode === 'neq' ? !eq : eq
}
