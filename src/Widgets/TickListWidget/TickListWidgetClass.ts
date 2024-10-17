import { provideWidgetClass } from 'scrivito'

export const TickListWidget = provideWidgetClass('TickListWidget', {
  attributes: {
    icon: 'string',
    items: ['widgetlist', { only: 'TickListItemWidget' }],
  },
  extractTextAttributes: ['items'],
})
