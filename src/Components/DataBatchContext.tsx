import { createContext, useCallback, useState } from 'react'
import { connect, useData, Obj, Widget, ContentTag } from 'scrivito'

export const DataBatchContext = createContext<{
  batchLoaderKey: string
  hasMore: () => boolean
  loadMore: () => void
  setSearch?: (query: string) => void
}>({
  batchLoaderKey: '',
  hasMore: () => true,
  loadMore: () => {
    throw new Error('loadMore is not provided!')
  },
})

export const DataBatchContextProvider = connect(
  function DataBatchContextProvider({
    attribute,
    content,
    id,
    tag,
  }: {
    attribute: string
    content: Obj | Widget
    id?: string
    tag?: string
  }) {
    const dataScope = useData()
    const configuredLimit = dataScope.limit() ?? 20
    const [limit, setLimit] = useState(configuredLimit)
    const [initialLimit, setInitialLimit] = useState(configuredLimit)
    const [query, setQuery] = useState('')

    const setSearch = useCallback(
      (query: string) => {
        setQuery(query)
        setLimit(configuredLimit)
      },
      [configuredLimit],
    )

    if (initialLimit !== configuredLimit) {
      setInitialLimit(configuredLimit)
      setLimit(configuredLimit)
    }

    const baseKeys = [
      'DataBatchContextProvider',
      content.id(),
      attribute,
      id,
      tag,
      query,
      // limit is intentionally not included in the key. Otherwise the component would show a loading spinner on every "load more" click.
    ]

    const batchLoaderKey = [...baseKeys, limit].join('-')

    const transform = { limit, search: query }

    const hasMore = () => {
      try {
        return (
          dataScope.transform({ ...transform, limit: limit + 1 }).take()
            .length > limit
        )
      } catch {
        return false
      }
    }

    const loadMore = () => setLimit((prevLimit) => prevLimit + configuredLimit)

    return (
      <DataBatchContext.Provider
        value={{ batchLoaderKey, hasMore, loadMore, setSearch }}
      >
        <ContentTag
          tag={tag}
          id={id}
          key={baseKeys.join('-')}
          content={content}
          attribute={attribute}
          dataContext={dataScope.transform(transform)}
        />
      </DataBatchContext.Provider>
    )
  },
)
