import { provideWidgetClass } from 'scrivito'

export const TickListItemWidget = provideWidgetClass('TickListItemWidget', {
  onlyInside: 'TickListWidget',
  attributes: {
    icon: 'string',
    statement: 'string',
  },
  extractTextAttributes: ['statement'],
})
