import { provideEditingConfig } from 'scrivito'
import { Dropdown } from './DropdownObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  thumbnail: classNameToThumbnail('Dropdown'),
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
})
