import * as Scrivito from 'scrivito'

export const Homepage = Scrivito.provideObjClass('Homepage', {
  attributes: {
    body: 'widgetlist',
    title: 'string',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})
