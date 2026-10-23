import { provideWidgetClass } from 'scrivito'

export const SliderWidget = provideWidgetClass('SliderWidget', {
  attributes: {
    autoplay: 'boolean',
    autoplayInterval: 'float',
    controls: 'boolean',
    // The margin used to be an enum of Bootstrap spacers. The design covers it, per breakpoint.
    design: ['design', { kind: 'container' }],
    minHeight: 'integer',
    slides: ['widgetlist', { only: 'SlideWidget' }],
  },
  extractTextAttributes: ['slides'],
})
