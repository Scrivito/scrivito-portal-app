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
    brandAlternativeText: {
      title: 'Brand alternative text',
      description:
        'E.g. "<brand name> homepage". See https://www.w3.org/WAI/tutorials/images/functional/#example-1-image-used-alone-as-a-linked-logo',
    },
  },
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: ['brandAlternativeText', 'metaNavigationObjs', 'slimDesign'],
})
