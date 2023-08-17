import { Widget } from 'scrivito'
import { isCustomType } from './isCustomType'

export function getFieldName(widget: Widget): string {
  const fieldName = isCustomType(widget)
    ? widget.get('customFieldName')
    : widget.get('type')

  return typeof fieldName === 'string' ? fieldName : ''
}
