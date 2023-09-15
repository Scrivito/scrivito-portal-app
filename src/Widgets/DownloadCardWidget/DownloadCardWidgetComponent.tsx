import {
  provideComponent,
  WidgetTag,
  ContentTag,
  isInPlaceEditingActive,
  urlFor,
  useDataItem,
} from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import type { DataItem } from '../../utils/additionalTypes'

provideComponent(DownloadCardWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const href = calculateHref(dataItem)

  return (
    <WidgetTag className="card mb-4 bg-white max-width-350">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        draggable={!isInPlaceEditingActive()}
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
              <ContentTag
                content={widget}
                attribute="title"
                className="text-bold h6"
              />
              <ContentTag
                content={widget}
                attribute="subTitle"
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
      </a>
    </WidgetTag>
  )

  function calculateHref(dataItem?: DataItem): string | undefined {
    if (widget.get('linkFromDataItem')) {
      if (!dataItem) return

      const attributeName = widget.get('dataItemAttributeName')
      if (!attributeName) return

      const attributeValue = dataItem.get(attributeName)
      if (typeof attributeValue !== 'string') return

      return attributeValue
    }

    const link = widget.get('link')
    if (!link) return

    return urlFor(link)
  }
})
