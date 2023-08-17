import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'

provideEditingConfig(NavigationWidget, {
  title: 'Navigation',
  properties: [
    'metaNavigationObjs',
    'metaNavigationPortalOverview',
    'metaNavigationUserProfile',
  ],
})
