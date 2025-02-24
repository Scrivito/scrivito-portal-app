import { provideWidgetClass } from 'scrivito'

export const SliderWidget = provideWidgetClass('SliderWidget', {
  attributes: {
    autoplay: 'boolean',
    autoplayInterval: 'integer',
    controls: 'boolean',
    margin: [
      'enum',
      { values: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'] },
    ],
    minHeight: 'integer',
    slides: ['widgetlist', { only: 'SlideWidget' }],
  },
  extractTextAttributes: ['slides'],
})
