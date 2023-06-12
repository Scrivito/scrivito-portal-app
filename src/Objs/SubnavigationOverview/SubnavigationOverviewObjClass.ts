import * as Scrivito from 'scrivito'

export const SubnavigationOverview = Scrivito.provideObjClass(
  'SubnavigationOverview',
  {
    attributes: {
      body: 'widgetlist',
      childOrder: 'referencelist',
      hideInNavigation: 'boolean',
      linkIcon: 'string',
      showTopContentSection: 'boolean',
      title: 'string',
      topContentSection: 'widgetlist',
    },
    extractTextAttributes: ['body'],
  }
)
