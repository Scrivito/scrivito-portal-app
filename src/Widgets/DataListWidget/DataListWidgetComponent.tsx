import {
  ContentTag,
  isInPlaceEditingActive,
  provideComponent,
  useDataLocator,
} from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'

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
      {isInPlaceEditingActive() && (
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            <b>Editor note:</b> The following is only visible if
            &quot;data&quot; is empty.
          </div>
        </div>
      )}
      {(dataScope.isEmpty() || isInPlaceEditingActive()) && (
        <ContentTag content={widget} attribute="nothingFound" />
      )}
    </>
  )
})
