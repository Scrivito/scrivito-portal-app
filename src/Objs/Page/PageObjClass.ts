import * as Scrivito from 'scrivito'

export const Page = Scrivito.provideObjClass('Page', {
  attributes: {
    body: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})
