import * as Scrivito from 'scrivito'

export const SectionWidget = Scrivito.provideWidgetClass('SectionWidget', {
  attributes: {
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})
