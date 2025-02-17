import { createContext, useEffect, useState } from 'react'
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
    const [search, setSearch] = useState('')

    useEffect(() => {
      setLimit(configuredLimit)
    }, [configuredLimit, search])

    const dataKeys = [
      'DataBatchContextProvider',
      content.id(),
      attribute,
      id,
      tag,
      search,
    ]

    const batchLoaderKey = [...dataKeys, limit].join('-')

    const transform = { limit, search }

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
          key={dataKeys.join('-')}
          content={content}
          attribute={attribute}
          dataContext={dataScope.transform(transform)}
        />
      </DataBatchContext.Provider>
    )
  },
)
