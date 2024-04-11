import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(NavigationWidget, {
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: ['metaNavigationObjs', 'searchInputLabel'],
  initialContent: { searchInputLabel: 'Search' },
})
