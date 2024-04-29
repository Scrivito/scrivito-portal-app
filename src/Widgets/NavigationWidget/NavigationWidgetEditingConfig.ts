import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(NavigationWidget, {
  attributes: { logOutLabel: { title: 'Log-out menu item label' } },
  title: 'Navigation',
  thumbnail: Thumbnail,
  properties: ['metaNavigationObjs', 'searchInputLabel', 'logOutLabel'],
  initialContent: { logOutLabel: 'Log out', searchInputLabel: 'Search' },
})
