import { provideWidgetClass } from 'scrivito'

export const TickListItemWidget = provideWidgetClass('TickListItemWidget', {
  onlyInside: 'TickListWidget',
  attributes: {
    design: ['design', { kind: 'text' }],
    statement: 'string',
  },
  extractTextAttributes: ['statement'],
})
