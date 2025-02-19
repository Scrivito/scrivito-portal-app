import { provideWidgetClass } from 'scrivito'

export const ImageWidget = provideWidgetClass('ImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alternativeText: 'string',
    height: 'string',
    image: ['reference', { only: 'Image' }],
    link: 'link',
    objectFit: ['enum', { values: ['cover', 'contain'] }],
    roundCorners: 'boolean',
    width: 'string',
  },
})

export type ImageWidgetInstance = InstanceType<typeof ImageWidget>
