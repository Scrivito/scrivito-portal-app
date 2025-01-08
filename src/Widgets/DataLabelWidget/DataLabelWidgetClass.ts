import { provideWidgetClass } from 'scrivito'

export const DataLabelWidget = provideWidgetClass('DataLabelWidget', {
  attributes: {
    label: 'string',
    data: 'datalocator',
    details: 'string',
    showAs: ['enum', { values: ['text', 'currency', 'datetime', 'link'] }],
    datetimeFormat: ['enum', { values: ['date', 'datetime', 'relative'] }],
    valueSize: [
      'enum',
      {
        values: [
          'display-1',
          'display-2',
          'display-3',
          'display-4',
          'display-5',
          'display-6',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'text-small',
          'body-font-size',
        ],
      },
    ],
    marginBottom: 'boolean',
  },
})
