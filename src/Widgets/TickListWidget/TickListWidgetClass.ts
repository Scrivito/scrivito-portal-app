import { provideWidgetClass } from 'scrivito'

export const TickListWidget = provideWidgetClass('TickListWidget', {
  attributes: {
    design: ['design', { kind: 'container' }],
    icon: 'string',
    items: ['widgetlist', { only: 'TickListItemWidget' }],
  },
  extractTextAttributes: ['items'],
})
