import { Obj } from 'scrivito'
import { ScrivitoBootstrapIconPicker } from '@justrelate/icon-picker'
import { ensureString } from '../utils/ensureString'
import {
  TwitterPreview,
  FacebookPreview,
} from '../Components/ScrivitoExtensions/SocialCardPreviews'

export const defaultPageEditingConfigAttributes = {
  title: {
    title: 'Title',
    description: 'Limit to 55 characters.',
  },
  description: {
    title: 'Page description',
    description: 'Limit to 175, ideally 150 characters.',
  },
  robotsIndex: {
    title: 'Should this page be indexed?',
    description: 'If not, search engines will ignore this page. Default: Yes',
  },
  layoutMainBackgroundColor: {
    title: 'Background color',
    description:
      'Does not apply to the header and footer. Default: Transparent',
    values: [
      { value: 'transparent', title: 'Transparent' },
      { value: 'white', title: 'White' },
      { value: 'primary', title: 'Primary color' },
      { value: 'secondary', title: 'Secondary color' },
      { value: 'light-grey', title: 'Light grey' },
      { value: 'middle-grey', title: 'Grey' },
      { value: 'dark-grey', title: 'Dark grey' },
      { value: 'success', title: 'Success' },
      { value: 'info', title: 'Info' },
      { value: 'warning', title: 'Warning' },
      { value: 'danger', title: 'Danger' },
    ],
  },
  layoutShowHeader: {
    title: 'Show header?',
    description:
      'The header will be displayed on this page and all its descendant pages.',
  },
  layoutShowFooter: {
    title: 'Show footer?',
    description:
      'The footer will be displayed on this page and all its descendant pages.',
  },
  layoutShowLeftSidebar: {
    title: 'Show left sidebar?',
    description:
      'The left sidebar will be displayed on this page and all its descendant pages.',
  },
  layoutShowRightSidebar: {
    title: 'Show right sidebar?',
    description:
      'The right sidebar will be displayed on this page and all its descendant pages.',
  },
  tcCreator: {
    title: 'Creator',
    description: 'Username of the content creator. Start with @',
  },
  tcImage: {
    title: 'Image',
    description: 'Add or replace the image here.',
  },
  tcTitle: {
    title: 'Title',
  },
  tcDescription: {
    title: 'Description',
    description: 'Limit to 200 characters',
  },
  ogTitle: {
    title: 'Title',
    description: 'Add a catchy title for the post.',
  },
  ogDescription: {
    title: 'Description',
    description:
      'What is this post about and why would someone want to read it? Limit to 300 characters.',
  },
  ogImage: {
    title: 'Image',
    description: 'Add or replace the image here.',
  },
}

export const defaultPageInitialContent = {
  robotsIndex: true,
  layoutMainBackgroundColor: 'transparent',
} as const

export const defaultPagePropertiesGroups = [
  {
    title: 'Layout',
    properties: [
      'layoutMainBackgroundColor',
      'layoutShowHeader',
      'layoutShowLeftSidebar',
      'layoutShowRightSidebar',
      'layoutShowFooter',
    ],
    key: 'layout-group',
  },
  {
    title: 'Metadata',
    properties: ['description', 'robotsIndex'],
    key: 'metadata-group',
  },
  {
    title: 'Social cards',
    properties: [
      {
        key: 'twitter-preview',
        component: TwitterPreview,
        title: 'X Twitter preview',
      },
      'tcCreator',
      'tcImage',
      'tcTitle',
      'tcDescription',
      {
        key: 'facebook-preview',
        component: FacebookPreview,
        title: 'Facebook preview',
      },
      'ogImage',
      'ogTitle',
      'ogDescription',
    ],
    key: 'social-cards-group',
  },
] as const

export const defaultPageProperties = [
  'title',
  [
    'linkIcon',
    {
      component: ({ page }: { page: Obj }) => (
        <ScrivitoBootstrapIconPicker
          page={page}
          attribute="linkIcon"
          description="This icon may appear in a vertical navigation widget, for example."
          showClearButton
        />
      ),
    },
  ],
] as const

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
    'description',

    (description: unknown) => {
      if (ensureString(description).length > 175) {
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
          message:
            'The Twitter card description should not exceed 200 characters.',
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
