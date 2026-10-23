import { provideWidgetClass } from 'scrivito'

export const GroupWidget = provideWidgetClass('GroupWidget', {
  attributes: {
    content: 'widgetlist',
    design: ['design', { kind: 'container' }],
  },
  extractTextAttributes: ['content'],
})
