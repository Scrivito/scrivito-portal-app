import * as Scrivito from 'scrivito'

export const SubnavigationOverview = Scrivito.provideObjClass(
  'SubnavigationOverview',
  {
    attributes: {
      body: 'widgetlist',
      childOrder: 'referencelist',
      hideInNavigation: 'boolean',
      title: 'string',
    },
    extractTextAttributes: ['body'],
  }
)
