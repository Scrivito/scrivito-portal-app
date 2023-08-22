import { provideObjClass } from 'scrivito'

export const Dropdown = provideObjClass('Dropdown', {
  attributes: {
    childOrder: 'referencelist',
    hideInNavigation: 'boolean',
    title: 'string',
  },
})
