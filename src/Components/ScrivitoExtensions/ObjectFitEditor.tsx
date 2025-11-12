import { connect } from 'scrivito'
import './ObjectFitEditor/ObjectFitEditor.scss'
import { ensureString } from '../../utils/ensureString'

export const ObjectFitEditor = connect(function ObjectFitEditor({
  attributeValue,
  readOnly,
  theme,
  updateAttributeValue,
}: {
  attributeValue?: unknown
  readOnly: boolean
  theme: 'dark' | 'light' | null
  updateAttributeValue: (value: string) => void
}) {
  if (!theme) return null

  const objectFit = ensureString(attributeValue) || 'contain'

  return (
    <div className={`object-fit-editor ${`scrivito_${theme}`}`}>
      <div className="enum_attribute">
        <button
          aria-current={objectFit === 'contain'}
          className={
            objectFit === 'contain' ? 'enum_attribute_active' : undefined
          }
          disabled={readOnly}
          onClick={() => updateAttributeValue('contain')}
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
          onClick={() => updateAttributeValue('cover')}
          title="The image is resized to fill the entire space, keeping its proportions, but may be cropped if necessary."
        >
          <div className="attribute-preview cover"></div>
          <span>Cover</span>
        </button>
      </div>
    </div>
  )
})
