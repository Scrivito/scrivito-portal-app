import {
  canEdit,
  connect,
  isComparisonActive,
  uiContext,
  Widget,
} from 'scrivito'

import './ImageDimensionsEditor/ImageDimensionsEditor.scss'
import { DimensionEditor } from './DimensionEditor'

type ImageWidget = Widget<{
  height: 'string'
  objectFit: ['enum', { values: ['cover', 'contain'] }]
  width: 'string'
}>

export function ImageDimensionsEditor({ widget }: { widget: ImageWidget }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()
  const showObjectFit = !!widget.get('height')

  return (
    <div
      className={`dimensions-editor scrivito_detail_content scrivito_${theme}`}
    >
      <div className="row">
        <div className="col-auto">
          <DimensionEditor
            label="Width"
            onUpdate={(value) => widget.update({ width: value })}
            readOnly={readOnly}
            units={['px', '%']}
            value={widget.get('width')}
          />
        </div>
        <div className="col-auto">
          <DimensionEditor
            label="Height"
            onUpdate={(value) => widget.update({ height: value })}
            readOnly={readOnly}
            units={['px']}
            value={widget.get('height')}
          />
        </div>
      </div>
      {showObjectFit && <ObjectFit widget={widget} readOnly={readOnly} />}
    </div>
  )
}

const ObjectFit = connect(function ObjectFit({
  widget,
  readOnly,
}: {
  widget: ImageWidget
  readOnly: boolean
}) {
  const objectFit = widget.get('objectFit') ?? 'contain'

  return (
    <>
      <div className="scrivito_detail_label">
        <span>Object fit</span>
      </div>
      <div className="item_content">
        <div className="enum_attribute">
          <button
            aria-current={objectFit === 'contain'}
            className={
              objectFit === 'contain' ? 'enum_attribute_active' : undefined
            }
            disabled={readOnly}
            onClick={() => widget.update({ objectFit: 'contain' })}
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
            onClick={() => widget.update({ objectFit: 'cover' })}
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
