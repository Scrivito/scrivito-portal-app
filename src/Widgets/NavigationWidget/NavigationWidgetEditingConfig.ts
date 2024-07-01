import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(NavigationWidget, {
  attributes: {
    logOutLabel: { title: 'Log-out menu item label' },
    slimDesign: {
      title: 'Slim design?',
      description: 'Shows only the meta navigation, not the "main" navigation.',
    },
  },
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: [
    'metaNavigationObjs',
    'slimDesign',
    'searchInputLabel',
    'logOutLabel',
  ],
  initialContent: { logOutLabel: 'Log out', searchInputLabel: 'Search' },
})
