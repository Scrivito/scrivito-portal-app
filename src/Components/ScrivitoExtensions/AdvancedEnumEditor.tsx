import { connect, uiContext } from 'scrivito'
import { ensureString } from '../../utils/ensureString'
import './AdvancedEnumEditor/AdvancedEnumEditor.scss'

type EnumOption = {
  value: string
  title: string
  description?: string
  icon?: string
}

type AdvancedEnumEditorProps = {
  attributeValue: unknown
  options: EnumOption[]
  readOnly: boolean
  updateAttributeValue: (value: string) => void
}

export const AdvancedEnumEditor = connect(function AdvancedEnumEditor({
  attributeValue,
  options,
  readOnly,
  updateAttributeValue,
}: AdvancedEnumEditorProps) {
  const theme = (uiContext() || { theme: null }).theme
  if (!theme) return null

  const currentValue = ensureString(attributeValue) || options[0]?.value

  return (
    <div className={`advanced-enum-editor scrivito_${theme}`}>
      <div className="enum_attribute">
        {options.map((option) => (
          <button
            key={option.value}
            aria-current={currentValue === option.value}
            className={
              currentValue === option.value
                ? 'enum_attribute_active'
                : undefined
            }
            disabled={readOnly}
            onClick={() => updateAttributeValue(option.value)}
            title={option.description}
          >
            {option.icon && (
              <div
                className="attribute-preview"
                style={{ backgroundImage: `url("${option.icon}")` }}
              />
            )}
            <span>{option.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
})
