import * as Scrivito from 'scrivito'

export const BannerHeadlineWidget = Scrivito.provideWidgetClass(
  'BannerHeadlineWidget',
  {
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
      style: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    },
    extractTextAttributes: ['headline'],
  }
)
