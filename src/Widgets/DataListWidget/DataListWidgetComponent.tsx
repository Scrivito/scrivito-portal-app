import {
  ContentTag,
  isInPlaceEditingActive,
  provideComponent,
  useDataLocator,
} from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataListWidget, ({ widget }) => {
  const data = widget.get('data')
  const dataScope = useDataLocator(data)

  const nrOfColumns = widget.get('nrOfColumns') || '1'

  return (
    <>
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
      <EditorNote>
        The following is only visible if &quot;data&quot; is empty.
      </EditorNote>
      {(dataScope.isEmpty() || isInPlaceEditingActive()) && (
        <ContentTag content={widget} attribute="nothingFound" />
      )}
    </>
  )
})
