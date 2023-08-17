import { provideWidgetClass } from 'scrivito'

export const LabelWidget = provideWidgetClass('LabelWidget', {
  attributes: {
    label: 'string',
    valueSize: [
      'enum',
      {
        values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-font-size'],
      },
    ],
    value: 'string',
    details: 'string',
  },
  extractTextAttributes: ['label', 'value', 'details'],
})
