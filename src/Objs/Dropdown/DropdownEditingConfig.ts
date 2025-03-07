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
    layoutIgnoreHomepageLayout: {
      title: 'Ignore homepage layout?',
      description: 'Default: No',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'hideInNavigation'],
  propertiesGroups: (page) =>
    [
      page.path()?.split('/').length === 2 // Only show layoutIgnoreHomepageLayout for top-level pages
        ? {
            title: 'Layout',
            properties: ['layoutIgnoreHomepageLayout'],
            key: 'layout-group',
          }
        : null,
    ].filter((i) => !!i),
})
