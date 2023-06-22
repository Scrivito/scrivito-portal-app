import * as Scrivito from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'

Scrivito.provideComponent(DownloadCardWidget, ({ widget }) => {
  return (
    <Scrivito.WidgetTag className="card mb-4 bg-white">
      <Scrivito.LinkTag
        to={Scrivito.isInPlaceEditingActive() ? null : widget.get('link')}
      >
        <div className="card-body p-2">
          <div className="row">
            <div className="col-3">
              <div className="d-flex h-100">
                <i
                  className={`bi ${
                    widget.get('icon') || 'bi-filetype-pdf'
                  } bi-2x m-auto`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="col-9">
              <Scrivito.ContentTag
                content={widget}
                attribute="title"
                className="text-bold h6"
              />
              <Scrivito.ContentTag
                content={widget}
                attribute="subTitle"
                className="text-bold opacity-60 text-small text-uppercase"
              />
              <Scrivito.ContentTag
                content={widget}
                attribute="details"
                className="text-bold opacity-40 text-extra-small text-uppercase"
              />
            </div>
          </div>
        </div>
      </Scrivito.LinkTag>
    </Scrivito.WidgetTag>
  )
})
