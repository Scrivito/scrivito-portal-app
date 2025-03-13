import { provideEditingConfig } from 'scrivito'
import { Dropdown } from './DropdownObjClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(Dropdown, {
  title: 'Dropdown',
  thumbnail: Thumbnail,
  attributes: {
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    layoutIgnoreTopLevelLayout: {
      title: 'Ignore top-level layout?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
  propertiesGroups: (page) =>
    [
      page.path()?.split('/').length === 2 // Only show layoutIgnoreTopLevelLayout for top-level pages
        ? {
            title: 'Layout',
            properties: ['layoutIgnoreTopLevelLayout'],
            key: 'layout-group',
          }
        : null,
    ].filter((i) => !!i),
})
