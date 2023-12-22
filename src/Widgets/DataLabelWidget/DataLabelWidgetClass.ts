import { provideWidgetClass } from 'scrivito'

export const DataLabelWidget = provideWidgetClass('DataLabelWidget', {
  attributes: {
    label: 'string',
    attributeName: 'string',
    details: 'string',
    showAs: ['enum', { values: ['text', 'currency'] }],
    currency: ['enum', { values: ['EUR', 'USD', 'PLN'] }], // ISO 4217 codes
    valueSize: [
      'enum',
      { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-font-size'] },
    ],
    marginBottom: 'boolean',
  },
})
