import { ContentTag, DataItem, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { Loading } from '../../Components/Loading'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { useContext } from 'react'
import { DataBatchLoadingIndicator } from './DataBatchLoadingIndicator'

provideComponent(
  DataWidget,
  ({ widget }) => {
    const dataScope = useData()
    const { combinedLoaderKey } = useContext(DataBatchContext)
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
        <DataBatchLoadingIndicator key={combinedLoaderKey} />
      </>
    )
  },
  { loading: Loading },
)
