import * as Scrivito from 'scrivito'
import { CarouselItemWidget } from './CarouselItemWidgetClass'
import { HeadlineWidget } from '../HeadlineWidget/HeadlineWidgetClass'

Scrivito.provideEditingConfig(CarouselItemWidget, {
  title: 'Carousel Item',
  properties: ['background'],
  initialContent: {
    caption: [new HeadlineWidget({ headline: 'Lorem ipsum' })],
  },
})
