import {
  provideComponent,
  WidgetTag,
  LinkTag,
  ContentTag,
  isInPlaceEditingActive,
} from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'

provideComponent(DownloadCardWidget, ({ widget }) => {
  return (
    <WidgetTag className="card mb-4 bg-white max-width-350">
      <LinkTag to={widget.get('link')} draggable={!isInPlaceEditingActive()}>
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
              <ContentTag
                content={widget}
                attribute="title"
                className="text-bold h6"
              />
              <ContentTag
                content={widget}
                attribute="subtitle"
                className="text-bold opacity-60 text-small text-uppercase"
              />
              <ContentTag
                content={widget}
                attribute="details"
                className="text-bold opacity-40 text-extra-small text-uppercase"
              />
            </div>
          </div>
        </div>
      </LinkTag>
    </WidgetTag>
  )
})
