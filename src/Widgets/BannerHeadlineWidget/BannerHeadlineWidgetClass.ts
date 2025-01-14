import { provideWidgetClass } from 'scrivito'

export const BannerHeadlineWidget = provideWidgetClass('BannerHeadlineWidget', {
  onlyInside: 'BannerHeadlineContainerWidget',
  attributes: {
    backgroundColor: [
      'enum',
      {
        values: [
          'white',
          'primary',
          'secondary',
          'light-grey',
          'middle-grey',
          'dark-grey',
          'success',
          'info',
          'warning',
          'danger',
        ],
      },
    ],
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
