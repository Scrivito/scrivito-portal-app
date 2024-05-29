import { createContext, useState } from 'react'
import {
  connect,
  useData,
  Obj,
  Widget,
  ContentTag,
  ClientError,
  DataConnectionError,
} from 'scrivito'

export const DataBatchContext = createContext<{
  hasMore: () => boolean
  loadMore: () => void
}>({
  hasMore: () => true,
  loadMore: () => {
    throw new Error('loadMore is not provided!')
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

    if (initialLimit !== configuredLimit) {
      setInitialLimit(configuredLimit)
      setLimit(configuredLimit)
    }

    const hasMore = () => {
      let dataCount: number | null = null
      // TODO: Remove workaround, once #10900 is resolved
      try {
        dataCount = dataScope.count()
      } catch (error) {
        if (error instanceof ClientError) return false
        if (error instanceof DataConnectionError) return false

        throw error
      }

      const count =
        dataCount === null
          ? dataScope.transform({ limit }).take().length + 1
          : dataCount

      return count > limit
    }

    const loadMore = () => setLimit((prevLimit) => prevLimit + configuredLimit)

    return (
      <DataBatchContext.Provider value={{ hasMore, loadMore }}>
        <ContentTag
          content={content}
          attribute={attribute}
          dataContext={dataScope.transform({ limit })}
        />
      </DataBatchContext.Provider>
    )
  },
)
