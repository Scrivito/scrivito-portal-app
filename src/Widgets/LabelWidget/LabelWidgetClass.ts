import * as Scrivito from 'scrivito'

export const LabelWidget = Scrivito.provideWidgetClass('LabelWidget', {
  attributes: {
    label: 'string',
    valueSize: [
      'enum',
      {
        values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-font-size'],
      },
    ],
    value: 'string',
  },
  extractTextAttributes: ['label', 'value'],
})
