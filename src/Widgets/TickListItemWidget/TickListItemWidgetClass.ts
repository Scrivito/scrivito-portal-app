import { provideWidgetClass } from 'scrivito'

export const TickListItemWidget = provideWidgetClass('TickListItemWidget', {
  onlyInside: 'TickListWidget',
  attributes: {
    statement: 'string',
  },
  extractTextAttributes: ['statement'],
})
