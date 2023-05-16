import * as Scrivito from 'scrivito'

export const ImageWidget = Scrivito.provideWidgetClass('ImageWidget', {
  attributes: {
    alternativeText: 'string',
    image: ['reference', { only: 'Image' }],
    link: 'link',
  },
})
