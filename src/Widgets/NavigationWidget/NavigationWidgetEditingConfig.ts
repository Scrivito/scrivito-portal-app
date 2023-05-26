import * as Scrivito from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'

Scrivito.provideEditingConfig(NavigationWidget, {
  title: 'Navigation',
  properties: ['metaNavigationObjs', 'metaNavigationPortalObjs'],
})
