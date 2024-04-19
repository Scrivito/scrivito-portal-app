import { createContext, useState } from 'react'
import { connect, useData } from 'scrivito'

export const DataBatchContext = createContext<{
  limit: number
  hasMore: () => boolean
  loadMore: () => void
}>({
  limit: 20,
  hasMore: () => true,
  loadMore: () => {
    throw new Error('loadMore is not provided!')
  },
})

export const DataBatchContextProvider = connect(
  function DataBatchContextProvider({
    children,
  }: {
    children: React.ReactNode
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
      <DataBatchContext.Provider value={{ limit, hasMore, loadMore }}>
        {children}
      </DataBatchContext.Provider>
    )
  },
)
