import * as Scrivito from 'scrivito'

export const CarouselItemWidget = Scrivito.provideWidgetClass(
  'CarouselItemWidget',
  {
    onlyInside: 'CarouselContainerWidget',
    attributes: {
      background: ['reference', { only: ['Image'] }],
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
      caption: 'widgetlist',
    },
    extractTextAttributes: ['caption'],
  }
)
