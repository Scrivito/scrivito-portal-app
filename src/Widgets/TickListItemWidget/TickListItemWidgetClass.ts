import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../textStyleAttributes'

export const TickListItemWidget = provideWidgetClass('TickListItemWidget', {
  onlyInside: 'TickListWidget',
  attributes: {
    statement: 'string',
    ...textStyleAttributes,
  },
  extractTextAttributes: ['statement'],
})
