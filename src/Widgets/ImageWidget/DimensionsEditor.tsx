import { canEdit, connect, isComparisonActive, uiContext } from 'scrivito'
import { ImageWidgetInstance } from './ImageWidgetClass'
import { useEffect, useState } from 'react'

import './DimensionsEditor.scss'

export function DimensionsEditor({ widget }: { widget: ImageWidgetInstance }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()
  const muteObjectFit = !widget.get('height')

  return (
    <div
      className={`dimensions-editor scrivito_detail_content scrivito_${theme}`}
    >
      <div className="row">
        <div className="col-auto">
          <DimensionEditor
            widget={widget}
            attribute="width"
            label="Width"
            readOnly={readOnly}
          />
        </div>
        <div className="col-auto">
          <DimensionEditor
            widget={widget}
            attribute="height"
            label="Height"
            pxOnly
            readOnly={readOnly}
          />
        </div>
      </div>
      <ObjectFit widget={widget} readOnly={readOnly || muteObjectFit} />
    </div>
  )
}

const DimensionEditor = connect(function DimensionEditor({
  widget,
  attribute,
  label,
  pxOnly,
  readOnly,
}: {
  widget: ImageWidgetInstance
  attribute: 'height' | 'width'
  label: string
  pxOnly?: true
  readOnly: boolean
}) {
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
  readOnly,
}: {
  widget: ImageWidgetInstance
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
