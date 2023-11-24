import { Widget } from 'scrivito'
import { isCustomType } from './isCustomType'
import { ensureString } from '../../../utils/ensureString'

export function getFieldName(widget: Widget): string {
  const fieldName = isCustomType(widget)
    ? widget.get('customFieldName')
    : widget.get('type')

  return ensureString(fieldName)
}
