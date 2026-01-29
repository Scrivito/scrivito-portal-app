import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const SliderWidget = provideWidgetClass('SliderWidget', {
  attributes: {
    autoplay: 'boolean',
    autoplayInterval: 'float',
    controls: 'boolean',
    margin: [
      'enum',
      { values: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'] },
    ], // deprecated by paddingBottom from marginAttributes
    minHeight: 'integer',
    slides: ['widgetlist', { only: 'SlideWidget' }],
    ...paddingAttributes,
  },
  extractTextAttributes: ['slides'],
})
