import { provideWidgetClass } from 'scrivito'

export const ImageWidget = provideWidgetClass('ImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alternativeText: 'string',
    dataItemAttributeName: 'string',
    roundCorners: 'boolean',
    image: ['reference', { only: 'Image' }],
    imageFromDataItem: 'boolean',
    link: 'link',
  },
})
