import { provideObjClass } from 'scrivito'

export const EventPage = provideObjClass('EventPage', {
  attributes: {
    body: 'widgetlist',
    endDate: 'date',
    startDate: 'date',
    title: 'string',
  },
  extractTextAttributes: ['title', 'body'],
})
