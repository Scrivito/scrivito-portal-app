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
    'excludeFromSearch',
    'showAsLandingPage',
  ],
  propertiesGroups: defaultPagePropertiesGroups,
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})
