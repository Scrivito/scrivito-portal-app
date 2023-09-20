import { Widget } from 'scrivito'
import { getAttributeName } from './getAttributeName'
import { getDataFormContainer } from './getDataFormContainer'

export function isAttributeNameUnique(widget: Widget) {
  const attributeName = getAttributeName(widget)
  if (!attributeName) return true

  const dataFormContainer = getDataFormContainer(widget)
  if (!dataFormContainer) return true

  const otherWidget = dataFormContainer
    .widgets()
    .find(
      (child) =>
        getAttributeName(child) === attributeName && child.id() !== widget.id(),
    )

  return !otherWidget
}
