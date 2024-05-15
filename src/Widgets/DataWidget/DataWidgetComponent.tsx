import { ContentTag, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { Loading } from '../../Components/Loading'

provideComponent(
  DataWidget,
  ({ widget }) => {
    const dataScope = useData()

    dataScope.take() // TODO: Remove workaround, once `1.42.0` is available
    const dataError = dataScope.getError()
    if (dataError) {
      return (
        <EditorNote>
          An communication error occurred - {dataError.message}
        </EditorNote>
      )
    }

    if (dataScope.isEmpty()) {
      return <EditorNote>Data is empty.</EditorNote>
    }

    return (
      <>
        {dataScope.take().map((dataItem) => (
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
