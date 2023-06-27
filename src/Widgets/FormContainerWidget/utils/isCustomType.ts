import { Widget } from 'scrivito'

export function isCustomType(widget: Widget): boolean {
  return !widget.attributeDefinitions().type || widget.get('type') === 'custom'
}
