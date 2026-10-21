import { provideEditingConfig } from 'scrivito'
import { SlideWidget } from './SlideWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(SlideWidget, {
  title: 'Slide',
  thumbnail,
  attributes: {
    background: {
      title: 'Background image or video',
    },
  },
  properties: ['background'],
})
