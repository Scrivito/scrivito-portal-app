import { provideObjClass } from 'scrivito'

export const Video = provideObjClass('Video', {
  attributes: {
    blob: 'binary',
    tags: 'stringlist',
  },
})
