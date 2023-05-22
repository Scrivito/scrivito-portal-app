import * as Scrivito from 'scrivito'
import { Dropdown } from './DropdownObjClass'

Scrivito.provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  attributes: {
    hideFromNavigation: {
      title: 'Hide from navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideFromNavigation'],
})
