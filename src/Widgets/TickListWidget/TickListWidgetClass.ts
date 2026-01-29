import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const TickListWidget = provideWidgetClass('TickListWidget', {
  attributes: {
    icon: 'string',
    items: ['widgetlist', { only: 'TickListItemWidget' }],
    ...paddingAttributes,
    ...textStyleAttributes,
  },
  extractTextAttributes: ['items'],
})
