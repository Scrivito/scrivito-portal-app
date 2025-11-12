import { connect } from 'scrivito'
import { DimensionEditor } from './DimensionEditor'
import { ensureString } from '../../utils/ensureString'

export const DimensionPicker = connect(function DimensionPicker({
  attributeValue,
  readOnly,
  theme,
  units,
  updateAttributeValue,
}: {
  attributeValue: unknown
  readOnly: boolean
  theme: 'dark' | 'light' | null
  units: ('px' | '%' | 'rem')[]
  updateAttributeValue: (value: string) => void
}) {
  if (!theme) return null
  const value = ensureString(attributeValue)

  return (
    <div className={`scrivito_${theme}`}>
      <DimensionEditor
        onUpdate={updateAttributeValue}
        readOnly={readOnly}
        units={units}
        value={value}
      />
    </div>
  )
})
