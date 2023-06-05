import * as Scrivito from 'scrivito'

export const CardWidget = Scrivito.provideWidgetClass('CardWidget', {
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
    cardBody: 'widgetlist',
    cardExtended: 'boolean',
    cardFooter: 'widgetlist',
    image: ['reference', { only: ['Image'] }],
    linkTo: 'link',
    showFooter: 'boolean',
  },
})
