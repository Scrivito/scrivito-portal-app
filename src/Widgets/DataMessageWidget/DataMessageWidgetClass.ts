import { provideWidgetClass } from 'scrivito'

export const DataMessageWidget = provideWidgetClass('DataMessageWidget', {
  attributes: {
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})
