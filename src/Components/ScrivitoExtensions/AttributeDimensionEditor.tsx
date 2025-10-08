import {
  canEdit,
  connect,
  isComparisonActive,
  Obj,
  uiContext,
  Widget,
} from 'scrivito'
import { DimensionEditor } from './DimensionEditor'
import { ensureString } from '../../utils/ensureString'

export const AttributeDimensionEditor = connect(
  function AttributeDimensionEditor({
    page,
    widget,
    attribute,
    units,
  }: {
    widget?: Widget
    page?: Obj
    attribute: string
    units: ('px' | '%' | 'rem')[]
  }) {
    const { theme } = uiContext() || { theme: null }
    if (!theme) return null

    const item = page || widget
    if (!item) return null

    const obj = item instanceof Obj ? item : item.obj()
    const readOnly = !canEdit(obj) || isComparisonActive()

    return (
      <div className={`scrivito_${theme}`}>
        <DimensionEditor
          onUpdate={(value) => item.update({ [attribute]: value })}
          readOnly={readOnly}
          units={units}
          value={ensureString(item.get(attribute))}
        />
      </div>
    )
  },
)
