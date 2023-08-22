import { provideObjClass } from 'scrivito'

export const Notification = provideObjClass('Notification', {
  attributes: {
    createdAt: 'string',
    details: 'string',
    title: 'string',
  },
})
