import { provideWidgetClass } from 'scrivito'

export const ImageWidget = provideWidgetClass('ImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alignmentTablet: ['enum', { values: ['left', 'center', 'right'] }],
    alignmentMobile: ['enum', { values: ['left', 'center', 'right'] }],
    alternativeText: 'string',
    height: 'string',
    heightTablet: 'string',
    heightMobile: 'string',
    image: ['reference', { only: 'Image' }],
    link: 'link',
    objectFit: ['enum', { values: ['cover', 'contain'] }],
    objectFitTablet: ['enum', { values: ['cover', 'contain'] }],
    objectFitMobile: ['enum', { values: ['cover', 'contain'] }],
    roundCorners: 'boolean',
    width: 'string',
    widthTablet: 'string',
    widthMobile: 'string',
  },
})

export type ImageWidgetInstance = InstanceType<typeof ImageWidget>
