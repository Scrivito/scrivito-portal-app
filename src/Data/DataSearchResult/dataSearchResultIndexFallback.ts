import { truncate } from 'lodash-es'
import { DataConnectionIndexParams } from 'scrivito'
import { searchLocalStorageDataConnections } from '../localStorageDataConnection'
import { ensureString } from '../../utils/ensureString'
import { loadDataItemUrl } from './loadDataItemUrl'

const NON_SNIPPET_KEYS = ['_id']

export async function dataSearchResultIndexFallback(
  params: DataConnectionIndexParams,
  classNames: string[],
) {
  const rawResults = searchLocalStorageDataConnections(
    params.search(),
    classNames,
  )

  const allResults = await Promise.all(
    rawResults.map(async ({ _id, className, rawItem }) => ({
      _id,
      entity: className,
      snippet: calculateSnippet(rawItem),
      title: ensureString(rawItem.title) || ensureString(rawItem.keyword),
      url: await loadDataItemUrl(className, _id),
    })),
  )

  const limit = params.limit()
  const results = allResults.slice(Number(params.continuation() ?? 0), limit)
  const continuation = limit < allResults.length ? limit.toString() : undefined

  return { results, count: allResults.length, continuation }
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
