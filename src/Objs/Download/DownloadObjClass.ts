import { provideObjClass } from 'scrivito'

export const Download = provideObjClass('Download', {
  attributes: {
    blob: 'binary',
    tags: 'stringlist',
    title: 'string',
    excludeFromSearch: 'boolean',
  },
  extractTextAttributes: ['blob:text'],
})
