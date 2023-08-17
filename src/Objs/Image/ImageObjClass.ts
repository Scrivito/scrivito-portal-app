import { provideObjClass } from 'scrivito'

export const Image = provideObjClass('Image', {
  attributes: {
    alternativeText: 'string',
    blob: 'binary',
    tags: 'stringlist',
  },
})
