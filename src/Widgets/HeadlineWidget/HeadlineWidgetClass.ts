import { provideWidgetClass } from 'scrivito'

export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    headline: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    style: [
      'enum',
      {
        values: [
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
