import { ContentTag, DataItem, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { Loading } from '../../Components/Loading'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { useContext } from 'react'
import { CombinedLoader } from './CombinedLoader'

provideComponent(
  DataWidget,
  ({ widget }) => {
    const dataScope = useData()
    const { combinedLoaderKey, hasMore } = useContext(DataBatchContext)
    let dataError: unknown

    try {
      if (dataScope.isEmpty()) return <EditorNote>Data is empty.</EditorNote>
    } catch (error) {
      dataError = error
    }

    let dataItems: DataItem[]
    try {
      dataItems = dataScope.take()
    } catch (error) {
      dataItems = []
      dataError = error
    }

    if (dataError) return <DataErrorEditorNote error={dataError} />

    return (
      <>
        {dataItems.map((dataItem) => (
          <ContentTag
            content={widget}
            attribute="content"
            className="col"
            dataContext={dataItem}
            key={dataItem.id()}
          />
        ))}
        <CombinedLoader
          dataScope={dataScope}
          hasMore={hasMore}
          key={combinedLoaderKey}
        />
      </>
    )
  },
  { loading: Loading },
)
