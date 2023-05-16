import * as Scrivito from 'scrivito'

export const ImageWidget = Scrivito.provideWidgetClass('ImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alternativeText: 'string',
    image: ['reference', { only: 'Image' }],
    link: 'link',
  },
})
