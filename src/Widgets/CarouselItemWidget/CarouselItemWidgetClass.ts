import * as Scrivito from 'scrivito'

export const CarouselItemWidget = Scrivito.provideWidgetClass(
  'CarouselItemWidget',
  {
    onlyInside: 'CarouselContainerWidget',
    attributes: {
      caption: 'widgetlist',
      background: ['reference', { only: ['Image'] }],
    },
    extractTextAttributes: ['caption'],
  }
)
