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
      {widget.get('showFooter') ? (
        <>
          {isInPlaceEditingActive() && (
            <div className="alert alert-warning d-flex m-auto">
              <i
                className="bi bi-exclamation-circle bi-2x"
                aria-hidden="true"
              ></i>
              <div className="my-auto mx-2">
                <b>Editor note:</b> The following is the data list footer and is
                always visible - regardless of the number of items in
                &quot;data&quot;.
              </div>
            </div>
          )}
          <ContentTag content={widget} attribute="footer" />
        </>
      ) : null}
    </>
  )
})
