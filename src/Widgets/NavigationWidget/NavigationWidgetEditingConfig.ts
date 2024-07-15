import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(NavigationWidget, {
  attributes: {
    metaNavigationProminentPage: { title: 'Location of prominent page' },
    slimDesign: {
      title: 'Slim design?',
      description:
        'Shows only the meta navigation, not the hierarchy navigation.',
    },
  },
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: [
    'metaNavigationObjs',
    'metaNavigationProminentPage',
    'slimDesign',
  ],
})
