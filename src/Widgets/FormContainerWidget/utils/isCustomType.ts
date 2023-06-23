import { Widget } from 'scrivito'

export function isCustomType(widget: Widget) {
  return !widget.attributeDefinitions().type || widget.get('type') === 'custom'
}
