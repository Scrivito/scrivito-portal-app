import { connect, DataScope } from 'scrivito'
import { Loading } from '../../Components/Loading'

export const DataBatchLoadingIndicator = connect(
  function DataBatchLoadingIndicator({
    dataScope,
    hasMore,
  }: {
    dataScope: DataScope
    hasMore: () => boolean
  }) {
    // use side-effects to trigger loading
    dataScope.take()
    hasMore()

    return null
  },
  { loading: Loading },
)
