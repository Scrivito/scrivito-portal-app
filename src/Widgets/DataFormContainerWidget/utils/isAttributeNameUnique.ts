import { Widget } from 'scrivito'
import { getDataFormContainer } from './getDataFormContainer'

export function isAttributeNameUnique(widget: Widget) {
  const attributeName =
    typeof widget.get('attributeName') === 'string'
      ? widget.get('attributeName')
      : ''
  if (!attributeName) return true

  const dataFormContainer = getDataFormContainer(widget)
  if (!dataFormContainer) return true

  const otherWidget = dataFormContainer
    .widgets()
    .find(
      (child) =>
        child.get('attributeName') === attributeName &&
        child.id() !== widget.id(),
    )

  return !otherWidget
}
