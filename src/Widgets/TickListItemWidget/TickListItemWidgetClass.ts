import { provideWidgetClass } from 'scrivito'

export const TickListItemWidget = provideWidgetClass('TickListItemWidget', {
  onlyInside: 'TickListWidget',
  attributes: {
    design: ['design', { preset: 'text' }],
    statement: 'string',
  },
  extractTextAttributes: ['statement'],
})
