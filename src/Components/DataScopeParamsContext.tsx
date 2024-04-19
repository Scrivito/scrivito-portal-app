import { createContext, useState } from 'react'
import { connect, useData } from 'scrivito'

export const DataScopeParamsContext = createContext<{
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

export const DataScopeParamsContextProvider = connect(
  function DataScopeParamsContextProvider({
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
      <DataScopeParamsContext.Provider value={{ limit, hasMore, loadMore }}>
        {children}
      </DataScopeParamsContext.Provider>
    )
  },
)
