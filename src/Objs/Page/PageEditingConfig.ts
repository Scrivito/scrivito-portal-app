import { provideEditingConfig } from 'scrivito'
import { Page } from './PageObjClass'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'
import Thumbnail from './thumbnail.svg'

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
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
    showAsLandingPage: {
      title: 'Display this page as a landing page?',
      description:
        'Removes the header navigation and only centers the logo instead. Default: No',
    },
    data: {
      restrictDataTo: ['scope', 'item'],
    },
  },
  properties: [
    ...defaultPageProperties,
    'hideInNavigation',
    'linkIcon',
    'excludeFromSearch',
    'showAsLandingPage',
  ],
  propertiesGroups: defaultPagePropertiesGroups,
  initialContent: {
    ...defaultPageInitialContent,
    linkIcon: 'bi-rocket-takeoff',
  },
  validations: defaultPageValidations,
})
