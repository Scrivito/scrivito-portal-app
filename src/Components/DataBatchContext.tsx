import { createContext, useState } from 'react'
import { connect, useData, Obj, Widget, ContentTag } from 'scrivito'

export const DataBatchContext = createContext<{
  hasMore: () => boolean
  loadMore: () => void
  setSearch: (query: string | undefined) => void
}>({
  hasMore: () => true,
  loadMore: () => {
    throw new Error('loadMore is not provided!')
  },
  setSearch: () => {
    throw new Error('setSearch is not provided!')
  },
})

export const DataBatchContextProvider = connect(
  function DataBatchContextProvider({
    content,
    attribute,
  }: {
    content: Obj | Widget
    attribute: string
  }) {
    const dataScope = useData()
    const configuredLimit = dataScope.limit() ?? 20
    const [limit, setLimit] = useState(configuredLimit)
    const [initialLimit, setInitialLimit] = useState(configuredLimit)
    const [search, setSearch] = useState<string | undefined>()

    if (initialLimit !== configuredLimit) {
      setInitialLimit(configuredLimit)
      setLimit(configuredLimit)
    }

    const transform = { limit, search }

    const hasMore = () =>
      dataScope.transform({ ...transform, limit: limit + 1 }).take().length >
      limit

    const loadMore = () => setLimit((prevLimit) => prevLimit + configuredLimit)

    return (
      <DataBatchContext.Provider value={{ hasMore, loadMore, setSearch }}>
        <ContentTag
          content={content}
          attribute={attribute}
          dataContext={dataScope.transform(transform)}
        />
      </DataBatchContext.Provider>
    )
  },
)
