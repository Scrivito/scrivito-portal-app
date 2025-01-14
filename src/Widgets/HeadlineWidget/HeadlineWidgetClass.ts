import { provideWidgetClass } from 'scrivito'

export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    headline: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] }],
    style: [
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
          'label-headline',
          'label-subtitle',
        ],
      },
    ],
    uppercase: 'boolean',
  },
  extractTextAttributes: ['headline'],
})
