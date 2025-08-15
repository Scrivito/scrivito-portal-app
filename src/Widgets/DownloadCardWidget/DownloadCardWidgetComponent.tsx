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
    <WidgetTag>
      <ContentTag
        content={widget}
        attribute="label"
        className="text-bold text-extra-small text-uppercase"
      />
      <div className="card mb-4 bg-white">
        <LinkTag to={widget.get('link')} draggable={!isInPlaceEditingActive()}>
          <div className="card-body p-2">
            <div className="d-flex">
              <div className="px-2">
                <div className="d-flex h-100">
                  <i
                    className={`bi ${
                      widget.get('icon') || 'bi-filetype-pdf'
                    } bi-4x m-auto`}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div className="flex-grow-1">
                <ContentTag content={widget} attribute="title" className="h6" />
                <ContentTag
                  content={widget}
                  attribute="subtitle"
                  className="text-bold text-small text-uppercase"
                />
                <ContentTag
                  content={widget}
                  attribute="details"
                  className="text-bold text-extra-small text-uppercase"
                />
              </div>
            </div>
          </div>
        </LinkTag>
      </div>
    </WidgetTag>
  )
})
