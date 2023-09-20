import { Widget } from 'scrivito'

export function getAttributeName(widget: Widget): string {
  const attributeName = widget.get('attributeName')

  return typeof attributeName === 'string' ? attributeName : ''
}
