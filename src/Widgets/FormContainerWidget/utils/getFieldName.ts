import { Widget } from 'scrivito'
import { isCustomType } from './isCustomType'

export function getFieldName(widget: Widget): string {
  return (
    isCustomType(widget) ? widget.get('customFieldName') : widget.get('type')
  ) as string
}
