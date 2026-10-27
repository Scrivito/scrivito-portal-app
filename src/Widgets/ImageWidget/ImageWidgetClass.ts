import { provideWidgetClass } from 'scrivito'

export const ImageWidget = provideWidgetClass('ImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alternativeText: 'string',
    // Width, height, object fit and round corners used to be attributes of their own.
    design: 'design',
    image: ['reference', { only: 'Image' }],
    link: 'link',
  },
})

export type ImageWidgetInstance = InstanceType<typeof ImageWidget>
