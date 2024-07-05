import { SocialCardsTab } from '../Components/ScrivitoExtensions/SocialCardsTab'
import { ensureString } from '../utils/ensureString'

export const defaultPageEditingConfigAttributes = {
  title: {
    title: 'Title',
    description: 'Limit to 55 characters.',
  },
  metaDataDescription: {
    title: 'Page description',
    description: 'Limit to 175, ideally 150 characters.',
  },
  robotsIndex: {
    title: 'Should this page be indexed?',
    description: 'If not, search engines will ignore this page. Default: Yes',
  },
  layoutShowFooter: {
    title: 'Show layout footer widgets?',
  },
}

export const defaultPageInitialContent = {
  robotsIndex: true,
} as const

export const defaultPagePropertiesGroups = [
  {
    title: 'Layout widgets',
    properties: ['layoutShowFooter'],
    key: 'layout-widgets-group',
  },
  {
    title: 'Metadata',
    properties: ['metaDataDescription', 'robotsIndex'],
    key: 'metadata-group',
  },
  {
    title: 'Social cards',
    component: SocialCardsTab,
    properties: [
      'ogDescription',
      'ogImage',
      'ogTitle',
      'tcCreator',
      'tcDescription',
      'tcImage',
      'tcTitle',
    ],
    key: 'social-cards-group',
  },
] as const

export const defaultPageProperties = ['title']

export const defaultPageValidations = [
  [
    'title',

    (title: unknown) => {
      if (ensureString(title).length === 0) {
        return {
          message: 'The title should be set.',
          severity: 'warning',
        }
      }
    },
  ],
  [
    'metaDataDescription',

    (metaDataDescription: unknown) => {
      if (ensureString(metaDataDescription).length > 175) {
        return {
          message: 'The page description should not exceed 175 characters.',
          severity: 'warning',
        }
      }
    },
  ],
  [
    'tcCreator',

    (tcCreator: unknown) => {
      if (tcCreator && ensureString(tcCreator).charAt(0) !== '@') {
        return {
          message: 'The creator should start with @.',
          severity: 'warning',
        }
      }
    },
  ],
  [
    'tcDescription',

    (tcDescription: unknown) => {
      if (ensureString(tcDescription).length > 200) {
        return {
          message: 'The Twitter description should not exceed 200 characters.',
          severity: 'warning',
        }
      }
    },
  ],
  [
    'ogDescription',

    (ogDescription: unknown) => {
      if (ensureString(ogDescription).length > 300) {
        return {
          message: 'The Facebook description should not exceed 300 characters.',
          severity: 'warning',
        }
      }
    },
  ],
] as const
