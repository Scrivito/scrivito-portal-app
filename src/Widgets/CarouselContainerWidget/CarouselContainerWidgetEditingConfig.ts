import * as Scrivito from 'scrivito'
import { CarouselContainerWidget } from './CarouselContainerWidgetClass'
import { CarouselItemWidget } from '../CarouselItemWidget/CarouselItemWidgetClass'
import { HeadlineWidget } from '../HeadlineWidget/HeadlineWidgetClass'

Scrivito.provideEditingConfig(CarouselContainerWidget, {
  title: 'Carousel',
  properties: ['items'],
  initialContent: {
    items: [
      new CarouselItemWidget({
        caption: [new HeadlineWidget({ headline: 'Lorem ipsum' })],
      }),
    ],
  },
})
