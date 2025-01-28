import { provideEditingConfig } from 'scrivito'
import { TopNavigationWidget } from './TopNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(TopNavigationWidget, {
  attributes: {
    brandLink: { title: 'Brand link', description: 'Default: Homepage' },
    metaNavigationUtilityLink: { title: 'Utility link' },
    slimDesign: {
      title: 'Slim design?',
      description:
        'Shows only the meta navigation, not the hierarchy navigation.',
    },
  },
  title: 'Top Navigation',
  thumbnail: Thumbnail,
  properties: [
    'brandLink',
    'metaNavigationObjs',
    'metaNavigationUtilityLink',
    'slimDesign',
  ],
})
