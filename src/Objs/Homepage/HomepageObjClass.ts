import * as Scrivito from 'scrivito'

export const Homepage = Scrivito.provideObjClass('Homepage', {
  attributes: {
    body: ['widgetlist', { only: 'SectionWidget' }],
    childOrder: 'referencelist',
    siteFooter: ['widgetlist', { only: 'SectionWidget' }],
    siteHeader: ['widgetlist', { only: 'SectionWidget' }],
    title: 'string',
  },
  extractTextAttributes: ['body'],
  onlyAsRoot: true,
})
