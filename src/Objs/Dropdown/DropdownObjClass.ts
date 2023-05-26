import * as Scrivito from 'scrivito'

export const Dropdown = Scrivito.provideObjClass('Dropdown', {
  attributes: {
    childOrder: 'referencelist',
    hideInNavigation: 'boolean',
    title: 'string',
  },
})
