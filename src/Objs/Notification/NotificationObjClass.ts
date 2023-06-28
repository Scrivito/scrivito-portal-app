import * as Scrivito from 'scrivito'

export const Notification = Scrivito.provideObjClass('Notification', {
  attributes: {
    createdAt: 'string',
    details: 'string',
    title: 'string',
  },
})
