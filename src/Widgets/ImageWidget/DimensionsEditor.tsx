import { canEdit, connect, isComparisonActive, uiContext } from 'scrivito'
import { ImageWidgetInstance } from './ImageWidgetClass'
import { useEffect, useState } from 'react'

import './DimensionsEditor.scss'

export function DimensionsEditor({ widget }: { widget: ImageWidgetInstance }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div
      className={`dimensions-editor scrivito_detail_content scrivito_${theme}`}
    >
      <div className="row">
        <div className="col-auto">
          <DimensionEditor widget={widget} attribute="width" label="Width" />
        </div>
        <div className="col-auto">
          <DimensionEditor
            widget={widget}
            attribute="height"
            label="Height"
            pxOnly
          />
        </div>
      </div>
      <ObjectFit widget={widget} />
    </div>
  )
}

const DimensionEditor = connect(function DimensionEditor({
  widget,
  attribute,
  label,
  pxOnly,
}: {
  widget: ImageWidgetInstance
  attribute: 'height' | 'width'
  label: string
  pxOnly?: true
}) {
  const readOnly = !canEdit(widget.obj()) || isComparisonActive()

  const [unit, setUnit] = useState(pxOnly ? 'px' : '%')
  const attributeValue = widget.get(attribute)
  const valueUnit = attributeValue.match(pxOnly ? /px$/ : /%$|px$/)?.toString()
  const value = valueUnit ? Number.parseFloat(attributeValue) : ''

  useEffect(() => {
    if (valueUnit) setUnit(valueUnit)
  }, [valueUnit])

  return (
    <>
      <div className="scrivito_detail_label">
        <span>{label}</span>
      </div>
      <div className="item_content">
        <div className="input_group" aria-readonly={readOnly}>
          <input
            max={unit === '%' ? 100 : undefined}
            min={0}
            onChange={({ target: { value } }) => updateValue(value)}
            placeholder={readOnly ? undefined : '100'}
            readOnly={readOnly}
            step="any"
            type="number"
            value={value}
          />
          {pxOnly ? (
            <span className="input_group_text">px</span>
          ) : (
            <select
              disabled={readOnly}
              onChange={({ target: { value } }) => updateUnit(value)}
              value={unit}
            >
              <option>px</option>
              <option>%</option>
            </select>
          )}
        </div>
      </div>
    </>
  )

  function updateValue(stringValue: string) {
    const newValue = Number.parseFloat(stringValue)
    widget.update({
      [attribute]: isNaN(newValue) ? null : `${newValue}${unit}`,
    })
  }

  function updateUnit(newUnit: string) {
    setUnit(newUnit)
    if (value !== '') widget.update({ [attribute]: `${value}${newUnit}` })
  }
})

const ObjectFit = connect(function ObjectFit({
  widget,
}: {
  widget: ImageWidgetInstance
}) {
  const readOnly = !canEdit(widget.obj()) || isComparisonActive()
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
            title="The image is scaled to maintain its aspect ratio while fitting within the element’s content box."
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
            title="The image is sized to maintain its aspect ratio while filling the element’s entire content box. The image will be clipped to fit."
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
