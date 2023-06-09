import * as Scrivito from 'scrivito'

export const DataPage = Scrivito.provideObjClass('DataPage', {
  attributes: {
    body: 'widgetlist',
    dataClass: 'string',
    hideInNavigation: 'boolean',
    title: 'string',
  },
})
