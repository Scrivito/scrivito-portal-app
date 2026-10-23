import { provideWidgetClass } from 'scrivito'

export const BannerHeadlineWidget = provideWidgetClass('BannerHeadlineWidget', {
  onlyInside: 'BannerHeadlineContainerWidget',
  attributes: {
    // The background color used to be an enum of theme colors. The design carries it now, on
    // the headline itself — the element that used to get the `bg-*` class.
    design: ['design', { kind: 'inline' }],
    headline: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
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
        ],
      },
    ],
  },
  extractTextAttributes: ['headline'],
})
