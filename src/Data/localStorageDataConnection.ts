import { DataConnection, DataConnectionResultItem } from 'scrivito'
import { pseudoRandom32CharHex } from '../utils/pseudoRandom32CharHex'
import { ensureString } from '../utils/ensureString'
import { scrivitoTenantId } from '../config/scrivitoTenants'
import { filterDataItems } from './filterDataItems'
import { orderDataItems } from './orderDataItems'

interface RawDataItem {
  _id: string
  [key: string]: unknown
}

export function localStorageDataConnection(
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
): DataConnection {
  const recordKey = recordKeyForClassName(className)

  if (initialContent) initializeContent(initialContent)

  return {
    async index(params) {
      const record = restoreRecord(recordKey)
      const rawItems = Object.values(record)
      const items = postProcessData
        ? await Promise.all(rawItems.map((item) => postProcessData(item)))
        : rawItems

      const filteredItems = filterDataItems(params.filters(), items)

      const search = params.search().toLowerCase()
      const matchingItems = filteredItems.filter((item) =>
        Object.values(item)
          .map(ensureString)
          .some((value) => value.toLowerCase().includes(search)),
      )

      const orderedItems = orderDataItems(params.order(), matchingItems)

      const offset =
        params.continuation() === undefined ? 0 : Number(params.continuation())
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

export function searchLocalStorageDataConnections(
  search: string,
  classNames: string[],
): Array<{ _id: string; className: string; rawItem: Record<string, unknown> }> {
  const lowerCaseSearchTerm = search.toLowerCase()
  const matchesSearchTerm = (value: unknown) =>
    typeof value === 'string' &&
    value.toLowerCase().includes(lowerCaseSearchTerm)

  return classNames.flatMap((className) =>
    Object.entries(restoreRecord(recordKeyForClassName(className)))
      .filter(([_id, rawItem]) =>
        Object.values(rawItem).some(matchesSearchTerm),
      )
      .map(([_id, rawItem]) => ({ _id, className, rawItem })),
  )
}

function recordKeyForClassName(className: string): string {
  return `localDataClass-${scrivitoTenantId()}-${className}`
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
