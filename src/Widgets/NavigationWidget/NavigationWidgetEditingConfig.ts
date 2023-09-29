import { provideEditingConfig } from 'scrivito'
import { NavigationWidget } from './NavigationWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(NavigationWidget, {
  title: 'Navigation',
  thumbnail: classNameToThumbnail('NavigationWidget'),
  properties: [
    'metaNavigationObjs',
    'metaNavigationPortalOverview',
    'metaNavigationUserProfile',
  ],
})
