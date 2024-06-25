import { provideEditingConfig } from 'scrivito'
import { SubnavigationOverview } from './SubnavigationOverviewObjClass'
import Thumbnail from './thumbnail.svg'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'

provideEditingConfig(SubnavigationOverview, {
  title: 'Subnavigation Overview',
  thumbnail: Thumbnail,
  attributes: {
    ...defaultPageEditingConfigAttributes,
    hideInNavigation: {
      title: 'Hide in navigation?',
      description: 'Default: No',
    },
    linkIcon: {
      title: 'Link icon name',
      description:
        'This icon is shown e.g. when linked from the "portal" section of the navigation widget. The full list of names can be found at https://icons.getbootstrap.com/',
    },
    topBannerBackground: {
      title: 'Top banner background',
      description:
        'This background will be shown on this page and all sub-pages',
    },
  },
  properties: [
    ...defaultPageProperties,
    'hideInNavigation',
    'linkIcon',
    'topBannerBackground',
  ],
  propertiesGroups: defaultPagePropertiesGroups,
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})
