import { useState, useEffect } from 'react'
import { connect, uiContext } from 'scrivito'

import './DimensionEditor.scss'

export const DimensionEditor = connect(function DimensionEditor({
  label,
  onUpdate,
  readOnly,
  units,
  value,
}: {
  label: string
  onUpdate: (value: string) => void
  readOnly: boolean
  units: ('px' | '%' | 'rem')[]
  value: string
}) {
  const { theme } = uiContext() || { theme: null }

  const unitRegex = new RegExp(`(${units.join('|')})$`)
  const valueUnit = value.match(unitRegex)?.[0]
  const validUnit =
    valueUnit && isValidUnit(valueUnit, units) ? valueUnit : units[0]
  if (!validUnit) {
    throw new Error(`Invalid unit in attribute value: ${value}`)
  }
  const numericValue =
    valueUnit && isValidUnit(valueUnit, units) ? Number.parseFloat(value) : ''

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
            value={numericValue}
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
      if (numericValue !== '') onUpdate(`${numericValue}${newUnit}`)
    }
  }
})

const isValidUnit = (
  unit: string,
  units: ('px' | '%' | 'rem')[],
): unit is 'px' | '%' | 'rem' => {
  return units.includes(unit as 'px' | '%' | 'rem')
}
