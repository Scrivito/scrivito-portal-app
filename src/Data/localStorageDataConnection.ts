import {
  DataConnection,
  DataConnectionResultItem,
  getInstanceId,
  load,
  Obj,
} from 'scrivito'
import { pseudoRandom32CharHex } from '../utils/pseudoRandom32CharHex'
import { orderBy } from 'lodash-es'
import { ensureString } from '../utils/ensureString'

interface RawDataItem {
  _id: string
  [key: string]: unknown
}

export async function localStorageDataConnection(
  className: string,
  {
    initialContent,
    prepareData,
    postProcessData,
  }: {
    initialContent?: RawDataItem[]
    prepareData?: (
      data: Record<string, unknown>,
    ) => Promise<Record<string, unknown>>
    postProcessData?: (
      data: DataConnectionResultItem,
    ) => Promise<DataConnectionResultItem>
  } = {},
): Promise<Partial<DataConnection>> {
  if (typeof localStorage === 'undefined') {
    return {
      index: () => {
        throw new Error('localStorage is not available!')
      },
    }
  }

  const recordKey = await recordKeyForClassName(className)

  if (initialContent) initializeContent(initialContent)

  return {
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

      const limit = params.limit()
      const results = orderedItems.slice(
        Number(params.continuation() ?? 0),
        limit,
      )
      const continuation =
        limit < orderedItems.length ? limit.toString() : undefined

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
      const oldData = restoreRecord(recordKey)[id]
      const newData = prepareData ? await prepareData(data) : data
      const storedData: RawDataItem = { ...oldData, ...newData, _id: id }
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
  }

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

export async function searchLocalStorageDataConnections(
  search: string,
  classNames: string[],
): Promise<
  Array<{ _id: string; className: string; rawItem: Record<string, unknown> }>
> {
  const lowerCaseSearchTerm = search.toLowerCase()
  const matchesSearchTerm = (value: unknown) =>
    typeof value === 'string' &&
    value.toLowerCase().includes(lowerCaseSearchTerm)

  const results = await Promise.all(
    classNames.map(async (className) => {
      const recordKey = await recordKeyForClassName(className)
      return Object.entries(restoreRecord(recordKey))
        .filter(([_id, rawItem]) =>
          Object.values(rawItem).some(matchesSearchTerm),
        )
        .map(([_id, rawItem]) => ({ _id, className, rawItem }))
    }),
  )

  return results.flat()
}

async function recordKeyForClassName(className: string): Promise<string> {
  await load(() => Obj.onAllSites().all().count()) // TODO: Remove workaround for #12033

  return `localDataClass-${getInstanceId()}-${className}`
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
  items: DataConnectionResultItem[],
  order: Array<[string, 'asc' | 'desc']>,
): DataConnectionResultItem[] {
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
