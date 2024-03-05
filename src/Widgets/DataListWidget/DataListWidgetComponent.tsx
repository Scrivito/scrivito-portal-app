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
    return <EditorNote>Data list is empty.</EditorNote>
  }

  const nrOfColumns = widget.get('nrOfColumns') || '1'

  return (
    <div className={`row row-cols-1 row-cols-md-${nrOfColumns}`}>
      {dataScope.take().map((dataItem) => (
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
})
