import { createContext, useState } from 'react'
import { connect, useData, Obj, Widget, ContentTag } from 'scrivito'

export const DataBatchContext = createContext<{
  hasMore: () => boolean
  loadMore: () => void
  setSearch?: (query: string) => void
}>({
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
    const [search, setSearch] = useState('')

    if (initialLimit !== configuredLimit) {
      setInitialLimit(configuredLimit)
      setLimit(configuredLimit)
    }

    const key = [
      'DataBatchContextProvider',
      content.id(),
      attribute,
      id,
      tag,
      search,
    ].join('-')

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
      <DataBatchContext.Provider value={{ hasMore, loadMore, setSearch }}>
        <ContentTag
          tag={tag}
          id={id}
          key={key}
          content={content}
          attribute={attribute}
          dataContext={dataScope.transform(transform)}
        />
      </DataBatchContext.Provider>
    )
  },
)
