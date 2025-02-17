import { canEdit, connect, uiContext } from 'scrivito'
import { ImageWidgetInstance } from './ImageWidgetClass'
import { upperFirst } from 'lodash-es'
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
          <DimensionEditor widget={widget} attribute="width" />
        </div>
        <div className="col-auto">
          <DimensionEditor widget={widget} attribute="height" />
        </div>
      </div>
    </div>
  )
}

const DimensionEditor = connect(function DimensionEditor({
  widget,
  attribute,
}: {
  widget: ImageWidgetInstance
  attribute: 'height' | 'width'
}) {
  const readOnly = !canEdit(widget.obj())

  const [unit, setUnit] = useState('%')
  const attributeValue = widget.get(attribute)
  const valueUnit = attributeValue.match(/%$|px$/)?.toString()
  const value = valueUnit ? Number.parseFloat(attributeValue) : ''

  useEffect(() => {
    if (valueUnit) setUnit(valueUnit)
  }, [valueUnit])

  return (
    <>
      <div className="scrivito_detail_label">
        <span>{upperFirst(attribute)}</span>
      </div>
      <div className="item_content">
        <div className="input_group" aria-readonly={readOnly}>
          <input
            onChange={({ target: { value } }) => updateValue(value)}
            placeholder={readOnly ? undefined : '100'}
            readOnly={readOnly}
            type="number"
            value={value}
          />
          <select
            disabled={readOnly}
            onChange={({ target: { value } }) => updateUnit(value)}
            value={unit}
          >
            <option>px</option>
            <option>%</option>
          </select>
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
