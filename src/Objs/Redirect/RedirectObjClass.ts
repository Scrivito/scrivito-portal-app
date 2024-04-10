import { provideObjClass } from 'scrivito'

export const Redirect = provideObjClass('Redirect', {
  attributes: {
    title: 'string',
    link: 'link',
    requireLogin: 'boolean',
  },
})
