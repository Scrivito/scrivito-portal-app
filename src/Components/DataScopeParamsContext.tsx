import { createContext, useState } from 'react'
import { connect, useData } from 'scrivito'

export const DataScopeParamsContext = createContext<{
  limit: number
  setLimit: (newLimit: number) => void
}>({
  limit: 10,
  setLimit: (_newLimit) => {
    throw new Error('setLimit is not provided!')
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

    return (
      <DataScopeParamsContext.Provider value={{ limit, setLimit }}>
        {children}
      </DataScopeParamsContext.Provider>
    )
  },
)
