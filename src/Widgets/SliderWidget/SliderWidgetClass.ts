import { provideWidgetClass } from 'scrivito'

export const SliderWidget = provideWidgetClass('SliderWidget', {
  attributes: {
    autoPlay: 'boolean',
    controls: 'boolean',
    slides: ['widgetlist', { only: 'SlideWidget' }],
  },
  extractTextAttributes: ['slides'],
})
