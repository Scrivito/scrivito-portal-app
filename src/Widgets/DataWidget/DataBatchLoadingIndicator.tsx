import { connect, useData } from 'scrivito'
import { Loading } from '../../Components/Loading'
import { useContext } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'

export const DataBatchLoadingIndicator = connect(
  function DataBatchLoadingIndicator() {
    const dataScope = useData()
    const { hasMore } = useContext(DataBatchContext)

    // subscribe to dataScope.take() and hasMore() loading
    dataScope.take()
    hasMore()

    return null
  },
  { loading: Loading },
)
