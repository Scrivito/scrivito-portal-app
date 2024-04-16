import { ContentTag, provideComponent, useData } from 'scrivito'
import { DataWidget } from './DataWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataWidget, ({ widget }) => {
  const dataScope = useData()

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
})
