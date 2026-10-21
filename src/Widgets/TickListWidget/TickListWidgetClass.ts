import { provideWidgetClass } from 'scrivito'

export const TickListWidget = provideWidgetClass('TickListWidget', {
  attributes: {
    design: ['design', { preset: 'container' }],
    icon: 'string',
    items: ['widgetlist', { only: 'TickListItemWidget' }],
  },
  extractTextAttributes: ['items'],
})
