import { provideEditingConfig } from 'scrivito'
import { TopNavigationWidget } from './TopNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(TopNavigationWidget, {
  attributes: {
    slimDesign: {
      title: 'Slim design?',
      description:
        'Shows only the meta navigation, not the hierarchy navigation.',
    },
  },
  title: 'Top Navigation',
  thumbnail: Thumbnail,
  properties: ['metaNavigationObjs', 'slimDesign'],
})
