import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(NavigationWidget, {
  attributes: {
    slimDesign: {
      title: 'Slim design?',
      description:
        'Shows only the meta navigation, not the hierarchy navigation.',
    },
  },
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: ['metaNavigationObjs', 'slimDesign'],
})
