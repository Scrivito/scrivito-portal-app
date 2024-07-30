import { ContentTag, DataItem, provideComponent, useData } from 'scrivito'
import { DataColumnListWidget } from './DataColumnListWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { Loading } from '../../Components/Loading'

provideComponent(
  DataColumnListWidget,
  ({ widget }) => {
    const dataScope = useData()
    let dataError: unknown

    try {
      if (dataScope.isEmpty()) {
        return <EditorNote>The data column list is empty.</EditorNote>
      }
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

    const columnsCount = widget.get('columnsCount') || '2'

    return (
      <div className={`row row-cols-1 row-cols-md-${columnsCount}`}>
        {dataItems.map((dataItem) => (
          <ContentTag
            content={widget}
            attribute="content"
            className="col"
            dataContext={dataItem}
            key={dataItem.id()}
          />
        ))}
      </div>
    )
  },
  { loading: Loading },
)
