import { Obj, provideEditingConfig } from 'scrivito'
import { Page } from './PageObjClass'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'
import Thumbnail from './thumbnail.svg'

function propertiesGroups(page: Obj) {
  if (page.path()?.split('/').length === 2) {
    // Only show layoutIgnoreTopLevelLayout for top-level pages
    return defaultPagePropertiesGroups.map((group) =>
      group.key === 'layout-group'
        ? {
            key: group.key,
            title: group.title,
            properties: [...group.properties, 'layoutIgnoreTopLevelLayout'],
          }
        : group,
    )
  }

  return defaultPagePropertiesGroups
}

provideEditingConfig(Page, {
  title: 'Page',
  thumbnail: Thumbnail,
  attributes: {
    ...defaultPageEditingConfigAttributes,
    excludeFromSearch: {
      title: 'Exclude from search results?',
      description:
        'If checked, this page will not be included in search results.',
    },
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    layoutIgnoreTopLevelLayout: {
      title: 'Ignore top-level layout?',
      description: 'Default: No',
    },
    data: {
      restrictDataTo: ['scope', 'item'],
    },
  },
  properties: [
    ...defaultPageProperties,
    'hideInNavigation',
    'excludeFromSearch',
  ],
  propertiesGroups,
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})
