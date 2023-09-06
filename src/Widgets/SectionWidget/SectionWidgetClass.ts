import { provideWidgetClass } from 'scrivito'

export const SectionWidget = provideWidgetClass('SectionWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
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
          'transparent',
          'success',
          'info',
          'warning',
          'danger',
        ],
      },
    ],
    background: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    showPadding: 'boolean',
    containerWidth: [
      'enum',
      { values: ['fixed', '95-percent', '100-percent'] },
    ],
  },
  extractTextAttributes: ['content'],
})
