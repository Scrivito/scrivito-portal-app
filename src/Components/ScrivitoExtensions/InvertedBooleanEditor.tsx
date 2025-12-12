import { connect, uiContext } from 'scrivito'
import './InvertedBooleanEditor.scss'

export const InvertedBooleanEditor = connect(function InvertedBooleanEditor({
  attributeValue,
  readOnly,
  updateAttributeValue,
}: {
  attributeValue: boolean
  readOnly: boolean
  updateAttributeValue: (value: boolean) => void
}) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme} ${readOnly ? 'scrivito_disabled' : ''}`}>
      <label
        className={`scrivito_switch ${attributeValue ? '' : 'active'}`}
        aria-label={attributeValue ? 'No' : 'Yes'}
      >
        <input
          type="checkbox"
          className="btn-check"
          checked={!attributeValue}
          onChange={() => updateAttributeValue(!attributeValue)}
          disabled={readOnly}
        />
        <div className="pill-wrapper">
          <div className="cell pill"></div>
        </div>
        <div className="cell left" aria-hidden>
          No
        </div>
        <div className="cell right" aria-hidden>
          Yes
        </div>
      </label>
    </div>
  )
})
