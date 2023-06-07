import * as Scrivito from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'

Scrivito.provideComponent(DataListWidget, ({ widget }) => {
  const objSearch = Scrivito.objsFromDataLocator(widget.get('data'))

  return (
    <>
      {objSearch.take().map((order) => (
        <Scrivito.ContentTag
          content={widget}
          attribute="content"
          dataContext={order}
          key={order.id()}
        />
      ))}
      {Scrivito.isInPlaceEditingActive() && (
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            <b>Editor note:</b> The following is only visible if "data" does not
            contains data.
          </div>
        </div>
      )}
      {(objSearch.count() === 0 || Scrivito.isInPlaceEditingActive()) && (
        <Scrivito.ContentTag content={widget} attribute="nothingFound" />
      )}
    </>
  )
})
