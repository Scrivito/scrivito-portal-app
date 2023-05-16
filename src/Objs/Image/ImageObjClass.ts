import * as Scrivito from 'scrivito'

export const Image = Scrivito.provideObjClass('Image', {
  attributes: {
    alternativeText: 'string',
    blob: 'binary',
    tags: 'stringlist',
  },
})
