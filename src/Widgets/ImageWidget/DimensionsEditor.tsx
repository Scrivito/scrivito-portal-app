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
  const valueUnit = pxOnly ? 'px' : attributeValue.match(/%$|px$/)?.toString()
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
