import {
  canEdit,
  connect,
  isComparisonActive,
  uiContext,
  Widget,
} from 'scrivito'
import { useEffect, useState } from 'react'

import './DimensionsEditor/DimensionsEditor.scss'

type ImageWidget = Widget<{
  height: 'string'
  objectFit: ['enum', { values: ['cover', 'contain'] }]
  width: 'string'
}>

export function DimensionsEditor({ widget }: { widget: ImageWidget }) {
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
            attributeValue={widget.get('width')}
            label="Width"
            onUpdate={(value) => widget.update({ width: value })}
            units={['px', '%']}
            readOnly={readOnly}
          />
        </div>
        <div className="col-auto">
          <DimensionEditor
            attributeValue={widget.get('height')}
            label="Height"
            onUpdate={(value) => widget.update({ height: value })}
            units={['px']}
            readOnly={readOnly}
          />
        </div>
      </div>
      {showObjectFit && <ObjectFit widget={widget} readOnly={readOnly} />}
    </div>
  )
}

const DimensionEditor = connect(function DimensionEditor({
  attributeValue,
  label,
  onUpdate,
  units,
  readOnly,
}: {
  attributeValue: string
  label: string
  onUpdate: (value: string) => void
  units: ('px' | '%' | 'rem')[]
  readOnly: boolean
}) {
  const { theme } = uiContext() || { theme: null }

  const unitRegex = new RegExp(`(${units.join('|')})$`)
  const valueUnit = attributeValue.match(unitRegex)?.[0]
  const validUnit =
    valueUnit && isValidUnit(valueUnit, units) ? valueUnit : units[0]
  if (!validUnit) {
    throw new Error(`Invalid unit in attribute value: ${attributeValue}`)
  }
  const value =
    valueUnit && isValidUnit(valueUnit, units)
      ? Number.parseFloat(attributeValue)
      : ''

  const [unit, setUnit] = useState(validUnit)

  useEffect(() => {
    setUnit(validUnit)
  }, [validUnit])

  return (
    <div className={`dimension-editor${theme ? ` scrivito_${theme}` : ''}`}>
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
          {units.length === 1 ? (
            <span className="input_group_text">{units[0]}</span>
          ) : (
            <select
              disabled={readOnly}
              onChange={({ target: { value } }) => updateUnit(value)}
              value={unit}
            >
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  )

  function updateValue(stringValue: string) {
    const newValue = Number.parseFloat(stringValue)
    onUpdate(isNaN(newValue) ? '' : `${newValue}${unit}`)
  }

  function updateUnit(newUnit: string) {
    if (isValidUnit(newUnit, units)) {
      setUnit(newUnit)
      if (value !== '') onUpdate(`${value}${newUnit}`)
    }
  }
})

const isValidUnit = (
  unit: string,
  units: ('px' | '%' | 'rem')[],
): unit is 'px' | '%' | 'rem' => {
  return units.includes(unit as 'px' | '%' | 'rem')
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
