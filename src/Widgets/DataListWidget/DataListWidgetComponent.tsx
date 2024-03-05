import {
  ContentTag,
  DataScope,
  provideComponent,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataListWidget, ({ widget }) => {
  const dataScope: DataScope | undefined = useDataScope()

  if (!dataScope) {
    return <EditorNote>No data found. Please select a data source.</EditorNote>
  }

  if (dataScope.isEmpty()) {
    return <EditorNote>The data list is empty.</EditorNote>
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
