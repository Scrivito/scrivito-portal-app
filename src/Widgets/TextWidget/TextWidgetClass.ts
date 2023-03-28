import * as Scrivito from 'scrivito'

export const TextWidget = Scrivito.provideWidgetClass('TextWidget', {
  attributes: {
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
