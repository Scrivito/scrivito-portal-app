import * as Scrivito from 'scrivito'
import { CarouselItemWidget } from './CarouselItemWidgetClass'
import { HeadlineWidget } from '../HeadlineWidget/HeadlineWidgetClass'

Scrivito.provideEditingConfig(CarouselItemWidget, {
  title: 'Carousel Item',
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Transparent',
      values: [
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'transparent', title: 'Transparent' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
      ],
    },
  },
  properties: ['background', 'backgroundColor'],
  initialContent: {
    backgroundColor: 'transparent',
    caption: [new HeadlineWidget({ headline: 'Lorem ipsum' })],
  },
})
