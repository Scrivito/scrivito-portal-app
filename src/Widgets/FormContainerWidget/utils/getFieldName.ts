import * as Scrivito from 'scrivito'
import { isCustomType } from './isCustomType'

export function getFieldName(widget: Scrivito.Widget): string {
  const fieldName = isCustomType(widget)
    ? widget.get('customFieldName')
    : widget.get('type')

  return typeof fieldName === 'string' ? fieldName : ''
}
