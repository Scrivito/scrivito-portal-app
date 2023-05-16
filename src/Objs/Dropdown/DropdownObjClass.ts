import * as Scrivito from 'scrivito'

export const Dropdown = Scrivito.provideObjClass('Dropdown', {
  attributes: {
    childOrder: 'referencelist',
    hideFromNavigation: 'boolean',
    title: 'string',
  },
})
