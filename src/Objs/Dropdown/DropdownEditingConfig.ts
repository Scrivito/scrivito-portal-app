import { provideEditingConfig } from 'scrivito'
import { Dropdown } from './DropdownObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  thumbnail: Thumbnail,
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
})
