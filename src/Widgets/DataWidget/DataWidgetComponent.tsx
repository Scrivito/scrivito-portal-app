import { ContentTag, DataItem, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { Loading } from '../../Components/Loading'

provideComponent(
  DataWidget,
  ({ widget }) => {
    const dataScope = useData()
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

    if (dataError) {
      return (
        <EditorNote>
          Error fetching data:{' '}
          {dataError instanceof Error
            ? dataError.message
            : JSON.stringify(dataError)}
        </EditorNote>
      )
    }

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
      </>
    )
  },
  { loading: Loading },
)
