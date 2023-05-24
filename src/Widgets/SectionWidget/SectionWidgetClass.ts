import * as Scrivito from 'scrivito'

export const SectionWidget = Scrivito.provideWidgetClass('SectionWidget', {
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
    backgroundImage: ['reference', { only: ['Image'] }],
    content: 'widgetlist',
    showPadding: 'boolean',
    containerWidth: [
      'enum',
      { values: ['fixed', '95-percent', '100-percent'] },
    ],
  },
  extractTextAttributes: ['content'],
})
