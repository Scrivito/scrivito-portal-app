import { provideEditingConfig } from 'scrivito'
import { Dropdown } from './DropdownObjClass'

provideEditingConfig(Dropdown, {
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
