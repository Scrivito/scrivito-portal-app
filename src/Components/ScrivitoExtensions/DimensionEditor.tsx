import { useState, useEffect } from 'react'

import './DimensionEditor.scss'

type Unit = 'px' | '%' | 'rem'

export const DimensionEditor = function DimensionEditor({
  onUpdate,
  placeholder,
  readOnly,
  units,
  value,
}: {
  onUpdate: (value: string) => void
  placeholder?: string
  readOnly: boolean
  units: Unit[]
  value: string
}) {
  const [numericValue, valueUnit] = parseStringValue(value, units)

  const [unit, setUnit] = useState<Unit>(valueUnit)
  useEffect(() => setUnit(valueUnit), [valueUnit])

  return (
    <div className="dimension-editor">
      <div className="item_content">
        <div className="input_group" aria-readonly={readOnly}>
          <input
            max={unit === '%' ? 100 : undefined}
            min={0}
            onChange={({ target: { value } }) => updateValue(value)}
            placeholder={readOnly ? undefined : (placeholder ?? '100')}
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
              onChange={({ target: { value } }) => updateUnit(value as Unit)}
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

  function updateUnit(newUnit: Unit) {
    setUnit(newUnit)
    if (numericValue !== '') onUpdate(`${numericValue}${newUnit}`)
  }
}

function parseStringValue(value: string, units: Unit[]): [number | '', Unit] {
  const [fallbackUnit] = units
  if (!fallbackUnit) throw new Error('At least one unit must be provided')

  const unitRegex = new RegExp(`(${units.join('|')})$`)
  const valueUnit = value.match(unitRegex)?.[0]
  if (!valueUnit || !units.includes(valueUnit as Unit)) {
    return ['', fallbackUnit]
  }

  const numericValue = Number.parseFloat(value.replace(valueUnit, ''))
  if (isNaN(numericValue)) return ['', fallbackUnit]

  return [numericValue, valueUnit as Unit]
}
