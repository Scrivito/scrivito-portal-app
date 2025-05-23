import { truncate } from 'lodash-es'
import { DataConnectionIndexParams } from 'scrivito'
import { searchLocalStorageDataConnections } from '../localStorageDataConnection'
import { ensureString } from '../../utils/ensureString'
import { getDataItemUrl } from './getDataItemUrl'

const INCLUDED_CLASS_NAMES = [
  'Contract',
  'Document',
  'Event',
  'Order',
  'Quote',
  'ServiceObject',
  'Ticket',
]

const NON_SNIPPET_KEYS = ['_id']

export async function dataSearchResultIndexFallback(
  params: DataConnectionIndexParams,
) {
  const search = params.search()
  if (!search) return { results: [], count: 0 }

  const rawResults = await searchLocalStorageDataConnections(
    search,
    INCLUDED_CLASS_NAMES,
  )

  const results = await Promise.all(
    rawResults.map(async ({ _id, className, rawItem }) => ({
      _id,
      entity: className,
      snippet: calculateSnippet(rawItem),
      title: ensureString(rawItem.title) || ensureString(rawItem.keyword),
      url: await getDataItemUrl(className, _id),
    })),
  )

  return { results, count: results.length }
}

function calculateSnippet(rawItem: Record<string, unknown>): string {
  const allValues = Object.entries(rawItem)
    .filter(
      ([key, value]) =>
        typeof value === 'string' && !!value && !NON_SNIPPET_KEYS.includes(key),
    )
    .map(([_key, value]) => value)

  return truncate(allValues.join(' | '), { length: 297, separator: /,? +/ })
}
