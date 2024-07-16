import { provideEditingConfig } from 'scrivito'
import { TopNavigationWidget } from './TopNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(TopNavigationWidget, {
  attributes: {
    metaNavigationProminentPage: { title: 'Location of prominent page' },
    slimDesign: {
      title: 'Slim design?',
      description:
        'Shows only the meta navigation, not the hierarchy navigation.',
    },
  },
  title: 'Top Navigation',
  thumbnail: Thumbnail,
  properties: [
    'metaNavigationObjs',
    'metaNavigationProminentPage',
    'slimDesign',
  ],
})
