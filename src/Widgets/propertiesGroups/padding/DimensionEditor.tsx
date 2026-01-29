import './DimensionEditor.scss'

export const DimensionEditor = function DimensionEditor<
  T extends readonly ('px' | '%' | 'rem')[],
>({
  numericValue,
  onUnitChange,
  onValueChange,
  placeholder,
  readOnly,
  unit,
  units,
}: {
  numericValue: number | null
  onUnitChange?: (newUnit: T[number]) => void
  onValueChange: (newValue: number | null) => void
  placeholder?: string
  readOnly: boolean
  unit: T[number]
  units: T
}) {
  return (
    <div className="dimension-editor">
      <div className="item_content">
        <div className="input_group" aria-readonly={readOnly}>
          <input
            max={unit === '%' ? 100 : undefined}
            min={0}
            onChange={({ target: { value } }) => {
              const numericValue = Number.parseFloat(value)
              onValueChange(isNaN(numericValue) ? null : numericValue)
            }}
            placeholder={readOnly ? undefined : (placeholder ?? '100')}
            readOnly={readOnly}
            step="any"
            type="number"
            value={numericValue ?? ''}
          />
          {units.length === 1 ? (
            <span className="input_group_text">{units[0]}</span>
          ) : (
            <select
              disabled={readOnly}
              onChange={({ target: { value } }) =>
                onUnitChange?.(value as T[number])
              }
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
}
