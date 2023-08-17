import { provideWidgetClass } from 'scrivito'

export const GroupWidget = provideWidgetClass('GroupWidget', {
  attributes: {
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})
