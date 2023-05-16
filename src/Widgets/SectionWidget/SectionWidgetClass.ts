import * as Scrivito from 'scrivito'

export const SectionWidget = Scrivito.provideWidgetClass('SectionWidget', {
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
          'transparent',
        ],
      },
    ],
    backgroundImage: ['reference', { only: ['Image'] }],
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})
