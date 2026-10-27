import { provideWidgetClass } from 'scrivito'

export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    // Alignment, spacing and capitalization used to be enums of their own. The design
    // attribute covers all three, per breakpoint.
    design: 'design',
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
  },
  extractTextAttributes: ['headline'],
})
