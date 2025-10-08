import {
  canEdit,
  connect,
  isComparisonActive,
  uiContext,
  Widget,
} from 'scrivito'
import './ObjectFitEditor/ObjectFitEditor.scss'

export const ObjectFit = connect(function ObjectFit({
  widget,
}: {
  widget?: Widget
}) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  if (!widget) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()

  const objectFit = widget.get('objectFit') ?? 'contain'

  return (
    <div className={`object-fit-editor ${`scrivito_${theme}`}`}>
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
    </div>
  )
})
