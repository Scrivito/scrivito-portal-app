import * as Scrivito from 'scrivito'

export const TextWidget = Scrivito.provideWidgetClass('TextWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
