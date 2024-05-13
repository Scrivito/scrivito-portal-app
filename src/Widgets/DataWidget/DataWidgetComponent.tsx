import { ContentTag, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { useContext } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { Loading } from '../../Components/Loading'

provideComponent(
  DataWidget,
  ({ widget }) => {
    const dataScope = useData()
    const { limit } = useContext(DataBatchContext)

    if (dataScope.isEmpty()) {
      return <EditorNote>Data is empty.</EditorNote>
    }

    return (
      <>
        {dataScope
          .transform({ limit })
          .take()
          .map((dataItem) => (
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
