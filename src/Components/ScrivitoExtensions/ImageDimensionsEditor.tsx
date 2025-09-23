import {
  canEdit,
  connect,
  isComparisonActive,
  uiContext,
  Widget,
} from 'scrivito'

import './ImageDimensionsEditor/ImageDimensionsEditor.scss'
import { DimensionEditor } from './DimensionEditor'
import { getCurrentPreviewSize } from '../../utils/getCurrentPreviewSize'

type ImageWidget = Widget<{
  height: 'string'
  heightTablet: 'string'
  heightMobile: 'string'
  objectFit: ['enum', { values: ['cover', 'contain'] }]
  objectFitTablet: ['enum', { values: ['cover', 'contain'] }]
  objectFitMobile: ['enum', { values: ['cover', 'contain'] }]
  width: 'string'
  widthTablet: 'string'
  widthMobile: 'string'
}>

export function ImageDimensionsEditor({ widget }: { widget: ImageWidget }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()
  const currentSize = getCurrentPreviewSize()

  const isTablet = currentSize === 'tablet'
  const isMobile = currentSize === 'mobile'

  const getHeightProperty = () => {
    if (isTablet) return 'heightTablet'
    if (isMobile) return 'heightMobile'
    return 'height'
  }

  const getWidthProperty = () => {
    if (isTablet) return 'widthTablet'
    if (isMobile) return 'widthMobile'
    return 'width'
  }

  const getObjectFitProperty = () => {
    if (isTablet) return 'objectFitTablet'
    if (isMobile) return 'objectFitMobile'
    return 'objectFit'
  }

  const heightProperty = getHeightProperty()
  const widthProperty = getWidthProperty()
  const objectFitProperty = getObjectFitProperty()

  const getSizeLabel = () => {
    if (isTablet) return 'Tablet'
    if (isMobile) return 'Mobile'
    return 'Desktop & Laptop'
  }

  const sizeLabel = getSizeLabel()
  const showObjectFit = !!widget.get(heightProperty)

  return (
    <div
      className={`dimensions-editor scrivito_detail_content scrivito_${theme}`}
    >
      <div className="scrivito_detail_label">
        <span>{sizeLabel}</span>
      </div>
      <div className="row">
        <div className="col-auto">
          <div className="scrivito_detail_label">
            <span>Width</span>
          </div>
          <DimensionEditor
            onUpdate={(value) => widget.update({ [widthProperty]: value })}
            readOnly={readOnly}
            units={['px', '%']}
            value={widget.get(widthProperty)}
          />
        </div>
        <div className="col-auto">
          <div className="scrivito_detail_label">
            <span>Height</span>
          </div>
          <DimensionEditor
            onUpdate={(value) => widget.update({ [heightProperty]: value })}
            readOnly={readOnly}
            units={['px']}
            value={widget.get(heightProperty)}
          />
        </div>
      </div>
      {showObjectFit && (
        <ObjectFit
          widget={widget}
          readOnly={readOnly}
          property={objectFitProperty}
          label="Object fit"
        />
      )}
    </div>
  )
}

const ObjectFit = connect(function ObjectFit({
  widget,
  readOnly,
  property,
  label,
}: {
  widget: ImageWidget
  readOnly: boolean
  property: 'objectFit' | 'objectFitTablet' | 'objectFitMobile'
  label: string
}) {
  const objectFit = widget.get(property) ?? 'contain'

  return (
    <>
      <div className="scrivito_detail_label">
        <span>{label}</span>
      </div>
      <div className="item_content">
        <div className="enum_attribute">
          <button
            aria-current={objectFit === 'contain'}
            className={
              objectFit === 'contain' ? 'enum_attribute_active' : undefined
            }
            disabled={readOnly}
            onClick={() => widget.update({ [property]: 'contain' })}
            title="The image is resized to fit within the space, keeping its original proportions, without being cut off."
          >
            <div className="attribute-preview contain"></div>
            <span>Contain</span>
          </button>
          <button
            aria-current={objectFit === 'cover'}
            className={
              objectFit === 'cover' ? 'enum_attribute_active' : undefined
            }
            disabled={readOnly}
            onClick={() => widget.update({ [property]: 'cover' })}
            title="The image is resized to fill the entire space, keeping its proportions, but may be cropped if necessary."
          >
            <div className="attribute-preview cover"></div>
            <span>Cover</span>
          </button>
        </div>
        <div className="scrivito_notice_body">Default: Contain</div>
      </div>
    </>
  )
})
