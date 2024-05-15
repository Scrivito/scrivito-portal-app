import { createContext, useState } from 'react'
import { connect, useData, Obj, Widget, ContentTag } from 'scrivito'

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
    // @ts-expect-error TODO: Remove workaround, once #10835 is resolved
    const configuredLimit: number = dataScope._params?.limit ?? 20
    const [limit, setLimit] = useState(configuredLimit)
    const [initialLimit, setInitialLimit] = useState(configuredLimit)

    if (initialLimit !== configuredLimit) {
      setInitialLimit(configuredLimit)
      setLimit(configuredLimit)
    }

    const hasMore = () => {
      const dataCount = dataScope.count()

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
