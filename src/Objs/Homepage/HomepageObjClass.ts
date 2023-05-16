import * as Scrivito from 'scrivito'

export const Homepage = Scrivito.provideObjClass('Homepage', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    title: 'string',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})
