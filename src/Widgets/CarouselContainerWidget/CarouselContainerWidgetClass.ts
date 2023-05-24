import * as Scrivito from 'scrivito'

export const CarouselContainerWidget = Scrivito.provideWidgetClass(
  'CarouselContainerWidget',
  {
    attributes: {
      items: ['widgetlist', { only: 'CarouselItemWidget' }],
    },
    extractTextAttributes: ['items'],
  }
)
