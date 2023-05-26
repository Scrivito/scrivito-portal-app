import * as Scrivito from 'scrivito'
import { Dropdown } from './DropdownObjClass'

Scrivito.provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
})
