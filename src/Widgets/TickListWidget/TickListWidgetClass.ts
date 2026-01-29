import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'

export const TickListWidget = provideWidgetClass('TickListWidget', {
  attributes: {
    icon: 'string',
    items: ['widgetlist', { only: 'TickListItemWidget' }],
    ...textStyleAttributes,
  },
  extractTextAttributes: ['items'],
})
